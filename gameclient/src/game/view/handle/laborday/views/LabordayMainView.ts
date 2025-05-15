import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { LabourCapsuleToys_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { Mount_ListProxy } from "../../zuoqi/vos/ZuoqiProxy";
import { LabordayBaseModel } from "../model/LabordayBaseModel";
import { LabordayModel } from "../model/LabordayBaseModel";
import { t_Labour_Config } from "../model/LabordayProxy";
import { ILabordayView } from "./ILabordayView";
/**五一活动主页 */
export class LabordayMainView extends ViewBase {
    protected _ui: ILabordayView;
    // ui.views.laborday.ui_laborday_viewUI;
    protected model:LabordayBaseModel;
    private needItemVo:ItemVo;
    private effect:SimpleEffect;
    private _statrCtl:ButtonCtl;
    private costCfg:Configs.t_Labour_Config_dat;
    protected mMask:boolean = true;
    protected animURL:string;
    protected packageType:EViewType;
    protected shopType:EViewType;

    protected onAddLoadRes(): void { 
        this.addAtlas("laborday.atlas");
        this.addAtlas("huodong.atlas");
        this.animURL = "o/spine/51ndj/51ndj";
    }

    protected onExit(): void {
        this.model.off(LabordayBaseModel.EVENT_TOY_UPDATE,this,this.onToyUpdate);
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onRedUpdate);
        this.model.off(LabordayBaseModel.EVENT_PROTECT_CHANGE,this,this.onProtectEvt);
        this._ui.icon1.skin = "";
        this._statrCtl.mouseEnable = true;
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.initUI();
            this.setMouseBg(this._ui.bg1);
            ButtonCtl.Create(this._ui.shopBtn,new Laya.Handler(this,this.onShop));
            ButtonCtl.Create(this._ui.eggBtn,new Laya.Handler(this,this.onExchange));
            ButtonCtl.Create(this._ui.labordayBtn,new Laya.Handler(this,this.onPackageHander));
            ButtonCtl.Create(this._ui.watchBtn,new Laya.Handler(this,this.onWatchHandler));
            this._statrCtl=ButtonCtl.Create(this._ui.startBtn,new Laya.Handler(this,this.onStartHandler));
            this.bindClose(this._ui.close1);
            this.costCfg = t_Labour_Config.Ins.getByType(this.model.type);
            this._ui.lmoneyIcon.skin = IconUtils.getIcon(this.model.pieces);
            this._ui.shouhun1.skin = IconUtils.getIcon(this.model.coin);
            
            this.needItemVo = ItemViewFactory.convertItem(this.costCfg.f_PreCost);
            this._ui.moneyIcon.skin = this.needItemVo.getIcon();
            this.effect = new SimpleEffect(this._ui.animCon,this.animURL);
            this._ui.lmoneybg.visible = false;            
            this.initLb();
        }
    }
    protected initLb(){
        if(!StringUtil.IsNullOrEmpty(this.model.markTitle)){
            this._ui.tf2.text = this.model.markTitle;
        }
        if(!StringUtil.IsNullOrEmpty(this.model.packTitle)){
            this._ui.tf4.text = this.model.packTitle;
        }
        if(!StringUtil.IsNullOrEmpty(this.model.imgTitle) && typeof this._ui['imgTitle'] != "undefined"){
            this._ui['imgTitle'].skin = this.model.imgTitle;
        }
        if(!StringUtil.IsNullOrEmpty(this.model.mainDesc)){
            this._ui.title1.text = this.model.mainDesc;
        }
    }
    protected initUI(){
        this.model = LabordayModel.Ins;
        this.UI = this._ui = new ui.views.laborday.ui_laborday_viewUI();
        this.packageType = EViewType.LabordayPackage;
        this.shopType = EViewType.LabordayShop;
    }

    /**开始抽卡 */
    private onStartHandler() {
        if(!this.model.isOpen){
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
            return;
        }
        if (MainModel.Ins.isItemEnoughSt(this.costCfg.f_PreCost, true)) {
            this._statrCtl.mouseEnable = false;
            Laya.timer.once(1300,this,this.playEnd);
            this.effect.play(1,false);
        }
    }

    private playEnd(){
        this._statrCtl.mouseEnable = true;
        let req = new LabourCapsuleToys_req();
        req.type = this.model.type;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onWatchHandler() {
        E.ViewMgr.Open(EViewType.LabordayReward,null,this.model.type);
    }

    private onPackageHander(){
        E.ViewMgr.Open(this.packageType);
    }

    private onShop(){
        E.ViewMgr.Open(this.shopType);
    }

    private onExchange(){
        E.ViewMgr.Open(EViewType.LabordayExchange,null,this.model);
    }
    protected onInit(): void {
        MainModel.Ins.on(MainEvent.ValChange, this, this.onValChange);
        this.model.on(LabordayBaseModel.EVENT_TOY_UPDATE, this, this.onToyUpdate);
        this.model.on(LabordayBaseModel.EVENT_PROTECT_CHANGE,this,this.onProtectEvt);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onRedUpdate);
        this._statrCtl.mouseEnable = true;
        Laya.timer.clear(this,this.playEnd);
        this.effect.play(0,true);
        this.onValChange();
        this.onRedUpdate();
        this.onProtectEvt();
    }

    private onProtectEvt(){
        this._ui.tips2.visible = this._ui.tips1.visible = false;
        this._ui.tf9.text = this.model.leftCount + "";
        if(this.model.mBuyFinish){
            this._ui.tips2.visible = true;
        }else{
            this._ui.tips1.visible = true;
        }
    }
    private onRedUpdate(){
        this._ui.dotimg2.visible = this.model.freePackage;
    }

    private onValChange(){
        this._ui.lmoneyTf.text = StringUtil.val2m(MainModel.Ins.mRoleData.getVal(this.model.pieces));
        this._ui.shtf1.text = StringUtil.val2m(MainModel.Ins.mRoleData.getVal(this.model.coin));
        
        let have = MainModel.Ins.mRoleData.getVal(this.needItemVo.cfgId);
        let cfg = this.costCfg;
        let _showCount:number = this.needItemVo.count;
        let costCount = parseInt(cfg.f_exchangeCost1.split("-")[1]);
        if(have >= costCount){
            _showCount = costCount;
        }
        this._ui.moneyTf.text = _showCount + "";
        this._ui.dotimg1.visible = this.model.mExchange;
        ///////////////////////////////////////////////////////////
        this.onProtectEvt();
    }

    private onToyUpdate() {
        let cell = this.model.curReward;
        if (cell) {
            let icon: string = ""
            if (cell.type == 1) {
                let horseCfg: Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(cell.id);
                icon = IconUtils.getHorseIcon(horseCfg.f_MountID);
            } else {
                icon = IconUtils.getIcon(cell.id);
            }
            // this._ui.icon1.skin = icon;
        }
    }
}