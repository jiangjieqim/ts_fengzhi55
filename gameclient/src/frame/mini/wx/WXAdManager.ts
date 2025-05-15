import { EBannerAdType, EGridAdType, EInterstitialAdType, ERewardVideoAdType } from "../../../game/common/defines/EnumDefine";
import { LogSys } from "../../log/LogSys";
import {WXMiniHelp} from "./WXMiniHelp";

/**微信广告管理器*/
export class WXAdManager {

    constructor() {
        this.bShowAd = false;
    }
    public static get Ins() {
        if (!this._ins) this._ins = new WXAdManager();
        return this._ins;
    }
    private static _ins: WXAdManager;

    /**是否显示广告*/
    private bShowAd: boolean = false;
    public get BShowAd(): boolean { return this.bShowAd; };
    public set BShowAd(b: boolean) {
        this.bShowAd = b;
        if (b) {//显示广告 初始化广告
            this.createAd();
        }
        else {//不显示广告 销毁广告
            this.destroyAllAd();
        }
    }

    public Init() {
        this.onInitCfg();
    }

    private createAd() {
        LogSys.Log("[WXAdManager],[createAd]")
        //创建广告
        this.CreateBannerAd(EBannerAdType.Home, null, null, null);
        // this.CreateGridAd(EGridAdType.Home, null, null, null);
        // this.CreateInterstitialAd(EInterstitialAdType.Home, null, null, null);
    }


    //
    private cfg_bShowAd: boolean = false;
    private cfg_BannerAd: any;
    private cfg_RewardVideoAd: any;
    private cfg_InterstitialAd: any;
    private cfg_GridAd: any;

    /**初始化广告配置
     * 在加载完配置文件后调用
    */
    private onInitCfg() {
        let json;// = E.ResMgr.GetWxAdsCfg();
        if (json) {
            // Log.Log("" + JSON.stringify(json));
            this.cfg_bShowAd = json["bOpenAds"];
            this.cfg_BannerAd = json["BannerAds"];
            this.cfg_RewardVideoAd = json["RewardVideoAds"];
            this.cfg_InterstitialAd = json["IntersititialAds"];
            this.cfg_GridAd = json["GridAds"];

            this.onInitBannerAdCfg();
            this.onInitRewardVideoAdCfg();
            this.onInitInterstitialAdCfg();
            this.onInitGridAdCfg();

            this.BShowAd = this.cfg_bShowAd;
        }
    }

    /**销毁所有广告*/
    private destroyAllAd() {
        this.destroyAllBannerAd();
        this.destroyAllRewardVideoAd();
        this.destroyAllInterstitialAd();
        this.destroyAllGridAd();
    }


    //#region 横幅广告
    private _bannerAdCfg_Home: any;//首页

    private _bannerAd_Home: any;

    /**初始化横幅广告配置*/
    private onInitBannerAdCfg() {
        if (this.cfg_BannerAd) {
            LogSys.Log("[onInitBannerAdCfg],cfg_BannerAd::" + JSON.stringify(this.cfg_BannerAd));

            this._bannerAdCfg_Home = this.cfg_BannerAd["Home"];
        }
    }

    /**创建banner广告*/
    public CreateBannerAd(type: EBannerAdType, onLoadCall: Function, onErrorCall: null, onResizeCall: null) {

        if (!this.BShowAd) return;

        let temp;
        LogSys.Log("[CreateBannerAd]::type::" + type)

        if (type == EBannerAdType.Home) {
            LogSys.Log("[CreateBannerAd]::home" + JSON.stringify(this._bannerAdCfg_Home));
            if (!this._bannerAd_Home && this._bannerAdCfg_Home) {
                LogSys.Log("CreateBannerAd...........ing");
                temp = this._bannerAd_Home = this.createBannerAd(this._bannerAdCfg_Home[0], this._bannerAdCfg_Home[1], this._bannerAdCfg_Home[2], this._bannerAdCfg_Home[3], this._bannerAdCfg_Home[4]);
            }
        }

        if (temp != null) {
            this.bannerAddListener(temp, onLoadCall, onErrorCall, onResizeCall);
        }
    }

