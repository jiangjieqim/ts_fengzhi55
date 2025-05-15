import { LogSys } from "../../log/LogSys";


export class WXMiniHelp {

    constructor() { }

    /**系统信息*/
    public static WxSysInfo: any = null;
    /**用户信息*/
    public static WxUserInfo: any = null;
    /**启动信息*/
    public static WxLaunchOptions: any = null;

    //#region 微信分享

    private static get share_title() { return "橡皮人" };
    private static get share_imgurl() { return "share/img_share_1.png" };

    /**微信右上角分享*/
    static TopRightShare() {
        wx.showShareMenu();
        let that = this;
        let info;//= E.ResMgr.RandomWxShare();
        if (info != null) {
            wx.onShareAppMessage(function () {
                return {
                    title: info[1],
                    imageUrl: info[3],
                    imageUrlId: info[2],
                }
            });
        }
        else {
            wx.onShareAppMessage(function () {
                return {
                    title: that.share_title,
                    imageUrl: Laya.URL.basePath + that.share_imgurl
                }
            });
        }
    }

    static OnClickShareTeamBtn(teamId: number = 0) {
        let data: string = "teamId=" + teamId;
        wx.shareAppMessage({
            title: "橡皮人等你来战！！！",
            query: data,
            success: () => {
                console.log("分享成功");
            },
            fail: () => {
                console.log("分享失败");
            },
            complete() {
                console.log("分享完成...");
            }
        })
    }


    /**自定义分享按钮*/
    static OnClickShareBtn() {
        this.shareImage(Laya.URL.basePath + this.share_imgurl);
        // let info = Env.ResMgr.randomWxShare();
        // let that = this;
        // if (info != null) {
        //     wx.shareAppMessage({
        //         title: info[1],
        //         imageUrl: Laya.URL.basePath + info[2],//info[3],
        //         //imageUrlId: info[2],
        //     });
        // }
        // else {
        //     wx.shareAppMessage({
        //         title: that.share_title,
        //         imageUrl: Laya.URL.basePath + that.share_imgurl
        //     });
        // }
    }

    private static shareimg_width: number = 720;
    private static shareimg_height: number = 1428;
    static shareImage(imgUrl: string) {
        let that = this;
        var canvas = wx.createCanvas();
        canvas.width = this.shareimg_width;
        canvas.height = this.shareimg_height;
        var context = canvas.getContext('2d');
        var bgm = wx.createImage();
        bgm.src = imgUrl;
        // 头像
        var wxhead = wx.createImage();
        wxhead.scr = this.WxUserInfo.avatarUrl;
        //console.log("玩家头像：" + this.WxUserInfo.avatarUrl + "，玩家名：" + this.WxUserInfo.nickName);
        // nickName

        bgm.onload = () => {
            context.drawImage(bgm, 0, 0, this.shareimg_width, this.shareimg_height);
            context.drawImage(wxhead, 37, 176, 50, 50);

            context.fillStyle = "rgba(0,0,0,1)";
            context.font = "bold 30px Arial";
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.fillText(that.WxUserInfo.nickName, 104, 232);// 名字

            wx.shareAppMessage({
                title: that.share_title,
                imageUrl: canvas.toTempFilePathSync({
                    destWidth: that.shareimg_width,
                    destHeight: that.shareimg_height
                }),
                success: () => {
                    //console.log("分享成功");
                },
                fail: () => {
                    //console.log("分享失败");
                },
                complete() {
                    //console.log("分享完成...");
                }
            })
        }
    }
    //#endregion

    //#region 分包
    static Subpack1: string = "subpack1";//分包1：音效
    

    /**加载分包*/
    static LoadSubpackage(name: string, sucCall: Function, failCall: Function) {
        wx.loadSubpackage(
            {
                name: name,
                success: function (res) {
                    console.log("加载分包成功~res:" + res);
                    if (sucCall != null) sucCall(res);
                }, fail: function (res) {
                    console.log("加载分包失败~res:" + res);
                    if (failCall != null) failCall(res);
                }
            });
    }

    //#endregion

