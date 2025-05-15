import { DuanWuModel } from "../../duanwu/DuanWuModel";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { NewPlayerFeastModel, NewPlayerRideFeastModel } from "../../newplayerfeast/NewPlayerFeastModel";
import { ZuoQiModel } from "../ZuoqiModel";

export enum EZuoQi{
    Once = 1,//单抽
    Three = 2,//三抽
    Ten = 3
}
/**坐骑升级 */
export class ZuoQiLvResult{

    public static readonly MAX:number = 1;//等级满级了
    public static readonly NOT_ENOUGH:number = 2;//材料不足
    public static readonly NORMAL:number = 3;//正常

    public status:number = ZuoQiLvResult.NORMAL;

    /**粮草拥有的数量 */
    public have:number;
    /**粮草id */
    public needItemid:number;
    /**粮草需要的数量 (0.1折扣的时候处理成一键升级需要的数量)*/
    public need:number;
    /**已经达到最大级 */
    public isMax:boolean;
    /**所在的阶段 */
    public step:number;
    /**阶段值*/
    public stepVal:number;
    /**最大值s */
    public stepMax:number;


    parse(need:number,itemid:number){
        let have = MainModel.Ins.mRoleData.getVal(itemid);
        this.needItemid = itemid;
        this.need = need;
        this.have = have;
        if(need > have){
            this.status = ZuoQiLvResult.NOT_ENOUGH;
        }
    }
}

/**坐骑升星 */
export class ZuoQiQuaResult{
    /**已经拥有的道具数量 */
    public have:number;
    /**已经达到最大级 */
    public isMax:boolean;
    /**需要的物品 非觉醒状态需要的道具 */
    public needItem:string;
    /**星级上限 */
    public f_MaxStar:number;
    /**
     * 需要显示消耗觉醒道具
     */
    hasHigh:boolean;
    /**觉醒的消耗的道具 */
    highItem:string;
}

export class ZuoqiChouQuResult {
    /**免费抽取的时间戳 */
    public time: number;
    /**单抽消耗 */
    public freeItemVo:ItemVo;
    /**3抽消耗 */
    public threeItemVo:ItemVo;
    public tenItemVo:ItemVo;
    /**是否显示折扣 */
    public get isShowDiscount(){
        if(DuanWuModel.Ins.isOpen){// || NewPlayerRideFeastModel.Ins.isOpen){
            let id;
            let vo = RedUpdateModel.Ins.getByID(RedEnum.ZUOQI_SHILIAN);
            if (vo && vo.type == 1) {
                id = this.getCanUseItemId(10);
            }else{
                id = this.getCanUseItemId(3);
            }
            if(id == ECellType.GOLD){
                return true;
            }
        }
    }

    public getCanUseItemId(horseItemNeed:number){
        let id = ECellType.HorseItemId;
        let have = MainModel.Ins.mRoleData.getVal(id);

        if(have >= horseItemNeed){
            return id;
        }else{
            return ECellType.GOLD;
        }
    }
    /**元宝三抽现价 */
    public get threeNeedCount() {
        if (this.isShowDiscount) {
            return this.nowThreeCount;
        }
        return this.threeItemVo.count;
    }

    /**现价 */
    public get nowThreeCount(){
        let count: number = this.threeItemVo.count;
        return count * ZuoQiModel.Ins.cfg.f_Discount / 10000;
    }

    /**元宝三抽原价 */
    public get threeOldCount(){
        return this.threeItemVo.count;
    }
    /**元宝十抽现价 */
    public get tenNeedCount() {
        if (this.isShowDiscount) {
            return this.nowTenCount;
        }
        return this.tenItemVo.count;
    }

    /**现价 */
    public get nowTenCount(){
        let count: number = this.tenItemVo.count;
        return count * ZuoQiModel.Ins.cfg.f_Discount / 10000;
    }

    /**元宝十抽原价 */
    public get tenOldCount(){
        return this.tenItemVo.count;
    }
    /**折扣值 */
    public get discount(){
        return (ZuoQiModel.Ins.cfg.f_Discount / 1000).toFixed(0);
    }
}