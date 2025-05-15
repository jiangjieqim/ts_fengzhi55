import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { E } from "../../../../G";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { HeroHouseModel } from "../HeroHouseModel";
import { t_Gym_Config } from "./GymProxy";

/**邀请券恢复控制器 */
export class InviationCtl {
    private timeTf:Laya.Label;
    private _time:number;
    private ticket:number = 0;
    private itemCfgId:number = ECellType.HeroInvite;
    private _oldCount:number;
    // private mFull:boolean = false;
    /**最大数量 */
    private get maxCount(){
        return t_Gym_Config.Ins.cfg.f_LetterMax;
    }
    /**恢复最大时间 */
    private get maxSubSecond(){
        return t_Gym_Config.Ins.cfg.f_LetterIncreaseTime;
    }
    /**下次的刷新时间戳 */
    public set nextRefreshTime(v:number){
        this._time = v;

        if(v == 0){
            this.ticket = this.maxSubSecond;
        }else{
            this.ticket = v- TimeUtil.serverTime;
        }
        this._oldCount = MainModel.Ins.mRoleData.getVal(this.itemCfgId);

        // LogSys.Log(`邀请券恢复,距离下次刷新的时间${this.ticket}秒 time:${this._time} 邀请券数量:${this._oldCount}/${this.maxCount}`);

        if(this._oldCount < this.maxCount){
            this.ticketTime();
        }else{
            this.clearTf();
        }
    }

    private ticketTime() {
        // this.mFull = false;
        if (this.ticket > 0) {
            // LogSys.Log(`InviationCtl ===>剩余${this.ticket}秒`);
            Laya.timer.once(1000, this, this.ticketTime);
        }else{
            if (MainModel.Ins.mRoleData.getVal(this.itemCfgId) < this.maxCount) {
                HeroHouseModel.Ins.reqInviation();
            }else{
                //满了
                // this.mFull = true;
                this.clearTf();
            }
        }
        this.refreshView();
        this.ticket--;
    }

    public bind(timeTf:Laya.Label){
        this.timeTf = timeTf;
        this.timeTf.on(Laya.Event.DISPLAY,this,this.onDisplay);
        this.timeTf.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
    }

    private onDisplay(){
        this.bind(this.timeTf);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.itemChange);
        // this.refreshView();
        this.nextRefreshTime = this._time;
    }

    private itemChange(id:number){
        if(id == this.itemCfgId){
            if(this._time == 0){
                // Laya.timer.callLater(this,this.onLater)
                let _newCount = MainModel.Ins.mRoleData.getVal(this.itemCfgId);
                if(this._oldCount == this.maxCount && this._oldCount != _newCount){
                    this.nextRefreshTime = TimeUtil.serverTime + t_Gym_Config.Ins.cfg.f_LetterIncreaseTime;
                }
            }
        }
    }

    private onLater(){
        HeroHouseModel.Ins.reqInviation();
    }

    private onUnDisplay() {
        // this.bind(null);
        MainModel.Ins.off(MainEvent.ValChangeCell,this,this.itemChange);
        Laya.timer.clearAll(this);
    }

    private refreshView() {
        if (this.timeTf && this.timeTf.displayedInStage) {
            if(this._time == 0){
                this.timeTf.text = "";
            }else{
                let sub = this._time - TimeUtil.serverTime;
                if(sub > this.maxSubSecond){
                    sub - this.maxSubSecond;
                }
                if (sub <= 0) {
                    this.timeTf.text = "";
                } else {
                    this.setTimeTxt(E.getLang("GymHuifu") + TimeUtil.subTime(sub));
                }
            }
        }
    }

    private clearTf(){
        if(this.timeTf && this.timeTf.displayedInStage){
            this.timeTf.text = "";
        }
    }

    private setTimeTxt(v:string){
        this.timeTf.text = v;
        // if(E.Debug){
        // console.log("设置时间:"+v);
        // }
    }

}