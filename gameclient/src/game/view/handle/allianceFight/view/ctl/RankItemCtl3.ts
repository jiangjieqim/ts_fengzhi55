import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { stAllianceWarRewardRank } from "../../../../../network/protocols/BaseProto";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../../main/model/MainModel";

class HeadCtl {
    private data:stAllianceWarRewardRank;
    private ui:ui.views.allianceFight.ui_allianceFightRankItem3UI;

    constructor(ui:ui.views.allianceFight.ui_allianceFightRankItem3UI)
    {
        this.ui = ui;
        this._plusCtl = FontCtlFactory.createMainPlus();
    }

    private _plusCtl;

    public updateView(value:stAllianceWarRewardRank) {
        if (!value) return;
        this.data = value;
        MainModel.Ins.setTTHead(this.ui.head.icon, MainModel.Ins.convertHead(value.headUrl));
        this.ui.head.titleIcon.visible = false;
        this.ui.head.lvtf.text = "Lv."+ value.level;
        this.ui.nametf.text = StringUtil.convertName(value.nickName);
        this.ui.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleid);
        const v = StringUtil.val2Atlas(value.plus);
        this._plusCtl.setValue(this.ui.toplug, v);
        this.ui.harm_tf.text = value.count.toString();
        this.ui.mingcitf.text = value.rank ? value.rank.toString() : '未上榜';
    }
}

export class RankItemCtl3{
    private headCtl:HeadCtl;

    constructor(skin:ui.views.allianceFight.ui_allianceFightRankItem3UI){
        this.headCtl = new HeadCtl(skin);
    }
    public updateView(data: stAllianceWarRewardRank){
        this.headCtl.updateView(data);
    }
}