import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { AdWatchDone_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { GuaJiModel } from "../../guaji/model/GuaJiModel";

export class SubCDView extends ViewBase{
    protected _ui:ui.views.main.ui_jccdViewUI;
    protected mMask = true;

    protected onAddLoadRes() {
    }
    
    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_jccdViewUI();
            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.subBtn,this,this.onSubBtnClick);
        }
    }

    private onSubBtnClick(){
        if(this.Data == GuaJiModel.CDEnmu.BaoXiangLv){
            E.sendTrack("ad_watch",{type:"BaoXiangLv"});
        }else if(this.Data == GuaJiModel.CDEnmu.WuGuanSS){
            E.sendTrack("ad_watch",{type:"WuGuanSS"});
        }
        E.sdk.lookVideo((type: 0 | 1 | 2) => {
            console.log('type: ', type);
            switch(type) {
                case 0:
                    // ⽤户未看完取消
                    break;
                case 1:
                    // ⽤户看完⼴告
                    if(this.Data == GuaJiModel.CDEnmu.BaoXiangLv){
                        E.sendTrack("ad_finish",{type:"BaoXiangLv"});
                    }else if(this.Data == GuaJiModel.CDEnmu.WuGuanSS){
                        E.sendTrack("ad_finish",{type:"WuGuanSS"});
                    }
                    let req:AdWatchDone_req = new AdWatchDone_req;
                    req.pos = this.Data;
                    SocketMgr.Ins.SendMessageBin(req);
                    break;
                case 2:
                    // 拉取⼴告错误
                    break;
            }
        });
        this.Close();
    }

    protected onInit() {
        
    }

    protected onExit() {
        
    }
}