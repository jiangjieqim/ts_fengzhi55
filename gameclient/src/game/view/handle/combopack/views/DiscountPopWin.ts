import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";

export class DiscountPopWin extends ViewBase {
    private _ui:ui.views.main.ui_pop_01discountUI;
    protected autoFree: boolean = true;
    protected mMask: boolean = true;
    protected onAddLoadRes(): void {
    }
    protected onExit(): void {
    }
    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_pop_01discountUI();
            this._ui.bg.on(Laya.Event.CLICK,this,this.Close);
        }
    }
    protected onInit(): void {
    }
}