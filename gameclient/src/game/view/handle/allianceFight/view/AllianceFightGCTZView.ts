import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceWarCityDetail_req, AllianceWarCityFresh_req, RecoverPassport_req } from "../../../../network/protocols/BaseProto";
import { MainModel } from "../../main/model/MainModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { AllianceWarBasePointProxy, AllianceWarCityProxy, AllianceWarConfig } from "../proxy/AllianceFightProxy";
import { AllianceFightGCTZCtl } from "./ctl/AllianceFightGCTZCtl";

export class AllianceFightGCTZView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightGCTZViewUI;
    protected autoFree: boolean = true;
    protected mMask = true;
    protected mMainSnapshot = true;
    private _timer:Laya.Timer;
    private timeCtl:TimeCtl;
    private _timeCtl1:TimeCtl;

    private _ctl1:AllianceFightGCTZCtl;
    private _ctl2:AllianceFightGCTZCtl;
    private _ctl3:AllianceFightGCTZCtl;

    protected onAddLoadRes() {
        this.addAtlas('allianceFight.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightGCTZViewUI;

            this.timeCtl = new TimeCtl(this._ui.lab_time1);
            this._ui.img.on(Laya.Event.CLICK,this,this.onImgClick);
            this.bindClose(this._ui.btn);
            this._ctl1 = new AllianceFightGCTZCtl(this._ui.item1);
            this._ctl2 = new AllianceFightGCTZCtl(this._ui.item2);
            this._ctl3 = new AllianceFightGCTZCtl(this._ui.item3);

            this._timeCtl1 = new TimeCtl(this._ui.lab_time);
        }
    }

    private onImgClick(e:Laya.Event){
        e.stopPropagation();
        if(this._cfg){
            MainModel.Ins.showSmallTips(this._cfg.f_skillname, this._cfg.f_skilleffect, this._ui.img);
        }
    }

    private _cfg:Configs.t_Alliance_War_City_dat;
    protected onInit(): void {
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATA_AWCC_VIEW,this,this.onUpdataView);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_PS, this, this.onPsUpdate);

        this.onPsUpdate();

        this._cfg = AllianceWarCityProxy.Ins.getCfgByType(this.Data);
        let req:AllianceWarCityDetail_req = new AllianceWarCityDetail_req;
        req.cityType = this._cfg.f_CityType;
        SocketMgr.Ins.SendMessageBin(req);
        if(!this._timer){
            this._timer = new Laya.Timer;
        }
        
        this._timer.loop(AllianceWarConfig.Ins.getCfg().f_RefreshTime * 1000,this,this.onTimer);
        this._ui.lab1.text = this._cfg.f_cityname;
        this._ui.lab.text = this._cfg.f_skillname;
        this._ui.img.skin = "remote/allianceFight/" + this._cfg.f_Icon;

        this.refreshTime1();
    }

    protected onExit(): void {
        if(this._timer){
            this._timer.clear(this,this.onTimer);
            this._timer = null;
        }
        this.timeCtl.dispose();
        this._timeCtl1.dispose();
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATA_AWCC_VIEW,this,this.onUpdataView);
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_PS, this, this.onPsUpdate);
    }

    private refreshTime1(){
        let t = AllianceFightModel.Ins.gctzSubTime;
        if (t > 0) {
            this._timeCtl1.start(t, new Laya.Handler(this, this.onUpdateTime1), new Laya.Handler(this, this.endTime1));
        } else {
            this.endTime1();
            this._timeCtl1.stop();
        }
    }
    
    private onUpdateTime1(){
        let time_str = TimeUtil.subTime(this._timeCtl1.tickVal);
        this._timeCtl1.setText(time_str);
    }

    private endTime1(){
        this._timeCtl1.setText("");
    }

    private onTimer(){
        let req:AllianceWarCityFresh_req = new AllianceWarCityFresh_req;
        req.flag = 1;
        req.cityType = this._cfg.f_CityType;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onUpdataView(){
        for(let i:number = 1;i<4;i++){
            let vo = AllianceFightModel.Ins.awccList.find(item => item.baseNum == i);
            let cfg:Configs.t_Alliance_War_BasePoint_dat = AllianceWarBasePointProxy.Ins.getCfgByCTypeAndNum(this._cfg.f_CityType,i);
            if(vo){
                this["_ctl" + i].setData(vo,cfg);
            }else{
                this["_ctl" + i].setData(null,cfg);
            }
        }
    }

    private onPsUpdate() {
        let id = AllianceWarConfig.Ins.getCfg().f_ActionPoint.split("-")[0];
        this._ui.monetIcon.skin = IconUtils.getIconByCfgId(parseInt(id));
        let num = AllianceWarConfig.Ins.getCfg().f_ActionPoint.split("-")[1];
        this._ui.moneyTf.text = AllianceFightModel.Ins.psCount + "/" + num;
        if(AllianceFightModel.Ins.psCount >= parseInt(num)){
            this.timeCtl.setText("");
            this.timeCtl.stop();
        }else{
            this.refreshTime();
        }
    }

    private refreshTime(){
        let t = AllianceFightModel.Ins.psUnix - TimeUtil.serverTime;
        if(t <= 0){
            t = AllianceWarConfig.Ins.getCfg().f_ActionRefillTime;
        }
        this.timeCtl.start(t,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
    }
    
    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str);
    }

    private endTime(){
        this.timeCtl.setText("");
    }
}