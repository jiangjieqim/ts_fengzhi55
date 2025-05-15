namespace Configs{

export class t_Adventure_Boss_dat{
/*id*/
public f_id:number;
/*关卡ID*/
public f_gkid:number;
/*关卡名称*/
public f_BossName:string;
/*开放条件*/
public f_OpenLimit:number;
/*敌人形象*/
public f_EnemyImage:number;
/*敌人ID*/
public f_EnemyID:number;
/*首次奖励*/
public f_FirstRewards:string;
/*扫荡奖励*/
public f_RaidsReward:string;
/*扫荡价格*/
public f_RaidsPrice:string;
}

export class t_Adventure_Level_dat{
/*id*/
public f_id:number;
/*关卡id*/
public f_Levelid:number;
/*页签*/
public f_Page:number;
/*章节名字*/
public f_Chapter:string;
/*章节id*/
public f_ChapterID:number;
/*小关卡id*/
public f_unitid:number;
/*小关卡名称*/
public f_Unit:string;
/*敌人形象id*/
public f_EnamyImage:number;
/*敌人属性id*/
public f_Enemyid:number;
/*关卡奖励物品ID1*/
public f_LevelReward1:string;
/*章节奖励*/
public f_ChapterReward:string;
/*扫荡掉落战魂数量*/
public f_RaidsGetSpirits:number;
/*关卡对应装备id*/
public f_Equipmentid:number;
/*人物头像*/
public f_headIcon:number;
/*稀有度*/
public f_quashow:string;
/*解锁武将池*/
public f_unlockhero:number;
}

export class t_AD_config_dat{
/*id*/
public f_id:number;
/*广告间隔*/
public f_adCD:number;
/*看广告领取奖励*/
public f_AdRewards:string;
}

export class t_AFK_Config_dat{
/*id*/
public f_id:number;
/*初始挂机时间上限*/
public f_AFKTimeLimit:number;
/*单个好友助力提高上限*/
public f_SingleFriendHelpTime:number;
/*好友助力上限*/
public f_FriendHelpLimit:number;
/*好友助力时间限制*/
public f_FriendHelpExpired:number;
/*快速挂机获得奖励时长*/
public f_QuickAFK:number;
/*快速挂机次数上限*/
public f_QuickAFKTimes:number;
/*快速挂机消耗*/
public f_QuickAFKCost:string;
/*快速挂机消耗成长*/
public f_QuickAFKCostGrow:string;
/*观看广告次数*/
public f_WatchTimes:number;
/*敌人形象*/
public f_EnemyImage:string;
/*敌人入场间隔时间*/
public f_EnemyCD:number;
/*挂机初始时间*/
public f_AFKTimeInit:number;
}

export class t_AFK_Pack_dat{
/*id*/
public f_id:number;
/*礼包内容*/
public f_Item:number;
/*礼包助力时间限制*/
public f_PackHelpExpired:number;
/*充值id*/
public f_PurchaseID:number;
}

export class t_AFK_Rewards_dat{
/*id*/
public f_id:number;
/*奖励id*/
public f_AFKRewardsID:number;
/*奖励等级*/
public f_AFKRewardsLevel:number;
/*挂机奖励*/
public f_AFKReward:string;
/*对应关卡id*/
public f_Levelid:number;
/*结算时间点*/
public f_RewardsInterval:number;
}

export class t_Alliance_BossSkill_dat{
/*id*/
public f_id:number;
/*bossId*/
public f_BossId:number;
/*boss技能id*/
public f_BossSkillID:string;
/*技能名称*/
public f_SkillName:string;
/*技能描述*/
public f_SkillDes:string;
}

export class t_Alliance_Boss_Attribute_dat{
/*id*/
public f_id:number;
/*boss id*/
public f_BossID:number;
/*boss名称*/
public f_BossName:string;
/*boss属性*/
public f_BossAttribute:string;
/*boss技能id*/
public f_BSkillID:string;
/*boss特点*/
public f_BossChar:string;
/*boss品质*/
public f_BossQuality:number;
/*boss骨骼*/
public f_Res:string;
/*是否显示*/
public f_isopen:number;
}

export class t_Alliance_Boss_Score_dat{
/*id*/
public f_id:number;
/*伤害档位*/
public f_Damage:number;
/*评分*/
public f_Score:string;
/*奖励*/
public f_Rewards:string;
}

export class t_Alliance_Config_dat{
/*id*/
public f_id:number;
/*同盟最大人数*/
public f_maxjoin:number;
/*创建同盟花费*/
public f_createcost:string;
/*同盟名称字数上限*/
public f_namemax:number;
/*每日凶兽挑战次数*/
public f_bossplaytimes:number;
/*同盟改名花费*/
public f_changenamecost:string;
/*同盟列表显示条数*/
public f_listnum:number;
/*同盟排名刷新时间*/
public f_rankrefreshtime:string;
/*同盟凶兽挑战回合限制*/
public f_maxround:number;
/*同盟公告字数限制*/
public f_noticemax:number;
/*默认公告*/
public f_defaultnotice:string;
/*重新加入同盟冷却时间*/
public f_RejoinCD:number;
}

export class t_Alliance_RankRewards_dat{
/*id*/
public f_id:number;
/*排名*/
public f_rank:string;
/*奖励*/
public f_rankrewards:string;
}

export class t_Alliance_Shop_dat{
/*id*/
public f_id:number;
/*商品*/
public f_goods:string;
/*价格*/
public f_price:string;
/*限购*/
public f_limit:number;
}

export class t_Alliance_War_BasePoint_dat{
/*id*/
public f_id:number;
/*城池类型*/
public f_CityType:number;
/*据点编号*/
public f_BaseNum:number;
/*每秒获得点数*/
public f_GetPoint:number;
/*首次奖励*/
public f_FirstRewards:number;
/*UI1*/
public f_UI1:string;
/*UI2*/
public f_UI2:string;
/*UI3*/
public f_UI3:string;
}

export class t_Alliance_War_Bouns_dat{
/*id*/
public f_id:number;
/*奖励关卡名称*/
public f_BounsName:string;
/*奖励关卡排名*/
public f_BounsRank:number;
/*点击次数*/
public f_ClickTimes:number;
/*奖励*/
public f_Rewards:string;
/*boss骨骼*/
public f_Res:string;
}

export class t_Alliance_War_City_dat{
/*id*/
public f_id:number;
/*城名*/
public f_cityname:string;
/*城池类型*/
public f_CityType:number;
/*技能名*/
public f_skillname:string;
/*技能效果*/
public f_skilleffect:string;
/*数值*/
public f_attr:string;
/*技能id*/
public f_skillid:number;
/*图标*/
public f_Icon:string;
}

export class t_Alliance_War_Config_dat{
/*id*/
public f_id:number;
/*报名开始日期*/
public f_ApplyStartDay:string;
/*报名开始时间*/
public f_ApplyStartTime:string;
/*报名结束日期*/
public f_ApplyEndDay:string;
/*报名结束时间*/
public f_ApplyEndTime:string;
/*报名限制联盟人数*/
public f_ApplyLimitNum:number;
/*活动开启日期*/
public f_EventStartDay:string;
/*活动开启时间*/
public f_EventStartTime:string;
/*活动结束时间*/
public f_EventEndTime:string;
/*奖励关卡持续时间*/
public f_BounsDurationTime:string;
/*奖励关卡游戏时间*/
public f_BounsGameTime:string;
/*活动报名限制开服时间*/
public f_OpenSeverTimeLimit:number;
/*最低限制贡献*/
public f_MinContibute:number;
/*体力上限*/
public f_ActionPoint:string;
/*体力恢复时间*/
public f_ActionRefillTime:number;
/*同步时间*/
public f_RefreshTime:number;
/*奖励关boss反抗次数*/
public f_BossHitBackTimes:number;
}

export class t_Alliance_War_Rank_Alliance_dat{
/*id*/
public f_id:number;
/*排名*/
public f_Rank:number;
/*奖励*/
public f_Rewards:string;
}

export class t_Alliance_War_Rank_Personal_dat{
/*id*/
public f_id:number;
/*排名*/
public f_Rank:string;
/*奖励*/
public f_Rewards:string;
}

export class t_Alliance_War_SixBoss_dat{
/*id*/
public f_id:number;
/*名称*/
public f_name:string;
/*头部ID*/
public f_HeadID:number;
/*武器ID*/
public f_WeaponID:number;
/*盾ID*/
public f_ShieldID:number;
/*翅膀ID*/
public f_WingID:number;
/*马ID*/
public f_MountID:number;
/*身体ID*/
public f_BodyID:number;
/*属性*/
public f_attribute:string;
/*分数*/
public f_points:number;
}

export class t_Alternation_GemScore_dat{
/*id*/
public f_id:number;
/*获取宝石的等级*/
public f_GemLevel:number;
/*相应获取的积分*/
public f_GemScore:number;
/*对应颜色*/
public f_GemColor:number;
}

export class t_Alternation_Gem_Config_dat{
/*id*/
public f_id:number;
/*单抽价格*/
public f_drawgemsingle:string;
/*3连抽价格*/
public f_drawgemtriple:string;
/*原价*/
public f_trueprice:number;
}

export class t_Alternation_Gem_Rate_dat{
/*id*/
public f_id:number;
/*宝石等级*/
public f_gemlevel:number;
/*概率*/
public f_rate:number;
}

export class t_Alternation_MountPack_dat{
/*id*/
public f_id:number;
/*礼包类型*/
public f_PackType:number;
/*礼包名称*/
public f_PackName:string;
/*礼包内容*/
public f_PackReward:string;
/*购买次数*/
public f_BuyTimes:number;
/*优惠百分比*/
public f_Discount:number;
/*充值id*/
public f_PurchaseID:number;
}

export class t_Alternation_Rank_dat{
/*id*/
public f_id:number;
/*活动类型*/
public f_ActivityType:number;
/*名次*/
public f_Position:string;
/*名次物品奖励*/
public f_Rewarditem:string;
/*名次称号奖励*/
public f_RewardTitle:number;
}

export class t_Alternation_Recharge_dat{
/*id*/
public f_id:number;
/*活动类型*/
public f_ActivityType:number;
/*累计充值档位*/
public f_PackName:number;
/*累充物品奖励*/
public f_Rewarditem:string;
/*累充称号奖励*/
public f_RewardTitle:number;
}

export class t_Alternation_Rookie_dat{
/*id*/
public f_id:number;
/*类型*/
public f_Type:number;
/*条件文本*/
public f_ConditionTxt:string;
/*达成条件*/
public f_Condition:number;
/*奖励*/
public f_Reward:string;
}

export class t_Alternation_RookiePack_dat{
/*id*/
public f_id:number;
/*礼包类型*/
public f_PackType:number;
/*礼包名称*/
public f_PackName:string;
/*礼包内容*/
public f_PackReward:string;
/*购买次数*/
public f_BuyTimes:number;
/*优惠百分比*/
public f_Discount:number;
/*充值id*/
public f_PurchaseID:number;
}

export class t_Alternation_Rookie_Rank_dat{
/*id*/
public f_id:number;
/*新人礼包类型*/
public f_PackType:number;
/*名次*/
public f_Position:string;
/*名次物品奖励*/
public f_Rewarditem:string;
}

export class t_Alternation_Rookie_Task_dat{
/*id*/
public f_id:number;
/*类型*/
public f_type:number;
/*是否是累计任务*/
public t_isrecord:number;
/*任务id*/
public f_TaskID:number;
/*任务内容*/
public f_TaskContent:string;
/*任务目标*/
public f_TaskTarget:number;
/*任务奖励*/
public f_task:string;
}

export class t_Arena_BuyTicket_dat{
/*id*/
public f_id:number;
/*num*/
public f_BuyID:number;
/*钻石购买挑战次数*/
public f_BuyTimes:number;
/*购买价格*/
public f_Price:string;
}

export class t_Arena_config_dat{
/*id*/
public f_id:number;
/*星期几*/
public f_Week:number;
/*每日免费次数*/
public f_FreeChance:number;
/*刷新次数*/
public f_RefreshChance:number;
/*刷新冷却时间*/
public f_RefreshCD:number;
/*免费次数刷新时间*/
public f_FreeChanceRetime:string;
/*每日竞技金币上限*/
public f_MoneyMaximum:number;
/*竞技场关闭时间*/
public f_ArenaCloseTime:string;
/*竞技场类型*/
public f_ArenaMode:number;
/*获胜奖励*/
public f_ArenaRewardVictory:string;
/*每日竞技上限物品id*/
public f_itemid:number;
/*刷新价格*/
public f_refreshprice:string;
/*刷新价格增值*/
public f_refreshpriceincs:string;
/*刷新价格上限*/
public f_refreshpricemax:string;
}

export class t_Arena_NewSever_Point_dat{
/*id*/
public f_id:number;
/*类型*/
public f_rewardstype:number;
/*胜利积分*/
public f_vicPoint:string;
/*失败积分*/
public f_losePoint:string;
}

export class t_Arena_Peak_config_dat{
/*id*/
public f_id:number;
/*每次挑战消耗*/
public f_challegecost:string;
/*每日免费次数*/
public f_FreeChance:number;
/*挑战购买价格*/
public f_CouponPrice:string;
/*刷新次数*/
public f_RefreshChance:number;
/*刷新冷却时间*/
public f_RefreshCD:number;
/*每日竞技上限物品id*/
public f_itemid:number;
/*每日竞技红羽上限*/
public f_MoneyMaximum:number;
/*竞技场关闭时间*/
public f_ArenaCloseTime:string;
/*获胜奖励*/
public f_ArenaRewardVictory:string;
/*排行榜显示人数*/
public f_RankPeople:number;
/*巅峰竞技场最低等级限制*/
public f_MinLevel:number;
/*刷新价格*/
public f_refreshprice:string;
/*刷新价格增值*/
public f_refreshpriceincs:string;
/*刷新价格上限*/
public f_refreshpricemax:string;
}

export class t_Arena_Peak_RankReward_Daily_dat{
/*id*/
public f_id:number;
/*num*/
public f_DailyRewardID:number;
/*名次*/
public f_Ranking:string;
/*奖励id*/
public f_DailyReward:string;
/*最大上限标识*/
public f_StatMax:number;
}

export class t_Arena_Peak_RankReward_Weekly_dat{
/*id*/
public f_id:number;
/*num*/
public f_WeeklyRewardID:number;
/*名次*/
public f_Ranking:string;
/*奖励*/
public f_WeeklyReward:string;
/*最大上限标识*/
public f_StatMax:number;
}

export class t_Arena_RankReward_Daily_dat{
/*id*/
public f_id:number;
/*num*/
public f_DailyRewardID:number;
/*名次*/
public f_Ranking:string;
/*奖励id*/
public f_DailyReward:string;
/*最大上限标识*/
public f_StatMax:number;
}

export class t_Arena_RankReward_Weekly_dat{
/*id*/
public f_id:number;
/*num*/
public f_WeeklyRewardID:number;
/*名次*/
public f_Ranking:string;
/*奖励*/
public f_WeeklyReward:string;
/*最大上限标识*/
public f_StatMax:number;
}

export class t_Arena_Robot_dat{
/*id*/
public f_id:number;
/*机器人ID*/
public f_RobotID:number;
/*竞技场排名*/
public f_Ranking:number;
/*机器人装备id*/
public f_RobotAttributeID:number;
/*商队马车个数*/
public f_CarriageNumber:number;
}

export class t_Arena_Robot_Equipment_dat{
/*id*/
public f_id:number;
/*机器人id*/
public f_RobotID:number;
/*机器人等级*/
public f_RobotLevel:string;
/*机器人宝箱等级*/
public f_RobotBoxLevel:string;
/*机器人装备形象id*/
public f_RobotEquipmentImage:string;
/*机器人坐骑ID*/
public f_RobotMountID:string;
/*机器人坐骑等级*/
public f_RobotMountLevel:string;
/*机器人翅膀id*/
public f_RobotWingID:string;
/*机器人翅膀等级*/
public f_RobotWingLevel:string;
}

export class t_Artifact_Attribute_dat{
/*id*/
public f_id:number;
/*属性ID*/
public f_AttributeID:number;
/*初始值*/
public f_Origin:number;
/*提升值*/
public f_Upgrade:number;
/*品质id*/
public f_QualityID:number;
}

export class t_Artifact_Combo_dat{
/*id*/
public f_id:number;
/*套装id*/
public f_ComboID:number;
/*套装名称*/
public f_ComboName:string;
/*神兵id*/
public f_Artifactid:string;
}

export class t_Artifact_Combo_Attribute_dat{
/*id*/
public f_id:number;
/*套装等级*/
public f_ComboLevel:number;
/*套装id*/
public f_ComboId:number;
/*属性*/
public f_Attr:string;
}

export class t_Artifact_Config_dat{
/*id*/
public f_id:number;
/*每次开箱消耗*/
public f_PreCost:string;
/*神兵盛宴消耗*/
public f_PreCost_Money:string;
/*神兵盛宴打折价格*/
public f_PreCost_discount:string;
/*10连开箱*/
public f_PreCostTen:string;
/*神兵盛宴10连消耗*/
public f_TenCost_Money:string;
/*神兵盛宴10连打折价格*/
public f_TenCost_discount:string;
}

export class t_Artifact_Exp_dat{
/*id*/
public f_id:number;
/*神兵稀有度*/
public f_ArtifactQua:number;
/*当前等级*/
public f_currentlevel:number;
/*升到下一个等级所需要的碎片*/
public f_pieces:number;
}

export class t_Artifact_List_dat{
/*id*/
public f_id:number;
/*神兵id*/
public f_Artifactid:number;
/*神兵名*/
public f_ArtifactName:string;
/*技能id*/
public f_skillid:string;
/*技能id_v1*/
public f_skillid_v1:string;
/*是否增加面板属性*/
public f_isAdd:number;
/*神兵碎片资源id*/
public f_itemId:number;
/*神兵稀有度*/
public f_ArtifactQua:number;
/*神器效果*/
public f_Artifactinfo:string;
/*神兵描述*/
public f_Comment:string;
/*神兵描述_v1*/
public f_Comment_v1:string;
/*f_初始数值*/
public f_initVal:string;
/*f_初始数值_v1*/
public f_initVal_v1:string;
/*是否是百分比*/
public f_ispercent:number;
/*数值参数*/
public f_parameter:string;
/*数值参数_v1*/
public f_parameter_v1:string;
/*冒险/副本boss中是否可用*/
public f_AdventureUsed:number;
}

export class t_Artifact_pack_dat{
/*id*/
public f_id:number;
/*f_name*/
public f_name:string;
/*礼包内容*/
public f_Item:string;
/*购买次数*/
public f_BuyTimes:number;
/*充值id*/
public f_PurchaseID:number;
}

export class t_Artifact_Rate_dat{
/*id*/
public f_id:number;
/*奖励id*/
public f_Rewardsid:number;
/*奖励名*/
public f_RewardsName:string;
/*itemid*/
public f_itemid:string;
/*概率*/
public f_rate:number;
}

export class t_Artifact_Transform_dat{
/*id*/
public f_id:number;
/*神器稀有度*/
public f_ArtifactQua:number;
/*转化量*/
public f_Transform:string;
}

export class t_Battle_config_dat{
/*id*/
public f_id:number;
/*战斗默认站位*/
public f_defaultposition:number;
/*第二排进场延迟秒*/
public f_timedelay:number;
}

export class t_Blessing_Attribute_dat{
/*id*/
public f_id:number;
/*等级*/
public f_SoulLevel:number;
/*白色精魄*/
public f_WhiteSoul:number;
/*绿色精魄*/
public f_GreenSoul:number;
/*蓝色精魄*/
public f_BlueSoul:number;
/*紫色精魄*/
public f_PurpleSoul:number;
/*黄色精魄*/
public f_YellowSoul:number;
/*橙色精魄*/
public f_OrangeSoul:number;
/*红色精魄*/
public f_RedSoul:number;
/*属性*/
public f_Attribute:number;
}

export class t_Blessing_Attribute_Name_dat{
/*id*/
public f_id:number;
/*属性id*/
public f_AttributeID:string;
/*属性名*/
public f_AttributeName:string;
/*炼破属性名*/
public f_ExtractionName:string;
/*特殊属性*/
public f_AttributeType:number;
}

export class t_Blessing_Attribute_Special_dat{
/*id*/
public f_id:number;
/*等级*/
public f_SoulLevel:number;
/*白色精魄*/
public f_WhiteSoul:number;
/*绿色精魄*/
public f_GreenSoul:number;
/*蓝色精魄*/
public f_BlueSoul:number;
/*紫色精魄*/
public f_PurpleSoul:number;
/*黄色精魄*/
public f_YellowSoul:number;
/*橙色精魄*/
public f_OrangeSoul:number;
/*红色精魄*/
public f_RedSoul:number;
}

export class t_Blessing_Config_dat{
/*id*/
public f_id:number;
/*每日免费次数*/
public f_FreeTimes:number;
/*仓库上限*/
public f_StorageMax:number;
}

export class t_Blessing_GetStage_dat{
/*id*/
public f_id:number;
/*阶段id*/
public f_StageID:number;
/*阶段类型*/
public f_StageType:number;
/*阶段等级*/
public f_ItemID:number;
/*升级消耗*/
public f_UpgradeCost:string;
/*成功率*/
public f_SucRate:number;
}

export class t_Blessing_Rewards_dat{
/*id*/
public f_id:number;
/*获得的物品*/
public f_ItemID:number;
/*属性获取*/
public f_AttributeGet:number;
/*白灯获取概率*/
public f_white:number;
/*绿灯获取概率*/
public f_green:number;
/*蓝灯获取概率*/
public f_blue:number;
/*紫灯免费获取概率*/
public f_purplefree:number;
/*紫灯付费获取概率*/
public f_purplepaid:number;
/*黄灯获取概率*/
public f_yellow:number;
/*橙灯获取概率*/
public f_orange:number;
}

export class t_Blessing_Shop_dat{
/*id*/
public f_id:number;
/*物品id*/
public f_itemID:number;
/*物品类型*/
public f_ItemType:number;
/*商品编号*/
public f_ItemName:string;
/*售价*/
public f_Price:string;
/*属性*/
public f_Attribute:string;
/*图标位置*/
public f_icon:string;
}

export class t_Blessing_SlotOpen_dat{
/*id*/
public f_id:number;
/*赐福格子数量*/
public f_Slot:number;
/*开放的玩家等级*/
public f_PlayerLevel:number;
}

export class t_Blessing_Soul_Exp_dat{
/*id*/
public f_id:number;
/*等级*/
public f_SoulLevel:number;
/*白色精魄*/
public f_WhiteSoul:string;
/*绿色精魄*/
public f_GreenSoul:string;
/*蓝色精魄*/
public f_BlueSoul:string;
/*紫色精魄*/
public f_PurpleSoul:string;
/*黄色精魄*/
public f_YellowSoul:string;
/*橙色精魄*/
public f_OrangeSoul:string;
/*红色精魄*/
public f_RedSoul:string;
}

export class t_Blessing_Soul_Icon_dat{
/*id*/
public f_id:number;
/*福佑属性*/
public f_SoulAttribute:number;
/*物品类型id*/
public f_ItemID:number;
/*福佑名字*/
public f_SoulName:string;
/*图标位置*/
public f_icon:string;
}

export class t_Blessing_Soul_Quality_dat{
/*id*/
public f_id:number;
/*itemID*/
public f_itemId:number;
/*稀有度id*/
public f_QualityID:number;
/*精魄稀有度*/
public f_SoulQuality:string;
/*显示类型*/
public f_Enable:number;
/*名字*/
public f_SoulQualityName:string;
/*颜色*/
public f_Color:string;
/*精魄稀有度名称*/
public f_QualityName:string;
/*精魄0级转化经验*/
public f_ConvertExp:string;
/*精魄对应Quality字段*/
public f_QualityField:string;
}

export class t_BoxCD_dat{
/*id*/
public f_id:number;
/*宝箱等级*/
public f_BoxLevel:number;
/*宝箱升级时间*/
public f_BoxCD:number;
/*升级所需格子数量*/
public f_ClickTimes:number;
/*每格所需金钱*/
public f_Cost:number;
}

export class t_BoxGacha_dat{
/*id*/
public f_id:number;
/*宝箱等级*/
public f_BoxLevel:number;
/*客户端显示*/
public f_Quality_Client:string;
/*客户端显示下一级*/
public f_Quality_Client_next:string;
/*灰*/
public f_grey:number;
/*绿*/
public f_green:number;
/*蓝*/
public f_blue:number;
/*紫*/
public f_purple:number;
/*金*/
public f_gold:number;
/*橙*/
public f_orange:number;
/*粉*/
public f_pink:number;
/*红*/
public f_red:number;
/*天蓝*/
public f_skyblue:number;
/*浅绿*/
public f_LightGreen:number;
/*浅蓝*/
public f_LightBlue:number;
/*浅紫*/
public f_LightPurple:number;
/*浅金*/
public f_LightGold:number;
}

export class t_BoxValueInit_dat{
/*id*/
public f_id:number;
/*初始化值*/
public f_value:number;
}

export class t_Box_AnimationRate_dat{
/*id*/
public f_id:number;
/*动作序列*/
public f_animindex:number;
/*概率*/
public f_animRate:number;
}

export class t_Box_Auto_dat{
/*id*/
public f_id:number;
/*任务id*/
public f_TaskID:number;
/*宝箱倍率*/
public f_BoxMag:number;
/*解锁类型*/
public f_UnlockType:number;
/*参数*/
public f_p1:number;
}

export class t_Box_ExtraItem_dat{
/*id*/
public f_id:number;
/*宝箱等级*/
public f_BoxLevel:number;
/*产出物品权重*/
public f_GetRate:number;
/*疲劳后概率*/
public f_TiredRate:number;
/*疲劳累计值*/
public f_TiredValue:number;
/*宝箱额外产出*/
public f_BoxRate:string;
/*最大拥有上限*/
public f_Maxhold:number;
/*初始值*/
public f_initiNum:number;
}

export class t_Box_filter_dat{
/*id*/
public f_id:number;
/*筛选1*/
public f_filter1:string;
}

export class t_BufferEffect_dat{
/*id*/
public f_id:number;
/*资源*/
public f_res:string;
/*技能名字*/
public f_name:string;
}

export class t_Bullet_Resource_dat{
/*id*/
public f_id:number;
/*弹道id*/
public f_BulletID:number;
/*弹道资源*/
public f_BulletRes:number;
}

export class t_CharacterBorn_dat{
/*id*/
public f_id:number;
/*活动类型*/
public f_activityType:number;
/*活动所在面板*/
public f_pos:number;
/*打开的界面类型*/
public f_uitype:number;
/*是否开放*/
public f_open:number;
/*需要检测的funid*/
public f_funcid:number;
/*图标*/
public f_icon:string;
}

export class t_Chat_Config_dat{
/*id*/
public f_id:number;
/*聊天过期天数*/
public f_expireddays:number;
/*频道内最大消息条数*/
public f_maxmessage:number;
/*单条信息最大字数*/
public f_maxcount:number;
/*违规消息替换*/
public f_illegalText:string;
/*每条消息发送时间间隔*/
public f_pertextCD:number;
/*显示消息时间间隔*/
public f_timestage:number;
}

export class t_Chief_Blessing_dat{
/*id*/
public f_id:number;
/*福源格子id*/
public f_slotid:number;
/*老服解锁等级*/
public f_unlocklevelold:number;
/*新服解锁等级*/
public f_unlocklevelnew:number;
}

export class t_Chief_Class_dat{
/*id*/
public f_id:number;
/*职业id*/
public f_classid:string;
/*职业*/
public f_chiefclass:string;
/*特性介绍*/
public f_classinfo:string;
}

export class t_Chief_Collection_config_dat{
/*id*/
public f_id:number;
/*士气奖励需求星数*/
public f_starlevel:number;
/*奖励物品*/
public f_MoraleAttr:string;
}

export class t_Chief_Collection_Morale_dat{
/*id*/
public f_id:number;
/*总星级*/
public f_starlevel:number;
/*属性*/
public f_MoraleAttr:string;
}

export class t_Chief_draw_config_dat{
/*id*/
public f_id:number;
/*单抽消耗*/
public f_drawsingle:string;
/*单抽获得数量*/
public f_drawsingle_num:number;
/*10连抽消耗*/
public f_drawten:string;
/*10连抽消耗元宝*/
public f_drawten_gold:string;
/*10连抽获得数量*/
public F_drawtem_num:number;
/*副将10连盛宴抽取消耗*/
public f_FeastDiscount:string;
/*副将10连盛宴抽取消耗元宝*/
public f_FeastDiscount_gold:string;
/*35连抽消耗*/
public f_drawmulti:string;
/*35连抽消耗元宝*/
public f_drawmulti_gold:string;
/*35连抽获得数量*/
public F_drawmulti_num:number;
/*副将35抽盛宴取消耗*/
public f_Drawsinglediscount:string;
/*副将35抽盛宴取消耗元宝*/
public f_Drawsinglediscount_gold:string;
/*单个军令状价格*/
public f_tokenprice:string;
/*每日免费次数*/
public f_freetimes:number;
/*盛宴打折额度*/
public f_discountvalue:number;
}

export class t_Chief_Draw_Exp_dat{
/*id*/
public f_id:number;
/*等级*/
public f_drawlevel:number;
/*所需经验值*/
public f_exp:number;
}

export class t_Chief_draw_Rate_dat{
/*id*/
public f_id:number;
/*稀有度id*/
public f_qualityid:number;
/*等级*/
public f_drawlevel:number;
/*副将稀有度*/
public f_cheifQuality:number;
/*稀有度概率*/
public f_QualityRate:number;
}

export class t_Chief_draw_type_dat{
/*id*/
public f_id:number;
/*类型id*/
public f_typeid:number;
/*抽取类型*/
public f_drawtype:number;
/*抽取概率*/
public f_drawrate:number;
}

export class t_Chief_Equipment_Attribute_dat{
/*id*/
public f_id:number;
/*星级*/
public f_star:number;
/*装备等级*/
public f_equiplevel:number;
/*是否是升星*/
public f_isupstage:number;
/*所需的升级石数量*/
public f_upgradecost:string;
/*鞋子*/
public f_position11:string;
/*武器*/
public f_position9:string;
/*护甲*/
public f_position5:string;
/*盾牌*/
public f_position12:string;
/*项链*/
public f_position10:string;
}

export class t_Chief_Equipment_Sort_dat{
/*id*/
public f_id:number;
/*装备排序*/
public f_Equipmentsort:number;
}

export class t_Chief_Equipment_Star_dat{
/*id*/
public f_id:number;
/*星级*/
public f_starid:number;
/*装备排序*/
public f_Equipmentsort:string;
/*稀有度*/
public f_starquality:number;
}

export class t_Chief_Flag_List_dat{
/*id*/
public f_id:number;
/*战旗名称*/
public f_flag:string;
/*默认*/
public f_isdefault:number;
/*价格*/
public f_flagprice:string;
/*初始值*/
public f_flag_initi:string;
/*升级成长值*/
public f_flag_upgrade:string;
/*忽视属性初始值*/
public f_flag_defence:string;
/*忽视属性升星*/
public f_flag_defence_upgrade:string;
/*旗帜icon*/
public f_flag_icon:string;
/*战斗旗帜*/
public f_flag_inbattle:string;
/*特殊忽视属性初始值*/
public f_flag_defence_dentifty:string;
/*特殊忽视属性升星*/
public f_flag_defence_upgrade_dentifty:string;
}

export class t_Chief_Flag_Upgrade_dat{
/*id*/
public f_id:number;
/*战旗等级*/
public f_flaglevel:number;
/*战旗等阶*/
public f_flagstage:number;
/*战旗升级消耗*/
public f_flag_upgrade:string;
/*是否是升阶*/
public f_flag_isupstage:number;
}

export class t_Chief_List_dat{
/*id*/
public f_id:number;
/*是否是默认称号*/
public f_isdefault:number;
/*副将id*/
public f_cheifid:number;
/*副将名称*/
public f_cheif:string;
/*远程攻击类型*/
public f_attact_remote:number;
/*攻击弹道资源*/
public f_BulletPic:number;
/*副将稀有度*/
public f_cheifQuality:number;
/*副将职业*/
public f_cheifClass:number;
/*副将所属国家*/
public f_country:number;
/*装备id*/
public f_equipId:number;
/*攻击类型*/
public f_attacktype:number;
/*抽到碎片获得*/
public f_piecesget:string;
/*抽到重复获得*/
public f_repeatget:string;
/*碎片id*/
public f_piecesid:number;
/*副将技能*/
public f_chiefskill:string;
/*装备图标id*/
public f_equipiconid:number;
/*副将皮肤*/
public f_chiefskin:string;
/*特殊属性初始值*/
public f_specialattrinit:string;
/*特性升级成长值*/
public f_specialupgrade:string;
/*特性升星成长值*/
public f_specialupstar:string;
/*特性星级解锁*/
public f_specialunlock:string;
/*继承比*/
public f_inherit:string;
}

export class t_Chief_Skill_dat{
/*id*/
public f_id:number;
/*副将id*/
public f_cheifid:number;
/*副将名称*/
public f_cheif:string;
/*副将稀有度*/
public f_cheifQuality:number;
/*星级节点*/
public f_starpoint:string;
/*后端技能1*/
public f_serverskill1:string;
/*后端技能2*/
public f_serverskill2:string;
/*后端技能3*/
public f_serverskill3:string;
/*后端技能4*/
public f_serverskill4:string;
/*前端技能1*/
public f_clientskill1:string;
/*前端技能2*/
public f_clientskill2:string;
/*前端技能3*/
public f_clientskill3:string;
/*前端技能4*/
public f_clientskill4:string;
}

export class t_Chief_Skill_Client_dat{
/*id*/
public f_id:number;
/*前端技能id*/
public f_clientskillid:number;
/*技能名称*/
public f_skillname:string;
/*技能初始值*/
public f_initvalue:string;
/*技能1数值量*/
public f_valuenum:string;
/*技能描述*/
public f_skillintro:string;
/*进化技星级*/
public f_upskillunlock:number;
/*进化技能说明*/
public f_upskillinfo:string;
}

export class t_Chief_Skill_List_dat{
/*id*/
public f_id:number;
/*技能id*/
public f_skillid:number;
/*技能等级*/
public f_skilllevel:number;
/*技能名称*/
public f_skillname:string;
/*技能数值*/
public f_skillvalue:string;
/*技能数值客户端*/
public f_skillvalueclient:number;
/*技能说明*/
public f_skillinfo:string;
/*升级消耗*/
public f_upgradecost:string;
}

export class t_chief_skill_upgrade_dat{
/*id*/
public f_id:number;
/*技能等级*/
public f_skilllevel:number;
/*技能升级消耗*/
public f_upgradeskillcost:string;
}

export class t_Chief_Skin_List_dat{
/*id*/
public f_id:number;
/*皮肤id*/
public f_skinid:number;
/*皮肤类型*/
public f_skintype:number;
/*参数*/
public f_p1:number;
/*装备id*/
public f_equipmentid:number;
/*皮肤名称*/
public f_skinname:string;
/*皮肤icon*/
public f_skinicon:string;
}

export class t_Chief_Slot_dat{
/*id*/
public f_id:number;
/*站位id*/
public f_slotid:number;
/*位置是否可用*/
public f_pos_available:number;
/*主将默认站位*/
public f_defaultslot:number;
/*解锁等级*/
public f_unlocklevel:number;
/*解锁等级新服*/
public f_unlocklevelnew:number;
/*解锁等级_v1*/
public f_unlocklevel_v1:number;
}

export class t_Chief_star_dat{
/*id*/
public f_id:number;
/*星级id*/
public f_starid:number;
/*升星所需碎片*/
public f_upstarcost:number;
/*是否是升阶*/
public f_isupstage:number;
/*升星所需碎片_new*/
public f_upstarcost_new:number;
/*是否是升阶_new*/
public f_isupstage_new:number;
}

export class t_Chief_Support_Inherit_dat{
/*id*/
public f_id:number;
/*助战继承占比*/
public f_support:number;
}

export class t_Chief_upgrade_dat{
/*id*/
public f_id:number;
/*副将等级*/
public f_chieflevel:number;
/*升级消耗*/
public f_upgradecost:string;
}

export class t_Chief_Value_dat{
/*id*/
public f_id:number;
/*属性id*/
public f_attrid:number;
/*等级权重*/
public f_levelweight:number;
/*品质权重*/
public f_quaweight:number;
/*星级权重*/
public f_starweight:number;
/*装备系数*/
public f_equipweight:number;
/*肉盾职业系数*/
public f_2:number;
/*战士职业系数*/
public f_1:number;
/*刺客职业系数*/
public f_3:number;
/*辅助职业系数*/
public f_4:number;
}

export class t_Conquest_EnemyValue_dat{
/*id*/
public f_id:number;
/*敌人id*/
public f_EnemyID:number;
/*敌人名称*/
public f_Stations:string;
/*敌人战力*/
public f_EnemyPower:number;
/*敌人品质*/
public f_EnemyImage:number;
/*敌人等级*/
public f_EnemyLv:number;
/*敌人星级*/
public f_EnemyStar:number;
/*技能id*/
public f_SkillID:string;
/*敌人属性*/
public f_EnemyAttribute:string;
/*灵宠id*/
public f_PetID:number;
}

export class t_Conquest_EnemyValue_v1_dat{
/*id*/
public f_id:number;
/*敌人id*/
public f_EnemyID:number;
/*敌人名称*/
public f_Stations:string;
/*敌人战力*/
public f_EnemyPower:number;
/*敌人品质*/
public f_EnemyImage:number;
/*敌人等级*/
public f_EnemyLv:number;
/*敌人星级*/
public f_EnemyStar:number;
/*技能id*/
public f_SkillID:string;
/*敌人属性*/
public f_EnemyAttribute:string;
/*灵宠id*/
public f_PetID:number;
}

export class t_Conquest_Value_dat{
/*id*/
public f_id:number;
/*关卡名*/
public f_LevelName:string;
/*小关卡*/
public f_Level:string;
/*局内站位*/
public f_Stations:string;
/*敌人属性ID*/
public f_Enemyid:string;
/*敌人形象ID*/
public f_EnemyImage:string;
/*阵容特性*/
public f_Lineup:string;
/*关卡奖励*/
public f_LevelReward:string;
/*阶段奖励*/
public f_StageReward:string;
/*灵兽id*/
public f_PetID:number;
}

export class t_Custom_Costumes_dat{
/*id*/
public f_id:number;
/*套装名*/
public f_Name:string;
/*攻击类型*/
public f_AttackType:number;
/*攻击弹道资源*/
public f_BulletPic:number;
/*套装id*/
public f_Costumesid:number;
/*套装单件品质展示*/
public f_equipQuality:number;
/*套装稀有度*/
public f_CostumesQuality:number;
/*头盔id*/
public f_2:number;
/*铠甲id*/
public f_5:number;
/*武器id*/
public f_9:number;
/*盾牌id*/
public f_12:number;
/*坐骑id*/
public f_14:number;
/*翅膀id*/
public f_13:number;
/*套装属性*/
public f_SuitID:string;
}

export class t_DailyEvent_Position_dat{
/*id*/
public f_id:number;
/*地名*/
public f_positionName:string;
/*类型1文本*/
public f_introType1:string;
/*类型2文本*/
public f_introType2:string;
/*类型3文本*/
public f_introType3:string;
/*图片*/
public f_type2Pic:string;
/*消耗*/
public f_Cost:string;
/*十连消耗*/
public f_CostTen:string;
}

export class t_DailyEvent_Rewards_dat{
/*id*/
public f_id:number;
/*事件类型*/
public f_eventtype:number;
/*奖励*/
public f_rewards:string;
/*概率*/
public f_Rate:number;
/*地点id*/
public f_position:number;
}

export class t_DailyEvent_Task_dat{
/*id*/
public f_id:number;
/*任务类型*/
public f_tasktype:number;
/*任务说明*/
public f_taskinfo:string;
/*任务内容数量*/
public f_taskcontent:number;
/*奖励*/
public f_rewards:string;
/*界面跳转*/
public f_viewjump:number;
}

export class t_Douyin_dat{
/*id*/
public f_id:number;
/*值*/
public f_val:string;
}

export class t_DrawEvent_Config_dat{
/*id*/
public f_id:number;
/*抽取消耗*/
public f_DrawCost:string;
/*福运值上限*/
public f_ProtectLimite:number;
/*活动类型*/
public f_EventType:number;
}

export class t_DrawEvent_CumulateRewards_dat{
/*id*/
public f_id:number;
/*抽取次数*/
public f_DrawTimes:number;
/*累计奖励*/
public f_CumulateRewards:string;
/*活动类型*/
public f_EventType:number;
/*客户端播放*/
public f_Clientplay:string;
}

export class t_DrawEvent_Pack_dat{
/*id*/
public f_id:number;
/*礼包类型*/
public f_PackType:number;
/*礼包名称*/
public f_PackName:string;
/*礼包奖励*/
public f_PackRewards:string;
/*限购次数*/
public f_PackBuyLimit:number;
/*价格*/
public f_Price:string;
/*礼包充值id*/
public f_PackPurchase:number;
}

export class t_DrawEvent_Rate_dat{
/*id*/
public f_id:number;
/*奖励类型*/
public f_RewardsType:number;
/*抽取概率*/
public f_DrawRate:number;
/*活动类型*/
public f_EventType:number;
}

export class t_DrawEvent_Rewards_dat{
/*id*/
public f_id:number;
/*获取次数*/
public f_getLimit:number;
/*主界面道具显示*/
public f_UIItem:number;
/*奖励类型*/
public f_RewardsType:number;
/*奖励*/
public f_Rewards:string;
/*解锁条件*/
public f_UnlockCondi:number;
/*活动类型*/
public f_EventType:number;
}

export class t_DrawEvent_Task_dat{
/*id*/
public f_id:number;
/*任务类型id*/
public f_Tasktype:number;
/*任务描述*/
public f_Taskintro:string;
/*任务内容*/
public f_TaskContent:number;
/*任务奖励*/
public f_TaskRewards:string;
/*界面跳转*/
public f_viewjump:number;
}

export class t_EffectValue_dat{
/*id*/
public f_id:number;
/*名字*/
public f_name:string;
/*绿色装备范围*/
public f_green:string;
/*蓝色装备范围*/
public f_blue:string;
/*紫色装备范围*/
public f_purple:string;
/*金色装备范围*/
public f_gold:string;
/*橙色色装备范围*/
public f_orange:string;
/*粉色装备范围*/
public f_pink:string;
/*红色装备范围*/
public f_red:string;
/*天蓝色装备范围*/
public f_skyblue:string;
/*浅绿色装备范围*/
public f_LightGreen:string;
/*浅蓝色装备范围*/
public f_LightBlue:string;
/*浅紫色装备范围*/
public f_LightPurple:string;
/*浅金色装备范围*/
public f_LightGold:string;
}

export class t_Enemy_Image_dat{
/*id*/
public f_id:number;
/*敌人id*/
public f_EnemyID:number;
/*攻击类型*/
public f_AttackType:number;
/*攻击弹道资源*/
public f_BulletPic:number;
/*头部ID*/
public f_HeadID:number;
/*武器ID*/
public f_WeaponID:number;
/*盾ID*/
public f_ShieldID:number;
/*翅膀ID*/
public f_WingID:number;
/*马ID*/
public f_MountID:number;
/*身体ID*/
public f_BodyID:number;
/*名字*/
public f_Name:string;
/*攻击偏移位置*/
public f_attackpos:string;
/*形象id*/
public f_ImageID:number;
}

export class t_Enemy_Simulation_dat{
/*id*/
public f_id:number;
/*属性*/
public f_attribute:string;
}

export class t_Enemy_Value_dat{
/*id*/
public f_id:number;
/*敌人数值id*/
public f_EnemyValueID:number;
/*速度*/
public f_10002:number;
/*生命*/
public f_10003:number;
/*攻击*/
public f_10004:number;
/*防御*/
public f_10005:number;
/*吸血*/
public f_10006:number;
/*反击*/
public f_10007:number;
/*连击*/
public f_10008:number;
/*闪避*/
public f_10009:number;
/*暴击*/
public f_10010:number;
/*击晕*/
public f_10011:number;
/*忽视吸血*/
public f_10012:number;
/*忽视反击*/
public f_10013:number;
/*忽视连击*/
public f_10014:number;
/*忽视闪避*/
public f_10015:number;
/*忽视暴击*/
public f_10016:number;
/*忽视击晕*/
public f_10017:number;
/*灵兽id*/
public f_PetID:number;
}

export class t_Enemy_Value_v1_dat{
/*id*/
public f_id:number;
/*敌人数值id*/
public f_EnemyValueID:number;
/*速度*/
public f_10002:number;
/*生命*/
public f_10003:number;
/*攻击*/
public f_10004:number;
/*防御*/
public f_10005:number;
/*吸血*/
public f_10006:number;
/*反击*/
public f_10007:number;
/*连击*/
public f_10008:number;
/*闪避*/
public f_10009:number;
/*暴击*/
public f_10010:number;
/*击晕*/
public f_10011:number;
/*忽视吸血*/
public f_10012:number;
/*忽视反击*/
public f_10013:number;
/*忽视连击*/
public f_10014:number;
/*忽视闪避*/
public f_10015:number;
/*忽视暴击*/
public f_10016:number;
/*忽视击晕*/
public f_10017:number;
/*灵兽id*/
public f_PetID:number;
}

export class t_EquipmentID_dat{
/*id*/
public f_id:number;
/*名字*/
public f_name:string;
}

export class t_EquipmentQuality_dat{
/*id*/
public f_id:number;
/*名字*/
public f_EquipmentLevel:string;
/*颜色*/
public f_Color:string;
/*副将品质名称*/
public f_chiefinfo:string;
/*副将颜色*/
public f_chiefcolor:string;
/*开启随机值*/
public f_openvaluerd:string;
}

export class t_EquipmentValue_dat{
/*id*/
public f_id:number;
/*属性名*/
public f_name:string;
/*等级权重*/
public f_LevelWeight:number;
/*品质权重*/
public f_QualityWeight:number;
/*随机参数*/
public f_icon_RandomCount:number;
}

export class t_Equipment_Assets_ID_dat{
/*id*/
public f_id:number;
/*等级*/
public f_level:number;
/*灰*/
public f_grey:string;
/*绿*/
public f_green:string;
/*蓝*/
public f_blue:string;
/*紫*/
public f_purple:string;
/*黄*/
public f_gold:string;
/*橙*/
public f_orange:string;
/*粉*/
public f_pink:string;
/*红*/
public f_red:string;
/*天蓝*/
public f_skyblue:string;
/*浅绿*/
public f_LightGreen:string;
/*浅蓝*/
public f_LightBlue:string;
/*浅紫*/
public f_LightPurple:string;
/*浅金*/
public f_LightGold:string;
}

export class t_Equipment_DIY_dat{
/*id*/
public f_id:number;
/*装备等级*/
public f_Level:number;
/*装备品质*/
public f_Quality:number;
/*速度*/
public f_10002:number;
/*生命*/
public f_10003:number;
/*攻击*/
public f_10004:number;
/*防御*/
public f_10005:number;
/*吸血*/
public f_10006:number;
/*反击*/
public f_10007:number;
/*连击*/
public f_10008:number;
/*闪避*/
public f_10009:number;
/*暴击*/
public f_10010:number;
/*击晕*/
public f_10011:number;
/*仁爱*/
public f_10018:number;
/*禁疗*/
public f_10019:number;
/*暴虐*/
public f_10020:number;
/*回复*/
public f_10021:number;
/*泥泞*/
public f_10022:number;
/*欺凌*/
public f_10023:number;
/*装备部位id*/
public f_AssetID:number;
/*装备款式id*/
public f_StyleID:number;
/*战斗力*/
public f_plus:number;
/*装备等级_backup*/
public f_Level_backup:number;
/*装备品质_backup*/
public f_Quality_backup:number;
/*速度_backup*/
public f_10002_backup:number;
/*生命_backup*/
public f_10003_backup:number;
/*攻击_backup*/
public f_10004_backup:number;
/*防御_backup*/
public f_10005_backup:number;
/*吸血_backup*/
public f_10006_backup:number;
/*反击_backup*/
public f_10007_backup:number;
/*连击_backup*/
public f_10008_backup:number;
/*闪避_backup*/
public f_10009_backup:number;
/*暴击_backup*/
public f_10010_backup:number;
/*击晕_backup*/
public f_10011_backup:number;
/*仁爱_backup*/
public f_10018_backup:number;
/*禁疗_backup*/
public f_10019_backup:number;
/*暴虐_backup*/
public f_10020_backup:number;
/*回复_backup*/
public f_10021_backup:number;
/*泥泞_backup*/
public f_10022_backup:number;
/*欺凌_backup*/
public f_10023_backup:number;
/*装备部位id_backup*/
public f_AssetID_backup:number;
/*装备款式id_backup*/
public f_StyleID_backup:number;
/*战斗力_backup*/
public f_plus_backup:number;
}

export class t_Err_dat{
/*id*/
public f_id:number;
/*名字*/
public f_err:string;
/*是否需要数数上报*/
public f_report:number;
/*上报类型*/
public f_type:number;
}

export class t_Err_Sucess_dat{
/*id*/
public f_id:number;
/*成功消息*/
public f_success:string;
}

export class t_Event_2024Spring_Config_dat{
/*id*/
public f_id:number;
/*联盟报名资格上限*/
public f_RegisterLimit:number;
/*联盟总威望排行条数*/
public f_PrestigeRank:number;
/*动画间隔时间*/
public f_AnimationCD:number;
/*弹出界面物品*/
public f_openViewItem:string;
/*特效*/
public f_ItemEffect:string;
}

export class t_Event_2024Spring_FireWork_dat{
/*id*/
public f_id:number;
/*烟花类型id*/
public f_FireWorkType:number;
/*烟花id*/
public f_FireworkID:number;
/*威望值*/
public f_prestigeVal:string;
}

export class t_Event_2024Spring_Pack_dat{
/*id*/
public f_id:number;
/*礼包类型*/
public f_PackType:number;
/*礼包名称*/
public f_PackName:string;
/*奖励*/
public f_Rewards:string;
/*充值id*/
public f_payid:number;
/*价格*/
public f_Price:string;
/*限购次数*/
public f_PackBuyLimit:number;
}

export class t_Event_2024Spring_Rank_dat{
/*id*/
public f_id:number;
/*名次*/
public f_Position:string;
/*名次物品奖励*/
public f_Rewarditem:string;
}

export class t_Event_2024Spring_Shop_dat{
/*id*/
public f_id:number;
/*个人威望值*/
public f_PersonalLimit:number;
/*商品*/
public f_goods:string;
/*价格*/
public f_price:string;
/*限购*/
public f_limit:number;
}

export class t_Event_2024Spring_StageRewards_dat{
/*id*/
public f_id:number;
/*阶段*/
public f_stage:number;
/*威望总值*/
public f_Value:number;
/*阶段奖励*/
public f_stageRewards:string;
}

export class t_Event_2024Spring_Task_dat{
/*id*/
public f_id:number;
/*任务类型*/
public f_tasktype:number;
/*任务说明*/
public f_taskinfo:string;
/*任务内容数量*/
public f_taskcontent:number;
/*数量显示除数*/
public f_divisor:number;
/*奖励*/
public f_rewards:string;
/*界面跳转*/
public f_viewjump:number;
}

export class t_Event_GamePass_Config_dat{
/*id*/
public f_id:number;
/*月卡重置*/
public f_MonthRefresh:number;
/*周卡重置*/
public f_WeekRefresh:number;
/*购买几次礼包可以领取山巅奖励*/
public f_ConditionTimes:number;
/*山巅奖励*/
public f_PeakRewards:string;
/*初次界面领取*/
public f_InitiRewards:string;
}

export class t_Event_GamePass_Month_dat{
/*id*/
public f_id:number;
/*对应积分*/
public f_Point:number;
/*月奖励免费*/
public f_Month_Rewardsfree:string;
/*月奖励付费*/
public f_Month_Rewardspay:string;
/*顺序*/
public f_Sort:number;
/*轮次*/
public f_Round:number;
}

export class t_Event_GamePass_Pack_dat{
/*id*/
public f_id:number;
/*类型*/
public f_type:number;
/*奖励*/
public f_Rewards:string;
/*充值id*/
public f_payid:number;
}

export class t_Event_GamePass_Task_dat{
/*id*/
public f_id:number;
/*任务类型*/
public f_tasktype:number;
/*任务说明*/
public f_taskinfo:string;
/*任务内容数量*/
public f_taskcontent:number;
/*奖励*/
public f_rewards:string;
/*界面跳转*/
public f_viewjump:number;
}

export class t_Event_GamePass_Week_dat{
/*id*/
public f_id:number;
/*对应积分*/
public f_Point:number;
/*周奖励免费*/
public f_Week_Rewards:string;
/*周奖励付费*/
public f_Week_Rewardspay:string;
/*顺序*/
public f_Sort:number;
/*轮次*/
public f_Round:number;
}

export class t_ExpValue_dat{
/*id*/
public f_id:number;
/*等级*/
public f_lv:number;
/*经验值*/
public f_ExpValue:number;
}

export class t_Func_dat{
/*id*/
public f_id:number;
/*功能id*/
public f_FunctionID:number;
/*接取任务id*/
public f_task:number;
/*接取任务id_v1*/
public f_task_v1:number;
/*是否开放*/
public f_close:number;
/*是否开放_v1*/
public f_close_v1:number;
/*名字*/
public f_name:string;
/*外显名字*/
public f_outsidename:string;
/*场景*/
public f_BackGround:number;
/*开服几天后开启*/
public f_AfterSeverOpenDays:number;
/*客户端模块id*/
public f_viewType:number;
/*服务器验证*/
public f_verify:number;
/*功能类型*/
public f_FuncType:number;
/*说明*/
public f_info:string;
/*说明_v1*/
public f_info_v1:string;
/*提审*/
public f_ts:number;
/*提审描述*/
public f_ts_name:string;
/*子菜单小icon*/
public f_sub_icon:string;
/*点击是否直接隐藏红点*/
public f_hide_red:number;
/*购买月卡直接解锁*/
public f_unlock1:number;
/*购买终身卡直接解锁*/
public f_unlock2:number;
}

export class t_Func_Guide_dat{
/*id*/
public f_id:number;
/*排序*/
public f_sort:number;
/*任务id*/
public f_taskid:number;
/*名称*/
public f_funcname:string;
/*功能介绍*/
public f_funcdes:string;
/*图标*/
public f_icon:number;
/*排序_v1*/
public f_sort_v1:number;
/*任务id_v1*/
public f_taskid_v1:number;
/*名称_v1*/
public f_funcname_v1:string;
/*功能介绍_v1*/
public f_funcdes_v1:string;
/*图标_v1*/
public f_icon_v1:number;
/*奖励内容*/
public f_rewards:string;
}

export class t_Fund_dat{
/*id*/
public f_id:number;
/*礼包id*/
public f_Packid:number;
/*礼包名称*/
public f_PackName:string;
/*对应档位*/
public f_Stalls:number;
/*奖励预览*/
public f_preview:string;
/*收益增幅*/
public f_RewardUp:number;
/*收益增幅资源*/
public f_RewardUp_res:number;
}

export class t_FundOne_dat{
/*id*/
public f_id:number;
/*天数*/
public f_Day:number;
/*基金奖励*/
public f_FundReward:string;
}

export class t_FundThree_dat{
/*id*/
public f_id:number;
/*天数*/
public f_Day:number;
/*基金奖励*/
public f_FundReward:string;
}

export class t_FundTwo_dat{
/*id*/
public f_id:number;
/*天数*/
public f_Day:number;
/*基金奖励*/
public f_FundReward:string;
}

export class t_Fund_New_dat{
/*id*/
public f_id:number;
/*基金类型*/
public f_FundType:number;
/*任务类型*/
public f_TaskType:number;
/*任务文本*/
public f_TaskText:string;
/*达成条件*/
public f_Condition:string;
/*免费奖励*/
public f_FreeReward:string;
/*付费奖励*/
public f_RmbReward:string;
}

export class t_Fund_Type_dat{
/*id*/
public f_id:number;
/*基金类型*/
public f_FundType:number;
/*基金名称*/
public f_FundName:string;
/*充值id*/
public f_PurchaseID:string;
/*购买后立刻获得道具*/
public f_PurchaseItem:string;
}

export class t_gameconfig_dat{
/*id*/
public f_id:number;
/*排序*/
public f_sort:number;
/*是否启用*/
public f_isenable:number;
/*属性名*/
public f_name:string;
/*参数1*/
public f_p1:number;
/*显示的属性*/
public f_showattr:number;
/*显示百分比*/
public f_per:number;
/*备注*/
public f_desc:string;
/*武神殿阵容特性*/
public f_PalaceChar:string;
}

export class t_Gem_Attribute_dat{
/*id*/
public f_id:number;
/*宝石等级*/
public f_GemLevel:number;
/*宝石id*/
public f_Gemid:number;
/*宝石属性*/
public f_GemAttr:string;
}

export class t_Gem_Attribute_LifeLine_dat{
/*id*/
public f_id:number;
/*宝石总等级*/
public f_gemTotalLevel:number;
/*属性*/
public f_attr:string;
}

export class t_Gem_Attribute_Resonance_dat{
/*id*/
public f_id:number;
/*宝石最低等级*/
public f_gemlevelmin:number;
/*属性*/
public f_attr:string;
}

export class t_Gem_Config_dat{
/*id*/
public f_id:number;
/*宝石等级*/
public f_gemlevel:string;
/*宝石形状*/
public f_GemShape:string;
/*宝石颜色*/
public f_GemColor:string;
/*自动合成宝石等级筛选*/
public f_gemselect:number;
}

export class t_Gem_Formation_dat{
/*id*/
public f_id:number;
/*法阵id*/
public f_Formationid:number;
/*法阵位置*/
public f_FormationidPos:number;
/*宝石颜色*/
public f_GemColor:number;
}

export class t_Gem_Formation_List_dat{
/*id*/
public f_id:number;
/*法阵id*/
public f_Formationid:number;
/*法阵稀有度*/
public f_formationQuality:number;
/*加成*/
public f_add:string;
/*法阵价格*/
public f_FormationPrice:string;
/*itemid*/
public f_itemid:number;
/*背景资源*/
public f_backpic:string;
}

export class t_Gem_List_dat{
/*id*/
public f_id:number;
/*宝石名称*/
public f_gemname:string;
/*宝石id*/
public f_Gemid:number;
/*重铸*/
public f_GemTransShape:number;
/*变质*/
public f_GemTransColor:number;
/*形状*/
public f_GemShape:number;
/*颜色*/
public f_GemColor:number;
/*宝石属性id*/
public f_GemAttrid:string;
/*宝石属性*/
public f_GemAttr:string;
/*宝石icon*/
public f_gemicon:string;
}

export class t_Gem_Shop_dat{
/*id*/
public f_id:number;
/*商品价格*/
public f_price:string;
/*参数1*/
public f_p1:string;
/*对应itemid*/
public f_itemid:number;
/*参数2*/
public f_p2:number;
/*宝石盛宴折扣*/
public f_Discount:number;
/*免费购买次数*/
public f_freetimes:number;
}

export class t_Gem_Shop_Activity_dat{
/*id*/
public f_id:number;
/*商品价格优先级*/
public f_PricePriority:string;
}

export class t_Gem_Transform_dat{
/*id*/
public f_id:number;
/*宝石等级*/
public f_GemLevel:number;
/*价格*/
public f_Price:string;
/*宝石盛宴折扣*/
public f_Discount:number;
/*宝石碎片消耗*/
public f_gempiece:string;
}

export class t_Gym_Config_dat{
/*id*/
public f_id:number;
/*每次邀请消耗邀请函数量*/
public f_LetterCost:number;
/*邀请函上限*/
public f_LetterMax:number;
/*邀请函恢复*/
public f_LetterIncreaseTime:number;
/*排队上限*/
public f_Queue:number;
/*勤俭基础值*/
public f_ecobase:number;
}

export class t_Gym_Facility_Drum_dat{
/*id*/
public f_id:number;
/*等阶*/
public f_FacilityRank:number;
/*等级*/
public f_FacilityLevel:number;
/*战鼓属性*/
public f_DrumAttribute:string;
/*升级消耗（碎银）*/
public f_UpgradeCost:string;
/*任务*/
public f_Task:string;
}

export class t_Gym_Facility_Dummy_dat{
/*id*/
public f_id:number;
/*等阶*/
public f_FacilityRank:number;
/*等级*/
public f_FacilityLevel:number;
/*假人属性*/
public f_DummyAttribute:string;
/*升级消耗（碎银）*/
public f_UpgradeCost:string;
/*任务*/
public f_Task:string;
}

export class t_Gym_Facility_lantern_dat{
/*id*/
public f_id:number;
/*等阶*/
public f_FacilityRank:number;
/*等级*/
public f_FacilityLevel:number;
/*燃灯属性*/
public f_LanternAttribute:string;
/*升级消耗（碎银）*/
public f_UpgradeCost:string;
/*任务*/
public f_Task:string;
}

export class t_Gym_Facility_List_dat{
/*id*/
public f_id:number;
/*武馆设备id*/
public f_FacilityId:number;
/*设备名称*/
public f_FacilityName:string;
}

export class t_Gym_Facility_Platform_dat{
/*id*/
public f_id:number;
/*等阶*/
public f_FacilityRank:number;
/*非红色武将的概率*/
public f_Not_Red:string;
/*红色武将的概率*/
public f_Red:number;
/*升级消耗（碎银）*/
public f_UpgradeCost:string;
/*任务*/
public f_Task:string;
/*非红色武将的概率客户端*/
public f_Not_Red_Client:string;
/*红色武将的概率客户端*/
public f_Red_Client:number;
}

export class t_Gym_Facility_Tea_dat{
/*id*/
public f_id:number;
/*等阶*/
public f_FacilityRank:number;
/*等级*/
public f_FacilityLevel:number;
/*茶壶属性*/
public f_TeaAttribute:string;
/*升级消耗（碎银）*/
public f_UpgradeCost:string;
/*任务*/
public f_Task:string;
}

export class t_Gym_Map_dat{
/*id*/
public f_id:number;
/*地区名*/
public f_MapName:string;
/*条件*/
public f_Condition:string;
/*需要通关的关卡id*/
public f_Adventure_Level:number;
/*图标*/
public f_Icon:string;
/*颜色*/
public f_Color:string;
/*说明*/
public f_Info:string;
}

export class t_Gym_Mission_Config_dat{
/*id*/
public f_id:number;
/*任务刷新花费*/
public f_MissionRefreshCost:string;
/*每次刷新的任务个数*/
public f_MissionNum:number;
}

export class t_Gym_Mission_List_dat{
/*id*/
public f_id:number;
/*星级*/
public f_StarRank:number;
/*iconid*/
public f_iconid:number;
/*任务类型*/
public f_TaskType:number;
/*内容数量*/
public f_RewardsType:string;
/*任务名称*/
public f_MissionName:string;
}

export class t_Gym_Mission_Quality_dat{
/*id*/
public f_id:number;
/*任务稀有度id*/
public f_MissionRankid:number;
/*任务星级*/
public f_Star:number;
/*碎银奖励*/
public f_MissionRewards:string;
/*任务概率*/
public f_MissionProbability:number;
}

export class t_Gym_Mission_Type_dat{
/*id*/
public f_id:number;
/*设施突破任务id*/
public f_GymTaskID:string;
/*设施突破任务内容*/
public f_GymtaskContent:string;
}

export class t_Gym_NPC_Anim_dat{
/*模板id*/
public f_id:number;
/*anim*/
public f_anim:string;
}

export class t_Gym_NPC_Bond_dat{
/*id*/
public f_id:number;
/*羁绊id*/
public f_BondID:number;
/*羁绊名*/
public f_BondName:string;
/*羁绊稀有度*/
public f_BondQuality:number;
/*武将*/
public f_NpcIds:string;
/*羁绊*/
public f_bondAttr:string;
}

export class t_Gym_NPC_Image_dat{
/*id*/
public f_id:number;
/*是否是武将*/
public f_IsHero:number;
/*江湖人士id*/
public f_MiscNPCID:number;
/*类型id*/
public f_TypeID:number;
/*NPCID*/
public f_NPCID:number;
/*类型名*/
public f_Typename:string;
/*动画持续时间*/
public f_SingleAnimeTime:number;
/*头部ID*/
public f_HeadID:number;
/*武器ID*/
public f_WeaponID:number;
/*盾ID*/
public f_ShieldID:number;
/*身体ID*/
public f_BodyID:number;
/*喊话id*/
public f_TalkID:string;
/*成功演武id*/
public f_TalkWinID:string;
/*失败演武id*/
public f_TalkLostID:string;
/*动画类型*/
public f_AnimIndex:number;
/*江湖人士*/
public f_peopleType:number;
}

export class t_Gym_NPC_InnerRoom_dat{
/*id*/
public f_id:number;
/*神识id*/
public f_RoomID:number;
/*神识等级*/
public f_RoomLevel:number;
/*格子数量*/
public f_PlaidAmount:number;
/*每格价钱*/
public f_PlaidPrice:string;
/*可携带的传承上限*/
public f_Slots:string;
/*升级时间*/
public f_UpgradeCD:number;
}

export class t_Gym_NPC_List_dat{
/*id*/
public f_id:number;
/*武将id*/
public f_HeroID:number;
/*属性名*/
public f_name:string;
/*地区*/
public f_Region:number;
/*武将稀有度*/
public f_HeroQuality:number;
/*武将类型*/
public f_HeroType:number;
/*武将所属国家*/
public f_HeroCountry:number;
/*属性*/
public f_Attribute:string;
/*信物id*/
public f_TokenID:number;
/*遗忘获得的道具*/
public f_knowledge:string;
/*武将描述*/
public f_desc:string;
/*武将头像id*/
public f_iconid:number;
/*描述*/
public f_info:string;
}

export class t_Gym_NPC_MiscList_dat{
/*id*/
public f_id:number;
/*江湖人士id*/
public f_MiscNPCID:number;
/*NPC稀有度*/
public f_NPCQuality:string;
/*江湖人士*/
public f_MiscNPC:string;
/*江湖人士概率*/
public f_MiscRate:number;
/*武将id*/
public f_HeroID:number;
/*地区*/
public f_Region:number;
/*获得物品*/
public f_Gain:string;
}

export class t_Gym_NPC_Quality_dat{
/*id*/
public f_id:number;
/*NPC稀有度*/
public f_NPCQuality:string;
/*动画*/
public f_Anim:string;
/*动画持续时间*/
public f_SingleAnimeTime:number;
/*初始完整度范围*/
public f_SkillRangeIniti:string;
/*失败率*/
public f_LetterMax:number;
/*排序*/
public f_sort:number;
/*名字*/
public f_name:string;
/*颜色*/
public f_Color:string;
}

export class t_Gym_NPC_Talk_dat{
/*id*/
public f_id:number;
/*说话类型*/
public f_type:number;
/*内容*/
public f_Content:string;
}

export class t_Gym_NPC_Type_dat{
/*id*/
public f_id:number;
/*类型id*/
public f_TypeID:number;
/*类型名*/
public f_Typename:string;
}

export class t_Gym_refinement_AttributeList_dat{
/*id*/
public f_id:number;
/*备注*/
public f_comment:string;
/*开启*/
public f_Avilible:number;
}

export class t_Gym_refinement_AttributeQuality_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_QualityID:number;
/*属性品质*/
public f_AttributeQuality:number;
/*品质名*/
public f_QualityName:string;
/*出现概率*/
public f_Freshrate:number;
}

