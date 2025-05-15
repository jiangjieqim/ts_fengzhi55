import { ui } from "../../../ui/layaMaxUI";

export class CheckBox2Ctl{
    private skin:ui.views.main.ui_checkbox_02UI;
    private _sel:boolean = false;
    public selectHander:Laya.Handler;

    constructor(skin:ui.views.main.ui_checkbox_02UI,label:string=""){
        this.skin = skin;
        this.skin.on(Laya.Event.CLICK,this,this.onClickHander);
        this.selected = this._sel;
        this.skin.tf.text = label;
    }

    private onClickHander(){
        this.selected = !this.selected;
        if (this.selectHander) {
            this.selectHander.run();
        }
    }

    public set selected(v) {
        this._sel = v;
        if (v) {
            this.skin.kaiimg.x = 37;
            this.skin.kai.text = "开";
            this.skin.kai.x = 13;
        } else {
            this.skin.kaiimg.x = 2;
            this.skin.kai.text = "关";
            this.skin.kai.x = 39;
        }
    }

    public get selected(){
        return this._sel;
    }
}