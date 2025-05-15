import { RandomUtil } from "../../../../../frame/util/RandomUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { AllianceWarBounsEnd_req, AllianceWarEnterActivity_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMainView } from "../../avatar/AvatarMainView";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { EAnimEvent, EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { t_Box_AnimationRate } from "../../main/views/new2/AvatarFight";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { AllianceWarBounsProxy, AllianceWarConfig } from "../proxy/AllianceFightProxy";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

export class AllianceFightAwardView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightAwardViewUI;
    protected autoFree: boolean = true;
    protected mMask = true;
    protected mMainSnapshot = true;
    protected mMaskClick: boolean = false;

    private _timeCtl:TimeCtl;
    private _eff:SimpleEffect;
    private _djsEff:SimpleEffect;
    private _index:number;
    private _ClickNum:number;
    private _avatar:AvatarMainView;
    private _bossAv:AvatarMonsterView;
    private _isClick:boolean;
    private _ctl1:FontClipCtl;
    private _tw:Laya.Tween;

    private _avatar1:AvatarMainView;
    private _avatar2:AvatarMainView;
    private _avatar3:AvatarMainView;
    private _avatar4:AvatarMainView;
    private _avatar5:AvatarMainView;

    protected onAddLoadRes() {
        this.addAtlas('allianceFight.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightAwardViewUI;

            this._timeCtl = new TimeCtl(this._ui.lab_time);
            let time_str = TimeUtil.subTime(parseInt(AllianceWarConfig.Ins.getCfg().f_BounsGameTime));
            this._timeCtl.setText(time_str);
            this._ui.lab.text = "快速点击战鼓";

            this._index = 0;
            this._ClickNum = 0;
            this._eff = new SimpleEffect(this._ui.sp, `o/spine/boxgulv14big/boxgulv14big`,0,0,1.0);
            this._ui.sp.scale(0.8,0.8);
            this._eff.play(0,true);
            this._ui.sp_click.on(Laya.Event.CLICK,this,this.onClick);
            
            this._avatar = AvatarFactory.getStandHorseMainAvatar();
            this._avatar.dir = EAvatarDir.Right;
            this._ui.sp_my.addChild(this._avatar);

            let key = AllianceWarBounsProxy.Ins.List[0].f_Res;
            this._bossAv = AvatarFactory.createBossMonster(`o/spine/${key}/${key}`);
            this._bossAv.play(EAvatarAnim.NormalStand);
            this._ui.sp_boss.addChild(this._bossAv);
            this._ui.sp_boss.scale(1.5,1.5);

            this._isClick = false;
            this._ctl1 = new FontClipCtl(IconUtils.afAtlasPrefix);
            this._tw = new Laya.Tween;

            this._djsEff = new SimpleEffect(this._ui.sp_djs, `o/spine/uidaojishi/uidaojishi`,0,0,1.0);
            this._djsEff.play(0,false,this,this.effEnd);
        }
    }

    private effEnd(){
        this._djsEff.stop();
        this._isClick = true;
        this.refreshTime();
    }

    private onClick(){
        if(!this._isClick)return;
        this._ClickNum ++;
        this._ctl1.setValue(this._ui.sp_num,this._ClickNum.toString(),"middle");
        this._ui.sp_num.scaleX = this._ui.sp_num.scaleY = 1;
        this._tw.to(this._ui.sp_num,{scaleX:1.5,scaleY:1.5},200,Laya.Ease.sineOut,Laya.Handler.create(this,this.onComplete));
        this.playAvatat();
        this.playAnim();
    }

    private onComplete(){
        this._tw.to(this._ui.sp_num,{scaleX:1,scaleY:1},200,Laya.Ease.sineOut);
    }

    private curTime:number = 0;
    private readonly delayTime:number = 500;
    private isDoubleHit:boolean = false;
    private _flag:boolean = false;
    private playAvatat(){
        if(!this._flag){
            this._flag = true;
            this.myAtk();
        }else{
            let sub = Laya.timer.currTimer - this.curTime;
            if(sub < this.delayTime){
                this.isDoubleHit = true;
                Laya.timer.once(this.delayTime,this,this.freeDoubleHit);
            }else{
                this.curTime = Laya.timer.currTimer;
            }
        }
    }

    private freeDoubleHit(){
        this.isDoubleHit = false;
    }

    private myAtk() {
        if(this._avatar){
            let anim = t_Box_AnimationRate.Ins.getRandomVal();
            this._avatar.playOnce(anim, this, this.playEnd);
        }
    }

    /**攻击结束 */
    private playEnd() {
        if (this.isDoubleHit) {
            this.myAtk();
        } else {
            this._avatar.play(EAvatarAnim.Stand);
            this._flag = false;
        }
    }

    private playAnim(){
        if(this._eff.anim.curIndex != 0){
            return;
        }
        this._index ++;
        let index = this._index % 2;
        if(index == 0){
            index = 2;
        }
        this._eff.play(index,false,this,this.onEnd);
    }

    private onEnd(){
        this._eff.play(0,true);
    }

    private _num = 0;
    private _animList = [3,5,23];
    private _animList1 = [4,6,24];
    private _ran:number;
    private onAvatarLabel(e){
        if(this._animList.indexOf(this._bossAv.curAnim) != -1){
            return;
        }
        if(this._animList1.indexOf(this._bossAv.curAnim) != -1){
            return;
        }
        let animEvent:string = e.name;
        let num = AllianceWarConfig.Ins.getCfg().f_BossHitBackTimes;
        if (animEvent == EAnimEvent.HitAnim) {
            this._num ++;
            if(this._num % num == 0){
                this._ran = RandomUtil.RandomRoundInt(0,3);
                this._bossAv.playOnce(this._animList[this._ran], this, this.onAttack);
            }else{
                this._bossAv.playOnce(EAvatarAnim.Hit, this, this.onFightHit);
            }
        }
       
    }

    private onAttack(){
        this._bossAv.playOnce(this._animList1[this._ran], this, this.onFightHit);
    }

    private onFightHit(){
        this._bossAv.play(EAvatarAnim.Stand);
    }

    protected onInit(): void {
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_SKIN,this,this.setAv);
        this._avatar.on(Laya.Event.LABEL,this,this.onAvatarLabel);
        let req:AllianceWarEnterActivity_req = new AllianceWarEnterActivity_req;
        req.type = 4;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_SKIN,this,this.setAv);
        this._avatar.off(Laya.Event.LABEL,this,this.onAvatarLabel);
        this._timeCtl.dispose();
        if(this._eff){
            this._eff.dispose();
        }
        this._eff = null;
        if(this._djsEff){
            this._djsEff.dispose();
        }
        this._djsEff = null;
        if(this._avatar){
            this._avatar.dispose();
        }
        this._avatar = null;
        if(this._bossAv){
            this._bossAv.dispose();
        }
        this._bossAv = null;

        for(let i:number=1;i<6;i++){
            if(this["_avatar" + i]){
                this["_avatar" + i].dispose();
            }
            this["_avatar" + i] = null;
        }
        Laya.Tween.clearAll(this._ui.sp_num);
        this._tw.clear();
    }

    private refreshTime(){
        let t = parseInt(AllianceWarConfig.Ins.getCfg().f_BounsGameTime);
        this._timeCtl.start(t,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
    }
    
    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime(){
        this._isClick = false;
        this._timeCtl.setText("00:00");
        let req:AllianceWarBounsEnd_req = new AllianceWarBounsEnd_req;
        req.num = this._ClickNum;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private setAv(){
        for(let i:number=1;i<6;i++){
            if(AllianceFightModel.Ins.skinList[i]){
                this["_avatar" + i] = AvatarFactory.createAvatarByStSkin(AllianceFightModel.Ins.skinList[i]);
                this["_avatar" + i].dir = EAvatarDir.Right;
                let ran = RandomUtil.RandomRoundInt(0,2);
                this["_avatar" + i].play(44 + ran);
                this._ui["sp"+i].addChild(this["_avatar" + i]);
            }
        }
    }
}