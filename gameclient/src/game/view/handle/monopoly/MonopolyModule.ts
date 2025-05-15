import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { MonopolyInit_revc, MonopolyMapUpdate_revc, MonopolyPackUpdate_revc, MonopolyTaskUpdate_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { MonopolyModel } from "./model/MonopolyModel";
import { MonopolyAwardView } from "./view/MonopolyAwardView";
import { MonopolyAwardView1 } from "./view/MonopolyAwardView1";
import { MonopolyLBView } from "./view/MonopolyLBView";
import { MonopolyMainView } from "./view/MonopolyMainView";
import { MonopolyView } from "./view/MonopolyView";

export class MonopolyModule extends BaseModel{
    private static _ins:MonopolyModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new MonopolyModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        MonopolyModel.Ins.mapList = [];
        MonopolyModel.Ins.taskList = [];
        MonopolyModel.Ins.packList = [];
    }

    public initMsg(): void {
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onMainViewInit);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onMainViewInit);

        this.Reg(new MonopolyMainView(EViewType.MonopolyMainView));
        this.Reg(new MonopolyView(EViewType.MonopolyView));
        this.Reg(new MonopolyLBView(EViewType.MonopolyLBView));
        this.Reg(new MonopolyAwardView(EViewType.MonopolyAwardView));
        this.Reg(new MonopolyAwardView1(EViewType.MonopolyAwardView1));

        E.MsgMgr.AddMsg(MSGID.MonopolyInit, this.MonopolyInit,this);
        E.MsgMgr.AddMsg(MSGID.MonopolyMapUpdate, this.MonopolyMapUpdate,this);
        E.MsgMgr.AddMsg(MSGID.MonopolyTaskUpdate, this.MonopolyTaskUpdate,this);
        E.MsgMgr.AddMsg(MSGID.MonopolyPackUpdate, this.MonopolyPackUpdate,this);
    }

    private onMainViewInit() {
        Laya.timer.callLater(this, this.setDot);
    }

    private setDot() {
        if (MonopolyModel.Ins.isRedTip()) {
            MainModel.Ins.funcSetRed(EFuncDef.Monopoly, true);
        }else {
            MainModel.Ins.funcSetRed(EFuncDef.Monopoly, false);
        }
    }

    //大富翁初始化数据(3010前推，活动开始推)
    private MonopolyInit(value:MonopolyInit_revc){
        MonopolyModel.Ins.type = value.type;
        MonopolyModel.Ins.mapList = value.mapList;
        MonopolyModel.Ins.taskList = value.taskList;
        MonopolyModel.Ins.packList = value.packList;
        MonopolyModel.Ins.refreshUnix = value.refreshUnix;
        MonopolyModel.Ins.endUnix = value.endUnix;
        MonopolyModel.Ins.event(MonopolyModel.UPDATA_VIEW_TASK);
        MonopolyModel.Ins.event(MonopolyModel.UPDATA_VIEW_PACK);
        this.onMainViewInit();
    }

    //大富翁投色子
    private MonopolyMapUpdate(value:MonopolyMapUpdate_revc){
        MonopolyModel.Ins.mapList = value.mapList;
        MonopolyModel.Ins.event(MonopolyModel.UPDATA_VIEW_MAP);
        this.onMainViewInit();
    }

    //大富翁任务更新（任务数据变化时返回）
    private MonopolyTaskUpdate(value:MonopolyTaskUpdate_revc){
        for(let i:number=0;i<value.taskList.length;i++){
            let index = MonopolyModel.Ins.taskList.findIndex(ele => ele.fid == value.taskList[i].fid);
            if(index != -1){
                MonopolyModel.Ins.taskList[index] = value.taskList[i];
            }
        }
        MonopolyModel.Ins.event(MonopolyModel.UPDATA_VIEW_TASK);
        this.onMainViewInit();
    }

    //大富翁礼包数据更新
    private MonopolyPackUpdate(value:MonopolyPackUpdate_revc){
        let index = MonopolyModel.Ins.packList.findIndex(ele => ele.fid == value.data.fid);
        if (index != -1) {
            MonopolyModel.Ins.packList[index] = value.data;
        }
        MonopolyModel.Ins.event(MonopolyModel.UPDATA_VIEW_PACK);
        this.onMainViewInit();
    }
}