export class t_Gym_refinement_AttributeRange_dat{
/*id*/
public f_id:number;
/*属性id*/
public f_Attributeid:number;
/*词条类型*/
public f_type:number;
/*属性概率*/
public f_Rate:string;
}

export class t_Gym_refinement_Config_dat{
/*id*/
public f_id:number;
/*花费类型*/
public f_CostType:string;
/*概率*/
public f_Rate:string;
}

export class t_Gym_Shop_dat{
/*id*/
public f_id:number;
/*页签id*/
public f_PageID:number;
/*商品id*/
public f_ItemID:string;
/*信物名称*/
public f_TokenName:string;
/*信物数值*/
public f_TokenValue:string;
/*信物价格*/
public f_TokenPrice:string;
}

export class t_Halloween_Purchase_dat{
/*id*/
public f_id:number;
/*是否免费*/
public f_isfree:number;
/*充值额度*/
public f_AccPurchase:number;
/*奖励客户端*/
public f_rewards_client:string;
/*奖励*/
public f_rewards:string;
/*活动类型*/
public f_eventtype:number;
}

export class t_Image_Attribute_dat{
/*id*/
public f_id:number;
/*角色id*/
public f_CharacterID:number;
/*角色品质*/
public f_CharacterQua:number;
/*角色属性*/
public f_CharacterAttr:string;
/*获取方式*/
public f_GetMethod:string;
/*类型*/
public f_type:number;
}

