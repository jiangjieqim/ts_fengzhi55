import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class LiBaoZSProxy extends BaseCfg{
    private static _ins:LiBaoZSProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new LiBaoZSProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pack_NewPlayer_Mount";
    }

    public getCfgByType(type:number){
        for(let i:number=0;i<this.List.length;i++){
            if(this.List[i].f_packtype == type){
                return this.List[i];
            }
        }
        return null;
    }
}

export class SkinLiBaoProxy extends BaseCfg{
    private static _ins:SkinLiBaoProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new SkinLiBaoProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Pack_Skin";
    }
}

/**首充皮肤礼包(合并) */
export class t_Pack_FirstPay_Skin extends BaseCfg{
    private static _ins:t_Pack_FirstPay_Skin;

    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Pack_FirstPay_Skin();
        }
        return this._ins;
    }
    public GetTabelName(): string {
        return "t_Pack_FirstPay_Skin";
    }
}

export class AlternationRookieTaskProxy extends BaseCfg{
    private static _ins:AlternationRookieTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new AlternationRookieTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Alternation_Rookie_Task";
    }

    public getCfgById(id:number):Configs.t_Alternation_Rookie_Task_dat{
        return this.List.find(item => item.f_id == id);
    }
}