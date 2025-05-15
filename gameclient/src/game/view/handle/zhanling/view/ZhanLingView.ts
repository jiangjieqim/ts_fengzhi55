import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { BattlePassPackAccTimes_req, BattlePassPackFree_req, stBattlePassTask } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { ZhanLingModel } from "../model/ZhanLingModel";
import { EventGamePassConfigProxy, EventGamePassPackProxy } from "../proxy/ZhanLingProxy";
import { ZhanLingItem } from "./ZhanLingItem";
import { ZhanLingItem1 } from "./ZhanLingItem1";
import { ZhanLingItem2 } from "./ZhanLingItem2";
import { ZhanLingItem4 } from "./ZhanLingItem4";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { ESkinRateBtn, RateBtn01Ctl } from "../../huodong/views/RateBtn01Ctl";

export class ZhanLingView extends ViewBase{
    private _ui:ui.views.zhanling.ui_zhanLingViewUI;
    protected mMask: boolean = true;
    protected mMainSnapshot: boolean = true;
    protected autoFree = true;

    private tabsCtl:TabControl;
    private tabList: any;

    private _timeCtlMonth:TimeCtl;
    private _timeCtlWeek:TimeCtl;
    private _timeCtlTask:TimeCtl;
    private _timeCtlLB:TimeCtl;
    private weekRateCtl:RateBtn01Ctl;
    private monthRateCtl:RateBtn01Ctl;
    private btn_weekCtl:ButtonCtl;
    private btn_monthCtl:ButtonCtl;
    protected onAddLoadRes(): void {
        this.addAtlas('zhanling.atlas');
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.zhanling.ui_zhanLingViewUI;
            this.bindClose(this._ui.btn_close);
            this.btn_weekCtl =  ButtonCtl.Create(this._ui.btn_week,new Laya.Handler(this,this.onBtnWeekClick));
            this.btn_monthCtl = ButtonCtl.Create(this._ui.btn_month,new Laya.Handler(this,this.onBtnMonthClick));
            this.btnList.push(
                this.btn_monthCtl,
                this.btn_weekCtl,
                ButtonCtl.Create(this._ui.btn_help,new Laya.Handler(this,this.onBtnTipClick))
            );

            this.weekRateCtl = new RateBtn01Ctl(this._ui.btn_week_rate,this,this.onBtnWeekClick,ESkinRateBtn.Yellow);
            this.monthRateCtl = new RateBtn01Ctl(this._ui.btn_month_rate,this,this.onBtnMonthClick,ESkinRateBtn.Yellow);

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3,this._ui.tab4];
            let st = E.getLang("ZhanLingTab");
            this.tabList = st.split("-");
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._timeCtlMonth = new TimeCtl(this._ui.lab_monthTime);
            this._ui.list_month.itemRender = ZhanLingItem;
            this._ui.list_month.renderHandler = new Laya.Handler(this,this.onMonthRender);

            this._timeCtlWeek = new TimeCtl(this._ui.lab_weekTime);
            this._ui.list_week.itemRender = ZhanLingItem1;
            this._ui.list_week.renderHandler = new Laya.Handler(this,this.onWeekRender);

            this._timeCtlTask = new TimeCtl(this._ui.lan_taskTime);
            this._ui.list_task.itemRender = ZhanLingItem2;
            this._ui.list_task.renderHandler = new Laya.Handler(this,this.onTaskRender);

