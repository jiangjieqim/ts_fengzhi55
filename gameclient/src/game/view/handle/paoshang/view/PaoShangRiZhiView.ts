import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { HandleStationLogs_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { PaoShangModel } from "../model/PaoShangModel";
import { PaoShangRiZhiItem } from "./item/PaoShangRiZhiItem";

/* @Author: tsy
 * @Date: 2023-03-01 10:30:52
 * @Last Modified by: tsy
 * @Last Modified time: 2023-03-01 10:46:48
*/
export class PaoShangRiZhiView extends ViewBase{
    private _ui:ui.views.paoshang.ui_rizhiUI;
    protected mMask = true;

    protected onAddLoadRes(){
        this.addAtlas('paoshang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.paoshang.ui_rizhiUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = PaoShangRiZhiItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.itemRender);
        }
    }

    protected onInit() {
        PaoShangModel.Ins.on(PaoShangModel.UPDATA_RIZHI,this,this.updataView);
        let req:HandleStationLogs_req = new HandleStationLogs_req();
        SocketMgr.Ins.SendMessageBin(req);
     }
 
     protected onExit() {
        PaoShangModel.Ins.off(PaoShangModel.UPDATA_RIZHI,this,this.updataView);
     }

     private itemRender(item:PaoShangRiZhiItem){
        item.setData(item.dataSource);
     }

     private updataView(){
        this._ui.list.array = PaoShangModel.Ins.riZhiList;
     }
}