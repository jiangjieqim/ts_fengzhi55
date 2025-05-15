import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { LabourPackGet_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { RateBtn01Ctl } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EClientType } from "../../sdk/ClientType";
import { getModelLaborDay, LabordayBaseModel, LabordayModel } from "../model/LabordayBaseModel";
import { EModelLabordayType, t_Labour_Pack } from "../model/LabordayProxy";
import { PackShopItemEgg } from "./LabordayShopView";

export interface IPackEggBtnData{
    btnCtl:ButtonCtl;
    model:LabordayBaseModel;    
    cfg:Configs.t_Labour_Pack_dat;
}

export class PackageItemCtl{
    public static refresh(skin:PackShopItemEgg){
        let cfg:Configs.t_Labour_Pack_dat = skin.dataSource;
        if(!cfg){
            return;
        }
        let model =  getModelLaborDay(cfg.f_type);
        // if(!this.skin.btn1.dataSource){
        // this.skin.btn1.dataSource = ButtonCtl.Create(this.skin.btn1,new Laya.Handler(this,this.onOkHandler));
        // }

        // if (!skin.btn1.dataSource) {
        // skin.btn1.dataSource = {} as IPackEggBtnData;
        // let _btnData: IPackEggBtnData = skin.btn1.dataSource;
        // }
        let _btnData: IPackEggBtnData = skin._btnData;//skin.btn1.dataSource;
        // console.log(Math.random());

        switch (E.sdk.clienttype) {
            case EClientType.Discount:
                // 
                if (cfg.f_PurchaseID == 0) {
                    //免费礼包
                    skin.rateCtl.visible = false;
                    _btnData.btnCtl.visible = true;
                } else {
                    skin.rateCtl.visible = true;
                    skin.rateCtl.cfg = t_Purchase_PriceProxy.Ins.GetDataById(cfg.f_PurchaseID);
                    _btnData.btnCtl.visible = false;//隐藏掉非0.1折充值按钮
                }
                break;
            case EClientType.Main:
                skin.rateCtl.visible = false;
                break;
        }

        _btnData.cfg = cfg;
        _btnData.model = model;
        _btnData.btnCtl.data = _btnData;

        skin.dotimg.visible = false;
        let _activityVo = ActivityModel.Ins.getVo(model.activteType);

        _btnData.btnCtl.grayMouseDisable = false;
        let _statusCount = 0;
        let packid: number = 0;
        if (_activityVo) {
            _statusCount = _activityVo.getParam1(cfg.f_id);
            packid = _activityVo.packId;
        }
        skin.tf1.text = cfg.f_name;
        ItemViewFactory.renderItemSlots(skin.rewardCon, cfg.f_Item, null, 1, "left");
        if (cfg.f_PurchaseID == 0) {
            //免费礼包
            if (_statusCount > 0) {
                _btnData.btnCtl.grayMouseDisable = true;//无免费礼包
            } else {
                skin.dotimg.visible = true;
            }
            skin.moneyTf.text = E.getLang("Free");//免费
            skin.xiangoutf.text = "";
        } else {
            skin.xiangoutf.text = `${E.getLang("labordaylimit")}:${(_statusCount)}/${cfg.f_BuyTimes}`;
            let purchaseCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(cfg.f_PurchaseID);
            skin.moneyTf.text = `${StringUtil.moneyCv(purchaseCfg.f_price)}元`;
        }
        DebugUtil.drawTF(skin, packid + "," + cfg.f_id + "");
    }
}


// class LabordayPackageItemView extends ui.views.laborday.ui_layorday_package_itemUI{
//     public ctl:PackageItemCtl = new PackageItemCtl();
//     constructor(){
//         super();
//         // this.ctl.type = EModelLabordayType.Laborday;
//         this.ctl.skin = this;
//     }
// }

/**劳动节礼包 */
export class LabordayPackageView extends ViewBase{
    protected model:LabordayBaseModel;
    protected _ui:ui.views.laborday.ui_layorday_packageUI;
    protected _timeCtl:TimeCtlV2;
    protected mMask:boolean = true;
    protected  onAddLoadRes(): void{
    }
    protected  onExit(): void{
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onRefresh);
        this._timeCtl.stop();
    }
    protected  onFirstInit(): void{
        if(!this.UI){
            this.reg();
            this.bindClose(this._ui.close1);
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onLabordayPackageItem);
            this._timeCtl = new TimeCtlV2(this._ui.timeTf,"{0}后结束");
            if(!StringUtil.IsNullOrEmpty(this.model.packTitle)){
                this._ui.title2.text = this.model.packTitle;
            }
        }
    }
    protected reg(){
        this.model = LabordayModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_layorday_packageUI();
        this._ui.list1.itemRender = PackShopItemEgg;
    }
    protected onLabordayPackageItem(item:PackShopItemEgg){
        // item.ctl.refresh();
        item.refresh();
    }

    protected onInit(): void{
        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
        this._timeCtl.start(this.model.subTime);
        this._ui.list1.array = t_Labour_Pack.Ins.getListByType(this.model.type);
        this._ui.list1.scrollTo(0);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onRefresh);
    }
    private onRefresh(){
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LabordayPackageView",Laya.timer.currTimer);
        this._ui.list1.refresh();
    }
    private onTimeComplete(){
        this._ui.timeTf.text = E.getLang("labordayend");
    }
}