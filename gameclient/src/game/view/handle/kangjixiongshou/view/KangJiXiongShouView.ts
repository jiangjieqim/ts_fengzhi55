import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EMsgBoxType, EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AdWatchDone_req, RecurringBossFight_req } from "../../../../network/protocols/BaseProto";
import { AvatarView } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { t_TeamFight_BossAttribute } from "../../fight_monster/vos/t_TeamFight_Reward";
import { GuaJiModel } from "../../guaji/model/GuaJiModel";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ItemVo } from "../../main/vos/ItemVo";
import { KangJiXiongShouModel } from "../model/KangJiXiongShouModel";
import { RecurringActivityBossProxy } from "../proxy/KangJiXiongShouProxy";

export class KangJiXiongShouView extends ViewBase{
    private _ui:ui.views.kangjixiongshou.ui_kangjixiongshouViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    private timeCtl:TimeCtlV2;

    private adFreeCtl:ButtonCtl;
    private fightBtnCtl:ButtonCtl;

    protected onAddLoadRes() {
        this.addAtlas("fighthard.atlas");
        this.addAtlas("zhengzhan.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.kangjixiongshou.ui_kangjixiongshouViewUI;
            this.bindClose(this._ui.close1);
            this.timeCtl  = new TimeCtlV2(this._ui.timeTf,"{0}");
            this.btnList.push(
                ButtonCtl.Create(this._ui.help1,new Laya.Handler(this,this.onBtnTipClick)),
                ButtonCtl.Create(this._ui.tujianBtn,new Laya.Handler(this,this.onBtnTJClick)),
                ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick))
            );

            this.fightBtnCtl=ButtonCtl.CreateBtn(this._ui.fightBtn,this,this.onFightHandler);
            this.adFreeCtl=ButtonCtl.CreateBtn(this._ui.freeBtn,this,this.onAdFreeHandler);

            if(t_Platform.Ins.isADclose){
                this._ui.tiaozhanCon.x = 189;
                this._ui.freeCon.visible = false;
            }
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("kjxsTitle","kjxsDec");
    }

    private onBtnTJClick(){
        E.ViewMgr.Open(EViewType.FighthardTuJian);
    }

    private onBtnClick(){
        E.ViewMgr.Open(EViewType.KangJiXiongShouView2);
    }

    private okHandler(){
        let req:RecurringBossFight_req = new RecurringBossFight_req();
        req.type = KangJiXiongShouModel.Ins.isFree() ? 1 : 2;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onFightHandler(){
        if(!KangJiXiongShouModel.Ins.isFree()){
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.getLang("UseItem",KangJiXiongShouModel.Ins.needGold + "元宝") ,new Laya.Handler(this,this.okHandler));
        }else{
            this.okHandler();
        }
    }

    private onAdFreeHandler(){
        if(KangJiXiongShouModel.Ins.hasADtime){
            E.sendTrack("ad_watch",{type:"aozhang1"});
            E.sdk.lookVideo((type: 0 | 1 | 2) => {
                // console.log('type: ', type);
                switch(type) {
                    case 0:
                        // ⽤户未看完取消
                        break;
                    case 1:
                        // ⽤户看完⼴告
                        E.sendTrack("ad_finish",{type:"aozhang1"});
                        let req:AdWatchDone_req = new AdWatchDone_req;
                        req.pos = GuaJiModel.CDEnmu.Boss1;
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


    protected onInit(): void {
        KangJiXiongShouModel.Ins.on(KangJiXiongShouModel.UPDATA_VIEW, this, this.refreshEvt);
        this.refreshEvt();
    }

    protected onExit(): void {
        KangJiXiongShouModel.Ins.off(KangJiXiongShouModel.UPDATA_VIEW, this, this.refreshEvt);
        this.disposeAvatar();
    }

    private _avatar:AvatarView;
    private disposeAvatar(){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    private refreshEvt(){
        this.timeUpdate();

        this._ui.nametf.text = t_TeamFight_BossAttribute.Ins.getByBossId(KangJiXiongShouModel.Ins.bossId).f_BossName;
        this.disposeAvatar();
        this._avatar = KangJiXiongShouModel.Ins.getBossMonster();
        this._avatar.play(EAvatarAnim.NormalStand);
        this._ui.avatarCon.addChild(this._avatar);
        this._ui.goldTf.visible = false;
        this._ui.goldImg.visible = false;
        this.fightBtnCtl.grayMouseDisable = false;
        if (KangJiXiongShouModel.Ins.isFree()) {
            this._ui.tf7.visible = true;
            this._ui.tf7.text = E.getLang("fihthard02") + ":" + KangJiXiongShouModel.Ins.freeCount;
        } else {
            this._ui.tf7.visible = false;
            if (KangJiXiongShouModel.Ins.buyNum >= KangJiXiongShouModel.Ins.cfg.f_MaxPurchase) {
                this.fightBtnCtl.grayMouseDisable = true;
            } else {
                this._ui.goldTf.visible = true;
                this._ui.goldImg.visible = true;
                this._ui.goldTf.text = KangJiXiongShouModel.Ins.needGold + "";
            }
        }

        if (KangJiXiongShouModel.Ins.hasADtime) {
            this.adFreeCtl.grayMouseDisable = false;
        } else {
            this.adFreeCtl.grayMouseDisable = true;
        }
        this._ui.freeCountTf.text = E.getLang("fihthard02") + ":" + KangJiXiongShouModel.Ins.adFreeCount;

        let arr = RecurringActivityBossProxy.Ins.List;
        let arr1 = [];
        let arr2 = [];
        for(let i:number = 0;i<arr.length;i++){
            if(arr[i].f_RewardType == 1){
                arr1.push(arr[i].f_Reward);
            }else if(arr[i].f_RewardType == 2){
                arr2.push(arr[i].f_Reward);
            }
        }

        let vo = new ItemVo();
        vo.cfgId = parseInt(arr1[0].split("-")[0]);
        vo.count = parseInt(arr1[0].split("-")[1]);
        ItemViewFactory.refreshSlot(this._ui.slot,vo);

        for(let i:number=0;i<3;i++){
            let vo = new ItemVo();
            vo.cfgId = parseInt(arr2[i].split("-")[0]);
            vo.count = parseInt(arr2[i].split("-")[1]);
            ItemViewFactory.refreshSlot(this._ui["slot"+(i+1)],vo);
        }
    }

    private timeUpdate(){
        let sub = KangJiXiongShouModel.Ins.subTime;
        if(sub <= 0){
            this._ui.tf1.visible = false;
            this._ui.timeTf.visible = false;
        }else{
            this._ui.tf1.visible = true;
            this._ui.timeTf.visible = true;
            
            this.timeCtl.start(sub);
            this.timeCtl.on(Laya.Event.COMPLETE,this,this.onTimeEnd);
        }
    }

    private onTimeEnd(){
        this.timeUpdate();
    }
}