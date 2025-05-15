import { ui } from "../../../../../../ui/layaMaxUI";
import { stPet } from "../../../../../network/protocols/BaseProto";
import { FuJiangStarCtl } from "../../../fujiang/view/ctl/FuJiangStarCtl";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { PetListProxy } from "../../proxy/LingChongProxy";

export class LingChongItem2 extends ui.views.lingchong.ui_lingchongItem2UI{
    private _starCtl:FuJiangStarCtl;

    constructor() {
        super();
        this._starCtl = new FuJiangStarCtl(this.star);
    }

    public setData(value:stPet,flag:boolean){
        if(!value)return;
        let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(value.petId);
        this.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
        this.icon.skin = PetListProxy.Ins.getPetIconById(cfg.f_petid);
        this.lab_lv.text = "Lv." + value.petLevel;
        if(value.petStar){
            this.sp.visible = true;
            this.star.visible = true;
            this._starCtl.setStar(value.petStar);
        }else{
            this.sp.visible = false;
            this.star.visible = false;
        }
        this.tab.visible = true;
        this.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this.tab.img2.visible = false;
        if(flag){
            this.mask1.visible = this.gou1.visible = true;
        }else{
            this.mask1.visible = this.gou1.visible = false;
        }
    }
}