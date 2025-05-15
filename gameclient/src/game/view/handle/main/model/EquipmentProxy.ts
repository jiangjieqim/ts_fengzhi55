import { stEquipAttr, stEquipItem } from "../../../../network/protocols/BaseProto";
import { uint64 } from "../../../../network/protocols/uint64";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { EWearableType } from "../vos/ECellType";
/**
 * 装备品质
 */
export class EquipmentQualityProxy extends BaseCfg{
    private static _ins:EquipmentQualityProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new EquipmentQualityProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_EquipmentQuality";
    }

    public getByQua(qua:number):Configs.t_EquipmentQuality_dat{
        return this.GetDataById(qua);
    }
    public getByQuaDefault(defaultColor:string,qua:number):string{
        if(!qua){
            return defaultColor;
        }
        return `#${this.getByQua(qua).f_Color}`;
    }
}
/**
 * 装备类型
 */
export class EquipmentIDProxy extends BaseCfg{

    private static _ins:EquipmentIDProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new EquipmentIDProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_EquipmentID";
    }
}
/**
 * 装备效果(附属性)
 */
export class EffectValueProxy extends BaseCfg{
    private static _ins:EffectValueProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new EffectValueProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_EffectValue";
    }
}

/**
 * 装备基础属性
 */
export class EquipmentValueProxy extends BaseCfg{
    private static _ins:EquipmentValueProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new EquipmentValueProxy();
        }
        return this._ins;
    }
    public readonly MaxAttrID:number = 10005;
    public GetTabelName():string{
        return "t_EquipmentValue";
    }
}
/**
 * 属性列表
 */
export class GameconfigProxy extends BaseCfg{
    private static _ins:GameconfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new GameconfigProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_gameconfig";
    }


    private onSortHandler(a:Configs.t_gameconfig_dat,b:Configs.t_gameconfig_dat){
        if(a.f_sort < b.f_sort){
            return 1;
        }else if(a.f_sort > b.f_sort){
            return -1;
        }
        return 0;
    }

    /**
     * 增益属性列表
     */
    public get gainList(){
        let l = this.List;
        let r = [];
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_gameconfig_dat = l[i];
            if(cfg.f_id > EquipmentValueProxy.Ins.MaxAttrID && cfg.f_isenable){
                r.push(cfg.f_id);
            }
        }
        r = r.sort(this.onSortHandler);
        return r;
    }
    /**所有的属性id类型列表 */
    public get allAttrTypes():number[]{
        return this.GetAllFids();
    }

    public getJjcList(){
        let l = this.List;
        let r = [];
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_gameconfig_dat = l[i];
            if(cfg.f_id < 10018){
                r.push(cfg.f_id);
            }
        }
        return r;
    }
}
/**自定义装备配置 */
export class Equipment_DIY_Proxy extends BaseCfg{
    private static _ins:Equipment_DIY_Proxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new Equipment_DIY_Proxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Equipment_DIY";
    }

    /**生成自定义的数据 */
    public createByFid(fid:number){
        let cfg:Configs.t_Equipment_DIY_dat = this.GetDataById(fid);
        let _equipItemVo = new stEquipItem();
        _equipItemVo.type = cfg.f_AssetID;
        _equipItemVo.uid = new uint64();
        _equipItemVo.level = cfg.f_Level;
        _equipItemVo.quality = cfg.f_Quality;
        _equipItemVo.wearable = EWearableType.Not;
        _equipItemVo.plus = cfg.f_plus;
        _equipItemVo.equipStyle = cfg.f_StyleID;
        let ls:stEquipAttr[] = [];
        let attrs = GameconfigProxy.Ins.allAttrTypes;
        for(let i = 0;i < attrs.length;i++){
            let id = attrs[i];
            let val = cfg["f_"+id];
            if(val){
                let _attrVo:stEquipAttr = new stEquipAttr();
                _attrVo.id = id;
                _attrVo.value = parseInt(val);
                ls.push(_attrVo);
            }
        }
        _equipItemVo.attrList = ls;
        _equipItemVo.attrList1 = [];
        return _equipItemVo;
    }
}