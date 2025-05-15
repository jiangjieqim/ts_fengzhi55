import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class PackEjectNewProxy extends BaseCfg{
    private static _ins:PackEjectNewProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PackEjectNewProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pack_Eject_New";
    }
}