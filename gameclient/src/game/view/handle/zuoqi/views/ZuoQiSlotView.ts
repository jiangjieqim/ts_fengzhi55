import { ui } from "../../../../../ui/layaMaxUI";
import { ZuoQiSlotCtl } from "../../main/views/ZuoQiSlotCtl";
import { EquipItemVo } from "../../main/vos/EquipItemVo";
import { ZuoqiVo } from "../vos/ZuoqiVo";
/**坐骑仓库item */
export class ZuoQiSlotView{
    private ctl:ZuoQiSlotCtl;
    constructor(skin:ui.views.zuoqi.ui_zuoqi_storge_itemUI){
        this.ctl = new ZuoQiSlotCtl(skin);
    }
    public setData(_vo:ZuoqiVo){
        this.ctl.mData = _vo;
        this.ctl.refresh();
    }
}