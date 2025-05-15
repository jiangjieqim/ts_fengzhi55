import { HttpUtil } from "../../../../../frame/util/HttpUtil";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainModel } from "../model/MainModel";

export class CJKEView extends ViewBase{
    protected _ui:ui.views.main.ui_vipKFViewUI
    protected mMask = true;

    protected onAddLoadRes() {
    }
    
    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_vipKFViewUI();
            this.bindClose(this._ui.btn_close);
            this._ui.icon1.skin = "";
        }
    }

    protected onInit() {
        if(window['Sygame']){
            let channel = window['Sygame'].channel;
            let wecha_id = window['Sygame'].openid;
            let role_id = MainModel.Ins.mRoleData.AccountId;
            let version = window['Sygame'].app_version;
            let url = `https://docater1.cn/index.php?g=Wap&m=MiniGame&a=getUserVipInfo&channel=${channel}&wecha_id=${wecha_id}&role_id=${role_id}&version=${version}`;
            // let url = "https://docater1.cn/index.php?g=Wap&m=MiniGame&a=getUserVipInfo&channel=e251a5e2ec64cb0c8952415249e6aa22&&wecha_id=o5Ota5aVqiKaNXBdJyQiGX7Uo8ZE&role_id=10015&version=1006.4.7"
            HttpUtil.httpGet(url, new Laya.Handler(this, this.onHttpComplete));
        }
    }

    private onHttpComplete(value: string){
        let data = JSON.parse(value);
        this._ui.icon1.skin = data.vip_qrcode;
    }

    protected onExit() {
        
    }
}