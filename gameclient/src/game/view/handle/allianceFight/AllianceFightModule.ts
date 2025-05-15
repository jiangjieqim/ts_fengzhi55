import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { AllianceFightModel } from "./model/AllianceFightModel";
import { AllianceFightGCTZView } from "./view/AllianceFightGCTZView";
import { AllianceFightGCTZView1 } from "./view/AllianceFightGCTZView1";
import { AllianceFightGCView } from "./view/AllianceFightGCView";
import { AllianceFight56View } from "./view/AllianceFight56View";
import { AllianceFightBossDetailView } from "./view/AllianceFightBossDetailView";
import { AllianceFightEnrollView } from "./view/AllianceFightEnrollView";
import { AllianceFightHarmDetailView } from "./view/AllianceFightHarmDetailView";
import { AllianceFightRankView } from "./view/AllianceFightRankView";
import { AllianceFightRZView } from "./view/AllianceFightRZView";

import { AllianceFightRewardView } from "./view/AllianceFightRewardView";
import { AllianceWarSixBossProxy } from "./proxy/AllianceFightProxy";
import { MSGID } from "../../../network/MSGID";
import { AllianceWarCityPreview_revc, AllianceWarCityDetail_revc, AllianceWarInit_revc, AllianceWarTimeChange_revc, AllianceWarSignUp_revc, AllianceWarPsChange_revc, AllianceWarEnemyLife_revc, AllianceWarBossDamage_revc, AllianceWarAllianceRank_revc, AllianceWarInnerRank_revc, AllianceWarRewardRank_revc, AllianceWarGetRankReward_revc, AllianceWarCityLog_revc, AllianceWarPlayerDamage_revc, AllianceWarSkins_revc, AllianceWarRank_revc, AllianceWarBounsEnd_revc, AllianceWarCan_revc, AllianceWarBounsCan_revc, AlliancePlayerList_revc } from "../../../network/protocols/BaseProto";
import { AllianceFightAwardView } from "./view/AllianceFightAwardView";
import { AllianceFightJSAwardView } from "./view/AllianceFightJSAwardView";
import { AllianceFightAwardView1 } from "./view/AllianceFightAwardView1";
import { AllianceModel } from "../alliance/model/AllianceModel";
import { AllianceFightAwardView2 } from "./view/AllianceFightAwardView2";
import { AllianceFightMemberView } from "./view/AllianceFightMemberView";



