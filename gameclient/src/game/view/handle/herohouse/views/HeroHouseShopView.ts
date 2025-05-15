import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { GymShop_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EBuyType, MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { EGymShopType } from "../model/EGymType";
import { t_Gym_Shop } from "../model/GymProxy";
class HeroShopItemRender extends ui.views.hero_house.ui_hero_house_shop_itemUI {
    private cfg:Configs.t_Gym_Shop_dat;
    private _needItem:ItemVo;
    private _showItem:ItemVo;
    constructor(){
        super();
        this.doubleIcon.visible = false;
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }
    private onClickHandler(){
        MainModel.Ins.buy(this._needItem.cfgId,this._needItem.count,this._showItem.cfgId,this._showItem.count,new Laya.Handler(this,this.okBuyHandler),EBuyType.Item,true);
        // E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.LangMgr.getLang("UseItem", this._needItem.cntName),new Laya.Handler(this,this.okBuyHandler));
    }

    private okBuyHandler(){
        let req:GymShop_req = new GymShop_req();
        req.fid = this.cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public refresh() {
        this.cfg = this.dataSource;
        if(this.cfg.f_PageID == EGymShopType.GoldShop){

        }else{

        }

        let _showItem = ItemViewFactory.convertItemList(this.cfg.f_ItemID)[0];
        this._showItem = _showItem;
        let needItem = ItemViewFactory.convertItemList(this.cfg.f_TokenPrice)[0];
        this._needItem = needItem;
        this.moneyIcon.skin = needItem.getIcon();
        this.moneyNumLabel.text = needItem.count.toString();

        this.itemNameLabel.text = _showItem.getName();
        this.countLabel.text = _showItem.count + "";

        this.icon.skin = _showItem.getIcon();
    }
}

/**武馆商店 */
export class HeroHouseShopView extends ViewBase {
    private tabsCtl:TabControl = new TabControl();
    private _ui: ui.views.hero_house.ui_hero_house_shopUI;
    private _moneyCtl:ValCtl;
    protected mMask:boolean = true;
    protected onAddLoadRes(): void { 
        // this.addAtlas('mall.atlas');
    }
    protected onExit(): void { }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_shopUI();
            this.bindClose(this._ui.close1);
            this._ui.list1.itemRender = HeroShopItemRender;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onHeroShopItemRender);
            const tabsSkin = [this._ui.t0,this._ui.t1];
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler));
            let arr = E.LangMgr.getLang("HeroShops").split("|");
            this.tabsCtl.setData(arr);
            this._moneyCtl = new ValCtl(this._ui.moneyInfo.moneyCountLabel,this._ui.moneyInfo.icon);
        }
    }

    private onTabSelectHandler(v:number){
        let l = t_Gym_Shop.Ins.getListByType(v);
        this._ui.list1.array = l;
        let type:number = 0;
        switch (v) {
            case EGymShopType.GoldShop:
                type = ECellType.WuXing;
                break;
        
            case EGymShopType.TokenShop:
                type = ECellType.GOLD;
                break;
        }
        this._moneyCtl.setType(type);
    }

    private onHeroShopItemRender(item: HeroShopItemRender) {
        item.refresh();
    }

    protected onInit(): void {
        this.tabsCtl.selectIndex = 0;
        this._ui.list1.refresh();
        this._ui.list1.scrollTo(0);
    }

}