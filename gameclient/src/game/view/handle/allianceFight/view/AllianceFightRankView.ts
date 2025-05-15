import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceWarAllianceRank_req, AllianceWarInnerRank_req, AllianceWarRewardRank_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceModel } from "../../alliance/model/AllianceModel";
import { DotManager } from "../../common/DotManager";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { RankItemCtl1 } from "./ctl/RankItemCtl1";
import { RankItemCtl2 } from "./ctl/RankItemCtl2";
import { RankItemCtl3 } from "./ctl/RankItemCtl3";
import { RankItem1 } from "./item/RankItem1";
import { RankItem2 } from "./item/RankItem2";
import { RankItem3 } from "./item/RankItem3";


/**
 * 过五关斩六将玩家伤害排行页面
 */
export class AllianceFightRankView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightRankViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;
    
    private selectIndex: number = 0;
    private fightTimeCtl:TimeCtlV2;


    protected  onAddLoadRes(){
        this.addAtlas('allianceFight.atlas');
        this.addAtlas('fighthard.atlas');
        this.addAtlas('jjc.atlas');
        this.addAtlas('alliance.atlas');
    }

    private rankCtl1: RankItemCtl1;
    private rankCtl2: RankItemCtl2;
    private rankCtl3: RankItemCtl3;

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightRankViewUI;
            this.bindClose(this._ui.close1);


            ButtonCtl.CreateBtn(this._ui.rewardBtn,this,this.onRewardHandler);
            ButtonCtl.CreateBtn(this._ui.btn1,this,this.onMenu1Handler);
            ButtonCtl.CreateBtn(this._ui.btn2,this,this.onMenu2Handler);
            ButtonCtl.CreateBtn(this._ui.btn3,this,this.onMenu3Handler);

            this._ui.list1.itemRender = RankItem1;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender1);
            this._ui.list1.vScrollBarSkin = ' ';
            this._ui.list1.array = [];
            this.rankCtl1 = new RankItemCtl1(this._ui.my1);
            this._ui.list2.itemRender = RankItem2;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onItemRender2);
            this._ui.list2.vScrollBarSkin = ' ';
            this._ui.list2.array = [];
            this.rankCtl2 = new RankItemCtl2(this._ui.my2);
            this._ui.list3.itemRender = RankItem3;
            this._ui.list3.renderHandler = new Laya.Handler(this,this.onItemRender3);
            this._ui.list3.vScrollBarSkin = ' ';
            this._ui.list3.array = [];
            this.rankCtl3 = new RankItemCtl3(this._ui.my3);

            this._ui.timeTf.text = ``;

            this.fightTimeCtl = new TimeCtlV2(this._ui.timeTf,"{0}");
        }
    }

    private onRewardHandler() {
        if (this.selectIndex !== 2) {
            E.ViewMgr.Open(EViewType.AllianceFightRewardView, undefined, this.selectIndex + 1);
        }
    }

    private onMenuSelected(index) {
        //if (index === this.selectIndex) return;
        this.selectIndex = index;
        const arr = [
            { menu: this._ui.btn1, list: this._ui.list1, my: this._ui.my1, req: AllianceWarAllianceRank_req },
            { menu: this._ui.btn2, list: this._ui.list2, my: this._ui.my2, req: AllianceWarInnerRank_req },
            { menu: this._ui.btn3, list: this._ui.list3, my: this._ui.my3, req: AllianceWarRewardRank_req },
        ];
        for (let i = 0; i < arr.length; i++) {
            if (i === index) {
                arr[i].menu.skin = 'remote/alliance/anniu_2.png';
                arr[i].list.visible = arr[i].my.visible = true;
            } else {
                arr[i].menu.skin = 'remote/alliance/anniu_1.png';
                arr[i].list.visible = arr[i].my.visible = false;
            }
        }
        if (this.selectIndex === 2) {
            this._ui.rewardBtn.visible = false;
        } else {
            this._ui.rewardBtn.visible = true;
        }
        const req = new arr[index].req;
        SocketMgr.Ins.SendMessageBin(req);
        this.updateRedDot();
    }

    private onMenu1Handler() {
        this.onMenuSelected(0);
    }

    private onMenu2Handler() {
        this.onMenuSelected(1);
    }

    private onMenu3Handler() {
        this.onMenuSelected(2);
    }

    private onItemRender1(item: RankItem1) {
        item.setData(item.dataSource);
    }

    private onItemRender2(item: RankItem2) {
        item.setData(item.dataSource);
    }

    private onItemRender3(item: RankItem3) {
        item.setData(item.dataSource);
    }

    private onAllianceRankUpdate() {
        this._ui.list1.array = AllianceFightModel.Ins.allianceRankList;
        this.rankCtl1.updateView(AllianceFightModel.Ins.myAllianceRankVal);
    }

    private onInnerRankUpdate() {
        this._ui.list2.array = AllianceFightModel.Ins.innerRankList;
        this.rankCtl2.updateView(AllianceFightModel.Ins.myInnerRankVal);
    }

    private onAllianceRewardUpdate() {
        this._ui.list3.array = AllianceFightModel.Ins.rewardRankList;
        this.rankCtl3.updateView(AllianceFightModel.Ins.myRewardRankVal);
    }

    private showMemberView() {
        const data = AllianceFightModel.Ins.selectedAlliance;
        E.ViewMgr.Open(EViewType.AllianceFightMemberView, null, data);
    }

    protected onInit(){
        this.timeUpdate();
        this.onMenuSelected(0);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_ALLIANCE_RANK, this, this.onAllianceRankUpdate);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_INNER_RANK, this, this.onInnerRankUpdate);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_REWARD_RANK, this, this.onAllianceRewardUpdate);
        AllianceModel.Ins.on(AllianceModel.UPDATE_WAR_RED, this, this.updateRedDot);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_PLAYER_LIST, this, this.showMemberView);
        this.updateRedDot();
    }

    protected onExit(){
        this.fightTimeCtl.stop();
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_ALLIANCE_RANK, this, this.onAllianceRankUpdate);
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_INNER_RANK, this, this.onInnerRankUpdate);
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_REWARD_RANK, this, this.onAllianceRewardUpdate);
        AllianceModel.Ins.off(AllianceModel.UPDATE_WAR_RED, this, this.updateRedDot);
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_PLAYER_LIST, this, this.showMemberView);
    }

    private onTimeEnd(){
        this.timeUpdate();
    }

    private onTimeUpdate(){
        this._ui.timeTf.text = `排行榜刷新倒计时：${this._ui.timeTf.text}`;
    }

    private timeUpdate(){
        let sub = AllianceFightModel.Ins.fightSubTime;
        if(sub <= 0){
        }else{
            this.fightTimeCtl.start(sub);
            this.fightTimeCtl.on(Laya.Event.CHANGE,this,this.onTimeUpdate);
            this.fightTimeCtl.on(Laya.Event.COMPLETE,this,this.onTimeEnd);
        }
    }

    /**
     * 赤壁大战报名红点
     */
    private updateRedDot() {
        if (AllianceModel.Ins.warRedState) {
            // 排名奖励红点
            if (((this.selectIndex === 0) && (AllianceFightModel.Ins.myAllianceRewardState === 1)) || (this.selectIndex === 1) && (AllianceFightModel.Ins.myInnerRewardState === 1)) {
                DotManager.addDot(this._ui.rewardBtn);
            } else {
                DotManager.removeDot(this._ui.rewardBtn);
            }
            // 联盟排行红点
            if (AllianceFightModel.Ins.myAllianceRewardState === 1) {
                DotManager.addDot(this._ui.btn1);
            } else {
                DotManager.removeDot(this._ui.btn1);
            }
            // 盟内排行红点
            if (AllianceFightModel.Ins.myInnerRewardState === 1) {
                DotManager.addDot(this._ui.btn2);
            } else {
                DotManager.removeDot(this._ui.btn2);
            }
        } else {
            DotManager.removeDot(this._ui.rewardBtn);
            DotManager.removeDot(this._ui.btn1);
            DotManager.removeDot(this._ui.btn2);
        }
    }
}