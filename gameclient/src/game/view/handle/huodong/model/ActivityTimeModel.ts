import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ActivityModel } from "../ActivityModel";
import { ActivityVo } from "./ActivityVo";

class TimeCell {
    private time: Laya.Timer = new Laya.Timer();
    vo: ActivityVo;

    public clear() {
        this.time.clearAll(this);
    }

    public init(vo: ActivityVo) {
        this.vo = vo;
        this.start();
    }

    private start() {
        // if(E.Debug ){// && this.vo.cfg.f_packid == EActivityType.EveryDayBorn
        //     let sub = this.vo.endTime - TimeUtil.serverTime;
        //     LogSys.Log("packId" +this.vo.cfg.f_packid + " " + TimeUtil.subTime(sub));
        // }

        this.time.once(1000, this, this.onLoop);
    }

    private onLoop() {
        if (TimeUtil.serverTime < this.vo.endTime) {
            this.start();
        } else {
            ActivityModel.Ins.requestByUid(this.vo.uid);
        }
    }
}

/**活动时间管理器*/
export class ActivityTimeModel {

    private timeList: TimeCell[] = [];
    constructor() {

    }

    public refresh() {
        while (this.timeList.length) {
            let cell = this.timeList.pop();
            cell.clear();
        }
        let l = ActivityModel.Ins.dataList;
        for (let i = 0; i < l.length; i++) {
            let vo = l[i];
            if (vo.endTime) {
                let cell = new TimeCell();
                cell.init(vo);
                this.timeList.push(cell);
            }
        }
    }
}