import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import {TimeUtil} from "../../../../frame/util/TimeUtil";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { AdCdChange_revc, AdCdInit_revc, AfkFastUpdate_revc, AfkInit_revc, AfkInviteeUpdate_revc, AfkPackUpdate_revc, AfkUpdate_revc } from "../../../network/protocols/BaseProto";
import { System_RefreshTimeProxy } from "../huodong/model/ActivityProxy";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { GuaJiModel } from "./model/GuaJiModel";
import { GuaJiKuaiSuZC } from "./view/GuaJiKuaiSuZC";
import { GuaJiView } from "./view/GuaJiView";
import { GuaJiZhenChaNJ } from "./view/GuaJiZhenChaNJ";

export class GuaJiModule extends BaseModel{
    private static _ins:GuaJiModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new GuaJiModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{}
    public initMsg(){
        this.Reg(new GuaJiView(EViewType.GUAJI));
        this.Reg(new GuaJiKuaiSuZC(EViewType.GUAJIkUAISU));
        this.Reg(new GuaJiZhenChaNJ(EViewType.GUAJIADDTIME));

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.AfkInit, this.AfkInit,this);
        E.MsgMgr.AddMsg(MSGID.AfkUpdate, this.AfkUpdate,this);
        E.MsgMgr.AddMsg(MSGID.AfkFastUpdate, this.AfkFastUpdate,this);
        E.MsgMgr.AddMsg(MSGID.AfkInviteeUpdate, this.AfkInviteeUpdate,this);
        E.MsgMgr.AddMsg(MSGID.AfkPackUpdate, this.AfkPackUpdate,this);
        E.MsgMgr.AddMsg(MSGID.AdCdInit, this.AdCdInit,this);
        E.MsgMgr.AddMsg(MSGID.AdCdChange, this.AdCdChange,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
        Laya.timer.callLater(this,this.cdSetDot);
    }

    private setDot(){
        if(TaskModel.Ins.isFuncOpen(EFuncDef.GuaJi) && GuaJiModel.Ins.mianData){
            // let cfg = GuaJiRewardsProxy.Ins.getCfgByLv(GuaJiModel.Ins.mianData.level);
            // let time = TimeUtil.serverTimeMS - GuaJiModel.Ins.mianData.startUnix.toNumber();
            let time = GuaJiModel.Ins.mianData.endUnix.toNumber() - TimeUtil.serverTimeMS;
            if(time <= 0 || GuaJiModel.Ins.isFree()){
                // DotManager.addMainDot("l20");
                this.setRed(true);
            }else{
                // DotManager.remMainDot("l20");
                this.setRed(false);
                Laya.timer.once(time,this,this.onTimer);
            }
        }
    }

    private onTimer(){
        // DotManager.addMainDot("l20");
        this.setRed(true);
    }

    private setRed(v:boolean){
        MainModel.Ins.funcSetRed(EFuncDef.GuaJi,v);
    }

    //挂机初始化
    private AfkInit(value:AfkInit_revc){
        GuaJiModel.Ins.mianData = value.mianData;
        GuaJiModel.Ins.fastData = value.fastData;
        GuaJiModel.Ins.setInviteeData(value.inviteeData);
        GuaJiModel.Ins.setPackEndUnix(value.packEndUnix);
        GuaJiModel.Ins.event(GuaJiModel.UPDATA_VIEW);
    }

    //挂机主界面信息变化
    private AfkUpdate(value:AfkUpdate_revc){
        GuaJiModel.Ins.mianData = value.data;
        GuaJiModel.Ins.event(GuaJiModel.UPDATA_VIEW);
        console.log("GuaJiModel.Ins.mianData>>>>>>>>>>>>>",GuaJiModel.Ins.mianData);
        this.setDot();
    }

    //快速挂机信息变化
    private AfkFastUpdate(value:AfkFastUpdate_revc){
        GuaJiModel.Ins.fastData = value.data;
        GuaJiModel.Ins.event(GuaJiModel.UPDATA_KUAISUVIEW);
        this.setDot();
    }

    //挂机邀请信息变化
    private AfkInviteeUpdate(value:AfkInviteeUpdate_revc){
        GuaJiModel.Ins.setInviteeData(value.inviteeList);
        GuaJiModel.Ins.mianData.endUnix = value.endUnix;
        GuaJiModel.Ins.event(GuaJiModel.UPDATA_VIEW);
    }

    //挂机礼包信息变化
    private AfkPackUpdate(value:AfkPackUpdate_revc){
        GuaJiModel.Ins.setPackEndUnix(value.packEndUnix);
        GuaJiModel.Ins.mianData.endUnix = value.endUnix;
        GuaJiModel.Ins.event(GuaJiModel.UPDATA_VIEW);
    }

    //广告的cd时间,初始化的时候返回
    private AdCdInit(value:AdCdInit_revc){
        GuaJiModel.Ins.stAdCdList = value.datalist;
        GuaJiModel.Ins.event(GuaJiModel.UPDATA_CD_TIME);
        this.cdSetDot();
    }

    //广告的cd时间,改变的时候返回
    private AdCdChange(value:AdCdChange_revc){
        for(let i:number=0;i<value.datalist.length;i++){
            let index = GuaJiModel.Ins.stAdCdList.findIndex(ele => ele.pos == value.datalist[i].pos);
            if(index != -1){
                GuaJiModel.Ins.stAdCdList[index] = value.datalist[i];
            }
        }
        GuaJiModel.Ins.event(GuaJiModel.UPDATA_CD_TIME);
        this.cdSetDot();
    }

    private cdSetDot(){
        // DotManager.remMainDot("btn_guanggao");
        this.advertisementRed = false;
        if(TaskModel.Ins.isFuncOpen(EFuncDef.GuangGao)){
            let cfg = GuaJiModel.Ins.getstAdCdByType(GuaJiModel.CDEnmu.GuangGao);
            if(cfg){
                let num = parseInt(System_RefreshTimeProxy.Ins.GetDataById(16).f_SystemConfig) - cfg.times;
                let time = cfg.endUnix - TimeUtil.serverTime;
                if(num){
                    if(time <= 0){
                        // DotManager.addMainDot("btn_guanggao");
                        this.advertisementRed = true;
                    }else{
                        Laya.timer.once(time*1000,this,this.onTimerCD);
                    }
                }
            }
        }
    }

    private onTimerCD(){
        // DotManager.addMainDot("btn_guanggao");
        this.advertisementRed = true;
    }

    /**广告红点 */
    private set advertisementRed(v:boolean){
        MainModel.Ins.funcSetRed(EFuncDef.GuangGao,v);
    }
}