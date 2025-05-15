import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { t_Pack_AttendanceProxy } from "./ActivityProxy";

/**签到 */
export class t_VIPProxy extends BaseCfg{
    public GetTabelName() {
        return "t_VIP"
    }
    private static _ins: t_VIPProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_VIPProxy();
        }
        return this._ins;
    }
}