import { E } from "../../../../../G";
import { ActivityModel } from "../../../huodong/ActivityModel";
import { TopPopTimeIcon } from "./TopPopTimeIcon";
/**资源不足弹出的顶部icon */
export class TopPopWinSmallIcon extends TopPopTimeIcon {
    private tf: Laya.Label;
    private model: ActivityModel;
    constructor() {
        super();
        this.model = ActivityModel.Ins;
        if (E.Debug) {
            let tf = new Laya.Label();
            this.skin.addChild(tf);
            tf.color = "#ffffff";
            tf.strokeColor = "#000000";
            tf.align = "center";
            tf.width = this.skin.width;
            tf.stroke = 2;
            tf.text = "弹出礼包";
            this.tf = tf;
        }
    }
    protected onDisplay() {
        super.onDisplay();
        // ActivityModel.Ins.on(ActivityEvent.PopWinUpdate, this, this.onRefreshHandler);
    }
    // protected onRefreshHandler() {
        // let vo = ActivityModel.Ins.popVo;
        // if (vo) {
        //     this.startPlayTime(vo.iconHideTime - TimeUtil.serverTime);
        //     if (this.tf) {
        //         this.tf.text = vo.uid.toString();
        //     }
        // } else {
        //     this.stopTime();
        // }
        // this.updateTime(5);
    // }

    protected onTimeComplete() {
        super.onTimeComplete();
    }
    protected onUnDisplay() {
        super.onUnDisplay();
        // ActivityModel.Ins.off(ActivityEvent.PopWinUpdate, this, this.onRefreshHandler);
    }

    protected onClickHandler() {
        this.model.openPopWin();
    }
}