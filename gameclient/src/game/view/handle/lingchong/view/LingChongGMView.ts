import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../network/SocketMgr";
import { PetBuyFlute_req } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { PetConfigProxy } from "../proxy/LingChongProxy";

export class LingChongGMView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchouGMViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {}

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchouGMViewUI;

            this.bindClose(this._ui.close1);

            ButtonCtl.Create(this._ui.btn_sub,new Laya.Handler(this,this.onBtnSubClick));
            ButtonCtl.Create(this._ui.btn_add,new Laya.Handler(this,this.onBtnAddClick));
            ButtonCtl.Create(this._ui.btn_add1,new Laya.Handler(this,this.onBtnAdd1Click));
            ButtonCtl.Create(this._ui.btn_qx,new Laya.Handler(this,this.onBtnQXClick));
            ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick));
        }
    }

    private _num:number;
    protected onInit(){
        this._num = 1;
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
        let req:PetBuyFlute_req = new PetBuyFlute_req;
        req.num = this._num;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private updataView(){
        let itemVo:ItemVo = new ItemVo();
        itemVo.cfgId = ECellType.LingChouZM;
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

        let cfg = PetConfigProxy.Ins.List[0];
        let id = cfg.f_fluteprice.split("-")[0];
        let num = cfg.f_fluteprice.split("-")[1];
        let needC:number = parseInt(num) * this._num;
        let count = MainModel.Ins.mRoleData.getVal(parseInt(id));
        this._ui.icon.skin = IconUtils.getIconByCfgId(parseInt(id));
        this._ui.lab_m.text = needC + "";
        this._ui.lab_d.x = this._ui.lab_m.x + this._ui.lab_m.textField.width;
        this._ui.lab_d.text = " 购买唤灵笛";
        if(count >= needC){
            this._ui.lab_m.color = "#54e80d";
        }else{
            this._ui.lab_m.color = "#ff1e00";
        }
    }
}