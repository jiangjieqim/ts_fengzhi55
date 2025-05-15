import { ui } from "../../../../../ui/layaMaxUI";
import { XianShiLiBaoModel } from "../model/XianShiLiBaoModel";
import { PackEjectNewProxy } from "../proxy/XianShiLiBaoProxy";

export class XianShiLiBaoCtl{
    private skin: ui.views.huodong.ui_xianshifuli_itemUI;

    constructor(skin:ui.views.huodong.ui_xianshifuli_itemUI) {
        this.skin = skin;
    }

    public setData(index:number){
        let popArr = XianShiLiBaoModel.Ins.getPopShowArr();
        const cfg:Configs.t_Pack_Eject_New_dat = PackEjectNewProxy.Ins.GetDataById(popArr[index].popId);
        this.skin.icon2.skin = `o/pack_eject/${cfg.f_packicon}`;
        this.skin.img_b2.skin = `o/pack_eject/${cfg.f_covericon}`;
        this.skin.lab2.text = cfg.f_packname;
    }
}