import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../network/SocketMgr";
import { SilkBagHandler_req } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

export class XXZDZGMView extends ViewBase{
    private _ui:ui.views.main.ui_shopBuyViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    protected onAddLoadRes() {
        
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_shopBuyViewUI;
            this.bindClose(this._ui.closeBtn1);
            this.btnList.push(
            ButtonCtl.Create(this._ui.cancelBtn,new Laya.Handler(this,this.onBtnCanelClick)),
            ButtonCtl.Create(this._ui.okBtn,new Laya.Handler(this,this.onBtnOKClick))
            )
        }
    }

    private onBtnCanelClick(){
        this.Close();
    }

    private onBtnOKClick(){
        if(this._data){
            if(MainModel.Ins.isItemEnoughSt(this._data.f_TipsPrice,true)){
                let req:SilkBagHandler_req = new SilkBagHandler_req;
                req.type = 1;
                req.id = this._data.f_id;
                SocketMgr.Ins.SendMessageBin(req);
                this.Close();
            }
        }
    }

    private _data:Configs.t_Star_PocketTips_dat;
    protected onInit(): void {
        this._data = this.Data;
        this._ui.nameTF.text = this._data.f_TipsName;
        this._ui.descTf.text = this._data.f_TipsTips;
        let skin = `o/star/${this._data.f_Tipsicon}`;
        ItemViewFactory.refreshSlot1(this._ui.item,skin,this._data.f_TipsName,this._data.f_TipsTips);
        let id = parseInt(this._data.f_TipsPrice.split("-")[0]);
        let val = parseInt(this._data.f_TipsPrice.split("-")[1]);
        this._ui.goldIcon.skin = IconUtils.getIconByCfgId(id);
        this._ui.moneyTf.text = val + "";
    }

    protected onExit(): void {
        
    }
}