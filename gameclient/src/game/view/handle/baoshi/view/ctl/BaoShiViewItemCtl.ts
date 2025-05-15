import { ui } from "../../../../../../ui/layaMaxUI";
import { stGem } from "../../../../../network/protocols/BaseProto";
import { BaoShiModel } from "../../model/BaoShiModel";
import { FaZhengListProxy, FaZhengProxy } from "../../proxy/BaoShiProxy";
import { BaoShiItemCtl } from "./BaoShiItemCtl";

export class BaoShiViewItemCtl{
    protected skin:ui.views.baoshi.ui_baoshiViewItemUI;

    private _item1:BaoShiItemCtl;
    private _item2:BaoShiItemCtl;
    private _item3:BaoShiItemCtl;
    private _item4:BaoShiItemCtl;
    private _item5:BaoShiItemCtl;
    private _item6:BaoShiItemCtl;
    private _item7:BaoShiItemCtl;
    private _item8:BaoShiItemCtl;
    private _item9:BaoShiItemCtl;
    private _item10:BaoShiItemCtl;
    private _item11:BaoShiItemCtl;
    private _item12:BaoShiItemCtl;

    constructor(skin:ui.views.baoshi.ui_baoshiViewItemUI) {
        this.skin = skin;
        this.skin.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        for(let i:number=1;i<13;i++){
            this["_item" + i] = new BaoShiItemCtl(this.skin["item" + i]);
        }
    }

    protected onAdd(){
        for(let i:number=1;i<13;i++){
            this.skin["ts" + i].visible = false;
        }
    }

    protected onRemove(){

    }

    public setData(value:stGem[],isDrag:boolean,fzId:number,isTip:boolean = true){
        for(let i:number = 1;i<13;i++){
            if(value){
                let vo = value.find(item => (item as stGem).pos == i);
                if(vo){
                    (this["_item" + i] as BaoShiItemCtl).setVisible(true);
                    (this["_item" + i] as BaoShiItemCtl).setData(vo,isDrag,isTip,false,false,false);
                }else{
                    (this["_item" + i] as BaoShiItemCtl).setVisible(false);
                }
            }else{
                (this["_item" + i] as BaoShiItemCtl).setVisible(false);
            }
        }

        let arr = FaZhengProxy.Ins.getCfgById(fzId);
        for(let i:number=0;i<arr.length;i++){
            this.skin["img_" + arr[i].f_FormationidPos].skin = "o/gem/" + "bsq_" + arr[i].f_GemColor + ".png";
        }
        let cfg = FaZhengListProxy.Ins.getCfgById(fzId);
        this.skin.img_bg.skin = `o/gem/${cfg.f_backpic}`;
    }
}