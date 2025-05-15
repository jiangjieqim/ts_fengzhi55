import { ui } from "../../../../../ui/layaMaxUI";
import { stCellValue, stEquipAttr, stEquipItem, stSpirit } from "../../../../network/protocols/BaseProto";
import { ExpValueProxy, IExpCfg } from "../../../../static/json/data/ExpValueProxy";
import { IMainAttrSkin, IMainUpImgAttrSkin } from "../MainView";
import { GameconfigProxy } from "../model/EquipmentProxy";
import { MainModel } from "../model/MainModel";
import { EAttrType, ECellType, EEquipType, EWearableType } from "./ECellType";
import { EquipItemVo } from "./EquipItemVo";
import { attrConvert } from "./MainRoleVo";

export class PlayerVoFactory {

    public static getEquipVoByType(equipList:EquipItemVo[],type:EEquipType){
        for(let i = 0;i < equipList.length;i++){
            let vo:EquipItemVo = equipList[i];
            if(vo.equipVo && vo.equipVo.type == type && vo.equipVo.wearable == EWearableType.Wearable){
                return vo;
            }
        }
    }
    public static getVal(moneyInfo: stCellValue[], type: ECellType | EAttrType) {
        if (moneyInfo) {
            let moneyList: stCellValue[] = moneyInfo;
            for (let i = 0; i < moneyList.length; i++) {
                let money = moneyList[i];
                if (money.id == type) {
                    return money.count;
                }
            }
        }
        return 0;
    }

    public static getEquipVal(moneyInfo: stEquipAttr[], type:EAttrType){
        if (moneyInfo) {
            let moneyList: stEquipAttr[] = moneyInfo;
            for (let i = 0; i < moneyList.length; i++) {
                let money = moneyList[i];
                if (money.id == type) {
                    return money.value;
                }
            }
        }
        return 0;
    }

    public static initShowAttr():EAttrType[] {
        let showAttrType = [];
        let _list: Configs.t_gameconfig_dat[] = GameconfigProxy.Ins.List;
        for (let i = 0; i < _list.length; i++) {
            let _cfg = _list[i];
            if (_cfg.f_showattr) {
                showAttrType.push(_cfg.f_id);
            }
        }
        return showAttrType;
    }

    public static fillAttrView(l:IMainAttrSkin[],filter:Laya.Handler){
        let showAttrType:EAttrType[] = MainModel.Ins.showAttrType;
        for (let i = 0; i < l.length; i++) {
            let item: IMainUpImgAttrSkin = l[i] as IMainUpImgAttrSkin;
            if (item) {
                let type = showAttrType[i];
                item.tf1.text = MainModel.Ins.getAttrNameIdByID(type);//filter.runWith(type);
                item.valTf.text = filter.runWith(type);//
                item.valTf.x = item.width - item.valTf.textField.displayWidth;//+ 25;
                if(item.upimg){
                    item.upimg.visible = false;
                }
            }
        }
    }

    /**根据类型获取属性值 */
    public static getValString(moneyList: stCellValue[],type:number){
        if(moneyList){
            for (let i = 0; i < moneyList.length; i++) {
                let money = moneyList[i];
                if (money.id == type) {
                    return attrConvert(money.id,money.count);
                }
            }
        }
        let cfg:Configs.t_gameconfig_dat = GameconfigProxy.Ins.GetDataById(type);
        if(cfg.f_per == 1){
            return "0.00%"
        }
        return "0";
    }

    /**合并属性 */
    public static mergeAttr(arr:string[]|string){
        if(typeof arr == "string"){
            if (arr.length > 0 && arr.substr(arr.length - 1, 1) == "|") {
                arr = arr.substr(0,arr.length-1);
            }
            arr = [arr];
        }

        let _attrMaps = {};
        for (let i = 0; i < arr.length; i++) {
            let s = arr[i];
            if (s.length > 0) {
                let a = s.split("|");
                for (let n = 0; n < a.length; n++) {
                    let s1 = a[n].split(":");
                    let id = parseInt(s1[0]);
                    let val = parseInt(s1[1]);
                    if (!_attrMaps[id]) {
                        _attrMaps[id] = 0;
                    }
                    _attrMaps[id] += val;
                }
            }
        }
        let str = "";
        for(let n in _attrMaps){
            str += n+":"+_attrMaps[n]+"|";
            delete _attrMaps[n];
        }
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
        if(str.length > 0){
            return str.split("|");
        }
        return [];
    }

    public static mergeAttrSt(arr:stEquipAttr[]){
        let result = [];
        let _attrMaps = {};
        for(let i = 0;i < arr.length;i++){
            let cell = arr[i];
            let id = cell.id;
            let val = cell.value;
            if (!_attrMaps[id]) {
                _attrMaps[id] = 0;
            }
            _attrMaps[id] += val;
        }

        for(let n in _attrMaps){
            let cell = new stEquipAttr();
            cell.id = parseInt(n);
            cell.value = _attrMaps[n];
            result.push(cell);
        }
        return result;
    }
}

export class PlayerVoCtl {
    /*基础信息*/
    public moneyInfo: stCellValue[];

    // /*装备信息*/
    public equipItem: stEquipItem[];

    /**经验 */
    // public get exp(){
    // return PlayerVoFactory.getVal(this.moneyInfo,ECellType.EXP);
    // }

    /**等级 */
    // public get lv(){
    // let _exp = this.exp;
    // let cfg:IExpCfg = ExpValueProxy.Ins.getLvCfg(_exp);
    // return cfg.lv;
    // return 0;
    // }
    /**战斗力 */
    public get plus() {
        return PlayerVoFactory.getVal(this.moneyInfo,ECellType.BATTLE);
    }
}