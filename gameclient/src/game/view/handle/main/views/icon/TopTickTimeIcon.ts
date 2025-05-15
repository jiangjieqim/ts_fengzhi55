import {TimeUtil} from "../../../../../../frame/util/TimeUtil";
import { ActivityModel } from "../../../huodong/ActivityModel";
import { ActivityVo } from "../../../huodong/model/ActivityVo";
import { EActivityType } from "../../../huodong/model/EActivityType";
import { EFuncDef } from "../../model/EFuncDef";
import { TopPopTimeIcon } from "./TopPopTimeIcon";

export class TopTickTimeIcon extends TopPopTimeIcon{
    private vo:ActivityVo;
    constructor() {
        super();
    }
    protected onRefreshHandler() {
        if (this.funcId == EFuncDef.ZhuHouBuji) {
            let vo = ActivityModel.Ins.getVo(EActivityType.Pack_Supply);
            this.vo = vo;
            this.startPlayTime(vo.endTime - TimeUtil.serverTime);
        }
    }

    protected onTimeComplete() {
        super.onTimeComplete();
        ActivityModel.Ins.requestByUid(this.vo.uid);
    }
}