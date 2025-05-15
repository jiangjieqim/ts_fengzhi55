import { BaseModel } from "../../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { JjzmlView } from "../views/JjzmlView";
export class t_Pack_Attendance_Chief extends BaseCfg {
    public GetTabelName(): string {
        return "t_Pack_Attendance_Chief";
    }
    private static _ins: t_Pack_Attendance_Chief;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_Attendance_Chief();
        }
        return this._ins;
    }
}
export class JjzmlModel extends BaseModel {
    private static _ins: JjzmlModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new JjzmlModel();
        }
        return this._ins;
    }
    public onInitCallBack() {

    }
    public initMsg(): void {
        this.Reg(new JjzmlView(EViewType.JJZML));
    }
    public get isOpen() {
        return ActivityModel.Ins.isOpenByPackid(EActivityType.JJZML);
    }
}