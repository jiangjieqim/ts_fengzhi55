import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { EServerVersion, MainModel } from "../../main/model/MainModel";
import { FuJiangModel } from "../model/FuJiangModel";

export class FuJiangConfigProxy extends BaseCfg{
    private static _ins:FuJiangConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_draw_config";
    }
}

export class FuJiangListProxy extends BaseCfg{
    private static _ins:FuJiangListProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangListProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_List";
    }

    public getCfgById(id:number):Configs.t_Chief_List_dat{
        return this.List.find(item => item.f_cheifid == id);
    }

    public getQuaSkin(qua:number){
        return `remote/fujiang/fj_pj_${qua}.png`;
    }

    public getQuaSkin1(qua:number){
        return `remote/fujiang/fj_sp_${qua}.png`;
    }

    public getProfessionSkin(profession:number){
        return `remote/fujiang/fj_zy_${profession}.png`;
    }

    public getFuJiangSkin(id:number){
        let skinID;
        let cfg = FuJiangModel.Ins.getFuJiangCfgById(id);
        if (cfg) {
            skinID = cfg.skinId;
        } else {
            let cCfg = FuJiangListProxy.Ins.getCfgById(id);
            skinID = cCfg.f_equipId;
        }
        let sCfg = FuJiangSkinProxy.Ins.getCfgById(skinID);
        return "o/chief/" + sCfg.f_skinicon;
    }

    public getFuJiangEquipSkin(part:number,id:number){
        return "o/item/" + part + "_" + id + ".png";
    }
}

export class FuJiangLvProxy extends BaseCfg{
    private static _ins:FuJiangLvProxy;
    public maxLv:number;
    private _cfgLv:any;
    
    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangLvProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_upgrade";
    }

    constructor(){
        super();
        this.maxLv = 0;
        this._cfgLv = {};
        for(let i:number=0;i<this.List.length;i++){
            this.maxLv = Math.max(this.List[i].f_chieflevel,this.maxLv);
            this._cfgLv[this.List[i].f_chieflevel] = this.List[i];
        }
    }

    public getCfgByLv(lv:number):Configs.t_Chief_upgrade_dat{
        return this._cfgLv[lv];
    }
}

export class FuJiangClasProxy extends BaseCfg{
    private static _ins:FuJiangClasProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangClasProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Class";
    }

    public getCfgByPre(pre:number):Configs.t_Chief_Class_dat{
        return this.List.find(item => item.f_classid == pre);
    }
}

export class FuJiangEquipSortProxy extends BaseCfg{
    private static _ins:FuJiangEquipSortProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangEquipSortProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Equipment_Sort";
    }
}

export class FuJiangEquipStarProxy extends BaseCfg{
    private static _ins:FuJiangEquipStarProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangEquipStarProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Equipment_Star";
    }

    constructor(){
        super();
    }

    public getCfgByStar(star:number):Configs.t_Chief_Equipment_Star_dat{
        return this.List.find(item => item.f_starid == star);
    }
}

export class FuJiangEquipAttrProxy extends BaseCfg{
    private static _ins:FuJiangEquipAttrProxy;
    private _map:any;
    private _arr:any;
    private _cfg:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangEquipAttrProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Equipment_Attribute";
    }

    constructor(){
        super();
        this._map = {};
        this._arr = {};
        this._cfg = {};
        for(let i:number=0;i<this.List.length;i++){
            let star = this.List[i].f_star;
            if(!this._map[star]){
               this._map[star] = {};
               this._arr[star] = [];
            }
            let lv = this.List[i].f_equiplevel;
            this._map[star][lv] = this.List[i];
            this._arr[star].push(this.List[i]);
            this._cfg[this.List[i].f_id] = this.List[i];
        }
    }

    public getCfgByStarAndLv(star:number,lv:number):Configs.t_Chief_Equipment_Attribute_dat{
        return this._map[star][lv];
    }

    public getListByStar(star:number):Configs.t_Chief_Equipment_Attribute_dat[]{
        return this._arr[star];
    }

    public getCfgByID(fid:number):Configs.t_Chief_Equipment_Attribute_dat{
        return this._cfg[fid];
    }
}

