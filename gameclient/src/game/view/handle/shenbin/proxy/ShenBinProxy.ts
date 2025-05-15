import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class ShenBinListProxy extends BaseCfg{
    private static _ins:ShenBinListProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ShenBinListProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Artifact_List";
    }

    public getCfgById(id:number):Configs.t_Artifact_List_dat{
        return this.List.find(item => item.f_Artifactid == id);
    }
}

export class ShenBinExpProxy extends BaseCfg{
    private static _ins:ShenBinExpProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ShenBinExpProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Artifact_Exp";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let qua = this.List[i].f_ArtifactQua;
            if(!this._map[qua]){
               this._map[qua] = {};
            }
            let lv = this.List[i].f_currentlevel;
            this._map[qua][lv] = this.List[i];
        }
    }

    public getCfgByQuaAndLv(qua:number,lv:number){
        return this._map[qua][lv];
    }
}

export class ShenBinCfgProxy extends BaseCfg{
    private static _ins:ShenBinCfgProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ShenBinCfgProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Artifact_Config";
    }
}

export class ShenBinPackProxy extends BaseCfg{
    private static _ins:ShenBinPackProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ShenBinPackProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Artifact_pack";
    }
}

export class ShenBinAttrProxy extends BaseCfg{
    private static _ins:ShenBinAttrProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ShenBinAttrProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Artifact_Attribute";
    }

    public getCfgByQua(qua:number):Configs.t_Artifact_Attribute_dat{
        return this.List.find(item => item.f_QualityID == qua);
    }
}

export class ShenBinComboProxy extends BaseCfg{
    private static _ins:ShenBinComboProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ShenBinComboProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Artifact_Combo";
    }
}

export class ArtifactComboAttributeProxy extends BaseCfg{
    private static _ins:ArtifactComboAttributeProxy;
    private _map:any;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ArtifactComboAttributeProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Artifact_Combo_Attribute";
    }

    constructor(){
        super();
        this._map = {};
        for(let i:number=0;i<this.List.length;i++){
            let id = this.List[i].f_ComboId;
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