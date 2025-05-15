import { stSevenTask } from "../../../../network/protocols/BaseProto";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { SevenDaysPackProxy, SevenDaysStageRewardsProxy, SevenDaysTaskProxy } from "../proxy/ServerTaskProxy";

export class ServerTaskModel extends Laya.EventDispatcher{
    private static _ins: ServerTaskModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new ServerTaskModel();
        }
        return this._ins;
    } 

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_JIFEN_VIEW:string = "UPDATA_JIFEN_VIEW";

    public sevenTaskList:stSevenTask[] = [];
    public sevenTaskDay:number;
    public sevenTaskAwardList:number[];

    public isServerTaskRedTip(){
        if(!MainModel.Ins.isOpenByFuncId(EFuncDef.ServerTask.toString())){
            return false;
        }
        if(this.isTabRedTip1() || this.isTabRedTip2() || this.isRedJinFenTip()){
            return true;
        }
        return false;
    }

    public isTabRedTip1(){
        if(this.isTaskRedTip()){
            return true;
        }
        return false;
    }

    public isTaskRedTip(){
        for(let i:number = 1;i<8;i++){
            if(this.isTaskRedTipByDay(i)){
                return true;
            }
        }
        return false;
    }

    public isTaskRedTipByDay(day:number){
        for(let i:number=0;i<this.sevenTaskList.length;i++){
            let cfg = SevenDaysTaskProxy.Ins.getCfgById(this.sevenTaskList[i].id);
            if(cfg.f_days == day && this.sevenTaskList[i].status == 2){
                return true;
            }
        }
        return false;
    }

    public isTabRedTip2(){
        let arr = SevenDaysPackProxy.Ins.List;
        for (let i: number = 0; i < arr.length; i++) {
            if (arr[i].f_purchaseid == 0) {
                let vo = ActivityModel.Ins.getVo(EActivityType.ServerTask);
                if (vo) {
                    let voo = vo.vo.datalist.find(item => item.id == arr[i].f_id);
                    if (voo) {
                        if (voo.param1 < arr[i].f_buytimes) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public isRedJinFenTip(){
        let arr = SevenDaysStageRewardsProxy.Ins.List;
        for (let i: number = 0; i < arr.length; i++) {
            if(this.sevenTaskAwardList.indexOf(arr[i].f_id) == -1){
                if(this.getSorce() >= arr[i].f_stagepoint){
                    return true;
                }
            }
        }
        return false;
    }

    public getSorce(){
        let num = 0;
        for(let i:number=0;i<this.sevenTaskList.length;i++){
            if(this.sevenTaskList[i].status == 1){
                let cfg = SevenDaysTaskProxy.Ins.getCfgById(this.sevenTaskList[i].id);
                num += cfg.f_Points;
            }
        }
        return num;
    }
}