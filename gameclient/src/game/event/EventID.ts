/**事件ID定义类-
 * -这里分为两块内容，一个是纯前端事件ID，一个是网络消息本地分发事件ID。两块分开写不要混在一起！！
 * 
 */

export class EventID {

  //#region WEBSOCKET
  public static readonly WEBSOCKET_MESSAGE: string = "WEBSOCKET_MESSAGE";             //socket消息
  public static readonly WEBSOCKET_CLOSED: string = "WEBSOCKET_CLOSED";               //socket关闭
  public static readonly WEBSOCKET_ERROR: string = "WEBSOCKET_ERROR";                 //socket错误
  public static readonly WEBSOCKET_SELECTSERVER: string = "WEBSOCKET_SELECTSERVER";   //socket选择服务器

  //#endregion

  // //#region WXMini
  // public static readonly OnWXCfgLoadFinished: string = "OnWXCfgLoadFinished";         //微信配置信息加载完成
  // public static readonly WXCarryParametersChangeNtf = "WXCarryParametersChangeNtf";   //微信携带参数改变
  // //#endregion

  //#region 网络消息事件ID

  public static readonly WebClientRegistRsp = "WebClientRegistRsp";       //注册返回
  public static readonly WebClientLoginRsp = "WebClientLoginRsp";         //登录返回
  public static readonly KickNtf = "KickNtf";                             //玩家被踢下线
  public static readonly PlayerKickTheLineNtf = "PlayerKickTheLineNtf";   //玩家被踢下线
  public static readonly PlayerPurseChangeNtf = "PlayerPurseChangeNtf";   //玩家货币变化通知
  public static readonly PlayerPropChangeNtf = "PlayerPropChangeNtf";     //玩家道具变化通知
  public static readonly PlayerChangeNameRsp = "PlayerChangeNameRsp";     //玩家修改名字返回
  public static readonly PlayerOfflineRsp = "PlayerOfflineRsp";           //玩家下线返回
  public static readonly PlayerChangeHeadRsp = "PlayerChangeHeadRsp";     //玩家修改头像返回
  public static readonly PlayerGetHeadNtf = "PlayerGetHeadNtf";           //玩家获得头像通知
  public static readonly UploadHeadImageRsp = "UploadHeadImageRsp";       //上传头像返回
  public static readonly GetPlayerTagsRsp = "GetPlayerTagsRsp";           //获取玩家标签返回
  public static readonly ChangePlayerTagRsp = "ChangePlayerTagRsp";       //修改玩家标签返回
  public static readonly GetPlayerInfoRsp = "GetPlayerInfoRsp";           //获取玩家信息返回


  //#region 公告相关
  public static readonly NoticeInfoRsp = "NoticeInfoRsp";                   //公告信息返回
  public static readonly NoticeSetShowRsp = "NoticeSetShowRsp";             //公告显示设置返回
  public static readonly GetNoticeRsp = "GetNoticeRsp";                     //获取公告返回
  public static readonly ScrollNoticeNtf = "ScrollNoticeNtf";               //滚屏公告通知

  //#endregion

  //#region 邮件相关
  public static readonly MailNewsNtf = "MailNewsNtf";                       //新邮件通知
  public static readonly MailGetMailListRsp = "MailGetMailListRsp";         //获取邮件列表返回
  public static readonly MailGetMailDetailRsp = "MailGetMailDetailRsp";     //获取邮件详情返回
  public static readonly MailGetMailRewardRsp = "MailGetMailRewardRsp";     //领取邮件奖励返回

  //#endregion

  //#region 世界相关

  public static readonly EnterWorldRsp = "EnterWorldRsp";                 //进入世界返回
  public static readonly EnterWorldNtf = "EnterWorldNtf";                 //进入世界通知
  public static readonly ExitWorldRsp = "ExitWorldRsp";                   //离开世界返回
  public static readonly ExitWorldNtf = "ExitWorldNtf";                   //离开世界通知
  public static readonly GetWorldChatListRsp = "GetWorldChatListRsp";     //获取世界聊天列表返回
  public static readonly SendWorldChatRsp = "SendWorldChatRsp";           //发送世界聊天信息返回
  public static readonly SendWorldChatNtf = "SendWorldChatNtf";           //发送世界聊天信息通知
  public static readonly UpdateSyncInfoRsp = "UpdateSyncInfoRsp";         //刷新同步信息返回处理
  public static readonly UpdateSyncInfoNtf = "UpdateSyncInfoNtf";         //刷新同步信息通知处理
  public static readonly GetWorldPlayerListRsp = "GetWorldPlayerListRsp"; //获取世界玩家列表返回
  public static readonly UpdateJumpInfoRsp = "UpdateJumpInfoRsp";         //刷新跳跃信息返回处理
  public static readonly UpdateJumpInfoNtf = "UpdateJumpInfoNtf";         //刷新跳跃信息通知处理



  //#endregion

  //#region 好友相关
  public static readonly GetFocusListRsp = "GetFocusListRsp";               //获取关注列表返回
  public static readonly GetFinesListRsp = "GetFinesListRsp";               //获取粉丝列表返回
  public static readonly RandMatchFrindRsp = "RandMatchFrindRsp";           //随机匹配好友返回
  public static readonly CancelFocusRsp = "CancelFocusRsp";                 //取消关注返回
  public static readonly FocusPlayerRsp = "FocusPlayerRsp";                 //关注玩家返回

  //#endregion


  //#region 玩家相关
  public static readonly GetPlayerPartsRsp = "GetPlayerPartsRsp";
  public static readonly PlayerCreateRsp = "PlayerCreateRsp";
  
  //#endregion

