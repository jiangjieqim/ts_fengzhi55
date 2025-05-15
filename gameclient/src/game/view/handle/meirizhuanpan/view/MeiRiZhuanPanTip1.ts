import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { DailyWheelTurn_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { t_Platform } from "../../main/proxy/t_Platform";

export class MeiRiZhuanPanTip1 extends ViewBase{
    private _ui:ui.views.meirizhuanpan.ui_meirizhuanpan1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    private btn1Ctl:ButtonCtl;
    private btnCtl:ButtonCtl;
    protected onAddLoadRes() {
        this.addAtlas("meirizhuanpan.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.meirizhuanpan.ui_meirizhuanpan1UI;
            this.bindClose(this._ui.close1);
            this.btnCtl = ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnQDClick));
            this.btn1Ctl= ButtonCtl.Create(this._ui.btn1,new Laya.Handler(this,this.onBtnQD1Click));
            if(t_Platform.Ins.isADclose){
                this.btn1Ctl.visible = false;
                this.btnCtl.setX(185);
            }
        }
    }

    private onBtnQDClick(){
        let req:DailyWheelTurn_req = new DailyWheelTurn_req;
        req.ad = 0;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    private onBtnQD1Click(){
        E.sendTrack("ad_watch",{type:"zhuanpan_mf"});
        E.sdk.lookVideo((type: 0 | 1 | 2) => {
            switch(type) {
                case 0:
                    // ⽤户未看完取消
                    break;
                case 1:
                    // ⽤户看完⼴告
                    E.sendTrack("ad_finish",{type:"zhuanpan_mf"});
                    let req:DailyWheelTurn_req = new DailyWheelTurn_req;
                    req.ad = 1;
                    SocketMgr.Ins.SendMessageBin(req);
                    this.Close();
                    break;
                case 2:
                    // 拉取⼴告错误
                    break;
            }
        });
    }

    protected onInit(): void {

    }

    protected onExit(): void {
        
    }
}