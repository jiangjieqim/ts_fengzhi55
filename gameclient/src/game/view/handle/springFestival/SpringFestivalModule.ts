import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { SpringFestivalAllianceRankReward_revc, SpringFestivalAllianceRank_revc, SpringFestivalCanJoin_revc, SpringFestivalEnroll_revc, SpringFestivalFire_revc, SpringFestivalInit_revc, SpringFestivalPack_revc, SpringFestivalPrestige_revc, SpringFestivalReward_revc, SpringFestivalShop_revc, SpringFestivalTaskUpdate_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { SpringFestivalModel } from "./model/SpringFestivalModel";
import { SpringFestivalAwRankView } from "./view/SpringFestivalAwRankView";
import { SpringFestivalRankView } from "./view/SpringFestivalRankView";
import { SpringFestivalShopGMView } from "./view/SpringFestivalShopGMView";
import { SpringFestivalShopView } from "./view/SpringFestivalShopView";
import { SpringFestivalTaskView } from "./view/SpringFestivalTaskView";
import { SpringFestivalTipView } from "./view/SpringFestivalTipView";
import { SpringFestivalView } from "./view/SpringFestivalView";
import { SpringFestivalWWView } from "./view/SpringFestivalWWView";

export class SpringFestivalModule extends BaseModel{
    private static _ins:SpringFestivalModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new SpringFestivalModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        SpringFestivalModel.Ins.rewardList = [];
        SpringFestivalModel.Ins.taskList = [];
        SpringFestivalModel.Ins.packList = [];
        SpringFestivalModel.Ins.shopList = [];
    }

    public initMsg(){
        this.Reg(new SpringFestivalView(EViewType.SpringFestivalView));
        this.Reg(new SpringFestivalWWView(EViewType.SpringFestivalWWView));
        this.Reg(new SpringFestivalRankView(EViewType.SpringFestivalRankView));
        this.Reg(new SpringFestivalAwRankView(EViewType.SpringFestivalAwRankView));
        this.Reg(new SpringFestivalTaskView(EViewType.SpringFestivalTaskView));
        this.Reg(new SpringFestivalShopView(EViewType.SpringFestivalShopView));
        this.Reg(new SpringFestivalShopGMView(EViewType.SpringFestivalShopGMView));
        this.Reg(new SpringFestivalTipView(EViewType.SpringFestivalTipView));
 
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.SpringFestivalInit, this.SpringFestivalInit,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalCanJoin, this.SpringFestivalCanJoin,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalEnroll, this.SpringFestivalEnroll,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalTaskUpdate, this.SpringFestivalTaskUpdate,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalPack, this.SpringFestivalPack,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalReward, this.SpringFestivalReward,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalAllianceRank, this.SpringFestivalAllianceRank,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalAllianceRankReward, this.SpringFestivalAllianceRankReward,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalShop, this.SpringFestivalShop,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalPrestige, this.SpringFestivalPrestige,this);
        E.MsgMgr.AddMsg(MSGID.SpringFestivalFire, this.SpringFestivalFire,this);
    }

    private onMainViewInit() {
        Laya.timer.callLater(this, this.setDot);
    }

    private setDot() {
        if (SpringFestivalModel.Ins.isRedTip()) {
            MainModel.Ins.funcSetRed(EFuncDef.SpringFestival, true);
        }else {
            MainModel.Ins.funcSetRed(EFuncDef.SpringFestival, false);
        }
    }

    //春节活动初始化数据（3010前推）
    private SpringFestivalInit(value:SpringFestivalInit_revc){
        SpringFestivalModel.Ins.allianceId = value.allianceId;
        SpringFestivalModel.Ins.canJoin = value.canJoin;
        SpringFestivalModel.Ins.prestige = value.prestige;
        SpringFestivalModel.Ins.isEnroll = value.isEnroll;
        SpringFestivalModel.Ins.rewardList = value.rewardList;
        SpringFestivalModel.Ins.taskList = value.taskList;
        SpringFestivalModel.Ins.packList = value.packList;
        SpringFestivalModel.Ins.shopList = value.shopList;
        SpringFestivalModel.Ins.rank = value.rank;
        SpringFestivalModel.Ins.state = value.state;
        SpringFestivalModel.Ins.endunix = value.endunix;
        SpringFestivalModel.Ins.rewardEndunix = value.rewardEndunix;
        this.onMainViewInit();
    }

    //是否可参与春节活动（不可参与时会返回错误码）
    private SpringFestivalCanJoin(value:SpringFestivalCanJoin_revc){
        SpringFestivalModel.Ins.canJoin = value.canJoin;
        if(value.canJoin == 1 || value.canJoin == 2){
            E.ViewMgr.Open(EViewType.SpringFestivalView);
        }
        this.onMainViewInit();
    }

    //春节活动报名（不可报名时会返回错误码）
    private SpringFestivalEnroll(value:SpringFestivalEnroll_revc){
        SpringFestivalModel.Ins.isEnroll = value.isEnroll;
        SpringFestivalModel.Ins.event(SpringFestivalModel.UPDATA_VIEW);
        this.onMainViewInit();
    }

    //春节活动任务更新（任务数据变化时返回）
    private SpringFestivalTaskUpdate(value:SpringFestivalTaskUpdate_revc){
        for(let i:number=0;i<value.taskList.length;i++){
            let index = SpringFestivalModel.Ins.taskList.findIndex(ele => ele.fid == value.taskList[i].fid);
            if(index != -1){
                SpringFestivalModel.Ins.taskList[index] = value.taskList[i];
            }
        }
        SpringFestivalModel.Ins.event(SpringFestivalModel.UPDATA_VIEW_TASK);
        this.onMainViewInit();
    }

    //春节活动礼包数据更新
    private SpringFestivalPack(value:SpringFestivalPack_revc){
        let index = SpringFestivalModel.Ins.packList.findIndex(ele => ele.fid == value.data.fid);
        if (index != -1) {
            SpringFestivalModel.Ins.packList[index] = value.data;
        }
        SpringFestivalModel.Ins.event(SpringFestivalModel.UPDATA_VIEW_PACK);
        this.onMainViewInit();
    }

    //春节活动联盟总威望奖励
    private SpringFestivalReward(value:SpringFestivalReward_revc){
        for(let i:number=0;i<value.rewardList.length;i++){
            let index = SpringFestivalModel.Ins.rewardList.findIndex(ele => ele.fid == value.rewardList[i].fid);
            if(index != -1){
                SpringFestivalModel.Ins.rewardList[index] = value.rewardList[i];
            }
        }
        SpringFestivalModel.Ins.event(SpringFestivalModel.UPDATA_VIEW_REWARD);
        this.onMainViewInit();
    }

    //春节活动联盟排行
    private SpringFestivalAllianceRank(value:SpringFestivalAllianceRank_revc){
        SpringFestivalModel.Ins.rankList = value.rankList;
        SpringFestivalModel.Ins.rank = value.rank;
        SpringFestivalModel.Ins.event(SpringFestivalModel.UPDATA_VIEW_RANK);
    }

    //领取春节活动联盟排行
    private SpringFestivalAllianceRankReward(value:SpringFestivalAllianceRankReward_revc){
        SpringFestivalModel.Ins.state = value.state;
        SpringFestivalModel.Ins.event(SpringFestivalModel.UPDATA_VIEW_RANK_REWARD);
        this.onMainViewInit();
    }

    //春节活动商店购买商品
    private SpringFestivalShop(value:SpringFestivalShop_revc){
        for(let i:number=0;i<value.shopList.length;i++){
            let index = SpringFestivalModel.Ins.shopList.findIndex(ele => ele.fid == value.shopList[i].fid);
            if(index != -1){
                SpringFestivalModel.Ins.shopList[index] = value.shopList[i];
            }
        }
        SpringFestivalModel.Ins.event(SpringFestivalModel.UPDATA_VIEW_SHOP);
        this.onMainViewInit();
    }

    //春节活动联盟总威望值（联盟总威望值变化时发送）
    private SpringFestivalPrestige(value:SpringFestivalPrestige_revc){
        SpringFestivalModel.Ins.prestige = value.prestige;
        SpringFestivalModel.Ins.event(SpringFestivalModel.UPDATA_VIEW_prestige);
    }

    //春节活动点烟花
    private SpringFestivalFire(value:SpringFestivalFire_revc){
        SpringFestivalModel.Ins.event(SpringFestivalModel.UPDATA_VIEW_YH,value.itemId);
    }
}