import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { MainModel } from "../../../main/model/MainModel";
import { ECellType } from "../../../main/vos/ECellType";
import { ItemVo } from "../../../main/vos/ItemVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { SpringFestivalModel } from "../../model/SpringFestivalModel";

export class SpringFestivalShopItem extends ui.views.springFestival.ui_springFestivalShopItemUI{
    constructor(){
        super();
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onClick));
    }

    private onClick(){
        if (this._data) {
            if (this._data.f_limit) {
                let vo = SpringFestivalModel.Ins.shopList.find(ele => ele.fid == this._data.f_id);
                let num = 0;
                if (vo) {
                    num = vo.count;
                }
                if(num >= this._data.f_limit){
                    E.ViewMgr.ShowMidError("购买次数已达上限");//显示错误提示
                    return;
                }
                E.ViewMgr.Open(EViewType.SpringFestivalShopGMView,null,this._data);
            } else {
                E.ViewMgr.Open(EViewType.SpringFestivalShopGMView,null,this._data);
            }

        }
    }

    private _data:Configs.t_Event_2024Spring_Shop_dat;
    public setData(value:Configs.t_Event_2024Spring_Shop_dat){
        if(!value)return;
        this._data = value;
        let voo = SpringFestivalModel.Ins.shopList.find(ele => ele.fid == this._data.f_id);
        let num = 0;
        if(voo){
            num = voo.count;
        }
        if(value.f_limit){
            this.lab.text = "限购" + num + "/" + value.f_limit;
        }else{
            this.lab.text = "";
        }
        
        let vo = new ItemVo();
        vo.cfgId = parseInt(value.f_goods.split("-")[0]);
        vo.count = parseInt(value.f_goods.split("-")[1]);
        ItemViewFactory.refreshSlot(this.item,vo);
        this.lab_name.text = vo.getName();
        this.icon.skin = IconUtils.getIconByCfgId(parseInt(value.f_price.split("-")[0]));
        this.lab2.text = value.f_price.split("-")[1];

        let count =  MainModel.Ins.mRoleData.getVal(ECellType.WeiWang);
        if(count >= value.f_PersonalLimit){
            this.mk.visible = this.lab1.visible = false;
            this.btn.visible = true;
        }else{
            this.mk.visible = this.lab1.visible = true;
            this.lab1.text = value.f_PersonalLimit + "威望可购买";
            this.btn.visible = false;
        }
    }
}