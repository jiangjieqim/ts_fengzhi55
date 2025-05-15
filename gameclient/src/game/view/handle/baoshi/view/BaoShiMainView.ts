import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import {DotManager} from "../../common/DotManager";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { BaoShiModel } from "../model/BaoShiModel";
import { FaZhengListProxy } from "../proxy/BaoShiProxy";
import { BaoShiAttrCtl } from "./ctl/BaoShiAttrCtl";
import { BaoShiViewItemCtl } from "./ctl/BaoShiViewItemCtl";

//宝石主界面
export class BaoShiMainView extends ViewBase{
    private _ui:ui.views.baoshi.ui_baoshiViewUI;
    protected mMask = true;
    protected autoFree = true;
    private _baoshiCtl:BaoShiViewItemCtl;
    private _baoshiAttrCtl:BaoShiAttrCtl;

    protected  onAddLoadRes(){
        this.addAtlas('baoshi.atlas');
    }

    protected onFirstInit() {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.baoshi.ui_baoshiViewUI;
            this.bindClose(this._ui.btn_close);

            this._baoshiCtl = new BaoShiViewItemCtl(this._ui.view_bs);
            this._baoshiAttrCtl = new BaoShiAttrCtl(this._ui.view_attr);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_tj, new Laya.Handler(this, this.onBtnTJClick)),
                ButtonCtl.Create(this._ui.btn_fz, new Laya.Handler(this, this.onBtnFZGHClick)),
                ButtonCtl.Create(this._ui.btn_xq, new Laya.Handler(this, this.onBtnXQClick)),
                ButtonCtl.Create(this._ui.btn_dh, new Laya.Handler(this, this.onBtnDHClick)),
                ButtonCtl.Create(this._ui.btn_fzdh, new Laya.Handler(this, this.onBtnfzDHClick)),
                ButtonCtl.Create(this._ui.btn_hc, new Laya.Handler(this, this.onBtnHCClick)),
                ButtonCtl.Create(this._ui.btn_tip, new Laya.Handler(this, this.onBtnTipClick)),
                ButtonCtl.Create(this._ui.btn_gm, new Laya.Handler(this, this.onBtnGMClick))
            );
        }
    }

    protected onInit(){
        this.updataView();
        BaoShiModel.Ins.on(BaoShiModel.DEFFAZHENG_UPDATA,this,this.updataView);
        BaoShiModel.Ins.on(BaoShiModel.BAOSHI_UPDATA,this,this.updataView);
        BaoShiModel.Ins.on(BaoShiModel.lifeBloodChange,this,this.updataView1);
    }

    protected onExit(){
        BaoShiModel.Ins.off(BaoShiModel.DEFFAZHENG_UPDATA,this,this.updataView);
        BaoShiModel.Ins.off(BaoShiModel.BAOSHI_UPDATA,this,this.updataView);
        BaoShiModel.Ins.off(BaoShiModel.lifeBloodChange,this,this.updataView1);
    }

    private onBtnTJClick(){
        E.ViewMgr.Open(EViewType.BaoShiTJView);
    }

    private onBtnFZGHClick(){
        E.ViewMgr.Open(EViewType.FaZhengGHView);
    }

    private onBtnXQClick(){
        E.ViewMgr.Open(EViewType.BaoShiXQView);
    }

    private onBtnDHClick(){
        E.ViewMgr.Open(EViewType.BaoShiDHView);
    }

    private onBtnfzDHClick(){
        E.ViewMgr.Open(EViewType.FaZhengDHView);
    }

    private onBtnHCClick(){
        E.ViewMgr.Open(EViewType.BaoShiHCView);
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("BaoShiTitle1","BaoShiDec1");
    }

    private onBtnGMClick(){
        E.ViewMgr.Open(EViewType.BaoShiGongMingView);
    }

    private updataView(){
        let fzCfg = FaZhengListProxy.Ins.getCfgById(BaoShiModel.Ins.mationId);
        let iCfg = ItemProxy.Ins.getCfg(fzCfg.f_itemid);
        this._ui.lab_fz.text = main.itemName(iCfg.f_name);
        this._baoshiCtl.setData(BaoShiModel.Ins.getEquipList(),false,BaoShiModel.Ins.mationId);
        this._baoshiAttrCtl.setData(BaoShiModel.Ins.getEquipList(),BaoShiModel.Ins.mationId);
        this._ui.lab_fzsm.text = BaoShiModel.Ins.getFZST(BaoShiModel.Ins.mationId);
        if(BaoShiModel.Ins.isDHRedTip()){
            DotManager.addDot(this._ui.btn_dh);
        }else{
            DotManager.removeDot(this._ui.btn_dh);
        }
        this.isRedXMTip();
    }

    private updataView1(){
        this.isRedXMTip();
    }

    private isRedXMTip(){
        if(BaoShiModel.Ins.isXMRedTip()){
            DotManager.addDot(this._ui.btn_gm);
        }else{
            DotManager.removeDot(this._ui.btn_gm);
        }
    }
}