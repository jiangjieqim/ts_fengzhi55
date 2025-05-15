import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { KaiFuChongBangModel } from "../model/KaiFuChongBangModel";
import { KFCBRankRewardProxy } from "../proxy/KaiFuChongBangProxy";

export class KaiFuChongBangAwardView extends ViewBase{
    private _ui:ui.views.kaifuchongbang.ui_KaiFuChongBangAwardViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    private _timeCtl:TimeCtl;
    private _activityVo:ActivityVo;

    protected onAddLoadRes(): void {
        
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.kaifuchongbang.ui_KaiFuChongBangAwardViewUI;
            this.bindClose(this._ui.close1);

            this._timeCtl = new TimeCtl(this._ui.time1);

            this._ui.list.itemRender = ui.views.kaifuchongbang.ui_KaiFuChongBangAwardItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRewardItemRender);
        }
    }

    private onRewardItemRender(item:ui.views.kaifuchongbang.ui_KaiFuChongBangAwardItemUI){
        let cfg:Configs.t_OpenServerActivity_RankReward_dat = item.dataSource;
        let arr = cfg.f_Level.split("|");
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
        ItemViewFactory.renderItemSlots(item.rewardList,cfg.f_Reward,10,0.85,"right");
    }

    protected onInit(): void {
        this.updataView();
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    protected onExit(): void {
        this._timeCtl.stop();
    }

    private updataView(){
        this._activityVo = ActivityModel.Ins.getVo(EActivityType.KaiFuChongBang);
        if(!this._activityVo)return;
        let time = this._activityVo.vo.endtime - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
        if(KaiFuChongBangModel.Ins.self.length){
            this._ui.lab.text = KaiFuChongBangModel.Ins.self[0].ranking + "";
        }else{
            this._ui.lab.text = "未上榜";
        }
        
        this._ui.list.array = KFCBRankRewardProxy.Ins.List;
    }


}