import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { ChiefBuyFlag_req, NicknameModify_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { SheZhiModel } from "../model/SheZhiModel";

export class XiuGaiNCView extends ViewBase{
    private _ui:ui.views.shezhi.ui_xiugaincViewUI;
    protected mMask = true; 

    protected onAddLoadRes() {
        this.addAtlas('shezhi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.shezhi.ui_xiugaincViewUI;
            this.bindClose(this._ui.close1);

            ButtonCtl.Create(this._ui.btn1,new Laya.Handler(this,this.onBtn1Click))
        }
    }

    private onBtn1Click(){
        if(this._ui.input1.text == ""){
            E.ViewMgr.ShowMidError("请输入需要修改的昵称");
            return;
        }
        E.ViewMgr.ShowMsgBox(
            EMsgBoxType.OkOrCancel,
            `是否修改当前昵称`,
            new Laya.Handler(this, () => {
                let req:NicknameModify_req = new NicknameModify_req;
                req.name = this._ui.input1.text;
                SocketMgr.Ins.SendMessageBin(req);
            })
        );
    }

    protected onInit() {
        this._ui.input1.text = "";
        if(SheZhiModel.Ins.bcState){
            this._ui.tf5.visible = false;
            this._ui.sp.visible = true;
            let val = System_RefreshTimeProxy.Ins.getVal(101);
            let id = parseInt(val.split("-")[0]);
            this._ui.icon.skin = IconUtils.getIconByCfgId(id);
            this._ui.lab_m.text = val.split("-")[1];
        }else{
            this._ui.tf5.visible = true;
            this._ui.sp.visible = false;
        }
    }

    protected onExit() {

    }
}