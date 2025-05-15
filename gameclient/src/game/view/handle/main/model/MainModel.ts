import { LogSys } from "../../../../../frame/log/LogSys";
import { BaseModel, IUpdateRedModel } from "../../../../../frame/util/ctl/BaseModel";
import { TimeCheckCtl } from "../../../../../frame/util/ctl/TimeCheckCtl";
import { HttpUtil } from "../../../../../frame/util/HttpUtil";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { HrefUtils, InitConfig, PlatformConfig } from "../../../../../InitConfig";
import { EMsgBoxType, EViewType } from "../../../../common/defines/EnumDefine";
import { Debug } from "../../../../configs/Debug";
import { DrawCallConfig } from "../../../../DrawCallConfig";
import { E, G } from "../../../../G";
import { ELayerType, LayerMgr } from "../../../../layer/LayerMgr";
import { LoginClient } from "../../../../network/clients/LoginClient";
import { MSGID } from "../../../../network/MSGID";
import { EasyPayList_revc,ActionEquip_req, AdFreeCard_revc, Adventure_Boss_req, Adventure_Boss_revc, Adventure_req, Adventure_revc, AllLifeCard_revc, BoxAuto_req, BoxAuto_revc, BoxCommitState_revc, BoxExtraItemChange_revc, BoxExtraItemInit_revc, BoxUsedCount_revc, ChestInfoUpdate_revc, ChestUpLevel_req, ChestUpLevel_revc, ClubReward_revc, ConfigHash_revc, Conquest_revc, DailyShopWeekCard_revc, DebugFightVal_revc, EquipChange_revc, Err_revc, ExchangeEquipProxy_req, ExchangeEquip_req, ExchangeEquip_revc, FightEnd_req, FightResult_revc, FirstPaySplit_revc, FundRefresh_req, GameStyle_req, GameStyle_revc, GetServerTimeMS_revc, Gm_req, GrowPackUnlock_revc, GymPack_revc, Init_revc, ItemDel_revc, JjcFight_revc, JjcRankDrop_revc, JjcRewardPreview_revc, JustWatchPlayer_req, MailList_revc, MailRed_revc, MonthCard_revc, NewAdventureFight_req, NewServer_revc, NoticeList_revc, PalaceRefresh_req, PeakJjcOpenUnix_revc, PeakWatchPlayerInfo_req, PetFusionBaoDi_revc, PlayerCurExp_revc, PlayerLevel_revc, RedDotUpdate_revc, Reward_revc, SellEquipFinish_revc, Sell_revc, ServerVersion_revc, ShareReward_revc, SideBarReward_revc, SignStatus_revc, stCellValue, stEquipItem, stFightActionLog, stFightVo, stMail, stNotice, stPlayerBaseInfo, stRedDot, Success_revc, ValChanel_revc, WatchPlayerInfo_req, WatchPlayerInfo_revc, WxAuthInfo_revc, stEasyPay } from "../../../../network/protocols/BaseProto";
import { uint64 } from "../../../../network/protocols/uint64";
import { SocketMgr } from "../../../../network/SocketMgr";
import { StaticDataMgr } from "../../../../static/StaticDataMgr";
import { Version } from "../../../../Version";
import { War3Config } from "../../../../war3/War3Config";
import { EFightCamp } from "../../avatar/AvatarFactory";
import { SpineEffectCtl } from "../../avatar/ctl/SpineEffectCtl";
import { SpineUtil } from "../../avatar/spine/SpineManager";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { ChengHaoListProxy } from "../../chenghao/proxy/ChengHaoProxy";
import { LoadingVo } from "../../common/LoadingView";
import { DaLuanDouModule } from "../../daluandou/DaLuanDouModule";
import { DaLuanDouModel } from "../../daluandou/model/DaLuanDouModel";
import { DuanWuModel } from "../../duanwu/DuanWuModel";
import { FightMainView } from "../../fight/views/FightMainView";
import { ScoreJjcJieSuanView } from "../../fight/views/ScoreJjcJieSuanView";
import { IFightResult } from "../../fight/vos/FightVo";
import { FuJiangFeastModel } from "../../fujiangfeast/FuJiangFeastModel";
import { GemBaseModel } from "../../gemfeast/GemBaseModel";
import { GemFeastModel } from "../../gemfeast/GemFeastModel";
import { HeroHouseModel } from "../../herohouse/HeroHouseModel";
import { HuanZhuangModel } from "../../huanzhuang/HuanZhuangModel";
import { UnLockView } from "../../huanzhuang/views/UnLockView";
import { ActivityModel } from "../../huodong/ActivityModel";
import { System_CommunityProxy, System_RefreshTimeProxy, t_Pack_ControllerProxy, t_Pack_FirstPay_Equip, t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ActivityTimeUtils } from "../../huodong/model/ActivityTimeUtils";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityLingQu, EActivityType } from "../../huodong/model/EActivityType";
import { t_Purchase_EasyPay } from "../../huodong/model/t_Purchase_EasyPay";
import { VipModel, VipType } from "../../huodong/model/VipModel";
import { GuangGaoView } from "../../huodong/views/GuangGaoView";
import { NewPay } from "../../huodong/views/newplayer/NewPay";
import { ECardLingqu } from "../../huodong/views/YueKaView";
import { JiShaoChengDuoModel } from "../../jishaochengduo/JiShaoChengDuoModel";
import { JjcModel } from "../../jjc/JjcModel";
import { TreasureModel } from "../../jubaopeng/TreasureModel";
import { JuBaoPengView } from "../../jubaopeng/views/JuBaoPengView";
import { LabordayBaseModel } from "../../laborday/model/LabordayBaseModel";
import { ELabodayType } from "../../laborday/views/LabordayShopView";
import { LiBaoModel } from "../../libao/model/LiBaoModel";
import { t_Pack_FirstPay_Skin } from "../../libao/proxy/LiBaoProxy";
import { LingChongFeastModel } from "../../lingchong/model/LingChongFeastModel";
import { t_Item_Guide } from "../../localguide/t_Item_Guide";
import { ILoginCode } from "../../login/LoginViewNew";
import { ENewAdventure } from "../../maoxian2/model/ENewAdventure";
import { NewAdventureModel } from "../../maoxian2/NewAdventureModel";
import { NamingChargeModel } from "../../naming_charge/NamingChargeModel";
import { NewPlayerGemFeastModel, NewPlayerPetFeastModel, NewPlayerRideFeastModel } from "../../newplayerfeast/NewPlayerFeastModel";
import { ItemNotEnoughView } from "../../notenough/ItemNotEnoughView";
import { NotEnhoughModel } from "../../notenough/NotEnhoughModel";
import { getJjcModel } from "../../peakjjc/model/IJjcInterface";
import { PeakJjcModel } from "../../peakjjc/model/PeakJjcModel";
import { meituan } from "../../sdk/IMeiTuan";
import { ESdkValChange } from "../../sdk/ISdk";
import { ShenBinFeastModel } from "../../shenbin/model/ShenBinFeastModel";
import { ShopProxy } from "../../shop/proxy/shopProxy";
import { ShopModel } from "../../shop/ShopModel";
import { SoulModel } from "../../soul/model/SoulModel";
import { SySdk } from "../../weixin/sy-sdk/index";
import { WuShenDianModel } from "../../wushendian/model/WuShenDianModel";
import { XianShiLiBaoModel } from "../../xianshilibao/model/XianShiLiBaoModel";
import { XXZDZModel } from "../../xxzdz/model/XXZDZModel";
import { YinDaoTaskProxy } from "../../yindaotishi/YinDaoProxy";
import { ZhengTuModel } from "../../zhengtu/ZhengTuModel";
import { ZuoqiTipsShop } from "../../zuoqi/views/ZuoqiTipsShop";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { ReelAnimCtl } from "../ctl/ReelAnimCtl";
import { IListData } from "../ctl/SelectListCtl";
import { EChestLevelUp, IChestLv, IChestPosResult, IMainUpdate, ISmallTips } from "../interface/Interface";
import { MainView } from "../MainView";
import { AdventureBossProxy } from "../proxy/AdventureBossProxy";
import { BoxCdProxy, t_BoxGachaProxy } from "../proxy/BoxCdProxy";
import { FuncProxy, MainIconProxy } from "../proxy/FuncProxy";
import { ItemProxy } from "../proxy/ItemProxy";
import { EPlatformPopType, t_Platform } from "../proxy/t_Platform";
import { AnimSetting, BoxSetAnimView } from "../views/BoxSetAnimView";
import { EChestSpineAnim } from "../views/ChestAnimSpine";
import { ChestLevelUpView } from "../views/ChestLevelUpView";
import { QuickViewVo } from "../views/ChestQuickUseView";
import { CJKEView } from "../views/CJKEView";
import { IEquipItemSkin } from "../views/EquipItemView";
import { ExchangeView } from "../views/ExchangeView";
import { GameGroupView } from "../views/GameGroupView";
import { GZHView } from "../views/GZHView";
import { HighChestAutoSettingView } from "../views/HighChestAutoSettingView";
import { EButtonStyle, FuncSmallIcon } from "../views/icon/FuncSmallIcon";
import { MailShow } from "../views/MailShow";
import { MailView } from "../views/MailView";
import { AvatarFight } from "../views/new2/AvatarFight";
import { FightNumPlay } from "../views/new2/FightNumPlay";
import { NoticePopView, PopNoticeVo } from "../views/NoticePopView";
import { IQueryMsgData } from "../views/QueryMsgView";
import { QuickQua } from "../views/QuickSettingView";
import { RewardUseItem } from "../views/RewardGetView";
import { ENoticeType, RollingLampView } from "../views/RollingLampView";
import { IShopBuyItem, ShopBuyView } from "../views/ShopBuyView";
import { SmallTipsView } from "../views/SmallTipsView";
import { SubCDView } from "../views/SubCDView";
import { ZhengZhanView } from "../views/ZhengZhanView";
import { AdventureVo } from "../vos/AdventureVo";
import { BoxAutoVo } from "../vos/AutoBoxVo";
import { EActionEquip, EAttrType, ECellType, EChestAnimStatus, EEquipType, ERewardType, EServerFightType, EUseItemScene, EWearableType } from "../vos/ECellType";
import { EquipItemVo } from "../vos/EquipItemVo";
import { ErrorCode } from "../vos/ErrorCode";
import { HeroPackVo } from "../vos/HeroPackVo";
import { ESub_type, ItemVo } from "../vos/ItemVo";
import { MainRoleVo } from "../vos/MainRoleVo";
import { PlayerVoFactory } from "../vos/PlayerVoFactory";
import { ChestAutoPolicy, ChestPolicy, EChestOpenStatus, EOpenChest, ESetEquipDateSource, IChestAutoPolicy } from "./ChestAutoPolicy";
import { DateFactory } from "./DateFactory";
import { DiscountPackagePop } from "./DiscountPackagePop";
import { EFuncDef } from "./EFuncDef";
import { EquipmentQualityProxy, GameconfigProxy } from "./EquipmentProxy";
import { ErrCodeProxy, SuccessCodeProxy } from "./ErrCodeProxy";
import { FightNumModel } from "./FightNumModel";
import { GmTest } from "./GmTest";
import { ItemViewFactory } from "./ItemViewFactory";
import { JjzmlModel } from "./JjzmlModel";
import { MainEvent } from "./MainEvent";
import { MainUpdate } from "./MainUpdate";
import { EQuickMsg, QuickMsgVo } from "./QuickMsgVo";
import { RedEnum } from "./RedEnum";
import { RedUpdateModel } from "./RedUpdateModel";
import { TaskModel } from "./TaskModel";
import { WingModel } from "./WingModel";

export enum EServerVersion
{
    /**新服务器 */
    Version_1 = 1,
}

export enum EBuyType{
    Item = 0,//默认
    LabourShop = 1,//五一劳动节商品
    HotItem = 2,//每日热卖 批量购买
}

export enum ESellStatus{
    Start = 1,//开始出售中
    End = 2,//出售结束
}

enum ELoginCode{
    Succeed = 0,
    /**请求参数错误 */
    PARAM_ERROR = 10003,
}

export class SignStatus{
    public serverVo: SignStatus_revc;
    /*0 不可签 1可签*/
    public get signType() {
        if (!this.serverVo) {
            return 0;
        }
        return this.serverVo.val;
    }
    /**重置 */
    reset(){
        this.serverVo = null;
    }
}

export enum EMailStatus{
    /**未读 */
    notRead = 0,

    /**已读 */
    isReaded = 1,

    /**2未领取 */
    notLingqu = 2,

    /**3已领取 */
    isLingqued = 3,

    /**4已删除的邮件*/
    isDeleted = 4,
}

export enum EMailReqType{

    /**列表 */
    List = 0,

    /**领取 */
    LingQuOrRead = 1,

    /**领取 */
    Del = 2,

}

export enum EMainSkin{
    /**无主题 */
    Null = 0,
    /**战鼓 */
    Drum = 1,
    /**磕头 */
    Kotow = 2,
}
/**动作索引 */
export enum ESpineAnimIndex{
    /**磕头的动画索引 0 */
    Kotow = 0,
    /**敲鼓动画索引 1 */
    Drum = 1,
    /**敲鼓动画索引 2 */
    SmallDrum = 2
}

// 0没有章节奖励 1章节奖励未领取 2已领取（已通关）
export enum EConquestType{
    /**0没有章节奖励 */
    Zero = 0,
    /**1章节奖励未领取 可领取状态 */
    NotLingQu = 1,
    /**2已领取（已通关） */
    IsLingQu = 2,
}

/**公告选择状态 */
export class NoticePopTipSelVo{
    
    /**是否打开过公告 */
    private hasNotOpen:boolean = false;
    // private _sel:boolean = false;
    private key:number = RedEnum.NOTICE_SEL;

    /**
     * true  进入游戏今日不再提示
     * false 进入游戏今日提示
     */
    public get sel(){
        let cell:stRedDot = RedUpdateModel.Ins.getByID(this.key);
        if(cell){
            let _status:boolean = false;
            if(cell.type == 0){

            }else if(cell.type == 1){
                _status = true;
            }
            if(TimeUtil.isNotToday(cell.type)){
                //昨天的
            }else{
                _status = true;
            }
            return _status;
        }
        return false;
    }
    public reset(){
        this.hasNotOpen = false;
    }
    public set sel(v:boolean){
        let time:number = TimeUtil.serverTime;
        RedUpdateModel.Ins.save(this.key, v ? time : 0);
    }

    /**进游戏自动打开公告 */
    public autoOpen(){
        if(!this.sel && !this.hasNotOpen){
            this.hasNotOpen = true;
            let localNoticeList = MainModel.Ins.localNoticeList;
            if(localNoticeList.length >0){
                let cell = localNoticeList[0];
                /*弹出公告频率 1强弹（进入游戏时弹出）2不强弹（进入游戏时不弹出，用户点击公告按钮时弹出）*/
                if (cell.frequent == 1) {
                    MainModel.Ins.openPopNotice(localNoticeList);
                }
            }
        }
    }
}
export interface IRedNameKey{
    name:string;
    func_id:number;
}
export class MainModel extends BaseModel implements IMainModel{
    redNameKeyList:IRedNameKey[] = [];
    autoSell:boolean = false;
    private _mainUpdate:IMainUpdate = new MainUpdate();