export class t_Image_List_dat{
/*id*/
public f_id:number;
/*类型*/
public f_type:number;
/*形象名字*/
public f_ImageName:string;
/*形象id*/
public f_ImageID:number;
/*皮肤id*/
public f_SkinID:string;
/*头像id*/
public f_Headicon:string;
}

export class t_Invitation_dat{
/*id*/
public f_id:number;
/*邀请人数*/
public f_InvitationC:number;
/*奖励条件*/
public f_InvitationCon:number;
/*邀请奖励*/
public f_Rewardinvitation:string;
}

export class t_Invitation_Value_dat{
/*id*/
public f_id:number;
/*邀请数量*/
public f_InvitationC:number;
/*到达等级*/
public f_QuestLevel:number;
/*增长数值*/
public f_UpgradeInv:string;
}

export class t_Item_dat{
/*id*/
public f_id:number;
/*名字*/
public f_name:string;
/*物品英文名称*/
public f_englishname:string;
/*物品id*/
public f_itemid:number;
/*名字(英)*/
public f_info:string;
/*后台显示*/
public f_isshow:number;
/*道具数量限制*/
public f_itemNum:number;
/*图标*/
public f_icon:string;
/*品质*/
public f_qua:number;
/*小类型*/
public f_sub_type:number;
/*参数p1*/
public f_p1:string;
/*参数p2*/
public f_p2:string;
/*行为*/
public f_actionType:number;
/*参数p3*/
public f_p3:string;
/*参数p4*/
public f_p4:number;
}

