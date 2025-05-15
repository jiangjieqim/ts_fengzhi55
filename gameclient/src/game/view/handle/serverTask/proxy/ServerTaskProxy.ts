import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class SevenDaysTaskProxy extends BaseCfg{
    private static _ins:SevenDaysTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SevenDaysTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_SevenDays_Task";
    }

    public getCfgById(id:number):Configs.t_SevenDays_Task_dat{
        return this.List.find(ele => ele.f_id == id);
    }
}

export class SevenDaysPackProxy extends BaseCfg{
    private static _ins:SevenDaysPackProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SevenDaysPackProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Sevendays_Pack";
    }
}

export class SevenDaysStageRewardsProxy extends BaseCfg{
    private static _ins:SevenDaysStageRewardsProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SevenDaysStageRewardsProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_SevenDays_StageRewards";
    }
}