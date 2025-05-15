import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class AdventureBossProxy extends BaseCfg {
    public GetTabelName() {
        return "t_Adventure_Boss";
    }
    private static _ins: AdventureBossProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new AdventureBossProxy();
        }
        return this._ins;
    }

    public getNext(id:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Adventure_Boss_dat = l[i];
            if(cfg.f_id == id){
                let _nextCfg = l[i+1];
                return _nextCfg;
            }
        }
        if(id == 0){
            return l[0];
        }
    }
}