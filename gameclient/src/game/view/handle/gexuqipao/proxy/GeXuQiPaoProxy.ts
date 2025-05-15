import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class RADrawEventPackProxy extends BaseCfg{
    private static _ins:RADrawEventPackProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new RADrawEventPackProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_RecurringActivity_DrawEvent_Pack";
    }
}

export class RADrawEventConfigProxy extends BaseCfg{
    private static _ins:RADrawEventConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new RADrawEventConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_RecurringActivity_DrawEvent_Config";
    }
}

export class RADrawEventRewardRateProxy extends BaseCfg{
    private static _ins:RADrawEventRewardRateProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new RADrawEventRewardRateProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_RecurringActivity_DrawEvent_RewardRate";
    }
}

export class RADrawEventTaskProxy extends BaseCfg{
    private static _ins:RADrawEventTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new RADrawEventTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_RecurringActivity_DrawEvent_Task";
    }
}

export class RADrawEventShopProxy extends BaseCfg{
    private static _ins:RADrawEventShopProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new RADrawEventShopProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_RecurringActivity_DrawEvent_Shop";
    }
}