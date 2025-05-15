import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { HeroHouseModel } from "../../HeroHouseModel";
import { HeroFacilitiesVo } from "../../model/HeroFacilitiesVo";
import { HeroHouseLevelUp } from "./HeroHouseLevelUp";

export class HeroLittleIconCtl {
    public vo:HeroFacilitiesVo;
    public model:HeroHouseModel;
    private skin: ui.views.hero_house.ui_hero_house_level_up_itemUI;
    constructor(skin: ui.views.hero_house.ui_hero_house_level_up_itemUI) {
        this.skin = skin;
        this.model = HeroHouseModel.Ins;
        this.skin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private  onClickHandler() {
        this.model.selLevelUpType = this.vo.type;

        let _lvUpview:HeroHouseLevelUp = E.ViewMgr.Get(EViewType.HeroHouseLevelUp) as HeroHouseLevelUp;
        _lvUpview.onRefreshView();
        _lvUpview.updateBottomSel();
    }
    public refreshView(){
        let _vo = this.vo;
        _vo.setIcon(this.skin.icon);
        this.skin.lvTf.text = IconUtils.str2Lv(_vo.showLv);
        this.updateSelect();
    }

    private set mSelect(v:boolean){
        if(this.skin.topicon.visible !=v){
            this.skin.topicon.visible = v;
        }
    }

    public updateSelect(){
        this.mSelect = this.model.selLevelUpType == this.vo.type;
    }
}


