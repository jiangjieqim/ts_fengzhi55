import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { MainModel } from "../../main/model/MainModel";

export class WuShenDianAwardProxy extends BaseCfg{
    private static _ins:WuShenDianAwardProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WuShenDianAwardProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Palace_Rank_Reward";
    }
}

export class WuShenDianShopProxy extends BaseCfg{
    private static _ins:WuShenDianShopProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WuShenDianShopProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Palace_Shop";
    }

    public getListByType(type:number):Configs.t_Palace_Shop_dat[]{
        let arr = [];
        for(let i:number=0;i<this.List.length;i++){
            if(this.List[i].f_ShopType == type){
                arr.push(this.List[i]);
            }
        }
        return arr;
    }
}

export class WuShenDianDataTypeProxy extends BaseCfg{
    private static _ins:WuShenDianDataTypeProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WuShenDianDataTypeProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Palace_DataType";
    }
}

export class WuShenDianCoreBuffBaseProxy extends BaseCfg{

    public GetTabelName(): string {
        return "";
    }

    public getListByType(type:number){
        let arr = [];
        for(let i:number=0;i<this.List.length;i++){
            if(this.List[i].f_CoreBuffType == type){
                arr.push(this.List[i]);
            }
        }
        return arr;
    }
}

export class WuShenDianCoreBuffProxy {
    private static _verList:WuShenDianCoreBuffBaseProxy[];

    public static get Ins() {
        if(!this._verList){
            this._verList = [];
            this._verList.push(new WuShenDianCoreBuffV0Proxy());
            this._verList.push(new WuShenDianCoreBuffV1Proxy());
        }
        let temp = this._verList[0];
        for(let i = 0;i < this._verList.length;i++){
            let proxy = this._verList[i];
            if(proxy.ver == MainModel.Ins.serverVer){
                temp = proxy;
                break;
            }
        }
        return temp;
    }
}

export class WuShenDianCoreBuffV0Proxy extends WuShenDianCoreBuffBaseProxy{
    public GetTabelName(): string {
        return "t_Palace_Data_CoreBuff";
    }
}

export class WuShenDianCoreBuffV1Proxy extends WuShenDianCoreBuffBaseProxy{
    public GetTabelName(): string {
        return "t_Palace_Data_CoreBuff_v1";
    }
}

export class WuShenDianConfigProxy extends BaseCfg{
    private static _ins:WuShenDianConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WuShenDianConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Palace_Config";
    }
}

export class WuShenDianGKProxy extends BaseCfg{
    private static _ins:WuShenDianGKProxy;

    public max:number;
    private _cfg:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WuShenDianGKProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Palace_LevelSetting";
    }

    constructor(){
        super();
        this.max = 0;
        this._cfg = {};
        for(let i:number=0;i<this.List.length;i++){
            this.max = Math.max(this.List[i].f_Level,this.max);
            this._cfg[this.List[i].f_Level] = this.List[i];
        }
    }

    public getCfgByGKID(id:number){
        return this._cfg[id];
    }
}

export class WuShenDianEnemyProxy extends BaseCfg{
    private static _ins:WuShenDianEnemyProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WuShenDianEnemyProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Palace_Enemy";
    }

    public getCfgById(id:number){
        return this.List.find(ele => ele.f_EnemyID == id);
    }
}