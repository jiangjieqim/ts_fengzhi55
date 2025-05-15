import { ui } from "../../../../../../ui/layaMaxUI";
import { IListData, SelectListCtl } from "../../../main/ctl/SelectListCtl";
import { BaoShiSelProxy } from "../../proxy/BaoShiProxy";
export class BaoShiSelVo implements IListData{
    color:string;
    txt:string;
}

//兑换宝石
export class BaoShiSelectCtl{
    protected skin:ui.views.baoshi.ui_baoshiSelectViewUI;
    public ctl1: SelectListCtl = new SelectListCtl();
    public ctl2: SelectListCtl = new SelectListCtl();
    public ctl3: SelectListCtl = new SelectListCtl();

    constructor(skin:ui.views.baoshi.ui_baoshiSelectViewUI) {
        this.skin = skin;
        this.skin.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr = BaoShiSelProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(arr[i].f_gemlevel != ""){
                let vo = new BaoShiSelVo();
                vo.color = "fff1d5";
                vo.txt = arr[i].f_gemlevel.split("-")[1];
                arr1.push(vo);
            }
            if(arr[i].f_GemColor != ""){
                let vo = new BaoShiSelVo();
                vo.color = "fff1d5";
                vo.txt = arr[i].f_GemColor.split("-")[1];
                arr2.push(vo);
            }
            if(arr[i].f_GemShape != ""){
                let vo = new BaoShiSelVo();
                vo.color = "fff1d5";
                vo.txt = arr[i].f_GemShape.split("-")[1];
                arr3.push(vo);
            }   
        }

        this.ctl1.init(this.skin.sanjiao1, this.skin.listarea1, this.skin.listcontainer1, this.skin.listtf1,
            ui.views.baoshi.ui_baoshiSelectItemUI, arr1);

        this.ctl2.init(this.skin.sanjiao2, this.skin.listarea2, this.skin.listcontainer2, this.skin.listtf2,
            ui.views.baoshi.ui_baoshiSelectItemUI, arr2);

        this.ctl3.init(this.skin.sanjiao3, this.skin.listarea3, this.skin.listcontainer3, this.skin.listtf3,
            ui.views.baoshi.ui_baoshiSelectItemUI, arr3);
    }

    public setHit(){
        this.skin.hitArea = new Laya.Rectangle(0, 356,331, 44);
    }

    protected onAdd(){

    }

    protected onRemove(){

    }
}