import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class WowHuanZhuangListProxy extends BaseCfg{
    private static _ins:WowHuanZhuangListProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WowHuanZhuangListProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Image_List";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let type = this.List[i].f_type;
            if(!this._map[type]){
               this._map[type] = [];
            }
            this._map[type].push(this.List[i]);
        }
    }

    public getListByType(type:number):Configs.t_Image_List_dat[]{
        return this._map[type];
    }
}

export class WowHuanZhuangAttributeProxy extends BaseCfg{
    private static _ins:WowHuanZhuangAttributeProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new WowHuanZhuangAttributeProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Image_Attribute";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let type = this.List[i].f_type;
            if(!this._map[type]){
               this._map[type] = [];
            }
            this._map[type].push(this.List[i]);
        }
    }

    public getListByType(type:number):Configs.t_Image_Attribute_dat[]{
        return this._map[type];
    }
}