import { ui } from "../../../../../ui/layaMaxUI";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { ShenBinAttrProxy } from "../proxy/ShenBinProxy";

export class ShenBinAttrItem extends ui.views.shenbin.ui_shenbinAttrItemUI{
    constructor(){
        super();
    }

    public setData(value:any){
        this.img.skin = "remote/shenbin/qua_" + value.qua + ".png";
        if(value.lv){
            this.lab.text = "";
            this.lab_lv.text = "lv." + value.lv;
            let cfg = ShenBinAttrProxy.Ins.getCfgByQua(value.qua);
            this.lab_name.text = MainModel.Ins.getAttrNameIdByID(cfg.f_AttributeID) + ":";
            let num = cfg.f_Upgrade * value.lv;
            let val = cfg.f_Origin + num;
            this.lab_attr.text = attrConvert(cfg.f_AttributeID,val);
        }else{
            this.lab.text = "未激活";
            this.lab_lv.text = "";
            this.lab_name.text = "";
            this.lab_attr.text = "";
        }
        

    }
}