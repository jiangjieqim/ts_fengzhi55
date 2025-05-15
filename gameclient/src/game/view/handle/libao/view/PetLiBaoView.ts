import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { LiBaoZSProxy } from "../proxy/LiBaoProxy";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "../../huodong/views/RateBtn01Ctl";
import { EShopPayType } from "../../shop/proxy/shopProxy";

export class PetLiBaoView extends ViewBase{
    private _ui:ui.views.libao.ui_petLiBaoViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    private rateCtl:RateBtn01Ctl;
    private btnCtl:ButtonCtl;
    private _timeCtl:TimeCtl;

    protected onAddLoadRes(): void {
        this.addAtlas("libao.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.libao.ui_petLiBaoViewUI;
            this.bindClose(this._ui.btn_close);

            this.btnCtl = ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));
            this.rateCtl = new RateBtn01Ctl(this._ui.ratebtn,this,this.onBtnClick,ESkinRateBtn.Red);

            this._ui.list.itemRender = ui.views.libao.ui_liBaoItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._timeCtl = new TimeCtl(this._ui.time1);
        }
    }

    private onBtnClick(){
        if(!this._data)return;
        ActivityModel.Ins.recharge(this._data.f_PurchaseID);
    }

    protected onInit(): void {
        this.updataView();
    }

    protected onExit(): void {
        this._timeCtl.stop();
    }

    private onRenderHandler(item:ui.views.libao.ui_liBaoItemUI){
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item.item,vo);
        item.lab.text = vo.getName();
    }

    private _data:Configs.t_Pack_NewPlayer_Mount_dat;
    private updataView(){
        this._data = LiBaoZSProxy.Ins.getCfgByType(2);
        if(!this._data)return;
        this._ui.list.array = this._data.f_Item.split("|");
        this._ui.lab.text = this._data.f_trueprice + "元";
        let purCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this._data.f_PurchaseID);
        this._ui.lab1.text = StringUtil.moneyCv(purCfg.f_price) + "元抢购";

        //=======================================================
        let curBtn = this.btnCtl;
        if(purCfg.f_isVoucher == EShopPayType.Voucher){
            curBtn = this.rateCtl.btnCtl;
            this.rateCtl.cfg = purCfg;
        }
        RateBtnUtils.Refresh(curBtn,this.btnCtl,this.rateCtl.btnCtl);
        //=======================================================

        let vo = ActivityModel.Ins.getByUid(49);
        if(!vo)return;
        let time = vo.vo.endtime - TimeUtil.serverTime;
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
        this._timeCtl.setText("");
    }
}