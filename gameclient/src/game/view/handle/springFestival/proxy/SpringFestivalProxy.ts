import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class SFStageRewardsProxy extends BaseCfg{
    private static _ins:SFStageRewardsProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SFStageRewardsProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_2024Spring_StageRewards";
    }

    public getCfgById(id:number):Configs.t_Event_2024Spring_StageRewards_dat{
        return this.List.find(item => item.f_id == id);
    }
}

export class SFSFireWorkProxy extends BaseCfg{
    private static _ins:SFSFireWorkProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SFSFireWorkProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_2024Spring_FireWork";
    }

    public getCfgByTpye(type:number):Configs.t_Event_2024Spring_FireWork_dat{
        return this.List.find(item => item.f_FireWorkType == type);
    }

    public getCfgByID(id:number):Configs.t_Event_2024Spring_FireWork_dat{
        return this.List.find(item => item.f_FireworkID == id);
    }
}

export class SFConfigProxy extends BaseCfg{
    private static _ins:SFConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SFConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_2024Spring_Config";
    }
}

export class SFRankProxy extends BaseCfg{
    private static _ins:SFRankProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SFRankProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_2024Spring_Rank";
    }
}

export class SFTaskProxy extends BaseCfg{
    private static _ins:SFTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SFTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_2024Spring_Task";
    }
}

export class SFPackProxy extends BaseCfg{
    private static _ins:SFPackProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SFPackProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_2024Spring_Pack";
    }
}

export class SFShopProxy extends BaseCfg{
    private static _ins:SFShopProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SFShopProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Event_2024Spring_Shop";
    }
}