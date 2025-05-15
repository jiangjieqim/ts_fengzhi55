import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GymRoomUpgrade_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { GuaJiModel } from "../../guaji/model/GuaJiModel";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { EGameColor } from "../../main/model/EGameColor";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ChestProgressCtl } from "../../main/views/ChestProgressView";
import { ECellType, EUseItemScene } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { HeroHouseModel } from "../HeroHouseModel";
import { GymEvent } from "../model/GymEvent";
import { GymLevelCtl } from "../model/GymLevelCtl";
import { t_Gym_NPC_Type } from "../model/GymProxy";
/**
 * 神识升级主界面
 */
export class HeroKnowledgeView extends ViewBase {
    protected mMask:boolean = true;
    private _ui:ui.views.hero_house.ui_hero_house_shengshi_viewUI;
    private model:HeroHouseModel;
    private lvCtl:GymLevelCtl;
    private ywtBtnCtl:ButtonCtl;
    private _progressCtl:ChestProgressCtl;
    private _timeCtl:TimeCtlV2;
    private timeCtl1:TimeCtl;
    private fastBtnCtl:ButtonCtl;
    protected onAddLoadRes(): void { }
    protected onExit(): void { 
        this._timeCtl.stop();
        this.timeCtl1.stop();
        this.model.off(GymEvent.KnowledgeLevelUp,this,this.refreshView);
        MainModel.Ins.off(MainEvent.ValChange,this,this.onMoneyUpdate);
        GuaJiModel.Ins.off(GuaJiModel.UPDATA_CD_TIME,this,this.refreshView);
    }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.model = HeroHouseModel.Ins;
            this.lvCtl = this.model.levelCtl;
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_shengshi_viewUI();

