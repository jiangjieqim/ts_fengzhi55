import { ui } from "../../../../../ui/layaMaxUI";
import { KaiFuChongBangCtl1 } from "./KaiFuChongBangCtl1";


export class KaiFuChongBangItem1 extends ui.views.kaifuchongbang.ui_KaiFuChongBangitem1UI{
    public ctl:KaiFuChongBangCtl1;

    constructor() {
        super();
        this.ctl = new KaiFuChongBangCtl1(this);
    }
}