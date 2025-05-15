import { stCellValue, stPeakJjcAvatar, stSilkBag, stStarBattleEnemy, stStarBattleLog, stStarGoods, stStarRank } from "../../../../network/protocols/BaseProto";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { ECellType } from "../../main/vos/ECellType";
import { StarConfigProxy } from "../proxy/xxzdxProxy";

export class XXZDZModel extends Laya.EventDispatcher{
    private static _ins: XXZDZModel;

    public static UPDATA_VIEW = "UPDATA_VIEW";
    public static UPDATA_ZHUANPAN_VIEW = "UPDATA_ZHUANPAN_VIEW";
    public static UPDATA_TIAOZHAN_VIEW = "UPDATA_TIAOZHAN_VIEW";
    public static UPDATA_RIZHI_VIEW = "UPDATA_RIZHI_VIEW";
    public static UPDATA_RANK_VIEW = "UPDATA_RANK_VIEW";
    public static UPDATA_RANKAWARD_VIEW = "UPDATA_RANKAWARD_VIEW";
    public static UPDATA_SHOP_VIEW = "UPDATA_SHOP_VIEW";

    public static RED_TIP = "RED_TIP"; 

    public wheelNum:number;//上一次转盘所在的位置，对应t_Star_Wheel.xlsx的f_id
    public keyRecoveryUnix:number;//钥匙下次恢复的时间戳,0标识钥匙数量是满的
    public ranking:number;//玩家角色当前的排行;
    public rankingSettle:number;//上个结算时间的排名 0显示无排名
    public starNum:number;//玩家当前星星数量,数量变化3421
    public rewardList:stCellValue[];//星星争夺战排名奖励,长度最多1, 长度为0标识已领取
    public silkBags:stSilkBag[];//当前拥有的锦囊信息,变化走3423
    public starPercent:number;//获得星星数量的百分比,默认是15,当敌方有空城计锦囊时候是10
    public rankRewardState:number;//奖励 0不可领取 1可领取,变化走3433
    public starGoods:stStarGoods[];//星星争夺战商品购买的数量,变化走3436
    public goodsFreshUnix:number;//商店物品刷新的时间戳

    public starRankList:stStarRank[];//星星争夺战前50名的信息
    public myStarRank:stStarRank[];//当前玩家自己在星星争夺战的排名 长度=0则没有,最大长度为1
    public peakJjcAvatar:stPeakJjcAvatar[];//前3名形象
    public rewardUnix:number;//奖励时间戳

    public rizhiList:stStarBattleLog[];//星星争夺战日志列表
    public starBEList:stStarBattleEnemy[];//刷新对手的列表

    public isFight:boolean = false;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new XXZDZModel();
        }
        return this._ins;
    } 

    public isRedTip(){
        if(!TaskModel.Ins.isFuncOpen(EFuncDef.XXZDZ)){
            return false;
        }
        if( this.isRankAwardRedTip() || this.isAwardRedTip() || this.isZhuanPanRedTip()){
            return true;
        }
        return false;
    }

    public isRankAwardRedTip(){
        if(this.rankRewardState){
            return true;
        }
        return false;
    }

    public isAwardRedTip(){
        if(this.rewardList && this.rewardList.length){
            return true;
        }
        return false;
    }

    public isZhuanPanRedTip(){
        let val = MainModel.Ins.mRoleData.getVal(ECellType.JGYS);
        let max =  StarConfigProxy.Ins.GetDataById(1).f_keymax;
        if(val >= max){
            return true;
        }
        return false;
    }
}