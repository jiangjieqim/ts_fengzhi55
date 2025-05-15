import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stSevenTask } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ServerTaskModel } from "../model/ServerTaskModel";
import { SevenDaysPackProxy, SevenDaysStageRewardsProxy, SevenDaysTaskProxy } from "../proxy/ServerTaskProxy";
import { ServerTaskItem1 } from "./ServerTaskItem1";
import { ServerTaskItem2 } from "./ServerTaskItem2";
import { ServerTaskItem3 } from "./ServerTaskItem3";
import { AutoRateBtn } from "../../huodong/views/AutoRateBtn";
import { EClientType } from "../../sdk/ClientType";
import { ISevenDaySel } from "../../main/model/DiscountPackagePop";

export class ServerTaskView extends ViewBase{
    protected uiBgCloseClick:boolean = true;
    private _ui:ui.views.serverTask.ui_serverTaskViewUI;
    protected mMask = true; 
    protected autoFree = true;
    protected mMainSnapshot = true;

    private _timeCtl:TimeCtl;

    private tabList: any;
    private tabsCtl:TabControl;
    private _autoBtn:AutoRateBtn;

    protected onAddLoadRes() {
        this.addAtlas("serverTask.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.serverTask.ui_serverTaskViewUI;
            this.bindClose(this._ui.btn_close);
            this.setMouseBg(this._ui.bg);

            // ButtonCtl.Create(this._ui.btn_yq,new Laya.Handler(this,this.onBtnYQClick));
            this._timeCtl = new TimeCtl(this._ui.lab_time);

            this._ui.list.itemRender = ui.views.serverTask.ui_serverTaskItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list.selectEnable = true;

            this._ui.list1.itemRender = ServerTaskItem1;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);

            this._ui.list2.itemRender = ServerTaskItem2;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderHandler2);

            this._ui.list3.itemRender = ServerTaskItem3;
            this._ui.list3.renderHandler = new Laya.Handler(this,this.onRenderHandler3);

