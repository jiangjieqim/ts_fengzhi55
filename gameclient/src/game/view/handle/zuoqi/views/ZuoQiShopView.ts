import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ZuoQiModel } from "../ZuoqiModel";
import { ZuoQiEvent } from "../vos/ZuoQiEvent";
import { ZuoQiShopProxy } from "./ZuoQiProxy";
import { ZuoQiShopItem } from "./ZuoQiShopItem";

export class ZuoQiShopView extends ViewBase{
    private _ui:ui.views.zuoqi.ui_zuoqiSHDHViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    protected onAddLoadRes() {
        this.addAtlas("zuoqi.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqiSHDHViewUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = ZuoQiShopItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }

    protected onInit(): void {
        ZuoQiModel.Ins.on(ZuoQiEvent.UPDATA_SHOP_VIEW,this,this.onUpdataView);
        this._ui.list.array = ZuoQiShopProxy.Ins.List;
    }

    protected onExit(): void {
        ZuoQiModel.Ins.off(ZuoQiEvent.UPDATA_SHOP_VIEW,this,this.onUpdataView);
    }

    private onItemRender(item:ZuoQiShopItem){
        item.setData(item.dataSource);
    }

    private onUpdataView(){
        this._ui.list.refresh();
    }
}