import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { E } from "../../../../G";
import { stSpringFestivalAllianceRank, stSpringFestivalPack, stSpringFestivalRewardInfo, stSpringFestivalShop, stSpringFestivalTask } from "../../../../network/protocols/BaseProto";
import { SFPackProxy } from "../proxy/SpringFestivalProxy";

export class SpringFestivalModel extends Laya.EventDispatcher{
    private static _ins: SpringFestivalModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new SpringFestivalModel();
        }
        return this._ins;
    } 

    public allianceId:number;//联盟id
    public canJoin:number;//玩家是否可参与春节活动
    public prestige:number;//联盟总威望值
    public isEnroll:number;//是否报名 0未报名 1已报名
    public rewardList:stSpringFestivalRewardInfo[];//联盟总威望奖励（全部量）
    public taskList:stSpringFestivalTask[];//春节活动任务（全部量）
    public packList:stSpringFestivalPack[];//春节活动礼包（全部量）
    public shopList:stSpringFestivalShop[];//商店购买商品数据（全部量）
    public rankList:stSpringFestivalAllianceRank[];
    public rank:number;//玩家所在联盟的威望排行
    public state:number;//威望排行奖励领取状态（0不可领取 1已领取 2可领取）
    public endunix:number;//活动结束时间戳
    public rewardEndunix:number;

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_VIEW_TASK:string = "UPDATA_VIEW_TASK";
    public static UPDATA_VIEW_PACK:string = "UPDATA_VIEW_PACK";
    public static UPDATA_VIEW_REWARD:string = "UPDATA_VIEW_REWARD";
    public static UPDATA_VIEW_RANK:string = "UPDATA_VIEW_RANK";
    public static UPDATA_VIEW_RANK_REWARD:string = "UPDATA_VIEW_RANK_REWARD";
    public static UPDATA_VIEW_SHOP:string = "UPDATA_VIEW_SHOP";
    public static UPDATA_VIEW_prestige:string = "UPDATA_VIEW_prestige";
    public static UPDATA_VIEW_YH:string = "UPDATA_VIEW_YH";

    public getIsEnroll(bo:boolean = true) {
        if(bo){
            if(TimeUtil.serverTime > this.endunix){
                E.ViewMgr.ShowMidError("活动已结束");
                return false;
            }
        }
        if (SpringFestivalModel.Ins.isEnroll == 0) {
            E.ViewMgr.ShowMidError("请先报名");
            return false;
        }
        return true;
    }

    public isRedTip(){
        if(this.isEnrollRedTip() || this.isWWRedTip() || this.isPackRedTip() ||
            this.isTaskRedTip() || this.isRankRedTip()){
                return true;
        }
        return false;
    }

    //玩家是否可以报名
    public isEnrollRedTip() {
        if(TimeUtil.serverTime > this.endunix)return false;
        if (this.allianceId && this.canJoin && this.isEnroll == 0) {
            return true;
        }
        return false;
    }

    public isWWRedTip(){
        if(!this.rewardList)return false;
        if(this.isEnroll == 0)return false;
        if(TimeUtil.serverTime > this.endunix)return false;
        for(let i:number=0;i<this.rewardList.length;i++){
            if(this.rewardList[i].state == 2){
                return true;
            }
        }
        return false;
    }

    public isPackRedTip(){
        if(!this.packList)return false;
        if(this.isEnroll == 0)return false;
        if(TimeUtil.serverTime > this.endunix)return false;
        for(let i:number=0;i<this.packList.length;i++){
            let cfg:Configs.t_Event_2024Spring_Pack_dat = SFPackProxy.Ins.GetDataById(this.packList[i].fid);
            if(cfg.f_PackType == 1){
                if(this.packList[i].count < cfg.f_PackBuyLimit){
                    return true;
                }
            }
        }
        return false;
    }

    public isTaskRedTip(){
        if(!this.taskList)return false;
        if(this.isEnroll == 0)return false;
        if(TimeUtil.serverTime > this.endunix)return false;
        for(let i:number=0;i<this.taskList.length;i++){
            if(this.taskList[i].state == 1){
                return true;
            }
        }
        return false;
    }

    public isRankRedTip() {
        if(this.isEnroll == 0)return false;
        if (this.state == 2) {
            return true
        }
        return false;
    }
}