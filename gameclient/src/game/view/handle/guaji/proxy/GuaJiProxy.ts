import { BaseCfg } from "../../../../static/json/data/BaseCfg";

/* @Author: tsy
 * @Date: 2023-03-03 13:57:38
 * @Last Modified by: tsy
 * @Last Modified time: 2023-03-06 14:04:36
*/
export class GuaJiCfgProxy extends BaseCfg{
    private static _ins:GuaJiCfgProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new GuaJiCfgProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_AFK_Config";
    }
}

export class GuaJiRewardsProxy extends BaseCfg{
    private static _ins:GuaJiRewardsProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new GuaJiRewardsProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_AFK_Rewards";
    }

    public getCfgByLv(lv:number):Configs.t_AFK_Rewards_dat{
        let l = this.List;
        return l.find(item => (item as Configs.t_AFK_Rewards_dat).f_AFKRewardsLevel == lv);
    }
}

export class GuaJiPackProxy extends BaseCfg{
    private static _ins:GuaJiPackProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new GuaJiPackProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_AFK_Pack";
    }
}