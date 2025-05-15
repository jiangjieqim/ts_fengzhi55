import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangDrawExpProxy, FuJiangDrawRateProxy } from "../proxy/FuJiangProxy";

export class FuJiangGLTip extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangglTipUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {}

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangglTipUI;

            this.bindClose(this._ui.btn_close);
            ButtonCtl.Create(this._ui.btn_l,new Laya.Handler(this,this.onBtnLClick));
            ButtonCtl.Create(this._ui.btn_r,new Laya.Handler(this,this.onBtnRClick));

            this._ui.list.itemRender = ui.views.fujiang.ui_fujiangglItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:ui.views.fujiang.ui_fujiangglItemUI,index:number){
        let cfg = EquipmentQualityProxy.Ins.getByQua(item.dataSource);
        item.lab.text = cfg.f_chiefinfo;
        item.lab.color = "#" + cfg.f_chiefcolor;
        item.img.skin = "remote/fujiang/gl_" + item.dataSource + ".png";
        let arr = FuJiangDrawRateProxy.Ins.getListByLv(this._index + 1);
        let num = arr[index].f_QualityRate;
        item.lab1.text = num / 100 + "%";
    }

    private onBtnLClick(){
        this._index--;
        this.updataView();
    }

    private onBtnRClick(){
        this._index++;
        this.updataView();
    }

    private _index:number;
    protected onInit(): void {
        this._index = FuJiangModel.Ins.drawLevel - 1;
        this.updataView();
    }

    protected onExit(): void {
        
    }

    private updataView(){
        let cfg = FuJiangDrawExpProxy.Ins.List[this._index];
        this._ui.lab_lv.text = cfg.f_drawlevel + "";
        if(this._index <= 0){
            this._index = 0;
            this._ui.btn_l.visible = false;
        }else{
            this._ui.btn_l.visible = true;
        }
        if(this._index >= FuJiangDrawExpProxy.Ins.List.length - 1){
            this._index = FuJiangDrawExpProxy.Ins.List.length - 1;
            this._ui.btn_r.visible = false;
        }else{
            this._ui.btn_r.visible = true;
        }
        this._ui.list.array = [1,4,5,6,8,9];
    }
}