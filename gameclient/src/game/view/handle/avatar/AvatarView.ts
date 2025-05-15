import { DrawCallConfig } from "../../../DrawCallConfig";
import { ResPath } from "../../../resouce/ResPath";
import { War3Config } from "../../../war3/War3Config";
import { Mount_ListProxy } from "../zuoqi/vos/ZuoqiProxy";
import { AvatarBloodSpine } from "./AvatarBloodSpine";
import { AvatarBuffer } from "./AvatarBuffer";
import { AvatarConfig } from "./AvatarConfig";
import { AvatarEvent } from "./AvatarEvent";
import { AvatarFactory } from "./AvatarFactory";
import { IAvatarBaseCtl } from "./ctl/AnimShowCtl";
import { FashionModel } from "./fashionModel";
import { FightPureAnim } from "./spine/FightPureAnim";
import { SpineCoreSkel } from "./spine/SpineCoreSkel";
import { AtlasParser, IMSpineRegions } from "./SpineSwitchSkin";
import { EAvatarAnim } from "./vos/EAvatarAnim";
/**
 * 方向
 */
export enum EAvatarDir{
    Left = 1,
    Right = -1,
}
export enum EBloodParent{
    /**是否是自身的父对象 */
    Self = 1,
	/**Avatar的父对象*/
    Parent = 2
}
/**
0_受击特效
1_受暴击特效
2_回血特效
3_吸血特效
4_普通伤害数字飘字
5_暴击伤害数字飘字
6_回血数字飘字
7_吸血数字飘字
8_暴击飘字
9_反击飘字
10_连击飘字
11_闪避飘字
12_击晕飘字

 */
export enum EAvatarEffectAnim{
    NormalAtk = 0,// 受到普通攻击特效
    
    CsAtk = 1,//暴击特效 

    HuiFuBlood = 2,//角色血量回复

    AddBlood = 3,//吸血特效
    NormalBloodTxt = 4,//4_普通伤害数字飘字(-)
    
    CsBloodTxt = 5,  //5_暴击伤害数字飘字
    
    HuiFuBloodTxt = 6,//血量回复飘字
    
    SuckBloodTxt = 7,//7_吸血数字飘字

    /**暴击飘字*/
    Cs = 8,
    
    /** 反击飘字*/    
    StrikeBackTxt = 9,

    Lianji = 10,//连击飘字
    Dodge = 11,//闪避

    JiYunTxt = 12,//击晕

    //13 利器 14钝器 15治疗 16增益 17减益 18复活

    /**增益 */
    AddEffect = 16,
    /* 17减益*/
    SubEffect = 17,
    
    /**格挡动画 */
    ShoveAside = 20
}

export enum ESkillActionAnim{
    NormalAtk = 0,//普通攻击特效
    CsAtk = 1,//暴击攻击特效
    /** 眩晕特效*/
    Vertigo = 2,
}


export class AvatarView extends Laya.Sprite{
    /**主要形象id 此字段有值的时候代表全骨骼换装,魔兽的方式*/
    imageID:number;
    bloodParentType:EBloodParent = EBloodParent.Parent;
    // cacheUse:boolean;
    private _curDir:EAvatarDir;
    /**是否在移动中 */
    isMoving:boolean = false;
    // private fightEffect:FightPureAnim;
    buffer:AvatarBuffer = new AvatarBuffer();
    private _ctlList:IAvatarBaseCtl[] = [];    
    private _skelUrl:string;
    public isBoss:boolean = false;
    public die:boolean = false;//是否已经死亡

    public blood:AvatarBloodSpine;
    public rideId:number = 0;//坐骑id
    public wingId:number = 0;//翅膀id
    public useFightSkin:boolean = false;//是否填充战斗中需要的资源
    public offsetX:number = 0;
    public offsetY:number = 0;
    // public index:number;
    public main:IMSpineRegions[];//主骨骼
    public baseImg:string;
    public vo;
    /**当前的站立坐标位置 从1开始,不一定等于this.vo.pos的初始化坐标*/
    public standPos:number;
    // public posVal:number;
    // public spine:BaseSpineAvatar;
    public coreSpine:SpineCoreSkel;
    // protected get curTemplet():SpineTemplet_3_8_v1{
    //     return this.spine.templet;
    // }
    private _tf:Laya.Label;

