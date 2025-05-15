import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class YaoQingValueProxy extends BaseCfg{
    private static _ins:YaoQingValueProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new YaoQingValueProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Invitation_Value";
    }
}

export class YaoQingInProxy extends BaseCfg{
    private static _ins:YaoQingInProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new YaoQingInProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Invitation";
    }
}