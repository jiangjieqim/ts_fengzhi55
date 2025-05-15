import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { SpringFestivalModel } from "../model/SpringFestivalModel";
import { SFShopProxy } from "../proxy/SpringFestivalProxy";
import { SpringFestivalShopItem } from "./item/SpringFestivalShopItem";

export class SpringFestivalShopView extends ViewBase{
    private _ui:ui.views.springFestival.ui_springFestivalShopViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;
    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("springFestival.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.springFestival.ui_springFestivalShopViewUI;
            this.bindClose(this._ui.btn_close);

            ValCtl.Create(this._ui.lab3,this._ui.icon3,ECellType.NianShoulinpian);
            ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.XinNianFuZi);

            this._timeCtl = new TimeCtl(this._ui.lab_time);

            this._ui.list.itemRender = SpringFestivalShopItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRender);
        }
    }

    private onRender(item:SpringFestivalShopItem){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_SHOP,this,this.onUpdataView);
        this.updataTime();
        this._ui.lab1.text = "当前个人威望：" + MainModel.Ins.mRoleData.getVal(ECellType.WeiWang);
        this._ui.list.array = SFShopProxy.Ins.List;
    }

    protected onExit(): void {
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_SHOP,this,this.onUpdataView);
        this._timeCtl.dispose();
    }

    private onUpdataView(){
        this._ui.list.array = SFShopProxy.Ins.List;
    }

    private updataTime(){
        let time = SpringFestivalModel.Ins.rewardEndunix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("已结束");
    }
}