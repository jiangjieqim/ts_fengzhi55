import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { GemBuy_req } from "../../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../../network/SocketMgr";
import {DotManager} from "../../../common/DotManager";
import { System_RefreshTimeProxy } from "../../../huodong/model/ActivityProxy";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { MainModel } from "../../../main/model/MainModel";
import { ItemVo } from "../../../main/vos/ItemVo";
import { NewPlayerGemFeastModel } from "../../../newplayerfeast/NewPlayerFeastModel";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { BaoShiModel } from "../../model/BaoShiModel";

//宝石兑换item
export class BaoShiDHItem extends ui.views.baoshi.ui_baoshiDHItemUI{
    constructor() {
        super();
        this.img_sel.visible = false;
        this.lab_yy.visible = false;
        this.on(Laya.Event.CLICK,this,this.onClick);
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){
        BaoShiModel.Ins.on(BaoShiModel.BAOSHI_UPDATA,this,this.onUpdataView);
    }

    private onRemove(){
        BaoShiModel.Ins.off(BaoShiModel.BAOSHI_UPDATA,this,this.onUpdataView);
    }

    private onUpdataView(){
        this.setDot();
    }

    private _data:Configs.t_Gem_Shop_dat;
    public setData(value:Configs.t_Gem_Shop_dat){
        if(!value)return;
        this.zhekouImg.visible = false;
        this._data = value;
        let itemVo:ItemVo = new ItemVo();
        itemVo.cfgId = value.f_itemid;
        itemVo.count = 1;
        ItemViewFactory.refreshSlot(this.item,itemVo,false);
        let arr = value.f_price.split("-");
        let val = parseInt(arr[1]);

        this.img.skin = IconUtils.getIconByCfgId(parseInt(arr[0]));
        this.lab.text = val + "";
        this.lab_name.text = itemVo.getName();
        this.setDot();
        // if(GemFeastModel.Ins.isOpen){
        //if(MainModel.Ins.isGemOpen){
        // if (NewPlayerGemFeastModel.Ins.isOpen){
        //     let discount: number = this._data.f_Discount / 10000;
        //     if(discount < 1){
        //         this.zhekouImg.visible = true;
        //         this.oldGoldTf.text = E.getLang("oldprice") + val;
        //         let a = (this._data.f_Discount / 1000).toFixed(0);
        //         this.zhekouTf.text = E.getLang("limitdiscount",a);
        //         this.lab.text = val*discount + "";
        //     }
        // }
        if (value.f_freetimes) {
            this.zhekouImg.visible = false;
            this.freeTf.visible = true;
            this.freeTf.text = E.LangMgr.getLang('mrxgcs', BaoShiModel.Ins.freeNum, value.f_freetimes);
            if (BaoShiModel.Ins.freeNum === 0) {
                this.btn.disabled = true;
            } else {
                this.btn.disabled = false;
            }
        } else {
            this.freeTf.visible = false;
        }
    }

    private setDot(){
        if(this._data){
            let arr = this._data.f_price.split("-");
            DotManager.removeDot(this.btn);
            let array = System_RefreshTimeProxy.Ins.getVal(18).split("|");
            if(array.indexOf(arr[0]) != -1){
                let num = MainModel.Ins.mRoleData.getVal(parseInt(arr[0]));
                if(num >= parseInt(arr[1])){
                    DotManager.addDot(this.btn,15,-10);
                }
            }
        }
    }

    private onClick(){
        if (this._data.f_freetimes) {
            // 免费领取
            let req:GemBuy_req = new GemBuy_req;
            req.id = this._data.f_id;
            req.num = 1;
            SocketMgr.Ins.SendMessageBin(req);
        } else {
            E.ViewMgr.Open(EViewType.BaoShiGMView,null,this._data);
        }
    }
}