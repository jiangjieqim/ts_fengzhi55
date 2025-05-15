import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MonopolyModel } from "../model/MonopolyModel";
import { MonopolyLBItem } from "./MonopolyLBItem";

export class MonopolyLBView extends ViewBase{
    private _ui:ui.views.monopoly.ui_MonopolyLBViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("monopoly.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.monopoly.ui_MonopolyLBViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
                // ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick))
            );

            this._timeCtl = new TimeCtl(this._ui.lab_time);

            this._ui.list.itemRender = MonopolyLBItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onLBRender);
        }
    }

    protected onInit(): void {
        MonopolyModel.Ins.on(MonopolyModel.UPDATA_VIEW_PACK,this,this.updataView);
        this.updataView();
    }

    protected onExit(): void {
        MonopolyModel.Ins.off(MonopolyModel.UPDATA_VIEW_PACK,this,this.updataView);
        this._timeCtl.stop();
    }

    private updataView(){
        let time = MonopolyModel.Ins.refreshUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
        this._ui.list.array = MonopolyModel.Ins.packList;
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal) + "后重置";
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    private onLBRender(item:MonopolyLBItem){
        item.setData(item.dataSource);
    }
}