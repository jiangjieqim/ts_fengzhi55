import { ui } from "../../../../../../ui/layaMaxUI";

export class QuFuItem extends ui.views.shezhi.ui_qufuItemUI{
    constructor() {
        super();

        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemoved);
    }

    private onAdd(){
        
    }

    private onRemoved(){
       
    }

    public setData(){
        
    }
}