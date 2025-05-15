import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { DotManager } from "../../common/DotManager";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { LabourZuoqiTipsVo } from "../../zuoqi/views/ZuoqiTipsShop";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { Mount_ListProxy } from "../../zuoqi/vos/ZuoqiProxy";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { t_Pack_BoxGrowProxy, t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { ActivityVo } from "../model/ActivityVo";
import { EActivityType } from "../model/EActivityType";
import { BaoxiangChengZhangLibaoItemView, IBornItem, IChengZhangCfg, ZuoqiLibaoItemView } from "./BaoxiangChengZhangLibaoItemView";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "./RateBtn01Ctl";

/**宝箱成长礼包 */
export class BaoxiangChengZhangLibaoView extends ViewBase {
    protected get cfgList(){
        return t_Pack_BoxGrowProxy.Ins.List;
    }
    private rateCtl:RateBtn01Ctl;
    protected autoFree:boolean = true;
    protected curCfgList:IChengZhangCfg[];
    protected topCfg:IChengZhangCfg;
    protected activityType:EActivityType = EActivityType.BoxBorn;//宝箱成长礼包
    protected _ui: ui.views.huodong.ui_baoxiang_chengzhangUI;
    protected _activityVo:ActivityVo;
    /**充值按钮 */
    protected unlockCtl:ButtonCtl;
    protected mMask:boolean = true;
    private yijianCtl:ButtonCtl;
    protected onAddLoadRes(): void {
        this.addAtlas("huodong.atlas");
    }
    /**离开处理 */
    protected onExit(): void {
        this.unlockCtl.dispose();
        this.rateCtl.dispose();
        this.yijianCtl.dispose();
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onUpdateDataEvt);
        MainModel.Ins.off(MainEvent.GrowPackUnlock,this,this.onUpdateDataEvt);
        if(this.Data == "notopen"){
            
        }else{
            E.ViewMgr.Open(EViewType.CCJJView);
        }
    }
    protected cls: any = BaoxiangChengZhangLibaoItemView;
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.huodong.ui_baoxiang_chengzhangUI();
            this.initView();
        }
    }

    protected initTopView(){
        this._ui.slot1.tf1.visible = false;
        let _itemCfg =  ItemProxy.Ins.getCfg(parseInt(this.topCfg.f_itemid.split("-")[0]));
        let cfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(parseInt(_itemCfg.f_p1));
        this._ui.slot1.quality.skin = IconUtils.getQuaIcon(cfg.f_Quality);
        this._ui.slot1.icon.skin =IconUtils.getHorseIcon(cfg.f_MountID);
        this._ui.slot1.on(Laya.Event.CLICK,this,this.onItemTips,[_itemCfg.f_p2]);  
    }
    private onItemTips(_data:string){
        let _tipsVo:LabourZuoqiTipsVo = new LabourZuoqiTipsVo(_data);
        E.ViewMgr.Open(EViewType.RideBuyTips,null,_tipsVo);
    }
    protected initView() {
        this.initCfgList();
        this.bindClose(this._ui.close1);
        this.unlockCtl = ButtonCtl.CreateBtn(this._ui.unlockbtn, this, this.onPayHandler);
        this.rateCtl = new RateBtn01Ctl(this._ui.ratebtn,this,this.onPayHandler,ESkinRateBtn.Yellow)
        
        this.yijianCtl = ButtonCtl.CreateBtn(this._ui.yijianlingquBtn, this, this.onYiJianLingQu);
        this._ui.list1.itemRender = this.cls;
        this._ui.list1.renderHandler = new Laya.Handler(this, this.itemRenderHandler);
        this.initTopView();
    }

    private itemRenderHandler(item:IBornItem){
        item.ctl.refreshView(this._activityVo,this.activityType,item.dataSource,this.isPay);
    }

    /** 充值*/
    private onPayHandler(){
        if(this._activityVo){
            ActivityModel.Ins.recharge(this._activityVo.priceID);
        }
    }

    /**一键领取 */
    private onYiJianLingQu(){
        if(this._activityVo){
            ActivityModel.Ins.lingQu(this._activityVo.uid,0);
        }
    }

    /**初始化*/
    protected onInit(): void {
        E.ViewMgr.Close(EViewType.CCJJView);
        MainModel.Ins.mainMask = true;
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onUpdateDataEvt);
        MainModel.Ins.on(MainEvent.GrowPackUnlock,this,this.onUpdateDataEvt);
        this.refreshView(true);
    }

    private onUpdateDataEvt(){
        this.refreshView(false);
    }

    /**是否已经充值 */
    private get isPay(){
        // let status = this._activityVo.getParam1(this.curCfgList[0].f_id);
        // if (status == EActivityLingQu.ChongZhiYiLingQu || 
        //     status == EActivityLingQu.ChongZhiWeiLingQu ||
        //     status == EActivityLingQu.ChongZhiAllNotLing) {
        //     return true;
        // }
        // return false;
        return this._activityVo.isPay;
    }

    private refreshView(_mScroll:boolean){
        this._activityVo = ActivityModel.Ins.getVo(this.activityType);
        let purchCfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this._activityVo.priceID);
        this._ui.tf2.text = `${StringUtil.moneyCv(purchCfg.f_price )}元解锁`;

        this._ui.list1.array = this.curCfgList;
        if(_mScroll){
            this._ui.list1.scrollTo(0);
        }
        let _isLiqngqu = this.canLingqu;
        this.yijianCtl.grayMouseDisable=!_isLiqngqu;

        if(_isLiqngqu){
            DotManager.addDot(this.yijianCtl.skin);
        }else{
            DotManager.removeDot(this.yijianCtl.skin);
        }
        //////////////////////////////////////////////////////////////
        let btnCtl:ButtonCtl = this.unlockCtl;
        if(purchCfg.f_isVoucher == EShopPayType.Voucher){
            btnCtl = this.rateCtl.btnCtl;
            this.rateCtl.cfg = purchCfg;
        }
        RateBtnUtils.Refresh(btnCtl,this.unlockCtl,this.rateCtl.btnCtl);
        //////////////////////////////////////////////////////////////
        if (this._activityVo && this.curCfgList.length > 0) {
            if (this.isPay) {
                btnCtl.visible = false;
            } else {
                btnCtl.visible = true;
                // this.unlockCtl.gray = false;
                // this.unlockCtl.mouseEnable = true;
                btnCtl.grayMouseDisable = false;
            }
        }
    }
    protected get canLingqu(){
        let _isLiqngqu = ActivityModel.Ins.bornHasLingqu(this.curCfgList,this._activityVo);
        return _isLiqngqu;        
    }

    protected initCfgList(){
        let old = this.cfgList;
        let l = [];
        for(let i = 0;i < old.length;i++){
            let cfg:IChengZhangCfg = old[i];
            if(!cfg.f_rewardstype){
                l.push(cfg);
            }else{
                this.topCfg = cfg;
            }
        }
        this.curCfgList = l;
    }
}