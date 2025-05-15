import { stSmashFight, stSmashFightResult, stSmashTopWinner } from "../../../../network/protocols/BaseProto";
import { EFuncDef } from "../../main/model/EFuncDef";
import { TaskModel } from "../../main/model/TaskModel";

export class DaLuanDouModel extends Laya.EventDispatcher{
    private static _ins: DaLuanDouModel;
    
    public static get Ins() {
        if (!this._ins) {
            this._ins = new DaLuanDouModel();
        }
        return this._ins;
    } 

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_VIEW_BM:string = "UPDATA_VIEW_BM";
    public static UPDATA_VIEW_SEVER:string = "UPDATA_VIEW_SEVER";
    public static DA_LUAN_DOU_RED:string = "DA_LUAN_DOU_RED";

    public isEnroll:number;//是否报名 0 未报名 1已报名
    public isReward:number;//是否有可以的领取的奖励 0 没有 1有
    public openType:number;//活动状态 1报名阶段 2战斗阶段 3结束阶段
    public smashFightList:stSmashFight[];//当前大乱斗战斗结果列表
    public smashTopWinnerList:stSmashTopWinner[];//当前大乱斗前三强信息列表
    public fightResult:stSmashFightResult;//当前玩家的战斗情况
    public round:number;//大乱斗轮次（0表示第一轮）
    public crossServers:number[];
    public startTime:number;

    public isDotMain(){
        if(TaskModel.Ins.isFuncOpen(EFuncDef.DaLuanDou)){
            if(this.isEnrollBM() || this.isRewardR()){
                return true;
            }
        }
        return false;
    }

    public isEnrollBM(){
        if(this.openType == 1 && this.isEnroll == 0){
            return true;
        }
        return false;
    }

    public isRewardR(){
        if(this.isReward == 1){
            return true;
        }
        return false;
    }
}