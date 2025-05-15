import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class UpstageRankProxy extends BaseCfg{
    private static _ins:UpstageRankProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new UpstageRankProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Upstage_Rank";
    }

    public getCfgByID(id:number):Configs.t_Upstage_Rank_dat{
        return this.List.find(item => item.f_id == id);
    }
}

export class UpstageTaskProxy extends BaseCfg{
    private static _ins:UpstageTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new UpstageTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Upsatage_Task";
    }

    public getCfgByID(id:number):Configs.t_Upsatage_Task_dat{
        return this.List.find(item => item.f_id == id);
    }
}