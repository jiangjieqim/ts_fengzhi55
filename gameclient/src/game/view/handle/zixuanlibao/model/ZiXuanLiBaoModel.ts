import { stOptionalGift } from "../../../../network/protocols/BaseProto";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { RecurringActivityOptionalPackProxy } from "../proxy/ZiXuanLiBaoProxy";

export class ZiXuanLiBaoModel extends Laya.EventDispatcher{
    private static _ins: ZiXuanLiBaoModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new ZiXuanLiBaoModel();
        }
        return this._ins;
    } 

    public dataList:stOptionalGift[];

    public static UPDATA_VIEW:string = "UPDATA_VIEW";

    public isRedTip() {
        let activityVo = ActivityModel.Ins.getVo(EActivityType.zixuanlibao);
        if (!activityVo) {
            return false;
        }
        let arr = RecurringActivityOptionalPackProxy.Ins.List;
        for (let i: number = 0; i < arr.length; i++) {
            if (arr[i].f_PackPurchase == 0) {
                if (activityVo.getParam1(arr[i].f_id) < arr[i].f_LimitedPurchase) {
                    return true;
                }
            }
        }
        return false;
    }
    
}