import { stSkin } from "../../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
/**商城配置 */
export class t_Gym_Shop extends BaseCfg {
    private static _ins:t_Gym_Shop;

    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Gym_Shop();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Gym_Shop";
    }

    public getListByType(type:number){
        let res = [];
        let l = this.List;
        for(let i = 0;i < l.length;i++ ){
            let cfg:Configs.t_Gym_Shop_dat = l[i];
            if(cfg.f_PageID == type){
                res.push(cfg);
            }
        }
        return res;
    }
}

/**任务列表 */
export class t_Gym_Mission_List extends BaseCfg{
    private static _ins:t_Gym_Mission_List;

    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Gym_Mission_List();
        }
        return this._ins;
    }
    public GetTabelName(): string {
        return "t_Gym_Mission_List";
    }
}

/**任务类型 */
export class t_Gym_Mission_Type extends BaseCfg{
    private static _ins:t_Gym_Mission_Type;

    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Gym_Mission_Type();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Gym_Mission_Type";
    }
}

export class t_Gym_Mission_Quality extends BaseCfg {
    private static _ins:t_Gym_Mission_Quality;

    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Gym_Mission_Quality();
        }
        return this._ins;
    }
    public GetTabelName(): string {
        return "t_Gym_Mission_Quality";
    }
    public getByMissionStarId(f_Star:number):Configs.t_Gym_Mission_Quality_dat{
        let l = this.List;
        return l.find(item => (item as Configs.t_Gym_Mission_Quality_dat).f_Star == f_Star);
    }
}

export class t_Gym_Config extends BaseCfg{
    private static _ins:t_Gym_Config;

    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Gym_Config();
        }
        return this._ins;
    }
    private _cfg:Configs.t_Gym_Config_dat;
    
    public GetTabelName():string{
        return "t_Gym_Config";
    }

    public get cfg():Configs.t_Gym_Config_dat{
        if(!this._cfg){
            this._cfg = this.GetDataById(1);
        }
        return this._cfg;
    }
}

/**英雄配置 */
export class t_Gym_NPC_List extends BaseCfg {

    public GetTabelName(): string {
        return "t_Gym_NPC_List";
    }
    private static _ins: t_Gym_NPC_List;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_NPC_List();
        }
        return this._ins;
    }

    public getByHeroID(heroId: number) :Configs.t_Gym_NPC_List_dat{
        let l = this.List;
        let cell = l.find(item => (item as Configs.t_Gym_NPC_List_dat).f_HeroID == heroId);
        return cell
    }
}
/**武将类别 */
export class t_Gym_NPC_Type extends BaseCfg {
    public GetTabelName(): string {
        return "t_Gym_NPC_Type";
    }

    private static _ins: t_Gym_NPC_Type;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_NPC_Type();
        }
        return this._ins;
    }

    public getByType(type:number){
        let cell = this.List.find(item => (item as Configs.t_Gym_NPC_Type_dat).f_TypeID == type);
        return cell;
    }

}

/**神识升级相关 */
export class t_Gym_NPC_InnerRoom extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_NPC_InnerRoom";
    }
    private static _ins: t_Gym_NPC_InnerRoom;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_NPC_InnerRoom();
        }
        return this._ins;
    }

    private _maxLv:number;

    public getByLv(lv:number):Configs.t_Gym_NPC_InnerRoom_dat{
        return this.List.find(item =>(item as Configs.t_Gym_NPC_InnerRoom_dat).f_RoomLevel == lv);
    }

    /**神识最大等级 */
    public get maxLevel(){
        if(this._maxLv == undefined){
            let l = this.List;
            this._maxLv = (l[l.length-1] as Configs.t_Gym_NPC_InnerRoom_dat).f_RoomLevel;
        }
        return this._maxLv;
    }

}

/**设施列表 */
export class t_Gym_Facility_List extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_Facility_List";
    }
    private static _ins: t_Gym_Facility_List;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_Facility_List();
        }
        return this._ins;
    }

    public getByFacilityId(f_FacilityId:number){
        return this.List.find(item=>(item as Configs.t_Gym_Facility_List_dat).f_FacilityId == f_FacilityId);
    }

}
export class t_Gym_Map extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_Map";
    }
    private static _ins: t_Gym_Map;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_Map();
        }
        return this._ins;
    }
    
}

