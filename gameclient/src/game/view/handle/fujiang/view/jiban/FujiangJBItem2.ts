import { ui } from "../../../../../../ui/layaMaxUI";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy } from "../../proxy/FuJiangProxy";
import { FuJiangStarCtl } from "../ctl/FuJiangStarCtl";

export class FujiangJBItem2 extends ui.views.fujiang.ui_fujiangJBItem2UI{

    private _starCtl:FuJiangStarCtl;

    constructor() {
        super();
        this._starCtl = new FuJiangStarCtl(this.star);
    }

    public setData(value:string){
        let cCfg = FuJiangListProxy.Ins.getCfgById(parseInt(value));
        this.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(cCfg.f_cheifQuality);
        this.img.skin = FuJiangListProxy.Ins.getFuJiangSkin(cCfg.f_cheifid);
        this.lab_name.text = cCfg.f_cheif;
        this.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(cCfg.f_cheifQuality).f_chiefcolor;

        let fjCfg = FuJiangModel.Ins.getFuJiangCfgById(parseInt(value));
        if(fjCfg){
            this.star.visible = true;
            this._starCtl.setStar(fjCfg.star);
            this.box.gray = false;
        }else{
            this.box.gray = true;
            this.star.visible = false;
        }
    }
}