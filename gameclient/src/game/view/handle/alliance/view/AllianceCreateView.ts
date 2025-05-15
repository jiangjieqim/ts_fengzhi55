import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { AllianceCreate_req, AllianceSetWord_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { AllianceModel } from "../model/AllianceModel";
import { AllianceCfgProxy } from "../proxy/AllianceProxy";

/**
 * 创建同盟页面
 */
export class AllianceCreateView extends ViewBase{
    private _ui:ui.views.alliance.ui_allianceCreateViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;
    
    private isModify: boolean = false;
    protected  onAddLoadRes(){
        this.addAtlas('alliance.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.alliance.ui_allianceCreateViewUI;
            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.create_btn,this,this.onCreateHandler);
        }
    }

    private onCreateHandler() {
        const text = (this._ui.input.text).trim();
        const nameLimit = (AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat).f_namemax;
        if (StringUtil.getNumBytes(text) > nameLimit * 2) {
            E.ViewMgr.ShowMidError(E.getLang('AllianceNameLimit', nameLimit));
            return;
        }
        let req;
        if (this.isModify) {
            // 修改
            req = new AllianceSetWord_req();
            req.type = 2;// 1同盟公告 2改名字
            req.value = text;
        } else {
            // 创建
            req = new AllianceCreate_req();
            req.name = text;
        }
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onInit(){
        const conf = AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat;
        this.isModify = this.Data || false;
        if (this.Data) {
            // 修改
            const alliance = AllianceModel.Ins.alliance;
            if (!alliance) return;
            const modifyItems = ItemViewFactory.convertItemList(conf.f_changenamecost);
            this._ui.money_label.text = (modifyItems?.[0].count || 0) + '';
            this._ui.input.text = alliance.name;
            this._ui.title_tf.text = E.getLang('AllianceName');
        } else {
            // 创建
            this._ui.input.text = "";
            this._ui.title_tf.text = E.getLang('AllianceCreate');
            const createItems = ItemViewFactory.convertItemList(conf.f_createcost);
            this._ui.money_label.text = (createItems?.[0].count || 0) + '';
        }
    }

    protected onExit(){

    }
}