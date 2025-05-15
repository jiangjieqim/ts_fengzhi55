import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { stAllianceInnerRankPlayer } from "../../../../../network/protocols/BaseProto";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../../main/model/MainModel";
import { AlliancePosition } from "../../model/AllianceModel";

class HeadCtl {
    private data:stAllianceInnerRankPlayer;
    private ui:ui.views.alliance.ui_alliance_rank_itemUI;
    private _plusCtl;

    constructor(ui:ui.views.alliance.ui_alliance_rank_itemUI)
    {
        this.ui = ui;
        this._plusCtl = FontCtlFactory.createMainPlus();
        // skin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }
    
    // private onClickHandler(){
    //     //MainModel.Ins.showPlayer(this.data.accountId,this.data.id);
    //     // E.ViewMgr.Open(EViewType.ShowPlayer,null,JjcModel.Ins.getShowPlayerInfo());
    // }

    public updateView(value:stAllianceInnerRankPlayer) {
        this.ui.mingcitf.text = value.rank + '';
        this.ui.nametf.text = value.name;
        // this.ui.head.icon.skin = MainModel.Ins.convertHead(value.headUrl);
        MainModel.Ins.setTTHead(this.ui.head.icon,MainModel.Ins.convertHead(value.headUrl));
        
        this.ui.head.titleIcon.visible = false;
        this.ui.head.lvtf.text = "Lv."+ value.lv;
        this.ui.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleId);
        const v = StringUtil.val2Atlas(value.plus);
        this._plusCtl.setValue(this.ui.toplug, v);
        this.ui.countTf.text = value.accHarm + '';
        this.ui.sever_lab.text = `(${value.serverName})`;
        switch (value.position) {
            case AlliancePosition.Normal:
                this.ui.position_bg.skin = 'remote/alliance/cy.png';
                this.ui.position_tf.text = E.getLang('AlliancePositionNormal');
                break;
            case AlliancePosition.VicePresident:
                this.ui.position_bg.skin = 'remote/alliance/fmz.png';
                this.ui.position_tf.text = E.getLang('AlliancePositionVicePresident');
                break;
            case AlliancePosition.President:
                this.ui.position_bg.skin = 'remote/alliance/mz.png';
                this.ui.position_tf.text = E.getLang('AlliancePositionPresident');
                break;
        }
    }
}

export class RankItemCtl{
    private headCtl:HeadCtl;

    constructor(skin:ui.views.alliance.ui_alliance_rank_itemUI){
        this.headCtl = new HeadCtl(skin);
    }
    public updateView(data: stAllianceInnerRankPlayer){
        this.headCtl.updateView(data);
    }
}