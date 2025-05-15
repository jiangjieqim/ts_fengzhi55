import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { PaoShangModel } from "../model/PaoShangModel";
import { PaoShangSlotOpenProxy } from "../proxy/PaoShangProxy";
import { PaoShangJSItem } from "./item/PaoShangJSItem";

/* @Author: tsy
 * @Date: 2023-02-28 10:14:16
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-04-17 13:21:03
*/
export class PaoShangJSView extends ViewBase{
    private _ui:ui.views.paoshang.ui_paoshangJSUI;
    protected mMask = true;

    protected onAddLoadRes() {
        this.addAtlas('paoshang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.paoshang.ui_paoshangJSUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = PaoShangJSItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.itemRender);
        }
    }

    protected onInit() {
       this.updataView();
    }

    protected onExit() {
       
    }

    private itemRender(item:PaoShangJSItem){
        item.setData(item.dataSource);
    }

    private updataView(){
        let arr = [];
        let index = -1;
        let list = PaoShangSlotOpenProxy.Ins.getListByType(1);
        for(let ele of list){
            if(PaoShangModel.Ins.buyIds){
                index = PaoShangModel.Ins.buyIds.findIndex(item => item == parseInt(ele.f_id));
            }
            if(index == -1){
                let dex = arr.findIndex(item => parseInt(item.f_Enable) == 1);
                if(dex == -1){
                    arr.push(ele);
                }
            }
        }

        for(let i:number=2;i<4;i++){
            list = PaoShangSlotOpenProxy.Ins.getListByType(i);
            if(PaoShangModel.Ins.buyIds){
                index = PaoShangModel.Ins.buyIds.findIndex(item => item == parseInt(list[0].f_id));
            }
            if(index == -1){
                arr.push(list[0]);
            }
        }
        this._ui.list.array = arr;        
    }

}