import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { YaoQingModel } from "../model/YaoQingModel";
import { YaoQingValueProxy } from "../proxy/YaoQingProxy";
import { YaoQingItem2 } from "./YaoQingItem2";

export class YaoQingView1 extends ViewBase{
    private _ui:ui.views.yaoqing.ui_yaoqingView1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    protected onAddLoadRes() {}

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.yaoqing.ui_yaoqingView1UI;
            this.bindClose(this._ui.btn_close);

            this._ui.list.itemRender = YaoQingItem2;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    protected onInit(): void {
        YaoQingModel.Ins.on(YaoQingModel.UPDATA_VIEW,this,this.onUpdataView);
        this.onUpdataView();
    }

    protected onExit(): void {
        YaoQingModel.Ins.off(YaoQingModel.UPDATA_VIEW,this,this.onUpdataView);
    }

    private onRenderHandler(item:YaoQingItem2){
        item.setData(item.dataSource);
    }

    private onUpdataView(){
        this._ui.list.array = YaoQingValueProxy.Ins.List;
    }
}