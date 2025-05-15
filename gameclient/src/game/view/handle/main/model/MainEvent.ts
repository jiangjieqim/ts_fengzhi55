export class MainEvent {
    /**数据初始化完成 */
    // public static DataInit = "DataInit";
    /**
     * 数值变化
     */
    public static ValChange: string = "ValChange";
    /** 数值颗粒变化*/
    public static ValChangeCell:string = "ValChangeCell";
    /**
     * 装备变化
     */
    public static EquipChange: string = "EquipChange";
    /**
     * 删除物品列表
     */
    public static DelItems:string = "DelItem";
    /**
     * 出售成功
     */
    public static SellSucceed:string = "SellSucceed";
    /**
     * 出售结束
     */
    public static SellFinished:string = "SellFinished";
    /**野外boss */
    public static AdventureBossUpdate:string = "AdventureBossUpdate";
    /**更新坐骑id*/
    public static UpdateWingId:string = "UpdateWingId";
    /**奖励推送更新 */
    public static Reward_revcUpdate:string = "Reward_revcUpdate";

    /**将主角的avatar添加到主界面 */
    public static AddHero:string = "AddHero";

    /**主界面切换的时候处理 */
    public static MainViewLayerChange:string = "MainViewLayerChange";

    /**按钮事件  */
    public static ButtonCtlClick:string = "ButtonCtlClick";

    /**更新头像和名字 */
    public static UpdateAvatarNickName = "UpdateAvatarNickName";
    
    /**主界面 */
    public static MainViewInit:string = "MainViewInit";

    /**功能开启 */
    public static Function_Open:string = "Function_Open";

    /**打开装备替换界面 */
    public static Open_Equip_switch_View:string = "Open_Equip_switch_View";

    /**跨天 */
    public static CrossDayUpadte:string = "CrossDayUpadte";

    /**按钮更新 */
    public static FuncSmallIconUpdate:string = "FuncSmallIconUpdate";

    /**宝箱使用更新 */
    public static BoxUsed:string = "BoxUse";
    /**武馆月卡 */
    public static GymCardUpdate:string = "GymCardUpdate"
    /**月卡 */
    public static MonthUpdate:string = "MonthUpdate";
    /**终身卡 */
    public static AllLifeUpdate:string = "AllLifeUpdate";

    /**签到状态变化 */
    public static SignStatus:string = "SignStatus";
    /**邮件红点 */
    public static MailRed:string = "MailRed";
    /**游戏圈红点 */
    public static YXQRed:string = "YXQRed";
    /**邮件列表更新 */
    public static MailListUpdate:string = "MailListUpdate";
    /**切换动画 */
    public static SWITCH_ANIM:string = "SWITCH_ANIM";
    /**新玩家提示 */
    public static UPDATE_NEW_PLAYER:string = "UPDATE_NEW_PLAYER";
    /**装备格子更新 */
    public static EquipSlot:string = "EquipSlot";
    /**征战更新 */
    public static ConquestUpdate: string = "ConquestUpdate";
    /**收缩/展开 */
    public static WindowSpread:string = "WindowSpread";
    /**底部栏显隐 */
    public static BottomBoxVisible:string = "BottomBoxVisible";
    /**更新按钮 */
    // public static UpadteMainButtons:string = "UpadteMainButtons"
    /**宝箱,等级礼包 */
    public static GrowPackUnlock:string = "GrowPackUnlock";
    /**特权卡 */
    public static Updata_TeQuanKa:string = "Updata_TeQuanKa";
    /**折扣商店周卡信息 */
    public static DailyShopWeekCard_Card:string = "DailyShopWeekCard_Card";

    public static Exp:string = "Exp";
    public static Level:string = "Level";

    public static EventPetFusionBaoDi:string = "EventPetFusionBaoDi";

    /**更新主界面 */
    public static EventMainUpdateView:string = "EventMainUpdateView";
    public static WxOnShow:string = "WxOnShow"; // 微信sdk wx.onShow
    public static ShareReward = 'ShareReward'; // 每日分享、添加到桌面
    public static BoxExtraChange = 'BoxExtraChange'; // 宝箱额外开出的物品
    public static ClubReward = 'ClubReward'; // 游戏圈礼包
    public static GameClubUpdate = 'GameClubUpdate'; // 游戏圈数据更新
    /**新人盛典的红点更新 */
    public static NewPlayerFeastRed_Update:string = "NewPlayerFeastRed_Update";
	//委托减少天数
    public static SUB_DAY:string = "SUB_DAY";
    public static AuthBtnChange:string = 'AuthBtnChange';
    /**装备关闭 */
    public static EquipViewClose:string = "EquipViewClose";
    /**委托 */
    // public static ChestProxy:string = "ChestProxy";

    public static FightAvatarAnim:string = "FightAvatarAnim";
    /**玩家自己操作关闭 */
    // public static EquipViewClientClickClose:string = "EquipViewClientClickClose";
    // 抖音分享给好友可以获取到分享成功的状态
    public static ShareSuccess:string = 'ShareSuccess';
    /**一键购买价格更新 */
    public static OneClickPurchase:string = "OneClickPurchase";
    /**更新按钮列表 */
    public static UpdateListView:string = "UpdateListView";
}