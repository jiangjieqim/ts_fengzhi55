import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { ItemVo } from "../../../main/vos/ItemVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { XXZDZModel } from "../../model/XXZDZModel";

export class XXZDZItem6 extends ui.views.xxzdz.ui_xxzdzItem6UI{
    constructor() {
        super();

        this.lab_num.visible = false;
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(){
        if (this._data) {
            let vo = XXZDZModel.Ins.starGoods.find(ele => ele.goodsId == this._data.f_goodsid);
            let num = 0;
            if (vo) {
                num = vo.num;
            }
            if(num >= this._data.f_BuyLimit){
                E.ViewMgr.ShowMidError("今日已售，明日再来");//显示错误提示
                return;
            }
            E.ViewMgr.Open(EViewType.XXZDZShopBuyView,null,this._data);
        }
    }

    private _data:Configs.t_Star_Shop_dat;
    public setData(value:Configs.t_Star_Shop_dat){
        if(!value)return;
        this._data = value;
        let voo = XXZDZModel.Ins.starGoods.find(ele => ele.goodsId == value.f_goodsid);
        let num = 0;
        if(voo){
            num = voo.num;
        }
        this.lab_xg.text = "每周限购" + num + "/" + value.f_BuyLimit;
        let vo = new ItemVo();
        vo.cfgId = parseInt(value.f_shopitem.split("-")[0]);
        vo.count = parseInt(value.f_shopitem.split("-")[1]);
        ItemViewFactory.refreshSlot(this.item,vo,false);
        this.lab_name.text = vo.getName();
        this.icon.skin = IconUtils.getIconByCfgId(parseInt(value.f_itemprice.split("-")[0]));
        this.lab.text = value.f_itemprice.split("-")[1];
    }
}