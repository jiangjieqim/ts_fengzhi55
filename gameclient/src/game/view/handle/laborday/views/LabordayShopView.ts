import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { LabourPackGet_req, LabourShop_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ESkinRateBtn, RateBtn01Ctl } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { EBuyType, MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ChildrenModel, getModelLaborDay, LabordayBaseModel, LabordayModel, LuckModel, MidAutumnModel, SummerModel, YuanXiaoModel } from "../model/LabordayBaseModel";
import { EModelLabordayType, t_Labour_Shop } from "../model/LabordayProxy";
import { LabordayMainView } from "./LabordayMainView";
import { IPackEggBtnData, LabordayPackageView, PackageItemCtl } from "./LabordayPackageView";
export enum ELabodayType{
    // /**坐骑 */
    // Ride = 1,
    /**换装 */
    EquipStyle = 2,
    /**物品 */
    Item = 3,
}

class MarkItemCtl{
    // public skin:ui.views.laborday.ui_layorday_marker_itemUI;
    // private model:LabordayBaseModel;
    // private cfg:Configs.t_Labour_Shop_dat;
    // private needId:number;
    // private needCount:number;
    
    public static refresh(skin:ui.views.laborday.ui_layorday_marker_itemUI){

        // if(!this.skin.item01.hasListener(Laya.Event.CLICK)){
        // }

        let cfg:Configs.t_Labour_Shop_dat = skin.dataSource;
        let model = getModelLaborDay(cfg.f_type);

        if(cfg.f_GoodsLimit<=0){
            skin.xiangouTf.text = "";
        }else{
            // let model:LabordayBaseModel = model;
            let count:number = model.getBuyTime(cfg.f_id);
            skin.xiangouTf.text = E.getLang("labordaylimit")+`${count}/${cfg.f_GoodsLimit}`;
        }

        // this.item01.
        // 1:坐骑
        // 2：换装
        // 3：物品
        // this.item01.offAll(Laya.Event.CLICK);
        skin.item01.tf1.text = "";
        skin.item01.icon.skin = "";
        skin.item01.quality.skin = "";
        // this.part = 0;
        // this.style = 0;
        // this.itemVo = null;
        let name:string = "";

        switch (cfg.f_GoodsType) {
            // case ELabodayType.Ride:
            //     let horseCfg: Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(parseInt(this.cfg.f_GoodsID));
            //     this.item01.icon.skin = IconUtils.getHorseIcon(horseCfg.f_MountID);
            //     break;
            case ELabodayType.EquipStyle:
                //部位-幻化的id
                let arr1: string[] = cfg.f_GoodsID.split("-");
                let part: number = parseInt(arr1[0]);
                let style: number = parseInt(arr1[1]);
                // this.part = part;
                // this.style = style;

                let quaSkin = IconUtils.defaultIcon;
                if(cfg.f_GoodsQua){
                    quaSkin = IconUtils.getQuaIcon(cfg.f_GoodsQua);
                }
                skin.item01.quality.skin = quaSkin;
                skin.item01.icon.skin =ItemViewFactory.getEquipIcon(part, style);
                let nameArr = cfg.f_Tips.split("-");
                if(nameArr.length >=2){
                    name = nameArr[0];
                }
                break;
            case ELabodayType.Item:
                // let arr:string[] = this.cfg.f_GoodsID.split("-");
                let itemVo:ItemVo = ItemViewFactory.convertItem(cfg.f_GoodsID);
                skin.item01.icon.skin = IconUtils.getIconByCfgId(itemVo.cfgId);
                skin.item01.tf1.text = itemVo.count.toString();
                skin.item01.quality.skin = IconUtils.getQuaIcon(itemVo.cfg.f_qua);
                // this.itemVo = itemVo;
                name = itemVo.getName();
                break;
        }
        let price:string[] = cfg.f_Price.split("-");
        let needId:number = parseInt(price[0]);
        // this.needId = needId;
        skin.huobi.skin = IconUtils.getIcon(needId);
        let needCount:number = parseInt(price[1]);
        // this.needCount = needCount;

        // let haveCount:number = MainModel.Ins.mRoleData.getVal(needId);

        // if(haveCount < needCount){
        //     this.shtf1.color = EGameColor.NotEnough;
        // }else{
        //     this.shtf1.color = "#FFEEC2";
        // }
        skin.shtf1.text = StringUtil.val2m(needCount);
        skin.nameTf.text = name;
        skin.item01.on(Laya.Event.CLICK,this,this.onClick,[model,cfg,needId,needCount]);
    }

    private static onClick(model:LabordayBaseModel,cfg:Configs.t_Labour_Shop_dat,needId:number,needCount:number){
        if(!model.isOpen){
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
            return;
        }
        MainModel.Ins.buy(needId,needCount,cfg.f_id,0,new Laya.Handler(this,this.onOkHandler,[model,cfg]),EBuyType.LabourShop,cfg.f_isquick == 1);    
    }

