import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { WingIdProxy, WingTreasureConfigProxy, WingTreasureUpgradeProxy } from "../proxy/WingProxy";
import { IWingTreasureAttrItem } from "../interface/IWing";
import { MainModel } from "../model/MainModel";
import { attrConvert } from "../vos/MainRoleVo";
import { WingModel } from "../model/WingModel";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { ItemVo } from "../vos/ItemVo";
import { wingTreasureUpgrade_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { MainEvent } from "../model/MainEvent";
import { AavatrWingView as AvatarWingView, AvatarBaseView } from "../../avatar/AvatarBaseView";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { E } from "../../../../G";

export class WingTreasureView extends ViewBase{
    private _ui:ui.views.wing.ui_wing_treasureUI;
    protected mMask = true;
    private _plusCtl:PlusCtl = new PlusCtl();
    private resourceIds = [];
    private _wingAvatar:AvatarWingView;
    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wing.ui_wing_treasureUI();
            ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.onCloseHandler1));
            ButtonCtl.Create(this._ui.wingExchangeBtn, new Laya.Handler(this, this.onWingExchangeBtnHandler));
        }
    }

    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }

    public refreshResources() {
        if (!this.resourceIds.length) return;
        this.resourceIds.forEach((id, i) => {
            const val = MainModel.Ins.mRoleData.getVal(id);
            const total = Number((i === 0 ? this._ui.coinTotalText : this._ui.starTotalText).text.replace('/', ''));
            const valLabel = i === 0 ? this._ui.coinValText : this._ui.starValText;
            valLabel.text = StringUtil.val2m(val).toString();
            if (val < total) {
                valLabel.color = '#FF0000';
            } else {
                valLabel.color = '#00FF00';
            }
        });

    }

    public refresh(){
        const wingId = WingModel.Ins.wingId;
        const wingName = WingModel.Ins.wingName;
        const stage = WingModel.Ins.treasureStage;
        const level = WingModel.Ins.level;
        const plus =  WingModel.Ins.wingTreasureFightCapacity;
        const list: IWingTreasureAttrItem[] = WingTreasureUpgradeProxy.Ins.getTreasureAttrList(stage);
        // 境界数
        const rank = Math.floor(stage / 7);
        this._ui.wingName.text = wingName;
        this._ui.wingLevel.text = `境界${StringUtil.toChinesNum(rank + 1)}`;
        this._plusCtl.setPlus(this._ui.plugs, plus);
        // const wingIcon = ItemViewFactory.getWingIcon(wingId);
        // this._ui.wingLeftIcon.skin = wingIcon;
        // this._ui.wingRightIcon.skin = wingIcon;
        let arrowIndex = stage % 7;
        // 判断是否满级
        const isFull = WingTreasureConfigProxy.Ins.checkWingTreasureFullLevel(stage);
        if (isFull) {
            this._ui.wingExchangeBtn.gray = true;
            this._ui.wingExchangeBtn.disabled = true;
            this._ui.sucRateLabel.text  = '';
            this._ui.leftIconBox.visible = false;
            this._ui.rightIconBox.visible = false;
            this._ui.wingBtnText.text = '已满级';
            arrowIndex = -1;
        } else {
            const rateStr = WingTreasureConfigProxy.Ins.getTreasureUpgradeRateStr(rank);
            this._ui.sucRateLabel.text = `激活成功率：${rateStr}`;
            const itemList: ItemVo[] = WingTreasureConfigProxy.Ins.getTreasurResources(rank);
            this.resourceIds = itemList.map(o => o.cfgId).sort((a, b) => a - b);
            itemList.forEach((o: ItemVo, i) => {
                const total = o.count;
                const icon = i === 0 ? this._ui.coinIcon : this._ui.start;
                const totalLabel = i === 0 ? this._ui.coinTotalText : this._ui.starTotalText;
                icon.skin = o.getIcon();
                totalLabel.text = `/${total}`;
            });
        }
        list.forEach((o, i) => {
            const element:ui.views.wing.ui_wing_treasure_itemUI = this._ui[`element${i + 1}`];
            const attrName = MainModel.Ins.getAttrNameIdByID(o.id);
            const value = parseFloat(attrConvert(o.id, o.value));
            element.element.skin = `remote/main/wing/wing_treasure_${o.id}.png`;
            element.titleLabel.text = `${attrName}${value}%`;
            element.levelLabel.text = `lv.${o.level}`;
            if (i === arrowIndex) {
                element.arrowIcon.visible = true;
            } else {
                element.arrowIcon.visible = false;
            }
        });
    }

    onWingExchangeBtnHandler() {
        WingModel.Ins.type = 'TREASURE';
        const req = new wingTreasureUpgrade_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onAddLoadRes() {

    }

    protected onExit() {
        MainModel.Ins.off(MainEvent.ValChange, this, this.refreshResources);
        if(this._wingAvatar){
            this._wingAvatar.dispose();
        }
    }

    protected onInit() {
        MainModel.Ins.on(MainEvent.ValChange, this, this.refreshResources);
        this.refresh();
        this.refreshResources();
        this._wingAvatar = AvatarFactory.createWingAvatar(WingModel.Ins.wingId);
        this._ui.wingCon.addChild(this._wingAvatar);


        // let g:Laya.Sprite = new Laya.Sprite();
        // g.graphics.drawCircle(0,0,10,"#ff0000");
        // this._ui.wingCon.addChild(g);
    }
}