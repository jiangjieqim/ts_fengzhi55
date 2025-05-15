import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import {DotManager} from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { IJjcMainView, IJJC_Model } from "../../peakjjc/model/IJjcInterface";
// import { IJjcMainView } from "../../peakjjc/PeakJjcView";
import { JjcModel } from "../JjcModel";
import { JjcEvent } from "../vos/JjcEvent";
import { EJjcRewadShow } from "../vos/JjcType";
import { JjcLogBtnCtl } from "./JjcLogBtnCtl";
import { JjcOtherItemCtl } from "./JjcOtherItemCtl";
import { JjcOtherItemView } from "./JjcOtherItemView";
/**竞技场主界面 */
export class JjcMainView extends ViewBase {
    protected mMask:boolean = true;
    protected _ui: IJjcMainView;
    protected model: IJJC_Model;
    protected autoFree = true;
    /////////////////////////////////////////
    private tiaozhanCtl: ButtonCtl;
    private _timeCtl:TimeCtlV2;
    private _ownerCtl:JjcOtherItemCtl;
    protected _logCtl:JjcLogBtnCtl;
    /**是否有积分 */
    // protected hasScore:boolean = false;

    protected custInit(){
        this.model = JjcModel.Ins;
        this.UI = this._ui = new ui.views.jjc.ui_jjc_mainUI();
        this._ui.tf6.text = E.LangMgr.getLang("JjcDayRank");
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.custInit();
            this.btnList.push( 
                ButtonCtl.Create(this._ui.close1, new Laya.Handler(this, this.Close)),
                ButtonCtl.Create(this._ui.leftbtn,new Laya.Handler(this,this.onCurWeekHandler)),
                ButtonCtl.Create(this._ui.rightbtn,new Laya.Handler(this,this.onTodayHandler))
            );
            this.tiaozhanCtl = ButtonCtl.Create(this._ui.tiaozhan, new Laya.Handler(this, this.onFightHandler));
            this._ui.list1.itemRender = JjcOtherItemView;
            this._ui.list1.vScrollBarSkin = " ";
            this._ui.list1.renderHandler = new Laya.Handler(this,this.JjcOtherItemHandler);
            this._ui.list1.array = [];

            this._timeCtl = new TimeCtlV2(this._ui.timetf,"{0}");
            this._ownerCtl = new JjcOtherItemCtl(this._ui.owner);
        }
    }
    private JjcOtherItemHandler(item:JjcOtherItemView,index:number) {
        item.setData(item.dataSource,this.model.hasScore);
    }

    /**本周 */
    private onCurWeekHandler() {
        E.ViewMgr.Open(EViewType.JjcRewardShow,null,{type:EJjcRewadShow.Week,m:this.model});
    }
    /**今日 */
    private onTodayHandler() {
        E.ViewMgr.Open(EViewType.JjcRewardShow,null,{type:EJjcRewadShow.Day,m:this.model});
    }

    /**挑战 */
    private onFightHandler() {
        RedUpdateModel.Ins.save(this.model.redId,TimeUtil.serverTime);
        E.ViewMgr.Open(EViewType.JjcFight,null,this.model);
    }

    protected onExit(): void {
        this.model.off(JjcEvent.RedUpdate,this,this.onRedUpdate);
        this.model.off(JjcEvent.TodayRankValUpdate,this,this.onTodayRankValUpdate);
        RedUpdateModel.Ins.off(RedUpdateModel.UPDATA,this,this.onTiaozhanBtnEvt);
        this._timeCtl.stop();
        // MainModel.Ins.mainMask = false;
        this.model.off(JjcEvent.SelfScore,this,this.onScoreHandle);
    }

    private onTimeComplete(){
        this.timeRefresh();
    }
    protected onAddLoadRes(): void {
        this.addAtlas("jjc.atlas");
    }

    private onTodayRankValUpdate(){
        this._ownerCtl.updateView(this.model);
    }
    private onRedUpdate(){
        if(this.model.getRedByType(EJjcRewadShow.Day)){
            DotManager.addDot(this._ui.rightbtn);
        }else{
            DotManager.removeDot(this._ui.rightbtn);
        }

        if(this.model.getRedByType(EJjcRewadShow.Week)){
            DotManager.addDot(this._ui.leftbtn);
        }else{
            DotManager.removeDot(this._ui.leftbtn);
        }
    }
    protected mMainSnapshot = true;
    // private endTime:number = 0;
    protected onInit(): void {
        // MainModel.Ins.mainMask = true;
        // this._logCtl.model = this.model;
        this._logCtl = new JjcLogBtnCtl(this._ui.fightbtn,this.model);
        
        this.timeRefresh();
        this._ownerCtl.updateView(this.model);
        this.model.on(JjcEvent.TodayRankValUpdate,this,this.onTodayRankValUpdate);
        this.model.on(JjcEvent.RedUpdate,this,this.onRedUpdate);
        RedUpdateModel.Ins.on(RedUpdateModel.UPDATA,this,this.onTiaozhanBtnEvt);
        this.onTiaozhanBtnEvt();

        this.onRedUpdate();
        this.model.on(JjcEvent.SelfScore,this,this.onScoreHandle);
        this.model.once(JjcEvent.UpdatePlayerList,this,this.onRefreshList);
        this.model.reqJjcList();
        this.onScoreHandle();
    }

    private onScoreHandle(){
        if(this.model.hasScore){
            if(this._ui.tf9){
                this._ui.tf9.visible = true;
            }       
            this._ui.owner.jifenImg.visible = true;
            this._ui.owner.jftf.text = this.model.selfScore + "";
        }else{
            this._ui.owner.jifenImg.visible = false;
            if(this._ui.tf9){
                this._ui.tf9.visible = false;
            }
        }
    }

    private onTiaozhanBtnEvt(){
        if(this.model.mFightRed){
            DotManager.addDot(this.tiaozhanCtl.skin);
        }else{
            DotManager.removeDot(this.tiaozhanCtl.skin);
        }
    }
    protected get showList(){
        return this.model.playerList;
    }
    protected onRefreshList(){
        this._ui.list1.array = this.showList;
        this._ui.list1.scrollTo(0);
    }

    private timeRefresh() {
        let sub = this.model.endTime - TimeUtil.serverTime;
        if(sub > 0){
            this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
            this._timeCtl.start(sub);
        }else{
            this._ui.timetf.text = "";
            this._timeCtl.stop();
        }
    }
}