import { LogSys } from "../../../frame/log/LogSys";
import { BaseModel } from "../../../frame/util/ctl/BaseModel";
import { StringUtil } from "../../../frame/util/StringUtil";
import {TimeUtil} from "../../../frame/util/TimeUtil";
import { InitConfig } from "../../../InitConfig";
import { Frame } from "../../audio/AudioMgr";
import { EPID, EViewType } from "../../common/defines/EnumDefine";
// import { Player } from "../../player/Player";
import {EventID} from "../../event/EventID";
import { E } from "../../G";
import { ILoginResult, LoginViewNew } from "../../view/handle/login/LoginViewNew";
import { MainModel } from "../../view/handle/main/model/MainModel";
import { SERVERTYPE } from "../ClientSocket";
import { MSGID } from "../MSGID";
import { Kick_revc, WebClientLogin_req, WebClientLogin_revc, WebClientRegist_req, WebClientRegist_revc, wxLogin_req } from "../protocols/BaseProto";
import { uint64 } from "../protocols/uint64";
import {SocketMgr} from "../SocketMgr";

/**
 * 登录消息通信处理
*/
export class LoginClient extends BaseModel{
    //#region 静态
    private static _ins: LoginClient;
    public static get Ins() {
        if (!this._ins) this._ins = new LoginClient();
        return this._ins;
    }
    public onInitCallBack():void{

    }
    //#endregion
    public openId:string = "";
    //#region 实例

    public initMsg(): void {
        E.MsgMgr.AddMsg(MSGID.WebClientRegistRsp, this.onRegistRsp,this);
        E.MsgMgr.AddMsg(MSGID.WebClientLoginRsp, this.onLoginRsp,this);
        E.MsgMgr.AddMsg(MSGID.KickNtf, this.onKickNtf,this);
    }

    //#region 注册消息

    public ReqRegist(acc: string, pwd: string) {
        if (SocketMgr.Ins.IsConnect()) {
            let obj: WebClientRegist_req = new WebClientRegist_req();
            obj.pid = EPID.Internal;
            obj.account = acc;
            obj.password = pwd;
            SocketMgr.Ins.SendMessageBin(obj);
            return;
        }else{
            //socket未连接,连接后再登录
            SocketMgr.Ins.ConnectWebsocket(this, () => {
                this.ReqRegist(acc, pwd);
            });
        }
    }

    /**
     * @param type 0非断线重现 1 断线重连
     */
    private wxLogin(type:number){
        let req:wxLogin_req = new wxLogin_req();
        let _data:ILoginResult = InitConfig.wxLoginResult.result;
        req.appid = _data.appid;
        req.openid = _data.openid;
        req.token = _data.token;
        req.type = type;
        req.inviterId = 0;
        let distinctId = "";
        if(E.ta){
            if(E.ta.store){
                distinctId = E.ta.store._state.distinct_id;
            }else if(E.ta.persistence){
                distinctId = E.ta.persistence._state.distinct_id;
            }
        }
        req.distinctId = distinctId;
        req.scene = 0;
        req.tunnelId = E.sdk.cbsgTunnelId;
        if (window['wx']) {
            const data = wx.getLaunchOptionsSync();
            req.scene = data['scene'];
            const inviterId = Number(data['query'] && data['query']['inviterId']);
            if (inviterId) {
                req.inviterId = inviterId;
            }
        } else {
            const inviterId = Number(Laya.Utils.getQueryString("inviterId"));
            if (inviterId) {
                req.inviterId = inviterId;
            }
        }
            
        LogSys.Log("wxLogin:"+req.appid+","+req.openid+","+req.token+","+req.type+","+req.distinctId+","+req.scene+","+req.inviterId);
        SocketMgr.Ins.SendMessageBin(req);
    }

    public wxNormalLogin(){
        if (SocketMgr.Ins.IsConnect()) {
            this.wxLogin(0);
            E.taLoginTrack("socketLinkComplete")
            // console.log("socket链接完成")
        }else{
            SocketMgr.Ins.ConnectWebsocket(this,this.onConnectSucceed);
        }
    }

    private onConnectSucceed(){
        let id:number = EViewType.LoginNew;

        if(E.ViewMgr.IsOpen(id)){
            let view:LoginViewNew = E.ViewMgr.Get(id) as LoginViewNew;
            if(view){
                view.onUnlockEnter();
                E.ViewMgr.closeWait();
            }
        }
    }

    public wxReconnetLogin(){
        this.wxLogin(1);
    }

    

    // public startConnect(){
    //     SocketMgr.Ins.ConnectWebsocket(this,this.statrtWxLogin);
    // }

    /**注册返回 */
    private onRegistRsp(data: WebClientRegist_revc) 
    {
        E.EventMgr.emit(EventID.WebClientRegistRsp, { errorID: data.errorID });
    }

    //#endregion

