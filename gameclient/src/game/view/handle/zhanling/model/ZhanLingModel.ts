import { stBattlePassCard, stBattlePassPack, stBattlePassTask } from "../../../../network/protocols/BaseProto";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { EventGamePassConfigProxy, EventGamePassMonthProxy, EventGamePassWeekProxy } from "../proxy/ZhanLingProxy";

export class ZhanLingModel extends Laya.EventDispatcher{
    private static _ins:ZhanLingModel;
    public static get Ins(){
        if(!this._ins){
            this._ins = new ZhanLingModel();
        }
        return this._ins;
    }

    public monthPoint:number;//玩家当前的战令月卡积分
    public monthList:stBattlePassCard[];
    public monthPaid:number;//0未购买 1已购买
    public monthRound:number;//展示第几轮的奖励
    public monthEndTime:number;//活动重置时间戳（秒）

    public weekPoint:number;//玩家当前的战令周卡积分
    public weekList:stBattlePassCard[];
    public weekPaid:number;//0未购买 1已购买
    public weekRound:number;//展示第几轮的奖励
    public weekEndTime:number;//活动重置时间戳（秒）

    public taskList:stBattlePassTask[];
    public taskEndTime:number;//活动重置时间戳（秒）

    public lbNum:number;//待领取的次数（客户端显示的数字）
    public lbEndTime:number;
    public lbRreeState:number;//免费奖励是否领取，0未领取 1已领取
    public lbList:stBattlePassPack[];

    public static UPDATA_VIEW_MW:string = "UPDATA_VIEW_MW";
    public static UPDATA_VIEW_MONTH:string = "UPDATA_VIEW_MONTH";
    public static UPDATA_VIEW_WEEK:string = "UPDATA_VIEW_WEEK";
    public static UPDATA_VIEW_TASK:string = "UPDATA_VIEW_TASK";
    public static UPDATA_VIEW_LB:string = "UPDATA_VIEW_LB";

    public isDotMain(){
        if(MainModel.Ins.isOpenByFuncId(EFuncDef.ZhanLing.toString())){
            if(this.isDotTab1() || this.isDotTab2() || this.isDotTab3() || this.isDotTab4()){
                return true;
            }
        }
        return false;
    }

    public isDotTab1(){
        for(let i:number=0;i<this.monthList.length;i++){
            let cfg:Configs.t_Event_GamePass_Month_dat = EventGamePassMonthProxy.Ins.GetDataById(this.monthList[i].fid);
            if(this.monthList[i].state == 0){
                if(this.monthPoint >= cfg.f_Point){
                    return true;
                }
            }else if(this.monthList[i].state == 1){
                if(this.monthPaid){
                    return true;
                }
            }
        }
        return false;
    }

    public isDotTab2(){
        for(let i:number=0;i<this.weekList.length;i++){
            let cfg:Configs.t_Event_GamePass_Week_dat = EventGamePassWeekProxy.Ins.GetDataById(this.weekList[i].fid);
            if(this.weekList[i].state == 0){
                if(this.weekPoint >= cfg.f_Point){
                    return true;
                }
            }else if(this.weekList[i].state == 1){
                if(this.weekPaid){
                    return true;
                }
            }
        }
        return false;
    }

    public isDotTab3(){
        for(let i:number=0;i<this.taskList.length;i++){
            if(this.taskList[i].state == 1){
                return true;
            }
        }
        return false;
    }

    public isDotTab4(){
        if(!this.lbRreeState){
            return true;
        }
        let cfg = EventGamePassConfigProxy.Ins.GetDataById(1);
        if(this.lbNum >= cfg.f_ConditionTimes){
            return true;
        }
        return false;
    }

    public setMonthList(value:stBattlePassCard[]){
        this.monthList = value;
        this.monthList.sort(this.onSortMonth);
    }

    public onSortMonth(a:stBattlePassCard,b:stBattlePassCard){
        let cfgA = EventGamePassMonthProxy.Ins.GetDataById(a.fid);
        let cfgB = EventGamePassMonthProxy.Ins.GetDataById(b.fid);
        return cfgA.f_Sort - cfgB.f_Sort;
    }

    public setWeekList(value:stBattlePassCard[]){
        this.weekList = value;
        this.weekList.sort(this.onSortWeek);
    }

    public onSortWeek(a:stBattlePassCard,b:stBattlePassCard){
        let cfgA = EventGamePassWeekProxy.Ins.GetDataById(a.fid);
        let cfgB = EventGamePassWeekProxy.Ins.GetDataById(b.fid);
        return cfgA.f_Sort - cfgB.f_Sort;
    }

    public getTaskNum(){
        let num = 0;
        for(let i:number=0;i<this.taskList.length;i++){
            if(this.taskList[i].state == 2){
                num ++;
            }
        }
        return num;
    }
}