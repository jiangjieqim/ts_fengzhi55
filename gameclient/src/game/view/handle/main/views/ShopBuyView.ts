import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { t_Labour_Shop } from "../../laborday/model/LabordayProxy";
import { ELabodayType } from "../../laborday/views/LabordayShopView";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { EBuyType } from "../model/MainModel";
import { ItemProxy } from "../proxy/ItemProxy";
import { ItemVo } from "../vos/ItemVo";
import { NewShopStyle } from "./new2/NewShopStyle";
export interface IShopBuyItem{
    needItemId:number;
    needCount:number;
    /**目标物 */
    targetId:number;
    targetCount:number;
    // func:Function;
    // funcThat:any;
    ok:Laya.Handler;
    type:EBuyType;
    /**
     * 购买后不关闭界面
     */
    buyEndNotClose:boolean;
    /**批次数量 */
    // batchCount:number;
}
/**购买界面 */
export class ShopBuyView extends ViewBase {
    private _data:IShopBuyItem;
    private _ui:ui.views.main.ui_shopBuyViewUI;
    protected onAddLoadRes(): void { }
    protected onExit(): void {
        if(this.newShopStyle){
            this.newShopStyle.destroy();
            this.newShopStyle = null;
        }
    }
    protected mMask:boolean = true;
    protected autoFree:boolean = true;
    private newShopStyle:NewShopStyle;
    get selCount(){
        return this.newShopStyle ? this.newShopStyle.selCount : 1;
    }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_shopBuyViewUI();
            this.bindClose(this._ui.closeBtn1);
            ButtonCtl.Create(this._ui.cancelBtn,new Laya.Handler(this,this.onCancelHandler));
            ButtonCtl.Create(this._ui.okBtn,new Laya.Handler(this,this.onOkHandler));
        }
    }

    /**确认购买 */
    private onOkHandler(){
        // LogSys.Log(`sel count :${this.newShopStyle.selCount}`);
        // if(this.newShopStyle){
        // this._data.batchCount = this.newShopStyle.selCount;
        // }
        this._data.ok.runWith([this._data]);
        if(!this._data.buyEndNotClose){
            this.Close();
        }
    }

    private onCancelHandler(){
        this.Close();
    }
    private clearUI(){
        this._ui.item.tf1.text = "";
        this._ui.item.quality.skin = IconUtils.defaultIcon;
        this._ui.item.icon.skin = "";
        this._ui.nameTF.text = "";
        this._ui.moneyTf.text = "";
        this._ui.goldIcon.skin = "";
    }

    /**刷新物品 */
    private refreshItem(_vo:IShopBuyItem){
        let targetCfg = ItemProxy.Ins.getCfg(_vo.targetId);
        this._ui.nameTF.text = main.itemName(targetCfg.f_name);
        let _itemVo = new ItemVo();
        _itemVo.cfgId = _vo.targetId;
        _itemVo.count = _vo.targetCount;
        ItemViewFactory.refreshSlot(this._ui.item,_itemVo);
        return _itemVo;
    }
    protected onInit(): void {
        this.clearUI();
        this._data = this.Data;
        let _vo:IShopBuyItem = this.Data;

        // let needCfg = ItemProxy.Ins.getCfg(_vo.needItemId);
        // let needCount = _vo.needCount;
        this._ui.oldStyles.visible = false;
        this._ui.newStyles.visible = false;

        this._ui.item.offAll();
        switch(_vo.type){
            case EBuyType.HotItem:
                {
                    let _itemVo: ItemVo = this.refreshItem(_vo);
                    this.newShopStyle = this._ui.addComponent(NewShopStyle);
                    this.newShopStyle.setItemData(ItemViewFactory.convertItem(`${_vo.needItemId}-${_vo.needCount}`),_itemVo);
                    this._ui.newStyles.visible = true;
                }
                break;
            case EBuyType.Item: 
                {
                    this._ui.oldStyles.visible = true;
                    let _itemVo: ItemVo = this.refreshItem(_vo);
                    this._ui.descTf.text = _itemVo.getDesc();//描述
                }
                break;
            case EBuyType.LabourShop:
                this._ui.oldStyles.visible = true;
                this.refreshLabourShop(_vo);
                break;
            default:
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"you must be set type!");
                break;
            }

        this._ui.goldIcon.skin = IconUtils.getIconByCfgId(_vo.needItemId);
        this._ui.moneyTf.text = StringUtil.val2m(_vo.needCount);
    }
    private refreshLabourShop(_vo:IShopBuyItem){
        let cfg:Configs.t_Labour_Shop_dat = t_Labour_Shop.Ins.GetDataById(_vo.targetId);
        switch (cfg.f_GoodsType) {
            case ELabodayType.EquipStyle:
                let arr1: string[] = cfg.f_GoodsID.split("-");
                let part: number = parseInt(arr1[0]);
                let style: number = parseInt(arr1[1]);
                this._ui.item.tf1.text = "1";
                this._ui.item.icon.skin = ItemViewFactory.getEquipIcon(part, style);
                this._ui.item.quality.skin = IconUtils.getQuaIcon(cfg.f_GoodsQua);
                let nameArr = cfg.f_Tips.split("-");
                if(nameArr.length >=2){
                    this._ui.nameTF.text = nameArr[0];
                    this._ui.descTf.text = nameArr[1];
                }
                break;
            case ELabodayType.Item:
                let itemVo:ItemVo = ItemViewFactory.convertItem(cfg.f_GoodsID);
                this._ui.item.icon.skin = IconUtils.getIconByCfgId(itemVo.cfgId);
                this._ui.item.tf1.text = itemVo.count.toString();
                this._ui.item.quality.skin = IconUtils.getQuaIcon(itemVo.cfg.f_qua);
                this._ui.nameTF.text = itemVo.getName();
                this._ui.descTf.text = itemVo.getDesc();
                break;
        }
    }
}