export class t_Item_AccessUI_dat{
/*ID*/
public f_id:number;
/*道具ID*/
public f_itemID:string;
}

export class t_Item_Guide_dat{
/*id*/
public f_id:number;
/*引导ID*/
public f_GuideID:number;
/*道具ID*/
public f_ItemID:number;
/*引导位置*/
public f_GuidePosition:string;
/*提示按钮XY偏移*/
public f_XY:string;
/*手指位置*/
public f_handposition:number;
/*小界面Y轴位置*/
public f_sviewY:number;
/*是否显示小界面*/
public f_showsmallview:number;
/*是否是界面*/
public f_isview:number;
}

export class t_Labour_Box_Config_dat{
/*id*/
public f_id:number;
/*f_宝箱获取概率*/
public f_rate:number;
/*是否是扭蛋币*/
public f_iscoin:number;
/*获取物品*/
public f_rewards:string;
/*每日获得上限*/
public f_DailyMax:number;
/*活动类型*/
public f_type:number;
}

export class t_Labour_Config_dat{
/*id*/
public f_id:number;
/*奖励*/
public f_exchangeRwards:string;
/*每次扭蛋消耗*/
public f_PreCost:string;
/*每次扭蛋获得的物品*/
public f_PreRewards:string;
/*保底次数*/
public f_MinRate:number;
/*特殊处理参数*/
public f_Specialpara1:number;
/*活跃券兑换规则*/
public f_exchangeCost1:string;
/*活动类型*/
public f_type:number;
/*主界面展示货币*/
public f_mainicon:number;
/*商店展示货币*/
public f_shopicon:number;
/*商店展示货币_1*/
public f_shopicon_1:number;
}

