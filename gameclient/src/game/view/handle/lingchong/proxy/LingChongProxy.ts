import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class PetConfigProxy extends BaseCfg{
    private static _ins:PetConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PetConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pet_Config";
    }
}

export class PetListProxy extends BaseCfg{
    private static _ins:PetListProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PetListProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pet_List";
    }

    public getCfgById(id:number):Configs.t_Pet_List_dat{
        return this.List.find(item => item.f_petid == id);
    }

    public getPetIconById(id:number){
        let cfg = PetListProxy.Ins.getCfgById(id);
        return "o/pet_icon/" + cfg.f_peticon;
    }

    getByPetID(id:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Pet_List_dat = l[i];
            if(cfg.f_id == id){
                return cfg;
            }
        }
    }
}

export class PetQualityProxy extends BaseCfg{
    private static _ins:PetQualityProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PetQualityProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pet_Quality";
    }

    public getCfgById(id:number):Configs.t_Pet_Quality_dat{
        return this.List.find(item => item.f_quality == id);
    }
    
    /**是否可以跳过动画 */
    canSkinAnim(qua:number){
        let cell = this.getCfgById(qua);
        if(cell){
            return cell.f_isSkipAnim == 1;
        }
    }
}

export class PetSkillClientProxy extends BaseCfg{
    private static _ins:PetSkillClientProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PetSkillClientProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pet_Skill_Client";
    }

    public getCfgById(id:number):Configs.t_Pet_Skill_Client_dat{
        return this.List.find(item => item.f_petskillid == id);
    }
}

export class PetTalentProxy extends BaseCfg{
    private static _ins:PetTalentProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PetTalentProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pet_Talent_List";
    }

    public getCfgById(id:number):Configs.t_Pet_Talent_List_dat{
        return this.List.find(item => item.f_talentid == id);
    }
}
export class t_Pet_Fusion_Rate extends BaseCfg{
    private static _ins:t_Pet_Fusion_Rate;
    public GetTabelName(): string {
        return "t_Pet_Fusion_Rate";
    }
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Pet_Fusion_Rate();
        }
        return this._ins;
    }
    public getByLv(f_fusionlevel:number):Configs.t_Pet_Fusion_Rate_dat{
        let l = this.List;
        let cell = l.find(cell=>cell.f_fusionlevel == f_fusionlevel);
        return cell;
    }
}

export class t_Pet_Fusion_Protection extends BaseCfg{
    private static _ins:t_Pet_Fusion_Protection;

    public GetTabelName(): string {
        return "t_Pet_Fusion_Protection";
    }
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Pet_Fusion_Protection();
        }
        return this._ins;
    }
}

export class PetUpGradeProxy extends BaseCfg{
    private static _ins:PetUpGradeProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PetUpGradeProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pet_UpGrade";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let qua = this.List[i].f_QualityID;
            if(!this._map[qua]){
               this._map[qua] = {};
            }
            let lv = this.List[i].f_Level;
            this._map[qua][lv] = this.List[i];
        }
    }

    public getCfgByQuaAndLv(qua:number,lv:number):Configs.t_Pet_UpGrade_dat{
        return this._map[qua][lv];
    }
}

export class PetUpStarProxy extends BaseCfg{
    private static _ins:PetUpStarProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PetUpStarProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pet_UpStar";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let qua = this.List[i].f_QualityID;
            if(!this._map[qua]){
               this._map[qua] = {};
            }
            let star = this.List[i].f_Star;
            this._map[qua][star] = this.List[i];
        }
    }

    public getCfgByQuaAndStar(qua:number,star:number):Configs.t_Pet_UpStar_dat{
        return this._map[qua][star];
    }
}