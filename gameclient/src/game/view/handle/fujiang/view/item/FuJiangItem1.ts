import { ui } from "../../../../../../ui/layaMaxUI";
import { FuJiangItemCtl1 } from "../ctl/FuJiangItemCtl1";

export class FuJiangItem1 extends ui.views.fujiang.ui_fujiangItem1UI{

    public ctl:FuJiangItemCtl1;

    constructor() {
        super();
        this.ctl = new FuJiangItemCtl1(this);
    }
}