import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EPageType, EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { FightEnd_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceFightModel } from "../../allianceFight/model/AllianceFightModel";
import { EFightCamp } from "../../avatar/AvatarFactory";
import { FightMonsterModel } from "../../fight_monster/vos/FightMonsterModel";
import { KangJiXiongShouModel } from "../../kangjixiongshou/model/KangJiXiongShouModel";
import { EFuncDef } from "../../main/model/EFuncDef";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { EFightType } from "../../main/vos/ECellType";
import { ENewAdventure } from "../../maoxian2/model/ENewAdventure";
import { NewAdventureModel } from "../../maoxian2/NewAdventureModel";
import { EClientType } from "../../sdk/ClientType";
import { XXZDZModel } from "../../xxzdz/model/XXZDZModel";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { FightJjcJieSuanCtl } from "../ctl/FightJjcJieSuanCtl";
import { IFightResult } from "../vos/FightVo";
import { DiscountTicket } from "./DiscountTicket";
import { SucceedPlay } from "./SucceedPlay";

export enum EFightResultView{
    /**竞技场 */
    JJC = 1,
    /**星星争夺战 */
    XXZDZ = 2,
}

export class FightJieSuanView extends ViewBase{
    public _ui:ui.views.maoxian.ui_fight_jiesuanUI;
    public succeed:SucceedPlay;
    protected mMask:boolean = true;
    protected mMaskClick:boolean = true;
    protected auto:boolean  = true;
    public PageType:EPageType = EPageType.None;
    private _fightResult:IFightResult;
    private _jjcCtl:FightJjcJieSuanCtl;
    // private goonCtl:ButtonCtl;
    private discountTicket:DiscountTicket;
    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.maoxian.ui_fight_jiesuanUI();
            this.succeed = new SucceedPlay(this._ui.succeedContainer);
            this._jjcCtl = new FightJjcJieSuanCtl(this);
            this._jjcCtl.succeed = this.succeed;

