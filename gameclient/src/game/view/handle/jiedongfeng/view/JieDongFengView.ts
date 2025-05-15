import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityType } from "../../huodong/model/EActivityType";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { JieDongFengModel } from "../model/JieDongFengModel";
import { JieDongFengItem } from "./JieDongFengItem";

export class JieDongFengView extends ViewBase{
    private _ui:ui.views.jiedoufeng.ui_jiedoufengviewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    private _activityVo:ActivityVo;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("jiedongfeng.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.jiedoufeng.ui_jiedoufengviewUI;
            this.bindClose(this._ui.btn_close);
            ButtonCtl.Create(this._ui.img_tq,new Laya.Handler(this,this.onBtnTQClick));

            this._timeCtl = new TimeCtl(this._ui.timetf);

            this._ui.list.itemRender = JieDongFengItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onBtnTQClick(){
        E.ViewMgr.Open(EViewType.ZhongShenKa);
    }

    protected onInit(): void {
        if(MainModel.Ins.needRed(RedEnum.RED_JieDongFeng)){
            RedUpdateModel.Ins.save(RedEnum.RED_JieDongFeng,TimeUtil.serverTime);
        }
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.updataView);
        JieDongFengModel.Ins.on(JieDongFengModel.UpdataView,this,this.updataView);
        this.updataView();
    }

    protected onExit(): void {
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.updataView);
        JieDongFengModel.Ins.off(JieDongFengModel.UpdataView,this,this.updataView);
        this._timeCtl.stop();
    }

    private onRenderHandler(item:JieDongFengItem){
        item.setData(item.dataSource);
    }

    private updataView(){
        this._activityVo = ActivityModel.Ins.getVo(EActivityType.JieDongFeng);
        if(this._activityVo){
            let time = this._activityVo.vo.endtime - TimeUtil.serverTime;
            if (time > 0) {
                this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
            } else {
                this.endTime();
                this._timeCtl.stop();
            }
            this._ui.list.array = JieDongFengModel.Ins.dataList;
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }
}