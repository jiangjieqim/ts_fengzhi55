import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { WingModel } from "../model/WingModel";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { WingExpProxy, WingIdProxy, WingInitProxy, WingUpdateAttrSkinProxy } from "../proxy/WingProxy";
import { IAttrItem, ISpecialAttrItem, IWingData } from "../interface/IWing";
import {DotManager} from "../../common/DotManager";

// 翅膀信息界面
export class WingInfoView extends ViewBase{
    private _ui:ui.views.wing.ui_wing_infoUI;
    protected mMask = true;
    private _plusCtl:PlusCtl = new PlusCtl();
    private wingData: IWingData;

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wing.ui_wing_infoUI();
            this._ui.wingbox.bg2.visible = false;
            this._ui.wingbox.icon.visible = false;
            ButtonCtl.Create(this._ui.closeBtn1,new Laya.Handler(this,this.onCloseHandler1));
            ButtonCtl.Create(this._ui.wingBtn,new Laya.Handler(this,this.onEnterHandler));
            this._ui.attrlist.itemRender = ui.views.wing.ui_wing_attr2UI;
            this._ui.attrlist.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            this._ui.attrList2.itemRender = ui.views.wing.ui_wing_attr2UI;
            this._ui.attrList2.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            this._ui.addAttrList.itemRender = ui.views.wing.ui_wing_attrUI;
            this._ui.addAttrList.renderHandler = new Laya.Handler(this,this.onSpecialAttrItemHandler);
        }
    }

    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }

    private onAttrItemHandler(skin:ui.views.wing.ui_wing_attr2UI){
        WingUpdateAttrSkinProxy.setWingInfoAttrItem(skin,skin.dataSource);
    }

    private onSpecialAttrItemHandler(skin:ui.views.wing.ui_wing_attrUI) {
        WingUpdateAttrSkinProxy.setDataThan2(skin,skin.dataSource);
    }

    public refresh(isOwner: boolean){
        const model = isOwner ?  WingModel.Ins : this.wingData;
        const wingId = model.wingId;
        const level = model.level;
        const stage = model.stage;
        const wingName = model.wingName;
        const treasureStage = model.treasureStage;
        // 翅膀总属性列表
        const attrList = WingIdProxy.Ins.getWingAttrList(wingId, level, stage, treasureStage);
        // 翅膀战斗力
        const plus = model.wingFightCapacity;
        this._ui.nameTF.text = wingName;
        this._ui.wingLevelText.text = `${stage}阶${level}级`;
        this._plusCtl.setPlus(this._ui.plugs, plus);
        this._ui.wingbox.wingLeftIcon.skin = ItemViewFactory.getWingIcon(wingId);
        this._ui.wingbox.wingRightIcon.skin = ItemViewFactory.getWingIcon(wingId);
        const wingAttrs = WingModel.wingAttrs;
        // 翅膀属性
        const baseAttrs: (IAttrItem | string)[] = attrList.filter(o => wingAttrs.indexOf(o.id) === -1);
        const initAttrList: IAttrItem[] = WingInitProxy.Ins.getWingInitAttrList(wingId);
        const initWingAttr = initAttrList.find(o => (wingAttrs.indexOf(o.id) !== -1) && o.value);
        if (baseAttrs.length % 2) {
            baseAttrs.push('empty');
        }
        const baseAttrs2: (IAttrItem | string)[] = [];
        // 加成属性
        const addAttrs: IAttrItem[] = attrList.filter(o => wingAttrs.indexOf(o.id) !== -1);
        const specialAttrs: ISpecialAttrItem[] = [];
        addAttrs.forEach(item => {
            const o = {...item};
            if (initWingAttr && (o.id === initWingAttr.id)) {
                const value = o.value - initWingAttr.value;
                baseAttrs2.push({ ...o, value });
                specialAttrs.push({ ...o, value, addValue: initWingAttr.value });
            } else {
                baseAttrs2.push(o);
            }
        });
        // if (specialAttrs.length) {
        //     this._ui.wingAttrAddTitle.visible = true;
        // } else {
        //     this._ui.wingAttrAddTitle.visible = false;
        // }
        // this._ui.attrlist.array = baseAttrs;
        //this._ui.attrList2.array = baseAttrs2;
        // this._ui.addAttrList.array = specialAttrs;

        this._ui.attrlist.array = WingModel.Ins.wingLevelAttrs.map(o => ({ id: o.id, value: o.now }));
        let arr2: IAttrItem[] = WingModel.Ins.wingStageAttrs.map(o => ({ id: o.id, value: o.now }));
        if (initWingAttr) {
            const addWingUpgradeInfo = WingModel.Ins.wingStageAttrs.find(o => o.id === initWingAttr.id);
            let addAttr: ISpecialAttrItem = {
                id: initWingAttr.id,
                value: addWingUpgradeInfo ? addWingUpgradeInfo.now - initWingAttr.value : 0,
                addValue: initWingAttr.value,
                //title?: string;
            }
            arr2.forEach((o, i) => {
                if (o.id === initWingAttr.id) {
                    arr2[i].value -= initWingAttr.value;
                }
            });
            this._ui.wingAttrAddTitle.visible = true;
            this._ui.addAttrList.array = [addAttr];
        } else {
            this._ui.wingAttrAddTitle.visible = false;
            this._ui.addAttrList.array = [];
        }
        this._ui.attrList2.array = arr2;
    }

    onEnterHandler() {
        const model = this.wingData || WingModel.Ins;
        const level = model.level;
        const stage = model.stage;
        const levelData = WingExpProxy.Ins.getNextLevelData(level, stage);
        const restLevel = levelData.restLevel;
        if (restLevel) {
            // 升级
            E.ViewMgr.Open(EViewType.WingMainLevel, null);
        } else {
            // 升阶
            E.ViewMgr.Open(EViewType.WingMainStage, null);
        }
        this.Close();
    }

    protected onAddLoadRes() {
        this.addAtlas('main/wing.atlas');
    }

    protected onExit() {
        WingModel.Ins.off(WingModel.EventRedRefresh,this,this.onRedUpdate);
        this.wingData = undefined;
    }

    protected onInit() {
        if (this.Data) {
            WingModel.Ins.on(WingModel.EventRedRefresh,this,this.onRedUpdate);
            this.wingData = this.Data;
            if (this.Data.isOwner) {
                this._ui.wingBtn.visible = true;
            } else {
                this._ui.wingBtn.visible = false;
            }
            this.refresh(this.Data.isOwner);
            this.onRedUpdate();
        }
    }
    private onRedUpdate(){
        if(WingModel.Ins.mLevelUp){
            DotManager.addDot(this._ui.wingBtn);
        }else{
            DotManager.removeDot(this._ui.wingBtn);
        }
    }
}