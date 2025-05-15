import { ui } from "../../../../../../ui/layaMaxUI";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";

export class ShenHunCtl{
    protected _ui:ui.views.wushendian.ui_wushendianTJItemUI;

    constructor(skin:ui.views.wushendian.ui_wushendianTJItemUI) {
        this._ui = skin;
    }

    public setData(qua:number,icon:string,name:string){
        this._ui.img_sel.visible = false;
        this._ui.img_qua.skin = IconUtils.getQuaIcon(qua);
        this._ui.icon.skin = "o/Palace/" + icon + ".png";
        this._ui.lab_name.text = name;
    }
}