    //#region 登录消息

    /**登录请求
     * @param acc 账号
     * @param pwd 密码
    */
    public ReqLogin(acc: string, pwd: string) {
        if (SocketMgr.Ins.IsConnect()) {
            let msg: WebClientLogin_req = new WebClientLogin_req();
            msg.account = acc;
            msg.password = pwd;
            msg.pid = EPID.Internal;
            // msg.openid = E.sdk.getOpenId();
            // LogSys.Log("WebClientLogin_req:",JSON.stringify(msg));
            SocketMgr.Ins.SendMessageBin(msg);
            E.ViewMgr.openWait(true);
            return;
        }
        //连接后再登录
        SocketMgr.Ins.ConnectWebsocket(this, () => {
            this.ReqLogin(acc, pwd);
        });
    }

    private onAudioComplete(){
        LogSys.Log("onAudioComplete...");
        E.AudioMgr.PlayBGM(Frame.BGMDefine.bgm);
    }

    public startPlayAudio(){
        E.AudioMgr.LoadAudio(this,this.onAudioComplete,this.loadAudioProgress)
    }

    private loadAudioProgress(v:number){
        LogSys.Log("loadAudioProgress:"+v);
    }

    /**登录返回*/
    private onLoginRsp(data: WebClientLogin_revc): void {
        if (data.errorID == 0) {
            let model = MainModel.Ins;

            model.clearUI();

            SocketMgr.Ins.HeartMillisecond = data.serverConfig.HeartMillisecond;
            //客户端-服务器-时间差值
            TimeUtil.serverTimeV = data.serverConfig.ServerTime;
            // LogSys.Log("ServerTime:"+TimeUtil.timestamtoTime(TimeUtil.serverTime * 1000));
            let opentime = data.serverConfig.openTime;
            if(opentime.isZero()){
                opentime = new uint64(TimeUtil.serverTime);
            }
            TimeUtil.openTime = opentime;
            LogSys.Log("开服时间:"+TimeUtil.timestamtoTime(TimeUtil.serverTime * 1000));

            model.isNewRole = data.newRole == 1;

            let mRoleData = model.mRoleData;
            mRoleData.mBaseInfo = data.BaseInfo;
            mRoleData.mPlayer = data.playerData;

            // mRoleData.mPlayer.HeadUrl = 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epvVWFNMvSCvDD1QdnIaFiagPh0smEyv89AzFqCGRc5FDIZdtWfVec2FDuq5DsdzbwCLFa2gC4W7xg/132';
            // mRoleData.mPlayer.HeadUrl = `https://thirdwx.qlogo.cn/mmopen/vi_32/mUEpYJPWEfEepupX422ib5etOtv5tzia2Sia0icPks7H73sNiaHPGk1BHRDn9ET1iaXnGkSOAxX5S17Jh3EPiat5v0JAg/132`;
            LogSys.Log("url1:"+mRoleData.mPlayer.HeadUrl);

            mRoleData.NickName = data.playerData.NickName;
            mRoleData.AccountId = data.playerData.AccountId;
            mRoleData.serverId = data.playerData.serverId;
            if(initConfig.debug_pay_server_id){
                mRoleData.serverId = parseInt(initConfig.debug_pay_server_id);
            }
            
            //todo 测试用
            // mRoleData.serverId = 999888777;
            if(!StringUtil.IsNullOrEmpty(data.playerData.naming)){
                mRoleData.serverName = data.playerData.naming;
            }else{
                mRoleData.serverName = data.playerData.serverName;
            }
            model.initEquipList(data.BaseInfo.equipItem);
            model.initCD(1);//data.BaseInfo.boxCdTime
            //Test+
            // if(model.isTest){
                // if (mRoleData.mBaseInfo.boxCdTime == 0) {
                    // mRoleData.mBaseInfo.boxCdTime = 3;//默认设置为3秒
                // }
                // model.addEquipItemVo(DataFactoryTest.createRandomEquip(EEquipType.Shoulder,EWearableType.Wearable,new uint64(0,1,true)));
                // model.addEquipItemVo(DataFactoryTest.createRandomEquip(EEquipType.Casque,EWearableType.Wearable,new uint64(0,2,true)));
                

                // let l = DataFactoryTest.createEquipItemVo
                // mRoleData.setAttr()
            // }

            // console.log("onLoginRsp:", data);

            this.startPlayAudio();

        }
        E.ViewMgr.closeWait();
        E.EventMgr.emit(EventID.WebClientLoginRsp, { errorID: data.errorID });
    }

    //#endregion


    /**踢出通知 */
    private onKickNtf(data: Kick_revc): void {
        SocketMgr.Ins.KickNtfType = data.reason;
        SocketMgr.Ins.setServerType(SERVERTYPE.KickNtf);
        // console.log("onKickNtf:", data.reason);
    }

}