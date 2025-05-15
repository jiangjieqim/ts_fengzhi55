import { ui } from "../../../../../ui/layaMaxUI";

export class SlotViewCtl{
    private img:Laya.Image;
    private _skin:ui.views.common.ui_slotviewUI;
    constructor(skin:ui.views.common.ui_slotviewUI){
        this._skin = skin;
        this.img =skin.img;
    }
    public set skin(v:string){
        this._skin.img.once(Laya.Event.LOADED,this,this.onImgComplete);
        this._skin.img.skin = v;
    }

    private onImgComplete(){
        let img:Laya.Image = this.img;
        if(img.width > img.height){
            let _s = this._skin.width/img.width;
            img.scaleX = img.scaleY = _s;
        }else{
            let _s = this._skin.height/img.height;
            img.scaleX = img.scaleY = _s;
        }
    }
}