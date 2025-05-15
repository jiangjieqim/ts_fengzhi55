import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceWarEnterActivity_req, AllianceWarSignUp_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceModel } from "../../alliance/model/AllianceModel";
import { ChatModel } from "../../chat/model/ChatModel";
import { DotManager } from "../../common/DotManager";
import { AllianceFightModel, WarStatus } from "../model/AllianceFightModel";
import { AllianceWarBounsProxy, AllianceWarConfig } from "../proxy/AllianceFightProxy";


/**
 * 赤壁大战报名页面
 */
export class AllianceFightEnrollView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightEnrollViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    private rewardTimeCtl:TimeCtlV2;

    protected  onAddLoadRes(){
        this.addAtlas('allianceFight.atlas');
        this.addAtlas('fighthard.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightEnrollViewUI;
            this.bindClose(this._ui.close1);
            this.btnList.push(
                ButtonCtl.CreateBtn(this._ui.enroll_btn,this,this.onEnrollHandler),
                ButtonCtl.CreateBtn(this._ui.rankBtn,this,this.onRankHandler),
                ButtonCtl.CreateBtn(this._ui.reward_chapter_btn,this,this.onRewardChapterHandler),
                ButtonCtl.CreateBtn(this._ui.chatbg,this,this.onChatHandler,false),
                ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick))
            );

            this.setEnrollTime();

            this.rewardTimeCtl = new TimeCtlV2(this._ui.count_down_tf2,"{0}");
            this.setRewardChapterVisible(false);
            this.updateChat();
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("allianceFightTitle","allianceFightDec");
    }

    private onChatHandler() {
        E.ViewMgr.Open(EViewType.ChatView);
    }

    private setRewardChapterVisible(visible) {
        this._ui.count_down_tf2.visible = visible;
        let arr = AllianceWarBounsProxy.Ins.getCfgByRank(AllianceFightModel.Ins.rank);
        if (arr && arr.length) {
            this._ui.count_down_lab.text = arr[0].f_BounsName;
        }else{
            this._ui.count_down_lab.text = "奖励关";
        }
    }

    private onRankHandler() {
        E.ViewMgr.Open(EViewType.AllianceFightRankView);
    }

    private onRewardChapterHandler() {
        E.ViewMgr.Open(EViewType.AllianceFightAwardView1);
    }

    private setEnrollTime() {
        const conf = AllianceWarConfig.Ins.getCfg();
        const ranges = [Number(conf.f_EventStartDay), Number(conf.f_EventStartDay), Number(conf.f_ApplyStartDay), Number(conf.f_ApplyEndDay)];
        const days = [];
        for (const range of ranges) {
            if (range < 7) {
                days.push(TimeUtil.getDayString(range));
            } else {
                days.push(TimeUtil.getDayString(0));
            }
        }
        this._ui.tf1.text = `活动开启时间：周${TimeUtil.getDayString(ranges[0])} ${conf.f_EventStartTime}到周${TimeUtil.getDayString(ranges[1])} ${conf.f_EventEndTime}`;
        this._ui.count_down_tf1.text = `报名时间：周${TimeUtil.getDayString(ranges[2])} ${conf.f_ApplyStartTime}到周${TimeUtil.getDayString(ranges[3])} ${conf.f_ApplyEndTime}`;
    }

    private onEnrollHandler() {
        if (AllianceFightModel.Ins.isEnrolled) {
            // 进入
            AllianceFightModel.Ins.entered = true;
            AllianceModel.Ins.checkWarRedState();
            const req = new AllianceWarEnterActivity_req();
            req.type = 1;
            SocketMgr.Ins.SendMessageBin(req);
        } else {
            // 报名
            let req = new AllianceWarSignUp_req();
            SocketMgr.Ins.SendMessageBin(req);
        }

    }

    private onTimeEnd2(){
        // this._ui.tf1.text ="";
        this.timeUpdate2();
    }

    private onTimeUpdate2(){
        this._ui.count_down_tf2.text = `剩余：${this._ui.count_down_tf2.text}`;
    }
    
    private timeUpdate2(){
        let sub = AllianceFightModel.Ins.rewardSubTime;
        if(sub <= 0){
        }else{
            this.rewardTimeCtl.start(sub);
            this.rewardTimeCtl.on(Laya.Event.CHANGE,this,this.onTimeUpdate2);
            this.rewardTimeCtl.on(Laya.Event.COMPLETE,this,this.onTimeEnd2);
        }
    }

    private refreshBtnStatus() {
        this.setRewardChapterVisible(false);
        const warStatus = AllianceFightModel.Ins.warStatus;
        switch (warStatus) {
            case WarStatus.Enroll:
                if (AllianceFightModel.Ins.isEnrolled) {
                    this._ui.enroll_btn.disabled = true;
                    this._ui.tf6.text = '已报名';
                } else {
                    this._ui.enroll_btn.disabled = false;
                    this._ui.enroll_btn.skin = `remote/allianceFight/anniu_blue.png`;
                    this._ui.tf6.text = '报名';
                }
                break;
            case WarStatus.EnrollEnd:
                this._ui.enroll_btn.disabled = true;
                if (AllianceFightModel.Ins.isEnrolled) {
                    this._ui.tf6.text = '已报名';
                } else {
                    this._ui.tf6.text = '未报名';
                }
                break;
            case WarStatus.Fight:
                if (AllianceFightModel.Ins.isEnrolled) {
                    this._ui.enroll_btn.disabled = false;
                    this._ui.enroll_btn.skin = `remote/allianceFight/anniu_green.png`;
                    this._ui.tf6.text = '进入';
                } else {
                    this._ui.enroll_btn.disabled = true;
                    this._ui.tf6.text = '未报名';
                }
                break;
            case WarStatus.FightEnd:
            case WarStatus.Reward:
                if (AllianceFightModel.Ins.isEnrolled && AllianceFightModel.Ins.showRewardChapter) {
                    this.setRewardChapterVisible(true);
                }
                this._ui.enroll_btn.disabled = true;
                this._ui.tf6.text = '已结束';
                break;
            case WarStatus.RewardEnd:
                this._ui.enroll_btn.disabled = true;
                this._ui.tf6.text = '已结束';
                break;
        }
    }

    // private onEnrollUpdate() {
    //     this.refreshBtnStatus();
    // }

    // private onRankUpdate(){
    //     this.refreshBtnStatus();
    // }

    private updateChat() {
        const list = ChatModel.Ins.chatLeagueList;
        const newChat = list.length ? list[list.length - 1] : null;
        this._ui.chatTf.text = newChat ? StringUtil.convertName(`${newChat.name}:${newChat.chat}`, 15) : '';
    }

    protected onInit(){
        this.timeUpdate2();
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_ENROLL, this, this.updateRedDot);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_RANK, this, this.updateRedDot);
        AllianceModel.Ins.on(AllianceModel.UPDATE_WAR_RED, this, this.updateRedDot);
        ChatModel.Ins.on(ChatModel.UPDATA_VIEW, this, this.updateChat);
        this.updateRedDot();
    }

    protected onExit(){
        this.rewardTimeCtl.stop();
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_ENROLL, this, this.updateRedDot);
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_RANK, this, this.updateRedDot);
        AllianceModel.Ins.off(AllianceModel.UPDATE_WAR_RED, this, this.updateRedDot);
        ChatModel.Ins.off(ChatModel.UPDATA_VIEW, this, this.updateChat);
    }

    /**
     * 赤壁大战报名红点
     */
    private updateRedDot() {
        this.refreshBtnStatus();
        if (AllianceModel.Ins.warRedState) {
            let isReward = (AllianceFightModel.Ins.myAllianceRewardState === 1) || (AllianceFightModel.Ins.myInnerRewardState === 1);
            if (isReward) {
                // 排行榜奖励红点
                DotManager.addDot(this._ui.rankBtn);
            } else {
                DotManager.removeDot(this._ui.rankBtn);
            }
            const warStatus = AllianceFightModel.Ins.warStatus;
            if (warStatus === WarStatus.Reward) {
                // 奖励关卡红点
                DotManager.addDot(this._ui.reward_chapter_btn);
                DotManager.removeDot(this._ui.enroll_btn);
                return;
            } else if (warStatus === WarStatus.Fight) {
                // 进入红点
                if (AllianceFightModel.Ins.entered) {
                    DotManager.removeDot(this._ui.enroll_btn);
                } else {
                    DotManager.addDot(this._ui.enroll_btn);
                }
                DotManager.removeDot(this._ui.reward_chapter_btn);
                return;
            } else if (warStatus === WarStatus.Enroll) {
                // 报名红点
                if (AllianceFightModel.Ins.isEnrolled) {
                    DotManager.removeDot(this._ui.enroll_btn);
                } else {
                    DotManager.addDot(this._ui.enroll_btn);
                }
                DotManager.removeDot(this._ui.reward_chapter_btn);
                return;
            } else {
                DotManager.removeDot(this._ui.enroll_btn);
                DotManager.removeDot(this._ui.reward_chapter_btn);
            }
            return;
        }
        DotManager.removeDot(this._ui.rankBtn);
        DotManager.removeDot(this._ui.reward_chapter_btn);
        DotManager.removeDot(this._ui.enroll_btn);
    }
}