import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { PlatformConfig } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GymInviteGetList_req, stEquipAttr, stGymMission } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import {DotManager} from "../../common/DotManager";
import { TriangleHideCtl } from "../../main/ctl/TriangleHideCtl";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { EPlatformPopType } from "../../main/proxy/t_Platform";
import { ECellType } from "../../main/vos/ECellType";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { XianShiLiBaoModel, XianShiLiBaoType } from "../../xianshilibao/model/XianShiLiBaoModel";
import { EInviteType, HeroHouseModel } from "../HeroHouseModel";
import { EFacilityType, EGymTaskType } from "../model/EGymType";
import { GymEvent } from "../model/GymEvent";
import { GymInviteVo } from "../model/GymInviteVo";
import { t_Gym_Config, t_Gym_Mission_List } from "../model/GymProxy";
import { EGymGetStatus } from "../model/HeroHousePackVo";
import { HeroAnimStage } from "./herostage/HeroAnimStage";
import { HeroSmallBtnCtl } from "./herostage/HeroSmallBtnCtl";
interface IAttrItemSkin{
    valTf:Laya.Label;
	tf1:Laya.Label;
    dataSource:any;
}

/**三国武馆的主界面 */
export class HeroHouseMainView extends ViewBase {
    protected mMask = true;
    protected mMaskClick:boolean = false;//是否激活mask点击关闭

    _ui: ui.views.hero_house.ui_hero_house_main_viewUI;
    protected autoFree:boolean = true;
    // protected mMask:boolean = true;
    private model:HeroHouseModel;
    private midCtl:TriangleHideCtl;
    private rightCtl:TriangleHideCtl;
    // private heroStage:HeroAnimStage;
    private teaEff:SimpleEffect;
    private lightEff:SimpleEffect;
    private guEff:SimpleEffect;
    private packageBtnCtl:ButtonCtl;
    protected onAddLoadRes(): void {
        this.addAtlas("hero_house.atlas");
        this.addAtlas("huanzhuang.atlas");
    }
    private setbtnCtl:ButtonCtl;

