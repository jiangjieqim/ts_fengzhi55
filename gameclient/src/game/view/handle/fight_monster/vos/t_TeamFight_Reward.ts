import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { t_Alternation_MountPack } from "../../duanwu/DuanWuProxy";
import { MainModel } from "../../main/model/MainModel";
/**鏖战列表 */
export class t_TeamFight_Reward extends BaseCfg{
    private _rewardList:Configs.t_TeamFight_Reward_dat[];
    private _detailList:Configs.t_TeamFight_Reward_dat[];
    private static _ins:t_TeamFight_Reward;
    private static _verList:t_TeamFight_Reward[];
    // public static get Ins(){
    //     if(!this._ins){
    //         this._ins = new t_TeamFight_Reward();
    //     }
    //     return this._ins;
    // }
    public static get Ins() {
        if(!this._verList){
            this._verList = [];
            this._verList.push(new t_TeamFight_RewardV0Proxy());
            this._verList.push(new t_TeamFight_RewardV1Proxy());
        }
        let temp = this._verList[0];
        for(let i = 0;i < this._verList.length;i++){
            let proxy = this._verList[i];
            if(proxy.ver == MainModel.Ins.serverVer){
                temp = proxy;
                break;
            }
        }
        return temp;
    }
    public GetTabelName():string{
        return "t_TeamFight_Reward";
    }

    public get rewardList():Configs.t_TeamFight_Reward_dat[]{
        if(!this._rewardList){
            this._rewardList = [];
            let l = this.List;
            for(let i = 0;i < l.length;i++){
                let cfg:Configs.t_TeamFight_Reward_dat = l[i];
                if(cfg.f_RewardType == 1){
                    this._rewardList.push(cfg);
                }
            }
        }
        return this._rewardList;
    }

    public get detailList():Configs.t_TeamFight_Reward_dat[]{
        if(!this._detailList){
            this._detailList = [];
            let l = this.List;
            for(let i = 0;i < l.length;i++){
                let cfg:Configs.t_TeamFight_Reward_dat = l[i];
                if(cfg.f_RewardType == 0){
                    this._detailList.push(cfg);
                }
            }
            this._detailList.reverse();
        }
        return this._detailList;
    }

    public getCurFid(harm:number){
        let _detailList = this.detailList;
        // let index:number = 0;
        if(harm == 0){
            return _detailList[_detailList.length-1];
        }
        for(let i = _detailList.length;i >0 ;i--){
            let cur = _detailList[i-1];
            let next = _detailList[i-2];
            if(next && harm >= parseInt(cur.f_Stalls) && harm < parseInt(next.f_Stalls)){
                return cur;
            }
        }

        return _detailList[0];
    }
}


export class t_TeamFight_RewardV0Proxy extends t_TeamFight_Reward{
    public GetTabelName(): string {
        return "t_TeamFight_Reward";
    }
}

export class t_TeamFight_RewardV1Proxy extends t_TeamFight_Reward{
    public GetTabelName(): string {
        return "t_TeamFight_Reward_v1";
    }
}


export class t_TeamFight_BossPokedex extends BaseCfg{
    private static _ins:t_TeamFight_BossPokedex;
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_TeamFight_BossPokedex();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_TeamFight_BossPokedex";
    }
    /**是否已经开启 */
    public isPokedexOn(bossId:number){
        let l = this.List;
        for(let i = 0;i <l.length;i++){
            let cfg:Configs.t_TeamFight_BossPokedex_dat = l[i];
            if(cfg.f_BossID == bossId && cfg.f_PokedexOn){
                return true;
            }
        }
    }
}

export class t_TeamFight_BossAttribute extends BaseCfg {
    private static _ins:t_TeamFight_BossAttribute;
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_TeamFight_BossAttribute();
        }
        return this._ins;
    }
    public GetTabelName(): string {
        return "t_TeamFight_BossAttribute";
    }

    public getByBossId(bossId:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_TeamFight_BossAttribute_dat = l[i];
            if(cfg.f_BossID == bossId){
                return cfg;
            }
        }
    }
}

export class t_TeamFight_BossSkill extends BaseCfg{
    private static _ins:t_TeamFight_BossSkill;
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_TeamFight_BossSkill();
        }
        return this._ins;
    }
    public GetTabelName(): string {
        return "t_TeamFight_BossSkill";
    }

    public getSkillList(bossId:number):Configs.t_TeamFight_BossSkill_dat[]{
        let l = this.List;
        let result:Configs.t_TeamFight_BossSkill_dat[] = [];
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_TeamFight_BossSkill_dat = l[i];
            if(cfg.f_BossId == bossId){
                result.push(cfg);
            }
        }
        return result;
    }
}

export class t_TeamFight_Config extends BaseCfg{
    private _cfg:Configs.t_TeamFight_Config_dat;
    public GetTabelName(): string {
        return "t_TeamFight_Config";
    }
    private static _ins:t_TeamFight_Config;
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_TeamFight_Config();
        }
        return this._ins;
    }

    public get cfg():Configs.t_TeamFight_Config_dat{
        if(!this._cfg){
            this._cfg = this.GetDataById(1);
        }
        return this._cfg;
    }
}