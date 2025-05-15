import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceWarCityFresh_req, AllianceWarEnterActivity_req, stAllianceWarCityPreview } from "../../../../network/protocols/BaseProto";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { AllianceWarCityProxy, AllianceWarConfig } from "../proxy/AllianceFightProxy";

export class AllianceFightGCView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightGCViewUI;
    protected autoFree: boolean = true;
    protected mMask = true;
    protected mMainSnapshot = true;
    private _timer:Laya.Timer;
    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas('allianceFight.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightGCViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_rank,new Laya.Handler(this,this.onRankHandler)),
                ButtonCtl.Create(this._ui.btn_rz,new Laya.Handler(this,this.onBtnRZClick))
            );
            for(let i:number=1;i<6;i++){
                this._ui["sp"+i].on(Laya.Event.CLICK,this,this.onClick,[i]);
            }
            this._timeCtl = new TimeCtl(this._ui.lab_time);
        }
    }

    private onClick(index:number){
        if(index != 5){
            E.ViewMgr.Open(EViewType.AllianceFightGCTZView,null,index);
        }else{
            E.ViewMgr.Open(EViewType.AllianceFightGCTZView1,null,index);
        }
    }

    private onRankHandler() {
        E.ViewMgr.Open(EViewType.AllianceFightRankView);
    }

    private onBtnRZClick(){
        E.ViewMgr.Open(EViewType.AllianceFightRZView);
    }

    protected onInit(): void {
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATA_AWCP_VIEW,this,this.onUpdataView);
        let req:AllianceWarEnterActivity_req = new AllianceWarEnterActivity_req;
        req.type = 2;
        SocketMgr.Ins.SendMessageBin(req);
        if(!this._timer){
            this._timer = new Laya.Timer;
        }
        this._timer.loop(AllianceWarConfig.Ins.getCfg().f_RefreshTime * 1000,this,this.onTimer);
        
        for(let i:number=0;i<AllianceWarCityProxy.Ins.List.length;i++){
            let vo = AllianceWarCityProxy.Ins.List[i];
            this._ui["lab_name"+(i+1)].text = vo.f_cityname;
        }

        this.refreshTime();
    }

    protected onExit(): void {
        if(this._timer){
            this._timer.clear(this,this.onTimer);
            this._timer = null;
        }
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATA_AWCP_VIEW,this,this.onUpdataView);
        this._timeCtl.dispose();
    }

    private refreshTime(){
        let t = AllianceFightModel.Ins.gctzSubTime;
        if (t > 0) {
            this._timeCtl.start(t, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
    }
    
    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime(){
        this._timeCtl.setText("");
    }

    private onTimer(){
        let req:AllianceWarCityFresh_req = new AllianceWarCityFresh_req;
        req.flag = 0;
        req.cityType = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onUpdataView(){
        this.updataView();
    }

    private updataView(){
        for(let i:number=0;i<AllianceFightModel.Ins.awcpList.length;i++){
            let data:stAllianceWarCityPreview = AllianceFightModel.Ins.awcpList[i];
            let num = 0;
            for(let j:number=1;j<6;j++){
                if(this._ui["sp" + data.cityType + "_" + j]){
                    if(data.baseNums.indexOf(j) == -1){
                        this._ui["sp" + data.cityType + "_" + j].visible = false;
                        num ++;
                    }else{
                        this._ui["sp" + data.cityType + "_" + j].visible = true;
                    }
                }
            }
            this._ui["lab"+(i+1)].text = num + "";
        }
    }
}