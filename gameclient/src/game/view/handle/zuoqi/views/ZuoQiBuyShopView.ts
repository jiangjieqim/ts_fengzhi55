import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { MountShop_req } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { ZuoQiModel } from "../ZuoqiModel";
import { IconUtils } from "../vos/IconUtils";

export class ZuoQiBuyShopView extends ViewBase{
    private _ui:ui.views.zuoqi.ui_zuoqiGMViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    private _data:Configs.t_Mount_Shop_dat;

    protected onAddLoadRes() {
        this.addAtlas("zuoqi.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            if(!this.UI){
                this.UI = this._ui = new ui.views.zuoqi.ui_zuoqiGMViewUI;
                this.bindClose(this._ui.close1);
                this.btnList.push(
                    ButtonCtl.Create(this._ui.btn_sub,new Laya.Handler(this,this.onBtnSubClick)),
                    ButtonCtl.Create(this._ui.btn_sub1,new Laya.Handler(this,this.onBtnSub1Click)),
                    ButtonCtl.Create(this._ui.btn_sub2,new Laya.Handler(this,this.onBtnSub2Click)),
                    ButtonCtl.Create(this._ui.btn_add,new Laya.Handler(this,this.onBtnAddClick)),
                    ButtonCtl.Create(this._ui.btn_add1,new Laya.Handler(this,this.onBtnAdd1Click)),
                    ButtonCtl.Create(this._ui.btn_add2,new Laya.Handler(this,this.onBtnAdd2Click)),
                    ButtonCtl.Create(this._ui.btn_qx,new Laya.Handler(this,this.onBtnQXClick)),
                    ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick))
                )
            }
        }
    }

    private _num:number;
    private _max:number;
    protected onInit(){
        this._data = this.Data;
        if(this._data.f_BuyLimit){
            let vo = ZuoQiModel.Ins.shopList.find(ele => ele.id == this._data.f_id);
            this._max = this._data.f_BuyLimit - vo.cnt;
        }else{
            this._max = 9999;
        }
        
        this._num = 1;
        this.updataView();
    }

    protected onExit(){

    }

    private onBtnSubClick(){
        this._num--;
        this.setBtn();
    }

    private onBtnSub1Click(){
        this._num -= 10;
        this.setBtn();
    }

    private onBtnSub2Click(){
        this._num -= 100;
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

    private onBtnAdd2Click(){
        this._num += 100;
        this.setBtn();
    }

    private onBtnQXClick(){
        this.Close();
    }

    private onBtnQDClick(){
        if(this._data){
            let req:MountShop_req = new MountShop_req;
            req.id = this._data.f_id;
            req.cnt = this._num;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private updataView(){
        let itemVo:ItemVo = new ItemVo();
        let arr = this._data.f_goods.split("-");
        itemVo.cfgId = parseInt(arr[0]);
        itemVo.count = parseInt(arr[1]);
        ItemViewFactory.refreshSlot(this._ui.item,itemVo);
        this._ui.lab_title.text = itemVo.getName();
        this.setBtn();
    }

    private setBtn(){
        if(this._num <= 1){
            this._ui.btn_sub.disabled = true;
        }else{
            this._ui.btn_sub.disabled = false;
        }
        if(this._num <= 10){
            this._ui.btn_sub1.disabled = true;
        }else{
            this._ui.btn_sub1.disabled = false;
        }
        if(this._num <= 100){
            this._ui.btn_sub2.disabled = true;
        }else{
            this._ui.btn_sub2.disabled = false;
        }
        if(this._num >= this._max){
            this._ui.btn_add.disabled = true;
        }else{
            this._ui.btn_add.disabled = false;
        }
        if(this._max - this._num < 10){
            this._ui.btn_add1.disabled = true;
        }else{
            this._ui.btn_add1.disabled = false;
        }
        if(this._max - this._num < 100){
            this._ui.btn_add2.disabled = true;
        }else{
            this._ui.btn_add2.disabled = false;
        }
        this._ui.lab_num.text = this._num + "";

        let arr = this._data.f_Price.split("-");
        let id = parseInt(arr[0]);
        let num = parseInt(arr[1]);
        let needC:number = num * this._num;
        let count = MainModel.Ins.mRoleData.getVal(id);
        this._ui.icon.skin = IconUtils.getIconByCfgId(id);
        this._ui.lab_m.text = needC + "";
        this._ui.lab_d.x = this._ui.lab_m.x + this._ui.lab_m.textField.width;
        let arr1 = this._data.f_goods.split("-");
        let idd = parseInt(arr1[0]);
        this._ui.lab_d.text = " 购买" + IconUtils.getNameByID(idd);
        if(count >= needC){
            this._ui.lab_m.color = "#54e80d";
        }else{
            this._ui.lab_m.color = "#ff1e00";
        }
    }
}