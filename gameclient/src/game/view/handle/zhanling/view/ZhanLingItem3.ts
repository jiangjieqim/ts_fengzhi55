import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";

export class ZhanLingItem3 extends ui.views.zhanling.ui_zhanLingIconItem1UI{
    constructor(){
        super();
    }

    public setData(id:string,isGou:boolean){
        let itemVo:ItemVo = new ItemVo();
        let arr = id.split("-");
        itemVo.cfgId = parseInt(arr[0]);
        itemVo.count = parseInt(arr[1]);
        ItemViewFactory.refreshSlot(this.slot,itemVo);
        this.maskbg.visible = isGou;
    }
}