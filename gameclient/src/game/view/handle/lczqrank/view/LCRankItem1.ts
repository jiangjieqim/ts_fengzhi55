import { ui } from "../../../../../ui/layaMaxUI";
import { LCRankCtl1 } from "./LCRankCtl1";

export class LCRankItem1 extends ui.views.lczqrank.lczqRankItem1UI{
    public ctl:LCRankCtl1;

    constructor() {
        super();
        this.ctl = new LCRankCtl1(this);
    }
}