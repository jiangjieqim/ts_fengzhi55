import { CheckBox2Ctl } from "../../../../../frame/util/ctl/CheckBox2Ctl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { InitConfig, PlatformConfig } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { Debug } from "../../../../configs/Debug";
import { E } from "../../../../G";
import { LayerBase } from "../../../../layer/LayerBase";
import { DingYueReq_req, DingYueSelectReq_req, WxAuthInfo_req, wxPlayerInfo_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { StaticDataMgr } from "../../../../static/StaticDataMgr";
import { Version } from "../../../../Version";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { ISaveData, RedUpdateModel, RedUpdateUtils } from "../../main/model/RedUpdateModel";
import { TaskModel } from "../../main/model/TaskModel";
import { EClientType } from "../../sdk/ClientType";
import { getPosSize, ISizePos, IUserInfo } from "../../sdk/ISdk";
import { ISdkBaseButton,SdkButtonMgr } from "../../sdk/SdkButtonMgr";
import { SheZhiModel } from "../model/SheZhiModel";

// export function getPosSize(spr:Laya.Sprite):ISizePos{
//     let wx = E.wx;
//     let w,h;
//     if(wx){
//         let info = wx.getSystemInfoSync();
//         w = info.screenWidth;
//         h = info.screenHeight;
//     }
//     else{
//         w = Laya.stage.width;
//         h = Laya.stage.height;
//     }
//     // console.log(info);
//     let percent = w / Laya.stage.width;

//     console.log("percent:",percent);

//     let rw = spr.width * percent;
//     let rh = spr.height * percent;

//     let pos = new Laya.Point();
//     if(spr.parent){
//         pos = (spr.parent as Laya.Sprite).localToGlobal(new Laya.Point(spr.x,spr.y));
//     }
//     let obj = {} as ISizePos;
//     obj.w = rw;
//     obj.h = rh;
//     obj.x =  pos.x / Laya.stage.width * w;
//     obj.y = pos.y / Laya.stage.height * h;
//     return obj;
// }

export class SheZhiView extends ViewBase{
    private _ui:ui.views.shezhi.ui_shezhiUI;
    protected mMask = true; 
    protected autoFree = true;
    
    protected onAddLoadRes() {
        this.addAtlas('shezhi.atlas');
    }
    private _canShowBtn:boolean = false;
    private _checkCtl1:CheckBox2Ctl;
    private _checkCtl2:CheckBox2Ctl;
    private _checkCtl3:CheckBox2Ctl;
    private btnAuthorize:ISdkBaseButton;

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.shezhi.ui_shezhiUI;
            this.bindClose(this._ui.close1);

            this._ui.lab_copy.on(Laya.Event.CLICK,this,this.onLabCopyClick);

            this._checkCtl1 = new CheckBox2Ctl(this._ui.check1);
            // this._checkCtl1.selected = true;
            this._checkCtl1.selectHander = new Laya.Handler(this,this.onSelectHandler1);


            this._checkCtl2 = new CheckBox2Ctl(this._ui.check2);
            // this._checkCtl2.selected = true;
            this._checkCtl2.selectHander = new Laya.Handler(this,this.onSelectHandler2);

            this._checkCtl3 = new CheckBox2Ctl(this._ui.check);
            // this._checkCtl1.selected = true;
            this._checkCtl3.selectHander = new Laya.Handler(this,this.onSelectHandler3);

            let xgBtn = ButtonCtl.Create(this._ui.btn_nc,new Laya.Handler(this,this.onBtnNCClick));
            if(initConfig.clienttype == EClientType.Discount){
                xgBtn.visible = true;
            }else{
                xgBtn.visible = false;
            }
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn_jm,new Laya.Handler(this,this.onBtnJMClick)),
            ButtonCtl.Create(this._ui.btn_dh,new Laya.Handler(this,this.onBtnDHClick)),
            ButtonCtl.Create(this._ui.btn_ys,new Laya.Handler(this,this.onBtnYSClick)),
            ButtonCtl.Create(this._ui.btn_gg,new Laya.Handler(this,this.onBtnGGClick)),
            ButtonCtl.Create(this._ui.btn_xx,new Laya.Handler(this,this.onBtnXXClick)),
            ButtonCtl.Create(this._ui.btn_qh,new Laya.Handler(this,this.onBtnQHClick)),
            xgBtn
            );
            let settingBtn = ButtonCtl.Create(this._ui.btn_qw,new Laya.Handler(this,this.onBtnQWClick));
            settingBtn.visible = false;//隐藏切换主题按钮
            this._canShowBtn = true;
            this._ui.desc_tf.text = `更新头像及昵称`;
            switch(initConfig.platform){
                case PlatformConfig.DOU_YIN:
                    // this._ui.desc_tf.text = E.getLang("shezhi02");
                    this._ui.appimg.skin = `remote/main/main/douyin.png`;
                    break;
                case PlatformConfig.WeiXin:
                case PlatformConfig.WEIXIN_DISCOUNT:
                    // this._ui.desc_tf.text = E.getLang("shezhi01");
                    this._ui.appimg.skin = `remote/main/main/wx.png`;
                    break;
                case PlatformConfig.MEITUAN:
                    // this._ui.desc_tf.text = E.getLang("shezhi01");
                    this._ui.appimg.skin = `static/meituan.png`;
                    break;
                default:
                    // this._ui.desc_tf.text = E.getLang("shezhi01");
                    // this._ui.appimg.skin = `remote/main/main/wx.png`;
                    this._canShowBtn = false;
                    break;
            }
            this._ui.auth_btn.visible = false;
        }
    }

    private initConfig(){
        RedUpdateUtils.refreshByConfig(this._checkCtl1,RedEnum.MUISC_BG,true);
        RedUpdateUtils.refreshByConfig(this._checkCtl2,RedEnum.MUISC_EFFECT,true);
    }

    private onBtnQWClick(){
        E.ViewMgr.Open(EViewType.BoxAnimSet);
    }

    private onBtnNCClick(){
        E.ViewMgr.Open(EViewType.XiuGaiNCView);
    }

    private updateConfig(){
        let l1:ISaveData[] = [];
        RedUpdateUtils.push(l1,RedEnum.MUISC_BG,this._checkCtl1);
        RedUpdateUtils.push(l1,RedEnum.MUISC_EFFECT,this._checkCtl2);
        RedUpdateModel.Ins.saveArr(l1);
    }

    protected onInit() {
        this.initConfig();
        SheZhiModel.Ins.on(SheZhiModel.UPDATA_MAIN_VIEW,this,this.updataView);
        let req:DingYueReq_req = new DingYueReq_req();
        SocketMgr.Ins.SendMessageBin(req)
        // this.updataView();
        MainModel.Ins.on(MainEvent.UPDATE_NEW_PLAYER,this,this.onRefreshBoxSetting);
        this.onRefreshBoxSetting();
        // this.onAuthBtnChange();
        MainModel.Ins.on(MainEvent.AuthBtnChange, this, this.onAuthBtnChange);
        MainModel.Ins.on(MainEvent.UpdateAvatarNickName, this, this.updataView);
    }
    
    // private btn:Laya.Sprite;

    private onTapHandler(_userinfo:IUserInfo){
        if (_userinfo) {
            // let _userinfo:IUserInfo = res.userInfo;
            // console.log("=============>",res.userInfo);
            let req: WxAuthInfo_req = new WxAuthInfo_req();
            SocketMgr.Ins.SendMessageBin(req);

            let wxReq: wxPlayerInfo_req = new wxPlayerInfo_req();
            wxReq.nickName = _userinfo.nickName;
            wxReq.portrait = _userinfo.avatarUrl;
            SocketMgr.Ins.SendMessageBin(wxReq);

            MainModel.Ins.mRoleData.mPlayer.NickName = _userinfo.nickName;
            MainModel.Ins.mRoleData.mPlayer.HeadUrl = _userinfo.avatarUrl;
            MainModel.Ins.event(MainEvent.UpdateAvatarNickName);
        } else {
            console.log('btnAuthorize err');
        }
    }

    private wxAuthHandler() {
        let o = getPosSize(this._ui.auth_btn);
        this.btnAuthorize = SdkButtonMgr.createUserInfoButton(o,this,this.onTapHandler);
    }

    private switchWxAuthBtn(show: boolean) {
        if(this.btnAuthorize){
            if (show) {
                this.btnAuthorize.show();
            } else {
                this.btnAuthorize.hide();
            }
        }
    }

    protected onShow(){
        super.onShow();
        this.wxAuthHandler();
        this.onAuthBtnChange();
    }

    private onAuthBtnChange() {
        if (MainModel.Ins.authBtnShow) {
            this.authVisible = true;
            this.switchWxAuthBtn(true);
        } else {
            this.authVisible = false;
            this.switchWxAuthBtn(false);
        }
    }

    private set authVisible(v:boolean){
        if(this._canShowBtn){
            this._ui.auth_btn.visible = v;
        }else{
            this._ui.auth_btn.visible = false;
        }
    }
    private onRefreshBoxSetting(){
        if(MainModel.Ins.boxSettingRed){
            this._ui.qw_red.visible = true;
        }else{
            this._ui.qw_red.visible = false;
        }
    }
    protected onExit() {
        SheZhiModel.Ins.off(SheZhiModel.UPDATA_MAIN_VIEW,this,this.updataView);
        MainModel.Ins.off(MainEvent.UPDATE_NEW_PLAYER,this,this.onRefreshBoxSetting);
        MainModel.Ins.off(MainEvent.AuthBtnChange, this, this.onAuthBtnChange);
        MainModel.Ins.off(MainEvent.UpdateAvatarNickName, this, this.updataView);
        if(this.btnAuthorize){
            this.btnAuthorize.destroy();
        }
    }

    private onBtnJMClick(){
        SheZhiModel.Ins.reload();
    }

    private onBtnDHClick(){
        // E.ViewMgr.ShowMidError("暂未开放");
        E.ViewMgr.Open(EViewType.ExchangeCode);
    }

    private onBtnYSClick(){
        E.ViewMgr.Open(EViewType.YinSiView);
    }

    private onBtnGGClick(){
        MainModel.Ins.openPopNotice(MainModel.Ins.localNoticeList);
    }

    private onBtnXXClick(){
        E.ViewMgr.Open(EViewType.DingYueView);
    }

    private onBtnQHClick(){
        // if(HrefUtils.getVal("qufu") == 1){
            E.ViewMgr.Open(EViewType.QuFuView);
        // }
    }

    private onLabCopyClick(){
        // if(initConfig.platform == PlatformConfig.WeiXin){
        //     window["wx_ext"].syGetClipboardData(this._ui.lab_id.text);
        // }else{
        //     SheZhiModel.Ins.setCopy(this._ui.lab_id.text);
        // }
        // E.ViewMgr.ShowMidOk("复制成功");
        E.sdk.setCopy(this._ui.lab_id.text);
    }

    private onSelectHandler1(){
        if(this._checkCtl1.selected){
            E.AudioMgr.SetMusicMute(false);
        }else{
            E.AudioMgr.SetMusicMute(true);
        }
        this.updateConfig();
    }

    private onSelectHandler2(){
        if(this._checkCtl2.selected){
            E.AudioMgr.SetSoundMute(false);
        }else{
            E.AudioMgr.SetSoundMute(true);
        }
        this.updateConfig();
    }

    private onSelectHandler3(){
        let type = 0;
        if (this._checkCtl3.selected) {
            if (window['Sygame']) {
                // window['Sygame'].syGetSubscribeSystem(['SYS_MSG_TYPE_WHATS_NEW']);
                // E.sdk.getSubscribe(['SYS_MSG_TYPE_WHATS_NEW']);
                // type = 1;
            }
        } else {

        }
        let req: DingYueSelectReq_req = new DingYueSelectReq_req;
        req.id = 0;
        req.type = type;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private get showVal(){
        // let arr = Version.curValue.split("_");
        // arr.pop();
        // return arr.toString().replace(/,/g,"_");
        let s:string = E.ver;
        let maxWord:number = 8;
        if(s.length > maxWord){
            return s.substr(s.length-maxWord,maxWord);
        }
        return s;
    }

    private _value:Configs.t_Setting_Subscribe_dat;
    private updataView(){
        // this._ui.icon.skin = MainModel.Ins.mRoleData.headUrl;
        MainModel.Ins.setTTHead(this._ui.icon,MainModel.Ins.mRoleData.headUrl);
        this._ui.Lvtf.text = "Lv." + MainModel.Ins.mRoleData.lv;
        this._ui.lab_name.text = MainModel.Ins.mRoleData.getName();
        this._ui.lab_id.text = MainModel.Ins.mRoleData.AccountId + "";
        this._ui.lab_sid.text = MainModel.Ins.mRoleData.serverName;
        this._ui.lab_s.text = MainModel.Ins.ser_ver;
        let scene:string = E.sdk.scene;
        let ver = (MainModel.Ins.configIsSame ? "s":"d")+scene+this.showVal;

        // this._ui.lab_c.wordWrap = true;
        this._ui.lab_c.text = ver;// + "+" + StaticDataMgr.Ins.hasVal;

        this._ui.img_ch.skin = MainModel.Ins.getTitleImg();

        if(SheZhiModel.Ins.dyType){
            this._checkCtl3.selected = true;
        }else{
            this._checkCtl3.selected = false;
        }
    }
}