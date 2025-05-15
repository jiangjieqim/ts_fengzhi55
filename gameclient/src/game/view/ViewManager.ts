import { LogSys } from "../../frame/log/LogSys";
import { ListUtil } from "../../frame/util/ListUtil";
import { LoadUtil } from "../../frame/util/LoadUtil";
import { StringUtil } from "../../frame/util/StringUtil";
import { IView } from "../../frame/view/IView";
import { ScrollPanelControl } from "../../frame/view/ScrollPanelControl";
import { EMsgBoxType, EViewType } from "../common/defines/EnumDefine";
import { Callback } from "../event/Callback";
import { EventType } from "../event/EventType";
import { E } from "../G";
import { ELayerType } from "../layer/LayerMgr";
import { Reward_revc, SpringFestivalCanJoin_req } from "../network/protocols/BaseProto";
import { ResItemGroup } from "../resouce/ResItemGroup";
import { Ijszip, StaticDataMgr } from "../static/StaticDataMgr";
import { AllianceModel } from "./handle/alliance/model/AllianceModel";
import { LoadingView, LoadingVo } from "./handle/common/LoadingView";
import { MidLabelCacheData, MidLabelView } from "./handle/common/MidLabelView";
import { MsgBoxView2 } from "./handle/common/MsgBoxView2";
import { FightJieSuanView } from "./handle/fight/views/FightJieSuanView";
import { FightMainView } from "./handle/fight/views/FightMainView";
import { FightOpenView } from "./handle/fight/views/FightOpenView";
import { Huangzhuang_shuxing_view } from "./handle/huanzhuang/views/Huangzhuang_shuxing_view";
import { Huangzhuang_tujianView } from "./handle/huanzhuang/views/Huangzhuang_tujianView";
import { Huanzhuang_mainView } from "./handle/huanzhuang/views/Huanzhuang_mainView";
import { ActivityModel } from "./handle/huodong/ActivityModel";
import { BaoshiChengZhangJiJin } from "./handle/huodong/views/BaoshiChengZhangJiJin";
import { BaoxiangChengZhangLibaoView } from "./handle/huodong/views/BaoxiangChengZhangLibaoView";
import { ChongZhiView } from "./handle/huodong/views/ChongZhiView";
import { FenXiangDaoQunView } from "./handle/huodong/views/FenXiangDaoQunView";
import { HuoDongLiBaoView } from "./handle/huodong/views/HuoDongLiBaoView";
import { JiJingListView } from "./handle/huodong/views/JiJingListView";
import { JueseChengZhangLiBao } from "./handle/huodong/views/JueseChengZhangLiBao";
import { LiBaoGongNengJiHeView } from "./handle/huodong/views/LiBaoGongNengJiHeView";
import { LingchongChengZhangJiJin } from "./handle/huodong/views/LingchongChengZhangJiJin";
import { MeiRiFenXiangView } from "./handle/huodong/views/MeiRiFenXiangView";
import { MeiRiLiBaoView } from "./handle/huodong/views/MeiRiLiBaoView";
import { QianDaoNewView, QianDaoView } from "./handle/huodong/views/QianDaoView";
import { SanGuoShiJiView } from "./handle/huodong/views/SanGuoShiJiView";
import { TeQuanKaView } from "./handle/huodong/views/TeQuanKaView";
import { TianJiaZhuoMianView } from "./handle/huodong/views/TianJiaZhuoMian";
import { XianShiFuLiView } from "./handle/huodong/views/XianShiFuLiView";
import { XingFuKuangMainView } from "./handle/huodong/views/XingFuKuangMainView";
import { Xingrenlibao_view } from "./handle/huodong/views/Xingrenlibao_view";
import { YouXiQuanLiBaoView } from "./handle/huodong/views/YouXiQuanLiBaoView";
import { YueKaView } from "./handle/huodong/views/YueKaView";
import { ZhongShenKaView } from "./handle/huodong/views/ZhongShenKaView";
import { ZuoqiChengZhangJiJin } from "./handle/huodong/views/ZuoqiChengZhangJiJin";
import { JjcAttrDBView } from "./handle/jjc/views/duibi/JjcAttrDBView";
import { JjcBSTip } from "./handle/jjc/views/JjcBSTip";
import { JjcFightView } from "./handle/jjc/views/JjcFightView";
import { JjcHYTip } from "./handle/jjc/views/JjcHYTip";
import { jjcLCTip } from "./handle/jjc/views/jjcLCTip";
import { JjcLogView } from "./handle/jjc/views/JjcLogView";
import { JjcMainView } from "./handle/jjc/views/JjcMainView";
import { JjcRewardShowView } from "./handle/jjc/views/JjcRewardShowView";
import { JjcSBTip } from "./handle/jjc/views/JjcSBTip";
import { JjcWGTip } from "./handle/jjc/views/JjcWGTip";
import { JjcZHTip } from "./handle/jjc/views/JjcZHTip";
import { ShowPlayerView } from "./handle/jjc/views/ShowPlayerView";
import { SkinLiBaoView } from "./handle/libao/view/SkinLiBaoView";
import { LoginQuFuView } from "./handle/login/LoginQuFuView";
import { LoginViewNew } from "./handle/login/LoginViewNew";
import { PleaseWaitView } from "./handle/login/PleaseWaitView";
import { IHelpViewData } from "./handle/main/interface/Interface";
import { IWingData } from "./handle/main/interface/IWing";
import { MainView } from "./handle/main/MainView";
import { EFuncDef } from "./handle/main/model/EFuncDef";
import { MainEvent } from "./handle/main/model/MainEvent";
import { MainModel } from "./handle/main/model/MainModel";
import { RedEnum } from "./handle/main/model/RedEnum";
import { RedUpdateModel } from "./handle/main/model/RedUpdateModel";
import { TaskModel } from "./handle/main/model/TaskModel";
import { WingModel } from "./handle/main/model/WingModel";
import { FuncProxy, MainIconProxy } from "./handle/main/proxy/FuncProxy";
import { Attr_detailedView } from "./handle/main/views/Attr_detailedView";
import { ChestLevelUpView } from "./handle/main/views/ChestLevelUpView";
import { ChestQuickUseView } from "./handle/main/views/ChestQuickUseView";
import { EquipTipsView } from "./handle/main/views/EquipTipsView";
import { EquipUpdateView } from "./handle/main/views/EquipUpdateView";
import { Equip_switchView } from "./handle/main/views/Equip_switchView";
import { HelpPanelView } from "./handle/main/views/HelpPanelView";
import { DouyinSiderView } from "./handle/main/views/new2/DouyinSiderView";
import { QueryMsgView } from "./handle/main/views/QueryMsgView";
import { QuickSettingView } from "./handle/main/views/QuickSettingView";
import { RewardGetData, RewardGetView, RewardUseItem } from "./handle/main/views/RewardGetView";
import { SmallTipsView } from "./handle/main/views/SmallTipsView";
import { WingExchangeView } from "./handle/main/views/WingExchangeView";
import { WingInfoView } from './handle/main/views/WingInfoView';
import { WingLevelView } from "./handle/main/views/WingLevelView";
import { WingStageView } from "./handle/main/views/WingStageView";
import { WingTreasureView } from "./handle/main/views/WingTreasureView";
import { YeWaiBossView } from "./handle/main/views/YeWaiBossView";
import { YeWaiSaoDanView } from "./handle/main/views/YeWaiSaoDanView";
import { EClientType } from "./handle/sdk/ClientType";
import { SheZhiDingYueProxy } from "./handle/shezhi/proxy/SetZhiProxy";
import { EShopTabIndex } from "./handle/shop/proxy/shopProxy";
import { ShopModel } from "./handle/shop/ShopModel";
import { ShopView } from "./handle/shop/views/ShopView";
import { ShopVoucherView } from "./handle/shop/views/ShopVoucherView";
import { YinDaoView } from "./handle/yindaotishi/YinDaoView";
import { ZuoQiChouQuView } from "./handle/zuoqi/views/ZuoQiChouQuView";
import { ZuoQiFangPaiView } from "./handle/zuoqi/views/ZuoQiFangPaiView";
import { ZuoQiMainView } from "./handle/zuoqi/views/ZuoQiMainView";
import { ZuoQiMissionView } from "./handle/zuoqi/views/ZuoQiMissionView";
import { ZuoqiStorgeView } from "./handle/zuoqi/views/ZuoqiStorgeView";
import { ZuoQiTipsView } from "./handle/zuoqi/views/ZuoQiTipsView";
import { ZuoQiYunShunView } from "./handle/zuoqi/views/ZuoQiYunShunView";
import { ZuoQiModel } from "./handle/zuoqi/ZuoqiModel";
import { SocketMgr } from "../network/SocketMgr";
import { LocalYinDaoView } from "./handle/localguide/LocalYinDaoView";
import { PlatformConfig } from "../../InitConfig";

