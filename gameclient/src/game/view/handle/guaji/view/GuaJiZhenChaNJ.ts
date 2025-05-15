import { TimeCtlMs } from "../../../../../frame/util/ctl/TimeCtlMs";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { RateBtn01Ctl, ESkinRateBtn } from "../../huodong/views/RateBtn01Ctl";
import { EClientType } from "../../sdk/ClientType";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { GuaJiModel } from "../model/GuaJiModel";
import { GuaJiCfgProxy, GuaJiPackProxy } from "../proxy/GuaJiProxy";
import { GuaJiYQItem } from "./GuaJiYQItem";

export class GuaJiZhenChaNJ extends ViewBase{
    private _ui:ui.views.guaji.ui_zhenchanaijiuUI;
    protected mMask = true;

    private _timeCtl:TimeCtlMs;
    private hotBtn:RateBtn01Ctl;
    private btn_buyCtl:ButtonCtl;
    protected onAddLoadRes() {
        this.addAtlas('guaji.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.guaji.ui_zhenchanaijiuUI;
            this.bindClose(this._ui.close1);
            
            this._ui.list.itemRender = GuaJiYQItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);

            this._timeCtl = new TimeCtlMs(this._ui.lab_time);

            this.hotBtn = new RateBtn01Ctl(this._ui.btnhot,this,this.onBtnBuyClick,ESkinRateBtn.Yellow);
            this.btn_buyCtl = ButtonCtl.Create(this._ui.btn_buy,new Laya.Handler(this,this.onBtnBuyClick));

            if(initConfig.clienttype == EClientType.Discount){
                this._ui.yqCon.visible = false;
                this._ui.botCon.y = 219;
            }else{
                this._ui.yqCon.visible = true;
                this._ui.botCon.y = 377;
            }
        }
    }

    protected onInit() {
        GuaJiModel.Ins.on(GuaJiModel.UPDATA_VIEW,this,this.updataView);
        this.updataView();
    }

    protected onExit() {
        GuaJiModel.Ins.off(GuaJiModel.UPDATA_VIEW,this,this.updataView);
        this._timeCtl.stop();
    }

    private onBtnBuyClick(){
        ActivityModel.Ins.recharge(GuaJiPackProxy.Ins.GetDataById(1).f_PurchaseID);
    }

    private onItemRender(item:GuaJiYQItem){
        item.setData(item.dataSource);
    }

    private updataView(){
        this._timeCtl.stop();
        let t = GuaJiModel.Ins.mianData.endUnix.toNumber() - TimeUtil.serverTimeMS;
        if(t > 0){
            this._timeCtl.start(t,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
        }else{
            this.endTime();
        }

        let arr = [];
        let len = GuaJiCfgProxy.Ins.GetDataById(1).f_FriendHelpLimit;
        for(let i:number=0;i<len;i++){
            if(GuaJiModel.Ins.inviteeData[i]){
                arr.push({data:GuaJiModel.Ins.inviteeData[i]});
            }else{
                arr.push({data:null});
            }
        }
        this._ui.list.array = arr;
        let ppCfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(GuaJiPackProxy.Ins.GetDataById(1).f_PurchaseID)
        let time = GuaJiPackProxy.Ins.GetDataById(1).f_Item;
        let t1 = GuaJiCfgProxy.Ins.GetDataById(1).f_AFKTimeLimit;
        let t2 = GuaJiModel.Ins.inviteeData.length * GuaJiCfgProxy.Ins.GetDataById(1).f_SingleFriendHelpTime;
        this._ui.lab_time1.text = TimeUtil.getTimeShow(t1 + t2);
        this._ui.lab_time2.text = TimeUtil.getTimeShow(t1 + t2 + time);

        let btn:ButtonCtl;

        this.hotBtn.visible = false;
        this.btn_buyCtl.visible = false;
        if(ppCfg.f_isVoucher == EShopPayType.Voucher){
            this.hotBtn.cfg = ppCfg;
            btn = this.hotBtn.btnCtl;
        }else{
            btn = this.btn_buyCtl;
        }


        if(TimeUtil.serverTime > GuaJiModel.Ins.packEndUnix){
            this._ui.lab_gm.visible = false;
            btn.visible = true;
        }else{
            this._ui.lab_gm.visible = true;
            btn.visible = false;
        }
    }

    private onUpdateTime(){
        let tt = Math.floor(this._timeCtl.tickVal/1000);
        let time_str = TimeUtil.subTime(tt);
        this._timeCtl.setText(time_str);
    }

    private endTime(){
        this._timeCtl.setText("00:00:00");
        this._timeCtl.stop();
    }
}