import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { PalaceShop_req } from "../../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { MainModel } from "../../../main/model/MainModel";
import { ItemVo } from "../../../main/vos/ItemVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { WuShenDianModel } from "../../model/WuShenDianModel";

export class WuShenDianShopItem extends ui.views.wushendian.ui_wushendianShopItemUI{
    constructor() {
        super();

        this.lab_num.visible = false;
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(){
        if (this._data) {
            let vo = WuShenDianModel.Ins.itemList.find(ele => ele.fid == this._data.f_id);
            let num = 0;
            if (vo) {
                num = vo.buyNum;
            }
            if(num >= this._data.f_PurchaseMax){
                E.ViewMgr.ShowMidError("该物品已售罄，请等待商店刷新");//显示错误提示
                return;
            }
            let arr = this._data.f_Purchase.split("-");
            let arr1 = this._data.f_Item.split("-");
            MainModel.Ins.buy(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr1[0]), parseInt(arr1[1]), new Laya.Handler(this, this.okBuyHandler));
        }
    }

    private okBuyHandler(){
        if(this._data){
            let req:PalaceShop_req = new PalaceShop_req;
            req.fid = this._data.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:Configs.t_Palace_Shop_dat;
    public setData(value:Configs.t_Palace_Shop_dat){
        if(!value)return;
        this._data = value;
        let voo = WuShenDianModel.Ins.itemList.find(ele => ele.fid == value.f_id);
        let num = 0;
        if(voo){
            num = voo.buyNum;
        }
        this.lab_xg.text = "每周限购" + num + "/" + value.f_PurchaseMax;
        let vo = new ItemVo();
        vo.cfgId = parseInt(value.f_Item.split("-")[0]);
        vo.count = parseInt(value.f_Item.split("-")[1]);
        ItemViewFactory.refreshSlot(this.item,vo,false);
        this.lab_name.text = vo.getName();
        this.icon.skin = IconUtils.getIconByCfgId(parseInt(value.f_Purchase.split("-")[0]));
        this.lab.text = value.f_Purchase.split("-")[1];
    }
}