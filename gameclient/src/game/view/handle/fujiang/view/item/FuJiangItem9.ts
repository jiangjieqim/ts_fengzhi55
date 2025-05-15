import { ui } from "../../../../../../ui/layaMaxUI";
import { EquipAttrShow } from "../../../zuoqi/views/ZuoQiAttrCtl";
import { RideItemAttrCtl } from "../../../zuoqi/views/ZuoQiAttrView";

export class FuJiangItem9 extends ui.views.fujiang.ui_fujiangAttrItem3UI {
    private ctl:RideItemAttrCtl;

    constructor() {
        super();
        this.ctl = new RideItemAttrCtl(this);
    }

    public setData(_cell:EquipAttrShow){
        this.ctl.refresh(_cell);

        // let val = _cell.value;
        // let model = MainModel.Ins;
        // let _attrName = model.getAttrNameIdByID(_cell.id);
        // this.attrtf.text = _attrName;
        // if(!_cell.lock){
        //     this.tf1.text = "";
        //     this.jiesuoimg.skin = `remote/fujiang/jiesuo.png`;
        //     // this.tf1.text = `[${E.LangMgr.getLang("Unlock")}]`;
        //     this.showv.visible = true;
        //     this.attrtf.color = this.valTf.color = "#FB5AFB";
        // }else{
        //     //几星解锁
        //     // this.tf1.text = `[${E.LangMgr.getLang("Lock")}]`;
        //     this.tf1.text = (_cell.lockStar||0).toString();
        //     this.jiesuoimg.skin = `remote/fujiang/jiesuo_1.png`;
        //     this.showv.visible = false;
        //     this.attrtf.color = this.valTf.color = "#D3D3D3";

        // }
        // this.valTf.text = attrConvert(_cell.id,val);
    }
}