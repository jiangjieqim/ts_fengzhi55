
/**平台ID定义*/
export enum EPID {
    Internal = 0,   //内部登录
    WxMini = 1,     //wx小游戏
    QQMini = 2,     //qq小游戏
}

/**语言类型*/
export enum ELanguage {
    English = 0,// 英语
    Chinese = 1,// 繁体中文
}

/**3D场景类型*/
export enum EScene3DType {
    None = 0,// 未定义
    Main,// 主场景
    ShowRole,//展示角色场景
    House,//家园系统场景
    HomeBuild,//建造
}

/**2D场景类型 */
export enum EScene2DType {
    None = 0,// 未定义
    Test,   //测试场景
}

/**角色状态*/
export enum ERoleState {

    Idle = 1,   //待机
    Run,        //移动
    Walk,       //走路
    AttackPrev, //普通攻击开始
    AttackEnd,  //普通攻击结束
    SkillPrev,  //释放技能开始
    SkillEnd,   //释放技能结束
    Hitted,     //受击
    Dead,       //死亡
    Born,       //出生

}

/**游戏类型*/
export enum EDimension {
    D2 = "2d",
    D3 = "3d",
}

export enum ESubPackageName {
    Bank = 'bank',
    Create = 'create',
    Pre = 'pre',//前置代码
}

/**交互ui枚举*/
export enum EViewType {

    None = 0,//未定义
    //----------------------Debug
    Debug,//调试页面
    //----------------------Login
    // Login,//登录页面
    // //----------------------Common
    MsgBox = 2,//消息窗
    RulerBox,//规则窗口
    MProp,//多道具弹窗
    SProp,//单道具弹窗
    MidLabel=6,//文本提示
    Loading = 7,//加载页面
    // SceneMask,//场景遮罩页面
    QueryMsg,//询问兑换框
    //----------------------------------------
    Main = 9,//主界面
    LoginNew = 10,//登录
    EquipTips = 11,//EquipTips
    EquipUpdate = 12,//穿装备
    Equip_switch = 13,//替换装备或者出售装备
    Attr_detailed=14,//属性详情
    HelpView=15,//说明界面
    ChestLevelUp=16,//宝箱升级
    QuickSetting=17,//快速设置
    SmallTips,//小tips View
    FightOpen=19,//战斗进入界面
    FightMain=20,//战斗主界面
    FightJieSuan=21,//战斗结算
    Wait=22,//等待UI
    GetReward = 23,//获取奖励弹出
    ShowPlayer = 24,//展示其他玩家

    YeWaiBoss=25,//野外boss
    YeWaiSweep = 26,//野外扫荡
    
    //翅膀
    WingInfo = 27,//翅膀信息
    WingMainLevel,//翅膀主页面-升级
    WingMainStage,//翅膀主页面-升阶
    WingExchange,//翅膀更换界面
    WingTreasure=31,//翅膀宝物升级

    //坐骑
    ZuoqiChouQu=32,//坐骑抽取
    ZuoqiFangpai=33,//坐骑翻牌
    ZuoqiTips = 34,//坐骑tips
    ZuoqiMain = 35,//坐骑主界面
    ZuoqiStorge = 36,//坐骑仓库
    ZuoqiYunShu = 37,//坐骑运输
    ZuoqiMission = 38,//坐骑派遣

    //竞技场
    JjcMain=39,//竞技场主界面
    JjcFight=40,//竞技场挑战界面
    JjcRewardShow=41,//竞技场奖励预览
    jjcLog=42,//竞技场日志

    XingFuKuangHuanMain=43,//新服狂欢主页

    // 商城
    Shop=44,

    QianDao = 45,//签到
    Libao = 46,//礼包入口
    BoxChengZhang = 47,//宝箱成长礼包
    ChongZhiTest = 48,//充值测试
    JueSeChengZhang = 49,//角色成长礼包

