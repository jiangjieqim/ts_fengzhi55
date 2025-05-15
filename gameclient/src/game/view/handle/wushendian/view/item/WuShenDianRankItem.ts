import { ui } from "../../../../../../ui/layaMaxUI";
import { WuShenDianRankCtl } from "../ctl/WuShenDianRankCtl";

export class WuShenDianRankItem extends ui.views.wushendian.ui_wushendianRankItemUI{
    public ctl:WuShenDianRankCtl;

    constructor() {
        super();
        this.ctl = new WuShenDianRankCtl(this);
    }
}