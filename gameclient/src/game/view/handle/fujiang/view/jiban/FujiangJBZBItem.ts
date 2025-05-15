import { ui } from "../../../../../../ui/layaMaxUI";
import { stTrammelsChief } from "../../../../../network/protocols/BaseProto";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangTrammelsChiefProxy } from "../../proxy/FuJiangProxy";

export class FujiangJBZBItem extends ui.views.fujiang.ui_fujiangZBJBItemUI{
    constructor() {
        super();
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemove);
        this.on(Laya.Event.CLICK, this, this.onClick);
    }

    private onAdd(){
        FuJiangModel.Ins.on(FuJiangModel.SELECT_JB_POS,this,this.setXZ);
    }

    private onRemove(){
        FuJiangModel.Ins.off(FuJiangModel.SELECT_JB_POS,this,this.setXZ);
    }

    private onClick() {
        if (this._data) {
            if (this._data.state) {
               FuJiangModel.Ins.jbPos = this._data.pos;
               FuJiangModel.Ins.event(FuJiangModel.SELECT_JB_POS);
            }
        }
    }

    private _data: stTrammelsChief;
    public setData(value: stTrammelsChief) {
        if (!value) return;
        this._data = value;
        if (this._data.id) {
            this.img_lock.visible = false;
            let cfg = FuJiangTrammelsChiefProxy.Ins.GetDataById(this._data.id);
            this.quality.skin = IconUtils.getQuaIcon(cfg.f_TrammelsQuality);
            if (cfg.f_TrammelsName.length > 3) {
                this.lab.visible = false;
                this.lab1.visible = true;
                this.lab1.text = cfg.f_TrammelsName;
            } else {
                this.lab.visible = true;
                this.lab.text = cfg.f_TrammelsName;
                this.lab1.visible = false;
            }
        } else {
            this.quality.skin = "remote/common/base/jiangli1.png";
            this.lab.visible = false;
            this.lab1.visible = false;
            if (this._data.state) {
                this.img_lock.visible = false;
            } else {
                this.img_lock.visible = true;
            }
        }

       this.setXZ();
    }

    private setXZ(){
        if(this._data.pos == FuJiangModel.Ins.jbPos){
            this.img_xz.visible = true;
        }else{
            this.img_xz.visible = false;
        }
    }
}