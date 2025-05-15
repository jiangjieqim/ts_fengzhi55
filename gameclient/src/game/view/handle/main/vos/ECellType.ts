export enum ECellType{
    /**
     * 元宝
     */
    GOLD = 1,

    /**
     * 铜钱
     */
    COPPER_MONEY = 2,
    /**
     * 宝箱
     */
    BOX = 3,
    /**
     * 战斗力
     */
    BATTLE = 4,
    /**
     * 经验
     */
    EXP = 5,
    
    /**粮草 */
    Forage = 8,
    /**
     * 宝箱加速卷
     */
    ChestQuick = 9,

    /**
     * 竞技场挑战券
     */
    JjcTicket = 10,

    /**白羽 */
    WhitePlume = 12,

    /**坐骑卷轴 用于抽马*/
    HorseItemId = 19,

    /**悟性 */
    WuXing = 21,

    /** 碎银*/
    TokenMoney = 22,

    /**武将邀请函 */
    HeroInvite = 23,

    /**任务刷新券 */
    TaskRefresh = 25,
    /**勾玉 */
    GouYu = 26,
    /**气运 */
    QiYun = 31,
    /**道气 */
    DaoQi = 32,
    /**通行证 */
    TongXingZheng = 56,
    
    /**默认信物itemid */
    Auth = 58,
    /**宝石券 */
    BaoShiQuan = 59,
    /**神铁 */
    ShenTie = 84,
    /**神兵残片 */
    ShenBinCP = 85,

    /**劳动活跃点 */
    // LabordayPoint = 86,

    /**劳动活跃币 */
    // LabordayMoney = 87,

    /**节日活跃点 */
    // ChildrenPoint = 88,
    
    /**劳动勋章 */
    // Laborday = 88,
    /**高级宝石券 */
    BaoShiQuanG = 99,

    /**高级武将邀请函 */
    HighHeroInvite = 100,

    //副将升级
    FuJiangLv = 104,
    //副将装备升级
    FuJiangEquipLv = 105,
    //副将装备升星
    FuJiangEquipStar = 106,
    //普通兵谱
    FuJiangSkill1 = 107,
    //普通兵谱
    FuJiangSkill2 = 108,

    //军令状
    JunLingZhuang = 293,
    //星星
    XingXing = 302,
    //星之结晶
    XZJJ = 303,
    //机关钥匙
    JGYS = 304,
    //包子
    BaoZi = 305,
    //锦囊
    JingNang = 306,

    /**宝石碎片 */
    GemPiece = 317,
    /**神魂碎片 */
    ShenHun = 318,
    /**灵宠生命精华 */
    LingChongSMJH = 334,
    /**灵宠招募 */
    LingChouZM = 335,
    /**晋升果 */
    LingChouJS = 336,
    /**生命精华 */
    LingChouXM = 334,
    /**功勋*/
    Gongxun = 504,
    /**代金券 */
    Voucher = 527,
    /**联盟战体力 */
    AllianceEnergy = 528,
    GreenDragonPiece = 530, // 超凡青龙碎片
    AllianceLing = 532, // 同盟令
    WeiWang = 536, // 威望
    NianShoulinpian = 537, // 年兽鳞片
    XinNianFuZi = 538, // 新年福字
    gxqp = 541
}

/*
1	一般
2	优秀
3	精良
4	稀有
5	史诗
6	传奇
7	天赐
8	神铸
*/
export enum EquipmentQuality{
    /**
     * 一般
     */
    Normal = 1,
    /**
     * 优秀
     */
    Excellence = 2,

    /**
     * 精良
     */
    Polish = 3,

    /**
     * 稀有
     */
    Rare = 4,

    /**
     * 史诗
     */
    Epic = 5,

    /**
     * 传奇
     */
    Legend = 6,

    /**
     * 天赐
     */
    Manna  = 7,

    /**
     * 神铸
     */
    GodCast = 8 
}

/**
 * 装备类型
 */
export enum EEquipType{
    //未开放,裸装
    None = 0,

    /**
     * 护肩
     */
    Shoulder = 1,

    /**
     * 帽子 头盔
     */
    Casque = 2,

    /**
     * 项链
     */
    Necklace = 3,

    /**
     * 护腕
     */
    Wrister = 4,

    /**
     * 衣服,铠甲
     */
    Barde = 5,

