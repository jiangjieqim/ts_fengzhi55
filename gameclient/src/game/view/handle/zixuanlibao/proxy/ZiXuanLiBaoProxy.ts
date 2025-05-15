import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class RecurringActivityOptionalPackProxy extends BaseCfg{
    private static _ins:RecurringActivityOptionalPackProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new RecurringActivityOptionalPackProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_RecurringActivity_OptionalPack";
    }
}