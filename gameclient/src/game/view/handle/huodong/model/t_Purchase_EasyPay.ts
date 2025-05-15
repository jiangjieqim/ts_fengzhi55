import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { EClientType } from "../../sdk/ClientType";
import { t_Purchase_PriceProxy } from "./ActivityProxy";

export class t_Purchase_EasyPay extends BaseCfg{
    public GetTabelName(): string {
        return "t_Purchase_EasyPay";
    }
    public getPurchaseCfg(uid:number):Configs.t_Purchase_EasyPay_dat{
        let l:Configs.t_Purchase_EasyPay_dat[] = this.List;
        let cell = l.find(o => o.f_PackControllerid == uid);
        return cell;
    }

    public getPurchaseCfgByType(uid:number,type:number){
        let l:Configs.t_Purchase_EasyPay_dat[] = this.List;
        let cell = l.find(o => o.f_PackControllerid == uid && o.f_type == type);
        return cell;
    }
    
    private static _ins: t_Purchase_EasyPay;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Purchase_EasyPay();
        }
        return this._ins;
    }
}