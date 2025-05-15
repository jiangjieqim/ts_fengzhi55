import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { MainModel } from "../../main/model/MainModel";

export class YaoQingItem extends ui.views.yaoqing.ui_yqItemUI{
    constructor() {
        super();

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        E.sdk.goShareData('inviterId=' + MainModel.Ins.mRoleData.AccountId);
    }

    public setData(value:any){
        if(value.data){
            MainModel.Ins.setTTHead(this.icon,MainModel.Ins.convertHead(value.data.portrait));
            this.lab.text = value.data.name;
            this.lab_lv.text = "Lv." + value.data.level;
            this.btn.visible = false;
            if(value.data.level >= 100){
                this.sp.visible = true;
            }else{
                this.sp.visible = false;
            }
        }else{
            this.icon.skin = "";
            this.lab.text = "";
            this.lab_lv.text = "";
            this.btn.visible = true;
            this.sp.visible = false;
        }
    }
}