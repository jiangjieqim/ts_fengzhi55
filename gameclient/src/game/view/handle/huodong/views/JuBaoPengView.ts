import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
/**聚宝盆 */
export class JuBaoPengView extends ViewBase {
    private _ui: ui.views.huodong.ui_jubaopengUI;
    protected mMask: boolean = true;
    protected onAddLoadRes(): void { 
        this.addAtlas("jubaopeng.atlas");
    }
    protected onExit(): void { }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.huodong.ui_jubaopengUI();
            this.bindClose(this._ui.close1);
        }
    }
    protected onInit(): void { }
}