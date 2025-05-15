import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { GemBuy_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { NewPlayerGemFeastModel } from "../../newplayerfeast/NewPlayerFeastModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

//购买宝石
export class BaoShiGMView extends ViewBase{
    private _ui:ui.views.baoshi.ui_baoshiGMViewUI;
    protected mMask = true;
    protected autoFree = true;
    protected  onAddLoadRes(){
        this.addAtlas('baoshi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.baoshi.ui_baoshiGMViewUI;
            this.bindClose(this._ui.close1);
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn_sub,new Laya.Handler(this,this.onBtnSubClick)),
            ButtonCtl.Create(this._ui.btn_add,new Laya.Handler(this,this.onBtnAddClick)),
            ButtonCtl.Create(this._ui.btn_add1,new Laya.Handler(this,this.onBtnAdd1Click)),
            ButtonCtl.Create(this._ui.btn_qx,new Laya.Handler(this,this.onBtnQXClick)),
            ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick))
            );
        }
    }

    private _data:Configs.t_Gem_Shop_dat;
    private _num:number;
    protected onInit(){
        this._data = this.Data;
        let id = parseInt(this._data.f_price.split("-")[0]);
        if(id == ECellType.BaoShiQuan || id == ECellType.BaoShiQuanG){
            let num = parseInt(this._data.f_price.split("-")[1]);
            let count = MainModel.Ins.mRoleData.getVal(id);
            this._num = Math.floor(count/num);
            if(this._num < 1){
                this._num = 1;
            }
        }else{
            this._num = 1;
        }
        this.updataView();
    }

    protected onExit(){

    }

    private onBtnSubClick(){
        this._num--;
        this.setBtn();
    }

    private onBtnAddClick(){
        this._num++;
        this.setBtn();
    }

    private onBtnAdd1Click(){
        this._num += 10;
        this.setBtn();
    }

    private onBtnQXClick(){
        this.Close();
    }

    private onBtnQDClick(){
        if(this._data){
            let req:GemBuy_req = new GemBuy_req;
            req.id = this._data.f_id;
            req.num = this._num;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private updataView(){
        let itemVo:ItemVo = new ItemVo();
        itemVo.cfgId = this._data.f_itemid;
        itemVo.count = 1;
        ItemViewFactory.refreshSlot(this._ui.item,itemVo);
        this.setBtn();
    }

    private setBtn(){
        if(this._num <= 1){
            this._ui.btn_sub.disabled = true;
        }else{
            this._ui.btn_sub.disabled = false;
        }
        this._ui.lab_num.text = this._num + "";

        let id = this._data.f_price.split("-")[0];
        let num = this._data.f_price.split("-")[1];
        let needC:number = parseInt(num) * this._num;
        let count = MainModel.Ins.mRoleData.getVal(parseInt(id));
        this._ui.icon.skin = IconUtils.getIconByCfgId(parseInt(id));

        // if(MainModel.Ins.isGemOpen){
        // if (NewPlayerGemFeastModel.Ins.isOpen){
        //     let discount: number = this._data.f_Discount / 10000;
        //     needC = needC * discount;
        // }
        this._ui.lab_m.text = needC + "";
        this._ui.lab_d.x = this._ui.lab_m.x + this._ui.lab_m.textField.width;
        this._ui.lab_d.text = " 购买宝石";
        if(count >= needC){
            this._ui.lab_m.color = "#54e80d";
        }else{
            this._ui.lab_m.color = "#ff1e00";
        }
    }
}