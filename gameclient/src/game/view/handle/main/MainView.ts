import { LogSys } from "../../../../frame/log/LogSys";
import { DebugUtil } from "../../../../frame/util/DebugUtil";
import { StringUtil } from "../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../frame/view/ViewBase";
import { HrefUtils, InitConfig, PlatformConfig } from "../../../../InitConfig";
import { ui } from "../../../../ui/layaMaxUI";
import { EPageType, EViewType } from "../../../common/defines/EnumDefine";
import { E, ScreenAdapter } from "../../../G";
import { LoginClient } from "../../../network/clients/LoginClient";
import { stChatPlayer, stEquipItem, stWing } from "../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../static/json/data/BaseCfg";
import { Version } from "../../../Version";
import { AvatarFactory } from "../avatar/AvatarFactory";
import { EAvatarDir } from "../avatar/AvatarView";
import { FontClipCtl } from "../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../avatar/ctl/FontCtlFactory";
import { SpineEffectCtl } from "../avatar/ctl/SpineEffectCtl";
import { SpineEffectManager } from "../avatar/SpineEffectManager";
import { ChatModel } from "../chat/model/ChatModel";
import { ChengHaoModel } from "../chenghao/model/ChengHaoModel";
import { DotManager } from "../common/DotManager";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { System_RefreshTimeProxy } from "../huodong/model/ActivityProxy";
import { ActivityTimeUtils } from "../huodong/model/ActivityTimeUtils";
import { EActivityType } from "../huodong/model/EActivityType";
import { VipModel } from "../huodong/model/VipModel";
import { JinShengModel } from "../jinsheng/model/JinShengModel";
import { TreasureModel } from "../jubaopeng/TreasureModel";
import { EClientType } from "../sdk/ClientType";
import { ShopProxy } from "../shop/proxy/shopProxy";
import { IconUtils } from "../zuoqi/vos/IconUtils";
import { IMainUpdate } from "./interface/Interface";
import { EOpenChest } from "./model/ChestAutoPolicy";
import { EFuncDef } from "./model/EFuncDef";
import { MainEvent } from "./model/MainEvent";
import { EMainSkin, ESpineAnimIndex, MainModel } from "./model/MainModel";
import { RedEnum } from "./model/RedEnum";
import { RedUpdateModel } from "./model/RedUpdateModel";
import { TaskModel } from "./model/TaskModel";
import { WingModel } from "./model/WingModel";
import { BoxExtraItemProxy, FuncProxy, MainIconProxy } from "./proxy/FuncProxy";
import { t_Platform } from "./proxy/t_Platform";
import { DetailShowVo } from "./views/Attr_detailedView";
import { AnimSetting } from "./views/BoxSetAnimView";
import { ChestAnimBaseView } from "./views/ChestAnimBaseView";
import { ChestAnimSpine } from "./views/ChestAnimSpine";
// import { DrawCallYQBtn } from "./views/DrawCallYQBtn";
import { EquipItemView } from "./views/EquipItemView";
import { HeroZhangHeView } from "./views/HeroZhangHeView";
import { BaseMainIcon } from "./views/icon/BaseMainIcon";
import { EButtonStyle, FuncSmallIcon } from "./views/icon/FuncSmallIcon";
import { MainBotIconCtl } from "./views/icon/MainBotIconCtl";
import { MainBottomPopIconVo, MainBottomPopView } from "./views/MainBottomPopView";
import { MainExpControl } from "./views/MainExpControl";
import { AvatarFight } from "./views/new2/AvatarFight";
import { GuaJiCtl } from "./views/new2/GuaJiCtl";
import { HuoDongShow } from "./views/new2/HuoDongShow";
import { LieBiaoBtn } from "./views/new2/LieBiaoBtn";
import { LeftLieBiao } from "./views/new2/LieBiaoList";
import { MainViewAdaptation } from "./views/new2/MainViewAdaptation";
import { MidBtnList } from "./views/new2/MidBtnList";
import { TaskCell } from "./views/new2/TaskCell";
import { TopBtnList } from "./views/new2/TopBtnList";
import { WingItemView } from "./views/WingItemView";
import { ECellType, EChestAnimStatus, EEquipType } from "./vos/ECellType";
import { EquipItemVo } from "./vos/EquipItemVo";
import { FPScheck } from "./vos/FPScheck";
import { MainRoleVo } from "./vos/MainRoleVo";
import { PlayerVoFactory } from "./vos/PlayerVoFactory";
export interface IMainAttrSkin extends Laya.Sprite{
    valTf:Laya.Label;
    tf1:Laya.Label;
}
export interface IMainUpImgAttrSkin extends IMainAttrSkin{
    upimg:Laya.Image;
}
//#region 循环属性动画
class AnimRing{
    public offsetx:number;
    public tween:Laya.Tween;
    private readonly attrAnimTime:number = 1000;
    private readonly stopTime:number = 2000;
    public con:Laya.Sprite;
    public parentCon:Laya.Sprite;
    public next:AnimRing;

    play(){
        this.tween.clear();
        this.tween.to(this.con,{x:-this.offsetx,update:new Laya.Handler(this,this.onUpdate)},this.attrAnimTime,null,new Laya.Handler(this,this.onStopShow));
    }
    private onUpdate(){
        this.next.con.x = this.con.x+this.offsetx;
    }
    public onStopShow(){
        // this.tween.to(this.con,{},this.stopTime,null,new )
        Laya.timer.once(this.stopTime,this,this.nextPlay); 
    }

    private nextPlay(){
        this.con.x = this.offsetx;
        this.next.play();
    }
}
//#endregion


export class MainView extends ViewBase implements IMainUpdate ,IMainView{
    protected delayOpenTime:number = 0;

    avatarFight:AvatarFight;//具有打击感的战斗
    private _mainViewAdaptation:MainViewAdaptation = new MainViewAdaptation();//适配
    private _liebiaoBtn:LieBiaoBtn = new LieBiaoBtn();
    private _topbtns:TopBtnList = new TopBtnList();//顶部按钮
    private _leftLieBiao:LeftLieBiao = new LeftLieBiao();//列表

    _midbtns:MidBtnList = new MidBtnList();//中间按钮
    botListIcon:FuncSmallIcon[] = [];//底部的按钮

    // bottomBtnList:FuncSmallIcon[] = [];

    private zhangheEffect:HeroZhangHeView = new HeroZhangHeView();

    public PageType: EPageType = EPageType.None;
    // private heroBtn:FuncSmallIcon;
    private static posOffset:number = 97;
    // private static btnWidth:number = 100;
    private mRoleData:MainRoleVo;
    private model:MainModel;
    // private smallIconCtl:ChestBotIconCtl = new ChestBotIconCtl();
    private expCtl:MainExpControl;
    // private _zuoqiSlot:ZuoQiSlotCtl;
    //#################################
    public _ui:ui.views.main.ui_mainUI;
    private yuanbaoAddCtl:ButtonCtl;
    // private menuBtnCtl:ButtonCtl;
    // private bottombtn1Ctl:ButtonCtl;
    private xianziBgCtl:ButtonCtl;
    private quickCtl:ButtonCtl;
    private tsCtl:ButtonCtl;
    //#################################
    // private chest_anim:Laya.Animation;
    private _maxPos:number;//坐标最大值
    public get chestAnim():ChestAnimBaseView{
        return this.model.animSettingList[this.model.animIndex].curAnim;
    }

    /**装备列表 */
    private _equipList:(EquipItemView | WingItemView)[] = [];
    private _allBtns:BaseMainIcon[] = [];
    private _plusCtl:FontClipCtl;
    private bg:Laya.Sprite;
    private attrViewList:IMainAttrSkin[] = [];

    // private _topCtl:TopIconCtl = new TopIconCtl();

    // private _topBtnList:BaseMainIcon[] = [];

    // 翅膀
    // private wingItem: WingItemView;
    private funcIcons:FuncSmallIcon[] = [];
    private static FuncSmallIconKey:string = "FuncSmallIcon";
    // private posListIcon:FuncSmallIcon[] = [];
    // public labelLayer:Laya.Sprite = new Laya.Sprite();
    public get labelLayer():Laya.Sprite{
        return this._ui.lbLayer1;
    }
    // public redLayer:Laya.Sprite = new Laya.Sprite();
    public iconLayer:Laya.Sprite = new Laya.Sprite();
    // private bInit:boolean = false;
    // private szCtl:DrawCallButtonCtl;
    // private gzhCtl:DrawCallButtonCtl;
    
    // private friendBtn:FriendsBtn;//朋友圈
    // private settingBtn:SettingBtn;//设置按钮
    // private mailBtn:EmailBtn;
    // private clientBtn:ClientBtn;
    
    // private cjkfCtl:DrawCallButtonCtl;//超级客服
    // private mailCtl:DrawCallEmailBtn;
    
    
    // private yqCtl:DrawCallYQBtn;
    
