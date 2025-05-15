import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { BuyWing_req, WingExchange_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { EClientType } from "../../sdk/ClientType";
import { IAttrItem, ISpecialAttrItem, IWingListItem } from "../interface/IWing";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { WingModel } from "../model/WingModel";
import { ItemProxy } from "../proxy/ItemProxy";
import { WingEffectValueProxy, WingIdProxy, WingUpdateAttrSkinProxy } from "../proxy/WingProxy";

export class WingExchangeView extends ViewBase{
    private _ui:ui.views.wing.ui_wing_exchangeUI;
    protected mMask = true;
    private selectIndex: number;

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wing.ui_wing_exchangeUI();
            ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.onCloseHandler1));
            ButtonCtl.Create(this._ui.wingExchangeBtn,new Laya.Handler(this,this.onExchangeHandler));
            ButtonCtl.Create(this._ui.wingExchangeBtn01,new Laya.Handler(this,this.onExchangeHandler, [1]));
            ButtonCtl.Create(this._ui.wingExchangeBtn02,new Laya.Handler(this,this.onExchangeHandler));
            this._ui.wingList.selectEnable = true;
            this._ui.wingList.itemRender = ui.views.wing.ui_main_chibang2UI;
            this._ui.wingList.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            this._ui.wingList.selectHandler = new Laya.Handler(this,this.onSelectHandler);
        }
    }

    private set01Value() {
        // 未解锁的翅膀的配置
        const list = WingIdProxy.Ins.List;
        const confs = list.filter(o => WingModel.Ins.playerWingIds.indexOf(o.f_id) === -1);
        const itemId = Number((list[0].f_WingPrice || '').split('-')[0]);
        const originCount = confs.reduce((sum, o) => sum += Number(o.f_WingPrice.split('-')[1] || 0), 0);
        const val = Number(System_RefreshTimeProxy.Ins.getVal(86)) || 0;
        const discount = val / 100;
        const discountCount = originCount * discount;
        this._ui.img0.skin = ItemViewFactory.getResourceIcon(itemId);
        this._ui.tf1.text = discountCount.toString();
        this._ui.real_tf.text = originCount.toString();
    }

    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }

    private onAttrItemHandler(skin:ui.views.wing.ui_main_chibang2UI){
        WingUpdateAttrSkinProxy.setWingListItem(skin,skin.dataSource);
    }

    private onSelectHandler(index: number) {
        if (index < 0) return;
        const arr: IWingListItem[] = this._ui.wingList.array;
        if (!arr || !arr.length) {
            return;
        }
        if (arr[index].selected) {
            return;
        }
        this.selectIndex = index;
        this.refreshBtn();
        this._ui.wingList.array = arr.map((o, i) => ({
            ...o,
            selected: i === index ? true : false
        }));
        this.refreshWingInfo(arr[index].wingId);
        this._ui.wingList.selectedIndex = -1;
    }

    private refreshWingInfo(wingId: number) {
        const model = WingModel.Ins;
        const wingName = WingIdProxy.Ins.getWingName(wingId);
        const stage = model.stage;
        const level = model.level;
        const wingAttrs = WingModel.wingAttrs;
        const attrList = WingIdProxy.Ins.getWingUpgradeAttrList(wingId, level, stage);
        const wingAttrList = attrList.filter(o => wingAttrs.indexOf(o.id) !== -1);
        const maxValue = Math.max(...wingAttrList.map(o => o.value));
        const minValue = Math.min(...wingAttrList.map(o => o.value));
        const addAttr: IAttrItem = maxValue === minValue ? undefined : wingAttrList.find(o => o.value === maxValue);
        const stageAttrList = WingEffectValueProxy.Ins.getWingStageConfigAttrList(wingId);
        const maxConfigValue = Math.max(...stageAttrList.map(o => o.value));
        const stageAttr: ISpecialAttrItem = addAttr ? { id: addAttr.id, value: maxConfigValue, title: '每阶加成' } : undefined;
        this._ui.curWingName.text = wingName;
        WingUpdateAttrSkinProxy.setWingListItem(this._ui.curWingView, { wingId });
        WingUpdateAttrSkinProxy.setDataThan2(this._ui.wingAddAttr, addAttr);
        WingUpdateAttrSkinProxy.setDataThan2(this._ui.stageAddAttr, stageAttr);
    }

    public refresh() {
        const configWingList = WingIdProxy.Ins.getConfigWingList();
        const model = WingModel.Ins;
        const wingId = model.wingId;
        const selectedWingId = this.selectIndex === undefined ? wingId : configWingList[this.selectIndex].wingId;
        this.refreshWingInfo(selectedWingId);
        const playerWingIds = model.playerWingIds;
        if (this.selectIndex === undefined) {
            this.selectIndex = configWingList.findIndex(o => o.wingId === wingId);
        }
        this._ui.wingList.array = configWingList.map((o, i) => {
            return {
                wingId: o.wingId,
                weared: o.wingId === wingId,
                selected: this.selectIndex === undefined ? o.wingId === wingId : i === this.selectIndex,
                locked: playerWingIds.indexOf(o.wingId) === -1 ? true : false,
                priceItemVo: o.priceItemVo
            }
        });
        this.refreshBtn();
    }

    private refreshBtn() {
        const index = this.selectIndex;
        const arr = this._ui.wingList.array;
        if ((index || index === 0) && arr[index].locked) {
            this._ui.wingBtnText.text = '购买';
            if (initConfig.clienttype == EClientType.Discount){
                //0.1折扣
                this._ui.wingExchangeBtn01.visible = this._ui.wingExchangeBtn02.visible = true;
                this._ui.wingExchangeBtn.visible = false;
                this.set01Value();
            } else {
                //非0.1折扣
                this._ui.wingExchangeBtn01.visible = this._ui.wingExchangeBtn02.visible = false;
                this._ui.wingExchangeBtn.visible = true;
            }
        } else {
            this._ui.wingBtnText.text = '更换';
            this._ui.wingExchangeBtn01.visible = this._ui.wingExchangeBtn02.visible = false;
            this._ui.wingExchangeBtn.visible = true;
        }
    }

    onExchangeHandler(args: any[]) {
        const arr: IWingListItem[] = this._ui.wingList.array;
        const index = arr.findIndex(o => o.selected);
        const buyAll = args ? true : false;
        if (index !== -1) {
            if (arr[index].locked) {
                // 购买
                let tips = '';
                if (buyAll) {
                    // 0.1折
                    const list = WingIdProxy.Ins.List;
                    const itemId = Number((list[0].f_WingPrice || '').split('-')[0]);
                    const discountCount = this._ui.tf1.text;
                    let iCfg = ItemProxy.Ins.getCfg(itemId);
                    tips = `是否花费${discountCount}个${iCfg.f_name}一键购买全部翅膀？`;
                } else {
                    
                    const priceItemVo = arr[index].priceItemVo;
                    tips = `确定使用${priceItemVo.count}个${priceItemVo.getName()}购买?`
                }
                E.ViewMgr.ShowMsgBox(
                    EMsgBoxType.OkOrCancel,
                    tips,
                    new Laya.Handler(this, () => {
                        const wingId = buyAll ? 0 : arr[index].wingId;
                        this.onConfirm(wingId);
                    })
                );
            } else {
                // 换翅膀
                const wingId = arr[index].wingId;
                let req = new WingExchange_req();
                req.wingId = wingId;
                SocketMgr.Ins.SendMessageBin(req);
            }
        }
    }

    private onConfirm(wingId: number) {
        let req = new BuyWing_req();
        req.wingId = wingId;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onAddLoadRes() {

    }

    protected onExit() {
    }

    protected onInit() {
        WingModel.Ins.type = 'EXCHANGE';
        this._ui.wingBtnText.text = '更换';
        this.refresh();
    }
}