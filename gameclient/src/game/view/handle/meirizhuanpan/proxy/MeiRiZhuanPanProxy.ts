import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class WheelRewardsProxy extends BaseCfg{
    private static _ins:WheelRewardsProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WheelRewardsProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Wheel_Rewards";
    }
}

export class WheelRPriceProxy extends BaseCfg{
    private static _ins:WheelRPriceProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WheelRPriceProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Wheel_Price";
    }

    public getCfgById(id:number):Configs.t_Wheel_Price_dat{
        return this.List.find(item => item.f_id == id);
    }
}