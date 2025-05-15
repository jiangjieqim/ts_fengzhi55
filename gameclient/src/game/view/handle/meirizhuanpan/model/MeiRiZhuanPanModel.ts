import { stActivityCell } from "../../../../network/protocols/BaseProto";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";

export class MeiRiZhuanPanModel extends Laya.EventDispatcher{
    private static _ins: MeiRiZhuanPanModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new MeiRiZhuanPanModel();
        }
        return this._ins;
    } 

    public setItemId:number;
    public pos:number;

    public static UPDATA_ITEMID:string = "UPDATA_ITEMID";
    public static UPDATA_ZHUANPAN:string = "UPDATA_ZHUANPAN";

    public isRedTip(){
        if(MainModel.Ins.isOpenByFuncId(EFuncDef.MeiRiZhuanPan.toString())){
            if(this.isItemRedTip() || this.isAwardRedTip()){
                return true;
            }
        }
        return false;
    }

    public isItemRedTip(){
        if(this.setItemId == 0){
            return true;
        }
        return false
    }

    public isAwardRedTip(){
        let vo = ActivityModel.Ins.getVo(EActivityType.DayZhuanPan);
        if(vo){
            let arr:stActivityCell[] = vo.vo.datalist;
            for (let i: number = 0; i < arr.length; i++) {
                if (arr[i].param1 == 2) {
                    return true;
                }
            }
        }
        return false;
    }
}