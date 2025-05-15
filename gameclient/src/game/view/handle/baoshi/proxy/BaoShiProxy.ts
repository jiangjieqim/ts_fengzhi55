import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class BaoShiCfgProxy extends BaseCfg{
    private static _ins:BaoShiCfgProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new BaoShiCfgProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gem_List";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let type = this.List[i].f_GemColor;
            if(!this._map[type]){
               this._map[type] = [];
            }
            this._map[type].push(this.List[i].f_GemAttrid);
        }
    }

    public getAttrArrByType(type:number){
        return this._map[type];
    }

    public getCfgById(gemId:number):Configs.t_Gem_List_dat{
        return this.List.find(item => item.f_Gemid == gemId);
    }

    public getBaoShiIcon(skin:string){
        return `o/gem/${skin}`;
    }

    public getNameByType(type:number){
        let st = "";
        switch(type){
            case 1:
                st = "力量";
                break;
            case 2:
                st = "敏捷";
                break;
            case 3:
                st = "智力";
                break;
            case 4:
                st = "铁壁";
        }
        return st;
    }
}

export class BaoShiShopProxy extends BaseCfg{
    private static _ins:BaoShiShopProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new BaoShiShopProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gem_Shop";
    }
}

export class BaoShiSelProxy extends BaseCfg{
    private static _ins:BaoShiSelProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new BaoShiSelProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gem_Config";
    }
}

export class FaZhengListProxy extends BaseCfg{
    private static _ins:FaZhengListProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FaZhengListProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gem_Formation_List";
    }

    public getCfgById(fzId:number):Configs.t_Gem_Formation_List_dat{
        return this.List.find(item => item.f_Formationid == fzId);
    }
}

export class BaoShiLvProxy extends BaseCfg{
    private static _ins:BaoShiLvProxy;
    private _map:any;
    public maxLv:number;

    public static get Ins(){
        if(!this._ins){
            this._ins = new BaoShiLvProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gem_Attribute";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let id = this.List[i].f_Gemid;
            if(!this._map[id]){
               this._map[id] = {};
            }
            this.maxLv = 0;
            let lv = this.List[i].f_GemLevel;
            this._map[id][lv] = this.List[i];
            this.maxLv = Math.max(lv,this.maxLv);
        }
    }

    public getCfgByIdAndLv(id:number,lv:number){
        return this._map[id][lv];
    }
}

export class FaZhengProxy extends BaseCfg{
    private static _ins:FaZhengProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FaZhengProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gem_Formation";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let id = this.List[i].f_Formationid;
            if(!this._map[id]){
               this._map[id] = [];
            }
            this._map[id].push(this.List[i]);
        }
    }

    public getCfgById(id:number){
        return this._map[id];
    }
}

export class BaoShiTransformProxy extends BaseCfg{
    private static _ins:BaoShiTransformProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new BaoShiTransformProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gem_Transform";
    }

    public getCfgByLv(lv:number):Configs.t_Gem_Transform_dat{
        return this.List.find(item => item.f_GemLevel == lv);
    }
}

export class BaoShiResonanceProxy extends BaseCfg{
    private static _ins:BaoShiResonanceProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new BaoShiResonanceProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gem_Attribute_Resonance";
    }
}

export class BaoShiLifeLineProxy extends BaseCfg{
    private static _ins:BaoShiLifeLineProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new BaoShiLifeLineProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gem_Attribute_LifeLine";
    }
}

