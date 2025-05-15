import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DrawEventChoose_req } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { DrawEventModel } from "../model/DrawEventModel";
import { DrawEventRewardsProxy } from "../proxy/DrawEventProxy";
import { DrawEventItemCtl } from "./DrawEventItemCtl";

export class DrawEventView1 extends ViewBase{
    private _ui:ui.views.drawEvent.ui_DrawEventView1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected mMaskClick: boolean = false;
    protected autoFree: boolean = true;

    private _ctl:DrawEventItemCtl;

    protected onAddLoadRes() {
        this.addAtlas("drawEvent.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.drawEvent.ui_DrawEventView1UI;
            this.bindClose(this._ui.close1);
            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));
            ButtonCtl.Create(this._ui.btn1,new Laya.Handler(this,this.Close));

            this._ui.list.itemRender = ui.views.drawEvent.ui_DrawEventItem1UI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRendler);
            this._ui.list.selectEnable = true;

            this._ctl = new DrawEventItemCtl(this._ui.item);
        }
    }

    private onBtnClick(){
        let req:DrawEventChoose_req = new DrawEventChoose_req;
        let data = DrawEventModel.Ins.rewardList[this._index];
        if(data.state == 1){
            req.fid = data.fid;
            SocketMgr.Ins.SendMessageBin(req);
            this.Close();
        }else if(data.state == 2){
            E.ViewMgr.ShowMidError("已抽取");
        }else if(data.state == 3){
            E.ViewMgr.ShowMidError("未解锁");
        }
    }

    private onItemRendler(item:ui.views.drawEvent.ui_DrawEventItem1UI,index:number){
        let cfg:Configs.t_DrawEvent_Rewards_dat = DrawEventRewardsProxy.Ins.GetDataById(item.dataSource.fid);
        let vo:ItemVo = new ItemVo;
        vo.cfgId = parseInt(cfg.f_Rewards.split("-")[0]);
        vo.count = parseInt(cfg.f_Rewards.split("-")[1]);
        ItemViewFactory.refreshSlot(item.item,vo,false);
        let data = DrawEventModel.Ins.rewardList.find(ele => ele.fid == cfg.f_id);
        if(data.state == 1){
            item.lab.text = vo.getName();
            item.lab.color = "#9C5F3A";
            item.maskbg.visible = false;
            item.gouImg.visible = false;
        }else if(data.state == 2){
            item.lab.text = vo.getName();
            item.maskbg.visible = true;
            item.gouImg.visible = true;
            item.lab.color = "#9C5F3A";
        }else{
            item.lab.text = `抽取${cfg.f_UnlockCondi}次可选`;
            item.maskbg.visible = true;
            item.gouImg.visible = false;
            item.lab.color = "#FF2122";
        }
        if(index == this._ui.list.selectedIndex){
            item.img_xz.visible = true;
            this._ctl.setData(cfg,true,false);
            this._index = this._ui.list.selectedIndex;
        }else{
            item.img_xz.visible = false;
        }
    }

    private _index:number;
    protected onInit(): void {
        this._ui.list.array = DrawEventModel.Ins.rewardList;
        this._index = DrawEventModel.Ins.rewardList.findIndex(ele => ele.fid == DrawEventModel.Ins.rewardFid);
        this._ui.list.selectedIndex = this._index;
        this._ui.list.scrollTo(this._index);
    }

    protected onExit(): void {
        
    }
}