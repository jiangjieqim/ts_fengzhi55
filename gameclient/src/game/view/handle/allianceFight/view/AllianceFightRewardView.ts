import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { RewardItem } from "./item/RewardItem";
import { AllianceWarRankAllianceProxy, AllianceWarRankPersonalProxy } from '../proxy/AllianceFightProxy';
import { AllianceWarGetRankReward_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";


/**
 * 过五关斩六将玩家伤害排行页面
 */
export class AllianceFightRewardView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightRewardViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;
    
    private type: 1 | 2 = 1; // 1联盟奖励 2盟内奖励

    protected  onAddLoadRes(){
        this.addAtlas('allianceFight.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightRewardViewUI;
            this.bindClose(this._ui.close1);

            ButtonCtl.CreateBtn(this._ui.lingquBtn,this,this.onRewardHandler);
            this._ui.list1.itemRender = RewardItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender1);
            this._ui.list1.vScrollBarSkin = ' ';
            this._ui.tf1.visible = this._ui.time1.visible = false;
        }
    }

    private onRewardHandler() {
        if (!this.type) return;
        let req = new AllianceWarGetRankReward_req();
        req.flag = this.type;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onItemRender1(item: RewardItem) {
        item.setData(item.dataSource);
    }

    private onRewardUpdate() {
        // 1联盟奖励 2盟内奖励
        let rank; 
        //0不可领 1可领 2已领
        let state;
        let arr: { f_id: number, f_Rewards: string }[] = [];
        if (this.type === 1) {
            rank = AllianceFightModel.Ins.myAllianceRankVal?.rank;
            state = AllianceFightModel.Ins.myAllianceRewardState;
            arr = AllianceWarRankAllianceProxy.Ins.List;
        } else {
            rank = AllianceFightModel.Ins.myInnerRankVal?.rank; 
            state = AllianceFightModel.Ins.myInnerRewardState;
            arr = AllianceWarRankPersonalProxy.Ins.List;
        }
        this._ui.myRankTf.text = rank ? rank.toString() : '0';
        this._ui.lingquBtn.disabled = state === 1 ? false : true;
        this._ui.list1.array = arr;
    }

    protected onInit(){
        this.type = this.Data;
        this.onRewardUpdate();
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_REWARD_STATE, this, this.onRewardUpdate);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_ALLIANCE_RANK, this, this.onRewardUpdate);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_INNER_RANK, this, this.onRewardUpdate);
    }

    protected onExit(){
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_REWARD_STATE, this, this.onRewardUpdate);
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_ALLIANCE_RANK, this, this.onRewardUpdate);
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_INNER_RANK, this, this.onRewardUpdate);
    }
}