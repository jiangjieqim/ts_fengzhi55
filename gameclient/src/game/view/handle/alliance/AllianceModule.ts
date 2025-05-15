import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { ELayerType } from "../../../layer/LayerMgr";
import { MSGID } from "../../../network/MSGID";
import { AllianceApplyList_revc, AllianceBossFight_revc, AllianceBossInit_revc, AllianceBossRankList_revc, AllianceInfo_revc, AllianceInnerRankList_revc, AllianceJoinWait_revc, AllianceList_revc, AlliancePlayerList_revc, AllianceRankReward_revc, AllianceSearch_revc, AllianceShopInit_revc, AllianceShop_revc } from "../../../network/protocols/BaseProto";
import { AllianceModel } from "./model/AllianceModel";
import { AllianceCfgProxy, AllianceShopProxy } from "./proxy/AllianceProxy";
import { AllianceApplyListView } from "./view/AllianceApplyListView";
import { AllianceBossDetailView } from "./view/AllianceBossDetailView";
import { AllianceBossView } from "./view/AllianceBossView";
import { AllianceCreateView } from "./view/AllianceCreateView";
import { AllianceEditView } from "./view/AllianceEditView";
import { AllianceListView } from "./view/AllianceListView";
import { AllianceMainView } from "./view/AllianceMainView";
import { AllianceMenuView } from "./view/AllianceMenuView";
import { AllianceNoticeView } from "./view/AllianceNoticeView";
import { AllianceRankListView } from "./view/AllianceRankListView";

