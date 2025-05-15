import { LogSys } from "../../../../../../frame/log/LogSys";
import {TimeUtil} from "../../../../../../frame/util/TimeUtil";
import { EMsgBoxType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { AvatarConfig } from "../../../avatar/AvatarConfig";
import { AvatarView } from "../../../avatar/AvatarView";
import { EAvatarAnim } from "../../../avatar/vos/EAvatarAnim";
import { HeroHouseModel } from "../../HeroHouseModel";
import { AvatarAnimStatus, HeroAnimStatusVo } from "./AvatarAnimStatus";
import { HeroHousePopView } from "./HeroHousePopVIew";

export class AvatarBaseStatus {
    public avatar: AvatarView;
    /**整个行为结束时间戳 */
    public endTime:number;
    /**整个行为链动作时长 */
    public totalTime:number = 0;
    private startTime:number;
    private endCallBack:Function;
    private that;

    // private isAnimEnd:boolean = true;

    /**状态链表 */
    private statusList: HeroAnimStatusVo[] = [];
    private total:number;

    /**当前状态 */
    private vo: HeroAnimStatusVo; 

    /**当前的索引 */
    private index: number = 0;
    private _popView:HeroHousePopView;
    private showPopView(txt:string=""){
        if(!this._popView){
            this._popView = new HeroHousePopView();
        }
        this._popView.desc = txt;
        if(this.avatar){
            this.avatar.addChild(this._popView);
            this._popView.x = -this._popView.qipao.width;
            this._popView.y = -AvatarConfig.normalHeight-50;
        }
    }

    private hidePopView(){
        if(this._popView){
            this._popView.removeSelf();
        }
        // this.showPopView();
    }
    private play() {
        if(!this.vo){
            return;
        }
        let usetime:number = 0;
        switch (this.vo.status) {
            case AvatarAnimStatus.Idle:
                this.hidePopView();
                usetime=this.avatar.play(EAvatarAnim.Stand);
                break;
            case AvatarAnimStatus.Attack:
                this.hidePopView();
                this.playAttack();
                break;
            case AvatarAnimStatus.StrongAttack:
                this.hidePopView();
                this.playStrongAttack();
                break;
            case AvatarAnimStatus.Attack_Talk:
                this.showPopView(this.vo.talk);
                this.playAttack();
                break;
            case AvatarAnimStatus.Idle_Talk:
                this.showPopView(this.vo.talk);
                usetime = this.avatar.play(EAvatarAnim.Stand);
                break;
            case AvatarAnimStatus.Idle_End_Talk:
                this.showPopView(this.vo.talk);
                usetime=this.avatar.play(EAvatarAnim.Stand);
                break;
            case AvatarAnimStatus.StrongAttack_Talk:
                this.showPopView(this.vo.talk);
                this.playStrongAttack();
                break;
            default:
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"avatar status:"+this.vo.status);
                break;
        }
        if(E.Debug){
            LogSys.Log("执行行为=====>"+this.vo.status,"anim usetime:"+usetime);
        }
    }
    private tf:Laya.Label;
    private showlog(v:string){
        if(!this.tf){
            this.tf = new Laya.Label();
        }
        this.tf.fontSize = 20;
        this.tf.stroke = 2;
        this.tf.strokeColor = "#000000";
        this.tf.color = "#ffffff";
        this.tf.bgColor = "#777777";
        this.tf.alpha = 0.8;
        if(this.avatar && this.avatar.parent && this.avatar.parent){
            this.avatar.parent.addChild(this.tf);
            this.tf.y = 100;
        }
        this.tf.text = v;
    }

    private onTimeEnd() {
        let sub = this.vo.endTime - TimeUtil.serverTime;
        if(E.Debug){
            this.showlog(this.vo.statusName+'\nindex:'+this.index+" total:"+this.statusList.length+"\n"
            +`武将数量${HeroHouseModel.Ins.bInviteFull}\n`
            +`当前行为剩余:${sub}秒\n`
            +`行为链剩余:${this.endTime-TimeUtil.serverTime}/${this.totalTime}秒\n`
            +`talk:[${this.vo.talk}]`
            );
        }
        if (sub <= 0) {
            this.next();
        } else {
            Laya.timer.once(1000,this,this.onTimeEnd);
        }
    }

    public begin(statusList: HeroAnimStatusVo[],that,endCallBack:Function){
        this.index=0;
        this.total = statusList.length;
        this.startTime = TimeUtil.serverTime;
        this.that= that;
        this.endCallBack = endCallBack;
        this.statusList = statusList;
        this.vo = this.statusList[this.index];
        this.play();
        this.onTimeEnd();
    }

    public dispose(){
        LogSys.Log("使用时间:"+(TimeUtil.serverTime - this.startTime)+"秒");
        Laya.timer.clearAll(this);
        while(this.statusList.length){
            this.statusList.shift();
        }
        if(this.endCallBack){
            this.endCallBack.call(this.that);
            this.endCallBack = null;
        }
        this.hidePopView();
        // this.avatar.stop();
        // this.avatar = null;
        if(this.tf){
            this.tf.destroy();
        }
    }

    private next() {
        this.index++;
        this.vo = this.statusList[this.index];
        if (!this.vo || this.index > this.total-1) {
            //end
            this.dispose();
        } else {
            this.onTimeEnd();
            this.play();
        }
    }

    private playAttack() {
        if(!this.avatar)return;
        this.avatar.playOnce(EAvatarAnim.Attack, this, this.onAttackEnd);
    }

    private onAttackEnd() {
        if(!this.avatar)return;
        this.avatar.playOnce(EAvatarAnim.Attack2, this, this.playAttack);
    }

    private onStrongAttackEnd() {
        if(!this.avatar)return;
        this.avatar.playOnce(EAvatarAnim.StrongAttack2, this, this.playStrongAttack);
    }

    private playStrongAttack() {
        if(!this.avatar)return;
        this.avatar.playOnce(EAvatarAnim.StrongAttack, this, this.onStrongAttackEnd);
    }
}