import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { stAllianceWarInnerRank } from "../../../../../network/protocols/BaseProto";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../../main/model/MainModel";

class HeadCtl {
    private data:stAllianceWarInnerRank;
    private ui:ui.views.allianceFight.ui_allianceFightRankItem2UI;

    constructor(ui:ui.views.allianceFight.ui_allianceFightRankItem2UI)
    {
        this.ui = ui;
        this._plusCtl = FontCtlFactory.createMainPlus();
    }

    private _plusCtl;

    public updateView(value:stAllianceWarInnerRank) {
        if (!value) return;
        this.data = value;
        // this.ui.head.icon.skin = MainModel.Ins.convertHead(value.headUrl);
        MainModel.Ins.setTTHead(this.ui.head.icon,MainModel.Ins.convertHead(value.headUrl))
        this.ui.head.titleIcon.visible = false;
        this.ui.head.lvtf.text = "Lv."+ value.level;
        this.ui.nametf.text = StringUtil.convertName(value.nickName);
        this.ui.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleid);
        const v = StringUtil.val2Atlas(value.plus);
        this._plusCtl.setValue(this.ui.toplug, v);
        this.ui.harm_tf.text = value.point.toString();
        this.ui.mingcitf.text = value.rank ? value.rank.toString() : '未上榜';
    }
}

export class RankItemCtl2{
    private headCtl:HeadCtl;

    constructor(skin:ui.views.allianceFight.ui_allianceFightRankItem2UI){
        this.headCtl = new HeadCtl(skin);
    }
    public updateView(data: stAllianceWarInnerRank){
        this.headCtl.updateView(data);
    }
}