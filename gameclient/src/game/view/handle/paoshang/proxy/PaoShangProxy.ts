import { BaseCfg } from "../../../../static/json/data/BaseCfg";

/* @Author: tsy
 * @Date: 2023-02-27 16:01:27
 * @Last Modified by: tsy
 * @Last Modified time: 2023-02-28 14:30:23
*/
export class PaoShangCfgProxy extends BaseCfg{
    private static _ins:PaoShangCfgProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PaoShangCfgProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Station_Config";
    }
}

export class PaoShangSlotOpenProxy extends BaseCfg{
    private static _ins:PaoShangSlotOpenProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PaoShangSlotOpenProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Station_SlotOpen";
    }

    public getListByType(type:number){
        let list = [];
        for(let ele of this.List){
            if(ele.f_Enable == type){
                list.push(ele);
            }
        }
        return list;
    }
}

export class PaoShangMissionListProxy extends BaseCfg{
    private static _ins:PaoShangMissionListProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PaoShangMissionListProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Station_Mission_List";
    }

    public getCfgByMissionID(id:number):Configs.t_Station_Mission_List_dat{
        let l = this.List;
        return l.find(item => (item as Configs.t_Station_Mission_List_dat).f_MissionID == id);
    }
}

export class PaoShangCostProxy extends BaseCfg{
    private static _ins:PaoShangCostProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new PaoShangCostProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Station_Cost";
    }

    public getCfgByNum(num:number){
        let cfg = PaoShangCostProxy.Ins.GetDataById(num + 1);
        if(!cfg){
            cfg = PaoShangCostProxy.Ins.GetDataById(this.List.length);
        }
        return cfg;
    }
}