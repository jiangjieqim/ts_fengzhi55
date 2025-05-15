import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stDailyEvent } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MoJinXiaoWeiModel } from "../model/MoJinXiaoWeiModel";
import { DailyEventPositionProxy } from "../proxy/MoJinXiaoWeiProxy";

export class MoJinXiaoWeiView2 extends ViewBase{
    private _ui:ui.views.mojinxiaowei.ui_mojinxiaoweiView2UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected mMaskClick: boolean = false;

    protected onAddLoadRes() {
        this.addAtlas("mojinxiaowei.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.mojinxiaowei.ui_mojinxiaoweiView2UI;
            this.bindClose(this._ui.btn_close);
            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.Close));
        }
    }

    protected onInit(): void {
        let data:stDailyEvent = this.Data;
        let cfg:Configs.t_DailyEvent_Position_dat = DailyEventPositionProxy.Ins.GetDataById(MoJinXiaoWeiModel.Ins.xlPosition);
        this._ui.lab_name.text = cfg.f_positionName;
        this._ui.lab.text = cfg["f_introType" + data.type];
        this._ui.img.skin = "remote/mojinxiaowei/" + cfg.f_type2Pic;
        ItemViewFactory.renderItemSlots(this._ui.sp,data.rewardList,10,0.8,"center");
    }

    protected onExit(): void {
        MoJinXiaoWeiModel.Ins.showView();
    }
}