import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { SilkBagHandler_revc, StarBattleEnemys_revc, StarBattleFight_revc, StarBattleInit_revc, StarBattleKeyRecovery_revc, StarBattleLog_revc, StarBattleRank_revc, StarBattleRankReward_revc, StarBattleReward_revc, StarNumChange_revc, StarShopBuy_revc, TurnWheel_revc } from "../../../network/protocols/BaseProto";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { XXZDZModel } from "./model/XXZDZModel";
import { XXZDZAwardView } from "./view/XXZDZAwardView";
import { XXZDZGMView } from "./view/XXZDZGMView";
import { XXZDZMJView } from "./view/XXZDZMJView";
import { XXZDZRankView } from "./view/XXZDZRankView";
import { XXZDZRZView } from "./view/XXZDZRZView";
import { XXZDZShopGMView } from "./view/XXZDZShopGMView";
import { XXZDZShopView } from "./view/XXZDZShopView";
import { XXZDZTZView } from "./view/XXZDZTZView";
import { XXZDZView } from "./view/XXZDZView";

export class XXZDZModule extends BaseModel{
    private static _ins:XXZDZModule;
    private _model:XXZDZModel;
    public static get ins(){
        if(!this._ins){
            this._ins = new XXZDZModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        this._model = XXZDZModel.Ins;

        this.Reg(new XXZDZView(EViewType.XXZDZView));
        this.Reg(new XXZDZMJView(EViewType.XXZDZMJView));
        this.Reg(new XXZDZRankView(EViewType.XXZDZRankView));
        this.Reg(new XXZDZRZView(EViewType.XXZDZRZView));
        this.Reg(new XXZDZShopView(EViewType.XXZDZShopView));
        this.Reg(new XXZDZTZView(EViewType.XXZDZTZView));
        this.Reg(new XXZDZGMView(EViewType.XXZDZGMView));
        this.Reg(new XXZDZAwardView(EViewType.XXZDZAwardView));
        this.Reg(new XXZDZShopGMView(EViewType.XXZDZShopBuyView));

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.ValChange,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.StarBattleInit, this.StarBattleInit,this);
        E.MsgMgr.AddMsg(MSGID.StarBattleKeyRecovery, this.StarBattleKeyRecovery,this);
        E.MsgMgr.AddMsg(MSGID.StarBattleReward, this.StarBattleReward,this);
        E.MsgMgr.AddMsg(MSGID.TurnWheel, this.TurnWheel,this);
        E.MsgMgr.AddMsg(MSGID.StarBattleEnemys, this.StarBattleEnemys,this);
        E.MsgMgr.AddMsg(MSGID.StarBattleFight, this.StarBattleFight,this);
        E.MsgMgr.AddMsg(MSGID.StarNumChange, this.StarNumChange,this);
        E.MsgMgr.AddMsg(MSGID.SilkBagHandler, this.SilkBagHandler,this);
        E.MsgMgr.AddMsg(MSGID.StarBattleLog, this.StarBattleLog,this);
        E.MsgMgr.AddMsg(MSGID.StarBattleRankReward, this.StarBattleRankReward,this);
        E.MsgMgr.AddMsg(MSGID.StarBattleRank, this.StarBattleRank,this);
        E.MsgMgr.AddMsg(MSGID.StarShopBuy, this.StarShopBuy,this);
    }

    //星星争夺战初始化协议
    private StarBattleInit(value:StarBattleInit_revc){
        this._model.wheelNum = value.wheelNum;
        this._model.keyRecoveryUnix = value.keyRecoveryUnix;
        this._model.ranking = value.ranking;
        this._model.starNum = value.starNum;
        this._model.rewardList = value.rewardList;
        this._model.silkBags = value.silkBags;
        this._model.rankingSettle = value.rankingSettle;
        this._model.rankRewardState = value.rankRewardState;
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setRedTip);
    }

    private setRedTip(){
        MainModel.Ins.updateJJC_Red();
        this.event(XXZDZModel.RED_TIP);
    }

    //星星争夺战恢复钥匙
    private StarBattleKeyRecovery(value: StarBattleKeyRecovery_revc) {
        this._model.keyRecoveryUnix = value.keyRecoveryUnix;
        // this._model.event(XXZDZModel.UPDATA_VIEW);
    }

    //星星争夺战领取奖励
    private StarBattleReward(value:StarBattleReward_revc){
        this._model.rewardList = value.rewardList;
        this._model.event(XXZDZModel.UPDATA_VIEW);
        this.onMainViewInit();
    }

    //星星争夺战转动转盘,奖励提示使用3022类型传14来获取延迟奖励
    private TurnWheel(value:TurnWheel_revc){
        this._model.wheelNum = value.wheelNum;
        this._model.event(XXZDZModel.UPDATA_ZHUANPAN_VIEW);
    }

    //星星争夺战获取挑战对手列表
    private StarBattleEnemys(value:StarBattleEnemys_revc){
        this._model.starBEList = value.dataList;
        this._model.event(XXZDZModel.UPDATA_TIAOZHAN_VIEW);
    }

    //星星争夺战pk对手后排名变化
    private StarBattleFight(value:StarBattleFight_revc){
        this._model.starPercent = value.starPercent;
        this._model.ranking = value.ranking;
        this._model.event(XXZDZModel.UPDATA_VIEW);
    }

    //星星争夺战当前玩家星星数量变化
    private StarNumChange(value:StarNumChange_revc){
        this._model.starNum = value.starNum;
        // this._model.event(XXZDZModel.UPDATA_VIEW);
    }

    //星星争夺战锦囊变化
    private SilkBagHandler(value:SilkBagHandler_revc){
        this._model.silkBags = value.silkBags;
        this._model.event(XXZDZModel.UPDATA_VIEW);
    }

    //星星争夺战日志
    private StarBattleLog(value:StarBattleLog_revc){
        this._model.rizhiList = value.dataList;
        this._model.event(XXZDZModel.UPDATA_RIZHI_VIEW);
    }

    //星星争夺战排行榜奖励领取
    private StarBattleRankReward(value:StarBattleRankReward_revc){
        this._model.rankRewardState = value.rewardState;
        this._model.event(XXZDZModel.UPDATA_RANKAWARD_VIEW);
        this.onMainViewInit();
    }

    //星星争夺战排行榜请求
    private StarBattleRank(value:StarBattleRank_revc){
        this._model.starRankList = value.dataList;
        this._model.myStarRank = value.self;
        this._model.peakJjcAvatar = value.top3;
        this._model.rewardUnix = value.rewardUnix;
        this._model.event(XXZDZModel.UPDATA_RANK_VIEW);
    }

    //星星争夺战商店兑换
    private StarShopBuy(value:StarShopBuy_revc){
        this._model.starGoods = value.dataList;
        this._model.goodsFreshUnix = value.goodsFreshUnix;
        this._model.event(XXZDZModel.UPDATA_SHOP_VIEW);
        E.ViewMgr.Close(EViewType.XXZDZShopBuyView);
    }
}