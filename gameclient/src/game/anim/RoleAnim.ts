
import {ListUtil} from "../../frame/util/ListUtil";
import {MathUtil} from "../../frame/util/MathUtil";
import {StringUtil} from "../../frame/util/StringUtil";
import { ERoleState } from "../common/defines/EnumDefine";
import { TextDefine } from "../common/defines/TextDefine";
import {Callback} from "../event/Callback";
import Animator = Laya.Animator;

/**角色动画处理*/
export  class RoleAnim {

    private _animator: Animator;                //动画播放器
    private _animComplete: Callback;            //动画播放完毕回调

    private _curAnimTime = 0;                   //当前动画时间
    private _curAnimTimer = 0;                  //当前动画计时器
    private _aniStates: RoleAnimState[] = [];   //角色动画状态

    /**当前动画计时*/
    public get CurAnimTimer() { return this._curAnimTimer; }

    constructor() {

        ListUtil.Add(this._aniStates, new RoleAnimState(ERoleState.Idle, [TextDefine.AnimName.Idle]));
        ListUtil.Add(this._aniStates, new RoleAnimState(ERoleState.Run, [TextDefine.AnimName.Run]));
        // ListUtil.Add(this._aniStates, new RoleAnimState(ERoleState.Walk, [TextDefine.ani_walk]));
        // ListUtil.Add(this._aniStates, new RoleAnimState(ERoleState.AttackPrev, [TextDefine.ani_atkprev, TextDefine.ani_atk]));
        // ListUtil.Add(this._aniStates, new RoleAnimState(ERoleState.AttackEnd, [TextDefine.ani_atkend]));
        // ListUtil.Add(this._aniStates, new RoleAnimState(ERoleState.SkillPrev, [TextDefine.ani_skill, TextDefine.ani_atkprev, TextDefine.ani_atk]));
        // ListUtil.Add(this._aniStates, new RoleAnimState(ERoleState.SkillEnd, [TextDefine.ani_atkend]));
        // ListUtil.Add(this._aniStates, new RoleAnimState(ERoleState.Dead, [TextDefine.ani_dead]));

    }

    public OnStart(animator: Laya.Animator, animComplete: Callback) {
        this._animator = animator;
        this._animComplete = animComplete;
    }

    public OnDestroy() {
        this._animator = null;
        this._animComplete = null;
    }

    /**播放动画
     * @param aniName 动画名字
    */
    public Play(aniName: string) {

        //可播放判断条件
        if (this._animator == null) return;
        if (!this.checkHasAnimName(aniName)) return;
        if (this.animIsPause()) return;

        this._animator.play(aniName, 0, 0);
        this._curAnimTime = this._animator.getControllerLayer(0).getCurrentPlayState().duration * 1000;
        this._curAnimTimer = 0;
    }

    /**刷新
     * @param 帧时长
    */
    public OnUpdate(delta: number) {

        this._curAnimTimer += delta;

    }

    /**检测是否有该动画*/
    
    public CheckHasAnimName(aniName: string): boolean {
        return this.checkHasAnimName(aniName);
    }

    /**检测当前动画是否播放完毕*/
    public CheckCurAniPlayEnd(): boolean {
        return this.checkCurAniPlayEnd();
    }

    public ResetAniTimer() {
        this._curAnimTimer = 0;
    }

    /**获取动画名字*/
    public GetAniName(roleState: ERoleState): string {
        let aniName = this.getAniName(roleState);
        if (StringUtil.IsNullOrEmpty(aniName)) {
            aniName = TextDefine.AnimName.Idle;//默认待机动画
        }
        if (!this.checkHasAnimName(aniName)) {//没有待机动画，返回空
            aniName = StringUtil.Empty;
        }
        return aniName;
    }

    /**获取动画名称*/
    private getAniName(roleState: ERoleState): string {
        let state = this._aniStates.find(i => i.State == roleState);
        if (state != null)
            return state.AniName;
        return StringUtil.Empty;
    }

    /**暂停动画播放*/
    public SetAnimSpeedZero(): boolean {
        return this.setAnimSpeed(0);
    }

    /**正常速度播放*/
    public SetAnimSpeedOne(): boolean {
        return this.setAnimSpeed(1);
    }

    /**设置播放速度*/
    public SetAnimSpeed(aniSpeed: number): boolean {
        return this.setAnimSpeed(aniSpeed);
    }

    /**设置播放速度*/
    private setAnimSpeed(aniSpeed: number): boolean {
        if (this.animatorIsNull()) return false;
        this._animator.speed = MathUtil.Clamp(aniSpeed, 0, 3);//目前取值范围0-3倍速
        return true;
    }

    /**获取动画播放速度*/
    private getAnimSpeed(): number {
        if (this.animatorIsNull()) return 0;
        return this._animator.speed;
    }

    /**检测当前动画是否播放完毕*/
    private checkCurAniPlayEnd(): boolean {
        if (this.animatorIsNull()) return true;
        if (this.animStateIsNull()) return true;
        if (this._curAnimTimer >= this._curAnimTime) return true;

        return false;
    }

    /**检测是否有该动画*/
    private checkHasAnimName(aniName: string): boolean {
        if (this.animatorIsNull()) return false;
        return this._animator.getControllerLayer(0).getAnimatorState(aniName) != null;
    }

    /**检测动画是否暂停*/
    private animIsPause(): boolean {
        if (this.animatorIsNull()) return false;

        return this.getAnimSpeed() == 0;
    }

    /**检测是否有动画机*/
    private animatorIsNull(): boolean {
        return this._animator == null;
    }

    /**是否动画状态不为空*/
    private animStateIsNull(): boolean {
        return this._animator.getControllerLayer(0).getCurrentPlayState() == null;
    }
}

/**角色动画状态*/
export class RoleAnimState {

    private _state: ERoleState;//角色状态
    private _aniNames: string[] = [];//可使用的动画

    constructor(state: ERoleState, aniNames: string[]) {
        this._state = state;
        this._aniNames = aniNames;
    }

    public get State() { return this._state; }
    public get AniName() {
        if (this._aniNames == null || this._aniNames.length == 0) return StringUtil.Empty;
        return this._aniNames[0];
    }

}