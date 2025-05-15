import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { SpringFestivalAllianceRankReward_req } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { SpringFestivalModel } from "../model/SpringFestivalModel";
import { SFRankProxy } from "../proxy/SpringFestivalProxy";

export class SpringFestivalAwRankView extends ViewBase{
    private _ui:ui.views.springFestival.ui_springFestivalRankAwViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("springFestival.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.springFestival.ui_springFestivalRankAwViewUI;

            this.bindClose(this._ui.close1);
            this._timeCtl = new TimeCtl(this._ui.time1);
            this.btnList.push(
                ButtonCtl.Create(this._ui.lingquBtn,new Laya.Handler(this,this.onBtnClick))
            );

            this._ui.list.itemRender = ui.views.springFestival.ui_springFestivalRankAwItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:ui.views.springFestival.ui_springFestivalRankAwItemUI){
        let cfg:Configs.t_Event_2024Spring_Rank_dat = item.dataSource;
        let arr = cfg.f_Position.split("|");
        let rank = parseInt(arr[0]);
        let rank1 = parseInt(arr[1]);
        if(rank == rank1){
            item.rankTf.text = rank + "";
        }else{
            item.rankTf.text = rank + "-" + rank1;
        }
        ItemViewFactory.renderItemSlots(item.rewardList,cfg.f_Rewarditem,10,0.85,"right");
    }

    private onBtnClick(){
        let req:SpringFestivalAllianceRankReward_req = new SpringFestivalAllianceRankReward_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onInit(): void {
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_RANK_REWARD, this, this.onUpdataView);
        this.updataTime();
        this._ui.list.array = SFRankProxy.Ins.List;
        this.onUpdataView();
    }

    protected onExit(): void {
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_RANK_REWARD, this, this.onUpdataView);
        this._timeCtl.dispose();
    }

    private onUpdataView(){
        if(SpringFestivalModel.Ins.rank){
            this._ui.lab.text = SpringFestivalModel.Ins.rank + "";
        }else{
            this._ui.lab.text = "未上榜";
        }
        DotManager.removeDot(this._ui.lingquBtn);
        if(SpringFestivalModel.Ins.state == 0){
            this._ui.lingquBtn.disabled = true;
            this._ui.tf4.text = "领取";
        }else if(SpringFestivalModel.Ins.state == 1){
            this._ui.lingquBtn.disabled = true;
            this._ui.tf4.text = "已领取";
        }else if(SpringFestivalModel.Ins.state == 2){
            this._ui.lingquBtn.disabled = false;
            this._ui.tf4.text = "领取";
            DotManager.addDot(this._ui.lingquBtn);
        }
    }

    private updataTime(){
        let time = SpringFestivalModel.Ins.rewardEndunix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("已结束");
    }
}