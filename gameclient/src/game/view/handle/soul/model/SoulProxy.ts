import { BaseCfg } from "../../../../static/json/data/BaseCfg";

/** 页签*/
export class t_Spirit_Position extends BaseCfg{
    private static _ins:t_Spirit_Position;

    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Spirit_Position();
        }
        return this._ins;
    }
    public GetTabelName(): string {
        return "t_Spirit_Position";
    }

    public getByPos(pos:number):Configs.t_Spirit_Position_dat{
        return this.List.find(item=>(item as Configs.t_Spirit_Position_dat).f_Position == pos);
    }
}

export class t_Spirit_Attribute_Fixed extends BaseCfg {
    private static _ins: t_Spirit_Attribute_Fixed;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Spirit_Attribute_Fixed();
        }
        return this._ins;
    }
    public GetTabelName(): string {
        return "t_Spirit_Attribute_Fixed";
    }
     public getCfgBySpiritID(f_SpiritID:number):Configs.t_Spirit_Attribute_Fixed_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Spirit_Attribute_Fixed_dat = l[i];
            if(cfg.f_SpiritID == f_SpiritID){
                return cfg;
            }
        }
    }
}
/**升级配置 */
export class t_Spirit_ExpUpgrade extends BaseCfg {
    private static _ins: t_Spirit_ExpUpgrade;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Spirit_ExpUpgrade();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Spirit_ExpUpgrade";
    }

    /**根据等级获取配置 */
    public getCfgByLv(lv:number):Configs.t_Spirit_ExpUpgrade_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Spirit_ExpUpgrade_dat = l[i];
            if(cfg.f_SpiritID == lv){
                return cfg;
            }
        }
    }
    public isFull(lv:number,qua:number){
        let cfg = this.getCfgByLv(lv);
        return cfg[`f_Quality${qua}`] == 0;
    }

    /**获取经验上限 */
    public getMaxExp(lv: number, qua: number) {
        let l = this.List;
        let val: number = 0;
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Spirit_ExpUpgrade_dat = l[i];
            if (cfg.f_SpiritID <= lv) {
                val += cfg[`f_Quality${qua}`];
            } else {
                break;
            }
        }
        return val;
    }

  /**获取经验下限 */
  public getMinExp(lv: number, qua: number) {
    let l = this.List;
    let val: number = 0;
    for (let i = 0; i < l.length; i++) {
        let cfg: Configs.t_Spirit_ExpUpgrade_dat = l[i];
        if (cfg.f_SpiritID < lv) {
            val += cfg[`f_Quality${qua}`];
        } else {
            break;
        }
    }
    return val;
}

    /**获取最大值 */
    public getMaxByQua(qua:number){
        let l = this.List;
        let val: number = 0;
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Spirit_ExpUpgrade_dat = l[i];            
            let quaVal = parseInt(cfg[`f_Quality${qua}`]);
            val += quaVal;
        }
        return val;
    }

    /**根据经验获得当前等级 */
    public getLvByExp(qua:number,exp:number):number{
        let l = this.List;
        let v:number = 0;

        let lv:number = 0;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Spirit_ExpUpgrade_dat = l[i];
            let addExp:number = parseInt(cfg[`f_Quality${qua}`]);
            if(addExp){
                if (exp >= v && exp < v + addExp) {
                    return cfg.f_SpiritID;
                }
                v+=addExp;
                lv = cfg.f_SpiritID;
            }
        }
        return lv + 1;
    }
}

/**随机配置 */
export class t_Spirit_Attribute_Random extends BaseCfg{
    private _randomList:number[];
    public GetTabelName(): string {
        return "t_Spirit_Attribute_Random";
    }

    private static _ins: t_Spirit_Attribute_Random;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Spirit_Attribute_Random();
        }
        return this._ins;
    }

    /**
     * 是否是随机属性
     */
    public isRandomAttrId(_attrId: number) {
        if (!this._randomList) {
            this._randomList = [];
            let l = this.List;
            for (let i = 0; i < l.length; i++) {
                let cfg: Configs.t_Spirit_Attribute_Random_dat = l[i];
                if(cfg.f_RandomEnable == 0){
                    this._randomList.push(cfg.f_SpiritID);
                }
            }
        }
        return this._randomList.indexOf(_attrId) != -1;
    }
}

export class t_Spirit_Attribute_Bond extends BaseCfg{
    public GetTabelName(): string {
        return "t_Spirit_Attribute_Bond";
    }
    
    private static _ins: t_Spirit_Attribute_Bond;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Spirit_Attribute_Bond();
        }
        return this._ins;
    }

    public getBySpiritID(id:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Spirit_Attribute_Bond_dat = l[i];
            if(cfg.f_SpiritID == id){
                return cfg;
            }
        }
    }

}