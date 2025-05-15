import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../network/SocketMgr";
import { StarBattleLog_req } from "../../../../network/protocols/BaseProto";
import { XXZDZModel } from "../model/XXZDZModel";
import { XXZDZItem5 } from "./item/XXZDZItem5";

export class XXZDZRZView extends ViewBase{
    private _ui:ui.views.xxzdz.ui_xxzdzRZViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    protected onAddLoadRes() {
        this.addAtlas("xxzdz.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.xxzdz.ui_xxzdzRZViewUI;
            this.bindClose(this._ui.btn_close);

            this._ui.list.itemRender = XXZDZItem5;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }

    protected onInit(): void {
        XXZDZModel.Ins.on(XXZDZModel.UPDATA_RIZHI_VIEW,this,this.onUpdataView);
        let req:StarBattleLog_req = new StarBattleLog_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        XXZDZModel.Ins.off(XXZDZModel.UPDATA_RIZHI_VIEW,this,this.onUpdataView);
    }

    private onItemRender(item:XXZDZItem5){
        item.setData(item.dataSource);
    }

    private onUpdataView(){
        this._ui.list.array = XXZDZModel.Ins.rizhiList;
    }
}