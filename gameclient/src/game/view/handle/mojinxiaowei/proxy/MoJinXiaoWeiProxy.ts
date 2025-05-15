import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class DailyEventPositionProxy extends BaseCfg{
    private static _ins:DailyEventPositionProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new DailyEventPositionProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_DailyEvent_Position";
    }
}

export class DailyEventTaskProxy extends BaseCfg{
    private static _ins:DailyEventTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new DailyEventTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_DailyEvent_Task";
    }
}