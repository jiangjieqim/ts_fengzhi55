import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class ZuoQiShopProxy extends BaseCfg{
    private static _ins:ZuoQiShopProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ZuoQiShopProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Mount_Shop";
    }
}