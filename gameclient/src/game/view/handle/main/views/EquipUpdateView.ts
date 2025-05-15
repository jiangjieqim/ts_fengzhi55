import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stEquipAttr } from "../../../../network/protocols/BaseProto";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { EquipItemVo } from "../vos/EquipItemVo";
import { EquipAttrSkinProxy } from "./EquipAttrSkinProxy";
import { EquipItemView } from "./EquipItemView";
import { Equip_switchView } from "./Equip_switchView";
/**
 * 单个装备
 */
export class EquipUpdateView extends ViewBase{
    private close1Btn:ButtonCtl;
    private equipBtnCtl:ButtonCtl;
    private _ui:ui.views.main.ui_equip_updateUI;
    private _curData:EquipItemVo;
    private _equipItem:EquipItemView;
    private model:MainModel;
    private _plusCtl:PlusCtl;// = new PlusCtl();
    protected autoFree = true;
    protected mMask:boolean = true;
    protected mMaskClick:boolean = false;

    protected onFirstInit() {
        if(!this.UI){
            this.model = MainModel.Ins;
            // this.itemProxy = new EquipAttrSkinProxy();
            this.UI = this._ui = new ui.views.main.ui_equip_updateUI();
            this.close1Btn = new ButtonCtl(this._ui.close1, new Laya.Handler(this, this.onCloseUI));
            this.equipBtnCtl = new ButtonCtl(this._ui.equipBtn,new Laya.Handler(this,this.onEquipHandler));
            this._plusCtl = new PlusCtl();
            this.btnList.push(this.equipBtnCtl,this.close1Btn);
            this._equipItem = new EquipItemView(this._ui.equip);
            this._ui.attrlist.itemRender = ui.views.main.ui_main_show_attrUI;
            this._ui.attrlist.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
        }
    }

    /**
     * 请求穿戴装备
     */
    private onEquipHandler(){
        this.model.equip(this._curData.equipVo);
        E.ViewMgr.Close(this.ViewType);
        this.model.event(MainEvent.EquipSlot,this._curData.equipVo.type);
    }
    private onAttrItemHandler(skin:ui.views.main.ui_main_show_attrUI){
        // this.itemProxy.skin = skin;
        if(!(skin.dataSource instanceof stEquipAttr)){
            Equip_switchView.setDesc(skin,skin.dataSource);
            return;
        }
        skin.attrdesc.text = '';
        EquipAttrSkinProxy.setDataThan(skin,skin.dataSource,null,true);
    }

    //override
    protected SetCenter(): void {
        this.UI.anchorX = this.UI.anchorY = 0.5;
        // let Parent = this.UI.parent as Laya.Sprite;
        // if(Parent){
        //     this.UI.x = (Parent.width - this.UI.width) >> 1;
        //     this.UI.y = Parent.height >> 1;
        // }
        this.UI.x = this.ViewParent.width >> 1;
        this.UI.y = (this.ViewParent.height >> 1) + 240;
    }

    private onCloseUI() {
        MainModel.Ins.clientClickEquipCloseBtn(this.ViewType);
        E.ViewMgr.Close(this.ViewType);
    }
    protected onExit() {
        // this.model.mLock = false;
        this.model.event(MainEvent.EquipViewClose);
    }
    protected onAddLoadRes() {
        this.addAtlas("main/equip.atlas");
    }
    protected onAddEventListener() {

    }
    protected onEnter() {
    
    }
    protected onInit() {
        if(this.Data){
            this._curData = this.Data;
            this._equipItem.setData(this._curData);

            this._ui.nameTF.text = this._curData.getName();
            this._ui.nameTF.color = this._curData.getQuaColor();
            // this._ui.plugs.value = this._curData.equipVo.plus.toString();
            this._plusCtl.setPlus(this._ui.plugs, this._curData.equipVo.plus);
            this._ui.attrlist.array = Equip_switchView.convertAttr(this._curData.equipVo.attrList);
            // ItemViewFactory.rebuildAttr(this._curData.equipVo.attrList);
            // this._curData.getBaseAttr();
        }
    }
}