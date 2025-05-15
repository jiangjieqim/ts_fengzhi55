import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stEquipAttr, stEquipItem } from "../../../../network/protocols/BaseProto";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { DateFactory } from "../model/DateFactory";
import { GameconfigProxy } from "../model/EquipmentProxy";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { EWearableType } from "../vos/ECellType";
import { EquipItemVo } from "../vos/EquipItemVo";
import { EquipAttrSkinProxy } from "./EquipAttrSkinProxy";
import { EquipItemView } from "./EquipItemView";
/**
 * 出售或者穿戴tips界面
 */
export class Equip_switchView extends ViewBase {
    protected autoFree = true;
    private _ui: ui.views.main.ui_equip_switchUI;
    private close1Btn: ButtonCtl;
    private equipBtnCtl: ButtonCtl;
    private sellBtnCtl: ButtonCtl;
    // protected mMask:boolean = true;
    private oldEquipVo: EquipItemVo;
    private newEquipVo: EquipItemVo;

    private topequip: EquipItemView;
    private equip: EquipItemView;
    private model: MainModel;
    private _plusCtl:PlusCtl;// = new PlusCtl();
    private _toPlusCtl:PlusCtl;// = new PlusCtl();
    private autoSellBtnCtl: ButtonCtl;
    // public PageType = EPageType.CloseBigToSmall;
    protected mMask:boolean = true;
    protected mMaskClick:boolean = false;

    protected onFirstInit() {
        if (!this.UI) {
            this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.main.ui_equip_switchUI();
            // this._ui.bg123.sizeGrid = "40,40,40,40";
            this._ui.maskbg.visible = false;

            this._plusCtl = new PlusCtl();
            this._toPlusCtl = new PlusCtl();

            this.close1Btn = new ButtonCtl(this._ui.close1, new Laya.Handler(this, this.onCloseUI));
            this.equipBtnCtl = new ButtonCtl(this._ui.equipBtn, new Laya.Handler(this, this.onEquipHandler));
            
            this.btnList.push(this.close1Btn,this.equipBtnCtl);
            
            // this.equipBtnCtl.setDelayTime(1.0);
            this.sellBtnCtl = new ButtonCtl(this._ui.sellBtn, new Laya.Handler(this, this.onSellHandler));

            this.topequip = new EquipItemView(this._ui.topequip);
            this.equip = new EquipItemView(this._ui.equip);

            this._ui.attrlist.itemRender = ui.views.main.ui_main_show_attrUI;//ui.views.main.ui_main_attrUI;
            this._ui.attrlist.renderHandler = new Laya.Handler(this, this.onAttrItemHandler);

            this._ui.toplist.itemRender = ui.views.main.ui_main_show_attrUI;//ui.views.main.ui_main_attrUI;
            this._ui.toplist.renderHandler = new Laya.Handler(this, this.onOldAttrItemHandler);
            this._ui.autosell.visible = false;
            this.autoSellBtnCtl = new ButtonCtl(this._ui.autoSellBtn, new Laya.Handler(this, this.onAutoSellHandler));
            this._ui.autosell.visible = MainModel.Ins.autoSell;
        }
    }

    private onSellOk(){
        this.model.sell(this.newEquipVo.equipVo.uid);
        this.Close();
    }