    public debugTxt(v:string,y:number = 0){
        if(!this._tf){
            this._tf = new Laya.Label();
            this._tf.wordWrap = true;
            this._tf.width = 135;
            this._tf.height = 600;
            this._tf.fontSize = 24;
            this.addChild(this._tf);
        }
        this._tf.text = v;
        this._tf.y = y;
    }

    protected fashion:FashionModel;
    
    private _showBlood:boolean = false;//是否显示血条
    private _moveTween:Laya.Tween;
    private _moveHandler:Laya.Handler;
    
    // private effect:SimpleEffect;
    // private csEffect:FightPureAnim;//动作特效1
    // private csEffect2:FightPureAnim;//动作特效2

    private _allEffect:FightPureAnim[] = [];
    /**动作总时间(秒) */
    public get duration(){
        // if(this.spine){
        //     return this.spine.duration;
        // }
        if(this.coreSpine){
            return this.coreSpine.duration;
        }
        return 0;
    }

    /**spine骨骼是否已经加载完成 */
    private get spineLoaded(){
        // return this.spine.skeleton;
        return this.coreSpine.skeleton;
    }
    public pushCtl(ctl:IAvatarBaseCtl){
        this._ctlList.push(ctl);
    }
    public spineload(that:Object,func:Function){
        if(this.spineLoaded){
            func.call(that)
        }else{
            this.once(Laya.Event.COMPLETE,that,func);
        }
    }

    constructor(){
        super();
        DebugUtil.drawCross(this,0,0,20,"#ff00ff");

        this.buffer.con = this;
        this.initMoveTween();
        this.fashion = FashionModel.Ins;
        this.coreSpine = new SpineCoreSkel();
        // this.spine = new BaseSpineAvatar();
        // this.spine.once(Laya.Event.COMPLETE,this,this.onCompleteHandler);

        

        this.on(Laya.Event.DISPLAY,this,this.onDisplay);
        this.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);

