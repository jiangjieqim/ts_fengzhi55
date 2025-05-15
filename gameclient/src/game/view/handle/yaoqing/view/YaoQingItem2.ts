import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../network/SocketMgr";
import { InvitationGetActivation_req } from "../../../../network/protocols/BaseProto";
import {DotManager} from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { YaoQingModel } from "../model/YaoQingModel";

export class YaoQingItem2 extends ui.views.yaoqing.ui_yqItem3UI{
    constructor() {
        super();

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        if(this._data){
            let req:InvitationGetActivation_req = new InvitationGetActivation_req;
            req.fid = this._data.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:Configs.t_Invitation_Value_dat;
    public setData(value:Configs.t_Invitation_Value_dat){
        if(!value)return;
        this._data = value;
        this.lab.text = StringUtil.format("{0}名好友达到{1}级",value.f_InvitationC,value.f_QuestLevel);

        let st = "";
        let arr = value.f_UpgradeInv.split("|");
        for(let i:number=0;i<arr.length;i++){
            let id = parseInt(arr[i].split(":")[0]);
            let val = attrConvert(id,parseInt(arr[i].split(":")[1]));
            st += MainModel.Ins.getAttrNameIdByID(id) + ":" + val;
            if((i+1) != arr.length){
                st += ",";
            }
        }
        this.lab_dec.text = st;
        DotManager.removeDot(this.btn);
        let data = YaoQingModel.Ins.activationList.find(ele => ele.fid == value.f_id);
        if(data){
            if(data.state == 1){
                DotManager.addDot(this.btn);
                this.sp.visible = true;
                this.btn.visible = true;
                this.btn.disabled = false;
                this.lab1.visible = false;
                this.lab_dec.color = "#F9F0BB";
                this.lab_dec.stroke = 2;
                this.lab_dec.strokeColor = "#561D09";
            }else{
                this.sp.visible = false;
                this.btn.visible = false;
                this.btn.disabled = false;
                this.lab1.visible = true;
                this.lab_dec.color = "#54EDFF";
                this.lab_dec.stroke = 2;
                this.lab_dec.strokeColor = "#2B8AC7";
            }
        }else{
            this.sp.visible = false;
            this.btn.visible = true;
            this.btn.disabled = true;
            this.lab1.visible = false;
            this.lab_dec.color = "#F9F0BB";
            this.lab_dec.stroke = 2;
            this.lab_dec.strokeColor = "#561D09";
        }
    }
}