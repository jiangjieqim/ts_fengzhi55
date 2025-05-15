import { ui } from "../../../../../ui/layaMaxUI";
import { JjcBuyFightCnt_revc, JjcInfo_revc, JjcMoneyUpdate_revc, stCellValue, stJjcLog, stJjcPlayer } from "../../../../network/protocols/BaseProto";
import { JjcModel } from "../../jjc/JjcModel";
import { EJjcRewadShow, EJjcRewadShowStatus } from "../../jjc/vos/JjcType";
import { EServerFightType } from "../../main/vos/ECellType";
import { PeakJjcModel } from "./PeakJjcModel";

export interface IJjcMainView {
    timetf: Laya.Label;
    close1: Laya.Image;
    tf6: Laya.Label;
    list1: Laya.List;
    owner: ui.views.jjc.ui_jjc_owner_itemUI;
    tiaozhan: Laya.Image;
    leftbtn: Laya.Image;
    rightbtn: Laya.Image;
    fightbtn: Laya.Image;
    tf9:Laya.Label;
}

export class EJjcType{
    /**竞技场 */
    static JJC = 0;
    /**巅峰竞技场 */
    static Peak = 1;
}

export function getJjcModel(type:number):IJJC_Model{
    return type == EServerFightType.JJC || type == EServerFightType.XXZDZ || type == EServerFightType.ScoreJJC ? JjcModel.Ins : PeakJjcModel.Ins;
}

/**竞技场,巅峰竞技场接口 */
export interface IJJC_Model extends Laya.EventDispatcher{
    tickEndTime:number;
    preRewardList:stCellValue[];

    /**是否在有效时间内 */
    isTimeOpen:boolean;

    playerList: stJjcPlayer[];//竞技场列表
    fightPlayers: stJjcPlayer[];//挑战列表
    //日周领取状态
    dayStatus: EJjcRewadShowStatus;
    loglist: stJjcLog[];//竞技场日志

    baseInfo: JjcInfo_revc;
    moneyDataRevc: JjcMoneyUpdate_revc;

    fightBuyRevc: JjcBuyFightCnt_revc;
    /**竞技场是否已经激活 */
    isEnable: boolean;
    todayRank: number;//当天排名

    /**挑战成功的时候可以获得的奖品列表 */
    succeedRewardList: stCellValue[];
    /**竞技场剩余刷新的次数 */
    surplusRefreshCount: number;
    /**
     * 当前周排名
     */
    curWeekRank: number;
    /**名次下降引发的红点 */
    mDropRed: boolean;
    /**
     * 0不可领 1可领取 2已领取
     */
    weekRewardStatus: number;
    weekRefreshTime: number;

    ownerPlayer: stJjcPlayer;

    curCfg: Configs.t_Arena_config_dat;

    realPrice:string;

    /**竞技场的刷新次数上限 */
    refreshTotalCnt: number;

    /**刷新次数上限 */
    cfgFightRefreshMax: number;

    /**每日竞技金币上限 */
    f_MoneyMaximum;

    /**剩余挑战次数总次数*/
    fightTotalCnt: number;

    buyFightTime(playerId:number);

    /**剩余挑战次数免费次数*/
    freefightCnt: number;

    /**已经购买了的次数 */
    hasAlreadyBuyCnt: number;

    /**当日已经获得金币 */
    dayMoneyVal: number;

    /**竞技场的结束时间戳*/
    endTime: number;

    getWeekRewardEndTime(): number;

    getDayRewardEndTime(): number;


    /**主动刷新 */
    refreshPlayerList();

    getRedByType(type: EJjcRewadShow): boolean;


    /**
     * 是否需要挑战红点
     */
    mFightRed: boolean;

    mRed: boolean;

    updateRed();

    /**
     * 拉去竞技场列表
     */
    reqJjcList();

    /**刷新列表 */
    reqRefreshList();

    /**挑战 */
    fight(id);

    /**获取日志 */
    reqlog();

    reqGain(type:number);
    reqWeekInfo();

    getRewardCfgList(type:EJjcRewadShow);
    /**竞技场类型 */
    getType():EJjcType;

    redId: number;

    hasScore:boolean;

    selfScore:number;

    getRefreshPrice(refreshCount: number);
}