    private static _ins: MainModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new MainModel();
        }
        return this._ins;
    }
    public oldSkin = {};
    public loginTime:number = 0;
    /**3010是否已经初始化 */
    public isInitAlready:boolean = false;
    public serverZu:number;
    public serverState:number;
    public serverID:number;
    public serverIsNew:number;
    public serverName:string;
    /**当前的战斗动画速度 */
    public fightAnimScale:number = 1.0;
    /**解锁后的packid */
    public unpackIdList:number[] = [];
    public ser_ver:string = "";
    private _sideBarStatus:number = 0;
    discountPack:DiscountPackagePop = new DiscountPackagePop();// 0.1折的每日礼包弹出逻辑
    newPay:NewPay = new NewPay();
    /**一键购买的列表 */
    easyPayList:stEasyPay[] = [];
    /**是否使用后台计算的一键购买 */
    readonly bServerEasyPay:boolean = true;
    plusplay:FightNumModel = new FightNumModel();
    /**主页皮肤样式 */
    public get skinStyle(){

        let _skinStyle1 = Laya.Utils.getQueryString("skinStyle");
        if(Laya.Browser.onPC && _skinStyle1){
            if(_skinStyle1){
                return parseInt(_skinStyle1); 
            }
        }else{
            //第一次修改 为2时客户端展示敲鼓，不为2时显示默认磕头。
            //第二次修改 cbsgTunnelOpenType 不为1时显示默认敲鼓，为1时展示磕头
            

            // cbsgTunnelOpenType 不为1时显示默认敲鼓，为1时展示磕头 有值的时候存后端，后端有值返回优先取后端值。
            if(this.gameStyle_server!=EMainSkin.Null){
                return this.gameStyle_server;
            }
            
            if(SySdk.Ins.cbsgTunnelOpenType != 1){
                return EMainSkin.Drum;
            }
            return EMainSkin.Kotow;
        }
        let _skinStyle = parseInt(System_RefreshTimeProxy.Ins.getNumberVal(71));
        if(_skinStyle){
            return _skinStyle;
        }
        return EMainSkin.Kotow;
    }

    /**默认选择的索引号 */
    public get DEFAULT_ANIM_INDEX(): number {
/*
        let index = this.defaultAnimIndex;
        if (index != -1) {
            return index;
        }

        // LogSys.LogColor("This is Get DEFAULT_ANIM_INDEX!" + this.cbsgTunnelOpenType);
        if(E.sdk.cbsgTunnelOpenType != undefined){
            let index = E.sdk.cbsgTunnelOpenType;
            // LogSys.LogColor("usd sdk anim val:"+index);
            return index;
        }
        let val:string = System_RefreshTimeProxy.Ins.getVal(25);
        // LogSys.LogColor("usd System_RefreshTimeProxy Config anim val:"+val);//默认的开箱子
        return parseInt(val);
*/
        return 0;
    }
    // private _defaultAnimIndex:number;
    // private get defaultAnimIndex(){
    //     if (this._defaultAnimIndex == undefined) {
    //         let i = System_RefreshTimeProxy.Ins.getVal(64);
    //         this._defaultAnimIndex = parseInt(i);
    //     }
    //     return this._defaultAnimIndex;
    // }


    // public effectMaxCount:number = 5;
    /**0为磕头主题，1为默认宝箱主题 */
    // public get cbsgTunnelOpenType(){
    // return E.sdk.cbsgTunnelOpenType;
    // }
    /**重置 */
    public onInitCallBack():void{
        this.easyPayList = [];
        this._sideBarStatus = 0;
        // this._paySplit = 0;
        this.newPay.reset();
        this.allLife = null;
        this.monthCard = null;
        this.newPlayerCloseRedList = [];
        this.gameStyle_server = EMainSkin.Null;
        this.redList = [];
        this.sign.reset();
        this.heroPackVo.reset();
        this.boxBoxCommitState = false;
        this.serverVer = 0;
        this.isInitAlready = false;
        this.boxOldShow = false;
        RedUpdateModel.Ins.clear();
        for(let o in this.oldSkin){
            delete(this.oldSkin[o])
        }
        for(let i = 0;i < this._drawList.length;i++){
            let cell:DrawCallNode = this._drawList[i];
            if(cell.type == DrawCallNode.TYPE_DOT){
                cell.visible = false;
            }
        }
        this.wingId = 0;
        // AvatarFactory._mainAvatar.dispose();
        // AvatarFactory._mainAvatar = null;
        this.reelCtl.visible = true;
        this.curChest = this.normalChest;
        this.quickCfg = null;
        this.bMailRed = false;
        this.pomaList = [];
        this.localNoticeList = [];
        this.noticeSel.reset();
        WingModel.Ins.type = null;
        this.boxReset();
        this.peakOpenTime = 0;
        this.animIndex = this.DEFAULT_ANIM_INDEX;
        window['onShowData'] = null;
        this.isNewRole = false;
        // LoginClient.Ins.startPlayAudio();
        E.AudioMgr.SetMusicMute(false);
        E.AudioMgr.SetSoundMute(false);
        // this.effectMaxCount = this.maxEffectCount;
        this.conquestData = null;
        this.fightAnimScale = 1.0;
        this.ser_ver = "";
        this.StopChestProxy(false);
        this.unpackIdList = [];
        let mainView:MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
        if(mainView){
            mainView.setLayerEvt(false);
            if (mainView.skin) {
                mainView.skin.setdot.visible = false;
            }

            mainView.reset();
        }
        this.exp = 0;
        this.lv = 0;
        
        // if(TaskProxy._ins){
            // TaskProxy._ins.dispose();
            // TaskProxy._ins = null;
        // }
        if(this.getView()){
            this.mainView.gj && this.mainView.gj.onExit();
            this.mainView.avatarFight && this.mainView.avatarFight.onExit();
        }
    }

    public getGameClubData() {
        if (!TaskModel.Ins.isFuncOpen(EFuncDef.YouXiQuan, false)) return;
        // 游戏圈数据
        E.sdk.getGameClubData((res) => {
            if (res) {
                // 游戏圈授权成功
                const d = JSON.parse(res);
                const dataList = d?.data?.dataList;
                if (dataList && dataList.length) {
                    let gameClubData = ActivityModel.Ins.gameClubData;
                    const m: Map<number, 'join' | 'like' | 'publish'> = new Map([
                        [1, 'join'], [4, 'like'], [6, 'publish'],
                    ]);
                    let isRed = false;
                    dataList.forEach((element, i) => {
                        const key = m.get(element.dataType.type);
                        gameClubData[key] = element.value;
                        // 红点
                        const fid = i + 1;
                        const conf = System_CommunityProxy.Ins.getCfgById(fid);
                        const revcData = MainModel.Ins.clubReward?.dataList?.find(o => o.id === fid);
                        if (revcData?.state !== 1 && gameClubData[key] >= conf?.f_taskvalue) {
                            isRed = true;
                        }
                    });
                    if (isRed) {
                        MainModel.Ins.yxqRed = true;
                        // MainModel.Ins.event(MainEvent.YXQRed);
                        this.updateYXQ_red();
                        //MainModel.Ins.event(MainEvent.GameClubUpdate);
                    }
                    ActivityModel.Ins.gameClubData = gameClubData;
                    ActivityModel.Ins.gameClubAuth = true;
                    MainModel.Ins.event(MainEvent.GameClubUpdate);
                }
            } else {
                // 游戏圈授权异常
                ActivityModel.Ins.gameClubAuth = false;
                MainModel.Ins.event(MainEvent.GameClubUpdate);
            }
        });
    }

    // private get maxEffectCount(): number {
    //     let val = System_RefreshTimeProxy.Ins.getVal(27);
    //     return parseInt(val);
    // }
    private _drawList:DrawCallNode[] = [];

    public taLBId:number[] = [3,4,13,11,12];

    public mSellStatus:ESellStatus = ESellStatus.End;

    public quickMsgList:QuickMsgVo[] = [];

    // public mLock:boolean = false;

    //是否在售卖中
    // public isSelling:boolean = false;
    //是否开始装备中
    // private _isStartEquip:boolean = false;

    // private quaListData: IListData[];

    /**跨天需要的时间秒 */
    private _crossDayTicket:number;
    //装备数据
    private equipList: EquipItemVo[] = [];
    private redList:number[] = [];
    private normalChest:IChestAutoPolicy = new ChestPolicy();//默认抽宝箱
    private autoChest:IChestAutoPolicy = new ChestAutoPolicy();//委托抽宝箱
    private _windId:number = 0;
    private _mSellList:string[] = [];//正在出售的装备
    private _mEquipList:string[] = [];//正在穿戴的装备
    public curChest:IChestAutoPolicy = this.normalChest;
    public reelCtl:ReelAnimCtl = new ReelAnimCtl();
    public reelEffect:SpineEffectCtl;
    public tsTween:Laya.Tween;
    public tsList:any[];
    // public dailyDayTime:number = 0;
    // public gamejsonData:IGameJson = {} as IGameJson;
    /**是否是新角色 */
    public isNewRole:boolean = false;
    /**
     * 动画需要播放的时间(毫秒)
     */
    public animUseMs:number = 0;
    /**邮件是否有红点 */
    public bMailRed:boolean = false;
    /**游戏圈是否有红点 */
    public yxqRed:boolean = false;
    /**邮件列表 */
    public mailList:stMail[] = [];
    /**跑马灯列表 */
    public pomaList:stNotice[] = [];
    /**游戏内部公告 */
    public localNoticeList:stNotice[] = [];
    public noticeSel:NoticePopTipSelVo = new NoticePopTipSelVo();
    public paomaGobalPos:Laya.Point;
    public boxAuto:BoxAuto_revc = new BoxAuto_revc();
    public peakOpenTime:number = 0;
    public fightCMD:string;
    /**服务器版本 */
    public serverVer:number = 0;
    // private _areaStatus:any = {};
    // private _areaSer:NewArena_revc;
    private _animSettingList:AnimSetting[];
    public authBtnShow: number = 0;
    public get animSettingList(){
        if(!this._animSettingList){
            this._animSettingList = [];
            this._animSettingList.push(new AnimSetting("remote/shezhi/tyjy.png","o/spine/boxkt/boxkt","remote/main/main/zy_bg2.jpg",ESpineAnimIndex.Kotow));//磕头
            // this._animSettingList.push(new AnimSetting("remote/shezhi/bx.png","o/spine/box2/box","remote/main/main/bgzy.png",1));       //宝箱
            this._animSettingList.push(new AnimSetting("remote/shezhi/bx.png","o/spine/boxgulv13/boxgulv13","remote/main/main/bgzy.png",ESpineAnimIndex.Drum));       //敲鼓
            this._animSettingList.push(new AnimSetting("remote/shezhi/bx.png","o/spine/boxgulv14/boxgulv14","remote/main/main/bgzy.png",ESpineAnimIndex.SmallDrum));       //敲鼓

        
            // D:\project1\Client\trunk\resource\o\spine\boxgulv13
        }
        return this._animSettingList;
    }
    /**0磕头 1宝箱 默认动画选择的索引 */
    public animIndex:number = 0;
    // public monthTest:boolean;

    /**
     * 点击的时间戳(毫秒)
     */
    public clickTimeMs:number = 0;
    public gymCardVo:GymPack_revc;
    /**英雄卡 */
    public heroPackVo:HeroPackVo = new HeroPackVo();
    public monthCard:MonthCard_revc;
    public teQuanKaCard:AdFreeCard_revc;
    public dailyShopWeekCard:DailyShopWeekCard_revc;
    /**签到 */
    public sign:SignStatus = new SignStatus();
    /**年卡是否有效 */
    public allLife:AllLifeCard_revc;
    public boxOldShow:boolean = false;
    /**委托是否开启 */
    public boxBoxCommitState:boolean = false;
    /**每日分享、添加到桌面 */
    public shareReward: ShareReward_revc;
    /**宝箱额外开出的内容 */
    public boxExtra: BoxExtraItemInit_revc;
    public clubReward: ClubReward_revc;
    /**
     * 月卡是否有权限
     */
    public get isMonthCanUsed(){
        if(!this.monthCard || this.monthCard && this.monthCard.val == ECardLingqu.Nothing){
            return false;
        }
        return true
    }
    // public _timeTicket:number = 0;

    public showLoading(){
        /*
        E.ViewMgr.ShowLoading(this._timeTicket);
        if(this._timeTicket >= 0.8){
            this._timeTicket = 0.8;
            E.ViewMgr.UpdateLoading(this._timeTicket);
            Laya.timer.clear(this,this.showLoading);
            
            this.enterGame();

        }else{
            this._timeTicket+=0.1;
            // console.log(Math.random()+">>>>>>>>>>>>>>>>"+this._timeTicket);
            E.ViewMgr.UpdateLoading(this._timeTicket);
            Laya.timer.once(10,this,this.showLoading);
        }
        */

        let vo = new LoadingVo();
        vo.start = 0;
        vo.end = 0.75;
        vo.duration = 200;
        vo.callBack = new Laya.Handler(this, this.loadEnd);
        E.ViewMgr.loading(vo);
    }



    private loadEnd(){
        this.enterGame();
        let vo = new LoadingVo();
        vo.start = 0.75;
        vo.end = 1;
        vo.duration = 20000;
        // vo.callBack = new Laya.Handler(this, this.enterGame);
        E.ViewMgr.loading(vo);
    }

    private enterGame(){
        MainModel.Ins.connectRegist();
        E.taLoginTrack("clickStartGame");
        MainModel.Ins.loginTime = Laya.timer.currTimer;
    }

    /**年卡是否有效 */
    public get isYearCanUsed(){
        if(!this.allLife || this.allLife && this.allLife.val == ECardLingqu.Nothing){
            return false;
        }
        return true
    }

    public clearUI(){
        E.ViewMgr.Close(EViewType.Equip_switch);
        E.ViewMgr.Close(EViewType.EquipUpdate);
    }

    public setItem(icon:Laya.Image,tf:Laya.Label,id:number){
        icon.skin=IconUtils.getIconByCfgId(id);
        tf.text = StringUtil.val2m(this.mRoleData.getVal(id));
    }

    /**是否有邮件可以领取 */
    public get hasMailCanLingqu(){
        if(this.mailList.length<=0){
            return false;
        }
        for(let i = 0;i < this.mailList.length;i++){
            let cell = this.mailList[i];
            if(cell.state == EMailStatus.notLingqu){
                return true;
            }
        }
        return false;
    }

    private boxReset(){
        this.boxAuto.open = 0;
        this.boxAuto.rate = 1;
        this.boxAutoVo.reset();
    }

    public getEquipList(){
        return this.equipList;
    }

    /**是否是提审状态 */
    public get verify(): boolean {
        let ts = HrefUtils.getVal("ts");
        if(ts == 0){
            return false;
        }
        if(typeof initConfig.debug_ts != "undefined")   return initConfig.debug_ts;

        if(initConfig.platform == PlatformConfig.MEITUAN){
            return false;//美团强制非提审状态
        }

        if(InitConfig.wxLoginResult){
            let result = InitConfig.wxLoginResult.result;

            if (result.audit == 1 || ts == 1) {
                return true;
            }
            // return this.gamejsonData.ts == "1";
        }
    }
    /**获取到主角的幻化后的皮肤 */
    public getIdByStyle(type:EEquipType) {
        let l:EquipItemVo[] = this.equipList;
        // let vo = l.find(item=>item.equipVo.wearable == EWearableType.Wearable &&  item.equipVo.type == type);

        let vo;
        //搜索装备的样式
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.equipVo.type == type){
                if(cell.equipVo.wearable == EWearableType.Wearable){
                    vo = cell;
                    break;
                }
            }
        }

        let equipStyle = vo ? vo.equipVo.equipStyle : 0;
        let val:number = HuanZhuangModel.Ins.getEquipStyle(type);
        if(val){
            //非0 说明 是幻化过的形象,0说明用的是原来的旧的形象
            return val;
        }
        if(type == EEquipType.ZuoQi){
            return ZuoQiModel.Ins.rideVo.rideId;
        }
        else if(type == EEquipType.Wing){
            return this.wingId;
        }
        return equipStyle;
    }

    public isAutoSelect(type:EQuickMsg){
        let cell =this.quickMsgList.find(item=>item.type == type);
        if(cell){
            return cell.selected;
        }
        return false;
    }

    // /**主角的imageid */
    // public get imageID(){
    //     if(initConfig.platform  == PlatformConfig.War3){
    //         // return 2;
    //         return War3Config.MainImageId;
    //     }
    //     return 0;
    // }
    
    /*
        随机外观ID
    */
    public get randomImageID(){
        if(initConfig.platform  == PlatformConfig.War3){
            // return Math.floor(Math.random()  * 3) + 1;
            
            let arr = [War3Config.MainImageId,War3Config.MonsterImageId];
            return arr[Math.floor(Math.random() * 2)];
        }
        return 0;
    }

    /**主角的翅膀形象id */
    public get wingId(){
        let style:number =  HuanZhuangModel.Ins.getEquipStyle(EEquipType.Wing);
        if(style){
            return style;
        }
        return this._windId;
    }

    public set wingId(v:number){
        this._windId = v;
        this.event(MainEvent.UpdateWingId);
    }
    /**
     * 主角数据
     */
    public mRoleData: MainRoleVo = new MainRoleVo();
    public get mPlayinfo():stPlayerBaseInfo{
        return this.mRoleData.mBaseInfo;
    }

    /**托管的品质配置 null的时候停止托管的状态*/
    public quickCfg:QuickQua = null;
    public boxAutoVo:BoxAutoVo = new BoxAutoVo();
    public adventureVo:AdventureVo = new AdventureVo()

    public timeCtl:TimeCheckCtl;

    public adventureBossData:Adventure_Boss_revc;
    private _showAttrType:EAttrType[];
    private gameStyle_server:EMainSkin = EMainSkin.Null;
    /**升级按钮显示中,可以点击的时候 */
    public hasLvUpBtnRed:boolean = false;

    /**
     * 签到红点
     */
    // public mSignRed:boolean = false;
    public get showAttrType():EAttrType[]{
        if(!this._showAttrType){
            this._showAttrType = PlayerVoFactory.initShowAttr();
        }
        return this._showAttrType;
    }

    /**宝箱使用了多少次 */
    public boxUsedCount:number = 0;
    public conquestData:Conquest_revc;
    public lv:number = 0;
    public exp:number = 0;
    public petFusion:PetFusionBaoDi_revc;
    /**道具不满足模块 */
    public notEnough:NotEnhoughModel = new NotEnhoughModel();
    constructor() {
        super();
        window['main'] = this;

        this.adventureBossData = new Adventure_Boss_revc();
        this.adventureBossData.cnt = 0;
        this.adventureBossData.f_id = 0;
        new GmTest();
    }

    /**是否有野外的扫荡 */
    public get hasFreeYeWaiRed(){
        let cfg: Configs.t_Adventure_Boss_dat = AdventureBossProxy.Ins.GetDataById(this.adventureBossData.f_id);
        if (cfg) {
            let arr = cfg.f_RaidsPrice.split("|");
            let itemStr = arr[this.adventureBossData.cnt];
            if (itemStr) {
                let _itemVo: ItemVo = ItemViewFactory.convertItemList(itemStr)[0];
                if (_itemVo.count == 0) {
                    return true;
                }
            }
        }
        return false;
    }

    public yewaiRed() {
        // if (TaskModel.Ins.isFuncOpen(EFuncDef.YeWaiBoss)) {
        //     if (this.hasFreeYeWaiRed) {
        //         DotManager.addMainDot("btn2", -15, -20);
        //     } else {
        //         DotManager.remMainDot("btn2");
        //     }
        // }

        let v = false;
        if(this.mYewaiBossRed || WuShenDianModel.Ins.isRedTip()){
            // DotManager.addMainDot("btn2", -15, -20);
            v = true;
        }else{
            // DotManager.remMainDot("btn2");
        }
        MainModel.Ins.funcSetRed(EFuncDef.YeWaiBoss,v);
    }

    public get mYewaiBossRed(){
        return TaskModel.Ins.isFuncOpen(EFuncDef.YeWaiBoss) && this.hasFreeYeWaiRed;
    }

    public refreshRed() {
        this.yewaiRed();
        this.chestLvUpRed();
        this.updateBoxOpenRed();
    }
    updateRed(){
        this.refreshRed();

        if(this.mainView){
            this.mainView.onMailRedEvt();
        }
        if(this.isVipKFRedTip()){
            MainModel.Ins.funcSetRed(EFuncDef.CJKF,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.CJKF,false);
        }
    }
    /**
     * 获取主角的ItemVo
     */
    public getItemVo(itemId: number) {
        let count = this.mRoleData.getVal(itemId);
        let _itemVo = new ItemVo();
        _itemVo.cfgId = itemId;
        _itemVo.count = count;
        return _itemVo;
    }

    /**获取未穿戴的装备*/
    public get equipNotWeared(){
        for(let i = 0;i < this.equipList.length;i++){
            let _equipVo:EquipItemVo = this.equipList[i];
            if(_equipVo.equipVo.wearable == EWearableType.Not){
                return _equipVo;
            }
        }
        return null;
    }

    public initMsg(){
        this.Reg(new ShopBuyView(EViewType.ShopBuy));
        this.Reg(new GZHView(EViewType.GZHVIEW));
        this.Reg(new CJKEView(EViewType.CjkfView));
        this.Reg(new SubCDView(EViewType.SubCDView));
        this.Reg(new GuangGaoView(EViewType.GuangGaoView));
        this.Reg(new MailView(EViewType.Mail));
        this.Reg(new MailShow(EViewType.MailShow));
        this.Reg(new RollingLampView(EViewType.RollingLamp,ELayerType.alertLayer));
        this.Reg(new NoticePopView(EViewType.NoticePop,ELayerType.subFrameLayer));
        this.Reg(new HighChestAutoSettingView(EViewType.HighAutoChest));
        this.Reg(new ZuoqiTipsShop(EViewType.RideBuyTips));
        this.Reg(new BoxSetAnimView(EViewType.BoxAnimSet));
        this.Reg(new JuBaoPengView(EViewType.JuBaoPeng));
        this.Reg(new ZhengZhanView(EViewType.ZhengZhan));
        this.Reg(new GameGroupView(EViewType.GameGroup));
        this.Reg(new ExchangeView(EViewType.ExchangeCode));
        this.Reg(new UnLockView(EViewType.UnlockEquip,ELayerType.subFrameLayer));
        this.Reg(new ScoreJjcJieSuanView(EViewType.ScoreJjcJieSuan,ELayerType.subFrameLayer));
        this.Reg(new ItemNotEnoughView(EViewType.ItemNotEnough));
        this.Reg(new FightNumPlay(EViewType.FightNumPlay,ELayerType.alertLayer));

        E.MsgMgr.AddMsg(MSGID.PlayerLevel, this.onLevel,this);
        E.MsgMgr.AddMsg(MSGID.PlayerCurExp, this.onExp,this);

        E.MsgMgr.AddMsg(MSGID.ExchangeEquipRevc, this.onExchangeEquipRevc,this);
        E.MsgMgr.AddMsg(MSGID.EquipChangeRevc,this.onEquipChangeRevc,this);
        E.MsgMgr.AddMsg(MSGID.ValChanelRevc,this.onValChanelRevc,this);
        E.MsgMgr.AddMsg(MSGID.InitRevc,this.onInitRevc,this);
        E.MsgMgr.AddMsg(MSGID.ChestInfoUpdateRevc,this.onChestInfoUpdate,this);
        E.MsgMgr.AddMsg(MSGID.ChestUpLevelRevc,this.onChestUpLevelRevc,this);
        E.MsgMgr.AddMsg(MSGID.ItemDelRevc,this.onItemDelRevc,this);
        E.MsgMgr.AddMsg(MSGID.ErrCode,this.onErrCodeRevc,this);
        E.MsgMgr.AddMsg(MSGID.SellRevc,this.onSellRevc,this);
        E.MsgMgr.AddMsg(MSGID.SellEquipFinish,this.onSellEquipFinishRevc,this);
        E.MsgMgr.AddMsg(MSGID.FightRevc,this.onFightRevc,this);
        E.MsgMgr.AddMsg(MSGID.DebugFightValRevc,this.onDebugFightValRevc,this);
        E.MsgMgr.AddMsg(MSGID.AdventureRevc,this.onAdventureRevc,this);
        E.MsgMgr.AddMsg(MSGID.RewardRevc,this.onRewardRevc,this);
        E.MsgMgr.AddMsg(MSGID.TaskRevc,TaskModel.Ins.onTaskRevc,TaskModel.Ins);
        E.MsgMgr.AddMsg(MSGID.Adventure_Boss,this.onAdventure_Boss,this);
        E.MsgMgr.AddMsg(MSGID.WearedWingDataRevc,WingModel.Ins.onWearedWingDataRevc,WingModel.Ins);
        E.MsgMgr.AddMsg(MSGID.WingListRevc,WingModel.Ins.onWingListRevc,WingModel.Ins);
        E.MsgMgr.AddMsg(MSGID.WingTreasureStageRevc,WingModel.Ins.onWingTreasureRevc,WingModel.Ins);
        E.MsgMgr.AddMsg(MSGID.WatchPlayerInfoRevc,this.onWatchPlayerInfoRevc,this);
        E.MsgMgr.AddMsg(MSGID.ShopBoughtItemsRevc,ShopModel.Ins.onShopBoughtItemsRevc, ShopModel.Ins);
        E.MsgMgr.AddMsg(MSGID.BoxUsedCountRevc,this.onBoxUsedCountRevc, this);
        E.MsgMgr.AddMsg(MSGID.Success,this.onSuccessCodeRevc,this);
        E.MsgMgr.AddMsg(MSGID.ConfigHashRevc,this.onConfigHashRevc,this);
        E.MsgMgr.AddMsg(MSGID.ServerVersion,this.onServerVersionRevc,this);
        E.MsgMgr.AddMsg(MSGID.RedDotUpdateOtpRevc,this.onRedDotUpdateOtpRevc,this);
        E.MsgMgr.AddMsg(MSGID.JjcRankDrop,this.onJjcRankDrop,this);   
        E.MsgMgr.AddMsg(MSGID.SignStatus,this.onSignStatus,this);
        // this.on(MainEvent.MainViewLayerChange,this,this.onLayerChange);
        // this.on(MainEvent.ButtonCtlClick,this,this.onClickEvt);
        E.MsgMgr.AddMsg(MSGID.GymPack,this.onGymPack,this);   
        E.MsgMgr.AddMsg(MSGID.MonthCard,this.onMonthCard,this);
        E.MsgMgr.AddMsg(MSGID.AdFreeCard,this.AdFreeCard,this);
        E.MsgMgr.AddMsg(MSGID.AllLifeCard,this.onAllLifeCard,this);
        E.MsgMgr.AddMsg(MSGID.MailRed,this.onMailRed,this);
        E.MsgMgr.AddMsg(MSGID.MailList,this.onMailList,this);
        E.MsgMgr.AddMsg(MSGID.NoticeList,this.onNoticeList,this);
        E.MsgMgr.AddMsg(MSGID.BoxAuto,this.onBoxAuto,this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcOpenUnix,this.onPeakJjcOpenUnix,this);
        E.MsgMgr.AddMsg(MSGID.JjcRewardPreview,this.onJjcRewardPreview,this);
        E.MsgMgr.AddMsg(MSGID.GetServerTimeMS,this.onGetServerTimeMS,this);
        E.MsgMgr.AddMsg(MSGID.Conquest,this.onConquest,this);
        E.MsgMgr.AddMsg(MSGID.GrowPackUnlock,this.onGrowPackUnlock,this);
        E.MsgMgr.AddMsg(MSGID.NewArena,this.onNewArena,this);
        E.MsgMgr.AddMsg(MSGID.PetFusionBaoDi,this.onPetFusionBaoDi,this);
        E.MsgMgr.AddMsg(MSGID.BoxCommitState,this.onBoxCommitState,this);
        E.MsgMgr.AddMsg(MSGID.ShareReward,this.onShareReward,this);
        E.MsgMgr.AddMsg(MSGID.BoxExtraItemInit,this.onBoxExtraItemInit,this);
        E.MsgMgr.AddMsg(MSGID.BoxExtraItemChange,this.BoxExtraItemChange,this);
        E.MsgMgr.AddMsg(MSGID.ClubReward,this.onClubReward,this);
        E.MsgMgr.AddMsg(MSGID.DailyShopWeekCard,this.DailyShopWeekCard,this);
        E.MsgMgr.AddMsg(MSGID.WxAuthInfo,this.onWxAuthInfo,this);
        E.MsgMgr.AddMsg(MSGID.GameStyle,this.onGameStyle,this);
        E.MsgMgr.AddMsg(MSGID.SideBarReward,this.onSideBarReward,this);
        E.MsgMgr.AddMsg(MSGID.FirstPaySplit,this.onFirstPaySplit,this);
        E.MsgMgr.AddMsg(MSGID.EasyPayList, this.onEasyPayList, this);
    }
    /**一键的总价 */
    getEasyPayMoneyVal(pp:Configs.t_Purchase_Price_dat) {
        let easyCfgList: Configs.t_Purchase_EasyPay_dat[] = t_Purchase_EasyPay.Ins.List;
        let eCell = easyCfgList.find(o => o.f_Purchase == pp.f_id);
        let v: number = 0;
        if (this.bServerEasyPay && eCell) {
            let l = this.easyPayList;
            let cell = l.find(o => o.id == eCell.f_id);
            if (cell) {
                let rl = cell.dataList;
                for (let i = 0; i < rl.length; i++) {
                    let pid = rl[i];
                    let cfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(pid);
                    if (cfg) {
                        v += ShopProxy.Ins.convertMoney(cfg);
                    }
                }
                v = parseFloat(v.toFixed(2));
            }
        }else{
            v = ShopProxy.Ins.convertMoney(pp);
        }
        return v;
    }
    /**一键购买更新 */
    private onEasyPayList(revc:EasyPayList_revc){
        let oldList = this.easyPayList;
        let l = revc.dataList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            let findCell = oldList.find(o=>o.id == cell.id);
            if(findCell){
                findCell.dataList = cell.dataList;
            }else{
                oldList.push(cell);
            }
        }
        this.event(MainEvent.OneClickPurchase);
    }

    /**战斗最大速度 */
    get maxFightSpeed(){
        let v:number = 2;
        let n = VipModel.Ins.getVipTQByType(VipType.Fight);
        if(n!=-1){
            v = n;
        }
        return v;
    }
    private onFirstPaySplit(revc:FirstPaySplit_revc){
        this.newPay.paySplit = revc.flag;
    }

    /**侧边栏数据 */
    private onSideBarReward(revc:SideBarReward_revc){
        this._sideBarStatus = revc.state;
        this.event(MainEvent.EventMainUpdateView);
    }
    /**侧边栏是否可以领取 */
    get canBarStatusLingQu(){
        if(initConfig.platform == PlatformConfig.DOU_YIN){
            return this._sideBarStatus == 1;
        }
    }
    private onGameStyle(revc:GameStyle_revc){
        this.gameStyle_server = revc.type;
    }
    private onWxAuthInfo(revc: WxAuthInfo_revc) {
        this.authBtnShow = revc.show;
        if(initConfig.debug_authBtnShow){
            this.authBtnShow = 1;
        }
        this.event(MainEvent.AuthBtnChange);
    }
    private onClubReward(revc: ClubReward_revc) {
        this.clubReward = revc;
        this.event(MainEvent.ClubReward);
        this.yxqRed = revc.dataList.find(o => o.state === 2) ? true : false;
        this.updateYXQ_red();
    }

    private updateYXQ_red(){
        this.funcSetRed(EFuncDef.GameCirle,this.yxqRed);
        this.event(MainEvent.YXQRed);
    }

    private BoxExtraItemChange(revc: BoxExtraItemChange_revc) {
        this.boxExtra = revc;
        this.event(MainEvent.BoxExtraChange);
    }
    private onBoxExtraItemInit(revc: BoxExtraItemInit_revc) {
        this.boxExtra = revc;
    }
    private onShareReward(revc:ShareReward_revc) {
        this.shareReward = revc;
        this.event(MainEvent.ShareReward);
    }
    private onBoxCommitState(revc:BoxCommitState_revc){
        this.boxBoxCommitState = revc.state == 1;
    }
    private onPetFusionBaoDi(revc:PetFusionBaoDi_revc){
        // console.log(revc);
        this.petFusion = revc;
        this.event(MainEvent.EventPetFusionBaoDi);
    }

    public getLvByQuaPet(qua:number){
        if(this.petFusion){
            let l = this.petFusion.dataList;
            for(let i = 0;i < l.length;i++){
                let cell = l[i];
                if(cell.quality == qua){
                    return cell.baoDi;
                }
            }
        }
        return null;
    }

    private onNewArena(revc:NewServer_revc){
        // this._areaSer = revc;
        // this._areaStatus[revc.type] = revc.isNew;
        this.serverVer = revc.isNew;
        console.log("serverVer:" + this.serverVer + " " + this.tabelSuffix);
        YinDaoTaskProxy.Ins.rebuild();
        t_Item_Guide.Ins.rebuild();
    }

    /**
     * "" 或者_v1
     */
    public get tabelSuffix(){
        return this.serverVer == 0 ? "" : `_v${this.serverVer}`;
    }

    /**是否显示积分 */
    public getIsShowScore(funid:EFuncDef){
        if(funid == EFuncDef.Jjc){
            return this.serverVer == EServerVersion.Version_1;
        } 
        return false;
    }
    // public get serverVer(){
    //     if(this._areaSer){
    //         return this._areaSer.isNew;
    //     }
    //     return 0;
    // }
    private onLevel(revc:PlayerLevel_revc){
        this.oldLv = this.mRoleData.lv;
        this.lv = revc.level;
        this.event(MainEvent.Level);
    
        if (this.isInitAlready) {
            let nowLv = this.mRoleData.lv;
            if (this.oldLv != nowLv) {
                let _mainUpdate = this.getView();
                if (_mainUpdate) {
                    _mainUpdate.playLevelUp();
                    E.sdk.valChange(ESdkValChange.LevelUp, nowLv);
                    this.openLvPop(nowLv);
                }
            }
        }
    }

    /**等级到了强弹窗口 */
    private openLvPop(nowLv:number){
        let lvstr:string = System_RefreshTimeProxy.Ins.getNumberVal(96);
        if(!StringUtil.IsNullOrEmpty(lvstr)){
            let arr = lvstr.split("|");
            let aIndex: number = arr.indexOf(nowLv + "");
            if (aIndex != -1) {
                if (E.ViewMgr.isOpenReg(EViewType.FightMain)) {

                } else {
                    let vo = ActivityModel.Ins.getVo(this.newPay.activityType);
                    if (vo) {
                        let _cfgId = vo.getNewPlayerCfgId();
                        let isMax: boolean = false;
                        if (_cfgId == 0) {
                            isMax = true;
                        }
                        else {
                            E.ViewMgr.Open(EViewType.NewPlayPackage);
                        }
                    }
                }
            }
        }
    }

    private onExp(revc:PlayerCurExp_revc){
        this.exp = revc.curLevelExp;
        this.event(MainEvent.Exp);
    }

    private onGrowPackUnlock(revc: GrowPackUnlock_revc) {
        let l = revc.dataList;
        for (let i = 0; i < l.length; i++) {
            let id = l[i];
            let index = this.unpackIdList.indexOf(id);
            if (index == -1) {
                this.unpackIdList.push(id);
            }
        }
        this.event(MainEvent.GrowPackUnlock);
    }

    private onConquest(revc:Conquest_revc){
        this.conquestData = revc;
        this.event(MainEvent.ConquestUpdate);
    }

    /**征战是否开启 */
    public get isConquestOpen(){
        return this.conquestData!=null;
    }

    private onGetServerTimeMS(revc:GetServerTimeMS_revc){
        if(Laya.Utils.getQueryString("clienttime")){
            return;
        }
        TimeUtil.serverTimeV = revc.serverTime;
    }

    private onJjcRewardPreview(revc:JjcRewardPreview_revc){
        getJjcModel(revc.type).preRewardList = revc.rewardList;
    }
    private onPeakJjcOpenUnix(revc:PeakJjcOpenUnix_revc){
        this.peakOpenTime = revc.time;
    }

    private onBoxAuto(revc:BoxAuto_revc){
        if (MainModel.Ins.isInitAlready && revc.open && (revc.rate > this.boxAuto.rate)) {
            let view:MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
            view.skin.setdot.visible = true;
        }
        this.boxAuto = revc;
    }

    /**内部公告 */
    public openPopNotice(cellList:stNotice[]){
        if(cellList.length <= 0){
            E.ViewMgr.ShowMidError("没有公告数据,请后台配置!");
            return;
        }
     
        let result = new PopNoticeVo();
        result.dataList = cellList;
        result.noticeSel = this.noticeSel;
        E.ViewMgr.Open(EViewType.NoticePop, null, result);
    }

    /**开服公告 */
    public openServerNotice(title:string,content:string){
        let result = new PopNoticeVo();
        let cell:stNotice = new stNotice();
        cell.content = content;
        cell.title = title;
        result.dataList = [];
        result.dataList.push(cell);
        E.ViewMgr.Open(EViewType.NoticePop,null,result);
    }

    /**跑马灯 */
    public onNoticeList(revc:NoticeList_revc){
        this.pushNotice(revc);
    }

    public pushNotice(revc:NoticeList_revc){
        for(let i = 0;i < revc.datalist.length;i++){
            let cell = revc.datalist[i];
            if(cell.type == ENoticeType.PaoMaLight || cell.type == ENoticeType.GameRolling){
                this.pomaList.push(cell);
            }else if(cell.type == ENoticeType.Notice){
                this.localNoticeList.push(cell);
            }
        }
        this.playPaoMaLight();
    }

    /**播放跑马灯 */
    public playPaoMaLight(){
        if(this.pomaList.length > 0 ){
            if(this.paomaGobalPos){
                E.ViewMgr.Open(EViewType.RollingLamp);
            }
        }
    }


    private onMailRed(revc:MailRed_revc){
       this.setMailRed(revc.red == 1);
    }

    public setMailRed(v:boolean)
    {
        this.bMailRed = v;
        // LogSys.Log(`邮件红点`+this.bMailRed);
        this.event(MainEvent.MailRed);
    }

    
    private onMailList(revc:MailList_revc){
        this.mailList = revc.datalist;
        this.event(MainEvent.MailListUpdate);
    }

    /**月卡 */
    private onMonthCard(revc:MonthCard_revc){
        this.monthCard = revc;
        this.event(MainEvent.MonthUpdate);
        ActivityModel.Ins.updatePackage();
    }

    //特权卡
    private AdFreeCard(value:AdFreeCard_revc){
        this.teQuanKaCard = value;
        this.event(MainEvent.Updata_TeQuanKa);
        ActivityModel.Ins.updatePackage();
    }

    //折扣商店周卡信息
    private DailyShopWeekCard(value:DailyShopWeekCard_revc){
        this.dailyShopWeekCard = value;
        this.event(MainEvent.DailyShopWeekCard_Card);
        ActivityModel.Ins.updatePackage();
    }

    public getZKWCNum(id:number){
        for(let i:number=0;i<this.dailyShopWeekCard.dataList.length;i++){
            if(this.dailyShopWeekCard.dataList[i].id == id){
                return this.dailyShopWeekCard.dataList[i].subday;
            }
        }
        return 0;
    }

    public isZKWCRedTip(){
        if(this.getZKWCNum(1)){
            let data = ActivityModel.Ins.getVo(EActivityType.ZKShopWeek);
            if(data && data.vo && data.vo.datalist){
                if(data.vo.datalist[0].param1 == 2){
                    return true;
                }
            }
        }
        return false;
    }

    /**周卡 */
    private onAllLifeCard(revc:AllLifeCard_revc){
        this.allLife = revc;
        this.event(MainEvent.AllLifeUpdate);
        ActivityModel.Ins.updatePackage();
    }
    private onGymPack(revc:GymPack_revc){
        this.gymCardVo = revc;
        this.event(MainEvent.GymCardUpdate);
    }

    /**签到状态 */
    private onSignStatus(revc:SignStatus_revc):void{
        this.sign.serverVo = revc;
        this.refreshSignRed(revc.isNew,revc.val == 1);
        this.event(MainEvent.SignStatus);
    }

    private refreshSignRed(isNew:number,v:boolean){
        if(isNew){
            this.funcSetRed(EFuncDef.SignInNew,v);
        }else{
            this.funcSetRed(EFuncDef.SignIn,v);
        }
    }

    private delRed(fid:number){
        for(let i = 0;i < this.redList.length;i++){
            let cell = this.redList[i];
            if(fid == cell){
                this.redList.splice(i,1);
                i--;
            }
        }
    }
    public cfgByPos(pos: number) {
        let cfg = MainIconProxy.Ins.getCfgByPosition(pos);
        if (cfg) {
            let isOpen = TaskModel.Ins.isFuncOpen(parseInt(cfg.f_funid));
            if (isOpen) {
                isOpen = this.isOpenByFuncId(cfg.f_funid);
            }
            if (isOpen) {
                return cfg;
            }
        }
/*
        let l = this.posListIcon;
        for(let i = 0;i < l.length;i++){
            let icon = l[i];
            if(icon.pos == pos){
                return icon;
            }
        }
*/
    }

    public isOpenAllByFuncid(f_funid:string){
        let isOpen = TaskModel.Ins.isFuncOpen(parseInt(f_funid));
        if (isOpen) {
            isOpen = this.isOpenByFuncId(f_funid);
        }
        return isOpen;
    }
    // private isOpenByFuncid(funcId:number){
    //     let isOpen = TaskModel.Ins.isFuncOpen(funcId);
    //     if(isOpen){
    //         isOpen = MainModel.Ins.isOpenByFuncId(funcId.toString());
    //     }
    //     return isOpen;
    // }
    /**子功能是否都开放了 */
    public isSubOpen(cfg: Configs.t_MainIcon_dat){
        if(cfg.f_ui_id){
            let _checkSubFuncList = MainIconProxy.Ins.getFuncListByF_ui_id(cfg.f_ui_id);
            if(_checkSubFuncList.length){
                let isOpen:boolean = false;
                for(let i = 0;i< _checkSubFuncList.length;i++){
                    let funid = _checkSubFuncList[i];
                    if(this.isOpenAllByFuncid(funid.toString())){
                        isOpen = true;
                        break;
                    }
                }
                return isOpen;
            }
        }
        return true;
    }

    /**设置红点 */
    public funcSetRed(fid:number,v:boolean){
        let cfg = FuncProxy.Ins.getCfgByFid(fid)
        if(!cfg){
            LogSys.Error(`not find funId:${fid}`);
            return;
        }
        if(v && cfg.f_close){
            v = false;
        }

        let status:boolean = false;
        // let mainCfg:Configs.t_MainIcon_dat = MainIconProxy.Ins.getCfgByFuncid(fid);
        
        if(v){
            let index:number = this.redList.indexOf(fid);
            if(index == -1){
                this.redList.push(fid);
                status = true;
            }
        }else{
            let index:number = this.redList.indexOf(fid);
            if(index != -1){
                // this.redList.splice(index,1);
                this.delRed(fid);
                status = true;
            }
        }
        if(E.ViewMgr.isOpenReg(EViewType.FightMain)){
            return;
        }
        this.event(MainEvent.FuncSmallIconUpdate);
    }

    public getHasRed(fid:number){
        return this.redList.indexOf(fid)!=-1;
    }

    private onJjcRankDrop(revc:JjcRankDrop_revc){
        LogSys.Log("rank ch ange:"+revc.rank);
        this.jjcRankDrop();
    }

    public jjcRankDrop(){
        JjcModel.Ins.mDropRed = true;
        JjcModel.Ins.updateRed();
    }
    /**是否是磕头的来源 1 是 0 不是*/
    private iskowtow:number;
    /**红点,状态提示 */
    private onRedDotUpdateOtpRevc(revc:RedDotUpdate_revc){
        RedUpdateModel.Ins.redList = revc.datalist;
        this.boxAutoVo.initData();
        if(E.Debug){
            let str = "";
            for(let i = 0;i < RedUpdateModel.Ins.redList.length;i++){
                let cell:stRedDot = RedUpdateModel.Ins.redList[i];
                let s = "";
                if(cell.type == 0 || cell.type == 1){
                    s = cell.type + "";
                }else{
                    s = TimeUtil.timestamtoTime(cell.type * 1000);
                }
                str += `${cell.id} val:${cell.type}\n`; // ==> ${s}
            }
            // LogSys.Log("reddot:=====================\n"+str);
            // console.log("onRedDotUpdateOtpRevc\n"+str);
        }
        E.AudioMgr.SetMusicMute(RedUpdateModel.Ins.getValByID(RedEnum.MUISC_BG) == 0);
        E.AudioMgr.SetSoundMute(RedUpdateModel.Ins.getValByID(RedEnum.MUISC_EFFECT) == 0);
        ////////////////////////////////////////////////////////////////////////////
        if(this.iskowtow == undefined){
            let val = RedUpdateModel.Ins.getValByID(RedEnum.IsKowtow);
            if(val == 1){
                this.iskowtow = 1;   
            }else{
                /*
                if(E.sdk.cbsgTunnelOpenType != undefined){
                    //新用户
                    if(E.sdk.cbsgTunnelOpenType == 0){
                        //是磕头用户
                        this.iskowtow = 1;
                        RedUpdateModel.Ins.save(RedEnum.IsKowtow,this.iskowtow);
                    }
                }
                */
            }
        }
        // let _cbsgTunnelOpenType = E.sdk.cbsgTunnelOpenType;
        // if(_cbsgTunnelOpenType!=undefined){
        //     let index = _cbsgTunnelOpenType;
        //     RedUpdateModel.Ins.save(RedEnum.ANIM_SET,index);
        //     this.animIndex = RedUpdateModel.Ins.getValByID(RedEnum.ANIM_SET);
        //     LogSys.LogColor("onRedDotUpdateOtpRevc from SDK:"+this.animIndex);
        // }else{
        //     this.animIndex = RedUpdateModel.Ins.getValByID(RedEnum.ANIM_SET);
        //     LogSys.LogColor("onRedDotUpdateOtpRevc from proto:"+this.animIndex);
        // }

/*

        let defaultIndex:number = this.DEFAULT_ANIM_INDEX;
        if (defaultIndex == -1) {
            let cur = RedUpdateModel.Ins.getByID(RedEnum.ANIM_SET);
            if (cur) {
                this.animIndex = cur.type;
            } else {
                this.animIndex = defaultIndex;
            }
        } else {
            //强制设置为敲鼓
            this.animIndex = defaultIndex;
        }
*/



        ////////////////////////////////////////////////////////////////////////////
        let fightScale = RedUpdateModel.Ins.getValByID(RedEnum.FIGHT_ANIM_SCALE);
        if(!fightScale){
            fightScale = 1.0;
        }
        this.fightAnimScale = fightScale;
        ////////////////////////////////////////////////////////////////////////////
        this.fixQua();

        RedUpdateModel.Ins.updateDiscountTime();
    }
    private readonly boxMinQua:number = 1;//最低品质
    /**修正确宝箱的品质选项 保存当前选择的稀有度选择，若稀有度概率为0则选择下面最低可用的品质*/
    private fixQua(){
        let _curQua:number = this.boxMinQua;
        let vo = RedUpdateModel.Ins.getByID(RedEnum.BOX_QUA);
        if(vo){
            _curQua = vo.type;
        }
        let minQua:number = this.getMinQua();
        if(_curQua < minQua){
            _curQua = minQua;
            LogSys.Log("修改为最低可用的的品质"+_curQua);
            RedUpdateModel.Ins.save(RedEnum.BOX_QUA,_curQua);
        }
    }

    public needRed(type:number){
        let val = RedUpdateModel.Ins.getValByID(type)
        let need:boolean = false;
        if(val == 0){
            need = true;
        }
        else{
            // TimeUtil.serverTime
            if(val <= TimeUtil.curZeroTime){
                need = true;
            }
        }
        if(need){
            // RedUpdateModel.Ins.save(type,TimeUtil.serverTime);
        }
        //JiShaoChengDuoModel.Ins.openRed = need;
        return need;
    }

    private onServerVersionRevc(revc:ServerVersion_revc){
        console.log("server version:" + revc.val);
        this.ser_ver = revc.val+"-"+this.serverVer;
    }
    configIsSame:boolean = true;
    private onConfigHashRevc(revc: ConfigHash_revc) {
        let val = revc.val;
        let diff:boolean = false;
        if (StaticDataMgr.Ins.hasVal != val) {
            // E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,`配置不统一:${StaticDataMgr.Ins.hasVal},${val}`);
            console.warn(`==============================>配置不一致:客户端${StaticDataMgr.Ins.hasVal},服务器:${val}`);
            diff = true;
            this.configIsSame = false;
        } else {
            console.log(`配置一致:客户端${StaticDataMgr.Ins.hasVal},服务器${val}`);
        }
        if (!Laya.Browser.onPC && typeof wx == "object" && wx) {
            let o = wx.getSystemInfoSync();
            if (o && o.platform == "devtools") {
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, (diff ? "warning 配置不同!!!!":"配置相同") + "\nclient:\n" + StaticDataMgr.Ins.hasVal + "\nserver:\n" + val);
                console.log("============================>"+JSON.stringify(o));
            }
        }
    }

    // private onClickEvt(skin){
        // console.log(skin);
    // }

    // private onLayerChange(v:boolean){
        // LogSys.Log("MainView onLayerChange========>",v);
        // E.yinDaoMgr.showYD(9);
    // }

    private onBoxUsedCountRevc(revc:BoxUsedCount_revc){
        this.boxUsedCount = revc.val;
        this.event(MainEvent.BoxUsed);
        this.updateBoxOpenRed();
    }

    /**更新开箱大吉 */
    public updateBoxOpenRed(){
        this.funcSetRed(EFuncDef.KaiFuKuangHuang,ActivityModel.Ins.checkOpenBoxRed());
    }

    public gm(str:string){
        if(debug){
            let gm = new Gm_req();
            gm.datas = str;
            SocketMgr.Ins.SendMessageBin(gm);
        }else{
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,`please set URL debug=1`);
        }
    }
    
    private onWatchPlayerInfoRevc(revc:WatchPlayerInfo_revc){
        E.ViewMgr.Open(EViewType.ShowPlayer,null,revc);
    }

    private onAdventure_Boss(revc:Adventure_Boss_revc){
        this.adventureBossData = revc;
        this.event(MainEvent.AdventureBossUpdate);
        this.yewaiRed();
    }

    public updateGemRed(){
        let gemList:GemBaseModel[] = [];
        gemList.push(DuanWuModel.Ins,GemFeastModel.Ins,FuJiangFeastModel.Ins);
        for(let i = 0;i < gemList.length;i++){
            gemList[i].updateRed();
        }
    }

    /**是否可以扫荡 */
    public get isCanSweep(){
        let cfg: Configs.t_Adventure_Boss_dat = AdventureBossProxy.Ins.GetDataById(this.adventureBossData.f_id);
        let arr = cfg.f_RaidsPrice.split("|");
        let itemStr = arr[this.adventureBossData.cnt];
        if(itemStr){
            return true;
        }
    }

    public onErrCodeRevc(data:Err_revc) {
        // if(E.Debug){
        let cfg:Configs.t_Err_dat = ErrCodeProxy.Ins.GetDataById(data.reason);
        console.log('%cErrID:' + data.reason.toString() + " " + (cfg ? cfg.f_err : ""), 'color:#ff0000');
        // }
        //高频操作处理
        switch(data.reason){
            case ErrorCode.EquipUid:
            case ErrorCode.Sell:
                return;
            case ErrorCode.Selled:
                // E.ViewMgr.Close(EViewType.Equip_switch);
                return;
            case ErrorCode.HeroYanWuFail:
                HeroHouseModel.Ins.openPop();
                return;
            case ErrorCode.DisableUser:
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,cfg.f_err);
                return;
        }
        this.showErr(data.reason);
    }

    protected onSuccessCodeRevc(data:Success_revc){
        if(debug){
            let cfg:Configs.t_Err_Sucess_dat = SuccessCodeProxy.Ins.GetDataById(data.reason);
            console.log('%cSuccessID:' + data.reason.toString() + " " + (cfg ? cfg.f_success : ""), 'color:#00ff00');
        }
        this.showSuccess(data.reason);
    }

    /**购买成功 */
    private onSellRevc(data:Sell_revc){
        this.mSellStatus = ESellStatus.End;

        if(data.errorID == 0){
            this.removeTempEquipList(data.value.toString());
            this.event(MainEvent.SellSucceed,data);
            // E.ViewMgr.Close(EViewType.Equip_switch);
        }
        // this.isStartEquip = false;
        // console.log(data);
    }
    private onSellEquipFinishRevc(data:SellEquipFinish_revc){
        this.event(MainEvent.SellFinished,data);
    }
    
    private parseLog(o:stFightActionLog){
        return `回合数:${o.round} 技能:${o.skillId} pos:${o.pos} 动作类型:${o.type} attrId:${o.attrId} old:${o.oldVal} new:${o.newVal}`;
    }
    private outLog(vo: stFightVo) {
        if (vo) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>日志START");
            // let outlog = AvatarFactory.createBystFightAction(vo.logList);
            // for (let i = 0; i < outlog.length; i++) {
            //     let cell = outlog[i];
            //     console.log(cell.toString());
            // }
            console.log(vo.logList);
            for (let i = 0; i < vo.logList.length; i++) {
                let cell: stFightActionLog = vo.logList[i];
                console.log(i + "---->" + this.parseLog(cell));
            }
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>日志END");
            // let l = vo.itemList;
            // for(let i = 0;i < l.length;i++){
            // let cell = l[i];
            // let s = i.toString() + ">> " + AvatarFactory.ac2Desc(cell) + "";
            // console.log('%c'+s,cell.owner == 0 ? 'color:#ff0000' : 'color:#000000' );
            // }
        }
    }

    public openFunc(funcType:EFuncDef){
        if(TaskModel.Ins.isFuncOpen(funcType,true)){
            let cfg = FuncProxy.Ins.getCfgByFid(funcType);
            E.ViewMgr.Open(cfg.f_viewType);
        }
    }
    // public fightLock = {};
    /**冒险关卡 */
    public fightAdventure(id:number){
        // if(this.fightLock[EFightType.Adventure]){
        //     // if(E.Debug){
        //     E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"并发问题,冒险战斗未完成闭环!");
        //     // }
        //     return;
        // }
        // this.fightLock[EFightType.Adventure] = 1;

        // let id:number = NewAdventureModel.Ins.adventureData.adventureId;
        let req =new NewAdventureFight_req();
        req.type = ENewAdventure.Fight;
        req.adventureId = id;
        SocketMgr.Ins.SendMessageBin(req);
    }
    public onFightRevc(data:FightResult_revc){
        // this.fightLock[data.fight_type] = 0;
        // E.ViewMgr.closeWait();
        // console.log(data);
        if(debug){
            if(HrefUtils.getVal("nofightlog") || initConfig.nofightlog){
            }else{
                this.outLog(data.fightVo);
                this.fightCMD = JSON.stringify(data);
                console.log(this.fightCMD);
            }
        }
        // E.ViewMgr.Open(EViewType.FightMain, null, { fightVo: data.fightVo, type: data.fight_type } as IFightResult);
        this.fight({ fightVo: data.fightVo, type: data.fight_type } as IFightResult);
    }

    public fight(_cell: IFightResult) {
        if (E.ViewMgr.isOpenReg(EViewType.WuShenDianView) && WuShenDianModel.Ins.isKs) {
            MainModel.Ins.fightJieSuan(_cell);
        } else {
            let type = EViewType.FightMain;
            if(E.ViewMgr.isOpenReg(type)){
                //继续战斗
                let view:FightMainView = E.ViewMgr.Get(type) as FightMainView;
                view.clearScene();
                view.refreshFightView(_cell);
            }else{
                E.ViewMgr.Open(type, null, _cell);
            }
        }
    }

    public fightJieSuan(_cell: IFightResult){
        if(E.Debug && initConfig.withoutFightUI){
            return;
        }
        // if(HrefUtils.getVal("noanim")){
        //     E.ViewMgr.Close(EViewType.FightMain);
        // }
        // else if(HrefUtils.getVal("fight_delay")){
        //     Laya.timer.once(HrefUtils.getVal("fight_delay")*1000,this,()=>{
        //         E.ViewMgr.Open(EViewType.FightJieSuan,null,_cell);
        //     })
        // }else{
        //     E.ViewMgr.Open(EViewType.FightJieSuan,null,_cell);
        // }

        let _data:IFightResult = _cell;
        let serverData:JjcFight_revc = _data.extData;
        if(serverData && serverData.type == EServerFightType.ScoreJJC){
            E.ViewMgr.Open(EViewType.ScoreJjcJieSuan,null,_cell);
        }else{
            E.ViewMgr.Open(EViewType.FightJieSuan,null,_cell);
        }
    }

    public jiesuanEnd(Data){
        E.ViewMgr.Close(EViewType.FightMain);
        this.newPlayerActivit(Data);

        if (E.ViewMgr.isOpenReg(EViewType.WuShenDianView) && WuShenDianModel.Ins.isKs) {
            SocketMgr.Ins.SendMessageBin(new PalaceRefresh_req());
            const fightReq = new FightEnd_req();
            fightReq.fight_type = 16;
            SocketMgr.Ins.SendMessageBin(fightReq);
        }
    }
    private newPlayerActivit(Data){
        let pcfg = t_Pack_ControllerProxy.Ins.getCfgByPackidId(this.newPay.activityType);
        let limtid: number = parseInt(pcfg.f_p1);
        if(initConfig.debug_pop_limtid){
            limtid = initConfig.debug_pop_limtid;
        }
        if(NewAdventureModel.Ins.adventureId < limtid){
            return;
        }
        if(NewAdventureModel.Ins.adventureId == limtid){
            ActivityModel.Ins.showXinRenView();
        }else{
            let _data:IFightResult = Data;
            if(_data.fightVo && _data.fightVo.owner == EFightCamp.Enemy){
                ActivityModel.Ins.showXinRenView();
            }
        }
    }
    /**进入冒险 */
    public adventureEnter() {
        let avent: Adventure_req = new Adventure_req();
        SocketMgr.Ins.SendMessageBin(avent);
    }

    protected onDebugFightValRevc(data:DebugFightVal_revc){
        console.log("onDebugFightValRevc...");
        console.log(JSON.stringify(data));
    }

    //这个协议不使用
    private onAdventureRevc(data:Adventure_revc){
        this.adventureVo.setData(data);
        E.ViewMgr.Update(EViewType.FightOpen);
    }

    onRewardRevc(data:Reward_revc){
        // if(data.type == ERewardType.PetFusion){
        // LingChongRH_Model.Ins.openResult(data);
        // return;
        // }

        if(data.type == ERewardType.DLD){
            DaLuanDouModel.Ins.isReward = 0;
            DaLuanDouModel.Ins.event(DaLuanDouModel.UPDATA_VIEW,1);
            DaLuanDouModule.ins.setDot();
        }
        if(data.type == ERewardType.YeWaiBoss){
            
        } else {
            let l = data.rewardList;
            let other = [];

            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                let cfg: Configs.t_Item_dat = ItemProxy.Ins.getCfg(cell.id);
                if (cell.count > 0 && cfg && cfg.f_sub_type == ESub_type.RandomGemBox) {
                    
                } else {
                    other.push(cell);
                }
            }
            data.rewardList = other;
            if(data.rewardList.length > 0){
                E.ViewMgr.openReward(data);
            }
        }
        this.event(MainEvent.Reward_revcUpdate);
    }

    private showErr(id:number) {
        let cfg:Configs.t_Err_dat = ErrCodeProxy.Ins.GetDataById(id);
        let _content:string;
        if(cfg){
            _content = cfg.f_err;
        }else{
            _content = id.toString();
        }
        E.ViewMgr.ShowMidError(_content);
    }

    private showSuccess(id:number) {
        let cfg:Configs.t_Err_Sucess_dat = SuccessCodeProxy.Ins.GetDataById(id);
        let _content:string;
        if(cfg){
            _content = cfg.f_success;
        }else{
            _content = id.toString();
        }
        E.ViewMgr.ShowMidOk(_content);
    }

    /**
     * - 当宝箱不在升级状态且当前金币数大于当前宝箱升级的所需金币数的50%，则主界面宝箱升级按钮触发红点
     */
    public mChestMoneyLevelRed(){
        this.hasLvUpBtnRed = false;
        //是否已经满级
        let isFullMax:boolean = false;
        let  chestData = this.mRoleData.getChestData();
        // let cfg:IChestLv =  this.getChestLvCfg(chestData.boxlv);
      
        let res:IChestPosResult = this.getChestCfgByPos(chestData.pos,chestData.boxlv,chestData.time);
  
        if(res.cfg){
            //cd剩余时间
            // res.cdTime

            // this._ui.timetf.text = E.LangMgr.getLang("Time") + ":" + TimeUtil.subTime(res.cdTime);//cfg.f_BoxCD
        }else{
            // this._ui.timetf.text = "";
        }
        //#############################################
        switch(res.status){
            case EChestLevelUp.UseMoney:
                //使用铜钱升级
                // this._ui.boxLvUp.visible = true;
                // this._ui.goumaibtn.visible = true;
                // // this._ui.shenjiBtn.visible = true;
                // this.lvUpCtl.visible = true;
                // this.lvUpCtl.enable = false;
                // this._ui.tongqianicon.visible = true;
                break;
            case EChestLevelUp.Full:
                //进度条满
                // this._ui.boxLvUp.visible = true;
                // this._ui.goumaibtn.visible = true;
                // // this._ui.shenjiBtn.visible = true;
                // this.lvUpCtl.visible = true;
                // this.lvUpCtl.enable = true;
                // this._ui.isFulltf.visible = true;

                this.hasLvUpBtnRed = true;
                break;

            case EChestLevelUp.Time:
                //加速
                // this._ui.levelView.visible = true;
                // this._ui.fastBtn.visible = true;
                break;
            case EChestLevelUp.End:
                // this._ui.levelFullTf.visible = true;
                break;
        }
        //############################################
        if(res.cur ==  res.max){
            isFullMax = true;
        }else{
            isFullMax = false;
        }
        //铜钱
        // this._ui.moneytf.text = res.cfg.f_Cost.toString();
        let haveMoney = this.getMoeny();
        if(haveMoney < res.cfg.f_Cost * 1.5){       //1.5倍数
            return false;
        }else{
            if(isFullMax){

            }else{
                if (chestData.time > 0){
                    //有倒计时的状态
                    // let sub = chestData.time - TimeUtil.serverTime;
                }else{
                    return true;
                }
            }
        }
        return false;
    }
    /**箱子升级按钮红点刷新 */
    public chestLvUpRed(){
        // let cellKey:string = "lvdot";//"xianziBg";
        let _red =  this.mChestMoneyLevelRed();

        let showRed:boolean = false;
        if(_red || this.hasLvUpBtnRed){
            // DotManager.addMainDot(cellKey,-20);
            showRed = true;
        }else{
            // DotManager.remMainDot(cellKey);
        }
        
        this.getView().lvdot  = showRed;
    }

    /**
     * 物品删除
     */
    private onItemDelRevc(data:ItemDel_revc){
       this.DelItem(data.delList);
    }

    public DelItem(delList:uint64[]){
        for(let i = 0;i < this.equipList.length;i++){
            let equip:EquipItemVo = this.equipList[i];
            for(let n = 0;n < delList.length;n++){
                let delUid = delList[n];
                if(equip.getUid().equals(delUid)){
                    this.equipList.splice(i,1);
                    i--;
                }
            }
        }
        this.event(MainEvent.DelItems,[delList]);
        this.getView().UpdateEquip();
    }

    /**
     * 兑换抽宝箱,返回
     * @param data
     */
    private onExchangeEquipRevc(data: ExchangeEquip_revc) {
        this.ExchangeEquip(data);
    }

    /**
     * 该类型的装备是否已经穿戴中
     */
    public getWearable(type:number):EquipItemVo{
        for (let i = 0; i < this.equipList.length; i++) {
            let cell = this.equipList[i];
            if (cell.equipVo.type == type) {
                if(cell.equipVo.wearable == EWearableType.Wearable){
                    return cell;
                }
            }
        }
    }

    /**
     * 获取没有穿的装备
     */
    public getNotWear(){
        for (let i = 0; i < this.equipList.length; i++) {
            let cell = this.equipList[i];
            if(cell.equipVo.wearable == EWearableType.Not){
                return cell;
            }
        }
    }

    /**
     * 根据获得的装备开启界面
     * @param useUI true使用UI打开
     */
    public openUiByEquipVo(cell:stEquipItem,useUI:boolean = false){
        let oldEquip:EquipItemVo = this.getWearable(cell.type);
        let newEquip = DateFactory.createEquipItemVo(cell);
        let resultOld:EquipItemVo;
        let resultNew:EquipItemVo;
        if(oldEquip){
            if(this.canOpenSwicthUI(newEquip.getUid().toString())){
                // 穿戴中
                // E.ViewMgr.Open(EViewType.Equip_switch,null,[oldEquip,newEquip]);
                resultOld = oldEquip;
                resultNew = newEquip;
                // }
            }
        }else{
            //未戴中
            if(this.canOpenUpdateEquipUI(newEquip.getUid().toString())){
                // E.ViewMgr.Open(EViewType.EquipUpdate,null,newEquip);
                resultNew = newEquip;
            }
        }
        if(useUI || !this.mainView.avatarFight){
            this.openEquipUI(resultOld,resultNew)
        }else{
            this.mainView.avatarFight.saveEquip(resultOld,resultNew);
        }
    }

    openEquipUI(resultOld:EquipItemVo,resultNew:EquipItemVo){
        // if(resultOld && resultNew){
            if(resultOld){
                E.ViewMgr.Open(EViewType.Equip_switch,null,[resultOld,resultNew]);
            }else{
                E.ViewMgr.Open(EViewType.EquipUpdate,null,resultNew);
            }
        // }
    }

    /**
     * 兑换宝箱(宝箱抽取)
     */
    private ExchangeEquip(data: ExchangeEquip_revc){
        this.curChest.ExchangeEquip(data);
    }
    /**来自玩家主动点击关闭按钮的操作 */
    clientClickEquipCloseBtn(uiType:number){
        this.StopChestProxy();
        LogSys.Log(`clientClickEquip:${uiType}`);
    }
    /**
     * 装备变化
     * @param data 
     */
    private onEquipChangeRevc(data:EquipChange_revc){
        this.EquipChange(data);
    }

    private add_stEquipItem(cell:stEquipItem){
        // for(let i = 0;i < this.equipList.length;i++){
            // let vo = this.equipList[i];
            // if(vo.equipVo.type == cell.type){
                // E.ViewMgr.ShowMidError("#已经有该类型的装备无法新增!!!["+cell.uid.toString()+"]");
                // vo.equipVo = cell;
                // return;
            // }
        // }
        
        this.equipList.push(DateFactory.createOwnerEquipVo(cell));
    }

    // private replaceEquip(cell:stEquipItem){
    //     for(let i = 0;i < this.equipList.length;i++){
    //         let vo = this.equipList[i];
    //         if(vo.equipVo.type == cell.type){
    //             vo.equipVo = cell;
    //             return;
    //         }
    //     }
    //     E.ViewMgr.ShowMidError("#未找到装备无法替换!!!["+cell.uid.toString()+"]");
    // }

    /**
     * 装备变化推送
     */
    private EquipChange(data:EquipChange_revc){
        let l2 = data.equipItem;
        for(let i = 0;i < l2.length;i++){
            let cell:stEquipItem = l2[i];
            let find = false;


            this.removeTempEquipList(cell.uid.toString());

            for(let n = 0;n < this.equipList.length;n++){
                let vo = this.equipList[n];

                if(vo.equipVo.uid.equals(cell.uid)){
                    // E.ViewMgr.ShowMidError("#已经有该类型的装备无法新增!!!["+cell.uid.toString()+"]");
                    //更新装备
                    this.equipList[n].equipVo = cell;
                    find = true;
                    break;
                }
            }
            if(!find){
                //新增
                let target = this.equipList.find(o=>o.equipVo.equipStyle == cell.equipStyle);
                if(target && this._lsEquipPopLock){
                    this._lsEquipPopLock = false;
                    this.popAction(cell,ESetEquipDateSource.PushEquip);
                }
                this.add_stEquipItem(cell);
            }
        }
        this.getView().UpdateEquip();

        if (E.ViewMgr.Get(EViewType.Equip_switch).IsShow() ||
            E.ViewMgr.Get(EViewType.EquipUpdate).IsShow()
        ) {
            this.getView().UpdateSmallIcon();
        }

        this.event(MainEvent.EquipChange,[data.equipItem]);
    }

    /**
     * 数值变化 3009
     */
    private onValChanelRevc(data: ValChanel_revc) {
        // if(E.Debug){
            // let str: string = "==>"+JSON.stringify(data);
            // console.log(str);
        // }
        this.ValChanel(data);
    }

    public getView(): IMainUpdate {
        let _mainUpdate = this._mainUpdate;
        let mainView: MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
        if(mainView && mainView.IsShow()){
            _mainUpdate = mainView;
        }
        return _mainUpdate;
    }
    private oldLv:number;

    public checkShowReward(){
        let _cellList = this.mRoleData.moneyInfo;
        let _useItemList:stCellValue[] = [];
        for(let i = 0;i < _cellList.length;i++){
            let cell:stCellValue = _cellList[i];
            let cfg:Configs.t_Item_dat = ItemProxy.Ins.getCfg(cell.id);
            if(cell.count > 0 && cfg && cfg.f_sub_type == ESub_type.RandomGemBox){
                _useItemList.push(cell);
            }
        }
        if(_useItemList.length){
            let o:RewardUseItem = new RewardUseItem();
            o.itemList = _useItemList;
            E.ViewMgr.openReward(o);
        }
    }
    public ValChanel(data:ValChanel_revc){
        let _mainUpdate = this.getView();
        let _cellList:stCellValue[] = data.itemList;
        let _useItemList:stCellValue[] = [];
        for(let i = 0;i < _cellList.length;i++){
            let cell:stCellValue = _cellList[i];
            let cfg:Configs.t_Item_dat = ItemProxy.Ins.getCfg(cell.id);
            if(cell.count > 0 && cfg && cfg.f_sub_type == ESub_type.RandomGemBox){
                _useItemList.push(cell);
            }

            if(cell.id == ECellType.BATTLE){
                this.plusplay.setPlus(this.mRoleData.getBattleValue(),cell.count);//战斗力数字飘字
            }

            this.mRoleData.setAttr(cell.id,cell.count);//设置战斗力
            this.event(MainEvent.ValChangeCell,cell.id);
            if(cell.id == ECellType.COPPER_MONEY || cell.id == ECellType.WhitePlume){
                WingModel.Ins.updateRed();
            }

            switch(cell.id){
                case ECellType.GOLD:
                    _mainUpdate.UpdateGold();
                    break;
                case ECellType.COPPER_MONEY:
                    _mainUpdate.UpdateMoney();
                    this.chestLvUpRed();
                    break;
                case ECellType.BOX:
                    _mainUpdate.UpdateBoxCnt();
                    break;
                case ECellType.EXP:
                    _mainUpdate.UpdateExp();
                    break;
                case ECellType.BATTLE:
                    //战斗力变化
                    _mainUpdate.UpdateBattle();
                    E.sdk.valChange(ESdkValChange.Plus,cell.count);
                    break;
                default:
                    //其他属性
                    _mainUpdate.UpdateMainAttr()
                    break;
            }
        }
        if(_useItemList.length){
            let o:RewardUseItem = new RewardUseItem();
            o.itemList = _useItemList;
            E.ViewMgr.openReward(o);
        }
        this.event(MainEvent.ValChange);
    }

    /**
     * 跨天逻辑
     */
    crossDayFunc(){
        // let req = new SignStatus_req();
        // SocketMgr.Ins.SendMessageBin(req);
    
        let _fundRefresh = new FundRefresh_req();
        SocketMgr.Ins.SendMessageBin(_fundRefresh);

        this.heroPackVo.subDay();
    
        this.event(MainEvent.EventMainUpdateView);
    }

    /**
     * 跨天
     */
    private onTimeCross() {
        if (this._crossDayTicket < 0) {
            this._crossDayTicket = TimeUtil.curZeroTime + 24 * 3600 - TimeUtil.serverTime;
            this.event(MainEvent.CrossDayUpadte);//跨天触发
            //to do...
            this.crossDayFunc();
        } else {
            // LogSys.Log("剩余:"+TimeUtil.timeFormatStr(this._crossDayTicket,true));
        }
        this._crossDayTicket--;
    }

    /**
     * 3010初始化推送
     */
    private onInitRevc(data:Init_revc){
        E.LangMgr.rebuild();
        ZhengTuModel.Ins.rebuild();
        // console.log(data);
        //初始化完成
        E.taLoginTrack("3010initComplete");
        // console.log("3010初始化推送")
        this.openMainView();
        // this.event(MainEvent.DataInit);
        // JjcFactory.initTest();

        // 初始化SDK需要的玩家数据
        const playerLevel = this.mRoleData.lv;
        E.sdk.setPlayerData({
            role_id: this.mRoleData.AccountId.toString(),
            role_name: this.mRoleData.NickName,
            role_level: playerLevel,
            server_id: this.mRoleData.serverId.toString(),
            server_name: this.mRoleData.serverName,
            role_vip: playerLevel,
            role_power: this.mRoleData.plus,
        });
        // sdk事件上报——进入游戏
        E.sdk.valChange(ESdkValChange.EnterGame, 0);

        // 判读是否从挂机邀请入口进
        if (window['wx']) {
            window['wxOnShow'] = (result) => {
                console.log('wxOnShow: ', result);
                // 缓存onShow数据（防止ws断开，协议发送失败）
                window['onShowData'] = result;
                try {
                    E.sdk.onShow(result);
                    MainModel.Ins.event(MainEvent.WxOnShow, result);
                } catch(e) {};
            }
            const data = wx.getLaunchOptionsSync();
            console.log('launch: ', data);
            E.sdk.onShow(data);
            if(E.ta){
                E.ta.userSetOnce({user_source:data['scene']});
            }
            if (window['onShowData']) {
                // 如果有缓存的onShow数据，再执行一遍onShow（断线重连）
                E.sdk.onShow(data);
            }
            MainModel.Ins.getGameClubData();
        
            wx.onHide = function(){
                E.sdk.onHide();
            }
        }
        //////////////////////////////////////////////////////////////////////////////////
        this._crossDayTicket = TimeUtil.curZeroTime + 24 * 3600 - TimeUtil.serverTime;
        Laya.timer.loop(1000,this,this.onTimeCross);
        if(this.verify){
            //提审
        }else{
            if(this.isOpenByFuncId(EFuncDef.WanShengJie.toString())){
                E.ViewMgr.Open(EViewType.WanShengJieView1);
            }else if(this.isOpenByFuncId(EFuncDef.SpringFestival.toString())){
                E.ViewMgr.Open(EViewType.SpringFestivalTipView);
            }else{
                this.isOpenAnyPackage();
            }

            //红点
            this.setInitRed();
        }
        this.isInitAlready = true;
        if(this.getView()){
            this.mainView.gj && this.mainView.gj.onInit();
            this.mainView.avatarFight && this.mainView.avatarFight.onInit();
        }

        let skinReq = new GameStyle_req();
        if(SySdk.Ins.cbsgTunnelOpenType == undefined){
            //发送皮肤样式
            skinReq.type = this.skinStyle;
        } else {
            let type;

            if (this.gameStyle_server != EMainSkin.Null) {
                type = this.gameStyle_server;
            } else {
                type = EMainSkin.Drum;
                if (SySdk.Ins.cbsgTunnelOpenType == 1) {
                    type = EMainSkin.Kotow;
                }
            }
            skinReq.type = type;
            // SySdk.Ins.cbsgTunnelOpenType;
        }
        console.log("cbsgTunnelOpenType:",SySdk.Ins.cbsgTunnelOpenType,"gameStyle_server",this.gameStyle_server);
        SocketMgr.Ins.SendMessageBin(skinReq);

        this.checkDisCount();
    }

    private checkDisCount() {
        if (!this.isOpenAllByFuncid(EFuncDef.DiscountWin + "")) {
            return;
        }
        let day = parseInt(System_RefreshTimeProxy.Ins.getNumberVal(83));
        // RedUpdateModel.Ins.save(,TimeUtil.serverTime);
        let disid: number = RedEnum.DISCOUNT;
        let redVo: stRedDot = RedUpdateModel.Ins.getByID(disid);
        let time: number;
        if (redVo) {
            time = redVo.type;
        }

        let need = false;

        //已经开服了多少天
        let isOpenDay: number = (TimeUtil.serverTime - TimeUtil.openTime.toNumber() / 1000) / ActivityTimeUtils.OneDay;
        if (isOpenDay > day) {

        } else {
            if (time) {
                // TimeUtil.openTime.toNumber() /  1000
                let zerotime = TimeUtil.getZeroSecond(time);
                if (zerotime == TimeUtil.curZeroTime) {

                } else {
                    need = true;
                }
            } else {
                need = true;
            }
        }

        if (need) {
            E.ViewMgr.Open(EViewType.DiscountPopWin);
            RedUpdateModel.Ins.save(disid, TimeUtil.serverTime);
        }
    }

    private setInitRed(){
        this.updateNewPlayerRed();
        let style:number = parseInt(System_RefreshTimeProxy.Ins.getVal(44));
        if(style == 1){
            this.funcSetRed(EFuncDef.GameCirle,true);
        }
    }
    newPlayerCloseRedList:number[] = [];
    updateNewPlayerRed(){
        let type = this.newPay.activityType;
        let pcfg = t_Pack_ControllerProxy.Ins.getCfgByPackidId(type);
        let _newPlayerRed:boolean = false;
        if(this.mRoleData.lv > parseInt(pcfg.f_p3)){
            //大于50级不弹
        }else{
            let vo = ActivityModel.Ins.getVo(type);
            if(vo){
                let id = vo.getNewPlayerCfgId();
                if(id){
                    if(this.newPlayerCloseRedList.indexOf(id)!=-1){
                        //已经点击过了红点
                    }else{
                        _newPlayerRed = true;
                    }
                }
            }
        }
        if(!_newPlayerRed && this.firstRechargeRed){
            _newPlayerRed = true;
        }
        this.funcSetRed(this.newPay.newPlayerfuncId,_newPlayerRed);    //EFuncDef.NewPlayer
    }

    /**首充是否有可以领取的奖励 */
    get firstRechargeRed(){
        let l = t_Pack_FirstPay_Skin.Ins.List;
        let _activityVo = ActivityModel.Ins.getVo(this.newPay.activityType);//EActivityType.SkinLiBao
        let status:EActivityLingQu = EActivityLingQu.YiLingQu;

        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Pack_FirstPay_Skin_dat = l[i];
            if(_activityVo){
                const dataList = ActivityModel.Ins.getByUid(_activityVo.uid).dataList;
                let cell = dataList.find(o=>o.id == cfg.f_id);
                if(cell){
                    status = cell.param1;
                    if(status == EActivityLingQu.KeLingQu){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**每日弹出礼包 */
    public isOpenAnyPackage() {
        let curCfg = t_Platform.Ins.curCfg;
        if(curCfg && curCfg.f_packisNew){
            this.discountPack.start();
            return;
        }
        let _need: boolean = false;
        let val = RedUpdateModel.Ins.getValByID(RedEnum.POP_VAL);
        if (val != 0 && TimeUtil.getZeroSecond(val) == TimeUtil.curZeroTime) {

        } else {
            _need = true;
        }
        if(initConfig.debug_pop){
            _need = true;
        }
        if (_need) {
            this.openAnyPackage();
        }
    }

    private savePop() {
        RedUpdateModel.Ins.save(RedEnum.POP_VAL,TimeUtil.serverTime);
    }

    /**弹出相关的礼包 */
    private openAnyPackage(){
        let type = this.newPay.activityType;
        let newplayer:boolean = true;
        if(!this.isOpenByFuncId(this.newPay.newPlayerfuncId.toString())){
            newplayer = false;
        }else{
            let pcfg = t_Pack_ControllerProxy.Ins.getCfgByPackidId(type);
            if(this.mRoleData.lv > parseInt(pcfg.f_p3)){
                newplayer = false;//大于50级不弹
            }
        }
        let vo = ActivityModel.Ins.getVo(type)
        let _cfgId: number = 0;
        if (vo) {
            _cfgId = vo.getNewPlayerCfgId();
        }
        if(_cfgId <= 3){

        }else{
            newplayer = false;
        }

        if(newplayer){
            E.ViewMgr.Open(EViewType.NewPlayPackage);
            this.savePop();
        }else{
            let day = TimeUtil.getDay();

            let week = HrefUtils.getVal("week");
            if(week){
                day = week;
            }
            let n = day % 2;
            switch (n) {
                case 0:
                    //基金(聚宝盆)
                    let func_id: EFuncDef = EFuncDef.JuBaoPeng;
                    
                    let _status:boolean = false;
                    
                    if (this.isOpenByFuncId(func_id.toString())) {
                        if(TreasureModel.ins.isPay){
                            //已经购买了基金
                            _status = true;
                        }else{
                            E.ViewMgr.OpenByFuncid(func_id);
                            this.savePop();
                            return;
                        }   
                    }else{
                        _status = true;
                    }
                    if(_status){
                        //角色成长礼包
                        if (ActivityModel.Ins.isOpenByPackid(EActivityType.RoleBorn)) {
                            let _activityVo = ActivityModel.Ins.getVo(EActivityType.RoleBorn);
                            if(_activityVo && _activityVo.isPay){
                                //角色成长已经购买
                            }else{
                                E.ViewMgr.Open(EViewType.JueSeChengZhang,null,"notopen");
                                this.savePop();
                            }
                        }
                    }
                    break;

                case 1:
                    //月卡
                    if (ActivityModel.Ins.isOpenByPackid(EActivityType.t_Pack_MonthAndYear_Card)) {    
                        if(this.monthCard && this.monthCard.val == ECardLingqu.Nothing){
                            E.ViewMgr.Open(EViewType.YueKa);
                            this.savePop();
                            return;
                        }
                    }
                    //宝箱成长
                    if (ActivityModel.Ins.isOpenByPackid(EActivityType.BoxBorn)) {
                        let _activityVo = ActivityModel.Ins.getVo(EActivityType.BoxBorn);
                        if(_activityVo && _activityVo.isPay){
                            // 宝箱成长已经购买
                        }else{
                            E.ViewMgr.Open(EViewType.BoxChengZhang,null,"notopen");
                            this.savePop();
                            return;
                        }
                    }
                    break;
            }
        }
    }

    /**是否可以充值 */
    public isCanRecharge(){
        let funcCfg = FuncProxy.Ins.getCfgByFid(EFuncDef.Recharge);
        if(funcCfg.f_close || this.isVerify(funcCfg)){
            return false;
        }
        return true;
    }

    /**是否是提审模式 */
    public isVerify(cfg:Configs.t_Func_dat){
        if(this.verify && cfg.f_ts){
            return true;
        }
        return false;
    }

    /**
     * 宝箱信息
     */
    private onChestInfoUpdate(data:ChestInfoUpdate_revc){
        this.mRoleData.setChestData(data);
        // LogSys.Log("宝箱的升级时间节点:"+TimeUtil.timestamtoTime(data.time * 1000),">>>",TimeUtil.serverTime,data.time,"lv:"+data.boxlv);

        this.getView().UpdateBoxLv();
        let lvUpView:ChestLevelUpView = E.ViewMgr.Get(EViewType.ChestLevelUp) as ChestLevelUpView;
        if(lvUpView.IsShow()){
            lvUpView.RefreshView();
        }
        this.chestLvUpRed();
    }

    /**
     * 宝箱升级
     */
    private onChestUpLevelRevc(revc:ChestUpLevel_revc){
        let lang = "";
        switch(revc.type){
            case 1:
                lang = "MoneyNotEnouth";
                break;
            case 2:
                lang = "CdTimeNotEnough";
                break;
            case 3:
                lang = "QuickNotEnough";
                break;
        }
        E.ViewMgr.ShowMidError(E.LangMgr.getLang(lang));
    }

    public openMainView(){
        // this.showAttrType = PlayerVoFactory.initShowAttr();
        E.taLoginTrack("SpineUtilInit");
        // console.log("SpineUtil.init")
        SpineUtil.init(new Laya.Handler(this,this.OnDownLoad));

        // this.OnDownLoad();
    }

    private OnDownLoad(){
        // let _l:string[] = [];
        // for(let i = 0;i < 4;i++){
        //     _l.push(ResPath.Avatar.baseSkel);
        // }
        // FashionModel.Ins.loadSpineTemp(_l,new Laya.Handler(this,this.onLoadHandler));
        this.onLoadHandler();
    }

    private onLoadHandler(){
        E.taLoginTrack("loginComplete");
        if(MainModel.Ins.loginTime != 0){
            let time = Laya.timer.currTimer - MainModel.Ins.loginTime;
            E.sendTrack("loginTime",{loginTime:time});
            MainModel.Ins.loginTime = 0;
        }
        // console.log("登录完成");
        let mainView:MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
        if(mainView.IsShow()){
            mainView.onDisplay();
        }else{
            E.ViewMgr.Open(EViewType.Main);
        }
    }

    /**
     * 播放宝箱动画
     */
    public PlayChestAnim(handler: Laya.Handler, _equipVo: stEquipItem) {
        let mainView: MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
        if (initConfig.noBoxAnim) {//不播放动画
            handler.run();
        } else {
            if (mainView.IsShow()) {
                mainView.PlayAnim(handler, _equipVo);
            }
        }
    }

    /**
     * 获取穿戴中的装备
     */
    public getEquipWearVo(type:EEquipType){
        // for(let i = 0;i < this.equipList.length;i++){
        //     let vo:EquipItemVo = this.equipList[i];
        //     if(vo.equipVo && vo.equipVo.type == type && vo.equipVo.wearable == EWearableType.Wearable){
        //         return vo;
        //     }
        // }
        return PlayerVoFactory.getEquipVoByType(this.equipList,type);
    }

    public getAttrNameIdByID(id:number,qz:boolean = false){
        let proxy:GameconfigProxy = GameconfigProxy.Ins;
        let cfg:Configs.t_gameconfig_dat = proxy.GetDataById(id);
        if(cfg){
            if(qz){
                return cfg.f_PalaceChar + cfg.f_name;
            }else{
                return cfg.f_name;
            }
        }
        return id.toString();
    }
    public getAttrDesc(id:number){
        let cfg:Configs.t_gameconfig_dat = GameconfigProxy.Ins.GetDataById(id);
        if(cfg){
            return cfg.f_desc;
        }
        return id.toString();
    }

    private removeTempEquipList(uid:string){
        let index = this._mEquipList.indexOf(uid);
        if(index!=-1){
            this._mEquipList = this._mEquipList.splice(index,1);
        }
        index = this._mSellList.indexOf(uid);
        if(index!=-1){
            this._mSellList = this._mSellList.splice(index,1);
        }
    }

    //穿戴,或者替换
    public equip(vo:stEquipItem){
        let uid:uint64 = vo.uid;
        this._mEquipList.push(uid.toString());
        
        let _equipAction = new ActionEquip_req();
        _equipAction.type = EActionEquip.Equip;
        _equipAction.value = uid;
        SocketMgr.Ins.SendMessageBin(_equipAction);
    }

    // private _sellList:string[] = [];//已经出售的装备
    /*售卖*/
    public sell(uid:uint64){
        this.mSellStatus = ESellStatus.Start;
        let _equipAction = new ActionEquip_req();
        _equipAction.type = EActionEquip.Sell;   
        _equipAction.value = uid;//this._curData.equipVo.uid;
        this._mSellList.push(uid.toString());
        // console.log("sell:"+uid.toString(),"len:",this._mSellList.length);
        // console.log("售卖"+Math.random() + " " + uid.toString());
        SocketMgr.Ins.SendMessageBin(_equipAction);
    }

    private canOpenSwicthUI(uid:string){
        if(!this.canCheckOpenUI(uid)){
            // console.log("canOpenSwicthUI");
            return false;
        }
        return true;
    }

    private canOpenUpdateEquipUI(uid:string){
        if(!this.canCheckOpenUI(uid)){
            // console.log("canOpenUpdateEquipUI");
            return false; 
        }
        return true;
    }

    private canCheckOpenUI(uid:string){
        // if(this._mEquipList.indexOf(uid)!=-1 || this._mSellList.indexOf(uid)!=-1){
        //     return false;
        // }
        return true;
    }


    public reset(){
        // this.mLock = false;
    }

    public initCD(time:number){
        if(!this.timeCtl){
            this.timeCtl = new TimeCheckCtl();
            this.timeCtl.setTime(time * 1000,new Laya.Handler(this,this.onGet_chestCallBack));
        }
        //this.mPlayinfo.boxCdTime
    }
    /**宝箱属于idel动画状态 */
    public get isAnimIdel(){
        let view:MainView  = E.ViewMgr.Get(EViewType.Main) as MainView;
        if(view.IsShow() && view.chestAnim){
            let animType = view.chestAnim.anim.curIndex;
            if(animType == EChestSpineAnim.Close || animType == EChestSpineAnim.Open){
                return true;
            }else{
                // console.log("cancel anim!:"+animType);
            }
        }
        return false;
    }

    public reelPlay(end?:Laya.Handler,time?:number){
        if(this.reelCtl){
            this.reelCtl.play(end,time);
        }
    }

    //发送抽宝箱协议
    private onGet_chestCallBack(time:number){
        if(time != 0){
        }else{
            // this.mLock = true;
            if(this.curChest.type == EOpenChest.Normal){
                SocketMgr.Ins.SendMessageBin(new ExchangeEquip_req());
            }else{
                // console.log(Math.random()+" 宝箱委托抽取");
                if(this.boxAuto.open){
                    let req = new BoxAuto_req();
                    req.boxNum = this.boxAutoVo.boxAutoUseCount;
                    SocketMgr.Ins.SendMessageBin(req);
                }else{
                    SocketMgr.Ins.SendMessageBin(new ExchangeEquipProxy_req());
                }
            }
        }
    }

    public get isTest(){
        return HrefUtils.getHref("box")!=undefined;
    }

    //根据宝箱等级获取配置
    public getChestLvCfg(lv:number):IChestLv{
        let res:IChestLv={} as IChestLv;
        let proxy:t_BoxGachaProxy = t_BoxGachaProxy.Ins;
        let l = BoxCdProxy.Ins.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_BoxCD_dat = l[i];
            if(cfg.f_BoxLevel == lv){
                res.cur = cfg;
                res.curInfo = proxy.getCfgByLv(lv);
                let next:Configs.t_BoxCD_dat = l[i+1];
                if(next){
                    res.next = next;
                    res.nextInfo = proxy.getCfgByLv(next.f_BoxLevel);
                }
                break;
            }
        }
        return res;
    }

    public getProbability(cfg:Configs.t_BoxGacha_dat){
        if(!cfg){
            return [
                "0-0","0-0","0-0","0-0",
                "0-0","0-0","0-0","0-0","0-0"
            ]
        }

        let arr = [];
        let l = cfg.f_Quality_Client.split("|");
        for(let i:number=0;i<l.length;i++){
            let st = l[i].split("-")[0];
            let qua = l[i].split("-")[1];
            arr.push(cfg[st] + "-" + qua);
        }
        return arr;
    }

    /**
     * @param pos 宝箱的坐标
     * @param lv 宝箱等级
     */
    public getChestCfgByPos(pos:number,lv:number,time:number){
        let l = BoxCdProxy.Ins.List;
        let result:IChestPosResult = {} as IChestPosResult;
        let last:Configs.t_BoxCD_dat = l[l.length - 1];
        
        let index:number = 0;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_BoxCD_dat = l[i];
            index+=cfg.f_ClickTimes;
            let next:Configs.t_BoxCD_dat = l[i+1];
            if(next){
                if(pos >= index){

                    if(pos < next.f_ClickTimes + index || next.f_id == last.f_id){
                        if(lv == next.f_BoxLevel){
                            result.cur = pos - index;
                            result.max =  next.f_ClickTimes;
                            result.status = EChestLevelUp.UseMoney;
                        }else{
                            result.status = EChestLevelUp.Full;
                            result.cur = result.max = cfg.f_ClickTimes;
                        }
                        if(time != 0){
                            result.status = EChestLevelUp.Time;
                        }
                        if(lv >= last.f_BoxLevel){
                            result.status = EChestLevelUp.End;
                        }
                        result.cfg = next;
                        if(result.status == EChestLevelUp.Full){
                            result.cdTime = cfg.f_BoxCD;
                        }else{
                            result.cdTime = next.f_BoxCD;
                        }
                        return result;
                    }

                }
            }
        }
        if(pos == 0){
            //初始
            result.cfg = l[0];
            result.cur = pos;
            result.cdTime = result.cfg.f_BoxCD;
            result.max = result.cfg.f_ClickTimes;
            result.status = EChestLevelUp.UseMoney;
        }else{
            //满级了
            result.cfg = last;
            result.max = last.f_ClickTimes;
            result.cur = last.f_ClickTimes;
            result.status = EChestLevelUp.End;
        }
        return result;
    }

    public levelUpChest(){
        let req = new ChestUpLevel_req();
        SocketMgr.Ins.SendMessageBin(req);
        //MainModel.Ins.event(MainEvent.ValChange);
    }
    /**
     * 金币 铜钱数量
     */
    public getMoeny():number{
        return this.mRoleData.getVal(ECellType.COPPER_MONEY);
    }
    /**
     * 加速劵
     */
    public get chestQuickCnt():number{
        return this.mRoleData.getVal(ECellType.ChestQuick);
    }

    public initEquipList(_l:stEquipItem[]){
        this.equipList = [];
        for(let i = 0;i < _l.length;i++){
            let cell = _l[i];
            this.equipList.push(DateFactory.createOwnerEquipVo(cell));
        }
    }

    /**
     * 开宝箱
     */
    public BeginChest(delay:boolean = true){
        this.curChest.BeginChest(delay);
    }
    /**继续开宝箱 */
    public goonQuick(){
        // LogSys.Log("是否是委托状态:"+ (this.curChest.type == EOpenChest.Auto));
        if(this.curChest.type == EOpenChest.Auto && this.quickCfg){
            this.QuickStart(this.quickCfg);
        }
    }
    private _lsEquipPopLock:boolean = false;
    private popAction(cell: stEquipItem,source?:ESetEquipDateSource,_lsEquipPopLock:boolean = false) {
        if (this.curChest.type == EOpenChest.Auto) {
            if(this.mainView.avatarFight){
                this.mainView.avatarFight.clearData();
            }
            if (this.isNeePop(cell)) {
                this.openUiByEquipVo(cell, true);
                //有更加好的装备 需要弹出处理的宝箱界面
                this.once(MainEvent.SellSucceed, this, this.onSellSucceed);
            } else {
                this._lsEquipPopLock = _lsEquipPopLock;
                this.curChest.animEndSell(cell,source);
            }
        }
    }

    //点击委托按钮
    public QuickStart(curCfg:QuickQua){
        if(this.curChest.type == EOpenChest.Normal){
            let _equipVo:EquipItemVo = this.getNotWear();
            if(_equipVo){
                let cell = _equipVo.equipVo;
                // E.ViewMgr.ShowMidLabel(E.LangMgr.getLang(`WeiTuoTips`));//请先处理当前宝箱
                this.SetChestProxy(curCfg);
                this.popAction(cell,ESetEquipDateSource.ClickAutoBtn,true);
                return;
            }
        }
        this.SetChestProxy(curCfg);
        this.ClickChest();
        this.BeginChest(false);
    }

    /**售卖成功 */
    private onSellSucceed(){
        this.curChest.openChest();
    }

    /**终止宝箱抽取的委托 */
    public StopChestProxy(msg:boolean = true){
        LogSys.Log("终止委托...")
        this.getView().gear = false;
        if(this.quickCfg){
            this.quickCfg = null;//终止抽宝箱
            if(msg){
                E.ViewMgr.ShowMidLabel(E.LangMgr.getLang("OpenChestFinished"));
            }
        } 
        this.curChest.Stop();
        this.curChest = this.normalChest;
        // this.event(MainEvent.ChestProxy,false);
    }
    /**
     * 点击宝箱区域
     */
    public ClickChest() {
        // if(!this.isAnimIdel){
        // return;
        // }
        if (this.curChest.status == EChestOpenStatus.GetBetterEquip) {
            if (this.curChest.BetterAction()) {
                return;
            }
        }

        if(this.mainView.chestAnim && this.curChest.type == EOpenChest.Auto && this.mainView.chestAnim.mStatus == EChestAnimStatus.Open ||
            this.curChest.type == EOpenChest.Auto){
            // LogSys.Log("不终止委托");
        }else{
            this.StopChestProxy();
        }
        // console.log("status:>>>>>"+this.curChest.status+",["+this.mainView.chestAnim.mStatus+"]");
        if(this.getView().isPlaying){
            return;
        }
        this.BeginChest();
    }

    /**设置宝箱抽取的委托 */
    public SetChestProxy(cfg:QuickQua) {
        this.quickCfg = cfg;
        this.curChest.Stop();
        this.curChest = this.autoChest;
        this.getView().gear = true;
        // this.event(MainEvent.ChestProxy,true);
        // this.ClickChest();
    }

    // public enterScene(type:EFkSceneType){
    //     switch(type){
    //         case EFkSceneType.Main:
    //             this.getView().AddHero();
    //             break;
    //     }
    // }
    
    /**显示tip */
    public showSmallTips(title:string,content:string,target,algin?:string){
        let _smallTipsData:ISmallTips = {} as ISmallTips;
        _smallTipsData.content =  content;
        _smallTipsData.title = title
        _smallTipsData.target = target;
        _smallTipsData.algin = algin;
        let _viewType = EViewType.SmallTips;
        if(E.ViewMgr.IsOpen(_viewType)){
            let view:SmallTipsView = E.ViewMgr.Get(_viewType) as SmallTipsView;
            view.setData(_smallTipsData)
        }else{
            E.ViewMgr.Open(_viewType,null,_smallTipsData);
        }
    }

    public sweep(f_id:number){
        let req:Adventure_Boss_req = new Adventure_Boss_req();
        req.type = 2;
        req.f_id = f_id;
        SocketMgr.Ins.SendMessageBin(req);
        Adventure_Boss_req
    }

    /**元宝 */
    public openGold(){
        if(this.isCanRecharge()){
            let vo = ActivityModel.Ins.getVo(EActivityType.Voucher);
            if(vo && vo.isOpen){
                ShopModel.Ins.showVoucherView();
            }else{
                ShopModel.Ins.showShopView();
            }
        }else{
            E.ViewMgr.ShowMidError(this.err_msg);
        }
    }

    /**金币 */
    public openMoney(){
        if(this.isCanRecharge()){
            ShopModel.Ins.showEveryDay();
        }else{
            E.ViewMgr.ShowMidError(this.err_msg);
        }
    }

    private get err_msg(): string {
        return E.getLang("FuncNotOpen")
    }

    /**宝箱特效显示隐藏 */
    public set treasureEffect(v:boolean){
        // debug && ( v = true);
        LogSys.Log("显示小宝箱特效 "+v);
        // Laya.timer.once(1000,this,this.playChestEffect,[v]);
        this.playChestEffect(v);
    }

    private playChestEffect(v:boolean){
        if(v){
            this.reelEffect.play("o/spine/glow01/glow01");
        }else{
            this.reelEffect.stop();
        }
    }

    public getModelByType(fid):BaseModel{
        switch (fid) {
            case EFuncDef.DuanWu:
                return DuanWuModel.Ins;
            case EFuncDef.GemFeast:
                return GemFeastModel.Ins;
            case EFuncDef.JuBaoPeng:
                return TreasureModel.ins;
            case EFuncDef.JJZML:
                return JjzmlModel.Ins;
            case EFuncDef.FuJiangFeast:
                return FuJiangFeastModel.Ins;
            case EFuncDef.JiShaoChengDuo:
                return JiShaoChengDuoModel.Ins;
            // case EFuncDef.NewPlayerFeast:
            //     return NewPlayerFeastModel.Ins;
            case EFuncDef.PetFeast:
                return LingChongFeastModel.Ins;
            case EFuncDef.ZhengTu:
                return ZhengTuModel.Ins;
            case EFuncDef.ShenBinSY:
                return ShenBinFeastModel.Ins;
            case EFuncDef.MountDQ:
                return NewPlayerRideFeastModel.Ins;
            case EFuncDef.PetQD:
                return NewPlayerPetFeastModel.Ins;
            case EFuncDef.GemQD:
                return NewPlayerGemFeastModel.Ins;
            case EFuncDef.NamingRename:
                return NamingChargeModel.Ins;
        }
    }

    /**
     * 功能是否开启
     * 一个funid对应一个页面 ,一个页面对应多个活动,当前页面的所有的活动都关闭的时候页面入口才会消失
     */
    public isOpenByFuncId(funid:string){
        // let arr = [
        //     EFuncDef.NewPlayer,
        //     EFuncDef.PopWin,
        //     EFuncDef.SignIn,

        //     EFuncDef.Libao,
        //     EFuncDef.KaiFuKuangHuang ,
        //     EFuncDef.ZhuHouBuji,
        //     EFuncDef.SaoGuoMark,
            
        //     EFuncDef.Laborday,
        //     EFuncDef.ChildrenHD,
        //     EFuncDef.Summer,

        //     EFuncDef.JuBaoPeng,
        //     EFuncDef.DuanWu,
        //     EFuncDef.GemFeast
        // ];
        // if (arr.indexOf(parseInt(funid)) == -1) {
        //     return true;
        // }

        if(FuncProxy.Ins.isClose(parseInt(funid))){
            return false;
        }

        let fid = parseInt(funid);
        // if(fid == this.newPay.newPlayerfuncId){//EFuncDef.NewPlayer
        if(fid == EFuncDef.NewPlayer || fid == EFuncDef.OldPayNewPlayer){
            let _vo:ActivityVo = ActivityModel.Ins.getVo(this.newPay.activityType);//EActivityType.t_Pack_NewPlayer
            if(_vo && this.newPay.isNewPlayerAllGet(_vo) || !_vo){
                return false;
            }
            return true;
        }
        else if(fid == EFuncDef.PopWin){
            return ActivityModel.Ins.isPopIconShow;
        }
        else if(fid == EFuncDef.xianshilibao){
            return XianShiLiBaoModel.Ins.isPopIconShow;
        }
        else if(fid == EFuncDef.SignIn){
            return ActivityModel.Ins.isOpenByPackid(EActivityType.SignIn);
        }
        else if(fid == EFuncDef.SignInNew){
            return ActivityModel.Ins.isOpenByPackid(EActivityType.SignInNew);
        }
        else if(fid == EFuncDef.Combopack){
            return ActivityModel.Ins.isOpenByPackid(EActivityType.Combopack);
        }
        else if(fid == EFuncDef.MountLB){
            if(LiBaoModel.Ins.isOpenByFid(49)){
                return true;
            }
            return false;
        }
        else if(fid == EFuncDef.PetLB){
            if(LiBaoModel.Ins.isOpenByFid(50)){
                return true;
            }
            return false;
        }
        else if(fid == EFuncDef.CJKF){
            let vipOpen = parseInt(System_RefreshTimeProxy.Ins.getVal(26));
            if (MainModel.Ins.mPlayinfo && MainModel.Ins.mPlayinfo.isVip && vipOpen) {
                return true;
            } else {
                return false;
            }
        }
        else if(fid == EFuncDef.LibaoZi){
            return ActivityModel.Ins.isOpenByPackid(
                [
                EActivityType.t_Pack_MonthAndYear_Card,
                EActivityType.TeQuanKa,
                // EActivityType.ZKShop
                ]);
        }
        else if(fid == EFuncDef.JiJing){
            return ActivityModel.Ins.isOpenByPackid(
                [EActivityType.RoleBorn,
                EActivityType.BoxBorn,
                EActivityType.ZuoqiChengZhang,
                EActivityType.LingchongChengZhang,
                EActivityType.BaoshiChengZhang]);
        }
        else if(fid == EFuncDef.KaiFuKuangHuang){
            return ActivityModel.Ins.isOpenByPackid(
                [EActivityType.KaiXaingDaji,
                EActivityType.TeHuiLiBao,
                EActivityType.Pack_Shop_Mart]);
        }
        else if(fid == EFuncDef.ZhuHouBuji){
            return ActivityModel.Ins.isOpenByPackid(EActivityType.Pack_Supply);
        }
        else if (fid == EFuncDef.SaoGuoMark) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.SanGuo);
        }else if (fid == EFuncDef.MeiRiZhuanPan) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.DayZhuanPan);
        }else if (fid == EFuncDef.KaiFuChongBang) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.KaiFuChongBang);
        }else if (fid == EFuncDef.JieDongFeng) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.JieDongFeng);
        }else if (fid == EFuncDef.ServerTask) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.ServerTask);
        }else if (fid === EFuncDef.SkinLiBao) {
            // let vo = ActivityModel.Ins.getVo(EActivityType.t_Pack_NewPlayer)
            // return ActivityModel.Ins.isOpenByPackid(EActivityType.SkinLiBao);
            return this.newPay.showSkinIcon;
        }else if (fid == EFuncDef.WanShengJie) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.WanShengJie);
        }else if (fid == EFuncDef.ZhanLing) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.ZhanLing);
        }else if (fid == EFuncDef.Monopoly) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.Monopoly);
        }else if (fid == EFuncDef.DrawEvent) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.DrawEvent);
        }else if (fid == EFuncDef.SpringFestival) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.SpringFestival);
        }else if (fid == EFuncDef.kangjixiongshou) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.kangjixiongshou);
        }else if (fid == EFuncDef.zixuanlibao) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.zixuanlibao);
        }else if (fid == EFuncDef.Vip) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.VIP);
        }else if (fid == EFuncDef.gexuqipao) {
            return ActivityModel.Ins.isOpenByPackid(EActivityType.gexuqipao);
        }
        else if(fid == EFuncDef.EveryDayPackage){
            return ActivityModel.Ins.isOpenByPackid(
                [
                EActivityType.t_Pack_MonthAndYear_Card,
                EActivityType.EveryDayBorn,
                EActivityType.ZKShopWeek
                ]);
        }
        else if (fid == EFuncDef.SiderView) {
            return E.sdk.isFromSidebarCard || this.canBarStatusLingQu;
        }

        let base:BaseModel = this.getModelByType(fid);
        if(base){
            return base.isOpen;
        }

        //五一,六一...模板活动
        let l = E.MsgMgr.LabordayList;
        for(let i = 0;i < l.length;i++){
            let model:LabordayBaseModel = l[i] as LabordayBaseModel;
            if(model.funcid == fid){
                return model.isOpen;
            }
        }
        if( funid == EFuncDef.TianJiaZhuoMian+"" && E.sdk.hasShortcut || 
            initConfig.platform == PlatformConfig.MEITUAN && typeof meituan != "undefined" && typeof meituan.addShortcut == "undefined")
        {
            return false;
        }
        return true;
    }

