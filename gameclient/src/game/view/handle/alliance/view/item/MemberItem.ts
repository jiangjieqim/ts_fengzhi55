import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { stAlliancePlayer } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { ChengHaoModel } from "../../../chenghao/model/ChengHaoModel";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { AlliancePosition, IMenu } from "../../model/AllianceModel";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { AllianceMenuView } from "../AllianceMenuView";

export class MemberItem extends ui.views.alliance.ui_alliance_member_itemUI{
    constructor() {
        super();

        ButtonCtl.Create(this.manage_btn,new Laya.Handler(this,this.onBtnClick));
        this._plusCtl = FontCtlFactory.createMainPlus();
    }

    public showMenu(playerId: number, position: AlliancePosition, target){
        let menuData:IMenu = {} as IMenu;
        menuData.playerId = playerId;
        menuData.target = target;
        menuData.position = position;
        let _viewType = EViewType.AllianceMenuView;
        if(E.ViewMgr.IsOpen(_viewType)){
            let view:AllianceMenuView = E.ViewMgr.Get(_viewType) as AllianceMenuView;
            view.setData(menuData);
        }else{
            E.ViewMgr.Open(_viewType,null,menuData);
        }
    }

    private onBtnClick(){
        if(!this._data) return;
        this.showMenu(this._data.playerId, this._data.position, this);
    }

    private _data:stAlliancePlayer;
    private _plusCtl:FontClipCtl;
    public setData(value: stAlliancePlayer){
        if(!value)return;
        this._data = value;
        // this.head.icon.skin = MainModel.Ins.convertHead(value.headUrl);
        MainModel.Ins.setTTHead( this.head.icon,MainModel.Ins.convertHead(value.headUrl));
        this.head.titleIcon.visible = false;
        this.head.lvtf.text = "Lv."+ value.playerLevel;
        this.nametf.text = StringUtil.convertName(value.name);
        this.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleId);
        const v = StringUtil.val2Atlas(value.plus);
        this._plusCtl.setValue(this.toplug, v);
        switch (value.position) {
            case AlliancePosition.Normal:
                this.position_bg.skin = 'remote/alliance/cy.png';
                this.position_tf.text = E.getLang('AlliancePositionNormal');
                break;
            case AlliancePosition.VicePresident:
                this.position_bg.skin = 'remote/alliance/fmz.png';
                this.position_tf.text = E.getLang('AlliancePositionVicePresident');
                break;
            case AlliancePosition.President:
                this.position_bg.skin = 'remote/alliance/mz.png';
                this.position_tf.text = E.getLang('AlliancePositionPresident');
                break;
        }
    }
}