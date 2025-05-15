import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SpringFestivalCanJoin_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { SFConfigProxy } from "../proxy/SpringFestivalProxy";
import { SpringFestivalTipItem } from "./item/SpringFestivalTipItem";

export class SpringFestivalTipView extends ViewBase{
    private _ui:ui.views.springFestival.ui_springFestivalTipViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    protected onAddLoadRes() {
        this.addAtlas("springFestival.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.springFestival.ui_springFestivalTipViewUI;
            this.bindClose(this._ui.btn_close);

            this.btnList.push(
                ButtonCtl.Create(this._ui.btn, new Laya.Handler(this, this.onClick))
            )

            this._ui.list.itemRender = SpringFestivalTipItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRender);
        }
    }

    private onRender(item:SpringFestivalTipItem,index:number){
        item.setData(item.dataSource,index);
    }

    private onClick(){
        let req:SpringFestivalCanJoin_req = new SpringFestivalCanJoin_req;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    protected onInit(): void {
        this._ui.list.array = SFConfigProxy.Ins.GetDataById(1).f_openViewItem.split("|");
    }

    protected onExit(): void {
       
    }
}