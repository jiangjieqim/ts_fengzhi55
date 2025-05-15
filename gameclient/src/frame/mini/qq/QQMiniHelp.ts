

export class QQMiniHelp {

    constructor() { }

    /**系统信息*/
    public static QQSysInfo: any = null;
    /**用户信息*/
    public static QQUserInfo: any = null;
    /**启动信息*/
    public static QQLaunchOptions: any = null;


    private static shareimgpath = "";

    //#region QQ分享
    /**qq右上角分享*/
    static TopRightShare() {
        qq.showShareMenu();
        let that = this;
        qq.onShareAppMessage(() => ({
            title: "女友被杀，真相到底是？",
            imageUrl: Laya.URL.basePath + that.shareimgpath
        }));
    }

    /**自定义分享按钮*/
    static OnClickShareBtn() {

        let that = this;

        qq.shareAppMessage({
            title: "女友被杀，真相到底是？",
            imageUrl: Laya.URL.basePath + that.shareimgpath
        });
    }

    //#endregion


    //#region 广告
    private static bannerid: string = '60bb0327b868e68b09cd7869e8d53fc7';
    private static appBoxid: string = "1861afedd00ad181c01c9cd3545e7de5";
    private static interstitialid: string = "59179f8162dc7163ad8fd2bade3332c7";


    /**bannerAd*/
    private static bannerAd: any;
    /**广告盒子*/
    private static AppBox: any;
    /**插屏广告*/
    private static InterstitialAd: any;

    //#region 激励视频广告

    //********************************************************************** 广告视频类型*/
    /**观看视频获得提示*/
    private static VideoAd_Tip: any;
    /**观看视频获得金手指*/
    private static VideoAd_GodFinger: any;
    /**二次弹窗开金手指*/
    private static VideoAd_SecondGodFinger: any;
    /**观看视频解锁章节*/
    private static VideoAd_UnlockChapter: any;
    /**观看视频获取道具*/
    private static VideoAd_GetItem: any;
    /**七日签到激励双倍*/
    private static VideoAd_SignIn: any;

    static VideoAd_Tip_on: boolean = false;
    static VideoAd_GodFinger_on: boolean = false;
    static VideoAd_SecondGodFinger_on: boolean = false;
    static VideoAd_UnlockChapter_on: boolean = false;
    static VideoAd_GetItem_on: boolean = false;
    static VideoAd_SignIn_on: boolean = false;

    //********************************************************************** 广告视频ID*/
    /**观看视频获得提示*/
    private static VideoAd_Tip_ID: string = "937bd2cd6c929e81ff1e9a7041b09bff";
    /**观看视频获得金手指*/
    private static VideoAd_GodFinger_ID: string = "9f412c9fcaf28c2c32f5a3437792edb9";
    /**二次弹窗开金手指*/
    private static VideoAd_SecondGodFinger_ID: string = "c490a78c9e8e170ccf0967e9c081fe1d";
    /**观看视频解锁章节*/
    private static VideoAd_UnlockChapter_ID: string = "018b0af94fb82f69143da8833318b8ab";
    /**观看视频获取道具*/
    private static VideoAd_GetItem_ID: string = "8c621b29c3bd850dd3d4813be96cf1fc";
    /**七日签到激励双倍*/
    private static VideoAd_SignIn_ID: string = "361a3c28bb9e6288a0d3d77ac7ad6eed";

    private static curVideo: any = null;
    private static onerrorcallback = null;
    private static onloadcallback = null;
    private static oncolsecallback = null;

    static initVideoAd() {
        let that = this;

        if (that.VideoAd_Tip == null) {
            that.VideoAd_Tip = qq.createRewardedVideoAd({ adUnitId: this.VideoAd_Tip_ID });
        } if (that.VideoAd_GodFinger == null)
            that.VideoAd_GodFinger = qq.createRewardedVideoAd({ adUnitId: this.VideoAd_GodFinger_ID });
        if (that.VideoAd_SecondGodFinger == null)
            that.VideoAd_SecondGodFinger = qq.createRewardedVideoAd({ adUnitId: this.VideoAd_SecondGodFinger_ID });
        if (that.VideoAd_UnlockChapter == null)
            that.VideoAd_UnlockChapter = qq.createRewardedVideoAd({ adUnitId: this.VideoAd_UnlockChapter_ID });
        if (that.VideoAd_GetItem == null)
            that.VideoAd_GetItem = qq.createRewardedVideoAd({ adUnitId: this.VideoAd_GetItem_ID });
        if (that.VideoAd_SignIn == null)
            that.VideoAd_SignIn = qq.createRewardedVideoAd({ adUnitId: this.VideoAd_SignIn_ID });

        that.VideoAd_Tip_on = false;
        that.VideoAd_GodFinger_on = false;
        that.VideoAd_SecondGodFinger_on = false;
        that.VideoAd_UnlockChapter_on = false;
        that.VideoAd_GetItem_on = false;
        that.VideoAd_SignIn_on = false;
    }

    //#endregion
}
