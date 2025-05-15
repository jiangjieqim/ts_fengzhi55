import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { stAllianceWarAllianceRank } from "../../../../../network/protocols/BaseProto";

class HeadCtl {
    private data:stAllianceWarAllianceRank;
    private ui:ui.views.allianceFight.ui_allianceFightRankItem1UI;

    constructor(ui:ui.views.allianceFight.ui_allianceFightRankItem1UI)
    {
        this.ui = ui;
    }

    public updateView(value:stAllianceWarAllianceRank) {
        if (!value) return;
        this.data = value;
        this.ui.mingcitf.text = value.rank ? value.rank.toString() : '未上榜';
        this.ui.nametf.text = StringUtil.convertName(value.name);
        this.ui.count_tf.text = value.baseNum.toString();
        this.ui.totalCount_tf.text = value.point.toString();
    }
}

export class RankItemCtl1{
    private headCtl:HeadCtl;

    constructor(skin:ui.views.allianceFight.ui_allianceFightRankItem1UI){
        this.headCtl = new HeadCtl(skin);
    }
    public updateView(data: stAllianceWarAllianceRank){
        this.headCtl.updateView(data);
    }
}