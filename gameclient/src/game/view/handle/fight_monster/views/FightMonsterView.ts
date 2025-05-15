import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import{ ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType, EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AdWatchDone_req, TeamFightHarmReward_req, TeamFight_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { AvatarView } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { GuaJiModel } from "../../guaji/model/GuaJiModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { FightMonsterModel } from "../vos/FightMonsterModel";
import { t_TeamFight_BossAttribute, t_TeamFight_Reward } from "../vos/t_TeamFight_Reward";
interface IFighthardCfg{
    f_id: number;
    f_Stalls: string;
}
class FighthardItemView extends ui.views.fighthard.ui_fighthard_itemUI {
    private cfg: Configs.t_TeamFight_Reward_dat;
    private model: FightMonsterModel;
    private _curAccHarm: number;
    private index:number = 0;
    private isCanLingQu:boolean = false;
    constructor() {
        super();
        this.model = FightMonsterModel.Ins;
        this.icon.on(Laya.Event.CLICK, this, this.onIconClick);
    }
    private onIconClick(){
        // console.log(1113);
        if(this.isCanLingQu){
            let req = new TeamFightHarmReward_req();
            SocketMgr.Ins.SendMessageBin(req);
        }
    }
    refresh(index:number){
        this.cfg = this.dataSource;
        this.index = index;
        let nextcfg:Configs.t_TeamFight_Reward_dat;
        let precfg:Configs.t_TeamFight_Reward_dat;

        let _curAccHarm:number = FightMonsterModel.Ins.accHarm;
        this._curAccHarm = _curAccHarm;
        let l = (E.ViewMgr.Get(EViewType.FightMonster) as FightMonsterView).mainDetailList;
        // this.bg1.visible = false;
        this.enableIcon = false;
        this.jindu1.visible =  this.jindubg1.visible = true;
        this.arrow.visible = false;
        ////////////////////////////////////////////
        let s1:number;
        let e1:number;
        let s2:number;
        let e2:number;
        this.bg2.visible = true;
        this.tf.visible = true;
        if(index == 0){
            //第一个
            this.tf.visible = false;
            this.icon.visible = false;
            this.arrow.visible = true;
            this.jindu0.visible = this.jindubg0.visible = false;
            
            s1 = parseInt(this.cfg.f_Stalls);
            nextcfg = l[index + 1];

            e1 = s1 + (parseInt(nextcfg.f_Stalls) - s1)/2;
            this.updateRight(s1,e1);

            this.bg2.visible  = false;

        } else if (index == l.length - 1) {

            // 最后一个
            precfg = l[index - 1];
            let preVal = parseInt(precfg.f_Stalls);
            s1 = preVal + (parseInt(this.cfg.f_Stalls) - preVal) / 2;
            e1 = parseInt(this.cfg.f_Stalls);
            this.updateLeft(s1, e1);
           
            this.icon.visible = true;
            this.jindu1.visible = this.jindubg1.visible = false;
        } else {
            //中间部分
            this.icon.visible = true;
            this.jindu0.visible = this.jindubg0.visible = true;

            precfg = l[index - 1];
            let preVal = parseInt(precfg.f_Stalls);
            s1 = preVal + (parseInt(this.cfg.f_Stalls) - preVal) / 2;
            e1 = parseInt(this.cfg.f_Stalls);
            this.updateLeft(s1, e1);

            nextcfg = l[index+1];
            s2 = e1;
            e2 = s2 + (parseInt(nextcfg.f_Stalls) - s2)/2;
            this.updateRight(s2,e2);
        }
        let val:number = parseInt(this.cfg.f_Stalls);
        this.tf.text = this.model.strConvert(val);//StringUtil.val2m(val,false) + "";
        //	if(E.Debug) this.tf.text += " " + this.cfg.f_id;
    }

    /**
     * 更新右边 
    */
    private updateRight(start: number, end: number) {
        if (this._curAccHarm < start) {
            this.jindu1.visible = false;
        } else if (this._curAccHarm >= start && this._curAccHarm < end) {
            this.jindu1.visible = true;
            let p = (this._curAccHarm - start) / (end - start);
            this.jindu1.width = this.width / 2 * p;
        } else {
            // this.bg1.visible = true;
            this.enableIcon = true;
            this.bg2.visible = true;
            this.jindu1.visible = true;
            this.jindu1.width = this.width / 2;
        }
    }
    /**左边 */
    private updateLeft(start:number,end:number){
        if (this._curAccHarm < start) {
            this.jindu0.visible = false;
        } else if (this._curAccHarm >= start && this._curAccHarm < end) {
            this.jindu0.visible = true;
            let p = (this._curAccHarm - start) / (end - start);
            this.jindu0.width = this.width / 2 * p;
        } else {
            // this.bg1.visible = true;
            this.enableIcon = true;
            this.jindu0.visible = true;
            this.jindu0.width = this.width / 2;
        }
    }

    /**
     * 鏖战主界面的宝箱调整为，未达到：fj_bx；达到:fj_bx_1；领取后:fj_bx_2
     */
    public set enableIcon(v:boolean){
        this.isCanLingQu = false;
        if(v){
            this.bg1.visible = true;
            if(this.index == 0){

            }else{
                if(this.cfg.f_id <= this.model.data.harmRewardFid){
                    this.icon.skin = `remote/fighthard/fj_bx_2.png`;//已经领取了奖励
                }else{
                    this.icon.skin = `remote/fighthard/fj_bx_1.png`;//可以领取
                    this.isCanLingQu = true;
                }
            }
        }else{
            this.bg1.visible = false;
            this.icon.skin = `remote/fighthard/fj_bx.png`;//未达到伤害要求
        }
    }

}
/**鏖战凶兽 */
export class FightMonsterView extends ViewBase {
    private model:FightMonsterModel;
    private _avatar:AvatarView;
    protected mMask: boolean = true;
    private _ui: ui.views.fighthard.ui_fighthardbiewUI;
    private adFreeCtl:ButtonCtl;
    private fightBtnCtl:ButtonCtl;
    private timeCtl:TimeCtlV2
    public mainDetailList:any[];

    protected onAddLoadRes(): void { 
        this.addAtlas("fighthard.atlas");
        this.addAtlas("zhengzhan.atlas");
    }
    protected onExit(): void { 
        this.model.off(FightMonsterModel.EVENT_UPDATA, this, this.refreshEvt);
        this.disposeAvatar();
    }

    private disposeAvatar(){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = FightMonsterModel.Ins;
            this.UI = this._ui = new ui.views.fighthard.ui_fighthardbiewUI();
            this.timeCtl  = new TimeCtlV2(this._ui.timeTf,"{0}");

            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.tujianBtn, this, this.onhandbookHandler);
            ButtonCtl.CreateBtn(this._ui.help1,this,this.onHelpHandler);
        
            this.fightBtnCtl=ButtonCtl.CreateBtn(this._ui.fightBtn,this,this.onFightHandler);
            this.adFreeCtl=ButtonCtl.CreateBtn(this._ui.freeBtn,this,this.onAdFreeHandler);

            // let _monster:AvatarView = AvatarFactory.createBossMonster();
            // this._ui.avatarCon.addChild(_monster);

            ButtonCtl.CreateBtn(this._ui.rankBtn,this,this.onRankHandler);
            ButtonCtl.CreateBtn(this._ui.rewardBtn,this,this.onRewardDetialHander);

            this._ui.list1.itemRender = FighthardItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        
            this.refreshList();
            if(t_Platform.Ins.isADclose){
                this._ui.tiaozhanCon.x = 189;
                this._ui.freeCon.visible = false;
            }
        }
    }

    private refreshList() {
        this.mainDetailList = [];
        let l = t_TeamFight_Reward.Ins.detailList;
        let _first:IFighthardCfg = {} as IFighthardCfg;
        _first.f_Stalls = "0";
        _first.f_id = 0;
        this.mainDetailList.push(_first);
        for(let i = l.length;i >0;i--){
            let cfg = l[i-1];
            this.mainDetailList.push(cfg);
        }
    }

    private okHandler(){
        let req:TeamFight_req = new TeamFight_req();
        req.type = this.model.isFree() ? 1 : 2;
        SocketMgr.Ins.SendMessageBin(req);
    }
    private onFightHandler(){
        if(!this.model.isFree()){
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.getLang("UseItem",this.model.needGold + "元宝") ,new Laya.Handler(this,this.okHandler));
        }else{
            this.okHandler();
        }
    }
    private onRenderHandler(item:FighthardItemView,index:number){
        item.refresh(index);
    }

    private onRewardDetialHander(){
        E.ViewMgr.Open(EViewType.FighthardDetail);
    }

    /**鏖战排行榜 */
    private onRankHandler(){
        E.ViewMgr.Open(EViewType.FightHardRank);
    }

    private onAdFreeHandler(){
        if(this.model.hasADtime){
            E.sendTrack("ad_watch",{type:"aozhang"});
            E.sdk.lookVideo((type: 0 | 1 | 2) => {
                // console.log('type: ', type);
                switch(type) {
                    case 0:
                        // ⽤户未看完取消
                        break;
                    case 1:
                        // ⽤户看完⼴告
                        E.sendTrack("ad_finish",{type:"aozhang"});
                        let req:AdWatchDone_req = new AdWatchDone_req;
                        req.pos = GuaJiModel.CDEnmu.Boss;
                        SocketMgr.Ins.SendMessageBin(req);
                        // this.Close();
                        break;
                    case 2:
                        // 拉取⼴告错误
                        break;
                }
            });
        }
    }

    private onHelpHandler(){
        E.ViewMgr.openHelpView("xiongshou01","xiongshou02");
    }
    private onTimeEnd(){
        // this._ui.timeTf.text ="";
        this.timeUpdate();
    }
    /**图鉴 */
    private onhandbookHandler() {
        E.ViewMgr.Open(EViewType.FighthardTuJian);
    }
    private onTimeUpdate(){
        let w:number = this._ui.timeTf.textField.width + this._ui.tf1.textField.width;
        this._ui.timeTf.x = (this._ui.width - w)/2;
        this._ui.tf1.x = this._ui.timeTf.x + this._ui.timeTf.textField.width;
    }
    private timeUpdate(){
        // let offsetTime = TimeUtil.toSecond(this.model.cfg.f_TeamFightClose);
        // let sub = TimeUtil.curZeroTime + offsetTime + (7 - TimeUtil.getDay()) * 24 * 3600 - TimeUtil.serverTime;
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
    private get curIndex(){
        let accHarm:number = this.model.data.accHarm;
        let index:number = 0;
        let l = this.mainDetailList;
        for(let i = 0;i < l.length;i++){
            let cfg:IFighthardCfg = l[i];
            if(parseInt(cfg.f_Stalls) <= accHarm){
                index = i;
            }
        }
        return index;
    }
    private refreshEvt(){
        // let data = this.model.data;
        // let cfg = t_TeamFight_BossAttribute.Ins.getByBossId(this.model.data.bossId);

        this.timeUpdate();

        this._ui.tf5.text = E.getLang("fihthard01") + ":" +  StringUtil.val2m(this.model.accHarm);
        this._ui.nametf.text = t_TeamFight_BossAttribute.Ins.getByBossId(this.model.data.bossId).f_BossName;
        // let key = cfg.f_Res;
        this.disposeAvatar();
        this._avatar = this.model.getBossMonster();//AvatarFactory.createBossMonster(`o/spine/${key}/${key}`);

        this._avatar.play(EAvatarAnim.NormalStand);
        this._ui.avatarCon.addChild(this._avatar);
        this._ui.list1.array = this.mainDetailList;
        this._ui.list1.scrollTo(this.curIndex);

        //fightBtn 先用免费 之后元宝
        // public get cfg(){
        //     return t_TeamFight_Config.Ins.cfg;
        // }
        // let cfg = t_TeamFight_Config.Ins.cfg;

        this._ui.goldTf.visible = false;
        this._ui.goldImg.visible = false;
        this.fightBtnCtl.grayMouseDisable = false;
        if (this.model.isFree()) {
            this._ui.tf7.visible = true;

            this._ui.tf7.text = E.getLang("fihthard02") + ":" + this.model.freeCount;
        } else {

            this._ui.tf7.visible = false;

            if (this.model.data.buyNum >= this.model.cfg.f_MaxPurchase) {
                this.fightBtnCtl.grayMouseDisable = true;
            } else {

                this._ui.goldTf.visible = true;
                this._ui.goldImg.visible = true;
                this._ui.goldTf.text = this.model.needGold + "";
            }
        }

        if (this.model.hasADtime) {
            this.adFreeCtl.grayMouseDisable = false;
        } else {
            this.adFreeCtl.grayMouseDisable = true;
        }
        this._ui.freeCountTf.text = E.getLang("fihthard02") + ":" + this.model.adFreeCount;

        
    }

    protected onInit(): void {
        this.refreshList();
        this.model.on(FightMonsterModel.EVENT_UPDATA, this, this.refreshEvt);
        this.refreshEvt();
    }
}