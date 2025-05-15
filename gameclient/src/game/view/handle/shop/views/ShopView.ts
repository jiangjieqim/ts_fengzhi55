import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { BuyItem_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EFuncDef } from "../../main/model/EFuncDef";
import { EBuyType, MainModel } from "../../main/model/MainModel";
import { ShopBuyView } from "../../main/views/ShopBuyView";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { EShopTabIndex, ShopProxy } from "../proxy/shopProxy";
import { ShopModel } from "../ShopModel";
import { IShopItem, ITabItem } from "../vos/Interface";
import { MoneyInfoViewCtl } from "./MoneyInfoViewCtl";

// 商城市集界面
export class ShopView extends ViewBase {
    protected _ui: ui.views.mall.ui_mallUI;
    protected mMask = true;
    private tabsCtl:TabControl = new TabControl();
    private tabList: ITabItem[];
    // private payResourceId: number;
    private tabs = [];
    protected addTabs(con:Laya.Sprite){
        this.tabs = [];
        for(let i = 0;i < con.numChildren;i++){
            this.tabs.push(con.getChildAt(i));
        }
        con.visible = true;
    }

    protected onInitUI(){
        this._ui.voucher_money.visible = false;
        new MoneyInfoViewCtl(this._ui.moneyInfo,ECellType.GOLD);
        this.addTabs(this._ui.tabcon0);
    }

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.mall.ui_mallUI;
            this.tabList = ShopProxy.Ins.getTabItemList();
            // const tabs = new Array(3).fill(1).map((o, i) => this._ui[`t${i}`]);
            this._ui.tabcon0.visible = this._ui.tabcon1.visible = false;
            this.onInitUI();
            this.tabsCtl.init(this.tabs, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));
            this.tabsCtl.checkHandler = new Laya.Handler(this,this.onCheckIndex);
            this.tabsCtl.selectIndex = 0;
            ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.onCloseHandler1));
            this._ui.itemList.selectEnable = true;
            this._ui.itemList.vScrollBarSkin = " ";
            this._ui.itemList.selectHandler = new Laya.Handler(this,this.onListSelectHandler);
            this._ui.itemList.itemRender = ui.views.mall.ui_mall_itemUI;
            this._ui.itemList.renderHandler = new Laya.Handler(this, this.onShopItemHandler);
            const tabId = this.tabList[this.tabsCtl.selectIndex].tabId;
            this._ui.itemList.array = ShopProxy.Ins.getShopItemList(tabId);
        }
    }

    private onCheckIndex(index:number){
        if(this.canPay(index)){
            return true;
        }
        return false;
    }

    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }
    protected onVoucherSelect(cfg:Configs.t_Voucher_dat,v:number){
        ActivityModel.Ins.recharge(cfg.f_PurchaseID);
        this._ui.itemList.selectedIndex = -1;
    }

    private canPay(index:number){
        // const index = this.tabsCtl.selectIndex;
        if(!ShopModel.Ins.canPay){
            if(index == EShopTabIndex.GoldHouse || index == EShopTabIndex.Voucher){
                E.ViewMgr.ShowMidError("暂不提供支付");
                return false;
            }
        }
        return true;
    }

    private onListSelectHandler(v: number) {
        const shopItem: IShopItem = this._ui.itemList.array[v];
        if (!shopItem) return;
        const index = this.tabsCtl.selectIndex;

        const tabId = this.tabList[index].tabId;

        if(tabId == ShopProxy.Ins.voucherPage){
            this.onVoucherSelect(shopItem as any,v);
            return;
        }
        let cfg:Configs.t_Shop_dat = ShopProxy.Ins.GetDataById(shopItem.fid);
        if(!cfg){
            return;
        }
        /*
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
        */
        ShopModel.Ins.buy(tabId,cfg,shopItem);
        
        // 重置selectedIndex，防止不能重复点击同一项
        this._ui.itemList.selectedIndex = -1;
        //this.tabsCtl.selectIndex = -1;
    }
    // private onGameCoinConfirm(shopItem: IShopItem) {
    //     ShopModel.Ins.onGameCoinConfirm(shopItem);
    // }

    private onTabSelectHandler() {
        this.refresh();
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.huodong.ui_xingfu_tabItemUI = tabSkin;
        const tabItem = this.tabList[index];
        skin.tf.text = tabItem.name;
        skin.redimg.visible = false;
        if(tabItem.tabId == ShopModel.Ins.PageTypeGold){
            if(ShopModel.Ins.mGoldFree){
                skin.redimg.visible = true;
            }
        }
        if (sel) {
            skin.bg1.skin = "remote/huodong/anniu_2.png";
        } else {
            skin.bg1.skin = "remote/huodong/anniu_1.png";
        }
    }

    private onShopItemHandler(skin: ui.views.mall.ui_mall_itemUI) {
        ShopProxy.Ins.setShopItem(skin, skin.dataSource);
    }

    public refresh() {
        const index = this.tabsCtl.selectIndex;

        const tabId = this.tabList[index].tabId;
        const shopItems = ShopProxy.Ins.getShopItemList(tabId);
        this._ui.itemList.array = shopItems;

        let hotItemId = ShopModel.Ins.hotItemId;
        if(hotItemId && ShopModel.Ins.curIndex == EShopTabIndex.EveryHotSell){
            for(let i = 0;i < shopItems.length;i++){
                let cell = shopItems[i];
                if(cell.itemList[0].cfgId == hotItemId){
                    this._ui.itemList.scrollTo(i);
                    break;
                }
            }
            ShopModel.Ins.hotItemId = 0;
        }
/*
        // 右上角展示的玩家资源信息
        if (shopItems && shopItems.length) {
            if (shopItems[0].purchaseId) {
                // 现金充值（显示现金购买的资源信息）
                if (shopItems[0].itemList.length) {
                    const item =  shopItems[0].itemList[0];
                    this._ui.moneyInfo.icon.skin = ItemViewFactory.getResourceIcon(item.cfgId);
                    this._ui.moneyInfo.moneyCountLabel.text = MainModel.Ins.mRoleData.getVal(item.cfgId).toString();
                    this._ui.moneyInfo.visible = true;
                } else {
                    this.payResourceId = 0;
                    this._ui.moneyInfo.visible = false;
                }
            } else {
                // 虚拟货币购买（显示支付的资源信息）
                const payResourceId = shopItems[0].payResourceId;
                this.payResourceId = payResourceId;
                this._ui.moneyInfo.icon.skin = ItemViewFactory.getResourceIcon(payResourceId);
                this._ui.moneyInfo.moneyCountLabel.text = MainModel.Ins.mRoleData.getVal(payResourceId).toString();
                this._ui.moneyInfo.visible = true;
            }
        } else {
            this.payResourceId = 0;
            this._ui.moneyInfo.visible = false;
        }
*/
        this.tabsCtl.refreshTabsView();
    }

    public refreshResources() {
        // const payResourceId = this.payResourceId;
        // if (this._ui.moneyInfo.visible && payResourceId) {
        //     this._ui.moneyInfo.moneyCountLabel.text = MainModel.Ins.mRoleData.getVal(payResourceId).toString();
        // }
    }

    onEnterHandler() {

    }

    protected onAddLoadRes() {
        this.addAtlas('huodong.atlas');
        // this.addAtlas('mall.atlas');
    }
    // protected mMainSnapshot = true;
    protected onExit() {
        // MainModel.Ins.mainMask = false;
    }
    

    protected onInit() {
        // MainModel.Ins.mainMask = true;
        this.tabsCtl.selectIndex = ShopModel.Ins.curIndex;
        this.refresh();
    }

    updateViewIndex(){
        this.onInit();
    }
}