import { TimeCtlV2 } from "../../../../../../frame/util/ctl/TimeCtlV2";
import { ActivityModel } from "../../../huodong/ActivityModel";
import { ActivityEvent } from "../../../huodong/model/ActivityEvent";
import { EFuncDef } from "../../model/EFuncDef";
import { TopMainIcon } from "./TopMainIcon";
/**弹出窗口的icon */
export class TopPopTimeIcon extends TopMainIcon {
    private _timeCtl:TimeCtlV2;
    constructor() {
        super();
        this.skin.on(Laya.Event.DISPLAY, this, this.onDisplay);
        this.skin.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
    }
    protected onDisplay() {
        // ActivityModel.Ins.on(ActivityEvent.UpdateData, this, this.onRefreshHandler);
        this.onRefreshHandler();
    }

    /**开始倒计时 */
    protected startPlayTime(sub:number){
        if(!this._timeCtl){
            this._timeCtl = new TimeCtlV2(this.mSkin.timetf,"{0}");
        }
        this.mSkin.timetf.visible = true;
        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);

        this._timeCtl.start(sub);
    }

    protected onTimeComplete(){
        this.mSkin.timetf.text = "";
    }

    protected onRefreshHandler() {
        // let funid: number = parseInt(this.cfg.f_funid);
        // if (funid == EFuncDef.PopWin) {
            // this.updateTime(5);
        // }
        //console.log("funid:"+funid);
    }

    protected onUnDisplay() {
        // ActivityModel.Ins.off(ActivityEvent.UpdateData, this, this.onRefreshHandler);
        this.stopTime();
        this.mSkin.timetf.visible = false;
    }

    protected stopTime(){
        if(this._timeCtl){
            this._timeCtl.stop();
        }
    }
    public dispose() {
        this.dispose();
        this.skin.off(Laya.Event.DISPLAY, this, this.onDisplay);
        this.skin.off(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
    }
}