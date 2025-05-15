import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { AlliancePlayerManage_req, stAlliancePlayer } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { ChengHaoModel } from "../../../chenghao/model/ChengHaoModel";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { AllianceManage, AllianceModel, AlliancePosition, IMenu } from "../../model/AllianceModel";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { AllianceMenuView } from "../AllianceMenuView";
import { SocketMgr } from "../../../../../network/SocketMgr";

export class ApplyItem extends ui.views.alliance.ui_alliance_apply_itemUI{
    constructor() {
        super();

        ButtonCtl.Create(this.agree_btn,new Laya.Handler(this,this.onAgreeBtnClick));
        ButtonCtl.Create(this.refuse_btn,new Laya.Handler(this,this.onRefuseBtnClick));

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

    private onAgreeBtnClick(){
        if(!this._data) return;
        const alliance = AllianceModel.Ins.alliance;
        if (!alliance) return;
        let req = new AlliancePlayerManage_req();
        req.playerId = this._data.playerId;
        req.type = AllianceManage.Agree;
        SocketMgr.Ins.SendMessageBin(req);
        if (E.ViewMgr.isOpenReg(EViewType.AllianceApplyView)) {
            E.ViewMgr.Close(EViewType.AllianceApplyView);
        }
    }
    
    private onRefuseBtnClick() {
        let req = new AlliancePlayerManage_req();
        req.playerId = this._data.playerId;
        req.type = AllianceManage.Refuse;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:stAlliancePlayer;
    private _plusCtl:FontClipCtl;
    public setData(value: stAlliancePlayer){
        if(!value)return;
        this._data = value;
        // this.head.icon.skin = MainModel.Ins.convertHead(value.headUrl);
        MainModel.Ins.setTTHead(this.head.icon,MainModel.Ins.convertHead(value.headUrl));
        this.head.titleIcon.visible = false;
        this.head.lvtf.text = "Lv."+ value.playerLevel;
        this.nametf.text = StringUtil.convertName(value.name);
        this.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleId);
        const v = StringUtil.val2Atlas(value.plus);
        this._plusCtl.setValue(this.toplug, v);
    }
}