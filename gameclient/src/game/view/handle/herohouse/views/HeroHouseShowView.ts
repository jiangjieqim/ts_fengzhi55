import { StringUtil } from "../../../../../frame/util/StringUtil";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { HeroHouseModel } from "../HeroHouseModel";
import { t_Gym_NPC_Image } from "../model/GymProxy";

// ui_hero_house_show
/**武将展示-单个传承通用界面.png */
export class HeroHouseShowView extends ViewBase{
    protected mMask:boolean = true;
    private _ui:ui.views.hero_house.ui_hero_house_showUI;
    private cfg:Configs.t_Gym_NPC_List_dat;
    protected  onAddLoadRes(): void{}
    protected  onExit(): void{}
    protected  onFirstInit(): void{
        if(!this.UI){
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_showUI();
            this.setMouseBg(this._ui.bg1);

        }
    }
    protected  onInit(): void{
        this.cfg = this.Data;
        this._ui.nametf.text = this.cfg.f_name;
        this._ui.nametf.color = HeroHouseModel.Ins.getColorByHeroID(this.cfg.f_HeroID);
        this._ui.item.lockimg.visible = false;
        this._ui.item.nameTf.visible = false;
        this._ui.item.icon.skin = HeroHouseModel.Ins.getHeroIcon(this.cfg.f_iconid);
        this._ui.descTf.text = this.cfg.f_desc;
        this._ui.attr.text = this.buildAttr();
        //////////////////////////////////////////////////////////////////////
        let typeName:string = "江湖人士";
        if(this.cfg.f_HeroType != 0){
            let imgCfg = t_Gym_NPC_Image.Ins.getCfgByTypeID(this.cfg.f_HeroType);
            typeName = imgCfg.f_Typename;
            this._ui.quaTf.text = `${HeroHouseModel.Ins.getMaxDrgree(this.cfg.f_HeroID)}`;
        }else{
            this._ui.quaTf.text = "";
        }
        this._ui.tf1.text = `类型:${typeName}`;
        //////////////////////////////////////////////////////////////////////
        this._ui.tf2.text = `地区:${HeroHouseModel.Ins.getRegion(this.cfg.f_HeroID)}`;
    }

    private buildAttr() {
        let s: string = "";
        if (!StringUtil.IsNullOrEmpty(this.cfg.f_Attribute)) {
            let arr = this.cfg.f_Attribute.split("|");
            for (let i = 0; i < arr.length; i++) {
                let v = arr[i].split(":");

                let id = parseInt(v[0]);
                s += MainModel.Ins.getAttrNameIdByID(id)+":"+attrConvert(id,parseInt(v[1]));
                if (i < arr.length - 1) {
                    s += "     ";
                }
            }
        }
        return s;
    }
}