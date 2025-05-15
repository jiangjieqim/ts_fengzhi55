import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { ELayerType } from "../../../layer/LayerMgr";
import { SERVERTYPE } from "../../../network/ClientSocket";
import { MSGID } from "../../../network/MSGID";
import { DingYueRevc_revc, DingYueSelectRevc_revc, NicknameModify_revc, NicknameModifySuccess_revc, SelectServerIDRevc_revc, ServerListRevc_revc, ServerNumRevc_revc, stDingYue } from "../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../network/SocketMgr";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { SheZhiModel } from "./model/SheZhiModel";
import { DingYueView } from "./view/DingYueView";
import { QuFuView } from "./view/QuFuView";
import { SheZhiView } from "./view/SheZhiView";
import { XiuGaiNCView } from "./view/XiuGaiNCView";
import { YinSiView } from "./view/YinSiView";

export class SheZhiModule extends BaseModel{
    private static _ins:SheZhiModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new SheZhiModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{}

    public initMsg(){
        this.Reg(new SheZhiView(EViewType.SheZhiView));
        this.Reg(new YinSiView(EViewType.YinSiView,ELayerType.subFrameLayer));
        // this.Reg(new GongGaoView(EViewType.GongGaoView));
        this.Reg(new DingYueView(EViewType.DingYueView));
        this.Reg(new QuFuView(EViewType.QuFuView));
        this.Reg(new XiuGaiNCView(EViewType.XiuGaiNCView));

        E.MsgMgr.AddMsg(MSGID.ServerNumRevc, this.ServerNumRevc,this);
        E.MsgMgr.AddMsg(MSGID.ServerListRevc, this.ServerListRevc,this);
        E.MsgMgr.AddMsg(MSGID.SelectServerIDRevc, this.SelectServerIDRevc,this);
        E.MsgMgr.AddMsg(MSGID.DingYueRevc, this.DingYueRevc,this);
        E.MsgMgr.AddMsg(MSGID.DingYueSelectRevc, this.DingYueSelectRevc,this);
        E.MsgMgr.AddMsg(MSGID.NicknameModify, this.NicknameModify,this);
        E.MsgMgr.AddMsg(MSGID.NicknameModifySuccess, this.NicknameModifySuccess,this);
    }

    //游戏内请求区服多少组返回
    private ServerNumRevc(value:ServerNumRevc_revc){
        SheZhiModel.Ins.serverZu = value.serverZu;
        SheZhiModel.Ins.event(SheZhiModel.UPDATA_VIEW);
    }

    //当前组的服务器列表返回
    private ServerListRevc(value:ServerListRevc_revc){
        SheZhiModel.Ins.serverItems = value.serverItems;
        SheZhiModel.Ins.event(SheZhiModel.UPDATA_VIEW_ITEM);
    }

    private SelectServerIDRevc(value:SelectServerIDRevc_revc){
        if(value.ret == 1){
            SocketMgr.Ins.setServerType(SERVERTYPE.SELECTTYPE);
            SocketMgr.Ins.CloseSocket();
        }
    }

    //订阅状态服务器返回
    private DingYueRevc(value:DingYueRevc_revc){
        SheZhiModel.Ins.dyType = value.type;
        SheZhiModel.Ins.dingyueList = value.dyList;
        SheZhiModel.Ins.event(SheZhiModel.UPDATA_MAIN_VIEW);
    }

    //订阅状态选择服务器返回
    private DingYueSelectRevc(value:DingYueSelectRevc_revc){
        let vo = SheZhiModel.Ins.dingyueList.find(item => (item as stDingYue).id == value.id);
        if(vo){
            vo.type = value.type;
        }
    }

    //3010初始化前推，修改昵称后推
    private NicknameModify(value:NicknameModify_revc){
        SheZhiModel.Ins.bcState = value.state;
    }

    //玩家修改昵称成功后返回
    private NicknameModifySuccess(value:NicknameModifySuccess_revc){
        MainModel.Ins.mRoleData.mPlayer.NickName = value.name;
        MainModel.Ins.event(MainEvent.UpdateAvatarNickName);
        E.ViewMgr.ShowMidOk("修改成功");
        E.ViewMgr.Close(EViewType.XiuGaiNCView);
    }
}