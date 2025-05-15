import { TimeCtl } from "../../../../frame/util/ctl/TimeCtl";
import { StringUtil } from "../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { NewPlayerFeastScoreDraw_req } from "../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../network/SocketMgr";
import { FontClipCtl } from "../avatar/ctl/FontClipCtl";
import { EFeastType } from "../gemfeast/EFeastType";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { t_Pack_ControllerProxy } from "../huodong/model/ActivityProxy";
import { ActivityTimeUtils } from "../huodong/model/ActivityTimeUtils";
import { EActivityLingQu } from "../huodong/model/EActivityType";
import { EFuncDef } from "../main/model/EFuncDef";
import { ItemViewFactory } from "../main/model/ItemViewFactory";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { NewPlayerBaseFeastModel, NewPlayerFeastModel, t_Alternation_Rookie } from "./NewPlayerFeastModel";
/**新人盛宴主item视图 */
class NewplayerFeastItem extends ui.views.huodong.ui_newplayer_feast_itemUI{
    private timeCtl:TimeCtl;

    private uid:number;
    private _actModel:ActivityModel;
    private model:NewPlayerFeastModel;
    private numCtl:FontClipCtl;
    private _testTf:Laya.Label;
    constructor(){
        super();
        this.numCtl = new FontClipCtl(`remote/newplayerfeast/n`);
        this._actModel = ActivityModel.Ins;
        this.model = NewPlayerFeastModel.Ins;
        this.timeCtl = new TimeCtl(this.timeTF);
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }
    private onClickHandler(){
        if(this.model.isOpenByUID(this.uid)){
            let cfg = t_Pack_ControllerProxy.Ins.getByUID(this.uid);
            let subType:EFeastType = parseInt(cfg.f_p2);
            switch(subType){
                case EFeastType.Ride:
                    if(TaskModel.Ins.isFuncOpen(EFuncDef.Ride,true)){
                        E.ViewMgr.Open(EViewType.NewPlayerRideFeast);
                    }
                    break;
                case EFeastType.Gem:
                    if(TaskModel.Ins.isFuncOpen(EFuncDef.Gem,true)){
                        E.ViewMgr.Open(EViewType.NewPlayerGemFeast);
                    }
                    break;
                case EFeastType.FuJiang:
                    if(TaskModel.Ins.isFuncOpen(EFuncDef.FuJiang,true)){
                        E.ViewMgr.Open(EViewType.NewPlayerFujiangFeast);
                    }
                    break;
                case EFeastType.Pet:
                    if(TaskModel.Ins.isFuncOpen(EFuncDef.LingChong,true)){
                        E.ViewMgr.Open(EViewType.NewPlayerPetFeast);
                    }
                    break;
            }
        }
    }

    refresh(){
        let uid:number = this.dataSource;
        this.uid = uid;
        let vo = this._actModel.getByUid(uid);
        let cfg = t_Pack_ControllerProxy.Ins.getByUID(this.uid);
        this.bg1.skin = `remote/newplayerfeast/a${cfg.f_p2}.png`;

        let packCfg = t_Pack_ControllerProxy.Ins.getByUID(this.uid);
        let time = ActivityTimeUtils.getTime(packCfg);
        // let day = (time.start -  TimeUtil.openTime.toNumber()/1000)/3600/24;
        // console.log("=========>",day);
        // day = Math.ceil(day);
        // if(!day){
        // day = 1;
        // }

        this.timeCtl.stop();
        let day = packCfg.f_time_start.split("|")[1];
        this.numCtl.setValue(this.numCon,day,"middle");

        //新人盛典红点
        this.redImg.visible = false;
        //宠物，宝石，坐骑

        if(this.model.isOpenByUID(this.uid)){
            this.bg1.gray = this.timeTF.gray = this.redImg.gray = false;
            this.timeCtl.start(vo.endTime - TimeUtil.serverTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.onEnd));
            this.redImg.visible = this.model.hasRedByUID(this.uid);
        }else{
            this.bg1.gray = this.timeTF.gray = this.redImg.gray = true;
            let serverTime = TimeUtil.serverTime;
            if(serverTime >= time.end){
                this.timeTF.text = E.getLang("xrsy03");//已结束
            }else{
                this.timeTF.text = E.getLang("notopen");//未开启
            }
        }


        if (E.Debug) {
            if (!this._testTf) {
                this._testTf = new Laya.Label();
                this.addChild(this._testTf);
                this._testTf.fontSize = 30;
                this._testTf.color = "#ff0000";
            }
            this._testTf.text = this.uid.toString();
        }
    }
    private onUpdateTime(ticket: number) {
        let _s:string = TimeUtil.subTime(ticket);
        this.timeTF.text = _s + E.getLang("xrsy04");
    }
    private onEnd(){
        this.timeTF.text = "";
    }
}

