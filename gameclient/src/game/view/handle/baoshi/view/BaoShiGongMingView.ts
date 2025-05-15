import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { GemLifeBlood_req, stGem } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { BaoShiModel } from "../model/BaoShiModel";
import { BaoShiResonanceProxy, FaZhengProxy } from "../proxy/BaoShiProxy";
import { BaoShiItemCtl } from "./ctl/BaoShiItemCtl";
import { BaoShiGongMingItem } from "./item/BaoShiGongMingItem";

export class BaoShiGongMingView extends ViewBase{
    private _ui:ui.views.baoshi.ui_baoshiGongMingViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree: boolean = true;

    private tabsCtl:TabControl;
    private tabList: any;

    private _item1:BaoShiItemCtl;
    private _item2:BaoShiItemCtl;
    private _item3:BaoShiItemCtl;
    private _item4:BaoShiItemCtl;
    private _item5:BaoShiItemCtl;
    private _item6:BaoShiItemCtl;
    private _item7:BaoShiItemCtl;
    private _item8:BaoShiItemCtl;
    private _item9:BaoShiItemCtl;
    private _item10:BaoShiItemCtl;
    private _item11:BaoShiItemCtl;
    private _item12:BaoShiItemCtl;

    protected onAddLoadRes() {
        this.addAtlas("baoshi.atlas");
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.baoshi.ui_baoshiGongMingViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_left, new Laya.Handler(this, this.onBtnLeftClick)),
                ButtonCtl.Create(this._ui.btn_right, new Laya.Handler(this, this.onBtnRightClick)),
                ButtonCtl.Create(this._ui.btn_tip, new Laya.Handler(this, this.onBtnTipClick)),
                ButtonCtl.Create(this._ui.btn1, new Laya.Handler(this, this.onBtnClick1)),
                ButtonCtl.Create(this._ui.btn2, new Laya.Handler(this, this.onBtnClick2))
            );

            for(let i:number=1;i<13;i++){
                this["_item" + i] = new BaoShiItemCtl(this._ui["item" + i]);
            }

            this._ui.list.itemRender = BaoShiGongMingItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            const tabsSkin = [this._ui.tab1, this._ui.tab2];
            let st = E.getLang("baoshiTab");
            this.tabList = st.split("-");
            this.tabsCtl = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this, this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));
        }
    }

    private onRenderHandler(item:BaoShiGongMingItem,index:number){
        item.setData(item.dataSource,index);
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.baoshi.ui_tabUI = tabSkin;
        skin.txt.text = this.tabList[index];
        if (sel) {
            skin.img1.visible = false;
            skin.img2.visible = true;
            skin.txt.color = "#A1572F";
        } else {
            skin.img1.visible = true;
            skin.img2.visible = false;
            skin.txt.color = "#e4bb87";
        }
    }

    private onTabSelectHandler(v:number){
        this._ui.sp1.visible = this._ui.sp2.visible = false;
        this._ui["sp"+(v+1)].visible = true;
        this["updataView"+(v+1)]();
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("BaoShiGMTitle","BaoShiGMDec");
    }

    private onBtnClick1(){
        let req:GemLifeBlood_req = new GemLifeBlood_req;
        req.flag = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnClick2(){
        let req:GemLifeBlood_req = new GemLifeBlood_req;
        req.flag = 1;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onInit(): void {
        BaoShiModel.Ins.on(BaoShiModel.lifeBloodChange,this,this.onUpdataView);
        this.tabsCtl.selectIndex = 0;
        this.updataRedTip();
    }

    private updataRedTip(){
        if(BaoShiModel.Ins.isXMRedTip()){
            DotManager.addDot(this._ui.tab2,10,-10);
            DotManager.addDot(this._ui.btn2,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab2);
            DotManager.removeDot(this._ui.btn2);
        }
    }

    protected onExit(): void {
        BaoShiModel.Ins.off(BaoShiModel.lifeBloodChange,this,this.onUpdataView);
        this.tabsCtl.dispose();
    }

    private onUpdataView(){
        this.updataView2();
    }

    private _index:number;
    private updataView1(){
        let value = BaoShiModel.Ins.getEquipList();
        for(let i:number = 1;i<13;i++){
            if(value){
                let vo = value.find(item => (item as stGem).pos == i);
                if(vo){
                    (this["_item" + i] as BaoShiItemCtl).setVisible(true);
                    (this["_item" + i] as BaoShiItemCtl).setData(vo,false,true,false,false,false);
                }else{
                    (this["_item" + i] as BaoShiItemCtl).setVisible(false);
                }
            }else{
                (this["_item" + i] as BaoShiItemCtl).setVisible(false);
            }
        }

        let arr = FaZhengProxy.Ins.getCfgById(BaoShiModel.Ins.mationId);
        for(let i:number=0;i<arr.length;i++){
            this._ui["img_" + arr[i].f_FormationidPos].skin = "o/gem/" + "bsq_" + arr[i].f_GemColor + ".png";
        }

        if(value.length >= 12){
            this._ui.lab4.visible = false;
        }else{
            this._ui.lab4.visible = true;
        }

        let lv = BaoShiModel.Ins.getGMLv();
        this._ui.lab.text = "Lv." + lv;
        let array = BaoShiResonanceProxy.Ins.List;
        this._index = 0;
        for(let i:number=0;i<array.length;i++){
            if(lv >= array[i].f_gemlevelmin){
                this._index = i;
            }
        }
        this.showLab();
    }

    private onBtnLeftClick(){
        this._index --;
        this.showLab();
    }

    private onBtnRightClick(){
        this._index ++;
        this.showLab();
    }

    private setBtn(){
        if(this._index <= 0){
            this._index = 0;
            this._ui.btn_left.disabled = true;
        }else{
            this._ui.btn_left.disabled = false;
        }

        let array = BaoShiResonanceProxy.Ins.List;
        if(this._index >= array.length - 1){
            this._index = array.length - 1
            this._ui.btn_right.disabled = true;
        }else{
            this._ui.btn_right.disabled = false;
        }
    }

    private showLab(){
        let array = BaoShiResonanceProxy.Ins.List;
        let cfg = array[this._index];
        this._ui.lab1.text = "lv." + cfg.f_gemlevelmin;
        let lv = BaoShiModel.Ins.getGMLv();
        if(lv > parseInt(cfg.f_gemlevelmin)){
            this._ui.lab5.text = "";
            this._ui.lab2.color = this._ui.lab3.color = "#B47648";
        }else if(lv == parseInt(cfg.f_gemlevelmin)){
            this._ui.lab5.text = "(激活中)";
            this._ui.lab5.color = "#1FA0EF";
            this._ui.lab2.color = this._ui.lab3.color = "#48A2DC";
        }else{
            this._ui.lab5.text = "(等级不足)";
            this._ui.lab5.color = "#ED1B1B";
            this._ui.lab2.color = this._ui.lab3.color = "#7E7D7D";
        }
        let arr = cfg.f_attr.split(":");
        let id = parseInt(arr[0]);
        let val = attrConvert(id,parseInt(arr[1]));
        this._ui.lab2.text = MainModel.Ins.getAttrNameIdByID(id);
        this._ui.lab3.text = val;
        this.setBtn();
    }

    //*********************************************************** */
    private updataView2(){
        this._ui.list.array = BaoShiModel.Ins.lifeBloodList;
        this.updataRedTip();
    }
}