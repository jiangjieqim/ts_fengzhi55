import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SelectListCtl } from "../../main/ctl/SelectListCtl";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { BaoShiModel } from "../model/BaoShiModel";
import { BaoShiShopProxy } from "../proxy/BaoShiProxy";
import { BaoShiDHItem } from "./item/BaoShiDHItem";
import { BaoShiItem } from "./item/BaoShiItem";

//兑换宝石
export class BaoShiDHView extends ViewBase{
    private _ui:ui.views.baoshi.ui_baoshiDHViewUI;
    protected mMask = true;
    protected autoFree = true;
    public ctl1: SelectListCtl = new SelectListCtl();
    public ctl2: SelectListCtl = new SelectListCtl();
    public ctl3: SelectListCtl = new SelectListCtl();

    protected  onAddLoadRes(){
        this.addAtlas('baoshi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.baoshi.ui_baoshiDHViewUI;
            this.bindClose(this._ui.btn_close);

            ValCtl.Create(this._ui.lab1,this._ui.img1,ECellType.BaoShiQuan);
            ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.GOLD);
            ValCtl.Create(this._ui.lab3,this._ui.img3,ECellType.BaoShiQuanG);

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

            this._ui.list1.itemRender = BaoShiDHItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender1);
        }
    }

    protected onInit(){
        BaoShiModel.Ins.on(BaoShiModel.BAOSHI_UPDATA,this,this.onUpdataView);
        BaoShiModel.Ins.on(BaoShiModel.GemFreeChange,this,this.onGemFreeChange);
        this.ctl1.selectIndex(0);
        this.ctl2.selectIndex(0);
        this.ctl3.selectIndex(0);
        this.updataView();
    }

    protected onExit(){
        BaoShiModel.Ins.off(BaoShiModel.BAOSHI_UPDATA,this,this.onUpdataView);
        BaoShiModel.Ins.off(BaoShiModel.GemFreeChange,this,this.onGemFreeChange);
    }

    private onSelectHandler(){
        Laya.timer.callLater(this,this.selectHandler);
    }

    private selectHandler(){
        this._ui.list.array = BaoShiModel.Ins.getBagListBy(this.ctl1.curIndex,
            this.ctl2.curIndex,this.ctl3.curIndex);
    }

    private onUpdataView(){
        this._ui.list.array = BaoShiModel.Ins.getBagListBy(this.ctl1.curIndex,
            this.ctl2.curIndex,this.ctl3.curIndex);
    }

    private onGemFreeChange() {
        this.updataView();
    }

    private onItemRender(item:BaoShiItem){
        item.ctl.setData(item.dataSource,false,true);
    }

    private onItemRender1(item:BaoShiDHItem){
        item.setData(item.dataSource);
    }

    private updataView(){
        this._ui.lab1.text = MainModel.Ins.mRoleData.getVal(ECellType.BaoShiQuan) + "";
        this._ui.lab2.text = MainModel.Ins.mRoleData.getVal(ECellType.GOLD) + "";
        this._ui.lab3.text = MainModel.Ins.mRoleData.getVal(ECellType.BaoShiQuanG) + "";
        this._ui.list1.array = BaoShiShopProxy.Ins.List;
        // if(BaoShiModel.Ins.isResDot){
        //     DotManager.addDot(this._ui.btn_dh);
        // }
    }
}