/**新人庆典主视图 */
export class NewplayerfeastView extends ViewBase {
    private _ui:ui.views.huodong.ui_newplayerfeastUI;
    private model:NewPlayerFeastModel;
    protected onAddLoadRes(): void { 
        this.addAtlas("newplayerfeast.atlas");
    }
    protected onExit(): void {
        ActivityModel.Ins.off(ActivityEvent.OpenCloseStatusUpdate, this, this.refreshEvt);
        MainModel.Ins.off(MainEvent.NewPlayerFeastRed_Update,this,this.refreshEvt);
    }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.model = NewPlayerFeastModel.Ins;
            this.UI = this._ui = new ui.views.huodong.ui_newplayerfeastUI();
            this.mMask = true;
            ButtonCtl.CreateBtn(this._ui.help,this,this.onHelp);
            this._ui.list1.itemRender = NewplayerFeastItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this.bindClose(this._ui.close1);
        }
    }
    private onRenderHandler(item:NewplayerFeastItem){
        item.refresh();
    }
    private onHelp(){
        E.ViewMgr.openHelpView("xrsy01","xrsy02");
    }

    protected onInit(): void {
        MainModel.Ins.on(MainEvent.NewPlayerFeastRed_Update,this,this.refreshEvt);
        ActivityModel.Ins.on(ActivityEvent.OpenCloseStatusUpdate,this,this.refreshEvt);
        this.refreshEvt();
    }

    private refreshEvt(){
        this._ui.list1.array = this.model.getShowSerialNums();
        this._ui.list1.scrollTo(0);
    }
}
/**活动奖励礼包 item */
class NewplayerfeastPackageItem extends ui.views.huodong.ui_newplayerfeast_package_itemUI{
    private cfg: Configs.t_Alternation_Rookie_dat;
    private model: NewPlayerBaseFeastModel;
    private btnCtl: ButtonCtl;
    constructor() {
        super();
        this.chongzhiBtn.visible = false;
        this.tf03.text = E.getLang("LingQu");
        this.btnCtl = ButtonCtl.CreateBtn(this.lingquBtn, this, this.onLingQu);
    }

    private onLingQu() {
        let req = new NewPlayerFeastScoreDraw_req();
        req.type = this.model.subType;
        req.id = this.cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public refresh(model: NewPlayerBaseFeastModel) {
        this.model = model;
        this.cfg = this.dataSource;
        this.redimg.visible = false;
        this.tf01.text = StringUtil.format(this.cfg.f_ConditionTxt,this.cfg.f_Condition);
        ItemViewFactory.renderItemSlots(this.rewardCon,this.cfg.f_Reward,10,1,"left");
        let score:number = this.model.getScroe();
        this.tf02.text = score + "/" + this.cfg.f_Condition;
        let _status:EActivityLingQu = this.model.getSubPackageStatus(this.cfg.f_id);
        //不可领取 灰色领取 已经领取 灰色已经领取
        // this.model.get
        // console.log(_status);
    
        switch(_status){
            case EActivityLingQu.Nothing:
                this.tf03.text = E.getLang("LingQu");
                this.btnCtl.grayMouseDisable = true;
                break;
            case EActivityLingQu.KeLingQu:
                this.tf03.text = E.getLang("LingQu");
                this.btnCtl.grayMouseDisable = false;
                this.redimg.visible = true;
                break;
            case EActivityLingQu.YiLingQu:
                this.tf03.text = E.getLang("LingQu2");
                this.btnCtl.grayMouseDisable = true;
                break;
        }
    }
}
/**活动奖励礼包 */
export class NewplayerfeastPackage extends ViewBase {
    private model:NewPlayerBaseFeastModel;
    private _ui: ui.views.huodong.ui_newplayerfeast_packageUI;
    protected onAddLoadRes(): void {
        this.addAtlas("huodong.atlas");
        this.addAtlas("duanwu.atlas");
    }
    protected onExit(): void { 
        NewPlayerFeastModel.Ins.off(NewPlayerFeastModel.EVENT_FEAST_REWARD,this,this.onUpdateReward);
    }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_newplayerfeast_packageUI();
            this.mMask = true;
            this._ui.tf2.visible = this._ui.tf3.visible = false;
            this.bindClose(this._ui.close1);
            this._ui.list1.itemRender = NewplayerfeastPackageItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }
    private onRenderHandler(item:NewplayerfeastPackageItem){
        item.refresh(this.model);
    }
    protected onInit(): void {
        this.model = this.Data;
        NewPlayerFeastModel.Ins.on(NewPlayerFeastModel.EVENT_FEAST_REWARD,this,this.onUpdateReward);
        let uid:number = this.model.activityVo.uid;
        let subType:number = parseInt(t_Pack_ControllerProxy.Ins.getByUID(uid).f_p2);
        let cfglist = t_Alternation_Rookie.Ins.getListBySubType(subType);
        this._ui.list1.array = cfglist;
        this._ui.list1.scrollTo(0);
    }

    private onUpdateReward(){
        this._ui.list1.refresh();
    }
}