    /**显示消息提示框
     * @param icon -'success' -'loading' -'none' @param image 自定义icon @param duration 持续时间
    */
    static showToast(title: string, icon?: string, image?: string, duration?: number, mask?: boolean, suc?: Function, fail?: Function, comp?: Function) {

        icon = icon ? icon : "success";
        image = image ? image : "";
        duration = duration ? duration : 1500;
        mask = mask ? mask : false;

        wx.showToast({
            title: title,
            icon: icon,
            image: image,
            duration: duration,
            mask: mask,
            suc() {
                if (suc != null) suc();
            },
            fail() {
                if (fail != null) fail();
            },
            comp() {
                if (comp != null) comp();
            }
        });
    }

    /**隐藏消息提示框*/
    static hideToast(suc?: Function, fail?: Function, comp?: Function) {

        wx.hideToast();
    }

    /**显示模态对话框
     * @param title 标题 @param content 内容 @param 是否显示取消按钮 
    */
    static showModal(title: string, content: string, showCancel?: boolean, suc_confirm?: Function, suc_cancel?: Function, fail?: Function, complete?: Function) {

        showCancel = showCancel ? showCancel : false;

        wx.showModal({
            title: title,
            content: content,
            showCancel: showCancel,
            success(res) {
                if (res.confirm) {//点击确认
                    if (suc_confirm != null) suc_confirm();
                }
                else if (res.cancel) {//点击取消
                    if (suc_cancel != null) suc_cancel();
                }
            },
            fail() {
                if (fail != null) fail();
            },
            complete() {
                if (complete != null) complete();
            }
        });
    }



    private static needLoadingRequestCount: number = 0;
    /**显示 loading 提示框
     * 需主动调用 wx.hideLoading 才能关闭提示框
    */
    static showLoading(title: string, mask: boolean, suc?: Function, fail?: Function, comp?: Function) {
        wx.showLoading({
            title: title,
            mask: mask,
            success() { if (suc != null) suc(); },
            fail() { if (fail != null) fail(); },
            comp() { if (comp != null) comp(); }
        });
        this.needLoadingRequestCount++;
    }

    /**隐藏 loading 提示框*/
    static hideLoading() {

        if (this.needLoadingRequestCount <= 0)
            return;
        this.needLoadingRequestCount--;

        wx.hideLoading();
    }



    /**跳转到腾讯公益*/
    public static navigateToDonate() {
        /**TODO 跳转到捐赠界面 */
        //console.log("跳转到捐赠界面...");
        let appId: string = 'wxfdcee92a299bcaf1';
        let path: string = 'pages/detail/main?et=xqfx&pid=213664';//&btr=SZ00000012
        // key = oproJjw3N5AcN9zYsRFeypxjWLQI
        // 需要传递给对方的数据
        let extraData = {
            // spid: 'SZ00000012',
            // cmd: 'page/user',
            // openid: 'oproJjw3N5AcN9zYsRFeypxjWLQI',//'oeFkMj5595-1fdSciW5uIB9dJHDI'
            // url: location.href
        };
        let envVersion: string = 'release';// release——正式版, develop——开发版, trial——体验版
        WXMiniHelp.navigateToMiniProgram(appId, path, extraData, envVersion);
    }


    /**跳转到其他小程序 */
    static navigateToMiniProgram(appId: string, path: string, data: any, envVersion: string) {
        wx.navigateToMiniProgram({
            appId: appId,
            path: path,
            extraData: null,
            envVersion: envVersion,
            success(res) {
                // 请求成功
                //console.log("请求跳转成功...");
                //console.log(res);
            },
            fail() {
                //请求失败
                //console.log("请求跳转失败...");
            },
            complete() {
                //请求完成
                //console.log("请求跳转完成...");
            }
        });
    }

    /**
    * 震动时间
    * @param time  毫秒数
    */
    public static vibrate(time: number) {
        let count = time / 15;
        let index = 0;
        let obj = { count: count, index: index };
        Laya.timer.loop(16, obj, function () {
            wx.vibrateShort({
                success() {
                    //console.log("请求震动成功");
                },
                fail() {
                    //console.log("请求震动失败");
                },
                complete() {
                    //console.log("完成震动请求");
                }
            });
            index++;
            if (index > count) {
                Laya.timer.clearAll(obj);
            }
        });
    }

    //#region 广告
    private static bannerid: string = 'adunit-19cd178004216316';
    // private static appBoxid: string = "";
    // private static interstitialid: string = "";

