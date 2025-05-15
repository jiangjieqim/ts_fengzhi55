import { stActivationInfo, stInvitationInfo, stInvitationTopPlayer } from "../../../../network/protocols/BaseProto";

export class YaoQingModel extends Laya.EventDispatcher{
    private static _ins: YaoQingModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new YaoQingModel();
        }
        return this._ins;
    } 

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_RED:string = "UPDATA_RED";

    public YQRed:boolean;

    public inviteNum:number;//已邀请的总人数
    public topList:stInvitationTopPlayer[];//邀请玩家的等级前5名信息
    public invitationList:stInvitationInfo[];//邀请列表
    public activationList:stActivationInfo[];//激活列表
}