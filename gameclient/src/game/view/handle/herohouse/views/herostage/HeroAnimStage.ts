import { LogSys } from "../../../../../../frame/log/LogSys";
import { TimeUtil } from "../../../../../../frame/util/TimeUtil";
import { HrefUtils } from "../../../../../../InitConfig";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../../avatar/AvatarMonsterView";
import { HeroDebugView } from "../../../avatar/DebugAvatarUtil";
import { EAvatarAnim } from "../../../avatar/vos/EAvatarAnim";
import { HeroHouseModel } from "../../HeroHouseModel";
import { GymEvent } from "../../model/GymEvent";
import { GymInviteVo, GymSkinVo } from "../../model/GymInviteVo";
import { t_Gym_NPC_Image } from "../../model/GymProxy";
import { HeroHouseMainView } from "../HeroHouseMainView";

/**武馆控制器 */
export class HeroAnimStage{
    container:Laya.Sprite;

    // public smallPeople:Laya.Image;
    private isClearRes:boolean = false;//是否clearRes清理动作资源
    private vo:GymInviteVo;
    private heroAvatar:AvatarMonsterView;
    private debugView:HeroDebugView;
    // private mainHeroView:HeroHouseMainView;
    // private notAnim:NotAnimStage = new NotAnimStage();
    constructor(){
        // this.container = aniCon;
        // aniCon:Laya.Sprite
        this.container = new Laya.Sprite();
        this.container.on(Laya.Event.DISPLAY,this,this.onDisplay);
        this.container.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
        // this.mainHeroView = E.ViewMgr.Get(EViewType.HeroHouse) as HeroHouseMainView;
    }
    removeSelf(){
        this.container.removeSelf();
    }
    private onDisplay(){
        HeroHouseModel.Ins.on(GymEvent.InvitePopUpdate,this,this.updateAvatar);
        HeroHouseModel.Ins.on(GymEvent.RemovePop,this,this.updateAvatar);
        this.updateAvatar();
        // this.notAnim.stop();
    }
    private onUnDisplay(){
        if(!HeroHouseModel.Ins.autoCtl.isAuto){
            HeroHouseModel.Ins.off(GymEvent.InvitePopUpdate,this,this.updateAvatar);
            HeroHouseModel.Ins.off(GymEvent.RemovePop,this,this.updateAvatar);
            this.clearRes();
        }
        // this.notAnim.start(this.vo);
    }

    // private animIndex:number;
    /**已经演武的时间秒*/
    // private offsetTime:number = 0;
    private initDebug(){
        if (HrefUtils.getVal("debug")) {
            if (!this.debugView) {
                this.debugView = new HeroDebugView();
            }
            this.container.addChild(this.debugView);
            this.debugView.avatar = this.heroAvatar;
        }
    }
    private updateAvatar() {
        /*if(!this.container.displayedInStage){
            return;
        }*/
        let vo:GymInviteVo = HeroHouseModel.Ins.animInviteVo;
        this.vo = vo;
        if(!vo){
            this.stop();//没有可以播放的动画
            return;
        }
        if (!this.heroAvatar) {
            this.heroAvatar = AvatarFactory.createHeroAvatar(E.gameAdapter.heroAnim);
            this.container.addChild(this.heroAvatar);
            this.initDebug();
        }

        //开始播放动画
        let _skinVo:GymSkinVo = vo.getSkinVo();
        let cfg:Configs.t_Gym_NPC_Image_dat = _skinVo.imgCfg;
        
        // this.heroAvatar.visible = true;
        this.heroAvatar.reset();
        this.heroAvatar.mSkin = t_Gym_NPC_Image.Ins.getStSkin(cfg);
        // this.smallPeople.skin = "";
        this.smallPeopleSkin = "";
        this.drumVisible = true;
        // this.heroAvatar.spine.currentTime  = 2.5;//this.heroAvatar.duration/2;

        this.heroAvatar.spineload(this,this.onSpineComplete);
        // LogSys.Log("动画的时间:"+animTotalTime+"秒");
        // this.heroAvatar.currentTime = this.heroAvatar.duration * 0.5;//this._animConfig.getTimeByIndex(animIndex) * 0.5;
    }
    /**动作播放结束 */
    private onAnimPlayComplete(){
        if(this.isClearRes){
            return;
        }

        let useTime:number = 0;
        if(!this.vo.isTimeEnd){
            useTime = this.vo.subTime;
        }
        Laya.timer.clear(this,this.end);
        Laya.timer.once(useTime,this,this.end);
        // this.end();
    }

