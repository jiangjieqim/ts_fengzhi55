import { stGeXuQiPaoPack, stGeXuQiPaoShop, stGeXuQiPaoTask } from "../../../../network/protocols/BaseProto";
import { RADrawEventPackProxy } from "../proxy/GeXuQiPaoProxy";

export class GeXuQiPaoModel extends Laya.EventDispatcher{
    private static _ins: GeXuQiPaoModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new GeXuQiPaoModel();
        }
        return this._ins;
    } 

    public taskList:stGeXuQiPaoTask[];
    public packList:stGeXuQiPaoPack[];
    public shopList:stGeXuQiPaoShop[];
    public refreshUnix:number;//任务/礼包的刷新时间戳（秒）
    public endUnix:number;//活动结束时间戳（秒）

    public jcList:number[];

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_XL_VIEW:string = "UPDATA_XL_VIEW";

    public isDotMain(){
        if(this.isDotTask() || this.isDotLB()){
            return true;
        }
        return false;
    }

    public isDotTask(){
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

    public isDotLB(){
        if(!this.packList){
            return false;
        }
        for(let i:number=0;i<this.packList.length;i++){
            let cfg:Configs.t_RecurringActivity_DrawEvent_Pack_dat = RADrawEventPackProxy.Ins.GetDataById(this.packList[i].fid);
            if(cfg.f_PackType == 1){
                if(this.packList[i].count < cfg.f_PackBuyLimit){
                    return true;
                }
            }
        }
        return false;
    }
}