import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { GeXuQiPaoShop_req } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { GeXuQiPaoModel } from "../model/GeXuQiPaoModel";


export class GeXuQiPaoShopItem extends ui.views.gexuqipao.ui_gexuqipaoShopItemUI{
    constructor() {
        super();

        this.lab_num.visible = false;
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(){
        if (this._data) {
            let vo = GeXuQiPaoModel.Ins.shopList.find(ele => ele.fid == this._data.f_id);
            let num = 0;
            if (vo) {
                num = vo.count;
            }
            if(num >= this._data.f_LimitedTimes){
                E.ViewMgr.ShowMidError("该物品已售罄");//显示错误提示
                return;
            }
            let arr = this._data.f_Price.split("-");
            let arr1 = this._data.f_ItemReward.split("-");
            MainModel.Ins.buy(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr1[0]), parseInt(arr1[1]), new Laya.Handler(this, this.okBuyHandler));
        }
    }

    private okBuyHandler(){
        if(this._data){
            let req:GeXuQiPaoShop_req = new GeXuQiPaoShop_req;
            req.fid = this._data.f_id;
            req.count = 1;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:Configs.t_RecurringActivity_DrawEvent_Shop_dat;
    public setData(value:Configs.t_RecurringActivity_DrawEvent_Shop_dat){
        if(!value)return;
        this._data = value;
        let voo = GeXuQiPaoModel.Ins.shopList.find(ele => ele.fid == value.f_id);
        let num = 0;
        if(voo){
            num = voo.count;
        }
        this.lab_xg.text = "限购" + num + "/" + value.f_LimitedTimes;
        let vo = new ItemVo();
        vo.cfgId = parseInt(value.f_ItemReward.split("-")[0]);
        vo.count = parseInt(value.f_ItemReward.split("-")[1]);
        ItemViewFactory.refreshSlot(this.item,vo,false);
        this.lab_name.text = vo.getName();
        this.icon.skin = IconUtils.getIconByCfgId(parseInt(value.f_Price.split("-")[0]));
        this.lab.text = value.f_Price.split("-")[1];
    }
}