    /**显示banner广告*/
    public ShowBannerAd(type: EBannerAdType) {
        if (!this.BShowAd) return;

        if (type == EBannerAdType.Home && this._bannerAd_Home) {
            this.showBannerAd(this._bannerAd_Home);
        }
    }

    /**隐藏banner广告*/
    public HideBannerAd(type: EBannerAdType) {

        if (type == EBannerAdType.Home) {
            this.hideBannerAd(this._bannerAd_Home);
        }
    }

    /**创建banner*/
    private createBannerAd(id: string, x: number, y: number, w: number, h: number) {
        return WXMiniHelp.CreateBannerAd(id, x, y, w, h);
    }
    /**销毁banner*/
    private destroyBannerAd(ad: any) {
        this.bannerRemoveListener(this._bannerAd_Home, null, null, null);
        WXMiniHelp.DestroyBannerAd(ad);
    }
    /**显示banner*/
    private showBannerAd(ad: any) {
        return WXMiniHelp.ShowBannerAd(ad);
    }
    /**隐藏banner*/
    private hideBannerAd(ad: any) {
        WXMiniHelp.HideBannerAd(ad);
    }
    /**添加banner监听*/
    private bannerAddListener(ad: any, onLoadCall: Function, onErrorCall: Function, onResizeCall: Function) {
        if (onLoadCall != null) {
            WXMiniHelp.BannerAd_OnLoad(ad, onLoadCall);
        }
        if (onErrorCall != null) {
            WXMiniHelp.BannerAd_OnError(ad, onErrorCall);
        }
        if (onResizeCall != null) {
            WXMiniHelp.BannerAd_OnResize(ad, onResizeCall);
        }
    }

    /**移除banner监听*/
    private bannerRemoveListener(ad: any, offLoadCall: Function, offErrorCall: Function, offResizeCall: Function) {
        WXMiniHelp.BannerAd_OffLoad(ad, offLoadCall);
        WXMiniHelp.BannerAd_OffError(ad, offErrorCall);
        WXMiniHelp.BannerAd_OffResize(ad, offResizeCall);
    }

    /**销毁所有banner广告*/
    private destroyAllBannerAd() {
        this.destroyBannerAd(this._bannerAd_Home);
    }


    //#endregion

    //#region 激励视频广告
    private _rewardVideoAdCfg_Settle: any;//结算

    private _rewardVideoAd_Settle: any;//结算翻倍

    private _curVideoAd: any;//当前正在播放的激励视频

    /**初始化激励视频广告配置*/
    private onInitRewardVideoAdCfg() {
        if (this.cfg_RewardVideoAd) {
            this._rewardVideoAdCfg_Settle = this.cfg_RewardVideoAd["Settle"];
        }
    }

    /**创建激励视频广告*/
    public CreateRewardVideoAd(type: ERewardVideoAdType, onLoadCall: Function, onErrorCall: Function, onCloseCall: Function) {
        if (!this.BShowAd) return;

        let temp;
        if (type == ERewardVideoAdType.Settle) {
            if (this._rewardVideoAd_Settle == null && this._rewardVideoAdCfg_Settle != null) {
                temp = this._rewardVideoAd_Settle = WXMiniHelp.CreateVideoAd(this._rewardVideoAdCfg_Settle[0]);
            }
        }

        if (temp != null) {
            this.rewardVideoAdAddListener(temp, onLoadCall, onErrorCall, onCloseCall);
        }
    }

    /**显示激励视频广告*/
    public ShowRewardVideoAd(type: ERewardVideoAdType) {
        if (!this.BShowAd) return;

        if (type == ERewardVideoAdType.Settle) {
            this.showRewardVideoAd(this._rewardVideoAd_Settle);
        }

    }

    /**显示激励视频广告*/
    private showRewardVideoAd(ad: any) {
        WXMiniHelp.ShowRewardVideoAd(ad);
    }

