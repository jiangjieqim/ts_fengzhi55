import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stDailyEvent } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { MoJinXiaoWeiModel } from "../model/MoJinXiaoWeiModel";
import { DailyEventPositionProxy } from "../proxy/MoJinXiaoWeiProxy";

export class MoJinXiaoWeiView1 extends ViewBase{
    private _ui:ui.views.mojinxiaowei.ui_mojinxiaoweiView1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected mMaskClick: boolean = false;

    protected onAddLoadRes() {
        this.addAtlas("mojinxiaowei.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.mojinxiaowei.ui_mojinxiaoweiView1UI;
            this.bindClose(this._ui.btn_close);
            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.Close));

            this._ui.list.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:ui.views.main.ui_slot_itemUI){
        let itemVo:ItemVo = new ItemVo();
        itemVo.cfgId = item.dataSource.id;
        itemVo.count = item.dataSource.count;
        ItemViewFactory.refreshSlot(item,itemVo);
    }

    protected onInit(): void {
        let data:stDailyEvent = this.Data;
        let cfg:Configs.t_DailyEvent_Position_dat = DailyEventPositionProxy.Ins.GetDataById(MoJinXiaoWeiModel.Ins.xlPosition);
        this._ui.lab_name.text = cfg.f_positionName;
        this._ui.lab.text = cfg["f_introType" + data.type];
        this._ui.list.array = data.rewardList;
        if(data.rewardList.length >= this._ui.list.repeatX){
            this._ui.list.width = 605;
        }else{
            this._ui.list.width = (data.rewardList.length * 100) + (data.rewardList.length - 1) * this._ui.list.spaceX;
        }
    }

    protected onExit(): void {
        MoJinXiaoWeiModel.Ins.showView();
    }
}