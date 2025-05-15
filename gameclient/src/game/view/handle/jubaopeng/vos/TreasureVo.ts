import { TreasureModel } from "../TreasureModel";

/**聚宝盆 数据 */
export class TreasureVo{
    public cfg:Configs.t_Fund_dat;
    public reset() {
        
    }

    private get model(){
        return TreasureModel.ins;
    }
}