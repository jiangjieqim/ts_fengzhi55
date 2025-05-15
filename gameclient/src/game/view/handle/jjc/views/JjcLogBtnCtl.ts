import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import {DotManager} from "../../common/DotManager";
import { IJJC_Model } from "../../peakjjc/model/IJjcInterface";
import { JjcEvent } from "../vos/JjcEvent";
/**竞技场日志按钮 */
export class JjcLogBtnCtl extends ButtonCtl{
    private handler:Laya.Handler = new Laya.Handler(this,this.onClickHandler);
    private model:IJJC_Model;
    constructor(skin:Laya.Image,model:IJJC_Model){
        super(skin);
        this.model = model;
        this.clickHandler = this.handler;
        skin.on(Laya.Event.DISPLAY,this,this.onDisplay);
        skin.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
    }
    private onDisplay(){
        this.model.on(JjcEvent.RedUpdate,this,this.onRedHandler);
        this.onRedHandler();
    }
    private onUnDisplay(){
        this.model.off(JjcEvent.RedUpdate,this,this.onRedHandler);
    }
    private onRedHandler(){
        if(this.model.mDropRed){
            DotManager.addDot(this.skin);
        }else{
            DotManager.removeDot(this.skin);
        }
    }

    private onClickHandler(){
        E.ViewMgr.Open(EViewType.jjcLog,null,this.model);
        this.model.mDropRed = false;
        this.model.updateRed();
    }
}