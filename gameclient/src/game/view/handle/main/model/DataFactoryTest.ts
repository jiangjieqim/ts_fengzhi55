import { ChestInfoUpdate_revc, ExchangeEquip_revc, stEquipAttr, stEquipItem, ValChanel_revc } from "../../../../network/protocols/BaseProto";
import { uint64 } from "../../../../network/protocols/uint64";
import { ECellType, EEquipType, EWearableType } from "../vos/ECellType";
import { EquipItemVo } from "../vos/EquipItemVo";
import { DateFactory } from "./DateFactory";

/**
 * 测试数据构造工厂
 */
export class DataFactoryTest extends DateFactory{
    public static createExchangeEquipTest() {
        let data: ExchangeEquip_revc = new ExchangeEquip_revc();
        data.errorID = 0;
        data.equipItemList = [];
        let cell = this.createEquip(EEquipType.Shoulder,EWearableType.Not, Math.floor(100 * Math.random()));
        cell.plus = Math.floor(500 * Math.random());
        cell.attrList.push(
            this.createAttrVo(10002, Math.floor(200 * Math.random())),
            this.createAttrVo(10003, Math.floor(45 * Math.random())),
            this.createAttrVo(10004, Math.floor(7000 * Math.random()))
        );
        data.equipItemList.push(cell);
        return data;
    }
 
    /**
     * 构建一件随机装备
     */
    public static createRandomEquip(type: EEquipType, wearable: number = EWearableType.Not,uid?:uint64){
        let item:stEquipItem = this.createEquip(type,wearable);
        if(uid){
            item.uid = uid;
        }
        item.plus = Math.floor(1500 * Math.random());
        let vo:EquipItemVo = this.createEquipItemVo(item);
        item.attrList.push(
            this.createAttrVo(10002, Math.floor(2 * Math.random())),
            this.createAttrVo(10003, Math.floor(10 * Math.random())),
            this.createAttrVo(10004, Math.floor(30 * Math.random())),
        )
        
        return vo;
    }

  
    /**
     * 构造一条属性数据
     */
    public static createAttrVo(id:number,val:number){
        let attr = new stEquipAttr();
        attr.value = val;
        attr.id = id;
        return attr;
    }

    /**
     * 构造数据变化协议
     */
    public static createTestValChanel(){
        // data:ValChanel_revc
        let data:ValChanel_revc = new ValChanel_revc();
        data.itemList = [];
        data.itemList.push(
            this.createCellValue(1,Math.floor(100 * Math.random())),
            this.createCellValue(5,Math.floor(20000 * Math.random())),
            this.createCellValue(ECellType.EXP,Math.floor(500 * Math.random()))
        );
        return data;
    }

    /**
     * 创建初始化数据
     */
    public static createTestInitCellValue() {
        let l = [];
        l.push(
            this.createCellValue(ECellType.COPPER_MONEY, 100),
            this.createCellValue(ECellType.BATTLE, 200),
            this.createCellValue(ECellType.EXP, 20)
        );
        return l;
    }

    /**
     * 构造一个测试宝箱数据
     */
    public static createTestChestData(lv:number,pos:number,time:number){
        let _data:ChestInfoUpdate_revc = new ChestInfoUpdate_revc();
        _data.boxlv = lv;
        _data.pos = pos;
        _data.time = time;
        return _data;
    }

}