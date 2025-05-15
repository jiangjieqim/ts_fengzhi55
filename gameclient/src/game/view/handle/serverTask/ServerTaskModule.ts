import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { SevenScore_revc, SevenTask_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { ServerTaskModel } from "./model/ServerTaskModel";
import { ServerTaskView } from "./view/ServerTaskView";

export class ServerTaskModule extends BaseModel{
    private static _ins:ServerTaskModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new ServerTaskModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        ServerTaskModel.Ins.sevenTaskList = [];
    }

    public initMsg(): void {
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onMainViewInit);

        this.Reg(new ServerTaskView(EViewType.ServerTaskView));

        E.MsgMgr.AddMsg(MSGID.SevenTask, this.SevenTask,this);
        E.MsgMgr.AddMsg(MSGID.SevenScore, this.SevenScore,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){
        if(ServerTaskModel.Ins.isServerTaskRedTip()){
            MainModel.Ins.funcSetRed(EFuncDef.ServerTask,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.ServerTask,false);
        }
    }

    //7日狂欢任务完成及领取情况
    private SevenTask(value:SevenTask_revc){
        ServerTaskModel.Ins.sevenTaskDay = value.num;
        if(value.flag){
            for(let i:number=0;i<value.dataList.length;i++){
                let index = ServerTaskModel.Ins.sevenTaskList.findIndex(ele => ele.id == value.dataList[i].id);
                ServerTaskModel.Ins.sevenTaskList[index] = value.dataList[i];
            }
        }else{
            ServerTaskModel.Ins.sevenTaskList = value.dataList;
        }
        ServerTaskModel.Ins.event(ServerTaskModel.UPDATA_VIEW);
        this.onMainViewInit();
    }

    //7日狂欢积分
    private SevenScore(value:SevenScore_revc){
        ServerTaskModel.Ins.sevenTaskAwardList = value.dataList;
        ServerTaskModel.Ins.event(ServerTaskModel.UPDATA_JIFEN_VIEW);
        this.onMainViewInit();
    }
}