    private _timeLabel:Laya.HTMLDivElement;
    // private guanggaoRed:DrawCallNode;
    // private liebiao_red:DrawCallNode;
    // private rot:RotCtl;
    private offsetY:number;
    // private mainResize:MainViewResize;
    // private _secMidList:FuncSmallIcon[];
    /**底部按钮 */
    private _botCtlList:MainBotIconCtl[] = [];
    private readonly leftPos:number = 100;
    private _huodongView:HuoDongShow;
    // private aui:ui.views.main.ui_guaji_showUI;
    gj:GuaJiCtl;
    protected onEnter() {
    
    }
    protected onExit() {
        // ZuoQiModel.Ins.off(ZuoQiEvent.UpdateInfoEvt,this,this.onZuoQiEvt);
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onActivityUpdateData);
        ActivityModel.Ins.off(ActivityEvent.OpenCloseStatusUpdate,this,this.onActivityUpdateData);
        ActivityModel.Ins.off(ActivityEvent.PopWinUpdate,this,this.onPopWinUpdate);
        TreasureModel.ins.off(TreasureModel.EventUpdate,this,this.onTreasureUpdate);
        this.model.off(MainEvent.EventMainUpdateView,this,this.onBtnUpatde);
        TaskModel.Ins.off(TaskModel.TaskChanged, this, this.onTaskRrefresh);
        // HuanZhuangModel.Ins.off(HuanZhuangEvent.UpdateStyle,this,this.onHuanZhuangEvt);
        MainModel.Ins.off(MainEvent.UpdateAvatarNickName,this,this.onUpdateAvatarNickName);
        VipModel.Ins.off(VipModel.VIP_UPDATA,this,this.UpdatePlayerVip);
        MainModel.Ins.off(MainEvent.MailRed,this,this.onMailRedEvt);
        // YaoQingModel.Ins.off(YaoQingModel.UPDATA_RED,this,this.onMailRedEvt);
        RedUpdateModel.Ins.off(RedUpdateModel.UPDATA,this,this.updateTopEquip);
        ChengHaoModel.Ins.off(ChengHaoModel.UPDATA_CHENGHAO,this,this.onSetTitle);
        if(this.chestAnim){
            this.chestAnim.Stop();
        }
        this.model.off(MainEvent.SWITCH_ANIM,this,this.onSwitchAnim);
        this.model.off(MainEvent.UPDATE_NEW_PLAYER,this,this.onMailRedEvt);
        // this.model.off(MainEvent.UpadteMainButtons,this,this.updatePosBtnView);
        this.model.off(MainEvent.Exp,this,this.UpdateExp);
        this.model.off(MainEvent.Level,this,this.UpdateExp);
        JinShengModel.Ins.off(JinShengModel.Updata_View,this,this.updataJS);
        ChatModel.Ins.off(ChatModel.UPDATA_MAIN_VIEW,this,this.onChatUpdate);
        this.gj && this.gj.onExit();
        // this.avatarFight && this.avatarFight.onExit();
    }

    private onBtnUpatde(){
        this.updatePosBtnView();
    }

    public get huodong(){
        if(!this._huodongView){
            this._huodongView = new HuoDongShow();
        }
        return this._huodongView;
    }
    // public showHuoDong(){
        // this.huodong.show();
    // }
    public get skin():ui.views.main.ui_mainUI{
        return this._ui;
    }

    reset(){
        if(this._ui){
            this._ui.ts_img.visible = false;
        }
    }

    public get isPlaying(){
        if(this.chestAnim){
            return this.chestAnim.isPlaying;
        }
        return false;
    }

    // private showAttrType:EAttrType[] = [
        // EAttrType.Speed,
        // EAttrType.Life,
        // EAttrType.Attack,
        // EAttrType.Defense,
    // ]

    //更新属性
    public UpdateMainAttr() {
        // for (let i = 0; i < 10; i++) {
        //     let item: ui.views.main.ui_main_attrUI = this._ui['attr' + i];
        //     if (item) {
        //         // this.model.mRoleData.
        //         let type = this.showAttrType[i];//i + EquipmentValueProxy.Ins.BaseAttrID;
        //         item.tf1.text = this.model.getAttrNameIdByID(type);
        //         item.valTf.text = this.model.mRoleData.getValString(type);
        //         item.valTf.x = item.width - item.valTf.textField.displayWidth + 25;
        //         item.upimg.visible = false;
        //     }
        // }
        PlayerVoFactory.fillAttrView(this.attrViewList,new Laya.Handler(this,this.getValByType));
    }

    private getValByType(type){
        return PlayerVoFactory.getValString(MainModel.Ins.mPlayinfo.moneyInfo,type);
        // return MainModel.Ins.mRoleData.getValString(type);
    }   

    protected SetCenter(): void {
        super.SetCenter();

        if (this.bg) {
            this.bg.graphics.clear();

            if (this._ui.x > 0) {
                let offsetX: number = (this._ui.x - this._ui.width / 2);
                this.bg.graphics.drawRect(0, 0, offsetX, Laya.stage.height, Laya.stage.bgColor);
                this.bg.x = -offsetX;
            }
        }
        let offset:number = 500;
        this._ui.hitArea = new Laya.Rectangle(0,-offset,this._ui.width,Laya.stage.height+2*offset);
        // if(debug){
        // this._ui.hitArea = new Laya.Rectangle(0,0,Laya.stage.width,Laya.stage.height);
        // }
        // this._ui.width = Laya.stage.width;
        // this._ui.height = Laya.stage.height;
        
        // Laya.timer.once(1000,this,()=>{
        // MainModel.Ins.snapshot();
        // });
    }

    // protected snapshot(){
    // MainModel.Ins.snapshot();
    // }
    /**添加遮罩 */
    private set enableMaskBg(v:boolean){
        if(v){
            if(!this.bg){
                let bg:Laya.Sprite = new Laya.Sprite();
                this.bg = bg;
            }
            this._ui.addChild(this.bg);
        }else{
            if(this.bg){
                this.bg.removeSelf();
            }
        }         
    }

    private attrAnimTween:Laya.Tween;

    private initAttr(){
        let l = [];
        for(let i = 0;i < 10;i++){
            l.push(this._ui['attr' + i]);
        }
        this.attrViewList = l;

        let anim:boolean = false;

        if(!anim){
            return;
        }
/*
        // let attrBg = this._ui.attrbg;
        let mask1 = new Laya.Sprite();
        mask1.graphics.drawRect(0,0,attrBg.width,attrBg.height,"#ff0000");
        // if(HrefUtils.getVal("noanim")||E.initConfig.noanim){
        // }else{
        // this._ui.attrMenu.mask = mask1;
        // }
        this.attrAnimTween = new Laya.Tween();
        
        let vo0 = new AnimRing();
        vo0.tween = this.attrAnimTween;
        vo0.offsetx = attrBg.width;
        vo0.con = this._ui.attrCon0;
        vo0.parentCon = this._ui.allCon;

        let vo1 = new AnimRing();
        vo1.con = this._ui.attrCon1;
        vo1.tween = this.attrAnimTween;
        vo1.offsetx = attrBg.width;
        vo1.parentCon = this._ui.allCon;

        vo1.next = vo0;
        vo0.next = vo1;
        vo1.onStopShow();
*/
    }
    // private popBtn:FuncSmallIcon;
    // private popBindInit(){
    // Laya.timer.loop(1000,this,this.onPopCheck);
    // }

    // private onPopCheck(){
    //     let isOpen = ActivityModel.Ins.isPopIconShow;
    //     if(this.popBtn.isOpen != isOpen){
    //         this.onPopWinUpdate();
    //     }
    // }


    private initLeftRightButton(){
/*
        let posStyle = EButtonStyle.Pos;
        this.posListIcon.push(
            //需要自适应的坐标按钮
            new FuncSmallIcon('l20',EFuncDef.GuaJi,posStyle),
            new FuncSmallIcon('l0',EFuncDef.SignIn,posStyle),
            new FuncSmallIcon('l1',EFuncDef.KaiFuKuangHuang,posStyle),
            new FuncSmallIcon('l2',EFuncDef.Libao,posStyle),
            new FuncSmallIcon('l3',EFuncDef.SaoGuoMark,posStyle),
            new FuncSmallIcon('l4',EFuncDef.ZhuHouBuji,posStyle),
            // popBtn,
            new FuncSmallIcon('l5',EFuncDef.PopWin,posStyle),
            new FuncSmallIcon('l21',EFuncDef.NewPlayer,posStyle),
            new FuncSmallIcon('l22',EFuncDef.Laborday,posStyle),
            new FuncSmallIcon('l23',EFuncDef.ChildrenHD,posStyle),
            new FuncSmallIcon('l24',EFuncDef.JuBaoPeng,posStyle),
            new FuncSmallIcon('l25',EFuncDef.GuangGao,posStyle),
            new FuncSmallIcon('l26',EFuncDef.DuanWu,posStyle),
            new FuncSmallIcon('l27',EFuncDef.GemFeast,posStyle),     
            new FuncSmallIcon('l28',EFuncDef.Summer,posStyle),
            new FuncSmallIcon('l29',EFuncDef.JJZML,posStyle),
            new FuncSmallIcon('l30',EFuncDef.FuJiangFeast,posStyle),
            new FuncSmallIcon('l31',EFuncDef.MeiRiZhuanPan,posStyle),
            new FuncSmallIcon('l32',EFuncDef.HuoDong,posStyle),
            );
*/
/*
        let l = MainIconProxy.Ins.List;
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_MainIcon_dat = l[i];
            if (cfg.f_pos != 0) {
                let cellSkin = new ui.views.main.ui_main_bottom_iconUI();
                // if(cfg.f_pos >= this.leftPos){
                // }else{
                // }
                this.posListIcon.push(new FuncSmallIcon(cellSkin, parseInt(cfg.f_funid), EButtonStyle.Pos));
            }
        }
*/
    }

    public getByFuncId(funcId:number){
        let skin = this._topbtns.getByFuncId(funcId);
        if(skin){
            return skin;
        }
        /*
        let l = this.posListIcon;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.funcId ==  funcId){
                return cell.skin;
            }
        }
        */
    }
    /**初始化中部的按钮 */
    private initNormalBtn(){
        let botStyle = EButtonStyle.Bottom;


        // let popBtn = new FuncSmallIcon('l5',EFuncDef.PopWin,posStyle);
        // this.popBtn = popBtn;
        // this.popBindInit();

        //左右两边的按钮
        this.initLeftRightButton();

        //底部按钮
        let fid;
        if(initConfig.platform == PlatformConfig.War3){
            fid = EFuncDef.wowhuanzhuang;
        }else{
            fid = EFuncDef.SwitchStyle;
        }
        this.botListIcon.push(
        
            this.model.createFuncIcon('btn1',EFuncDef.Jjc,botStyle),//竞技场
            this.model.createFuncIcon('btn4',EFuncDef.Alliance,botStyle),//同盟
            
            this.model.createFuncIcon('btn2',fid,botStyle),//家园
            this.model.createFuncIcon('mainBtn',EFuncDef.Adventure,botStyle),//冒险
            /**
             * 
             * 竞技场: 巅峰 竞技场 星星 大乱斗
             * 同盟
             * 家园: 换装 跑商 战魂 副将
             * 征战:鏖战 试炼 武神殿 副本 冒险
             */

            // new FuncSmallIcon(this._ui.btn5,EFuncDef.Confraternity,botStyle,"btn5")//神兵
        );
        //中间按钮
        /*
        this.funcIcons.push(
            this.model.createFuncIcon('icon0',EFuncDef.SwitchStyle,EButtonStyle.Mid),
            this.model.createFuncIcon('icon1',EFuncDef.Soul,EButtonStyle.Mid),
            this.model.createFuncIcon('icon2',EFuncDef.Ride,EButtonStyle.Mid),//坐骑
            this.model.createFuncIcon('icon3',EFuncDef.Wing,EButtonStyle.Mid),//翅膀
            // new FuncSmallIcon('icon4',EFuncDef.CiFu,EButtonStyle.Mid),
            new CiFuIcon("icon4"),//祈福
            new YanWuIcon('icon5'),//武馆
            this.model.createFuncIcon('icon6',EFuncDef.Gem,EButtonStyle.Mid),
        );
        */
        //////////////////////////////////////////////////////
        
        /*
        for(let i = 0;i < 7;i++){
            let item:IFuncSmallIconSkin = this._ui["icon"+(i+7)];
            item.dot.visible = false;
            item.tf2.visible = item.bg2.visible = false;
            item.icon.skin = `remote/main/main/weikaifang.png`;
            item.tf.text = "";
        } 

        */

        //  let _secMidList:FuncSmallIcon[] = [];
        /*
        _secMidList.push(
            this.model.createFuncIcon('icon7',EFuncDef.Confraternity,EButtonStyle.Mid),//神兵
            this.model.createFuncIcon('icon8',EFuncDef.FuJiangJB,EButtonStyle.Mid),//副将羁绊
            this.model.createFuncIcon('icon9',EFuncDef.LingChong,EButtonStyle.Mid),//灵宠
        )
        */

        // this._secMidList = _secMidList;
        //////////////////////////////////////////////////////
        // this.funcIcons = this.funcIcons.concat(_secMidList);
        this.funcIcons = this.funcIcons.concat(this.botListIcon);
        
        
        ////////////////////////////////////////////////////
        let _maxPos = 0;
        let l = MainIconProxy.Ins.List;
        for (let i = 0; i < l.length; i++) {
            let icon:Configs.t_MainIcon_dat = l[i];
            if (icon.f_pos > 0 && icon.f_pos > _maxPos) {
                _maxPos = icon.f_pos;
            }
        }
        this._maxPos = _maxPos;
    }

    public onSelBot(selicon:FuncSmallIcon){
        let l = this.botListIcon;
        for(let i = 0;i < l.length;i++){
            let icon = l[i];
            if(icon  == selicon){
                icon.selected = true;
            }else{
                icon.selected = false;
            }
        }
    }

    // private initFire(){
    // let chest_anim = FrameAniUtil.Create("res/atlas/remote/fire.atlas",new Laya.Handler(this,this.onInit));
    // this._ui.fbx.addChild(chest_anim);
    // chest_anim.x = -25;
    // chest_anim.y = -40;
    // chest_anim.scaleX = chest_anim.scaleY = 2.0;
    // chest_anim.interval=1000/20;//每一帧的播放时间(毫秒)
    // chest_anim.play(0,true);
    // }

    private mUnlock:boolean = false;
    public setLayerEvt(v: boolean) {
        this.mUnlock = v;
    }
    /**播放张郃 */
    public playZhangHe(){
        let btnSkin:Laya.Sprite = this.getBotPosByFuncId(EFuncDef.Adventure);
        this.zhangheEffect.play(btnSkin);
    }

    private onAdd() {
        MainModel.Ins.on(MainEvent.ButtonCtlClick, this, this.onClickEvt);
        // this._ui.off(Laya.Event.DISPLAY,this,this.onAdd);
    }
    private onLayerChange(type:EViewType,v:boolean){
        if(type != EViewType.SmallTips){
            E.ViewMgr.Close(EViewType.SmallTips);
        }
        // console.log("type:"+type + ","+Laya.timer.currTimer+":onLayerChange    "+v,this._ui.box.visible,this.model.boxOldShow);
        if(this.mUnlock){
            if(v){
                
                if(this._leftLieBiao.visible){
                    // console.log(Laya.timer.currTimer+"onLayerChange setList false");
                    this.setList(false);
                    this.model.boxOldShow = true;
                }
            }else{
                if(this.model.boxOldShow){
                    // console.log(Laya.timer.currTimer+"onLayerChange setList true");
                    this.setList(true);
                    this.model.boxOldShow = false; 
                }
            }
        }
        this._leftLieBiao.updateSdkButton();
        if(!v){
            Laya.timer.callLater(this,this.onCallLater);
        }
    }

    private onCallLater(){
        E.yinDaoMgr.showYD(9);
    }

    private onClickEvt(skin){
        let taskArr = TaskModel.Ins.guideArr;

        if(taskArr && taskArr.length > 0 && taskArr[E.yinDaoMgr.index]){
            let sp = E.ViewMgr.getUIByKeySt(taskArr[E.yinDaoMgr.index].f_GuidePosition);
            if(!sp){
                console.log("onClickEvtNOSP>>>>>>>>>>>>>>>>",taskArr,taskArr[E.yinDaoMgr.index]);
                return;
            }
            if(skin == sp){
                E.yinDaoMgr.index ++ ;
                E.yinDaoMgr.removeYD();
                let gCfg = taskArr[E.yinDaoMgr.index];
                if(gCfg){
                    let arr = gCfg.f_GuidePosition.split("-");
                    E.yinDaoMgr.showYD(parseInt(arr[0]));
                }
            }
        }
        E.localGuideMgr.onButtonCtlClick(skin);
        // let vipSp = E.ViewMgr.getUIByKeySt("9-btn_cjkf");
        // if(skin == vipSp){
        //     let val = RedUpdateModel.Ins.getValByID(RedEnum.VIP_KEFU);
        //     if (val == 0) {
        //         RedUpdateModel.Ins.save(RedEnum.VIP_KEFU);
        //         this.onMailRedEvt();
        //     }
        // }
    }
