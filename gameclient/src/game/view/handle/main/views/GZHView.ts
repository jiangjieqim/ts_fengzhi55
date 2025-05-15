import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";

export class GZHView extends ViewBase{
    protected _ui:ui.views.main.ui_gzhViewUI;
    protected mMask = true;
    protected autoFree = true;
    protected onAddLoadRes() {
    }
    
    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_gzhViewUI();
            this.bindClose(this._ui.btn_close);
            this._ui.icon1.skin = `static/ewma.png`;
            this._ui.nameTf.text = E.getLang("gamename");
        }
    }

    protected onInit() {

    }

    protected onExit() {
        
    }
}