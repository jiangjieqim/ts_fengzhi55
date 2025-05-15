import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class DrawEventTaskProxy extends BaseCfg{
    private static _ins:DrawEventTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new DrawEventTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_DrawEvent_Task";
    }
}

export class DrawEventPackProxy extends BaseCfg{
    private static _ins:DrawEventPackProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new DrawEventPackProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_DrawEvent_Pack";
    }
}

export class DrawEventConfigProxy extends BaseCfg{
    private static _ins:DrawEventConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new DrawEventConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_DrawEvent_Config";
    }

    public getCfgByType(type:number):Configs.t_DrawEvent_Config_dat{
        return this.List.find(ele => ele.f_EventType == type);
    }
}

export class DrawEventRewardsProxy extends BaseCfg{
    private static _ins:DrawEventRewardsProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new DrawEventRewardsProxy();
        }
        return this._ins;
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let eventType = this.List[i].f_EventType;
            if(!this._map[eventType]){
               this._map[eventType] = [];
            }
            this._map[eventType].push(this.List[i]);
        }
    }

    public GetTabelName(): string {
        return "t_DrawEvent_Rewards";
    }

    public getListByType(eventType:number):Configs.t_DrawEvent_Rewards_dat[]{
        return this._map[eventType];
    }
}

export class DrawEventCumulateRewardsProxy extends BaseCfg{
    private static _ins:DrawEventCumulateRewardsProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new DrawEventCumulateRewardsProxy();
        }
        return this._ins;
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let eventType = this.List[i].f_EventType;
            if(!this._map[eventType]){
               this._map[eventType] = [];
            }
            this._map[eventType].push(this.List[i]);
        }
    }

    public GetTabelName(): string {
        return "t_DrawEvent_CumulateRewards";
    }

    public getListByType(eventType:number){
        return this._map[eventType];
    }
}

export class DrawEventRateProxy extends BaseCfg{
    private static _ins:DrawEventRateProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new DrawEventRateProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_DrawEvent_Rate";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let eventType = this.List[i].f_EventType;
            if(!this._map[eventType]){
               this._map[eventType] = [];
            }
            this._map[eventType].push(this.List[i]);
        }
    }

    public getCfgByType(eventType:number,type:number):Configs.t_DrawEvent_Rate_dat{
        let arr = this._map[eventType];
        return arr.find(ele => ele.f_RewardsType == type);
    }
}