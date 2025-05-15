import { LogSys } from "../../../../../frame/log/LogSys";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { AdWatchDone_req, AfkFast_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import {DotManager} from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ItemVo } from "../../main/vos/ItemVo";
import { GuaJiModel } from "../model/GuaJiModel";
import { GuaJiCfgProxy, GuaJiRewardsProxy } from "../proxy/GuaJiProxy";

export class GuaJiKuaiSuZC extends ViewBase{
    private _ui:ui.views.guaji.ui_kuaisuzhenchaUI;
    protected mMask = true;
    private timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas('guaji.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.guaji.ui_kuaisuzhenchaUI;
            this.bindClose(this._ui.close1);

            ButtonCtl.Create(this._ui.btn_yb,new Laya.Handler(this,this.onBtnYBClick));
            ButtonCtl.Create(this._ui.btn_mf,new Laya.Handler(this,this.onBtnMFClick));

            this._ui.list.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.itemRender);

            this.timeCtl = new TimeCtl(this._ui.lab_time);

            if(t_Platform.Ins.isADclose){
                this._ui.freeCon.visible = false;
                this._ui.goldCon.x = 189;
            }
        }
    }

    protected onInit() {
        GuaJiModel.Ins.on(GuaJiModel.UPDATA_KUAISUVIEW,this,this.updataView);
        GuaJiModel.Ins.on(GuaJiModel.UPDATA_CD_TIME,this,this.updataView);
        this.updataView();
    }

    protected onExit() {
        GuaJiModel.Ins.off(GuaJiModel.UPDATA_KUAISUVIEW,this,this.updataView);
        GuaJiModel.Ins.off(GuaJiModel.UPDATA_CD_TIME,this,this.updataView);
        this.timeCtl.stop();
    }

    private onBtnYBClick(){
        if(GuaJiModel.Ins.fastData.fastAfkBuyNum >= GuaJiCfgProxy.Ins.GetDataById(1).f_QuickAFKTimes){
            E.ViewMgr.ShowMidError("今日购买已达上限,请明日再来");//显示错误提示
            return;
        }
        let req:AfkFast_req = new AfkFast_req();
        req.type = 1;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnMFClick(){
        if(GuaJiModel.Ins.fastData.fastAfkVideoNum >= GuaJiCfgProxy.Ins.GetDataById(1).f_WatchTimes){
            E.ViewMgr.ShowMidError("今日观看已达上限,请明日再来");//显示错误提示
            return;
        }
        E.sendTrack("ad_watch",{type:"tanxian"});
        E.sdk.lookVideo((type: 0 | 1 | 2) => {
            LogSys.Log('type: '+ type);
            switch(type) {
                case 0:
                    // ⽤户未看完取消
                    break;
                case 1:
                    // ⽤户看完⼴告
                    // let req:AfkFast_req = new AfkFast_req();
                    // req.type = 0;
                    // SocketMgr.Ins.SendMessageBin(req);
                    E.sendTrack("ad_finish",{type:"tanxian"});
                    let req:AdWatchDone_req = new AdWatchDone_req;
                    req.pos = GuaJiModel.CDEnmu.GuaJi;
                    SocketMgr.Ins.SendMessageBin(req);
                    break;
                case 2:
                    // 拉取⼴告错误
                    break;
            }
        });
    }

    private itemRender(item:ui.views.main.ui_slot_itemUI){
        ItemViewFactory.refreshSlot(item,item.dataSource);
    }

    private _cfg:Configs.t_AFK_Rewards_dat;
    private updataView(){
        this._cfg = GuaJiRewardsProxy.Ins.getCfgByLv(GuaJiModel.Ins.mianData.level);
        let count = GuaJiCfgProxy.Ins.GetDataById(1).f_QuickAFK / this._cfg.f_RewardsInterval;
        let array = [];
        let arr = this._cfg.f_AFKReward.split("|");
        for(let ele of arr){
            let vo:ItemVo = new ItemVo();
            vo.cfgId = parseInt(ele.split("-")[0]);
            vo.count = parseInt(ele.split("-")[1]) * count;
            array.push(vo);
        }
        this._ui.list.array = array;

        let num2:number = GuaJiCfgProxy.Ins.GetDataById(1).f_QuickAFKTimes - GuaJiModel.Ins.fastData.fastAfkBuyNum;

        if(num2){
            this._ui.btn_yb.disabled = false;
        }else{
            this._ui.btn_yb.disabled = true;
        }

        this._ui.lab2.text = num2 + "";
        if(GuaJiModel.Ins.fastData.fastAfkBuyNum == 0){
            this._ui.labFree.visible = true;
            this._ui.lab_yb.visible = this._ui.img_yb.visible = false;
            DotManager.addDot(this._ui.btn_yb);
        }else{
            this._ui.labFree.visible = false;
            this._ui.lab_yb.visible = this._ui.img_yb.visible = true;
            let num = GuaJiCfgProxy.Ins.GetDataById(1).f_QuickAFKCost.split("-")[1];
            let n = GuaJiCfgProxy.Ins.GetDataById(1).f_QuickAFKCostGrow.split("-")[1];
            this._ui.lab_yb.text = parseInt(num) + (GuaJiModel.Ins.fastData.fastAfkBuyNum - 1) * parseInt(n) + "";
            DotManager.removeDot(this._ui.btn_yb);
        }

        // let num = parseInt(System_RefreshTimeProxy.Ins.GetDataById(8).f_SystemConfig);
        // if(num){
        if(MainModel.Ins.verify){
            this._ui.btn_mf.visible = false;
            this._ui.lab_cishu.visible = false;
            this._ui.lab1.visible = false;
            this._ui.lab_time.visible = false;
        }else{
            this._ui.btn_mf.visible = true; 
            this.setCDBtn();
        }
    }

    private setCDBtn(){
        let num1:number = GuaJiCfgProxy.Ins.GetDataById(1).f_WatchTimes - GuaJiModel.Ins.fastData.fastAfkVideoNum;
        this._ui.lab1.text = num1 + "";
        if(num1){
            let time = GuaJiModel.Ins.getstAdCdByType(GuaJiModel.CDEnmu.GuaJi).endUnix - TimeUtil.serverTime;
            if(time > 0){//有倒计时
                this._ui.lab_cishu.visible = false;
                this._ui.lab1.visible = false;
                this._ui.lab_time.visible = true;
                this._ui.btn_mf.disabled = true;
                this.timeCtl.start(time,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
            }else{
                this.timeCtl.stop();
                this.endTime();
            }
        }else{
            this._ui.btn_mf.disabled = true;
            this._ui.lab_cishu.visible = true;
            this._ui.lab1.visible = true;
            this._ui.lab_time.visible = false;
            this.timeCtl.stop();
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str + "后刷新");
    }

    private endTime(){
        this._ui.lab_cishu.visible = true;
        this._ui.lab1.visible = true;
        this._ui.lab_time.visible = false;
        this._ui.btn_mf.disabled = false;
    }
}