import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityType } from "../../huodong/model/EActivityType";
import { AutoRateBtn } from "../../huodong/views/AutoRateBtn";
import { ZiXuanLiBaoModel } from "../model/ZiXuanLiBaoModel";
import { RecurringActivityOptionalPackProxy } from "../proxy/ZiXuanLiBaoProxy";
import { ZiXuanLiBaoItem } from "./ZiXuanLiBaoItem";

export class ZiXuanLiBaoView extends ViewBase{
    private _ui:ui.views.zixuanlibao.ui_zixuanlibaoViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    private _timeCtl:TimeCtl;
    private _autoBtn:AutoRateBtn;

    protected onAddLoadRes() {
        this.addAtlas("zixuanlibao.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.zixuanlibao.ui_zixuanlibaoViewUI;
            this.bindClose(this._ui.btn_close);

            this._timeCtl = new TimeCtl(this._ui.lab_time);
            this._ui.list.itemRender = ZiXuanLiBaoItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:ZiXuanLiBaoItem){
        item.refreshView(this._activityVo);
    }

    protected onInit(): void {
        this._activityVo = ActivityModel.Ins.getVo(EActivityType.zixuanlibao);
        if(!this._activityVo)return;
        this._autoBtn = AutoRateBtn.Create(this._ui,this._activityVo.uid);
        ZiXuanLiBaoModel.Ins.on(ZiXuanLiBaoModel.UPDATA_VIEW,this,this.onUpdataView);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onUpdataView);
        this.updataView();
    }

    protected onExit(): void {
        ZiXuanLiBaoModel.Ins.off(ZiXuanLiBaoModel.UPDATA_VIEW,this,this.onUpdataView);
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onUpdataView);
        if(this._timeCtl){
            this._timeCtl.dispose();
        }
        if(this._autoBtn){
            this._autoBtn.dispose();
        }
    }

    private onUpdataView(){
        this.updataView();
    }

    private _activityVo:ActivityVo;
    private updataView(){
        let time = this._activityVo.vo.endtime - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
        this._ui.list.array = RecurringActivityOptionalPackProxy.Ins.List;
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }
}