/**下一个刷新时间戳 每日的3:00:00 */
    public get nextTime() {
        let zero = TimeUtil.getZeroSecond(TimeUtil.serverTime);

        zero += G.gameData.refreshSec;
        let sub: number = 0;
        if (zero > TimeUtil.serverTime) {
            sub = zero;
        } else {
            sub = zero + 86400;
        }
        return sub;
    }

    /**距离下次刷新的多少秒 */
    public get subNextSecond(){
        return this.nextTime - TimeUtil.serverTime;
    }
	/**宝石盛宴 宝石盛典 */
    public get isGemOpen(){
        return GemFeastModel.Ins.isOpen;// || NewPlayerGemFeastModel.Ins.isOpen;
    }
    
    public queryMsg(desc:string,moneyCfgId:number,moneyVal:number,type:EQuickMsg,callBack:Laya.Handler,
        chanelLab:string = "取消",okLab:string = "确定"){

        if(type != EQuickMsg.NULL && this.isAutoSelect(type)){
            callBack.run();
            return;
        }
        // let _vo = { desc: E.LangMgr.getLang("JjcBuy"),
        // money: parseInt(cfg.f_Price.split("-")[1]),
        // moneyCfgId:ECellType.GOLD,
        //  callBack: new Laya.Handler(this, this.onBuyEndHandler) } as IQueryMsgData;
       
        //  _vo.selected = this.model.mAutoBuy;

        let selected  =false;

        let cell =this.quickMsgList.find(item=>item.type == type);
        if(cell){
            selected = cell.selected;
        }

        let _vo:IQueryMsgData = {} as IQueryMsgData;
        _vo.desc = desc;
        _vo.money = moneyVal;
        _vo.moneyCfgId = moneyCfgId;
        _vo.selected = selected;
        _vo.callBack = callBack;
        _vo.type = type;
        _vo.chanelLab = chanelLab;
        _vo.okLab = okLab;
        E.ViewMgr.Open(EViewType.QueryMsg, null, _vo);
    }

    public queryMsgs(desc:string,moneyArr: { moneyCfgId:number,moneyVal:number }[],type:EQuickMsg,callBack:Laya.Handler,
        chanelLab:string = "取消",okLab:string = "确定"){

        if(type != EQuickMsg.NULL && this.isAutoSelect(type)){
            callBack.run();
            return;
        }
        // let _vo = { desc: E.LangMgr.getLang("JjcBuy"),
        // money: parseInt(cfg.f_Price.split("-")[1]),
        // moneyCfgId:ECellType.GOLD,
        //  callBack: new Laya.Handler(this, this.onBuyEndHandler) } as IQueryMsgData;
       
        //  _vo.selected = this.model.mAutoBuy;

        let selected  =false;

        let cell =this.quickMsgList.find(item=>item.type == type);
        if(cell){
            selected = cell.selected;
        }

        let _vo:IQueryMsgData = {} as IQueryMsgData;
        _vo.desc = desc;
        _vo.moneyArr = moneyArr.map(o => ({ money: o.moneyVal, moneyCfgId: o.moneyCfgId, }));
        // _vo.money = moneyVal;
        // _vo.moneyCfgId = moneyCfgId;
        _vo.selected = selected;
        _vo.callBack = callBack;
        _vo.type = type;
        _vo.chanelLab = chanelLab;
        _vo.okLab = okLab;
        E.ViewMgr.Open(EViewType.QueryMsg, null, _vo);
    }

    public isItemEnough(itemid:number,count:number,tips:boolean=false){
        let have = this.mRoleData.getVal(itemid);
        let _status:boolean = false;
        if(have >= count){
            // return true
            _status = true;
        }
        if(!_status && tips){
            let itemCfg:Configs.t_Item_dat = ItemProxy.Ins.getCfg(itemid);
            this.notEnough.check(itemCfg.f_itemid);
            E.ViewMgr.ShowMidError(`${main.itemName(itemCfg.f_name)}`+E.getLang("NotEnough"));
        }
        return _status;
    }
    /**
     * 
     * @param st "23-3"
     * @param tips 
     */
    public isItemEnoughSt(st:string,tips:boolean=false){
        let itemid = parseInt(st.split("-")[0]);
        let count = parseInt(st.split("-")[1]);
        let have = this.mRoleData.getVal(itemid);
        let _status:boolean = false;
        if(have >= count){
            // return true
            _status = true;
        }
        if(!_status && tips){
            let itemCfg:Configs.t_Item_dat = ItemProxy.Ins.getCfg(itemid);
            this.notEnough.check(itemCfg.f_itemid);
            let str = `${this.itemName(itemCfg.f_name)}`+E.getLang("NotEnough");
            E.ViewMgr.ShowMidError(str);
        }
        if(!_status){
            switch(itemid){
                case ECellType.QiYun:
                case ECellType.DaoQi:
                    ActivityModel.Ins.checkItem(itemid);
                    break;
            }
        }
        return _status;
    }

    itemName(str:string){
        if(str.indexOf("|")==-1){
            return str;
        }
        let index = this.skinStyle - 1;
        return str.split("|")[index];
    }

    public isItemEnoughStArr(st:string,tips:boolean=false){
        let arr = st.split("|");
        for(let i:number=0;i<arr.length;i++){
            if(!this.isItemEnoughSt(arr[i],tips)){
                return false;
            }
        }
        return true;
    }

    /**快速使用 */
    public fastUseItem(itemId:number,type:EUseItemScene = EUseItemScene.Normal,lvTime:number = 0){
        let have = this.mRoleData.getVal(itemId);
        if(have <= 0){
            this.isItemEnoughSt(`${itemId}-1`,true);
            return;
        }

        let cell:QuickViewVo = new QuickViewVo();
        cell.itemId = itemId;
        cell.sceneType = type;
        cell.lvTime = lvTime;
        E.ViewMgr.Open(EViewType.ChestQuickUse, null, cell);
    }
    
    /**获取子类型的f_sub_type 物品列表 */
    public getItemList(subType: number) {
        return this.mRoleData.getItemVoListBySubtype(subType)
    }

    public bindBtn(mSkin:IEquipItemSkin,label:string,funcid:EFuncDef){
        mSkin.on(Laya.Event.CLICK, this, ()=>{
            E.ViewMgr.OpenByFuncid(funcid);
        });
        mSkin.redimg.visible = false;
        mSkin.tf1.text = "";
        mSkin.quality.skin = "";
        mSkin.typename.text = label;
    }

    /**称号纹理 */
    public getTitleImg(){
        let cfg = ChengHaoListProxy.Ins.getCfgByID(ChengHaoModel.Ins.wearedTitleId);
        if(cfg){
            return "o/title/" + cfg.f_titlePic;
        }
    }

    public convertHead(url){
        return url == "" ? `o/basehead/1.png` : url;
    }

    /**
     * 通用的购买界面
     * @param needItemId 需要的物品id
     * @param needCount 需要的数量
     * @param targetId 获得的物品id
     * @param targetCount 获得的数量
     * @param okHandler 确认回调
     * @param notClose true 购买完成之后不关闭该界面
     */
    public buy(needItemId:number,needCount:number,targetId:number,targetCount:number,okHandler:Laya.Handler,type:EBuyType = EBuyType.Item,notClose:boolean = false){
        let cell = {} as IShopBuyItem;
        // cell.ok = okHandler;
        cell.needCount = needCount;
        cell.needItemId = needItemId;
        cell.targetId = targetId;
        cell.targetCount = targetCount;
        cell.ok = okHandler;
        cell.type = type || EBuyType.Item;
        cell.buyEndNotClose = notClose;
        E.ViewMgr.Open(EViewType.ShopBuy,null,cell);
    }
    public buyItem(inItem:ItemVo,outItem:ItemVo,okHandler:Laya.Handler,type:EBuyType = EBuyType.Item,notClose:boolean = false){
        this.buy(inItem.cfgId,inItem.count,outItem.cfgId,outItem.count,okHandler,type,notClose);
    }

    //公告提示
    public addTs(value:any){
        if(!this.tsList){
            this.tsList = [];
        }
        this.tsList.push(value);
        if(this.tsList.length == 1){
            // let view:MainView = this.mainView;
            let view:MainView  = E.ViewMgr.Get(EViewType.Main) as MainView;
            if(view && view.IsShow()){
                view.playTS();
             }
         }
    }
        
    /**主界面skin */
    public get mainView():MainView{
        let view:MainView  = E.ViewMgr.Get(EViewType.Main) as MainView;
        return view;
    }

    public drawCall(){
        for(let i = 0;i < this._drawList.length;i++){
            let cell = this._drawList[i];
            cell.refresh();
        }
    }

    public isFromDc(key:string):DrawCallNode{
        let cell = this._drawList.find(o=>o.key == key);
        return cell;
    }

    public getDcNode(node:Laya.Sprite,newParent:Laya.Sprite,key?:string,curSkin?:Laya.Sprite,type:number = 0){
        let cell = this._drawList.find(o=>o.node == node);
        if(!cell){
            let a = new DrawCallNode();
            a.oldParent = node.parent as Laya.Sprite;
            a.type = type;
            a.node = node;
            a.curSkin = curSkin;
            if(key && key.indexOf("-")==-1){
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"key"+key);
            }
            
            a.key = key;
            // cell = a;
            a.newParent = newParent;
            this._drawList.push(a);
            cell = a;
        }
        return cell;
    }
    private disposeHtmlCanvas() {
        if(this._htmlHTMLCanvas){
            this._htmlHTMLCanvas.release();
            this._htmlHTMLCanvas.clear();
            this._htmlHTMLCanvas.destroy();
        }
        this._snapSpr.graphics.clear();
    }
    public set mainMask(v:boolean){
        if(!DrawCallConfig.snapshotMask){
            return;
        }
        if(v){
            LayerMgr.Ins.sceneMaskLayer.addChild(this._snapSpr);
            E.ViewMgr.Close(EViewType.Main);
        }else{
            E.ViewMgr.Open(EViewType.Main);
            this._snapSpr.removeSelf();
            // this._snapSpr.graphics.clear();
        }
    }

    private _snapSpr:Laya.Image = new Laya.Image();
    private _htmlHTMLCanvas;
    private drawLater(){
        if(!DrawCallConfig.snapshotMask){
            return;
        }

        if(this._htmlHTMLCanvas){
            return;//只截取一次
        }

        this.disposeHtmlCanvas();
        let w: number = Laya.Render['_mainCanvas'].width;
        let h: number = Laya.Render['_mainCanvas'].height;
        let htmlHTMLCanvas:any  = Laya.stage.drawToCanvas(w,h,0,0);//截屏

        this._htmlHTMLCanvas = htmlHTMLCanvas;
        //////////////////////////////////////////////////
        let spr: Laya.Image = this._snapSpr;
        if(E.Debug){
            let offset:number = 2;
            spr.graphics.drawRect(offset,offset,w,h,null,"#ff0000",offset*2);
        }
        let tex = htmlHTMLCanvas.getTexture();
        // if(!spr.filters){    
        //      IOS  的 bug 不可用 
        // laya.core.js 12990                 console.warn("cache bitmap size larger than 2048,cache ignored");

        //     let blurFilter: Laya.BlurFilter = new Laya.BlurFilter();
        //     blurFilter.strength = 15;
        //     spr.filters = [blurFilter];
        // }
        spr.graphics.drawTexture(tex,0,0,w,h);
        
        // spr.gray = true;//灰度

        // Laya.timer.frameOnce(1,this,()=>{
        spr.scaleX = 1/(w /Laya.stage.width);
        spr.scaleY = 1/(h /Laya.stage.height);
        // });

        // E.ViewMgr.ShowMidError("snapshot!!!");
    }
    /*
    * 点击屏幕截取stage上的0,0,w,h的像素并存储到一个Laya.Component对象中
    */
    public snapshot() {
        Laya.timer.frameOnce(60,this,this.drawLater);
        // this.drawLater();
    }

    public showSnap(v){
        if (v) {
            if (this._snapSpr) {
                Laya.stage.addChild(this._snapSpr);
            }
        }else{
            if (this._snapSpr) {
                this._snapSpr.removeSelf();
                this._snapSpr.graphics.clear();
            }
        }
    }

    protected readonly pwd:string = "0";
    private curVer:string = "";
    public connectRegist(){
        // let platform = InitConfig.getPlatform();
        // if(platform == PlatformConfig.Dev){
        //     let user = E.user;   
        //     if (!user) {
        //         E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,`请输入用户名 ?user=yourname`);
        //         E.ViewMgr.Close(EViewType.LoginNew);
        //     } else {
        //         LoginClient.Ins.ReqRegist(user.toString(), this.pwd);
        //     }
        // }else if(platform == PlatformConfig.WeiXin){
         
            // console.log("请求后台服务器信息")
        
        E.taLoginTrack("serverInfoReq");      
        E.ViewMgr.openWait(true);
        this.curVer = E.ver;
        HttpUtil.httpGet(E.curURL,new Laya.Handler(this,this.loginComplete));
    }

    // public get url(){
        // let openId:string;
        // let user = HrefUtils.getHref("user");
        // if(user){
        //     openId = user;
        // }else{
        //     openId = E.sdk.getOpenId();
        // }
        // let _url:string = `${InitConfig.getSyURL()}/login?appid=${E.sdk.getAppId()}&openid=${openId}&platform=${initConfig.debug_api_platform || initConfig.platform}&ver=${this.ver}`;  
        // return _url;
        // return E.curURL;
    // }

    // get suffix(){
    //     // switch(initConfig.platform){
    //     //     case PlatformConfig.DOU_YIN:
    //     //         return initConfig.platform;
    //     // }
    //     return ""
    // }

    /**
     * 设置竞技场红点
     */
    private set mJJC_Red(v:boolean){
        if(v){
            // DotManager.addMainDot("btn1", -15, -20);
        }else{
            // DotManager.remMainDot("btn1");
        }
        MainModel.Ins.funcSetRed(EFuncDef.Jjc,v);
    }

    public updateJJC_Red(){
        if(JjcModel.Ins.mRed || PeakJjcModel.Ins.mRed || XXZDZModel.Ins.isRedTip()){
            this.mJJC_Red = true;
        }else{
            this.mJJC_Red = false;
        }
    }

    private loginComplete(data:string){
        E.ViewMgr.closeWait();
        // console.log("loginComplete",data);
        LogSys.Log(data);
        let obj:ILoginCode = JSON.parse(data);
        InitConfig.wxLoginResult = obj;
        let serid = HrefUtils.getVal("serid");
        if(obj.code!=0){
            //登录失败
            E.sendTrack("onWebSocketError", { code: obj.code, val: obj.msg });
            E.ViewMgr.closeLoading();
            let msg:string = "";
            if(E.Debug){
                msg+=data;
            }
            msg+=E.getLang("server_err");
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,obj.msg||"");
            // if(E.Debug){
            // E.ViewMgr.ShowMidError("code:" + obj.code + " " + obj.msg + " " + this.curVer);
            // this.curVer = null;
            // }
            return;
        }
        // if(window["initConfig"]["tcp"]){
        //     InitConfig.wxLoginResult.result.tcp = window["initConfig"]["tcp"];
        // }
        if(serid){
            InitConfig.wxLoginResult.result.tcp = `wss://dev-ws-server.game.wanhuir.com/${serid}`;
            // #client time# 2023-04-11 13:49:12[Log] {"code":0,"msg":"success","result":{"appid":"wx8070b90126a0b503","openid":"c2","tcp":"wss://dev-ws-server.game.wanhuir.com/14","token":"0082febb1af0fe3d51a60d07bbe3724e"}}
        }
        let tcp = InitConfig.tcp;
        if(tcp){
            InitConfig.wxLoginResult.result.tcp = tcp;
        }
        
        if(Laya.Utils.getQueryString("tcp")){
            InitConfig.wxLoginResult.result.tcp = Laya.Utils.getQueryString("tcp");
        }

        E.taLoginTrack("linkSocket");
        // console.log("链接socket")
        SocketMgr.Ins.ConnectWebsocket(this, () => {
            // console.log("loginComplete.",data);

            // if(InitConfig.getPlatform() == PlatformConfig.WeiXin){
                    if(obj.code == ELoginCode.Succeed){
                            //     `
                            //  {"code":0,"msg":"success","result":{"appid":"wx8070b90126a0b503","openid":"01234567890123456789","tcp":"wss://ws-server.game.wanhuir.com/12","token":"09e0757e41a9f696f9372d67a5243a0b"}}
                            //     `
                        LoginClient.Ins.wxNormalLogin();
                    }else{
                        //请求异常
                    }
            // }else{
            // }
        });
    }

    private getQuaList(cfg:Configs.t_BoxGacha_dat){
        let quaArr:number[] =[
            cfg.f_grey,
            cfg.f_green,
            cfg.f_blue,
            cfg.f_purple,
            cfg.f_gold,
            cfg.f_orange,
            cfg.f_pink,
            cfg.f_red,
            cfg.f_skyblue,
            cfg.f_LightGreen,
            cfg.f_LightBlue,
            cfg.f_LightPurple,
            cfg.f_LightGold
        ];
        return quaArr;
    }

    /**根据品质获取当前等级的宝箱概率 */
    private getProbabilityByQua(qua:number){
        let index:number = qua - 1;
        let cfg:Configs.t_BoxGacha_dat = t_BoxGachaProxy.Ins.getCfgByLv(this.mRoleData.boxlv);
        let quaArr:number[] = this.getQuaList(cfg);
        let quaVal:number = quaArr[index];
        // quaVal = 1;//test code
        return quaVal;
    }

    /**获取品质的列表 */
    public get chestQuaSelectConfigList(): IListData[] {
        let _listData: IListData[] = [];
        let l = EquipmentQualityProxy.Ins.List;
        for (let i = 0; i < l.length; i++) {
            let _cfg: Configs.t_EquipmentQuality_dat = l[i];
            if (this.getProbabilityByQua(_cfg.f_id) > 0) {
                let vo = new QuickQua();
                vo.f_id = _cfg.f_id;
                vo.color = _cfg.f_Color;
                vo.txt = _cfg.f_EquipmentLevel + E.getLang("up_01");
                _listData.push(vo);
            }
        }
        _listData.reverse();
        return _listData;
    }
    /**获取最低可选品质 */
    private getMinQua(){
        let cfg:Configs.t_BoxGacha_dat = t_BoxGachaProxy.Ins.getCfgByLv(this.mRoleData.boxlv);
        let quaArr:number[] = this.getQuaList(cfg);
        for(let i = 0;i < quaArr.length;i++){
            let qua = quaArr[i];
            if(qua > 0){
                return this.boxMinQua + i;
            }
        }
        return this.boxMinQua;
    }

    public showPlayer(accountId:number,id:number){
        if(accountId!=MainModel.Ins.mRoleData.mPlayer.AccountId){
            if(E.ViewMgr.IsOpen(EViewType.JjcMain)){
                let req:WatchPlayerInfo_req = new WatchPlayerInfo_req();
                req.playerId = id;
                SocketMgr.Ins.SendMessageBin(req);
            }else if(E.ViewMgr.IsOpen(EViewType.DF_JJC)){
                let req:PeakWatchPlayerInfo_req = new PeakWatchPlayerInfo_req();
                req.playerId = id;
                SocketMgr.Ins.SendMessageBin(req);
            }else{
                // if(this.accountId!=MainModel.Ins.mRoleData.mPlayer.AccountId){
                let req:JustWatchPlayer_req = new JustWatchPlayer_req();
                req.playerId = accountId;
                SocketMgr.Ins.SendMessageBin(req);
                // }
            }
        }
    }

    /**是否是买量磕头类型的用户 */
    public get isKotoWBuy(){
        // if(E.sdk.type == ESdkType.WeiXin){
        // 修改一下主题的逻辑，如果买量不是磕头的，主题的红点就不用出现
        
        /*
        let val = RedUpdateModel.Ins.getByID(RedEnum.ANIM_SET);
        if(val){
            return false;//已经设置过红点了
        }

        if(SySdk.Ins.cbsgTunnelOpenType!=undefined && SySdk.Ins.cbsgTunnelOpenType == 1){
            return true;
        }
        // }
        if(this.iskowtow == 1){
            return true
        }
        */
        return false;
    }

    /**是否是新玩家 是新玩家就需要红点*/
    public get boxSettingRed(){
        // if(this.isKotoWBuy){
        //     return this.isNewRole == true;
        // }
        return this.isKotoWBuy;
    }

    public isVipKFRedTip(){
        let vipOpen = parseInt(System_RefreshTimeProxy.Ins.getVal(26));
        if(MainModel.Ins.mPlayinfo && MainModel.Ins.mPlayinfo.isVip && vipOpen){
            let val = RedUpdateModel.Ins.getValByID(RedEnum.VIP_KEFU);
            if(val == 0){
                return true;
            }
        }
        return false;
    }
    public createFuncIcon(name:string,funcId:EFuncDef,btnStyle: EButtonStyle):FuncSmallIcon{
        let o = this.redNameKeyList.find(cell=>cell.func_id == funcId);
        if(!o){
            let obj:IRedNameKey = {} as IRedNameKey;
            obj.func_id = funcId;
            obj.name = name;
            this.redNameKeyList.push(obj);
        }
        let icon = new FuncSmallIcon();
        icon.refresh(name,funcId,btnStyle);
        return icon;
    }

    // public addMainAvatar(){
    //     let mainView:MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
    //     if(mainView){
    //         mainView.addHero();
    //     }
    // }

    // public disposeMainAvatar(){
        // AvatarFactory._mainAvatar.dispose();
        // AvatarFactory._mainAvatar = null;
    // }

    public getTaskGuideCfg(cfg:Configs.t_Tasks_Guide_dat){
        let v = cfg[`f_TaskID${this.tabelSuffix}`];
        return v;
    }
    hasRedMainCfg(id:number){
        let cfg:Configs.t_MainIcon_dat = MainIconProxy.Ins.GetDataById(id);
        let _checkSubFuncList = MainIconProxy.Ins.getFuncListByF_ui_id(cfg.f_ui_id);
        let red:boolean = false;
        if(_checkSubFuncList.length){
            for(let i = 0;i < _checkSubFuncList.length;i++){
                let funcId:number = _checkSubFuncList[i];
                if (this.getHasRed(funcId)) {
                    red = true;
                    break;
                }
            }
        }else{

        }
        if(!red){
            let funcId = parseInt(cfg.f_funid);
            if (this.getHasRed(funcId)) {
                red = true;
            }
        }

        return red;
    }

    private redl:IUpdateRedModel[] = [];

    updateMuchReds(){
        let redl:IUpdateRedModel[] = [];
        redl.push(
            HuanZhuangModel.Ins,
            NewAdventureModel.Ins,
            MainModel.Ins,
            ZuoQiModel.Ins,
            WingModel.Ins,
            JjcModel.Ins,
            SoulModel.Ins,
            HeroHouseModel.Ins,
            ShopModel.Ins
        )
        let l = E.MsgMgr.LabordayList;
        for(let i = 0;i < l.length;i++){
            let model:BaseModel = l[i];
            // model.updateRed();
            redl.push(model);
        }

        this.redl = redl;
        this.checkRed();
    }
    private checkRed(){
        if(this.redl.length <=0){
            MainModel.Ins.event(MainEvent.MainViewInit);
        }else{
            let cell = this.redl.shift();
            cell.updateRed();
            Laya.timer.frameOnce(1,this,this.checkRed);
        }
    }
    setTTHead(headImg: Laya.Image, t: string) {
        if ("http" == t.slice(0, 4) && Laya.Browser.onTTMiniGame) {
            const i = new Image();
            i.src = t, i.onload = (() => {
                const t = i.width / headImg.width, s = new Laya.Texture2D(i.width / t, i.height / t, Laya.TextureFormat.R8G8B8A8);
                headImg.graphics.drawImage(new Laya.Texture(s), 0, (headImg.height - i.height / t) / 2),
                    s.loadImageSource(i);
            });
        } else {
            headImg.skin = t;
        }
    }
    private getNeedStop(b:boolean,list1:boolean[]){
        if(b){
            for(let i = 0; i < list1.length;i++){
                if(!list1[i]){
                    return false;
                }
            }
            return true;
        }else{
            for(let i = 0; i < list1.length;i++){
                if(list1[i]){
                    return true;
                }
            }
            return false;
        }
    }
    /**是否需要弹出 */
    isNeePop(_getEquip: stEquipItem ):boolean{
        // let needStop: boolean = false;
        let boxAutoVo:BoxAutoVo = this.boxAutoVo;

        let plusStop:boolean = false;//大于自己的战力装备停止
        let attrStop:boolean = false;//属性更好的停止
        let quaStop:boolean = false;//品质更好的时候停止

        let plusStopNeed:boolean = false;
        let attrStopNeed:boolean = false;
        // let quaStopNeed:boolean = false;
        if (boxAutoVo.isOpen) {
            let curWearvo = this.getEquipWearVo(_getEquip.type);

            //穿戴中装备战斗力比抽出的装备的战斗力值要大
            if (boxAutoVo.mCheckPlusHigh) {
                plusStopNeed = true;
                if (curWearvo &&  _getEquip.plus > curWearvo.plus) {
                    // needStop = true;
                    plusStop = true;
                }
            }
            let attrs = [];
            attrs = attrs.concat( _getEquip.attrList);
            attrs = attrs.concat( _getEquip.attrList1);
            
            if(boxAutoVo.attrCk){
                attrStopNeed = true;
                if(boxAutoVo.checkAttrIsCanStop(attrs)){
                    attrStop = true;
                }
            }
        }
        // let _curUid: uint64 = _getEquip.equipVo.uid;

        if (_getEquip.quality >= this.quickCfg.f_id) {
            //抽取到品质符合要求的装备
            quaStop = true;
        }
        let blist = [];
        if(attrStopNeed){
            blist.push(attrStop);
        }
        if(plusStopNeed){
            blist.push(plusStop);
        }
        blist.push(quaStop);

        let needPop:boolean = this.getNeedStop(boxAutoVo.togetherCkVal,blist);
        return needPop;
    }
}
//#region DrawCallNode
export class DrawCallNode{
    /**Label类型 */
    public static TYPE_LABEL:number = 0;
    /**红点类型 */
    public static TYPE_DOT:number = 1;