    //礼包
    SanGuo = 50, // 三国市集
    HuoDongLiBao = 51, //活动礼包
    MeiRiLiBao = 52,//每日礼包

    //换装
    HuanzhuangMain = 53,
    HuanzhuangTuJian = 54,//换装图鉴
    AttrShow = 55,//换装属性

    YueKa = 56, // 月卡
    ZhongShenKa = 57, // 终身卡
    NewPlayPackage = 58,//新人礼包(首充礼包)

    // 限时福利
    DiamondEject = 59, // 钻石弹出礼包
    // ChiBangEject = 59, // 翅膀弹出礼包
    // LingDiEject = 60, // 领地弹出礼包
    // JinBiEject = 61, // 金币弹出礼包
    // LianCaoNotEnoutgh = 62,//当粮草不足时弹出


    ChestQuickUse = 63,//宝箱加速卷快速使用

    //三国武馆
    HeroHouse = 64,//三国武馆主页
    HeroHouseSwicth = 65,//三国武馆替换装备
    HeroHouseShow = 66,//单个传承通用界面
    HeroHouseMapSel = 67,//场馆选择
    HeroHouseLevelUp = 68,//设施升级
    HeroHouseShop = 69,//武馆商店
    HeroHouseTask = 70,//武馆商店
    HeroInherit = 71,//武馆获得新武魂(3种 新武将 新机缘 演武失败)
    HeroHouseDetail = 72,//武馆详情
    HeroHouseKnowLedge = 73,//武馆神识

    CIFU = 74,//护佑
    CIFU_ZHUANHUAN = 75,//一键转换
    CIFU_SHEZHI = 76,//设置
    CIFU_ITEMTIP = 77,//护佑Item tip
    CIFU_ITEMTIP1 = 78,//护佑Item tip
    
    HeroHouseHandbook = 80,//名将录
    HeroHouseStorge = 81,//武馆仓库
    HeroHouseWeiTuo = 82,//委托
    HeroHousePackage = 83,//礼包
    
    PAOSHANG = 90,//跑商
    PAOSHANGJS = 91,//跑商解锁
    PAOSHANGTASK = 92,//跑商任务
    PAOSHANGRIZHI = 93,//跑商日志
    PAOSHANGPH = 94,//跑商破坏
    PAOSHANGNEAR = 95,//跑商附近驿站

    GUAJI = 100,//挂机
    GUAJIADDTIME = 102,//挂机增加时间
    GUAJIkUAISU = 103,//挂机快速

    NewAdventureMain = 101,//冒险主界面
    NewAdventureCleanUp = 120,//冒险扫荡
    Soul = 121,//战魂

    SoulTips = 122,//战魂单条的tips
    SoulUpgrade = 123,//强化
    SoulCompareTip = 124,//战魂比较界面
    SoulSuitTips = 125,//战魂套装tips界面

    SheZhiView = 130,//设置
    YinSiView = 131,//隐私
    // GongGaoView = 132,//公告
    DingYueView = 133,//订阅
    QuFuView = 134,//区服
    
    SiderView = 135,//侧边栏
    //func
    // 89	89					侧边栏			135				
    // mainicon
    // 93	cbl.png		89			侧边栏					
	//===================================================			

    DaLuanDou = 140,//大乱斗

    ShopBuy = 141,//购买界面
    GZHVIEW = 142,//公众号
    SubCDView = 143,//减少时间
    CjkfView = 144,//超级客服

    BaoShiMainView = 150,//宝石主界面
    BaoShiXQView = 151,//宝石镶嵌
    BaoShiDHView = 152,//宝石兑换
    BaoShiGMView = 153,//宝石购买
    BaoShiTJView = 154,//宝石图鉴
    FaZhengGHView = 155,//法阵更换
    FaZhengDHView = 156,//法阵兑换
    BaoShiHCView = 157,//宝石合成
    BaoShiAutoHCView = 158,//宝石自动合成
    BaoShiGongMingView = 159,

