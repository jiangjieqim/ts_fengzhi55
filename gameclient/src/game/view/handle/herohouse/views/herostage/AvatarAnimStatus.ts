export enum AvatarAnimStatus {
    /** 待机*/
    Idle = 0,

    /** 攻击*/
    Attack = 1,

    /** 暴击 */
    StrongAttack = 2,

    /* 攻击说话*/
    Attack_Talk = 3,

    /**暴击说话 */
    StrongAttack_Talk = 4,

    /**待机说话 */
    Idle_Talk = 5,

    /**待机总结说话 */
    Idle_End_Talk = 6,
}

export class HeroAnimStatusVo {

    public get statusName(){
        let arr:string[] = ["待机","攻击","暴击","攻击说话","暴击说话","待机说话","待机总结说话"];
        return arr[this.status];
    }
    talk:string;
    /**状态 */
    status:AvatarAnimStatus;
    /**动作速率 */
    animScale:number = 1.0;

    /**动作持续时间 */
    time:number;

    /**结束时间戳 */
    endTime:number;
    /**
     * 0-1000       
     */
    constructor(cell: string) {
        let a = cell.split("-");
        let id: number = parseInt(a[0]);
        let time = parseInt(a[1])/1000;
        this.time = time;
        this.status = id;
    }
}