export class AllianceModule extends BaseModel{
    private static _ins:AllianceModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new AllianceModule();
        }
        return this._ins;
    }

    public onInitCallBack(): void {
        AllianceModel.Ins.allianceList = undefined;
        AllianceModel.Ins.alliance = undefined;
        AllianceModel.Ins.playerList = []
        AllianceModel.Ins.applyList = [];
        AllianceModel.Ins.searchInfo = undefined;
        AllianceModel.Ins.bossInitRevc = undefined;
        AllianceModel.Ins.bossRankRevc = undefined;
        AllianceModel.Ins.innerRankList = [];
        AllianceModel.Ins.rankRewardState = 0;
        AllianceModel.Ins.bossFightNum = 0;
        AllianceModel.Ins.updatedShopItem = undefined;
        AllianceModel.Ins.shopList = [];
        AllianceModel.Ins.updatedShopCfgs = [];
        AllianceModel.Ins.position = undefined;
        AllianceShopProxy.Ins.List.map(o => o['count'] = undefined);
        AllianceModel.Ins.joinWaitSeconds = 0;
        AllianceModel.Ins.isMainViewOpened = false;
    }

    public initMsg(){
        this.Reg(new AllianceCreateView(EViewType.AllianceCreateView));
        this.Reg(new AllianceListView(EViewType.AllianceListView));
        this.Reg(new AllianceMainView(EViewType.AllianceMainView));
        this.Reg(new AllianceEditView(EViewType.AllianceEditView));
        this.Reg(new AllianceNoticeView(EViewType.AllianceNoticeView));
        this.Reg(new AllianceMenuView(EViewType.AllianceMenuView,ELayerType.subFrameLayer));
        this.Reg(new AllianceApplyListView(EViewType.AllianceApplyView));
        this.Reg(new AllianceBossView(EViewType.AllianceBossView));
        this.Reg(new AllianceBossDetailView(EViewType.AllianceBossDetailView));
        this.Reg(new AllianceRankListView(EViewType.AllianceRankListView));

        E.MsgMgr.AddMsg(MSGID.AllianceList, this.onAllianceList,this);
        E.MsgMgr.AddMsg(MSGID.AllianceInfo, this.onAllianceInfo,this);
        E.MsgMgr.AddMsg(MSGID.AlliancePlayerList, this.onAlliancePlayerList,this);
        E.MsgMgr.AddMsg(MSGID.AllianceApplyList, this.onAllianceApplyList,this);
        E.MsgMgr.AddMsg(MSGID.AllianceSearch, this.onAllianceSearch,this);
        E.MsgMgr.AddMsg(MSGID.AllianceBossInit, this.onAllianceBossInit,this);
        E.MsgMgr.AddMsg(MSGID.AllianceBossRankList, this.onAllianceBossRankList,this);
        E.MsgMgr.AddMsg(MSGID.AllianceInnerRankList, this.onAllianceInnerRankList,this);
        E.MsgMgr.AddMsg(MSGID.AllianceRankReward, this.onAllianceRankReward,this);
        E.MsgMgr.AddMsg(MSGID.AllianceBossFight, this.onAllianceBossFight,this);
        E.MsgMgr.AddMsg(MSGID.AllianceShop, this.onAllianceShop,this);
        E.MsgMgr.AddMsg(MSGID.AllianceShopInit, this.onAllianceShopInit,this);
        E.MsgMgr.AddMsg(MSGID.AllianceJoinWait, this.onAllianceJoinWait,this);
    }

    private onAllianceJoinWait(revc: AllianceJoinWait_revc) {
        if (revc.seconds > 0) {
            const mins = Math.ceil(revc.seconds / 60);
            E.ViewMgr.ShowMidError(E.getLang('AllianceJoinWait', mins));
        }
    }

    private onAllianceShopInit(revc: AllianceShopInit_revc) {
        AllianceModel.Ins.shopList = revc.dataList;
    }

    private onAllianceShop(revc: AllianceShop_revc) {
        AllianceModel.Ins.updatedShopItem = revc.data;
        AllianceModel.Ins.event(AllianceModel.SHOP_UPDATE);
    }

    private onAllianceBossFight(revc: AllianceBossFight_revc) {
        const fightLimit = (AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat).f_bossplaytimes;
        const times = Math.max(fightLimit - revc.fightNum, 0);
        AllianceModel.Ins.bossFightNum = times;
        AllianceModel.Ins.event(AllianceModel.UPDATE_BOSS_FIGHT_NUM);
    }

    private onAllianceRankReward(revc: AllianceRankReward_revc) {
        AllianceModel.Ins.rankRewardState = revc.rankRewardState;
    }

    private onAllianceInnerRankList(revc: AllianceInnerRankList_revc) {
        AllianceModel.Ins.innerRankList = revc.dataList;
        AllianceModel.Ins.event(AllianceModel.INNER_RANK_UPDATE);
    }

    private onAllianceBossRankList(revc: AllianceBossRankList_revc) {
        AllianceModel.Ins.bossRankRevc = revc;
        AllianceModel.Ins.event(AllianceModel.BOSS_RANK_UPDATE);
    }

    private onAllianceBossInit(revc: AllianceBossInit_revc) {
        AllianceModel.Ins.bossInitRevc = revc;
        const fightLimit = (AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat).f_bossplaytimes;
        const times = Math.max(fightLimit - revc.fightNum, 0);
        AllianceModel.Ins.bossFightNum = times;
    }

    private onAllianceSearch(revc: AllianceSearch_revc) {
        AllianceModel.Ins.searchInfo = revc.info
    }

    private onAllianceApplyList(revc: AllianceApplyList_revc) {
        AllianceModel.Ins.applyList = revc.datalist;
        AllianceModel.Ins.event(AllianceModel.ALLIANCE_APPLY_UPDATE);
    }

    /**
     * 玩家没加入同盟时收到此协议
     * @param revc 
     */
    private onAllianceList(revc: AllianceList_revc) {
        if (AllianceModel.Ins.isMainViewOpened) {
            if (E.ViewMgr.isOpenReg(EViewType.AllianceMainView)) E.ViewMgr.Close(EViewType.AllianceMainView);
            if (!E.ViewMgr.isOpenReg(EViewType.AllianceListView)) E.ViewMgr.Open(EViewType.AllianceListView);
        }
        AllianceModel.Ins.allianceList = revc.datalist;
        AllianceModel.Ins.alliance = undefined;
        AllianceModel.Ins.event(AllianceModel.ALLIANCE_LIST_UPDATE);
    }

    /**
     * 玩家有加入的同盟时收到此协议
     * @param revc 
     */
    private onAllianceInfo(revc: AllianceInfo_revc) {
        if (AllianceModel.Ins.isMainViewOpened) {
            if (E.ViewMgr.isOpenReg(EViewType.AllianceCreateView)) E.ViewMgr.Close(EViewType.AllianceCreateView);
            if (E.ViewMgr.isOpenReg(EViewType.AllianceListView)) E.ViewMgr.Close(EViewType.AllianceListView);
            if (!E.ViewMgr.isOpenReg(EViewType.AllianceMainView)) E.ViewMgr.Open(EViewType.AllianceMainView);
        }
        AllianceModel.Ins.alliance = revc.info;
        AllianceModel.Ins.allianceList = undefined;
        AllianceModel.Ins.event(AllianceModel.ALLIANCE_INFO_UPDATE);
    }

    /**
     * 玩家所属的同盟成员列表
     * @param revc 
     */
    private onAlliancePlayerList(revc: AlliancePlayerList_revc) {
        const oldPosition = AllianceModel.Ins.position;
        let updateWarRed = false;
        if (revc.playerList.length !== AllianceModel.Ins.playerList.length) {
            // 成员数发生了变化
            updateWarRed = true;
        }
        AllianceModel.Ins.playerList = revc.playerList;
        AllianceModel.Ins.setPlayerPosition();
        const newPosition = AllianceModel.Ins.position;
        AllianceModel.Ins.event(AllianceModel.ALLIANCE_PLAYER_LIST_UPDATE);
        if (oldPosition !== newPosition) {
            // 职位发生了变化
            updateWarRed = true;
            AllianceModel.Ins.event(AllianceModel.ALLIANCE_POSITION_UPDATE);
        }
        if (updateWarRed) {
            AllianceModel.Ins.checkWarRedState();
        }
    }
}