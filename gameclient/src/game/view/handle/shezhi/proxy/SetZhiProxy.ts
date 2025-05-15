import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class SheZhiDingYueProxy extends BaseCfg{
    private static _ins:SheZhiDingYueProxy;
    private _arr:any;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SheZhiDingYueProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Setting_Subscribe";
    }

    constructor(){
        super();
        this._arr = {};
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let type = this.List[i].f_type;
            if(!this._arr[type]){
               this._arr[type] = [];
            }
            let viewType = this.List[i].f_viewType;
            if(!this._map[viewType]){
                this._map[viewType] = {};
            }
            this._arr[type].push(this.List[i]);
            this._map[viewType][type] = this.List[i];
        }
    }

    public getListByType(type:number):Configs.t_Setting_Subscribe_dat[]{
        return this._arr[type];
    }

    public getCfgByViewType(viewType:number,type:number):Configs.t_Setting_Subscribe_dat{
        if(this._map[viewType] && this._map[viewType][type]){
            return this._map[viewType][type];
        }
    }
}