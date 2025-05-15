import { stCellValue } from "../../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EItemCfgId } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { IPriceItem, t_Purchase_PriceProxy } from "./ActivityProxy";

export interface IItem {
    iconId: number;
    itemVo: ItemVo;
    payItemVo: ItemVo;
    fid: number;
}

export interface ISupplyItem {
    purchaseId: number;
    itemVos: ItemVo[];
    price: IPriceItem;
}

/**三国市集 */
export class PackShopMarketProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Shop_Market"
    }
    private static _ins: PackShopMarketProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new PackShopMarketProxy();
        }
        return this._ins;
    }

    public getItemById(goodId: number): IItem {
        const _l: Configs.t_Pack_Shop_Market_dat[] = this.List;
        const cfg = _l.find(o => Number(o.f_GoodsID) === goodId);
        if (!cfg) throw new Error(`${this.GetTabelName()}缺少f_GoodsID#${goodId}的配置`);
        const iconId = Number(cfg.f_Discount);
        const itemVo = ItemViewFactory.convertItemList(cfg.f_Goods)[0];
        const payItemVo = ItemViewFactory.convertItemList(`${cfg.f_price}`)[0];
        return { iconId, itemVo, payItemVo, fid: Number(cfg.f_id) };
    }
}

/**三国市集 刷新配置 */
export class PackShopMarkConfigProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Shop_Mart_Config"
    }
    private static _ins: PackShopMarkConfigProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new PackShopMarkConfigProxy();
        }
        return this._ins;
    }

    public getRefreshItemVo(): ItemVo {
        const _l: Configs.t_Pack_Shop_Mart_Config_dat[] = this.List;
        const cfg = _l.find(o => Number(o.f_id) === 1);
        if (!cfg) throw new Error(`${this.GetTabelName()}缺少f_id#1的配置`);
        return ItemViewFactory.convertItemList(cfg.f_RefreshPrice)[0];
    }
}


/**诸侯补给 */
export class PackSupplyProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Supply"
    }
    private static _ins: PackSupplyProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new PackSupplyProxy();
        }
        return this._ins;
    }

    public getSupplyItemById(fid: number): ISupplyItem {
        const _l: Configs.t_Pack_Supply_dat[] = this.List;
        const cfg = _l.find(o => Number(o.f_id) === fid);
        if (!cfg) throw new Error(`${this.GetTabelName()}缺少f_id#${fid}的配置`);
        const purchaseId = Number(cfg.f_PurchaseID);
        const itemVos = ItemViewFactory.convertItemList(cfg.f_Item);
        const price = t_Purchase_PriceProxy.Ins.getPriceItemById(purchaseId);
        return { purchaseId, itemVos, price };
    }
}

// 月卡、终身卡
export class PackMonthCardProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Month_Card"
    }
    private static _ins: PackMonthCardProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new PackMonthCardProxy();
        }
        return this._ins;
    }

    /**
     * 获取月卡、终身卡的奖励配置
     * @param type 1：月卡 2：终身卡
     * @returns 
     */
    public getRewardConf(type: 1 | 2): { itemVo: ItemVo, purchaseId: number } {
        const _l: Configs.t_Pack_Month_Card_dat[] = this.List;
        const cfg = _l.find(o => o.f_id === type);
        if (!cfg) throw new Error(`${this.GetTabelName()}缺少f_id#${type}的配置`);
        return { itemVo: ItemViewFactory.convertItemList(cfg.f_Item)[0], purchaseId: cfg.f_PurchaseID };
    }
}

//限时弹出礼包 限时福利
export class PackEjectProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Eject"
    }
    private static _ins: PackEjectProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new PackEjectProxy();
        }
        return this._ins;
    }

    public getCfgByFid(cfgId:number){
        return this.List.find(o => o.f_id === cfgId);
    }

    /**
     * 获取限时福利配置
     * @param cfgId 配置id
     * @returns 
     */
    public getRewardConf(cfgId: number): { cellValues: stCellValue[], purchaseId: number } {
        const _l: Configs.t_Pack_Eject_dat[] = this.List;
        const cfg = _l.find(o => o.f_id === cfgId);
        if (!cfg) throw new Error(`${this.GetTabelName()}缺少f_EjectPackID#${cfgId}的配置`);
        return {
            cellValues: ItemViewFactory.convertItemList(cfg.f_Item).map(o => {
                const cellValue = new stCellValue();
                cellValue.id = o.cfgId;
                cellValue.count = o.count;
                return cellValue;
            }),
            purchaseId: cfg.f_PurchaseID
        };
    }
}

// 月卡、终身卡
export class PackTeQuanKaCardProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Month_AD"
    }
    private static _ins: PackTeQuanKaCardProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new PackTeQuanKaCardProxy();
        }
        return this._ins;
    }

    public getCfgByType(type:number): Configs.t_Pack_Month_AD_dat{
        return this.List.find(o => o.f_cardtype === type);
    }
}