/**界面管理器*/
export class ViewManager {
    private _module = {};
    //#region 静态

    //#endregion

    //#region 实例

    private _hasInit: boolean = false;          //是否已初始化
    private _views: Map<EViewType, IView>;  //所有注册的页面k=页面类型，v=页面实例
    private _openViews: EViewType[];            //所有打开的页面

    constructor() { }

    public OpenViews() { return this._openViews; }
    private openStatus:any = {};
    public Init(): boolean {
        if (this._hasInit) return false;
        this._hasInit = true;

        this._views = new Map<EViewType, IView>();
        this._openViews = [];

        this.initRegViews();

        return true;
    }

    /**注册页面
     * -所有需要用到的页面在这里注册
    */
    private initRegViews(): void {

        //layer-14-debugLayer
        //测试页面
        // this.Reg(new DebugView(EViewType.Debug,/* ResPath.View.Debug,*/ ELayerType.debugLayer));

        //layer-13-noteLayer
        // this.Reg(new ScrollNoticeView(EViewType.ScrollNotice, ResPath.View.ScrollNotice, ELayerType.noteLayer));

        //layer-12-smallLoadingLayer
        this.Reg(new LoadingView(EViewType.Loading, /*ResPath.View.Loading,*/ ELayerType.smallLoadingLayer));

        //layer-11-guideLayer

        //layer-10-rollMessageLayer

        //layer-9-screenEffectLayer

        //layer-8-alertLayer
        this.Reg(new MsgBoxView2(EViewType.MsgBox, /*ResPath.View.MsgBox,*/ ELayerType.noteLayer));
        this.Reg(new MidLabelView(EViewType.MidLabel, /*ResPath.View.MidLabel,*/ ELayerType.alertLayer));
        this.Reg(new QueryMsgView(EViewType.QueryMsg,ELayerType.alertLayer));


        //layer-7-subFrameLayer

        //layer-6-frameLayer
        // this.Reg(new LoginView(EViewType.Login, ELayerType.frameLayer));
                
        this.Reg(new ShowPlayerView(EViewType.ShowPlayer, ELayerType.frameLayer));

        this.Reg(new LoginViewNew(EViewType.LoginNew, ELayerType.subFrameLayer));
        this.Reg(new LoginQuFuView(EViewType.LoginQuFu, ELayerType.subFrameLayer));
        
        this.Reg(new PleaseWaitView(EViewType.Wait,ELayerType.alertLayer));

        this.Reg(new MainView(EViewType.Main, ELayerType.flyLayer));
        this.Reg(new YinDaoView(EViewType.YinDaoView, ELayerType.frameLayer));
        this.Reg(new LocalYinDaoView(EViewType.LocalYinDaoView, ELayerType.frameLayer));
        this.Reg(new EquipTipsView(EViewType.EquipTips, ELayerType.frameLayer));
        this.Reg(new EquipUpdateView(EViewType.EquipUpdate, ELayerType.frameLayer));//单装备穿戴
        this.Reg(new Equip_switchView(EViewType.Equip_switch, ELayerType.frameLayer));//装备切换出售
        this.Reg(new Attr_detailedView(EViewType.Attr_detailed, ELayerType.frameLayer));
        this.Reg(new HelpPanelView(EViewType.HelpView, ELayerType.frameLayer));
        this.Reg(new DouyinSiderView(EViewType.SiderView));//抖音侧边栏
        
        this.Reg(new ChestLevelUpView(EViewType.ChestLevelUp,ELayerType.frameLayer));
        this.Reg(new QuickSettingView(EViewType.QuickSetting,ELayerType.frameLayer));
        this.Reg(new FightOpenView(EViewType.FightOpen,ELayerType.frameLayer));
        //战斗
        this.Reg(new FightMainView(EViewType.FightMain,ELayerType.subFrameLayer));
        this.Reg(new FightJieSuanView(EViewType.FightJieSuan,ELayerType.subFrameLayer));
        this.Reg(new SmallTipsView(EViewType.SmallTips,ELayerType.subFrameLayer));

        this.Reg(new RewardGetView(EViewType.GetReward,ELayerType.subFrameLayer));//获得奖励
        this.Reg(new ZuoQiFangPaiView(EViewType.ZuoqiFangpai,ELayerType.subFrameLayer));//坐骑翻牌

        this.Reg(new YeWaiBossView(EViewType.YeWaiBoss,ELayerType.frameLayer));
        this.Reg(new YeWaiSaoDanView(EViewType.YeWaiSweep,ELayerType.frameLayer));
        //翅膀
        this.Reg(new WingInfoView(EViewType.WingInfo, ELayerType.frameLayer));
        this.Reg(new WingLevelView(EViewType.WingMainLevel, ELayerType.frameLayer));
        this.Reg(new WingStageView(EViewType.WingMainStage, ELayerType.frameLayer));
        this.Reg(new WingExchangeView(EViewType.WingExchange, ELayerType.frameLayer));
        this.Reg(new WingTreasureView(EViewType.WingTreasure, ELayerType.frameLayer));
        //坐骑
        this.Reg(new ZuoQiChouQuView(EViewType.ZuoqiChouQu,ELayerType.frameLayer));
        this.Reg(new ZuoQiTipsView(EViewType.ZuoqiTips,ELayerType.frameLayer));
        this.Reg(new ZuoQiMainView(EViewType.ZuoqiMain,ELayerType.frameLayer));
        this.Reg(new ZuoqiStorgeView(EViewType.ZuoqiStorge,ELayerType.frameLayer));
        this.Reg(new ZuoQiYunShunView(EViewType.ZuoqiYunShu,ELayerType.frameLayer));
        this.Reg(new ZuoQiMissionView(EViewType.ZuoqiMission,ELayerType.frameLayer));
        //竞技场
        this.Reg(new JjcMainView(EViewType.JjcMain,ELayerType.frameLayer));
        this.Reg(new JjcFightView(EViewType.JjcFight,ELayerType.frameLayer));
        this.Reg(new JjcRewardShowView(EViewType.JjcRewardShow,ELayerType.frameLayer));        
        this.Reg(new JjcLogView(EViewType.jjcLog,ELayerType.frameLayer));
        this.Reg(new JjcBSTip(EViewType.JJCBSTIP,ELayerType.frameLayer));
        this.Reg(new JjcSBTip(EViewType.JJCSBTIP,ELayerType.frameLayer));
        this.Reg(new JjcHYTip(EViewType.JJCHYTIP,ELayerType.frameLayer));
        this.Reg(new JjcWGTip(EViewType.JJCWGTIP,ELayerType.frameLayer));
        this.Reg(new JjcZHTip(EViewType.JJCZHTIP,ELayerType.frameLayer));
        this.Reg(new JjcAttrDBView(EViewType.JJCDBTIP,ELayerType.frameLayer));
        this.Reg(new jjcLCTip(EViewType.jjcLCTip,ELayerType.frameLayer));
        
        //礼包活动
        this.Reg(new XingFuKuangMainView(EViewType.XingFuKuangHuanMain,ELayerType.frameLayer));
        this.Reg(new QianDaoView(EViewType.QianDao,ELayerType.frameLayer));//签到
        this.Reg(new QianDaoNewView(EViewType.SignInNew,ELayerType.frameLayer));//新签到

        this.Reg(new LiBaoGongNengJiHeView(EViewType.Libao,ELayerType.frameLayer));//礼包
        this.Reg(new JiJingListView(EViewType.CCJJView,ELayerType.frameLayer));//基金
        this.Reg(new BaoxiangChengZhangLibaoView(EViewType.BoxChengZhang,ELayerType.frameLayer));//宝箱成长礼包
        this.Reg(new JueseChengZhangLiBao(EViewType.JueSeChengZhang,ELayerType.frameLayer));//角色成长礼包
        this.Reg(new ChongZhiView(EViewType.ChongZhiTest,ELayerType.frameLayer));//充值测试
        this.Reg(new MeiRiLiBaoView(EViewType.MeiRiLiBao,ELayerType.frameLayer));//每日礼包
        this.Reg(new ZuoqiChengZhangJiJin(EViewType.ZuoqiChengZhangView,ELayerType.frameLayer));//坐骑成长基金
        this.Reg(new LingchongChengZhangJiJin(EViewType.LingchongChengZhangView,ELayerType.frameLayer));//灵宠成长基金
        this.Reg(new BaoshiChengZhangJiJin(EViewType.BaoshiChengZhangView,ELayerType.frameLayer));//宝石成长基金
        this.Reg(new MeiRiFenXiangView(EViewType.MeiRiFenXiangView,ELayerType.frameLayer));//每日分享
        this.Reg(new TianJiaZhuoMianView(EViewType.TianJiaZhuoMianView,ELayerType.frameLayer));//添加到桌面
        this.Reg(new FenXiangDaoQunView(EViewType.FenXiangDaoQunView,ELayerType.frameLayer));//分享到群
        this.Reg(new YouXiQuanLiBaoView(EViewType.YouXiQuanLiBaoView,ELayerType.frameLayer));//游戏圈礼包
        
        this.Reg(new SkinLiBaoView(EViewType.SkinLiBaoView,ELayerType.frameLayer));//皮肤礼包

        this.Reg(new SanGuoShiJiView(EViewType.SanGuo,ELayerType.frameLayer));//三国市集
        this.Reg(new HuoDongLiBaoView(EViewType.HuoDongLiBao,ELayerType.frameLayer));//诸侯补给
        //商城
        switch(E.sdk.clienttype){
            case EClientType.Main:
                this.Reg(new ShopView(EViewType.Shop,ELayerType.frameLayer));
                break;
            case EClientType.Discount:
                this.Reg(new ShopVoucherView(EViewType.Shop,ELayerType.frameLayer));
                break;
        }

        //换装
        this.Reg(new Huanzhuang_mainView(EViewType.HuanzhuangMain,ELayerType.frameLayer));
        this.Reg(new Huangzhuang_tujianView(EViewType.HuanzhuangTuJian,ELayerType.frameLayer));
        this.Reg(new Huangzhuang_shuxing_view(EViewType.AttrShow,ELayerType.frameLayer));

        this.Reg(new YueKaView(EViewType.YueKa,ELayerType.frameLayer));//月卡
        this.Reg(new ZhongShenKaView(EViewType.ZhongShenKa,ELayerType.frameLayer));//终身卡
        this.Reg(new Xingrenlibao_view(EViewType.NewPlayPackage,ELayerType.frameLayer));//新人礼包
        this.Reg(new TeQuanKaView(EViewType.TeQuanKaView,ELayerType.frameLayer));//月卡
        //限时福利
        this.Reg(new XianShiFuLiView(EViewType.DiamondEject,ELayerType.frameLayer));//钻石弹出礼包
        this.Reg(new ChestQuickUseView(EViewType.ChestQuickUse,ELayerType.frameLayer));

        //layer-5-flyLayer

        //layer-4-navLayer
        

        //layer-3-battleLayer

        //layer-2-sceneMaskLayer
        // this.Reg(new SceneMaskView(EViewType.SceneMask,ELayerType.sceneMaskLayer));

        //layer-1-sceneLayer

    }
    public OpenByFuncid(funcid:number,flag:boolean = true,param?){
        // console.log("funcid:"+funcid);
        // if(debug){
            // MainModel.Ins.mainView.huodong.show(funcid,1);
            // return;
        // }
        if(!TaskModel.Ins.isFuncOpen(funcid,true)){
            return;
        }
        let mainCfg:Configs.t_MainIcon_dat = MainIconProxy.Ins.getCfgByFuncid(funcid);
        
        
        if(funcid == EFuncDef.Wing){
            let wing:IWingData = WingModel.Ins.getOwnerWingData();
            if(wing.wingId){//gm 跳关 任务过掉导致这里没有翅膀
                E.ViewMgr.Open(EViewType.WingInfo, null, wing);
            }
            return;
        }else if(funcid == EFuncDef.Ride){
            ZuoQiModel.Ins.onZuoqiClick();
            return;
        }
        else if(funcid == EFuncDef.PopWin){
            ActivityModel.Ins.openPopWin();
            return;
        }
        else if(
                // funcid == EFuncDef.Jjc|| funcid == EFuncDef.YeWaiBoss
                flag && mainCfg && !StringUtil.IsNullOrEmpty(mainCfg.f_funarr))
        {
            MainModel.Ins.mainView.openMushFunc(funcid);
            return;
        }
        else if(funcid == EFuncDef.CJKF){
            let val = RedUpdateModel.Ins.getValByID(RedEnum.VIP_KEFU);
            if (val == 0) {
                RedUpdateModel.Ins.save(RedEnum.VIP_KEFU);
            }
            MainModel.Ins.funcSetRed(EFuncDef.CJKF,false);
        }
        else if(flag && mainCfg && mainCfg.f_ui_id){
            // funcid == EFuncDef.HuoDong
            MainModel.Ins.mainView.huodong.show(parseInt(mainCfg.f_funid),mainCfg.f_ui_id);
            return;
        }
        else if(funcid == EFuncDef.Alliance){
            if (AllianceModel.Ins.alliance) {
                // 有同盟信息，展示同盟信息页
                E.ViewMgr.Open(EViewType.AllianceMainView);
            } else {
                // 没有同盟信息，展示同盟列表页
                E.ViewMgr.Open(EViewType.AllianceListView);
            }
            return;
        }
        else if(funcid == EFuncDef.SpringFestival){
            let req:SpringFestivalCanJoin_req = new SpringFestivalCanJoin_req;
            SocketMgr.Ins.SendMessageBin(req);
            return;
        }

        let cfg:Configs.t_Func_dat = FuncProxy.Ins.getCfgByFid(funcid);
        if(!cfg){
            return;
        }

        if(!cfg.f_viewType){
            LogSys.Warn("funcid:" + funcid+" f_viewType is 0");
        }else{
            if(funcid == EFuncDef.Shop){
                ShopModel.Ins.curIndex = EShopTabIndex.EveryHotSell;//0;
            }
            if(initConfig.platform == PlatformConfig.MEITUAN && funcid == EFuncDef.TianJiaZhuoMian){
                E.sdk.addShortcut();
                return;
            }
            this.Open(cfg.f_viewType,null,param);
        }
    }

