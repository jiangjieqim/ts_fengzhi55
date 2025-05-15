import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { PalaceReward_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import {DotManager} from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { WuShenDianModel } from "../model/WuShenDianModel";
import { WuShenDianAwardProxy } from "../proxy/WuShenDianProxy";

export class WuShenDianAwardView extends ViewBase{
    private _ui:ui.views.wushendian.ui_wushendianAwardViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wushendian.ui_wushendianAwardViewUI;
            this.bindClose(this._ui.close1);

            this._timeCtl = new TimeCtl(this._ui.time1);

            this._ui.list.itemRender = ui.views.wushendian.ui_wushendianAwardItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRewardItemRender);
            this.btnList.push(ButtonCtl.Create(this._ui.lingquBtn,new Laya.Handler(this,this.onBtnClick)));
        }
    }

    protected onInit(): void {
        WuShenDianModel.Ins.on(WuShenDianModel.UPDATA_RANKAWARD_VIEW,this,this.setBtn);
        this._ui.list.array = WuShenDianAwardProxy.Ins.List;

        let time = WuShenDianModel.Ins.rewardUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
        this.setBtn();
    }

    protected onExit(): void {
        WuShenDianModel.Ins.off(WuShenDianModel.UPDATA_RANKAWARD_VIEW,this,this.setBtn);
        this._timeCtl.stop();
    }

    private onRewardItemRender(item:ui.views.wushendian.ui_wushendianAwardItemUI){
        let cfg:Configs.t_Palace_Rank_Reward_dat = item.dataSource;
        let arr = cfg.f_Rank.split("|");
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
        ItemViewFactory.renderItemSlots(item.rewardList,cfg.f_Item,10,0.85,"right");
    }

    private setBtn(){
        if(WuShenDianModel.Ins.rankRewardState == 1){
            this._ui.lingquBtn.disabled = false;
            DotManager.addDot(this._ui.lingquBtn);
        }else{
            this._ui.lingquBtn.disabled = true;
            DotManager.removeDot(this._ui.lingquBtn);
        }
        if(WuShenDianModel.Ins.rankingSettle){
            this._ui.lab.text = WuShenDianModel.Ins.rankingSettle + "";
        }else{
            this._ui.lab.text = "未上榜";
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
     }

     private endTime(){
        this._timeCtl.setText("");
     }

    private onBtnClick(){
        let req:PalaceReward_req = new PalaceReward_req;
        SocketMgr.Ins.SendMessageBin(req);
    }
}