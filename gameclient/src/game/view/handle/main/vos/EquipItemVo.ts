// import { InitConfig } from "../../../../../InitConfig";
import { E } from "../../../../G";
import { stEquipAttr, stEquipItem } from "../../../../network/protocols/BaseProto";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { EquipmentIDProxy, EquipmentQualityProxy } from "../model/EquipmentProxy";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { EquipBaseVo } from "./EquipBaseVo";
import { QualityUtils } from "./QualityUtils";

/**
 * 装备数据
 */
export class EquipItemVo extends EquipBaseVo{
    /**装备所有者是否是主角 */
    // public owner:boolean;
    public getUid(){
        return this.equipVo.uid;
    }
    // public get isNull(){
        // return this.equipVo == undefined;
    // }
    public get quality(){
        if(this.equipVo){
            return this.equipVo.quality;
        }
        return 0;
    }
    private static getVal(attrList:stEquipAttr[],id:number){
        for(let i = 0;i < attrList.length;i++){
            let cell = attrList[i];
            if(cell.id == id){
                return cell.value;
            }
        }
        return 0;
    }
    public static diffCheck(a0:EquipItemVo,a1:EquipItemVo){
        let attr0 = a0.equipVo.attrList;
        let attr1 = a1.equipVo.attrList;
        if(attr0.length != attr1.length){
            return true;
        }

        for(let i = 0;i < attr0.length;i++){
            let cell = attr0[i];
            let v = this.getVal(attr1,cell.id);
            if(cell.value!=v){
                return true;
            }
        }
        return false;
    }

    /**
     * 品质Icon
     */
    public getQualityIcon() {
        return IconUtils.getQuaIcon(this.quality);
    }

    public getQuaText(){
        let cfg: Configs.t_EquipmentQuality_dat = EquipmentQualityProxy.Ins.GetDataById(this.quality);
        if(cfg){
            return cfg.f_EquipmentLevel;
        }
        return "";
    }

    public getPartName(){
        if (this.equipVo) {
            let cfg:Configs.t_EquipmentID_dat = EquipmentIDProxy.Ins.GetDataById(this.equipVo.type);
            return cfg.f_name;
        }
        return "";
    }

    public getName(){
        return `${this.getQuaText()}${E.LangMgr.getLang("De")}${this.getPartName()}`
    }
    public getQuaColor(){
        if(this.equipVo){
            let qua = this.equipVo.quality;
            return QualityUtils.getQuaColor(qua);
        }
        return QualityUtils.defaultColor;
    }
    /**
     * 道具icon
     */
    public getIcon(){
        return ItemViewFactory.getIcon(this.equipVo);
    }
    
    /**战斗力 */
    public get plus(){
        if(this.equipVo){
            return this.equipVo.plus;
        }
        return 0;
    }

    constructor() {
        super();
    }
    
}