import { stEquipAttr } from "../../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class t_Power_level extends BaseCfg {
    public GetTabelName(): string {
        return "t_Power_level";
    }
    private static _ins: t_Power_level;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Power_level();
        }
        return this._ins;
    }
    private find(l: stEquipAttr[],id:number){
        for(let i = 0;i < l.length;i++){
            let o = l[i];
            if(o.id == id){
                return o.value;
            }
        }
        return 0;
    }
    /**计算战斗力 */
    public calculatePlus(l: stEquipAttr[]) {
        let cfgList:Configs.t_Power_level_dat[] = this.List;
        let plus:number = 0;
        for(let i = 0;i < cfgList.length;i++){
            let cfg = cfgList[i];
            let val = this.find(l,cfg.f_id);
            if(val){
                plus = parseInt(cfg.f_val) * val;
            }
        }
        return plus;
    }
}