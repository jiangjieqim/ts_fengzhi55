import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GetWingList_req, WingLevelUp_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { EPopWinID } from "../../huodong/model/EActivityType";
import { EClientType } from "../../sdk/ClientType";
import { XianShiLiBaoModel, XianShiLiBaoType } from "../../xianshilibao/model/XianShiLiBaoModel";
import { IAttrItem } from "../interface/IWing";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { WingModel } from "../model/WingModel";
import { WingConfigProxy, WingExpProxy, WingIdProxy, WingUpdateAttrSkinProxy } from "../proxy/WingProxy";
import { ItemVo } from "../vos/ItemVo";
import { WingStageView } from "./WingStageView";

export class WingLevelView extends ViewBase{
    private _ui:ui.views.wing.ui_wing_mainUI;
    protected mMask = true;
    private _plusCtl:PlusCtl = new PlusCtl();
    static isFullStage: boolean;
    private resourceIds = [];
    // 弹出礼包uid
    private packUid: number = 13;

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wing.ui_wing_mainUI();
            ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.onCloseHandler1));
            ButtonCtl.Create(this._ui.levelUpBtn,new Laya.Handler(this,this.onLevelUpHandler));
            ButtonCtl.Create(this._ui.upgradeBtn,new Laya.Handler(this,this.onUpgradeBtnHandler));
            ButtonCtl.Create(this._ui.exchangeBtn, new Laya.Handler(this,this.onExchangeBtnHandler));
            ButtonCtl.Create(this._ui.treasureBtn,new Laya.Handler(this,this.onTreasureBtnHandler));
            ButtonCtl.Create(this._ui.btn_xslb,new Laya.Handler(this,this.onBtnXslbClick));
            this._ui.attrList.itemRender = ui.views.wing.ui_wing_update_attrUI;
            this._ui.attrList.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            this._ui.addAttrList.itemRender = ui.views.wing.ui_wing_update_attrUI;
            this._ui.addAttrList.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            if (initConfig.clienttype == EClientType.Discount) {
                this._ui.levelUpBtnLabel.text = '一键升级';
            } else {
                this._ui.levelUpBtnLabel.text = '升级';
            }
        }
    }
    
    private onBtnXslbClick(){
        ActivityModel.Ins.diamondEject(this.packUid);
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
        let stage = 0;
        let level = 0;
        let attrList: IAttrItem[] = [];
        if (levelData.restLevel) {
            // 展示当前升级的信息
            // 按钮复原
            this._ui.levelUpBtn.gray = false;
            stage = model.stage;
            level = model.level;
        } else {
            // 当前是升阶，预览升下一级的信息
            // 按钮灰掉
            this._ui.levelUpBtn.gray = true;
            stage = levelData.nextStage;
            level = 0;
        }

        if(model.mLevelUp){
            DotManager.addDot(this._ui.levelUpBtn);
        }else{
            DotManager.removeDot(this._ui.levelUpBtn);
        }

        attrList = WingIdProxy.Ins.getWingUpgradeAttrList(wingId, level, stage);
        const plus = model.wingFightCapacity;
        if (levelData.nextStage === model.stage) {
            // 已满阶
            // 切换按钮文字改为已满阶
            this._ui.upgradeBtnText.text = '已满阶';
            WingLevelView.isFullStage = true;
        } else {
            // 不满阶
            // 切换按钮文字改为进阶加成
            this._ui.upgradeBtnText.text = '进阶加成';
            WingLevelView.isFullStage = false;
        }
        this._ui.curWingName.text = wingName;
        this._ui.wingLevelText.text = `${model.stage}阶${model.level}级`;
        this._ui.levelText.text = `再升${levelData.restLevel}级可进阶`;
        this._plusCtl.setPlus(this._ui.plugs, plus);
        this._ui.curWingView.wingLeftIcon.skin = ItemViewFactory.getWingIcon(wingId);
        this._ui.curWingView.wingRightIcon.skin = ItemViewFactory.getWingIcon(wingId);
        const itemListData:{ levelList: ItemVo[], stageList: ItemVo[] } = WingConfigProxy.Ins.getUpgradeItemList(stage);
        // 升级需要的资源列表
        const itemList = itemListData.levelList;
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
        // this._ui.addAttrList.array = wingAttrValues.length > 1 ? [wingAttrList[0]] : [];
        this._ui.attrList.array = WingModel.Ins.wingLevelAttrs;
        const stageValues = [...new Set(WingModel.Ins.wingStageAttrs.map(o => o.now))];
        const attr = WingModel.Ins.wingStageAttrs.sort((a, b) => b.now - a.now)[0];
        this._ui.addAttrList.array = stageValues.length > 1 ? [{ ...attr, next: attr.now }] : [];
    }

    onLevelUpHandler() {
        if (this._ui.levelUpBtn.gray) {
            return;
        }
        WingModel.Ins.type = 'LEVEL';
        let req = new WingLevelUp_req();
        if (initConfig.clienttype == EClientType.Discount) {
            //0.1折扣
            XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Wing);
            const model = WingModel.Ins;
            const levelData = WingExpProxy.Ins.getNextLevelData(model.level, model.stage);
            const itemList = WingConfigProxy.Ins.getUpgradeItemList(model.stage)?.levelList || [];
            if (!itemList.length) {
                return;
            }
            const arr: number[] = [];
            for (const item of itemList) {
                // 玩家道具数量
                const count = MainModel.Ins.mRoleData.getVal(item.cfgId);
                arr.push(Math.floor(count / item.count));
            }
            req.cnt = Math.min(...arr, levelData.restLevel);
        }
        SocketMgr.Ins.SendMessageBin(req);
        ActivityModel.Ins.runEnough(EPopWinID.WhitePlume);
    }

    onUpgradeBtnHandler() {
        if (WingLevelView.isFullStage) {
            console.log('已满阶');
        } else {
            let view: WingStageView = E.ViewMgr.Get(EViewType.WingMainStage) as WingStageView;
            if(view.IsShow()) {
                // 升阶阶段预览升级，关掉升级页面
                E.ViewMgr.Close(EViewType.WingMainLevel);
            } else {
                // 升级阶段，预览升阶
                E.ViewMgr.Open(EViewType.WingMainStage, null);
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
        this.addAtlas('huodong.atlas');
    }
    private onRedUpdate(){
        this.refresh();
    }
    protected onExit() {
        MainModel.Ins.off(MainEvent.ValChange, this, this.refreshResources);
        WingModel.Ins.off(WingModel.EventRedRefresh,this,this.onRedUpdate);
        ActivityModel.Ins.off(ActivityEvent.PopWinUpdate,this,ActivityModel.Ins.onPop);
    }
    protected mMainSnapshot = true;
    protected onInit() {
        WingModel.Ins.on(WingModel.EventRedRefresh,this,this.onRedUpdate);
        MainModel.Ins.on(MainEvent.ValChange, this, this.refreshResources);
        // 限时礼包按钮是否显示
        ActivityModel.Ins.on(ActivityEvent.PopWinUpdate,this,ActivityModel.Ins.onPop, [this.packUid, this._ui.btn_xslb]);
        ActivityModel.Ins.onPop(this.packUid, this._ui.btn_xslb);
        this.refresh();
        this.refreshResources();
    }


}