    /**
     * 手套
     */
    Gloves = 6,

    /**
     * 腰带 
     */
    Waistband = 7,

    /*
     * 裤子
     */
    Trousers = 8,

    /**
     * 武器
     */
    Weapon = 9,

    /**
     * 饰品
     */
    Ornament = 10,

    /**
     * 靴子
     */
    Shoe = 11,

    /**
     * 盾牌
     */
    Shield = 12,

    /**
     * 翅膀
     */
    Wing = 13,

    /**坐骑 */
    ZuoQi = 14,
}

export enum EWearableType{
    /**
     * 穿戴中
     */
    Wearable = 1,
    /**
     * 未穿戴
     */
    Not = 2,
}

export enum EActionEquip{
    /**
     * 出售
     */
    Sell = 0,
    /**
     * 装备
     */
    Equip = 1,
}

/*
*基础属性类型
*/
export enum EAttrType{
    /**
     * 速度
     */
    Speed = 10002,
    /**
     * 生命
     */
    Life = 10003,
    /**
     * 攻击
     */
    Attack = 10004,
    /**
     * 防御
     */
    Defense = 10005,


    //###################################################附属性
    /*

10006	吸血	100
10007	反击	100
10008	连击	100
10009	闪避	100
10010	暴击	100
10011	击晕	100
10012	忽视吸血	0
10013	忽视反击	0
10014	忽视连击	0
10015	忽视闪避	0
10016	忽视暴击	0
10017	忽视击晕	0
10018	仁爱	100
10019	禁疗	200
10020	暴虐	300
10021	回复	200
10022	泥泞	200
10023	欺凌	200
10024	掠财	700
10025	角斗士	1

*/

    /**
     *吸血
    */
    SuckBlood = 10006,
    /**
     * 反击
     */
    AefenseAttack = 10007,
}

export enum EChestAnimStatus{
    /**
     * 关闭状态
     */
    Close = 0,
    /**
     * 打开状态
     */
    Open = 1,
}

export enum EFkSceneType{
    Main = 1,//主场景
    Details = 2,//详情
    Fight = 3,//战斗场景
}

export interface EEquipSkin{
    type:EEquipType;
    equipStyle:number;
}

export enum EFightType{
    /**冒险类型 */
    Adventure = 1,
    /**2boss副本 */
    Boss = 2,
    
    /**竞技场 */
    Jjc = 5,
    /**大乱斗 */
    DLD = 6,
    
    /**武馆礼包 */
    HeroPackage = 7,
    
    /**征战 */
    Expedition = 13,
    /**星星争夺战 */
    XXZDZ = 14,
    /**鏖战凶兽*/
    BigBoss = 15,
    /**武神殿*/
    WuShenDian = 16,
    /**同盟凶兽入侵*/
    BossFight = 18,
    // 赤壁之战
    AllianceWar = 19,
    kangjixiongshou = 20
}

// 0竞技场 1巅峰竞技场 2星星争夺战 3积分制竞技场
export enum EServerFightType{
    JJC = 0,
    DF_JJC = 1,
    XXZDZ = 2,
    ScoreJJC = 3
}

/*类型  1 冒险章节奖励 2 野外boss奖励 3 boss扫荡奖励 4 任务类型奖励*/
export enum ERewardType{
    Adventure = 1,
    YeWaiBoss = 2,
    BossSweep = 3,
    Task = 4,
    DLD = 9,

    //5秒倒计时
    Ticket = 11,
    /**宠物融合 */
    PetFusion = 17,
}

export enum EItemCfgId{
    // Gold = 1,//钻石，元宝
    // Money = 2,//金币
    // HorseFood = 8,//粮草
    // QuickBox = 9,//加速券
}

/**
 * 领取状态
 */
export enum EGetStatus{
    CanNotGet = 0,//不可领取
    CanGet = 1,//可领取
    IsAlreadyGet = 2,//已领取
}

/**
 * 使用场景 0通用场景 1神识 2宝箱
 */
export enum EUseItemScene{
    Normal = 0,
    /**神识 */
    Knowledge = 1,
    /**宝箱 */
    Chest = 2,
}

/** Item配置字段f_sub_type*/
export enum EItemSubType {
    /**货币类型 */
    Currency = 1,

    /**羽毛类型 */
    Plume = 2,

    /**信物类型 */
    Authenticating = 6,
}