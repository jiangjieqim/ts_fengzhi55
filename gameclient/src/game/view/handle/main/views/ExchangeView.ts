import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { RedemptionCode_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";

export class ExchangeView extends ViewBase{
    private _ui:ui.views.shezhi.ui_duihuanma_viewUI;
    protected mMask:boolean = true;
    protected  onAddLoadRes(): void{}
    protected  onExit(): void{

    }
    private btn1Ctl:ButtonCtl;
    protected  onFirstInit(): void{
        if(!this.UI){
            this.UI = this._ui = new ui.views.shezhi.ui_duihuanma_viewUI();
            this.bindClose(this._ui.close1);
            this.btn1Ctl = ButtonCtl.CreateBtn(this._ui.btn1,this,this.onExchangeHandler);
        }
    }

    private onExchangeHandler(){
        if (StringUtil.IsNullOrEmpty(this._ui.input1.text)) {
            return;
        }
        let req = new RedemptionCode_req();
        req.code = this._ui.input1.text;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onInit(): void {
        this._ui.input1.text = "";
    }
    protected SetCenter(): void {
        super.SetCenter();
        this.UI.y = this.ViewParent.height * 0.4;
    }
}