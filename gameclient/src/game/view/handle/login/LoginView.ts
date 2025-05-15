import mUI = ui.views.login.ui_loginUI;

import { StorageUtil } from "../../../../frame/util/StorageUtil";
import { StringUtil } from "../../../../frame/util/StringUtil";
import { TweenUtil } from "../../../../frame/util/TweenUtil";
import { ViewBase } from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { ELanguage, EMsgBoxType, EViewType, TweenEase } from "../../../common/defines/EnumDefine";
import { AudioHelper } from "../../../common/help/AudioHelper";
import { EventID } from "../../../event/EventID";
import { E } from "../../../G";
import { LoginClient } from "../../../network/clients/LoginClient";
import { Player } from "../../../player/Player";
import { ResPath } from "../../../resouce/ResPath";
import { MainModel } from "../main/model/MainModel";

/**主页面*/
export class LoginView extends ViewBase {

    //#region 实例
    protected checkGuide:boolean = false;

    private _ui: mUI;

    private _tmpAcc: string = StringUtil.Empty;
    private _tmpPwd: string = StringUtil.Empty;

    //#region 抽象方法实现

    protected onEnter() {
        // E.ViewMgr.Close(EViewType.ScrollNotice);
    }

    protected onExit() {
        // E.ViewMgr.Open(EViewType.ScrollNotice, null);
    }

    protected onFirstInit() {
        this.UI = this._ui = new mUI();
    }

    protected onInit() {
        this.onInitLogin(false);
        E.ViewMgr.Close(EViewType.Loading);

        this.checkNoticeOpen();
        let user = E.user;
        if (user) {
            this._ui.input_acc.text = this._ui.input_pwd.text = user;
        }
    }

    protected onChangeLanguage() {
        this.updateLoginLangUI();
        this.updateRegistLangUI();
        this._ui.lbl_hasregist_tip.text = E.LangMgr.getLang("HasRegistTip");
    }

    /**添加要加载的资源 */
    protected onAddLoadRes() {
        // this.addRes(ResPath.View.Login, Laya.Loader.JSON);
        this.addRes(ResPath.Atlas.Main_Loading, Laya.Loader.ATLAS);
        this.addRes(ResPath.Atlas.Main_Login, Laya.Loader.ATLAS);
    }

    /**添加事件监听 */
    protected onAddEventListener() {
        //系统事件监听
        this.addEventSys(Laya.Event.CLICK, this.onClickLoginBtn, this, this._ui.btn_login);
        this.addEventSys(Laya.Event.CLICK, this.onClickGotoRegistBtn, this, this._ui.box_goto_regist);
        this.addEventSys(Laya.Event.CLICK, this.onClickRegistBtn, this, this._ui.btn_regist);
        this.addEventSys(Laya.Event.CLICK, this.onClickBackToLoginBtn, this, this._ui.box_regist_back);
        //自定义事件监听
        this.addEventCus(EventID.WebClientRegistRsp, this.onWebClientRegistRsp, this);
        this.addEventCus(EventID.WebClientLoginRsp, this.onWebClientLoginRsp, this);
    }

    //#endregion


    //#region 事件消息处理