            const tabsSkin = [this._ui.tab,this._ui.tab1];
            this.tabList = ["任务","礼包"];
            this.tabsCtl = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));
        }
    }

    private _indexDay:number;
    protected onInit(): void {
        ServerTaskModel.Ins.on(ServerTaskModel.UPDATA_VIEW,this,this.onUpdataView);
        ServerTaskModel.Ins.on(ServerTaskModel.UPDATA_JIFEN_VIEW,this,this.updataJiFen);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.updataActView);   
        this._ui.list.array = ["一","二","三","四","五","六","七"];
        this._ui.list.selectedIndex = 0;
        if(this.Data){
            let obj:ISevenDaySel = this.Data;
            this.tabsCtl.selectIndex = obj.tabIndex;
        }else{
            this.tabsCtl.selectIndex = 0;
        }
        this._indexDay = 0;
        if(ServerTaskModel.Ins.isTabRedTip1()){
            DotManager.addDot(this._ui.tab);
        }else{
            DotManager.removeDot(this._ui.tab);
        }

        this.updataActView();
        this.updataJiFen();
    
        this.initAutoBtn();
        this.Data = null;
    }
    private initAutoBtn(){
        let _activityVo = ActivityModel.Ins.getVo(EActivityType.ServerTask);
        if(_activityVo){
            this._autoBtn=AutoRateBtn.Create(this._ui,_activityVo.uid);
        }
        if (initConfig.clienttype == EClientType.Discount) {
            this._ui.list2.height = 650;
        } else {
            this._ui.list2.height = 754;
        }
    }

    protected onExit(): void {
        ServerTaskModel.Ins.off(ServerTaskModel.UPDATA_VIEW,this,this.onUpdataView);
        ServerTaskModel.Ins.off(ServerTaskModel.UPDATA_JIFEN_VIEW,this,this.updataJiFen);
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.updataActView);
        this._timeCtl.stop();
        this.tabsCtl.dispose();
        if(this._autoBtn){
            this._autoBtn.dispose();
        }
    }

    private onUpdataView(){
        this._ui.list.refresh();
        if(ServerTaskModel.Ins.isTabRedTip1()){
            DotManager.addDot(this._ui.tab);
        }else{
            DotManager.removeDot(this._ui.tab);
        }
        this.updataJiFen();
    }

    private onRenderHandler(item:ui.views.serverTask.ui_serverTaskItemUI,index:number){
        if(this._ui.list.selectedIndex > ServerTaskModel.Ins.sevenTaskDay - 1){
            this._ui.list.selectedIndex = this._indexDay;
        }
        item.lab.text = "第" + item.dataSource + "天";
        if(index + 1 <= ServerTaskModel.Ins.sevenTaskDay){
            item.img_z.visible = item.sp.visible = false;
            if(this._ui.list.selectedIndex == index){
                item.img.skin = "remote/serverTask/anniu_2.png";
                this._indexDay = this._ui.list.selectedIndex;
                this.updataTaskView();
            }else{
                item.img.skin = "remote/serverTask/anniu_1.png";
            }
        }else{
            item.img_z.visible = item.sp.visible = true;
        }
        if(ServerTaskModel.Ins.isTaskRedTipByDay(index + 1)){
            DotManager.addDot(item,0,-10);
        }else{
            DotManager.removeDot(item);
        }
    }

    private onRenderHandler1(item:ServerTaskItem1){
        item.setData(item.dataSource);
    }

    private onRenderHandler2(item:ServerTaskItem2){
        item.setData(item.dataSource);
    }

    private onRenderHandler3(item:ServerTaskItem3,index:number){
        item.setData(item.dataSource,index);
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.huodong.ui_tabUI = tabSkin;
        skin.txt.text = this.tabList[index];
        if (sel) {
            skin.img2.visible = true;
            skin.img1.visible = false;
            skin.txt.color = "#A1572F";
        } else {
            skin.img2.visible = false;
            skin.img1.visible = true;
            skin.txt.color = "#e4bb87";
        }
    }
  
    private onTabSelectHandler(v:number){
        if(v == -1)return;
        if(v == 0){
           this._ui.sp.visible = true;
           this._ui.sp1.visible = false;
        }else{
           this._ui.sp.visible = false;
           this._ui.sp1.visible = true;
        }
    }

    private updataTaskView(){
        let arrr = [];
        for(let i:number=0;i<ServerTaskModel.Ins.sevenTaskList.length;i++){
            let cfg = SevenDaysTaskProxy.Ins.getCfgById(ServerTaskModel.Ins.sevenTaskList[i].id);
            if(cfg.f_days == this._indexDay + 1){
                arrr.push(ServerTaskModel.Ins.sevenTaskList[i]);
            }
        }

        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        for(let i:number=0;i<arrr.length;i++){
            switch(arrr[i].status){//0不可领取 1已领取 2可领取
                case 2:
                    arr1.push(arrr[i]);
                    break;
                case 0:
                    arr2.push(arrr[i]);
                    break;
                case 1:
                    arr3.push(arrr[i]);
                    break;
            } 
        }
        arr1 = arr1.sort(this.onSort);
        arr2 = arr2.sort(this.onSort);
        arr3 = arr3.sort(this.onSort);
        this._ui.list1.array = arr1.concat(arr2.concat(arr3));
    }

    private onSort(a:stSevenTask,b:stSevenTask){
        let aa =  SevenDaysTaskProxy.Ins.getCfgById(a.id);
        let bb =  SevenDaysTaskProxy.Ins.getCfgById(b.id);
        return aa.f_sort - bb.f_sort;
    }

    //************************************************************************************************************ */
    private _activityVo:ActivityVo;
    private updataActView(){
        this._activityVo = ActivityModel.Ins.getVo(EActivityType.ServerTask);
        if(!this._activityVo)return;
        let time = this._activityVo.vo.endtime - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
        this._ui.list2.array = SevenDaysPackProxy.Ins.List;
        if(this.Data){
            let obj:ISevenDaySel = this.Data;
            this._ui.list2.scrollTo(obj.listitemIndex);
        }
        if(ServerTaskModel.Ins.isTabRedTip2()){
            DotManager.addDot(this._ui.tab1);
        }else{
            DotManager.removeDot(this._ui.tab1);
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    private updataJiFen(){
        this._ui.list3.array = SevenDaysStageRewardsProxy.Ins.List;
        this._ui.lab.text = ServerTaskModel.Ins.getSorce() + "";
    }
}