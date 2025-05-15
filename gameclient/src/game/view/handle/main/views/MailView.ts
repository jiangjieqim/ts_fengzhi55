import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { MailList_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { MainEvent } from "../model/MainEvent";
import { EMailReqType, MainModel } from "../model/MainModel";
import { MailItemView } from "./MailItemView";

export class MailView extends ViewBase{
    private _ui:ui.views.mail.mail_viewUI;
    private model:MainModel;
    protected autoFree = true;
    protected mMask:boolean = true;
    protected  onAddLoadRes(): void{
        this.addAtlas("mail.atlas");
    }
    protected  onExit(): void{
        this.model.off(MainEvent.MailListUpdate,this,this.onMailListUpdate);
    }
    protected  onFirstInit(): void{
        if(!this.UI){
            this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.mail.mail_viewUI();
            this.bindClose(this._ui.close1);
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onMailHandler);
            this._ui.list1.itemRender = MailItemView;
            this._ui.list1.array = [];
            this._ui.emptyImg.visible = false;
            this.btnList.push(
                ButtonCtl.Create(this._ui.delbtn,new Laya.Handler(this,this.onClickDelHandler)),
                ButtonCtl.Create(this._ui.yijianlinqu,new Laya.Handler(this,this.onYiJianHandler))
            );
        }
    }

    /**一键领取 */
    private onYiJianHandler(){
        if(!MainModel.Ins.hasMailCanLingqu){
            E.ViewMgr.ShowMidLabel(E.getLang("maillingqu"));
            return;
        }
        let req = new MailList_req();
        req.type = EMailReqType.LingQuOrRead;
        req.uid = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }
    /**删除已读 */
    private onClickDelHandler(){
        if(MainModel.Ins.mailList.length <= 0){
            E.ViewMgr.ShowMidLabel(E.getLang("maildel"));
            return;
        }
        let req = new MailList_req();
        req.type = EMailReqType.Del;
        req.uid = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }
    private onMailHandler(item:MailItemView,index:number){
        item.refresh();
    }
    protected  onInit(): void{
       this.model.on(MainEvent.MailListUpdate,this,this.onMailListUpdate);
        let req = new MailList_req();
        req.uid = 0;
        req.type = EMailReqType.List;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onMailListUpdate(){
        this._ui.list1.array = this.model.mailList;
        this._ui.list1.scrollTo(0);
        if(this.model.mailList.length <= 0){
            this._ui.emptyImg.visible = true;
        }else{
            this._ui.emptyImg.visible = false;
        }
    }
}