export class t_Labour_Config_item_dat{
/*id*/
public f_id:number;
/*物品类型*/
public f_itemtype:number;
/*物品稀有度*/
public f_itemQua:number;
/*物品*/
public f_item:string;
/*可获得次数*/
public f_GetTimes:number;
/*坐骑tips*/
public f_MountTips:string;
/*活动类型*/
public f_type:number;
}

export class t_Labour_Config_Rate_dat{
/*id*/
public f_id:number;
/*物品稀有度*/
public f_itemQua:number;
/*物品获取概率*/
public f_itemRate:number;
/*活动类型*/
public f_type:number;
}

export class t_Labour_ExtraItem_dat{
/*id*/
public f_id:number;
/*类型*/
public f_type_func:number;
/*活动期间掉落*/
public f_DropinEvent:string;
/*掉落限量*/
public f_DropLimit:number;
/*活动类型*/
public f_type:number;
}

export class t_Labour_Pack_dat{
/*id*/
public f_id:number;
/*f_name*/
public f_name:string;
/*礼包内容*/
public f_Item:string;
/*购买次数*/
public f_BuyTimes:number;
/*充值id*/
public f_PurchaseID:number;
/*活动类型*/
public f_type:number;
}

export class t_Labour_Shop_dat{
/*id*/
public f_id:number;
/*商品品质*/
public f_GoodsQua:number;
/*商品类型*/
public f_GoodsType:number;
/*商品*/
public f_GoodsID:string;
/*商品限购*/
public f_GoodsLimit:number;
/*售价*/
public f_Price:string;
/*是否可以连开*/
public f_isquick:number;
/*介绍显示*/
public f_Tips:string;
/*活动类型*/
public f_type:number;
}

export class t_Labour_Shop_Controller_dat{
/*id*/
public f_id:number;
/*是否有活跃商店*/
public f_is_freeshop:number;
/*活动类型*/
public f_type:number;
}

export class t_Labour_Shop_Free_dat{
/*id*/
public f_id:number;
/*商品*/
public f_GoodsID:string;
/*商品限购*/
public f_GoodsLimit:number;
/*售价*/
public f_Price:string;
/*活动类型*/
public f_type:number;
/*是否可以连开*/
public f_isquick:number;
}

export class t_MainIcon_dat{
/*id*/
public f_id:number;
/*icon*/
public f_icon:string;
/*按钮坐标*/
public f_pos:number;
/*功能id*/
public f_funid:string;
/*附功能*/
public f_funarr:string;
/*排序*/
public f_sort:number;
/*UI扩展*/
public f_Uiexpand:number;
/*打开的入口*/
public f_ui_id:number;
/*中间按钮坐标*/
public f_mid_pos:number;
/*中间按钮的名称*/
public f_mid_name:string;
/*第2中间按钮*/
public f_mid_left_pos:number;
}

export class t_Monopoly_Config_dat{
/*id*/
public f_id:number;
/*每次投掷消耗骰子数量*/
public f_Cost:string;
}

export class t_Monopoly_Map_dat{
/*id*/
public f_id:number;
/*地图*/
public f_AreaID:number;
/*地图名*/
public f_AreaName:string;
/*解锁条件*/
public f_UnlockCondi:number;
/*活动类型*/
public f_EventType:number;
/*图片*/
public f_Res:string;
/*背景*/
public f_backgroundpic:string;
/*大奖显示*/
public f_BigRewards:string;
}

export class t_Monopoly_Pack_dat{
/*id*/
public f_id:number;
/*礼包类型*/
public f_PackType:number;
/*礼包名称*/
public f_PackName:string;
/*礼包奖励*/
public f_PackRewards:string;
/*限购次数*/
public f_PackBuyLimit:number;
/*礼包充值id*/
public f_PackPurchase:number;
}

export class t_Monopoly_RoundRewards_dat{
/*id*/
public f_id:number;
/*地图id*/
public f_AreaID:number;
/*圈数*/
public f_Round:number;
/*大奖显示*/
public f_BigPrize:number;
/*游历奖励*/
public f_RoundRewards:string;
/*活动类型*/
public f_EventType:number;
}

export class t_Monopoly_Task_dat{
/*id*/
public f_id:number;
/*任务类型id*/
public f_Tasktype:number;
/*任务描述*/
public f_Taskintro:string;
/*任务内容*/
public f_TaskContent:number;
/*任务奖励*/
public f_TaskRewards:string;
/*界面跳转*/
public f_viewjump:number;
}

export class t_Monopoly_TileRewards_dat{
/*id*/
public f_id:number;
/*地区类型*/
public f_AreaType:number;
/*格子id*/
public f_TileID:number;
/*人物朝向*/
public f_direct:number;
/*奖励*/
public f_Rewards:string;
/*活动类型*/
public f_EventType:number;
}

export class t_Mount_Config_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_QualityID:number;
/*等级上限*/
public f_MaxLevel:number;
/*升级初始消耗*/
public f_UpgradeInit:string;
/*升级消耗成长*/
public f_UpgardeInc:string;
/*养成阶段格子数量*/
public f_plaidAmount:number;
/*攻击属性成长值*/
public f_MountEffectValue:string;
/*坐骑攻击属性*/
public f_MountEffectSkill:string;
/*星星上限*/
public f_MaxStar:number;
/*升星消耗*/
public f_UpgradeStar:string;
/*转换兽魂数量*/
public f_MountPieces:number;
/*返乡消耗*/
public f_Ruturn:string;
/*洗髓消耗*/
public f_Refinement:string;
/*洗髓锁定消耗*/
public f_Refinementlock:string;
/*7星觉醒消耗*/
public f_AwakeCost7:string;
/*8星觉醒消耗*/
public f_AwakeCost8:string;
}

export class t_Mount_Gacha_dat{
/*概率id*/
public f_id:number;
/*坐骑品质*/
public f_qua:number;
/*高级刷新*/
public f_adrefresh:number;
/*坐骑券刷新*/
public f_Mountfresh:number;
/*高级刷新（免费）*/
public f_freerefresh:number;
/*免费重置时间*/
public f_RefreshTime:string;
/*单抽消耗*/
public f_SingleCost:string;
/*3连抽消耗*/
public f_TripleCost:string;
/*折扣(万分比）*/
public f_Discount:number;
/*10连抽消耗*/
public f_TenDrawCost:string;
}

export class t_Mount_List_dat{
/*id*/
public f_id:number;
/*坐骑id*/
public f_MountID:number;
/*品质*/
public f_Quality:number;
/*坐骑名称*/
public f_MountName:string;
/*启用卡池*/
public f_enable:number;
/*2阶技能*/
public f_Skill1:number;
/*2阶技能数值*/
public f_Skill1Value:number;
/*解锁星级2*/
public f_UnlockVal1:number;
/*4阶技能*/
public f_Skill2:number;
/*4阶技能数值*/
public f_Skill2Value:number;
/*解锁星级4*/
public f_UnlockVal2:number;
/*6阶技能*/
public f_Skill3:number;
/*6阶技能数值*/
public f_Skill3Value:number;
/*解锁星级6*/
public f_UnlockVal3:number;
/*7阶技能*/
public f_Skill4:number;
/*7阶技能数值*/
public f_Skill4Value:number;
/*解锁星级7*/
public f_UnlockVal4:number;
/*8阶技能*/
public f_Skill5:number;
/*8阶技能数值*/
public f_Skill5Value:number;
/*解锁星级8*/
public f_UnlockVal5:number;
/*骨骼id*/
public f_skel:number;
/*获得来源描述*/
public f_getmethodinfo:string;
/*技能*/
public f_MountSkill:string;
/*技能名*/
public f_MountSkillName:string;
/*技能名字*/
public f_SkillName:string;
/*7星技能描述*/
public f_7StarSkill:string;
}

export class t_Mount_Mission_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_PlaceID:number;
/*地点*/
public f_PlaceName:string;
/*地点品质*/
public f_PlaceQuality:number;
/*地点产出*/
public f_PlaceReward:string;
/*地点时间*/
public f_MissionTime:number;
/*地点是否默认开放*/
public f_MissionOpen:number;
/*地点开通价格*/
public f_MissionPrice:string;
/*地点坐骑数量*/
public f_MountNum:number;
}

export class t_Mount_Quality_dat{
/*id*/
public f_id:number;
/*坐骑等阶*/
public f_lv:string;
/*坐骑品质*/
public f_quality:string;
/*颜色值*/
public f_color:string;
}

export class t_Mount_Refinement_AttributeQuality_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_QualityID:number;
/*品质出现概率*/
public f_Qualityrate:number;
/*洗髓丹抽取概率*/
public f_RefinementRate:number;
/*品质对应数值区间*/
public f_Qualityrange:string;
/*品质对应数值展示*/
public f_QualityShow:string;
}

export class t_Mount_Refinement_Attributerange_dat{
/*id*/
public f_id:number;
/*属性id*/
public f_AttributeID:number;
/*属性品质*/
public f_Attributequality:string;
/*属性范围*/
public f_Attributerange:string;
}

export class t_Mount_Shop_dat{
/*id*/
public f_id:number;
/*商品*/
public f_goods:string;
/*价格*/
public f_Price:string;
/*限购*/
public f_BuyLimit:number;
}

export class t_Mount_Stroge_dat{
/*id*/
public f_id:number;
/*仓库初始上限*/
public f_StorageInit:number;
/*仓储成长值*/
public f_StorageUpgradeValue:number;
/*仓储升级次数上限*/
public f_StorageMax:number;
/*仓储升级消耗*/
public f_StorageUpgradePrice:string;
/*宝箱获取上限*/
public f_boxMax:number;
/*元宝获取上限*/
public f_DiamondMax:number;
}

export class t_Mount_UpGrade_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_QualityID:number;
/*等级*/
public f_Level:number;
/*升级消耗*/
public f_LevelConsume:string;
}

export class t_Mount_UpStar_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_QualityID:number;
/*星级*/
public f_Star:number;
/*升星消耗*/
public f_StarConsume:string;
}

export class t_Mount_Value_dat{
/*id*/
public f_id:number;
/*是否为11品质及以上*/
public f_isQuality:number;
/*属性id*/
public f_attr_id:number;
/*等级权重*/
public f_levelweight:number;
/*品质权重*/
public f_quaweight:number;
/*星级权重*/
public f_starweight:number;
/*微调权重*/
public f_adjustweight:number;
}

export class t_NamingRight_dat{
/*ID*/
public f_id:number;
/*类型*/
public f_Type:number;
/*天数*/
public f_Day:number;
/*礼包名称*/
public f_RewardName:string;
/*礼包内容*/
public f_Reward:string;
/*充值金额限制*/
public f_RechargeLimit:number;
}

export class t_Newplayer_Attribute_dat{
/*id*/
public f_id:number;
/*类型*/
public f_attrtype:string;
/*属性名*/
public f_attrname:string;
/*属性*/
public f_attribute:string;
/*持续时间*/
public f_time:string;
/*图标*/
public f_icon:string;
}

export class t_Newplayer_Config_dat{
/*id*/
public f_id:number;
/*持续时间*/
public f_time:string;
}

export class t_OpenServerActivity_AdvantureReward_dat{
/*id*/
public f_id:number;
/*类型*/
public f_Type:number;
/*对应关卡id*/
public f_LevelID:number;
/*关卡数*/
public f_Level:string;
/*奖励内容*/
public f_Reward:string;
/*礼包名称*/
public f_PackName:string;
/*充值id*/
public f_PurchaseID:number;
/*限购次数*/
public f_LimitTimes:number;
}

export class t_OpenServerActivity_Charging_dat{
/*id*/
public f_id:number;
/*日期*/
public f_Date:number;
/*需要充值的金额*/
public f_ChargeCost:number;
/*奖励内容*/
public f_Reward:string;
/*奖励价值*/
public f_RewardValue:number;
/*活动类型*/
public f_packid:number;
}

export class t_OpenServerActivity_DailyPayment_dat{
/*id*/
public f_id:number;
/*档位类型*/
public f_Level:number;
/*档位值*/
public f_LevelVal:number;
/*日期*/
public f_Date:number;
/*奖励内容*/
public f_Reward:string;
/*奖励价值*/
public f_RewardValue:number;
/*活动类型*/
public f_packid:number;
}

export class t_OpenServerActivity_PaymentType_dat{
/*id*/
public f_id:number;
/*档位类型*/
public f_Level:number;
/*档位金额*/
public f_LevelCost:number;
}

export class t_OpenServerActivity_RankReward_dat{
/*id*/
public f_id:number;
/*名次*/
public f_Level:string;
/*奖励内容*/
public f_Reward:string;
}

export class t_OpenServerActivity_Recharge_dat{
/*id*/
public f_id:number;
/*档位金额*/
public f_LevelConsume:number;
/*奖励内容*/
public f_Reward:string;
/*活动类型*/
public f_packid:number;
}

export class t_Pack_Attendance_dat{
/*id*/
public f_id:number;
/*天数*/
public f_Days:number;
/*奖励类型*/
public f_RewardsType:number;
/*签到奖励*/
public f_Item:string;
}

export class t_Pack_Attendance_Chief_dat{
/*id*/
public f_id:number;
/*天数*/
public f_Days:number;
/*签到奖励*/
public f_Item:string;
}

export class t_Pack_Attendanc_new_dat{
/*id*/
public f_id:number;
/*天数*/
public f_Days:number;
/*签到奖励*/
public f_Item:string;
/*奖励类型*/
public f_RewardsType:number;
}

export class t_Pack_BoxEvent_dat{
/*id*/
public f_id:number;
/*宝箱使用数量*/
public f_BoxUse:number;
/*宝箱等级*/
public f_BoxLevel:number;
/*奖励物品*/
public f_Item:string;
}

export class t_Pack_BoxGrow_dat{
/*id*/
public f_id:number;
/*宝箱等级*/
public f_Level:number;
/*奖励类型*/
public f_rewardstype:number;
/*物品id*/
public f_itemid:string;
/*未付费领取*/
public f_NumberFree:string;
/*付费领取*/
public f_NumberNotFree:string;
}

export class t_Pack_ChaGrow_dat{
/*id*/
public f_id:number;
/*角色等级*/
public f_Level:number;
/*奖励类型*/
public f_rewardstype:number;
/*物品id*/
public f_itemid:string;
/*未付费领取*/
public f_NumberFree:string;
/*付费领取*/
public f_NumberNotFree:string;
}

export class t_Pack_Controller_dat{
/*id*/
public f_id:number;
/*f_packid*/
public f_packid:number;
/*礼包名称*/
public f_PackName:string;
/*开启时间*/
public f_time_start:string;
/*充值id*/
public f_PriceID:number;
/*礼包持续时间*/
public f_time_end:string;
/*是否关闭*/
public f_close:number;
/*参数1*/
public f_p1:string;
/*参数2*/
public f_p2:string;
/*参数3*/
public f_p3:string;
/*参数4*/
public f_p4:string;
/*参数5*/
public f_p5:string;
}

export class t_Pack_Daily_dat{
/*id*/
public f_id:number;
/*排序*/
public f_sort:number;
/*类型*/
public f_PackType:number;
/*f_name*/
public f_name:string;
/*礼包内容*/
public f_Item:string;
/*购买次数*/
public f_BuyTimes:number;
/*充值id*/
public f_PurchaseID:number;
}

export class t_Pack_Daily_Shop_dat{
/*id*/
public f_id:number;
/*周卡类型*/
public f_weekcard:number;
/*类型*/
public f_type:number;
/*分组*/
public f_group:number;
/*奖励物品*/
public f_rewards:string;
/*充值id*/
public f_purchaseid:number;
/*原价*/
public f_pricetrue:number;
}

export class t_Pack_Daily_Shop_WeekCard_dat{
/*id*/
public f_id:number;
/*分组*/
public f_group:number;
/*持续时间*/
public f_durationtime:number;
/*充值id*/
public f_purchaseid:number;
}

export class t_Pack_Eject_dat{
/*id*/
public f_id:number;
/*弹出礼包名称*/
public f_packname:string;
/*说明*/
public f_Comment:string;
/*价格档位*/
public f_price:number;
/*礼包内容*/
public f_Item:string;
/*未购买礼包CD*/
public f_CDNotBuy:number;
/*购买礼包CD*/
public f_CDBuy:number;
/*充值id*/
public f_PurchaseID:number;
/*优先级*/
public f_priority:number;
/*布icon*/
public f_covericon:string;
/*礼包icon*/
public f_packicon:string;
}

