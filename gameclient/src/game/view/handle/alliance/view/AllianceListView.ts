import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceList_req, AllianceSearch_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceModel } from "../model/AllianceModel";
import { AllianceItem } from "./item/AllianceItem";

/**
 * 随机同盟列表页面
 */
export class AllianceListView extends ViewBase{
    private _ui:ui.views.alliance.ui_allianceListViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    protected  onAddLoadRes(){
        this.addAtlas('alliance.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.alliance.ui_allianceListViewUI;
            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.refresh_btn,this,this.onRefreshHandler);
            ButtonCtl.CreateBtn(this._ui.create_btn,this,this.onCreateHandler);
            ButtonCtl.CreateBtn(this._ui.search_btn,this,this.onSearchHandler);

            this._ui.list.itemRender = AllianceItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list.vScrollBarSkin = ' ';
        }
    }

    private onItemRender(item: AllianceItem) {
        item.setData(item.dataSource);
    }

    private onRefreshHandler() {
        let req = new AllianceList_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onCreateHandler() {
        E.ViewMgr.Open(EViewType.AllianceCreateView);
    }

    private onSearchHandler() {
        const text = (this._ui.input.text).trim();
        if (!text) return;
        let req = new AllianceSearch_req();
        req.value = text;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onInit(){
        AllianceModel.Ins.isMainViewOpened = true;
        this.onAllianceListUpdate();
        AllianceModel.Ins.on(AllianceModel.ALLIANCE_LIST_UPDATE, this, this.onAllianceListUpdate);
    }

    private onAllianceListUpdate() {
        this._ui.list.array = AllianceModel.Ins.allianceList;
    }

    protected onExit(){
        AllianceModel.Ins.off(AllianceModel.ALLIANCE_LIST_UPDATE, this, this.onAllianceListUpdate);
    }
}