            this._ui.maskbg.mouseEnabled = false;
            this._timeCtlLB = new TimeCtl(this._ui.lab_lbTime);
            this._ui.sp_click.on(Laya.Event.CLICK,this,this.onItemClick);
            this._ui.sp_click1.on(Laya.Event.CLICK,this,this.onItem1Click);
            this._ui.list4.itemRender = ZhanLingItem4;
            this._ui.list4.renderHandler = new Laya.Handler(this,this.onLBRender);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("ZhanLingTitle","ZhanLingDesc");
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.zhanling.ui_tabUI = tabSkin;
        skin.lab.text = this.tabList[index];
        if (sel) {
            skin.img.skin = "remote/zhanling/xz.png";
            skin.lab.color = "#EEE4CA";
        } else {
            skin.img.skin = "remote/zhanling/wxzk.png";
            skin.lab.color = "#9A6051";
        }
    }

    private onTabSelectHandler(v:number){
        this._ui.sp1.visible = this._ui.sp2.visible = this._ui.sp3.visible
        = this._ui.sp4.visible = false;
        this._ui["sp"+(v+1)].visible = true;
        this["updataView"+(v+1)]();
    }

    protected onInit(): void {
        ZhanLingModel.Ins.on(ZhanLingModel.UPDATA_VIEW_MW,this,this.onUpdataViewMW);
        ZhanLingModel.Ins.on(ZhanLingModel.UPDATA_VIEW_MONTH,this,this.onUpdataView1);
        ZhanLingModel.Ins.on(ZhanLingModel.UPDATA_VIEW_WEEK,this,this.onUpdataView2);
        ZhanLingModel.Ins.on(ZhanLingModel.UPDATA_VIEW_TASK,this,this.onUpdataView3);
        ZhanLingModel.Ins.on(ZhanLingModel.UPDATA_VIEW_LB,this,this.onUpdataView4);
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(): void {
        ZhanLingModel.Ins.off(ZhanLingModel.UPDATA_VIEW_MW,this,this.onUpdataViewMW);
        ZhanLingModel.Ins.off(ZhanLingModel.UPDATA_VIEW_MONTH,this,this.onUpdataView1);
        ZhanLingModel.Ins.off(ZhanLingModel.UPDATA_VIEW_WEEK,this,this.onUpdataView2);
        ZhanLingModel.Ins.off(ZhanLingModel.UPDATA_VIEW_TASK,this,this.onUpdataView3);
        ZhanLingModel.Ins.off(ZhanLingModel.UPDATA_VIEW_LB,this,this.onUpdataView4);
        this.tabsCtl.dispose();
        this._timeCtlMonth.dispose();
        this._timeCtlWeek.dispose();
        this._timeCtlTask.dispose();
        this._timeCtlLB.dispose();
    }

    private onUpdataViewMW(){
        this.updataView1();
        this.updataView2();
    }

    private onUpdataView1(){
        this.updataView1();
    }

    private onUpdataView2(){
        this.updataView2();
    }

    private onUpdataView3(){
        this.updataView3();
    }

    private onUpdataView4(){
        this.updataView4();
    }

    private updataDot(){
        if(ZhanLingModel.Ins.isDotTab1()){
            DotManager.addDot(this._ui.tab1,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab1);
        }
        if(ZhanLingModel.Ins.isDotTab2()){
            DotManager.addDot(this._ui.tab2,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
        if(ZhanLingModel.Ins.isDotTab3()){
            DotManager.addDot(this._ui.tab3,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab3);
        }
        if(ZhanLingModel.Ins.isDotTab4()){
            DotManager.addDot(this._ui.tab4,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab4);
        }
    }

    //************************************************************************************************************* */
    private updataView1(){
        let time = ZhanLingModel.Ins.monthEndTime - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtlMonth.start(time, new Laya.Handler(this, this.onUpdateMonthTime), new Laya.Handler(this, this.endMonthTime));
        } else {
            this.endMonthTime();
            this._timeCtlMonth.stop();
        }
        let packCfg = EventGamePassPackProxy.Ins.getCfgByType(1);
        let priceCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(packCfg.f_payid);
        //////////////////////////////////////////////////////////////////
        let btn:ButtonCtl;
        this.monthRateCtl.visible = false;
        this.btn_monthCtl.visible = false;
        if(priceCfg.f_isVoucher == EShopPayType.Voucher){
            btn = this.monthRateCtl.btnCtl;
            this.monthRateCtl.cfg = priceCfg;
        }else{
            btn = this.btn_monthCtl;
            this._ui.lab_monthMoney.text = StringUtil.moneyCv(priceCfg.f_price) + "元解锁";        
        }
        if(ZhanLingModel.Ins.monthPaid){
            btn.visible = false;
        }else{
            btn.visible = true;
        }
        //////////////////////////////////////////////////////////////////

        this._ui.lab_monthNum.text = ZhanLingModel.Ins.monthPoint + "";
        this._ui.list_month.array = ZhanLingModel.Ins.monthList;

        this.updataDot();
    }

    private onUpdateMonthTime() {
        let time_str = TimeUtil.subTime(this._timeCtlMonth.tickVal) + "后重置";
        this._timeCtlMonth.setText(time_str);
    }

    private endMonthTime() {
        this._timeCtlMonth.setText("");
    }

    private onBtnMonthClick(){
        let packCfg = EventGamePassPackProxy.Ins.getCfgByType(1);
        ActivityModel.Ins.recharge(packCfg.f_payid);
    }

    private onMonthRender(item:ZhanLingItem,index:number){
        item.setData(item.dataSource,index);
    }

    //************************************************************************************** */
    private updataView2(){
        let time = ZhanLingModel.Ins.weekEndTime - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtlWeek.start(time, new Laya.Handler(this, this.onUpdateWeekTime), new Laya.Handler(this, this.endWeekTime));
        } else {
            this.endWeekTime();
            this._timeCtlWeek.stop();
        }
        let packCfg = EventGamePassPackProxy.Ins.getCfgByType(2);
        let priceCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(packCfg.f_payid);

        ////////////////////////////////////////////////////////////////////
        this.weekRateCtl.visible = false;
        this.btn_weekCtl.visible = false;
        let btn:ButtonCtl;
        if(priceCfg.f_isVoucher == EShopPayType.Voucher){
            btn = this.weekRateCtl.btnCtl;
            this.weekRateCtl.cfg = priceCfg;
        }else{
            btn = this.btn_weekCtl;
            this._ui.lab_weekMoney.text = StringUtil.moneyCv(priceCfg.f_price) + "元解锁";   
        }
        if(ZhanLingModel.Ins.weekPaid){
            btn.visible = false;
        }else{
            btn.visible = true;
        }
        ////////////////////////////////////////////////////////////////////
        this._ui.lab_weekNum.text = ZhanLingModel.Ins.weekPoint + "";
        this._ui.list_week.array = ZhanLingModel.Ins.weekList;

        this.updataDot();
    }

    private onUpdateWeekTime() {
        let time_str = TimeUtil.subTime(this._timeCtlWeek.tickVal) + "后重置";
        this._timeCtlWeek.setText(time_str);
    }

    private endWeekTime() {
        this._timeCtlWeek.setText("");
    }

    private onBtnWeekClick(){
        let packCfg = EventGamePassPackProxy.Ins.getCfgByType(2);
        ActivityModel.Ins.recharge(packCfg.f_payid);
    }

    private onWeekRender(item:ZhanLingItem1,index:number){
        item.setData(item.dataSource,index);
    }

    //**************************************************************************************************** */

    private updataView3(){
        let time = ZhanLingModel.Ins.taskEndTime - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtlTask.start(time, new Laya.Handler(this, this.onUpdateTaskTime), new Laya.Handler(this, this.endTaskTime));
        } else {
            this.endTaskTime();
            this._timeCtlTask.stop();
        }
        this._ui.lab_task.text = ZhanLingModel.Ins.getTaskNum() + "/" + ZhanLingModel.Ins.taskList.length;
        let arr = [];
        let arr1 = [];
        let arr2 = [];
        for(let i:number=0;i<ZhanLingModel.Ins.taskList.length;i++){
            let vo = ZhanLingModel.Ins.taskList[i];
            if(vo.state == 1){
                arr.push(vo);
            }else if(vo.state == 0){
                arr1.push(vo);
            }else if(vo.state == 2){
                arr2.push(vo);
            }
        }
        this._ui.list_task.array = arr.concat(arr1.concat(arr2));

        this.updataDot();
    }

    private onUpdateTaskTime() {
        let time_str = TimeUtil.subTime(this._timeCtlTask.tickVal) + "后重置";
        this._timeCtlTask.setText(time_str);
    }

    private endTaskTime() {
        this._timeCtlTask.setText("");
    }

    private onTaskRender(item:ZhanLingItem2){
        item.setData(item.dataSource);
    }

    //******************************************************************************************************** */
    private updataView4(){
        let time = ZhanLingModel.Ins.lbEndTime - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtlLB.start(time, new Laya.Handler(this, this.onUpdateLBTime), new Laya.Handler(this, this.endLBTime));
        } else {
            this.endLBTime();
            this._timeCtlLB.stop();
        }

        let cfg = EventGamePassConfigProxy.Ins.GetDataById(1);
        let itemVo:ItemVo = new ItemVo();
        let arr = cfg.f_InitiRewards.split("-");
        itemVo.cfgId = parseInt(arr[0]);
        itemVo.count = parseInt(arr[1]);
        ItemViewFactory.refreshSlot(this._ui.item,itemVo);
        if(ZhanLingModel.Ins.lbRreeState){
            this._ui.maskbg.visible = true;
            DotManager.removeDot(this._ui.item);
            this._ui.sp_click.visible = false;
        }else{
            this._ui.maskbg.visible = false;
            DotManager.addDot(this._ui.item,10,-10);
            this._ui.sp_click.visible = true;
        }

        arr = cfg.f_PeakRewards.split("-");
        itemVo.cfgId = parseInt(arr[0]);
        itemVo.count = parseInt(arr[1]);
        ItemViewFactory.refreshSlot(this._ui.item1,itemVo);
        this._ui.lab_lbNum.text = ZhanLingModel.Ins.lbNum + "/" + cfg.f_ConditionTimes;

        if(ZhanLingModel.Ins.lbNum >= cfg.f_ConditionTimes){
            this._ui.pro.width = 544;
            this._ui.lab_lb.text = "";
            DotManager.addDot(this._ui.item1,10,-10);
            this._ui.sp_click1.visible = true;
        }else{
            this._ui.pro.width = ZhanLingModel.Ins.lbNum / cfg.f_ConditionTimes * 544;
            let num = cfg.f_ConditionTimes - ZhanLingModel.Ins.lbNum;
            this._ui.lab_lb.text = "还需购买" + num + "次登山礼包后可领取山巅奖励";
            DotManager.removeDot(this._ui.item1);
            this._ui.sp_click1.visible = false;
        }

        this._ui.list4.array = ZhanLingModel.Ins.lbList;

        this.updataDot();
    }

    private onUpdateLBTime() {
        let time_str = TimeUtil.subTime(this._timeCtlLB.tickVal) + "后礼包重置,山巅礼包奖励进度不重置";
        this._timeCtlLB.setText(time_str);
    }

    private endLBTime() {
        this._timeCtlLB.setText("");
    }

    private onLBRender(item:ZhanLingItem4,index:number){
        item.setData(item.dataSource,index);
    }

    private onItemClick(){
        let req:BattlePassPackFree_req = new BattlePassPackFree_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onItem1Click(){
        let req:BattlePassPackAccTimes_req = new BattlePassPackAccTimes_req;
        SocketMgr.Ins.SendMessageBin(req);
    }
}