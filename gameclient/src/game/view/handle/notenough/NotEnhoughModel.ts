// export interface IItemNotEnoughCell{
// id:number;
// }

import { StringUtil } from "../../../../frame/util/StringUtil";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { ActivityModel } from "../huodong/ActivityModel";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainModel } from "../main/model/MainModel";
import { ItemProxy } from "../main/proxy/ItemProxy";
import { EShopTabIndex, ShopProxy } from "../shop/proxy/shopProxy";
import { ShopModel } from "../shop/ShopModel";
import { XianShiLiBaoModel } from "../xianshilibao/model/XianShiLiBaoModel";
import { t_Item_AccessUI } from "./t_Item_AccessUI"

export enum ENotEnoughLimit {
    /**限时礼包 */
    Packetage = 1,
    /**引导 */
    Guide = 2,
    /**商城 */
    Shop = 3,
    /**兑换 */
    Exchange = 4,
}
export class NotEnhoughModel {
    constructor() {

    }
    private isP3Open(p3: string) {
        // let p3:string =  ItemProxy.Ins.getCfg(itemId).f_p3;
        let arr = p3.split("-");
        let packid = parseInt(arr[0]);
        let p4 = parseInt(arr[1]);
        let vo = ActivityModel.Ins.getVoByPackP4(packid, p4);
        return vo;
    }
    getByItem(itemId: number) {
        let ids: number[] = [];
        let l = t_Item_AccessUI.Ins.List;
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Item_AccessUI_dat = l[i];
            let arr: string[] = cfg.f_itemID.split("|");
            if (arr.indexOf(itemId + "") >= 0) {
                if (cfg.f_id == ENotEnoughLimit.Packetage) {
                    let p3: string = ItemProxy.Ins.getCfg(itemId).f_p3;
                    if (!StringUtil.IsNullOrEmpty(p3)) {
                        if (this.isP3Open(p3)) {
                            ids.push(cfg.f_id);
                        }
                    }
                } else {
                    ids.push(cfg.f_id);
                }
            }
        }
        return ids;
    }

    check(itemId: number) {
        LogSys.Log(`item is not enough itemid:${itemId}`);
        if (MainModel.Ins.isOpenAllByFuncid(EFuncDef.ItemPathway + "")) {
            let ids: number[] = this.getByItem(itemId);
            if (ids.length > 0) {
                E.ViewMgr.Open(EViewType.ItemNotEnough, null, itemId);
            }
        }
    }

    goto(type: ENotEnoughLimit, itemId: number) {
        switch (type) {
            case ENotEnoughLimit.Packetage:
                {
                    let p3: string = ItemProxy.Ins.getCfg(itemId).f_p3;
                    let arr = p3.split("-");
                    let packid = parseInt(arr[0]);
                    let p4 = parseInt(arr[1]);
                    let vo = ActivityModel.Ins.getVoByPackP4(packid, p4);
                    // console.log(vo);
                    if(vo){
                        XianShiLiBaoModel.Ins.sendCmd(p4,false);
                    }
                }
                break;
            case ENotEnoughLimit.Guide:
                E.ViewMgr.Close(EViewType.ItemNotEnough);
                E.localGuideMgr.setItemId(itemId);
                break;
            case ENotEnoughLimit.Shop:
                // MainModel.Ins.openGold();
                ShopModel.Ins.openHotSell();
                break;
            case ENotEnoughLimit.Exchange:
                //兑换
                let p4: number = ItemProxy.Ins.getCfg(itemId).f_p4;
                let cfg:Configs.t_Shop_dat = ShopProxy.Ins.GetDataById(p4);
                let tabId = ShopProxy.Ins.hotPage;
                let shopItems = ShopProxy.Ins.getShopItemList(tabId);
                let _shopitem = shopItems.find(o=>o.fid == cfg.f_id);
                if(_shopitem){
                    ShopModel.Ins.buy(tabId,cfg,_shopitem);
                }
                break;
        }
    }
}