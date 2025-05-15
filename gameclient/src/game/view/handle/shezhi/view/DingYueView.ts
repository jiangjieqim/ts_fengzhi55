import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SheZhiDingYueProxy } from "../proxy/SetZhiProxy";
import { DingYueItem } from "./item/DingYueItem";

export class DingYueView extends ViewBase{
    private _ui:ui.views.shezhi.ui_dingyueUI;
    protected mMask = true; 

    protected onAddLoadRes() {
        this.addAtlas('shezhi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.shezhi.ui_dingyueUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = DingYueItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }

    protected onInit() {
        this.upDataView();
    }

    protected onExit() {

    }

    private onItemRender(item:DingYueItem){
        item.setData(item.dataSource);
    }
    
    private upDataView(){
        this._ui.list.array = SheZhiDingYueProxy.Ins.getListByType(initConfig.platform);
    }
}