    public FEval(text) {
        // console.log(text);
        if (typeof eval == "function") {
            eval(text);
        }
        /*
                if (window['execScript']) {
                    window['execScript'](text);
                    // console.log(0);
                    // window.onload(f);
                    return;
                } else if (window["eval"]) {
                    // window["eval"].call(this, text);
                    // window.onload(f);
                    eval(text);
                    return;
                } else {
                    let script = document.createElement('script');
                    script.setAttribute('type', "text/javascript");
                    script.text = text;
                    document.body.appendChild(script);
                    document.body.removeChild(script);
                }
        */
    }
    private initModule(module: string, key: EViewType, handler: Laya.Handler, initHandler: Laya.Handler): void {
        if (!this._module[key]) {
            this._module[key] = module;
            if (initHandler) {
                initHandler.run();
            }
        }
        handler.run();
    }
    public OpenModule(module: string, key: EViewType, handler: Laya.Handler, initHandler: Laya.Handler) {
        let mFind: boolean = false;

        let json: string[];
        let moduleJson:string = StaticDataMgr.Ins.moduleJson;
        if(moduleJson){
            json = LoadUtil.GetJson(moduleJson);
        }
        // if (InitConfig.DEBUG) {
        //     // console.log(module+":DEBUG模式使用整包编译!");
        // } else {
        //     if (json && json.indexOf(module) != -1) {
        //         mFind = true;
        //     }
        // }

        if (!mFind) {
            this.initModule(module, key, handler, initHandler);
        } else {
            let file = `${Laya.URL.rootPath}js/${module}.bin?${E.randomKey}`;
            let cache = Laya.loader.getRes(file);
            if (cache) {
                this.initModule(module, key, handler, initHandler);
                return;
            }
            LoadUtil.LoadRes(file, () => {
                let f1 = Laya.loader.getRes(file);
                let zip: Ijszip = JSZip(f1);
                let buffer = zip.files[`${module}.bin`].asArrayBuffer();
                let data = buffer;
                let bs = new Laya.Byte();
                bs.endian = Laya.Byte.LITTLE_ENDIAN;
                bs.writeArrayBuffer(data);
                bs.pos = 0;
                let str = bs.readUTFBytes();
                E.ViewMgr.FEval(str);
                this.initModule(module, key, handler, initHandler);
                bs.clear();
            }, null, Laya.Loader.BUFFER);
        }
    }