    private static onOkHandler(model:LabordayBaseModel,cfg:Configs.t_Labour_Shop_dat){
        if(cfg.f_GoodsLimit<=0){

        }else{
            let count:number = model.getBuyTime(cfg.f_id);            
            if(count >= cfg.f_GoodsLimit){
                E.ViewMgr.ShowMidError(E.getLang("labordayismax"));
                return;
            }
        }

        if(MainModel.Ins.isItemEnoughSt(cfg.f_Price,true)){
            let req = new LabourShop_req();
            req.type = model.type;
            req.id = cfg.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }
}

/**劳动市集 */
export class LabordayShopView extends ViewBase{
    protected model:LabordayBaseModel;

    protected _ui:ui.views.laborday.ui_layorday_markerUI;
    private moneyType:ECellType;// = ECellType.Laborday;
    protected mMask:boolean = true;
    protected _timeCtl:TimeCtlV2;
    protected  onAddLoadRes(): void{}
    protected  onExit(): void{
        MainModel.Ins.off(MainEvent.ValChange,this,this.onMoneyChange);
        this.model.off(LabordayBaseModel.EVENT_SHOP_UPDATE,this,this.onShopView);
        this._timeCtl.stop();
    }
    protected onFirstInit(): void{
        if(!this.UI){
            this.reg();
            this.moneyType = this.model.pieces;
            this.bindClose(this._ui.close1);
            this._ui.shouhun1.skin = IconUtils.getIcon(this.moneyType);
            this._timeCtl = new TimeCtlV2(this._ui.timeTf,"{0}后结束");
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this.initLb();
        }
    }

    private initLb(){
        if(!StringUtil.IsNullOrEmpty(this.model.markTitle)){
            this._ui.title2.text = this.model.markTitle;
        }
    }

    protected reg(){
        this.model = LabordayModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_layorday_markerUI();
        this._ui.list1.itemRender = ui.views.laborday.ui_layorday_marker_itemUI;
    }

    private  onRenderHandler(item:ui.views.laborday.ui_layorday_marker_itemUI) {
        // item.ctl.refresh();
        MarkItemCtl.refresh(item);
    }
    private onShopView(){
        this._ui.list1.refresh();
    }
    protected  onInit(): void{
        this.model.on(LabordayBaseModel.EVENT_SHOP_UPDATE,this,this.onShopView);

        this._ui.list1.array = t_Labour_Shop.Ins.getListByType(this.model.type);

        MainModel.Ins.on(MainEvent.ValChange,this,this.onMoneyChange);
        this.onMoneyChange();

        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
        this._timeCtl.start(this.model.subTime);
    }

    private onTimeComplete(){
        this._ui.timeTf.text = E.getLang("labordayend");
    }
    private onMoneyChange() {
        this._ui.huobiTf.text = StringUtil.val2m(MainModel.Ins.mRoleData.getVal(this.moneyType));
    }
}
////////////////////////////////////////////////////////////////////////////////////
//#region 六一活动
/**六一市集 */
export class ChildrenShopView extends LabordayShopView{
    protected reg(){
        this.model = ChildrenModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_children_markerUI();
        this._ui.list1.itemRender = ui.views.laborday.ui_children_marker_itemUI;//ChildrenShopItemRender;
    }
}
/**六一活动礼包 */
export class ChildrenPackageView extends LabordayPackageView{
    protected reg(){
        this.model = ChildrenModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_children_packageUI();
        this._ui.list1.itemRender = ui.views.laborday.ui_children_package_itemUI;
    }
}
/**六一活动 */
export class ChildrenView extends LabordayMainView{
    protected initUI(){
        this.model = ChildrenModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_children_viewUI();
        this.packageType = EViewType.ChildPackage;
        this.shopType = EViewType.ChildrenShop;
    }

    protected onAddLoadRes(): void { 
        super.onAddLoadRes();
        this.addAtlas("children.atlas");
        this.animURL = "o/spine/61ndj/61ndj";
    }
}
//#endregion
///////////////////////////////////////////////////////////////////////////////

/**夏日活动礼包 */
export class SummerPackageView extends LabordayPackageView{
    protected reg(){
        this.model = SummerModel.Ins;
        this.UI = this._ui = new ui.views.summer.ui_summer_packageUI();
        this._ui.list1.itemRender = ui.views.summer.ui_summer_package_itemUI;
    }
}

/**夏日市集 */
export class SummerShopView extends LabordayShopView{
    protected reg(){
        this.model = SummerModel.Ins;
        this.UI = this._ui = new ui.views.summer.ui_summer_markerUI;
        this._ui.list1.itemRender = ui.views.summer.ui_summer_marker_itemUI;
    }
}
/**夏日活动 */
export class SummerView extends LabordayMainView{
    protected initUI(){
        this.model = SummerModel.Ins;
        this.UI = this._ui = new ui.views.summer.ui_summer_viewUI();
        this.packageType = EViewType.SummerPackage;
        this.shopType = EViewType.SummerShop;
    }

