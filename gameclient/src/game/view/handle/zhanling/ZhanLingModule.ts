import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { BattlePassMonthUpdate_revc, BattlePassMonth_revc, BattlePassPackAccTimes_revc, BattlePassPackFree_revc, BattlePassPackUpdate_revc, BattlePassPack_revc, BattlePassTaskUpdate_revc, BattlePassTask_revc, BattlePassWeekUpdate_revc, BattlePassWeek_revc, BattlePass_revc } from "../../../network/protocols/BaseProto";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { ZhanLingModel } from "./model/ZhanLingModel";
import { ZhanLingView } from "./view/ZhanLingView";

export class ZhanLingModule extends BaseModel{
    private static _ins:ZhanLingModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new ZhanLingModule();
        }
        return this._ins;
    }
    
    public onInitCallBack():void{
        ZhanLingModel.Ins.monthPoint = 0;
        ZhanLingModel.Ins.weekPoint = 0;
        ZhanLingModel.Ins.monthList = [];
        ZhanLingModel.Ins.weekList = [];
        ZhanLingModel.Ins.taskList = [];
        ZhanLingModel.Ins.lbList = [];
    }

    public initMsg(){
        this.Reg(new ZhanLingView(EViewType.ZhanLingView));
 
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.BattlePass, this.BattlePass,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassMonth, this.BattlePassMonth,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassWeek, this.BattlePassWeek,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassTask, this.BattlePassTask,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassTaskUpdate, this.BattlePassTaskUpdate,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassPack, this.BattlePassPack,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassMonthUpdate, this.BattlePassMonthUpdate,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassWeekUpdate, this.BattlePassWeekUpdate,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassPackFree, this.BattlePassPackFree,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassPackAccTimes, this.BattlePassPackAccTimes,this);
        E.MsgMgr.AddMsg(MSGID.BattlePassPackUpdate, this.BattlePassPackUpdate,this);
    }

    private onMainViewInit() {
        Laya.timer.callLater(this, this.setDot);
    }
    private setDot() {
        if (ZhanLingModel.Ins.isDotMain()) {
            MainModel.Ins.funcSetRed(EFuncDef.ZhanLing, true);
        }else {
            MainModel.Ins.funcSetRed(EFuncDef.ZhanLing, false);
        }
    }

    //战令积分（3010初始化前推，积分更新时推）
    private BattlePass(value:BattlePass_revc){
        ZhanLingModel.Ins.monthPoint = value.monthPoint;
        ZhanLingModel.Ins.weekPoint = value.weekPoint;
        ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_MW);
        this.onMainViewInit();
    }

    //战令月卡数据（3010初始化前推）
    private BattlePassMonth(value:BattlePassMonth_revc){
        ZhanLingModel.Ins.setMonthList(value.dataList);
        ZhanLingModel.Ins.monthPaid = value.paid;
        ZhanLingModel.Ins.monthRound = value.round;
        ZhanLingModel.Ins.monthEndTime = value.endUnix;
        ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_MONTH);
        this.onMainViewInit();
    }

    //战令更新月卡奖励领取状态（月卡数据更新时推）
    private BattlePassMonthUpdate(value:BattlePassMonthUpdate_revc){
        ZhanLingModel.Ins.setMonthList(value.dataList);
        ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_MONTH);
        this.onMainViewInit();
    }

    //战令周卡数据（3010初始化前推）
    private BattlePassWeek(value:BattlePassWeek_revc){
        ZhanLingModel.Ins.setWeekList(value.dataList);
        ZhanLingModel.Ins.weekPaid = value.paid;
        ZhanLingModel.Ins.weekRound = value.round;
        ZhanLingModel.Ins.weekEndTime = value.endUnix;
        ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_WEEK);
        this.onMainViewInit();
    }

    //战令更新周卡奖励领取状态（周卡数据更新时推）
    private BattlePassWeekUpdate(value:BattlePassWeekUpdate_revc){
        ZhanLingModel.Ins.setWeekList(value.dataList);
        ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_WEEK);
        this.onMainViewInit();
    }

    //战令任务数据（仅3010初始化前推）
    private BattlePassTask(value:BattlePassTask_revc){
        ZhanLingModel.Ins.taskList = value.dataList;
        ZhanLingModel.Ins.taskEndTime = value.endUnix;
        ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_TASK);
        this.onMainViewInit();
    }

    //战令更新单个任务数据
    private BattlePassTaskUpdate(value:BattlePassTaskUpdate_revc){
        let index = ZhanLingModel.Ins.taskList.findIndex(ele => ele.fid == value.data.fid);
        if(index != -1){
            ZhanLingModel.Ins.taskList[index] = value.data;
            ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_TASK);
            this.onMainViewInit();
        }
    }

    //战令礼包(3010初始化前推，数据变化时推)
    private BattlePassPack(value:BattlePassPack_revc){
        ZhanLingModel.Ins.lbList = value.dataList;
        ZhanLingModel.Ins.lbEndTime = value.endUnix;
        ZhanLingModel.Ins.lbNum = value.buyNum;
        ZhanLingModel.Ins.lbRreeState = value.freeState;
        ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_LB);
        this.onMainViewInit();
    }

    //战令领取礼包免费奖励
    private BattlePassPackFree(value:BattlePassPackFree_revc){
        ZhanLingModel.Ins.lbRreeState = value.freeState;
        ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_LB);
        this.onMainViewInit();
    }

    //战令领取累计购买奖励
    private BattlePassPackAccTimes(value:BattlePassPackAccTimes_revc){
        ZhanLingModel.Ins.lbNum = value.buyNum;
        ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_LB);
        this.onMainViewInit();
    }

    //战令购买礼包后更新（购买礼包后，返回3651、3652）
    private BattlePassPackUpdate(value:BattlePassPackUpdate_revc){
        let index = ZhanLingModel.Ins.lbList.findIndex(ele => ele.fid == value.data.fid);
        if(index != -1){
            ZhanLingModel.Ins.lbList[index] = value.data;
            ZhanLingModel.Ins.event(ZhanLingModel.UPDATA_VIEW_LB);
            this.onMainViewInit();
        }
    }
}