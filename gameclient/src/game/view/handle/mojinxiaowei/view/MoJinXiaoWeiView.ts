import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DailyEventSearch_req } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { DotManager } from "../../common/DotManager";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { IListData, SelectListCtl } from "../../main/ctl/SelectListCtl";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { QuickQua } from "../../main/views/QuickSettingView";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { MoJinXiaoWeiModel } from "../model/MoJinXiaoWeiModel";
import { DailyEventPositionProxy } from "../proxy/MoJinXiaoWeiProxy";
import { MoJinXiaoWeiItem } from "./MoJinXiaoWeiItem";

export class MoJinXiaoWeiView extends ViewBase{
    private _ui:ui.views.mojinxiaowei.ui_mojinxiaoweiViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected mMaskClick: boolean = false;
    private selCtl: SelectListCtl;
    private _timeCtlTask:TimeCtl;
    private _checkCtl:CheckBoxCtl;
    private _eff:SimpleEffect;

    private tabsCtl:TabControl;
    private tabList: any;

    protected onAddLoadRes() {
        this.addAtlas("mojinxiaowei.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.mojinxiaowei.ui_mojinxiaoweiViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick)),
                ButtonCtl.Create(this._ui.btn_help,new Laya.Handler(this,this.onBtnTipClick))
            );

            const tabsSkin = [this._ui.tab1,this._ui.tab2];
            let st = E.getLang("mojinxiaoweiTab");
            this.tabList = st.split("-");
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this.selCtl = new SelectListCtl();
            this.selCtl.init(this._ui.sanjiao3, this._ui.listarea3, this._ui.listcontainer3, this._ui.listtf3,ui.views.mojinxiaowei.ui_mojinxiaoweiItem1UI, this.chestQuaSelectConfigList);
            this.selCtl.selectHandler = new Laya.Handler(this,this.onQuaSelHandler);

            this._timeCtlTask = new TimeCtl(this._ui.lab_time);
            this._ui.list.itemRender = MoJinXiaoWeiItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onTaskRender);

            this._checkCtl = new CheckBoxCtl({bg:this._ui.ckbg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkCtl.selected = false;
            this._checkCtl.selectHander = new Laya.Handler(this,this.onCheckHandler);
        }
    }

    private onQuaSelHandler(){
        let l = DailyEventPositionProxy.Ins.List;
        let quaCfg:QuickQua = this.selCtl.selectVo;
        for (let i = 0; i < l.length; i++) {
            if(quaCfg.f_id == l[i].f_id){
                this._ui["img"+(i+1)].skin = "remote/mojinxiaowei/bq.png";
            }else{
                this._ui["img"+(i+1)].skin = "remote/mojinxiaowei/bq_1.png";
            }
        }
        this.updataRes();
    }

    public get chestQuaSelectConfigList(): IListData[] {
        let _listData: IListData[] = [];
        let l = DailyEventPositionProxy.Ins.List;
        for (let i = 0; i < l.length; i++) {
            let vo = new QuickQua();
            vo.f_id = l[i].f_id;
            vo.color = "FBF0B6";
            vo.txt = l[i].f_positionName;
            _listData.push(vo);
            this._ui["lab"+(i+1)].text = l[i].f_positionName;
        }
        return _listData;
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.mojinxiaowei.ui_tabUI = tabSkin;
        skin.lab.text = this.tabList[index];
        if (sel) {
            skin.img.skin = "remote/mojinxiaowei/lanwei_2.png";
        } else {
            skin.img.skin = "remote/mojinxiaowei/lanwei_1.png";
        }
    }

    private onTabSelectHandler(v:number){
        if(v == -1)return;
        this._ui.sp1.visible = this._ui.sp2.visible = false;
        this._ui["sp"+(v+1)].visible = true;
        this["updataView"+(v+1)]();
    }

    private onCheckHandler(){
        this.updataRes();
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("mojinxiaoweiTitle","mojinxiaoweiDesc");
    }

    private onBtnClick(){
        if(this._cfg){
            let type;
            if(this._checkCtl.selected){
                type = 2;
            }else{
                type = 1;
            }
            let req:DailyEventSearch_req = new DailyEventSearch_req;
            req.type = type;
            req.position = this._cfg.f_id;
            SocketMgr.Ins.SendMessageBin(req); 
        }
    }

