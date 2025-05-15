import { ui } from "../../../../../../ui/layaMaxUI";

export class FuJiangStarCtl{
    protected _ui:ui.views.fujiang.ui_starUI;
    private starNum:number;
    private curW:number;
    protected readonly MAX_STAR:number = 5;
    constructor(skin:ui.views.fujiang.ui_starUI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){
        
    }

    private onRemove(){
        
    }

    public setStar(lv:number){
        this.starNum  = 0;
        this.curW = 0;
        let skin = Math.ceil(lv/5);
        let v = lv % this.MAX_STAR;
        if(v == 0 && lv > 0){
            v = this.MAX_STAR;
        }
        for (let i: number = 1; i < this.MAX_STAR + 1; i++) {
            let starSkin:Laya.Image = this._ui["img" + i];

            if(v >= i){
                starSkin.visible = true;
                starSkin.skin = `remote/common/base/start${skin}.png`;
                this.starNum++;
                this.curW = starSkin.x + starSkin.width;
            }else{
                starSkin.visible = false;
            }
        }
    }

    public centerX(offsetX:number = 0){
        this._ui.x = offsetX - (this._ui.width / this.MAX_STAR) * this.starNum / 2;
    }

    public centerX2(){
        this._ui.x = (this._ui.parent as Laya.Sprite).width/2 -  this.curW/2*this._ui.scaleX;
    }
}