import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { PlatformConfig } from "../../../../InitConfig";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { BuyItemResult_revc, BuyItem_req, ShopBoughtItems_revc, stShopItem } from "../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../network/SocketMgr";
import {DotManager} from "../common/DotManager";
import { ActivityModel } from "../huodong/ActivityModel";
import { EFuncDef } from "../main/model/EFuncDef";
import { EBuyType, MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { t_Platform } from "../main/proxy/t_Platform";
import { ShopBuyView } from "../main/views/ShopBuyView";
import { ItemVo } from "../main/vos/ItemVo";
import { EShopTabIndex, ShopProxy } from "./proxy/shopProxy";
import { ShopView } from "./views/ShopView";
import { IShopItem } from "./vos/Interface";

export class ShopModel extends BaseModel {
    /**金库 */
    public readonly PageTypeGold:number = 3;

    private _gold_f_id:number;
    public boughtItems: stShopItem[] = [];//stShopItem
    private static _ins: ShopModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new ShopModel();
        }
        return this._ins;
    }
    public onInitCallBack():void{}

    public curIndex:number = 0;

    /**
     * 热卖道具id
     */
    public hotItemId:number;
    public onShopBoughtItemsRevc(data:ShopBoughtItems_revc) {
        this.boughtItems = data.datalist;
        this.updateRed();
    }

    public updateRed() {
        if (TaskModel.Ins.isFuncOpen(EFuncDef.Shop)) {
            /**商城金库红点 */
            /*
            if (this.mGoldFree) {
                DotManager.addMainDot("btn0", -15, -20);
            } else {
                DotManager.remMainDot("btn0");
            }
            */
        }
    }

    /**是否提供支付 */
    get canPay(){
        if(t_Platform.Ins.IOS_recharge){
            return true;
        }
        if(Laya.Browser.onIOS || Laya.Browser.onIPad || Laya.Browser.onIPhone || Laya.Utils.getQueryString("onIOS") || initConfig.debug_onIOS){
            return false;
        }
        return true;
    }
    private get goldfid(){
        if (!this._gold_f_id) {
            let _page: number = this.PageTypeGold;//金库
            let list1 = ShopProxy.Ins.List;
            for (let i = 0; i < list1.length; i++) {
                let cfg: Configs.t_Shop_dat = list1[i];
                if (cfg.f_isfree && parseInt(cfg.f_Page) == _page) {
                    // return cfg.f_id;
                    this._gold_f_id = cfg.f_id;
                    break;
                }
            }
        }
        return this._gold_f_id;
    }

    /**金库是否有免费领取的奖励可以领取 */
    public get mGoldFree() {
       let fid = this.goldfid;
       if(this.boughtItems){
            let obj:stShopItem = this.boughtItems.find(cell=>cell.fid == fid);
            if(obj){
                // 0不可购买 1可购买
                return obj.state == 1;
            }
       }
       return true;
    }

    public initMsg(){
        E.MsgMgr.AddMsg(MSGID.BuyItemResultRevc, this.onBuyItemResultRevc,this);
    }

    private onBuyItemResultRevc(revc:BuyItemResult_revc) {
        const shopView = E.ViewMgr.Get(EViewType.Shop) as ShopView;
        if (shopView.IsShow()) {
            shopView.refreshResources();
        }
        // if (this.boughtItems.indexOf(revc.data.fid) === -1) {
        //     this.boughtItems.push(revc.data.fid);
        //     shopView.refresh();
        // }
        let cell =  this.boughtItems.find(o=>o.fid == revc.data.fid);
        if(!cell){
            this.boughtItems.push(revc.data);
            if(E.ViewMgr.isOpenReg(EViewType.Shop)){
                shopView.refresh();
            }
        }
        this.updateRed();
        if(revc.data.fid == this.goldfid){
            E.ViewMgr.ShowMidOk('领取成功');
        }else{
            E.ViewMgr.ShowMidOk('购买成功');
        }
    }

    /**元宝商店 */
    public showShopView() {
        if(!TaskModel.Ins.isFuncOpen(EFuncDef.Shop,true)){
            return;
        }
        this.curIndex = EShopTabIndex.GoldHouse;//2;
        E.ViewMgr.Open(EViewType.Shop);

        // const shopView = E.ViewMgr.Get(EViewType.Shop) as ShopView;
        // if (!shopView.IsShow()) {
        // E.ViewMgr.Open(EViewType.Shop, null);
        // }
    }

    /**代金券商店 */
    public showVoucherView() {
        if (!TaskModel.Ins.isFuncOpen(EFuncDef.Shop, true)) {
            return;
        }
        this.curIndex = EShopTabIndex.Voucher;
        let viewType = EViewType.Shop;
        if(E.ViewMgr.isOpenReg(viewType)){
            (E.ViewMgr.Get(EViewType.Shop) as ShopView).updateViewIndex();
        }else{
            E.ViewMgr.Open(viewType);
        }
    }

    /**金币商店 */
    public showEveryDay(){
        if(!TaskModel.Ins.isFuncOpen(EFuncDef.Shop,true)){
            return;
        }
        this.curIndex = EShopTabIndex.MoneyHouse;//1;
        E.ViewMgr.Open(EViewType.Shop);
    }

    public openHotSell(itemId:number = 0){
        if(!TaskModel.Ins.isFuncOpen(EFuncDef.Shop,true)){
            return;
        }
        this.curIndex = EShopTabIndex.EveryHotSell;
        this.hotItemId = itemId;
        E.ViewMgr.Open(EViewType.Shop);
    }
    private onGameCoinConfirm(shopItem: IShopItem) {
        let _count:number = 1;
        if(E.ViewMgr.isOpenReg(EViewType.ShopBuy)){
            let view:ShopBuyView = E.ViewMgr.Get(EViewType.ShopBuy) as ShopBuyView;
            _count = view.selCount;
        }
        // LogSys.Log(`need buy batch ${_count}`);
        // ActivityModel.Ins.useGold(shopItem.payResourceAmount);
        // console.log(shopItem.payResourceId, shopItem.payResourceAmount, shopItem.fid);
        const req = new BuyItem_req();
        req.type = shopItem.shopType;
        req.fid = shopItem.fid;
        req.count = _count;
        SocketMgr.Ins.SendMessageBin(req);
    }
    
    buy(tabId:number,cfg:Configs.t_Shop_dat,shopItem: IShopItem){
        if(cfg.f_isfree){
            if(ShopModel.Ins.mGoldFree){
                //免费
                this.onGameCoinConfirm(shopItem)
            }
        }
        else if (shopItem.purchaseId) {
            // 现金购买
            //this.onConfirm(shopItem);
            ActivityModel.Ins.recharge(shopItem.purchaseId);
        } else {
            let target:ItemVo = shopItem.itemList[0];
            let _itemType:EBuyType = EBuyType.Item;
            
            if(MainModel.Ins.isOpenAllByFuncid(EFuncDef.MushBuy+"") && tabId == ShopProxy.Ins.hotPage){
                _itemType = EBuyType.HotItem;
            }
            // ShopModel.Ins.buy(cfg,shopItem,target,_itemType);
            MainModel.Ins.buy(shopItem.payResourceId,shopItem.payResourceAmount,target.cfgId,target.count,
            new Laya.Handler(this,this.onGameCoinConfirm,[shopItem]),_itemType,true);           
        }
    }

}