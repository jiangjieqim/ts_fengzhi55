import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class RecurringActivityBossProxy extends BaseCfg{
    private static _ins:RecurringActivityBossProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new RecurringActivityBossProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_RecurringActivity_Boss";
    }
}