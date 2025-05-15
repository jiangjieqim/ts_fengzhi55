import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class Box_AutoProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Box_Auto";
    }
    private static _ins: Box_AutoProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new Box_AutoProxy();
        }
        return this._ins;
    }

    public getCfgByBoxMag(boxMag:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Box_Auto_dat = l[i];
            if(cfg.f_BoxMag == boxMag){
                return cfg;
            }
        }
    }
    /**求boxMag之前的列表 */
    public getPreBoxMaxList(boxMag:number){
        let l = this.List;
        let boxMagList:number[]=[];
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Box_Auto_dat = l[i];
            if(cfg.f_BoxMag <= boxMag){
                boxMagList.push(cfg.f_BoxMag);
            }
        }
        return boxMagList;
    }
}