export class t_Pack_Eject_New_dat{
/*id*/
public f_id:number;
/*弹出礼包名称*/
public f_packname:string;
/*类型*/
public f_type:number;
/*档位排序*/
public f_PriceSort:number;
/*价格档位*/
public f_price:number;
/*礼包内容*/
public f_Item:string;
/*充值id*/
public f_PurchaseID:number;
/*优先级*/
public f_priority:number;
/*布icon*/
public f_covericon:string;
/*礼包icon*/
public f_packicon:string;
}

export class t_Pack_FirstPay_Equip_dat{
/*id*/
public f_id:number;
/*礼包内容*/
public f_Item:string;
/*礼包装备*/
public f_EquipmentDIY:number;
/*购买次数*/
public f_BuyTimes:number;
/*充值id*/
public f_PurchaseID:number;
/*礼包原价*/
public f_fakeprice:number;
/*装备部位id*/
public f_AssetID:string;
}

export class t_Pack_FirstPay_Skin_dat{
/*id*/
public f_id:number;
/*天数*/
public f_days:number;
/*客户端显示物品*/
public f_items_client:string;
/*服务端发放物品*/
public f_items_sever:string;
}

export class t_Pack_Gym_dat{
/*id*/
public f_id:number;
/*礼包内容*/
public f_Item:string;
/*每日领取*/
public f_Daily:string;
/*领取时限*/
public f_Limit:number;
/*充值id*/
public f_PurchaseID:number;
/*月卡属性*/
public f_CardAttr:string;
}

export class t_Pack_List_dat{
/*id*/
public f_id:number;
/*礼包名称*/
public f_PackName:string;
}

export class t_Pack_Month_AD_dat{
/*id*/
public f_id:number;
/*礼包内容*/
public f_Item:string;
/*每日领取*/
public f_Daily:string;
/*领取时限*/
public f_Limit:number;
/*充值id*/
public f_PurchaseID:number;
/*类型*/
public f_cardtype:number;
}

export class t_Pack_Month_Card_dat{
/*id*/
public f_id:number;
/*礼包内容*/
public f_Item:string;
/*每日领取*/
public f_Daily:string;
/*领取时限*/
public f_Limit:number;
/*充值id*/
public f_PurchaseID:number;
}

export class t_Pack_NewPlayer_dat{
/*id*/
public f_id:number;
/*礼包内容*/
public f_Item:string;
/*礼包装备*/
public f_EquipmentDIY:number;
/*购买次数*/
public f_BuyTimes:number;
/*充值id*/
public f_PurchaseID:number;
/*礼包原价*/
public f_fakeprice:number;
/*装备部位id*/
public f_AssetID:string;
}

export class t_Pack_NewPlayer_Mount_dat{
/*id*/
public f_id:number;
/*类型*/
public f_packtype:number;
/*礼包内容*/
public f_Item:string;
/*购买次数*/
public f_BuyTimes:number;
/*充值id*/
public f_PurchaseID:number;
/*原价*/
public f_trueprice:number;
/*随机坐骑id*/
public f_ranID:string;
}

export class t_Pack_NewPlayer_Pet_OldSer_dat{
/*id*/
public f_id:number;
/*礼包内容*/
public f_Item:string;
/*充值id*/
public f_PurchaseID:number;
/*原价*/
public f_trueprice:number;
}

export class t_Pack_NewSever_dat{
/*id*/
public f_id:number;
/*礼包名*/
public f_name:string;
/*礼包内容*/
public f_Item:string;
/*购买次数*/
public f_BuyTimes:number;
/*充值id*/
public f_PurchaseID:number;
}

export class t_Pack_Shop_Market_dat{
/*id*/
public f_id:number;
/*商品id*/
public f_GoodsID:number;
/*商品*/
public f_Goods:string;
/*商品价格*/
public f_price:string;
/*折扣情况*/
public f_Discount:number;
/*购买次数*/
public f_BuyTimes:number;
}

export class t_Pack_Shop_Market_Config_dat{
/*id*/
public f_id:number;
/*刷新价格*/
public f_RefreshPrice:string;
}

export class t_Pack_Shop_Mart_dat{
/*id*/
public f_id:number;
/*商品id*/
public f_GoodsID:number;
/*商品*/
public f_Goods:string;
/*商品价格*/
public f_price:string;
/*折扣情况*/
public f_Discount:number;
/*购买次数*/
public f_BuyTimes:number;
}

export class t_Pack_Shop_Mart_Config_dat{
/*id*/
public f_id:number;
/*刷新价格*/
public f_RefreshPrice:string;
}

export class t_Pack_Skin_dat{
/*id*/
public f_id:number;
/*天数*/
public f_days:number;
/*客户端显示物品*/
public f_items_client:string;
/*服务端发放物品*/
public f_items_sever:string;
}

export class t_Pack_Supply_dat{
/*id*/
public f_id:number;
/*礼包描述*/
public f_name:string;
/*礼包内容*/
public f_Item:string;
/*购买次数*/
public f_BuyTimes:number;
/*充值id*/
public f_PurchaseID:number;
}

export class t_Palace_Config_dat{
/*id*/
public f_id:number;
/*最大挑战上限*/
public f_ChallengeMaxTimes:number;
/*单轮挑战最大回合数*/
public f_RoundMaxTimes:number;
/*关卡刷新日期*/
public f_RefreshDay:string;
/*关卡刷新时间*/
public f_RefreshTime:string;
/*排行奖励发放时间*/
public f_RankRewardTime:string;
/*其他刷新时间*/
public f_OthersRefreshTime:string;
/*免费刷新次数*/
public f_FreeRefreshTimes:number;
/*刷新消耗元宝数*/
public f_RefreshConsume:string;
/*选择间隔*/
public f_Interval:number;
/*神魂选择次数*/
public f_ChoiceTimes:number;
/*神魂碎片获取每周上限*/
public f_SoulpieceMax:number;
/*神魂格初始与上限*/
public f_BuffMinMax:string;
/*核心神魂格初始与上限*/
public f_CoreBuffMinMax:string;
/*格子初始消耗*/
public f_LatticeInit:string;
/*核心格子初始消耗*/
public f_CoreLatticeLnit:string;
/*格子成长消耗*/
public f_LatticeInc:number;
/*功能关卡数*/
public f_FuncLevel:number;
/*副属性权重*/
public f_SeWeight:number;
/*弱点权重*/
public f_WeakWeight:number;
/*神魂选择数量*/
public f_BuffChoice:number;
/*核心神魂选择数量*/
public f_CoreChoice:number;
/*快速战斗层数*/
public f_quickfight:number;
}

export class t_Palace_DataType_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_ColorID:number;
/*神魂类型*/
public f_CoreBuffType:number;
/*属性ID*/
public f_AttributeID:number;
/*类型名称*/
public f_TypeName:string;
/*icon*/
public f_Icon:string;
}

export class t_Palace_Data_Buff_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_ColorID:number;
/*速度*/
public f_10002:string;
/*生命*/
public f_10003:string;
/*攻击*/
public f_10004:string;
/*防御*/
public f_10005:string;
/*吸血*/
public f_10006:string;
/*反击*/
public f_10007:string;
/*连击*/
public f_10008:string;
/*闪避*/
public f_10009:string;
/*暴击*/
public f_10010:string;
/*击晕*/
public f_10011:string;
/*全忽视*/
public f_10012:string;
/*掠夺*/
public f_10013:string;
}

export class t_Palace_Data_BuffProbability_dat{
/*ID*/
public f_id:number;
/*关卡数*/
public f_Level:number;
/*白*/
public f_1:number;
/*绿*/
public f_2:number;
/*蓝*/
public f_3:number;
/*紫*/
public f_4:number;
/*金*/
public f_5:number;
/*橙*/
public f_6:number;
/*粉*/
public f_7:number;
/*红*/
public f_8:number;
}

export class t_Palace_Data_CoreBuff_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_ColorID:number;
/*神魂类型*/
public f_CoreBuffType:number;
/*神魂名称*/
public f_CorebuffName:string;
/*神魂技能id*/
public f_CorebuffSkill:number;
/*神魂描述*/
public f_Corebuffdes:string;
/*icon*/
public f_Icon:string;
/*标注*/
public f_demension:string;
/*标注颜色*/
public f_demensionColor:number;
}

export class t_Palace_Data_CoreBuff_v1_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_ColorID:number;
/*神魂类型*/
public f_CoreBuffType:number;
/*神魂名称*/
public f_CorebuffName:string;
/*神魂技能id*/
public f_CorebuffSkill:number;
/*神魂描述*/
public f_Corebuffdes:string;
/*icon*/
public f_Icon:string;
/*标注*/
public f_demension:string;
/*标注颜色*/
public f_demensionColor:number;
}

export class t_Palace_Enemy_dat{
/*ID*/
public f_id:number;
/*敌人id*/
public f_EnemyID:number;
/*敌人名称*/
public f_EnemyName:string;
/*技能id*/
public f_SkillID:string;
/*敌人形象*/
public f_EnemyImage:number;
/*职业代号*/
public f_TypeID:number;
}

export class t_Palace_Enemy_PrimaryParameter_dat{
/*id*/
public f_id:number;
/*属性类型*/
public f_AttributeType:number;
/*等级权重*/
public f_levelweight:number;
/*品质权重*/
public f_quaweight:number;
/*星级权重*/
public f_starweight:number;
/*装备系数*/
public f_equipweight:number;
/*肉盾职业系数*/
public f_2:number;
/*战士职业系数*/
public f_1:number;
/*刺客职业系数*/
public f_3:number;
/*辅助职业系数*/
public f_4:number;
/*兵卒职业系数*/
public f_5:number;
}

export class t_Palace_Enemy_SecondParameter_dat{
/*id*/
public f_id:number;
/*等级区间*/
public f_LevelRange:string;
/*副属性值*/
public f_SeWeight:number;
}

export class t_Palace_Enemy_Station_dat{
/*ID*/
public f_id:number;
/*关卡数*/
public f_Level:number;
/*敌人站位*/
public f_EnemyStation:number;
/*敌人id区间*/
public f_EnemyIDInterval:string;
/*敌人是否可以重复*/
public f_EnemyRandom:number;
}

export class t_Palace_Enemy_TypeID_dat{
/*ID*/
public f_id:number;
/*职业类型*/
public f_Type:string;
/*职业代号*/
public f_TypeID:number;
}

export class t_Palace_LevelSetting_dat{
/*ID*/
public f_id:number;
/*关卡数*/
public f_Level:number;
/*对应等级*/
public f_Lv:number;
/*对应星级*/
public f_Star:number;
/*对应品质*/
public f_Quality:number;
/*优势词条数*/
public f_Advantage:number;
/*弱点词条数*/
public f_Disadvantage:number;
/*首通奖励*/
public f_FirstpassReward:string;
/*普通奖励*/
public f_NormalReward:string;
/*灵宠id区间*/
public f_PetIDRange:string;
/*灵宠等级*/
public f_PetLevel:number;
/*灵宠星级*/
public f_PetStar:number;
}

export class t_Palace_LevelSetting_v1_dat{
/*ID*/
public f_id:number;
/*关卡数*/
public f_Level:number;
/*对应等级*/
public f_Lv:number;
/*对应星级*/
public f_Star:number;
/*对应品质*/
public f_Quality:number;
/*优势词条数*/
public f_Advantage:number;
/*弱点词条数*/
public f_Disadvantage:number;
/*敌人区间*/
public f_EnemyRange:string;
/*首通奖励*/
public f_FirstpassReward:string;
/*普通奖励*/
public f_NormalReward:string;
/*灵宠id区间*/
public f_PetIDRange:string;
/*灵宠等级*/
public f_PetLevel:number;
/*灵宠星级*/
public f_PetStar:number;
}

export class t_Palace_Rank_Reward_dat{
/*id*/
public f_id:number;
/*排行名次*/
public f_Rank:string;
/*对应物品*/
public f_Item:string;
}

export class t_Palace_Shop_dat{
/*id*/
public f_id:number;
/*商店类型*/
public f_ShopType:number;
/*对应物品*/
public f_Item:string;
/*购买消耗*/
public f_Purchase:string;
/*购买上限*/
public f_PurchaseMax:number;
}

export class t_Palace_Shop_v1_dat{
/*id*/
public f_id:number;
/*商店类型*/
public f_ShopType:number;
/*对应物品*/
public f_Item:string;
/*购买消耗*/
public f_Purchase:string;
/*购买上限*/
public f_PurchaseMax:number;
}

export class t_Pet_Config_dat{
/*id*/
public f_id:number;
/*唤灵笛价格*/
public f_fluteprice:string;
/*单抽价格*/
public f_singleprice:string;
/*多抽价格*/
public f_tripleprice:string;
/*保底次数*/
public f_protect:number;
/*每日免费次数*/
public f_freetime:number;
/*保底品质*/
public f_protectquality:number;
/*唤灵笛道具id*/
public f_fluteid:number;
/*宠物背包上限*/
public f_bagmax:number;
/*单抽元宝价格*/
public f_singlepricegold:string;
/*多抽元宝价格*/
public f_triplepricegold:string;
/*灵宠盛宴折扣*/
public f_Discount:string;
/*10连抽抽价格*/
public f_Tenprice:string;
/*10连抽元宝价格*/
public f_Tenpricegold:string;
/*10连抽元宝价格折扣*/
public f_TenpricegoldDiscount:string;
}

export class t_Pet_Fusion_Protection_dat{
/*id*/
public f_id:number;
/*兑换物品*/
public f_exchangeitem:string;
/*价格*/
public f_price:string;
}

export class t_Pet_Fusion_Rate_dat{
/*id*/
public f_id:number;
/*融合等级*/
public f_fusionlevel:number;
/*融合概率*/
public f_fusionrate:number;
/*融合概率_客户端*/
public f_fusionrate_Client:number;
/*保底次数*/
public f_safebelttimes:number;
}

export class t_Pet_Fusion_Rewards_dat{
/*id*/
public f_id:number;
/*融合等级*/
public f_fusionlevel:number;
/*成功获得道具*/
public f_successget:string;
/*失败获得道具*/
public f_failget:string;
}

export class t_Pet_List_dat{
/*id*/
public f_id:number;
/*宠物id*/
public f_petid:number;
/*特殊类型*/
public f_specialtype:number;
/*宠物名称*/
public f_petname:string;
/*属性id*/
public f_pettype:number;
/*稀有度*/
public f_petquality:number;
/*血脉槽位数量*/
public f_talentslot:number;
/*技能id*/
public f_petskillid:number;
/*融合需求属性*/
public f_typerequire:string;
/*宠物icon*/
public f_peticon:string;
/*宠物动画id*/
public f_petanimid:number;
/*融合配方概率*/
public f_fusionrate_special:number;
/*攻击偏移位置*/
public f_attackpos:string;
}

export class t_Pet_PVE_dat{
/*id*/
public f_id:number;
/*灵兽id*/
public f_PetID:number;
/*灵兽等级*/
public f_PetLevel:number;
/*灵兽星级*/
public f_PetStar:number;
}

export class t_Pet_Quality_dat{
/*id*/
public f_id:number;
/*稀有度*/
public f_quality:number;
/*稀有度命名*/
public f_qualityname:string;
/*是否可以跳过动画*/
public f_isSkipAnim:number;
/*是否进入卡池*/
public f_inQueue:number;
/*初始属性值*/
public f_initivalue:string;
/*每级属性提升*/
public f_upgradevalue:string;
/*最高等级*/
public f_maxlevel:number;
/*最高星级*/
public f_maxstar:number;
/*星级提升值*/
public f_upstarvalue:string;
/*概率*/
public f_rate:number;
/*升级初始消耗*/
public f_initicost:string;
/*每级消耗提升*/
public f_preupgrade:string;
/*血脉觉醒消耗*/
public f_bloodgetcost:string;
/*血脉提升消耗*/
public f_bloodupcost:string;
/*血脉提升每级提升*/
public f_bloodpreupcost:string;
/*升星消耗*/
public f_upstarcost:string;
/*充值返还的道具id*/
public f_returnRewards:number;
/*萃取奖励*/
public f_ExtractRewasrds:string;
/*血脉锁定消耗*/
public f_bloodlockcost:string;
}

export class t_Pet_Skill_Client_dat{
/*id*/
public f_id:number;
/*技能id*/
public f_petskillid:number;
/*技能名称*/
public f_skillname:string;
/*技能初始值*/
public f_initvalue:string;
/*技能1数值量*/
public f_valuenum:string;
/*技能描述*/
public f_skillintro:string;
}

export class t_Pet_Talent_List_dat{
/*id*/
public f_id:number;
/*天赋id*/
public f_talentid:number;
/*稀有度*/
public f_quality:number;
/*属性*/
public f_attr:string;
/*最高等级*/
public f_maxlevel:number;
}

export class t_Pet_Talent_Rate_dat{
/*id*/
public f_id:number;
/*血脉概率*/
public f_bloodrate:number;
}

export class t_Pet_UpGrade_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_QualityID:number;
/*等级*/
public f_Level:number;
/*升级消耗*/
public f_LevelConsume:string;
}

export class t_Pet_UpStar_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_QualityID:number;
/*星级*/
public f_Star:number;
/*升星消耗*/
public f_StarConsume:string;
/*同源升星消耗*/
public f_StarConsume2:string;
}

