import { ui } from "../../../../../ui/layaMaxUI";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import {DotManager} from "../../common/DotManager";
import { EFuncDef } from "../../main/model/EFuncDef";
import { EquipmentIDProxy } from "../../main/model/EquipmentProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { TaskModel } from "../../main/model/TaskModel";
import { WingModel } from "../../main/model/WingModel";
import { EEquipType } from "../../main/vos/ECellType";
import { EquipItemVo } from "../../main/vos/EquipItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ZuoqiVo } from "../../zuoqi/vos/ZuoqiVo";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { HuanZhuangModel } from "../HuanZhuangModel";

/**顶部的装备小icon */
export class HuanZhuangSmallIconCtl {
    /**装备类型 */
    public equipType: EEquipType;

    public skin: ui.views.huanzhuang.ui_huanzhuang_itemUI;
    private eff:SimpleEffect;
    constructor() {
    }

    public updateIcon(type: number, equipStyle: number,locked:boolean) {
        if(type == EEquipType.ZuoQi){
            this.skin.icon.skin = IconUtils.getHorseIcon(equipStyle);
        }else{
            this.skin.icon.skin = ItemViewFactory.getEquipIcon(type, equipStyle);
        }
        this.skin.icon.gray = locked||false;
    }

    public init() {
        this.skin.redimg.visible = false;
    }

    public playAnim(){
        if(!this.eff){
            this.eff = new SimpleEffect(this.skin, "o/spine/change/change", this.skin.width / 2, this.skin.height / 2);
        }
        this.eff.play(0,false);
    }


    /**设置装备类型的标题 */
    private setTitle(){
        let cfg: Configs.t_EquipmentID_dat = EquipmentIDProxy.Ins.GetDataById(this.equipType);
        if (cfg) {
            this.skin.tf1.text = cfg.f_name;
        }
    }

    public updateData(vo: EquipItemVo) {
        this.skin.bg1.skin = "";
        this.skin.icon.skin = "";
        this.setTitle();
        this.skin.lockimg.visible = false;
        
        if(this.equipType == EEquipType.ZuoQi){
            if(!TaskModel.Ins.isFuncOpen(EFuncDef.Ride)){
                this.skin.lockimg.visible = true;
            }
            //坐骑
            let vo:ZuoqiVo = ZuoQiModel.Ins.rideVo;
            let zuoqiSkin = this.skin;
            if (!vo || vo && vo.isEmpty) {

            } else{
                zuoqiSkin.icon.skin = IconUtils.getHorseIcon(vo.mainid);
                // zuoqiSkin.bg1.skin = vo.getQualityIcon();
            }
        }else if(this.equipType == EEquipType.Wing){
            let wingData = WingModel.Ins.getOwnerWingData();
            let wingSkin = this.skin;
            if (wingData && wingData.wingId) {
                let val =  HuanZhuangModel.Ins.getEquipStyle(EEquipType.Wing);
                if(!val){
                    val = wingData.wingId;
                }
                wingSkin.icon.skin = ItemViewFactory.getWingIcon(val);
            } else {
                wingSkin.icon.skin = "";
            }
            if(!TaskModel.Ins.isFuncOpen(EFuncDef.Wing)){
                this.skin.lockimg.visible = true;
            }
        }else{
            this.skin.icon.skin = ItemViewFactory.getHuanZhuangSkin(vo);
        }
        this.skin.icon.gray = false;

        // if(RedUpdateModel.Ins.getEquipType(this.equipType)){
        //     DotManager.addDot(this.skin);
        // }else{
        //     DotManager.removeDot(this.skin);
        // }
    }
}