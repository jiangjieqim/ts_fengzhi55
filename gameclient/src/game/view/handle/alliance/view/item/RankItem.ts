import { ui } from "../../../../../../ui/layaMaxUI";
import { stAllianceInnerRankPlayer } from "../../../../../network/protocols/BaseProto";
import { RankItemCtl } from "../ctl/rankItemCtl";

export class RankItem extends ui.views.alliance.ui_alliance_rank_itemUI{
    constructor() {
        super();
        this.rankItemCtl = new RankItemCtl(this);
    }
    private rankItemCtl;
    public setData(value: stAllianceInnerRankPlayer){
        if(!value)return;
        this.rankItemCtl.updateView(value);
    }
}