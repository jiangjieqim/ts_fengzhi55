import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class BoxCdProxy extends BaseCfg {
    public GetTabelName() {
        return "t_BoxCD"
    }
    private static _ins: BoxCdProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new BoxCdProxy();
        }
        return this._ins;
    }
}

export class t_BoxGachaProxy extends BaseCfg {

    public GetTabelName() {
        return "t_BoxGacha";
    }
    private static _ins: t_BoxGachaProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_BoxGachaProxy();
        }
        return this._ins;
    }

    public getCfgByLv(lv:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_BoxGacha_dat = l[i];
            if(cfg.f_BoxLevel == lv){
                return cfg;
            }
        }
    }
}