import { t_Spirit_Config, t_Spirit_Quality } from "../../herohouse/model/GymProxy";
import { IItemCfg, ItemViewFactory } from "../../main/model/ItemViewFactory";

export class CleanUpVo{
    /**已经扫荡的次数 */
    public alreadyCount:number = 0;

    private _cfg:Configs.t_Spirit_Config_dat;
    private _needCfg:IItemCfg;
    public get cfg(){
        if(!this._cfg){
            this._cfg = t_Spirit_Config.Ins.GetDataById(1);
        }
        return this._cfg;
    }
    public get needCfg(){
        if(!this._needCfg){
            this._needCfg = ItemViewFactory.parseItem(this.cfg.f_BuyTimesCost);
        }
        return this._needCfg;
    }

    public get needStr(){
        return `${this.needCfg.id}-${this.needCfg.count}`;
    }

    /**剩余扫荡次数 */
    public get subCount(){
        return this.cfg.f_BuyTimes + this.cfg.f_EnergyMax - this.alreadyCount;
    }
    
    /**扫荡是否是免费的 */
    public get mFree(){
        return this.alreadyCount == 0;
    }

    /**现在需要的元宝数 */
    public get needMoneyVal(){
        let val = parseInt(this.cfg.f_BuyTimesCostGrow.split("-")[1]);//增量值
        let v = this._needCfg.count + (this.alreadyCount - 1) * val;
        return v;
    }
    public get needItemCfgId(){
        return this.needCfg.id;//parseInt(this.cfg.f_BuyTimesCost.split("-")[0]);
    }
    
    /**仓库上限 */
    public get storageMax(){
        return this.cfg.f_StorageMax;
    }
}