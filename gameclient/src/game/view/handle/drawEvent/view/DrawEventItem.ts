import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DrawEventCumulateReward_req, DrawEventTask_req, stDrawEventCumulateRewardInfo } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { DrawEventModel } from "../model/DrawEventModel";
import { DrawEventCumulateRewardsProxy } from "../proxy/DrawEventProxy";

export class DrawEventItem extends ui.views.drawEvent.ui_DrawEventItem2UI{
    constructor(){
        super();

        this.list.itemRender = ui.views.main.ui_slot_itemUI;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn1,new Laya.Handler(this,this.onBtn1Click));
    }

    private onBtnClick(){
        E.ViewMgr.Close(EViewType.DrawEventView2);
    }

    private onBtn1Click(){
        if(this._data){
            let req:DrawEventCumulateReward_req = new DrawEventCumulateReward_req;
            req.fid = this._data.fid;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onRenderHandler(item:ui.views.main.ui_slot_itemUI){
        let itemVo:ItemVo = new ItemVo();
        let arr = item.dataSource.split("-");
        itemVo.cfgId = parseInt(arr[0]);
        itemVo.count = parseInt(arr[1]);
        ItemViewFactory.refreshSlot(item,itemVo);
    }

    private _data:stDrawEventCumulateRewardInfo;
    public setData(value:stDrawEventCumulateRewardInfo){
        if(!value)return;
        this._data = value;
        let cfg:Configs.t_DrawEvent_CumulateRewards_dat = DrawEventCumulateRewardsProxy.Ins.GetDataById(value.fid);
        this.lab.text = `累计祈福${cfg.f_DrawTimes}次`;
        if(DrawEventModel.Ins.count > cfg.f_DrawTimes){
            this.lab1.text = cfg.f_DrawTimes + "/" + cfg.f_DrawTimes;
        }else{
            this.lab1.text = DrawEventModel.Ins.count + "/" + cfg.f_DrawTimes;
        }
        this.list.array = cfg.f_CumulateRewards.split("|");

        DotManager.removeDot(this.btn1);
        if(value.state == 1){
            this.btn.visible = false;
            this.btn1.visible = true;
            this.btn1.mouseEnabled = false;
            this.btn1.skin = "remote/common/base/anniu_grey.png";
            this.lab2.text = "已领取";
        }else if(value.state == 2){
            this.btn.visible = false;
            this.btn1.visible = true;
            this.btn1.mouseEnabled = true;
            this.btn1.skin = "remote/common/base/anniu_blue.png";
            this.lab2.text = "领取";
            DotManager.addDot(this.btn1,0,-10);
        }else if(value.state == 0){
            this.btn.visible = true;
            this.btn1.visible = false;
        }
    }
}