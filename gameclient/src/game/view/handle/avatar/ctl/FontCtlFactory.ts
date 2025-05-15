import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { FontClipCtl } from "./FontClipCtl";

export class FontCtlFactory{
    public static createMainPlus(){
        let ctl:FontClipCtl = new FontClipCtl(IconUtils.plusAtlasPrefix);
        ctl.offsetX = -3;
        ctl.mScale = 0.75;
        return ctl;
    }
    /**普通战斗力 */
    public static createPlus(mScale:number = 0.7){
        let ctl:FontClipCtl = new FontClipCtl(IconUtils.plusAtlasPrefix);
        ctl.offsetX = -3;
        ctl.mScale = mScale;
        return ctl;
    }
}