    GuangGaoView = 170,//广告
    Mail = 171,//邮件
    MailShow = 172,//邮件展示
    RollingLamp = 173,//跑马灯
    NoticePop = 174,//大公告
    HighAutoChest = 175,//高级宝箱委托
    Laborday = 176,//五一主界面
    LabordayReward = 177,//五一预览奖励
    LabordayShop = 178,//劳动市集
    LabordayPackage = 179,//劳动礼包

    ShenBin = 180,//神兵界面
    ShenBinLv = 181,//神兵升级
    ShenBinLog = 182,//神兵log
    ShenBinLB = 183,//神兵礼包
    ShenBinTZView = 194,//神兵套装
    LabordayExchange = 184,//劳动兑换
    RideBuyTips = 185,//坐骑购买tips
    zuoqitujian = 186,//坐骑图鉴
    JJCBSTIP = 187,//JJC宝石tip
    JJCSBTIP = 188,//JJC神兵tip
    JJCHYTIP = 189,//JJC护佑tip
    JJCWGTIP = 190,//JJC武馆tip
    JJCZHTIP = 191,//JJC战魂tip
    JJCDBTIP = 192,//JJC属性对比tip
    jjcLCTip = 193,//JJC灵宠tip

    CHENGHAO = 200,//称号

    DF_JJC = 201,//巅峰竞技场

    BackHome = 202,//返乡
    MountWash = 203,//洗髓
    BoxAnimSet = 204,//宝箱动画设置
    JuBaoPeng = 205,//聚宝盆
    DuanWu = 206,//端午节活动
    DuanWuLeiChong = 207,//端午累计充值
    DuanWuPackage = 208,//端午坐骑礼包
    DuanWuLog = 209,//端午坐骑日志
    DuanWuRank = 210,//端午节排行榜
    DuanWuRewardShow = 211,//端午节奖励展示
    ZhengZhan = 212,//征战
    FightMonster = 213,//鏖战凶兽
    FightHardRank = 214,//鏖战排行榜
    FighthardReward = 215,//鏖战凶兽的奖励预览
    FighthardDetail = 216,//鏖战凶兽的详细预览    
    FighthardTuJian = 217,//鏖战凶兽的图鉴
    Summer = 218,//盛夏狂欢
    SummerPackage = 219,//盛夏狂欢礼包
    SummerShop = 220,//盛夏狂欢市集
    GameGroup = 221,//游戏圈
    ExchangeCode = 222,//兑换码
    JJZML = 234,//紧急招募令
    FuJiangFeast = 235,//武将盛宴
    UnlockEquip = 236,//解锁套装界面
    JiShaoChengDuo = 237,//积少成多
    NewPlayerFeast = 238,//新人盛宴
    NewPlayerGemFeast = 239,//新人盛宴-宝石盛宴
    
    NewPlayerFeastPackage = 240,//新人盛宴-礼包
    NewPlayerRideFeast = 241,//新人盛宴-坐骑盛宴
    NewPlayerFujiangFeast = 242,//新人盛宴-副将盛宴
    PetFeast = 243,//灵宠盛宴
    NewPlayerPetFeast = 245,//新人盛宴-宠物盛宴
    NewPlayerTaskView = 246,//新人庆典任务
    ShenBinFeast = 247,//神兵盛宴

    GemFeast = 250,//宝石盛宴
    ScoreJjcJieSuan = 251,//积分竞技场
    ZhengTu = 252,//征途
    
    FuJiang = 300,//副将
    FuJiangChouKa = 301,//副将抽卡

    Children = 302,//六一活动
    ChildPackage = 303,//六一礼包
    ChildrenShop = 304,//六一市集

