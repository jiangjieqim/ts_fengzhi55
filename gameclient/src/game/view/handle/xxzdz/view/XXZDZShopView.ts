import {StringUtil} from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { StarShopOpen_req } from "../../../../network/protocols/BaseProto";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { XXZDZModel } from "../model/XXZDZModel";
import { StarShopProxy } from "../proxy/xxzdxProxy";
import { XXZDZItem6 } from "./item/XXZDZItem6";

export class XXZDZShopView extends ViewBase{
    private _ui:ui.views.xxzdz.ui_xxzdzShopViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("xxzdz.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.xxzdz.ui_xxzdzShopViewUI;
            this.bindClose(this._ui.btn_close);

            this._ui.list.itemRender = XXZDZItem6;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);

            ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.XZJJ);

            this._timeCtl = new TimeCtl(this._ui.time1);
        }
    }

    protected onInit(): void {
        XXZDZModel.Ins.on(XXZDZModel.UPDATA_SHOP_VIEW,this,this.onUpdataView);
        let req:StarShopOpen_req = new StarShopOpen_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        XXZDZModel.Ins.off(XXZDZModel.UPDATA_SHOP_VIEW,this,this.onUpdataView);
        this._timeCtl.stop();
    }

    private onItemRender(item:XXZDZItem6){
        item.setData(item.dataSource);
    }

    private onUpdataView(){
        let val = MainModel.Ins.mRoleData.getVal(ECellType.XZJJ);
        this._ui.lab2.text = StringUtil.val2m(val);
        this._ui.list.array = StarShopProxy.Ins.List;
        let time = XXZDZModel.Ins.goodsFreshUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
     }

     private endTime(){
        this._timeCtl.setText("");
     }
}