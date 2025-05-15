import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceWarEnterActivity_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceFightModel, WarStatus } from "../model/AllianceFightModel";
import { AllianceWarBounsProxy } from "../proxy/AllianceFightProxy";

export class AllianceFightAwardView1 extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightAwardView1UI;
    protected autoFree: boolean = true;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas('allianceFight.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightAwardView1UI;
            this.bindClose(this._ui.close1);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick)),
                ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick)),
                ButtonCtl.Create(this._ui.btn1,new Laya.Handler(this,this.onBtn1Click))
            );

            this._timeCtl = new TimeCtl(this._ui.lab_time);
        }
    }

    private onBtnClick(){
        let warStatus = AllianceFightModel.Ins.warStatus;
        if(warStatus != WarStatus.Reward){
            E.ViewMgr.ShowMidError("活动未开启");
            return;
        }
        if(!AllianceFightModel.Ins.showRewardChapter){
            E.ViewMgr.ShowMidError("未获得资格");
            return;
        }
        let req:AllianceWarEnterActivity_req = new AllianceWarEnterActivity_req;
        req.type = 3;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtn1Click(){
        E.ViewMgr.Open(EViewType.AllianceFightAwardView2);
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("allianceFightAwardTitle","allianceFightAwardDec");
    }

    protected onInit(): void {
        let arr = AllianceWarBounsProxy.Ins.getCfgByRank(AllianceFightModel.Ins.rank);
        if (arr && arr.length) {
            this._ui.boss_name_tf.text = arr[0].f_BounsName;
        }else{
            this._ui.boss_name_tf.text = "奖励关";
        }
        
        this._ui.lab1.text = "限时30秒快速点击战鼓攻击青龙";
        this._ui.lab2.text = "奖励根据战鼓敲击次数发放";
        this._timeCtl.setText("");
        let warStatus = AllianceFightModel.Ins.warStatus;
        if(warStatus == WarStatus.Reward){
            this.refreshTime();
        }
    }

    protected onExit(): void {
        this._timeCtl.dispose();
    }

    private refreshTime(){
        let t = AllianceFightModel.Ins.rewardSubTime;
        if (t > 0) {
            this._timeCtl.start(t, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
        }
    }
    
    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText("活动剩余时间:" + time_str);
    }

    private endTime(){
        this._timeCtl.stop();
        this._timeCtl.setText("");
    }
}