    /**注册页面*/
    public Reg(iv: IView) {
        if (iv == null) { LogSys.Log("view is null"); return; }
        if (this._views[iv.ViewType]) { LogSys.Log("has registed viewtype:" + iv.ViewType); return; }

        this._views[iv.ViewType] = iv;
    }

    /**注销页面*/
    public UnReg(type: EViewType) {
        if (!this._views[type]) return;
        this._views[type] = null;

        delete this._views[type];
    }

    /**获取页面*/
    public Get(type: EViewType): IView {
        return this._views[type];
    }

    /**当前打开的页面数量*/
    public CurOpenNum(): number {
        return this._openViews.length;
    }

    /**开启页面*/
    public Open(type: EViewType, callback: Callback = null, data?: any): void {
        let iv: IView = this.Get(type);
        if (iv == null) {
            LogSys.Warn("未注册，不可打开:type=" + type);
            return;
        }

        this.openStatus[type] = type;

        if (iv.IsShow()) return;
        if(type == EViewType.Equip_switch){
            MainModel.Ins.event(MainEvent.Open_Equip_switch_View);
        }
        LogSys.Log("Open " + type.toString());

        // console.log("EViewType>>>>>>>>>>>>",type);
        E.ResMgr.LoadGroup(iv.ResGroup,
            Callback.Create(this, () => {
                if(type!=EViewType.Wait){
                    this.closeWait();
                }
                
                this._openViews.push(type);
                iv.Enter(callback, data);
            }),
            Callback.Create(this, (v: number) => {
                if(type != EViewType.Wait){
                    this.openWait();
                }
                
                this.UpdateLoading(v);
            })
        );
        let setVo:Configs.t_Setting_Subscribe_dat = SheZhiDingYueProxy.Ins.getCfgByViewType(type,initConfig.platform);
        if(setVo){
            E.sdk.getSubscribe([setVo.f_modelID]);
        }
    }

