import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { DotManager } from "../../common/DotManager";
import { SpringFestivalModel } from "../model/SpringFestivalModel";
import { SpringFestivalTaskItem } from "./item/SpringFestivalTaskItem";
import { SpringFestivalTaskItem1 } from "./item/SpringFestivalTaskItem1";

export class SpringFestivalTaskView extends ViewBase{
    private _ui:ui.views.springFestival.ui_springFestivalTaskViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;
    private _timeCtl:TimeCtl;

    private tabsCtl:TabControl;
    private tabList: any;

    protected onAddLoadRes() {
        this.addAtlas("springFestival.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.springFestival.ui_springFestivalTaskViewUI;
            this.bindClose(this._ui.btn_close);

            this._timeCtl = new TimeCtl(this._ui.lab_time);

            const tabsSkin = [this._ui.tab1,this._ui.tab2];
            let st = E.getLang("springFestivalTab");
            this.tabList = st.split("-");
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._ui.list1.itemRender = SpringFestivalTaskItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onTaskRender);

            this._ui.list2.itemRender = SpringFestivalTaskItem1;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onTaskRender1);
        }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.monopoly.ui_tabUI = tabSkin;
        skin.lab.text = this.tabList[index];
        if (sel) {
            skin.lab.color = "#F2F781";
            skin.img.skin = "remote/springFestival/button2.png";
        } else {
            skin.lab.color = "#AB351B";
            skin.img.skin = "remote/springFestival/button1.png";
        }
    }

    private onTabSelectHandler(v:number){
        this._ui.list1.visible = this._ui.list2.visible = false;
        this._ui["list"+(v+1)].visible = true;
        this["updataView"+(v+1)]();
    }

    private onTaskRender(item:SpringFestivalTaskItem){
        item.setData(item.dataSource);
    }

    private onTaskRender1(item:SpringFestivalTaskItem1){
        item.setData(item.dataSource);
    }

    private updataRedTip(){
        if(SpringFestivalModel.Ins.isTaskRedTip()){
            DotManager.addDot(this._ui.tab1);
        }else{
            DotManager.removeDot(this._ui.tab1);
        }
        if(SpringFestivalModel.Ins.isPackRedTip()){
            DotManager.addDot(this._ui.tab2);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
    }

    protected onInit(): void {
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_TASK,this,this.updataView1);
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_PACK,this,this.updataView2);
        this.updataTime();
        this.tabsCtl.selectIndex = this.Data;
    }

    protected onExit(): void {
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_TASK, this, this.updataView1);
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_PACK, this, this.updataView2);
        this.tabsCtl.dispose();
        this._timeCtl.dispose();
    }

    private updataView1(){
        let arr = [];
        let arr1 = [];
        let arr2 = [];
        for(let i:number=0;i<SpringFestivalModel.Ins.taskList.length;i++){
            let vo = SpringFestivalModel.Ins.taskList[i];
            if(vo.state == 1){
                arr.push(vo);
            }else if(vo.state == 0){
                arr1.push(vo);
            }else if(vo.state == 2){
                arr2.push(vo);
            }
        }
        this._ui.list1.array = arr.concat(arr1.concat(arr2));
        this.updataRedTip();
    }

    private updataView2(){
        this._ui.list2.array = SpringFestivalModel.Ins.packList;
        this.updataRedTip();
    }

    private updataTime(){
        let time = SpringFestivalModel.Ins.endunix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText("活动剩余时间："+time_str);
    }

    private endTime() {
        this._timeCtl.setText("活动剩余时间：已结束");
    }
}