import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { MainModel } from "../../main/model/MainModel";

export class HuYouCfgProxy extends BaseCfg{
    private static _ins:HuYouCfgProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new HuYouCfgProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Blessing_Config";
    }
}

export class HuYouGetStageProxy extends BaseCfg{
    private static _ins:HuYouGetStageProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new HuYouGetStageProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Blessing_GetStage";
    }

    public getListByType(type:number){
        let list = [];
        for(let ele of this.List){
            if(ele.f_StageType == type){
                list.push(ele);
            }
        }
        return list;
    }
}

export class HuYouQualityProxy extends BaseCfg{
    private static _ins:HuYouQualityProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new HuYouQualityProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Blessing_Soul_Quality";
    }

    public getListByType(type:number){
        let list = [];
        for(let ele of this.List){
            if(ele.f_Enable == type){
                list.push(ele);
            }
        }
        return list;
    }

    public getListQuaByType(type:number){
        let list = [];
        for(let ele of this.List){
            if(ele.f_Enable == type && ele.f_QualityID <= 5){
                list.push(ele);
            }
        }
        return list;
    }

    public getCfgByItemID(itemID:number):Configs.t_Blessing_Soul_Quality_dat{
        let l = this.List;
        return l.find(item => (item as Configs.t_Blessing_Soul_Quality_dat).f_itemId == itemID);
    }

    public getCfgByQua(qua:number):Configs.t_Blessing_Soul_Quality_dat{
        let l = this.List;
        return l.find(item => (item as Configs.t_Blessing_Soul_Quality_dat).f_QualityID == qua);
    }
}

export class HuYouIconProxy extends BaseCfg{
    private static _ins:HuYouIconProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new HuYouIconProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Blessing_Soul_Icon";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let idd = this.List[i].f_ItemID;
            if(!this._map[idd]){
               this._map[idd] = {};
            }
            let attrr = this.List[i].f_SoulAttribute;
            this._map[idd][attrr] = this.List[i];
        }
    }

    public getCfgByIdAndAttr(id:number,attr:number){
        return this._map[id][attr];
    }
}

export class HuYouSoulExpProxy extends BaseCfg{
    private static _ins:HuYouSoulExpProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new HuYouSoulExpProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Blessing_Soul_Exp";
    }

    public getCfgByLv(level:number):Configs.t_Blessing_Soul_Exp_dat{
        let l = this.List;
        return l.find(item => (item as Configs.t_Blessing_Soul_Exp_dat).f_SoulLevel == level);
    }
}

export class HuYouSlotProxy extends BaseCfg{
    private static _ins:HuYouSlotProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new HuYouSlotProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Blessing_SlotOpen";
    }

    public getSlotNum():number{
        let lv = MainModel.Ins.mRoleData.lv;
        let num:number = 0;
        for(let i:number=0;i<this.List.length;i++){
            if(lv >= this.List[i].f_PlayerLevel){
                num = this.List[i].f_Slot;
            }
        }
        return num;
    }

    public getCfgByCount(count:number):Configs.t_Blessing_SlotOpen_dat{
        let l = this.List;
        return l.find(item => (item as Configs.t_Blessing_SlotOpen_dat).f_Slot == count);
    }
}

export class HuYouShopProxy extends BaseCfg{
    private static _ins:HuYouShopProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new HuYouShopProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Blessing_Shop";
    }
}


export class HuYouAttrNameProxy extends BaseCfg{
    private static _ins:HuYouAttrNameProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new HuYouAttrNameProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Blessing_Attribute_Name";
    }
}
    