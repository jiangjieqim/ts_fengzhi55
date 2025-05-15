import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import {DotManager} from "../../common/DotManager";
import { EGetStatus } from "../../main/vos/ECellType";
import { IJJC_Model } from "../../peakjjc/model/IJjcInterface";
import { JjcEvent } from "../vos/JjcEvent";
import { EJjcRewadShow, EJjcRewadShowStatus } from "../vos/JjcType";
import { JjcRewardShowItemView } from "./JjcRewardShowItemView";

export class JjcRewardShowView extends ViewBase{
    protected mMask:boolean = true;
    protected autoFree = true;
    private _ui:ui.views.jjc.ui_jjc_reward_showUI;
    private type:EJjcRewadShow;
    private _timeCtl:TimeCtlV2;
    private model:IJJC_Model;
    private lingquCtl:ButtonCtl;
    protected onFirstInit(): void {
        if (!this.UI) {
            // this.model = JjcModel.Ins;
            this.UI = this._ui = new ui.views.jjc.ui_jjc_reward_showUI();
            this.bindClose(this._ui.close1);
            this._ui.list1.itemRender = JjcRewardShowItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRewardItemRender);
            this.lingquCtl = ButtonCtl.Create(this._ui.lingquBtn,new Laya.Handler(this,this.onLingQuHandler));
            this.btnList.push(this.lingquCtl);
            
            this._timeCtl = new TimeCtlV2(this._ui.time1,"{0}");
        }
    }

    private onLingQuHandler(){
        // let req:JjcRewardGain_req = new JjcRewardGain_req();
        // req.type = this.type;
        // SocketMgr.Ins.SendMessageBin(req);
        this.model.reqGain(this.type);
    }

    private onRewardItemRender(item:JjcRewardShowItemView,index:number){
        item.setData(item.dataSource);
    }
    
    protected onExit(): void {
        this.model.off(JjcEvent.WeekTime,this,this.onTimeRefreshView);
        this._timeCtl.stop();
        // this.model.off(JjcEvent.LingQuUpdate,this,this.timeRefresh);
        this.model.off(JjcEvent.JjcWeekInfoUpdate,this,this.updateRankView);
        this.model.off(JjcEvent.LingQuUpdate,this,this.updateRankView);        
        this.model.off(JjcEvent.DailyDayTime,this,this.onTimeRefreshView);
    }
    
    protected onAddLoadRes(): void {
    }
    private updateRankView(){
        if(this.type == EJjcRewadShow.Day){
            this._ui.tf1.text = E.LangMgr.getLang("JjcStr2");
            this._ui.curRank.text = E.LangMgr.getLang("JjcStr3") + this.model.todayRank.toString();
        }else{
            this._ui.tf1.text = E.LangMgr.getLang("JjcStr1");

            if (this.model.curWeekRank == 0) {
                this._ui.curRank.text = E.LangMgr.getLang("NoRank");
            } else {
                this._ui.curRank.text = E.LangMgr.getLang("JjcStr4") + this.model.curWeekRank.toString();
            }
        }

        // if(this._ui.time1.text == ""){
        // this._ui.tf1.text = "";
        // }
        this.refreshBtn();
    }

    private onTimeRefreshView(){
        this._ui.title1.text = E.LangMgr.getLang(this.type == EJjcRewadShow.Day ? "DayRewardTitle" : "WeekRewardTitle");
        this._ui.time1.x = this._ui.tf1.x + this._ui.tf1.displayWidth;
        this.timeRefresh();
    }

    protected onInit(): void {
        let type: EJjcRewadShow = this.Data.type;
        this.model = this.Data.m;
        this.model.on(JjcEvent.WeekTime,this,this.onTimeRefreshView);

        this.type = type;
        this._ui.list1.array = this.model.getRewardCfgList(type);//type == EJjcRewadShow.Day ? Arena_RankReward_Daily.Ins.List : Arena_RankReward_Weekly.Ins.List;
        this._ui.list1.scrollTo(0);
        // this._ui.title1.text = E.LangMgr.getLang(type == EJjcRewadShow.Day ? "DayRewardTitle" : "WeekRewardTitle");
        this.onTimeRefreshView();
        // this.model.on(JjcEvent.LingQuUpdate, this, this.timeRefresh);
        this.model.on(JjcEvent.JjcWeekInfoUpdate, this, this.updateRankView);
        this.model.on(JjcEvent.LingQuUpdate, this, this.updateRankView);
        this.model.on(JjcEvent.DailyDayTime,this,this.onTimeRefreshView);

        if (this.type == EJjcRewadShow.Week) {
            // let req = new JjcWeekInfo_req();
            // SocketMgr.Ins.SendMessageBin(req);
            this.model.reqWeekInfo();
        }
        this.updateRankView();
    }

    private onTimeComplete() {
        this.timeRefresh();
    }

    private timeRefresh() {
        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
        let _endTime: number = this.type == EJjcRewadShow.Week ? this.model.getWeekRewardEndTime() : this.model.getDayRewardEndTime();
        let empty:boolean = false;
        if(_endTime == 0){
            empty = true;
        }else{
            let sub = _endTime - TimeUtil.serverTime;
            if(sub > 0){
                this._timeCtl.start(sub);
            }else{
                empty = true;
            }
        }
        if(empty){
            this._ui.time1.text = "";
        }
    }

    private refreshBtn(){
        let _gray:boolean = false;
        if (this.type == EJjcRewadShow.Day) {
            if (this.model.dayStatus == EJjcRewadShowStatus.CanLingqu) {
               
            } else {
                _gray = true;
            }
        } else {
            if (this.model.weekRewardStatus == EGetStatus.CanNotGet || this.model.weekRewardStatus == EGetStatus.IsAlreadyGet) {
                _gray = true;
            }
        }
        this.lingquCtl.gray = _gray;
        this.lingquCtl.mouseEnable = !_gray;
        if (!_gray) {
            DotManager.addDot(this.lingquCtl.skin);
        }else{
            DotManager.removeDot(this.lingquCtl.skin);
        }
    }

}