    protected onInit(): void {
        this._ui.mouseEnabled = true;
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onValChange);
        MoJinXiaoWeiModel.Ins.on(MoJinXiaoWeiModel.UPDATA_TASK_VIEW,this,this.onupdataTaskView);
        MoJinXiaoWeiModel.Ins.on(MoJinXiaoWeiModel.UPDATA_XL_VIEW,this,this.onupdataXLView);
        this.tabsCtl.selectIndex = 0;
        this.selCtl.selectIndex(0);
    }

    protected onExit(): void {
        MainModel.Ins.off(MainEvent.ValChangeCell,this,this.onValChange);
        MoJinXiaoWeiModel.Ins.off(MoJinXiaoWeiModel.UPDATA_TASK_VIEW,this,this.onupdataTaskView);
        MoJinXiaoWeiModel.Ins.off(MoJinXiaoWeiModel.UPDATA_XL_VIEW,this,this.onupdataXLView);
        this.tabsCtl.selectIndex = -1;
        this._timeCtlTask.stop();
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
    }

    private onupdataTaskView(){
        this.updataView2();
    }

    private onupdataXLView(){
        if(!this._eff){
            this._eff = new SimpleEffect(this._ui.sp, `o/spine/uiluopan/uiluopan`,0,0,1.0);
        }
        this._ui.mouseEnabled = false;
        this._eff.play(0,false,this,this.effEnd);
    }

    private effEnd(){
        this._eff.stop();
        this._ui.mouseEnabled = true;
        MoJinXiaoWeiModel.Ins.showView();
    }

    private updataDot(){
        if(MoJinXiaoWeiModel.Ins.isDotTab1()){
            DotManager.addDot(this._ui.tab1,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab1);
        }
        if(MoJinXiaoWeiModel.Ins.isDotTab2()){
            DotManager.addDot(this._ui.tab2,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
    }

    private updataView1(){
       
    }

    private onValChange(id:number){
        if(this._cfg){
            let idd = parseInt(this._cfg.f_Cost.split("-")[0]);
            if(id == idd){
                this.updataRes();
            }
        }
    }

    private _cfg:Configs.t_DailyEvent_Position_dat;
    private updataRes(){
        this._cfg = DailyEventPositionProxy.Ins.GetDataById(this.selCtl.selectVo.f_id);
        let st;
        if(this._checkCtl.selected){
            st = this._cfg.f_CostTen;
        }else{
            st = this._cfg.f_Cost;
        }
        let id = parseInt(st.split("-")[0]);
        let count = MainModel.Ins.mRoleData.getVal(id);
        let max = parseInt(System_RefreshTimeProxy.Ins.getVal(75));
        this._ui.img.skin = IconUtils.getIconByCfgId(id);
        this._ui.lab.text = count + "/" + max;
        if(count >= max){
            DotManager.addDot(this._ui.btn,10,-10);
        }else{
            DotManager.removeDot(this._ui.btn);
        }
        this.updataDot();
    }

    //************************************************************************************ */
    private updataView2(){
        let time = MoJinXiaoWeiModel.Ins.taskEndUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtlTask.start(time, new Laya.Handler(this, this.onUpdateTaskTime), new Laya.Handler(this, this.endTaskTime));
        } else {
            this.endTaskTime();
            this._timeCtlTask.stop();
        }
        let arr = [];
        let arr1 = [];
        let arr2 = [];
        for(let i:number=0;i<MoJinXiaoWeiModel.Ins.taskList.length;i++){
            let vo = MoJinXiaoWeiModel.Ins.taskList[i];
            if(vo.state == 1){
                arr.push(vo);
            }else if(vo.state == 0){
                arr1.push(vo);
            }else if(vo.state == 2){
                arr2.push(vo);
            }
        }
        this._ui.list.array = arr.concat(arr1.concat(arr2));
        this.updataDot();
    }

    private onUpdateTaskTime() {
        let time_str = TimeUtil.subTime(this._timeCtlTask.tickVal) + "后重置";
        this._timeCtlTask.setText(time_str);
    }

    private endTaskTime() {
        this._timeCtlTask.setText("");
    }

    private onTaskRender(item:MoJinXiaoWeiItem){
        item.setData(item.dataSource);
    }
}