import { BaseCfg } from "../../../static/json/data/BaseCfg";

export class t_Item_AccessUI extends BaseCfg{
    private static _ins: t_Item_AccessUI;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Item_AccessUI();
        }
        return this._ins;
    }
    public GetTabelName(): string {
        return "t_Item_AccessUI"
    }
}