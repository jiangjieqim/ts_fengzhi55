import { stAdCd, stAfk, stAfkFast, stAfkInvitee } from "../../../../network/protocols/BaseProto";

export class GuaJiModel extends Laya.EventDispatcher{
    private static _ins: GuaJiModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new GuaJiModel();
        }
        return this._ins;
    } 

    public static CDEnmu = {
        BaoXiangLv:1,//宝箱升级
        GuaJi:2,//快速挂机
        WuGuanSS:3,//武馆神识
        GuangGao:4,//广告
        Boss:5,//凶兽
        Boss1:6
    }

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_KUAISUVIEW:string = "UPDATA_KUAISUVIEW";

    public static UPDATA_CD_TIME:string = "UPDATA_CD_TIME";//观看视频

    public mianData:stAfk;//挂机主界面信息
    public fastData:stAfkFast;//挂机快速挂机信息
    public inviteeData:stAfkInvitee[];//被邀请者列表
    public packEndUnix:number;//购买礼包过期时间

    public stAdCdList:stAdCd[];//cd时间详情

    public setInviteeData(value:stAfkInvitee[]){
        this.inviteeData = value;
    }

    public setPackEndUnix(value:number){
        this.packEndUnix = value;
    }

    public isFree(){
        if(GuaJiModel.Ins.fastData.fastAfkBuyNum == 0){
            return true;
        }
        return false;
    }

    public getstAdCdByType(pos:number){
        if(this.stAdCdList){
            return this.stAdCdList.find(ele => ele.pos == pos);
        }
    }
}