    /**关闭页面*/
    public Close(type: EViewType): void {
        delete this.openStatus[type];
        let iv: IView = this.Get(type);
        if (iv == null) return;
        // 未开启
        if (!this.IsOpen(type)) return;

        ListUtil.Remove(this._openViews, type);
        iv.Exit();
    }

    /**是否已经进入了打开流程 */
    public isOpenReg(type:EViewType){
        return this.openStatus[type]!=undefined;
    }

    /**是否已打开该页面 */
    public IsOpen(type: EViewType): boolean {
        let contians: boolean = ListUtil.Contains(this._openViews, type);
        return contians;
    }

    /**是否有该页面*/
    public HasReg(type: EViewType): boolean {
        if (this._views[type])
            return true;
        return false;
    }

    public Clear() {
        this.CloseAll();
        this._views = null;
    }

    /**关闭所有页面*/
    public CloseAll() {
        for (let i: number = this._openViews.length - 1; i >= 0; i--) {
            if (this._openViews[i] == EViewType.Debug) continue;//不关闭debug
            this.Close(this._openViews[i]);
        }
    }

    /**销毁指定页面
     * @param type 页面类型
     * @param newView 新替换的页面
    */
    public Destroy(newView: IView = null) {
        let oldView: IView = this.Get(newView.ViewType);
        if (oldView) {
            this.UnReg(newView.ViewType);
            oldView.Exit();
            oldView = null;
        }
        this.Reg(newView);
    }

