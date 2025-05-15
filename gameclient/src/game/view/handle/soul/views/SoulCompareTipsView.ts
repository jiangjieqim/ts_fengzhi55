import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SoulTipVo } from "../model/ESoulFunc";
import { SoulTipsCtl } from "../model/SoulTipsCtl";
export class SoulCompareVo{
    leftVo:SoulTipVo;
    rightVo:SoulTipVo
}
export class SoulCompareTipsView extends ViewBase{
    private _ui:ui.views.soul.ui_soulcompare_viewUI;
    protected  onAddLoadRes(): void{}
    protected  onExit(): void{}
    protected mMask:boolean = true;
    private leftCtl:SoulTipsCtl;
    private rightCtl:SoulTipsCtl;

    protected  onFirstInit(): void{
        if(!this.UI){
            this.UI = this._ui = new ui.views.soul.ui_soulcompare_viewUI();
            this.leftCtl = new SoulTipsCtl(this._ui.leftitem,this.ViewType);
            this.rightCtl = new SoulTipsCtl(this._ui.rightitem,this.ViewType);
            this.bindClose(this._ui.rightitem.close1);
        }
    }
    protected  onInit(): void{
        let cell:SoulCompareVo = this.Data;
        this.leftCtl.refreshView(cell.leftVo);
        this.rightCtl.refreshView(cell.rightVo);
    }
}