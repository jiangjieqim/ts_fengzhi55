import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { LabourShopFree_req } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EBuyType, MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { LabordayBaseModel, getModelLaborDay } from "../model/LabordayBaseModel";

export class MidAutumnShopItem extends ui.views.laborday.ui_midautumn_qqItemUI{
    constructor() {
        super();
        this.item01.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        if(!this._data)return;
        if(!this._model.isOpen){
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
            return;
        }
        let id = parseInt(this._data.f_GoodsID.split("-")[0]);
        let num = parseInt(this._data.f_GoodsID.split("-")[1]);
        MainModel.Ins.buy(this._needId,this._needCount,id,num,new Laya.Handler(this,this.onOkHandler),EBuyType.Item,this._data.f_isquick == 1);    
    }

    private onOkHandler(){
        if(!this._data)return;
        if(this._data.f_GoodsLimit<=0){

        }else{
            let count:number = this._model.getBuyTime1(this._data.f_id);            
            if(count >= this._data.f_GoodsLimit){
                E.ViewMgr.ShowMidError(E.getLang("labordayismax"));
                return;
            }
        }

        if(MainModel.Ins.isItemEnoughSt(this._data.f_Price,true)){
            let req = new LabourShopFree_req();
            req.type = this._model.type;
            req.id = this._data.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:Configs.t_Labour_Shop_Free_dat;
    private _needId:number;
    private _needCount:number;
    private _model:LabordayBaseModel;
    public setData(value:Configs.t_Labour_Shop_Free_dat){
        if(!value)return;
        this._data = value;
        this._model = getModelLaborDay(this._data.f_type);
        if(value.f_GoodsLimit<=0){
            this.xiangouTf.text = "";
        }else{
            let count:number = this._model.getBuyTime1(value.f_id);
            this.xiangouTf.text = E.getLang("labordaylimit")+`${count}/${value.f_GoodsLimit}`;
        }
        this.item01.tf1.text = "";
        this.item01.icon.skin = "";
        this.item01.quality.skin = "";
        let name:string = "";
        let itemVo: ItemVo = ItemViewFactory.convertItem(value.f_GoodsID);
        this.item01.icon.skin = IconUtils.getIconByCfgId(itemVo.cfgId);
        this.item01.tf1.text = itemVo.count.toString();
        this.item01.quality.skin = IconUtils.getQuaIcon(itemVo.cfg.f_qua);
        name = itemVo.getName();
        let price:string[] = value.f_Price.split("-");
        this._needId = parseInt(price[0]);
        this.huobi.skin = IconUtils.getIcon(this._needId);
        this._needCount = parseInt(price[1]);
        this.shtf1.text = StringUtil.val2m(this._needCount);
        this.nameTf.text = name;
    }
}