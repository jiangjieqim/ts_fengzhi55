import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { GemFormationBuy_req } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { MainModel } from "../../../main/model/MainModel";
import { ItemVo } from "../../../main/vos/ItemVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { BaoShiModel } from "../../model/BaoShiModel";
import { FaZhengListProxy } from "../../proxy/BaoShiProxy";

export class FazhengDHItem1 extends ui.views.baoshi.ui_baoshiDHItemUI{
    constructor() {
        super();
        this.zhekouImg.visible = false;
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onClickHandler));
        this.on(Laya.Event.CLICK,this,this.onClick);
        this.freeTf.visible = false;

        this.on(Laya.Event.DISPLAY, this, this.onDisplay);
        this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
    }

    private onDisplay(){
        BaoShiModel.Ins.on(BaoShiModel.SELECT_MID,this,this.onSelect);
        BaoShiModel.Ins.on(BaoShiModel.FAZHENG_UPDATA,this,this.onFaZheng);
    }

    private onUnDisplay(){
        BaoShiModel.Ins.off(BaoShiModel.SELECT_MID,this,this.onSelect);
        BaoShiModel.Ins.off(BaoShiModel.FAZHENG_UPDATA,this,this.onFaZheng);
    }

    private onSelect(){
        if(this._data){
            if(this._data.f_Formationid == BaoShiModel.Ins.selectMid){
                this.img_sel.visible = true;
            }else{
                this.img_sel.visible = false;
            }
        }
    }

    private onFaZheng(){
        if(BaoShiModel.Ins.mationIdList.indexOf(this._data.f_Formationid) != -1){
            this.lab_yy.visible = true;
            this.btn.visible = false;
        }else{
            this.lab_yy.visible = false;
            this.btn.visible = true;
        }
    }

    private onClick(){
        if(this._data){
            if(BaoShiModel.Ins.selectMid != this._data.f_Formationid){
                BaoShiModel.Ins.selectMid = this._data.f_Formationid;
                BaoShiModel.Ins.event(BaoShiModel.SELECT_MID);
            }
        }
    }

    private onClickHandler(){
        if(this._data){
            let arr = this._data.f_FormationPrice.split("-");
            MainModel.Ins.buy(parseInt(arr[0]),parseInt(arr[1]),this._data.f_itemid,1,new Laya.Handler(this,this.okBuyHandler));
        }
    }

    private okBuyHandler(){
        let req:GemFormationBuy_req = new GemFormationBuy_req;
        req.id = this._data.f_Formationid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:Configs.t_Gem_Formation_List_dat;
    public setData(value){
        if(!value)return;
        this._data = value;
        let cfg = FaZhengListProxy.Ins.getCfgById(value.f_Formationid);
        let itemVo:ItemVo = new ItemVo();
        itemVo.cfgId = cfg.f_itemid;
        itemVo.count = 1;
        ItemViewFactory.refreshSlot(this.item,itemVo,false);
        this.lab_name.text = itemVo.getName();

        let arr = value.f_FormationPrice.split("-");
        this.img.skin = IconUtils.getIconByCfgId(parseInt(arr[0]));
        this.lab.text = arr[1];

        if(value.f_Formationid == BaoShiModel.Ins.selectMid){
            this.img_sel.visible = true;
        }else{
            this.img_sel.visible = false;
        }

        if(BaoShiModel.Ins.mationIdList.indexOf(this._data.f_Formationid) != -1){
            this.lab_yy.visible = true;
            this.btn.visible = false;
        }else{
            this.lab_yy.visible = false;
            this.btn.visible = true;
        }
    }
}