import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";

export class XXZDZItem extends ui.views.xxzdz.ui_xxzdzItem1UI{
    constructor() {
        super();

        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        if(this._data){
            E.ViewMgr.Open(EViewType.XXZDZGMView,null,this._data);
        }
    }

    private _data:Configs.t_Star_PocketTips_dat;
    public setData(value:Configs.t_Star_PocketTips_dat){
        if(!value)return;
        this._data = value;
        this.img.skin = `o/star/${value.f_Tipsicon}`;
        this.lab_name.text = value.f_TipsName;
        let id = parseInt(value.f_TipsPrice.split("-")[0]);
        let val = parseInt(value.f_TipsPrice.split("-")[1]);
        this.img2.skin = IconUtils.getIconByCfgId(id);
        this.lab.text = val + "";
    }
}