    FuJiangGouMai = 305,//副将抽卡购买
    FuJiangHuoDe = 306,//副将获得购买
    FuJiangWuSun = 307,//副将无损
    FuJiangCK = 308,//仓库
    FuJiangWuSun1 = 309,//无损1
    FuJiangPY = 310,//副将培养
    FuJiangCZ = 311,//副将重置
    FuJiangStar = 312,//副将升星
    FuJiangSkillTip = 313,//技能tip
    FuJiangSQTip = 314,//副将士气
    FuJiangXQView = 315,//副将详情
    FuJiangMountCKView = 316,//副将坐骑仓库
    FujiangSCZZView = 317,//沙场助阵
    FujiangJBSXView = 318,//羁绊属性
    FujiangJBView = 319,//副将羁绊
    FujiangJBZBView = 320,//羁绊装备
    FuJiangAttrView = 321,
    FuJIiangZQGHView = 322,
    FuJiangStarView1 = 323,
    FuJiangHDView1 = 324,
    FuJiangAttrView1 = 325,
    FuJiangGLTip = 326,

    YaoQing = 350,//邀请
    YaoQingXQ = 351,//邀请详情
    LoginQuFu = 352,//登录选服
    YinDaoView = 353,//引导界面

    XXZDZView = 354,//星星争夺战界面
    XXZDZMJView = 355,//锦囊妙计界面
    XXZDZRankView = 356,//排行界面
    XXZDZRZView = 357,//日志界面
    XXZDZShopView = 358,//商店界面
    XXZDZTZView = 359,//挑战界面
    XXZDZGMView = 360,//购买界面
    XXZDZAwardView = 361,//排行奖励
    XXZDZShopBuyView = 368,//商店购买

    WuShenDianView = 362,//武神殿
    WuShenDianRankView = 363,//武神殿排行
    WuShenDianShopView = 364,//武神殿商店
    WuShenDianTJView = 365,//武神殿图鉴
    WuShenDianSHView = 366,//武神殿神魂
    WuShenDianAwardView = 367,//武神殿排行奖励
    WuShenDianSHLView = 369,//神魂详情

    MeiRiZhuanPanView = 370,//每日转盘
    MeiRiZhuanPanTip1 = 371,//每日转盘
    MeiRiZhuanPanTip2 = 372,//每日转盘
    MeiRiZhuanPanTip3 = 373,//每日转盘

    KaiFuChongBangView = 374,//开服冲榜
    KaiFuChongBangAwardView = 375,//开服排行奖励
    TeQuanKaView = 376,//特权卡

    JieDongFengView = 380,//借东风
    JieDongFengView1 = 381,//借东风

    LingChongMainView = 400,//灵宠主界面
    LingChongGMView = 401,//灵宠购买
    LingChongFanPaiView = 402,//灵宠翻牌
    LingChongTJView = 403,//灵宠图鉴
    LingChongXMTJView = 404,//灵宠血脉图鉴
    LingChongRH_Succeed = 405,//融合获取结算面板
    LingChongCZView = 406,//灵宠重置
    LingChongLVView = 407,//灵宠升级
    LingChongStarView = 408,//灵宠升星
    LingChongAutoRh = 409,//融合自动合成
    LingChongXMView = 410,//灵宠血脉觉醒
    LingChongCQView = 411,//灵宠萃取
    LingChongExchange = 412,//灵宠兑换
    LingChongFanPaiView1 = 413,

    MountLiBaoView = 420,//坐骑直升
    PetLiBaoView = 421,//宠物直升
    CCJJView = 422,//成长基金

    ZuoqiChengZhangView = 423, // 坐骑成长基金
    LingchongChengZhangView = 424, // 灵宠成长基金
    BaoshiChengZhangView = 425, // 宝石成长基金

    MeiRiFenXiangView = 426, // 每日分享
    TianJiaZhuoMianView = 427, // 添加桌面
    YouXiQuanLiBaoView = 428, // 游戏圈礼包
    FenXiangDaoQunView = 429, // 分享到群

    ServerTaskView = 430,//三国向导

    SkinLiBaoView = 431, // 皮肤礼包
    midAutumn = 440,//中秋活动
    midAutumnPackage = 441,//中秋礼包
    midAutumnrenShop = 442,//中秋市集
    midAutumnrenShop1 = 443,//中秋市集1

