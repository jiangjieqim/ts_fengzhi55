import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class AllianceWarConfig extends BaseCfg{
    private static _ins:AllianceWarConfig;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceWarConfig();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_War_Config";
    }

    public getCfg():Configs.t_Alliance_War_Config_dat{
        return this.List[0];
    }

    get pointNum(){
        let count = this.getCfg().f_ActionPoint.split("-")[1];
        return parseInt(count);
    }
}

export class AllianceWarSixBossProxy extends BaseCfg{
    private static _ins:AllianceWarSixBossProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceWarSixBossProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_War_SixBoss";
    }
}

export class AllianceWarCityProxy extends BaseCfg{
    private static _ins:AllianceWarCityProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceWarCityProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_War_City";
    }

    public getCfgByType(type:number){
        return this.List.find(item => item.f_CityType == type);
    }
}

export class AllianceWarBasePointProxy extends BaseCfg{
    private static _ins:AllianceWarBasePointProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceWarBasePointProxy();
        }
        return this._ins;
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let cType = this.List[i].f_CityType;
            if(!this._map[cType]){
               this._map[cType] = {};
            }
            let num = this.List[i].f_BaseNum;
            this._map[cType][num] = this.List[i];
        }
    }

    public GetTabelName(): string {
        return "t_Alliance_War_BasePoint";
    }

    public getCfgByCTypeAndNum(cType:number,num:number):Configs.t_Alliance_War_BasePoint_dat{
        return this._map[cType][num];
    }
}

export class AllianceWarRankAllianceProxy extends BaseCfg{
    private static _ins:AllianceWarRankAllianceProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceWarRankAllianceProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_War_Rank_Alliance";
    }
}

export class AllianceWarRankPersonalProxy extends BaseCfg{
    private static _ins:AllianceWarRankPersonalProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceWarRankPersonalProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_War_Rank_Personal";
    }
}

export class AllianceWarBounsProxy extends BaseCfg{
    private static _ins:AllianceWarBounsProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceWarBounsProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_War_Bouns";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let rank = this.List[i].f_BounsRank;
            if(!this._map[rank]){
               this._map[rank] = [];
            }
            this._map[rank].push(this.List[i]);
        }
    }

    public getCfgByRank(rank:number):Configs.t_Alliance_War_Bouns_dat[]{
        return this._map[rank];
    }
}