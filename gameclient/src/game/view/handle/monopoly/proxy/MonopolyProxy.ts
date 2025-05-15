import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class MonopolyTileRewardsProxy extends BaseCfg{
    private static _ins:MonopolyTileRewardsProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new MonopolyTileRewardsProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Monopoly_TileRewards";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let eventType = this.List[i].f_EventType;
            if(!this._map[eventType]){
               this._map[eventType] = {};
            }
            let areaType = this.List[i].f_AreaType;
            if(!this._map[eventType][areaType]){
                this._map[eventType][areaType] = [];
            }
            this._map[eventType][areaType].push(this.List[i]);
        }
    }

    public getListByEventAndArea(eventType:number,areaType:number){
        return this._map[eventType][areaType];
    }
}

export class MonopolyMapProxy extends BaseCfg{
    private static _ins:MonopolyMapProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new MonopolyMapProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Monopoly_Map";
    }
}

export class MonopolyTaskProxy extends BaseCfg{
    private static _ins:MonopolyTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new MonopolyTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Monopoly_Task";
    }
}

export class MonopolyPackProxy extends BaseCfg{
    private static _ins:MonopolyPackProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new MonopolyPackProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Monopoly_Pack";
    }
}

export class MonopolyRoundRewardsProxy extends BaseCfg{
    private static _ins:MonopolyRoundRewardsProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new MonopolyRoundRewardsProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Monopoly_RoundRewards";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let eventType = this.List[i].f_EventType;
            if(!this._map[eventType]){
               this._map[eventType] = {};
            }
            let areaType = this.List[i].f_AreaID;
            if(!this._map[eventType][areaType]){
                this._map[eventType][areaType] = [];
            }
            this._map[eventType][areaType].push(this.List[i]);
        }
    }

    public getListByEventAndArea(eventType:number,areaType:number){
        return this._map[eventType][areaType];
    }
}

export class MonopolyConfigProxy extends BaseCfg{
    private static _ins:MonopolyConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new MonopolyConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Monopoly_Config";
    }
}