    LCZQRankView = 450,

    Luck = 451,//幸运扭蛋活动
    LuckPackage = 452,//幸运扭蛋礼包
    LuckShop = 453,//幸运扭蛋市集

    LCZQRankTip = 454,
    LCZQRankTip1 = 455,

    WanShengJieView = 460,//万圣节
    WanShengJieView1 = 461,
    SignInNew = 462,//新签到

    AllianceCreateView = 463, // 同盟创建页
    AllianceListView = 464, // 同盟随机列表页
    AllianceMainView = 465, // 同盟主界面
    AllianceEditView = 466, // 同盟设置页
    AllianceNoticeView = 467, // 同盟公告页
    AllianceMenuView = 468, // 同盟菜单
    AllianceApplyView = 469, // 同盟申请列表
    AllianceBossView = 490, // 同盟凶兽入侵页
    AllianceBossDetailView = 491, // 同盟凶兽入侵详情页
    AllianceRankListView = 492, // 同盟凶兽入侵排行榜（盟内）

    JinShengView = 470,//晋升
    JinShengView1 = 471,
	AllianceFight56View = 472,//同盟，过五关斩六将
    AllianceFightBossDetailView = 473,//同盟，过五关斩六将，boss详情
    AllianceFightEnrollView = 474,//同盟，过五关斩六将，报名
    AllianceFightHarmDetailView = 475,//同盟，过五关斩六将，伤害详情
    ChatView = 480,
	AllianceFightGCView = 481,//同盟战攻城
    AllianceFightGCTZView = 482,//同盟战攻城详情
    AllianceFightGCTZView1 = 483,//同盟战攻城详情1
    AllianceFightRankView = 484,//同盟排行榜
    AllianceFightRewardView = 485,//同盟排行奖励页面
    AllianceFightRZView = 486,//同盟日志
    AllianceFightAwardView = 487,
    AllianceFightJSAwardView = 488,
    AllianceFightAwardView1 = 489,
    AllianceFightAwardView2 = 493,
    AllianceFightMemberView = 494,

    ZhanLingView = 500,//战令

    MoJinXiaoWeiView = 510,//摸金校尉主界面
    MoJinXiaoWeiView1 = 511,
    MoJinXiaoWeiView2 = 512,

    MonopolyMainView = 520,//大富翁主界面
    MonopolyView = 521,
    MonopolyLBView = 522,
    MonopolyAwardView = 523,
    MonopolyAwardView1 = 524,

    DrawEventView = 530,//元旦活动
    DrawEventView1 = 531,
    DrawEventView2 = 532,
    DrawEventShowReward = 533,

    /**江湖有名 */
    NamingChargeMain = 534,
    /**江湖有名小界面 */
    NamingChargeAlert = 535,
    /**江湖有名奖励预览*/
    NamingChargeReward = 536,
    /**套餐 */
    Combopack = 537,
    /**折扣强弹窗口 */
    DiscountPopWin = 538,
    //新春活动
    SpringFestivalView = 550,
    SpringFestivalWWView = 551,
    SpringFestivalRankView = 552,
    SpringFestivalAwRankView = 553,
    SpringFestivalTaskView = 554,
    SpringFestivalShopView = 555,
    SpringFestivalShopGMView = 556,
    SpringFestivalTipView = 557,

    WowHuanZhuangView = 600,//魔兽换装
    WowHuanZhuangView1 = 601,

    yuanxiao = 610,//元宵活动
    yuanxiaoPackage = 611,//元宵礼包
    yuanxiaoShop = 612,//元宵市集

    ZuoQiShopView = 620,
    ZuoQiBuyShopView = 621,

    XianShiLiBaoView = 630,
    /**道具不足弹出 */
    ItemNotEnough = 631,
    ZuoQiFangPaiView1 = 632,
    XiuGaiNCView = 633,
    LocalYinDaoView = 634,
    /**战斗数字动画 */
    FightNumPlay = 635,

