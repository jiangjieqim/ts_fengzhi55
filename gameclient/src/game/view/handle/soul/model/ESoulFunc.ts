import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { SpiritUnwear_req, SpiritWear_req, stSpirit } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { SoulModel } from "./SoulModel";

/**tip功能 */
export enum ESoulFunc{
    /**装备 */
    Equip = 1,

    /**卸下 */
    Unload = 2,

    /**替换 */
    Swicth = 3,

    /**强化 */
    Intensify = 4,
}

export class SoulTipVo {
    /**是否激活空洞逻辑 */
    public enableHold:boolean = true;
    public vo: stSpirit;

    public type: ESoulFunc[] = [];

    /**装备，替换 */
    public equip() {
        let model: SoulModel = SoulModel.Ins;
        let cell = model.getWearableByPos(this.vo.pos);
        let uid: number = 0;
        if (cell && cell.vo) {
            uid = cell.vo.uid;
        }
        let req: SpiritWear_req = new SpiritWear_req();
        req.oldUid = uid;
        req.newUid = this.vo.uid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**强化 */
    public intensify(){
        E.ViewMgr.Open(EViewType.SoulUpgrade,null,this.vo.uid);
    }

    /**卸下 */
    public unload(){
        let req = new SpiritUnwear_req();
        req.uid = this.vo.uid;
        SocketMgr.Ins.SendMessageBin(req);
    }
}