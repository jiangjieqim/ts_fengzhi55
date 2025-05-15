import { LogSys } from "../../../../frame/log/LogSys";
import { TimeUtil } from "../../../../frame/util/TimeUtil";
import { AnimConfig, HrefUtils } from "../../../../InitConfig";
import { EMsgBoxType, EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { stFightData, stFightRole } from "../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../static/json/data/BaseCfg";
import { FightMainView } from "../fight/views/FightMainView";
import { FightTest } from "../jjc/FightTest";
import { AvatarAnimData } from "./AvatarAnimData";
import { AvatarEvent } from "./AvatarEvent";
import { AvatarFactory } from "./AvatarFactory";
import { AvatarMonsterView } from "./AvatarMonsterView";
import { AvatarView, EAvatarEffectAnim, ESkillActionAnim } from "./AvatarView";
import { BloodCtl } from "./ctl/BloodCtl";
import { ShootAvatar } from "./ShootAvatar";
import { EAvatarAnim } from "./vos/EAvatarAnim";
import { EActionSkill, ESkillId, FightActionVo } from "./vos/FightActionVo";
// class ItemTestView extends Laya.View{
//     public tf:Laya.Label = new Laya.Label();
//     constructor(){
//         super();
//         this.width  = 700;
//         this.height = 100;
//         this.graphics.drawRect(0,0,this.width,this.height,null,"#ff0000",1);
//         this.tf.fontSize*=2;
//         this.tf.width = this.width;
//         this.tf.wordWrap = true;
//         this.addChild(this.tf);
//     }
// }

export class t_Skill_Effect extends BaseCfg{
    public GetTabelName():string{
        return "t_Skill_EffectT";
    }
    private static _ins: t_Skill_Effect;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Skill_Effect();
        }
        return this._ins;
    }
    public getBySkillID(skillId:number):Configs.t_Skill_EffectT_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Skill_EffectT_dat = l[i];
            if(cfg.f_SkillID == skillId){
                return cfg;
            }
        }
    }
}

