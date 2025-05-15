import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ShopProxy } from "../../shop/proxy/shopProxy";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { t_Purchase_PriceProxy } from "../model/ActivityProxy";
/**充值测试界面 */
export class ChongZhiView extends ViewBase {
    private cfg: Configs.t_Purchase_Price_dat;
    private _ui: ui.views.common.ui_chongzhi_viewUI;
    protected mMask: boolean = true;
    protected onAddLoadRes(): void { }
    /**离开处理 */
    protected onExit(): void { }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.common.ui_chongzhi_viewUI();
            ButtonCtl.CreateBtn(this._ui.okbtn, this, this.onOkHandler);
            this.bindClose(this._ui.close1);
        }
    }

    private onOkHandler() {
        console.log("ChongZhiView =>" + this.cfg.f_id);
        ActivityModel.Ins.reqBill(this.cfg.f_id);
        ActivityModel.Ins.once(ActivityEvent.RechargeBillUpdate,this,this.onRechargeBillUpdate);
        this.Close();
    }

    /**初始化*/
    protected onInit(): void {
        let cfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this.Data);
        this.cfg = cfg;
        this._ui.tf1.text = "fid = " + cfg.f_id/*JSON.stringify(cfg) */ + "\n" + "充值:" + this.moneyCNY + "元";
        // this.event(ActivityEvent.RechargeBillUpdate,revc.val);      
    }

    get moneyCNY(){
        let cfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this.Data);
        return ShopProxy.Ins.convertMoney(cfg);
    }
    private onRechargeBillUpdate(val:string){
        // 'recharge 7557444796767420416'
        E.sdk.recharge(val,this.cfg);
    }
}