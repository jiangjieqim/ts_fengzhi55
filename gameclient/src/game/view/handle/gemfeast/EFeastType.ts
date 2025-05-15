import { stActivityNum, stActivityRecord, stPeakJjcAvatar } from "../../../network/protocols/BaseProto";

export enum EFeastType {
    /**
     * 坐骑盛宴
     */
    Ride = 1,
    /*
     * 2宝石盛宴
     */
    Gem = 2,
    
    /**副将盛宴 */
    FuJiang = 3,

    /**灵宠盛宴 */
    Pet = 4,
    /**神兵盛宴 */
    ShenBin = 5,
}
export interface IFeastInitVo {
    type: number;

    /*自己的抽奖记录(最多给最新100条)*/
    selfRecords: stActivityRecord[];

    /*活动期间内的累计充值,单位分*/
    totalCnt: number;

    /*已领取的t_Alternation_Recharge.xlsx的f_id(活动期间内累充的金额奖励)*/
    rewardList: number[];
}
export interface IActivityNums {
    /*1坐骑盛宴 2宝石盛宴...*/
    type: number;

    /*抽取次数前200名列表*/
    dataList: stActivityNum[];

    /*当前玩家自己抽取次数+排名 长度=0则没有,最大长度为1*/
    self: stActivityNum[];

    /*前3名形象*/
    top3: stPeakJjcAvatar[];
}