        // if(E.Debug){
        //     let spr = new Laya.Sprite();
        //     spr.graphics.drawCircle(0,0,3,null,"#ff0000");
        //     this.addChild(spr);
        //     // this.tf = new Laya.Label();;
        //     // this.addChild(this.tf);
        // }
    }

    /**初始化战斗素材 */
    public initFightRes() {

        this.blood = new AvatarBloodSpine();
        // this.fightEffect =  new FightPureAnim(IconUtils.effect+".skel");
        // this._allEffect.push(this.fightEffect);
/*
        this.csEffect = new FightPureAnim(IconUtils.effect+".skel",this);
        this._allEffect.push(this.csEffect);

        this.csEffect2 = new FightPureAnim(IconUtils.effect+".skel",this);
        this._allEffect.push(this.csEffect2);
*/
    }

    public csPlay(anim:EAvatarEffectAnim){
        // if(this.csEffect){
        // this.csEffect.poolPlay(anim);
        // }
        // AvatarFactory.getEffect(this).poolPlay(anim);
        this.poolPlay(anim);
    }
    public csPlay2(anim:EAvatarEffectAnim){
        // if(this.csEffect2){
        // this.csEffect2.poolPlay(anim);
        // }
        // AvatarFactory.getEffect(this).poolPlay(anim);
        this.poolPlay(anim);
    }
    private poolPlay(anim:EAvatarEffectAnim){
        AvatarFactory.getEffect(this,null,-AvatarConfig.effectOffsetY).poolPlay(anim);
    }
    /**加载指定的形象 */
    private loadByImageID(id:number){
        let k:string = War3Config.Prefix;
        let prefix = `o/Image_Character/${k}${id}/${k}${id}`;
        let atlas:string = `${prefix}.atlas`
        Laya.loader.load(atlas,new Laya.Handler(this,()=>{
            this.main = AtlasParser.Start(Laya.Loader.getRes(atlas));
        }),null,Laya.Loader.TEXT);
        this.baseImg = `${prefix}.png`;
        this.load(`${prefix}.skel`);
    }

    /**刷新新骨骼皮肤 */
    refreshImageID(id: number) {
        this.imageID = id;
        this.reload();
    }

     /**重载 */
     protected reload() {
        this.disposeCoreSpine();
        this.coreSpine = new SpineCoreSkel();
        this.initRes();
        this.loadSkel();
        this.refreshSkin();
    }

    public initRes(){
        // if(Laya.Utils.getQueryString("debug_fight_war3")){
        //     this.loadByImageID(Math.floor(Math.random()*3)+1);
        //     return;
        // }
        
        if(this.imageID){
            this.loadByImageID(this.imageID);
            return;
        }

        let id:number = this.rideId;
        if (id > 0) {
            // this.main = AtlasParser.Start(Laya.Loader.getRes(`o/avatar/horse/horse.atlas`));//weapon shield
            let _mountCfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(id);
            let a: string = _mountCfg.f_skel == 0 ? "" : _mountCfg.f_skel + "";
            let horseRes:string = `horse${a}/horse${a}`;
            this.main = AtlasParser.Start(Laya.Loader.getRes(`o/avatar/${horseRes}.atlas`));//weapon shield
            this.baseImg = `o/horse_spine/horse_${id}.png`;
            this.load(`o/avatar/${horseRes}.skel`);
        } else {
            this.main = AtlasParser.Start(Laya.Loader.getRes(ResPath.Avatar.baseAtlas));//weapon shield
            this.baseImg = ResPath.Avatar.baseImg;
            this.load(ResPath.Avatar.baseSkel);
        }
    }

    private getName(str:string){
        let arr = str.split("/");
        return arr[arr.length -1];
    }

    private getPath(str:string){
        let arr = str.split("/");
        let s = "";
        for(let i = 0;i < arr.length - 1;i++){
            s+=arr[i]+"/";
        }
        return s;
    }

    public setSkel(val:string){
        // let arr = val.split("/");
        let _name:string = this.getName(val);
        let _path = this.getPath(val);//val.replace(_name,"");
        this.main = AtlasParser.Start(Laya.Loader.getRes(`${_path}${_name}.atlas`));
        this.baseImg = `${_path}${_name}.png`;
        this.load(`${_path}${_name}.skel`);
    }
    /**设置资源 */
    public setRes(resKey:string){
        let path = `${resKey}/${resKey}`;
        this.main = AtlasParser.Start(Laya.Loader.getRes(`o/avatar/${path}.atlas`));//weapon shield
        this.baseImg = `o/avatar/${path}.png`;
        this.load(`o/avatar/${path}.skel`);
    }

    /**是否是坐骑的骨架 */
    public get bHorseSkel() {
        return this.baseImg.indexOf(`o/horse_spine/`) != -1;
    }

    // protected onCompleteHandler(){
        // this.addChildAt(this.spine.skeleton,0);
        // this.event(Laya.Event.COMPLETE);
    // }

    // public get curBloodVal() {
    // return this.blood.curBloodVal;
    // }

    hasHorse() {
        let _l: IMSpineRegions[] = this.main;
        if (_l) {
            for (let i = 0; i < _l.length; i++) {
                let cell: IMSpineRegions = _l[i];
                if (cell.name == "hhead") {
                    return true;
                }
            }
        }
    }
    private onDisplay() {
        // console.log("show", this, this._showBlood);
        this.layout();
        Laya.timer.frameLoop(1, this, this.onFrameLoop);
    }
    private layout(){
        if (this._showBlood && this.blood) {
            this.bloodParent.addChild(this.blood);
        }
    }
    private get bloodParent(){
        return this.bloodParentType == EBloodParent.Parent ?  this.parent : this;
    }
    private get refX(){
        if(this.blood && this.blood.parent == this){
            return 0;
        }
        return this.x;
    }
    private get refY(){
        if(this.blood && this.blood.parent == this){
            return 0;
        }
        return this.y;
    }
    private updateBloodPos(){

        let x = this.refX-this.blood.width / 2;
        let offsetY:number = AvatarConfig.normalHeight;
        if(this.hasHorse()){
            offsetY = AvatarConfig.hasHorseHeight;
        }
        let y = this.refY - offsetY;
        
        // if(E.ViewMgr.IsOpen(EViewType.FightMain)){
            // let skin = (E.ViewMgr.Get(EViewType.FightMain) as FightMainView).UI;
            // this.blood.x = this.x;
            // this.blood.y = this.y;
            // if(this.fightEffect && this.fightEffect.baseSkel){
            //     skin.addChild(this.fightEffect.baseSkel);//you`d better 设置到avatar上
            //     this.fightEffect.baseSkel.pos(this.x,this.y);
            // }
        // }
        this.blood.x = x;
        this.blood.y = y;
    }

    // private _testPosTf:Laya.Label;
    protected onFrameLoop(){
        if(this.blood && this.blood.parent){
            this.updateBloodPos();
            // if(E.Debug){
            //     if(!this._testPosTf){
            //         this._testPosTf = new Laya.Label();
            //         this._testPosTf.color = "#00ff00";
            //         this._testPosTf.stroke = 2;
            //         this._testPosTf.strokeColor = "#000000";
            //         this._testPosTf.fontSize = 24;
            //         // this._testPosTf.y = y;
            //         this.addChild(this._testPosTf);
            //     }
            //     if(this.vo && this.vo.hasOwnProperty("pos")){
            //         this._testPosTf.text = "pos:"+(this.vo.pos || 0).toString();
            //     }
            // }
        }
        
    }

    private onUnDisplay(){
        Laya.timer.clear(this,this.onFrameLoop);
    }

    // public setDebugTxt(v: string) {
    //     if (E.Debug) {
    //         if (!this.tf) {
    //             this.tf = new Laya.Label();
    //             // this.tf.fontSize = 32;
    //             this.tf.color = "#ffffff";
    //         }
    //         this.tf.text = v;
    //         this.addChild(this.tf);
    //     }
    // }

    //刷新皮肤
    public refreshSkin(){

    }
    public initBlood(){
        this._showBlood = true;
    }

    public hideBlood(){
        if(this.blood){
            this.blood.removeSelf();
        }
        this._showBlood = false;
    }

    public playBlood(v:number,criticalStrike:boolean = false,anim:EAvatarEffectAnim = EAvatarEffectAnim.SuckBloodTxt){
        if(this.blood){
            this.blood.flyTxt(v);
        }
        //开始播放
        // if(this.fightEffect){
        //     this.fightEffect.flyBlood(v,criticalStrike,anim);
        // }
        let cell = AvatarFactory.getEffect(this,null,-AvatarConfig.effectOffsetY);
        cell.flyBlood(v,criticalStrike,anim);
    }

    public load(url){
        this._skelUrl = url;
        // this.spine.load(url);
    }

    protected onSpine1Complete(){
        // this.coreSpine.play(EAvatarAnim.Stand);
        if(!DrawCallConfig.disable_spine){
            this.addChildAt(this.coreSpine.skeleton,0);
        }
        this.coreSpine.skeleton.pos(this.offsetX,this.offsetY);
        this.coreSpine.skeleton.on(Laya.Event.LABEL,this,this.onLabelEvt);
        this.dir = this._curDir;
        Laya.timer.callLater(this,this.callBackComplete);
    }

    private callBackComplete(){
        if(this.hasListener(Laya.Event.COMPLETE)){
            // LogSys.Warn("onSpine1Complete COMPLETE: without event");
        }
        this.event(Laya.Event.COMPLETE);
    }

    private onLabelEvt(e){
        // console.log("-==============>",e);
        this.event(Laya.Event.LABEL,e);
    }
    public set dir(v:EAvatarDir){
        this._curDir = v;
        this.coreSpine.dir = v;
    }

    public get dir(){
        return this.coreSpine.dir;
    }
    /**
     * 偏移距离
     * @param offsex 目标坐标x
     */
    public moveX(offsex:number,time:number,_moveHandler?:Laya.Handler,animType?:EAvatarAnim){
        this.isMoving = true;
        this._moveHandler = _moveHandler;
        // this.initMoveTween();
        if(animType){
            this.play(EAvatarAnim.Move);
        }
        this._moveTween.to(this,{x:offsex,update:new Laya.Handler(this,this.onUpdate)},time,null,new Laya.Handler(this,this.onMoveEnd));
    }

    /**移动 */
    public move(ox:number,oy:number,time:number,_moveHandler?:Laya.Handler){
        this._moveHandler = _moveHandler;
        // this.play(EAvatarAnim.Move);
        this._moveTween.to(this,{x:ox,y:oy,update:new Laya.Handler(this,this.onUpdate)},time,null,new Laya.Handler(this,this.onMoveEnd));
    }

    private onUpdate(){
        // console.log(1121);
        this.onFrameLoop();
    }

    private initMoveTween(){
        if(this._moveTween){
            this._moveTween.clear();
        }else{
            this._moveTween = new Laya.Tween();
        }
    }

    public play(anim: EAvatarAnim, target?, callBack?, args?,_once?) {
        return this.coreSpine.play(anim,target,callBack,args,_once);
    }

    /**播放受到击晕动画 */
    public playStunned(){
        this.play(EAvatarAnim.InStunned,this,this.onStunedEnd);
    }

    private onStunedEnd(){
        this.play(EAvatarAnim.Stunned);
    }
    /**当前的动画*/
    public get curAnim():EAvatarAnim{
        return this.coreSpine.anim;
    }
    /**只播放一次 */
    public playOnce(anim:EAvatarAnim,target?, callBack?, args?){
        return this.coreSpine.play(anim,target,callBack,args,true);//不循环
    }

    // public clear(){
    //     this.reset();
    //     this.x = this.y = 0;
    //     this.hideBlood();
    //     this.useFightSkin = false;
    // }

    public stop(){
        this.coreSpine.stop();
        this.removeAllLis();
    }

    public start(){
        // this.corepine.start();
        this.loadSkel();
    }

    protected loadSkel(){
        this.coreSpine.once(Laya.Event.COMPLETE,this,this.onSpine1Complete);
        this.coreSpine.load(this._skelUrl);
    }

    /**useTime秒渐变为透明 */
    public alphaToZero(end: Laya.Handler = null, useTime: number = 1000) {
        // this.initMoveTween();
        this._moveTween.to(this, { alpha: 0.0 }, useTime, null, end);
    }

    public reset(x:number = 0,y:number = 0){
        this.isBoss = false;
        this.standPos = -1;
        if(this.blood){
            this.blood.reset();
        }

        for(let i = 0;i < this._allEffect.length;i++){
            this._allEffect[i].stop();
        }

        if(this._moveTween){
            this._moveTween.clear();
        }
        if(!this.destroyed){
            this.alpha = 1.0;
        }
        this.setPos(x,y);
        this.offAll(AvatarEvent.UPDATA_BLOOD);
    }

    /**
     * 移动结束
     */
    private onMoveEnd(){
        this.isMoving = false;
        // this.play(EAvatarAnim.Stand);
        if(this._moveHandler){
            this._moveHandler.run();
        }
    }

    /*
     * 设置坐标
     */
    public setPos(x:number,y:number){
        this.x = x;
        this.y = y;
    }
    protected removeAllLis(){

    }
    public dispose(){
        this.removeAllLis();
        this.isMoving = false;
        this.buffer.dispose();
        while(this._ctlList.length){
            let ctl = this._ctlList.shift();
            ctl.dispose();
        }
        this.reset();
        this.onUnDisplay();
        this.off(Laya.Event.DISPLAY,this,this.onDisplay);
        this.off(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
        // if(this.effect){
        //     this.effect.dispose();
        // }
        
        // if(this.csEffect){
        // this.csEffect.dispose();//删除之后会释放掉spine绑定的纹理对象
        // }

        for(let i = 0;i < this._allEffect.length;i++){
            let cell = this._allEffect[i];
            cell.dispose();
        }
        if(this.blood){
            this.blood.dispose();
        }

        if(this._moveTween){
            this._moveTween.clear();
        }
        // if(this.coreSpine.skeleton){
        //     this.coreSpine.skeleton.off(Laya.Event.LABEL,this,this.onLabelEvt);
        // }
        // this.coreSpine.dispose();
        this.disposeCoreSpine();

        this.removeSelf();
        this.vo = null;
        this.imageID = null;
        this.destroy();
    }

    protected disposeCoreSpine(){
        if(this.coreSpine){
            this.coreSpine.stop();
            this.coreSpine.off(Laya.Event.COMPLETE,this,this.onSpine1Complete);
            if(this.coreSpine.skeleton){
                this.coreSpine.skeleton.off(Laya.Event.LABEL,this,this.onLabelEvt);
            }
            this.coreSpine.dispose();
            // this.coreSpine = null;
        }
    }

    protected getAnimName(anim: EAvatarAnim) {
        switch (anim) {
            case EAvatarAnim.Stop:
                return "Stop";
            case EAvatarAnim.Stand:
                return "Stand";
            case EAvatarAnim.Move:
                return "Move";
            case EAvatarAnim.Attack:
                return "Attack"
            case EAvatarAnim.Attack2:
                return "Attack2";
            case EAvatarAnim.StrongAttack:
                return "StrongAttack";
            case EAvatarAnim.StrongAttack2:
                return "StrongAttack2";
            case EAvatarAnim.Hit:
                return "Hit";
            case EAvatarAnim.Hit2:
                return "Hit2";
            case EAvatarAnim.Dodge:
                return "Dodge";
            case EAvatarAnim.Stunned:
                return "Stunned";
            case EAvatarAnim.Die:
                return "Die";
            case EAvatarAnim.AssassinateReady:
                return "AssassinateReady";
            case EAvatarAnim.Assassinate:
                return "Assassinate";
        }
    }
}