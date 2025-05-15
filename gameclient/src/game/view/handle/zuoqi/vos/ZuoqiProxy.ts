import { stEquipAttr, TipsVoList_req } from "../../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
/**坐骑升级,升星 */
export class MountConfigProxy extends BaseCfg{
    private static _ins:MountConfigProxy;
    public static get Ins(){
        if(!this._ins){
            this._ins = new MountConfigProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Mount_Config";
    }

    public getByQualityID(qua:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Mount_Config_dat = l[i];
            if(cfg.f_QualityID == qua){
                return cfg;
            }
        }
    }
}

/**坐骑属性*/
export class Mount_ValueProxy extends BaseCfg{
    private static _ins:Mount_ValueProxy;
    public static get Ins(){
        if(!this._ins){
            this._ins = new Mount_ValueProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Mount_Value";
    }

    public getAttrList(){
        let rs = [];
        let l = this.List;
        for(let i = 0;i< l.length;i++){
            let cfg:Configs.t_Mount_Value_dat = l[i];
            rs.push(cfg.f_attr_id);
        }
        return rs;
    }
}

/**坐骑运输 */
export class Mount_MissionProxy extends BaseCfg{
    private static _ins:Mount_MissionProxy;
    public static get Ins(){
        if(!this._ins){
            this._ins = new Mount_MissionProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Mount_Mission";
    }
}

/**坐骑抽取概率 */
export class Mount_GachaProxy extends BaseCfg{
    private static _ins:Mount_GachaProxy;
    public static get Ins(){
        if(!this._ins){
            this._ins = new Mount_GachaProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Mount_Gacha";
    }

    public getCfg(id:number){
        let cfg:Configs.t_Mount_Gacha_dat = this.GetDataById(id);
        return cfg;
    }
}

/**粮草仓库 */
export class Mount_StrogeProxy extends BaseCfg{
    private static _ins:Mount_StrogeProxy;
    public static get Ins(){
        if(!this._ins){
            this._ins = new Mount_StrogeProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Mount_Stroge";
    }

    public getCfg(id:number){
        let cfg:Configs.t_Mount_Stroge_dat = this.GetDataById(id);
        return cfg;
    }
}

/**坐骑列表 */
export class Mount_ListProxy extends BaseCfg{
    private readonly maxAttrCount:number = 5;
    /**觉醒星级 */
    public readonly wakeStar:number = 6;

    private static _ins:Mount_ListProxy;
    public static get Ins(){
        if(!this._ins){
            this._ins = new Mount_ListProxy();
        }
        return this._ins;
    }
    private _maxQua:number;
    public GetTabelName():string{
        return "t_Mount_List";
    }
    private getMaxQua(){
        let qua:number = 0;
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg = l[i];
            if(cfg.f_Quality > qua){
                qua = cfg.f_Quality;
            }
        }
        return qua;
    }

    /**最高品质 */
    public get maxQua(){
        if(!this._maxQua){
            this._maxQua = this.getMaxQua();
        }
        return this._maxQua;
    }

    /**坐骑id */
    public getCfg(id:number):Configs.t_Mount_List_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Mount_List_dat = l[i];
            if(cfg.f_MountID == id){
                return cfg;
            }
        }
    }

    /**几星解锁 */
    public getUnLockStar(id:number,index:number):number{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Mount_List_dat = l[i];
            if(cfg.f_MountID == id){
                // let _skillList = [];
                // let _stars = [];
                for(let i = 0;i < this.maxAttrCount;i++){
                    if(index == i){
                        let id:number = i + 1;
                    // _stars.push(parseInt(cfg[`f_UnlockVal${id}`]));
                    // _skillList.push(parseInt(cfg[`f_Skill${id}`]));
                        return parseInt(cfg[`f_UnlockVal${id}`]);
                    }
                }
                // return _stars[index];
            }
        }
        return 0;
    }

    /**获取特殊属性 */
    public getRideSpeclAttr(rideId: number, rideStar: number) {
        let l = this.List;
        let result: RideAttr[] = [];
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Mount_List_dat = l[i];
            if (cfg.f_MountID == rideId) {
                for (let i = 0; i < this.maxAttrCount; i++) {
                    let id: number = i + 1;
                    if(cfg[`f_Skill${id}`]){
                        let _star = parseInt(cfg[`f_UnlockVal${id}`]);
                        if (rideStar >= _star) {
                            let _cell = new RideAttr();
                            // _cell.attrOrder = i + 1;
                            _cell.f_UnlockVal = _star;
                            _cell.id = parseInt(cfg[`f_Skill${id}`]);
                            _cell.value = parseInt(cfg[`f_Skill${id}Value`]);
                            result.push(_cell);
                        }
                    }
                }
            }
        }
        return result;
    }

    /**获取坐骑的特殊属性attr id */
    public getSpeaicelAttr(id:number){
        let cfg:Configs.t_Mount_List_dat = this.getCfg(id);
        // let l:number[] = [];
        let l: stEquipAttr[] = [];
        if (cfg) {
            const _max = this.maxAttrCount;// 3
            for (let i = 0; i < _max; i++) {
                let key = i + 1;
                let attrId = cfg["f_Skill" + key];
                if (attrId) {
                    let cell: stEquipAttr = new stEquipAttr();
                    cell.id = attrId;
                    // let k1 = cfg[`f_Skill${key}Value${key}`];
                    // if (k1) {cell.value = k1;} 
                    let k2 = cfg[`f_Skill${key}Value`];
                    if (k2) {
                        cell.value = k2;
                    }
                    l.push(cell);
                }
            }
        }
        return l;
    }

}


/*属性值t_EquipmentValue.xlsx*/
export class RideAttr{
    /**解锁的星级 */
    f_UnlockVal:number;   
    
    /**
     * 属性id
     */
    id:number;
    /**
     * 属性值
     */
    value:number;
}
/**坐骑升级 */
export class t_Mount_UpGrade extends BaseCfg{
    public GetTabelName(): string {
        return "t_Mount_UpGrade";
    }
    private static _ins: t_Mount_UpGrade;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Mount_UpGrade();
        }
        return this._ins;
    }

    /**
每10级使用同一消耗
0：0-9
1：10-19
2：20-29 */
    public getByLvQua(lv: number, qua: number, f_plaidAmount: number): Configs.t_Mount_UpGrade_dat {
        let l: Configs.t_Mount_UpGrade_dat[] = this.List;
        for (let i = 0; i < l.length; i++) {
            let cell: Configs.t_Mount_UpGrade_dat = l[i];
            if (cell.f_QualityID == qua) {
                let min: number = cell.f_Level * f_plaidAmount;
                let max: number = min + (f_plaidAmount - 1);
                if (lv >= min && lv <= max) {
                    return cell;
                }
            }
        }
    }
}

/**坐骑升星 */
export class t_Mount_UpStar extends BaseCfg{
    public GetTabelName(): string {
        return "t_Mount_UpStar";
    }
    private static _ins: t_Mount_UpStar;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Mount_UpStar();
        }
        return this._ins;
    }
}