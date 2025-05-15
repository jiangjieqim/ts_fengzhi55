import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class t_Fund extends BaseCfg {
    public GetTabelName(): string {
        return "t_Fund";
    }
    private static _ins: t_Fund;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Fund();
        }
        return this._ins;
    }
}

export class t_FundOne extends BaseCfg{
    public GetTabelName(): string {
        return "t_FundOne";
    }
    private static _ins: t_FundOne;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_FundOne();
        }
        return this._ins;
    }
}
export class t_FundTwo extends BaseCfg{
    public GetTabelName(): string {
        return "t_FundTwo";
    }
    private static _ins: t_FundTwo;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_FundTwo();
        }
        return this._ins;
    }
}
export class t_FundThree extends BaseCfg{
    public GetTabelName(): string {
        return "t_FundThree";
    }
    private static _ins: t_FundThree;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_FundThree();
        }
        return this._ins;
    }
}
export interface IFundDataCfg {
    /*id*/
    f_id: number;
    /*天数*/
    f_Day: number;
    /*基金奖励*/
    f_FundReward: string;
}