    /**广告盒子*/
    private static AppBox: any;
    /**插屏广告*/
    private static InterstitialAd: any;

    //#region Banner广告

    /**bannerAd*/
    private static curBannerAd: any;


    /**创建banner广告*/
    public static CreateBannerAd(id: string, x: number, y: number, w: number, h: number): any {
        LogSys.Log("创建banner...id::" + id);
        return wx.createBannerAd({
            adUnitId: id,
            style: {
                left: x,
                top: y,
                width: w,
                height: h
            }
        });
    }

    /**显示banner广告*/
    public static ShowBannerAd(ad: any): boolean {
        if (ad != null) {
            ad.show();
            return true;
        }
        return false;
    }

    /**隐藏banner广告*/
    public static HideBannerAd(ad: any) {
        if (ad != null) {
            ad.hide();
        }
    }

    /**销毁banner广告*/
    public static DestroyBannerAd(ad: any) {
        if (ad != null) {
            ad.destroy();
        }
    }

    /**添加banner.onload监听*/
    public static BannerAd_OnLoad(ad: any, callback: Function) {
        if (ad != null) {
            ad.onLoad(res => {
                if (callback != null)
                    callback();
            });
        }
    }

    /*
    代码	异常情况	理由	解决方案
    1000	后端错误调用失败	该项错误不是开发者的异常情况	一般情况下忽略一段时间即可恢复。
    1001	参数错误	使用方法错误	可以前往developers.weixin.qq.com确认具体教程（小程序和小游戏分别有各自的教程，可以在顶部选项中，“设计”一栏的右侧进行切换。
    1002	广告单元无效	可能是拼写错误、或者误用了其他APP的广告ID	请重新前往mp.weixin.qq.com确认广告位ID。
    1003	内部错误	该项错误不是开发者的异常情况	一般情况下忽略一段时间即可恢复。
    1004	无适合的广告	广告不是每一次都会出现，这次没有出现可能是由于该用户不适合浏览广告	属于正常情况，且开发者需要针对这种情况做形态上的兼容。
    1005	广告组件审核中	你的广告正在被审核，无法展现广告	请前往mp.weixin.qq.com确认审核状态，且开发者需要针对这种情况做形态上的兼容。
    1006	广告组件被驳回	你的广告审核失败，无法展现广告	请前往mp.weixin.qq.com确认审核状态，且开发者需要针对这种情况做形态上的兼容。
    1007	广告组件被驳回	你的广告能力已经被封禁，封禁期间无法展现广告	请前往mp.weixin.qq.com确认小程序广告封禁状态。
    1008	广告单元已关闭	该广告位的广告能力已经被关闭	请前往mp.weixin.qq.com重新打开对应广告位的展现。
    */

    /**添加banner.onerror监听*/
    public static BannerAd_OnError(ad: any, callback: Function) {
        if (ad != null) {
            ad.onError(res => {
                if (callback != null)
                    callback();
            });
        }
    }

    /**添加banner.onresize监听*/
    public static BannerAd_OnResize(ad: any, callback: Function) {
        if (ad != null) {
            ad.onResize(res => {
                if (callback != null)
                    callback(res.width, res.height);
            });
        }
    }
    /**取消banner.offload监听*/
    public static BannerAd_OffLoad(ad: any, callback: Function) {
        if (ad != null) {
            ad.offLoad(callback);
        }
    }
    /**取消banner.offerror监听*/
    public static BannerAd_OffError(ad: any, callback: Function) {
        if (ad != null) {
            ad.offError(callback);
        }
    }
    /**取消banner.offresize监听*/
    public static BannerAd_OffResize(ad: any, callback: Function) {
        if (ad != null) {
            ad.offResize(callback);
        }
    }


    //#endregion

    //#region 激励视频广告

    /**创建获得提示视频
     * 
     * @param type 视频类型
     * @param errorCall 加载错误回调
     * @param loadCall 加载完成回调
     * @param closeCall 关闭回调
    */
    public static CreateVideoAd(id: string) {
        LogSys.Log("创建激励视频...id::" + id);
        return wx.createRewardedVideoAd({
            adUnitId: id
        });
    }
    /**显示激励视频广告*/
    public static ShowRewardVideoAd(ad: any): boolean {
        if (ad != null) {
            ad.show();
            return true;
        }
        return false;
    }
    /**加载激励视频广告*/
    public static LoadRewardVideoAd(ad: any) {
        if (ad != null) {
            ad.load();
        }
    }
    /**销毁激励视频广告*/
    public static DestroyRewardVideoAd(ad: any) {
        if (ad != null) {
            ad.destroy();
        }
    }

