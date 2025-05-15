import {TimeUtil} from "../../../../frame/util/TimeUtil";
import { stRideMissionVo } from "../../../network/protocols/BaseProto";
import { ZuoQiModel } from "./ZuoqiModel";

class TimeDelay{
    private _sec:number = 0;
    private time:Laya.Timer;
    private id:number;
    constructor(sec:number,id:number){
        this.id = id;
        this._sec = sec;
        let time:Laya.Timer = new Laya.Timer();
        this.time = time;
        // let sec:number = cell.time - TimeUtil.serverTime + 2;
        time.once(1000,this,this.onLoop);
    }

    private onLoop(){
        if (this._sec < 0) {
            ZuoQiModel.Ins.timeEndReq();
        }else{
            this.time.once(1000,this,this.onLoop);
        }
        this._sec--;
    }

    public stop(){
        this.time.clear(this,this.onLoop);
    }
}

class MissonRideVo{
    public missionID:number;
    public time:number;
    public rideList:number[] = [];
    addRide(rideId:number){
        this.rideList.push(rideId);
    }
}
/**坐骑时间控制器 */
export class ZuoQiTimeCtl{
    private timeList:TimeDelay[] = [];
    public start(runMissionList: stRideMissionVo[]){
        while(this.timeList.length){
            let cell = this.timeList.shift();
            cell.stop();
        }
        let mapsList = {};
        for(let i = 0;i < runMissionList.length;i++){
            let cell:stRideMissionVo = runMissionList[i];
            if(!mapsList[cell.id]){
                let _vo =  new MissonRideVo();
                _vo.missionID = cell.id;
                _vo.time = cell.time;
                mapsList[cell.id] = _vo;
            }
            (mapsList[cell.id] as MissonRideVo).addRide(cell.rideId);
        }

        let l:MissonRideVo[] = [];
        for(let id in mapsList){
            l.push(mapsList[id]);
        }

        for(let i = 0;i < l.length;i++){
            let cell:MissonRideVo = l[i];
            let sec:number = cell.time - TimeUtil.serverTime;
            if(sec>0){
                this.timeList.push(new TimeDelay(sec,cell.missionID));
            }
        }
    }
}