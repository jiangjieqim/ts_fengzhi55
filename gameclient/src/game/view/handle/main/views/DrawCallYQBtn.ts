// import { DrawCallButtonCtl } from "../../../../../frame/view/DrawCallButtonCtl";
// import { YaoQingModel } from "../../yaoqing/model/YaoQingModel";
// import { DrawCallNode, MainModel } from "../model/MainModel";

// export class DrawCallYQBtn extends DrawCallButtonCtl {
//     private redImg:Laya.Image;
//     constructor(skin: Laya.Sprite, onClick: Laya.Handler, lb: DrawCallNode, redImg: Laya.Image) {
//         super(skin, onClick, lb);
//         this.redImg = redImg;

//         skin.on(Laya.Event.DISPLAY, this, this.onDisplay);
//         skin.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
//     }

//     private onDisplay() {
//         YaoQingModel.Ins.on(YaoQingModel.UPDATA_RED, this, this.onMailRed);
//         this.onMailRed();
//     }
//     private onUnDisplay() {
//         YaoQingModel.Ins.off(YaoQingModel.UPDATA_RED, this, this.onMailRed);
//     }

//     public onMailRed() {
//         this.redImg.visible = YaoQingModel.Ins.YQRed;
//     }
// }