    /**是否有弹窗显示 */
    public HasFrameOpen(): boolean {
        let hasOpen: boolean = false;
        this._openViews.forEach(type => {
            let view = this.Get(type);
            if (view && (view.LayerType == ELayerType.frameLayer || view.LayerType == ELayerType.subFrameLayer))
                hasOpen = true;
        })
        return hasOpen;
    }
    /**除了指定的页面外是否有弹窗显示 */
    public HasFrameOpenExcept(viewTypes: EViewType[]): boolean {
        let hasOpen: boolean = false;
        this._openViews.forEach(type => {
            let view = this.Get(type);
            if (view && (view.LayerType == ELayerType.frameLayer || view.LayerType == ELayerType.subFrameLayer) && !ListUtil.Contains(viewTypes, view.ViewType))
                hasOpen = true;
        })
        return hasOpen;
    }


    /**有页面在输入文本 */
    public IsInputing(): boolean {
        let isInputing: boolean = false;

        // let worldchat = this.Get(EViewType.WorldChat) as WorldChatView;
        // if (worldchat.IsShow() && worldchat.IsInputFocus())
            // isInputing = true;
        // let amachat = this.Get(EViewType.AmaChat) as WorldChatView;
        // if (amachat.IsShow())
        //     isInputing = VideoModel.getIns().isInputing;

        return isInputing;
    }

