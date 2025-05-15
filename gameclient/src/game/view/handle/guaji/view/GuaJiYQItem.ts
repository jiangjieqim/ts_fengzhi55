import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { MainModel } from "../../main/model/MainModel";
import { GuaJiCfgProxy } from "../proxy/GuaJiProxy";

export class GuaJiYQItem extends ui.views.guaji.ui_yaoQingItemUI{
    constructor() {
        super();

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        // E.ViewMgr.ShowMidError("SDK接入中");//显示错误提示
        E.sdk.goShareData('afkinviter=' + MainModel.Ins.mRoleData.AccountId);
    }

    public setData(value:any){
        if(value.data){
            MainModel.Ins.setTTHead(this.icon, MainModel.Ins.convertHead(value.data.portrait));
            let t = GuaJiCfgProxy.Ins.GetDataById(1).f_SingleFriendHelpTime;
            this.lab.text = "+" + TimeUtil.getTimeShow(t);
            this.btn.visible = false;
        }else{
            this.icon.skin = "";
            this.lab.text = "";
            this.btn.visible = true;
        }
    }
}