    /**添加load监听*/
    public static RewardVideoAd_OnLoad(ad: any, call: Function) {
        if (ad != null) {
            ad.onLoad((res) => {
                LogSys.Log("RewardVideoAd_OnLoad,res::" + res);
                if (call != null)
                    call(res);
            });
        }
    }

    /**添加error监听*/
    public static RewardVideoAd_OnError(ad: any, call: Function) {
        if (ad != null) {
            ad.onError((res) => {
                LogSys.Log("RewardVideoAd_OnError,res::" + res);
                if (call != null)
                    call(res.errMsg, res.errCode);
            });
        }
    }
    /**添加close监听*/
    public static RewardVideoAd_OnClose(ad: any, call: Function) {
        if (ad != null) {
            ad.onClose((res) => {
                LogSys.Log("RewardVideoAd_OnClose,res::" + res);
                if (call != null)
                    call(res.isEnded);
            });
        }
    }
    /**关闭load监听*/
    public static RewardVideoAd_OffLoad(ad: any, call: Function) {
        if (ad != null) {
            ad.offLoad((res) => {
                LogSys.Log("RewardVideoAd_OffLoad,res::" + res);
                if (call != null)
                    call(res);
            });
        }
    }
    /**关闭error监听*/
    public static RewardVideoAd_OffError(ad: any, call: Function) {
        if (ad != null) {
            ad.offError((res) => {
                LogSys.Log("RewardVideoAd_OffError,res::" + res);
                if (call != null)
                    call(res);
            });
        }
    }
    /**关闭close监听*/
    public static RewardVideoAd_OffClose(ad: any, call: Function) {
        if (ad != null) {
            ad.offClose((res) => {
                LogSys.Log("RewardVideoAd_OffClose,res::" + res);
                if (call != null)
                    call(res);
            });
        }
    }
    //#endregion

    //#region 插屏广告

    /**创建插屏广告*/
    public static createInterstitialAd(id: string) {//开始时先创建
        LogSys.Log("创建插屏广告...id::" + id);
        return wx.createInterstitialAd({
            adUnitId: id
        });
    }
    /**显示插屏广告*/
    public static ShowInterstitialAd(ad: any): boolean {
        if (ad != null) {
            ad.show().catch((err) => {//失败重新加载
                console.error('show', err);
                ad.load().then(() => {
                    ad.show();
                })
            });
            return true;
        }
        return false;
    }
    /**加载插屏广告*/
    public static LoadInterstitialAd(ad: any) {
        if (ad != null) {
            ad.load();
        }
    }
    /**销毁插屏广告*/
    public static DestroyInterstitialAd(ad: any) {
        if (ad != null) {
            ad.destroy();
        }
    }

    /**添加close监听*/
    public static InterstitialAd_OnClose(ad: any, call: Function) {
        if (ad != null) {
            ad.onClose((res) => {
                LogSys.Log("InterstitialAd_OnClose,res::" + res);
                if (call != null)
                    call(res);
            });
        }
    }

    /**添加load监听*/
    public static InterstitialAd_OnLoad(ad: any, call: Function) {
        if (ad != null) {
            ad.onLoad(res => {
                LogSys.Log("InterstitialAd_OnLoad,res::" + res);
                if (call != null)
                    call(res);
            })
        }
    }

    /**添加error监听*/
    public static InterstitialAd_OnError(ad: any, call: Function) {
        if (ad != null) {
            ad.onError(res => {
                LogSys.Log("InterstitialAd_OnError,res::" + res);
                if (call != null)
                    call(res.errMsg, res.errCode);
            });
        }
    }
    /**关闭offclose监听*/
    public static InterstitalAd_OffClose(ad: any, call: Function) {
        if (ad != null) {
            ad.offClose((res) => {
                LogSys.Log("InterstitalAd_OffClose,res::" + res);
                if (call != null) call(res);
            })
        }
    }
    /**关闭load监听*/
    public static InterStitalAd_OffLoad(ad: any, call: Function) {
        if (ad != null) {
            ad.offLoad((res) => {
                LogSys.Log("InterStitalAd_OffLoad,res::" + res);
                if (call != null) call(res);
            })
        }
    }