    private end(){
        // LogSys.Log(`onAnimPlayComplete 动画播放结束,${this.vo.uid.toString()},是否结束:${this.vo.isTimeEnd},剩余${this.vo.subTime}毫秒`);

        this.showReward();
        this.updateAvatar();
    }


    private onSpineComplete(){
        let vo:GymInviteVo = this.vo;//HeroHouseModel.Ins.animInviteVo;
        if(!vo || !this.heroAvatar){
            return;
        }
        let _skinVo:GymSkinVo = vo.getSkinVo();
        //还剩余多少时间(毫秒)
        let sub:number = _skinVo.endTime.toNumber() - TimeUtil.serverTimeMS;
        if(sub <= 0){
            this.stop();
            return;
        }

        let cfg:Configs.t_Gym_NPC_Image_dat = _skinVo.imgCfg;

        let animIndex = E.gameAdapter.getHeroAnimIndex(cfg.f_AnimIndex);

        let animTotalTime = cfg.f_SingleAnimeTime;// - _skinVo.speedUpTime;//_skinVo.animTotalTime;

        if(sub > animTotalTime){
            sub = animTotalTime;
        }

        //动画播放的速率
        let rate:number = animTotalTime/(animTotalTime-_skinVo.speedUpTime);
        if(this.debugView) this.debugView.rate = rate;
        //真实的总播放时长
        let realTotalTime = animTotalTime / rate;
        let offsetTime = realTotalTime - sub;

        LogSys.Log("uid:"+vo.uid +','+vo.fullName + " 已经播放了" + offsetTime + "毫秒," + `整个动作时长${realTotalTime}毫秒 剩余时间${sub}毫秒 播放进度为${(offsetTime/realTotalTime).toFixed(2)}`);

        // let animIndex = EAvatarAnim.WoodStand;
        // this.animIndex = animIndex;
        
        this.heroAvatar.play(animIndex,this,this.onAnimPlayComplete,null,true);
        this.isClearRes = false;
        this.heroAvatar.coreSpine.playbackRate(rate);
        let duration = this.heroAvatar.duration;
/*
        let percent = sub / (duration * 1000);
        if (percent > 1) {
            let p = 1 / percent;
            // LogSys.Log("动作速率,前端调整为:" + p);
            this.heroAvatar.coreSpine.playbackRate(p);
            percent = 1;
        }
        // this.heroAvatar.currentTime = duration * (1 - percent);
*/

        let per = offsetTime/realTotalTime;  
        let curTime = duration * (per > 1 ? 1 : per);
        
        if(curTime > this.heroAvatar.duration){
            curTime = Math.floor(this.heroAvatar.duration);
        }
        // curTime = 10;
        this.heroAvatar.currentTime = curTime;

        // LogSys.Log(`当前的动作${this.heroAvatar.curAnim}的总时间${duration}秒`);
    }
    /**停止动作,显示为稻草人状态 */
    private stop(){
        this.clearRes();
        this.showReward();
    }
    public showReward(){
        if(this.vo){
            HeroHouseModel.Ins.autoCtl.check(this.vo);
        }
    }
    private clearRes(){
        this.isClearRes = true;
        if(this.heroAvatar){
            this.heroAvatar.play(EAvatarAnim.WoodStand);
            this.heroAvatar.stop();
            this.heroAvatar.dispose();
            this.heroAvatar = null;
        }else{
            this.smallPeopleSkin = "remote/hero_house/jr.png";
        }
        this.drumVisible = false;
    }

    private set smallPeopleSkin(url:string){
        let type = EViewType.HeroHouse;
        if(E.ViewMgr.isOpenReg(type)){
            let view = E.ViewMgr.Get(type) as HeroHouseMainView;
            // view._ui.fightGuBtn.skin = url;
            E.gameAdapter.updatedummuSkin(view._ui.fightGuBtn,url);
        }
    }

    private set drumVisible(v){
        let type = EViewType.HeroHouse;
        if(E.ViewMgr.isOpenReg(type)){
            let view = E.ViewMgr.Get(type) as HeroHouseMainView;
            view.drumVisible = v;
        }
    }   
}