import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { stArtifactLog } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";

export class ShenBinLogItem extends ui.views.shenbin.ui_shenbinLogItemUI{
    constructor(){
        super();
    }

    public setData(value:stArtifactLog){
        if(!value)return;
        let vo:ItemVo = new ItemVo;
        vo.cfgId = value.item.id;
        vo.count = value.item.count;
        ItemViewFactory.refreshSlot(this.item_12,vo);
        this.lab_name.text = vo.getName();
        this.lab_time.text = TimeUtil.timestamtoTime1(value.time);
    }
}