import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { EFuncDef } from "../model/EFuncDef";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { ItemVo } from "../vos/ItemVo";
import { WeiXinPyqCtl } from "./icon/WeiXinPyqCtl";
class GSoltItemView extends ui.views.main.ui_slot_itemUI{
    private _vo:ItemVo;
    constructor(){
        super();
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
        this.tf1.visible = false;
    }
    public setData(vo:ItemVo){
        let _vo:ItemVo = vo;
        this._vo = _vo;
        this.icon.skin = _vo.getIcon();
    }
    private onClickHandler(e:Laya.Event){
        e.stopPropagation();
        MainModel.Ins.showSmallTips(this._vo.getName(),this._vo.getDesc(),this);
    }
}

/**游戏圈 */
export class GameGroupView extends ViewBase {
    private btnCtl:WeiXinPyqCtl;
    protected autoFree = true;
    private _ui:ui.views.shezhi.ui_youxiquan_viewUI;
    protected mMask:boolean = true;
    protected onAddLoadRes(): void {
        this.addAtlas("youxiquan.atlas");
    }
    protected onExit(): void {
        this.btnCtl.onVisible(false);
    }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.shezhi.ui_youxiquan_viewUI();
            this.bindClose(this._ui.close1);
            this._ui.enterBtn.on(Laya.Event.CLICK,this,this.onClickHandler);
            this.btnCtl = new WeiXinPyqCtl();
            this.btnCtl.setSkin(this._ui.enterBtn);
            let str = System_RefreshTimeProxy.Ins.getVal(41);
            ItemViewFactory.renderItemSlots(this._ui.rewardCon,str,10,1,"center",GSoltItemView,"GSoltItemView");
        }
    }
    private onClickHandler(){
        this.Close();
    }
    protected onInit(): void {
        MainModel.Ins.funcSetRed(EFuncDef.GameCirle,false);
        MainModel.Ins.event(MainEvent.MailRed);
    }

    protected onShow(){
        super.onShow();
        this.btnCtl.onVisible(true);
    }
}