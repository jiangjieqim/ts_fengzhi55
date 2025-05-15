import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { AllianceSetWord_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceModel } from "../model/AllianceModel";
import { AllianceCfgProxy } from "../proxy/AllianceProxy";

/**
 * 同盟修改公告页面
 */
export class AllianceNoticeView extends ViewBase{
    private _ui:ui.views.alliance.ui_allianceNoticeViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    protected  onAddLoadRes(){
        this.addAtlas('alliance.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.alliance.ui_allianceNoticeViewUI;
            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.confirm_btn,this,this.onConfirmHandler);
            this._ui.textarea.prompt = E.getLang('NoAllianceNotice');
            this._ui.textarea.promptColor = '#ae6c39';
        }
    }

    private onConfirmHandler() {
        const text = (this._ui.textarea.text).trim();
        const nameLimit = (AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat).f_noticemax;
        if (StringUtil.getNumBytes(text) > nameLimit * 2) {
            E.ViewMgr.ShowMidError(E.getLang('AllianceNoticeLimit', nameLimit));
            return;
        }
        let req = new AllianceSetWord_req();
        req.type = 1;// 1同盟公告 2改名字
        req.value = text;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onAllianceUpdate() {
        const alliance = AllianceModel.Ins.alliance;
        if (!alliance) return;
        this._ui.textarea.text = alliance.notice;
    }

    protected onInit(){
        this.onAllianceUpdate();
        AllianceModel.Ins.on(AllianceModel.ALLIANCE_INFO_UPDATE, this, this.onAllianceUpdate);
    }

    protected onExit(){
        AllianceModel.Ins.off(AllianceModel.ALLIANCE_INFO_UPDATE, this, this.onAllianceUpdate);
    }
}