import { ui } from "../../../../../../ui/layaMaxUI";
import { BaseMainIcon } from "./BaseMainIcon";
/**顶部按钮 */
export class TopMainIcon extends BaseMainIcon {
    // public itemKey:string =  "TopMainIcon";

    constructor() {
        super();
        this.skin = this.mSkin;
        this.mSkin.timetf.visible = false;
    }

    protected get mSkin(): ui.views.main.ui_top_iconUI {
        if (!this.skin) {
            this.skin = new ui.views.main.ui_top_iconUI();
        }
        return this.skin as ui.views.main.ui_top_iconUI;
    }

    public get icon(): Laya.Image {
        return this.mSkin.icon;
    }
}