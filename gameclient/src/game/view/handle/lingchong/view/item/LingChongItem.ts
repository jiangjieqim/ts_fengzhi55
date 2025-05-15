import { ui } from "../../../../../../ui/layaMaxUI";
import { stPet } from "../../../../../network/protocols/BaseProto";
import { FuJiangStarCtl } from "../../../fujiang/view/ctl/FuJiangStarCtl";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { PetListProxy } from "../../proxy/LingChongProxy";

export class LingChongItem extends ui.views.lingchong.ui_lingchongItemUI{

    private _starCtl:FuJiangStarCtl;

    constructor() {
        super();
        this._starCtl = new FuJiangStarCtl(this.star);
    }

    public setData(value:any,flag:boolean){
        if(!value)return;
        let data:stPet = value.data;
        if (data) {
            this.img_xz.visible = flag;
            let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(data.petId);
            if(data.onBattle){
                this.sp.visible = true;
            }else{
                this.sp.visible = false;
            }
            this.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
            this.icon.skin = PetListProxy.Ins.getPetIconById(cfg.f_petid);
            this.lab_lv.text = "Lv." + data.petLevel;
            if(data.petStar){
                this.spbg.visible = true;
                this.star.visible = true;
                this._starCtl.setStar(data.petStar);
            }else{
                this.spbg.visible = false;
                this.star.visible = false;
            }
            this.tab.visible = true;
            this.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
            this.tab.img2.visible = false;
        } else {
            this.img_xz.visible = false;
            this.sp.visible = false;
            this.quality.skin = "remote/common/base/jiangli1.png";
            this.icon.skin = "";
            this.spbg.visible = false;
            this.star.visible = false;
            this.lab_lv.text = "";
            this.tab.visible = false;
        }
    }
}