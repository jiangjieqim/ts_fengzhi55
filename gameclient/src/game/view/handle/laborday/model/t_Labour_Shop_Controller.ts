import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class t_Labour_Shop_Controller extends BaseCfg {
    public GetTabelName(): string {
        return "t_Labour_Shop_Controller";
    }
    private static _ins: t_Labour_Shop_Controller;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Labour_Shop_Controller();
        }
        return this._ins;
    }
    /**是否有活跃商店 */
    is_freeshop(type:number){
        let l:Configs.t_Labour_Shop_Controller_dat[] = this.List;
        let cfg = l.find(cell=>cell.f_type == type);
        return cfg && cfg.f_is_freeshop == 1;
    }
}