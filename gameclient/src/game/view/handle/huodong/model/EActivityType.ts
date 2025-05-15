/**
 * 活动大类型
 */
export enum EActivityType{
//     id	礼包名称	礼包对应表格					
// f_id	f_PackName	f_PackExcel					
// uint32	string	string					
// 1	1	1					
// 1	每日签到	t_Pack_Attendance					
// 2	开箱大吉	t_Pack_BoxEvent					
// 3	角色成长礼包	t_Pack_ChaGrow	p1玩家等级				
// 4	每日礼包	t_Pack_Daily					
// 13	坐骑弹出礼包	t_Pack_Eject	p1 间隔弹出的时间(秒)期间不重复弹出 p2消失时间 p3支付完成之后的间隔弹出时间				
// 6	月卡	t_Pack_Month_Card	p1 玩家等级				
// 7	新人福利	t_Pack_NewPlayer	p1玩家等级				
// 8	集市	t_Pack_Shop_Mart					
// 9	黑市	t_Pack_Shop_Market	任务循环顺序	首个活动id	玩家达到多少等级开放		
// 10	骑士补给	t_Pack_Supply					
// 11	新服特惠(特惠礼包)	t_Pack_NewSever					
// 12	宝箱成长礼包	t_Pack_BoxGrow	p1玩家等级				
    
    SignIn = 1,        //签到
    KaiXaingDaji = 2,   //开箱大吉
    RoleBorn = 3,       //角色成长礼包
    EveryDayBorn = 4,     //每日礼包(日常礼包)
    t_Pack_MonthAndYear_Card = 6,//	p1 玩家等级		// 6	月卡 终身卡
    t_Pack_OldPayNewPlayer = 7,// 7 新人福利
    t_Pack_NewPlayer = 48,// 新人礼包 48(首充和新人礼包合并)
    Pack_Shop_Mart = 8,//集市
    SanGuo = 9,         //三国集市
    Pack_Supply = 10,//	骑士补给(诸侯补给)	
    TeHuiLiBao = 11,//特惠礼包
    BoxBorn = 12, //宝箱成长礼包
    /**
     * 限时礼包:  
     * 钻石弹出礼包   翅膀弹出礼包    领地弹出礼包    金币弹出礼包    坐骑弹出礼包
     **/
    PopWinEject = 13, 
    // ChiBangEject = 14, //翅膀弹出礼包
    // LingDiEject = 15, //领地弹出礼包
    // JinBiEject = 16, //金币弹出礼包

    /**劳动节活动,六一活动 */
    Laborday = 18,

    /**神兵礼包 */
    ShenBinPackage = 19,

    /**端午节活动(坐骑盛宴),宝石盛宴*/
    DuanWu = 21,
    /**紧急招募令 */
    JJZML = 27,
    //每日转盘
    DayZhuanPan = 28,
      
    /**积少成多 */
    OpenServerJiShaoChengDuo = 30,
    /**开服累充 */
    OpenServerLeiChong = 31,
    /**开服连充 */
    OpenServerLianChong = 32,
    //开服冲榜
    KaiFuChongBang = 33,
    //特权卡
    TeQuanKa = 34,
    //借东风
    JieDongFeng = 35,
    /**新人盛典 */
    NewPlayerFeast = 36,
    /**折扣商店 */
    ZKShop = 37,
    ZuoqiChengZhang = 38, // 坐骑成长基金
    LingchongChengZhang = 39, // 灵宠成长基金
    BaoshiChengZhang = 40, // 宝石成长基金
    ServerTask = 42, // 三国向导
    SkinLiBao = 43,//43, // 皮肤礼包
    ZKShopWeek = 44, // 折扣商店周卡
    WanShengJie = 45, // 万圣节
    SignInNew = 46,   //新签到
    // NewSkin = 48//首充礼包
    ZhanLing = 49,//战令
    Monopoly = 50,//大富翁
    DrawEvent = 51,//元旦
    Voucher = 52,//代金券活动
    Combopack = 54,//套餐礼包
    OnePushPackage = 55,//一件购买,
    SpringFestival = 53,//熬年守岁
    VIP = 57,
    kangjixiongshou = 58,
    zixuanlibao = 59,
    gexuqipao = 60
}

/**默认的枚举定义  0不可领取 1已领取 2可领取*/
export enum EActivityLingQu{
    /** 0 条件未达成的情况 不可领取 */
    Nothing = 0,

    /** 1 未充值 a位置已领取 */
    YiLingQu = 1,

    /** 2 未充值 a位置可领取 */
    KeLingQu = 2,

    /** 3 已经充值 a已经领取 b位置已领取 */
    ChongZhiYiLingQu = 3,

    /** 4 已经充值 a已经领取 b位置未领取 */
    ChongZhiWeiLingQu = 4,

    /**   5 已经充值了两个都没有领取*/
    ChongZhiAllNotLing = 5,
}

export enum ELingQuStatus{
    /** 0不可领取*/
    NotCanLingQu = 0,
    /** 1可领取*/
    CanLLingQu = 1,
    /** 2已经领取 */
    IsLingQu = 2,
}

/**
1	当消耗完所有钻石时弹出  
2	当消耗完所有白羽时弹出  
3	当通行证不足时弹出
4	当金币不足提示显示时弹出  
5	当粮草不足时弹出  
6	当祈福火焰不足时弹出
7   当福源碎片不足时弹出
    详见 t_Pack_Eject.xlsx配置  
*/
export enum EPopWinID{
    GOLD = 1,
    WhitePlume = 2,
    TXZ = 3,
    Money  = 4,
    HorseFood = 5,
    QFHY = 6,
    FYSP = 7,
}