    private onWebClientRegistRsp(data: any) {
        if (data.errorID == 0) {
            //缓存账号密码
            this.localSaveAccPwd(this._tmpAcc, this._tmpPwd);
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("RegistSuccess"),new  Laya.Handler(this, () => {
                this.onClickBackToLoginBtn();
            }), new  Laya.Handler(this, () => {
                this.onClickBackToLoginBtn();
            }));
        }
        else {
            if (data.errorID == 2) {
                this.timerHideRegist();
            }
        }
    }

    /**登录返回*/
    private onWebClientLoginRsp(data: any) {
        // LogSys.Json(data);
        if (data.errorID == 0) {
            //缓存账号密码
            this.localSaveAccPwd(this._tmpAcc, this._tmpPwd);
            //
            
            if(Player.Ins.Account && Player.Ins.Account.AccountId)
                StorageUtil.SetAccountKey(Player.Ins.Account.AccountId.toString());

            this.loginSucHandler();
        }
    else {
            if (data.errorID == 2)
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("AccountStopUseing"), null, null);
            else if (data.errorID == 3)
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("NoAccount"), null, null);
            else if (data.errorID == 4)
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("PasswordError"), null, null);
            else
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("LoginFailed"), null, null);
        }
    }

    /**获取玩家角色组件列表返回 */
    // private onGetPlayerPartsRsp(data: any) {
    //     if (Player.Ins.Part.HasParts()) {
    //         this.EnterWorld();
    //     }
    //     else {
    //         E.ViewMgr.OpenModule(ESubPackageName.Create,EViewType.Sex,new Laya.Handler(this,()=>{
    //             E.ViewMgr.Open(EViewType.Sex, Callback.Create(this, () => {
    //                 E.ViewMgr.Close(this.ViewType);
    //             }), null);
    //         }),new Laya.Handler(this,()=>{
    //             // E.ViewMgr.Reg(new Ctrl_Sex(EViewType.Sex, ResPath.View.Sex, ELayerType.frameLayer));
    //         }));
    //     }
    // }
    //#endregion


    //#region 登录

    /**点击登录*/
    private onClickLoginBtn() {
        AudioHelper.Click();

        if (!StringUtil.IsNullOrEmpty(this._ui.input_acc.text) && !StringUtil.IsNullOrEmpty(this._ui.input_pwd.text)) {
            this._tmpAcc = this._ui.input_acc.text;
            this._tmpPwd = this._ui.input_pwd.text;
            this.reqLogin(this._tmpAcc, this._tmpPwd);
        }
        else {   
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, E.LangMgr.getLang("EnterAccPwd"), null, null);
        }
    }

    /**点击前往注册 */
    private onClickGotoRegistBtn() {
        AudioHelper.Click();

        this.showRegistBox();
        // this.hideRegistLangDrop();
        this.clearRegistAccInput();
        this.clearRegistPwdInput();

        this.hideLoginBox();
    }

    private showLoginBox() { this._ui.box_login.visible = true; }
    private hideLoginBox() { this._ui.box_login.visible = false; }
    private clearLoginAccInput() { this._ui.input_acc.text = StringUtil.Empty; }
    private clearLoginPwdInput() { this._ui.input_pwd.text = StringUtil.Empty; }

    /**检测登录*/
    private onInitLogin(autoLogin: boolean = true) {

        this.showLoginBox();
        this.hideRegistBox();
        this.hideHasRegistTip();
        //获取本地缓存的账号密码
        this._tmpAcc = StorageUtil.Get(StorageUtil.AccountId, true);
        this._tmpPwd = StorageUtil.Get(StorageUtil.AccountPwd, true);

        if (!StringUtil.IsNullOrEmpty(this._tmpAcc) && !StringUtil.IsNullOrEmpty(this._tmpPwd)) {
            this._ui.input_acc.changeText(this._tmpAcc);
            this._ui.input_pwd.changeText(this._tmpPwd);
        }
        else {
            this.localSaveAccPwd(StringUtil.Empty, StringUtil.Empty);

            this.clearLoginAccInput();
            this.clearLoginPwdInput();
        }

        // this.hideLoginLangDrop();
    }


    //#region 登录页面语言切换

    // private onClickLoginLangCurBtn() {
    //     AudioHelper.Click();

    //     if (this._ui.group_login_lang_drop.visible) {
    //         this.hideLoginLangDrop();
    //         if (E.LangMgr.IsChinese) {
    //             this.showLoginLangCNChecked();
    //             this.hideLoginLangENChecked();
    //         }
    //         else {
    //             this.showLoginLangENChecked();
    //             this.hideLoginLangCNChecked();
    //         }
    //     }
    //     else {
    //         this.showLoginLangDrop();
    //     }
    // }

    // private onClickLoginLangCN() {
    //     AudioHelper.Click();

    //     if (!E.LangMgr.IsSameLanguage(ELanguage.Chinese)) {
    //         this.onClickLoginLangCurBtn();
    //         E.EventMgr.emit(EventID.OnChangeLanguage, []);
    //     }
    //     this.hideLoginLangDrop();
    // }

    // private onClickLoginLangEN() {
    //     AudioHelper.Click();

    //     if (!E.LangMgr.IsSameLanguage(ELanguage.English)) {
    //         this.onClickLoginLangCurBtn();
    //         E.EventMgr.emit(EventID.OnChangeLanguage, []);
    //     }
    //     this.hideLoginLangDrop();
    // }

    //刷新登录页面多语言UI
    private updateLoginLangUI() {

        this._ui.lbl_login_title.text = E.LangMgr.getLang("LoginTitle");
        this._ui.input_acc.prompt = E.LangMgr.getLang("InputAcc");
        this._ui.input_pwd.prompt = E.LangMgr.getLang("InputPwd");
        // this._ui.btn_login.label = E.LangMgr.getLang("LoginBtn");
        this._ui.lbl_login_click.text = E.LangMgr.getLang("ClickLabel");
        this._ui.lbl_login_regist.text = E.LangMgr.getLang("GotoRegistLabel");


        if (E.LangMgr.IsChinese) {
            // this._ui.lbl_login_lang_cur.text = this.Language[LanguageDefine.Login.LangCN];
            // this.showLoginLangCNChecked();
            // this.hideLoginLangENChecked();
        }
        else {
            // this._ui.lbl_login_lang_cur.text = this.Language[LanguageDefine.Login.LangEN];
            // this.showLoginLangENChecked();
            // this.hideLoginLangCNChecked();
        }

        // this._ui.lbl_login_lang_cn.text = this.Language[LanguageDefine.Login.LangCN];
        // this._ui.lbl_login_lang_en.text = this.Language[LanguageDefine.Login.LangEN];
    }

    // private showLoginLangDrop() { this._ui.group_login_lang_drop.visible = true; }
    // private hideLoginLangDrop() { this._ui.group_login_lang_drop.visible = false; }

    // private showLoginLangCNChecked() { this._ui.img_login_lang_cn.visible = true; }
    // private hideLoginLangCNChecked() { this._ui.img_login_lang_cn.visible = false; }

    // private showLoginLangENChecked() { this._ui.img_login_lang_en.visible = true; }
    // private hideLoginLangENChecked() { this._ui.img_login_lang_en.visible = false; }


    //#endregion

    //#endregion

    //#region 注册

    /**点击注册*/
    private onClickRegistBtn() {
        AudioHelper.Click();

        if (!this.checkAccInputEmpty() && !this.checkPwdInputEmpty()) {
            this._tmpAcc = this.getRegistAccInput();
            this._tmpPwd = this.getRegistPwdInput();
            this.reqRegist(this._tmpAcc, this._tmpPwd);
        }
        else {
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,E.LangMgr.getLang("EnterAccPwd"), null, null);
        }
    }

    /**点击返回到登录*/
    private onClickBackToLoginBtn() {
        AudioHelper.Click();

        this.onInitLogin(false);
    }

    private showRegistBox() { this._ui.box_regist.visible = true; }
    private hideRegistBox() { this._ui.box_regist.visible = false; }
    private clearRegistAccInput() { this._ui.input_regist_acc.text = StringUtil.Empty; }
    private clearRegistPwdInput() { this._ui.input_regist_pwd.text = StringUtil.Empty; }
    private getRegistAccInput() { return this._ui.input_regist_acc.text; }
    private getRegistPwdInput() { return this._ui.input_regist_pwd.text; }
    private checkAccInputEmpty() { return StringUtil.IsNullOrEmpty(this._ui.input_regist_acc.text); }
    private checkPwdInputEmpty() { return StringUtil.IsNullOrEmpty(this._ui.input_regist_pwd.text); }

    //#region 注册页面语言切换

    private onClickRegistLangCurBtn() {
        AudioHelper.Click();

        // if (this._ui.group_regist_lang_drop.visible) {
        //     this.hideRegistLangDrop();
        //     if (E.LangMgr.IsChinese) {
        //         this.showRegistLangCNChecked();
        //         this.hideRegistLangENChecked();
        //     }
        //     else {
        //         this.showRegistLangENChecked();
        //         this.hideRegistLangCNChecked();
        //     }
        // }
        // else {
        //     this.showRegistLangDrop();
        // }
    }

    private onClickRegistLangCN() {
        AudioHelper.Click();

        if (!E.LangMgr.IsSameLanguage(ELanguage.Chinese)) {
            this.onClickRegistLangCurBtn();
            E.EventMgr.emit(EventID.OnChangeLanguage, []);
        }
        // this.hideRegistLangDrop();
    }

    private onClickRegistLangEN() {
        AudioHelper.Click();

        if (!E.LangMgr.IsSameLanguage(ELanguage.English)) {
            this.onClickRegistLangCurBtn();
            E.EventMgr.emit(EventID.OnChangeLanguage, []);
        }
        // this.hideRegistLangDrop();
    }

    //刷新注册页面多语言UI
    private updateRegistLangUI() {
        this._ui.lbl_regist_title.text = E.LangMgr.getLang("RegistTitle");
        this._ui.input_regist_acc.prompt = E.LangMgr.getLang("InputAcc");
        this._ui.input_regist_pwd.prompt = E.LangMgr.getLang("InputPwd");
        this._ui.btn_regist.label = E.LangMgr.getLang("RegistBtn");

        if (E.LangMgr.IsChinese) {
            // this._ui.lbl_regist_lang_cur.text = this.Language[LanguageDefine.Login.LangCN];
            // this.showRegistLangCNChecked();
            // this.hideRegistLangENChecked();
        }
        else {
            // this._ui.lbl_regist_lang_cur.text = this.Language[LanguageDefine.Login.LangEN];
            // this.showRegistLangENChecked();
            // this.hideRegistLangCNChecked();
        }
        // this._ui.lbl_regist_lang_cn.text = this.Language[LanguageDefine.Login.LangCN];
        // this._ui.lbl_regist_lang_en.text = this.Language[LanguageDefine.Login.LangEN];
    }

    // private showRegistLangDrop() { this._ui.group_regist_lang_drop.visible = true; }
    // private hideRegistLangDrop() { this._ui.group_regist_lang_drop.visible = false; }

    // private showRegistLangCNChecked() { this._ui.img_regist_lang_cn.visible = true; }
    // private hideRegistLangCNChecked() { this._ui.img_regist_lang_cn.visible = false; }

    // private showRegistLangENChecked() { this._ui.img_regist_lang_en.visible = true; }
    // private hideRegistLangENChecked() { this._ui.img_regist_lang_en.visible = false; }


    //#endregion


    //#endregion

    //#region 已注册提示

    private timerHideRegist() {
        TweenUtil.ClearAll(this._ui.box_hasregist_tip);
        this._ui.box_hasregist_tip.alpha = 0;
        this.showHasRegistTip();

        TweenUtil.Fade(this._ui.box_hasregist_tip, 1, 1000, TweenEase.linearIn, Laya.Handler.create(this, () => {
            Laya.timer.once(1500, this, () => {
                TweenUtil.Fade(this._ui.box_hasregist_tip, 0, 1000, TweenEase.linearIn, Laya.Handler.create(this, () => {
                    this.hideHasRegistTip();
                }));
            });
        }));
    }

    private showHasRegistTip() { this._ui.box_hasregist_tip.visible = true; }
    private hideHasRegistTip() { this._ui.box_hasregist_tip.visible = false; }

    //#endregion

    /**请求登录*/
    private reqLogin(acc: string, pwd: string) { LoginClient.Ins.ReqLogin(acc, pwd); }
    private reqRegist(acc: string, pwd: string) { LoginClient.Ins.ReqRegist(acc, pwd); }
    /**本地缓存账号密码 */
    private localSaveAccPwd(acc: string, pwd: string) {
        StorageUtil.Set(StorageUtil.AccountId, acc, true);
        StorageUtil.Set(StorageUtil.AccountPwd, pwd, true);
    }

    /**登录成功处理*/
    private loginSucHandler() {
        //请求账号相关信息
        this.GetAccountInfo();
        // this.GetPartsInfo();
    }

    /**请求账号相关信息 */
    private GetAccountInfo() {
        //登录成功后拉取消息,登录完成
//         E.ViewMgr.ShowMidLabel(E.LangMgr.getLang("LoginSuccess"));
        E.ViewMgr.Close(this.ViewType);

        //################### init...
        MainModel.Ins.openMainView();
    }

  

    /**请求玩家组件信息 */
    // private GetPartsInfo() {
        // PlayerClient.Ins.ReqGetPlayerParts();
    // }

    /**进入游戏世界 */
    private EnterWorld() {
        //初始化游戏管理器
        // G.WorldMgr.Init(Player.Ins.World.WorldId);
        E.ViewMgr.Close(this.ViewType);
    }

    //#region 公告
    /**检测公告开启 */
    private checkNoticeOpen() {

        // if (StorageUtil.GetBool(StorageUtil.NoticeCheck, false)) {// 已勾选
        //     if (DateUtil.IsToday(StorageUtil.GetNum(StorageUtil.NoticeTime, false))) {// 今日已登录
        //         return;
        //     }
        // }
        // E.ViewMgr.Open(EViewType.Notice, null, []);//打开公告页面

    }
    //#endregion

    //#endregion
}