export class FuJiangStarProxy extends BaseCfg{
    private static _ins:FuJiangStarProxy;
    public maxLv:number;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangStarProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_star";
    }

    constructor(){
        super();
        this.maxLv = 0;
        for(let i:number=0;i<this.List.length;i++){
            this.maxLv = Math.max(this.List[i].f_starid,this.maxLv);
        }
    }

    public getCfgByStar(star:number):Configs.t_Chief_star_dat{
        return this.List.find(item => item.f_starid == star);
    }
}

export class FuJiangStarValueProxy extends BaseCfg{
    private static _ins:FuJiangStarValueProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangStarValueProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Value";
    }

    constructor(){
        super();
    }

    public getCfgByAttid(attid:number):Configs.t_Chief_Value_dat{
        return this.List.find(item => item.f_attrid == attid);
    }
}

export class FuJiangCMoraleProxy extends BaseCfg{
    private static _ins:FuJiangCMoraleProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangCMoraleProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Collection_Morale";
    }

    constructor(){
        super();
    }

    public getCfgByStar(star:number):Configs.t_Chief_Collection_Morale_dat{
        return this.List.find(item => item.f_starlevel == star);
    }
}

export class FuJiangCollConProxy extends BaseCfg{
    private static _ins:FuJiangCollConProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangCollConProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Collection_config";
    }

    constructor(){
        super();
    }
}

export class FuJiangSkillProxy extends BaseCfg{
    private static _ins:FuJiangSkillProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangSkillProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Skill";
    }

    constructor(){
        super();
    }

    public getCfgById(id:number):Configs.t_Chief_Skill_dat{
        return this.List.find(item => item.f_cheifid == id);
    }
}

export class FuJiangSkillClientProxy extends BaseCfg{
    private static _ins:FuJiangSkillClientProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangSkillClientProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Skill_Client";
    }

    constructor(){
        super();
    }

    public getCfgById(id:number):Configs.t_Chief_Skill_Client_dat{
        return this.List.find(item => item.f_clientskillid == id);
    }
}

export class FuJiangSkillLvProxy extends BaseCfg{
    private static _ins:FuJiangSkillLvProxy;
    public maxLv:number;
    private _cfgLv:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangSkillLvProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_chief_skill_upgrade";
    }

    constructor(){
        super();
        this.maxLv = 0;
        this._cfgLv = {};
        for(let i:number=0;i<this.List.length;i++){
            this.maxLv = Math.max(this.List[i].f_skilllevel,this.maxLv);
            this._cfgLv[this.List[i].f_skilllevel] = this.List[i];
        }
    }

    public getCfgByLv(lv:number):Configs.t_chief_skill_upgrade_dat{
        return this._cfgLv[lv];
    }
}

export class FuJiangSkinProxy extends BaseCfg{
    private static _ins:FuJiangSkinProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangSkinProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Skin_List";
    }

    constructor(){
        super();
    }

    public getCfgById(id:number):Configs.t_Chief_Skin_List_dat{
        return this.List.find(item => item.f_skinid == id);
    }
}

export class FuJiangSlotProxy extends BaseCfg{
    private static _ins:FuJiangSlotProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangSlotProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Slot";
    }

    constructor(){
        super();
    }

    public getCfgById(id:number):Configs.t_Chief_Slot_dat{
        return this.List.find(item => item.f_slotid == id);
    }
}

