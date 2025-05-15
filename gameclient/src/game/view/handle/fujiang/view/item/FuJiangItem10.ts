import { ui } from "../../../../../../ui/layaMaxUI";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy, FuJiangLvProxy, FuJiangSkinProxy } from "../../proxy/FuJiangProxy";

export class FuJiangItem10 extends ui.views.fujiang.ui_fujiangItem10UI{
    constructor() {
        super();
    }

    private _data:Configs.t_Chief_Skin_List_dat;
    public setData(value:number,cheifId:number,index:number,selIndex:number){
        if(!value)return;
        this._data = FuJiangSkinProxy.Ins.getCfgById(value);
        let cCfg = FuJiangListProxy.Ins.getCfgById(cheifId);
        this.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(cCfg.f_cheifQuality);
        this.img.skin = "o/chief/" + this._data.f_skinicon;
        
        this.lab_name.text = this._data.f_skinname;
        if(index == selIndex){
            this.img_sel.visible = true;
        }else{
            this.img_sel.visible = false;
        }

        let cfg = FuJiangModel.Ins.getFuJiangCfgById(cheifId);
        if(this._data.f_skinid == cfg.skinId){
            this.gou.visible = true;
        }else{
            this.gou.visible = false;
        }

        if(cfg.skinIds.indexOf(this._data.f_skinid) != -1){
            this.box.gray = false;
            this.lab_js.visible = false;
        }else{
            this.box.gray = true;
            this.lab_js.visible = true;
            if(this._data.f_skintype == 1){
                this.lab_js.text = this._data.f_p1 + "星 解锁";
            }
        }
    }
}