import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EClientType } from "../../sdk/ClientType";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { t_Pack_SupplyProxy, t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { ActivityVo } from "../model/ActivityVo";
import { EActivityType } from "../model/EActivityType";
import { AutoRateBtn } from "./AutoRateBtn";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "./RateBtn01Ctl";

class ZhuhouBujiRenderItem extends ui.views.huodong.ui_huodonglibao_itemUI{
    private _vo:ActivityVo;
    private cfg:Configs.t_Pack_Supply_dat;
    private rateCtl:RateBtn01Ctl;
    private buyCtl:ButtonCtl;
    constructor(){
        super();
        this.buyCtl = ButtonCtl.CreateBtn(this.buyBtn,this,this.onBuyHandler);
        this.rateCtl = new RateBtn01Ctl(this.ratebtn,this,this.onBuyHandler,ESkinRateBtn.Yellow);
    }

    private onBuyHandler(){
        ActivityModel.Ins.recharge(this.cfg.f_PurchaseID);
    }

    public refreshView(_vo:ActivityVo){
        this._vo = _vo;
        let cfg:Configs.t_Pack_Supply_dat = this.dataSource;
        this.cfg = cfg;
        this.nametf1.text = cfg.f_name;
        ItemViewFactory.renderItemSlots(this.rewardCon,cfg.f_Item,10,1,"left");
        if(_vo){
            // _vo.getParam1(cfg.f_id)
            this.cntTf.text = "限购: " + _vo.getSubTime(cfg) + "/" + cfg.f_BuyTimes;
        }else{
            this.cntTf.text = "";
        }
        let ppCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this.cfg.f_PurchaseID);
        this.moneyTf.text = StringUtil.moneyCv(ppCfg.f_price) + "元";

        //=============================================================
        let btn:ButtonCtl = this.buyCtl;
        if(ppCfg.f_isVoucher == EShopPayType.Voucher){
            btn = this.rateCtl.btnCtl;
            this.rateCtl.cfg = ppCfg;
        }
        RateBtnUtils.Refresh(btn,this.buyCtl,this.rateCtl.btnCtl);
        //=============================================================
    }
}



/**诸侯补给t_Pack_Supply */
export class HuoDongLiBaoView extends ViewBase {
    private _ui: ui.views.huodong.ui_huodonglibao_viewUI;
    private _vo:ActivityVo;
    protected mMask = true;
    protected autoFree = true;
    protected mMainSnapshot = true;
    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_huodonglibao_viewUI; 
            this.btnList.push(ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.onCloseHandler1)));
            this._ui.list1.selectEnable = true;
            this._ui.list1.selectHandler = new Laya.Handler(this,this.onListSelectHandler);
            this._ui.list1.itemRender = ZhuhouBujiRenderItem;
            this._ui.list1.renderHandler = new Laya.Handler(this, this.onListRenderHandler);
            // this._ui.list1.vScrollBarSkin = " ";
        }
    }

    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }

    private onListSelectHandler(v: number) {
        // console.log(v);
        // 重置selectedIndex，防止不能重复点击同一项
        // this._ui.list1.selectedIndex = -1;
    }

    private onListRenderHandler(item:ZhuhouBujiRenderItem) {
        //PackShopMarketProxy.Ins.setItemList(skin, skin.dataSource);
        item.refreshView(this._vo);
    }

    public refresh() {
        //test
        // const data: any[] = [{ id: 38, param1: 2 }, { id: 39, param1: 2 },{ id: 40, param1: 2 },{ id: 41, param1: 1 },{ id: 42, param1: 2 },];
        // const listdata = data.map(o => {
        //     const id = o.id; 
        //     const param1 = o.param1;
        //     const data = new stActivityCell();
        //     data.id = id;
        //     data.param1 = param1;
        //     return data;
        // });


        // // 商品列表
        // const arr: IItem[] = [];
        // listdata.forEach(o => {
        //     const item = PackShopMarketProxy.Ins.getItemById(o.id);
        //     arr.push({ ...item, isSaleOut: o.param1 === 2 ? false : true });
        // });
        // const num = 3;
        // const len = Math.ceil(arr.length / num);
        // const arrGroup: IItem[][] = new Array(len).fill(0).map((o, i) => arr.slice(i * num, (i + 1) * num));
        // this._ui.list1.array = arrGroup;
        this._vo = ActivityModel.Ins.getVo(EActivityType.Pack_Supply);
        this._ui.list1.array = t_Pack_SupplyProxy.Ins.List;
    }
  
    onEnterHandler() {
        // console.log('30元宝刷新');
    }

    protected onAddLoadRes() {
        this.addAtlas('huodong.atlas');
    }

    protected onExit() {
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.refresh);
        if(this._autoBtn){
            this._autoBtn.dispose();
        }
    }
    private _autoBtn:AutoRateBtn;
    protected onInit() {
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.refresh);
        this.refresh();
        this._ui.list1.scrollTo(0);

        let _vo = ActivityModel.Ins.getVo(EActivityType.Pack_Supply);
        if(_vo){
            this._autoBtn=AutoRateBtn.Create(this._ui,_vo.uid);
        }
        if (initConfig.clienttype == EClientType.Discount) {
            this._ui.list1.height = 558;
        } else {
            this._ui.list1.height = 696;
        }
    }
}