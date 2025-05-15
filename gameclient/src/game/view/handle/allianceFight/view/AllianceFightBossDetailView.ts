import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceWarBossDamage_req, AllianceWarFight_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { AllianceWarSixBossProxy } from "../proxy/AllianceFightProxy";
import { BossAvatarCtl } from "./ctl/BossAvatarCtl";

/**
 * 过五关斩六将boss详情页面
 */
export class AllianceFightBossDetailView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightBossDetailViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    private bossId: number = 0;
    private bossAvatar: BossAvatarCtl;

    protected  onAddLoadRes(){
        this.addAtlas('allianceFight.atlas');
        this.addAtlas('alliance.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightBossDetailViewUI;
            this.bindClose(this._ui.close1);

            let cell = new BossAvatarCtl();
            this.bossAvatar = cell;

            ButtonCtl.CreateBtn(this._ui.fight_btn,this,this.onFightHandler);
            ButtonCtl.CreateBtn(this._ui.detail_btn,this,this.onDetailHandler);
        }
    }

    private onFightHandler() {
        const req = new AllianceWarFight_req();
        req.id = this.bossId;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onDetailHandler() {
        const req = new AllianceWarBossDamage_req();
        req.id = this.bossId;
        SocketMgr.Ins.SendMessageBin(req);
        E.ViewMgr.Open(EViewType.AllianceFightHarmDetailView);
    }

    protected onInit(){
        this.bossId = this.Data;
        this.updateBoss();
        this.updateView();
        this.onBossLifeUpdate();
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_BOSS_LIFE, this, this.onBossLifeUpdate);
    }

    private onBossLifeUpdate() {
        const cell = this.bossAvatar;
        const bossList = AllianceFightModel.Ins.bossLifeList;
        const boss = bossList.find(o => o.id === this.bossId);
        cell.refreshBlood(boss);
    }

    private updateBoss() {
        const cell = this.bossAvatar;
        cell.skin = this._ui.boss_avt;
        cell.refresh(this.bossId);
    }

    private updateView() {
        const conf = AllianceWarSixBossProxy.Ins.GetDataById(this.bossId) as Configs.t_Alliance_War_SixBoss_dat;
        this._ui.boss_name_tf.text = conf.f_name;
        this._ui.reward_tf.text = `击败点数：${conf.f_points}`;
    }

    protected onExit(){
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_BOSS_LIFE, this, this.onBossLifeUpdate);
        this.bossAvatar.refresh(null);
    }
}