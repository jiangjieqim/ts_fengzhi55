import { StringUtil } from "../../../../../frame/util/StringUtil";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { ECellType } from "../vos/ECellType";

export class ValCtl {

    private tf: Laya.Label;
    private type: ECellType;
    private img: Laya.Image;

    public static Create(tf: Laya.Label, img: Laya.Image, type: number) {
        let ctl = new ValCtl(tf, img);
        ctl.setType(type);
        return ctl;
    }

    constructor(tf: Laya.Label, img: Laya.Image) {
        this.tf = tf;
        this.img = img;
        // this.type = type;
       
        this.tf.on(Laya.Event.DISPLAY, this, this.onDisplay);
        this.tf.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
        // this.onUpdateView();
    }
    private onDisplay() {
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onUpdateView);
        this.onUpdateView(this.type);
    }
    private onUnDisplay() {
        MainModel.Ins.off(MainEvent.ValChangeCell, this, this.onUpdateView);
    }
    private onUpdateView(id: number) {
        if (id == this.type) {
            let img = this.img;
            if (img) {
                img.skin = IconUtils.getIconByCfgId(this.type);
            }
            let val = MainModel.Ins.mRoleData.getVal(this.type);
            this.tf.text = StringUtil.val2m(val);
        }
    }
    public setType(type: ECellType) {
        this.type = type;
        this.onUpdateView(type);
    }
}