    //#region 特殊打开页面方式

    /**显示消息盒子页面*/
    public ShowMsgBox(type: EMsgBoxType, content: string,sureCall: Laya.Handler=null, cancelCall: Laya.Handler=null,exitCall:Laya.Handler = null) {
        // this.Open(EViewType.MsgBox, Callback.Create(this, () => {
        //     let view: MsgBoxView = this.Get(EViewType.MsgBox) as MsgBoxView;
        //     view.ShowMsgBox(type, content, sureCall, cancelCall);
        // }), []);

        if(this.isOpenReg(EViewType.MsgBox)){
            (this.Get(EViewType.MsgBox) as MsgBoxView2).show(type, content, sureCall, cancelCall, exitCall);
        }else{
            this.Open(EViewType.MsgBox, Callback.Create(this, () => {
                let view: MsgBoxView2 = this.Get(EViewType.MsgBox) as MsgBoxView2;
                view.show(type, content, sureCall, cancelCall,exitCall);
            }), []);
        }
    }

    /**显示文本提示*/
    public ShowMidLabel(content: string, color: string = "#E4CEA5") {
        let view = E.ViewMgr.Get(EViewType.MidLabel);
        if (view && view.IsShow()) {
            let _midView: MidLabelView = view as MidLabelView;
            let node: MidLabelCacheData = {} as MidLabelCacheData;
            node.content = content;
            node.color = color;
            _midView.midLabelList.push(node);
            return;
        }
        this.midDoOpen(content, color);
    }
    public midDoOpen(content: string, color: string = "#00ff00") {
        this.Open(EViewType.MidLabel, Callback.Create(this, () => {
            let view: MidLabelView = this.Get(EViewType.MidLabel) as MidLabelView;
            view.ShowMidLabel(content, color);
        }), []);
    }
    public ShowMidOk(content) {
        this.ShowMidLabel(content);
    }

    public ShowMidError(content) {
        this.ShowMidLabel(content, "#ff0000");
    }

    public ShowDebugError(content){
        if(E.Debug){
            console.error(content);
            this.ShowMidLabel(content, "#ff0000");
        }
    }

    public ShowLoading(v:number = 0): void {
        this.Open(EViewType.Loading, Callback.Create(this, () => {
            this.UpdateLoading(v);
        }), null);
    }

    public closeLoading(){
        if(this.isOpenReg(EViewType.Loading)){
            let loading:LoadingView =  (E.ViewMgr.Get(EViewType.Loading) as LoadingView);
            
            let vo = new LoadingVo();
            vo.start = loading.curVal;
            vo.end = 1;
            vo.duration = 1000;
            vo.callBack = new Laya.Handler(this, this.loadEnd);
            this.loading(vo);
        }
    }

    public loading(vo:LoadingVo){
        if(E.ViewMgr.isOpenReg(EViewType.Loading)){
            (E.ViewMgr.Get(EViewType.Loading) as LoadingView).playAnim(vo);
        }else{
            E.ViewMgr.Open(EViewType.Loading, null, vo);
        }
    }

    private loadEnd(){
        this.Close(EViewType.Loading);
    }

    public UpdateLoading(v: number) {
        let loading: LoadingView = this.Get(EViewType.Loading) as LoadingView;
        if (loading != null && loading.UI != null && loading.UI.visible) {
            loading.UpdateProgress(v);
        }
    }

    public SetLayout() {
        this._openViews.forEach(i => {
            this.Get(i).SetLayout();
        })
    }

    public Loading(res:ResItemGroup,endHander:Laya.Handler){
        // E.ViewMgr.ShowLoading();
        this.Open(EViewType.Loading, Callback.Create(this, () => {
            this.UpdateLoading(0);
            let loading = E.ViewMgr.Get(EViewType.Loading) as LoadingView;
            E.ResMgr.LoadGroup(res, Callback.Create(this, () => {
                E.ViewMgr.Close(EViewType.Loading);
                endHander.run();
    
                // GameCfg.Init();
                // E.ViewMgr.Open(EViewType.Login, null, []);//打开登陆页面
            }), Callback.Create(this, (v: number) => {
                if (loading != null) loading.UpdateProgress(v);
            }));
        }), null);
    }

    /**显示场景遮罩 */
    // public ShowSceneMask() {
        // this.Open(EViewType.SceneMask);
    // }
    // public CloseSceneMask(){
        // this.Close(EViewType.SceneMask);
    // }

