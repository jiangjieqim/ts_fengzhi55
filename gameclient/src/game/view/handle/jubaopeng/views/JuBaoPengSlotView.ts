import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemSlotCtl } from "../../main/views/icon/SoltItemView";

export class TreasureSlotVo{
    item:string;
    isLingqued:boolean;

    public static createVo(str:string,isLingqu:boolean){
        let vo = new TreasureSlotVo();
        vo.item = str;
        vo.isLingqued = isLingqu;
        return vo;
    }
}

export class JuBaoPengSlotView extends ui.views.main.ui_slot_lingqu_itemUI{
    private ctl:ItemSlotCtl;
    constructor(){
        super();
        this.yilingqu.mouseEnabled = false;
        this.ctl = new ItemSlotCtl(this);
    }
    public setData(vo:TreasureSlotVo){
        let itemVo = ItemViewFactory.convertItem(vo.item);
        this.ctl.setData(itemVo);
        if(vo.isLingqued){
            this.yilingqu.visible = true;
        }else{
            this.yilingqu.visible = false;
        }
    }
}