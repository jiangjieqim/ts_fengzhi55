import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class t_Purchase_ComboPack extends BaseCfg {
    public GetTabelName(): string {
        return "t_Purchase_ComboPack";
    }
    private static _ins: t_Purchase_ComboPack;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Purchase_ComboPack();
        }
        return this._ins;
    }
}