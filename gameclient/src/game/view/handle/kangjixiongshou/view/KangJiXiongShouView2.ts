import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { RecurringActivityBossProxy } from "../proxy/KangJiXiongShouProxy";

export class KangJiXiongShouView2 extends ViewBase{
    private _ui:ui.views.kangjixiongshou.ui_kangjixiongshouView2UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    protected onAddLoadRes() {
        
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.kangjixiongshou.ui_kangjixiongshouView2UI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = ui.views.kangjixiongshou.ui_kangjixiongshouItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:ui.views.kangjixiongshou.ui_kangjixiongshouItemUI){
        let arr = item.dataSource.f_Probability.split("-");
        for(let i:number=0;i<arr.length;i++){
            item["lab" + (i+1)].text = parseInt(arr[i]) / 100 + "%";
        }
        let itemVo:ItemVo = ItemViewFactory.convertItemList(item.dataSource.f_Reward)[0];
        ItemViewFactory.refreshSlot(item.slot,itemVo);
    }

    protected onInit(): void {
        let arr = [];
        let array = RecurringActivityBossProxy.Ins.List;
        for(let i:number=0;i<array.length;i++){
            if(array[i].f_RewardType == 2){
                arr.push(array[i]);
            }
        }
        this._ui.list.array = arr;
    }

    protected onExit(): void {
        
    }
}