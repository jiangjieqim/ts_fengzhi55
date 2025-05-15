import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class Arena_RankReward_Daily extends BaseCfg{
    public GetTabelName() {
        return "t_Arena_RankReward_Daily";
    }
    private static _ins: Arena_RankReward_Daily;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new Arena_RankReward_Daily();
        }
        return this._ins;
    }
}
export class Arena_RankReward_Weekly extends BaseCfg{
    public GetTabelName() {
        return "t_Arena_RankReward_Weekly";
    }
    private static _ins: Arena_RankReward_Weekly;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new Arena_RankReward_Weekly();
        }
        return this._ins;
    }
}

export class Arena_config extends BaseCfg{
    public GetTabelName() {
        return "t_Arena_config";
    }
    private static _ins: Arena_config;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new Arena_config();
        }
        return this._ins;
    }
}

export class Arena_BuyTicket extends BaseCfg{
    public GetTabelName() {
        return "t_Arena_BuyTicket";
    }
    private static _ins: Arena_BuyTicket;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new Arena_BuyTicket();
        }
        return this._ins;
    }

    public getCfgByTime(time:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let _cfg:Configs.t_Arena_BuyTicket_dat = l[i];
            if(_cfg.f_BuyTimes == time){
                return _cfg;
            }
        }
        let _cfg = l[l.length -1];
        return _cfg;
    }
}