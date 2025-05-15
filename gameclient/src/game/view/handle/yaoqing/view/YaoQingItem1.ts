import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import {SocketMgr} from "../../../../network/SocketMgr";
import { InvitationGetReward_req } from "../../../../network/protocols/BaseProto";
import {DotManager} from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { YaoQingModel } from "../model/YaoQingModel";
import { MainModel } from "../../main/model/MainModel";

export class YaoQingItem1 extends ui.views.yaoqing.ui_yqItem1UI{
    constructor() {
        super();

        ButtonCtl.Create(this.btn_yq,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn_lq,new Laya.Handler(this,this.onBtnLQClick));
    }

    private onBtnClick(){
        E.sdk.goShareData('inviterId=' + MainModel.Ins.mRoleData.AccountId);
    }

    private onBtnLQClick(){
        if(this._data){
            let req:InvitationGetReward_req = new InvitationGetReward_req;
            req.fid = this._data.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:Configs.t_Invitation_dat;
    public setData(value:Configs.t_Invitation_dat){
        if(!value)return;
        this._data = value;
        let vo = new ItemVo();
        vo.cfgId = parseInt(value.f_Rewardinvitation.split("-")[0]);
        vo.count = parseInt(value.f_Rewardinvitation.split("-")[1]);
        ItemViewFactory.refreshSlot(this.item.item,vo);

        DotManager.removeDot(this.btn_lq);
        let data = YaoQingModel.Ins.invitationList.find(ele => ele.fid == value.f_id);
        if(data){
            this.btn_yq.visible = false;
            if(data.state == 1){
                this.item.sp.visible = false;
                this.btn_lq.visible = true;
                this.lab2.visible = false;
                DotManager.addDot(this.btn_lq);
            }else{
                this.item.sp.visible = true;
                this.btn_lq.visible = false;
                this.lab2.visible = true;
            }
        }else{
            this.item.sp.visible = false;
            this.btn_lq.visible = this.lab2.visible = false;
            this.btn_yq.visible = true;
        }

        this.lab.text = StringUtil.format("邀请{0}名好友且达到{1}级",value.f_InvitationC,value.f_InvitationCon);
        if(YaoQingModel.Ins.inviteNum >= value.f_InvitationC){
            this.lab1.text = value.f_InvitationC + "/" + value.f_InvitationC;
            this.pro.width = 289;
        }else{
            this.lab1.text = YaoQingModel.Ins.inviteNum + "/" + value.f_InvitationC;
            this.pro.width = YaoQingModel.Ins.inviteNum / value.f_InvitationC * 289;
        }
    }
}