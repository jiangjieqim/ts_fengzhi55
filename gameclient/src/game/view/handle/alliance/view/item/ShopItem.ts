import { ui } from "../../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { AllianceShop_req } from "../../../../../network/protocols/BaseProto";
import { EBuyType, MainModel } from "../../../main/model/MainModel";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { E } from "../../../../../G";
import { ItemVo } from "../../../main/vos/ItemVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";

export class ShopItem extends ui.views.alliance.ui_alliance_mall_itemUI{
    constructor() {
        super();
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        const shopItem = this._data;
        if (!shopItem) return;
        MainModel.Ins.buy(
            shopItem.priceItemList[0].cfgId,
            shopItem.priceItemList[0].count,
            shopItem.itemList[0].cfgId,
            shopItem.itemList[0].count,
            new Laya.Handler(this, this.onGameCoinConfirm, [shopItem]),
            EBuyType.Item,
            false
        );
    }

    private onGameCoinConfirm() {
        let req:AllianceShop_req = new AllianceShop_req;
        req.fid = this._data.fid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data: { fid: number, bought: number, itemList: ItemVo[], priceItemList: ItemVo[], limit: number };

    public setData(value: Configs.t_Alliance_Shop_dat){
        if(!value)return;
        
        this.clearUI();
        const itemList = ItemViewFactory.convertItemList(value.f_goods);
        if (!itemList) return;
        let skin = this;
        skin.icon.skin = itemList[0].getIcon();
        skin.countLabel.text = itemList[0].count.toString();
        skin.itemNameLabel.text = itemList[0].getName();
        skin.iconBg.skin = itemList[0].quaIcon();
        const priceItemList = ItemViewFactory.convertItemList(value.f_price);
        const payResourceId: number = priceItemList[0].cfgId;
        const payResourceAmount: number = priceItemList[0].count;
        //onst purchaseId: number = data.purchaseId;
        const bought: number = value['count'] || 0;
        skin.doubleIcon.visible = false;

        let _showLabel:string = "";

        skin.moneyIcon.skin = ItemViewFactory.getResourceIcon(payResourceId);
        skin.moneyIcon.visible = true;
        _showLabel = payResourceAmount.toString();
        this._data = {
            fid: value.f_id,
            bought,
            itemList,
            priceItemList,
            limit: value.f_limit
        };
        let red:boolean = false;
        //let cfg:Configs.t_Shop_dat = this.GetDataById(data.fid);
        if (priceItemList.length){
            if(bought >= value.f_limit){
                //已领取
                this.yilingQuMask(true);
            }
        } else {
            // 免费
            _showLabel = E.getLang("Free");
        
            if(bought >= value.f_limit){
                //已领取
                this.yilingQuMask(true);
            }else{
                //可领取
                red = true;
            }
        }
        skin.dotimg.visible = red;

        skin.moneyNumLabel.text = _showLabel;
        skin.limit_tf.text = E.LangMgr.getLang('AllianceShopLimit', bought, value.f_limit);
    }

    private yilingQuMask(v:boolean){
        this.yilingquMask.visible = this.yilingquLb.visible = v;
    }

    private clearUI(){
        this.dotimg.visible = false;
        this.yilingQuMask(false);
    }
}