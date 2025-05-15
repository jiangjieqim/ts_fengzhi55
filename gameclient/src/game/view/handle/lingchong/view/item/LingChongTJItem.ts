import { ui } from "../../../../../../ui/layaMaxUI";
import { FuJiangStarCtl } from "../../../fujiang/view/ctl/FuJiangStarCtl";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { PetListProxy } from "../../proxy/LingChongProxy";

export class LingChongTJItem extends ui.views.lingchong.ui_lingchongItemUI{

    private _starCtl:FuJiangStarCtl;

    constructor() {
        super();
        this._starCtl = new FuJiangStarCtl(this.star);
    }

    public setData(value:Configs.t_Pet_List_dat,flag:boolean){
        if(!value)return;
        this.img_xz.visible = flag;
        this.sp.visible = false;
        this.spbg.visible = false;
        this.quality.skin = IconUtils.getQuaIcon(value.f_petquality);
        this.icon.skin = PetListProxy.Ins.getPetIconById(value.f_petid);
        this.star.visible = false;
        this.lab_lv.text = "";
        this.tab.visible = false;
    }
}