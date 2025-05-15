import { ui } from "../../../../../ui/layaMaxUI";
import { ActivityModel } from "../ActivityModel";
import { PackEjectProxy } from "../model/ActivityProxy2";

export class XianShiFuLiCtl{
    private skin: ui.views.huodong.ui_xianshifuli_itemUI;

    constructor(skin:ui.views.huodong.ui_xianshifuli_itemUI) {
        this.skin = skin;
    }

    public setData(index:number){
        let popArr = ActivityModel.Ins.getPopShowArr();
        let v = ActivityModel.Ins.getByUid(popArr[index].uid);
        const cfg = PackEjectProxy.Ins.getCfgByFid(parseInt(v.eject_f_id));
        this.skin.icon2.skin = `o/pack_eject/${cfg.f_packicon}`;
        this.skin.img_b2.skin = `o/pack_eject/${cfg.f_covericon}`;
        this.skin.lab2.text = cfg.f_packname;
    }
}