  //#region 动作系统相关
  public static readonly PlayerSetActionRsp = "PlayerSetActionRsp"; //玩家设置动作返回
  public static readonly PlayerSetActionNtf = "PlayerSetActionNtf"; //玩家设置动作通知
  //#endregion

  //#region 心情系统相关
  public static readonly PlayerSetMoodRsp = "PlayerSetMoodRsp"; //玩家设置心情返回
  public static readonly PlayerSetMoodNtf = "PlayerSetMoodNtf"; //玩家设置心情通知
  //#endregion

  //#endregion

  //#region 本地事件消息ID
  // public static readonly ONDEBUGLOG = "ONDEBUGLOG";                 //输出日志

  public static readonly OnChangeLanguage = "OnChangeLanguage";                       //修改语言

  //#region 玩家标签
  public static readonly OnClickAddTagBtn = "OnClickAddTagBtn";       //点击添加标签按钮
  public static readonly OnClickRemoveTagBtn = "OnClickRemoveTagBtn"; //点击移除标签按钮

  //#endregion

  //#region 道具相关
  public static readonly RefreshRedPoint = "RefreshRedPoint";

  //#endregion

  //#region 装扮相关
  public static readonly ClickTwoPart = "ClickTwoPart";
  public static readonly ClickThreePart = "ClickThreePart";
  public static readonly ClickPartItem = "ClickPartItem";
  //#endregion

  //#region 动作相关
  public static readonly OnChoiceAction = "OnChoiceAction"; //选择动作
  
  //#endregion

  //#region 心情相关
  public static readonly OnChoiceMood = "OnChoiceMood"; //选择心情
  //#endregion

  //#region 公告相关
  public static readonly OnChoiceNotice = "OnChoiceNotice"; //选择公告
  //#endregion


  // public static readonly RoleInfoAtkChange = "RoleInfoAtkChange";                     //攻击力变化
  // public static readonly RoleInfoAtkRadiusChange = "RoleInfoAtkRadiusChange";         //攻击范围变化
  // public static readonly RoleInfoAtkSpeedChange = "RoleInfoAtkSpeedChange";           //攻击速度变化
  // public static readonly RoleInfoCurHPChange = "RoleInfoCurHPChange";                 //当前血量变化
  // public static readonly RoleInfoMaxHPChange = "RoleInfoMaxHPChange";                 //最大血量变化
  // public static readonly UpadterPause = "UpadterPause";                               //计时器暂停
  // public static readonly UpdaterUnPause = "UpdaterUnPause";                           //计时器取消暂停
  // public static readonly OnClickFocusTarget = "OnClickFocusTarget";                   //点击锁定集火目标
  // public static readonly OnLevelStateChanged = "OnLevelStateChanged";                 //关卡状态变化
  // public static readonly OnArenaStateChanged = "OnArenaStateChanged";                 //竞技场状态变化
  // public static readonly OnBossZoneStateChanged = "OnBossZoneStateChanged";           //Boss副本状态变化
  // public static readonly OnMineDragonStateChanged = "OnMineDragonStateChanged";       //矿场龙窟状态变化
  // public static readonly PrevLevel = "PrevLevel";                                     //上一关
  // public static readonly NextLevel = "NextLevel";                                     //下一关
  // public static readonly NextWave = "NextWave"                                        //下一波
  // public static readonly OnClickChallengeBtn = "OnClickChallengeBtn";                 //点击挑战
  // public static readonly OnCloseBattleSettle = "OnCloseBattleSettle";                 //关闭战斗结算页面
  // public static readonly OnRoleCreate = "OnRoleCreate";                               //有角色生成
  // public static readonly OnRoleBeforeGiveDamage = "OnRoleBeforeGiveDamage";           //有角色造成伤害前
  // public static readonly OnRoleAfterGiveDamage = "OnRoleAfterGiveDamage";             //有角色造成伤害后
  // public static readonly OnRoleBeforeTakeDamage = "OnRoleBeforeTakeDamage";           //有角色受到伤害前
  // public static readonly OnRoleAfterTakeDamage = "OnRoleAfterTakeDamage";             //有角色受到伤害后
  // public static readonly OnRoleKilledTarget = "OnRoleKilledTarget";                   //角色击杀了目标
  // public static readonly OnRoleBeforeDead = "OnRoleBeforeDead";                       //角色死亡前
  // public static readonly OnRoleAfterDead = "OnRoleAfterDead";                         //有角色死亡后
  // public static readonly OnRoleEnterTeam = "OnRoleEnterTeam";                         //有角色进入队伍
  // public static readonly OnRoleExitTeam = "OnRoleExitTeam";                           //有角色退出队伍
  // public static readonly OnRoleMoveToInitPos = "OnRoleMoveToInitPos";                 //角色移动到初始位置
  // public static readonly OnCloseBattleResult = "OnCloseBattleResult";                 //关闭竞技场战斗结果页面
  // public static readonly OnChangeDungeonBossState = "OnChangeDungeonBossState";       //改变状态
  // public static readonly OnCallFinishStartAnimEnd = "OnCallFinishStartAnimEnd";       //召唤完成开始动画结束
  // public static readonly OnRoleResume = "OnRoleResume";                               //角色恢复
  // public static readonly OnRoleReborn = "OnRoleReborn";                               //角色重生
  // public static readonly OnDungeonBossExit = "OnDungeonBossExit";                     //副本Boss退出
  // public static readonly OnDungeonBossRefuseHeros = "OnDungeonBossRefuseHeros";       //副本Boss复活勇者
  // public static readonly OnMetaOtherMoveTarget = "OnMetaOtherMoveTarget";             //元宇宙其他玩家移动目标

  // public static readonly sommonSelectHero = "sommonSelectHero"                        //召唤选择英雄
  // public static readonly sommonSelectDrop = "sommonSelectDrop"                        //召唤选择道具
  //#endregion


}