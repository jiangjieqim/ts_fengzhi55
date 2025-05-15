import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { SpringFestivalAllianceRank_req } from "../../../../network/protocols/BaseProto";
import { AllianceModel } from "../../alliance/model/AllianceModel";
import { AllianceFightModel } from "../../allianceFight/model/AllianceFightModel";
import { DotManager } from "../../common/DotManager";
import { SpringFestivalModel } from "../model/SpringFestivalModel";
import { SpringFestivalRankItem } from "./item/SpringFestivalRankItem";

export class SpringFestivalRankView extends ViewBase{
    private _ui:ui.views.springFestival.ui_springFestivalRankViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("springFestival.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.springFestival.ui_springFestivalRankViewUI;

            this.btnList.push(
                ButtonCtl.Create(this._ui.rewardBtn,new Laya.Handler(this,this.onBtnClick))
            );
            this.bindClose(this._ui.close1);
            this._timeCtl = new TimeCtl(this._ui.timeTf);
            this._ui.list.itemRender = SpringFestivalRankItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onBtnClick(){
        E.ViewMgr.Open(EViewType.SpringFestivalAwRankView);
    }

    private onRenderHandler(item:SpringFestivalRankItem){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_RANK, this, this.onUpdataView);
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_RANK_REWARD, this, this.updataRedTip);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_PLAYER_LIST, this, this.showMemberView);
        this.updataTime();
        let req:SpringFestivalAllianceRank_req = new SpringFestivalAllianceRank_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_RANK, this, this.onUpdataView);
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_RANK_REWARD, this, this.updataRedTip);
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_PLAYER_LIST, this, this.showMemberView);
        this._timeCtl.dispose();
    }

    private updataRedTip(){
        if(SpringFestivalModel.Ins.isRankRedTip()){
            DotManager.addDot(this._ui.rewardBtn);
        }else{
            DotManager.removeDot(this._ui.rewardBtn);
        }
    }

    private onUpdataView(){
        this._ui.list.array = SpringFestivalModel.Ins.rankList;
        this._ui.item.mingcitf.text = SpringFestivalModel.Ins.rank + "";
        this._ui.item.lab.text = SpringFestivalModel.Ins.prestige + "";
        this._ui.item.bg.skin = "remote/springFestival/dfjjc_xszj.png";
        const alliance = AllianceModel.Ins.alliance;
        if (!alliance) return;
        this._ui.item.nameTf.text = alliance.name + "";
        this.updataRedTip();
    }

    private showMemberView() {
        const data = AllianceFightModel.Ins.selectedAlliance;
        E.ViewMgr.Open(EViewType.AllianceFightMemberView, null, data);
    }

    private updataTime(){
        let time = SpringFestivalModel.Ins.endunix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText("活动剩余时间："+time_str);
    }

    private endTime() {
        this._timeCtl.setText("活动剩余时间：已结束");
    }
}