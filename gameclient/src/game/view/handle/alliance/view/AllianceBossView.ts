import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceBossFight_req, AllianceInnerRankList_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AvatarView } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { AllianceModel } from "../model/AllianceModel";
import { AllianceBossAttributeProxy } from "../proxy/AllianceProxy";

/**
 * 同盟修改公告页面
 */
export class AllianceBossView extends ViewBase{
    private _ui:ui.views.alliance.ui_allianceBossViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    private fightBtnCtl:ButtonCtl;
    private timeCtl:TimeCtlV2;
    public mainDetailList:any[];
    private model:AllianceModel;
    private _avatar:AvatarView;

    protected onAddLoadRes(): void { 
        this.addAtlas("fighthard.atlas");
        this.addAtlas("zhengzhan.atlas");
    }
    protected onExit(): void {
        this.timeCtl.stop();
        this.model.off(AllianceModel.BOSS_INFO_UPDATE, this, this.refreshEvt);
        AllianceModel.Ins.on(AllianceModel.UPDATE_BOSS_FIGHT_NUM, this, this.updateBossFightNum);
        this.disposeAvatar();
    }

    private updateBossFightNum() {
        const times = AllianceModel.Ins.bossFightNum;
        this._ui.tf7.text = E.getLang("AllianceFreeFightWord") + ":" + times;//剩余免费次数
        if (times > 0) {
            this.fightBtnCtl.grayMouseDisable = false;
        } else {
            this.fightBtnCtl.grayMouseDisable = true;
        }
    }

    private disposeAvatar(){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = AllianceModel.Ins;
            this.UI = this._ui = new ui.views.alliance.ui_allianceBossViewUI();
            this.timeCtl  = new TimeCtlV2(this._ui.timeTf,"{0}");

            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.tujianBtn, this, this.onhandbookHandler); // 凶兽图鉴
            ButtonCtl.CreateBtn(this._ui.help1,this,this.onHelpHandler); //解说
        
            this.fightBtnCtl=ButtonCtl.CreateBtn(this._ui.fightBtn,this,this.onFightHandler);//挑战

            ButtonCtl.CreateBtn(this._ui.rankBtn,this,this.onRankHandler);//凶兽排行
        }
    }

    private onFightHandler(){
        const times = AllianceModel.Ins.bossFightNum;
        if (times <= 0) {
            E.ViewMgr.ShowMidError(E.getLang("AllianceFightOverTips"));
            return;
        }
        const req = new AllianceBossFight_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**鏖战排行榜 */
    private onRankHandler(){
        const req = new AllianceInnerRankList_req();
        SocketMgr.Ins.SendMessageBin(req);
        E.ViewMgr.Open(EViewType.AllianceRankListView);
    }

    private onHelpHandler(){
        E.ViewMgr.openHelpView("Alliancexiongshou01","Alliancexiongshou02");
    }
    private onTimeEnd(){
        // this._ui.timeTf.text ="";
        this.timeUpdate();
    }
    /**图鉴 */
    private onhandbookHandler() {
        E.ViewMgr.Open(EViewType.AllianceBossDetailView);
    }
    private onTimeUpdate(){
        let w:number = this._ui.timeTf.textField.width + this._ui.tf1.textField.width;
        this._ui.timeTf.x = (this._ui.width - w)/2;
        this._ui.tf1.x = this._ui.timeTf.x + this._ui.timeTf.textField.width;
    }
    private timeUpdate(){
        let sub = this.model.subTime;
        if(sub <= 0){
            this._ui.tf1.visible = false;
            this._ui.timeTf.visible = false;
        }else{
            this._ui.tf1.visible = true;
            this._ui.timeTf.visible = true;
            
            this.timeCtl.start(sub);
            this.timeCtl.on(Laya.Event.CHANGE,this,this.onTimeUpdate);
            this.timeCtl.on(Laya.Event.COMPLETE,this,this.onTimeEnd);
        }
    }

    private refreshEvt(){
        this.timeUpdate();
        const bossRevc = AllianceModel.Ins.bossInitRevc;
        if (!bossRevc) return;
        const bossId = bossRevc.bossId;
        const bossCfg = AllianceBossAttributeProxy.Ins.getByBossId(bossId);
        this._ui.nametf.text = bossCfg?.f_BossName || '';
        this.disposeAvatar();
        this._avatar = this.model.getBossMonster();//AvatarFactory.createBossMonster(`o/spine/${key}/${key}`);

        this._avatar.play(EAvatarAnim.NormalStand);
        this._ui.avatarCon.addChild(this._avatar);

        this.fightBtnCtl.grayMouseDisable = false;
    }

    protected onInit(): void {
        this.model.on(AllianceModel.BOSS_INFO_UPDATE, this, this.refreshEvt);
        AllianceModel.Ins.on(AllianceModel.UPDATE_BOSS_FIGHT_NUM, this, this.updateBossFightNum);
        this.refreshEvt();
        this.updateBossFightNum();
    }
}