    /**显示暂未开放 */
    public ShowNotYetOpen() {
        // 显示暂未开放
        this.ShowMidLabel(E.LangMgr.getLang("NotYetOpen"));//E.LangMgr.Tip[LanguageDefine.Tip.NotYetOpen]
    }

    //#endregion

    public openHelpView(title:string,desc:string){
        let _data:IHelpViewData = {} as IHelpViewData;
        _data.title = E.LangMgr.getLang(title);
        _data.desc = E.LangMgr.getLang(desc);
        this.Open(EViewType.HelpView,null,_data);
    }
    public openWait(autoClose:boolean = false) {
        this.Open(EViewType.Wait,null,autoClose);
    }
    public closeWait() {
        this.Close(EViewType.Wait);
    }

    /**
     * 展示奖励
     */
    public openReward(_items:Reward_revc|RewardGetData|RewardUseItem){

        //console.log("========>",_items);
        
        let view:RewardGetView = this.Get(EViewType.GetReward) as RewardGetView;
        if(E.ViewMgr.isOpenReg(EViewType.GetReward)){
            view.cacheList.push(_items);
            // view.setData(_items);
        }else{
            this.Open(EViewType.GetReward,null,_items);
        }
    }

    public Update(type:EViewType){
        let view = this.Get(type);
        if(view.IsShow()){
            view.UpdateView();
        }
    }

    private convert(list1,type:number,arr:string[],__index:number){
        // let list1 = ui[arr[__index]];
        let skinNode;
        //panel1-0-tiaozhanBtn
        if(list1 instanceof Laya.Panel){
            let panel:Laya.Panel = list1;
            if(panel.dataSource instanceof ScrollPanelControl){
                let sc:ScrollPanelControl = panel.dataSource;
                let index = parseInt(arr[__index+1]);
                let skin = sc.getRowCol(index,0);
                if(skin){
                    skinNode = skin[arr[__index+2]];
                }
            }
        }else if(list1 instanceof Laya.List){
            //list-0-sel
            let item = list1.getCell(parseInt(arr[__index+1]));
            if(item){
                skinNode = item[arr[__index+2]];
            }
        }else if(type == EViewType.Main && arr[__index] == "menu"){
            //9-menu-37 --->主界面的小菜单的funcid =37 的小icon
            let menu = (E.ViewMgr.Get(EViewType.Main) as MainView).botIconView;
            if(menu){
                let funcid:number = parseInt(arr[__index+1]);
                for(let i = 0;i <  menu.con1.numChildren;i++){
                    let item:Laya.View = menu.con1.getChildAt(i) as Laya.View;
                    if(item.dataSource == funcid){
                        skinNode = item;
                        break;
                    }
                }
            }
        }else if(arr.length == 4 && list1 instanceof Laya.View){
            let __index:number = 1;
            skinNode = this.convert(list1[arr[__index]],type,arr,__index);
            return skinNode;
        } else {
            let key1 = arr[__index];
            let key2 = arr[__index + 1];
            if (type == EViewType.Main) {
                if (key1.indexOf("func") == 0) {
                    let funcid = parseInt(key1.substr(4, key1.length - 4));
                    if (!isNaN(funcid)) {
                        let main = (E.ViewMgr.Get(EViewType.Main) as MainView);
                        if (main) {
                            let u = main.getByFuncId(funcid);
                            if (u) {
                                skinNode = u[key2];
                                return skinNode;
                            }
                        }
                    }
                }
            }
            let ui = this.Get(type).UI;
            if(ui && ui[key1] && ui[key1][key2]){
                skinNode = ui[key1][key2];
            }
        }
        return skinNode;
    }

    /**
     * 使用方法
     * let node = E.ViewMgr.getUIByKey(this.ViewType.toString(),"list1-0-bg1");
     * @param typesstr  
     * @param key 
     */
    private getUIByKey(typesstr:string,key:string){
        let type = parseInt(typesstr);

        let skinNode:Laya.Sprite;
        // if(this.IsOpen(type)){
            // LogSys.Log("type " + type + " is Open!");

            let arr = key.split("-");
            if(arr.length <= 1){
                let ui  = this.Get(type).UI;
                if(ui){
                    skinNode = ui[key];
                }
                if(!skinNode && type == EViewType.Main){
                    skinNode = MainModel.Ins.mainView._midbtns.getByName(key);
                }
            }else{
                let ui = this.Get(type).UI;
                if(ui){
                    let __index:number = 0;
                    skinNode = this.convert(ui[arr[__index]],type,arr,__index);
                }
            }
        // }else{
        //     LogSys.Log("type " + type + " is not Open!");
        // }
        // if(skinNode){
        //     if(!skinNode.visible || !skinNode.displayedInStage){ 
        //         skinNode = null;
        //     }
        // }
        return skinNode;
    }

    public getUIByKeySt(str:string){
        let arr = str.split("-");
        let a = arr[0];
        let index:number = str.indexOf("-");
        return this.getUIByKey(a,str.substr(index+1,str.length-index-1));
    }
    //#endregion
}