    protected onAddLoadRes(): void { 
        super.onAddLoadRes();
        this.addAtlas("summer.atlas");
        this.animURL = "o/spine/71ndj/71ndj";
    }
}

////////////////////////////////////////////////////////////////////////////////////
/**中秋市集 */
export class MidAutumnShopView extends LabordayShopView{
    protected reg(){
        this.model = MidAutumnModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_midautumn_qqviewUI();
        this._ui.list1.itemRender = ui.views.laborday.ui_midautumn_qqItemUI;
    }
}
/**中秋活动礼包 */
export class MidAutumnPackageView extends LabordayPackageView{
    protected reg(){
        this.model = MidAutumnModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_midautumn_lbviewUI();
        this._ui.list1.itemRender = ui.views.laborday.ui_midautumn_lbItemUI;
    }
}
/**中秋活动 */
export class  MidAutumnView extends LabordayMainView{
    protected initUI(){
        this.model = MidAutumnModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_midautumn_viewUI();
        ButtonCtl.Create(this._ui['yshopBtn'],new Laya.Handler(this,this.onBtnClick));
        this.packageType = EViewType.midAutumnPackage;
        this.shopType = EViewType.midAutumnrenShop;
    }

    private onBtnClick(){
        E.ViewMgr.Open(EViewType.midAutumnrenShop1);
    }

    protected onAddLoadRes(): void { 
        super.onAddLoadRes();
        this.addAtlas("midautumn.atlas");
        this.animURL = "o/spine/11ndj/11ndj";
    }
}

/**51 劳动节日 */
export class PackShopItemEgg extends ui.views.laborday.ui_layorday_package_itemUI{
    _btnData: IPackEggBtnData;
    rateCtl: RateBtn01Ctl;
    constructor(){
        super();
        this._btnData = {} as IPackEggBtnData;
        this.rateCtl = new RateBtn01Ctl(this.dicbtn,this,this.onBuyHandler,ESkinRateBtn.Yellow);
        this.on(Laya.Event.DISPLAY,this,this.onDisplay);
        this.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
        this._btnData.btnCtl = ButtonCtl.Create(this.btn1, new Laya.Handler(this, this.onOkHandler));//初始化一次
    }
    /**确认购买 */
    private  onOkHandler(data:IPackEggBtnData){
        if(data.cfg.f_PurchaseID == 0){
            let req = new LabourPackGet_req();
            req.id = data.cfg.f_id;
            let type:EModelLabordayType = data.model.type;
            req.type = type;
            SocketMgr.Ins.SendMessageBin(req);
        }else{
            ActivityModel.Ins.recharge(data.cfg.f_PurchaseID);
        }
    }
    private onDisplay(){
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.refresh);
    }
    private onUnDisplay(){
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.refresh);
    }
    private onBuyHandler(){
        let _btnData:IPackEggBtnData = this._btnData;
        ActivityModel.Ins.recharge(_btnData.cfg.f_PurchaseID);
    }
    refresh(){
        PackageItemCtl.refresh(this);
    }
}

//#region 幸运扭蛋
/**幸运扭蛋市集 */
export class LuckShopView extends LabordayShopView{
    protected reg(){
        this.model = LuckModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_layorday_markerUI();
        this._ui.list1.itemRender = ui.views.laborday.ui_layorday_marker_itemUI;
    }
}
/**幸运扭蛋礼包 */
export class LuckPackageView extends LabordayPackageView{
    protected reg(){
        this.model = LuckModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_layorday_packageUI();
        this._ui.list1.itemRender = PackShopItemEgg;
    }
}

/**幸运扭蛋主页 */
export class LuckView extends LabordayMainView{
    protected initUI(){
        this.model = LuckModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_laborday_viewUI();
        this.packageType = EViewType.LuckPackage;
        this.shopType = EViewType.LuckShop;
    }

    protected onAddLoadRes(): void { 
        super.onAddLoadRes();
        // this.addAtlas("children.atlas");
        this.animURL = "o/spine/51ndj2/51ndj2";
    }
}
//#endregion

/**元宵市集 */
export class YuanXiaoShopView extends LabordayShopView{
    protected reg(){
        this.model = YuanXiaoModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_yuanxiaoShopViewUI();
        this._ui.list1.itemRender = ui.views.laborday.ui_yuanxiaoShopItemUI;
    }
}
/**元宵活动礼包 */
export class YuanXiaoPackageView extends LabordayPackageView{
    protected reg(){
        this.model = YuanXiaoModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_yuanxiaoPackageViewUI();
        this._ui.list1.itemRender = ui.views.laborday.ui_yuanxiaoPackageItemUI;
    }
}
/**元宵活动 */
export class  YuanXiaoView extends LabordayMainView{
    protected initUI(){
        this.model = YuanXiaoModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_yuanxiaoViewUI();
        this.packageType = EViewType.yuanxiaoPackage;
        this.shopType = EViewType.yuanxiaoShop;
    }

    protected onAddLoadRes(): void { 
        super.onAddLoadRes();
        this.addAtlas("yuanxiao.atlas");
        this.animURL = "o/spine/21ndj/21ndj";
    }
}