/*
    private initMainResize(){
        this.mainResize = new MainViewResize();
        this.mainResize.upbtn = this._ui.upbtn;
        this.mainResize.bg = this._ui.bgequip;
        this.mainResize.juanzhou = this._ui.juanzhou;
        // this.mainResize.leftbg = this._ui.leftbg;
        // this.mainResize.rightbg = this._ui.rightbg;
        this.mainResize.uptf = this._ui.uptf;
        this.mainResize.iconSec = this._ui.iconSec;
        this.mainResize.btns = this._secMidList;
        this.mainResize.updot = this._ui.updot;
        this.mainResize.bgMask = this._ui.maskBg2;
        this.mainResize.init();
    }
*/
    // private initLieBiao(){
    //     this.friendBtn = new FriendsBtn(this._ui.btn_yxq);
    //     this.settingBtn = new SettingBtn(this._ui.btn_setting,"remote/main/main/sz.png","设置",new Laya.Handler(this,this.onBtnSZClick));
    //     this.mailBtn = new EmailBtn(this._ui.btn_email);
    //     this.clientBtn = new ClientBtn(this._ui.btn_kf);
    // }

    private guajiInit(){
        let aui = new ui.views.main.ui_guaji_showUI();
        this._ui.guajiCon.addChild(aui);
        this.gj = new GuaJiCtl(aui);
    }

    protected onFirstInit() {
        if(!this.UI){
            this.model = MainModel.Ins;

            this.UI = this._ui = new ui.views.main.ui_mainUI();
            this._mainViewAdaptation.skin = this._ui;
            this._mainViewAdaptation.init();

            DebugUtil.draw(this._ui.titleImg);

            this._ui.setdot.visible = false;
            // let offset:number = 500;
            // this._ui.hitArea = new Laya.Rectangle(0,-offset,this._ui.width,this._ui.height + offset * 2);

            let _taskCell = new TaskCell();
            _taskCell.skin = this._ui.reelitem;
            TaskModel.Ins.taskCell = _taskCell;

            this._topbtns.con = this._ui.topbtn_con;
            this._topbtns.init();
            this._topbtns.bindBtn(this._ui.rightBtn);

            this._midbtns.con = this._ui.midcon;
            this._midbtns.moreBtn = this._ui.moreBtn;
            this._midbtns.mornBg = this._ui.mornBg;
            this._midbtns.leftCon = this._ui.leftCon;
            this._midbtns.init();

            // this._leftLieBiao.yaoqingBtn = new YaoQingBtn(this._ui.yaoqingBtn);
            this._leftLieBiao.init(this._ui.rollCon,this._ui.leftCon);

            this._liebiaoBtn.skin = this._ui.liebaoBtn;
            
            if(!MainModel.Ins.verify){
                // this._ui.botlistTf.visible = true;
                // this._liebiaoBtn.tf.visible = true;
            }else{
                //提审
                // this._ui.botlistTf.visible = false;
                // this._liebiaoBtn.tf.visible = false;
            }

            ///////////////////////////////////////////////////////////////////////////////////
            this.offsetY = this._ui.xiangziIcon.y - this._ui.bot2.y;

            this._ui.addChild(this.iconLayer);
            // this._ui.addChild(this.labelLayer);
            this._ui.addChild(this._ui.img_ts);
            ////////////////////////////////////////////////////////////////////
            this._ui.headImg.once(Laya.Event.RESIZE,this,this.onImgComplete);
            // if(!DrawCallConfig.disable_mainAttr){
            this.initAttr();
            // }else{
                // this._ui.allCon.removeSelf();
            // }
            
            this.initNormalBtn();
            // this.initMainResize();

            // this._ui.chenghao.skin = "";
            this.onAdd();
            // this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);

            // let testView:ui.views.common.ui_slotviewUI = new ui.views.common.ui_slotviewUI();
            // let cslot:SlotViewCtl = new SlotViewCtl(testView);
            // cslot.skin = `o/icon/1.png`;
            // this._ui.addChild(testView);
            // cslot.skin = `o/icon/8.png`;

            this._liebiaoBtn.init();

            this._ui.top1img.visible = false;
            
            // if(MainModel.Ins.isCanRecharge()){
            // }else{
            //     rot.vis = false;
            // }
            
            // this.initFire();
            // Laya.timer.callLater(this,this.onInit);

            // this.shouChongCtl = new ButtonCtl(this._ui.shouchong,new Laya.Handler(this,this.onShouChong));
            // this.libaoCtl = new ButtonCtl(this._ui.libao,new Laya.Handler(this,this.onLiBao));
            // this.huodongCtl = new ButtonCtl(this._ui.huodong,new Laya.Handler(this,this.onHuoDong));
            // this.xiangshiCtl = new ButtonCtl(this._ui.xiangshi,new Laya.Handler(this,this.onXianShi));
            
            this._plusCtl = FontCtlFactory.createMainPlus();
            ButtonCtl.Create(this._ui.huobi,new Laya.Handler(this,this.ybHandler));
            this._ui.headImg.on(Laya.Event.CLICK,this,this.onHeadImgClick);
            this._ui.titleImg.on(Laya.Event.CLICK,this,this.onTitleImgClick);
            this._ui.img_vip.on(Laya.Event.CLICK,this,this.onVipClick);
            this.yuanbaoAddCtl = new ButtonCtl(this._ui.yuanbao,new Laya.Handler(this,this.yuanBaoAdd));
            // this.menuBtnCtl = new ButtonCtl(this._ui.menuBtn,new Laya.Handler(this,this.onMenuHandler));
            //详细信息
            // this.bottombtn1Ctl = new ButtonCtl(this._ui.detailedTf,new Laya.Handler(this,this.onBottombtn1Handler));
            this._ui.tipsclick.on(Laya.Event.CLICK,this,this.onBottombtn1Handler);
            // this._ui.detailedTf.mouseEnabled = true;
            

            //下部按钮
            // this.setbtnCtl = new ButtonCtl(this._ui.setbtn,new Laya.Handler(this,this.setbtnHandler));
            this.xianziBgCtl = new ButtonCtl(this._ui.xianziBg,new Laya.Handler(this,this.onXianziBg));
     
            // for(let i = 0;i < 6;i++){
            //     new ButtonCtl(this._ui["l"+i],new Laya.Handler(this,this.onBotLinkBtn,[i]));
            // }

            this.model.reelEffect = new SpineEffectCtl(this._ui.reelitem.eff);
            this.model.reelCtl.init(this._ui.reelitem.juanzhou);

            this.mRoleData = this.model.mRoleData;

            this.expCtl = new MainExpControl(this._ui.expbg,this._ui.expv,this._ui.expTf,this._ui.Lvtf,
                this._ui.lab_js,this._ui.lab_js1,this._ui.btn_js);
        
            // this.chestAnim = new ChestAnimView(this._ui.xiangziIcon);


            // let animCon0 = new Laya.Sprite();
            // this._ui.xiangziIcon.addChild(animCon0);
            // let animCon1 = new Laya.Sprite();
            // this._ui.xiangziIcon.addChild(animCon1);

            // this.chestAnim = new ChestAnimSpine(animCon0,0);
            // this.chestAnim = new ChestAnimSpine(animCon1,1);
            // this.model.animSettingList[0].curAnim = new ChestAnimSpine(animCon0,0);
            // this.model.animSettingList[1].curAnim = new ChestAnimSpine(animCon1,1);
            let btn:ButtonCtl;
            if(main.skinStyle == EMainSkin.Kotow){
                //酒樽磕头
                this._ui.boxTouchBtn.visible = true;
                let animList = this.model.animSettingList;
                for(let i = 0; i<  animList.length;i++){
                    let animCon = new Laya.Sprite();
                    animCon.visible = false;
                    animList[i].curAnim =  new ChestAnimSpine(animCon,i);
                    this._ui.xiangziIcon.addChild(animCon);
                }
                this._ui.bg.skin = "static/bg2.jpg";
                btn = ButtonCtl.Create(this._ui.xiangzi,new Laya.Handler(this,this.onStartGetChest),false);
            }else if(main.skinStyle == EMainSkin.Drum){
                //战鼓砍人
                this._ui.boxTouchBtn.visible = false;
                this._ui.bg.skin = "static/bg3.jpg";
                let fightSkin = new ui.views.main.ui_avatar_showUI();

                this._ui.guajiCon.addChild(fightSkin);
                
                if(Laya.Utils.getQueryString("debug_cache")){

                }else{
                    this.avatarFight = new AvatarFight();//打击感的战斗
                    this.avatarFight._ui = fightSkin;
                    if(this._ui.anim2){
                        this.avatarFight.animCtl = new ChestAnimSpine(this._ui.anim2,ESpineAnimIndex.SmallDrum);
                    }
                }
                
                // this.avatarFight.onAwake();
                btn = ButtonCtl.Create(this._ui.drum,new Laya.Handler(this,this.onStartFight),false);
            }
            if(initConfig.platform == PlatformConfig.War3){
                this._ui.bg.skin = "static/bg1.jpg";
            }
            btn.useSound = false;

            // this.smallIconCtl.icon = this._ui.equipicon;
            DebugUtil.draw(this._ui.equipicon);
            // this.smallIconCtl.chestAnim = this.chestAnim;

            // this._ui.xiangzi.on(Laya.Event.CLICK,this,this.onStartGetChest);
            // this._ui.xiangzi.hitArea = new Laya.Rectangle(0,0,this._ui.xiangzi.width,this._ui.xiangzi.height);
            // if(HrefUtils.getHref("debug")=="1"){
            //     this._ui.xiangzi.graphics.drawRect(0,0,this._ui.xiangzi.width,this._ui.xiangzi.height,null,"#ff0000");
            // }

            if(E.Debug){
                this._ui.xiangzi.graphics.clear();
                this._ui.xiangzi.graphics.drawRect(0,0,this._ui.xiangzi.width,this._ui.xiangzi.height,null,"#ff0000",1);
            }
            
            this.quickCtl = new ButtonCtl(this._ui.setbtn,new Laya.Handler(this,this.onQuickHandler));
            this._ui.ts_img.on(Laya.Event.CLICK, this, this.onTsHandler);

            // if(MainModel.Ins.verify){
            // this.quickCtl.visible = false;
            // }
            ButtonCtl.Create(this._ui.maskBg,new Laya.Handler(this,this.onBtnMBGClick),false);
            //初始化属性
            // this.initShowAttr();
            this.initEquip();
            // this.initButtons();
            // this.addHero();
      
            this.enableMaskBg=false;
            this._ui.img_ts.visible = false;

            this._ui.on(Laya.Event.DISPLAY,this,this.onDisplay);

            if(debug){
                let spr1 = new Laya.Sprite();
                spr1.graphics.drawRect(0,0,this._ui.width,this._ui.height,null,"#0000ff",1);
                spr1.mouseThrough = true;
                spr1.mouseEnabled = false;
                this._ui.addChild(spr1);


                let _timeLabel:Laya.HTMLDivElement = new Laya.HTMLDivElement()
                // _timeLabel.width = 600;
                _timeLabel.style.align = "left";
                _timeLabel.style.fontSize = 18;
                _timeLabel.style.color = "#ffffff";
                // _timeLabel.style.stroke = 2;
                // _timeLabel.style.strokeColor = "#ffffff";
                _timeLabel.mouseEnabled = false;
                
                // _timeLabel.width = Laya.stage.width;
                // _timeLabel.height = Laya.stage.height;
                // _timeLabel.color = "#00FFB4";
                // _timeLabel.strokeColor = "#000000";
                // _timeLabel.stroke = 1;
                this._timeLabel = _timeLabel;

                Laya.Utils.getQueryString("hidelabel") && (this._timeLabel.visible = false);

                let wx = window['wx'];
                if (wx) {
                    let o = wx.getSystemInfoSync();
                    _timeLabel.y = o.statusBarHeight;
                }

                Laya.stage.addChild(_timeLabel);

                // TestMainView
                // let _testView:TestMainView;
                // if(HrefUtils.getVal("fight")){
                //     Laya.stage.addChild(new ButtonSkin("fightTest",new Laya.Handler(this,()=>{
                //         if(!_testView){
                //             _testView = new TestMainView();
                //         }
                //         Laya.stage.addChild(_testView);
                //     }),0,150));
                // }
            }

            this.model.on(MainEvent.MainViewLayerChange, this, this.onLayerChange);

            this.initDc();
            // this.createBottomBtns();
            let val = parseInt(System_RefreshTimeProxy.Ins.getVal(34));
            new FPScheck(val);
            MainModel.Ins.event(MainEvent.MainViewInit);
            this.onShareReward();
            this._ui.ts_img.visible = false;
            this._ui.chatbg.on(Laya.Event.CLICK,this,this.onShowChat);
            DebugUtil.draw(this._ui.chatbg);

            /*
            //挂机
            this.guajiInit();
            */


            // let main:IAvatarMainCtl = new AvatarMainCtl();
            // main.con = this._ui;
            // main.create(new Laya.Handler(this,()=>{
            //     main.mAvatar.reset();
            //     main.mAvatar.dir = EAvatarDir.Right;
            //     main.mAvatar.play(EAvatarAnim.Move);
            //     main.mAvatar.setPos(300,300);
            // }))
        

            // if(Laya.Utils.getQueryString("localgame")){
            //     let avatar = AvatarFactory.createFightMonsterAvatar(EAvatarDir.Left,27,1);
            //     avatar.setPos(this._ui.width/2,this._ui.height * 0.25);
            //     this._ui.addChild(avatar);
            // }

        }
    }

    private onStartFight(){
        if(MainModel.Ins.curChest.type == EOpenChest.Auto){
            // LogSys.Log("return....");
            this.model.StopChestProxy();
            return;
        }
        this.avatarFight.fight();
    }
    private onShowChat(){
        E.ViewMgr.Open(EViewType.ChatView);
    }

    // /**朋友圈按钮 */
    // private createPyq() {
    //     if (System_RefreshTimeProxy.Ins.getNumberVal(40)) {
    //         let style: number = System_RefreshTimeProxy.Ins.getNumberVal(44);
    //         if (style == 0) {
    //             let pyq1: WeiXinNormalStyle = new WeiXinNormalStyle();
    //             pyq1.setSkin(this._ui.btn_pyq);
    //             this._botCtlList.push(pyq1);
    //         } else {
    //             let pyq: WeiXinNormal = new WeiXinNormal();
    //             pyq.setSkin(this._ui.btn_pyq);
    //             this._botCtlList.push(pyq);
    //         }
    //     } else {
    //         this._ui.btn_pyq.visible = false;
    //     }
    // }
    private onSwitchAnim(){
        let animList = this.model.animSettingList;
        let vo:AnimSetting = animList[this.model.animIndex];
        
        //设置磕头动画的背景

        // this._ui.bg_01.skin = vo.bgURL;
        if(this.model.animIndex == 0){
            // this._ui.bottombg2.visible = false;
        }else{
            // this._ui.bottombg2.visible = true;
        }
        for(let i = 0;i < animList.length;i++){
            let setting = animList[i];
            if(setting.curAnim){
                if(setting.index == this.model.animIndex){
                    setting.curAnim.container.visible = true;
                }else{
                    setting.curAnim.container.visible = false;
                }
            }
        }
    }

    // /**邮件 */
    // private onMailHandler(){
    //     E.ViewMgr.Open(EViewType.Mail);
    // }

    // private onBtnYXQClick() {
    //     if(TaskModel.Ins.isFuncOpen(EFuncDef.YouXiQuan,true)){
    //         E.ViewMgr.Open(EViewType.YouXiQuanLiBaoView);
    //     }
    // }

    private _isStat:boolean = false;

    private openServerHour(){
        return ((TimeUtil.serverTime-TimeUtil.openTime.toNumber()/1000) / 3600);
    }

    private f_testLoop() {
        
        // font-weight:bold;
        // <span style='font:24px Aria'>
        if(TimeUtil.openTime){
            let fontSize:number = 18;
            let l:Configs.t_Platform_dat[] = t_Platform.Ins.List;
            let cell = l.find(o=>o.f_platform == initConfig.platform);
            let platform_name = "";
            if(cell){
                platform_name = cell.f_name;
            }

            this._timeLabel.innerHTML = 

            ("newRole:"+MainModel.Ins.serverVer) + 
            "当前服务器时间:" + 
            // </span>
            TimeUtil.timestamtoTime(TimeUtil.serverTimeMS,'-',' ',':',"0",true) + "<br>" + 
            "platform:"+initConfig.platform + `(<span style='font:${fontSize}px' color='#ffff00'>` + platform_name + "</span>)<br>" + 
            "sdk_platform:" + E.get_SDK_platform() + "<br> + " + 
            "开服时间:" + TimeUtil.timestamtoTime(TimeUtil.openTime.toNumber())+"<br>"+(main.skinStyle == EMainSkin.Drum ? "磕头":"敲鼓")+ 
            "已经开服:"+((TimeUtil.serverTime-TimeUtil.openTime.toNumber()/1000)/ActivityTimeUtils.OneDay).toFixed(2)+"天"+this.openServerHour()+"小时<br>"+
            InitConfig.wxLoginResult.result.tcp+"<br>"+
            "socket:" + InitConfig.getServerIp() + "<br>" + 
            InitConfig.getSyURL()+ 
            `提审状态:${MainModel.Ins.verify}<br>`+
            `<span style='font:${fontSize}px' color='#ffff00'>${Version.cli_version}</span>` + InitConfig.getAsset() + 
            // "isNewRole:"+MainModel.Ins.isNewRole + "," + 
            "volume:"+Laya.SoundManager.musicVolume.toFixed(1)+"\t"+(Laya.SoundManager.musicVolume > 0 ? "▂▃▅" : "")+"<br>"+
            "openId:"+LoginClient.Ins.openId + ",name:" +  MainModel.Ins.mRoleData.NickName + "<br>" + 
            "<br><span style='font:24px' color='#ff0000'>gpu:"+Laya.Stat.gpuMemory + "cpu:" + Laya.Stat.cpuMemory  + "drawcall:" + Math.floor(Laya.Stat.renderBatches / Laya.Stat['_count']) + "</span><br>server version:" + this.model.serverVer
            ;
        }
        // this._timeLabel.innerHTML += "<span style='font:24px' color='#ff0000'>"+AvatarFactory.effLength+ "</span>";
        this._timeLabel.width = Laya.stage.width;

        // this._ui.nameTF.text = Math.random().toString();
        if(!this._isStat){
            if(initConfig.stat || HrefUtils.getVal("stat")){
                this._isStat = true;
                Laya.Stat.show(0,500);
            }
        }
        
    }
    // private boxDc:DrawCallNode;
    // private boxLvRedDc:DrawCallNode;
    // private xianziLvDc:DrawCallNode;
    /**初始化drawCall list */
    private initDc(){
        // let this =  MainModel.Ins.mainView;
        // this.boxLvRedDc=MainModel.Ins.getDcNode(this._ui.lvdot,this.labelLayer,EViewType.Main+"-lvdot",null,DrawCallNode.TYPE_DOT);
        let labels = [
            this._ui.Lvtf,
            this._ui.nameTF,
            // this._ui.expTf,
            this._ui.tongqianTf,
            this._ui.yuanbaoTf,
            // this._ui.botlistTf,
            // that._ui.boxFc,     //宝箱数量
            // that._ui.xianziLvTf //箱子等级
        ];
        if(E.Debug){
            this._ui.nameTF.mouseEnabled = true;
            this._ui.nameTF.on(Laya.Event.CLICK,this,()=>{
                // MainModel.Ins.snapshot();
            })
        }
        // for(let i = 0;i < labels.length;i++){
        //     let lb = labels[i];
        //     let dc = MainModel.Ins.getDcNode(lb,this.labelLayer);
        //     dc.visible = true;   
        // }
        
        // this.boxDc =  MainModel.Ins.getDcNode(this._ui.boxFc,this.labelLayer);
        // this.boxDc.visible = true;
        // this.xianziLvDc =  MainModel.Ins.getDcNode(this._ui.xianziLvTf,this.labelLayer);
        // this.xianziLvDc.visible = true;
    }

    // private oldBotY:number;
    private offsetBottomY:number;
    private percentVal:number;
    private oldBotY:number;
