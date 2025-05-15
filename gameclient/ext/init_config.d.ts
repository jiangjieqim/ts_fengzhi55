declare interface IinitConfig {
    /**默认的数数id */
    ttappid:number;
    /**0.1折的数数id */
    discount_ttappid:number;
    /**0.1折后台 */
    discount_sy_url:string;
    discount_channel_key:string;

    /**此参数在dev服可以传一个字符串模拟一个账号登录 o5Ota5XHl1Oj5sKVCaLuUdBanIFU*/
    openid: string;
    server_ip: string;
    tcp: string;
    /**
    //正式服务器后台  
    "sy_url":"https://server.game.wanhuir.com",  
    //灰度服后台  
    "sy_url":"https://dev-server.game.wanhuir.com",  
     */
    sy_url: string;
    /**
     * 
        //开发
        static Dev:number = 0;

        //微信
        static WeiXin:number = 1;

        //H5戳爆0.1 折心动
        static CB1:number = 2;

        //抖音
        static DOU_YIN:number = 3;

        //8U H5 平台
        static BaU:number = 4;

        //War3 魔兽
        static War3:number = 5;

        //美团 
        static MEITUAN:number = 6;
    */
    platform: number;
    /**使用的SDK 平台 */
    sdk_platform:number;
    
    /**
     * 资源地址
     *  "asset":"https://cdnserver.game.wanhuir.com/v1_0_17/",  
     *  "asset":"http://192.168.0.66:8001/Project1/Client/trunk/resource/",  
     */
    asset: string;
    /**
     * 帧速率fast slow sleep    
     */
    frameRate;
    /**多倍速度开放等级 */
    unlockLv;
    /**
     * 是否是调试模式   和url?debug=1相同  
     */
    debug: boolean;

    maskColor;
    /**是否使用Laya.Stat */
    stat: number;

    /**是否是同步模式 */
    sync;
    /**
     * undefined:  主线  
     * 1:       0.1折扣 
     **/
    clienttype: number;

    /**
     * 折扣的all_bin的配置

     	asset:"https://cdnserver.game.wanhuir.com/cbsg/ts_fengzh_52/rev_out/",
	    discount_all_bin: "https://cdnserver.game.wanhuir.com/cbsg/ts_fengzh_52/rev_out/all2.bin",
        本字段代表0.1折扣的配置,如果是微信版本的 默认如果不是0.1折扣就直接用rev_out/all.bin的配置
     */
    // discount_all_bin: string;
    /**设置appid 一般用于测试阶段测试的参数 */
    appid: string;

    /**激励视频ID 目前只有抖音在使用*/
    adunitid: string;

    /**由game.js中设置 此数据来判断是否由头条的侧边栏进入 */
    sider: number;

    /**日志 3错误*/
    loglevel: number;

    /**前置小游戏 */
    littlegame: number;

    //指定版本  `v1_0_15 灰度服版本 v1_gray灰度 ` 
    //dev 0.1历史版本 v1_0_dicount_20240125
    ver: string;

    //1跳过战斗播放
    skip:number;

    //静音
    // disableSound:boolean;
    /**是否不需要战斗日志*/
    nofightlog:number

    /**1 无宝箱动画 */
    noBoxAnim:number;

    /**无战斗UI */
    withoutFightUI:number;

    /**是否显示日志 */
    proto_log:number;

    /**不需要引导 */
    no_guide:number;

    /**关闭日志 */
    no_log:number;
    /**游戏名key */
    channel_key;

    /**强制开启设置面板内的头像更新按钮 */
    debug_authBtnShow:boolean;
    /**是否在IOS上 */
    debug_onIOS:boolean;
    /**场景值 */
    debug_scene:string;
    /**强弹 */
    debug_pop:string;
    /**冒险弹出窗口限制id */
    debug_pop_limtid:number;
    /** 大于此ID开启自动战斗*/
    debug_f_AutoFight:number;
    /**登录数据 */

    // `{"uid":"195895152","openid":"o5Ota5XHl1Oj5sKVCaLuUdBanIFU","real_openid":"o5Ota5XHl1Oj5sKVCaLuUdBanIFU","session_key":"XnWkxZSVnOqDVtCEl2nIyg==","access_token":"77_1NpZcovAwqregVgwnp2Vlpf93-tU83PQL0p0PlGUojlGBsDSnBsJoCuinBlO7-27TejRrN6gWdRs0s1P-NubfAkKMV_Rj_vjBgLMdD5pFlzGaQWM5aSt8vQGYR0KPWbAHATYF","jump_version":0,"package_original_game_key":"","is_new_user":false,"code":1001,"message":"登录成功"}`,
    debug_login_data:string;

    /**取消自定义字体 */
    debug_loadFont_disable:number;

    debug_api_platform:number;

    /**获取登录的状态0老账号  1新账号 */
    // debug_type:number;

    /**true是提审 */
    debug_ts:boolean;
	/**
     *  测试使用的充值服务器ID
     * 	debug_pay_server_id:60001,
     *  ver:dev
    */
    debug_pay_server_id:string;


    debug_all_bin:string;
    
}
declare let initConfig: IinitConfig;