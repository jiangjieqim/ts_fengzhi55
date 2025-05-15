import { ui } from "../../../../../../ui/layaMaxUI";
import { stGem } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { BaoShiModel } from "../../model/BaoShiModel";

//宝石属性view
export class BaoShiAttrCtl{
    protected skin:ui.views.baoshi.ui_baoshiAttrViewUI;

    constructor(skin:ui.views.baoshi.ui_baoshiAttrViewUI) {
        this.skin = skin;
        this.skin.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        this.skin.list1.itemRender = ui.views.baoshi.ui_baoshiAttrItemUI;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        this.skin.list2.itemRender = ui.views.baoshi.ui_baoshiAttrItemUI;
        this.skin.list2.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        this.skin.list3.itemRender = ui.views.baoshi.ui_baoshiAttrItemUI;
        this.skin.list3.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        this.skin.list4.itemRender = ui.views.baoshi.ui_baoshiAttrItemUI;
        this.skin.list4.renderHandler = new Laya.Handler(this,this.onRenderHandler);
    }

    private onAdd(){
        
    }

    private onRemove(){
     
    }

    private onRenderHandler(item:ui.views.baoshi.ui_baoshiAttrItemUI){
        let arr = (item.dataSource as string).split(":");
        let id = parseInt(arr[0]);
        let val = attrConvert(id,parseInt(arr[1]));
        item.txt.text = MainModel.Ins.getAttrNameIdByID(id) + ":" + val;
        if(arr[2]){
            item.txt1.text = " (+" + attrConvert(id,parseInt(arr[2])) + ")"
            item.txt1.x = item.txt.x + item.txt.textField.width;
        }else{
            item.txt1.text = "";
        }
    }

    public setData(value:stGem[],fzId:number){
        this.skin.list1.array = BaoShiModel.Ins.getAttrListByType(value,1,fzId);
        this.skin.list2.array = BaoShiModel.Ins.getAttrListByType(value,2,fzId);
        this.skin.list3.array = BaoShiModel.Ins.getAttrListByType(value,3,fzId);
        this.skin.list4.array = BaoShiModel.Ins.getAttrListByType(value,4,fzId);
    }
}
