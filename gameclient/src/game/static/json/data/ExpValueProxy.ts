import { refreshItems_req } from "../../../network/protocols/BaseProto";
import { BaseCfg } from "./BaseCfg";


export interface IExpCfg
{
    // cur:Configs.t_ExpValue_dat;
    // next:Configs.t_ExpValue_dat;
    /**
     * 当前等级
     */
    // lv:number;

    minExp:number;
    maxExp:number;
}
/**
 * 经验配置表
 */
export class ExpValueProxy extends BaseCfg {
    private static _ins:ExpValueProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ExpValueProxy();
        }
        return this._ins;
    }

    public GetTabelName():string{
        return "t_ExpValue";
    }

    // private _expMap;
    // public get expMap(){
    //     if(!this._expMap){
    //         let minExp = 0;
    //         this._expMap = {};
    //         let l = this.List;
    //         for(let i = 0;i < l.length;i++){
    //             let cfg:Configs.t_ExpValue_dat = l[i];
    //             // if(cfg.f_lv == lv){
    //             // return cfg;
    //             // }
    //             let cell:IExpCfg = {} as IExpCfg;
    //             this._expMap[cfg.f_lv] = cell;
    //             cell.minExp = minExp;
    //             minExp+=cfg.f_ExpValue;
    //             cell.maxExp = minExp;
    //         }
    //     }
    //     return this._expMap;
    // }

    public getBylv(lv:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_ExpValue_dat = l[i];
            if(cfg.f_lv == lv){
                return cfg;
            }
        }
        }

    // public getLvCfg(exp:number){
        // let l = this.List;
        // let obj:IExpCfg = {} as IExpCfg;
        // let preExp = 0;

        // for(let  i = 0;i < l.length;i++){
        //     let cur:Configs.t_ExpValue_dat = l[i];
        //     let pre:Configs.t_ExpValue_dat = l[i-1];
        //     if(pre){
        //        preExp += pre.f_ExpValue;
        //     }
        //     if(exp >= preExp && exp < preExp+cur.f_ExpValue){
        //         // obj.lv = cur.f_lv;
        //         obj.maxExp = cur.f_ExpValue;
        //         obj.minExp = preExp;
        //         return obj;
        //     }
        // }
        // if(l.length >= 1){
        //     let maxCfg:Configs.t_ExpValue_dat = l[l.length-1];
        //     // obj.lv = maxCfg.f_lv;
        //     obj.maxExp = maxCfg.f_ExpValue;
        //     obj.minExp = preExp;            
        // }
        // return obj;
    // }
}