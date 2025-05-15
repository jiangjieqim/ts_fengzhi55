export class RedEnum{
    /**竞技场挑战按钮 */
    public static JJC_FIGHT:number = 1;
    /**宝箱等级 */
    public static CHEST_LV:number = 2;
    /**公告选择的状态 */
    public static NOTICE_SEL:number = 3;
    //////////////////////////////////////////////////////////
    /**自动开宝箱的品质值 从1开始*/
    public static BOX_QUA:number = 4;
    /**自动开宝箱的属性值选择的索引*/
    public static BOX_ATTR_0:number = 5;
    public static BOX_ATTR_1:number = 6;

    public static BOX_ATTR_2:number = 7;
    public static BOX_ATTR_3:number = 8;
    /**战斗力 */
    public static BOX_PLUS:number = 9;
    /**宝箱每次使用的数量索引 */
    public static BOX_NUM_INDEX:number = 10;
    public static BOX_CK0:number = 11;
    public static BOX_CK1:number = 12;

    /**巅峰竞技场 */
    public static DF_JJC_FIGHT:number = 13;

    /**武将委托 */
    public static HERO_AUTO_CK0:number = 14;
    public static HERO_AUTO_CK1:number = 15;
    public static HERO_AUTO_CK2:number = 16;
    public static HERO_AUTO_QUA:number = 17;

    /**福佑 */
    public static CIFU_QUA:number = 18;
    public static CIFU_CK1:number = 19;
    public static CIFU_CK2:number = 20;

    /**音效 */
    public static MUISC_BG: number = 21;
    public static MUISC_EFFECT: number = 22;

    /**动画设置 0 磕头 1宝箱 */
    // public static ANIM_SET: number = 23;

    /**加速配置取值为1,2,3 */
    public static FIGHT_ANIM_SCALE: number = 24;

    /* 磕头值  0非磕头 1为磕头*/
    public static IsKowtow:number = 25;

    /* 宝石自动合成*/
    public static BaoShiAutoHC:number = 26;

    /**强弹 */
    public static POP_VAL:number = 27;

    /**套装从100开始 ~ 1000结束 (101~159 查看 t_Custom_Costumes中的)f_Costumesid*/
    public static SUIT_ID:number = 100;

    //这边从1000开始
    /**张郃动画*/
    public static ZHANGHE_ANI:number = 1001;
    /**超级客服*/
    public static VIP_KEFU:number = 1002;
    /**积少成多 */
    public static JI_SHAO_CHENGDUO = 1003;
    /**
     * 聚宝盆
     */
    public static RED_JuBaoPeng = 1004;
    /**
     * 借东风
     */
    public static RED_JieDongFeng = 1005;
    /**宠物融合 */
    public static PET_RH_QUA = 1006;

    /**折扣强弹id */
    public static DISCOUNT:number = 1007;

    /**折扣0.1新人弹窗 */
    public static DISCOUNT_POP_PLAYER:number = 1008;
    /**折扣0.1折次数 */
    public static DISCOUNT_POP_COUNT_DATA:number = 1009;

    /**本日第一次登录的时间戳 */
    public static DISCOUNT_POP_DAY_TIME:number = 1010;
    /**登录过多少天了 */
    public static DISCOUNT_POP_LOGIN_COUNT:number = 1011;
    public static SHEN_BIN_SHILIAN:number = 1015;
    public static ZUOQI_SHILIAN:number = 1013;
    public static LINGCHONG_SHILIAN:number = 1014;
}