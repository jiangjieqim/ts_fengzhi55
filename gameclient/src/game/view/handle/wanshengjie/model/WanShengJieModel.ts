import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { WanShengJieProxy } from "../proxy/WanShengJieProxy";

export class WanShengJieModel extends Laya.EventDispatcher{
    private static _ins: WanShengJieModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WanShengJieModel();
        }
        return this._ins;
    } 

    public static UpdataView:string = "UpdataView";

    public totalCnt:number;
    public rewardList:number[];

    public isRedTip(){
        if(MainModel.Ins.isOpenByFuncId(EFuncDef.WanShengJie.toString())){
            if(this.isRewardRedTip() ){
                return true;
            }
        }
        return false;
    }

    public isRewardRedTip(){
        let arr = WanShengJieProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(this.rewardList.indexOf(arr[i].f_id) == -1){
                if(arr[i].f_isfree){
                    return true;
                }
                if(this.totalCnt >= arr[i].f_AccPurchase){
                    return true;
                }
            }
        }
        return false;
    }
}