/**演武台 */
export class t_Gym_Facility_Platform extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_Facility_Platform";
    }
    private static _ins: t_Gym_Facility_Platform;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_Facility_Platform();
        }
        return this._ins;
    }

    public findByRank(f_FacilityRank:number):Configs.t_Gym_Facility_Platform_dat{
        let l = this.List;
        return l.find(item=> (item as Configs.t_Gym_Facility_Platform_dat).f_FacilityRank == f_FacilityRank);
    }
}

/**武将稀有度 */
export class t_Gym_NPC_Quality extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_NPC_Quality";
    }
    private static _ins: t_Gym_NPC_Quality;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_NPC_Quality();
        }
        return this._ins;
    }

    public getByQua(qua:number):Configs.t_Gym_NPC_Quality_dat{
        return  this.GetDataById(qua);
    }
}
/**战鼓 */
export class t_Gym_Facility_Drum extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_Facility_Drum";
    }
    private static _ins: t_Gym_Facility_Drum;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_Facility_Drum();
        }
        return this._ins;
    }
}
/**茶壶 */
export class t_Gym_Facility_Tea extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_Facility_Tea";
    }
    private static _ins: t_Gym_Facility_Tea;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_Facility_Tea();
        }
        return this._ins;
    }
}
/**燃灯 */
export class t_Gym_Facility_lantern extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_Facility_lantern";
    }
    private static _ins: t_Gym_Facility_lantern;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_Facility_lantern();
        }
        return this._ins;
    }
}

// 

/**假人 */
export class t_Gym_Facility_Dummy extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_Facility_Dummy";
    }
    private static _ins: t_Gym_Facility_Dummy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_Facility_Dummy();
        }
        return this._ins;
    }
}

/**洗练*/ 
export class t_Gym_refinement_Config extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_refinement_Config";
    }
    private static _ins: t_Gym_refinement_Config;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_refinement_Config();
        }
        return this._ins;
    }
}

/**任务刷新*/ 
export class t_Gym_Mission_Config extends BaseCfg{
    public GetTabelName(): string {
        return "t_Gym_Mission_Config";
    }
    private static _ins: t_Gym_Mission_Config;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_Mission_Config();
        }
        return this._ins;
    }
}

export class t_Gym_NPC_Bond extends BaseCfg{
    public GetTabelName():string{
        return "t_Gym_NPC_Bond";
    }
    private static _ins: t_Gym_NPC_Bond;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_NPC_Bond();
        }
        return this._ins;
    }

    private _quaList:number[];

    public get quaList(){
        if(!this._quaList){
            this._quaList = [];
            let l = this.List;
            for(let i = 0;i < l.length;i++){
                let cfg:Configs.t_Gym_NPC_Bond_dat = l[i];
                if(this._quaList.indexOf(cfg.f_BondQuality) == -1){
                    this._quaList.push(cfg.f_BondQuality);
                }
            }
            this._quaList.sort((a,b)=>{
                if(a > b){
                    return 1;
                }else if(a < b){
                    return -1;
                }
                return 0;
            })
        }
        return this._quaList;
    }

    public getListByQua(qua:number):Configs.t_Gym_NPC_Bond_dat[]{
        let l = this.List;
        let _resultList = [];
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Gym_NPC_Bond_dat = l [i];
            if(cfg.f_BondQuality == qua){
                _resultList.push(cfg);
            }
        }
        return _resultList;
    }

}
/**演武形象 */
export class t_Gym_NPC_Image extends BaseCfg {
    public GetTabelName():string{
        return "t_Gym_NPC_Image";
    }
    private static _ins: t_Gym_NPC_Image;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_NPC_Image();
        }
        return this._ins;
    }

    public getStSkin(cfg:Configs.t_Gym_NPC_Image_dat){
        let cell = new stSkin();
        cell.f_HeadID = cfg.f_HeadID;
        cell.f_WeaponID = cfg.f_WeaponID;
        cell.f_ShieldID = cfg.f_ShieldID;
        cell.f_BodyID = cfg.f_BodyID;
        cell.f_WingID = 0;
        cell.f_MountID = 0;
        return cell;
    }

    public getCfgByTypeID(typeId: number) :Configs.t_Gym_NPC_Image_dat{
        let l = this.List;
        let cell = l.find(item => (item as Configs.t_Gym_NPC_Image_dat).f_TypeID == typeId);
        return cell;
    }

    // public getCfgByMiscNpcID(npcid:number){
    //     let l = this.List;
    //     let cell = l.find(item => (item as Configs.t_Gym_NPC_Image_dat).f_TypeID == npcid);
    //     return cell;
    // }
}
/**动作模板 */
export class t_Gym_NPC_Anim extends BaseCfg {
    public GetTabelName():string{
        return "t_Gym_NPC_Anim";
    }
    private static _ins: t_Gym_NPC_Anim;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_NPC_Anim();
        }
        return this._ins;
    }
}

