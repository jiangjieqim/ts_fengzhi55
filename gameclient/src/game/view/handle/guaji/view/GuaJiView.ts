import { TimeCtlMs } from "../../../../../frame/util/ctl/TimeCtlMs";
import {RandomUtil} from "../../../../../frame/util/RandomUtil";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AfkInviteeTimeUp_req, AfkPackTimeUp_req, AfkRefresh_req, AfkReward_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import {DotManager} from "../../common/DotManager";
import { Enemy_ImageProxy } from "../../main/model/AdventureProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { GuaJiModel } from "../model/GuaJiModel";
import { GuaJiCfgProxy, GuaJiPackProxy, GuaJiRewardsProxy } from "../proxy/GuaJiProxy";

export class GuaJiView extends ViewBase{
    private _ui:ui.views.guaji.ui_guajiUI;
    protected mMask = true;
    protected autoFree = true;
    protected mMainSnapshot:boolean = true;
    private _timeCtl:TimeCtlMs;
    private _timeCtl1:TimeCtlMs;

    private _timeCtl21:Laya.Timer;
    private _timeCtl22:Laya.Timer;
    private _timeCtl23:Laya.Timer;
    private _timeCtl24:Laya.Timer;
    private _timeCtl3:Laya.Timer;

    // private _tw1:Laya.Tween;
    // private _tw2:Laya.Tween;

    protected onAddLoadRes() {
        this.addAtlas('guaji.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.guaji.ui_guajiUI;
            this.bindClose(this._ui.close1);
            let btn_time:ButtonCtl = ButtonCtl.Create(this._ui.btn_time,new Laya.Handler(this,this.onBtnTimeClick));
            let tqBtnCtl:ButtonCtl = ButtonCtl.Create(this._ui.img_tq,new Laya.Handler(this,this.onBtnTQClick));
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn_lq,new Laya.Handler(this,this.onBtnLQClick)),
            btn_time,
            ButtonCtl.Create(this._ui.btn_zc,new Laya.Handler(this,this.onBtnZCClick)),
            tqBtnCtl
            );

