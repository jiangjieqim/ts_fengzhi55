import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stEquipAttr } from "../../../../network/protocols/BaseProto";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { MainModel } from "../model/MainModel";
import { EquipItemVo } from "../vos/EquipItemVo";
import { EquipAttrSkinProxy } from "./EquipAttrSkinProxy";
import { EquipItemView } from "./EquipItemView";
import { Equip_switchView } from "./Equip_switchView";

/**
 * 装备tips
 */
export class EquipTipsView extends ViewBase{
    protected mMask = true;
    protected autoFree = true;
    private _curData:EquipItemVo;
    private _ui:ui.views.main.ui_equip_tipsUI;
    private _equipItem:EquipItemView;
    private fuboCtl:ButtonCtl;
    // private itemProxy:EquipAttrSkinProxy;
    private model:MainModel;
    private _plusCtl:PlusCtl;
    protected onFirstInit() {
        if(!this.UI){
            this.model = MainModel.Ins;
            // this.itemProxy = new EquipAttrSkinProxy();
            this.UI = this._ui = new ui.views.main.ui_equip_tipsUI();
            this._plusCtl = new PlusCtl();
            this._equipItem = new EquipItemView(this._ui.equip);
            this.btnList.push(new ButtonCtl(this._ui.closeBtn1,new Laya.Handler(this,this.onCloseHandler1)));

            this.fuboCtl = new ButtonCtl(this._ui.fumobtn,new Laya.Handler(this,this.onFuMoClickHandler));
            this.btnList.push(this.fuboCtl);

            this._ui.attrlist.itemRender = ui.views.main.ui_main_show_attrUI;
            this._ui.attrlist.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            // this._ui.fumolist.itemRender = ui.views.main.ui_main_attr1UI;
            // this._ui.fumolist.renderHandler = new Laya.Handler(this,this.onFuMoItemHandler);
            // this._ui.fumolist.array = [];//this._curData.getGainAttr();
            this._ui.fumolist.visible = false;
            this._ui.bg5.visible = false;
            // this._ui.bg3.visible = false;this._ui.bg3.sizeGrid;
        }
    }
    private onFuMoClickHandler(){
        E.ViewMgr.ShowMidLabel(E.LangMgr.getLang("FuncNotOpen"));
        // E.ViewMgr.Open(EViewType.HuanzhuangMain);
    }
    private onAttrItemHandler(skin:ui.views.main.ui_main_show_attrUI){
        if(!(skin.dataSource instanceof stEquipAttr)){
            Equip_switchView.setDesc(skin,skin.dataSource);
            return;
        }
        skin.attrdesc.text = '';
        EquipAttrSkinProxy.setDataThan(skin,skin.dataSource);
    }
    
    // private onFuMoItemHandler(skin:ui.views.main.ui_main_attr1UI){
    // EquipAttrSkinProxy.setDataThan(skin,skin.dataSource);
    // }
    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }
    protected onExit() {
        
    }
    protected onAddLoadRes() {
        // this.addAtlas("equip.atlas");
    }
    protected onAddEventListener() {

    }

    protected onEnter() {
    
    }
    protected onInit() {
        if(E.ViewMgr.isOpenReg(EViewType.SmallTips)){
            E.ViewMgr.Close(EViewType.SmallTips);
        }
        this._curData = this.Data;
        this.refresh();
        // E.ViewMgr.Open(EViewType.SceneMask);
        // console.log("equip",this._curData.equipVo.uid);
    }

    private refresh(){
        this._ui.nameTF.text = this._curData.getName();
        this._ui.nameTF.color = this._curData.getQuaColor();
        this._equipItem.setData(this._curData);
        // this._ui.plugs.value = this._curData.equipVo.plus.toString();
        this._plusCtl.setPlus(this._ui.plugs,this._curData.equipVo.plus);

        this._ui.attrlist.array = Equip_switchView.convertAttr(this._curData.equipVo.attrList);
        // ItemViewFactory.rebuildAttr(this._curData.equipVo.attrList);
        // this._curData.getBaseAttr();
    }
}