            this._timeCtl  = new TimeCtlV2(this._ui.timeTf,"升级时间:{0}");
            this.timeCtl1  = new TimeCtl(this._ui.lab_time);
            this._progressCtl = new ChestProgressCtl(this._ui.progcontainer);
            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.watchBtn,this,this.onWatchHandler);
            ValCtl.Create(this._ui.moneyTf,this._ui.moneyIcon,ECellType.WuXing);
            this.ywtBtnCtl=ButtonCtl.CreateBtn(this._ui.ywtBtn,this,this.onLevelUpHandler);

            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list1.itemRender = ui.views.hero_house.ui_hero_house_shengshi_itemUI;

            ButtonCtl.CreateBtn(this._ui.subBtn,this,this.onSubTime);
            this.fastBtnCtl=ButtonCtl.CreateBtn(this._ui.fastBtn,this,this.onFastHandler);

            if(t_Platform.Ins.isADclose){
                this._ui.subtimeCon.visible = false;
                this.fastBtnCtl.setX(127);
            }else{
                this._ui.subtimeCon.visible = true;
                this.fastBtnCtl.setX(259);
            }
        }
    }

    /**减少时间 */
    private onSubTime(){
        E.ViewMgr.Open(EViewType.SubCDView,null,GuaJiModel.CDEnmu.WuGuanSS);
    }

    /**加速 */
    private onFastHandler(){
        MainModel.Ins.fastUseItem(ECellType.ChestQuick,EUseItemScene.Knowledge,this.lvCtl.time);
    }

    private onItemRender(item: ui.views.hero_house.ui_hero_house_shengshi_itemUI) {
        let cfg: Configs.t_Gym_NPC_Type_dat = item.dataSource;
        item.tf1.text = cfg.f_Typename;
        let count: number = this.model.getByLv(cfg.f_TypeID, this.model.levelCtl.cfgLv);
        item.tf2.text = count + "";

        if (this.lvCtl.isFullLevel) {
            item.tf3.text = "";
            item.bg.visible = false;
        } else {
            let lv = this.model.convertShowLv(this.model.levelCtl.cfgLv);
            item.tf3.text = this.model.getByLv(cfg.f_TypeID, lv) + '';
            // this.model.levelCtl.cfgLv + 1
            item.bg.visible = true;
        }
    }

    private onLevelUpHandler(){
        if(this.lvCtl.isFullLevel){
            E.ViewMgr.ShowMidError(E.getLang("FullLv"));
        }else{
            if(MainModel.Ins.isItemEnoughSt(this.lvCtl.curSlot.cfg.f_PlaidPrice,true)){
                let req:GymRoomUpgrade_req = new GymRoomUpgrade_req();
                SocketMgr.Ins.SendMessageBin(req);
            }
        }
    }

    private onWatchHandler(){
        E.ViewMgr.Open(EViewType.HeroHouseDetail);
    }

    protected onInit(): void {
        this.model.on(GymEvent.KnowledgeLevelUp,this,this.refreshView);
        MainModel.Ins.on(MainEvent.ValChange,this,this.onMoneyUpdate);
        GuaJiModel.Ins.on(GuaJiModel.UPDATA_CD_TIME,this,this.refreshView);
        this.refreshView();
    }

    private clearMoney(){
        this._ui.yuanbaoTf2.text = "";
        this._ui.yuanbao3.skin = "";
    }

    private onTimeEnd(){
        this.lvCtl.reset();
        this.refreshView();
    }
    private tf:Laya.Label;
    private onMoneyUpdate(){
        // console.log(Laya.timer.currTimer+",onMoneyUpdate update view...");
        this.moneyUpdate();
    }

    private moneyUpdate(){
        let cur = this.lvCtl.curSlot;
        if(cur.cfg.f_PlaidPrice!=""){
            let _itemVo: ItemVo = ItemViewFactory.convertItemList(cur.cfg.f_PlaidPrice)[0];
            this._ui.yuanbaoTf2.text = StringUtil.val2m(_itemVo.count);
    
            let have: number = MainModel.Ins.mRoleData.getVal(_itemVo.cfgId);
            if (have < _itemVo.count) {
                this._ui.yuanbaoTf2.color = EGameColor.NotEnough;
            } else {
                this._ui.yuanbaoTf2.color = EGameColor.Normal;
            }
            this._ui.yuanbao3.skin = IconUtils.getIconByCfgId(_itemVo.cfgId);
        }
    }

    private onLayer(){
        // console.log(Laya.timer.currTimer+",update view...");
        if(E.Debug){
            if(!this.tf){
                this.tf = new Laya.Label();
                this._ui.addChild(this.tf);
                this.tf.color = "#ffffff";
                this.tf.fontSize = 24;
            }
            let data = HeroHouseModel.Ins.data;
            this.tf.text = data.level + "," + data.time;
        }

        let labelList = [this._ui.tf1,this._ui.tf2,this._ui.tf3,this._ui.tf4];
        let l = t_Gym_NPC_Type.Ins.List;
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Gym_NPC_Type_dat = l[i];
            if (cfg.f_TypeID) {
                let tf: Laya.Label = labelList[i];
                let count: number = this.model.getUnlockCount(cfg.f_TypeID);
                let have: number = this.model.getHeroCount(cfg.f_TypeID);
                tf.text = `${cfg.f_Typename}: ${have}/${count}`;
            }
        }
        this._ui.lvTf.text = `${this.model.levelCtl.cfgLv+1}级`;

        this._progressCtl.setVal(this.lvCtl.showStep, this.lvCtl.skinSlotMax);

        this.clearMoney();

        if (this.lvCtl.isFullLevel) {
            this._ui.levelFullTf.text = E.getLang("FullLv");
            this.ywtBtnCtl.visible = false;
        } else {
            this._ui.levelFullTf.text = "";
            //money update
            this.moneyUpdate();
            this.ywtBtnCtl.visible = true;
            this._ui.tf12.text = "购买";
        }
        this._ui.stepTf.text = `养成阶段:${this.lvCtl.showStep}`;

        //列表
        this._ui.list1.array = l;

        // LogSys.Log("this.lvCtl.bTimeEnd:"+this.lvCtl.bTimeEnd);

        this._ui.levelUpCon.visible = true;
        this._ui.fastCon.visible = false;
        this._timeCtl.stop();
        if(this.lvCtl.bTimeEnd){
            this._ui.levelUpCon.visible = false;
            this._ui.fastCon.visible = true;
            this._timeCtl.on(Laya.Event.COMPLETE,this,this.onTimeEnd);
            let sub = this.lvCtl.time - TimeUtil.serverTime;
            // console.log("====================>"+sub);
            this._timeCtl.start(sub);
        }
        this.setCDBtn();
    }
    private refreshView(){
        // Laya.timer.once(500,this,this.onLayer);
        this.onLayer();
    }

    private setCDBtn(){
        let time = GuaJiModel.Ins.getstAdCdByType(GuaJiModel.CDEnmu.WuGuanSS).endUnix - TimeUtil.serverTime;
        if(time > 0){//有倒计时
            this._ui.lab_d.visible = false;
            this._ui.lab_time.visible = true;
            this._ui.subBtn.disabled = true;
            this.timeCtl1.start(time,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
        }else{
            this.timeCtl1.stop();
            this.endTime();
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl1.tickVal);
        this.timeCtl1.setText(time_str + "后刷新");
    }

    private endTime(){
        this._ui.lab_d.visible = true;
        this._ui.lab_time.visible = false;
        this._ui.subBtn.disabled = false;
    }
}