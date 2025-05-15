import { MathUtil } from "../../../../../frame/util/MathUtil";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { GeXuQiPaoZhuiJi_req, GetRewardFromCache_req, stSkin } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from "../../avatar/AvatarView";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { DotManager } from "../../common/DotManager";
import { FuJiangModel } from "../../fujiang/model/FuJiangModel";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { GeXuQiPaoModel } from "../model/GeXuQiPaoModel";
import { RADrawEventConfigProxy, RADrawEventRewardRateProxy, RADrawEventShopProxy } from "../proxy/GeXuQiPaoProxy";
import { GeXuQiPaoLBItem } from "./GeXuQiPaoLBItem";
import { GeXuQiPaoShopItem } from "./GeXuQiPaoShopItem";
import { GeXuQiPaoTaskItem } from "./GeXuQiPaoTaskItem";

export class GeXuQiPaoView extends ViewBase{
    private _ui:ui.views.gexuqipao.ui_gexuqipaoViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected mMaskClick: boolean = false;
    private _avatar:AvatarView;

    private tabsCtl:TabControl;
    private tabList: any;
    private _checkCtl:CheckBoxCtl;
    private _eff:SimpleEffect;
    private _eff1:SimpleEffect;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("gexuqipao.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.gexuqipao.ui_gexuqipaoViewUI;
            this.bindClose(this._ui.close1);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_help,new Laya.Handler(this,this.onBtnTipClick)),
                ButtonCtl.Create(this._ui.btn_zj,new Laya.Handler(this,this.onBtnZJClick))
            );

            ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.gxqp);
            this._timeCtl = new TimeCtl(this._ui.time1);

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3,this._ui.tab4];
            let st = E.getLang("gexuqipaoTab");
            this.tabList = st.split("-");
            this.tabsCtl  = new TabControl();
            
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));
            this._checkCtl = new CheckBoxCtl({bg:this._ui.ckbg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkCtl.selected = false;
            this._checkCtl.selectHander = new Laya.Handler(this,this.onCheckHandler);

            this._ui.list_task.itemRender = GeXuQiPaoTaskItem;
            this._ui.list_task.renderHandler = new Laya.Handler(this,this.onTaskRender);
            this._ui.list_lb.itemRender = GeXuQiPaoLBItem;
            this._ui.list_lb.renderHandler = new Laya.Handler(this,this.onLBRender);
            this._ui.list_shop.itemRender = GeXuQiPaoShopItem;
            this._ui.list_shop.renderHandler = new Laya.Handler(this,this.onShopRender);
        }
    }

    private onTaskRender(item:GeXuQiPaoTaskItem){
        item.setData(item.dataSource);
    }

    private onLBRender(item:GeXuQiPaoLBItem){
        item.setData(item.dataSource);
    }

    private onShopRender(item:GeXuQiPaoShopItem){
        item.setData(item.dataSource);
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.gexuqipao.ui_tabUI = tabSkin;
        skin.lab.text = this.tabList[index];
        skin.img1.skin = "remote/gexuqipao/tab" + (index + 1)+ ".png";
        if (sel) {
            skin.img.visible = true;
        } else {
            skin.img.visible = false;
        }
    }

    private onTabSelectHandler(v:number){
        if(v == -1)return;
        this._ui.sp1.visible = this._ui.sp2.visible = this._ui.sp3.visible = this._ui.sp4.visible = false;
        this._ui["sp"+(v+1)].visible = true;

        let tt;
        if(v == 0 || v == 3){
            this._ui.tf1.text = "活动结束时间:";
            tt = GeXuQiPaoModel.Ins.endUnix;
        }else if(v == 1){
            this._ui.tf1.text = "任务刷新时间:";
            tt = GeXuQiPaoModel.Ins.refreshUnix;
        }else if(v == 2){
            this._ui.tf1.text = "礼包刷新时间:";
            tt = GeXuQiPaoModel.Ins.refreshUnix;
        }
        let time = tt - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
     }

     private endTime(){
        this._timeCtl.setText("");
     }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("gexuqipaoTitle","gexuqipaoDec");
    }

    private onBtnZJClick(){
        let req: GeXuQiPaoZhuiJi_req = new GeXuQiPaoZhuiJi_req;
        req.type = this._checkCtl.selected ? 1:0;
        SocketMgr.Ins.SendMessageBin(req); 
    }

    protected onInit(): void {
        let val = MainModel.Ins.mRoleData.getVal(ECellType.gxqp);
        this._ui.lab2.text = StringUtil.val2m(val);
        this._ui.mouseEnabled = true;
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onValChange);
        GeXuQiPaoModel.Ins.on(GeXuQiPaoModel.UPDATA_XL_VIEW,this,this.onupdataXLView);
        GeXuQiPaoModel.Ins.on(GeXuQiPaoModel.UPDATA_VIEW,this,this.updataView);
        this.tabsCtl.selectIndex = 0;
        this._ui.img1.visible = false;
        let skin:stSkin = FuJiangModel.Ins.getFuJiangSkin(37);
        this._avatar = AvatarFactory.createAvatarByStSkin(skin,EAvatarAnim.NormalStand,EAvatarDir.Left);
        this._ui.sp_role.addChild(this._avatar);
        this.updataView();
    }

    protected onExit(): void {
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
        if(this._eff1){
            this._eff1.dispose();
            this._eff1 = null;
        }
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        if(this._timeCtl){
            this._timeCtl.stop();
        }
        MainModel.Ins.off(MainEvent.ValChangeCell,this,this.onValChange);
        GeXuQiPaoModel.Ins.off(GeXuQiPaoModel.UPDATA_XL_VIEW,this,this.onupdataXLView);
        GeXuQiPaoModel.Ins.off(GeXuQiPaoModel.UPDATA_VIEW,this,this.updataView);
    }

    private onCheckHandler(){
        this.updataRes();
    }

    private updataDot(){
        if(GeXuQiPaoModel.Ins.isDotTask()){
            DotManager.addDot(this._ui.tab2,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
        if(GeXuQiPaoModel.Ins.isDotLB()){
            DotManager.addDot(this._ui.tab3,10,-10);
        }else{
            DotManager.removeDot(this._ui.tab3);
        }
    }

    private updataView(){
        this.updataRes();
        this._ui.list_task.array = GeXuQiPaoModel.Ins.taskList;
        this._ui.list_lb.array = GeXuQiPaoModel.Ins.packList;
        this._ui.list_shop.array = RADrawEventShopProxy.Ins.List;
    }

    private onValChange(id:number){
        if(this._cfg){
            let idd = parseInt(this._cfg.f_DrawCost.split("-")[0]);
            if(id == idd){
                this.updataRes();
            }
        }
    }

    private _cfg:Configs.t_RecurringActivity_DrawEvent_Config_dat;
    private updataRes(){
        this._cfg = RADrawEventConfigProxy.Ins.GetDataById(1);
        let st = this._checkCtl.selected ? this._cfg.f_TenPrice : this._cfg.f_DrawCost;
        let id = parseInt(st.split("-")[0]);
        // let val = parseInt(st.split("-")[1]);
        let count = MainModel.Ins.mRoleData.getVal(id);
        this._ui.img.skin = IconUtils.getIconByCfgId(id);
        this._ui.lab1.text = count + "";// + "/" + val;
        this.updataDot();
    }

    private onupdataXLView(){
        if(!this._eff){
            this._eff = new SimpleEffect(this._ui.sp_jian, `o/spine/uibow/uibow`,0,0,1.0);
        }
        this._ui.mouseEnabled = false;
        this._eff.play(0,false,this,this.effEnd);
    }

    private effEnd(){
        this._eff.stop();
        if(!this._eff1){
            this._eff1 = new SimpleEffect(this._ui.sp_item, `o/spine/uidiaoluo/uidiaoluo`,0,0,1.0);
        }
        this._ui.img1.visible = true;
        let cfg = RADrawEventRewardRateProxy.Ins.GetDataById(GeXuQiPaoModel.Ins.jcList[0]);
        this._ui.lab.text = cfg.f_RewardTxt;
        let index = MathUtil.RangeInt(0,4);
        this._eff1.play(index,false,this,this.effEnd1);
    }

    private effEnd1(){
        this._eff1.stop();
        this._ui.img1.visible = false;
        this._ui.mouseEnabled = true;
        let req:GetRewardFromCache_req = new GetRewardFromCache_req;
        req.type = 1;
        SocketMgr.Ins.SendMessageBin(req);
    }
}