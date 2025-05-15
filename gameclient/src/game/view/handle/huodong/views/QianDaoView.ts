import { ui } from "../../../../../ui/layaMaxUI";
import { t_Pack_AttendanceProxy, t_Pack_Attendanc_new } from "../model/ActivityProxy";
import { EActivityType } from "../model/EActivityType";
import { QianDaoBaseView } from "./QianDaoBaseView";

/**签到 */
export class QianDaoView extends QianDaoBaseView {
    protected activityType:EActivityType = EActivityType.SignIn;
    protected get cfgList(){
        return t_Pack_AttendanceProxy.Ins.List;
    }
    protected initUI(){
        this.UI = this._ui = new ui.views.huodong.ui_qiriqiandaoviewUI();
    }

}
/**新签到 */
export class QianDaoNewView extends QianDaoBaseView{
    protected activityType:EActivityType = EActivityType.SignInNew;
    protected get cfgList(){
        return t_Pack_Attendanc_new.Ins.List;
    }
    protected initUI(){
        this.UI = this._ui = new ui.views.huodong.ui_qiriqiandaoview_newUI();
    }
}