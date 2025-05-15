import { stPalaceBuff, stPalaceEnemy, stPalacePlayer, stPalaceShopItem } from "../../../../network/protocols/BaseProto";
import { EFuncDef } from "../../main/model/EFuncDef";
import { TaskModel } from "../../main/model/TaskModel";

export class WuShenDianModel extends Laya.EventDispatcher{
    private static _ins: WuShenDianModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WuShenDianModel();
        }
        return this._ins;
    } 

    public static RED_TIP = "RED_TIP";

    public static UPDATA_VIEW = "UPDATA_VIEW";
    public static UPDATA_SHENHUN_VIEW = "UPDATA_SHENHUN_VIEW";
    public static UPDATA_RANK_VIEW = "UPDATA_RANK_VIEW";
    public static UPDATA_RANKAWARD_VIEW = "UPDATA_RANKAWARD_VIEW";
    public static UPDATA_SHOP_VIEW = "UPDATA_SHOP_VIEW";
    public static UPDATA_SHOPGM_VIEW = "UPDATA_SHOPGM_VIEW";

    public gkId:number;//玩家当前挑战关卡id
    public enemyList:stPalaceEnemy[];//当前关卡的敌人信息列表
    public power:number = 1;//敌人总战力
    public attrList:number[];//属性id（阵容特性）
    public ranking:number;//玩家当前的排名
    public rankingSettle:number;//玩家上次结算排名奖励时的排名
    public rankRewardState:number;//周排名奖励领取状态 0无奖励 1未领取 2已领取
    public refreshUnix:number;//武魂的刷新倒计时
    public rewardUnix:number;//领奖倒计时
    public buffList:stPalaceBuff[];//神魂列表
    public coreBuffList:number[];//已解锁的全部核心神魂列表（t_Palace_Data_Buff.xlsx的f_id，当栏位上没有神魂时传0）
    public selBuffList:stPalaceBuff[];//选择神魂列表
    public selCoreBuffList:number[];
    public rankList:stPalacePlayer[];//武神殿排行榜
    public myStarRank:stPalacePlayer;
    public state:number;//0不是首通 1显示首通奖励
    public refreshTimes:number;//玩家刷新神魂的次数
    public tongguan:number;//0未通关 1已通关
    
    public itemList:stPalaceShopItem[];
    public shopRefreshUnix:number;//商店倒计时
    public itemNum:number;//本周获取得神魂碎片数量
    public isKs:boolean; //是否是快速挑战

    public isRedTip(){
        if(!TaskModel.Ins.isFuncOpen(EFuncDef.WuShenDian)){
            return false;
        }
        if(this.isRankAwardRedTip()){
            return true;
        }
        return false;
    }

    public isRankAwardRedTip(){
        if(this.rankRewardState == 1){
            return true;
        }
        return false;
    } 
}