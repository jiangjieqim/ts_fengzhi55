import { ButtonCtl } from "../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { E } from "../../../G";
import { MainModel } from "../main/model/MainModel";
import { ItemSlot3Script } from "./ItemSlot3Script";
class ItemNotEnoughCell extends ui.views.main.maincell.ui_item_not_enough_cellUI{
    private btnCtl:ButtonCtl;
    private type:number;
    private itemId:number;
    constructor(){
        super();
        this.on(Laya.Event.DISPLAY,this,this.onDisplay);
        this.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
    }
    private onDisplay(){
        this.btnCtl = ButtonCtl.CreateBtn(this.btn1,this,this.onClickHandler);
    }
    private onUnDisplay(){
        this.btnCtl.dispose();
    }
    private onClickHandler(){
        LogSys.Log(`type: ${this.type} itemId: ${this.itemId}`);
        MainModel.Ins.notEnough.goto(this.type,this.itemId);
    }
    setData(type:number,itemId:number){
        let arr = E.getLang('itemnotenoughlist').split("|");
        this.nametf.text = arr[type-1];
        this.type = type;
        this.itemId = itemId;
    }
}
export class ItemNotEnoughView extends ViewBase{
    protected autoFree:boolean = true;
    protected mMask:boolean = true;
    private itemId:number;
    private _ui:ui.views.main.ui_item_notenoughUI;
    private _slot:ItemSlot3Script;
    protected onAddLoadRes(): void {
        // throw new Error("Method not implemented.");
    }
    protected onExit(): void {
        if(this._slot){
            this._slot.destroy();
            this._slot=null;
        }else{
            LogSys.Warn(`your already del this Component.`);
        }
    }
    protected onFirstInit(): void {
        // throw new Error("Method not implemented.");
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_item_notenoughUI();
            this.bindClose(this._ui.closeBtn);
            this._slot = this._ui.slot.addComponent(ItemSlot3Script);
            this._ui.list1.itemRender = ItemNotEnoughCell;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemHander);
        }
    }
    private onItemHander(cell:ItemNotEnoughCell,index:number){
        let type:number = cell.dataSource;
        cell.setData(type,this.itemId);
    }
    protected onInit(): void {

        // throw new Error("Method not implemented.");
        this.itemId = this.Data || 9;
        this._slot.setItemId(this.itemId);
        this._slot.setCount(1);

        this._ui.list1.array = MainModel.Ins.notEnough.getByItem(this.itemId);
    }
}