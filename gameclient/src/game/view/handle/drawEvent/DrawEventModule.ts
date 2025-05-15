import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { DrawEventChoose_revc, DrawEventCumulateReward_revc, DrawEventInit_revc, DrawEventPack_req, DrawEventPack_revc, DrawEventRewardUpdate_revc, DrawEventTaskUpdate_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { DrawEventModel } from "./model/DrawEventModel";
import { DrawEventShowReward } from "./view/DrawEventShowReward";
import { DrawEventView } from "./view/DrawEventView";
import { DrawEventView1 } from "./view/DrawEventView1";
import { DrawEventView2 } from "./view/DrawEventView2";

export class DrawEventModule extends BaseModel{
    private static _ins:DrawEventModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new DrawEventModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        DrawEventModel.Ins.rewardList = [];
        DrawEventModel.Ins.cumulateRewardList = [];
        DrawEventModel.Ins.taskList = [];
        DrawEventModel.Ins.packList =[];
    }

    public initMsg(){
        this.Reg(new DrawEventView(EViewType.DrawEventView));
        this.Reg(new DrawEventView1(EViewType.DrawEventView1));
        this.Reg(new DrawEventView2(EViewType.DrawEventView2));
        this.Reg(new DrawEventShowReward(EViewType.DrawEventShowReward));

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onMainViewInit);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.DrawEventInit, this.DrawEventInit,this);
        E.MsgMgr.AddMsg(MSGID.DrawEventChoose, this.DrawEventChoose,this);
        E.MsgMgr.AddMsg(MSGID.DrawEventRewardUpdate, this.DrawEventRewardUpdate,this);
        E.MsgMgr.AddMsg(MSGID.DrawEventTaskUpdate, this.DrawEventTaskUpdate,this);
        E.MsgMgr.AddMsg(MSGID.DrawEventPack, this.DrawEventPack,this);
        E.MsgMgr.AddMsg(MSGID.DrawEventCumulateReward, this.DrawEventCumulateReward,this);
    }

    private onMainViewInit() {
        Laya.timer.callLater(this, this.setDot);
    }

    private setDot() {
        if (DrawEventModel.Ins.isMainDot()) {
            MainModel.Ins.funcSetRed(EFuncDef.DrawEvent, true);
        }else {
            MainModel.Ins.funcSetRed(EFuncDef.DrawEvent, false);
        }
    }

    //元旦活动初始化数据(3010前推，活动开始推)
    private DrawEventInit(value:DrawEventInit_revc){
        DrawEventModel.Ins.rewardFid = value.rewardFid;
        DrawEventModel.Ins.type = value.type;
        DrawEventModel.Ins.count = value.count;
        DrawEventModel.Ins.fuYunCount = value.fuYunCount;
        DrawEventModel.Ins.rewardList = value.rewardList;
        DrawEventModel.Ins.cumulateRewardList = value.cumulateRewardList;
        DrawEventModel.Ins.taskList = value.taskList;
        DrawEventModel.Ins.packList = value.packList;
        DrawEventModel.Ins.refreshUnix = value.refreshUnix;
        DrawEventModel.Ins.endUnix = value.endUnix;
        DrawEventModel.Ins.event(DrawEventModel.UPDATA_VIEW_TASK);
        DrawEventModel.Ins.event(DrawEventModel.UPDATA_VIEW_PACK);
        this.onMainViewInit();
    }

    //元旦活动选择大奖
    private DrawEventChoose(value:DrawEventChoose_revc){
        DrawEventModel.Ins.rewardFid = value.fid;
        DrawEventModel.Ins.event(DrawEventModel.UPDATA_VIEW_FID);
    }

    //元旦活动投色子
    private DrawEventRewardUpdate(value:DrawEventRewardUpdate_revc){
        DrawEventModel.Ins.count = value.count;
        DrawEventModel.Ins.fuYunCount = value.fuYunCount;
        DrawEventModel.Ins.rewardList = value.rewardList;
        DrawEventModel.Ins.cumulateRewardList = value.cumulateRewardList;
        DrawEventModel.Ins.event(DrawEventModel.UPDATA_VIEW_AWARD);
        this.onMainViewInit();
    }

    //元旦活动任务更新（任务数据变化时返回）
    private DrawEventTaskUpdate(value:DrawEventTaskUpdate_revc){
        for(let i:number=0;i<value.taskList.length;i++){
            let index = DrawEventModel.Ins.taskList.findIndex(ele => ele.fid == value.taskList[i].fid);
            if(index != -1){
                DrawEventModel.Ins.taskList[index] = value.taskList[i];
            }
        }
        DrawEventModel.Ins.event(DrawEventModel.UPDATA_VIEW_TASK);
        this.onMainViewInit();
    }

    //元旦活动礼包数据更新
    private DrawEventPack(value:DrawEventPack_revc){
        let index = DrawEventModel.Ins.packList.findIndex(ele => ele.fid == value.data.fid);
        if (index != -1) {
            DrawEventModel.Ins.packList[index] = value.data;
        }
        DrawEventModel.Ins.event(DrawEventModel.UPDATA_VIEW_PACK);
        this.onMainViewInit();
    }

    //元旦活动领取累计奖励
    private DrawEventCumulateReward(value:DrawEventCumulateReward_revc){
        for(let i:number=0;i<value.cumulateRewardList.length;i++){
            let index = DrawEventModel.Ins.cumulateRewardList.findIndex(ele => ele.fid == value.cumulateRewardList[i].fid);
            if(index != -1){
                DrawEventModel.Ins.cumulateRewardList[index] = value.cumulateRewardList[i];
            }
        }
        DrawEventModel.Ins.event(DrawEventModel.UPDATA_VIEW_LINQUAWARD);
        this.onMainViewInit();
    }
}