import { HttpUtil } from "../../../../frame/util/HttpUtil";
import { ButtonCtl } from "../../../../frame/view/ButtonCtl";
import { CheckBoxCtl } from "../../../../frame/view/CheckBoxCtl";
import { ViewBase } from "../../../../frame/view/ViewBase";
import { HrefUtils, InitConfig, PlatformConfig } from "../../../../InitConfig";
import { ui } from "../../../../ui/layaMaxUI";
import { EMsgBoxType, EPageType, EViewType } from "../../../common/defines/EnumDefine";
import { EventID } from "../../../event/EventID";
import { E } from "../../../G";
import { LoginClient } from "../../../network/clients/LoginClient";
import { IServerError } from "../../../network/ClientSocket";
import { WebClientRegist_revc } from "../../../network/protocols/BaseProto";
import { Version } from "../../../Version";
import { SimpleEffect } from "../avatar/SimpleEffect";
import { MainModel } from "../main/model/MainModel";
import { EClientType } from "../sdk/ClientType";

/*
    "code": 0, #0标识成功 非0即失败
    "msg": "success", #消息提示
    "result": {
        "appid": "wx2fa8efa705e9c036", #appid与请求参数中的一致,登录游戏需传递过来
        "openid": "wx2fa8efa705e9c036aaaa", #openid与请求参数中的一致,登录游戏需传递过来
        "tcp": "wss://ws-server.game.wanhuir.com/12", #websocket的地址
        "token": "78dad5de7bc180ec8e3dd9d777740614" #token登录游戏时候需传过来
    }
*/
export interface ILoginResult{
    appid:string;
    openid:string;
    tcp:string;
    token:string;
    /**是否是提审版本 1是 0不是 */
    audit:number;
}

export interface IBaseCode{
    /**
     * #0标识成功 非0即失败
     */
    code:number;
    msg:string;
}
export interface ILoginCode extends IBaseCode{
    result:ILoginResult;
}
export interface INoticeCell{
    Title:string;
    Content:string;
}
/**
 * 公告
 */
export interface INoticeCode extends IBaseCode{
    result:INoticeCell[];
}

export class LoginViewNew extends ViewBase {
    public PageType: EPageType = EPageType.None;
    protected autoFree:boolean = true;
    protected checkGuide:boolean = false;
    protected readonly pwd:string = "0";
    protected _ui: ui.views.login.ui_login_newUI;
    private _enterCtl:ButtonCtl;
    private ckCtl:CheckBoxCtl;
    private eff:SimpleEffect;
    onEnter() {
        // E.ViewMgr.Close(EViewType.ScrollNotice);   
    }

    private delTitleEffect(){
        if(this.eff){
            this.eff.dispose();
            this.eff = null;
        }
    }

    protected onExit() {
        // E.ViewMgr.Open(EViewType.ScrollNotice, null);
        this.delTitleEffect();
        E.ViewMgr.Close(EViewType.NoticePop);
        // spineRes.GC();
    }
    protected onFirstInit() {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.login.ui_login_newUI();
            this._enterCtl = new ButtonCtl(this._ui.enterGame, new Laya.Handler(this,this.onEnterGame));
            // this._enterCtl.gray = true;
            // this._enterCtl.mouseEnable = false;

            // let ctlSkin:ICheckBoxSkin = {bg:this._ui.goubg,gou:this._ui.gou,content:this._ui.content} as ICheckBoxSkin;
            let ckCtl:CheckBoxCtl = new CheckBoxCtl(this._ui);
            ckCtl.selectHander = new Laya.Handler(this,this.onCkSelect);
            ckCtl.selected = true;
            this._ui.content.on(Laya.Event.CLICK,this,this.onContentClick);
            this._ui.content.mouseEnabled = true;
            // this._ui.img0.y = -407;
            this.ckCtl = ckCtl;
            let ver = E.ver + (debug ? `----[${Version.curValue}]` : "");
            this._ui.versionTf.text = ver;
            this._ui.versionTf.color = ver == "v1_0_15" ? "#ff0000":"#00ff00";
            this._ui.versionTf.strokeColor = "#000000";
            this._ui.versionTf.stroke = 2;
            

            if(!Laya.Browser.onPC && initConfig.asset.indexOf("https://")==-1){
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"请使用CDN资源");
            }
            this.btnList.push(
                ButtonCtl.CreateBtn(this._ui.shilinbtn,this,this.onAgeHandler)
            );

            this._ui.lab_sel.on(Laya.Event.CLICK,this,this.onLabSelClick);

            this.initUi();
            this._ui.bg3.skin = "";
            this._ui.img_t.visible = this._ui.lab_id.visible = this._ui.img_t1.visible = false;

