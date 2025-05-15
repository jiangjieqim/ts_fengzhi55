/**
 * 动作枚举
 */
export enum EAvatarAnim
{
    /*
01_stand 静止
02_idle 呼吸
03_move 移动
04_attack 攻击
05_attack2 暴击
06_hit 受到攻击
07_hit2 受到暴击
08_dodge 闪避动作
09_stunned 被击晕
10_die 死亡

    */


//    01_stand 静止 0 
//    02_idle 呼吸 1
//    03_move 移动  2
   
//    04_attack 攻击抬手 3
//    05_attack2 攻击 4
//    06_attack3 暴击抬手 5
//    07_attack4 暴击 6
   
//    08_hit 受到攻击，无闪避，无击晕，无暴击，未死亡 7
//    09_hit2 受到暴击，无闪避，无击晕，未死亡 8 
//    10_dodge 受到攻击，触发闪避，未死亡 9 
//    11_stunned 受到攻击，触发击晕，未死亡 10
//    12_die 死亡 11

    //无效的
    Invalid = -1,
    Stop = 0,
    NormalStand = 1,
    Move =2,
    
    //抬手攻击
    Attack = 3,
    //攻击
    Attack2 = 4,

    //抬手暴击
    StrongAttack = 5,
    //暴击
    StrongAttack2 = 6,

    //受到普通攻击
    Hit = 7,
    //受到暴击
    Hit2 = 8,
    //闪避
    Dodge = 9,
    Stunned = 10,
    Die = 11,
    Stand = 12,//战斗待机
	/**只有马的呼吸*/
    None = 13,
    
    /** 不动的站立木桩 禁止中的 */
    WoodStand = 15,

    /** 将领型 */
    // Hero_General = 16,

    // /**武馆动作，巾帼型 */
    // Hero_JingGuo = 17,

    // /**武馆动作，君主型 */
    // Hero_King = 18,

    // /**武馆动作，谋士型 */
    // Hero_MoShi = 19,

    // /**武馆动作，乞丐型 */
    // Hero_QiGai = 20,

    // /**武馆动作，富商型 */
    // Hero_RichMan = 21,
    
    // /**武馆动作，隐士型 */
    // Hero_HideMan = 22,    

    /**攻击抬手类型2，刺击抬手 */
    AssassinateReady = 23,
    /**攻击类型2，刺击 （刺击抬手只会衔接刺击，不会衔接原来的攻击动作） */
    Assassinate = 24,
    
    /**只有翅膀 */
    OnlyWing =  25,
    
    /* 进入被击晕状态的动画*/
    InStunned = 26,

    /**入场动画*/
    InAnim = 27,

    /**射击蓄力 */
    ShootStart = 29,
    /**射击收手 */
    ShootRun = 30,
    HandBookStand = 31,
    HandBookShow1 = 32,
    HandBookShow2 = 33,


// 32 受击
// 33攻击动作1
// 34攻击动作2
    FightHit = 34,
    FightAttack = 35,
    FightAttack2 = 36,


    /**跳劈动画 */
    FightLastAttck = 43,

    /**格挡动画 */
    ShoveAside = 46,
}

export enum EAnimEvent{
    /**攻击事件 */
    Attack = "attack",
    /**受击事件 */
    HitAnim = "hitanim",
    /**敲鼓 */
    Drum = "drum",
}