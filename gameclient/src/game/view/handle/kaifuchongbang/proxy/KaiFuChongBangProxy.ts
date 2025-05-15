import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class KFCBAdvantureRewardProxy extends BaseCfg{
    private static _ins:KFCBAdvantureRewardProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new KFCBAdvantureRewardProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_OpenServerActivity_AdvantureReward";
    }
}


export class KFCBRankRewardProxy extends BaseCfg{
    private static _ins:KFCBRankRewardProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new KFCBRankRewardProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_OpenServerActivity_RankReward";
    }
}