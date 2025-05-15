import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { BaoShiCfgProxy } from "../proxy/BaoShiProxy";

export class BaoShiTJView extends ViewBase{
    private _ui:ui.views.baoshi.ui_baoshiTJViewUI;
    protected mMask = true;
    protected autoFree = true;
    protected  onAddLoadRes(){
        this.addAtlas('baoshi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.baoshi.ui_baoshiTJViewUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = ui.views.baoshi.ui_baoshiTJItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onitemHandler);
        }
    }

    protected onInit(){
        let arr = BaoShiCfgProxy.Ins.List;
        let array = [];
        let obj = {};
        for(let i:number=0;i<arr.length;i++){
            if(!obj[arr[i].f_GemColor]){
                obj[arr[i].f_GemColor] = [];
                array.push(obj[arr[i].f_GemColor]);
            }
            obj[arr[i].f_GemColor].push(arr[i]);
        }
        this._ui.list.array = array;
    }

    protected onExit(){

    }

    private onitemHandler(item:ui.views.baoshi.ui_baoshiTJItemUI){
        let arr = item.dataSource;
        item.title.text = BaoShiCfgProxy.Ins.getNameByType(arr[0].f_GemColor);
        for(let i:number=0;i<arr.length;i++){
            item["icon" + (i+1)].skin = BaoShiCfgProxy.Ins.getBaoShiIcon(arr[i].f_gemicon);
            item["lab" + (i+1)].text = arr[i].f_GemAttr;
        }
    }
}