export class FuJiangFYSlotProxy extends BaseCfg{
    private static _ins:FuJiangFYSlotProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangFYSlotProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Blessing";
    }

    public getSlotNum(cheifId:number):number{
        let lv = 1;
        let cfg = FuJiangModel.Ins.getFuJiangCfgById(cheifId);
        if(cfg){
            lv = cfg.level;
        }
        let num:number = 0;
        let lvv:number;
        for(let i:number=0;i<this.List.length;i++){
            if(MainModel.Ins.serverVer == EServerVersion.Version_1){
                lvv = this.List[i].f_unlocklevel_v1;
            }else{
                if(FuJiangModel.Ins.isNewServer){
                    lvv = this.List[i].f_unlocklevelnew;
                }else{
                    lvv = this.List[i].f_unlocklevelold;
                }
            }
            if(lv >= lvv){
                num = this.List[i].f_slotid;
            }
        }
        return num;
    }

    public getCfgByCount(count:number):number{
        let l = this.List;
        let vo = l.find(item => (item as Configs.t_Chief_Blessing_dat).f_slotid == count);
        let lvv:number;
        if(MainModel.Ins.serverVer == EServerVersion.Version_1){
            lvv = vo.f_unlocklevel_v1;
        }else{
            if(FuJiangModel.Ins.isNewServer){
                lvv = vo.f_unlocklevelnew;
            }else{
                lvv = vo.f_unlocklevelold;
            }
        }
        return lvv;
    }
}

export class FuJiangTrammelsStageProxy extends BaseCfg{
    private static _ins:FuJiangTrammelsStageProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangTrammelsStageProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Trammels_Stage";
    }

    public getCfgByLv(lv:number){
        for(let i:number=0;i<this.List.length;i++){
            let arr = this.List[i].f_LevelRange.split("|");
            if(lv >= parseInt(arr[0]) && lv <= parseInt(arr[1])){
                return i;
            }
        }
        return -1;
    }
}

export class FuJiangTrammelsChiefProxy extends BaseCfg{
    private static _ins:FuJiangTrammelsChiefProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangTrammelsChiefProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Trammels_Chief";
    }
}

export class FuJiangSupportInheritProxy extends BaseCfg{
    private static _ins:FuJiangSupportInheritProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangSupportInheritProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Support_Inherit";
    }
}

export class FuJiangFlagListProxy extends BaseCfg{
    private static _ins:FuJiangFlagListProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangFlagListProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Flag_List";
    }

    public getCfgById(id:number):Configs.t_Chief_Flag_List_dat{
        return this.List.find(item => item.f_id == id);
    }

    public getFlagIcon(id:number){
        let cfg = this.getCfgById(id);
        return "o/flag/" + cfg.f_flag_icon;
    }

    public getFlagBIcon(id:number){
        let cfg = this.getCfgById(id);
        return "o/flag/" + cfg.f_flag_inbattle;
    }
}

export class FuJiangFlagUpgradeProxy extends BaseCfg{
    private static _ins:FuJiangFlagUpgradeProxy;
    private _arr:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangFlagUpgradeProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Flag_Upgrade";
    }

    constructor(){
        super();
        this._arr = {};
        for(let i:number=0;i<this.List.length;i++){
            let jj = this.List[i].f_flagstage;
            if(!this._arr[jj]){
               this._arr[jj] = [];
            }
            this._arr[jj].push(this.List[i]);
        }
    }

    public getCfgById(id:number):Configs.t_Chief_Flag_Upgrade_dat{
        return this.List.find(item => item.f_id == id);
    }

    public getListByJJ(jj:number):Configs.t_Chief_Flag_Upgrade_dat[]{
        return this._arr[jj];
    }
}

export class FuJiangDrawExpProxy extends BaseCfg{
    private static _ins:FuJiangDrawExpProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangDrawExpProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chief_Draw_Exp";
    }

    public getCfgById(id:number):Configs.t_Chief_Draw_Exp_dat{
        return this.List.find(item => item.f_drawlevel == id);
    }
}

export class FuJiangDrawRateProxy extends BaseCfg{
    private static _ins:FuJiangDrawRateProxy;
    private _arr:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new FuJiangDrawRateProxy();
        }
        return this._ins;
    }

    constructor(){
        super();
        this._arr = {};
        for(let i:number=0;i<this.List.length;i++){
            let lv = this.List[i].f_drawlevel;
            if(!this._arr[lv]){
               this._arr[lv] = [];
            }
            this._arr[lv].push(this.List[i]);
        }
    }

    public GetTabelName(): string {
        return "t_Chief_draw_Rate";
    }

    public getListByLv(lv:number):Configs.t_Chief_draw_Rate_dat[]{
        return this._arr[lv];
    }
}
