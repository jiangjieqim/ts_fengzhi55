import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType, EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceJoin_req, AllianceSet_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceJoin, AllianceManage, AllianceModel, AlliancePosition } from "../model/AllianceModel";

class AllianceCheckBoxCtl extends CheckBoxCtl {
    constructor(skin: ICheckBoxSkin) {
        super(skin);
    }
}

/**
 * 修改同盟设置页面
 */
export class AllianceEditView extends ViewBase{
    private _ui:ui.views.alliance.ui_allianceEditViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    private join1Ck: AllianceCheckBoxCtl;
    private join0Ck: AllianceCheckBoxCtl;

    private search1Ck: AllianceCheckBoxCtl;
    private search0Ck: AllianceCheckBoxCtl;

    protected  onAddLoadRes(){
        this.addAtlas('alliance.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.alliance.ui_allianceEditViewUI;
            this.bindClose(this._ui.close1);
            //ButtonCtl.CreateBtn(this._ui.create_btn,this,this.onCreateHandler);
            //同盟设置，自动
            this.join1Ck = new AllianceCheckBoxCtl(this._ui.join1ck);
            this.join1Ck.selectHander = new Laya.Handler(this,this.onJoin1Handler);
            //同盟设置，手动
            this.join0Ck = new AllianceCheckBoxCtl(this._ui.join0ck);
            this.join0Ck.selectHander = new Laya.Handler(this,this.onJoin0Handler);

            this.search1Ck = new AllianceCheckBoxCtl(this._ui.search1ck);
            this.search1Ck.selectHander = new Laya.Handler(this,this.onSearch1Handler);

            this.search0Ck = new AllianceCheckBoxCtl(this._ui.search0ck);
            this.search0Ck.selectHander = new Laya.Handler(this,this.onSearch0Handler);

            ButtonCtl.CreateBtn(this._ui.confirm_btn,this,this.onConfirmHandler);
            this._ui.name_bg.on(Laya.Event.CLICK,this,this.onNameClick);

            ButtonCtl.CreateBtn(this._ui.jiesan_btn,this,this.onJiesanHandler);

            this._ui.level_input.on(Laya.Event.INPUT, this, this.onInputChange);
        }
    }

    private onInputChange() {
        const val = Number(this._ui.level_input.text);
        if (isNaN(val) || val <= 0) {
            this._ui.level_input.text = '1';
        } else if (val > 425) {
            this._ui.level_input.text = '425';
        }
    }

    private onJiesanHandler() {
        E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.LangMgr.getLang("AllianceDisbandWords"), new Laya.Handler(this, this.doJieSan));
    }

    private doJieSan() {
        const alliance = AllianceModel.Ins.alliance;
        if (!alliance) return;
        let req = new AllianceJoin_req();
        req.uid = alliance.uid;
        req.type = AllianceJoin.Disband;
        SocketMgr.Ins.SendMessageBin(req);
        if (E.ViewMgr.isOpenReg(EViewType.AllianceEditView)) E.ViewMgr.Close(EViewType.AllianceEditView);
    }

    private onNameClick() {
        if ([AlliancePosition.President, AlliancePosition.VicePresident].indexOf(AllianceModel.Ins.position) !== -1) {
            E.ViewMgr.Open(EViewType.AllianceCreateView, null, true);
        }
    }

    private onConfirmHandler() {
        const level = Number(this._ui.level_input.text);
        const arr = ['join', 'search'];
        const req = new AllianceSet_req;
        req.level = level;
        for (const key of arr) {
            if (this[`${key}0Ck`].selected === this[`${key}1Ck`].selected) {
                return;
            }
            req[key] = this[`${key}0Ck`].selected ? 0 : 1;
        }
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onJoin1Handler() {
        this.join0Ck.selected = !this.join1Ck.selected;
    }

    private onJoin0Handler() {
        this.join1Ck.selected = !this.join0Ck.selected;
    }

    private onSearch1Handler() {
        this.search0Ck.selected = !this.search1Ck.selected;
    }

    private onSearch0Handler() {
        this.search1Ck.selected = !this.search0Ck.selected;
    }

    private onAllianceUpdate() {
        const alliance = AllianceModel.Ins.alliance;
        if (!alliance) return;
        this._ui.name_tf.text = alliance.name;
        this._ui.level_input.text = alliance.playerLevel + '';
        this.join0Ck.selected = !alliance.auto;
        this.join1Ck.selected = Boolean(alliance.auto);
        this.search0Ck.selected = !alliance.show;
        this.search1Ck.selected = Boolean(alliance.show);
    }

    protected onInit(){
        this.onAllianceUpdate();
        AllianceModel.Ins.on(AllianceModel.ALLIANCE_INFO_UPDATE, this, this.onAllianceUpdate);
    }

    protected onExit(){
        AllianceModel.Ins.off(AllianceModel.ALLIANCE_INFO_UPDATE, this, this.onAllianceUpdate);
    }
}