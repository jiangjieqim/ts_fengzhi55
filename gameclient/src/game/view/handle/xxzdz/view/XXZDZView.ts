import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { StarBattleReward_req, StarStrike_req, TurnWheel_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DotManager } from "../../common/DotManager";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { PlayEffectManager } from "../../main/views/PlayEffectManager";
import { BetterEffectSpine } from "../../main/views/Sell2Spine";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { XXZDZModel } from "../model/XXZDZModel";
import { StarConfigProxy, StarWheelProxy } from "../proxy/xxzdxProxy";
import { jnctl } from "./ctl/jnctl";

export class XXZDZView extends ViewBase{
    private _ui:ui.views.xxzdz.ui_xxzdzViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    private _model:XXZDZModel;
    private _tw:Laya.Tween;
    private _isPlay:boolean;
    private _jnctl1:jnctl;
    private _jnctl2:jnctl;
    private _jnctl3:jnctl;

    private _timeCtl:TimeCtl;

    // private _animCtl:BetterEffectSpine;

    protected onAddLoadRes() {
        this.addAtlas("xxzdz.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.xxzdz.ui_xxzdzViewUI;
            this.bindClose(this._ui.btn_close);

            this._model = XXZDZModel.Ins;
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick)),
                ButtonCtl.Create(this._ui.btn_mj,new Laya.Handler(this,this.onBtnMJClick)),
                ButtonCtl.Create(this._ui.btn_shop,new Laya.Handler(this,this.onBtnShopClick)),
                ButtonCtl.Create(this._ui.btn_phb,new Laya.Handler(this,this.onBtnPHBClick)),
                ButtonCtl.Create(this._ui.btn_tz,new Laya.Handler(this,this.onBtnTZClick)),
                ButtonCtl.Create(this._ui.btn_shezhi,new Laya.Handler(this,this.onBtnSZClick)),
                ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick))
            );
            this._ui.sp.on(Laya.Event.CLICK,this,this.onSpClick);

            // ValCtl.Create(this._ui.lab1,this._ui.img1,ECellType.JingNang);
            // ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.XZJJ);
            // ValCtl.Create(this._ui.lab5,this._ui.img5,ECellType.BaoZi);

            this._tw = new Laya.Tween;

            this._jnctl1 = new jnctl(this._ui.item1);
            this._jnctl2 = new jnctl(this._ui.item2);
            this._jnctl3 = new jnctl(this._ui.item3);

            this._timeCtl = new TimeCtl(this._ui.lab_time);
            
            // let _animCtl = new BetterEffectSpine();
            // this._animCtl = _animCtl;
            // this._animCtl.setPos(this._ui,370,480);

            // LogSys.Log("==>GID:"+_animCtl['$_GID']);
            // _animCtl.once(Laya.Event.COMPLETE,this,this.onAnimCompleteHandler);
            // _animCtl.load(`o/spine/baozisell/baozisell.skel`);
        }
    }

    // private onAnimCompleteHandler(){
    // this._ui.addChild(this._animCtl.baseSkel);
    // this._animCtl.baseSkel.pos(370,480);
    // LogSys.Log("GID:"+this._animCtl['$_GID']);
    // }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("xxzdzTitle","xxzdzDec");
    }

    protected onInit(): void {
        this._model.on(XXZDZModel.UPDATA_VIEW,this,this.onUpdataView);
        this._model.on(XXZDZModel.UPDATA_RANKAWARD_VIEW,this,this.setRankRedTip);
        this._model.on(XXZDZModel.UPDATA_ZHUANPAN_VIEW,this,this.playTween);
        this._model.on(XXZDZModel.UPDATA_SHOP_VIEW,this,this.updataShop);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onValChange);

        this._isPlay = false;
        this.setAuto(false);
        this.updataView();
        if(this._model.wheelNum == 0){
            this._ui.img_zp.rotation = 0;
        }else{
            this._ui.img_zp.rotation = 36 * (this._model.wheelNum - 1);
        }
        if(this._model.isFight){
            this._model.isFight = false;
            this.setAuto(true);
        }
    }

    protected onExit(): void {
        this._model.off(XXZDZModel.UPDATA_VIEW,this,this.onUpdataView);
        this._model.off(XXZDZModel.UPDATA_ZHUANPAN_VIEW,this,this.playTween);
        this._model.off(XXZDZModel.UPDATA_RANKAWARD_VIEW,this,this.setRankRedTip);
        this._model.off(XXZDZModel.UPDATA_SHOP_VIEW,this,this.updataShop);
        MainModel.Ins.off(MainEvent.ValChangeCell,this,this.onValChange);
        this._isPlay = false;
        Laya.Tween.clearAll(this._ui.img_zp);
        this._tw.clear();
        this._timeCtl.stop();
        this._timeCtl.dispose();
        this.setAuto(false);
        // if(this._animCtl){
        // this._animCtl.stop();
        // }
        // if(this._animCtl){
        //     // this._animCtl.baseSkel.visible = false;
        //     this._animCtl.dispose();
        //     this._animCtl = null;
        // }
        E.ViewMgr.Close(EViewType.XXZDZMJView);
        E.ViewMgr.Close(EViewType.XXZDZRankView);
        E.ViewMgr.Close(EViewType.XXZDZRZView);
        E.ViewMgr.Close(EViewType.XXZDZShopView);
        E.ViewMgr.Close(EViewType.XXZDZTZView);
        E.ViewMgr.Close(EViewType.XXZDZGMView);
        E.ViewMgr.Close(EViewType.XXZDZAwardView);
        E.ViewMgr.Close(EViewType.XXZDZShopBuyView);
    }

    private onValChange(id:number){
        if(id == ECellType.JGYS){
            if(!this._isPlay){
                let val = MainModel.Ins.mRoleData.getVal(ECellType.JGYS);
                this._ui.lab6.text = val + "/" + StarConfigProxy.Ins.GetDataById(1).f_keymax;
            }
        }
    }

    private onBtnMJClick(){
        E.ViewMgr.Open(EViewType.XXZDZMJView);
    }

    private onBtnShopClick(){
        E.ViewMgr.Open(EViewType.XXZDZShopView);
    }

    private onBtnPHBClick(){
        E.ViewMgr.Open(EViewType.XXZDZRankView);
    }

    private onBtnTZClick(){
        E.ViewMgr.Open(EViewType.XXZDZTZView);
    }

    private onSpClick(){
        let req:StarBattleReward_req = new StarBattleReward_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnQDClick(){
        if(this._isAtuo){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("已关闭自动转盘");
            return;
        }
        this.sendCmd();
    }
    
    private onBtnSZClick(){
        if(this._isAtuo){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("已关闭自动转盘");
            return;
        }
        this.setAuto(true);
    }

    private _isAtuo:boolean;
    public setAuto(v:boolean){
        this._isAtuo = v;
        if(v){
            Laya.timer.frameLoop(1,this,this.onAutoHandler);
            this._ui.lab_qd.text = "启动中";
            this.sendCmd();
        }else{
            Laya.timer.clear(this,this.onAutoHandler);
            this._ui.lab_qd.text = "启动";
        }
    }

    private sendCmd(){
        if(!this._isPlay){
            let val = MainModel.Ins.mRoleData.getVal(ECellType.JGYS);
            if(!val){
                this.setAuto(false);
                let cfg = ItemProxy.Ins.getCfg(ECellType.JGYS);
                E.ViewMgr.ShowMidError(main.itemName(cfg.f_name) + "不足");//显示错误提示
            }else{
                this._ui.lab6.text = val - 1 + "/" + StarConfigProxy.Ins.GetDataById(1).f_keymax;
                let req:TurnWheel_req = new TurnWheel_req;
                SocketMgr.Ins.SendMessageBin(req);
            }
        }
    }

    private onAutoHandler() {
        this._ui.chilun.rotation += 1;
    }

    private playTween(){
        LogSys.Log("playTween....");
        this._isPlay = true;
        this._ui.img_zp.rotation = 0;
        let rot;
        if(this._model.wheelNum == 0){
            rot = 0;
        }else{
            rot = 36 * (this._model.wheelNum - 1);
        }
        this._tw.to(this._ui.img_zp,{rotation:1080 + rot},1500,Laya.Ease.sineOut,Laya.Handler.create(this,this.onComplete));
    }
    // private animIndex:number = 0;
    // private animVal:number = 0;
    private onComplete(){
        let cfg:Configs.t_Star_Wheel_dat = StarWheelProxy.Ins.GetDataById(this._model.wheelNum);
        if(!cfg){
            return;
        }

        let val;
        let arr = cfg.f_Prerob.split("-");
        if(arr.length == 1){
            val = parseInt(arr[0]);
        }else{
            val = parseInt(arr[1]);
        }
        let index = 0;
        switch (cfg.f_rewardstype){
            case 1:
                index = 4;
                break;
            case 2:
                index = 3;
                break;
            case 3:
                index = 1;
                break;
            case 4:
                index = 0;
                break;
            case 5:
                index = 2;
                break;
        }


        PlayEffectManager.Ins.playStarWar("o/spine/baozisell/baozisell.skel",this._ui,370,480,val,index,this,this.onAniComplete);

        // this.animIndex = index;
        // this.animVal = val;

        // if(this._animCtl.isLoaded){
        //     // this._animCtl.baseSkel.visible = true;
        //     // this._animCtl.xxzdz(val,index,this,this.onAniComplete);
        //     this.onAnimComplete(val,index);
        // }else{
        //     Laya.timer.frameLoop(1,this,this.onCheckLoopHandler);
        // }
    }

    // private onCheckLoopHandler(){
    //     console.log("aaaaaaaaaaaaaa!"  + this._animCtl.isLoaded);
    //     if(this._animCtl.isLoaded){
    //         Laya.timer.clear(this,this.onCheckLoopHandler);
    //         console.log("aaaaaaaaaaaaaa!");
    //         this.onAnimComplete(this.animVal,this.animIndex);
    //     }
    // }

    // private onAnimComplete(val:number,index:number){
    //     // this._animCtl.baseSkel.visible = true;
    //     this._animCtl.xxzdz(val,index,this,this.onAniComplete);
    // }

    private onAniComplete(){
        this._isPlay = false;
        this.updataView();
        let cfg:Configs.t_Star_Wheel_dat = StarWheelProxy.Ins.GetDataById(this._model.wheelNum);
        if(!cfg){
            return;
        }
        if(cfg.f_rewardstype != 1){
            if(this._isAtuo){
                this.sendCmd();
            }
        }else{
            if(this._isAtuo){
                this._model.isFight = true;
            }
            let req:StarStrike_req = new StarStrike_req;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onUpdataView(){
        this.updataView();
    }

    private updataView(){
        for(let i:number=0;i<3;i++){
            let obj:any = {};
            if(this._model.silkBags[i]){
                obj.data = this._model.silkBags[i];
            }else{
                obj.data = null;
            }
            this["_jnctl" + (i + 1)].setData(obj,true,true);
        }

        if(this._model.rewardList.length){
            this._ui.sp.visible = true;
            this._ui.img3.skin = IconUtils.getIconByCfgId(this._model.rewardList[0].id);
            this._ui.lab3.text = this._model.rewardList[0].count + "";
        }else{
            this._ui.sp.visible = false;
        }

        this._ui.img4.skin = IconUtils.getIconByCfgId(ECellType.XingXing);
        this._ui.lab4.text = this._model.starNum + "";
        if(this._model.ranking > 200){
            this._ui.lab_phb.text = "200+";
        }else{
            this._ui.lab_phb.text = this._model.ranking + "";
        }
        this._ui.lab_xh.text = StarConfigProxy.Ins.GetDataById(1).f_precost.split("-")[1];

        let time = this._model.keyRecoveryUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }

        if(this._model.isZhuanPanRedTip()){
            DotManager.addDot(this._ui.btn_qd);
        }else{
            DotManager.removeDot(this._ui.btn_qd);
        }
        this.setRankRedTip();

        let val = MainModel.Ins.mRoleData.getVal(ECellType.JingNang);
        this._ui.img1.skin = IconUtils.getIconByCfgId(ECellType.JingNang);
        this._ui.lab1.text = StringUtil.val2m(val);
        val = MainModel.Ins.mRoleData.getVal(ECellType.BaoZi);
        this._ui.lab5.text = StringUtil.val2m(val);
        this._ui.img5.skin = IconUtils.getIconByCfgId(ECellType.BaoZi)

        this._ui.img6.skin = IconUtils.getIconByCfgId(ECellType.JGYS);
        val = MainModel.Ins.mRoleData.getVal(ECellType.JGYS);
        this._ui.lab6.text = val + "/" + StarConfigProxy.Ins.GetDataById(1).f_keymax;
    }

    private setRankRedTip(){
        if(this._model.isRankAwardRedTip()){
            DotManager.addDot(this._ui.btn_phb);
        }else{
            DotManager.removeDot(this._ui.btn_phb);
        }
        this._ui.img2.skin = IconUtils.getIconByCfgId(ECellType.XZJJ)
        let val = MainModel.Ins.mRoleData.getVal(ECellType.XZJJ);
        this._ui.lab2.text = StringUtil.val2m(val);
    }
    
    private updataShop(){
        let val = MainModel.Ins.mRoleData.getVal(ECellType.JingNang);
        this._ui.lab1.text = StringUtil.val2m(val);
        val = MainModel.Ins.mRoleData.getVal(ECellType.XZJJ);
        this._ui.lab2.text = StringUtil.val2m(val);
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal) + "后恢复" ;
        this._timeCtl.setText(time_str);
     }

     private endTime(){
        this._timeCtl.setText("");
     }
}