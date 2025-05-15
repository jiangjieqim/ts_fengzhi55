import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class DaLuanDouProxy extends BaseCfg{
    private static _ins:DaLuanDouProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new DaLuanDouProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Smash_Script";
    }
}