export class t_Gym_NPC_MiscList extends BaseCfg {
    public GetTabelName():string{
        return "t_Gym_NPC_MiscList";
    }
    private static _ins: t_Gym_NPC_MiscList;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_NPC_MiscList();
        }
        return this._ins;
    }
}
export class t_Gym_NPC_Talk extends BaseCfg {
    public GetTabelName():string{
        return "t_Gym_NPC_Talk";
    }
    private static _ins: t_Gym_NPC_Talk;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_NPC_Talk();
        }
        return this._ins;
    }
}

/**武馆礼包 */
export class t_Pack_Gym extends BaseCfg {
    public GetTabelName():string{
        return "t_Pack_Gym";
    }
    private static _ins: t_Pack_Gym;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_Gym();
        }
        return this._ins;
    }
}

export class t_Gym_refinement_AttributeRange extends BaseCfg {
    public GetTabelName():string{
        return "t_Gym_refinement_AttributeRange";
    }
    private static _ins: t_Gym_refinement_AttributeRange;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gym_refinement_AttributeRange();
        }
        return this._ins;
    }

    public getQua(attrId:number,val:number){
        let cfg:Configs.t_Gym_refinement_AttributeRange_dat = this.List.find(item=>(item as Configs.t_Gym_refinement_AttributeRange_dat).f_Attributeid == attrId);
        let qua = 1;
        if(cfg){
            let rate:string[] = cfg.f_Rate.split("|");
            for(let i = 0;i < rate.length;i++){
                let arr = rate[i].split("-");
                let _qua = parseInt(arr[0]);
                let _start = parseInt(arr[1]);
                let _end = parseInt(arr[2]);
                if(val >= _start && val <= _end){
                    qua = _qua;
                    break;
                }
            }
        }
        return qua;
    }
    public getColor(attrId:number,val:number){
        // let cfg:Configs.t_Gym_refinement_AttributeRange_dat = this.List.find(item=>(item as Configs.t_Gym_refinement_AttributeRange_dat).f_Attributeid == attrId);
        // let qua = 1;
        // if(cfg){
        //     let rate:string[] = cfg.f_Rate.split("|");
        //     for(let i = 0;i < rate.length;i++){
        //         let arr = rate[i].split("-");
        //         let _qua = parseInt(arr[0]);
        //         let _start = parseInt(arr[1]);
        //         let _end = parseInt(arr[2]);
        //         if(val >= _start && val <= _end){
        //             qua = _qua;
        //             break;
        //         }
        //     }
        // }
        // return HeroHouseModel.Ins.getColorByQua(qua);
        let qua = this.getQua(attrId,val);
        let color = EquipmentQualityProxy.Ins.getByQua(qua).f_Color;
        return "#"+color;
    }
}

export class t_Spirit_Quality extends BaseCfg {
    public GetTabelName():string{
        return "t_Spirit_Quality";
    }
    private static _ins: t_Spirit_Quality;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Spirit_Quality();
        }
        return this._ins;
    }

    public getCfgByQua(qua:number){
        let l = this.List;
        return l.find(item => (item as Configs.t_Spirit_Quality_dat).f_QualityID == qua);
    }
}

export class  t_Spirit_Config extends BaseCfg {
    public GetTabelName():string{
        return "t_Spirit_Config";
    }
    private static _ins: t_Spirit_Config;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Spirit_Config();
        }
        return this._ins;
    }
     /**有几条随机属性 */
     public getRandomCount(lv:number){
        let cfg:Configs.t_Spirit_Config_dat = this.GetDataById(1);
        return Math.floor(lv / cfg.f_LevelGet);
    }
}

export class  t_Spirit_ExpCost extends BaseCfg {
    public GetTabelName():string{
        return "t_Spirit_ExpCost";
    }
    private static _ins: t_Spirit_ExpCost;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Spirit_ExpCost();
        }
        return this._ins;
    }

    public getByQua(qua:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Spirit_ExpCost_dat = l[i];
            if(cfg.f_QualityID == qua){
                return cfg;
            }
        }
    }
}
