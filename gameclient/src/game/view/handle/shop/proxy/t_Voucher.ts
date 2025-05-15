import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class t_Voucher extends BaseCfg{
    public GetTabelName(): string {
        return "t_Voucher";
    }
    private static _ins: t_Voucher;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Voucher();
        }
        return this._ins;
    }
}