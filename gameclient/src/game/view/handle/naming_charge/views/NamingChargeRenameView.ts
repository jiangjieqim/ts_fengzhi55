import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { NameingServer_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { MainModel } from "../../main/model/MainModel";
import { NamingChargeModel } from "../NamingChargeModel";
/**修名 */
export class NamingChargeRenameView extends ViewBase{
    protected autoFree:boolean = true;
    private _ui:ui.views.naming_charge.ui_jianghuyouming_renameUI;
    private mod_btnCtl:ButtonCtl;
    private model:NamingChargeModel;
    protected mMask:boolean = true;
    private _timeCtl:TimeCtlV2;

    protected onAddLoadRes(): void {
        // throw new Error("Method not implemented.");
    }
    protected onExit(): void {
        // throw new Error("Method not implemented.");
        this.mod_btnCtl.dispose();
        this._timeCtl.dispose();
    }
    protected onFirstInit(): void {
        if(!this.UI){
            this.model = NamingChargeModel.Ins;
            this.UI = this._ui = new ui.views.naming_charge.ui_jianghuyouming_renameUI();
            this.bindClose(this._ui.close_btn);
            this.mod_btnCtl = ButtonCtl.CreateBtn(this._ui.mod_btn,this,this.onModHandler)
            this._ui.tips_tf.text = E.getLang("naming_charge_01");
            this._timeCtl = new TimeCtlV2(this._ui.time_tf,"{0}");
            this._ui.input1.prompt = E.getLang("naming_charge_13");
        }
        // throw new Error("Method not implemented.");
    }

    private checkNotCN(str:string){
        let reg = /[\u4e00-\u9fa5]/; 
        
        for(let i = 0;i < str.length;i++){
            let s= str[i];
            if(reg.test(s) == false){
                return true;
            }
        }
    }

    /**修改 */
    private onModHandler(){
        let str:string = this._ui.input1.text;
        if(StringUtil.IsNullOrEmpty(str)){
             
            E.ViewMgr.ShowMidError(E.getLang("naming_charge_11"));
            return;
        }
        let limit:number = System_RefreshTimeProxy.Ins.getNumberVal(81);
        if(StringUtil.getNumBytes(str) > limit){
            E.ViewMgr.ShowMidError(E.getLang("naming_charge_09",limit/2));
            return;
        }

        if(this.checkNotCN(str)){
            E.ViewMgr.ShowMidError(E.getLang("naming_charge_10"));
            return;
        }

        let req = new NameingServer_req();
        req.serverName  = str;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    protected onInit(): void {
        // throw new Error("Method not implemented.");
        this._ui.input1.text = "";
        if(this.model.isCanNamed){
            this._ui.sp0.visible = true;
            this._ui.sp1.visible = false;
        }else{
            this._ui.sp0.visible = false;
            this._ui.sp1.visible = true;
            this._ui.mid_desc_tf.text = E.getLang("naming_charge_05",MainModel.Ins.mRoleData.serverName);
        }
        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
        let sub = NamingChargeModel.Ins.initData.namedEndUnix - TimeUtil.serverTime;
        this._timeCtl.start(sub);
    }
    private onTimeComplete(){
        this._ui.desc_tf.text = "";
        this._ui.time_tf.text = "";
    }
}