            this._ui.list.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.itemRender);

            this._timeCtl = new TimeCtlMs(this._ui.lab_time2);
            this._timeCtl1 = new TimeCtlMs(this._ui.lab_btnTime);

            for(let i:number = 1; i<6;i++){
                this["_timeCtl2" + i] = new Laya.Timer;
            }
            this._timeCtl3 = new Laya.Timer;
            // this._tw1 = new Laya.Tween;
            // this._tw2 = new Laya.Tween;
            if(MainModel.Ins.isVerify){
                btn_time.visible = false;
            }
            if(t_Platform.Ins.isHideAdImg || MainModel.Ins.isVerify){
                this.UI.height -= (this._ui.img_tq.height + 20);
                tqBtnCtl.visible = false;
            }
        }
    }

    private onBtnTQClick(){
        E.ViewMgr.Open(EViewType.ZhongShenKa);
    }

    // private _myAvatar:AvatarMonsterView;
    // private _avatar:AvatarMonsterView;
    protected onInit() {
        // MainModel.Ins.mainMask = true;
        this._count = -1;
        GuaJiModel.Ins.on(GuaJiModel.UPDATA_VIEW,this,this.onUpdataView);
        GuaJiModel.Ins.on(GuaJiModel.UPDATA_KUAISUVIEW,this,this.updataFree);
        let req:AfkRefresh_req = new AfkRefresh_req();
        SocketMgr.Ins.SendMessageBin(req);

        // this.tweenPlay();
        // this.tween1();
        // this._myAvatar = AvatarFactory.getFightMainAvatar(EAvatarDir.Right,0,MainModel.Ins.wingId,false);
        // this._myAvatar.reset();
        // this._myAvatar.play(EAvatarAnim.Move)
        // this._ui.role.addChild(this._myAvatar);
        
        // this._avatar = AvatarFactory.createFightMonsterAvatar(EAvatarDir.Left,0,0,false);
        // this._avatar.reset();
        // this._ui.role1.addChild(this._avatar);
        // Laya.timer.once(2000,this,this.avatarMove);
    }

    // private tween1(){
    //     this._ui.img_m.x = 0;
    //     this._ui.img_m1.x = this._ui.img_m1.width - 1;
    //     this._tw1.to(this._ui.img_m,{x:-this._ui.img_m.width},8000,null,Laya.Handler.create(this,this.onTween1,[this._ui.img_m.width - 1,0]));
    //     this._tw2.to(this._ui.img_m1,{x:0},8000,null,Laya.Handler.create(this,this.onTween2,[0,-this._ui.img_m.width]));
    // }

    // private onTween1(wid:number,xx:number){
    //     this._ui.img_m.x = wid;
    //     this._tw1.to(this._ui.img_m,{x:xx},8000,null,Laya.Handler.create(this,this.onTween1,[0,-this._ui.img_m.width]));
    // }

    // private onTween2(wid:number,xx:number){
    //     this._ui.img_m1.x = wid;
    //     this._tw2.to(this._ui.img_m1,{x:xx},8000,null,Laya.Handler.create(this,this.onTween2,[this._ui.img_m.width - 1,0]));
    // }

    // private avatarMove(){
    //     let ran:number = RandomUtil.RandomRoundInt(1,60);
    //     let cfg = Enemy_ImageProxy.Ins.getCfg(ran);
    //     if(this._avatar){
    //         this._avatar.mSkin = Enemy_ImageProxy.Ins.toTSkin(cfg);
    //         this._avatar.visible = true;
    //         this._avatar.moveX(-160,2000,Laya.Handler.create(this,this.moveAvEnd),EAvatarAnim.NormalStand);
    //         this._avatar.play(EAvatarAnim.NormalStand);
    //     }
    // }

    // private moveAvEnd(){
    //     let offX = this._ui.role1.x - this._ui.role.x;
    //     if(this._myAvatar){
    //         this._avatar.play(EAvatarAnim.Stand);
    //         this._myAvatar.moveX(offX - 230,500,Laya.Handler.create(this,this.moveEnd),EAvatarAnim.Move);
    //     }
    //     this._tw1.pause();
    //     this._tw2.pause();
    // }

    // private moveEnd(){
    //     if(!this._myAvatar)return;
    //     this._myAvatar.playOnce(EAvatarAnim.Attack, this, this.onAttackEnd);
    // }

    // private onAttackEnd(){
    //     if(!this._myAvatar)return;
    //     this._myAvatar.playOnce(EAvatarAnim.Attack2, this, this.onAttackEnd1);
    //     this.onDie();
    //     // Laya.timer.once(1,this,this.onDie);
    // }

    // private onDie(){
    //     if(this._avatar){
    //         this._avatar.playOnce(EAvatarAnim.Die, this, this.onAttackEnd2);
    //     }
    // }

    // private onAttackEnd1(){
    //     if(!this._myAvatar)return;
    //     this._myAvatar.play(EAvatarAnim.Stand);
    // }

    // private onAttackEnd2(){
    //     if(this._avatar){
    //         this._tw1.resume();
    //         this._tw2.resume();
    //         this._avatar.stop();
    //         this._avatar.visible = false;
    //         this._avatar.setPos(0,0);
    //         if(this._myAvatar){
    //             this._myAvatar.moveX(0,100);
    //         }
    //         this._myAvatar.play(EAvatarAnim.Move);
    //         let tt = GuaJiCfgProxy.Ins.GetDataById(1).f_EnemyCD * 1000;
    //         Laya.timer.once(tt,this,this.avatarMove);
    //     }
    // }

    protected onExit() {
        // MainModel.Ins.mainMask = false;
        GuaJiModel.Ins.off(GuaJiModel.UPDATA_VIEW,this,this.onUpdataView);
        GuaJiModel.Ins.off(GuaJiModel.UPDATA_KUAISUVIEW,this,this.updataFree);
        this._timeCtl.stop();
        this._timeCtl1.stop();
        Laya.timer.clear(this,this.onTimer);
        for(let i:number = 1; i<6;i++){
            this["_timeCtl2" + i].clear(this,this.sendCmd);
        }
        this._timeCtl3.clear(this,this.sendCmd3);
        // Laya.timer.clear(this,this.avatarMove);
        // if(this._avatar){
        //     this._avatar.dispose();
        //     this._avatar = null;
        // }
        // if(this._myAvatar){
        //     this._myAvatar.dispose();
        //     this._myAvatar = null;
        // }
        
        // Laya.Tween.clearAll(this._ui.img_m);
        // Laya.Tween.clearAll(this._ui.img_m1);
        // this._tw1.clear();
        // this._tw2.clear();
    }

    private onBtnLQClick(){
        let req:AfkReward_req = new AfkReward_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnTimeClick(){
        E.ViewMgr.Open(EViewType.GUAJIADDTIME);
    }

    private onBtnZCClick(){
        E.ViewMgr.Open(EViewType.GUAJIkUAISU);
    }

    private itemRender(item:ui.views.main.ui_slot_itemUI){
        ItemViewFactory.refreshSlot(item,item.dataSource);
    }

    private setSend(){
        for(let i:number = 1; i<6;i++){
            this["_timeCtl2" + i].clear(this,this.sendCmd);
        }
        for(let i:number=0;i<GuaJiModel.Ins.inviteeData.length;i++){
            let tt = GuaJiModel.Ins.inviteeData[i].endUnix - TimeUtil.serverTime;
            if(tt > 0){
                this["_timeCtl2" + (i + 1)].once(tt,this,this.sendCmd);
            }
        }

        this._timeCtl3.clear(this,this.sendCmd3);
        let t = GuaJiModel.Ins.packEndUnix - TimeUtil.serverTime;
        if(t > 0){
            this._timeCtl3.once(t,this,this.sendCmd3);
        }
    }

    private sendCmd(){
        let req:AfkInviteeTimeUp_req = new AfkInviteeTimeUp_req();//被邀请者到期
        SocketMgr.Ins.SendMessageBin(req);
    }

    private sendCmd3(){
        let req:AfkPackTimeUp_req = new AfkPackTimeUp_req();//购买礼包到期
        SocketMgr.Ins.SendMessageBin(req);
    }

    private updataFree(){
        if(GuaJiModel.Ins.isFree()){
            DotManager.addDot(this._ui.btn_zc);
        }else{
            DotManager.removeDot(this._ui.btn_zc);
        }
    }

    private _time:number;
    private _cfg:Configs.t_AFK_Rewards_dat;
    private onUpdataView(){

        this.setSend();
        this.updataFree();

        this._ui.lab_lv.text = "LV." + GuaJiModel.Ins.mianData.level;
        this._cfg = GuaJiRewardsProxy.Ins.getCfgByLv(GuaJiModel.Ins.mianData.level);
        let arrTime = this._cfg.f_AFKReward.split("|");
        for(let i:number=0;i<2;i++){
            this._ui["lab" + (i+1)].text = parseInt(arrTime[i].split("-")[1])/10 + "/分钟";
            this._ui["icon" + (i+1)].skin = IconUtils.getIcon(arrTime[i].split("-")[0]);
        }
        this.onTimer();

        DotManager.removeDot(this._ui.btn_lq);
        this._timeCtl.stop();
        this._time = GuaJiModel.Ins.mianData.endUnix.toNumber() - TimeUtil.serverTimeMS;
        if(this._time > 0){
            this._timeCtl.start(this._time,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
        }else{
            this.endTime();
        }

        let time = TimeUtil.serverTimeMS - GuaJiModel.Ins.mianData.startUnix.toNumber();
        if(time > this._cfg.f_RewardsInterval * 1000){
            this._ui.btn_lq.visible = true;
            this._ui.btn_gray.visible = false;
            this._timeCtl1.stop();
        }else{
            this._ui.btn_lq.visible = false;
            this._ui.btn_gray.visible = true;
            this._timeCtl1.start(this._cfg.f_RewardsInterval * 1000 - time,new Laya.Handler(this,this.onUpdateTime1),new Laya.Handler(this,this.endTime1));
        }
    }

    private onUpdateTime1(){
        let t = Math.floor(this._timeCtl1.tickVal/1000);
        let time_str = TimeUtil.subTime(t)
        this._timeCtl1.setText(time_str);
    }

    private endTime1(){
        this._ui.btn_lq.visible = true;
        this._timeCtl1.setText("");
        this._ui.btn_gray.visible = false;
        this._timeCtl1.stop();
    }

    private onUpdateTime(){
        let time = GuaJiCfgProxy.Ins.GetDataById(1).f_AFKTimeLimit;
        time += GuaJiModel.Ins.inviteeData.length * GuaJiCfgProxy.Ins.GetDataById(1).f_SingleFriendHelpTime;
        if(GuaJiModel.Ins.packEndUnix > TimeUtil.serverTime){
            time += GuaJiPackProxy.Ins.GetDataById(1).f_Item;
        }
        let tt= Math.floor(this._timeCtl.tickVal/1000);
        let time_str = TimeUtil.subTime(tt)
        this._timeCtl.setText(time_str);
        let t = tt / time;
        this._ui.pro.width = t * 215;
    }

    private endTime(){
        DotManager.addDot(this._ui.btn_lq);
        this._ui.pro.width = 0;
        this._timeCtl.setText("");
        this._timeCtl.stop();
    }

    private onTimer(){
        let time:number;
        let t = TimeUtil.serverTimeMS - GuaJiModel.Ins.mianData.endUnix.toNumber();
        if(t >= 0){
            time = GuaJiModel.Ins.mianData.endUnix.toNumber() - GuaJiModel.Ins.mianData.startUnix.toNumber();
            Laya.timer.clear(this,this.onTimer);
        }else{
            time = TimeUtil.serverTimeMS - GuaJiModel.Ins.mianData.startUnix.toNumber();
            Laya.timer.once(1000,this,this.onTimer);
        }
        if(time < 0){
            this._ui.lab_time1.text = "";
        }else{
            this._ui.lab_time1.text = TimeUtil.subTime(Math.floor(time/1000));
        }
        let tt = this._cfg.f_RewardsInterval*1000
        let count = Math.floor(time / tt);
        this.setReward(count);
    }

    private _count:number;
    private setReward(count:number){
        if(this._count == count)return;
        this._count = count;
        if(this._count <= 0){
            this._ui.list.array = [];
        }else{
            let array = [];
            let arr = this._cfg.f_AFKReward.split("|");
            for(let ele of arr){
                let vo:ItemVo = new ItemVo();
                vo.cfgId = parseInt(ele.split("-")[0]);
                vo.count = parseInt(ele.split("-")[1]) * this._count;
                array.push(vo);
            }
            this._ui.list.array = array;
        }
    }
}