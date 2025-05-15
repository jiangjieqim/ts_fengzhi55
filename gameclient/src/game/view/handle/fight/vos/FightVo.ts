import { stFightVo } from "../../../../network/protocols/BaseProto";
import { EFightType } from "../../main/vos/ECellType";

export interface IFightResult{
    type:EFightType
    fightVo:stFightVo;
    extData;//附加数据
}