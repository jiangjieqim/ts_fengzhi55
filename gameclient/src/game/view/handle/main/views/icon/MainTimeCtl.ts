import { TimeUtil } from "../../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../../frame/util/ctl/TimeCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { XianShiLiBaoModel } from "../../../xianshilibao/model/XianShiLiBaoModel";

export class MainTimeCtl{
    private skin: ui.views.main.ui_main_timeUI;
    private _timeCtl:TimeCtl;

    constructor(skin:ui.views.main.ui_main_timeUI) {
        this.skin = skin;
        this.skin.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){
        
    }

    private onRemove(){
        XianShiLiBaoModel.Ins.off(XianShiLiBaoModel.UPDATA_VIEW,this,this.updataView);
        if(this._timeCtl){
            this._timeCtl.dispose();
            this._timeCtl = null;
        }
    }

    private updataView(){
        Laya.timer.callLater(this,this.setTime);
    }

    public setTime(){
        if(!this._timeCtl){
            XianShiLiBaoModel.Ins.on(XianShiLiBaoModel.UPDATA_VIEW,this,this.updataView);
            this._timeCtl = new TimeCtl(this.skin.tf);
        }
        let timeEnd = XianShiLiBaoModel.Ins.getPopWinSmallTime();
        if(timeEnd){
            this._timeCtl.start(timeEnd - TimeUtil.serverTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
        }else{
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }
}