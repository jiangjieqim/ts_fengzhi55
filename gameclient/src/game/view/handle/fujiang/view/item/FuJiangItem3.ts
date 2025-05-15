import { ui } from "../../../../../../ui/layaMaxUI";
import { stChiefEquip } from "../../../../../network/protocols/BaseProto";
import { EquipmentIDProxy, EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { FuJiangEquipAttrProxy, FuJiangEquipStarProxy, FuJiangListProxy } from "../../proxy/FuJiangProxy";
import { FuJiangStarCtl } from "../ctl/FuJiangStarCtl";

export class FuJiangItem3 extends ui.views.fujiang.ui_fujiangItem3UI{
    private _starCtl:FuJiangStarCtl;

    constructor() {
        super();
        this._starCtl = new FuJiangStarCtl(this.star);
    }

    public setData(value:any){
        if(!value)return;
        let cfg = FuJiangListProxy.Ins.getCfgById(value.id);
        let eCfg:Configs.t_EquipmentID_dat = EquipmentIDProxy.Ins.GetDataById(value.data.partId);
        let starCfg = FuJiangEquipStarProxy.Ins.getCfgByStar(value.data.equipStar);
        let attrCfg = FuJiangEquipAttrProxy.Ins.getCfgByStarAndLv(value.data.equipStar,value.data.equipLevel);
        this.img_qua.skin = IconUtils.getQuaIcon(starCfg.f_starquality);
        this.icon.skin = FuJiangListProxy.Ins.getFuJiangEquipSkin(value.data.partId,cfg.f_equipiconid);
        this._starCtl.setStar(value.data.equipStar);
        this.lab_name.text = EquipmentQualityProxy.Ins.getByQua(starCfg.f_starquality).f_EquipmentLevel + "的" + eCfg.f_name;
        this.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(starCfg.f_starquality).f_Color;
        this.lab_lv.text = "Lv." + value.data.equipLevel;
        let st = attrCfg["f_position" + value.data.partId];
        let id = parseInt(st.split(":")[0]);
        let val = parseInt(st.split(":")[1]);
        if(value.data.partId == 10){
            this.lan_attr.text = "全忽视:";
        }else{
            this.lan_attr.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        }
        this.lab_va.text = attrConvert(id,val);
    }
}