    private onSetingClick(){
        this.model.autoCtl.onClickHandler();
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = HeroHouseModel.Ins;
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_main_viewUI();
            this.bindClose(this._ui.close1);
            // this.model.autoCtl.bind(this._ui.setbtn,this._ui.chilun);
            this.model.inviationCtl.bind(this._ui.timeTf);

            this.setbtnCtl = ButtonCtl.CreateBtn(this._ui.setbtn, this, this.onSetingClick);
            
            this._ui.bg112.on(Laya.Event.CLICK,this,this.onOpenTask);

            this.btnList.push(
                ButtonCtl.CreateBtn(this._ui.houseBtn,this,this.onHouseClick),
                ButtonCtl.CreateBtn(this._ui.heroBtn,this,this.onHouseSelClick),
                ButtonCtl.CreateBtn(this._ui.lvBtn,this,this.onHouseLvClick),
                ButtonCtl.CreateBtn(this._ui.shopBtn,this,this.onShopHandler),
                // ButtonCtl.CreateBtn(this._ui.bg112,this,this.onOpenTask,false);

                ButtonCtl.CreateBtn(this._ui.ywBtn,this,this.onInviteHandler),
                ButtonCtl.CreateBtn(this._ui.yaoqing5,this,this.onFiveInvite),

                ButtonCtl.CreateBtn(this._ui.qipao,this,this.onQiPaoHandler),
                ButtonCtl.CreateBtn(this._ui.shihaiBtn,this,this.onShengShiHandler),
                ButtonCtl.CreateBtn(this._ui.help1,this,this.openChangguanHelp),
                ButtonCtl.CreateBtn(this._ui.heroHelp,this,this.openWuhunHelp),
                this.setbtnCtl
            );
            //======================================================================
            ValCtl.Create(this._ui.shtf1,this._ui.shouhun1,ECellType.TokenMoney);
            ValCtl.Create(this._ui.shtf2,this._ui.shouhun2,ECellType.WuXing);

            this._ui.tasklist.itemRender = ui.views.hero_house.ui_hero_house_attrUI;
            this._ui.tasklist.renderHandler = new Laya.Handler(this,this.onAttrRenderHandler);
            this._ui.tasklist.mouseEnabled = false;

            this._ui.midList.itemRender = ui.views.hero_house.ui_hero_house_attr1UI;
            this._ui.midList.renderHandler = new Laya.Handler(this,this.onAttrHandler);

            this._ui.rightList1.itemRender =  ui.views.hero_house.ui_hero_house_attr1UI;
            this._ui.rightList1.renderHandler = new Laya.Handler(this,this.onAttrHandler);

            let midCtl = new TriangleHideCtl();
            midCtl.bind(this._ui.midList,this._ui.midIcon);
            this.midCtl = midCtl;

            let rightCtl = new TriangleHideCtl();
            rightCtl.bind(this._ui.rightList1,this._ui.downIcon);
            this.rightCtl = rightCtl;

            let gu:ButtonCtl = ButtonCtl.CreateBtn(this._ui.gu,this,this.onBigHandler);
            gu.data = EFacilityType.Drum;
            
            let tea:ButtonCtl = ButtonCtl.CreateBtn(this._ui.teaBtn,this,this.onBigHandler);
            tea.data = EFacilityType.Tea;
            
            let twBtn:ButtonCtl = ButtonCtl.CreateBtn(this._ui.twBtn,this,this.onBigHandler);
            twBtn.data = EFacilityType.Fight;
            
            let lightBtn:ButtonCtl = ButtonCtl.CreateBtn(this._ui.lightBtn,this,this.onBigHandler);
            lightBtn.data = EFacilityType.Light;
            
            let fightGuBtn:ButtonCtl = ButtonCtl.CreateBtn(this._ui.fightGuBtn,this,this.onBigHandler,false);
            // this._ui.fightGuBtn.skin = "";
            E.gameAdapter.updatedummuSkin(this._ui.fightGuBtn,"");
            fightGuBtn.data = EFacilityType.Dummy;

            this._ui.ywStageCon.alpha = 1.0;

            // new HeroHouseStageCtl(this._ui.ywStageCon);
     
            this.packageBtnCtl=ButtonCtl.CreateBtn(this._ui.packageBtn,this,this.onPackHandler);
            // this.heroStage = new HeroAnimStage(this._ui.aniCon);
            // this.heroStage.smallPeople = this._ui.fightGuBtn;
                
            // this._ui.aniCon.y = this._ui.fightGuBtn.y + 112;
            E.gameAdapter.setHeroAnimPosY(this._ui.aniCon,this._ui.fightGuBtn.y + 112);
            if(initConfig.platform == PlatformConfig.War3){
                
            }else{
                this.initEffect();
            }

            this.btnList.push(
                gu,tea,twBtn,lightBtn,fightGuBtn,this.packageBtnCtl
            );
        }
    }
    private onAutoHandler() {
        this._ui.chilun.rotation += 1;
    }
    private set gear(v: boolean) {
        if (v) {
            Laya.timer.frameLoop(1, this, this.onAutoHandler);
        } else {
            Laya.timer.clear(this, this.onAutoHandler);
        }
        // this.status = v;
    }
    private updateSetBtnEvt(){
        if(MainModel.Ins.heroPackVo.canProxy){
            this.setbtnCtl.visible = true;
        }else{
            this.setbtnCtl.visible = false;
        }
    }
    private initEffect(){
        this.teaEff = new SimpleEffect(this._ui.teaEff,"o/spine/gym/gym");
        this.teaEff.autoPlay = true;
        
        this.lightEff = new SimpleEffect(this._ui.lightEff,"o/spine/gym/gym");
        this.lightEff.autoPlay = true;

        this.guEff = new SimpleEffect(this._ui.guEff,"o/spine/gym/gym");
        this.guEff.autoPlay = true;
    }

    public set drumVisible(v:boolean){
        if(this.guEff){
            if(v){
                this.guEff.play(0,true);
            }else{
                this.guEff.stop();
            }
            this._ui.guEff.visible = v;
        }
    }

    private playEffect(){
        // 0_敲鼓特效 演武时循环播放
        // 1_茶特效 循环播放
        // 3_灯特效 循环播放
        if(this.teaEff){
            this.teaEff.play(1,true);
        }
        if(this.lightEff){
            this.lightEff.play(2,true);
        }
    }

    private onLoopCheck(){
        let vo:GymInviteVo = HeroHouseModel.Ins.animInviteVo;
        if(vo){
            this._ui.qipao.visible = false;
        }else{
            this._ui.qipao.visible = true;
        }
        // HeroHouseModel.Ins.openPop();
    }

    /**武馆礼包 */
    private onPackHandler(){
        E.ViewMgr.Open(EViewType.HeroHousePackage);
    }

    private openChangguanHelp(){
        E.ViewMgr.openHelpView("changguantitle","changguandesc");
    }

    private openWuhunHelp(){
        E.ViewMgr.openHelpView("wuhuntitle","wuhundesc");
    }

    private onBigHandler(type:EFacilityType){
        this.model.selLevelUpType = type;
        E.ViewMgr.Open(EViewType.HeroHouseLevelUp);
    }

    private onAttrHandler(item:IAttrItemSkin){
        // let arr = (item.dataSource as string).split(":");
        // let id = parseInt(arr[0]);
        // let count = parseInt(arr[1]);
        let attr:stEquipAttr = item.dataSource;
        let id:number = attr.id;
        let count:number = attr.value;

        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id);
        item.valTf.text = attrConvert(id,count);
    }

    private onAttrRenderHandler(cell:ui.views.hero_house.ui_hero_house_attrUI){
        let vo:stGymMission = cell.dataSource;
        let cfg:Configs.t_Gym_Mission_List_dat = t_Gym_Mission_List.Ins.GetDataById(vo.fid);
        cell.tf1.text = cfg.f_MissionName;

        let max = cfg.f_RewardsType;
        if(cfg.f_TaskType == EGymTaskType.GetHero){
            max = cfg.f_RewardsType.split('|')[0];
        }
        cell.valTf.text = `${vo.count}/${max}`;
    }

    private onShengShiHandler(){
        E.ViewMgr.Open(EViewType.HeroHouseKnowLedge);
    }

    /**打开信物 */
    private onQiPaoHandler(){
        E.ViewMgr.Open(EViewType.HeroHouseStorge);//信物仓库
    }

    private onFiveInvite(){
        this.model.invite(EInviteType.Five,true);
        XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Yanwu);
    }

    /**邀请 */
    private onInviteHandler(){
        // if(this.model.canInvite(EInviteType.One,true)){
        this.model.invite(EInviteType.One,true);
        XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Yanwu);
        // }
    }

    private onOpenTask(){
        E.ViewMgr.Open(EViewType.HeroHouseTask);
    }

    private onShopHandler(){
        E.ViewMgr.Open(EViewType.HeroHouseShop);
    }
    /**场馆选择 */
    private onHouseClick(){
        E.ViewMgr.Open(EViewType.HeroHouseMapSel);
    }

    /**名将录  */
    private onHouseSelClick(){
        E.ViewMgr.Open(EViewType.HeroHouseHandbook);
    }

    /**设施升级 */
    private onHouseLvClick(){
        E.ViewMgr.Open(EViewType.HeroHouseLevelUp);
    }

    private onRemovePop(){
        this.onUpdatePopView();
    }
    private onRefreshRed(){
        if(HeroHouseModel.Ins.mHandbookRed){
            DotManager.addDot(this._ui.heroBtn);
        }else{
            DotManager.removeDot(this._ui.heroBtn);
        }

        if(MainModel.Ins.heroPackVo.type == EGymGetStatus.CanGet){
            DotManager.addDot(this.packageBtnCtl.skin);
        }else{
            DotManager.removeDot(this.packageBtnCtl.skin);
        }
    }
    protected onInit(): void {
        this._ui.aniCon.addChild(this.model.heroAnim.container);
        let req = new GymInviteGetList_req();
        SocketMgr.Ins.SendMessageBin(req);
        
        E.ViewMgr.Close(EViewType.Main);
        this.playEffect();
        this.model.on(GymEvent.RemovePop,this,this.onRemovePop);
        this.model.on(GymEvent.InvitePopUpdate,this,this.onUpdatePopView);
        this.model.on(GymEvent.FightAnimPlayEnd,this,this.onUpdatePopView);
        this.model.on(GymEvent.MapUdapate,this,this.onUpdateMapName);
        this.model.on(GymEvent.TaskUpdate,this,this.onUdapteTask);
        this.model.on(GymEvent.FacilitiesUpdate,this,this.onUpdateView);  
        this.model.on(GymEvent.WashSucceed,this,this.onUpdateView);                
        this.model.on(GymEvent.MainAttrUpdate,this,this.onUpdateView);        
        this.model.on(GymEvent.RedUpdate,this,this.onRefreshRed);
        this.model.on(GymEvent.SetGear,this,this.onSetGear);

        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onUpdateInviteLetter);
        MainModel.Ins.on(MainEvent.GymCardUpdate,this,this.onRefreshRed);
        MainModel.Ins.on(MainEvent.GymCardUpdate,this,this.updateSetBtnEvt);

        this.onUpdateInviteLetter();
        this.onUpdatePopView();
        this.onUpdateMapName();
        this.onUdapteTask();
        this.updateAttrView();
        this.onUpdateFacilites();
        this.updateSetBtnEvt();
        this.gear = this.model.autoCtl.isAuto;
        Laya.timer.loop(1000,this,this.onLoopCheck);

        let ctl:HeroSmallBtnCtl = this.model.autoCtl;
        if(!ctl.isAuto || ctl.isAuto && ctl.cur){
            this.model.openPop();
        }
        this.onRefreshRed();
    }
    private onSetGear(v:boolean){
        this.gear = v;
    }
    private onUpdateView(){
        this.updateAttrView();
        this.onUpdateFacilites();
    }

    private onUpdateFacilites(){
        this._ui.teaTf.text = this.model.getNameByType(EFacilityType.Tea);
        this._ui.ywttf.text = this.model.getNameByType(EFacilityType.Fight);
        this._ui.fightgutf.text = this.model.getNameByType(EFacilityType.Drum);
        this._ui.playerTf.text = this.model.getNameByType(EFacilityType.Dummy);
        this._ui.lightTf.text =  this.model.getNameByType(EFacilityType.Light);
    }

    /**更新属性 */
    private updateAttrView(){
        this._ui.midList.array = this.model.defineShowAttr;
        this._ui.midList.scrollTo(0);

        this._ui.rightList1.array = this.model.heroAttr;
        this._ui.rightList1.scrollTo(0);

        this.midCtl.onChangeEvt();
        this.rightCtl.onChangeEvt();
    }

    private onUdapteTask(){
        this._ui.tasklist.array = this.model.taskList;
        this._ui.tasklist.refresh();
        this._ui.tasklist.scrollTo(0);
    }

    protected onExit(): void {
        this.model.heroAnim.removeSelf();

        this.gear = false;
        E.ViewMgr.Open(EViewType.Main);
        if(this.teaEff){
            this.teaEff.stop();
            this.teaEff.dispose();
        }
        if(this.guEff){
            this.guEff.stop();
            this.guEff.dispose();
        }
        if(this.lightEff){
            this.lightEff.stop();
            this.lightEff.dispose();
        }
        MainModel.Ins.off(MainEvent.GymCardUpdate,this,this.updateSetBtnEvt);
        this.model.off(GymEvent.RemovePop, this, this.onRemovePop);
        this.model.off(GymEvent.InvitePopUpdate, this, this.onUpdatePopView);
        this.model.off(GymEvent.FightAnimPlayEnd, this, this.onUpdatePopView);
        this.model.off(GymEvent.MapUdapate, this, this.onUpdateMapName);
        this.model.off(GymEvent.TaskUpdate, this, this.onUdapteTask);
        this.model.off(GymEvent.FacilitiesUpdate, this, this.onUpdateView);
        this.model.off(GymEvent.WashSucceed, this, this.onUpdateView);
        this.model.off(GymEvent.MainAttrUpdate, this, this.onUpdateView);
        this.model.off(GymEvent.RedUpdate,this,this.onRefreshRed);
        this.model.off(GymEvent.SetGear,this,this.onSetGear);
        MainModel.Ins.off(MainEvent.ValChangeCell, this, this.onUpdateInviteLetter);
        MainModel.Ins.off(MainEvent.GymCardUpdate,this,this.onRefreshRed);

        // Laya.timer.clear(this,this.onLoopEvt);
        Laya.timer.clear(this,this.onLoopCheck);
        // Laya.Resource.destroyUnusedResources();

        spineRes.GC();
    }

    /**邀请函 */
    private onUpdateInviteLetter(id:number=ECellType.HeroInvite){
        if(id == ECellType.HeroInvite || id == ECellType.HighHeroInvite){
            let max:number = t_Gym_Config.Ins.cfg.f_LetterMax;
            this._ui.tf6.text = this.model.curInviteLetterCount + "/" + max + "";

            if(E.Debug){
                console.log("设置邀请函数量");
            }
        }
    }

    private onUpdateMapName() {
        let cfg = this.model.curMapCfg;
        if (cfg) {
            this._ui.controyTf.text = cfg.f_MapName;
            this._ui.controyTf.color = cfg.f_Color;
        }else{
            this._ui.controyTf.text = "";
        }
    }

    /**更新气泡 和 排队信息*/
    public onUpdatePopView(){
        let cell = this.model.popInfo;
        let v = false;
        // if (cell.finishCount > 0) {
        // this._ui.qipaoTf.text = cell.finishCount + "";
        // this._ui.juanzhou.skin = `remote/hero_house/xw.png`;
        // }else{
        this._ui.qipaoTf.text = this.model.authCount;
        this._ui.juanzhou.skin = this.model.authIcon;
        v = this.model.bMaxIcon;
        // }
        this._ui.maxIcon.visible = v;

        if(cell.needAnimCount <= 0){
            this._ui.rankTf.visible = false;
        }else{
            this._ui.rankTf.visible = true;
            this._ui.rankTf.text = cell.needAnimCount + '/' +  t_Gym_Config.Ins.cfg.f_Queue;
        }
    }

}