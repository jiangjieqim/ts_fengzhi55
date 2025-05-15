import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { WingModel } from "../model/WingModel";
import { WingConfigProxy, WingExpProxy, WingIdProxy, WingUpdateAttrSkinProxy } from "../proxy/WingProxy";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { ItemVo } from "../vos/ItemVo";
import { MainModel } from "../model/MainModel";
import { GetWingList_req, WingLevelUp_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { WingLevelView } from "./WingLevelView";
import { MainEvent } from "../model/MainEvent";
import {StringUtil} from "../../../../../frame/util/StringUtil";

export class WingStageView extends ViewBase{
    private _ui:ui.views.wing.ui_wing_mainUI;
    protected mMask = true;
    private _plusCtl:PlusCtl = new PlusCtl();
    static isFull: boolean;
    private resourceIds = [];

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wing.ui_wing_mainUI();
            ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.onCloseHandler1));
            ButtonCtl.Create(this._ui.stageUpBtn,new Laya.Handler(this,this.onStageUpBtnHandler));
            ButtonCtl.Create(this._ui.upgradeBtn,new Laya.Handler(this,this.onUpgradeBtnHandler));
            ButtonCtl.Create(this._ui.exchangeBtn, new Laya.Handler(this,this.onExchangeBtnHandler));
            ButtonCtl.Create(this._ui.treasureBtn,new Laya.Handler(this,this.onTreasureBtnHandler));
            this._ui.title1.text = '阶段加成';
            this._ui.title2.text = '当前加成';
            this._ui.title3.text = '下阶加成';
            this._ui.levelUpBtn.visible = false;
            this._ui.stageUpBtn.visible = true;
            this._ui.attrList.itemRender = ui.views.wing.ui_wing_update_attrUI;
            this._ui.attrList.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            this._ui.addAttrList.itemRender = ui.views.wing.ui_wing_update_attrUI;
            this._ui.addAttrList.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            this._ui.btn_xslb.visible = false;
        }
    }

    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }

    private onAttrItemHandler(skin:ui.views.wing.ui_wing_update_attrUI){
        WingUpdateAttrSkinProxy.setDataThan(skin,skin.dataSource);
    }

    public refresh(){
        const model = WingModel.Ins;
        const wingId = model.wingId;
        const wingName = model.wingName;
        const levelData = WingExpProxy.Ins.getNextLevelData(model.level, model.stage);
        const stage = model.stage;
        const level = model.level;
        const attrList = WingIdProxy.Ins.getWingUpgradeAttrList(wingId, level, stage);;
        const plus = model.wingFightCapacity;
        const nextStageAttrList = WingIdProxy.Ins.getWingUpgradeAttrList(wingId, levelData.nextStageLevel, levelData.nextStage);
        if (levelData.restLevel) {
            // 当前是升级，预览升下一阶的信息
            // 按钮灰掉
            this._ui.stageUpBtn.gray = true;
        } else {
            // 展示当前升阶的信息，
            // 按钮复原
            if (levelData.isNextFinish) {
                this._ui.stageUpBtn.gray = true;
                this._ui.stageUpBtnLabel.text = '已满阶';
                this._ui.leftIconBox.visible = false;
                this._ui.rightIconBox.visible = false;
            } else {
                this._ui.stageUpBtn.gray = false;
            }
        }
        if (levelData.isNextFinish) {
            // 已满阶满级
            // 切换按钮文字改为已满阶
            this._ui.upgradeBtnText.text = '已满级';
            WingStageView.isFull = true;
        } else {
            // 不满阶
            // 切换按钮文字改为进阶加成
            this._ui.upgradeBtnText.text = '等级加成';
            WingStageView.isFull = false;
        }
        // 翅膀属性加成的属性id
        const wingAttrs = WingModel.wingAttrs;
        const attrIds = [...new Set([...attrList, ...nextStageAttrList].filter(o => wingAttrs.indexOf(o.id) !== -1).map(o => o.id))];
        const list = attrIds.map(id => {
            const now = attrList.find(o => o.id === id);
            const next = nextStageAttrList.find(o => o.id === id);
            return {
                id, now: now ? now.value : 0, next: next ? next.value : 0 
            };
        });
        const minNowValue = Math.min(...list.map(o => o.now));
        const maxNowValue = Math.max(...list.map(o => o.now));
        const minNextValue = Math.min(...list.map(o => o.next));
        // 加成属性
        let addList = [];
        // 翅膀属性
        const baseList = list.map(o => {
            if ((o.now !== minNowValue) && (maxNowValue !== minNextValue)) {
                // addList.push({
                //     id: o.id,
                //     now: o.now - minNowValue,
                //     next: o.next - minNextValue
                // });
                // o.now = minNowValue;
                // o.next = minNextValue;
                addList.push(o);
            }
            return o;
        });
        this._ui.curWingName.text = wingName;
        this._ui.wingLevelText.text = `${stage}阶${level}级`;
        this._ui.levelText.text = `再升${levelData.restLevel}级可进阶`;
        this._plusCtl.setPlus(this._ui.plugs, plus);
        this._ui.curWingView.wingLeftIcon.skin = ItemViewFactory.getWingIcon(wingId);
        this._ui.curWingView.wingRightIcon.skin = ItemViewFactory.getWingIcon(wingId);
        const itemListData:{ levelList: ItemVo[], stageList: ItemVo[] } = WingConfigProxy.Ins.getUpgradeItemList(stage);
        // 升阶需要的资源列表
        const itemList = itemListData.stageList;
        this.resourceIds = itemList.map(o => o.cfgId).sort((a, b) => a - b);
        itemList.forEach((o: ItemVo, i) => {
            const total = o.count;
            const icon = i === 0 ? this._ui.coinIcon : this._ui.silverFeather;
            const totalLabel = i === 0 ? this._ui.coinTotalText : this._ui.featherTotalText;
            icon.skin = o.getIcon();
            totalLabel.text = `/${total}`;
        });
        // 属性列表
        // this._ui.attrList.array = baseList;
        // this._ui.addAttrList.array = addList;
        this._ui.attrList.array = WingModel.Ins.wingStageAttrs;
        const stageValues = [...new Set(WingModel.Ins.wingStageAttrs.map(o => o.now))];
        this._ui.addAttrList.array = stageValues.length > 1 ? [WingModel.Ins.wingStageAttrs.sort((a, b) => b.now - a.now)[0]] : [];
    }

    onStageUpBtnHandler() {
        if (this._ui.stageUpBtn.gray) {
            return;
        }
        WingModel.Ins.type = 'STAGE';
        let req = new WingLevelUp_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    onUpgradeBtnHandler() {
        if (WingStageView.isFull) {
            console.log('已满级');
        } else {
            let view: WingLevelView = E.ViewMgr.Get(EViewType.WingMainLevel) as WingLevelView;
            if(view.IsShow()) {
                // 升级阶段预览升阶，关掉升阶页面
                E.ViewMgr.Close(EViewType.WingMainStage);
            } else {
                // 升阶阶段，预览升级
                E.ViewMgr.Open(EViewType.WingMainLevel, null);
            }
        }
    }

    onExchangeBtnHandler() {
        let req = new GetWingList_req();
        SocketMgr.Ins.SendMessageBin(req);
    }
    
    onTreasureBtnHandler() {
        E.ViewMgr.Open(EViewType.WingTreasure, null);
    }

    public refreshResources() {
        if (!this.resourceIds.length) return;
        this.resourceIds.forEach((id, i) => {
            const val = MainModel.Ins.mRoleData.getVal(id);
            const total = Number((i === 0 ? this._ui.coinTotalText : this._ui.featherTotalText).text.replace('/', ''));
            const valLabel = i === 0 ? this._ui.coinValText : this._ui.featherValText;
            valLabel.text = StringUtil.val2m(val).toString();
            if (val < total) {
                valLabel.color = '#FF0000';
            } else {
                valLabel.color = '#00FF00';
            }
        });
    }

    protected onAddLoadRes() {
        
    }

    protected onExit() {
        MainModel.Ins.off(MainEvent.ValChange, this, this.refreshResources);
    }
    protected mMainSnapshot = true;

    protected onInit() {
        // MainModel.Ins.mainMask = true;
        MainModel.Ins.on(MainEvent.ValChange, this, this.refreshResources);
        this.refresh();
        this.refreshResources();
    }
}