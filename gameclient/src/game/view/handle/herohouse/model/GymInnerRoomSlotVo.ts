import { stGymEquip } from "../../../../network/protocols/BaseProto";
import { HeroHouseModel } from "../HeroHouseModel";
import { t_Gym_NPC_List } from "./GymProxy";

/**
 * 神识的格位信息
 */
export class GymInnerRoomSlotVo{
    // public slotId:number;
    /**
     * 格子中可以放置的武将类型
     */
    public heroType:number;
   
    /**
     * 可以放置的数量
     */
    public count:number;

    /**解锁的等级 */
    public unlockLevel:number;

    // /**清空格子 */
    // public clear(){
    //     this.equipVo = null;
    // }

    // /**
    //  * 是否锁定中
    //  */
    // public get locked(){
    //     return false;
    // }
        /**
     * 神识装备
     */
    // public equipVo:stGymEquip;
}

/**神识的格子视图数据 */
export class GymSlotViewVo{
    // public slotId:number;

    public mSelect:boolean = false;

    public heroType:number;
    public unlockLevel:number;
    public equipVo:stGymEquip;

    /**是否锁定中 */
    public get locked(){
        return this.unlockLevel > HeroHouseModel.Ins.levelCtl.cfgLv;
    }

    // public get icon(){
    // let vo = this.equipVo;
    // vo.heroType
    // }

    // this._ui.finishTf.text = "完整度" + vo.degree + "%";

    /**完整度 */
    
    public get degree(){
        return this.equipVo.degree;
    }

    // /**
    //  * 英雄名
    //  */
    // public get heroName(){
    //     return this.heroCfg.f_name;
    // }

    public get heroCfg():Configs.t_Gym_NPC_List_dat{
        let cfg = t_Gym_NPC_List.Ins.getByHeroID(this.equipVo.heroId);
        return cfg;
    }

    public get attrs(){
        return this.equipVo.attrList;
    }

    public get isEmpty(){
        return this.equipVo == undefined;
    }
    // /**空置 且 解锁了 */
    // public get canUse(){
    //     let status = this.isEmpty && !this.locked;
    //     return status;
    // }
}