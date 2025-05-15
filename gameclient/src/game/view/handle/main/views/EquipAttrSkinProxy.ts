import { stEquipAttr, stEquipItem } from "../../../../network/protocols/BaseProto";
import { MainModel } from "../model/MainModel";
import { attrConvert } from "../vos/MainRoleVo";

/**
 * 属性UI接口
 */
export interface IEquipAttSkin {
    valTf: Laya.Label;
    tf1: Laya.Label;
    upimg: Laya.Image;
    dataSource;
    visible:boolean;
}

export class EquipAttrSkinProxy {
    private static isEmpty(_attrVo: stEquipAttr|string){
        if(_attrVo == "empty"){
            // skin.visible = false;
            return true;
        }
        return false;
    }

    // public static setData(skin: IEquipAttSkin, _attrVo: stEquipAttr|string, upImg: boolean = false) {
    //     if(this.isEmpty(_attrVo)){
    //         skin.visible = false;
    //         return;
    //     }
    //     skin.visible = true;
    //     let attrVo:stEquipAttr = _attrVo as stEquipAttr;
    //     this.drawAttr(skin,attrVo);
    // }

    private static drawAttr(skin: IEquipAttSkin,attrVo: stEquipAttr){
        let model = MainModel.Ins;
        skin.tf1.text = model.getAttrNameIdByID(attrVo.id);
        skin.valTf.text = attrConvert(attrVo.id,attrVo.value);
        skin.valTf.x = skin.upimg.x - skin.valTf.textField.displayWidth - 7;
    }

    /**三个属性超过原属性 */
    public static isThreeBetter(_attrVos: stEquipAttr[], thatVos: stEquipAttr[]){
        let cnt:number = 0;
        for(let i = 0;i < _attrVos.length;i++){
            let cell = _attrVos[i];
            let tCell = thatVos[i];
            if(cell && tCell && cell.value > tCell.value){
                cnt++;
                if(cnt >= 3){
                    return true;
                }
            }
        }
        return false;
    }

    //有两属性可以比较的情况
    public static setDataThan(skin: IEquipAttSkin, _attrVo: stEquipAttr|string, 
        thatVo: stEquipAttr=null,
        _defaultShowImg:boolean = false) 
    {
        if(this.isEmpty(_attrVo)){
            skin.visible = false;
            return;
        }   
        skin.visible = true; 
        let attrVo:stEquipAttr = _attrVo as stEquipAttr;

        this.drawAttr(skin,attrVo);
      
        let mShowImg = _defaultShowImg;

        if (thatVo && attrVo.id == thatVo.id) {
            if (attrVo.value > thatVo.value) {
                mShowImg = true;
                skin.upimg.skin = `remote/common/base/green.png`;
            } else if (attrVo.value < thatVo.value) {
                mShowImg = true;
                skin.upimg.skin = `remote/common/base/red.png`;
            }
        }
        skin.upimg.visible = mShowImg;
    }
}