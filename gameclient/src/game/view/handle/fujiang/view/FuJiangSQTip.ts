import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangCMoraleProxy } from "../proxy/FuJiangProxy";

export class FuJiangSQTip extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangSQTipUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangSQTipUI;
            this.bindClose(this._ui.btn_close);

            this._ui.list.itemRender = ui.views.fujiang.ui_fujiangAttrItem6UI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnTipClick));
        }
    }

    private onRenderHandler(item:ui.views.fujiang.ui_fujiangAttrItem6UI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    protected onInit(): void {
        let nCfg = FuJiangCMoraleProxy.Ins.getCfgByStar(FuJiangModel.Ins.getAllStarNum());
        let nArr = nCfg.f_MoraleAttr.split("|");
        this._ui.list.array = nArr;
    }

    protected onExit(): void {
        
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("FuJiangSQTitle","FuJiangSQDec");
    }
}