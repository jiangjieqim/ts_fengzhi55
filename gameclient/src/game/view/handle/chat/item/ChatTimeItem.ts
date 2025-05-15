import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ui } from "../../../../../ui/layaMaxUI";

export class ChatTimeItem extends ui.views.chat.ui_chatTimeItemUI{

    constructor() {
        super();
        this.on(Laya.Event.DISPLAY, this, this.onDisplay);
        this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
    }

    private onDisplay(){

    }

    private onUnDisplay(){

    }

    public setData(value:number){
        if(!value)return;
        this.lab.text = TimeUtil.timestamtoTime2(value);
    }
}