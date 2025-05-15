import { LogSys } from "../../../../../../frame/log/LogSys";
import {StringUtil} from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { MainEvent } from "../../../main/model/MainEvent";
import { MainModel } from "../../../main/model/MainModel";
import { HeroHouseModel } from "../../HeroHouseModel";
import { EGymAction } from "../../model/EGymType";
import { GymEvent } from "../../model/GymEvent";
import { GymInviteVo, GymSkinVo } from "../../model/GymInviteVo";
export class HeroEntrustVo {
    /**品质 */
    qua:number;
    /**完整度更好的传承 */
    bSmriti:boolean;
    /**新英雄获得 */
    bNewHero:boolean;
}



/**委托控制器 */
export class HeroSmallBtnCtl {
    cur:GymInviteVo;
    public uiVo:HeroEntrustVo = new HeroEntrustVo();
    private _isAuto:boolean;
    // private btn:FuncSmallIcon;
    /**是否是委托模式 */
    public get isAuto(){
        return this._isAuto;
    }
    // private timeCheck(){

    // }
    public setAuto(v:boolean){
        if(v && !HeroHouseModel.Ins.canInvite()){
            return;
        }
        this._isAuto = v;
        if(v){
            HeroHouseModel.Ins.invite();
            // Laya.timer.frameOnce(60,this,this.timeCheck);
        }else{
            // Laya.timer.clear(this,this.timeCheck);
        }
        this.gear = v;
        // this.status = v;
    }

    public reset(){
        this._isAuto = false;
        this.gear = false;
        this.cur = null;
    }

    // private btnCtl: ButtonCtl;
    // private lun:Laya.Image;
    private get model(){
        return HeroHouseModel.Ins;
    }
    constructor() {
    }
    // public bind(smallBtn: Laya.Image,lun:Laya.Image) {
        // this.btn = btn;
        // this.lun = lun;
        // this.btnCtl = ButtonCtl.CreateBtn(smallBtn, this, this.onClickHandler);
        // this.btnCtl.skin.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
        // this.btnCtl.skin.on(Laya.Event.DISPLAY,this,this.onDisplay);
    // }

    // private onDisplay(){
        // MainModel.Ins.on(MainEvent.GymCardUpdate,this,this.updateSetBtnEvt);
        // this.updateSetBtnEvt();
        // this.gear = this._isAuto;
    // }

    // private updateSetBtnEvt(){
    //     if(MainModel.Ins.heroPackVo.canProxy){
    //         this.btnCtl.visible = true;
    //     }else{
    //         this.btnCtl.visible = false;
    //     }
    // }

    // private onUnDisplay(){
    // MainModel.Ins.off(MainEvent.GymCardUpdate,this,this.updateSetBtnEvt);
    // this.gear = false;
    // }
    onClickHandler() {
        if(!this._isAuto){
            E.ViewMgr.Open(EViewType.HeroHouseWeiTuo);
        }else{
            E.ViewMgr.ShowMidOk("取消委托!");
            this.setAuto(false);
        }
        // this.isAuto = !this.isAuto;
        // this.gear = this.isAuto;
    }
    // private onAutoHandler() {
    //     this.lun.rotation += 1;
    // }
    private set gear(v: boolean) {
        // if (v) {
        //     Laya.timer.frameLoop(1, this, this.onAutoHandler);
        // } else {
        //     Laya.timer.clear(this, this.onAutoHandler);
        // }
        // this.status = v;
        HeroHouseModel.Ins.event(GymEvent.SetGear,v);
    }

    // private set status(v){
        // if(this.btn){
        // this.btn.statusLabel = v ? "演武中":""
        // }
    // }

    /**继续委托邀请武将 */
    public continueTask(){
        if(this._isAuto){
            if(!this.model.bInviteFull){
                // LogSys.Log("继续任务!!!");
                // if(HeroHouseModel.Ins.canInvite()){
                HeroHouseModel.Ins.invite();
                // }
            }else{
                this.setAuto(false);
            }
        }
    }

    /**终止任务 */
    public stopTask(){
        this._isAuto = false;
        this.gear = this._isAuto;
    }

    public check(cur:GymInviteVo){
        if(this._isAuto){
            let isOpen = false;//是否需要打开结算奖励面板

            let _vo: GymSkinVo = cur.getSkinVo();
            if (_vo.imgCfg.f_peopleType == 1 || _vo.imgCfg.f_peopleType == 2) {
                // LogSys.Log("富商或者乞丐");
            }
            else {
                if (this.uiVo.qua) {
                    if (_vo.qua >= this.uiVo.qua) {
                        LogSys.Log(StringUtil.format("qua终止{0} {1}", _vo.qua, this.uiVo.qua));
                        // E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"qua 终止");
                        // this.stopTask();
                        isOpen = true;
                    }
                }

                if (!isOpen && this.uiVo.bNewHero) {
                    if (cur.mData.result == EGymAction.ShowInherit) {
                        if (this.model.hasGetHero(cur.heroCfg.f_HeroID)) {
                            LogSys.Log(StringUtil.format("人物类型{0},新英雄武魂 heroid:{1}", cur.mData.type, cur.mData.heroId));
                            isOpen = true;
                        }
                    }
                }
                if (!isOpen && this.uiVo.bSmriti) {
                    if (HeroHouseModel.Ins.isBetterThan(cur.mData.item)) {
                        LogSys.Log(StringUtil.format("人物类型{0} heroid:{1} 武魂完整度:{3}", cur.mData.type, cur.mData.heroId, cur.mData.endtime));
                        isOpen = true;
                    }
                }
            }
            if(isOpen){
                this.open(cur);
            }else{
                HeroHouseModel.Ins.forget(cur);
            }
        }else{
            this.open(cur);
        }
    }

    private open(cur:GymInviteVo){
        this.cur = cur;
        HeroHouseModel.Ins.openPop();
    }
}