import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";

export class NamingChargeRewardView extends ViewBase{
    private cfg: Configs.t_NamingRight_dat;

    private _ui:ui.views.naming_charge.ui_jianghuyouming_rewardUI;
    protected mMask:boolean = true;
    protected autoFree:boolean = true;
    protected onAddLoadRes(): void {
    }
    protected onExit(): void {
    }
    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.naming_charge.ui_jianghuyouming_rewardUI();
        }
    }
    protected onInit(): void {
        this.cfg = this.Data;
        this._ui.title_tf.text = this.cfg.f_RewardName;
        this._ui.desc_tf.text = E.getLang("naming_charge_03", StringUtil.moneyCv(this.cfg.f_RechargeLimit)) + this.cfg.f_RewardName;
        ItemViewFactory.renderItemSlots(this._ui.reward_con,this.cfg.f_Reward,10,1,"left",undefined,undefined,4);
    }

}