export class t_Platform_dat{
/*id*/
public f_id:number;
/*平台类型*/
public f_platform:number;
/*客户端类型*/
public f_clienttype:number;
/*关闭掉的funcid*/
public f_close_arr:string;
/*备注*/
public f_name:string;
/*关闭掉广告功能*/
public f_ad_close:number;
/*一键升级*/
public f_one_lv:number;
/*大于此ID开启自动战斗*/
public f_AutoFight:number;
/*宝箱耗尽弹出每日礼包*/
public f_exhaust:number;
/*耗尽弹出位置*/
public f_exhaustPosition:number;
/*桌面场景值*/
public f_desk_scene:string;
/*强弹礼包是否为新*/
public f_packisNew:number;
/*是否有免除广告功能*/
public f_skipAD:number;
/*盛宴累充UI*/
public f_feastUI:number;
/*iOS渠道是否可充值*/
public f_IOSRecharge:number;
/*强弹类型*/
public f_popType:number;
/*是否显示原价格*/
public f_Disprice:number;
}

export class t_Power_level_dat{
/*id*/
public f_id:number;
/*属性名*/
public f_name:string;
/*属性权重*/
public f_val:string;
}

export class t_Power_level_sub_dat{
/*id*/
public f_id:number;
/*范围*/
public f_range:number;
/*参数*/
public f_val:number;
}

export class t_Purchase_ComboPack_dat{
/*id*/
public f_id:number;
/*套餐充值id*/
public f_ComboPurchaseID:string;
/*解锁玩家等级*/
public f_Level:number;
/*文本显示*/
public f_Client:string;
/*充值id*/
public f_PurchaseID:number;
/*赠礼*/
public f_TimeReward:string;
}

export class t_Purchase_EasyPay_dat{
/*id*/
public f_id:number;
/*活动packid*/
public f_PackControllerid:number;
/*类型*/
public f_type:number;
/*原价*/
public f_NormalPrice:number;
/*充值id*/
public f_Purchase:number;
/*是否关闭*/
public f_Close:number;
}

export class t_Purchase_Price_dat{
/*id*/
public f_id:number;
/*功能备注*/
public f_read:string;
/*价格档位*/
public f_price:number;
/*首次充值翻倍*/
public f_double:number;
/*对应的pack_controller的f_id和子id*/
public param1:string;
/*是否为代金券*/
public f_isVoucher:number;
}

export class t_RecurringActivity_dat{
/*ID*/
public f_id:number;
/*循环活动类型*/
public f_Type:number;
/*活动ID*/
public f_packControllerID:number;
/*开启时间*/
public f_time_start:string;
/*参数1*/
public f_p1:string;
/*参数2*/
public f_p2:string;
/*参数3*/
public f_p3:string;
}

export class t_RecurringActivity_Boss_dat{
/*ID*/
public f_id:number;
/*奖励类型*/
public f_RewardType:number;
/*奖励*/
public f_Reward:string;
/*概率*/
public f_Probability:string;
}

export class t_RecurringActivity_DrawEvent_Config_dat{
/*id*/
public f_id:number;
/*抽取消耗*/
public f_DrawCost:string;
/*抽取必定掉落*/
public f_ConstantItem:string;
/*10连抽取消耗*/
public f_TenPrice:string;
}

export class t_RecurringActivity_DrawEvent_Pack_dat{
/*id*/
public f_id:number;
/*礼包类型*/
public f_PackType:number;
/*礼包名称*/
public f_PackName:string;
/*礼包奖励*/
public f_PackRewards:string;
/*限购次数*/
public f_PackBuyLimit:number;
/*礼包充值id*/
public f_PackPurchase:number;
}

export class t_RecurringActivity_DrawEvent_RewardRate_dat{
/*id*/
public f_id:number;
/*道具奖励*/
public f_ItemReward:string;
/*概率*/
public f_RewardRate:number;
/*道具掉落弹出文本*/
public f_RewardTxt:string;
}

export class t_RecurringActivity_DrawEvent_Shop_dat{
/*ID*/
public f_id:number;
/*道具奖励*/
public f_ItemReward:string;
/*价格*/
public f_Price:string;
/*限购次数*/
public f_LimitedTimes:number;
}

export class t_RecurringActivity_DrawEvent_Task_dat{
/*id*/
public f_id:number;
/*任务类型id*/
public f_Tasktype:number;
/*任务描述*/
public f_Taskintro:string;
/*任务内容*/
public f_TaskContent:number;
/*任务奖励*/
public f_TaskRewards:string;
/*界面跳转*/
public f_viewjump:number;
}

export class t_RecurringActivity_OptionalPack_dat{
/*ID*/
public f_id:number;
/*礼包类型*/
public f_PackType:string;
/*礼包名称*/
public f_PackName:string;
/*固定道具*/
public f_ConstantReward:string;
/*可选道具1*/
public f_OptionalReward1:string;
/*可选道具2*/
public f_OptionalReward2:string;
/*每日限购*/
public f_LimitedPurchase:number;
/*礼包充值id*/
public f_PackPurchase:number;
}

export class t_RedemptionCode_Normal_dat{
/*id*/
public f_id:number;
/*兑换码*/
public f_RedemptionCode:string;
/*奖励内容*/
public f_Reward:string;
/*兑换人数上限*/
public f_Max:number;
/*单人可兑换次数*/
public f_Limited:number;
/*失效时间*/
public f_expiredtime:string;
}

export class t_Sell_Exp_dat{
/*id*/
public f_id:number;
/*装备品质*/
public f_Quality:number;
/*出售获得经验值*/
public f_Exp:number;
}

export class t_Sell_Money_dat{
/*id*/
public f_id:number;
/*等级*/
public f_level:number;
/*灰色装备价格*/
public f_Qua_1:number;
/*绿色装备价格*/
public f_Qua_2:number;
/*蓝色装备价格*/
public f_Qua_3:number;
/*紫色装备价格*/
public f_Qua_4:number;
/*金色装备价格*/
public f_Qua_5:number;
/*橙色装备价格*/
public f_Qua_6:number;
/*粉色装备价格*/
public f_Qua_7:number;
/*红色装备价格*/
public f_Qua_8:number;
/*天蓝色装备价格*/
public f_Qua_9:number;
/*浅绿色装备价格*/
public f_Qua_10:number;
/*浅蓝色装备价格*/
public f_Qua_11:number;
/*浅紫色装备价格*/
public f_Qua_12:number;
/*浅金色装备价格*/
public f_Qua_13:number;
}

export class t_Setting_Mail_dat{
/*id*/
public f_id:number;
/*邮件标题*/
public f_MailTitle:string;
/*邮件内容*/
public f_Mail:string;
/*奖励*/
public f_Rewards:string;
/*奖励目标*/
public f_RewardsTarget:string;
}

export class t_Setting_Notice_dat{
/*id*/
public f_id:number;
/*公告标题*/
public f_NoticeTitle:string;
/*公告内容*/
public f_Notice:string;
/*公告目标*/
public f_Target:string;
}

export class t_Setting_Subscribe_dat{
/*id*/
public f_id:number;
/*订阅类型*/
public f_subsType:number;
/*内容*/
public f_attribute:string;
/*类型*/
public f_type:number;
/*模板ID*/
public f_modelID:string;
/*文字*/
public f_reminder:string;
/*界面类型*/
public f_viewType:number;
}

export class t_Sevendays_Pack_dat{
/*id*/
public f_id:number;
/*排序*/
public f_sort:number;
/*礼包名称*/
public f_packname:string;
/*礼包内容*/
public f_packcontent:string;
/*充值id*/
public f_purchaseid:number;
/*每日购买次数*/
public f_buytimes:number;
}

export class t_SevenDays_StageRewards_dat{
/*id*/
public f_id:number;
/*阶段积分*/
public f_stagepoint:number;
/*奖励物品*/
public f_rewards:string;
}

export class t_SevenDays_Task_dat{
/*id*/
public f_id:number;
/*排序*/
public f_sort:number;
/*天数*/
public f_days:number;
/*任务id*/
public f_taskid:number;
/*任务内容*/
public f_taskcontent:number;
/*奖励内容*/
public f_rewards:string;
/*积分*/
public f_Points:number;
/*解锁时判断*/
public f_Condition:number;
}

export class t_Shop_dat{
/*id*/
public f_id:number;
/*页码编号*/
public f_Page:string;
/*页面名称*/
public f_PageName:string;
/*商品编号*/
public f_ItemID:string;
/*售价类型*/
public f_PriceType:string;
/*售价*/
public f_Price:string;
/*充值id*/
public f_PurchaseID:number;
/*商品排序*/
public f_sort:number;
/*是否是免费*/
public f_isfree:number;
}

export class t_SkillTree_Config_dat{
/*id*/
public f_id:number;
/*碎片转化比例*/
public f_Transform:number;
/*抽取消耗道具*/
public f_Consume:string;
/*初始阴阳鱼数量*/
public f_OriginalItem:string;
/*升级获得*/
public f_LevelUP:string;
/*等级限制*/
public f_LevelLimit:number;
/*解锁等级*/
public f_UnlockLevel:number;
}

export class t_SkillTree_Graph_dat{
/*id*/
public f_id:number;
/*阵图名称*/
public f_GraphName:string;
/*价格*/
public f_GraphConsume:string;
}

export class t_SkillTree_LatticeAttribute_dat{
/*id*/
public f_id:number;
/*格子类型id*/
public f_LatticeID:number;
/*格子名称*/
public f_LatticeName:string;
/*属性*/
public f_Attribute:string;
/*加成对象*/
public f_BuffObject:number;
}

export class t_SkillTree_LatticeType_dat{
/*id*/
public f_id:number;
/*格子id*/
public f_LatticeID:number;
/*格子名称*/
public f_LatticeName:string;
/*激活消耗*/
public f_ActivationConsume:string;
}

export class t_SkillTree_ObjectType_dat{
/*id*/
public f_id:number;
/*对象类型id*/
public f_ObjectType:number;
/*对象名称*/
public f_ObjectName:string;
}

export class t_SkillTree_Spell_dat{
/*id*/
public f_id:number;
/*符箓id*/
public f_SpellID:number;
/*符箓品质*/
public f_SpellQuality:number;
/*符箓名称*/
public f_SpellName:string;
/*符箓说明*/
public f_SpellIns:string;
/*激活条件*/
public f_Condition:string;
}

export class t_SkillTree_SpellProbability_dat{
/*id*/
public f_id:number;
/*符箓品质*/
public f_SpellQuality:number;
/*抽取概率*/
public f_SpellProbability:number;
}

export class t_SkillTree_SpellUpgrade_dat{
/*id*/
public f_id:number;
/*等级*/
public f_Level:number;
/*升级消耗对应的数量*/
public f_Consume:number;
}

export class t_Skill_EffectT_dat{
/*id*/
public f_id:number;
/*技能id*/
public f_SkillID:number;
/*技能名字文本*/
public f_SkillName:string;
/*技能类型*/
public f_SkillType:number;
/*普攻*/
public f_Atk:number;
/*暴击*/
public f_CriticalHit:number;
/*受到普攻*/
public f_SufferAtk:number;
/*受到暴击*/
public f_SufferCriticalHit:number;
/*增益*/
public f_Buff:number;
/*减益*/
public f_Debuff:number;
/*特殊效果*/
public f_ExEffect:number;
/*对象1*/
public f_Target1:number;
/*对象2*/
public f_Target2:number;
/*对象3*/
public f_Target3:number;
/*对象4*/
public f_Target4:number;
/*对象5*/
public f_Target5:number;
/*对象6*/
public f_Target6:number;
/*对象7*/
public f_Target7:number;
/*对象8*/
public f_Target8:number;
/*对象9*/
public f_Target9:number;
/*对象10*/
public f_Target10:number;
/*对象11*/
public f_Target11:number;
/*对象12*/
public f_Target12:number;
/*本回合受击触发*/
public ack:number;
/*触发者需要播放的特效*/
public actplay:number;
}

export class t_Skill_List_dat{
/*id*/
public f_id:number;
/*技能id*/
public f_skillid:number;
/*技能内容*/
public f_skillcontent:string;
}

export class t_Smash_dat{
/*id*/
public f_id:number;
/*单场胜利奖励*/
public f_SingleWinReward:string;
/*输一场奖励*/
public f_SingleFailReward:string;
/*连胜奖励*/
public f_StreakReward:string;
/*终结连胜奖励*/
public f_EndStreakReward:string;
/*单场活动时长（秒）*/
public f_ActivityDuration:number;
/*一轮时间（秒）*/
public f_RoundDuration:number;
/*报名开始时间*/
public f_EnrollStartTime:string;
/*停止报名时间*/
public f_EnrollEndTime:string;
/*活动开始时间*/
public f_ActivityStartTime:string;
/*终结连胜广播的连胜次数*/
public f_EndStreakBroadcast:number;
/*产生buff的初始场次*/
public f_BuffInitRoundTimes:number;
/*产生buff的连胜场次*/
public f_BuffRoundTimes:number;
/*buff降低基础属性的比例（百分位）*/
public f_DebuffRate:number;
/*在线额外增加比例（百分位）*/
public f_OnlineRewardRate:number;
/*奖励过期时间（天）*/
public f_RewardExpireTime:number;
/*匹配连胜差异场次*/
public f_MatchNum:number;
/*跨服大乱斗开启时间*/
public f_opendays:number;
}

export class t_Smash_Script_dat{
/*id*/
public f_id:number;
/*服务端类型*/
public f_SeverType:string;
/*每级成长值*/
public f_content:string;
}

export class t_Spirit_Attribute_Bond_dat{
/*id*/
public f_id:number;
/*战魂id*/
public f_SpiritID:number;
/*战魂名称*/
public f_SpiritName:string;
/*套装属性2件*/
public f_TwoPiece:string;
/*套装属性4件*/
public f_FourPiece:string;
}

export class t_Spirit_Attribute_Fixed_dat{
/*id*/
public f_id:number;
/*套装id*/
public f_SetID:number;
/*战魂id*/
public f_SpiritID:number;
/*对应levleid*/
public f_levelid:string;
/*战魂名称*/
public f_SpiritName:string;
/*战魂稀有度*/
public f_SpiritQuality:number;
/*掉落概率*/
public f_GetRate:number;
/*战魂属性*/
public f_QualityName:string;
/*词条数量*/
public f_PerksNumber:string;
/*战魂iconid*/
public f_SpiritIconID:number;
}

export class t_Spirit_Attribute_Random_dat{
/*id*/
public f_id:number;
/*属性id*/
public f_SpiritID:number;
/*可否随机*/
public f_RandomEnable:number;
/*权重*/
public f_Weight:number;
/*蓝色战魂初始*/
public f_Quality1Init:string;
/*蓝色战魂成长值*/
public f_Quality1Grow:string;
/*紫色战魂初始*/
public f_Quality2Init:string;
/*紫色战魂成长值*/
public f_Quality2Grow:string;
/*金色战魂初始*/
public f_Quality3Init:string;
/*金色战魂成长值*/
public f_Quality3Grow:string;
}

export class t_Spirit_Config_dat{
/*id*/
public f_id:number;
/*每日免费次数*/
public f_EnergyMax:number;
/*购买次数上限*/
public f_BuyTimes:number;
/*购买次数价格*/
public f_BuyTimesCost:string;
/*购买次数价格成长*/
public f_BuyTimesCostGrow:string;
/*多少级获得一个随机属性*/
public f_LevelGet:number;
/*仓库上限*/
public f_StorageMax:number;
/*战魂升级系数*/
public f_SpiritUpgradeLost:number;
/*默认方向个数*/
public f_DefaultQuantity:number;
}

export class t_Spirit_ExpCost_dat{
/*id*/
public f_id:number;
/*战魂id*/
public f_SpiritID:number;
/*战魂品质id*/
public f_QualityID:number;
/*战魂名*/
public f_SpiritName:string;
/*战魂等级上限*/
public f_SpiritMaxLevel:number;
/*战魂吞噬经验*/
public f_SpiritExp:number;
}

export class t_Spirit_ExpUpgrade_dat{
/*id*/
public f_id:number;
/*等级*/
public f_SpiritID:number;
/*蓝色战魂经验上限*/
public f_Quality1:number;
/*紫色战魂经验上限*/
public f_Quality2:number;
/*金色战魂经验上限*/
public f_Quality3:number;
}

export class t_Spirit_Position_dat{
/*id*/
public f_id:number;
/*位置id*/
public f_Position:number;
/*位置名称*/
public f_PositionName:string;
}

export class t_Spirit_Quality_dat{
/*id*/
public f_id:number;
/*品质id*/
public f_QualityID:number;
/*品质颜色*/
public f_Quality:string;
/*品质名*/
public f_QualityName:string;
/*初始随机词条数量*/
public f_InitiRandomAttr:number;
/*随机词条获取上限*/
public f_RandomAttrMax:number;
/*Iconid*/
public f_IconAdress:string;
/*战魂颜色*/
public f_SpiritColor:string;
/*desc*/
public f_desc:string;
}

export class t_Star_Config_dat{
/*id*/
public f_id:number;
/*每次抢夺的星星数量*/
public f_Prerob:number;
/*每次抢夺获得的锦囊*/
public f_VictoryRewards:string;
/*钥匙恢复时间*/
public f_keyrechargetime:number;
/*钥匙上限*/
public f_keymax:number;
/*每次转动消耗*/
public f_playcost:string;
/*每次挑战消耗的包子*/
public f_precost:string;
/*星星结算转换*/
public f_starexchange:number;
/*每次刷新对手消耗*/
public f_refreshcost:string;
/*匹配玩家搜索数量*/
public f_searchpalyer:number;
/*挑战关闭时间*/
public f_closetime:string;
/*挑战开启时间*/
public f_opentime:string;
/*多少天未登陆的玩家踢出池子*/
public f_logoutdays:number;
/*锦囊持有上限*/
public f_tipsLimits:number;
/*星星初始化数量*/
public f_starinit:number;
/*向上搜索区间*/
public f_upsearch:number;
/*向下搜索区间*/
public f_downsearch:number;
}