            this._ui.lab_id.autoSize = true;

            // if(Laya.Utils.getQueryString("stat")){
            // Laya.Stat.show(0,300);
            // }

            if(Laya.Utils.getQueryString("pet")){
                // let pet = AvatarFactory.createPet(1, false);
                // pet.setPos(Laya.stage.width/2,Laya.stage.height/2);
                // Laya.stage.addChild(pet);
                let that = this;
                window["del"]=function(){
                    that.delTitleEffect();
                }
            }
        }
    }

    private initByVeritf(_verify:boolean){
        let effect:string;  
        let bg3URL:string = "";
        if(window["initConfig"]['littlegame']){
            this._ui.descTf.text =  window["initConfig"]["littledesc"];
            effect = "o/spine/title2/title";
        }else{
            this._ui.descTf.text =  "";//E.getLang("login1");
            let title:string = "title";//戳爆三国
            if(initConfig.clienttype == EClientType.Discount && initConfig.platform != PlatformConfig.WEIXIN_DISCOUNT){
                // title = "title3";//三国游侠0.1折
                // if(initConfig.platform == PlatformConfig.WEIXIN_DISCOUNT){
                // title = "title1";// 戳爆三国0.1折
                // }
                // if(_verify){
                title = "title3_verify";//三国游侠
                // if(initConfig.platform == PlatformConfig.WEIXIN_DISCOUNT){
                //     title = "title";//戳爆三国
                // }
                // }
                // if(!_verify){
                //非提审
                // if(initConfig.platform == PlatformConfig.WEIXIN_DISCOUNT){
                // 戳爆三国0.1折
                // }else{
                // bg3URL =  "static/0_1z_1.png";
                // }
                // }
                effect = `o/spine/${title}/title`;
            }else{
                effect = `o/spine/${title}/title`;
            }
        }
        this._ui.bg3.skin = bg3URL;

        this.eff = new SimpleEffect(this._ui.eff,effect);
        this.eff.autoPlay = true;
        this.eff.play(0,false);
    }

    private updateCheckBox(){
        if(MainModel.Ins.verify){
            this.ckCtl.selected = false;
        }else{
            this.ckCtl.selected = true;
        }
    }


    // private playEnd(){
    //     this.eff.play(0,false);
    // }
	/**适龄提示*/
    private onAgeHandler(){

    }

    private onLabSelClick(){
        E.ViewMgr.Open(EViewType.LoginQuFu);
    }

    private onCkSelect(){
        // console.log(this.ckCtl.selected);
    }

    private onContentClick(){
        E.ViewMgr.Open(EViewType.YinSiView);
    }

    protected initUi(){
        
    }
    // private onLoopEvt(){
    // Laya.timer.once(100,this,this.updateProgress,null,true);
    // this.updateProgress();
    // }

    

    protected onEnterGame(){
        // if(Laya.Utils.getQueryString("localgame")){
        //     MainModel.Ins.openMainView();
        //     this.Close();
        //     return;
        // }

        // console.log("开始游戏")
        if (this.ckCtl.selected) {
            // E.ViewMgr.openWait();

            // E.ViewMgr.ShowLoading(0.75);

            // this._timeTicket = 0;
            // this.updateProgress();

            // MainModel.Ins._timeTicket = 0;
            MainModel.Ins.showLoading();
            this.Close();
           
        }else{
            this.onContentClick();
        }
    }

    protected onAddLoadRes() {
        // this.addUI("login/ui_login_new.json");
        this.addAtlas("loginnew1.atlas");
        this.addAtlas("common/base.atlas");
        this.addAtlas("main/main.atlas");
    }
    protected onAddEventListener() {
        this.addEventCus(EventID.WebClientRegistRsp, this.onWebClientRegistRsp, this);
        this.addEventCus(EventID.WebClientLoginRsp, this.onWebClientLoginRsp, this);
    }

    private onWebClientLoginRsp(data: IServerError) {
        if (data.errorID == 0) {
            //登录成功
            E.ViewMgr.Close(this.ViewType);
            if(E.ta){
                E.ta.login(MainModel.Ins.mRoleData.AccountId.toString());
            }
            // MainModel.Ins.openMainView();
        } else {
            if (data.errorID == 2) {
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("AccountStopUseing"));
            } else if (data.errorID == 3) {
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("NoAccount"));
            } else if (data.errorID == 4) {
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("PasswordError"));
            } else {
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("LoginFailed"));
            }
        }
    }

    protected onWebClientRegistEnd(){
        
    }

    // public statrtWxLogin(){
    //     E.ViewMgr.closeWait();
    //     this.onUnlockEnter();
    // }
    
    public onUnlockEnter(){
        // this._enterCtl.gray = false;
        // this._enterCtl.mouseEnable = true;
    }

    // private startConnect(){
    //     SocketMgr.Ins.ConnectWebsocket(this,this.statrtWxLogin);
    // }

    protected onWebClientRegistRsp(data:WebClientRegist_revc){
        E.ViewMgr.closeWait();
        // LogSys.Log("WebClientRegist_revc:errorID = "+data.errorID);
        this.onUnlockEnter();
        switch(data.errorID){
            case 0:
                //注册成功
                break;
            case 1:
                //注册失败
                E.ViewMgr.ShowMidError("注册失败");
                E.ViewMgr.Close(this.ViewType);
                break;
            case 2:
                //账号已经存在
                break;
        }
        this.onWebClientRegistEnd();
    }
    // private endHandler(){
        // Laya.Tween.to(this._ui.img0,{y:59},100);
    // }
    
    private playTitleAnim(){
        
        // this._ui.img0.y = -407; 
        // Laya.Tween.to(this._ui.img0,{y:70},500,null,new Laya.Handler(this,this.endHandler));
    }
    protected onInit() {
        E.taLoginTrack("showLoginView");
        // console.log("显示登入界面")
        this.playTitleAnim();
        // E.ViewMgr.openWait()
        // this.connectRegist();

        HttpUtil.httpGet(`${InitConfig.getSyURL()}/notice`, new Laya.Handler(this, this.onNotice));

        let openId: string;
        let user = HrefUtils.getHref("user");
        if (user) {
            openId = user;
        } else {
            openId = E.sdk.getOpenId();
        }

        // let ver = Version.curValue
        // if (HrefUtils.getHref("ver")) {
        //     ver = HrefUtils.getHref("ver");
        // }
        // if (initConfig.ver) {
        //     ver = initConfig.ver;
        // }
        
        // if(initConfig.littlegame){
        //     ver += Version.SIGN;
        // }
        LoginClient.Ins.openId = openId+"";
        HttpUtil.httpGet(`${InitConfig.getSyURL()}/server/onopen?appid=${E.sdk.getAppId()}&openid=${openId}&ver=${E.ver}`, 
        new Laya.Handler(this, this.onServerHandler));
        // this.updateCheckBox();

        this.getVeriry();

        if(initConfig.debug_pay_server_id){
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,`debug_pay_server_id: ${initConfig.debug_pay_server_id}`);
        }
    }

    private onNotice(data: string) {
        let obj: INoticeCode = JSON.parse(data);
        if (obj.result.length == 1) {
            let cell: INoticeCell = obj.result[0];
            MainModel.Ins.openServerNotice(cell.Title, cell.Content);
        }
    }


    private getVeriry(){
        // HttpUtil.httpGet(MainModel.Ins.url,new Laya.Handler(this,this.loginComplete));
        this.loginComplete(E.login_obj);
    }

    private loginComplete(data:string){
        let obj:ILoginCode = JSON.parse(data);
        if(obj.code==0 && obj.result){
            this.ckCtl.selected = !(obj.result.audit == 1);
        }else{
            this.ckCtl.selected = true;
        }
        this.initByVeritf(initConfig.debug_ts == true || Laya.Utils.getQueryString("ts") == "1" || (obj.result && obj.result.audit == 1));
    }

    private onServerHandler(data: string){
        let obj = JSON.parse(data);
        if (obj.code == 0) {
            MainModel.Ins.serverZu = parseInt(obj.result.serverZu);
            MainModel.Ins.serverState = parseInt(obj.result.serverDetail.serverState);
            MainModel.Ins.serverIsNew = parseInt(obj.result.serverDetail.isNew);
            MainModel.Ins.serverID = parseInt(obj.result.serverDetail.serverID);
            MainModel.Ins.serverName = obj.result.serverDetail.serverName;
            this.updataServer();
        }else{
            // if(E.Debug){
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,obj.msg||"");
            // }
        }
    }

    public updataServer(){
        this._ui.img_t.visible = this._ui.lab_id.visible = true;
        this._ui.lab_id.text = MainModel.Ins.serverName;
        switch(MainModel.Ins.serverState){//区服状态 1爆满 2畅通 3维护
            case 1:
                this._ui.img_t.skin = "remote/loginnew1/bm.png";
                break;
            case 2:
                this._ui.img_t.skin = "remote/loginnew1/ct.png";
                break;
            case 3:
                this._ui.img_t.skin = "remote/loginnew1/wh.png";
                break;
        }
        if(MainModel.Ins.serverIsNew){
            this._ui.img_t1.visible = true;
        }else{
            this._ui.img_t1.visible = false;
        }
    }
}