    public type:number = 0;
    public key:string;
    public node:Laya.Sprite;
    public curSkin:Laya.Sprite;
    public oldParent:Laya.Sprite;
    public newParent:Laya.Sprite;
    
    //参考物坐标
    public initX:number;
    public initY:number;
    public offsetX:number = 0;
    public offsetY:number = 0;

    private mInit:boolean = false;
    private v:boolean = false;
    private oldX:number = 0;
    private oldY:number = 0;
    private newX:number = 0;
    private newY:number = 0;
    
    public refresh(){
        let v = this.v;
        if(!this.mInit){
            this.mInit = true;
            this.oldX = this.node.x;
            this.oldY = this.node.y;
            let pos = (this.node.parent as Laya.Sprite).localToGlobal(new Laya.Point(this.node.x,this.node.y));
            this.newParent.addChild(this.node);

            let skin:Laya.Sprite = MainModel.Ins.mainView.skin;
            if(this.curSkin){
                skin = this.curSkin;
            }
            this.node.x = pos.x - skin.x  + skin.width / 2;
            this.node.y = pos.y - skin.y  + skin.height / 2;
            
            this.newX = this.node.x;
            this.newY = this.node.y;
        }else{
            this.reset();
        }
        this.visible = v;
    }

    /**重置到之前的父子级关系 */
    public resetOldParent(){
        this.oldParent.addChild(this.node);
        // this.node.x = this.oldX+this.offsetX;
        // this.node.y = this.oldY+this.offsetY;
        this.refreshPos();
    }

    public reset(){
        this.newParent.addChild(this.node);
        // this.node.x = this.newX+this.offsetY;
        // this.node.y = this.newY+this.offsetY;
        this.refreshPos();
    }

    public refreshPos(){
        if(this.node.parent == this.newParent){
            this.node.x = this.newX+this.offsetX;
            this.node.y = this.newY+this.offsetY;
        }else{
            this.node.x = this.oldX+this.offsetX;
            this.node.y = this.oldY+this.offsetY;
        }
    }

    public set visible(v:boolean){
        //if(MainModel.Ins.verify && this.type == DrawCallNode.TYPE_DOT){
        //    v = false;            
        //}
        this.v = v;
        if(v && this.oldParent && !this.oldParent.displayedInStage){
            v = false;
        }
        this.node.visible = v;
    }
}
//#endregion
//dc 58