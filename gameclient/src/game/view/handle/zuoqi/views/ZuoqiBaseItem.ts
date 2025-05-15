import { ui } from "../../../../../ui/layaMaxUI";
import { stRideVo } from "../../../../network/protocols/BaseProto";
import { ZuoQiSlotCtl } from "../../main/views/ZuoQiSlotCtl";
import { ZuoqiFactory } from "../ZuoqiFactory";
import { ZuoQiModel } from "../ZuoqiModel";
export class ZuoqiBaseItem extends ui.views.zuoqi.ui_zuoqi_storge_itemUI {
    protected model:ZuoQiModel;
    protected data: stRideVo;
    protected ctl:ZuoQiSlotCtl;
   
    constructor() {
        super();
        this.model = ZuoQiModel.Ins;
        this.ctl = new ZuoQiSlotCtl(this,true);
        this.ctl.clickHandler = new Laya.Handler(this,this.onClickHandler);
        // this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    protected onClickHandler(){

    }
   
    public setData(data: stRideVo) {
        this.data = data;
        this.ctl.mData = ZuoqiFactory.createZuoQiVo(data);
        this.ctl.refresh();
    }
}