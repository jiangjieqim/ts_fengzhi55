import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { InvitationActivationUpdate_revc, InvitationRed_revc, InvitationUpdate_revc, Invitation_revc } from "../../../network/protocols/BaseProto";
import { YaoQingModel } from "./model/YaoQingModel";
import { YaoQingView } from "./view/YaoQingView";
import { YaoQingView1 } from "./view/YaoQingView1";

export class YaoQingModule extends BaseModel{
    private static _ins:YaoQingModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new YaoQingModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{}

    public initMsg(): void {
        this.Reg(new YaoQingView(EViewType.YaoQing));
        this.Reg(new YaoQingView1(EViewType.YaoQingXQ));

        E.MsgMgr.AddMsg(MSGID.InvitationRed, this.InvitationRed,this);
        E.MsgMgr.AddMsg(MSGID.Invitation, this.Invitation,this);
        E.MsgMgr.AddMsg(MSGID.InvitationUpdate, this.InvitationUpdate,this);
        E.MsgMgr.AddMsg(MSGID.InvitationActivationUpdate, this.InvitationActivationUpdate,this);
    }

    //邀请活动红点
    private InvitationRed(value:InvitationRed_revc){
        if(value.red){
            YaoQingModel.Ins.YQRed = true;
        }else{
            YaoQingModel.Ins.YQRed = false;
        }
        YaoQingModel.Ins.event(YaoQingModel.UPDATA_RED);
    }

    //邀请活动信息
    private Invitation(value:Invitation_revc){
        YaoQingModel.Ins.inviteNum = value.inviteNum;
        YaoQingModel.Ins.topList = value.topList;
        YaoQingModel.Ins.invitationList = value.invitationList;
        YaoQingModel.Ins.activationList = value.activationList;
        YaoQingModel.Ins.event(YaoQingModel.UPDATA_VIEW);
    }

    //邀请列表更新
    private InvitationUpdate(value:InvitationUpdate_revc){
        for(let i:number=0;i<value.invitationList.length;i++){
            let index = YaoQingModel.Ins.invitationList.findIndex(ele => ele.fid == value.invitationList[i].fid);
            if(index != -1){
                YaoQingModel.Ins.invitationList[index] = value.invitationList[i];
            }
        }
        YaoQingModel.Ins.event(YaoQingModel.UPDATA_VIEW);
    }

    //激活列表更新
    private InvitationActivationUpdate(value:InvitationActivationUpdate_revc){
        for(let i:number=0;i<value.activationList.length;i++){
            let index = YaoQingModel.Ins.activationList.findIndex(ele => ele.fid == value.activationList[i].fid);
            if(index != -1){
                YaoQingModel.Ins.activationList[index] = value.activationList[i];
            }
        }
        YaoQingModel.Ins.event(YaoQingModel.UPDATA_VIEW);
    }
}