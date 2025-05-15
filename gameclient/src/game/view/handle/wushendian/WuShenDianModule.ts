import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { ELayerType } from "../../../layer/LayerMgr";
import { MSGID } from "../../../network/MSGID";
import { PalaceBuffList_revc, PalaceChooseBuff_revc, PalaceChooseCoreBuff_revc, PalaceCoreBuffList_revc, PalaceInit_revc, PalaceRankList_revc, PalaceRefresh_revc, PalaceReward_revc, PalaceShopUpdate_revc, PalaceShop_revc, PalaceUpdateRanking_revc } from "../../../network/protocols/BaseProto";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { WuShenDianModel } from "./model/WuShenDianModel";
import { WuShenDianAwardView } from "./view/WuShenDianAwardView";
import { WuShenDianRankView } from "./view/WuShenDianRankView";
import { WuShenDianSHLView } from "./view/WuShenDianSHLView";
import { WuShenDianSHView } from "./view/WuShenDianSHView";
import { WuShenDianShopView } from "./view/WuShenDianShopView";
import { WuShenDianTJView } from "./view/WuShenDianTJView";
import { WuShenDianView } from "./view/WuShenDianView";

export class WuShenDianModule extends BaseModel{
    private static _ins:WuShenDianModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new WuShenDianModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        this.isOpen = false;
    }

    private _model:WuShenDianModel;

    public initMsg(): void {
        this._model = WuShenDianModel.Ins;

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);

        this.Reg(new WuShenDianView(EViewType.WuShenDianView));
        this.Reg(new WuShenDianRankView(EViewType.WuShenDianRankView));
        this.Reg(new WuShenDianShopView(EViewType.WuShenDianShopView));
        this.Reg(new WuShenDianTJView(EViewType.WuShenDianTJView));
        this.Reg(new WuShenDianSHView(EViewType.WuShenDianSHView,ELayerType.subFrameLayer));
        this.Reg(new WuShenDianAwardView(EViewType.WuShenDianAwardView));
        this.Reg(new WuShenDianSHLView(EViewType.WuShenDianSHLView));

        E.MsgMgr.AddMsg(MSGID.PalaceInit, this.PalaceInit,this);
        E.MsgMgr.AddMsg(MSGID.PalaceChooseBuff, this.PalaceChooseBuff,this);
        E.MsgMgr.AddMsg(MSGID.PalaceBuffList, this.PalaceBuffList,this);
        E.MsgMgr.AddMsg(MSGID.PalaceChooseCoreBuff, this.PalaceChooseCoreBuff,this);
        E.MsgMgr.AddMsg(MSGID.PalaceCoreBuffList, this.PalaceCoreBuffList,this);
        E.MsgMgr.AddMsg(MSGID.PalaceRankList, this.PalaceRankList,this);
        E.MsgMgr.AddMsg(MSGID.PalaceReward, this.PalaceReward,this);
        E.MsgMgr.AddMsg(MSGID.PalaceUpdateRanking, this.PalaceUpdateRanking,this);
        E.MsgMgr.AddMsg(MSGID.PalaceShop, this.PalaceShop,this);
        E.MsgMgr.AddMsg(MSGID.PalaceShopUpdate, this.PalaceShopUpdate,this);
        E.MsgMgr.AddMsg(MSGID.PalaceRefresh, this.PalaceRefresh,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setRedTip);
    }

    private setRedTip(){
        MainModel.Ins.yewaiRed();
        this.event(WuShenDianModel.RED_TIP);
    }

    //武神殿信息（3010前发）
    private PalaceInit(value:PalaceInit_revc){
        this.isOpen = true;
        this._model.gkId = value.id;
        this._model.enemyList = value.enemyList;
        this._model.power = value.power;
        this._model.attrList = value.attrList;
        this._model.ranking = value.ranking;
        this._model.rankingSettle = value.lastRanking;
        this._model.rankRewardState = value.rankRewardState;
        this._model.buffList = value.buffList;
        this._model.coreBuffList = value.coreBuffList;
        this._model.state = value.state;
        this._model.tongguan = value.clear;
        this._model.event(WuShenDianModel.UPDATA_VIEW);
    }

    //武神殿神魂选择列表
    private PalaceChooseBuff(value:PalaceChooseBuff_revc){
        this._model.selBuffList = value.buffList;
        this._model.refreshTimes = value.refreshTimes;
        if(E.ViewMgr.isOpenReg(EViewType.WuShenDianSHView)){
            this._model.event(WuShenDianModel.UPDATA_SHENHUN_VIEW);
        }else{
            E.ViewMgr.Open(EViewType.WuShenDianSHView,null,1);
        }
    }

    //武神殿核心神魂选择列表
    private PalaceChooseCoreBuff(value:PalaceChooseCoreBuff_revc){
        this._model.selCoreBuffList = value.coreBuffList;
        E.ViewMgr.Open(EViewType.WuShenDianSHView,null,2);
    }

    //武神殿玩家当前的神魂列表(更新)
    private PalaceBuffList(value:PalaceBuffList_revc){
        this._model.buffList = value.buffList;
        this._model.event(WuShenDianModel.UPDATA_SHENHUN_VIEW);
    }

    //武神殿玩家当前的核心神魂列表(更新)
    private PalaceCoreBuffList(value:PalaceCoreBuffList_revc){
        this._model.coreBuffList = value.coreBuffList;
        this._model.event(WuShenDianModel.UPDATA_SHENHUN_VIEW);
    }

    //武神殿排行榜
    private PalaceRankList(value:PalaceRankList_revc){
        this._model.rankList = value.dataList;
        this._model.myStarRank = value.data;
        this._model.event(WuShenDianModel.UPDATA_RANK_VIEW);
    }

    //领取武神殿排行奖励
    private PalaceReward(value:PalaceReward_revc){
        this._model.rankRewardState = value.rankRewardState;
        this._model.rankingSettle = value.lastRanking;
        this._model.event(WuShenDianModel.UPDATA_RANKAWARD_VIEW);
        this.onMainViewInit();
    }

    //更新玩家的武神殿排行数据（玩家挑战成功时，和3014一起返回）
    private PalaceUpdateRanking(value:PalaceUpdateRanking_revc){
        this._model.gkId = value.id;
        this._model.enemyList = value.enemyList;
        this._model.power = value.power;
        this._model.attrList = value.attrList;
        this._model.ranking = value.ranking;
        this._model.state = value.state;
        this._model.tongguan = value.clear;
    }

    //获取武神殿时间戳
    private PalaceRefresh(value:PalaceRefresh_revc){
        this._model.refreshUnix = value.refreshUnix;
        this._model.rewardUnix = value.rewardUnix;
        this._model.event(WuShenDianModel.UPDATA_VIEW);
    }

    //*********************************商店 **************************************/
    private PalaceShop(value:PalaceShop_revc){
        this._model.itemList = value.itemList;
        this._model.shopRefreshUnix = value.shopRefreshUnix;
        this._model.itemNum = value.itemNum;
        this._model.event(WuShenDianModel.UPDATA_SHOP_VIEW);
    }

    //武神殿商店购买成功后返回
    private PalaceShopUpdate(value:PalaceShopUpdate_revc){
        let index = this._model.itemList.findIndex(ele => ele.fid == value.item.fid);
        if(index != -1){
            this._model.itemList[index].buyNum = value.item.buyNum;
        }else{
            this._model.itemList.push(value.item);
        }
        this._model.event(WuShenDianModel.UPDATA_SHOPGM_VIEW);
    }
}