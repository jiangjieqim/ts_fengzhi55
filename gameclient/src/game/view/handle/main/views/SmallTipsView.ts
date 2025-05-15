import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EPageType } from "../../../../common/defines/EnumDefine";
import { ISmallTips } from "../interface/Interface";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
/**小tips */
export class SmallTipsView extends ViewBase {
    public PageType: EPageType = EPageType.None;
    private _data: ISmallTips;
    private _ui: ui.views.main.ui_txt_tipsUI;
    // protected mMask:boolean = true;
    protected maskAlpha = 0.0;
    protected _tempPos:Laya.Point;
    private oldY:number = 0;
    protected onFirstInit() {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.main.ui_txt_tipsUI();
            this._ui.on(Laya.Event.CLICK,this,this.onImgClick);//添加阻挡
            this.oldY = this._ui.desc.y;
        }
    }

    private onImgClick(){

    }

    protected onExit() {
        Laya.stage.off(Laya.Event.CLICK,this,this.onStageClick);
        // MainModel.Ins.off(MainEvent.MainViewLayerChange, this, this.onLayerChange);
    }

    protected onAddLoadRes() {
    }

    protected onAddEventListener() {

    }

    protected onEnter() {

    }

    public setData(_data: ISmallTips){
        this._data = _data;
        // let _data: ISmallTips = this.Data;
        this._ui.desc.text = _data.content;
        this._ui.tf.text = _data.title;
        let offset: number = 20;
        let t:Laya.Sprite = _data.target;

        if(this._data.title == ""){
            this._ui.desc.y = 11;
        }else{
            this._ui.desc.y = this.oldY;
        }

        this._ui.img.height = this._ui.desc.textField.height + this._ui.desc.y + offset;
        this._ui.height = this._ui.img.height;
        let pos = (t.parent as Laya.Sprite).localToGlobal(new Laya.Point((t as Laya.Sprite).x,(t as Laya.Sprite).y));
        this._tempPos = pos;
        this.SetCenter();
        //Test Code
        // let item = new Laya.Sprite();
        // this._ui.addChild(item);
        // item.graphics.drawRect(0,0,this._ui.width,this._ui.height,null,"#ff0000",1);
    }

    protected onInit() {
        this.UpdateView();
        this.setData(this.Data);
        Laya.stage.on(Laya.Event.CLICK,this,this.onStageClick);
        // MainModel.Ins.on(MainEvent.MainViewLayerChange, this, this.onLayerChange);
    }

    // private onLayerChange(){
    // }

    private onStageClick(e:Laya.Event){
        // this.Close();
        // console.log(e);
        if(this.IsShow()){
            this.Close();
        }
    }
    private spr:Laya.Sprite;
    protected SetCenter(): void {
        if(!this._tempPos){
            return;
        }
        let offsetY:number = 20;

        if(this._tempPos.x + this._ui.width > Laya.stage.width){
            this._tempPos.x = Laya.stage.width - this._ui.width;
        }

        if(this._data.algin == "rightbottom"){
            //右下方
            this._ui.container.x = -this._ui.width + this._tempPos.x + this._data.target.width;
            this._ui.container.y = this._tempPos.y + this._ui.height + offsetY;
        }else if(this._data.algin == "rightbottom1"){
            this._ui.container.x = -this._ui.width + this._tempPos.x + this._data.target.width;
            this._ui.container.y = this._tempPos.y + this._ui.height - 70;
        }else{
            this._ui.container.x = this._tempPos.x;
            let yy = this._tempPos.y - this._ui.height - offsetY;
            if( yy < 0){
                this._ui.container.y = 0;
            }else{
                this._ui.container.y = yy;
            }
        }

        this._ui.hitArea = new Laya.Rectangle(this._ui.container.x,this._ui.container.y,this._ui.width,this._ui.height);

        // if(debug){
        //     if(!this.spr){
        //         let spr = new Laya.Sprite();
        //         this.spr = spr;
        //     }
        //     let spr = this.spr;
        //     this._ui.addChildAt(spr,0);
        //     spr.graphics.clear();
        //     spr.graphics.drawRect(this._ui.container.x,this._ui.container.y,this._ui.width,this._ui.height,null,"#ff0000",1);
        // }
    }
}