import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class StarConfigProxy extends BaseCfg{
    private static _ins:StarConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new StarConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Star_Config";
    }
}

export class StarPocketTipsProxy extends BaseCfg{
    private static _ins:StarPocketTipsProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new StarPocketTipsProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Star_PocketTips";
    }
}

export class StarShopProxy extends BaseCfg{
    private static _ins:StarShopProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new StarShopProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Star_Shop";
    }
}

export class StarAwardProxy extends BaseCfg{
    private static _ins:StarAwardProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new StarAwardProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Star_RankReward";
    }
}

export class StarWheelProxy extends BaseCfg{
    private static _ins:StarWheelProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new StarWheelProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Star_Wheel";
    }
}

