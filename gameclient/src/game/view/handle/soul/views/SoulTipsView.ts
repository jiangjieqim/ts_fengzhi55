import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import {  SoulTipsCtl } from "../model/SoulTipsCtl";

// 战魂单体tips
export class SoulTipsView extends ViewBase{
    protected mMask:boolean = true;
    private _ui:ui.views.soul.ui_soul_tips_itemUI;
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    private ctl:SoulTipsCtl;
    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.soul.ui_soul_tips_itemUI();
            this.ctl = new SoulTipsCtl(this._ui,this.ViewType);
            this.bindClose(this._ui.close1);
        }
    }

    protected onInit(): void {
        this.ctl.refreshView(this.Data);
    }
}