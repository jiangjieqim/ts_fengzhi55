import { stCellValue, stEquipItem } from "../../../../network/protocols/BaseProto";
import { uint64 } from "../../../../network/protocols/uint64";
import { EEquipType, EWearableType } from "../vos/ECellType";
import { EquipItemVo } from "../vos/EquipItemVo";
import { ItemVo } from "../vos/ItemVo";

export class DateFactory {
    public static createItemList(l:stCellValue[]):ItemVo[]{
        let _rl = [];
        for(let i = 0; i < l.length;i++){
            let cell:stCellValue = l[i];
            let item:ItemVo = new ItemVo();
            item.cfgId = cell.id;
            item.count = cell.count;
            _rl.push(item);
        }
        return _rl;
    }
    
    /**
  * 构建一个装备
  * @param type 
  * @param wearable 
  */
    public static createEquip(type: EEquipType, wearable: number = EWearableType.Not, lv: number = 1, qua: number = 1, plus: number = 1000) {
        let cell: stEquipItem = new stEquipItem();
        cell.type = type;
        cell.uid = new uint64( Math.ceil(Math.random()*1024),0);
        cell.level = lv;
        cell.quality = qua;
        cell.wearable = wearable;
        cell.plus = plus;
        cell.attrList = [];
        return cell;
    }

  /**
   * 构造一个装备数据
   */
    public static createEquipItemVo(cell: stEquipItem) {
        let vo: EquipItemVo = new EquipItemVo();
        vo.equipVo = cell;
        return vo;
    }

    /**创建一个主角数据 */
    public static createOwnerEquipVo(cell: stEquipItem){
        let vo = this.createEquipItemVo(cell);
        // vo.owner = true;
        return vo;
    }

    public static createEquipList(_equipItems:stEquipItem[]){
        let _resList:EquipItemVo[] = [];
        for(let i = 0;i < _equipItems.length;i++){
            let _cellVo = _equipItems[i];
            let _vo:EquipItemVo = DateFactory.createEquipItemVo(_cellVo);
            _resList.push(_vo);
        }
        return _resList;
    }

    /**
     *构造基础属性值 
     */
    public static createCellValue(id, val) {
        let cell = new stCellValue();
        cell.id = id;
        cell.count = val;
        return cell;
    }

    /**Copy数据 */
    public static Copy(vo:stEquipItem){
        let cell = new stEquipItem();
        cell.type = vo.type;
        cell.uid = vo.uid;
        cell.level = vo.level;
        cell.quality = vo.quality;
        cell.wearable = vo.wearable;
        cell.plus = vo.plus;
        cell.attrList = vo.attrList;
        return cell;
    }

}