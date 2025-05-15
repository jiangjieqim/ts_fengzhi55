import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { IPlusAnimVo } from "../views/new2/FightNumPlay";

export class FightNumModel {
    private bufferList: IPlusAnimVo[] = [];
    setPlus(pre: number, cur: number) {
        if (cur > pre) {
            let uiType: EViewType = EViewType.FightNumPlay;
            let vo: IPlusAnimVo = {} as IPlusAnimVo;
            vo.start = pre;
            vo.end = cur;
            if (E.ViewMgr.isOpenReg(uiType)) {
                this.bufferList.push(vo);
            } else {
                E.ViewMgr.Open(uiType, null, vo);
            }
        }
    }

    action() {
        while (this.bufferList.length > 3) {
            this.bufferList.shift();
        }
        if (this.bufferList.length > 0) {
            let vo: IPlusAnimVo = this.bufferList.shift();
            this.setPlus(vo.start, vo.end);
        }
    }
}