    KangJiXiongShouView = 640,
    KangJiXiongShouView2 = 641,

    ZiXuanLiBaoView = 650,
    ZiXuanLiBaoView1 = 651,

    GeXuQiPaoView = 660
}

//页面类型
export enum EPageType {
    None = 0,//无特效
    CloseBigToSmall,//小变大关闭窗口
}

/**轴向*/
export enum EAxis {
    X = 0,
    Y = 1,
    Z = 2
}

/**贝塞尔曲线类型 */
export enum EBezierType {
    Bezier2 = 0,//2次贝塞尔曲线
    Bezier3 = 1,//3次贝塞尔曲线
}

//#region 广告相关枚举
//通过枚举分辨调用广告的地方
//小游戏声明广告id时，也应根据枚举声明不同的广告

/**横幅广告枚举*/
export enum EBannerAdType {
    None = 0,//默认无
    Home,//首页
}

/**激励视频枚举*/
export enum ERewardVideoAdType {
    None = 0,//默认无
    Settle,//结算
}

/**插屏广告枚举*/
export enum EInterstitialAdType {
    None = 0,//默认无
    Home,//首页
}

/**格子广告类型*/
export enum EGridAdType {
    None = 0,//默认无
    Home,//首页
}


//#endregion



/**Ease枚举*/
export enum TweenEase {
    //http://robertpenner.com/easing/easing_demo.html
    None = 0,
    linearNone = 1,//定义无加速持续运动。
    linearIn = 2,//定义无加速持续运动。
    linearInOut = 3,//定义无加速持续运动。
    linearOut = 4,//定义无加速持续运动。
    bounceIn = 5,//方法以零速率开始运动，然后在执行时加快运动速度。
    bounceInOut = 6,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    bounceOut = 7,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
    backIn = 8,//开始时往后运动，然后反向朝目标移动。
    backInOut = 9,//开始运动时是向后跟踪，再倒转方向并朝目标移动，稍微过冲目标，然后再次倒转方向，回来朝目标移动。
    backOut = 10,//开始运动时是朝目标移动，稍微过冲，再倒转方向回来朝着目标。
    elasticIn = 11,//方法以零速率开始运动，然后在执行时加快运动速度。
    elasticInOut = 12,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    elasticOut = 13,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
    strongIn = 14,//以零速率开始运动，然后在执行时加快运动速度。
    strongInOut = 15,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    strongOut = 16,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
    sineInOut = 17,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    sineIn = 18,//以零速率开始运动，然后在执行时加快运动速度。
    sineOut = 19,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
    quintIn = 20,//以零速率开始运动，然后在执行时加快运动速度。
    quintInOut = 21,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    quintOut = 22,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
    quartIn = 23,//方法以零速率开始运动，然后在执行时加快运动速度。
    quartInOut = 24,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    quartOut = 25,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
    cubicIn = 26,//方法以零速率开始运动，然后在执行时加快运动速度。
    cubicInOut = 27,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    cubicOut = 28,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
    quadIn = 29,//方法以零速率开始运动，然后在执行时加快运动速度。
    quadInOut = 30,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    quadOut = 31,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
    expoIn = 32,//方法以零速率开始运动，然后在执行时加快运动速度。
    expoInOut = 33,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    expoOut = 34,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
    circIn = 35,//方法以零速率开始运动，然后在执行时加快运动速度。
    circInOut = 36,//开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
    circOut = 37,//以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
}

//#region 玩家相关枚举


//#endregion

/**消息窗类型*/
export enum EMsgBoxType {
    OkOrCancel,
    OnlyOk,
}

/**单道具提示窗*/
export enum ESPropType {
    OnlyLabel,//提示文本：纯文本
    IconAndLabel,//提示文本：图标+文本
}

/**引导类型 */
export enum EGuideType {
    Rect = 0,//方形引导
    Circle = 1,//圆形引导
}