import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { BlessingShop_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { GridItemCtl } from "../../main/views/grid/GridItemCtl";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { QualityUtils } from "../../main/vos/QualityUtils";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

/* @Author: tsy
 * @Date: 2023-02-21 19:31:02
 * @Last Modified by: tsy
 * @Last Modified time: 2023-03-20 16:16:53
*/
export class HuYouDuiHuanItem extends ui.views.fuyou.ui_duihuanItemUI{

    private _item:GridItemCtl;
    constructor() {
        super();
        ButtonCtl.Create(this.btn_dh,new Laya.Handler(this,this.onBtnDHClick));
        this._item = new GridItemCtl(this.item)
    }

    private onBtnDHClick(){
        if(!MainModel.Ins.isItemEnoughSt(this._data.f_Price,true)){
            return;
        }
        let req:BlessingShop_req = new BlessingShop_req();
        req.id = this._data.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:Configs.t_Blessing_Shop_dat;
    public setData(data:Configs.t_Blessing_Shop_dat){
        if(!data)return;
        this._data = data;
        this.txt_name.text = data.f_ItemName;
        let cfg = ItemProxy.Ins.getCfg(data.f_itemID);
        this.txt_name.color = QualityUtils.getQuaColor(cfg.f_qua);
        this.img.skin = IconUtils.getIcon(data.f_Price.split("-")[0]);
        this.txt_value.text = data.f_Price.split("-")[1];
        if(data.f_Attribute && data.f_ItemType == 1){
            let id = data.f_Attribute.split("-")[0];
            let value = data.f_Attribute.split("-")[1];
            this.txt_attrName.text = MainModel.Ins.getAttrNameIdByID(parseInt(id)) + " : " + attrConvert(parseInt(id),parseInt(value));
            this._item.setDataBySoulItemID(data.f_itemID,parseInt(id));
        }else{
            this.txt_attrName.text = "";
            this._item.setDataByItemID(data.f_itemID);
        }
    }
}