            this._ui.lab0.on(Laya.Event.CLICK,this,this.onLab0Click);
            this._ui.lab1.on(Laya.Event.CLICK,this,this.onLab1Click);
            this._ui.lab2.on(Laya.Event.CLICK,this,this.onLab2Click);
            // this.goonCtl = ButtonCtl.CreateBtn(this._ui.goonBtn,this,this.onGoOnClick);
            this._ui.goonBtn.on(Laya.Event.CLICK,this,this.onGoOnClick);
            this._ui.backBtn.on(Laya.Event.CLICK,this,this.onBackClick);
            // this._ui.goonTf.text = "";
        }
    }

    /**继续战斗 */
    private onGoOnClick(e:Laya.Event){
        if(e) e.stopPropagation();

        let _fightEnd:FightEnd_req = new FightEnd_req();
        _fightEnd.fight_type = this._fightResult.type;
        SocketMgr.Ins.SendMessageBin(_fightEnd);
        Laya.timer.clear(this,this.onFight);
        Laya.timer.once(100,this,this.onFight);
    }
    /**返回 */
    private onBackClick(e:Laya.Event){
    }

    private onFight(){
        /*
        let id:number = NewAdventureModel.Ins.adventureData.adventureId;
        let req =new NewAdventureFight_req();
        req.type = ENewAdventure.Fight;
        req.adventureId = id;
        SocketMgr.Ins.SendMessageBin(req);
        */
        MainModel.Ins.fightAdventure(NewAdventureModel.Ins.adventureData.adventureId);
        this.Close();
    }

    private onLab0Click(){
        E.ViewMgr.Open(EViewType.FuJiang);
    }

    private onLab1Click(){
        if(ZuoQiModel.Ins.hasHorse){
            ZuoQiModel.Ins.openZuoqiMainView();
        }else{
            E.ViewMgr.Open(EViewType.ZuoqiChouQu);
        }
    }

    private onLab2Click(){
        E.ViewMgr.Open(EViewType.CIFU); 
    }

    private onSkipHandler(){
        this.Close();
        // this.succeed.stop();
        // MainModel.Ins.jiesuanEnd(this.Data);
        this.onMaskClose();
    }
    protected onMaskClose(){
        this.succeed.stop();
        MainModel.Ins.jiesuanEnd(this.Data);
    }

    private hideAll(){
        this._ui.skipTf1.off(Laya.Event.CLICK,this,this.onSkipHandler);
        this._ui.diban.off(Laya.Event.CLICK,this,this.onSkipHandler);
        this._ui.clickTips.visible = false;
        Laya.timer.clear(this,this.onDelayHandler);
        Laya.timer.clear(this,this.updataTime);
        this._ui.succeed.visible = false;
        this._ui.fail.visible = false;
        this._ui.jjcsucceed.visible = false;
    }


    // private createJjcVo(){
    //     let data = new JjcFight_revc();
    //     data.upval = 2;
    //     data.enemyInfo = new stJjcPlayer();
    //     data.win = 1;
    //     data.enemyInfo.id = 1;
    //     data.enemyInfo.headUrl = "";
    //     data.enemyInfo.lv = 2;
    //     data.enemyInfo.plus = 20000;
    //     data.enemyInfo.rank = 99;
    //     data.enemyInfo.name = "name1";
    //     return data;
    // }

    protected onInit() {
        this.hideAll();
        let needTime:number = 0;
        let _data:IFightResult = this.Data;
        this._fightResult = _data;
        this._ui.lock0.visible = false;
        this._ui.lab0.visible = false;
        this._ui.harmtitle.visible = false;
        this._ui.rewadTf.visible = false;
        this._ui.goonTf.text = E.getLang("goonfight");
        // this._jjcCtl.setData(this.createJjcVo());

        if(_data.type == EFightType.Adventure && !NewAdventureModel.Ins.isCompleteAll){
            this._ui.goonBtn.visible = this._ui.backBtn.visible = true;
            this._ui.skipTf1.visible = false;
        }else{
            this._ui.goonBtn.visible = this._ui.backBtn.visible = false;
            this._ui.skipTf1.visible = true;
        }

        switch (_data.type) {
            case EFightType.Adventure:
            case EFightType.BossFight:
            case EFightType.Boss:
            case EFightType.Expedition:
            case EFightType.WuShenDian:
                this.style1();
                break;
            case EFightType.Jjc:
                this._jjcCtl.setData(this._fightResult.extData,EFightResultView.JJC);
                needTime = this._jjcCtl.needTime;
                break;
            case EFightType.XXZDZ:
                this._jjcCtl.setData(this._fightResult.extData,EFightResultView.XXZDZ);
                needTime = this._jjcCtl.needTime;
                break;

            case EFightType.BigBoss:
                ItemViewFactory.renderItemSlots(this._ui.rewardcontainer,"");
                this._ui.harmtitle.visible = true;
                this._ui.succeed.visible = true;
                this._ui.fail.visible = false;
                this._ui.harm.text = FightMonsterModel.Ins.totalHarm + "";
                this.succeed.visible = true;
                this.succeed.start();
                break;
            case EFightType.AllianceWar:
                ItemViewFactory.renderItemSlots(this._ui.rewardcontainer,"");
                this._ui.harmtitle.visible = true;
                this._ui.succeed.visible = true;
                this._ui.fail.visible = false;
                if (AllianceFightModel.Ins.totalHarmPercent === undefined) {
                    this._ui.harm.text = AllianceFightModel.Ins.totalHarm + '';
                } else {
                    this._ui.harm.text = AllianceFightModel.Ins.totalHarm + `(${AllianceFightModel.Ins.totalHarmPercent}%)`;
                }
                this.succeed.visible = true;
                this.succeed.start();
                break;
            case EFightType.kangjixiongshou:
                ItemViewFactory.renderItemSlots(this._ui.rewardcontainer, "");
                this._ui.harmtitle.visible = true;
                this._ui.succeed.visible = true;
                this._ui.fail.visible = false;
                this._ui.harm.text = KangJiXiongShouModel.Ins.totalHarm + "";
                this.succeed.visible = true;
                this.succeed.start();
                break;
        }

        if(_data.fightVo.owner == EFightCamp.Enemy){
            // switch (_data.type) {
            // case EFightType.Adventure:
            // case EFightType.Boss:
            // case EFightType.Jjc:
            // ActivityModel.Ins.showXinRenView();
            // break;
            // }
        }
        if(needTime > 0){
            Laya.timer.once(needTime,this,this.onDelayHandler);
        }else{
            this.onDelayHandler();
        }

        if(XXZDZModel.Ins.isFight){
            this._ui.lab_time.visible = true;
            this._timeNum = 3;
            this.updataTime();
        }else{
            this._ui.lab_time.visible = false;
            Laya.timer.clear(this,this.updataTime);
        }
    }

    private _timeNum:number;
    private updataTime(){
        if(this._timeNum <= 0){
            Laya.timer.clear(this,this.updataTime);
            this.onSkipHandler();
        }else{
            this._ui.lab_time.text = this._timeNum + "秒后关闭界面";
            Laya.timer.once(1000,this,this.updataTime);
            this._timeNum --;
        }
    }

    private tSpr:Laya.Sprite;
    private onDelayHandler(){
        this._ui.skipTf1.on(Laya.Event.CLICK,this,this.onSkipHandler);
        // Laya.timer.callLater(this,this.onDrawLayer);
        this._ui.diban.on(Laya.Event.CLICK,this,this.onSkipHandler);
        this._ui.clickTips.visible = true;
    }

    // private onDrawLayer(){
    //     let local = (this._ui.diban.parent as Laya.Sprite).localToGlobal(new Laya.Point(this._ui.diban.x,this._ui.diban.y));
    //     if(!this.tSpr){
    //         let s = new Laya.Sprite();
    //         s.graphics.drawRect(-local.x,-local.y,Laya.stage.width,Laya.stage.height,"#000000");
    //         s.alpha = 0.1;
    //         this._ui.diban.addChild(s);
    //         this.tSpr = s;
    //     }
    //     // this._ui.hitArea = new Laya.Rectangle(-local.x,-local.y,Laya.stage.width,Laya.stage.height);
    // }

    // private win:number = 0;
    private style1(){
        let _data:IFightResult = this.Data;
        if(_data.fightVo && _data.fightVo.owner == EFightCamp.Self){
            //win 成功
            this._ui.succeed.visible = true;
            this._ui.fail.visible = false;

            this.succeed.visible = true;
            this.succeed.start();

            this._ui.rewadTf.visible = true;
            ItemViewFactory.renderItemSlots(this._ui.rewardcontainer,_data.fightVo.rewardList);

            this.discountTicket = this._ui.addComponent(DiscountTicket);
            this.discountTicket.type = _data.type;
        } else {
            //失败
            this._ui.succeed.visible = false;
            this._ui.fail.visible = true;

            this._ui.lock0.visible = false;
            if(_data.type == EFightType.Expedition){
                this._ui.nameTf.text = E.getLang("zhengzhan05");
                this._ui.img11.skin = `remote/maoxian/fj.png`;
                
                if(TaskModel.Ins.isFuncOpen(EFuncDef.FuJiang)){
                    this._ui.lock0.visible = false;
                    this._ui.lab0.visible = true;
                }else{
                    this._ui.lock0.visible = true;
                    this._ui.lab0.visible = false;
                }
            }else{
                this._ui.nameTf.text = E.getLang("zhengzhan04");
                this._ui.img11.skin = `remote/maoxian/jian.png`;
                this._ui.lab0.visible = false;
            }

            if(TaskModel.Ins.isFuncOpen(EFuncDef.Ride)){
                this._ui.lab1.visible = true;
                this._ui.lock1.visible = false;
            }else{
                this._ui.lab1.visible = false;
                this._ui.lock1.visible = true;
            }

            if(_data.type == EFightType.WuShenDian){
                this._ui.lab2.visible = true;
                this._ui.lock2.visible = false;
                this._ui.img22.skin = `remote/maoxian/wsd_sh.png`;
                this._ui.lab22.text = "尝试选择其他神魂";
            }else{
                if(TaskModel.Ins.isFuncOpen(EFuncDef.CiFu)){
                    this._ui.lab2.visible = true;
                    this._ui.lock2.visible = false;
                }else{
                    this._ui.lab2.visible = false;
                    this._ui.lock2.visible = true;
                }
                this._ui.img22.skin = `remote/maoxian/fuyuan.png`;
                this._ui.lab22.text = "提升福源品质和等级";
            }

            this.succeed.visible = false;
            this.succeed.stop();
        }
        // this.win++;
    }

    protected onExit() {
        if(this.discountTicket){
            this.discountTicket.destroy();
        }
    }

    protected onAddLoadRes() {
        this.addAtlas("maoxian.atlas");
        this.addAtlas("jjc.atlas");
    }
    protected onAddEventListener() {

    }
    protected onEnter() {
    
    }

}