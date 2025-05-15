import {StringUtil} from "../StringUtil";
import {TimeUtil} from "../TimeUtil";
export enum ETimeShowStyle{
    Chinese = 0,//中文时间显示
    Number = 1,//数字显示
    Second = 2,//倒计时秒
    HMS = 3,//时分秒
}
export class TimeCtlV2 extends Laya.EventDispatcher{
    public subTime:number = 0;
    public style:ETimeShowStyle = ETimeShowStyle.Chinese;
    /**
     * 偏移秒
     */
    private offsetSecond:number = 0;
    private tf:Laya.Label;

    private ticket:number = 0;
    private _isEnd:boolean = true;
    // private updateHandler:Laya.Handler;
    private format:string;

    constructor(tf: Laya.Label, format: string = "{0}",_offsetSec:number = 0,hasEvent:boolean=true) {
        super();
        this.offsetSecond = _offsetSec;
        this.format = format;
        this.tf = tf;
        this.tf.text = "";
        if(hasEvent){
            this.tf.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
        }
    }

    private onUnDisplay(){
        this.stop();
    }

    private setText(v:number){
        this.subTime = v;
        let v1 = "";
        switch (this.style) {
            case ETimeShowStyle.Number:
                v1 = TimeUtil.timeFormatStr(v, true);
                break;
            case ETimeShowStyle.Chinese:
                v1 = TimeUtil.subTime(v);
                break;
            case ETimeShowStyle.Second:
                v1 = v.toString();
                break;
            case ETimeShowStyle.HMS:
                v1 = TimeUtil.subTimeHMS(v);
                break;
        }
        // console.log(v1);
        if(this.tf && !this.tf.destroyed){
            this.tf.text = StringUtil.format(this.format,v1);
            this.event(Laya.Event.CHANGE);
        }else{
            // console.error("please check tf!");
            LogSys.Warn("CHANGE tf is destroyed!");
            this.dispose();
        }
    }

    /**
     * @param s 剩余的秒
     */
    public start(s:number){
        this.ticket = s + this.offsetSecond;
        this.timeTick();
    }

    private timeTick(){
        this.ticket--;
        if(this.ticket >= 0){
            this._isEnd = false;
            this.setText(this.ticket - this.offsetSecond);
            Laya.timer.once(1000,this,this.timeTick);
        }else{
            this._isEnd = true;
            if(this.tf && !this.tf.destroyed){
                this.event(Laya.Event.COMPLETE);
            }else{
                LogSys.Warn("COMPLETE tf is destroyed!");
                this.dispose();
            }
        }
    }

    /**是否播放完成 */
    public get isPlayingEnd(){
        // return this.ticket < 0;
        return this._isEnd;
    }

    public stop(){
        if(this.tf && !this.tf.destroyed){
            this.tf.text = "";
        }
        this._isEnd = true;
        this.ticket = -1;
        Laya.timer.clear(this,this.timeTick);
        this.offAll(Laya.Event.COMPLETE);
        this.offAll(Laya.Event.CHANGE);
    }

    public dispose(){
        this.stop();
        this.tf.off(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
    }
}