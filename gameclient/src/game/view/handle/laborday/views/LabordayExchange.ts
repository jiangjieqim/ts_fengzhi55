import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { LabourExchange_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { LabordayBaseModel } from "../model/LabordayBaseModel";
import { t_Labour_Config } from "../model/LabordayProxy";
/**兑换 */
export class LabordayExchange extends ViewBase {
    
    private btnCtl: ButtonCtl;
    private cfg:Configs.t_Labour_Config_dat;
    
    private _ui: ui.views.laborday.ui_laborday_exchangeUI;
    private model:LabordayBaseModel;
    protected _timeCtl: TimeCtlV2;
    protected mMask:boolean = true;
    protected onAddLoadRes(): void {

    }
    protected onExit(): void {
        MainModel.Ins.off(MainEvent.ValChange,this,this.onRefreshHandler);
        this.model.off(LabordayBaseModel.EVENT_TICKET_COUNT,this,this.onRefreshHandler);
        this._timeCtl.stop();
    }
    
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.laborday.ui_laborday_exchangeUI();
            this.btnCtl = ButtonCtl.Create(this._ui.linqubtn, new Laya.Handler(this, this.onExchangeEvt));
            this.bindClose(this._ui.close1);
            this._timeCtl = new TimeCtlV2(this._ui.title2, "{0}后结束");
        }
    }

    /**兑换 */
    private onExchangeEvt() {
        if(!this.model.isOpen){
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
            return;
        }
        if(!MainModel.Ins.isItemEnoughSt(this.cfg.f_exchangeCost1,true)){
            return;
        }
        let req = new LabourExchange_req();
        req.type = this.type;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private get type(){
        return this.model.type;
    }

    protected onInit(): void {
        this.model = this.Data;
        this.cfg = t_Labour_Config.Ins.getByType(this.type);
        this._ui.descTf.text = E.getLang(this.model.descid);

        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
        this._timeCtl.start(this.model.subTime);
        MainModel.Ins.on(MainEvent.ValChange,this,this.onRefreshHandler);
        this.model.on(LabordayBaseModel.EVENT_TICKET_COUNT,this,this.onRefreshHandler);
        this.onRefreshHandler();
    }

    private onRefreshHandler() {
        let rItem = ItemViewFactory.convertItem(this.cfg.f_exchangeRwards);
        ItemViewFactory.refreshSlot(this._ui.item0,rItem)
        
        let lItem = ItemViewFactory.convertItem(this.cfg.f_exchangeCost1);
        ItemViewFactory.refreshSlot(this._ui.item1,lItem);
        let count:number = MainModel.Ins.mRoleData.getVal(lItem.cfgId);
        this._ui.tf3.text = `${count}/${lItem.count}`;
        
        this._ui.botDescTf.text = E.getLang("labordayget")+this.model.ticketCount+'/'+this.cfg.f_Specialpara1;
        this._ui.dotimg1.visible = this.model.mExchange;
    }

    private onTimeComplete() {
        this._ui.title2.text = E.getLang("labordayend");
    }
}