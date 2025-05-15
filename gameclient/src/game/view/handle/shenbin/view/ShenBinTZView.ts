import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ShenBinModel } from "../model/ShenBinModel";
import { ShenBinTZItem } from "./ShenBinTZItem";

export class ShenBinTZView extends ViewBase{
    private _ui:ui.views.shenbin.ui_shenbinTZViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    private _panelCtl:ScrollPanelControl;

    protected onAddLoadRes() {
        this.addAtlas("shenbin.atlas");
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.shenbin.ui_shenbinTZViewUI;
            this.bindClose(this._ui.btn_close);
            ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick)),

            this._panelCtl = new ScrollPanelControl();
            this._panelCtl.init(this._ui.panel);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("ShenBinTZTitle","ShenBinTZDec");
    }

    protected onInit(): void {
        ShenBinModel.Ins.on(ShenBinModel.UPDATA_TZ,this,this.updataView);
        this.updataView();
    }

    protected onExit(): void {
        ShenBinModel.Ins.off(ShenBinModel.UPDATA_TZ,this,this.updataView);
        this._panelCtl.clear();
    }

    private updataView(){
        this._panelCtl.clear();
        this._panelCtl.split(ShenBinModel.Ins.tzList, ShenBinTZItemNode, 435, 13);
        this._panelCtl.end(this._panelCtl.getScrollValue());
    }
}

class ShenBinTZItemNode extends RowMoveBaseNode {
    protected clsKey: string = "ShenBinTZItemNode";
    protected createNode(index) {
        let _skin: ShenBinTZItem = Laya.Pool.getItemByClass(this.clsKey, ShenBinTZItem);
        _skin.setData(this.list[index]);
        _skin.y = this.y;
        return _skin;
    }
}