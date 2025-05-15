import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class WanShengJieProxy extends BaseCfg{
    private static _ins:WanShengJieProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WanShengJieProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Halloween_Purchase";
    }
}