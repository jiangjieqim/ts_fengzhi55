import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EMsgBoxType, EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { SpringFestivalEnroll_req, SpringFestivalFire_req } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { DotManager } from "../../common/DotManager";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { SpringFestivalModel } from "../model/SpringFestivalModel";
import { SFConfigProxy, SFSFireWorkProxy, SFStageRewardsProxy } from "../proxy/SpringFestivalProxy";
import { SpringFestivalWWItem } from "./item/SpringFestivalWWItem";

export class SpringFestivalView extends ViewBase{
    private _ui:ui.views.springFestival.ui_springFestivalViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;
    protected mMaskClick: boolean = false;

    private _timeCtl:TimeCtl;
    private _checkCtl:CheckBoxCtl;

    private _bossAv:AvatarMonsterView;

    protected onAddLoadRes() {
        this.addAtlas("springFestival.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.springFestival.ui_springFestivalViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_ww,new Laya.Handler(this,this.onWWClick),false),
                ButtonCtl.Create(this._ui.btn_bm,new Laya.Handler(this,this.onBMClick)),
                ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick)),
                ButtonCtl.Create(this._ui.btn_ph,new Laya.Handler(this,this.onBtnPHClick)),
                ButtonCtl.Create(this._ui.btn_rw,new Laya.Handler(this,this.onBtnRWClick)),
                ButtonCtl.Create(this._ui.btn_yh,new Laya.Handler(this,this.onBtnYHClick)),
                ButtonCtl.Create(this._ui.btn_sd,new Laya.Handler(this,this.onBtnSDClick))
            );

            this._ui.btn1.on(Laya.Event.CLICK,this,this.onClick,[1]);
            this._ui.btn2.on(Laya.Event.CLICK,this,this.onClick,[2]);
            this._ui.btn3.on(Laya.Event.CLICK,this,this.onClick,[3]);

            this._ui.list.itemRender = SpringFestivalWWItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRender);

            this._timeCtl = new TimeCtl(this._ui.lab_time);

            this._checkCtl = new CheckBoxCtl({bg:this._ui.ckbg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkCtl.selected = false;

            this._bossAv = AvatarFactory.createBossMonster(`o/spine/efnianshou/efnianshou`);
            this._bossAv.play(0);
            this._ui.sp_av.addChild(this._bossAv);
        }
    }

    private _time:number = 0;
    private onClick(index:number){
        let time: number = SFConfigProxy.Ins.GetDataById(1).f_AnimationCD;
        if (Laya.timer.currTimer - this._time < time) {
            return;
        }
        this._time = Laya.timer.currTimer;
        let cfg:Configs.t_Event_2024Spring_FireWork_dat = SFSFireWorkProxy.Ins.getCfgByTpye(index);
        if(!MainModel.Ins.isItemEnough(cfg.f_FireworkID,1,true)){
            return;
        }
        let req:SpringFestivalFire_req = new SpringFestivalFire_req;
        req.itemId = cfg.f_FireworkID;
        if(this._checkCtl.selected){
            req.count = MainModel.Ins.mRoleData.getVal(cfg.f_FireworkID);;
        }else{
            req.count = 1;
        }
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onWWClick(){
        if(SpringFestivalModel.Ins.getIsEnroll()){
            E.ViewMgr.Open(EViewType.SpringFestivalWWView);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("springFestivalTitle","springFestivalDec");
    }

    private onBtnPHClick(){
        if(SpringFestivalModel.Ins.getIsEnroll(false)){
            E.ViewMgr.Open(EViewType.SpringFestivalRankView);
        }
    }

    private onBtnRWClick(){
        if(SpringFestivalModel.Ins.getIsEnroll()){
            E.ViewMgr.Open(EViewType.SpringFestivalTaskView,null,0);
        }
    }

    private onBtnYHClick(){
        if(SpringFestivalModel.Ins.getIsEnroll()){
            E.ViewMgr.Open(EViewType.SpringFestivalTaskView,null,1);
        }
    }

    private onBtnSDClick(){
        if(SpringFestivalModel.Ins.getIsEnroll(false)){
            E.ViewMgr.Open(EViewType.SpringFestivalShopView);
        }
    }

    private onBMClick(){
        let st = E.getLang("springFestival1");
        E.ViewMgr.ShowMsgBox(
            EMsgBoxType.OkOrCancel,st,new Laya.Handler(this, () => {
                let req: SpringFestivalEnroll_req = new SpringFestivalEnroll_req;
                SocketMgr.Ins.SendMessageBin(req);
            })
        );
    }

    private onRender(item:SpringFestivalWWItem,index:number){
        item.setData(item.dataSource,index);
    }

    private updataRedTip(){
        if(SpringFestivalModel.Ins.isWWRedTip()){
            DotManager.addDot(this._ui.btn_ww);
        }else{
            DotManager.removeDot(this._ui.btn_ww);
        }
        if(SpringFestivalModel.Ins.isEnrollRedTip()){
            DotManager.addDot(this._ui.btn_bm);
        }else{
            DotManager.removeDot(this._ui.btn_bm);
        }
        if(SpringFestivalModel.Ins.isRankRedTip()){
            DotManager.addDot(this._ui.btn_ph);
        }else{
            DotManager.removeDot(this._ui.btn_ph);
        }
        if(SpringFestivalModel.Ins.isTaskRedTip() || SpringFestivalModel.Ins.isPackRedTip()){
            DotManager.addDot(this._ui.btn_rw);
        }else{
            DotManager.removeDot(this._ui.btn_rw);
        }
    }

    protected onInit(): void {
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW,this,this.onUpdataView);
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_prestige,this,this.onUpdataCount);
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_YH,this,this.onUpdataYH);
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_REWARD,this,this.onUpdataReward);
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_RANK_REWARD,this,this.updataRedTip);
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_TASK,this,this.updataRedTip);
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_PACK,this,this.updataRedTip);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.updataYH);
        this.updataTime();
        this.updataView();
    }

    protected onExit(): void {
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW, this, this.onUpdataView);
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_prestige, this, this.onUpdataCount);
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_YH, this, this.onUpdataYH);
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_REWARD, this, this.onUpdataReward);
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_RANK_REWARD,this,this.updataRedTip);
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_TASK,this,this.updataRedTip);
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_PACK,this,this.updataRedTip);
        MainModel.Ins.off(MainEvent.ValChangeCell, this, this.updataYH);
        this._timeCtl.dispose();
        if (this._bossAv) {
            this._bossAv.dispose();
            this._bossAv = null;
        }
    }

    private onUpdataView(){
        this.updataView();
    }

    private onUpdataCount(){
        this.updataCount();
        this._ui.list.array = SFStageRewardsProxy.Ins.List;
    }

    private onUpdataYH(id:number){
        let cfg:Configs.t_Event_2024Spring_FireWork_dat = SFSFireWorkProxy.Ins.getCfgByID(id);
        let eff:SimpleEffect;
        if(cfg.f_FireWorkType == 1){
            eff = new SimpleEffect(this._ui.sp_1, `o/spine/efbianpao1/efbianpao1`,0,0,1.0);
        }else if(cfg.f_FireWorkType == 2){
            eff = new SimpleEffect(this._ui.sp_2, `o/spine/efbianpao3/efbianpao3`,0,0,1.0);
        }else if(cfg.f_FireWorkType == 3){
            eff = new SimpleEffect(this._ui.sp_3, `o/spine/efbianpao2/efbianpao2`,0,0,1.0);
        }
        
        eff.anim.on(Laya.Event.COMPLETE,this,this.onComplete,[eff]);
        eff.playEndDisplse(0);
    }

    private onComplete(eff){
        eff.anim.avatar.skeleton.on(Laya.Event.LABEL,this,this.onAvatarLabel);
    }

    private onAvatarLabel(e){
        let animEvent:string = e.name;
        if (animEvent == "bianpao") {
            if(this._bossAv){
                this._bossAv.playOnce(1, this, this.onAvatarComplete);
            }
        }
    }

    private onAvatarComplete(){
        this._bossAv.play(0);
    }

    private onUpdataReward(){
        this._ui.list.array = SFStageRewardsProxy.Ins.List;
        this.updataRedTip();
    }

    private updataCount(){
        this._ui.lab_ww.text = SpringFestivalModel.Ins.prestige + "";
    }

    private updataYH(){
        for(let i:number = 1;i<4;i++){
            let cfg:Configs.t_Event_2024Spring_FireWork_dat = SFSFireWorkProxy.Ins.getCfgByTpye(i);
            let prestigeVal = cfg.f_prestigeVal.split("|")[0];
            let count = prestigeVal.split("-")[1];
            this._ui["lab" + i].text = "+" + count + "威望";
            this._ui["lab" + i + "_" + i].text = "剩余" + MainModel.Ins.mRoleData.getVal(cfg.f_FireworkID);
        }
    }

    private updataView(){
        this.updataCount();
        this.updataYH();
        this._ui.list.array = SFStageRewardsProxy.Ins.List;
        
        if(SpringFestivalModel.Ins.isEnroll){
            this._ui.sp1.visible = false;
            this._ui.sp2.visible = true;
        }else{
            this._ui.sp1.visible = true;
            this._ui.sp2.visible = false;
        }
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