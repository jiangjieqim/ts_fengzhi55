import { stMonopolyMapInfo, stMonopolyPack, stMonopolyTask } from "../../../../network/protocols/BaseProto";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { MonopolyPackProxy } from "../proxy/MonopolyProxy";

export class MonopolyModel extends Laya.EventDispatcher{
    private static _ins: MonopolyModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new MonopolyModel();
        }
        return this._ins;
    } 

    public type:number;//"当前开启的活动子id（t_Pack_Controller的f_p2，1主公游历）
    public mapList:stMonopolyMapInfo[];//玩家游历地图数据（全部地图的数据）
    public taskList:stMonopolyTask[];
    public packList:stMonopolyPack[];
    public refreshUnix:number;//任务/礼包的刷新时间戳（秒）
    public endUnix:number;//活动结束时间戳（秒）

    public static UPDATA_VIEW_MAP:string = "UPDATA_VIEW_MAP";
    public static UPDATA_VIEW_TASK:string = "UPDATA_VIEW_TASK";
    public static UPDATA_VIEW_PACK:string = "UPDATA_VIEW_PACK";
    public static UPDATA_AWARD:string = "UPDATA_AWARD";

    public isRedTip(){
        if(MainModel.Ins.isOpenByFuncId(EFuncDef.Monopoly.toString())){
            if(this.isRedTab1() || this.isRedTab2()){
                return true;
            }
        }
        return false;
    }

    public isRedTab1(){
        if(this.isRedLBTip()){
            return true;
        }
        return false;
    }

    public isRedTab2(){
        if(!this.taskList){
            return false;
        }
        for(let i:number=0;i<this.taskList.length;i++){
            if(this.taskList[i].state == 1){
                return true;
            }
        }
        return false;
    }

    public isRedLBTip(){
        if(!this.packList){
            return false;
        }
        for(let i:number=0;i<this.packList.length;i++){
            let cfg:Configs.t_Monopoly_Pack_dat = MonopolyPackProxy.Ins.GetDataById(this.packList[i].fid);
            if(cfg.f_PackType == 1){
                if(this.packList[i].count < cfg.f_PackBuyLimit){
                    return true;
                }
            }
        }
        return false;
    }
}