/*    
    private f_Layout(){
         // let bot11 = this._ui.bot11.parent;
         if(this._ui.bot11.parent){
            // if(!this.oldBotY){
            // this.oldBotY = this._ui.bot11.y;
            // }
            // let pos:Laya.Point = (this._ui.bot11.parent as Laya.Sprite).localToGlobal(new Laya.Point(this._ui.bot11.x,this._ui.bot11.y));
            // let botY:number = Laya.stage.height - 129;
            // console.log(botY);
            // this._ui.bot11.y = pos.y + (Laya.stage.height - pos.y);
            // console.log("h:",this._ui.height,Laya.stage.height);

            if(Laya.stage.height>1350){
                this._ui.bot11.y = this._ui.height + (Laya.stage.height-this._ui.height)/2 - 160;
            }
            if(this._ui.bot2){
                if(!this.offsetBottomY){
                    // this.offsetBottomY = this._ui.bottombg2.y - this._ui.bot2.y;
                    // this.oldBotY = this._ui.bot2.y;
                    // this.percentVal = this._ui.bot2.y/this._ui.height;
                }
            }
            let newY:number = Laya.stage.height*this.percentVal;
            if(newY < this.oldBotY){
                newY = this.oldBotY;
            }
            let half = (Laya.stage.height - this._ui.height)/2;
            if(half < 0){
                half = 0;
            }
            let bot2OffsetY:number = newY - half;

            if(bot2OffsetY + this._ui.bot2.height > this._ui.bot11.y){
                bot2OffsetY = this._ui.bot11.y - this._ui.bot2.height;
            }
            this._ui.bot2.y = bot2OffsetY;
            this._ui.xiangziIcon.y = this._ui.bot2.y + this.offsetY;
            // this._ui.bottombg2.y = this._ui.bot2.y + this.offsetBottomY;

            // this._ui.box.y = bot2OffsetY + 10;
            // this._ui.box1.y = bot2OffsetY + 10;
            // this.yqCtl.setpos(this._ui.btn_yq.x,bot2OffsetY - 7);
        }
    }
*/
    public onDisplay(){
        if(this._timeLabel){
            Laya.timer.loop(1000,this,this.f_testLoop);
        }
        if(!this.model.mRoleData.mPlayer){
            return;
        }
        // Laya.timer.callLater(this,this.onLaterHandler);
        Laya.timer.once(1,this,this.onLaterHandler);
        this.onBoxExtraChange();
    }
    
    private onLaterHandler(){
        // this.f_Layout();
        this._mainViewAdaptation.layout();
        MainModel.Ins.drawCall();
        this.setList(false);
        this.onStart();

        // Laya.timer.once(1000,this,()=>{
        // MainModel.Ins.snapshot();
        // });
    }

    private onAutoHandler() {
        this._ui.chilun.rotation+=1;
    }

    public set gear(v:boolean){
        if(v){
            Laya.timer.frameLoop(1,this,this.onAutoHandler);
        }else{
            Laya.timer.clear(this,this.onAutoHandler);
        }
    }

    /**初始化按钮*/
    // private initButtons(){
        // for(let  i = 0;i  < 6;i++){
        //     let skinName = "l"+i;
        //     let btn:BaseMainIcon = new BottomMainIcon();//底部按钮
        //     btn.skin = this._ui[skinName];
        //     btn.initPos(i);
        //     this._allBtns.push(btn);
        // }
        // this._topCtl.btnlist = this._ui.btnlist;
        // this._ui.l21.icon.skin = "remote/main/main/sgjs.png";
    // }
    
    private onaddHero(){
        // this._ui.heroContainer.addChild(AvatarFactory.getAvatar());
    }

    /**
     * 添加角色到界面
     */
    // public addHero(){
        // ZuoQiModel.Ins.once(ZuoQiEvent.InitRide,this,this.onRideInit);
        // this._ui.heroContainer.addChild(AvatarFactory.getStandUiMainAvatar());
    // }
    
    public playLevelUp(){
        SpineEffectManager.Ins.playOnce( "o/spine/up/up",this._ui,this._ui.width/2,this._ui.height/2);
    }

    // private onRideInit(){
        // LogSys.Log("坐骑更新!");
        // this.model.disposeMainAvatar();
        // this._ui.heroContainer.addChild(AvatarFactory.getStandUiMainAvatar());
    // }
    private onQuickHandler() {
        // if (TaskModel.Ins.isFuncOpen(EFuncDef.ChestAuto, true)) {
            if(!this.model.boxBoxCommitState && !TaskModel.Ins.isFuncOpen(EFuncDef.ChestAuto,true)){
                // let cfg:Configs.t_Func_dat = FuncProxy.Ins.getCfgByFid(EFuncDef.ChestAuto);
                // E.ViewMgr.ShowMidError(FuncProxy.Ins.f_info(cfg));
                return;
            }
            if (this.model.curChest.type == EOpenChest.Auto) {
                this.model.StopChestProxy();
                return;
            }
            // if (HrefUtils.getVal("highchest")) {
            if(this.model.boxAuto.open){
                E.ViewMgr.Open(EViewType.HighAutoChest);
            } else {
                E.ViewMgr.Open(EViewType.QuickSetting);
            }
        // }
    }
    private onTsHandler(e) {
        e.stopPropagation();
        MainModel.Ins.showSmallTips('', E.getLang("plms"), this._ui.ts_img);
    }
    public botIconView:MainBottomPopView;

    private getBotPosByFuncId(funcid:EFuncDef):Laya.Sprite{
        for(let i = 0;i < this.botListIcon.length;i++){
            let icon:FuncSmallIcon = this.botListIcon[i];
            if(icon.funcId == funcid){
                let skin:Laya.Sprite = icon.skin;
                // let pos = (skin.parent as Laya.Sprite).localToGlobal(new Laya.Point(skin.x,skin.y));
                // let uiPos = (this._ui.parent as Laya.Sprite).localToGlobal(new Laya.Point(this._ui.x,this._ui.y));
                // return new Laya.Point(uiPos.x-pos.x,uiPos.y-pos.y);
                // return new Laya.Point(skin.x,skin.y);
                return skin;
            }
        }
    }

    /**打开子菜单 */
    public openMushFunc(funcid:number){
        // if(v){
            if(!this.botIconView){
                this.botIconView = new MainBottomPopView();
            }
            
            // this.botIconView.bg = this._ui.top1img;
            this.botIconView.maskbg = this._ui.top1img;

            this._ui.top1img.visible = true;
            // this._ui.top1img.mouseEnabled = true;
            //////////////////////////////////////////////////////////////////////////////
            /*
            let l = [];

            let vo:MainBottomPopIconVo = new MainBottomPopIconVo();
            vo.funcid = EFuncDef.Jjc;
            vo.icon = "remote/main/main/jjc_icon.png";
            vo.txt = "竞技场";
            l.push(vo);

            vo = new MainBottomPopIconVo();
            vo.funcid = EFuncDef.DF_jjc;
            vo.icon = "remote/main/main/dfjjc.png";
            vo.txt = "巅峰竞技场";
            l.push(vo);
            */
            let l = this.createByFunc(funcid);
            //////////////////////////////////////////////////////////////////////////////
            this.botIconView.showList(l);
            let offsetX:number = 21;

            //设置x的偏移值
            let ox = 0;
            // if(funcid == EFuncDef.Jjc){
            //     ox = 97;
            // }else if(funcid == EFuncDef.YeWaiBoss){
            //     ox = 206;
            // }
            let btnSkin:Laya.Sprite = this.getBotPosByFuncId(funcid);
            if(btnSkin){
                ox = btnSkin.x;
            }
            let btnSize = 97;
            let resultX: number = ox - offsetX - (this.botIconView.bg1.width - btnSize) / 2;
            resultX = resultX < 0 ? 0 : resultX;
            if(resultX + this.botIconView.width > this._ui.width){
                resultX = this._ui.width - this.botIconView.width;
            }
            this.botIconView.x = resultX;

            // this._ui.adb.y - this.botIconView.showHeight; //
            // this.botIconView.y = this._ui.adb.y - this.botIconView.showHeight;//this._ui.bot11.y- this.botIconView.showHeight;// - this.botIconView.showHeight;
            
            let adbPos = (this._ui.adb.parent as Laya.Sprite).localToGlobal(new Laya.Point(this._ui.adb.x,this._ui.adb.y));
            this.botIconView.y = adbPos.y-this.botIconView.showHeight-(Laya.stage.height-ScreenAdapter.DefaultHeight)/2 - 129;//-this.botIconView.showHeight;
            
            this._ui.addChild(this.botIconView);

        // }else{
        // if(this.botIconView){
        // this.botIconView.hide();
        // }
        // }
    }

    private createBottomVo(funcId:number){
        let vo:MainBottomPopIconVo = new MainBottomPopIconVo();
        vo.funcid = funcId;
        let icon:string=FuncProxy.Ins.getCfgByFuncId(funcId).f_sub_icon;
        vo.icon = `remote/main/main/${icon}`;//"remote/main/main/jjc_icon.png";
        vo.txt = FuncProxy.Ins.getFuncNameByFuncId(funcId);//"竞技场";
        return vo;
    }

    private createByFunc(funcId:number){
        let mainCfg = MainIconProxy.Ins.getCfgByFuncid(funcId);
        let l = [];
        l.push(this.createBottomVo(funcId));
        if(mainCfg.f_funarr){
            let arr:string[] = mainCfg.f_funarr.split("|");
            for(let i = 0;i < arr.length;i++){
                let func = arr[i];
                l.push(this.createBottomVo(parseInt(func)));
            }
        }
        return l;
    }

    // private onBtnGGClick(){
    //     E.ViewMgr.Open(EViewType.GuangGaoView);
    // }
    private _oldMaskBgY:number;
    public setList(v:boolean){
        if(!this._oldMaskBgY){
            this._oldMaskBgY = this._ui.maskBg.y;
        }
        /*
        if(this.mainResize.isWindowSpread){
            this._ui.maskBg.y = this._oldMaskBgY + this.mainResize.offsetHeight;
        }else{
            this._ui.maskBg.y = this._oldMaskBgY;
        }
        */
       
        this._ui.maskBg.visible = this._leftLieBiao.visible = v;
        for(let i = 0;i < this._botCtlList.length;i++){
            this._botCtlList[i].onVisible(v);
        }
        this._liebiaoBtn.play(v);
        //#######################################################
        //刷新drawcall label
        this.resetDcLabel(v);
    }
    private resetDcLabel(v:boolean){
        this.model.reelCtl.refresh();
        // for(let i = 0;i < this.posListIcon.length;i++){
        //     let icon = this.posListIcon[i];
        //     let dc = icon.tf1Dc;
        //     if(dc && icon.btnStyle == EButtonStyle.Pos){
        //         let vis:boolean = false;
        //         if(icon.isOpen && !v){
        //             vis = true;
        //         }
        //         dc.visible = vis;
        //     }
        // }
        if(v){
            // this.boxDc.resetOldParent();//宝箱数量
            // this.boxLvRedDc.resetOldParent();//宝箱红点
            // this.xianziLvDc.resetOldParent();//箱子等级
            // this.guanggaoRed.resetOldParent();
            //this._ui.tf.visible = false;
        
            this.botListVis = true;
        }else{
            // this.boxDc.reset();
            // this.boxLvRedDc.reset();
            // this.xianziLvDc.reset();
            // this.guanggaoRed.reset();
            //this._ui.tf.visible = true;

            this.botListVis = false;
        }
    }

    /**刷新列表按钮 */
    private set botListVis(v:boolean){
        this._leftLieBiao.openStatus = v;
        
        let vipOpen = parseInt(System_RefreshTimeProxy.Ins.getVal(26));
        
        // LogSys.LogColor(`vipOpen:${vipOpen}`);
        // if(this.model.mPlayinfo && this.model.mPlayinfo.isVip && vipOpen){
        //     this.cjkfCtl.visible = v;
        // }else{
        //     this.cjkfCtl.visible = false;
        // }
       
    }

    /**列表的背景框是否显示中 */
    public get isMaskBgVisible(){
        return this._ui && this._ui.maskBg.visible;
    }

    private onBtnSZClick(){
        E.ViewMgr.Open(EViewType.SheZhiView);
    }

    // private onBtnGZHClick(){
    //     E.ViewMgr.Open(EViewType.GZHVIEW);
    // }

    private onBtnCJKFClick(){
        E.ViewMgr.Open(EViewType.CjkfView);
    }

    private onBtnMBGClick(){
        this.setList(false);
    }

    // private initShowAttr(){
    //     let _list:Configs.t_gameconfig_dat[] =  GameconfigProxy.Ins.List;
    //     for(let i = 0;i < _list.length;i++){
    //         let _cfg = _list[i];
    //         if(_cfg.f_showattr){
    //             this.showAttrType.push(_cfg.f_id);
    //         }
    //     }
    // }


    /**
     * 点击宝箱区域 获取宝箱(开宝箱)
     */
    private onStartGetChest() {
        let count:number = System_RefreshTimeProxy.Ins.getNumberVal(50);
        if(this.model.boxUsedCount == count - 1){
            if(RedUpdateModel.Ins.getValByID(RedEnum.ZHANGHE_ANI) == 0){
                this.playZhangHe();
                RedUpdateModel.Ins.save(RedEnum.ZHANGHE_ANI,1);
                return;
            }
        }
        
        if (!this.model.isAnimIdel) {
            return;
        }
        if (this.model.clickTimeMs + this.model.animUseMs > Laya.timer.currTimer) {
            LogSys.Log("动画未播放完成!" ,this.model.clickTimeMs ,this.model.animUseMs,Laya.timer.currTimer);
            return;
        }
        this.model.clickTimeMs = Laya.timer.currTimer;

        LogSys.Log("鼠标点击宝箱");

        this.model.ClickChest();
    }

    /**
     * 装备格子初始化
     */
    private initEquip() {
        // this.wingItem = new WingItemView(this._ui.chibang);
        this._equipList.push(
            new EquipItemView(this._ui.item0, EEquipType.Shoulder,false,1),
            new EquipItemView(this._ui.item1, EEquipType.Casque,true,1),
            new EquipItemView(this._ui.item2, EEquipType.Necklace,false,1),
            new EquipItemView(this._ui.item3, EEquipType.Wrister,false,1),
            new EquipItemView(this._ui.item4, EEquipType.Barde,true,1),
            new EquipItemView(this._ui.item5, EEquipType.Gloves,false,1),
            new EquipItemView(this._ui.item6, EEquipType.Waistband,false,1),
            new EquipItemView(this._ui.item7, EEquipType.Trousers,false,1),
            new EquipItemView(this._ui.item8, EEquipType.Weapon,true,1),
            new EquipItemView(this._ui.item9, EEquipType.Ornament,false,1),
            new EquipItemView(this._ui.item10, EEquipType.Shoe,false,1),
            new EquipItemView(this._ui.item11, EEquipType.Shield,true,1),

            // new EquipItemView(this._ui.item12, EEquipType.ZuoQi),
            // new EquipItemView(this._ui.item13, EEquipType.None),
            // new EquipItemView(this._ui.item14, EEquipType.None),
            // new EquipItemView(this._ui.item15, EEquipType.None),
            // new EquipItemView(this._ui.item16, EEquipType.None),
            // new EquipItemView(this._ui.item17, EEquipType.None),
            // this.wingItem
        );


        


        // this._zuoqiSlot = new ZuoQiSlotCtl(this._ui.zuoqi, true);
        // this._zuoqiSlot.clickHandler = new Laya.Handler(ZuoQiModel.Ins, ZuoQiModel.Ins.onZuoqiClick);

        // this.initSuit(this._ui.item13);
        // this.bindBtn(this._ui.item13, E.LangMgr.getLang("HuanZhuang"),EFuncDef.SwitchStyle);
        // this.bindBtn(this._ui.item14, E.LangMgr.getLang("HeroHouse"),EFuncDef.HeroHouse);
        // new HeroMainIconCtl(this._ui.item14);
        // this.bindBtn(this._ui.item15, E.LangMgr.getLang("HuYou"),EFuncDef.CiFu);
        // this.bindBtn(this._ui.item16, E.LangMgr.getLang("PaoShang"),EFuncDef.PaoShang);
        // this.bindBtn(this._ui.item17,"挂机",EFuncDef.GuaJi);
    }

    // /**换装入口 */
    // private initSuit(mSkin:ui.views.main.ui_main_zhuangbeiUI) {
    //     mSkin.on(Laya.Event.CLICK, this, this.onSuitHandler);
    //     mSkin.tf1.text = "";
    //     mSkin.typename.text = E.LangMgr.getLang("HuanZhuang");
    //     mSkin.quality.skin = "";
    // }
    // private onSuitHandler() {
    //     E.ViewMgr.OpenByFuncid(EFuncDef.SwitchStyle);
    // }

    /**
     * 更新铜钱
     */
    public UpdateMoney(){
        this._ui.tongqianTf.text = StringUtil.val2m(this.mRoleData.getVal(ECellType.COPPER_MONEY)) + "";
    }
    /**
     * 更新元宝
     */
    public UpdateGold(){
        this._ui.yuanbaoTf.text = StringUtil.val2m(this.mRoleData.gold) + "";
    }

    /**
     * 更新经验值
     */
    public UpdateExp(){
        this.expCtl.SetValue();
        this.expCtl.SetJS();
    }

    private updataJS(){
        this.expCtl.SetJS();
    }

    private UpdatePlayerName(){
        this._ui.nameTF.text = this.mRoleData.getName();
    }

    private UpdatePlayerVip(){
        if(initConfig.clienttype == EClientType.Discount){
            this._ui.sp.visible = true;
            this._ui.lab_vip.text = "VIP" + VipModel.Ins.vipLevel;
            this._ui.lab_vip1.text = VipModel.Ins.vipLevel + "";
        }else{
            this._ui.sp.visible = false;
        }
    }
    /**
     * 更新宝箱数量
     */
    public UpdateBoxCnt(){
        this._ui.boxFc.text = this.mRoleData.getVal(ECellType.BOX).toString();
    }
    /**
     * 更新宝箱的等级
     */
    public UpdateBoxLv(){
        this._ui.xianziLvTf.text = `Lv${this.model.mRoleData.getChestData().boxlv}`;
    }
    /**
     * 战斗力
     */
    public UpdateBattle(){
        let n = this.mRoleData.getBattleValue();
        let v = StringUtil.val2Atlas(n);
        this._plusCtl.setValue(this._ui.plugcon,v,"middle");
        // this._ui.plusSpr.x = (this._ui.width- (this._plusCtl.mWidth + this._ui.plugs.width))/2;
    }

    private onSetTitle(){
        this._ui.titleImg.skin = MainModel.Ins.getTitleImg();
    }

    public onShareReward() {
        this._leftLieBiao.updateRed();
    }
    
    private onBoxExtraChange() {
        if (this._ui.ts_img.visible) return;
        const data = MainModel.Ins.boxExtra;
        if (data && data.dataList) {
            const item = data.dataList.find(o => o.id === 1);
            if (item) {
                const conf = BoxExtraItemProxy.Ins.getConfByFid(1);
                const limit = conf.f_TiredValue;
                if (item.num >= limit) {
                    // 开启疲劳模式
                    this._ui.ts_img.visible = true;
                    return;
                }
            }
        }
        this._ui.ts_img.visible = false;
    }

    public UpdateView(isInit:boolean = false){
        this.onSetTitle();
        this.UpdateMoney();
        this.UpdateGold();
        this.UpdateExp();
        this.updataJS();
        this.UpdatePlayerName();
        this.UpdateBattle();
        this.UpdateEquip(isInit);
        this.UpdateMainAttr();
        this.UpdateBoxCnt();
        this.UpdateBoxLv();
        this.UpdateBtns();
        this.UpdateAnim(isInit);
        this.UpdateSmallIcon();
        this.UpdatePlayerVip();
        TaskModel.Ins.InitUpdateTask(this._ui, this._allBtns);
        // this.snapshot();
    }

    public UpdateSmallIcon(){
        let cell: EquipItemVo = this.model.getNotWear();
        if(cell){
            this.UpdateEquipSmallIcon(cell.equipVo);
        }else{
            this.UpdateEquipSmallIcon(null);
        }
    }

    public PlayAnim(_endHandler:Laya.Handler,_equipVo:stEquipItem){
        // let endAnim:boolean = this.model.hasEquipNotWeared;
        // this.model.curChest.isPlaying = true;
        
        // LogSys.Log("### Start",this.chestAnim.duration);
        if(this.chestAnim){
            let qua:number = 1;
            if(_equipVo){
                qua = _equipVo.quality;
            }
            this.chestAnim.Play(new Laya.Handler(this,()=>{
                // LogSys.Log("### End");
                this.UpdateAnim();
                // _endHandler.run();
            }),qua);
            let duration = this.chestAnim.duration * 1000;
            // LogSys.Log("当前的动作:" + (this.chestAnim as ChestAnimSpine).animVal + ",消耗时间:" + duration.toFixed(1) + "ms");
            this.model.animUseMs = duration;
            if(duration > 0){
                let animtime = HrefUtils.getHref('animtime');
                let a = parseInt(animtime);
                if(animtime){
                    a =  parseInt(animtime);
                }else{
                    a = 500;//提前打开界面的时间
                }
                duration -= a;
            }else{
                duration = 500;
            }
            Laya.timer.once(duration-500,this,()=>{
                this.UpdateEquipSmallIcon(_equipVo);
            });
            
            // LogSys.Log("### Start Play",duration);
            //不等动画播放完开始执行
            Laya.timer.once(duration,this,()=>{
                _endHandler.run();
            });
        }else{
            _endHandler.run();
        }
    }

    // private chestIsOpen = false;
    /**
     * 设置箱子的开启状态
     */
    private SetAnimStatus(_status:EChestAnimStatus,isInit){
        if(this.chestAnim){
            this.chestAnim.mStatus = _status;
            // let _anim:Laya.Animation = this.chestAnim.chest_anim;
            if(this.chestAnim.isPlaying){
                //动画播放中
            }else{
                this.UpdateAnim(isInit);
            }
        }
    }

    private UpdateAnim(isInit:boolean = false) {
       this.chestAnim && this.chestAnim.updateAnim(isInit);
    }

    public UpdateEquipSmallIcon(equip: stEquipItem) {
        // this.smallIconCtl.update(equip);
    }

    /**
     * 购买银币
     */
    private ybHandler(){
        this.model.openMoney();
    }

    private onHeadImgClick(){
        E.ViewMgr.Open(EViewType.SheZhiView);
        // E.ViewMgr.Open(EViewType.DaLuanDou);
    }

    private onTitleImgClick(){
        this.model.openFunc(EFuncDef.chenghao);
    }

    private onVipClick(){
        ActivityModel.Ins.openFunc(EActivityType.VIP,EViewType.MeiRiLiBao,3);
    }

    /**
     * 购买元宝
     */
    private yuanBaoAdd(){
        this.model.openGold();
    }

    /**
     * 右上角菜单
     */
    // private onMenuHandler(){
    // }

    /**
     * 箱子设置按钮
     */
    private setbtnHandler(){

    }

    /**
     * 箱子升级按钮
     */
    private onXianziBg(){
        E.ViewMgr.Open(EViewType.ChestLevelUp);
    }

    /**
     * 详情按钮
     */
    private onBottombtn1Handler(){
        let _vo:DetailShowVo = new DetailShowVo();
        _vo.accoutID = MainModel.Ins.mRoleData.AccountId;
        _vo.moneyInfo = this.model.mRoleData.moneyInfo;
        _vo.wing = new stWing();
        _vo.wing.wingId = this.model.wingId;
        _vo.equipList = this.model.getEquipList();
        E.ViewMgr.Open(EViewType.Attr_detailed,null,_vo);
    }

    private onUpdateAvatarNickName(){
        // this._ui.headImg.skin = url;
        // LogSys.Log("url2:"+url);
        MainModel.Ins.setTTHead(this._ui.headImg,MainModel.Ins.mRoleData.headUrl);
        this.UpdatePlayerName();
    }

    private onImgComplete(){
        LogSys.Log("onImgComplete...");
        MainModel.Ins.snapshot();
    }

    protected onInit() {
        this.gj && this.gj.onInit();
        this.avatarFight && this.avatarFight.onInit();
    }

    private checkVaildCfg(){
        let l:BaseCfg[] = [];
        l.push(ShopProxy.Ins);
        for(let i = 0;i < l.length;i++){
            let cfg = l[i];
            cfg.checkVaild();
        }
    }

    private onStart(){
        this.checkVaildCfg();
        this.onUpdateAvatarNickName();
        MainModel.Ins.on(MainEvent.MailRed,this,this.onMailRedEvt);
        // YaoQingModel.Ins.on(YaoQingModel.UPDATA_RED,this,this.onMailRedEvt);
        this.model.on(MainEvent.EventMainUpdateView,this,this.onBtnUpatde);
        MainModel.Ins.on(MainEvent.AddHero,this,this.onaddHero);
        MainModel.Ins.on(MainEvent.UpdateAvatarNickName,this,this.onUpdateAvatarNickName);
        VipModel.Ins.on(VipModel.VIP_UPDATA,this,this.UpdatePlayerVip);
        // ZuoQiModel.Ins.on(ZuoQiEvent.UpdateInfoEvt,this,this.onZuoQiEvt);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onActivityUpdateData);
        ActivityModel.Ins.on(ActivityEvent.PopWinUpdate,this,this.onPopWinUpdate);
        ActivityModel.Ins.on(ActivityEvent.OpenCloseStatusUpdate,this,this.onActivityUpdateData);
        TaskModel.Ins.on(TaskModel.TaskChanged, this, this.onTaskRrefresh);
        RedUpdateModel.Ins.on(RedUpdateModel.UPDATA,this,this.updateTopEquip);
        ChengHaoModel.Ins.on(ChengHaoModel.UPDATA_CHENGHAO,this,this.onSetTitle);
        this.model.on(MainEvent.SWITCH_ANIM,this,this.onSwitchAnim);
        this.model.on(MainEvent.UPDATE_NEW_PLAYER,this,this.onMailRedEvt);
        // this.model.on(MainEvent.UpadteMainButtons,this,this.updatePosBtnView);
        TreasureModel.ins.on(TreasureModel.EventUpdate,this,this.onTreasureUpdate);
        this.model.on(MainEvent.Exp,this,this.UpdateExp);
        this.model.on(MainEvent.Level,this,this.UpdateExp);
        JinShengModel.Ins.on(JinShengModel.Updata_View,this,this.updataJS);
        this.model.on(MainEvent.ShareReward,this,this.onShareReward);
        this.model.on(MainEvent.BoxExtraChange,this,this.onBoxExtraChange);
        this.model.on(MainEvent.YXQRed,this,this.onMailRedEvt);
        ChatModel.Ins.on(ChatModel.UPDATA_MAIN_VIEW,this,this.onChatUpdate);
        this.onChatUpdate();
        this.onSwitchAnim();
        
        // HuanZhuangModel.Ins.on(HuanZhuangEvent.UpdateStyle,this,this.onHuanZhuangEvt);
        this.UpdateView(true);
        this.redUpdate();
        MainModel.Ins.goonQuick();

        let pos = (this._ui.paoma.parent as Laya.Sprite).localToGlobal(new Laya.Point(this._ui.paoma.x,this._ui.paoma.y));
        MainModel.Ins.paomaGobalPos = pos;
        MainModel.Ins.playPaoMaLight();
        MainModel.Ins.noticeSel.autoOpen();
        this.model.checkShowReward();
        // let test = new Laya.Sprite();
        // test.graphics.drawCircle(pos.x,pos.y,5,null,"#ff0000",1);
        // Laya.stage.addChild(test);
    
        E.ViewMgr.closeLoading();
    }
    private onChatUpdate(){
        let l = ChatModel.Ins.chatWorldList;
        let msg:stChatPlayer;
        if(l && l.length > 0){
            msg = l[l.length-1];
        }
        if(msg){
            this._ui.chatTf.text = StringUtil.convertName(`${msg.name}:${msg.chat}`,15);
        }else{
            this._ui.chatTf.text = "";
        }
    }
    private onTreasureUpdate(){
        this.updatePosBtnView();
    }

    onMailRedEvt(){
        this._liebiaoBtn.updateRed();
        this._leftLieBiao.updateRed();
    }

    public playFullEffect(){
        if(this._ui){
            let pos = (this._ui.xiangziIcon.parent as Laya.Sprite).localToGlobal(new Laya.Point(this._ui.xiangziIcon.x,this._ui.xiangziIcon.y));
            SpineEffectManager.Ins.playOnce( IconUtils.fulleffect,Laya.stage,pos.x,pos.y);
        }
    }
    private redUpdate(){
        /*
        HuanZhuangModel.Ins.updateRed();
        NewAdventureModel.Ins.updateRed();
        MainModel.Ins.updateRed();
        ZuoQiModel.Ins.updateRed();
        WingModel.Ins.updateRed();
        JjcModel.Ins.updateRed();
        SoulModel.Ins.updateRed();
        HeroHouseModel.Ins.updateRed();
        ShopModel.Ins.updateRed();

        let l = E.MsgMgr.LabordayList;
        for(let i = 0;i < l.length;i++){
            let model:BaseModel = l[i];
            model.updateRed();
        }
        MainModel.Ins.event(MainEvent.MainViewInit);
        */
        MainModel.Ins.updateMuchReds();
    }

    private onTaskRrefresh(){
        this.updatePosBtnView();
    }

    private onActivityUpdateData(){
        // this._topCtl.refreshView();
        this.updatePosBtnView();
    }

    private onPopWinUpdate(){
        // this._topCtl.refreshView();
        this.updatePosBtnView();
    }

    private clearLeftRight(){
        /*
        while(this.posListIcon.length){
            let cell:FuncSmallIcon = this.posListIcon.shift();
            cell.dispose();
            Laya.Pool.recover(MainView.FuncSmallIconKey,cell);
        }
        */
    }

    public updatePosBtnView(){
        let l = this.funcIcons;//this.posListIcon;
        for(let i = 0;i < l.length;i++){
            let icon:FuncSmallIcon = l[i];
            icon.refreshView();
        }
        
        // this.clearLeftRight();
        // let btnW:number = 100;
        // this.updateLayarPos(1,99,-btnW);
        // this.updateLayarPos(this.leftPos,this._maxPos,btnW);

        this._topbtns.refresh();
        this._midbtns.refresh();
        this.redUpdate();

        // if(this.model.isOpenAllByFuncid(EFuncDef.Chat+"")){
        this._ui.chatbg.visible = true;
        // }else{
            // this._ui.chatbg.visible = false;
        // }
    }
    
    private updateLayarPos(start:number,end:number,ox:number){
        // let maxCount:number = this.mainResize.isWindowSpread ? 3 : 4;
        let maxCount:number = 3;

        let sy:number = 0;
        // if(isNaN(this.posOffset)){
        // this.posOffset = 97;//this._ui.l4.y - this._ui.l3.y;
        // }
        let offset:number = MainView.posOffset;
        let k = 0;
        let x = 0;
        for(let i = start;i <= end;i++){
            let cfg = this.model.cfgByPos(i);
            if(cfg && !cfg.f_Uiexpand){

                let item = Laya.Pool.getItemByClass(MainView.FuncSmallIconKey,FuncSmallIcon);
                /*
                this.posListIcon.push(item);
                item.initSkin(ui.views.main.ui_main_bottom_iconUI);
                if(i >= this.leftPos){
                    this._ui.rightbg.addChild(item.skin);
                }else{
                    this._ui.leftbg.addChild(item.skin);
                }
                */
                item.refresh(item.skin as any,parseInt(cfg.f_funid),EButtonStyle.Pos,x, sy);

                sy += offset;
                k++;
                if(k % maxCount == 0){
                    sy = 0;
                    x+=ox;
                }
            }
        }
    }

    protected onChangeLanguage() {

    }
    protected onAddLoadRes() {
        this.addAtlas("main/main.atlas");
    }
    protected onAddEventListener() {

    }

    private updateTopEquip(){
        for(let i = 0;i < this._equipList.length;i++){
            let itemView:EquipItemView | WingItemView = this._equipList[i];
            // let red:boolean = false;
            let skin;
            if (itemView instanceof EquipItemView) {
                itemView.setData(this.model.getEquipWearVo(itemView.equipType));
                // red = RedUpdateModel.Ins.getEquipType(itemView.equipType);
                skin = itemView.skin;
                
            } else {
                itemView.setData(WingModel.Ins.getOwnerWingData());
            }
        }
    }

    public UpdateEquip(isInit:boolean = false){
        this.updateTopEquip();
        let _equipVo:EquipItemVo = this.model.equipNotWeared;
        this.SetAnimStatus(_equipVo == null ? EChestAnimStatus.Close : EChestAnimStatus.Open,isInit);
    }

    public updateWingItem() {
        // if (this.wingItem) {
        //     this.wingItem.setData(WingModel.Ins.getOwnerWingData());
        // }
    }

    // private onZuoQiEvt(){
        // this._zuoqiSlot.mData = ZuoQiModel.Ins.rideVo;
        // this._zuoqiSlot.refresh();
    // }

    private UpdateBtns(){
        for(let i = 0;i < this._allBtns.length;i++){
            let btn:BaseMainIcon = this._allBtns[i];
            btn.update();
        }
        this.onActivityUpdateData();
    }

    private _isPlayTs:boolean;
    public playTS(){
        if(this._isPlayTs){
            return;
        }
        let data = MainModel.Ins.tsList[0];
        if(!MainModel.Ins.tsTween){
            MainModel.Ins.tsTween = new Laya.Tween();
        }
        this._isPlayTs = true;
        this._ui.img_ts.visible = true;
        this._ui.img_ts.x = 790;
        this._ui.lab_ts1.text = data.st1;
        this._ui.lab_ts1.color = data.co1;
        this._ui.lab_ts2.text = data.st2;
        this._ui.lab_ts2.x = this._ui.lab_ts1.textField.textWidth + 4;
        this._ui.box_ts.x = (394 - this._ui.box_ts.width) * 0.5;
        MainModel.Ins.tsTween.to(this._ui.img_ts,{x:356},250,null,new Laya.Handler(this,this.endTS));
    }   

    private _tsTimer:Laya.Timer;
    private endTS(){
        if(!this._tsTimer){
            this._tsTimer = new Laya.Timer;
        }
        this._tsTimer.once(2000,this,this.endTS1);
    }

    private endTS1(){
        MainModel.Ins.tsTween.to(this._ui.img_ts,{x:790},250,null,new Laya.Handler(this,this.endTS2));
    }

    private endTS2(){
        MainModel.Ins.tsList.shift();
        this._ui.img_ts.visible = false;
        this._isPlayTs = false;
        if(MainModel.Ins.tsList.length > 0){
            this.playTS();
        }
    }

    public setTitleRed(bo: boolean) {
        if (this._ui) {
            if (bo) {
                DotManager.addDot(this._ui.titleImg);
            } else {
                DotManager.removeDot(this._ui.titleImg);
            }
        }
    }

    set lvdot(v: boolean) {
        // this.skin && (this.skin.lvdot.visible = v);
        v ? DotManager.addDot(this._ui.xianziBg) : DotManager.removeDot(this._ui.xianziBg);
    }
}