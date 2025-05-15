import { ui } from "../../../../../ui/layaMaxUI";
import { ZQRankCtl1 } from "./ZQRankCtl1";

export class ZQRankItem1 extends ui.views.lczqrank.lczqRankItem3UI{
    public ctl:ZQRankCtl1;

    constructor() {
        super();
        this.ctl = new ZQRankCtl1(this);
    }
}