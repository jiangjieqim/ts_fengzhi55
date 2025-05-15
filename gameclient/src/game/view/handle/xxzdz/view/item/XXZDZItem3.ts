import { ui } from "../../../../../../ui/layaMaxUI";
import { XXZDZCtl3 } from "../ctl/XXZDZCtl3";

export class XXZDZItem3 extends ui.views.xxzdz.ui_xxzdzItem3UI{
    public ctl:XXZDZCtl3;

    constructor() {
        super();
        this.ctl = new XXZDZCtl3(this);
    }
}