export class AllianceFightModule extends BaseModel{
    private static _ins:AllianceFightModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new AllianceFightModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
       
    }

    public initMsg(){
        this.Reg(new AllianceFightGCView(EViewType.AllianceFightGCView));
        this.Reg(new AllianceFightGCTZView(EViewType.AllianceFightGCTZView));
        this.Reg(new AllianceFightGCTZView1(EViewType.AllianceFightGCTZView1));
        this.Reg(new AllianceFight56View(EViewType.AllianceFight56View));
        this.Reg(new AllianceFightBossDetailView(EViewType.AllianceFightBossDetailView));
        this.Reg(new AllianceFightEnrollView(EViewType.AllianceFightEnrollView));
        this.Reg(new AllianceFightHarmDetailView(EViewType.AllianceFightHarmDetailView));
        this.Reg(new AllianceFightRankView(EViewType.AllianceFightRankView));
        this.Reg(new AllianceFightRewardView(EViewType.AllianceFightRewardView));
        this.Reg(new AllianceFightRZView(EViewType.AllianceFightRZView));
        this.Reg(new AllianceFightAwardView(EViewType.AllianceFightAwardView));
        this.Reg(new AllianceFightJSAwardView(EViewType.AllianceFightJSAwardView));
        this.Reg(new AllianceFightAwardView1(EViewType.AllianceFightAwardView1));
        this.Reg(new AllianceFightAwardView2(EViewType.AllianceFightAwardView2));
        this.Reg(new AllianceFightMemberView(EViewType.AllianceFightMemberView));
    
        E.MsgMgr.AddMsg(MSGID.AllianceWarCityPreview, this.AllianceWarCityPreview,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarCityDetail, this.AllianceWarCityDetail,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarInit, this.onAllianceWarInit,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarTimeChange, this.onAllianceWarTimeChange,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarSignUp, this.onAllianceWarSignUp,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarPsChange, this.onAllianceWarPsChange,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarEnemyLife, this.onAllianceWarEnemyLife,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarBossDamage, this.onAllianceWarBossDamage,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarAllianceRank, this.onAllianceWarAllianceRank,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarInnerRank, this.onAllianceWarInnerRank,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarRewardRank, this.onAllianceWarRewardRank,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarGetRankReward, this.onAllianceWarGetRankReward,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarPlayerDamage, this.onAllianceWarPlayerDamage,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarCityLog, this.AllianceWarCityLog,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarSkins, this.AllianceWarSkins,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarRank, this.AllianceWarRank,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarBounsEnd, this.AllianceWarBounsEnd,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarCan, this.onAllianceWarCan,this);
        E.MsgMgr.AddMsg(MSGID.AllianceWarBounsCan, this.AllianceWarBounsCan,this);
        E.MsgMgr.AddMsg(MSGID.AlliancePlayerList, this.onAlliancePlayerList,this);
    }

    private onAlliancePlayerList(revc: AlliancePlayerList_revc) {
        AllianceFightModel.Ins.playerList = revc.playerList;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_PLAYER_LIST);
    }

    private onAllianceWarCan(revc: AllianceWarCan_revc) {
        if (revc.state) {
            E.ViewMgr.Open(EViewType.AllianceFight56View);
        }
    }

    //城池被占领预览(点击进入第二关页面)
    private AllianceWarCityPreview(value:AllianceWarCityPreview_revc){
        AllianceFightModel.Ins.awcpList = value.dataList;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATA_AWCP_VIEW);
    }

    //查看城池被占领详情
    private AllianceWarCityDetail(value:AllianceWarCityDetail_revc){
        AllianceFightModel.Ins.takeOverList = value.takeOverList;
        AllianceFightModel.Ins.awccList = value.dataList;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATA_AWCC_VIEW);
    }

    /**
     * 更新活动时间
     * @param value 
     */
    private onAllianceWarInit(value: AllianceWarInit_revc) {
        AllianceFightModel.Ins.timeList = value.times;
        AllianceFightModel.Ins.rank = value.allianceRank;
        AllianceFightModel.Ins.warStatus = value.clientState;
        AllianceModel.Ins.checkWarRedState();
    }

    /**
     * 更新活动状态
     * @param value 
     */
    private onAllianceWarTimeChange(value: AllianceWarTimeChange_revc) {
        AllianceFightModel.Ins.warStatus = value.clientState;
        AllianceFightModel.Ins.updateTimeList(value.times);
        AllianceModel.Ins.checkWarRedState();
    }

    /**
     * 更新玩家报名状态
     * @param value 
     */
    private onAllianceWarSignUp(value: AllianceWarSignUp_revc) {
        AllianceFightModel.Ins.isEnrolled = true;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_ENROLL);
        AllianceModel.Ins.checkWarRedState();
    }

    /**
     * 更新玩家体力
     * @param value 
     */
    private onAllianceWarPsChange(value: AllianceWarPsChange_revc) {
        AllianceFightModel.Ins.psCount = value.ps;
        AllianceFightModel.Ins.psUnix = value.unix;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_PS);
    }

    /**
     * 更新boss生命
     * @param value 
     */
    private onAllianceWarEnemyLife(value: AllianceWarEnemyLife_revc) {
        for (const item of value.dataList) {
            const boss = AllianceFightModel.Ins.bossLifeList.find(o => o.id === item.id);
            if (boss) {
                boss.life = item.life;
            } else {
                AllianceFightModel.Ins.bossLifeList.push(item);
            }
        }
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_BOSS_LIFE);
    }

    private onAllianceWarBossDamage(value: AllianceWarBossDamage_revc) {
        AllianceFightModel.Ins.bossHarmList = value.dataList;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_BOSS_HARM_DETAIL);
    }

    private onAllianceWarAllianceRank(value: AllianceWarAllianceRank_revc) {
        AllianceFightModel.Ins.allianceRankList = value.dataList;
        AllianceFightModel.Ins.myAllianceRankVal = value.my;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_ALLIANCE_RANK);
    }

    private onAllianceWarInnerRank(value: AllianceWarInnerRank_revc) {
        AllianceFightModel.Ins.innerRankList = value.dataList;
        AllianceFightModel.Ins.myInnerRankVal = value.my;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_INNER_RANK);
    }
    
    private onAllianceWarRewardRank(value: AllianceWarRewardRank_revc) {
        AllianceFightModel.Ins.rewardRankList = value.dataList;
        AllianceFightModel.Ins.myRewardRankVal = value.my;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_REWARD_RANK);
    }

    private onAllianceWarGetRankReward(value: AllianceWarGetRankReward_revc) {
        if (value.flag === 1) {
            AllianceFightModel.Ins.myAllianceRewardState = value.state;
        } else if (value.flag === 2) {
            AllianceFightModel.Ins.myInnerRewardState = value.state;
        }
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_REWARD_STATE);
        AllianceModel.Ins.checkWarRedState();
    }

    //赤壁大战据点日志
    private AllianceWarCityLog(value:AllianceWarCityLog_revc){
        AllianceFightModel.Ins.logList = value.dataList;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_LOG);
    }

    private onAllianceWarPlayerDamage(value: AllianceWarPlayerDamage_revc) {
        AllianceFightModel.Ins.totalHarm = value.damage;
        if (value.bossId) {
            const conf = AllianceWarSixBossProxy.Ins.GetDataById(value.bossId) as Configs.t_Alliance_War_SixBoss_dat;
            const bossLife = (AllianceFightModel.Ins.parseAttrList(conf?.f_attribute || '')).find(o => o.equipAttrId === 10003)?.attrValue || 0;
            let rate = 0;
            if (bossLife) {
                rate = Number((value.damage / bossLife * 100).toFixed(1));
            }
            AllianceFightModel.Ins.totalHarmPercent = rate;
        } else {
            AllianceFightModel.Ins.totalHarmPercent = undefined;
        }
    }

    //赤壁大战过奖励关卡同盟内玩家形象
    private AllianceWarSkins(value:AllianceWarSkins_revc){
        AllianceFightModel.Ins.skinList = value.dataList;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_SKIN);
    }

    //上一次同盟排行返回
    private AllianceWarRank(value:AllianceWarRank_revc){
        AllianceFightModel.Ins.rank = value.rank;
        AllianceFightModel.Ins.event(AllianceFightModel.UPDATE_RANK);
        AllianceModel.Ins.checkWarRedState();
    }

    //奖励关卡结束请求
    private AllianceWarBounsEnd(value:AllianceWarBounsEnd_revc){
        E.ViewMgr.Open(EViewType.AllianceFightJSAwardView,null,value);
    }

    //奖励关卡点击请求
    private AllianceWarBounsCan(value:AllianceWarBounsCan_revc){
        if(value.code == 0){
            E.ViewMgr.Close(EViewType.AllianceFightAwardView1);
            E.ViewMgr.Open(EViewType.AllianceFightAwardView);
        }else if(value.code == 1){
            E.ViewMgr.ShowMidError("已参与奖励关");
        }
    }
}