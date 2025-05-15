import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { stRideMissionVo } from "../../../../network/protocols/BaseProto";

export class RideMssionVo {
    /*运输任务id */
    public mssionId: number;

    /**任务上挂载的马匹 */
    public rideIds: number[] = [];

    /**运输结束时间 */
    public time: number;

    public setData(vo: stRideMissionVo) {
        this.time = vo.time;
        let i = this.rideIds.indexOf(vo.rideId);
        if (i == -1) {
            this.rideIds.push(vo.rideId);
        }
    }

    public get rideToString(){
        let str = "[";
        for(let i = 0;i < this.rideIds.length;i++){
            str+=this.rideIds[i] + ",";
        }
        str+="]";
        return str;
    }

    /** 是否在运输中*/
    public get isRunning(){
        return this.time > TimeUtil.serverTime;
    }
}