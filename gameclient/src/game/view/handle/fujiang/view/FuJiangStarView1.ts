import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangListProxy } from "../proxy/FuJiangProxy";

export class FuJiangStarView1 extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangStarView1UI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangStarView1UI;

            this._ui.list.itemRender = ui.views.fujiang.ui_fujiangItem11UI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.renderhandler);

            ButtonCtl.Create(this._ui.sp,new Laya.Handler(this,this.onSpClick),false);
        }
    }

    private onSpClick(){
        this.Close();
    }

    private renderhandler(item:ui.views.fujiang.ui_fujiangItem11UI){
        let cfg:Configs.t_Chief_List_dat = item.dataSource.cfg;
        item.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(cfg.f_cheifQuality);
        item.img.skin = FuJiangListProxy.Ins.getFuJiangSkin(cfg.f_cheifid);
        item.lab_name.text = cfg.f_cheif;
        item.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(cfg.f_cheifQuality).f_chiefcolor;
        item.lab.text = item.dataSource.nowNum + "";
        item.lab1.text = parseInt(item.dataSource.nowNum) + parseInt(item.dataSource.val) + "";
    }

    protected onInit(): void {
        this._ui.list.array = FuJiangModel.Ins.oldStarArr;
    }

    protected onExit(): void {
        
    }
}