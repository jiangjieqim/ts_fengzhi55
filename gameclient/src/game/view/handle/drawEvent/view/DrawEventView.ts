import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DrawEventReward_req, DrawEvent_req, stDrawEventRewardInfo } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { DrawEventModel } from "../model/DrawEventModel";
import { DrawEventConfigProxy, DrawEventCumulateRewardsProxy, DrawEventRewardsProxy } from "../proxy/DrawEventProxy";
import { DrawEventItemCtl } from "./DrawEventItemCtl";
import { DrawEventPackItem } from "./DrawEventPackItem";
import { DrawEventTaskItem } from "./DrawEventTaskItem";

export class DrawEventView extends ViewBase{
    private _ui:ui.views.drawEvent.ui_DrawEventViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected mMaskClick: boolean = false;
    protected autoFree: boolean = true;

    private _timeCtl:TimeCtl;
    private _checkCtl:CheckBoxCtl;
    private _checkFlag:boolean = false;

    private _timeCtlTask:TimeCtl;
    private _timeCtlPack:TimeCtl;

    private tabsCtl:TabControl;
    private tabList: any;

    private _ctl:DrawEventItemCtl;
    private _ctl1:DrawEventItemCtl;
    private _ctl2:DrawEventItemCtl;
    private _ctl3:DrawEventItemCtl;
    private _ctl4:DrawEventItemCtl;
    private _ctl5:DrawEventItemCtl;
    private _ctl6:DrawEventItemCtl;
    private _ctl7:DrawEventItemCtl;
    private _ctl8:DrawEventItemCtl;

