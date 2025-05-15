import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { GemBaseModel } from "../../gemfeast/GemBaseModel";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { EActivityType } from "../../huodong/model/EActivityType";
import { AutoRateBtn } from "../../huodong/views/AutoRateBtn";
import { ItemUpdateCtl } from "../../main/ctl/ItemUpdateCtl";
import { ECellType } from "../../main/vos/ECellType";
import { EClientType } from "../../sdk/ClientType";
// import { MoneyCtlV2 } from "../../main/ctl/MoneyCtl";
import { DuanWuEvent } from "../DuanWuEvent";
import { EDuanWuPackageStatus } from "../DuanWuModel";
import { DuanWuPackitemView } from "./DuanWuPackitemView";
/**坐骑礼包 */
export class DuanWuPackageView extends ViewBase {
    private autoBtn:AutoRateBtn;
    protected uiBgCloseClick:boolean = true;

    protected mMask:boolean =  true;
    private _moneyCtl:ItemUpdateCtl;
    private timeCtl:TimeCtl;
    private model:GemBaseModel;

    private _ui: ui.views.duanwu.ui_duanwu_packageUI;
    protected onAddLoadRes(): void { }
    protected onExit(): void {
        this.model.off(DuanWuEvent.MoneyUpdate, this, this.updateEvt);
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.updateEvt);
        if(this.autoBtn){
            this.autoBtn.dispose();
        }
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.duanwu.ui_duanwu_packageUI();
            // this.model = DuanWuModel.Ins;
            this.timeCtl = new TimeCtl(this._ui.tf3);

            this.bindClose(this._ui.close1);
            this._moneyCtl = new ItemUpdateCtl(this._ui.moneyTf,ECellType.GOLD);
            this._ui.list1.itemRender = DuanWuPackitemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this.setMouseBg(this._ui.bg1);
        }
    }
    private onRenderHandler(item:DuanWuPackitemView){
        item.refresh(this.model);
    }
    // protected get listdata(){
    // return t_Alternation_MountPack.Ins.getListByType(this.model.subType);
    // }
    protected onInit(): void {
        this.model = this.Data;
        this.updateAutoRate();
        this._ui.tf1.text = E.getLang(this.model.titleStr);
        this._ui.bg4.skin = this.model.bg4Img;
        this.model.on(DuanWuEvent.MoneyUpdate, this, this.updateEvt);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.updateEvt);
        if(this.model.packId == EActivityType.NewPlayerFeast){
            this._ui.tf2.visible = this._ui.tf3.visible = false;
        }else{
            this._ui.tf2.visible = this._ui.tf3.visible = true;
            this.setTime();
        }
        //排序=========================================
        let listdata = this.model.packcfgList;
        let outList = [];
        let outListNot = [];
        for(let i = 0;i < listdata.length;i++){
            if(this.model.getPackageStatus(listdata[i])== EDuanWuPackageStatus.Normal){
                outList.push(listdata[i]);
            }else{
                outListNot.push(listdata[i]);
            }
        }
        ///////////////////////////////////////////////
        this._ui.list1.array = outList.concat(outListNot);
        this._ui.list1.scrollTo(0);
    }

    private updateAutoRate(){
        let _activityVo =  this.model.activityVo;
        if(_activityVo){
           this.autoBtn = AutoRateBtn.Create(this._ui,_activityVo.uid);
        }
        if (initConfig.clienttype == EClientType.Discount) {
            this._ui.list1.height = 630;
        } else {
            this._ui.list1.height = 765;
        }
    }

    private updateEvt(){
        this.setTime();
        this._ui.list1.refresh();
    }
    private setTime(){
        let _activityVo =  this.model.activityVo;
        if(_activityVo){
            this.timeCtl.start(_activityVo.endTime - TimeUtil.serverTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.onEnd));
        }
    }
    private onUpdateTime(ticket:number){
        let _s:string = TimeUtil.subTime(ticket);
        this._ui.tf3.text = _s;
    }
    private onEnd(){
        this._ui.tf3.text = "";
    }
}