import { ui } from "../../../../../../ui/layaMaxUI";
import { ZuoQiTJItemCtl } from "./ZuoQiTJItemCtl";

export class ZuoQiTJItem extends  ui.views.zuoqi.ui_zuoqiTJItemUI{
    public ctl:ZuoQiTJItemCtl;
    constructor(){
        super();
        this.ctl = new ZuoQiTJItemCtl(this);
    }
}