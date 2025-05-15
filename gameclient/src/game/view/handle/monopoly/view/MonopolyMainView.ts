import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { DotManager } from "../../common/DotManager";
import { MonopolyModel } from "../model/MonopolyModel";
import { MonopolyTaskItem } from "./MonopolyTaskItem";
import { MonopolyItemCtl } from "./ctl/MonopolyItemCtl";

export class MonopolyMainView extends ViewBase{
    private _ui:ui.views.monopoly.ui_MonopolyMainViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;
    protected mMaskClick: boolean = false;

    private _ctl1:MonopolyItemCtl;
    private _ctl2:MonopolyItemCtl;
    private _ctl3:MonopolyItemCtl;
    private _ctl4:MonopolyItemCtl;
    private _ctl5:MonopolyItemCtl;

    private _timeCtl:TimeCtl;
    private _timeCtlTask:TimeCtl;

    private tabsCtl:TabControl;
    private tabList: any;

    protected onAddLoadRes() {
        this.addAtlas("monopoly.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.monopoly.ui_MonopolyMainViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_lb,new Laya.Handler(this,this.onLBBtnClick)),
                ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick))
            );

            const tabsSkin = [this._ui.tab1,this._ui.tab2];
            let st = E.getLang("monoyTab");
            this.tabList = st.split("-");
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._timeCtl = new TimeCtl(this._ui.lab_time);
            this._ctl1 = new MonopolyItemCtl(this._ui.item1);
            this._ctl2 = new MonopolyItemCtl(this._ui.item2);
            this._ctl3 = new MonopolyItemCtl(this._ui.item3);
            this._ctl4 = new MonopolyItemCtl(this._ui.item4);
            this._ctl5 = new MonopolyItemCtl(this._ui.item5);

            this._timeCtlTask = new TimeCtl(this._ui.lab_time1);
            this._ui.list.itemRender = MonopolyTaskItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onTaskRender);
        }
    }

    private onLBBtnClick(){
        E.ViewMgr.Open(EViewType.MonopolyLBView);
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("monopolyTitle","monopolyDesc");
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.monopoly.ui_tabUI = tabSkin;
        skin.lab.text = this.tabList[index];
        if (sel) {
            skin.lab.color = "#9F562B";
            skin.img.skin = "remote/monopoly/an_1.png";
        } else {
            skin.lab.color = "#F7FFFF";
            skin.img.skin = "remote/monopoly/an_2.png";
        }
    }

    private onTabSelectHandler(v:number){
        this._ui.sp1.visible = this._ui.sp2.visible = false;
        this._ui["sp"+(v+1)].visible = true;
        this["updataView"+(v+1)]();
    }

    protected onInit(): void {
        MonopolyModel.Ins.on(MonopolyModel.UPDATA_VIEW_MAP,this,this.onUpdataView1);
        MonopolyModel.Ins.on(MonopolyModel.UPDATA_VIEW_TASK,this,this.onUpdataView2);
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(): void {
        MonopolyModel.Ins.off(MonopolyModel.UPDATA_VIEW_MAP,this,this.onUpdataView1);
        MonopolyModel.Ins.off(MonopolyModel.UPDATA_VIEW_TASK,this,this.onUpdataView2);
        this.tabsCtl.dispose();
        this.tabsCtl = null;
        this._timeCtl.stop();
        this._timeCtlTask.dispose();
    }

    private updataRedTip(){
        if(MonopolyModel.Ins.isRedTab1()){
            DotManager.addDot(this._ui.tab1,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab1);
        }
        if(MonopolyModel.Ins.isRedTab2()){
            DotManager.addDot(this._ui.tab2,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
        if(MonopolyModel.Ins.isRedLBTip()){
            DotManager.addDot(this._ui.btn_lb,10,-10);
        }else{
            DotManager.removeDot(this._ui.btn_lb);
        }
    }

    private onUpdataView1(){
        this.updataView1();
    }

    private onUpdataView2(){
        this.updataView2();
    }

    private updataView1(){
        let time = MonopolyModel.Ins.endUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
        for(let i:number=0;i<MonopolyModel.Ins.mapList.length;i++){
            this["_ctl"+(i+1)].setData(MonopolyModel.Ins.mapList[i]);
        }
        this.updataRedTip();
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    //********************************************************************************* */
    private updataView2(){
        let time = MonopolyModel.Ins.refreshUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtlTask.start(time, new Laya.Handler(this, this.onUpdateTaskTime), new Laya.Handler(this, this.endTaskTime));
        } else {
            this.endTaskTime();
            this._timeCtlTask.stop();
        }

        let arr = [];
        let arr1 = [];
        let arr2 = [];
        for(let i:number=0;i<MonopolyModel.Ins.taskList.length;i++){
            let vo = MonopolyModel.Ins.taskList[i];
            if(vo.state == 1){
                arr.push(vo);
            }else if(vo.state == 0){
                arr1.push(vo);
            }else if(vo.state == 2){
                arr2.push(vo);
            }
        }
        this._ui.list.array = arr.concat(arr1.concat(arr2));
        this.updataRedTip();
    }

    private onUpdateTaskTime() {
        let time_str = TimeUtil.subTime(this._timeCtlTask.tickVal) + "后重置";
        this._timeCtlTask.setText(time_str);
    }

    private endTaskTime() {
        this._timeCtlTask.setText("");
    }

    private onTaskRender(item:MonopolyTaskItem){
        item.setData(item.dataSource);
    }
}