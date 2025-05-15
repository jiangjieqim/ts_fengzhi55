import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceWarGetRankRewardState_req, AllianceWarRank_req, stAlliancePlayer, stAllianceWarAllianceRank, stAllianceWarCityContent, stAllianceWarCityLog, stAllianceWarCityPreview, stAllianceWarCityTakeOver, stAllianceWarInnerRank, stAllianceWarLife, stAllianceWarRewardRank, stAllianceWarTime, stBossDamage, stSkin } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceWarConfig } from "../proxy/AllianceFightProxy";

/**
 * 赤壁大战的状态
 */
export enum WarStatus {
    Close = 0, // 活动未开启
    Enroll = 1, // 报名时间
    EnrollEnd = 2, // 报名结束
    Fight = 3, // 战斗时间
    FightEnd = 4, // 战斗结束
    Reward = 5, // 奖励关卡时间
    RewardEnd = 6, // 奖励关卡结束
}

export class AllianceFightModel extends Laya.EventDispatcher{
    private static _ins: AllianceFightModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new AllianceFightModel();
        }
        return this._ins;
    } 

    public static UPDATA_AWCP_VIEW:string = "UPDATA_AWCP_VIEW";//更新攻城据点
    public static UPDATA_AWCC_VIEW:string = "UPDATA_AWCC_VIEW";//更新攻城据点详情
    public static UPDATE_ENROLL:string = 'UPDATE_ENROLL';//更新玩家报名状态
    public static UPDATE_PS:string = 'UPDATE_PS';//更新玩家体力
    public static UPDATE_BOSS_LIFE:string = 'UPDATE_BOSS_LIFE';//更新boss血量
    public static UPDATE_BOSS_HARM_DETAIL:string = 'UPDATE_BOSS_HARM_DETAIL';//更新boss伤害列表
    public static UPDATE_ALLIANCE_RANK:string = 'UPDATE_ALLIANCE_RANK';//更新联盟排行
    public static UPDATE_INNER_RANK:string = 'UPDATE_INNER_RANK';//更新盟内排行
    public static UPDATE_REWARD_RANK:string = 'UPDATE_REWARD_RANK';//更新特殊排行
    public static UPDATE_REWARD_STATE:string = 'UPDATE_REWARD_STATE';//更新奖励状态
    public static UPDATE_LOG:string = 'UPDATE_LOG';
    public static UPDATE_SKIN:string = 'UPDATE_SKIN';
    public static UPDATE_RANK:string = 'UPDATE_RANK';
    public static UPDATE_PLAYER_LIST:string = 'UPDATE_PLAYER_LIST';

    public awcpList:stAllianceWarCityPreview[];//攻城据点
    public awccList:stAllianceWarCityContent[];//攻城据点详情
    public takeOverList:stAllianceWarCityTakeOver[];

    public timeList: stAllianceWarTime[] = []; // 赤壁大战报名时间、赤壁大战、奖励关卡活动时间
    public isEnrolled: boolean = false; // 玩家是否报名了赤壁之战
    public psCount: number = 0;// 体力值
    public psUnix: number = 0;// 玩家体力恢复时间戳
    public bossLifeList: stAllianceWarLife[] = [];//过五关斩六将boss血量
    public bossHarmList: stBossDamage[] = []; //赤壁大战boss的伤害信息列表
    public allianceRankList: stAllianceWarAllianceRank[] = []; // 排行-联盟排行列表
    public innerRankList: stAllianceWarInnerRank[] = []; // 排行-盟内排行列表
    public rewardRankList: stAllianceWarRewardRank[] = []; // 排行-特殊排行列表
    public myAllianceRankVal: stAllianceWarAllianceRank; // 当前玩家的联盟排行
    public myInnerRankVal: stAllianceWarInnerRank; // 当前玩家的盟内排行
    public myRewardRankVal: stAllianceWarRewardRank; // 当前玩家的特殊排行
    public myAllianceRewardState: number = 0; // 玩家联盟排行奖励状态
    public myInnerRewardState: number = 0; // 玩家盟内排行奖励状态
    public logList:stAllianceWarCityLog[];
    public totalHarm: number = 0; // 玩家过五关斩六将一次战斗的总伤害
    public totalHarmPercent: number = 0; // 玩家过五关斩六将一次战斗的总伤害占比
    public skinList:stSkin[];
    public rank:number;//联盟战排名
    public entered: boolean = false;//玩家是否进入活动（判断活动红点）
    public warStatus: WarStatus = WarStatus.Close;// 当前处于活动的哪个状态
    public playerList: stAlliancePlayer[] = [];
    public selectedAlliance: { name: string, uid: number, rank: number } = null;
    /**
     * 更新活动时间
     * @param times 
     */
    public updateTimeList(times: stAllianceWarTime[]) {
        for (const time of times) {
            let index = AllianceFightModel.Ins.timeList.findIndex(o => o.type === time.type);
            if (index === -1) {
                AllianceFightModel.Ins.timeList.push(time);
            } else {
                AllianceFightModel.Ins.timeList[index] = time;
            }
        }
        let warStatus = this.warStatus;
        if(warStatus == WarStatus.Reward){
            let req:AllianceWarRank_req = new AllianceWarRank_req;
            SocketMgr.Ins.SendMessageBin(req);
            let reqq:AllianceWarGetRankRewardState_req = new AllianceWarGetRankRewardState_req;
            SocketMgr.Ins.SendMessageBin(reqq);
        }
    }

    /**
     * 获取当前时间是哪个活动节点
     */
    // public get warStatus(): WarStatus {
    //     const timeList = AllianceFightModel.Ins.timeList;
    //     if (!timeList.length) {
    //         return WarStatus.Close;
    //     }
    //     const enroll = timeList.find(o => o.type === 4);
    //     const fight = timeList.find(o => o.type === 5);
    //     const reward = timeList.find(o => o.type === 6);
    //     const time = TimeUtil.serverTime;
    //     const arr = [enroll, fight, reward];
    //     const status = [[WarStatus.Enroll, WarStatus.EnrollEnd], [WarStatus.Fight, WarStatus.FightEnd], [WarStatus.Reward, WarStatus.RewardEnd]];
    //     for (let i = 0; i < arr.length; i++) {
    //         const item = arr[i];
    //         const nextItem = arr[i + 1];
    //         if (time >= item.beginUnix && time < item.endUnix) {
    //             return status[i][0];
    //         } else if (time >= item.endUnix) {
    //             if (nextItem) {
    //                 if (time < nextItem.beginUnix) {
    //                     return status[i][1];
    //                 }
    //             } else {
    //                 return status[i][1];
    //             }
    //         }
    //     }
    //     return WarStatus.RewardEnd;
    // }

    /**
     * 获取玩家是否通关过五关斩六将
     * @returns 
     */
    public get passLevel1(): boolean{
        return AllianceFightModel.Ins.bossLifeList.every(o => o.life <= 0);
    }

    /**
     * 显示主页
     */
    public showMainPage() {
        // 直接显示报名页面
        E.ViewMgr.Open(EViewType.AllianceFightEnrollView);

        // const warStatus = AllianceFightModel.Ins.warStatus;
        // //test
        // if ((warStatus === WarStatus.Fight) && AllianceFightModel.Ins.isEnrolled) {
        //     // 活动开始时间，且玩家报名了
        //     //E.ViewMgr.Open(EViewType.AllianceFight56View);
        //     const req = new AllianceWarEnterActivity_req();
        //     req.type = 1;
        //     SocketMgr.Ins.SendMessageBin(req);
        // } else if (warStatus !== WarStatus.Close) {
        //     // 其他时间都显示报名页面
        //     E.ViewMgr.Open(EViewType.AllianceFightEnrollView);
        // }
    }

    /**
     * 玩家是否获取前三名（可展示奖励关卡）
     */
    public get showRewardChapter(): boolean {
        if(this.rank > 0 && this.rank < 4){
            return true;
        }
        return false;
    }

    public get enrollSubTime(){
        const time = AllianceFightModel.Ins.getWarStatusUnix(WarStatus.Enroll, 'End');
        let sub:number = time - TimeUtil.serverTime;
        return sub;
    } 

    public get rewardSubTime(){
        const time = AllianceFightModel.Ins.getWarStatusUnix(WarStatus.Reward, 'End');
        let sub:number = time - TimeUtil.serverTime;
        return sub;
    }

    public get fightSubTime(){
        let time = AllianceFightModel.Ins.getWarStatusUnix(WarStatus.Fight, 'Begin');
        if (time < TimeUtil.serverTime) {
            time += 86400 * 7;
        }
        let sub:number = time - TimeUtil.serverTime;
        return sub;
    } 

    public getWarStatusUnix(warStatus: WarStatus, type: 'Begin' | 'End') {
        const timeList = AllianceFightModel.Ins.timeList;
        const m = new Map([
            [WarStatus.Enroll, 1],
            [WarStatus.Fight, 2],
            [WarStatus.Reward, 3],
        ]);
        return timeList.find(o => o.type === m.get(warStatus))?.[type === 'Begin' ? 'beginUnix' : 'endUnix'] || 0;
    }

    public parseAttrList(equipAttrValue: string): { equipAttrId: number, attrValue: number }[] {
        if (!equipAttrValue) {
            return [];
        }
        const arr = equipAttrValue.split('|');
        return arr.map(o => {
            const [equipAttrId, attrValue] = o.split(':');
            return { equipAttrId: Number(equipAttrId) || 0, attrValue: Number(attrValue) || 0 };
        });
    }

    //攻城战结束时间
    public get gctzSubTime(){
        const time = AllianceFightModel.Ins.getWarStatusUnix(WarStatus.Fight, 'End');
        let sub:number = time - TimeUtil.serverTime;
        return sub;
    }
}