/*
export class TestMainView extends ui.views.common.ui_testUI{
    constructor(){
        super();
        ButtonCtl.Create(this.close1,new Laya.Handler(this,this.onCloseHandler));
        // this.bg.alpha = 0.5;
        this.on(Laya.Event.DISPLAY,this,this.onDisplay);
        this.l1.itemRender = ItemTestView;
        this.l1.renderHandler = new Laya.Handler(this,this.onItemHandler);
    }
    private onItemHandler(item:ItemTestView,index:number){
        let vo:FightActionVo = item.dataSource;
        // item.graphics.clear();
        // if(vo.index == 1){
        //     item.graphics.drawRect(0,0,this.width,this.height,"#777777");
        // }else{
        //     item.graphics.drawRect(0,0,this.width,this.height,"#cccccc");
        // }
        item.tf.text = vo.toString();
        item.tf.color = vo.owner == 0 ? "#ff0000":"#000000";
    }
    private onCloseHandler(){
        this.removeSelf();
    }
    private onDisplay(){
        this.l1.array = FightModelVer2.Ins.actList || [];
    }
}
*/
export class FightModelVer2{
    /**最后执行的时间戳 */
    public lastTime:number = 0;
    private static _ins: FightModelVer2;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new FightModelVer2();
        }
        return this._ins;
    }
    private get moveTime():number//前后移动的时间
    {
        return AvatarAnimData.startUseTime / AnimConfig.AnimScale;
    }
    private readonly roleCount:number = 6;
    private readonly DEAD_SKILL_ID:number = 1000;
    public roles:AvatarView[] = [];
    /**当前的技能id,0代表当前没有并发的技能,不需要立即处理动作行为 */
    // private curServerSkillID:number = 0;
    private curIndex:number = 0;//当前行动索引
    private _isStop:boolean = false;
    private roundHandler:Laya.Handler;
    private end:Laya.Handler;
    public actList:FightActionVo[] = [];
    // private flyTxtTime = 1000;//飘字的时间

    private get animScale():number{
        return AnimConfig.AnimScale;
    }

    public start(avatarList:AvatarView[],actList:FightActionVo[],end:Laya.Handler,roundHandler:Laya.Handler){
        this.lastTime = Laya.timer.currTimer;

        // owner:AvatarView,enemy:AvatarView,

        // this.actList = this.rebuild(actList);
        // this.curServerSkillID = 0;
        this.curIndex = 0;
        // console.log(actList);
        this._isStop = false;
        this.end = end;
        this.roundHandler = roundHandler;
        // this.moveTime = AvatarAnimData.startUseTime;

        // let _animScale = AnimConfig.AnimScale;
        // if(_animScale){ 
        // this.flyTxtTime = 1000*_animScale;

        // this.moveTime = AvatarAnimData.startUseTime / _animScale;

        // this.animScale = _animScale;
        // }

        this.roles = avatarList;
        // this.roles.push(owner,enemy);
        // owner.index = 0;
        // enemy.index = 1;
        this.actList = actList;
        this.parseActions();
    }

    private onPlayEnd(mParse:boolean,cur:AvatarView,useNext){
        if(cur.die){

        }else{
            cur.play(EAvatarAnim.Stand);
        }
        if(useNext && mParse){
            this.parseActions();
        }
    }

    /**
     * @param pos 从1开始
     */
    private getAvatar(pos:number) :AvatarView{
        for(let i = 0;i < this.roles.length;i++){
            let cellItem:AvatarMonsterView = this.roles[i] as AvatarMonsterView;
            // if(cell.vo)
            let vo = cellItem.vo;
            if(vo){
                if(vo.pos == pos){
                    // cellItem.standPos = pos;
                    return cellItem;
                }
            }
        }
        // return this.roles[0];
        // console.log("*****",pos);
    }

    /**攻击结束回调 */
    private attackEnd(mParse:boolean,cur:AvatarView,act:FightActionVo,_anim:EAvatarAnim){
        // let cur:AvatarView = this.getAvatar(act.index);// this.roles[act.index];
        let useNext:boolean = true;
        let next:FightActionVo = act.back;
        if(next){
            if(
                 next.hasVal(ESkillActionAnim.NormalAtk) || 
                 next.hasVal(ESkillActionAnim.CsAtk) ||
                next.index!=act.index && next.skillID == EActionSkill.PassiveHurtBlood)
            {
                //下一个是掉血马上执行下一个动作播放掉血动画
                useNext = false;
            }
        }
        // console.log((Laya.timer.currTimer/1000).toFixed(3)+"pos:"+act.index+" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>attackEnd:"+(_anim+1));
        cur.play(_anim + 1, this, this.onPlayEnd,[mParse,cur,useNext]) * 1000 + TimeUtil.serverTime * 1000;
        if(!useNext && mParse){
            this.parseActions();
        }
    }
    /**受击 */
    private passiveAnimStand(mParse,act:FightActionVo,cur:AvatarView){
        // let cur:AvatarView = this.getAvatar(act.index);//this.roles[act.index];
        if(cur.die){

        }else{
            cur.play(EAvatarAnim.Stand);
        }
        if(mParse){
            if(act.back && act.back.skillID != EActionSkill.PassiveHurtBlood){
                this.parseActions();
            }
        }
    }

    private moveEnd(cur:AvatarView,mParse:boolean){
        if(cur.curAnim == EAvatarAnim.Stunned){
            cur.play(cur.curAnim);
        }else{
            if(cur.die){

            }else{
                cur.play(EAvatarAnim.Stand);
            }
        }
        if(mParse){
            this.parseActions();
        }
    }

    /**
     * _standPos移动到_movePos的位置
     * @param mParse 
     * @param oldPos 
     * @param _movePos 
     */
    private startMove(mParse,oldPos:number,_movePos:number){
        
        // if(E.Debug){
        // console.log(`%cpos ${oldPos} 移动到 pos ${_movePos}`,"color:#0000ff");
        // }

        let cur:AvatarView = this.getAvatar(oldPos);
        let ox:number;
        let oy:number;
        if(oldPos == _movePos){
            //归位
            let pos = AvatarFactory.posList[_movePos-1];

            ox = pos.x;
            oy = pos.y;
        }else{
            let moveObj = this.getAvatar(_movePos);
            if(moveObj){
                let sub = Math.abs(moveObj.x - cur.x);
                
                let pos = AvatarFactory.posList[_movePos-1];
                oy = pos.y;

                let size:number = AvatarFactory.offset;
                if(sub == size && cur.y == moveObj.y){
                    //不移动
                    ox = cur.x;
                    oy = cur.y;
                }else{
                    if(oldPos <= AvatarFactory.maxSideCount){
                        //左
                        ox = pos.x - size;
                    }else{
                        //右
                        ox = pos.x + size;
                    }
                }
            }
        }
        if(cur){        
            cur.move(ox,oy,this.moveTime,new Laya.Handler(this,this.moveEnd,[cur,mParse]));
        }
        /*
        cur.standPos = _movePos;

        let pos = AvatarFactory.posList[_movePos-1];

        let ox:number = pos.x;
        let oy:number = pos.y;
        // if(act.index == act.movePosIndex){
        // cur.standPos = _standPos;
        
        if(oldPos == cur.standPos){
            //回到原位置
        }else{
            let size:number = AvatarFactory.offset;
            if(_movePos <= AvatarFactory.maxSideCount){
                //移动的目的地在左边
                ox += size;
            }else{
                //移动的目的地在右边
                ox -= size;
            }
        }
        cur.move(ox,oy,this.moveTime,new Laya.Handler(this,this.moveEnd,[cur,mParse]));
        */
    }

    /**
     * 从_standPos移动到_movePos
     * @param mParse 
     * @param cur 
     * @param oldPos 从1开始
     * @param _movePos  从1开始
     */
    private moveLogic(mParse:boolean,oldPos:number,_movePos:number) {
        // if(act.isBack){
        if(oldPos == _movePos){
            this.startMove(mParse,oldPos,_movePos);
        }else{
            Laya.timer.once(400/this.animScale,this,this.startMove,[mParse,oldPos,_movePos]);
        }
    }

    private bloodNext(mParse: boolean) {
        if (mParse) {
            // if (this.curServerSkillID > 0) {
                // this.parseActions();
            // } else {
                Laya.timer.once(BloodCtl.UseTime, this, this.parseActions);
            // }
        }
    }
    public stop(){
        this._isStop = true;
    }

    /**战斗是否结束 */
    // public get isStop(){
    // return this._isStop;
    // }

    /**动作距离现在的间隔 毫秒 */
    public get subTime(){
        let sub = Laya.timer.currTimer - this.lastTime;
        // if(sub >= 2000){
        // return true;
        // }
        // return false;
        return sub;
    }

    public init(){
        this.lastTime = 0;
    }

    private subBlood(act: FightActionVo){
        if(act.back && act.back.skillID == EActionSkill.PassiveHurtBlood){
            this.parseActions();
        }
    }
    /**下一个是死亡直接下一个节点动作 */
    private mergeRun(mParse:boolean,act:FightActionVo){
        let next = act.getBackNext();
        if (next && next.skillID == EActionSkill.ClientDie              //是自己死亡 
            //  || act.back && act.back.skillID == EActionSkill.SkillStart //技能开始
            ) 
        {
            if(mParse){
                this.parseActions();
            }
        } else {
            this.bloodNext(mParse);
        }
    }
    // private playStrikeBackTxt( cur:AvatarView){
        // let index = act.index;
        // let ox = cur.x;
        // let oy = cur.y;
        // let oldXY = AvatarFactory.posList[index];
        
        // let size:number = AvatarFactory.offset;
        // if(act.movePosIndex + 1 <= AvatarFactory.maxSideCount){
        //     ox += size;
        // }else{
        //     ox -= size;
        // }
        
        // if(oldXY && ox == oldXY.x && oy == oldXY.y){
        // if(cur.standPos == act.index){
        // cur.csPlay2(EAvatarEffectAnim.StrikeBackTxt);
        // }
    // }

    // /**
    //  * 非瞬时触发特效
    //  * @param cur 
    //  * @param _curpos 1开始
    //  */
    // private playSkill(cur: AvatarView,act:FightActionVo,target:number){
    //     if (this.curServerSkillID) {
    //         let skillcfg: Configs.t_Skill_EffectT_dat = t_Skill_Effect.Ins.getBySkillID(this.curServerSkillID);
    //         if (skillcfg && skillcfg.ack == /*act.serverData.type*/act.skillID) {
    //             for (let i = 0; i < this.roleCount*2; i++) {
    //                 let pos: number = i + 1;
    //                 let val = skillcfg['f_Target' + pos];
    //                 if (val && pos == target/*act.index*/) {
    //                     cur.csPlay2(val);
    //                 }
    //             } 
    //         }
    //     }   
    // }

    /**f_Buff f_Debuff f_SufferAtk f_SufferCriticalHit*/
    private csPlay2ByKey(cur1:AvatarView,act:FightActionVo,key:string){
        if(act.serverSkillId){
            let cfg = t_Skill_Effect.Ins.getBySkillID(act.serverSkillId);
            if(cfg){
                if(cfg[key]){
                    cur1.csPlay2(cfg[key]);
                }else{
                    // if(E.Debug){
                    // E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"key not find:" + key);
                    // }
                }
            }
        }
    }

     /**闪避和连击特效 */
     /*
     private getBySKill(val: EActionSkill) {
        // let s = "";
        switch (val) {
            // case EActionSkill.PassiveDodge:
                // s = "闪避";
                // return EAvatarEffectAnim.Dodge;
            case EActionSkill.LianJi:
                return EAvatarEffectAnim.Lianji;
            default:
                // s = "skill id:" + val;
                // console.log("###" + s.toString());
                if(E.Debug){
                    E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"getBySKill:"+val);
                }
                return;
        }
    }
    */
    private normalAck(cur1:AvatarView,mParse:boolean,act:FightActionVo){
        let curAnim: EAvatarAnim = Math.random() < 0.5 ? EAvatarAnim.Attack : EAvatarAnim.AssassinateReady;
        let time:number = Math.ceil(cur1.play(curAnim, this, this.attackEnd, [mParse, cur1, act, curAnim]) * 1000);
        // console.log(`need anim time: ${time}`);
    }

    private parseActions(){
        if(this._isStop){
            // this.stop();
            this.curIndex = this.actList.length;
        }
        let act:FightActionVo = this.actList[this.curIndex]; //this.actList.shift();
        // console.log("***",act);
        if(act){
            // act.checkTarget();
            this.curIndex++;
            
            // let cur:AvatarView = this.getAvatar(act.index);//this.roles[act.index];
            // let val: number = act.val;

            if (E.Debug) {
                if (HrefUtils.getVal("nofightlog") || initConfig.nofightlog) {
                    if (FightTest.flyMSG) {
                        LogSys.Log(Laya.timer.currTimer + act.toString());
                    }
                }
            }

            // LogSys.Log("subtime:"+this.subTime +"==================>" + this.curIndex);
            this.lastTime = Laya.timer.currTimer;

            //检测一个前动作是否是死亡.是死亡的时候就继续下一个动作
            /*
            let front = act.roundFront;
            if(front && front.skillID == EActionSkill.ClientDie){
				this.parseActions();
                return;
            }
            */
            // let i = 0;
            // let targetMaxIndex = act.targetList.length - 1;

            for (let i = 0; i < act.targetList.length; i++) {
                let vo: stFightData = act.targetList[i];
                let cur1: AvatarView = this.getAvatar(vo.target);
                let mParse: boolean = i == act.targetList.length - 1;
                let isFirstTarget:boolean = i == 0;

                switch (act.skillID) {
                    case EActionSkill.ClientMove://移动
                        if(cur1.die){
                            if(E.Debug){
                                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"pos "+vo.target + "死之后被移动到 "+vo.val +"\n" 
                                            + JSON.stringify(act.serverData));
                            }
                            if(mParse){
                                this.parseActions();
                            }
                        }else{
                            this.moveLogic(mParse, vo.target, vo.val);
                        }
                        break;

                    case EActionSkill.NormalAttack://普通攻击
                        this.normalAck(cur1,mParse,act);
                        if(act.serverSkillId){
                            let cfg = t_Skill_Effect.Ins.getBySkillID(act.serverSkillId);
                            if(cfg && cfg.f_Atk){
                                cur1.csPlay(cfg.f_Atk);
                            }
                        }
                        break;

                    case EActionSkill.CriticalStrike://暴击
                        cur1.play(EAvatarAnim.StrongAttack, this, this.attackEnd, [mParse, cur1, act, EAvatarAnim.StrongAttack]) * 1000 + TimeUtil.serverTime * 1000;
                        cur1.csPlay(EAvatarEffectAnim.Cs);
                        if(act.serverSkillId){
                            let cfg = t_Skill_Effect.Ins.getBySkillID(act.serverSkillId);
                            if(cfg && cfg.f_CriticalHit){
                                cur1.csPlay(cfg.f_CriticalHit);
                            }
                        }
                        break;

                    case EActionSkill.SuckBlood://吸血
                        // for(i = 0;i < act.targetList.length;i++){
                        // vo = act.targetList[i];
                        // let cur1:AvatarView = this.getAvatar(vo.target);
                        cur1.csPlay(EAvatarEffectAnim.AddBlood);
                        cur1.playBlood(vo.val);
                        this.bloodNext(mParse);
                        // }
                        break;

                    case EActionSkill.Recover://回复血
                        // for(i = 0;i < act.targetList.length;i++){
                        // vo = act.targetList[i];
                        // let cur1:AvatarView = this.getAvatar(vo.target);
                        cur1.csPlay(EAvatarEffectAnim.HuiFuBlood);
                        cur1.playBlood(vo.val, false, EAvatarEffectAnim.HuiFuBloodTxt);
                        this.mergeRun(mParse, act);
                        // }
                        LogSys.Log(vo.target+"回复血"+vo.val);
                        break;

                    case EActionSkill.ReviveSetBlood://复活后设置血
                        cur1.csPlay(EAvatarEffectAnim.AddBlood);
                        if(cur1.blood){
                            cur1.blood.curBlood = 0;
                        }
                        cur1.playBlood(vo.val, false, EAvatarEffectAnim.HuiFuBloodTxt);
                        this.bloodNext(mParse);
                        // }
                        LogSys.Log(vo.target+"复活后设置血"+vo.val);
                        break;

                    case EActionSkill.PassiveDodge://受击闪避

                        // cur1.playEffect(act.skillID);
                        // cur1.effectplay(this.getBySKill(EActionSkill.PassiveDodge));
                        cur1.csPlay(EAvatarEffectAnim.Dodge);
                        if (mParse) {
                            cur1.play(EAvatarAnim.Dodge, this, this.parseActions);
                        } else {
                            cur1.play(EAvatarAnim.Dodge);
                        }
                        break;

                        /*
                    case EActionSkill.LianJi://连击
                        
                        cur1.playEffect(act.skillID);
                        if (mParse) {
                            Laya.timer.once(500 / this.animScale, this, this.parseActions);
                        }
                        break;
                    case EActionSkill.StrikeBack://反击
                        
                        this.playStrikeBackTxt(cur1, act);
                        if (mParse) {
                            this.parseActions();
                        }
                        break;
                        */
                    case EActionSkill.SkillType:
                        let time:number = 0;
                        //(发起者) val 1 连击 2反击 3增益 4减益
                        switch(vo.val){
                            case 1:
                                time = 500;
                                cur1.csPlay(EAvatarEffectAnim.Lianji);
                                // this.normalAck(cur1,false,act);
                                break;
                            case 2:
                                time = 500;
                                cur1.csPlay(EAvatarEffectAnim.StrikeBackTxt);
                                // this.normalAck(cur1,false,act);
                                break;
                            case 3:
                                this.csPlay2ByKey(cur1,act,"f_Buff");
                                break;
                            case 4:
                                this.csPlay2ByKey(cur1,act,"f_Debuff");
                                break;
                        }

                        if (mParse) {
                            Laya.timer.once(time / this.animScale, this, this.parseActions);
                        }
                        break;

                    case EActionSkill.ResetStand://重置为待机动作
                        // for (i = 0; i < act.targetList.length; i++) {
                        // vo = act.targetList[i];
                        // let cur1: AvatarView = this.getAvatar(vo.target);
                        cur1.play(EAvatarAnim.Stand);
                        if (mParse) {
                            this.parseActions();
                        }
                        // }
                        break;
                    case EActionSkill.PassiveAnim:// 5 受击动作 ---> 受到普攻0 受到暴击1 受到眩晕2
                        
                        switch (vo.val) {
                            case ESkillActionAnim.NormalAtk:
                                cur1.csPlay(EAvatarEffectAnim.NormalAtk);
                                cur1.play(EAvatarAnim.Hit, this, this.passiveAnimStand, [mParse, act, cur1]);
                                this.csPlay2ByKey(cur1,act,"f_SufferAtk");

                                if (mParse) {
                                    this.subBlood(act);
                                }
                                break;
                            case ESkillActionAnim.CsAtk:
                                cur1.csPlay(EAvatarEffectAnim.CsAtk);
                                cur1.play(EAvatarAnim.Hit2, this, this.passiveAnimStand, [mParse, act, cur1]);
                                this.csPlay2ByKey(cur1,act,"f_SufferCriticalHit");

                                if (mParse) {
                                    this.subBlood(act);
                                }
                                break;
                            case ESkillActionAnim.Vertigo:
                                //受到眩晕
                                cur1.playStunned();
                                cur1.csPlay(EAvatarEffectAnim.JiYunTxt);

                                //bug说明:眩晕不需要延迟再触发下面的动作

                                let _needWait: boolean = false;
                                let next = act.getBackNext();
                                if (next && next.index == act.index) {
                                    if (next.skillID == EActionSkill.CriticalStrike || next.skillID == EActionSkill.NormalAttack) {
                                        _needWait = true;
                                    }
                                }
                                if (mParse) {
                                    if (_needWait) {
                                        //受到眩晕的时候 下一个动作需要等一下再播放
                                        Laya.timer.once(500 / this.animScale, this, this.parseActions);
                                    } else {
                                        this.parseActions();
                                    }
                                }
                                break;
                        }

                        break;

                    case EActionSkill.PassiveHurtBlood://受击伤害减血
                        // 6 受击伤害减血
                        // let cs1 = act.getCsFrontCell();
                        // let _s = false;
                        // if (cs1 && cs1.skillID == EActionSkill.CriticalStrike) {
                        //     _s = true;
                        // }
                        //播放减血动画
                        cur1.playBlood(-vo.val, act.serverSkillId == ESkillId.CriticalStrike);//伤血
                        this.mergeRun(mParse, act);
                        cur1.event(AvatarEvent.UPDATA_BLOOD, vo.val);
                        break;

                    case EActionSkill.ClientDie://死亡
                        // for (i = 0; i < act.targetList.length; i++) {
                        // vo = act.targetList[i];
                        // let cur1: AvatarView = this.getAvatar(vo.target);
                        this.gotoDie(mParse, cur1);
                        // }
                        break;

                    case EActionSkill.Round://更新回合数
                        this.roundHandler.runWith(vo.val);
                        if(mParse){
                            this.parseActions();
                        }
                        break;
                    /*
                    case EActionSkill.SkillStart://开始并发执行
                        this.curServerSkillID = vo.val;
                        if(mParse){
                            this.parseActions();
                        }
                        break;
                    case EActionSkill.DeadStart:
                        this.curServerSkillID = this.DEAD_SKILL_ID;
                        if (mParse) {
                            this.parseActions();
                        }
                        break;
                    case EActionSkill.DeadEnd:
                        this.curServerSkillID = 0;
                        if (mParse) {
                            this.parseActions();
                        }
                        break;
                    case EActionSkill.SkillEnd://结束并发执行
                        this.curServerSkillID = 0;
                        if (mParse) {
                            this.parseActions();
                        }
                        break;
                    */
                    case EActionSkill.Skill:
                        // for (i = 0; i < act.targetList.length; i++) {
                        // vo = act.targetList[i];
                        // let cur1: AvatarView = this.getAvatar(vo.target);
                        // act.val
                        let skillcfg: Configs.t_Skill_EffectT_dat = t_Skill_Effect.Ins.getBySkillID(vo.val);
                        if (skillcfg) {  // && skillcfg.ack == 0
                            if (cur1 && cur1.blood) {
                                //播放飘字
                                cur1.blood.playSkillTxt(skillcfg.f_SkillType, skillcfg.f_SkillName);
                            }
                        } else {
                            // if(E.Debug && cur1){
                            // cur1.blood.playSkillTxt(1,"DEBUG "+vo.target+ "->"+vo.val);
                            // }
                        }
                        if (mParse) {
                            this.parseActions();
                        }
                        // }
                        break;
                    
                    case EActionSkill.RemoteAttack:
                        /**远程攻击触发的技能id */
                        // let _remoteSkillID:number = act.val;
                        let pet: AvatarView = this.getAvatar(act.index);

                        if(isFirstTarget){
                            let time = pet.play(EAvatarAnim.ShootStart,this,this.onShootStartComplete,[act,pet]);
                            // console.log(time);
                            act.delayTime0 = time * 1000;
                        }
                        let skillcfg1: Configs.t_Skill_EffectT_dat = t_Skill_Effect.Ins.getBySkillID(act.serverSkillId);

                        if(pet){
                            let timer = new Laya.Timer();
                            timer.once(act.delayTime0,this,this.onDelayHandler,[skillcfg1.f_ExEffect,cur1,pet,mParse]);
                        }
                        break;
                    case EActionSkill.BuffStart:
                        LogSys.Log("buffer开始"+JSON.stringify(act.serverData));
                        cur1.buffer.play(vo.val);
                        this.parseActions();

                        break;
                    case EActionSkill.BuffEnd:
                        LogSys.Log("buffer结束"+ JSON.stringify(act.serverData));
                        cur1.buffer.stop(vo.val);
                        this.parseActions();
                        break;
                    case EActionSkill.ShoveAside:
                        LogSys.Log("触发格挡"+JSON.stringify(act.serverData));
                        cur1.csPlay2(EAvatarEffectAnim.ShoveAside);
                        let animTime1 = cur1.play(EAvatarAnim.ShoveAside,this,this.onStand,[cur1],true);
                        Laya.timer.once(animTime1*1000,this,this.parseActions);
                        break;
                    case EActionSkill.RemoteServerAtk:
                    case EActionSkill.RemoteServerCsAtk:
                        let remoteAvatar: AvatarView = this.getAvatar(vo.val);//被打的
                        if(remoteAvatar){
                            let curAnim: EAvatarAnim;
                            
                            if(act.skillID == EActionSkill.RemoteServerAtk){
                                curAnim = EAvatarAnim.Attack;//Math.random() < 0.5 ? EAvatarAnim.Attack : EAvatarAnim.AssassinateReady;
                            }else{
                                curAnim = EAvatarAnim.StrongAttack;//Math.random() < 0.5 ? EAvatarAnim.StrongAttack : EAvatarAnim.AssassinateReady;
                            }
                            cur1.play(curAnim, this, this.attackEnd, [false, cur1, act, curAnim]);
                            let timer = new Laya.Timer();
                            let userTime = cur1.coreSpine.getDurationByAnimIndex(curAnim) + cur1.coreSpine.getDurationByAnimIndex(curAnim + 1);
                            timer.once(userTime * 1000,this,this.onDelayHandler,[cur1.vo.skin.f_BulletPic,remoteAvatar,cur1,mParse]);
                        }
                        break;
                }
            }
        } else {
            this.end.run();
        }
    }

    private onDelayHandler(shootId:number,cur1:AvatarView,pet:AvatarView,mParse:boolean){
        // 蓄力结束后开始发射
        let shoot:ShootAvatar = new ShootAvatar();
        let view:FightMainView = E.ViewMgr.Get(EViewType.FightMain) as FightMainView;

        shoot.moveAvatar(shootId,pet,cur1);
        view.container.addChild(shoot);
        // console.log(1);
        if (mParse) {
            Laya.timer.once(AnimConfig.ShootTime/AnimConfig.AnimScale,this,this.parseActions);
        }
    } 

    private onStand(cur:AvatarView){
        cur.play(EAvatarAnim.Stand);
    }

    private onShootStartComplete(act:FightActionVo,cur:AvatarView){
        let time = cur.play(EAvatarAnim.ShootRun,this,this.onStand,[cur]);
        AnimConfig.ShootTime = time * 1000;
        // act.delayTime1 = time;
    }
    private gotoDie(mParse:boolean,cur:AvatarView){
        cur.die = true;
        if(mParse){
            this.parseActions();
        }
        cur.play(EAvatarAnim.Die,this,this.onDie,[cur]);
    }

    private onDie(cur: AvatarView){
        cur.alphaToZero();
    }
}