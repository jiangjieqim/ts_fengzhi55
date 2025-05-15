import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { AllianceModel } from "../model/AllianceModel";
import { ApplyItem } from "./item/ApplyItem";

/**
 * 同盟申请列表页面
 */
export class AllianceApplyListView extends ViewBase{
    private _ui:ui.views.alliance.ui_allianceApplyViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    protected  onAddLoadRes(){
        this.addAtlas('alliance.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.alliance.ui_allianceApplyViewUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = ApplyItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list.vScrollBarSkin = ' ';
        }
    }

    private onItemRender(item: ApplyItem) {
        item.setData(item.dataSource);
    }

    protected onInit(){
        this.onAllianceListUpdate();
        AllianceModel.Ins.on(AllianceModel.ALLIANCE_APPLY_UPDATE, this, this.onAllianceListUpdate);
    }

    private onAllianceListUpdate() {
        this._ui.list.array = AllianceModel.Ins.applyList;
    }

    protected onExit(){
        AllianceModel.Ins.off(AllianceModel.ALLIANCE_APPLY_UPDATE, this, this.onAllianceListUpdate);
    }
}