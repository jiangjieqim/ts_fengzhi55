import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GetRide_req, stActivityRecord } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { DotManager } from "../../common/DotManager";
import { EFeastType } from "../../gemfeast/EFeastType";
import { FeastLogMessage, GemBaseModel } from "../../gemfeast/GemBaseModel";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemUpdateCtl } from "../../main/ctl/ItemUpdateCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ECellType } from "../../main/vos/ECellType";
import { NewPlayerFeastModel } from "../../newplayerfeast/NewPlayerFeastModel";
import { EZuoQi, ZuoqiChouQuResult } from "../../zuoqi/vos/EZuoQi";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { DuanWuEvent } from "../DuanWuEvent";
import { DuanWuModel } from "../DuanWuModel";
import { t_Alternation_Rank, t_Alternation_Rookie_Rank } from "../DuanWuProxy";
import { DuanWuLeichongSlotItemView, DuanwuSlotVo } from "./DuanWuLeichongItemView";

class MsgLogItemView extends ui.views.duanwu.ui_duanwu_log_itemviewUI{

    refresh(type:EFeastType){

        let _data:stActivityRecord = this.dataSource;
        /*
        if(type == EFeastType.Ride){
            this.tf0.text = _data.nickName + E.getLang("duanwu01");
            let _mountCfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(_data.id);
            this.tf1.color = QualityUtils.getQuaColor(_mountCfg.f_Quality);
            this.tf1.text = _mountCfg.f_MountName;
        }else if(type == EFeastType.Gem){
            let cfg:Configs.t_Gem_List_dat = BaoShiCfgProxy.Ins.getCfgById(_data.id);
            this.tf0.text = _data.nickName + E.getLang("get");
            let color = QualityUtils.getQuaColor(t_Alternation_GemScore.Ins.getByLevel(_data.level).f_GemColor);
            this.tf1.color = color;
            this.tf1.text =  "Lv."+_data.level + cfg.f_GemAttr + "宝石";
        }else if(type == EFeastType.FuJiang){
            this.tf0.text = _data.nickName + E.getLang("fj01");
            let _heroCfg = FuJiangListProxy.Ins.getCfgById(_data.id);
            this.tf1.color = "#" + EquipmentQualityProxy.Ins.getByQua(_heroCfg.f_cheifQuality).f_chiefcolor;
            this.tf1.text = _heroCfg.f_cheif;
        }
        else if(type == EFeastType.Pet){
            let petCfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(_data.id);
            this.tf0.text = petCfg.f_petname + E.getLang("pet06");
            this.tf1.color = "#" + EquipmentQualityProxy.Ins.getByQua(petCfg.f_petquality).f_Color;
            this.tf1.text = petCfg.f_petname;
        }
        */
        let msg:FeastLogMessage =  GemBaseModel.ConvertMsg(type, _data);
        this.tf0.text = msg.desc;
        this.tf1.color = msg.color;
        this.tf1.text  = msg.name;
        this.tf1.x = this.tf0.x + this.tf0.textField.width;

        // if(E.Debug){
        // this.tf1.text+="--->id:"+_data.recordSerial.toString();
        // }
    }
}
/**端午节主界面 */
export class DuanWuView extends ViewBase {
    private rideList:AvatarMonsterView[]=[];
    protected model:GemBaseModel;
    protected _ui: ui.views.duanwu.ui_duanwu_mainUI|ui.views.gemfeast.ui_gemfeast_mainUI|ui.views.gemfeast.ui_gemfeast_main2UI|ui.views.fujiangfeast.ui_fujiangfeast_mainUI|ui.views.lingchongfeast.ui_lingchong_feastUI|ui.views.shenbingfeast.ui_shenbing_feastUI;
    protected mMask:boolean = true;
    protected autoFree = true;
    protected onAddLoadRes(): void { 
        this.addAtlas("duanwu.atlas");
    }
    protected onExit(): void { 
        this.clearRide();
        this.model.off(DuanWuEvent.MSGUpdate,this,this.onMsgEvt);
        this.model.off(DuanWuEvent.MoneyUpdate,this,this.redUpdateView);
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.updateActivityEvt);
        NewPlayerFeastModel.Ins.off(NewPlayerFeastModel.UPDATA_TASK,this,this.updataTaskRedTip);
        Laya.timer.clear(this,this.timeLoop);
    }
    private updateActivityEvt(){
        this.redUpdateView();
    }
    protected bindModel(){
        this.model = DuanWuModel.Ins;
    }
    protected initUI(){
        this.UI = this._ui = new ui.views.duanwu.ui_duanwu_mainUI();
        this._ui.zhekouImg.mouseEnabled = false;
        this.btnList.push(
            ButtonCtl.CreateBtn(this._ui.xunzaoBtn,this,this.onXunZhao),
            ButtonCtl.CreateBtn(this._ui.threeBtn,this,this.onGoldReq)
        );

        this._ui.desctf.text = E.getLang("duanwu07");
        ItemUpdateCtl.Create(this._ui.juanzhoutf,ECellType.HorseItemId);
        ItemUpdateCtl.Create(this._ui.goldtf,ECellType.GOLD);
    }

    private _btn1:ButtonCtl;
    private _btn2:ButtonCtl;
    private _btn3:ButtonCtl;
    protected onFirstInit(): void {
        if (!this.UI) {
            this.bindModel();

            this.initUI();
            this.bindClose(this._ui.close1);

            this.btnList.push(
                this._btn1 = ButtonCtl.CreateBtn(this._ui.btn1,this,this.onPackage),
                this._btn2 = ButtonCtl.CreateBtn(this._ui.btn2,this,this.onRankHandler),
                this._btn3 = ButtonCtl.CreateBtn(this._ui.btn3,this,this.onLeiChong),
                ButtonCtl.CreateBtn(this._ui.choujiangBtn,this,this.onRewardListHandler),
                ButtonCtl.CreateBtn(this._ui.help,this,this.onBtnTipClick)
            );
            if(this._ui["btn4"]){
                this.btnList.push(
                    ButtonCtl.CreateBtn(this._ui["btn4"],this,this.onRankHandler1),
                );
            }

            //*****************************************************
            this.showRewardView();

            this._ui.msgList.itemRender = MsgLogItemView;
            this._ui.msgList.renderHandler = new Laya.Handler(this,this.onMsgList);
        }
    }


    /**元宝抽取 */
    private onGoldReq(){
        if(!this.model.isOpen){
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
            return;
        }

        let req = new GetRide_req();
        req.itemId = ECellType.GOLD;
        req.type = EZuoQi.Three;
        SocketMgr.Ins.SendMessageBin(req);
    }
    /**物品抽取 */
    private onXunZhao(){
        let req = new GetRide_req();
        req.itemId = ECellType.HorseItemId;
        req.type = EZuoQi.Three;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onMsgList(item:MsgLogItemView){
        item.refresh(this.model.subType);
    }

    protected onBtnTipClick(){
        if(this.model.packId == EActivityType.DuanWu){
            E.ViewMgr.openHelpView("duanwutitle","duanwudesc");
        }else{
            E.ViewMgr.openHelpView("duanwutitle1","duanwudesc1");
        }
    }

    private onMsgEvt(){
        this._ui.msgList.dataSource = this.model.serDataList;
        this._ui.msgList.refresh();
        this.gotoEndIndex();
    }

    private gotoEndIndex(){
        let index = 0;
        if(this.model.serDataList.length > 0){
            index = this.model.serDataList.length-1;
        }
        this._ui.msgList.scrollTo(index);
    }
    /**显示中间奖励 */
    protected showRewardView(){
        if(this.model.packId == EActivityType.DuanWu){
            let cfg:Configs.t_Alternation_Rank_dat = t_Alternation_Rank.Ins.getFreeByType(this.model.subType);//List[0];
            let dataList = this.model.convertData(cfg);
            ItemViewFactory.renderItemSlots(this._ui.rewardCon,dataList,10,1,"center",DuanWuLeichongSlotItemView,"DuanWuLeichongSlotItemView");
        }else{
            let cfg:Configs.t_Alternation_Rookie_Rank_dat = t_Alternation_Rookie_Rank.Ins.getFreeByType(this.model.subType);//List[0];
            let itemList = ItemViewFactory.convertItemList(cfg.f_Rewarditem);
            let dataList = [];
            for (let i = 0; i < itemList.length; i++) {
                let vo = new DuanwuSlotVo();
                vo.itemVo = itemList[i];
                dataList.push(vo);
            }
            ItemViewFactory.renderItemSlots(this._ui.rewardCon,dataList,10,1,"center",DuanWuLeichongSlotItemView,"DuanWuLeichongSlotItemView");
        }
    }

    private redUpdateView(){
        this._ui.red0.visible = this.model.isFreeCanLingQu;

        DotManager.removeDot(this._ui.btn2);
        if(this.model.packId == EActivityType.DuanWu){
            this._ui.red1.visible = this.model.leijiCanLingQu;
        }else if(this.model.packId == EActivityType.NewPlayerFeast){
            
            let packId;

            if(this.model.subType == EFeastType.Ride){
                packId = EActivityType.ZuoqiChengZhang;
            }else if(this.model.subType == EFeastType.Gem){
                packId = EActivityType.BaoshiChengZhang;
            }else if(this.model.subType == EFeastType.Pet){
                packId = EActivityType.LingchongChengZhang;
            }
            const item = ActivityModel.Ins.getVo(packId);
            if(item){
                if (ActivityModel.Ins.hasBoxBorn(packId, item)) {
                    this._ui.red1.visible = true;
                } else {
                    this._ui.red1.visible = false;
                }
            }else{
                this._ui.red1.visible = false;
            }
            
            this.updataTaskRedTip();
        }
    }

    private updataTaskRedTip(){
        if(NewPlayerFeastModel.Ins.isTaskRedTipBySubType(this.model.subType)){
            DotManager.addDot(this._ui.btn2,5);
        }else{
            DotManager.removeDot(this._ui.btn2);
        }
    }

    /**抽奖记录 */
    private onRewardListHandler(){
        E.ViewMgr.Open(EViewType.DuanWuLog,null,this.model);
    }
    /**累充 */
    protected onLeiChong() {
        switch (this.model.packId) {
            case EActivityType.DuanWu:
                E.ViewMgr.Open(EViewType.DuanWuLeiChong, null, this.model);
                break;
            case EActivityType.NewPlayerFeast:
                if(this.model.subType == EFeastType.Ride){
                    E.ViewMgr.Open(EViewType.ZuoqiChengZhangView,null,"notopen");
                }else if(this.model.subType == EFeastType.Gem){
                    E.ViewMgr.Open(EViewType.BaoshiChengZhangView,null,"notopen");
                }else if(this.model.subType == EFeastType.Pet){
                    E.ViewMgr.Open(EViewType.LingchongChengZhangView,null,"notopen");
                }
                // E.ViewMgr.Open(EViewType.JiShaoChengDuo,null,1);
                break;
        }
    }
    /**坐骑冲榜 */
    protected onRankHandler() {
        switch (this.model.packId) {
            case EActivityType.DuanWu:
                E.ViewMgr.Open(EViewType.DuanWuRank, null, this.model);
                break;
            case EActivityType.NewPlayerFeast:
                if(this.model.activityVo){
                    E.ViewMgr.Open(EViewType.NewPlayerTaskView,null,this.model);
                }
                break;

        }
    }
    protected onRankHandler1() {
        E.ViewMgr.Open(EViewType.DuanWuRank, null, this.model);
    }
    /**坐骑礼包 或 宝石礼包 */
    private onPackage(){
        E.ViewMgr.Open(EViewType.DuanWuPackage,null,this.model);
    }
    private clearRide(){
        for(let i = 0;i < this.rideList.length;i++){
            this.rideList[i].stop();
        }
    }

    private timeLoop(){
        // let req = new MountFeastRecords_req();
        // req.recordSerial = this.model.maxRecordSerial;
        // SocketMgr.Ins.SendMessageBin(req);
        this.model.requstMsg();
        Laya.timer.once(2000,this,this.timeLoop);
    }

    protected onInit(): void {
        this._ui.titleimg.skin = this.model.titleSkin;
        this._ui.tf1.text = E.getLang(this.model.titleStr);
        this._ui.tf2.text = E.getLang(this.model.rankTitleStr); 
        this._ui.tf3.text = E.getLang(this.model.leichongTitle);
        if(debug){
            DebugUtil.drawTF(this._ui,"ui:"+this.ViewType+" uid:"+this.model.activityVo.uid+"","#ffff00");
        }
        switch (this.model.packId) {
            case EActivityType.DuanWu:
                if(this._ui['btn4']){
                    this._ui['btn4'].visible = false;
                }
                this._ui.lab_qf.text = "(当前区服：" + DuanWuModel.Ins.serverIdBegin + "-" + DuanWuModel.Ins.serverIdEnd + "服)";
                this._ui.bg1.visible = false;
                this._ui.tf5.x = 108;
                this._ui.btn1.width = this._ui.btn2.width = this._ui.btn3.width = 190;
                this._btn1.setpos(79,1047);
                this._btn2.setpos(284,1047);
                this._btn3.setpos(489,1047);
                break;
            case EActivityType.NewPlayerFeast:
                if(this._ui['tf_4']){
                    this._ui['tf_4'].text = E.getLang(this.model.rankTitleStr1);
                }
                this._ui.lab_qf.text = "";
                this._ui.bg1.visible = true;
                this._ui.bg1.x = 303;
                this._ui.tf5.x = 315;
                break;

        }

        this.model.on(DuanWuEvent.MoneyUpdate,this,this.redUpdateView);
        this.model.on(DuanWuEvent.MSGUpdate,this,this.onMsgEvt);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.updateActivityEvt);
        NewPlayerFeastModel.Ins.on(NewPlayerFeastModel.UPDATA_TASK,this,this.updataTaskRedTip);
        this.initRide();
        let vo = this.model.activityVo;
        if(vo){
            this._ui.titleTf.text = E.getLang("houdongtime") + ":" + TimeUtil.getMonthDay(vo.startTime) + "-" + TimeUtil.getMonthDay(vo.endTime);
            this.onMsgEvt();
            this.timeLoop();
            this.redUpdateView();
        }else{
            this._ui.msgList.dataSource = [];
        }

        //*************************************
        this.updateMoney();
    }

    private initRide(){
        if(this.model.subType==EFeastType.Ride){
            let arr =  System_RefreshTimeProxy.Ins.getVal(29).split("|");
            for(let i = 0;i < arr.length;i++){
                let mountId:number = parseInt(arr[i]);
                let con:Laya.Sprite = this._ui["h"+i];
                if(con.numChildren){
                    let avatar = con.getChildAt(0) as  AvatarMonsterView;
                    avatar.play(EAvatarAnim.None);
                }else{
                    let avatar = AvatarFactory.createRide(mountId);
                    avatar.scaleX = avatar.scaleY = 1.4;
                    con.addChild(avatar);
                    this.rideList.push(avatar);
                }
            }
        }
    }

    protected updateMoney() {
        if (this._ui instanceof ui.views.duanwu.ui_duanwu_mainUI) {
            let _result: ZuoqiChouQuResult = ZuoQiModel.Ins.getSubTime();
            if (this.model.packId == EActivityType.DuanWu) {
                this._ui.zhekouImg.visible = true;
                //现价
                this._ui.threeTf.text = _result.nowThreeCount + "";
                //原价
                this._ui.oldGoldTf.text = E.getLang("oldprice") + `${_result.threeOldCount}`;
                //折扣
                this._ui.zhekouTf.text = E.getLang("limitdiscount", _result.discount);
            } else {
                this._ui.zhekouImg.visible = false;
                this._ui.threeTf.text = _result.threeOldCount + "";
            }

        }
    }
}