import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { HandleStationLogs_revc, MissionList_revc, OpenStationNearBy_revc, RemarkStationList_revc, StationBuy_revc, StationDaliyInfo_revc, StationInit_revc, StationMainChange_revc, StationOtherChange_revc, StationPillagesNew_revc, UpgradePassportSlot_revc } from "../../../network/protocols/BaseProto";
import { DotManager } from "../common/DotManager";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { PaoShangModel } from "./model/PaoShangModel";
import { PaoShangJSView } from "./view/PaoShangJSView";
import { PaoShangNearView } from "./view/PaoShangNearView";
import { PaoShangPHTip } from "./view/PaoShangPHTip";
import { PaoShangRiZhiView } from "./view/PaoShangRiZhiView";
import { PaoShangTaskView } from "./view/PaoShangTaskView";
import { PaoShangView } from "./view/PaoShangView";

/* @Author: tsy
 * @Date: 2023-02-27 14:05:19
 * @Last Modified by: tsy
 * @Last Modified time: 2023-04-04 17:40:56
*/
export class PaoShangModule extends BaseModel{
    private static _ins:PaoShangModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new PaoShangModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{}

    public initMsg(){
        this.Reg(new PaoShangView(EViewType.PAOSHANG));
        this.Reg(new PaoShangJSView(EViewType.PAOSHANGJS));
        this.Reg(new PaoShangTaskView(EViewType.PAOSHANGTASK));
        this.Reg(new PaoShangRiZhiView(EViewType.PAOSHANGRIZHI));
        this.Reg(new PaoShangPHTip(EViewType.PAOSHANGPH));
        this.Reg(new PaoShangNearView(EViewType.PAOSHANGNEAR));

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.ValChange,this,this.onUpdateMoney);

        E.MsgMgr.AddMsg(MSGID.StationInit, this.StationInit,this);
        E.MsgMgr.AddMsg(MSGID.StationChange, this.StationChange,this);
        E.MsgMgr.AddMsg(MSGID.UpgradePassportSlot, this.UpgradePassportSlot,this);
        E.MsgMgr.AddMsg(MSGID.StationBuy, this.StationBuy,this);
        E.MsgMgr.AddMsg(MSGID.MissionList, this.MissionList,this);
        E.MsgMgr.AddMsg(MSGID.HandleStationLogs, this.HandleStationLogs,this);
        E.MsgMgr.AddMsg(MSGID.StationOtherChange, this.StationOtherChange,this);
        E.MsgMgr.AddMsg(MSGID.OpenStationNearBy, this.OpenStationNearBy,this);
        E.MsgMgr.AddMsg(MSGID.RemarkStationList, this.RemarkStationList,this);
        E.MsgMgr.AddMsg(MSGID.StationDaliyInfo, this.StationDaliyInfo,this);
        E.MsgMgr.AddMsg(MSGID.StationPillagesNew, this.StationPillagesNew,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){
        if(PaoShangModel.Ins.isDotMain()){
            MainModel.Ins.funcSetRed(EFuncDef.PaoShang,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.PaoShang,false);
        }
    }

    private onUpdateMoney(){
        this.setDot();
    }


    //跑商初始化（3010前推一次）
    private StationInit(value:StationInit_revc){
        PaoShangModel.Ins.passports = value.passports;
        PaoShangModel.Ins.buyIds = value.buyIds;
        PaoShangModel.Ins.freeStationNum = value.freeStationNum;
        PaoShangModel.Ins.stItemStationList = value.datalist;
    }

    //商队变化
    private StationChange(value:StationMainChange_revc){
        PaoShangModel.Ins.stItemStationList = value.datalist;
        PaoShangModel.Ins.endUnix = value.endUnix;
        PaoShangModel.Ins.freeStationNum = value.freeStationNum;
        PaoShangModel.Ins.event(PaoShangModel.UPDATA_VIEW);
        this.setDot();
    }

    //升级跑商通行证上限返回
    private UpgradePassportSlot(value:UpgradePassportSlot_revc){
        PaoShangModel.Ins.passports = value.passports;
        PaoShangModel.Ins.event(PaoShangModel.UPDATA_TXZ);
        this.setDot();
    }

    //跑商升级车队个数,可以是购买,可以是等级提升,可以是月卡,终身卡
    private StationBuy(value:StationBuy_revc){
        PaoShangModel.Ins.buyIds = value.buyIds;
        PaoShangModel.Ins.freeStationNum = value.freeStationNum;
        E.ViewMgr.Close(EViewType.PAOSHANGJS);
        this.setDot();
    }

    //点击委派按钮或刷新委派任务返回
    private MissionList(value:MissionList_revc){
        PaoShangModel.Ins.setMissionList(value.missionList);
        PaoShangModel.Ins.totalStationNum = value.totalStationNum;
        PaoShangModel.Ins.freeStationNum = value.freeStationNum;
        PaoShangModel.Ins.freshTimes = value.freshTimes;
        PaoShangModel.Ins.nextRefreshTime = value.nextRefreshTime;
        PaoShangModel.Ins.taskCD = value.cd;
        PaoShangModel.Ins.event(PaoShangModel.UPDATA_TASK);
        this.setDot();
    }

    //返回当前玩家商队(破坏、掠夺)日志
    private HandleStationLogs(value:HandleStationLogs_revc){
        PaoShangModel.Ins.riZhiList = value.datalist;
        PaoShangModel.Ins.event(PaoShangModel.UPDATA_RIZHI);
    }

    //用商队列表变化,用于查看附近商队,复仇..
    private StationOtherChange(value:StationOtherChange_revc){
        PaoShangModel.Ins.otherName = value.name;
        PaoShangModel.Ins.otherIsBJ = value.flag;
        PaoShangModel.Ins.otherPlayerId = value.playerId;
        PaoShangModel.Ins.otherisRealPlayer = value.isRealPlayer;
        PaoShangModel.Ins.stItemStationOtherList = value.datalist;
        PaoShangModel.Ins.event(PaoShangModel.UPDATA_OTHER_VIEW);
    }

    //附近商队返回
    private OpenStationNearBy(value:OpenStationNearBy_revc){
        // PaoShangModel.Ins.pillages = value.pillages;
        PaoShangModel.Ins.passportsFromDestory = value.passportsFromDestory;
        PaoShangModel.Ins.nearDataList = value.datalist;
        PaoShangModel.Ins.nearCD = value.cd;
        PaoShangModel.Ins.event(PaoShangModel.UPDATA_NEARVIEW);
    }

    //标记商队返回
    private RemarkStationList(value:RemarkStationList_revc){
        PaoShangModel.Ins.friendDataList = value.datalist;
        PaoShangModel.Ins.event(PaoShangModel.UPDATA_FRIENDVIEW);
    }

    //玩家每日跑商的数据如掠夺数量,破坏获得的通行证之类
    private StationDaliyInfo(value:StationDaliyInfo_revc){
        // PaoShangModel.Ins.pillages = value.pillages;
        PaoShangModel.Ins.passportsFromDestory = value.passportsFromDestory;
        PaoShangModel.Ins.event(PaoShangModel.UPDATA_RES);
    }

    //跑商新的掠夺信息
    private StationPillagesNew(value:StationPillagesNew_revc){
        PaoShangModel.Ins.pillagesNew = value.pillagesNew;
        PaoShangModel.Ins.nextRecoverUnix = value.nextRecoverUnix;
        PaoShangModel.Ins.event(PaoShangModel.UPDATA_RES);
        this.onMainViewInit();
    }
}