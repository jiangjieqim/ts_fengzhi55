import { ui } from "../../../../../../ui/layaMaxUI";

export interface INewPlayerSkin {
    bg1: Laya.Image;
    rewardCon: Laya.Sprite;
    close1: Laya.Image;
    list1: Laya.List;
    btn1: Laya.Image;
    tf1: Laya.Label;
    img: Laya.Image;
    btnhot: ui.views.huodong.ui_01rate_btnUI;
    old_money_con: Laya.Sprite;
    oldMoney: Laya.Label;
    lab_money: Laya.Label;
}
/**首充礼包拆分类型 */
export enum EPayType {
    /**合并的礼包 */
    WithoutSplit = 0,
    /**拆分的礼包 */
    Split = 1
}

export interface IPack_Pay_dat {
    /*id*/
    f_id: number;
    /*礼包内容*/
    f_Item: string;
    /*礼包装备*/
    f_EquipmentDIY: number;
    /*购买次数*/
    f_BuyTimes: number;
    /*充值id*/
    f_PurchaseID: number;
    /*礼包原价*/
    f_fakeprice: number;
    /*装备部位id*/
    f_AssetID: string;
}