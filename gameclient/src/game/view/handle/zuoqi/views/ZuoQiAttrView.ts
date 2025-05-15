import { ui } from "../../../../../ui/layaMaxUI";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { Mount_ListProxy } from "../vos/ZuoqiProxy";
import { EquipAttrShow } from "./ZuoQiAttrCtl";

/***坐骑特殊属性 */
export class ZuoQiAttrView extends ui.views.zuoqi.ui_zuoqi_main_attrUI{
    private ctl:RideItemAttrCtl;
    constructor(){
        super();
        this.ctl = new RideItemAttrCtl(this);
    }
    public setData(_cell:EquipAttrShow){
        this.ctl.refresh(_cell);
    }
}
interface IRideItemSkin extends Laya.Sprite{
    showv: Laya.Image;
    jiesuoimg: Laya.Image;
    valTf: Laya.Label;
    attrtf: Laya.Label;
    tf1: Laya.Label;
}
export class RideItemAttrCtl{
    private skin:IRideItemSkin;
    constructor(skin:IRideItemSkin){
        this.skin = skin;
    }
    public refresh(_cell:EquipAttrShow){
        // this.skin = skin;
        let vis = true;
        let val = _cell.value;
        let model = MainModel.Ins;
        let _attrName = model.getAttrNameIdByID(_cell.id);
        this.skin.attrtf.text = _attrName;
        if(!_cell.lock){
            this.skin.tf1.text = "";
            this.skin.jiesuoimg.skin = `remote/main/main/jiesuo.png`;
            this.skin.showv.visible = true;
            this.skin.attrtf.color = this.skin.valTf.color = "#FB5AFB";
        }else{
            //未解锁 的情况 
            //几星解锁
            if(_cell.lockStar > Mount_ListProxy.Ins.wakeStar){
                vis = false;
            }
            this.skin.tf1.text = (_cell.lockStar||0).toString();
            this.skin.jiesuoimg.skin = `remote/main/main/jiesuo_1.png`;
            this.skin.showv.visible = false;
            this.skin.attrtf.color = this.skin.valTf.color = "#D3D3D3";
        }
        this.skin.valTf.text = attrConvert(_cell.id,val);
        this.skin.visible = vis;
    }
}