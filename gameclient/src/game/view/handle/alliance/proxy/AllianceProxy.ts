import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class AllianceCfgProxy extends BaseCfg{
    private static _ins:AllianceCfgProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceCfgProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_Config";
    }
}

export class AllianceShopProxy extends BaseCfg{
    private static _ins:AllianceShopProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceShopProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_Shop";
    }
}

export class AllianceBossAttributeProxy extends BaseCfg{
    private static _ins:AllianceBossAttributeProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceBossAttributeProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_Boss_Attribute";
    }

    public getByBossId(bossId: number): Configs.t_Alliance_Boss_Attribute_dat {
        return AllianceBossAttributeProxy.Ins.List.find(o => o.f_BossID === bossId);
    }
}

export class AllianceBossSkillProxy extends BaseCfg{
    private static _ins:AllianceBossSkillProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AllianceBossSkillProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alliance_BossSkill";
    }

    public getSkillList(bossId: number) {
        return this.List.filter(o => o.f_BossId === bossId);
    }
}