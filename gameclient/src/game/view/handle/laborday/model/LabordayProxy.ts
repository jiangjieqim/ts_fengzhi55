import { BaseCfg } from "../../../../static/json/data/BaseCfg";
export class LabourConfigQua{
    qua:number;
    type:number;
    cfgList:Configs.t_Labour_Config_item_dat[];
}


/**概率表 */
export class t_Labour_Config_item extends BaseCfg{
    private static _ins:t_Labour_Config_item;
    
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Labour_Config_item();
        }
        return this._ins;
    }
    // private _quaList:LabourConfigQua[];
    public GetTabelName(): string {
        return "t_Labour_Config_item";
    }

    public getListByType(type:number){
        let result = [];
        let l: Configs.t_Labour_Config_item_dat[] = this.List;
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Labour_Config_item_dat = l[i];
            if (cfg.f_type == type) {
               result.push(cfg);
            }
        }
        return result;
    }

    public quaList(type: EModelLabordayType): LabourConfigQua[] {
        // if(!this._quaList){
        let _quaList = [];
        let l: Configs.t_Labour_Config_item_dat[] = this.List;
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Labour_Config_item_dat = l[i];
            if (cfg.f_type == type) {
                let cell:LabourConfigQua = _quaList.find(o => o.qua == cfg.f_itemQua);
                if (cell) {
                    cell.cfgList.push(cfg);
                } else {
                    let o = new LabourConfigQua();
                    o.type = type;
                    o.cfgList = [];
                    o.qua = cfg.f_itemQua;
                    o.cfgList.push(cfg);
                    _quaList.push(o);
                }
            }
        }
        // }
        return _quaList;
    }

}

/**概率值 */
export class t_Labour_Config_Rate extends BaseCfg{
    private static _ins:t_Labour_Config_Rate;
    
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Labour_Config_Rate();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Labour_Config_Rate";
    }

    public getRate(qua:number):number{
        let l:Configs.t_Labour_Config_Rate_dat[] = this.List;
        let cell = l.find(o=>o.f_itemQua==qua);
        if(cell){
            return cell.f_itemRate;
        }
        return 0;

    }
}

export class t_Labour_Shop extends BaseCfg{
    private static _ins:t_Labour_Shop;
    
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Labour_Shop();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Labour_Shop";
    }
    public getListByType(type:EModelLabordayType){
        let l = [];
        let l2 = this.List;
        for(let i = 0;i < l2.length;i++){
            let cfg:Configs.t_Labour_Shop_dat = l2[i];
            if(cfg.f_type == type){
                l.push(cfg);
            }
        }
        return l;
    }
}

/**礼包 */
export class t_Labour_Pack extends BaseCfg{
    private static _ins:t_Labour_Pack;
    
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Labour_Pack();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Labour_Pack";
    }

    public getListByType(type:EModelLabordayType){
        let l = [];
        let l2 = this.List;
        for(let i = 0;i < l2.length;i++){
            let cfg:Configs.t_Labour_Pack_dat = l2[i];
            if(cfg.f_type == type){
                l.push(cfg);
            }
        }
        return l;
    }
}

/**劳动节配置 */
export class t_Labour_Config extends BaseCfg {
    private static _ins: t_Labour_Config;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Labour_Config();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Labour_Config";
    }

    // public get cfg():Configs.t_Labour_Config_dat{
    //     let cell = this.List[0];
    //     return cell;
    // }

    public getByType(type:EModelLabordayType):Configs.t_Labour_Config_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let o:Configs.t_Labour_Config_dat = l[i];
            if(o.f_type == type){
                return o;
            }
        }
    }
}

export class t_Labour_Shop_Free extends BaseCfg{
    private static _ins:t_Labour_Shop_Free;
    
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Labour_Shop_Free();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Labour_Shop_Free";
    }
    public getListByType(type:EModelLabordayType){
        let l = [];
        let l2 = this.List;
        for(let i = 0;i < l2.length;i++){
            let cfg:Configs.t_Labour_Shop_Free_dat = l2[i];
            if(cfg.f_type == type){
                l.push(cfg);
            }
        }
        return l;
    }
}

export enum EModelLabordayType{
    /**五一劳动节 */
    Laborday = 0,

    /**儿童节 */
    Children = 1,

    /**夏日扭蛋 */
    Summer  = 2,

    /**中秋 */
    midAutumn  = 3,

    /**幸运扭蛋 */
    luck = 4,
    /**元宵 */
    yuanxiao = 5,
}