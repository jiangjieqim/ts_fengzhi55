import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { stBossDamage } from "../../../../../network/protocols/BaseProto";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../../main/model/MainModel";

export class HarmItem extends ui.views.allianceFight.ui_allianceFightRankItemUI{
    constructor() {
        super();
        this._plusCtl = FontCtlFactory.createMainPlus();
    }

    private _data:stBossDamage;
    private _plusCtl;

    public setData(value: stBossDamage){
        if(!value)return;
        this._data = value;
        MainModel.Ins.setTTHead(this.head.icon,MainModel.Ins.convertHead(value.headUrl)),
        this.head.titleIcon.visible = false;
        this.head.lvtf.text = "Lv."+ value.level;
        this.nametf.text = StringUtil.convertName(value.nickName);
        this.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleid);
        const v = StringUtil.val2Atlas(value.plus);
        this._plusCtl.setValue(this.toplug, v);
        this.harm_percent_tf.text = (value.damagePercent / 100).toFixed(2) + '%';
        this.harm_tf.text = value.damage.toString();
        this.mingcitf.text = value.rank ? value.rank.toString() : '未上榜';
    }
}