    /**加载激励视频广告*/
    private loadRewardVideoAd(ad: any) {
        WXMiniHelp.LoadRewardVideoAd(ad);
    }

    /**销毁激励视频广告*/
    private destroyRewardVideoAd(ad: any) {
        this.rewardVideoAdRemoveListener(ad, null, null, null);
        WXMiniHelp.DestroyRewardVideoAd(ad);
    }

    /**添加激励视频广告监听*/
    private rewardVideoAdAddListener(ad: any, onLoadCall: Function, onErrorCall: Function, onCloseCall: Function) {
        if (onLoadCall != null)
            WXMiniHelp.RewardVideoAd_OnLoad(ad, onLoadCall);
        if (onErrorCall != null)
            WXMiniHelp.RewardVideoAd_OnError(ad, onErrorCall);
        if (onCloseCall != null)
            WXMiniHelp.RewardVideoAd_OnClose(ad, onCloseCall);
    }

    /**移除激励视频广告监听*/
    private rewardVideoAdRemoveListener(ad: any, offLoadCall, offErrorCall, offCloseCall) {
        WXMiniHelp.RewardVideoAd_OnLoad(ad, offLoadCall);
        WXMiniHelp.RewardVideoAd_OnError(ad, offErrorCall);
        WXMiniHelp.RewardVideoAd_OnClose(ad, offCloseCall);
    }

    private destroyAllRewardVideoAd() {
        this.destroyRewardVideoAd(this._rewardVideoAd_Settle);

    }

    //#endregion

    //#region 插屏广告

    private _interstitialAdCfg_Home: any;//首页

    private _interstitialAd_Home: any;//首页

    /**初始化插屏广告配置*/
    private onInitInterstitialAdCfg() {
        if (this.cfg_InterstitialAd) {
            this._interstitialAdCfg_Home = this.cfg_InterstitialAd["Home"];
        }
    }

    /**创建插屏广告
     * @param type 广告类型
    */
    public CreateInterstitialAd(type: EInterstitialAdType, onLoadCall: Function, onErrorCall: Function, onCloseCall: Function) {
        if (!this.BShowAd) return;

        let tmp;
        if (type == EInterstitialAdType.Home) {
            if (this._interstitialAd_Home == null && this._interstitialAdCfg_Home != null) {
                tmp = this._interstitialAd_Home = this.createInterstitialAd(this._interstitialAdCfg_Home[0]);
            }
        }


        if (tmp != null) {
            this.interstitialAdAddListener(tmp, onLoadCall, onErrorCall, onCloseCall);
        }
    }
    /**显示插屏广告*/
    public ShowInterstitialAd(type: EInterstitialAdType) {
        if (!this.BShowAd) return;

        if (type == EInterstitialAdType.Home) {
            this.showInterstitialAd(this._interstitialAd_Home);
        }

    }

    /**创建插屏广告*/
    private createInterstitialAd(id: string) {
        return WXMiniHelp.createInterstitialAd(id);
    }
    /**显示插屏广告*/
    private showInterstitialAd(ad: any) {
        WXMiniHelp.ShowInterstitialAd(ad);
    }
    /**加载插屏广告*/
    private loadInterstitialAd(ad: any) {
        WXMiniHelp.LoadInterstitialAd(ad);
    }
    /**销毁插屏广告*/
    private destroyInterstitialAd(ad: any) {
        this.interstitialAdRemoveListener(ad, null, null, null);
        WXMiniHelp.DestroyInterstitialAd(ad);
    }

    /**添加插屏广告监听*/
    private interstitialAdAddListener(ad: any, onLoadCall: Function, onErrorCall: Function, onCloseCall: Function) {
        if (onLoadCall != null)
            WXMiniHelp.InterstitialAd_OnLoad(ad, onLoadCall);
        if (onErrorCall != null)
            WXMiniHelp.InterstitialAd_OnError(ad, onErrorCall);
        if (onCloseCall != null)
            WXMiniHelp.InterstitialAd_OnClose(ad, onCloseCall);
    }