    protected onAddLoadRes() {
        this.addAtlas("drawEvent.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.drawEvent.ui_DrawEventViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick)),
                ButtonCtl.Create(this._ui.sp_click,new Laya.Handler(this,this.onBtnSpClick),false),
                ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick)),
                ButtonCtl.Create(this._ui.btn_award,new Laya.Handler(this,this.onBtnAwardClick))
            );

            this._ui.spIcon.on(Laya.Event.CLICK,this,this.onSpIconClick);

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3];
            let st = E.getLang("drawEventTab");
            this.tabList = st.split("-");
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._ui.gouImg.mouseEnabled = false;

            this._timeCtl = new TimeCtl(this._ui.lab_time);

            this._ui.list1.itemRender = DrawEventTaskItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onTaskRender);
            this._timeCtlTask = new TimeCtl(this._ui.lab_time2);

            this._ui.list.itemRender = DrawEventPackItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onPackRender);
            this._timeCtlPack = new TimeCtl(this._ui.lab_time1);

            this._checkCtl = new CheckBoxCtl({bg:this._ui.ckbg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkCtl.selected = this._checkFlag;
            this._checkCtl.selectHander = new Laya.Handler(this,this.onCheckHandler);

            this._ctl = new DrawEventItemCtl(this._ui.item);
            for(let i:number=1;i<9;i++){
                this["_ctl" + i] = new DrawEventItemCtl(this._ui["item"+i]);
            }
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("drawEventTitle","drawEventDesc");
    }

    private onBtnSpClick(){
        E.ViewMgr.Open(EViewType.DrawEventView1);
    }

    private onSpIconClick(e:Laya.Event){
        E.ViewMgr.Open(EViewType.DrawEventView2);
    }

    private onBtnClick(){
        let data:stDrawEventRewardInfo = DrawEventModel.Ins.rewardList.find(ele => ele.fid == DrawEventModel.Ins.rewardFid);
        if(data.state == 2){
            let index = DrawEventModel.Ins.rewardList.findIndex(ele => ele.state == 1);
            if(index != -1){
                E.ViewMgr.Open(EViewType.DrawEventView1);
            }else{
                let req:DrawEvent_req = new DrawEvent_req;
                req.type = this._checkCtl.selected ? 2:1;
                SocketMgr.Ins.SendMessageBin(req);
            }
        }else{
            let req:DrawEvent_req = new DrawEvent_req;
            req.type = this._checkCtl.selected ? 2:1;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnAwardClick(){
        E.ViewMgr.Open(EViewType.DrawEventShowReward);
    }

    private onCheckHandler(){
        this._checkFlag = this._checkCtl.selected;
    }

    private updataRes(){
        let cfg:Configs.t_DrawEvent_Config_dat = DrawEventConfigProxy.Ins.getCfgByType(DrawEventModel.Ins.type);
        let id = parseInt(cfg.f_DrawCost.split("-")[0]);
        let count = MainModel.Ins.mRoleData.getVal(id);
        this._ui.img.skin = IconUtils.getIconByCfgId(id);
        this._ui.lab_count.text = count + "";
        if(count){
            DotManager.addDot(this._ui.btn,10,-10);
        }else{
            DotManager.removeDot(this._ui.btn);
        }
        this.isRedTip();
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.drawEvent.ui_tabUI = tabSkin;
        skin.lab.text = this.tabList[index];
        if (sel) {
            skin.img.visible = true;
        } else {
            skin.img.visible = false;
        }
    }

    private onTabSelectHandler(v:number){
        this._ui.sp1.visible = this._ui.sp2.visible = this._ui.sp3.visible = false;
        this._ui["sp"+(v+1)].visible = true;
        this["updataView"+(v+1)]();
    }

    private _num:number;
    protected onInit(): void {
        this._num = 0;
        this._ui.mouseEnabled = true;
        DrawEventModel.Ins.on(DrawEventModel.UPDATA_VIEW_FID,this,this.onLQUpdataView);
        DrawEventModel.Ins.on(DrawEventModel.UPDATA_VIEW_AWARD,this,this.onUpdataView);
        DrawEventModel.Ins.on(DrawEventModel.END_EFF,this,this.onEndView);
        DrawEventModel.Ins.on(DrawEventModel.UPDATA_VIEW_LINQUAWARD,this,this.onLQUpdataView);
        DrawEventModel.Ins.on(DrawEventModel.UPDATA_VIEW_TASK,this,this.onUpdataTaskView);
        DrawEventModel.Ins.on(DrawEventModel.UPDATA_VIEW_PACK,this,this.onUpdataPackView);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onValChange);
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(): void {
        DrawEventModel.Ins.off(DrawEventModel.UPDATA_VIEW_FID,this,this.onLQUpdataView);
        DrawEventModel.Ins.off(DrawEventModel.UPDATA_VIEW_AWARD,this,this.onUpdataView);
        DrawEventModel.Ins.off(DrawEventModel.END_EFF,this,this.onEndView);
        DrawEventModel.Ins.off(DrawEventModel.UPDATA_VIEW_LINQUAWARD,this,this.onLQUpdataView);
        DrawEventModel.Ins.off(DrawEventModel.UPDATA_VIEW_TASK,this,this.onUpdataTaskView);
        DrawEventModel.Ins.off(DrawEventModel.UPDATA_VIEW_PACK,this,this.onUpdataPackView);
        MainModel.Ins.off(MainEvent.ValChangeCell,this,this.onValChange);
        this.tabsCtl.dispose();
        this._timeCtl.dispose();
        this._timeCtlTask.dispose();
        this._timeCtlPack.dispose();
    }

    private onValChange(id:number){
        let cfg:Configs.t_DrawEvent_Config_dat = DrawEventConfigProxy.Ins.getCfgByType(DrawEventModel.Ins.type);
        let idd = parseInt(cfg.f_DrawCost.split("-")[0]);
        if(id == idd){
            this.updataRes();
        }
    }

    private onUpdataView(){
        this._num = 0;
        this._ui.mouseEnabled = false;
        DrawEventModel.Ins.event(DrawEventModel.PLAY_EFF);
    }

    private onEndView(){
        this._num ++;
        if(this._num >= 9){
            this._ui.mouseEnabled = true;
            this.updataView1();
            let req:DrawEventReward_req = new DrawEventReward_req;
            SocketMgr.Ins.SendMessageBin(req); 
        }
    }

    private onLQUpdataView(){
        this.updataView1();
    }

    private onUpdataPackView(){
        this.updataView2();
    }

    private onUpdataTaskView(){
        this.updataView3();
    }

    public isRedTip(){
        if(DrawEventModel.Ins.isTabRedTip1()){
            DotManager.addDot(this._ui.tab1,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab1);
        }
        if(DrawEventModel.Ins.isTabRedTip2()){
            DotManager.addDot(this._ui.tab2,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
        if(DrawEventModel.Ins.isTabRedTip3()){
            DotManager.addDot(this._ui.tab3,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab3);
        }
    }

    private updataView1(){
        this.updataRes();
        this.updataAward();
        this.updataCumAward();

        let cfg:Configs.t_DrawEvent_Config_dat = DrawEventConfigProxy.Ins.getCfgByType(DrawEventModel.Ins.type);
        this._ui.lab_pro.text = DrawEventModel.Ins.fuYunCount + "/" + cfg.f_ProtectLimite;
        this._ui.pro.width = DrawEventModel.Ins.fuYunCount / cfg.f_ProtectLimite * 575;

        let time = DrawEventModel.Ins.endUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }

        if(DrawEventModel.Ins.isCumAwardRedTip()){
            DotManager.addDot(this._ui.spIcon,20,-10);
        }else{
            DotManager.removeDot(this._ui.spIcon);
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    private updataAward(){
        let data:Configs.t_DrawEvent_Rewards_dat = DrawEventRewardsProxy.Ins.GetDataById(DrawEventModel.Ins.rewardFid);
        this._ctl.setData(data,false);
        let arr = DrawEventRewardsProxy.Ins.getListByType(DrawEventModel.Ins.type);
        let arr1 = [];
        for(let i:number=0;i<arr.length;i++){
            if(arr[i].f_UIItem){
                arr1.push(arr[i]);
            }
        }
        arr1.sort((a,b)=>{
            return a.f_UIItem - b.f_UIItem;
        });
        for(let i:number=0;i<arr1.length;i++){
            this["_ctl"+(i+1)].setData(arr1[i]);
        }
    }

    private updataCumAward(){
        let awCfg:Configs.t_DrawEvent_CumulateRewards_dat;
        let awArr = DrawEventCumulateRewardsProxy.Ins.getListByType(DrawEventModel.Ins.type);
        for(let i:number=0;i<awArr.length;i++){
            let min = parseInt(awArr[i].f_Clientplay.split("-")[0]);
            let max = parseInt(awArr[i].f_Clientplay.split("-")[1]);
            if(DrawEventModel.Ins.count >= min && DrawEventModel.Ins.count <= max){
                awCfg = awArr[i];
                break;
            }
        }
        if(awCfg){
            this._ui.lab_num1.text = DrawEventModel.Ins.count + "/" + awCfg.f_DrawTimes;
            this._ui.gouImg.visible = false;
        }else{
            this._ui.lab_num1.text = "";
            this._ui.gouImg.visible = true;
            awCfg = awArr[awArr.length - 1];
        }
        let id = parseInt(awCfg.f_CumulateRewards.split("-")[0]);
        let count = parseInt(awCfg.f_CumulateRewards.split("-")[1]);
        this._ui.icon.skin = IconUtils.getIconByCfgId(id);
        this._ui.lab_num.text = count + "";
    }

    //************************************************************************************************* */
    private updataView2(){
        let time = DrawEventModel.Ins.refreshUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtlPack.start(time, new Laya.Handler(this, this.onUpdatePackTime), new Laya.Handler(this, this.endPackTime));
        } else {
            this.endPackTime();
            this._timeCtlPack.stop();
        }
        this._ui.list.array = DrawEventModel.Ins.packList;
        this.isRedTip();
    }

    private onUpdatePackTime() {
        let time_str = TimeUtil.subTime(this._timeCtlPack.tickVal) + "后重置";
        this._timeCtlPack.setText(time_str);
    }

    private endPackTime() {
        this._timeCtlPack.setText("");
    }

    private onPackRender(item:DrawEventPackItem){
        item.setData(item.dataSource);
    }

    //************************************************************************************************* */
    private updataView3(){
        let time = DrawEventModel.Ins.refreshUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtlTask.start(time, new Laya.Handler(this, this.onUpdateTaskTime), new Laya.Handler(this, this.endTaskTime));
        } else {
            this.endTaskTime();
            this._timeCtlTask.stop();
        }
        let arr = [];
        let arr1 = [];
        let arr2 = [];
        for(let i:number=0;i<DrawEventModel.Ins.taskList.length;i++){
            let vo = DrawEventModel.Ins.taskList[i];
            if(vo.state == 1){
                arr.push(vo);
            }else if(vo.state == 0){
                arr1.push(vo);
            }else if(vo.state == 2){
                arr2.push(vo);
            }
        }
        this._ui.list1.array = arr.concat(arr1.concat(arr2));
        this.isRedTip();
    }

    private onUpdateTaskTime() {
        let time_str = TimeUtil.subTime(this._timeCtlTask.tickVal) + "后重置";
        this._timeCtlTask.setText(time_str);
    }

    private endTaskTime() {
        this._timeCtlTask.setText("");
    }

    private onTaskRender(item:DrawEventTaskItem){
        item.setData(item.dataSource);
    }
}