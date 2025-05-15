import { ui } from "../../../../../../ui/layaMaxUI";
import { stChief } from "../../../../../network/protocols/BaseProto";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { FuJiangListProxy } from "../../proxy/FuJiangProxy";
import { FuJiangStarCtl } from "../ctl/FuJiangStarCtl";

export class FuJiangItemCtl1{

    protected _ui:ui.views.fujiang.ui_fujiangItem1UI;

    constructor(skin:ui.views.fujiang.ui_fujiangItem1UI) {
        this._ui = skin;
    }

    public setData(value:stChief,bo:boolean = true){
        if(!value)return;
        let cCfg = FuJiangListProxy.Ins.getCfgById(value.cheifId);
        this._ui.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(cCfg.f_cheifQuality);
        this._ui.img.skin = FuJiangListProxy.Ins.getFuJiangSkin(cCfg.f_cheifid);
        if(bo){
            if(value.pos){
                this._ui.img_g.visible = true;
            }else{
                this._ui.img_g.visible = false;
            }
        }else{
            this._ui.img_g.visible = false;
        }
        this._ui.lab.text = "Lv." + value.level;
        this._ui.lab_name.text = cCfg.f_cheif;
        this._ui.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(cCfg.f_cheifQuality).f_chiefcolor;
        this._ui.lab_snum.text = "x" + value.star;
    }
}