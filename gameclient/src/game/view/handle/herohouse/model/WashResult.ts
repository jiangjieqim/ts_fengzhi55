import { stEquipAttr, stGymFacilityRefinement } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { EWearableType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { HeroHouseModel } from "../HeroHouseModel";
import { EFacilityType } from "./EGymType";
import { t_Gym_refinement_Config } from "./GymProxy";
/**洗炼结果控制器 */
export class WashResult {
    public highitem:ItemVo;
    public lowitem:ItemVo;
    public leftAttr:stEquipAttr[];
    public rightAttr:stEquipAttr[];

    public get hasSwicth(){
        return this.rightAttr.length > 0
    }

    private get model(){
        return HeroHouseModel.Ins;
    }

    public hasEnough(high:boolean):boolean{
        let cell = (high ? this.highitem : this.lowitem);
        return (MainModel.Ins.isItemEnoughSt(`${cell.cfgId}-${cell.count}`,true));
    }

    public getResult(type:EFacilityType) {
        let cfg: Configs.t_Gym_refinement_Config_dat = t_Gym_refinement_Config.Ins.GetDataById(1);
        let cost = cfg.f_CostType.split("|");
        this.highitem = ItemViewFactory.convertItem(cost[1]);
        this.lowitem = ItemViewFactory.convertItem(cost[0]);

        let cell:stGymFacilityRefinement = this.model.defineList.find(item=>item.id == type);
        this.leftAttr = [];
        this.rightAttr = [];
        if(cell){
            let l = cell.datalist;
            let _left = l.find(item=>item.wearable == EWearableType.Wearable);
            if(_left){
                //穿戴中的左边列表
                this.leftAttr = _left.attrList;
            }
            
            let _right = l.find(item=>item.wearable == EWearableType.Not)
            if(_right){
                this.rightAttr = _right.attrList;
            }
        }
    }
}