    /**移除插屏广告监听*/
    private interstitialAdRemoveListener(ad: any, offLoadCall: Function, offErrorCall: Function, offCloseCall: Function) {
        WXMiniHelp.InterStitalAd_OffLoad(ad, offLoadCall);
        WXMiniHelp.InterStitalAd_OffError(ad, offErrorCall);
        WXMiniHelp.InterstitalAd_OffClose(ad, offCloseCall);
    }

    /**销毁所有插屏广告*/
    private destroyAllInterstitialAd() {
        this.destroyInterstitialAd(this._interstitialAd_Home);

    }


    //#endregion

    //#region 格子广告
    private _gridAdCfg_Home: any;//

    private _gridAd_Home: any;//


    /**初始化格子广告配置*/
    private onInitGridAdCfg() {
        if (this.cfg_GridAd) {
            this._gridAdCfg_Home = this.cfg_GridAd["Home"];

        }
    }

    /**创建格子广告*/
    public CreateGridAd(type: EGridAdType, onLoadCall: Function, onErrorCall: Function, onResizeCall: Function) {
        if (!this.BShowAd) return;

        let tmp;
        if (type == EGridAdType.Home) {
            if (this._gridAd_Home == null && this._gridAdCfg_Home != null) {
                tmp = this._gridAd_Home = this.createGridAd(this._gridAdCfg_Home[0], this._gridAdCfg_Home[1], this._gridAdCfg_Home[2], this._gridAdCfg_Home[3], this._gridAdCfg_Home[4], this._gridAdCfg_Home[5], this._gridAdCfg_Home[6]);
            }
        }

        if (tmp != null) {
            this.gridAdAddListener(tmp, onLoadCall, onErrorCall, onResizeCall);
        }
    }

    /**显示格子广告*/
    public ShowGridAd(type: EGridAdType) {
        if (!this.BShowAd) return;

        if (type == EGridAdType.Home) {
            this.showGridAd(this._gridAd_Home);
        }
    }

    /**隐藏格子广告*/
    public HideGridAd(type: EGridAdType) {
        if (type == EGridAdType.Home) {
            this.hideGridAd(this._gridAd_Home);
        }
    }

    /**创建格子广告*/
    private createGridAd(id: string, theme: string, count: number, left: number, top: number, width: number, height: number) {
        return WXMiniHelp.CreateGridAd(id, theme, count, left, top, width, height);
    }

    /**显示格子广告*/
    private showGridAd(ad: any) {
        WXMiniHelp.ShowGridAd(ad);
    }

    /**显示格子广告*/
    private hideGridAd(ad: any) {
        WXMiniHelp.HideGridAd(ad);
    }

    /**销毁格子广告*/
    private destroyGridAd(ad: any) {
        this.gridAdRemoveListener(ad, null, null, null);
        WXMiniHelp.DestroyGridAd(ad);
    }

    /**添加格子广告监听*/
    private gridAdAddListener(ad: any, onLoadCall: Function, onErrorCall: Function, onResizeCall: Function) {
        if (onLoadCall != null)
            WXMiniHelp.GridAd_OnLoad(ad, onLoadCall);
        if (onErrorCall != null)
            WXMiniHelp.GridAd_OnError(ad, onErrorCall);

        if (onResizeCall != null)
            WXMiniHelp.GridAd_OnResize(ad, onResizeCall);
    }

    /**移除格子广告监听*/
    private gridAdRemoveListener(ad: any, offLoadCall: Function, offErrorCall: Function, offResizeCall: Function) {
        WXMiniHelp.GridAd_OnLoad(ad, offLoadCall);
        WXMiniHelp.GridAd_OnError(ad, offErrorCall);
        WXMiniHelp.GridAd_OnResize(ad, offResizeCall);
    }

    /**销毁所有格子广告*/
    private destroyAllGridAd() {
        this.destroyGridAd(this._gridAd_Home);

    }

    //#endregion

    //#region 原生模板广告

    //#endregion
}