import { TimeCtl } from "./TimeCtl";
/**倒计时 */
export class TimeCtlMs extends TimeCtl {
    constructor(tf?: Laya.Label) {
        super(tf);
    }
    /** 剩余毫秒 */
    public start(ms: number, update: Laya.Handler = null, end: Laya.Handler = null) {
        super.start(ms,update,end);
    }
    protected subTicket() {
        this.ticket -= 1000;
    }
}