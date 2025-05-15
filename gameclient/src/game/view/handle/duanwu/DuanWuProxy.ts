import { BaseCfg } from "../../../static/json/data/BaseCfg";

export class t_Alternation_Recharge extends BaseCfg{
    public GetTabelName():string{
        return "t_Alternation_Recharge";
    }
    private static _ins: t_Alternation_Recharge;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Alternation_Recharge();
        }
        return this._ins;
    }
    public titleId(type:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Alternation_Recharge_dat = l[i];
            if(cfg.f_RewardTitle && cfg.f_ActivityType == type){
                return cfg.f_RewardTitle;
            }
        }
    }
    public getListByType(type:number){
        let l = this.List;
        let out:Configs.t_Alternation_Recharge_dat[] = [];
        for(let i = 0;i < l.length;i++){
            let o:Configs.t_Alternation_Recharge_dat = l[i];
            if(o.f_ActivityType == type){
                out.push(o);
            }
        }
        return out;
    }
}

export class t_Alternation_MountPack extends BaseCfg {
    private static _ins: t_Alternation_MountPack;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Alternation_MountPack();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Alternation_MountPack";
    }
    public getListByType(type:number){
        let l = this.List;
        let out:Configs.t_Alternation_MountPack_dat[] = [];
        for(let i = 0;i < l.length;i++){
            let o:Configs.t_Alternation_MountPack_dat = l[i];
            if(o.f_PackType == type){
                out.push(o);
            }
        }
        return out;
    }
}
export class t_Alternation_Rank extends BaseCfg{
    private static _ins: t_Alternation_Rank;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Alternation_Rank();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Alternation_Rank";
    }
    public getListByType(type:number):Configs.t_Alternation_Rank_dat[]{
        let l = this.List;
        let out:Configs.t_Alternation_Rank_dat[] = [];
        for(let i = 0;i < l.length;i++){
            let o:Configs.t_Alternation_Rank_dat = l[i];
            if(o.f_ActivityType == type){
                out.push(o);
            }
        }
        return out;
    }

    public getFreeByType(type:number):Configs.t_Alternation_Rank_dat{
        let l = this.List;
        // let out:Configs.t_Alternation_Rank_dat[] = [];
        for(let i = 0;i < l.length;i++){
            let o:Configs.t_Alternation_Rank_dat = l[i];
            if(o.f_ActivityType == type && o.f_RewardTitle){
                // out.push(o);
                return o;
            }
        }
        // return out;
    }
}

export class t_Gem_Shop_Activity extends BaseCfg{
    private static _ins: t_Gem_Shop_Activity;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Gem_Shop_Activity();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Gem_Shop_Activity";
    }
}
export class t_Alternation_GemScore extends BaseCfg{
    private static _ins: t_Alternation_GemScore;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Alternation_GemScore();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Alternation_GemScore";
    }

    public getByLevel(lv:number):Configs.t_Alternation_GemScore_dat{
        let l =  this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Alternation_GemScore_dat = l[i];
            if(cfg.f_GemLevel == lv){
                return cfg;
            }
        }
    }
}
export class t_Alternation_Gem_Config extends BaseCfg{
    private static _ins: t_Alternation_Gem_Config;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Alternation_Gem_Config();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Alternation_Gem_Config";
    }
}

export class t_Alternation_Rookie_Rank extends BaseCfg{
    private static _ins: t_Alternation_Rookie_Rank;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Alternation_Rookie_Rank();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Alternation_Rookie_Rank";
    }
    public getListByType(type:number):Configs.t_Alternation_Rookie_Rank_dat[]{
        let l = this.List;
        let out:Configs.t_Alternation_Rookie_Rank_dat[] = [];
        for(let i = 0;i < l.length;i++){
            let o:Configs.t_Alternation_Rookie_Rank_dat = l[i];
            if(o.f_PackType == type){
                out.push(o);
            }
        }
        return out;
    }

    public getFreeByType(type:number):Configs.t_Alternation_Rookie_Rank_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let o:Configs.t_Alternation_Rookie_Rank_dat = l[i];
            if(o.f_PackType == type){
                return o;
            }
        }
    }
}