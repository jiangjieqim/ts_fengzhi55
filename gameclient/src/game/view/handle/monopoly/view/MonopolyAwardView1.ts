import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { MonopolyReward_req, stMonopolyMapInfo } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { MonopolyModel } from "../model/MonopolyModel";
import { MonopolyMapProxy, MonopolyRoundRewardsProxy } from "../proxy/MonopolyProxy";

export class MonopolyAwardView1 extends ViewBase{
    private _ui:ui.views.monopoly.ui_MonopolyAwardView1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected mMaskClick: boolean = false;

    private _timer:Laya.Timer;

    protected onAddLoadRes() {
        this.addAtlas("monopoly.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.monopoly.ui_MonopolyAwardView1UI;
            this.bindClose(this._ui.close1);
            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.Close));

            this._timer = new Laya.Timer;
        }
    }

    private _data:stMonopolyMapInfo;
    protected onInit(): void {
        this._data = this.Data;
        let cfg:Configs.t_Monopoly_Map_dat = MonopolyMapProxy.Ins.GetDataById(this._data.fid);
        this._ui.lab.text = `当前已在${cfg.f_AreaName}进行了：`;
        this._ui.lab1.text = this._data.count + "";
        let arr = MonopolyRoundRewardsProxy.Ins.getListByEventAndArea(cfg.f_EventType,cfg.f_AreaID);
        let c = arr[this._data.count - 1];
        if(!c){
            c = arr[arr.length - 1];
        }
        let itemVo:ItemVo = new ItemVo();
        itemVo.cfgId = parseInt(c.f_RoundRewards.split("-")[0]);
        itemVo.count = parseInt(c.f_RoundRewards.split("-")[1]);
        ItemViewFactory.refreshSlot(this._ui.slot,itemVo);
        this._ui.lab3.text = itemVo.getName();

        this._timer.once(500,this,()=>{
            let req:MonopolyReward_req = new MonopolyReward_req;
            req.type = 2;
            SocketMgr.Ins.SendMessageBin(req);
        });
    }

    protected onExit(): void {
        MonopolyModel.Ins.event(MonopolyModel.UPDATA_AWARD);
    }
}