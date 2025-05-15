import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class EventGamePassPackProxy extends BaseCfg{
    private static _ins:EventGamePassPackProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new EventGamePassPackProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_GamePass_Pack";
    }

    public getCfgByType(type:number){
        return this.List.find(item => item.f_type == type);
    }
}

export class EventGamePassMonthProxy extends BaseCfg{
    private static _ins:EventGamePassMonthProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new EventGamePassMonthProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_GamePass_Month";
    }
}

export class EventGamePassWeekProxy extends BaseCfg{
    private static _ins:EventGamePassWeekProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new EventGamePassWeekProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_GamePass_Week";
    }
}

export class EventGamePassTaskProxy extends BaseCfg{
    private static _ins:EventGamePassTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new EventGamePassTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_GamePass_Task";
    }
}

export class EventGamePassConfigProxy extends BaseCfg{
    private static _ins:EventGamePassConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new EventGamePassConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_GamePass_Config";
    }
}