    private isReplaceHigher() {
        //if (this.newEquipVo.plus > this.oldEquipVo.plus && EquipAttrSkinProxy.isThreeBetter(this.curList,this.topList)) {
        if (this.newEquipVo.plus > this.oldEquipVo.plus) {
            return true;
        }
        return false;
    }
    //售卖
    private onSellHandler() {
        if(this.isReplaceHigher()){
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.getLang("okSell"),new Laya.Handler(this,this.onSellOk));
            return;
        }
        this.onSellOk();
    }
    //穿戴
    private onEquipHandler() {
        if (this._ui.autosell.visible) {
            // 自动出售
            const res = this.isReplaceHigher();
            if (!res) {
                // 弹提示
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.getLang("okSell"),new Laya.Handler(this,this.onEquipOK));
                return;
            }
        }
        this.onEquipOK();
    }
    private onEquipOK() {
        this.model.once(MainEvent.EquipChange,this,this.onStartEquipEvt);
        this.model.equip(this.newEquipVo.equipVo);
    }
    //替换后自动出售原装备
    private onAutoSellHandler() {
        this._ui.autosell.visible = !this._ui.autosell.visible;
        MainModel.Ins.autoSell = this._ui.autosell.visible;
    }
    

    private onStartEquipEvt(){
        // this.model.isStartEquip = false;
    }

    private onCloseUI() {
        MainModel.Ins.clientClickEquipCloseBtn(this.ViewType);
        E.ViewMgr.Close(this.ViewType);
    }
    protected onExit() {
        // this.model.isStartEquip = false;
        // this.model.isSelling = false;
        this.model.off(MainEvent.EquipChange, this, this.onEquipEvt);
        this.model.off(MainEvent.SellFinished, this, this.onSellFinished);
        Laya.timer.clear(this,this.onCheckClose);
        // this.model.mLock = false;

        let type = this.oldEquipVo.equipVo.type;
        if(this.model.oldSkin[type]!=this.oldEquipVo){
            this.model.event(MainEvent.EquipSlot,type);
            this.model.oldSkin[type] = null;
        }
        this.model.event(MainEvent.EquipViewClose);
    }
    protected onAddLoadRes() {
        this.addAtlas("main/equip.atlas");
    }
    protected onAddEventListener() {
        this.model.on(MainEvent.EquipChange, this, this.onEquipEvt);
        this.model.on(MainEvent.SellFinished, this, this.onSellFinished);
    }

    private getWearable(l: stEquipItem[], wearable: EWearableType) {
        for (let i = 0; i < l.length; i++) {
            let cell: stEquipItem = l[i];
            if (cell.wearable == wearable) {
                return cell
            }
        }
    }

    protected onEquipEvt(data: stEquipItem[]) {
        if (data.length == 2) {
            this._ui.newGet.visible  = this._ui.box1.visible = false;
            let wearItem = this.getWearable(data, EWearableType.Wearable);
            let unWearItem = this.getWearable(data, EWearableType.Not);
            if (!wearItem || !unWearItem) {
                return;
            }
            this.oldEquipVo = DateFactory.createEquipItemVo(wearItem);
            this.newEquipVo = DateFactory.createEquipItemVo(unWearItem);
            this.updateView();

        }
    }
    
    protected onSellFinished() {
        if (this._ui.autosell.visible) {
            // 自动出售
            this.onSellOk();
        }
    }

    protected onEnter() {

    }

    private onCheckClose(){
        let cell: EquipItemVo = this.model.getNotWear();
        if(!cell){
            // console.log(">>>>>>>>>>>>>> close switch UI!!!!");
            this.Close();
        }
    }

    protected onInit() {
        if(this.Data){
            Laya.timer.frameLoop(1,this,this.onCheckClose);

            this.oldEquipVo = this.Data[0];
            
            this.model.oldSkin[this.oldEquipVo.equipVo.type] = this.oldEquipVo;
            
            this.newEquipVo = this.Data[1];
            this._ui.newGet.visible = this._ui.box1.visible = true;
            this.updateView();
        }
    }
    private curList;
    private topList;

    public static convertAttr(l:stEquipAttr[]){
        l = l.sort(ItemViewFactory.attrSortHandler);
        let _result = [];
        for(let i = 0;i < l.length;i++){
            let o:stEquipAttr = l[i];
            let cfg:Configs.t_gameconfig_dat = GameconfigProxy.Ins.GetDataById(o.id);
            _result.push(o)
            if(cfg.f_desc!=""){
                _result.push(cfg.f_desc);
            }
        }
        return _result;
    }

    private updateView() {
        // console.log('updateView:',this.oldEquipVo.equipVo.type , this.oldEquipVo.equipVo.equipStyle,this.oldEquipVo.equipVo.quality ,'*' ,
        //  this.newEquipVo.equipVo.type , this.newEquipVo.equipVo.equipStyle,this.newEquipVo.equipVo.quality);
        //old
        this.topequip.setData(this.oldEquipVo);
        this._ui.topNameTf.text = this.oldEquipVo.getName();
        this._ui.topNameTf.color = this.oldEquipVo.getQuaColor();
        // this._ui.toplug.value = this.oldEquipVo.equipVo.plus.toString();
        this._toPlusCtl.setPlus(this._ui.toplug,this.oldEquipVo.equipVo.plus);

        this.topList = Equip_switchView.convertAttr(this.oldEquipVo.equipVo.attrList);//ItemViewFactory.rebuildAttr(this.oldEquipVo.equipVo.attrList);
        this._ui.toplist.array = this.topList;

        //new
        this.equip.setData(this.newEquipVo);
        this._ui.nameTF.text = this.newEquipVo.getName();
        this._ui.nameTF.color = this.newEquipVo.getQuaColor();

        // this._ui.plugs.value = this.newEquipVo.equipVo.plus.toString();
        this._plusCtl.setPlus(this._ui.plugs,this.newEquipVo.equipVo.plus);
        this.curList = Equip_switchView.convertAttr(this.newEquipVo.equipVo.attrList);//ItemViewFactory.rebuildAttr(this.newEquipVo.equipVo.attrList);
        this._ui.attrlist.array = this.curList;

        //update arrow
        let oldPlus = this.oldEquipVo.equipVo.plus;
        let newPlus = this.newEquipVo.equipVo.plus;
        if (oldPlus > newPlus) {
            //  this._ui.toparrow.skin = "remote/common/base/green.png";
            this._ui.upimg.skin = "remote/common/base/red.png";
        } else if (oldPlus < newPlus) {
            //  this._ui.toparrow.skin = "remote/common/base/red.png";
            this._ui.upimg.skin = "remote/common/base/green.png";
        } else {
            //  this._ui.toparrow.skin = this._ui.upimg.skin = "";
        }
        this._ui.upimg.x = this._ui.plugs.x + this._plusCtl.mWidth*this._plusCtl.mScale;

        this._ui.toparrow.skin = "";
    }
    public static setDesc(skin:ui.views.main.ui_main_show_attrUI,desc:string){
        skin.attrdesc.text = desc;
        skin.upimg.skin = "";
        skin.tf1.text = "";
        skin.valTf.text = "";
    }
    /**旧属性 */
    private onOldAttrItemHandler(skin: ui.views.main.ui_main_show_attrUI, index: number) {
        if(!(skin.dataSource instanceof stEquipAttr)){
            Equip_switchView.setDesc(skin,skin.dataSource);
            return;
        }
        skin.attrdesc.text = '';
        EquipAttrSkinProxy.setDataThan(skin, skin.dataSource);
        // if (E.Debug) {skin.tf1.text += "[" + index + "]";}
    }
    /**新属性 */
    private onAttrItemHandler(skin: ui.views.main.ui_main_show_attrUI, index: number) {
        if(!(skin.dataSource instanceof stEquipAttr)){
            Equip_switchView.setDesc(skin,skin.dataSource);
            return;
        }
        skin.attrdesc.text = '';
        let cellOld = this._ui.toplist.array[index];
        EquipAttrSkinProxy.setDataThan(skin, skin.dataSource, cellOld);
        // if (E.Debug) {skin.tf1.text += "[" + index + "]";}
    }

    protected SetCenter(){
        this.UI.anchorX = this.UI.anchorY = 0.5;
        this.UI.x = this.ViewParent.width >> 1;
        this.UI.y = (this.ViewParent.height >> 1) + 160;
    }
}