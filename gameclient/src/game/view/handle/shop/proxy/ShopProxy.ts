import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stShopItem } from "../../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { System_RefreshTimeProxy, t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ItemVo } from "../../main/vos/ItemVo";
import { EClientType } from "../../sdk/ClientType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ShopModel } from "../ShopModel";
import { IShopItem, ITabItem } from "../vos/Interface";
import { t_Voucher } from "./t_Voucher";
export interface ITabShopItem{
    tabId:number;
    name:string;
    selected:boolean;
    activityType:EActivityType;
}

export enum EShopTabIndex{
    /**热卖 */
    EveryHotSell = 0,
    /**钱庄 */
    MoneyHouse = 1,
    /**金库 */
    GoldHouse = 2,
    /**代金券 */
    Voucher = 3,
}

// 1:是代金券
// 0：不是代金券
export enum EShopPayType{
    /**不是代金券 */
    Normal = 0,
    /**是代金券 */
    Voucher = 1
}

export class ShopProxy extends BaseCfg{
    /**每日热卖 */
    hotPage:number = 1;
    /**页签值 */
    voucherPage:number = 4;

    public GetTabelName() {
        return "t_Shop";
    }
    private static _ins: ShopProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new ShopProxy();
        }
        return this._ins;
    }

    checkVaild(){
        let l:Configs.t_Shop_dat[] = this.List;
        for(let i = 0;i <l.length;i++){
            let cfg = l[i];
            if(cfg.f_Page == this.voucherPage.toString()){
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"your t_Shop`s f_Page is not vaild!");
            }
        }
    }

    /**
     * 获取商城tab列表
     * @returns 商城tab列表
     */
    public getTabItemList(): ITabItem[] {
        let _l: Configs.t_Shop_dat[] = this.List;
        const tabIds: number[] = [...new Set(_l.filter(o => Number(o.f_Page)).map(o =>  Number(o.f_Page)))];
        const minTabId = Math.min(...tabIds);
        let _list:ITabShopItem[] = tabIds.map(tabId => ({
            tabId,
            name: _l.find(o => Number(o.f_Page) === tabId).f_PageName,
            selected: minTabId === tabId ? true : false,
            activityType:0,
        }));

        if(E.sdk.clienttype == EClientType.Discount){
            let o:ITabShopItem = {} as ITabShopItem;
            o.name = E.getLang("voucher_name");
            o.activityType = EActivityType.Voucher;
            o.tabId = this.voucherPage;
            _list.push(o);
        }
        return _list;
    }

    /**
     * 获取商城某一页的商品列表
     * @param tabId 商品的
     * @returns 商城某一页的商品列表
     */
    public getShopItemList(tabId: number): IShopItem[]{
        if(tabId == ShopProxy.Ins.voucherPage){
            return t_Voucher.Ins.List;
        }

        let _l: Configs.t_Shop_dat[] = this.List;
        const boughtItems = ShopModel.Ins.boughtItems;
        return _l.filter(o => Number(o.f_Page) === tabId).map(o => {
            const payItem = new ItemVo();
            payItem.cfgId = Number(o.f_PriceType);
            payItem.count = Number(o.f_Price);
            return {
                payResourceId: Number(o.f_PriceType),
                payResourceAmount: Number(o.f_Price),
                payItem,
                purchaseId: Number(o.f_PurchaseID),
                itemList: ItemViewFactory.convertItemList(o.f_ItemID),
                shopType: 1,
                fid: o.f_id,
                // bought: boughtItems.indexOf(o.f_id) === -1 ? false : true
                bought: this.findByFid(boughtItems,o.f_id) === -1 ? false : true
            }
        });
    }

    private findByFid(boughtItems: stShopItem[],f_id:number){
        let cell = boughtItems.find(o=>o.fid == f_id);
        if(!cell){
            return -1;
        }
    }

    private yilingQuMask(skin: ui.views.mall.ui_mall_itemUI,v:boolean){
        skin.yilingquMask.visible = skin.yilingquLb.visible = v;
    }

    private clearUI(skin: ui.views.mall.ui_mall_itemUI){
        skin.moneyNumLabel.text = "";
        skin.moneyIcon.skin = "";
        skin.zh_con.visible = false;
        skin.dotimg.visible = false;
        skin.doubleIcon.visible = false;
        this.yilingQuMask(skin,false);
    }

    private renderVoucher(skin: ui.views.mall.ui_mall_itemUI,cfg:Configs.t_Voucher_dat){
        // skin.zh_con.visible = true;
        skin.itemNameLabel.text = cfg.f_PageName;
        let itemVo = ItemViewFactory.convertItem(cfg.f_ItemCount);
        if(itemVo){
            skin.icon.skin = IconUtils.getIconByCfgId(itemVo.cfgId);
            skin.countLabel.text = itemVo.count + "";
            let purchaseCfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(cfg.f_PurchaseID);
            skin.moneyNumLabel.text = '￥'+StringUtil.moneyCv(purchaseCfg.f_price);
        }else{
            skin.icon.skin = "";
            skin.countLabel.text = skin.moneyNumLabel.text = cfg.f_id + "";
        }
        // DebugUtil.drawTF(skin,cfg.f_id + "");
    }

    /**转化为元 */
    convertMoney(_purchaseCfg1:Configs.t_Purchase_Price_dat){
        if(_purchaseCfg1.f_isVoucher == EShopPayType.Voucher){
            let rate:number = this.rate;
            let newCNY = StringUtil.moneyCv(_purchaseCfg1.f_price / rate);
            return newCNY;
        }
        return StringUtil.moneyCv(_purchaseCfg1.f_price);
    }
    /**转化为实际消耗的 */
    convertReal(_purchaseCfg1:Configs.t_Purchase_Price_dat){
        if(_purchaseCfg1.f_isVoucher == EShopPayType.Voucher){
            // let rate:number = this.rate;
            // let newCNY = _purchaseCfg1.f_price / rate;
            // return newCNY;
            let val = MainModel.Ins.getEasyPayMoneyVal(_purchaseCfg1);
            return Math.floor(val * this.rate);
        }
        return _purchaseCfg1.f_price;
    }

    /**代金券汇率 */
    private get rate(){
        return parseInt(System_RefreshTimeProxy.Ins.getVal(77).split(":")[1]);
    }

    public setShopItem(skin: ui.views.mall.ui_mall_itemUI, data: IShopItem) {
        this.clearUI(skin);
        if((data as Object).hasOwnProperty("f_id")){
            this.renderVoucher(skin,data as any);
        }else{
            const itemList = data.itemList;
            if (!itemList) return;
            
            skin.icon.skin = itemList[0].getIcon();
            skin.countLabel.text = itemList[0].count.toString();
            skin.itemNameLabel.text = itemList[0].getName();
            const payResourceId: number = data.payResourceId;
            const payResourceAmount: number = data.payResourceAmount;
            const purchaseId: number = data.purchaseId;

            let _purchaseCfg1:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(purchaseId);

            if(_purchaseCfg1 && _purchaseCfg1.f_isVoucher == EShopPayType.Voucher){
                skin.moneyNumLabel.text = "";
                skin.moneyIcon.skin = "";
                skin.zh_con.visible = true;
                if(t_Platform.Ins.dispriceHide){
                    skin.real_tf.visible = false;
                }else{
                    skin.real_tf.text = StringUtil.moneyCv(_purchaseCfg1.f_price)+E.getLang("CNY");
                }
                let newCNY = this.convertMoney(_purchaseCfg1);
                skin.zh_tf.text = E.getLang("voucher_unlock",newCNY.toFixed(2));
            }else{
                const bought: boolean = data.bought;
                if (purchaseId) {
                    if (bought) {
                        skin.doubleIcon.visible = false;
                    } else {
                        skin.doubleIcon.visible = true;
                    }
                } else {
                    skin.doubleIcon.visible = false;
                }

                let _showLabel:string = "";

                if (purchaseId) {
                    skin.moneyIcon.skin = '';
                    skin.moneyIcon.visible = false;
                    _showLabel = '￥' + payResourceAmount.toString();
                } else {
                    skin.moneyIcon.skin = ItemViewFactory.getResourceIcon(payResourceId);
                    skin.moneyIcon.visible = true;
                    _showLabel = payResourceAmount.toString();
                }
                let red:boolean = false;
                let cfg:Configs.t_Shop_dat = this.GetDataById(data.fid);
                if(cfg.f_isfree){
                    _showLabel = E.getLang("Free");
                
                    if(ShopModel.Ins.mGoldFree){
                        //可领取
                        red = true;
                    }else{
                        //已领取
                        this.yilingQuMask(skin,true);
                    }
                }
                skin.dotimg.visible = red;

                skin.moneyNumLabel.text = _showLabel;
            }
        }
    }
}
