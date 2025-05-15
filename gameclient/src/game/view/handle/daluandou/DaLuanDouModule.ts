import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { SmashFight_revc, SmashInit_revc, SmashStateUpdate_revc, SmashUpdate_revc } from "../../../network/protocols/BaseProto";
import {DotManager} from "../common/DotManager";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { DaLuanDouModel } from "./model/DaLuanDouModel";
import { DaLuanDouView } from "./view/DaLuanDouView";

/* @Author: tsy
 * @Date: 2023-03-10 14:43:35
 * @Last Modified by: tsy
 * @Last Modified time: 2023-04-03 20:16:13
*/
export class DaLuanDouModule extends BaseModel{
    /**大乱斗红点 */
    private static _ins:DaLuanDouModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new DaLuanDouModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{

    }
    public initMsg(){
        this.Reg(new DaLuanDouView(EViewType.DaLuanDou));

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.SmashInit, this.SmashInit,this);
        E.MsgMgr.AddMsg(MSGID.SmashEnroll, this.SmashEnroll,this);
        E.MsgMgr.AddMsg(MSGID.SmashUpdate, this.SmashUpdate,this);
        E.MsgMgr.AddMsg(MSGID.SmashStateUpdate, this.SmashStateUpdate,this);
        E.MsgMgr.AddMsg(MSGID.SmashFight, this.SmashFight,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    public setDot(){
        if(DaLuanDouModel.Ins.isDotMain()){
            MainModel.Ins.funcSetRed(EFuncDef.DaLuanDou,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.DaLuanDou,false);
        }
        DaLuanDouModel.Ins.event(DaLuanDouModel.DA_LUAN_DOU_RED);
    }

    //大乱斗初始化信息（3010前推，每一轮更新时推）
    private SmashInit(value:SmashInit_revc){
        DaLuanDouModel.Ins.isEnroll = value.isEnroll;
        DaLuanDouModel.Ins.isReward = value.isReward;
        DaLuanDouModel.Ins.openType = value.openType;
        DaLuanDouModel.Ins.smashFightList = value.smashFightList;
        DaLuanDouModel.Ins.smashTopWinnerList = value.smashTopWinnerList;
        DaLuanDouModel.Ins.fightResult = value.fightResult;
        DaLuanDouModel.Ins.crossServers = value.crossServers;
        DaLuanDouModel.Ins.startTime = value.crossTime;
        DaLuanDouModel.Ins.event(DaLuanDouModel.UPDATA_VIEW,1);
    }

    //大乱斗报名成功（失败走错误码)
    private SmashEnroll(){
        DaLuanDouModel.Ins.isEnroll = 1;
        DaLuanDouModel.Ins.event(DaLuanDouModel.UPDATA_VIEW_BM);
        this.setDot();
    }

    //大乱斗每轮数据的更新
    private SmashUpdate(value:SmashUpdate_revc){
        if(DaLuanDouModel.Ins.round == 0){
            DaLuanDouModel.Ins.smashFightList = [];
        }
        for(let i:number=0;i<value.smashFightList.length;i++){
            DaLuanDouModel.Ins.smashFightList.push(value.smashFightList[i]);
        }
        DaLuanDouModel.Ins.smashTopWinnerList = value.smashTopWinnerList;
        DaLuanDouModel.Ins.fightResult = value.fightResult;
        DaLuanDouModel.Ins.event(DaLuanDouModel.UPDATA_VIEW,2);
    }

    //大乱斗活动状态变化
    private SmashStateUpdate(value:SmashStateUpdate_revc){
        DaLuanDouModel.Ins.openType = value.openType;
        DaLuanDouModel.Ins.event(DaLuanDouModel.UPDATA_VIEW,1);
        this.setDot();
    }

    //大乱斗每轮战斗结束（服务器主动推给客户端）
    private SmashFight(value:SmashFight_revc){
        DaLuanDouModel.Ins.round = value.round;
        DaLuanDouModel.Ins.event(DaLuanDouModel.UPDATA_VIEW_SEVER);
    }
}