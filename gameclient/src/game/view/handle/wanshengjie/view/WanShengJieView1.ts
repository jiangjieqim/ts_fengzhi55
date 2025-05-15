import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { MainModel } from "../../main/model/MainModel";

export class WanShengJieView1 extends ViewBase{
    private _ui:ui.views.wanshengjie.ui_wanshengjieView1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas("wanshengjie.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wanshengjie.ui_wanshengjieView1UI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));
        }
    }

    private onBtnClick(){
        this._type = 1;
        this.Close();
    }

    private _type:number;
    protected onInit(): void {
        this._type = 0;
    }

    protected onExit(): void {
        if(this._type == 0){
            MainModel.Ins.isOpenAnyPackage();
        }else{
            E.ViewMgr.Open(EViewType.WanShengJieView);
        }
    }
}