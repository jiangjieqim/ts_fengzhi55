import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { SelectListCtl } from "../../main/ctl/SelectListCtl";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { BaoShiModel } from "../model/BaoShiModel";
import { FaZhengListProxy } from "../proxy/BaoShiProxy";
import { BaoShiAttrCtl } from "./ctl/BaoShiAttrCtl";
import { BaoShiViewItemCtl } from "./ctl/BaoShiViewItemCtl";
import { BaoShiItem } from "./item/BaoShiItem";

//宝石镶嵌
export class BaoShiXQView extends ViewBase{
    private _ui:ui.views.baoshi.ui_baoshiXQViewUI;
    protected mMask = true;

    private _baoshiCtl:BaoShiViewItemCtl;
    private _baoshiAttrCtl:BaoShiAttrCtl;
    public ctl1: SelectListCtl = new SelectListCtl();
    public ctl2: SelectListCtl = new SelectListCtl();
    public ctl3: SelectListCtl = new SelectListCtl();
    protected autoFree = true;
    protected  onAddLoadRes(){
        this.addAtlas('baoshi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.baoshi.ui_baoshiXQViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn_tj,new Laya.Handler(this,this.onBtnTJGHClick)),
            ButtonCtl.Create(this._ui.btn_l,new Laya.Handler(this,this.onBtnLClick)),
            ButtonCtl.Create(this._ui.btn_r,new Laya.Handler(this,this.onBtnRClick)),
            ButtonCtl.Create(this._ui.btn_fz,new Laya.Handler(this,this.onBtnFZGHClick)),
            ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick))
            )

            this._baoshiCtl = new BaoShiViewItemCtl(this._ui.view_bs);
            this._baoshiAttrCtl = new BaoShiAttrCtl(this._ui.view_attr);

            let arr = BaoShiModel.Ins.getBaoShiSelArr();
            this.ctl1.init(this._ui.sanjiao1, this._ui.listarea1, this._ui.listcontainer1, this._ui.listtf1,
                ui.views.baoshi.ui_baoshiSelectItemUI, arr[0]);
    
            this.ctl2.init(this._ui.sanjiao2, this._ui.listarea2, this._ui.listcontainer2, this._ui.listtf2,
                ui.views.baoshi.ui_baoshiSelectItemUI, arr[1]);
    
            this.ctl3.init(this._ui.sanjiao3, this._ui.listarea3, this._ui.listcontainer3, this._ui.listtf3,
                ui.views.baoshi.ui_baoshiSelectItemUI, arr[2]);

            this.ctl1.selectHandler = new Laya.Handler(this,this.onSelectHandler);
            this.ctl2.selectHandler = new Laya.Handler(this,this.onSelectHandler);
            this.ctl3.selectHandler = new Laya.Handler(this,this.onSelectHandler);

            this._ui.list.itemRender = BaoShiItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }

    protected onInit(){
        BaoShiModel.Ins.on(BaoShiModel.BAOSHI_UPDATA,this,this.onUpdataView);
        BaoShiModel.Ins.on(BaoShiModel.DEFFAZHENG_UPDATA,this,this.onUpdataView);
        this.ctl1.selectIndex(0);
        this.ctl2.selectIndex(0);
        this.ctl3.selectIndex(0);
        this.updataView();
    }

    protected onExit(){
        BaoShiModel.Ins.off(BaoShiModel.BAOSHI_UPDATA,this,this.onUpdataView);
        BaoShiModel.Ins.off(BaoShiModel.DEFFAZHENG_UPDATA,this,this.onUpdataView);
    }

    private onUpdataView(){
        let fzCfg = FaZhengListProxy.Ins.getCfgById(BaoShiModel.Ins.mationId);
        let iCfg = ItemProxy.Ins.getCfg(fzCfg.f_itemid);
        this._ui.lab_fz.text = main.itemName(iCfg.f_name);
        this._baoshiCtl.setData(BaoShiModel.Ins.getEquipList(),true,BaoShiModel.Ins.mationId,false);
        this._baoshiAttrCtl.setData(BaoShiModel.Ins.getEquipList(),BaoShiModel.Ins.mationId);
        this._ui.lab_fzsm.text = BaoShiModel.Ins.getFZST(BaoShiModel.Ins.mationId);
        this._ui.list.array = BaoShiModel.Ins.getBagListBy(this.ctl1.curIndex,
        this.ctl2.curIndex,this.ctl3.curIndex);
        this.setBtn();
    }

    private onSelectHandler(){
        Laya.timer.callLater(this,this.selectHandler);
    }

    private selectHandler(){
        this._ui.list.array = BaoShiModel.Ins.getBagListBy(this.ctl1.curIndex,
        this.ctl2.curIndex,this.ctl3.curIndex);
        this._ui.list.page = 0;
        this.setBtn();
    }

    private onItemRender(item:BaoShiItem){
        item.ctl.setData(item.dataSource,true,false);
    }

    private onBtnTJGHClick(){
        E.ViewMgr.Open(EViewType.BaoShiTJView);
    }

    private onBtnFZGHClick(){
        E.ViewMgr.Open(EViewType.FaZhengGHView);
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("BaoShiTitle2","BaoShiDec2");
    }

    private onBtnLClick(){
        this._ui.list.page --;
        this.setBtn();
    }

    private onBtnRClick(){
        this._ui.list.page ++;
        this.setBtn();
    }

    private updataView(){
        let fzCfg = FaZhengListProxy.Ins.getCfgById(BaoShiModel.Ins.mationId);
        let iCfg = ItemProxy.Ins.getCfg(fzCfg.f_itemid);
        this._ui.lab_fz.text = main.itemName(iCfg.f_name);
        this._baoshiCtl.setData(BaoShiModel.Ins.getEquipList(),true,BaoShiModel.Ins.mationId,false);
        this._baoshiAttrCtl.setData(BaoShiModel.Ins.getEquipList(),BaoShiModel.Ins.mationId);
        this._ui.lab_fzsm.text = BaoShiModel.Ins.getFZST(BaoShiModel.Ins.mationId);
    }

    private setBtn(){
        let index:number = this._ui.list.page + 1;
        if(index <= 1){
            this._ui.btn_l.disabled = true;
        }else{
            this._ui.btn_l.disabled = false;
        }
        if(index >= this._ui.list.totalPage){
            this._ui.btn_r.disabled = true;
        }else{
            this._ui.btn_r.disabled = false;
        }
        if(this._ui.list.totalPage != 0){
            this._ui.lab_page.text = index + "/" + this._ui.list.totalPage;
        }else{
            this._ui.lab_page.text = "1/1"
        }
    }
}