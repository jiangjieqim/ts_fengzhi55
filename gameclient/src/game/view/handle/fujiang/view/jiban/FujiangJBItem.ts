import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { TrammelsChiefUnlock_req, TrammelsChief_req, stTrammelsChief } from "../../../../../network/protocols/BaseProto";
import { System_RefreshTimeProxy } from "../../../huodong/model/ActivityProxy";
import { MainModel } from "../../../main/model/MainModel";
import { EQuickMsg } from "../../../main/model/QuickMsgVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { FuJiangTrammelsChiefProxy } from "../../proxy/FuJiangProxy";

export class FujiangJBItem extends ui.views.fujiang.ui_fujiangJBItemUI {
    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.onClick);
        ButtonCtl.Create(this.img_lock, new Laya.Handler(this, this.onBtnLockClick), false);
    }

    private onBtnLockClick() {
        let arr = System_RefreshTimeProxy.Ins.getVal(51).split("-");
        MainModel.Ins.queryMsg("解锁该格子", parseInt(arr[0]), parseInt(arr[1]),
        EQuickMsg.NULL, new Laya.Handler(this, this.buyEndHandler));
    }

    private buyEndHandler() {
        let req: TrammelsChiefUnlock_req = new TrammelsChiefUnlock_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onClick() {
        if (this._data) {
            if (this._data.id) {
                let req: TrammelsChief_req = new TrammelsChief_req;
                req.id = 0;
                req.pos = this._data.pos;
                SocketMgr.Ins.SendMessageBin(req);
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
    }
}