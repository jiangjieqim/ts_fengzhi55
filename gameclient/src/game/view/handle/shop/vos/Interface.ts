import { ItemVo } from "../../main/vos/ItemVo";

export interface IShopItem {
    // 购买花费的资源id
    payResourceId: number;
    // 购买花费的资源数量
    payResourceAmount: number;
    // 现金购买对应的t_Purchase_Price表配置
    payItem: ItemVo;
    purchaseId: number;
    // 购买的资源列表
    itemList: ItemVo[];
    // 商城类型
    shopType: number;
    // 商品项的id
    fid: number;
    // 商品是否被购买过
    bought: boolean;
}

export interface ITabItem {
    tabId: number;
    name: string;
    selected: boolean;
}