    /**关闭error监听*/
    public static InterStitalAd_OffError(ad: any, call: Function) {
        if (ad != null) {
            ad.offError((res) => {
                LogSys.Log("InterStitalAd_OffError,res::" + res);
                if (call != null) call(res);
            })
        }
    }


    //#endregion

    //#region 格子广告

    /**首页格子广告ID*/
    static GridAdID_HomeView: string = "";

    /**首页格子广告*/
    static GridAd_HomeView: any;

    /**创建格子广告
     * @param adId 广告id
     * @param theme 主题 white black 两种
     * @param count 数量 5 8 两种
     * @param left 左上角横坐标
     * @param top 左上角纵坐标
     * @param width 宽
     * @param height 高
    */
    public static CreateGridAd(adId: string, theme: string, count: number, left: number, top: number, width: number, height: number): any {
        if (theme != 'black' && theme != 'white') theme = 'black';

        return wx.createGridAd({
            adUnitId: adId,
            adTheme: theme,
            gridCount: count,
            adIntervals: 30,
            style: {
                left: left,
                top: top,
                width: width,
                height: height
            }
        });
    }

    /**显示格子广告*/
    public static ShowGridAd(ad: any): boolean {
        if (ad != null) {
            ad.show().catch((err) => {
                LogSys.Log("ShowGridAd,err::" + err);
            });
            return true;
        }
        return false;
    }
    /**隐藏格子广告*/
    public static HideGridAd(ad: any) {
        if (ad != null) {
            ad.hide();
        }
    }

    /**销毁格子广告*/
    public static DestroyGridAd(ad: any) {
        if (ad != null) {
            ad.destroy();
        }
    }

    /**添加error监听*/
    public static GridAd_OnError(ad: any, call: Function) {
        if (ad != null) {
            ad.onError(res => {
                LogSys.Log("GridAd_OnError,res::" + res);
                if (call != null)
                    call(res.errMsg, res.errCode);
            });
        }
    }
    /**添加load监听*/
    public static GridAd_OnLoad(ad: any, call: Function) {
        if (ad != null) {
            ad.onLoad(res => {
                LogSys.Log("GridAd_OnLoad,res::" + res);
                if (call != null)
                    call(res);
            })
        }
    }
    /**添加resize监听*/
    public static GridAd_OnResize(ad: any, call: Function) {
        if (ad != null) {
            ad.onResize(res => {
                LogSys.Log("GridAd_OnResize,res::" + res);
                if (call != null)
                    call(res.width, res.height);
            })
        }
    }
    /**关闭error监听*/
    public static GridAd_OffError(ad: any, call: Function) {
        if (ad != null) {
            ad.offError(res => {
                LogSys.Log("GridAd_OffError,res::" + res);
                if (call != null)
                    call(res);
            })
        }
    }

    /**关闭load监听*/
    public static GridAd_OffLoad(ad: any, call: Function) {
        if (ad != null) {
            ad.offLoad(res => {
                LogSys.Log("GridAd_OffLoad,res::" + res);
                if (call != null)
                    call(res);
            })
        }
    }

    /**关闭resize监听*/
    public static GridAd_OffResize(ad: any, call: Function) {
        if (ad != null) {
            ad.offResize(res => {
                LogSys.Log("GridAd_OffResize,res::" + res);
                if (call != null)
                    call(res);
            })
        }
    }

    //#endregion

    // //#region 广告盒子

    // static createAppBox() {

    //     let that = this;
    //     if (this.AppBox == null) {
    //         // this.AppBox = wx.createAppBox({
    //         //     adUnitId: that.appBoxid
    //         // });

    //         // this.AppBox.onClose(() => {
    //         //     console.log('close event emit');
    //         // });
    //     }
    // }

    // /*显示广告盒子*/
    // static showAppBox() {

    //     if (this.AppBox == null) {//没有先创建
    //         this.createAppBox();
    //     }

    //     if (this.AppBox != null) {
    //         this.AppBox.load().then(() => {
    //             this.AppBox.show();
    //         });
    //     }
    // }

    // //#endregion

    //#region 原生模板广告


    //#endregion



    //#endregion

}