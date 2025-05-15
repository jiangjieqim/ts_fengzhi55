import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stActivityCell } from "../../../../network/protocols/BaseProto";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { IItem, PackShopMarkConfigProxy, PackShopMarketProxy } from "../model/ActivityProxy2";
import { ActivityVo } from "../model/ActivityVo";
import { EActivityType } from "../model/EActivityType";
import { ZheKouShangDianItem1View } from "./ZheKouShangDianItem1View";

export class SanGuoShiJiView extends ViewBase {
    protected activityType:EActivityType = EActivityType.SanGuo;
    protected _activityVo:ActivityVo;

    private _ui: ui.views.huodong.ui_sanguoshiji_viewUI;
    protected mMask = true;
    private _timeCtl:TimeCtlV2;
    private refreshItemVo: ItemVo;

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_sanguoshiji_viewUI; 
            ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.onCloseHandler1));
            ButtonCtl.Create(this._ui.btn1,new Laya.Handler(this,this.onEnterHandler));  
            this._ui.list1.itemRender = ZheKouShangDianItem1View;
            this._ui.list1.renderHandler = new Laya.Handler(this, this.onListRenderHandler);
            this._timeCtl = new TimeCtlV2(this._ui.timetf,"{0}");
            const refreshItemVo = PackShopMarkConfigProxy.Ins.getRefreshItemVo();
            // 刷新按钮
            this._ui.tf2.text = refreshItemVo.count.toString();
            this._ui.needicon.skin = refreshItemVo.getIcon();
            this.refreshItemVo = refreshItemVo;
        }
    }

    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }

    private onListRenderHandler(item: ZheKouShangDianItem1View, index: number) {
        item.setData(item.dataSource);
    }

    public refresh() {
        this._activityVo = ActivityModel.Ins.getVo(this.activityType);
        if (!this._activityVo) return;

        // 商品列表
        const arr = this._activityVo.vo.datalist;
        const num = 3;
        const len = Math.ceil(arr.length / num);
        const arrGroup: stActivityCell[][] = new Array(len).fill(0).map((o, i) => arr.slice(i * num, (i + 1) * num));
        this._ui.list1.array = arrGroup;
    }

    public refreshResources() {
        const arrGroup: stActivityCell[][] = this._ui.list1.array;
        if (arrGroup && arrGroup.length && arrGroup[0] && arrGroup[0].length) {
            const item: IItem = PackShopMarketProxy.Ins.getItemById(arrGroup[0][0].id);
            this._ui.moneyicon.skin = item.payItemVo.getIcon();
            const count = MainModel.Ins.mRoleData.getVal(item.payItemVo.cfgId);
            this._ui.moneyTf.text = StringUtil.val2m(count).toString();
            if (this.refreshItemVo) {
                if (this.refreshItemVo.count > count) {
                    this._ui.btn1.disabled = true;
                    this._ui.btn1.gray = true;
                } else {
                    this._ui.btn1.disabled = false;
                    this._ui.btn1.gray = false;
                }
            }
        }
    }

    private onTimeComplete() {
        this._activityVo = ActivityModel.Ins.getVo(this.activityType);
        if (this._activityVo && this._activityVo.endTime- TimeUtil.serverTime > 0){
            this.timeRefresh();
        }else{
            this._ui.timetf.text = "";
        }
    }

    private timeRefresh() {
        if (!this._activityVo) return;
        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
        // const time = ActivityTimeUtils.getTime(this._activityVo.cfg);
        this._timeCtl.start(this._activityVo.endTime- TimeUtil.serverTime);
    }

    // 刷新
    onEnterHandler() {
        ActivityModel.Ins.lingQu(this._activityVo.uid, 0);
    }

    protected onAddLoadRes() {
        this.addAtlas('huodong.atlas');
    }
    protected mMainSnapshot = true;
    protected onExit() {
        // MainModel.Ins.mainMask = false;
        this._timeCtl.stop();
        ActivityModel.Ins.off(ActivityEvent.UpdateData, this, this.onUpdateDataEvt);
        MainModel.Ins.off(MainEvent.ValChange, this, this.refreshResources);
    }
    
    private onUpdateDataEvt(){
        this.refresh();
    }

    protected onInit() {
        // MainModel.Ins.mainMask = true;
        this.refresh();
        ActivityModel.Ins.on(ActivityEvent.UpdateData, this, this.onUpdateDataEvt);
        MainModel.Ins.on(MainEvent.ValChange, this, this.refreshResources);
        this.timeRefresh();
        this.refreshResources();
    }
}