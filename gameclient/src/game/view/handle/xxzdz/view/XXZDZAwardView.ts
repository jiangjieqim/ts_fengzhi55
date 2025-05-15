import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { StarBattleRankReward_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { XXZDZModel } from "../model/XXZDZModel";
import { StarAwardProxy } from "../proxy/xxzdxProxy";

export class XXZDZAwardView extends ViewBase{
    private _ui:ui.views.xxzdz.ui_xxzdzAwardViewUI
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("xxzdz.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.xxzdz.ui_xxzdzAwardViewUI;
            this.bindClose(this._ui.close1);

            this.btnList.push(ButtonCtl.Create(this._ui.lingquBtn,new Laya.Handler(this,this.onBtnLQClick)));

            this._timeCtl = new TimeCtl(this._ui.time1);

            this._ui.list.itemRender = ui.views.xxzdz.ui_xxzdzItem7UI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRewardItemRender);
        }
    }

    private onRewardItemRender(item:ui.views.xxzdz.ui_xxzdzItem7UI){
        let cfg:Configs.t_Star_RankReward_dat = item.dataSource;
        let arr = cfg.f_Ranking.split("|");
        if(arr.length == 1){
            let rank = parseInt(arr[0]);
            if(rank == 1 || rank == 2 || rank == 3){
                item.rankTf.visible = false;
                item.icon1.visible = true;
                item.icon1.skin = "remote/main/main/dfjjc_mc" + rank + ".png";
            }else{
                item.rankTf.visible = true;
                item.rankTf.text = rank + "";
                item.icon1.visible = false;
            }
        }else{
            item.rankTf.visible = true;
            item.rankTf.text = arr[0] + "-" + arr[1];
            item.icon1.visible = false;
        }
        ItemViewFactory.renderItemSlots(item.rewardList,cfg.f_DailyReward,10,0.85,"right");
    }

    protected onInit(): void {
        XXZDZModel.Ins.on(XXZDZModel.UPDATA_RANKAWARD_VIEW,this,this.setBtn);

        if(XXZDZModel.Ins.rankingSettle){
            this._ui.lab.text = XXZDZModel.Ins.rankingSettle + "";
        }else{
            this._ui.lab.text = "未上榜";
        }
        
        this._ui.list.array = StarAwardProxy.Ins.List;

        let time = XXZDZModel.Ins.rewardUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
        this.setBtn();
    }

    protected onExit(): void {
        XXZDZModel.Ins.off(XXZDZModel.UPDATA_RANKAWARD_VIEW,this,this.setBtn);
        this._timeCtl.stop();
    }

    private setBtn(){
        if(XXZDZModel.Ins.rankRewardState){
            this._ui.lingquBtn.disabled = false;
            DotManager.addDot(this._ui.lingquBtn);
        }else{
            this._ui.lingquBtn.disabled = true;
            DotManager.removeDot(this._ui.lingquBtn);
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
     }

     private endTime(){
        this._timeCtl.setText("");
     }

    private onBtnLQClick(){
        let req:StarBattleRankReward_req = new StarBattleRankReward_req;
        SocketMgr.Ins.SendMessageBin(req);
    }
}