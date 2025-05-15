import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { AllianceBossInit_revc, AllianceBossRankList_revc, stAlliance, stAllianceInnerRankPlayer, stAlliancePlayer, stAllianceShop } from "../../../../network/protocols/BaseProto";
import { AllianceFightModel, WarStatus } from "../../allianceFight/model/AllianceFightModel";
import { AllianceWarConfig } from "../../allianceFight/proxy/AllianceFightProxy";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { AllianceBossAttributeProxy, AllianceShopProxy } from "../proxy/AllianceProxy";

export interface IMenu{
    /**
     * 目标
     */
    target:Laya.Sprite;
    playerId:number;
    position: AlliancePosition; //playerId的职位

}

export enum AlliancePosition {
    Normal = 0, // 普通成员
    VicePresident = 1, // 副会长
    President = 2, // 会长
}

export enum AllianceJoin {
    Quit = 0, // 退出
    Join = 1, // 加入
    Disband = 2, // 解散
}

export enum AllianceManage {
    AppointVicePresident = 1, // 任命副会长
    AppointPresident = 2, // 转让会长
    KickOut = 3, // 踢出
    Agree = 4, // 同意加入
    Impeach = 5, // 弹劾
    Demotion = 6, // 降为普通成员
    WatchPlayer = 7, // 查看成员
    Quit = 8, // 退出同盟
    Refuse = 9, // 拒绝
}

export class AllianceModel extends Laya.EventDispatcher{
    private static _ins:AllianceModel;
    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceModel();
        }
        return this._ins;
    }

    public allianceList: stAlliance[]; // 随机同盟列表
    public alliance: stAlliance; // 玩家的同盟信息
    public playerList: stAlliancePlayer[] = []; // 玩家所属同盟的玩家信息
    public applyList: stAlliancePlayer[] = [];
    public searchInfo: stAlliance;
    public bossInitRevc: AllianceBossInit_revc;
    public bossRankRevc: AllianceBossRankList_revc;
    public innerRankList: stAllianceInnerRankPlayer[] = [];
    public rankRewardState: number = 0;
    public bossFightNum: number = 0;
    public updatedShopItem: stAllianceShop;
    public shopList: stAllianceShop[] = [];
    public updatedShopCfgs: Configs.t_Alliance_Shop_dat[] = [];
    public position: AlliancePosition;
    public joinWaitSeconds: number = 0;
    public isMainViewOpened: boolean = false;
    public warRedState: boolean = false;

    public static SHOP_UPDATE = 'shop_update';
    public static BOSS_RANK_UPDATE = 'boss_rank_update';
    public static ALLIANCE_INFO_UPDATE = 'alliance_info_update';
    public static ALLIANCE_LIST_UPDATE = 'alliance_list_update';
    public static ALLIANCE_PLAYER_LIST_UPDATE = 'alliance_player_list_update';
    public static ALLIANCE_POSITION_UPDATE = 'alliance_position_update';
    public static ALLIANCE_APPLY_UPDATE = 'alliance_apply_update';
    public static UPDATE_BOSS_FIGHT_NUM = 'alliance_boss_update';
    public static BOSS_INFO_UPDATE = 'boss_info_update';
    public static INNER_RANK_UPDATE = 'inner_rank_update';
    public static ALLIANCE_FIGHT_STATE = 'alliance_fight_state';
    public static UPDATE_WAR_RED = 'UPDATE_WAR_RED';

    public refreshShopList(): void {
        const list = AllianceShopProxy.Ins.List as Configs.t_Alliance_Shop_dat[];
        const shopList = AllianceModel.Ins.shopList;
        for (const item of list) {
            const shopItem = shopList.find(o => o.fid === item.f_id);
            if (shopItem) {
                item['count'] = shopItem.count;
            }
        }
        AllianceModel.Ins.updatedShopCfgs = list;
    }

    public setPlayerPosition(): void {
        const playerList = AllianceModel.Ins.playerList;
        const playerId = MainModel.Ins.mRoleData.mPlayer.AccountId;
        const position = playerList.find(o => o.playerId === playerId)?.position;
        if (position === undefined) return;
        AllianceModel.Ins.position = position;
    }

    public getBossMonster(that?,func?){
        const bossRevc = AllianceModel.Ins.bossInitRevc;
        if (!bossRevc) return;
        const bossId = bossRevc.bossId;
        let cfg = AllianceBossAttributeProxy.Ins.getByBossId(bossId);
        let key = cfg.f_Res;
        let url = `o/spine/${key}/${key}`;
        let _avatar = AvatarFactory.createBossMonster(url,that,func);
        return _avatar;
    }

    public get subTime(){
        const bossRevc = AllianceModel.Ins.bossInitRevc;
        if (!bossRevc) return;
        let sub:number = bossRevc.closeUnix - TimeUtil.serverTime;
        return sub;
    }
    
    /**
     * 验证赤壁之战报名红点状态是否发生变化
     */
    public checkWarRedState() {
        // AllianceModel.Ins.warRedState = true;
        // AllianceModel.Ins.event(AllianceModel.UPDATE_WAR_RED);

        // 是否在报名时间
        const isEnrollTime = AllianceFightModel.Ins.warStatus === WarStatus.Enroll;
        // 是否报名
        const isEnrolled = AllianceFightModel.Ins.isEnrolled;
        // 成员数
        const num = AllianceModel.Ins.playerList.length;
        const conf = AllianceWarConfig.Ins.getCfg();
        // 是盟主及副盟主
        const hasEnrollRole = [AlliancePosition.President, AlliancePosition.VicePresident].indexOf(AllianceModel.Ins.position) !== -1;
        // 1、成员数量满足活动参加条件 盟主及副盟主
        let warRedState1 = isEnrollTime && !isEnrolled && (num >= conf.f_ApplyLimitNum) && hasEnrollRole;
        // 2、赤壁大战活动时间内
        let warRedState2 = isEnrolled && (AllianceFightModel.Ins.warStatus === WarStatus.Fight) && !AllianceFightModel.Ins.entered;
        // 3、开启奖励关卡，且拥有挑战次数则显示红点
        let warRedState3 = isEnrolled && (AllianceFightModel.Ins.warStatus === WarStatus.Reward) && AllianceFightModel.Ins.showRewardChapter;
        // 4、排行榜中奖励未领取
        let warRedState4 = (AllianceFightModel.Ins.myAllianceRewardState === 1) || (AllianceFightModel.Ins.myInnerRewardState === 1);
        let warRedState = warRedState1 || warRedState2 || warRedState3 || warRedState4;
        //if (warRedState !== AllianceModel.Ins.warRedState) {
            AllianceModel.Ins.warRedState = warRedState;
            AllianceModel.Ins.event(AllianceModel.UPDATE_WAR_RED);
        //}
        if (warRedState) {
            MainModel.Ins.funcSetRed(EFuncDef.Alliance,true);
        } else {
            MainModel.Ins.funcSetRed(EFuncDef.Alliance,false);
        }
    }
}
