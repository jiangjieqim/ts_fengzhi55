import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceWarEnemyLife_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { AllianceWarConfig} from "../proxy/AllianceFightProxy";
import { BossAvatarCtl } from "./ctl/BossAvatarCtl";

/**
 * 过五关斩六将页面
 */
export class AllianceFight56View extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFight56ViewUI;
    protected mMask = true;
    private _avatarShowList:BossAvatarCtl[] = [];
    protected autoFree:boolean = true;

    private refreshSeconds: number = 0;
    private hasTimer: boolean = false;
    private fightTimeCtl:TimeCtl;
    private timeCtl:TimeCtl;

    protected  onAddLoadRes(){
        this.addAtlas('allianceFight.atlas');
        this.addAtlas('fighthard.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFight56ViewUI;
            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.rankBtn,this,this.onRankHandler);
            ButtonCtl.CreateBtn(this._ui.reward_chapter_btn,this,this.onChapterHandler);
            this.fightTimeCtl = new TimeCtl(this._ui.tf1);
            this.timeCtl = new TimeCtl(this._ui.lab_time1);
            this._avatarShowList = [];
            // 初始化boss动画
            for(let i = 1;i <= 6;i++){
                let cell = new BossAvatarCtl();
                cell.skin = this._ui[`boss${i}`];
                this._avatarShowList.push(cell);
                this._avatarShowList[i-1].refresh(i);
            }
            if (!this.refreshSeconds) {
                const conf = AllianceWarConfig.Ins.getCfg();
                this.refreshSeconds = conf.f_RefreshTime;
            }
            this._ui.monetIcon.skin = IconUtils.getIconByCfgId(ECellType.AllianceEnergy);
            this.onPsUpdate();
        }
    }

    private onPsUpdate() {
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

    /**
     * 更新boss血量
     */
    private onBossLifeUpdate() {
        const bossList = AllianceFightModel.Ins.bossLifeList;
        for (let i = 1; i <= 6; i++) {
            const boss = bossList.find(o => o.id === i);
            if (!boss) continue;
            const avatar = this._avatarShowList.find(o => o.bossId === i);
            avatar.refreshBlood(boss);
        }
        if (AllianceFightModel.Ins.passLevel1) {
            this._ui.reward_chapter_btn.visible = true;
        } else {
            this._ui.reward_chapter_btn.visible = false;
            if (!this.hasTimer) {
                this.hasTimer = true;
                Laya.timer.loop(this.refreshSeconds * 1000,this,this.onLoopCheck);
            }
        }
    }

    private refreshReq() {
        const req = new AllianceWarEnemyLife_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onLoopCheck() {
        this.refreshReq();
    }

    protected onInit(){
        this.refreshReq();
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_PS, this, this.onPsUpdate);
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_BOSS_LIFE, this, this.onBossLifeUpdate);
        this.refreshTime2();
    }

    protected onExit(){
        this.timeCtl.dispose();
        this.fightTimeCtl.dispose();
        this._avatarShowList.forEach(o => {
            o.releaseRes();
        });
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_PS, this, this.onPsUpdate);
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_BOSS_LIFE, this, this.onBossLifeUpdate);
        if (this.hasTimer) {
            Laya.timer.clear(this,this.onLoopCheck);
            this.hasTimer = false;
        }
    }

    private onRankHandler() {
        E.ViewMgr.Open(EViewType.AllianceFightRankView);
    }

    private onChapterHandler(){
        if(!AllianceFightModel.Ins.passLevel1){
            E.ViewMgr.ShowMidError("击败所有boss后开启");//显示错误提示
            return;
        }
        E.ViewMgr.Open(EViewType.AllianceFightGCView);
    }

    private refreshTime2(){
        let t = AllianceFightModel.Ins.gctzSubTime;
        if (t > 0) {
            this.fightTimeCtl.start(t, new Laya.Handler(this, this.onUpdateTime2), new Laya.Handler(this, this.endTime2));
        } else {
            this.endTime2();
            this.fightTimeCtl.stop();
        }
    }
    
    private onUpdateTime2(){
        let time_str = TimeUtil.subTime(this.fightTimeCtl.tickVal);
        this.fightTimeCtl.setText('活动剩余时间：' + time_str);
    }

    private endTime2(){
        this.fightTimeCtl.setText("");
    }

}