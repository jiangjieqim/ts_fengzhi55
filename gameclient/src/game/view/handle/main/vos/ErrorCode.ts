export enum ErrorCode{
//     1	金币不足		
// 2	已经注册		
// 3	等级不足		
// 4	道具不足		
// 5	钻石不足		
// 6	宝箱不足		
// 7	系统内部异常		
// 8	玩家未登录		
// 9	装备流水号不正确		
// 10	装备操作类型不正确		
// 11	当前装备不可以售卖		
// 12	当前装备已经售卖过		
// 13	装备售卖失败		
// 14	装备未能正确穿上		
// 20	宝箱已到达最大等级		
// 21	战斗配置错误		
// 22	战斗计算错误		
// 23	冒险战斗奖励不可领取		
// 24	冒险章节奖励不可领取		
// 25	未知的战斗类型
// 26	未知奖励类型		

    /**装备流水号不正确*/
    EquipUid = 9,       
    /**当前装备不可以售卖*/
    Sell     = 11,
    /**当前装备已经售卖过*/ 
    Selled   = 12,

    /**演武未结束，无法邀请 */
    HeroYanWuFail=133,

    /**遗忘失败 */
    HeroForgetFail=138,

    /**传承失败 */
    HeroMoveFail=139,

    /**448封号 */
    DisableUser = 448,
}