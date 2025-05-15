import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { IJJC_Model } from "../../peakjjc/model/IJjcInterface";
import { JjcEvent } from "../vos/JjcEvent";
import { JjcLogItemNew } from "./JjcLogItemNew";

export class JjcLogView extends ViewBase{
    private _ui:ui.views.jjc.ui_jjc_fight_logUI;
    private model:IJJC_Model;
    protected mMask:boolean = true;
    protected autoFree = true;
    protected  onAddLoadRes(): void{

    }
    /**离开处理 */
    protected  onExit(): void{
        this.model.off(JjcEvent.LogEvent,this,this.onRefreshHandler);
    }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected  onFirstInit(): void{
        if (!this.UI) {
            this.UI = this._ui = new ui.views.jjc.ui_jjc_fight_logUI();
            this._ui.list1.itemRender = JjcLogItemNew;//JjcLogItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onLogItemHandler);
            this.bindClose(this._ui.close1);
            this._ui.list1.array = [];
        }
    }

    private onLogItemHandler(item:JjcLogItemNew,index:number){
        item.refresh(this.model);
    }

    /**初始化*/
    protected  onInit(): void{
        this.model = this.Data;
        this.model.once(JjcEvent.LogEvent,this,this.onRefreshHandler);
        // let req:JjcFightLog_req = new JjcFightLog_req();
        // SocketMgr.Ins.SendMessageBin(req);
        this.model.reqlog();
    }

    private onRefreshHandler(){
        this._ui.list1.array = this.model.loglist;
        this._ui.list1.scrollTo(0);
    }

}