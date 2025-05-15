import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { ZuoQiModel } from "../ZuoqiModel";
import { IconUtils } from "../vos/IconUtils";

export class ZuoQiShopItem extends ui.views.zuoqi.ui_zuoqiSHDHItemUI{
    constructor() {
        super();
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(){
        if (this._data) {
            if(this._data.f_BuyLimit){
                let vo = ZuoQiModel.Ins.shopList.find(ele => ele.id == this._data.f_id);
                if(vo.cnt >= this._data.f_BuyLimit){
                    E.ViewMgr.ShowMidError("今日限购已达到上限");//显示错误提示
                    return;
                }
                E.ViewMgr.Open(EViewType.ZuoQiBuyShopView,null,this._data);
            }
            else{
                E.ViewMgr.Open(EViewType.ZuoQiBuyShopView,null,this._data);
            }
        }
    }

    private _data:Configs.t_Mount_Shop_dat;
    public setData(value:Configs.t_Mount_Shop_dat){
        if(!value)return;
        this._data = value;
        if(!value)return;
        this._data = value;

        if(value.f_BuyLimit){
            let voo = ZuoQiModel.Ins.shopList.find(ele => ele.id == value.f_id);
            this.lab.text = "每日限购" + voo.cnt + "/" + value.f_BuyLimit;
        }else{
            this.lab.text = "不限购";
        }

        let vo = new ItemVo();
        vo.cfgId = parseInt(value.f_goods.split("-")[0]);
        vo.count = parseInt(value.f_goods.split("-")[1]);
        ItemViewFactory.refreshSlot(this.item,vo,false);
        this.lab_name.text = vo.getName();

        let id = parseInt(value.f_Price.split("-")[0]);
        let val = value.f_Price.split("-")[1];
        this.icon1.skin = IconUtils.getIconByCfgId(id);
        this.lab1.text = StringUtil.val4m(MainModel.Ins.mRoleData.getVal(id)) + "/" + val;
    }
}