export class t_Star_pack_dat{
/*id*/
public f_id:number;
/*f_name*/
public f_name:string;
/*礼包内容*/
public f_Item:string;
/*购买次数*/
public f_BuyTimes:number;
/*充值id*/
public f_PurchaseID:number;
}

export class t_Star_PocketTips_dat{
/*id*/
public f_id:number;
/*锦囊类型*/
public f_TipsType:number;
/*锦囊名*/
public f_TipsName:string;
/*锦囊tips*/
public f_TipsTips:string;
/*参数类型*/
public f_ParaType:number;
/*锦囊参数*/
public f_TipsPara:string;
/*价格*/
public f_TipsPrice:string;
/*锦囊图标*/
public f_Tipsicon:string;
}

export class t_Star_RankReward_dat{
/*id*/
public f_id:number;
/*名次id*/
public f_DailyRewardID:number;
/*名次*/
public f_Ranking:string;
/*奖励id*/
public f_DailyReward:string;
}

export class t_Star_Shop_dat{
/*id*/
public f_id:number;
/*商品id*/
public f_goodsid:number;
/*商品*/
public f_shopitem:string;
/*星星商店价格*/
public f_itemprice:string;
/*限购次数*/
public f_BuyLimit:number;
}

export class t_Star_Wheel_dat{
/*id*/
public f_id:number;
/*奖励类型*/
public f_rewardstype:number;
/*每次抢夺的星星数量*/
public f_Prerob:string;
/*轮盘概率*/
public f_wheelRate:number;
}

export class t_Station_Config_dat{
/*id*/
public f_id:number;
/*通行证itemId*/
public f_PassportItemId:number;
/*通行证上限*/
public f_PassportInit:number;
/*购买所需要花费的元宝*/
public f_buycost:number;
/*每次购买获得的通行证*/
public f_getpassport:number;
/*每日购买的通行证上限*/
public f_maxtimes:number;
/*扩容花费*/
public f_ExtendCost:string;
/*通行证上限增加*/
public f_PassportIncrease:number;
/*通行证扩容上限*/
public f_PassportMax:number;
/*通行证恢复时间*/
public f_PassportRestoreTime:number;
/*刷新任务冷却时间*/
public f_RefreshCD:number;
/*刷新附近商队冷却时间*/
public f_RefreshPlayerCD:number;
/*每日掠夺次数上限*/
public f_LootMax:number;
/*每日破坏获得通行证上限*/
public f_DestoryMax:number;
/*初始马车个数*/
public f_CarriageInitnNumber:number;
/*最大马车个数*/
public f_CarriageMax:number;
/*马车默认完整度*/
public f_CarriageInitiCompleteness:number;
/*最大可被掠夺次数*/
public f_LootTimesMax:number;
/*掠夺减少资源*/
public f_loot:number;
/*标记名单上限*/
public f_MarkListMax:number;
/*掠夺次数回复时间*/
public f_lootRechargetime:number;
}

export class t_Station_Cost_dat{
/*id*/
public f_id:number;
/*刷新花费*/
public f_RefreshCost:string;
}

export class t_Station_Mission_List_dat{
/*id*/
public f_id:number;
/*任务id*/
public f_MissionID:number;
/*任务名称*/
public f_MissionName:string;
/*任务类型*/
public f_MissionType:number;
/*任务稀有度*/
public f_MissionQuality:number;
/*任务消耗通行证*/
public f_PassportCost:string;
/*任务时间*/
public f_MissionTime:number;
/*任务结束获得资源*/
public f_MissionRewards:string;
/*任务破坏增加时间*/
public f_DestoryTime:number;
/*任务破坏获得通行证*/
public f_DestoryRewards:string;
/*任务掠夺获得资源*/
public f_LootRewards:string;
/*运输中*/
public f_progress:string;
/*维修中*/
public f_loading:string;
/*完整度*/
public f_finish:string;
/*主题图片*/
public f_typepic:string;
}

export class t_Station_Mission_Quality_dat{
/*id*/
public f_id:number;
/*任务稀有度id*/
public f_MissionQualityID:number;
/*任务稀有度*/
public f_MissionQuality:string;
/*稀有度概率*/
public f_MissionQualityRate:number;
}

export class t_Station_Mission_Rate_dat{
/*id*/
public f_id:number;
/*概率类型*/
public f_RateType:number;
/*任务类型*/
public f_MissionType:number;
/*任务概率*/
public f_PassportInit:number;
}

export class t_Station_Robot_dat{
/*id*/
public f_id:number;
/*机器人总量*/
public f_TotalRobot:number;
/*每日机器人操作数量*/
public f_DailyRobotAvailable:number;
}

export class t_Station_SlotOpen_dat{
/*id*/
public f_id:number;
/*条件判断*/
public f_Enable:number;
/*商队开放*/
public f_SlotOpen:string;
}

export class t_Subtitle_Config_dat{
/*id*/
public f_id:number;
/*跑马灯间隔*/
public f_subtitlegap:number;
/*跑马灯最大排队上限*/
public f_subtitlequeue:number;
}

export class t_Subtitle_Content_dat{
/*id*/
public f_id:number;
/*跑马灯id*/
public f_subtitleid:number;
/*原因*/
public f_reason:string;
/*参数*/
public f_para:string;
/*字幕*/
public f_subtitle:string;
}

export class t_System_Community_dat{
/*id*/
public f_id:number;
/*是否每日重置*/
public f_isrefresh:number;
/*任务描述*/
public f_taskintro:string;
/*任务参数*/
public f_taskvalue:number;
/*任务奖励*/
public f_taskrewards:string;
}

export class t_System_RefreshTime_dat{
/*id*/
public f_id:number;
/*系统配置*/
public f_SystemConfig:string;
/*系统配置_v1*/
public f_SystemConfig_v1:string;
}

export class t_System_ServerGroup_dat{
/*id*/
public f_id:number;
/*跨服分组*/
public f_sergroup:string;
}

export class t_System_Special_dat{
/*id*/
public f_id:number;
/*任务id*/
public f_TaskID:number;
/*装备品质*/
public f_EquipmentQuality:number;
/*需求数量*/
public f_DemandQuantity:number;
/*装备等级*/
public f_EquipmentLevel:number;
/*装备属性*/
public f_EquipmentAttr:string;
/*额外param*/
public f_Para:number;
}

export class t_System_TA_dat{
/*id*/
public f_id:number;
/*模块id*/
public f_ModuleID:number;
/*开关*/
public f_switch:number;
}

export class t_System_WarningValue_dat{
/*id*/
public f_id:number;
/*属性id*/
public f_attrid:number;
/*属性名*/
public f_name:string;
/*阈值*/
public f_Maxvalue:number;
}

export class t_Tasks_dat{
/*id*/
public f_id:number;
/*任务id*/
public f_TaskID:number;
/*前置任务*/
public f_ContentValue:number;
/*后置任务*/
public f_BackValue:number;
/*任务类型*/
public f_TaskType:number;
/*内容数量*/
public f_RewardsType:string;
/*奖励类型*/
public f_Rewards:string;
}

export class t_Tasks_Guide_dat{
/*id*/
public f_id:number;
/*引导ID*/
public f_GuideID:number;
/*任务id*/
public f_TaskID:number;
/*任务id_v1*/
public f_TaskID_v1:number;
/*引导位置*/
public f_GuidePosition:string;
/*提示按钮XY偏移*/
public f_XY:string;
/*手指位置*/
public f_handposition:number;
/*小界面Y轴位置*/
public f_sviewY:number;
/*是否显示小界面*/
public f_showsmallview:number;
/*是否是界面*/
public f_isview:number;
/*描述*/
public f_info:string;
/*语音*/
public f_audio:string;
}

export class t_Tasks_Type_dat{
/*id*/
public f_id:number;
/*任务id*/
public f_TaskID:string;
/*任务内容*/
public f_TaskContent:string;
/*提示按钮位置*/
public f_ClickTips:string;
/*手指位置*/
public f_handposition:number;
/*提示按钮XY偏移*/
public f_XY:string;
}

export class t_Tasks_v1_dat{
/*id*/
public f_id:number;
/*任务id*/
public f_TaskID:number;
/*前置任务*/
public f_ContentValue:number;
/*后置任务*/
public f_BackValue:number;
/*任务类型*/
public f_TaskType:number;
/*内容数量*/
public f_RewardsType:string;
/*奖励类型*/
public f_Rewards:string;
}

export class t_Task_Event_dat{
/*id*/
public f_id:number;
/*天数*/
public f_days:number;
/*任务*/
public f_tasksid:number;
/*内容数量*/
public f_RewardsType:number;
}

export class t_TeamFight_BossAttribute_dat{
/*id*/
public f_id:number;
/*boss id*/
public f_BossID:number;
/*boss名称*/
public f_BossName:string;
/*boss属性*/
public f_BossAttribute:string;
/*boss技能id*/
public f_BSkillID:string;
/*boss特点*/
public f_BossChar:string;
/*boss品质*/
public f_BossQuality:number;
/*boss骨骼*/
public f_Res:string;
}

export class t_TeamFight_BossPokedex_dat{
/*id*/
public f_id:number;
/*bossid*/
public f_BossID:number;
/*boss名称*/
public f_BossName:string;
/*boss特点*/
public f_BossChar:string;
/*boss技能id*/
public f_BossSkillID:string;
/*图鉴是否显示*/
public f_PokedexOn:number;
}

export class t_TeamFight_BossSkill_dat{
/*id*/
public f_id:number;
/*bossId*/
public f_BossId:number;
/*boss技能id*/
public f_BossSkillID:string;
/*技能名称*/
public f_SkillName:string;
/*技能描述*/
public f_SkillDes:string;
}

export class t_TeamFight_Config_dat{
/*id*/
public f_id:number;
/*购买挑战上限*/
public f_MaxPurchase:number;
/*初始购买消耗*/
public f_PurchaseInitial:string;
/*购买消耗成长*/
public f_PurchaseInc:string;
/*免费挑战上限*/
public f_FreeMax:number;
/*广告观看上限*/
public f_MaxAD:number;
/*挑战次数刷新时间*/
public f_ChallengeRefresh:string;
/*boss刷新时间*/
public f_BossRefresh:string;
/*奖励发放时间*/
public f_RewardTime:string;
/*鏖战停止时间*/
public f_TeamFightClose:string;
/*单轮挑战最大回合数*/
public f_ChallengeMaxTimes:number;
}

export class t_TeamFight_Reward_dat{
/*id*/
public f_id:number;
/*奖励类型*/
public f_RewardType:number;
/*奖励层级*/
public f_RewardLevel:number;
/*对应档位*/
public f_Stalls:string;
/*奖励*/
public f_preview:string;
}

export class t_TeamFight_Reward_v1_dat{
/*id*/
public f_id:number;
/*奖励类型*/
public f_RewardType:number;
/*奖励层级*/
public f_RewardLevel:number;
/*对应档位*/
public f_Stalls:string;
/*奖励*/
public f_preview:string;
}

export class t_TeamFight_Score_dat{
/*id*/
public f_id:number;
/*伤害档位*/
public f_Damage:number;
/*评分*/
public f_Score:string;
}

export class t_Test_dat{
/*id*/
public f_id:number;
/*值*/
public f_val:number;
/*数组*/
public f_testArr:number[];
/*u64测试描述*/
public f_u64Test:any;
}

export class t_Title_Lists_dat{
/*id*/
public f_id:number;
/*称号id*/
public f_titleid:number;
/*是否是默认称号*/
public f_isdefault:number;
/*称号名*/
public f_TitleName:string;
/*称号加成属性*/
public f_titleAttribute:string;
/*称号时效性*/
public f_titleduration:number;
/*晋升任务*/
public f_titletask:string;
/*称号获得途径*/
public f_titleDec:string;
/*称号资源*/
public f_titlePic:string;
}

export class t_Title_Task_dat{
/*id*/
public f_id:number;
/*任务id*/
public f_titletaskid:number;
/*任务奖励称号id*/
public f_titleid:number;
/*显示称号id*/
public f_titleshow:number;
/*子任务*/
public f_titlesubtask:string;
/*奖励*/
public f_taskrewards:string;
}

export class t_Title_Task_Type_dat{
/*id*/
public f_id:number;
/*任务类型id*/
public f_typeid:number;
/*称号名*/
public f_TitleName:string;
/*变量显示中文*/
public f_IsCh:number;
}

export class t_Trammels_Chief_dat{
/*id*/
public f_id:number;
/*羁绊名称*/
public f_TrammelsName:string;
/*基础加成数值*/
public f_Attribute:string;
/*每星级加成数值*/
public f_Upgrade:number;
/*武将数量*/
public f_Count:number;
/*副将ID*/
public f_ChiefID:string;
/*总星级*/
public f_Star:number;
/*羁绊品质*/
public f_TrammelsQuality:number;
}

export class t_Trammels_Stage_dat{
/*id*/
public f_id:number;
/*等级*/
public f_Level:number;
/*等级区间*/
public f_LevelRange:string;
/*属性加成*/
public f_Attribute:string;
}

export class t_Txt_Config_dat{
/*id*/
public f_id:number;
/*文本*/
public f_str:string;
}

export class t_Upsatage_Task_dat{
/*id*/
public f_id:number;
/*晋升id*/
public f_stageid:number;
/*任务类型*/
public f_tasktype:number;
/*任务文本*/
public f_taskinfo:string;
/*内容数量*/
public f_taskcontact:number;
/*奖励*/
public f_rewards:string;
}

export class t_Upstage_Rank_dat{
/*id*/
public f_id:number;
/*军衔名称*/
public f_name:string;
/*品级*/
public f_namestage:string;
/*等级上限*/
public f_maxlevel:number;
/*属性值*/
public f_attr:string;
}

export class t_ValInit_dat{
/*id*/
public f_id:number;
/*初始化值*/
public f_value:number;
}

export class t_VIP_dat{
/*ID*/
public f_id:number;
/*消耗代金券*/
public f_Consume:number;
/*vip等级*/
public f_VIPRank:number;
/*特权*/
public f_Privilege:string;
/*前端文本展示*/
public f_Txt:string;
/*是否可自由查看*/
public f_IsView:string;
/*道具奖励*/
public f_Item:string;
}

export class t_Voucher_dat{
/*ID*/
public f_id:number;
/*页面名称*/
public f_PageName:string;
/*道具数量*/
public f_ItemCount:string;
/*充值ID*/
public f_PurchaseID:number;
}

export class t_War3_Config_dat{
/*ID*/
public f_id:number;
/*魔兽平台*/
public f_War3Platform:number;
}

export class t_Wheel_Price_dat{
/*id*/
public f_id:number;
/*价格*/
public f_price:string;
/*是否可以观看广告*/
public f_isad:number;
}

export class t_Wheel_Rewards_dat{
/*id*/
public f_id:number;
/*概率*/
public f_Rate:number;
/*档位类型*/
public f_type:number;
/*奖励物品*/
public f_Rewards:string;
/*是否自选*/
public f_ischoose:number;
/*双倍资源*/
public f_Double:string;
/*是否可以观看广告*/
public f_isad:number;
}

export class t_Wing_Config_dat{
/*id*/
public f_id:number;
/*阶级*/
public f_Rank:number;
/*升级消耗道具*/
public f_ItemIDLevel:string;
/*升阶消耗道具*/
public f_ItemIDRank:string;
}

export class t_Wing_EffectValue_dat{
/*id*/
public f_id:number;
/*翅膀ID*/
public f_WingID:string;
/*忽视吸血每阶提升*/
public f_10012:number;
/*忽视反击每阶提升*/
public f_10013:number;
/*忽视连击每阶提升*/
public f_10014:number;
/*忽视闪避每阶提升*/
public f_10015:number;
/*忽视暴击每阶提升*/
public f_10016:number;
/*忽视击晕每阶提升*/
public f_10017:number;
}

export class t_Wing_Exp_dat{
/*id*/
public f_id:number;
/*0阶等级上限*/
public f_Rank0:number;
/*1阶等级上限*/
public f_Rank1:number;
/*2阶等级上限*/
public f_Rank2:number;
/*3阶等级上限*/
public f_Rank3:number;
/*4阶等级上限*/
public f_Rank4:number;
/*5阶等级上限*/
public f_Rank5:number;
/*基础属性倍率*/
public f_AttrPara1:number;
/*攻击属性倍率*/
public f_AttrPara2:number;
}

export class t_Wing_ID_dat{
/*id*/
public f_id:number;
/*翅膀*/
public f_Wing:string;
/*翅膀价格*/
public f_WingPrice:string;
}

export class t_Wing_Init_dat{
/*id*/
public f_id:number;
/*品质*/
public f_Quality:string;
/*生命*/
public f_10003:number;
/*攻击*/
public f_10004:number;
/*防御*/
public f_10005:number;
/*忽视吸血*/
public f_10012:number;
/*忽视反击*/
public f_10013:number;
/*忽视连击*/
public f_10014:number;
/*忽视闪避*/
public f_10015:number;
/*忽视暴击*/
public f_10016:number;
/*忽视击晕*/
public f_10017:number;
}

export class t_Wing_Treasure_Config_dat{
/*id*/
public f_id:number;
/*宝物境界*/
public f_TreasureRank:number;
/*概率*/
public f_Rank1:number;
/*道具1*/
public f_Item:string;
}

export class t_Wing_Treasure_Init_dat{
/*id*/
public f_id:number;
/*宝物属性*/
public f_TreasureEffect:string;
/*宝物属性初始*/
public f_TreasureInit:string;
}

export class t_Wing_Treasure_Upgrade_dat{
/*id*/
public f_id:number;
/*宝物属性*/
public f_TreasureEffect:string;
/*每级提升值*/
public f_UpgradeValue:string;
}

export class t_Wing_Upgrade_dat{
/*id*/
public f_id:number;
/*属性*/
public f_attribute:string;
/*每级成长值*/
public f_UpgradeValue:number;
}

}