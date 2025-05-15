import { ui } from "../../../../../../ui/layaMaxUI";
import { BaseMainIcon } from "./BaseMainIcon";

// export interface IMainIcon{
    // pos:number;
// }

/**
 * 底部按钮
 */
export class BottomMainIcon extends BaseMainIcon{
    
    constructor(){
        // super(skin,pos);
        super();
        // skin:ui.views.main.ui_main_bottom_iconUI,pos:number
        // this.skin = skin;
        // this.initPos(pos);
        // this.mSkin.red.visible = false;
        // this.mSkin.icon.centerX = this.mSkin.icon.centerY = 0;
    }



    private get mSkin(){
        return this.skin as ui.views.main.ui_main_bottom_iconUI;
    }
    public get icon():Laya.Image{
        return this.mSkin.icon;
    }
}