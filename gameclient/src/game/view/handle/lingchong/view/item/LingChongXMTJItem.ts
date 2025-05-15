import { ui } from "../../../../../../ui/layaMaxUI";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";

export class LingChongXMTJItem extends ui.views.lingchong.ui_lingchongXMItemUI{

    constructor() {
        super();
        this.wh.visible = false;
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(e:Laya.Event){
        e.stopPropagation();
        MainModel.Ins.showSmallTips("", this._dec , e.target);
    }

    private _dec:string;
    public setData(value:Configs.t_Pet_Talent_List_dat){
        let id = parseInt(value.f_attr.split(":")[0]);
        let val = parseInt(value.f_attr.split(":")[1]) * value.f_maxlevel;
        this.quality.skin = IconUtils.getQuaIcon(value.f_quality);
        this.lab.text = MainModel.Ins.getAttrNameIdByID(id);
        this.lab_lv.text = "Lv." + value.f_maxlevel;

        this._dec = MainModel.Ins.getAttrNameIdByID(id) + ":" + attrConvert(id,val);
    }
}