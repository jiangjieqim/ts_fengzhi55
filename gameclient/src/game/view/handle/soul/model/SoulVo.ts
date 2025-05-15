import { stEquipAttr, stSpirit } from "../../../../network/protocols/BaseProto";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { SoulModel } from "./SoulModel";
import { t_Spirit_Attribute_Fixed, t_Spirit_ExpUpgrade } from "./SoulProxy";

export class SoulVo{
    public baseAttr:stEquipAttr[];
    public vo:stSpirit;
    public parse(){
        this.baseAttr = SoulModel.Ins.getBaseAttr(this.vo.spiritId,this.vo.level);
    }
    /**当前的总经验 */
    public get totalExp(){
        let _vo = this.vo;
        // let minVal:number = t_Spirit_ExpUpgrade.Ins.getMinExp(_vo.level,_vo.qualityId); //expUpgradeCfg['f_Quality'+_vo.qualityId];
        // let maxVal =  t_Spirit_ExpUpgrade.Ins.getMaxByQua(_vo.qualityId);
        // let cur = minVal + _vo.exp;
        // if(cur > maxVal){
        //     cur = maxVal;
        // }
        // return cur;
        return _vo.exp;
    }

    /**
     * @param lv 预览等级
     */
    public getOffsetVal(lv:number){
        let attrMap = {};
        let sub = lv - this.vo.level;
        if(sub > 0){
            let cfg:Configs.t_Spirit_Attribute_Fixed_dat = (t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(this.vo.spiritId));
            let arr:string[] = cfg.f_PerksNumber.split("|");
            for(let i = 0;i < arr.length;i++){
                let s = arr[i].split(":");
                let attrID = parseInt(s[0]);
                let val = parseInt(s[1]);
                attrMap[attrID] = val * sub;
            }
        }
        return attrMap;
    }
    public isEmpty:boolean = false;
}