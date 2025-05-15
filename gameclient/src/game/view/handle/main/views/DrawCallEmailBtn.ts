import { DrawCallButtonCtl } from "../../../../../frame/view/DrawCallButtonCtl";
import { MainEvent } from "../model/MainEvent";
import { DrawCallNode, MainModel } from "../model/MainModel";

export class DrawCallEmailBtn extends DrawCallButtonCtl {
    private model: MainModel;
    private redImg:Laya.Image;
    constructor(skin: Laya.Sprite, onClick: Laya.Handler, lb: DrawCallNode, redImg: Laya.Image) {
        super(skin, onClick, lb);
        this.redImg = redImg;
        this.model = MainModel.Ins;

        skin.on(Laya.Event.DISPLAY, this, this.onDisplay);
        skin.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
    }

    private onDisplay() {
        this.model.on(MainEvent.MailRed, this, this.onMailRed);
        this.onMailRed();
    }
    private onUnDisplay() {
        this.model.off(MainEvent.MailRed, this, this.onMailRed);
    }

    public onMailRed() {
        this.redImg.visible = this.model.bMailRed;
    }
}