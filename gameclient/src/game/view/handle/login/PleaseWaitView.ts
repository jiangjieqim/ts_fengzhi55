import {ViewBase} from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { EPageType } from "../../../common/defines/EnumDefine";

export class PleaseWaitView extends ViewBase{
    // protected autoFree:boolean = true;
    public PageType: EPageType = EPageType.None;
    private _ui:ui.views.main.ui_game_maskUI;
    protected checkGuide:boolean = false;
    private readonly mWidth:number = 750;
    private readonly mHeight:number = 1630;
    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_game_maskUI();
            this._ui.bg.skin = "";
            this._ui.bg.width = this.mWidth;
            this._ui.bg.height = this.mHeight;
            // this._ui.bg.graphics.drawRect(0,0,this.mWidth,this.mHeight,"#000000");
            // this._ui.bg.alpha = 0.01;
            this._ui.bg.on(Laya.Event.CLICK,this,this.onClickHandler);
        }
    }
    private onClickHandler(){

    }
    protected onExit() {
        this.clearTime();
    }

    private clearTime(){
        Laya.timer.clear(this,this.updateAnim);
        Laya.timer.clear(this,this.Close);
    }

    protected onAddLoadRes() {
        // this.addRes("static/jh.png",Laya.Loader.IMAGE);
        this.addAtlas("loginnew1.atlas");
    }
    protected onAddEventListener() {   
    }

    protected onEnter() {
    
    }
    protected onInit() {
        if(this.Data){
            Laya.timer.once(5000,this,this.Close);
        }
        this.updateAnim();
    }
    private index:number = 1;
    private readonly mTime:number = 500;
    private updateAnim(){
        // console.log("***",this.index);
        let str:string = "";
        for(let i = 0;i < this.index;i++){
            str+=".";
        }
        // this._ui.tf.text = "请稍等"+str;
        this._ui.tf.text = "";
        this.index++;
        if(this.index>3){
            this.index = 0;
        }
        this._ui.juhua.rotation+=10;
        Laya.timer.once(this.mTime,this,this.updateAnim);
        
    }
}