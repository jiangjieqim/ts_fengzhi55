export enum EGymShopType{
    /** 0:信物商店*/
    TokenShop = 0,
    /**1：碎银商店 */
    GoldShop = 1
}

export enum EGymHeroType{
    /**江湖人士 */
    Field = 0,
    /**英雄 */
    Hero = 1,
}

/**
 * 演武的动作类型
 */
export enum EGymAction{
    /**演武完走人 无任何奖励*/
    Live = 0,
    /**演武完展示传承界面 */
    ShowInherit = 1,
    /**演武完展示领取奖励界面 */
    ShowReward = 2
}

export enum EGymLingQu{
    /**可以领取 */
    CanLingqu = 1,

    /**不可以领取 属于演武动作阶段 */
    NormalIsAnim= 0,
}

export enum EFacilityType{
    Null = 0,
    /**演武台 */
    Fight = 1,
    /**鼓 */
    Drum = 2,
    /** 茶台*/
    Tea = 3,
    /**燃灯 */
    Light = 4,
    /**假人*/
    Dummy = 5,
}

/**t_Gym_Mission_List_dat  */
export enum EGymTaskType{
    /**f_TaskType  招贤纳士*/
    GetHero = 12,
}

/*奖励领取状态 0未领取 1已领取*/
export enum EGymTaskStatus{
    /**  0未领取*/
    NotLingqu = 0,
    /**  1已领取*/
    YiLingQu = 1,
}

export enum EGymHeroFetterStatus{
    /**已经羁绊 */
    Finished = 1,
    /**可以激活 */
    CanActivied = 2,
    /**待收集 */
    WaitFind = 3,
}

export enum EGymRoleType{
    /**江湖人士 */
    Beggar = 7,
}