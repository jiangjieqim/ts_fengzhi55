import { ui } from "../../../../../../ui/layaMaxUI";
import { JustWatchPlayer_req, stAlliancePlayer } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { ChengHaoModel } from "../../../chenghao/model/ChengHaoModel";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { AlliancePosition, IMenu } from "../../../alliance/model/AllianceModel";
import { E } from "../../../../../G";
import { SocketMgr } from "../../../../../network/SocketMgr";

export class MemberItem extends ui.views.allianceFight.ui_allianceFightMemberItemUI{
    constructor() {
        super();

        this._plusCtl = FontCtlFactory.createMainPlus();
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private _data:stAlliancePlayer;
    private _plusCtl:FontClipCtl;

    public setData(value: stAlliancePlayer){
        if(!value)return;
        this._data = value;
        // this.head.icon.skin = MainModel.Ins.convertHead(value.headUrl);
        MainModel.Ins.setTTHead(this.head.icon, MainModel.Ins.convertHead(value.headUrl));
        this.head.titleIcon.visible = false;
        this.head.lvtf.text = "Lv."+ value.playerLevel;
        this.nametf.text = StringUtil.convertName(value.name);
        this.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleId);
        const v = StringUtil.val2Atlas(value.plus);
        this._plusCtl.setValue(this.toplug, v);
        switch (value.position) {
            case AlliancePosition.Normal:
                this.position_bg.skin = 'remote/common/base/cy.png';
                this.position_tf.text = E.getLang('AlliancePositionNormal');
                break;
            case AlliancePosition.VicePresident:
                this.position_bg.skin = 'remote/common/base/fmz.png';
                this.position_tf.text = E.getLang('AlliancePositionVicePresident');
                break;
            case AlliancePosition.President:
                this.position_bg.skin = 'remote/common/base/mz.png';
                this.position_tf.text = E.getLang('AlliancePositionPresident');
                break;
        }
    }

    public onClick() {
        if (!this._data?.playerId) return;
        const req = new JustWatchPlayer_req();
        req.playerId = this._data.playerId;
        SocketMgr.Ins.SendMessageBin(req);
    }
}