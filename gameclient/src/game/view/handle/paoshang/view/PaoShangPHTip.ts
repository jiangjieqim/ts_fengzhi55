import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { HandleStationNearBy_req, stItemStation } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { PaoShangModel } from "../model/PaoShangModel";
import { PaoShangMissionListProxy } from "../proxy/PaoShangProxy";

export class PaoShangPHTip extends ViewBase{
    protected mMask = true;
    private _ui:ui.views.paoshang.ui_paoshangPHUI;

    protected onAddLoadRes() {
        this.addAtlas('paoshang.atlas');
    }

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.paoshang.ui_paoshangPHUI();
            this.bindClose(this._ui.close1);

            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));
        }
    }

    protected onInit() {
      this.updataView();
    }

    protected onExit() {
       
    }

    private onBtnClick(){
        let data = this.Data as stItemStation;
        let req:HandleStationNearBy_req = new HandleStationNearBy_req;
        req.flag = 2;
        req.id = data.id;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    private updataView(){
        let data = this.Data as stItemStation;
        let cfg = PaoShangMissionListProxy.Ins.getCfgByMissionID(data.missionId);
        this._ui.icon.skin = PaoShangModel.Ins.getStationIcon(data.missionId);
        let itemVo = ItemViewFactory.convertItemList(cfg.f_DestoryRewards)[0];
        ItemViewFactory.refreshSlot(this._ui.item,itemVo);
    }
}