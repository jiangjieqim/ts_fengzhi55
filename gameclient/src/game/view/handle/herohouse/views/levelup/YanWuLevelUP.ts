import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { ValLabelCtl } from "../../../main/ctl/ValLabelCtl";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { MainModel } from "../../../main/model/MainModel";
import { ItemVo } from "../../../main/vos/ItemVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { HeroHouseModel, YanWuLevelUpItemVo } from "../../HeroHouseModel";
import { EFacilityType } from "../../model/EGymType";
import { HeroUpLevelBase, IHeroUpLevelBase } from "./HeroUpLevelBase";

//#region 演武台

export class YanWuLevelUp extends HeroUpLevelBase implements IHeroUpLevelBase{
    private _needItemVo:ItemVo;
    private cfg:Configs.t_Gym_Facility_Platform_dat;
    public type:EFacilityType = EFacilityType.Fight;
    constructor(skin: ui.views.hero_house.ui_hero_house_level_upUI){
        super();
        this.skin = skin;
        ButtonCtl.CreateBtn(this.skin.ywtBtn, this, this.onYanWuHandler);
        this.skin.ywtlist.itemRender = ui.views.hero_house.ui_hero_house_ywt_itemUI;
        this.skin.ywtlist.renderHandler = new Laya.Handler(this,this.itemRenderHandler);
        // this.tupoBtnCtl=ButtonCtl.CreateBtn(this.skin.tupoBtn, this, this.onTuPoHandler);
    }

    private itemRenderHandler(item:ui.views.hero_house.ui_hero_house_ywt_itemUI){
        // let cfg:Configs.t_Gym_Facility_Platform_dat = item.dataSource;

        // let color = HeroHouseModel.Ins.getColor(cfg.f_id)


        // 第一个数表示人物稀有度id，即t_Gym_NPC_Quality的f_NPCID
        // 第二个数表示概率（放大了一万倍）
    

        let _vo:YanWuLevelUpItemVo = item.dataSource;
        item.tf1.text = _vo.name;
        item.tf1.color = _vo.color;
        
        item.tf2.text =  _vo.curStr;
        item.tf3.text = _vo.nextStr;
    }

   /**
     * 演武台升级
     */
    private onYanWuHandler() {
        if( MainModel.Ins.isItemEnoughSt(this._needItemVo.toString(),true)){
            this.levelUp();
        }
    }


    public get container():Laya.Sprite{
        return this.skin.yanwutai;
    }

    public refresh() {
        super.refresh();
        let result = HeroHouseModel.Ins.buildListData(this.vo.id,this.vo.fid);
        this.cfg = result.cfg;
        let l = result.datalist;
        this.skin.ywtlist.array = l;
        this.skin.ywtlist.scrollTo(0);
        if(this.vo.isFullLv){
            this.skin.ywcost.visible = false;
        }else{
            this.skin.ywcost.visible = true;
            let cost:string = result.cfg.f_UpgradeCost;
            if(cost){
                this.skin.yanwutai.visible = true;
                this.skin.tupo_task.visible = false;
                let _needItemVo:ItemVo = ItemViewFactory.convertItem(cost);
                this._needItemVo = _needItemVo;
                this.skin.yuanbao3.skin = IconUtils.getIconByCfgId(_needItemVo.cfgId);
                ValLabelCtl.refresh(this.skin.yuanbaoTf2,_needItemVo.cfgId,_needItemVo.count);
            }else{
               this.updateTupo(result);
            }
        }
    }
}
//#endregion