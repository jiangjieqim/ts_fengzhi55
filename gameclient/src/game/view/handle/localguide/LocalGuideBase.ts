import { SimpleEffect } from "../avatar/SimpleEffect";
import { LocalYinDaoView1 } from "./LocalYinDaoView1";

export class LocalGuideBase {
    protected _fm: SimpleEffect;

    /**显示手指指引 */
    protected showFinger(arrXY:string[],sp:Laya.Sprite,index:number){
        if(this._fm && this._fm.isLoaded){
            let offX:number = 0;
            let offY:number = 0;
            if(arrXY[0]){
                offX = parseInt(arrXY[0]);
            }
            if(arrXY[1]){
                offY = parseInt(arrXY[1]);
            }
            let xx = (sp.parent as Laya.Sprite).localToGlobal(new Laya.Point(sp.x,sp.y)).x;
            let yy = (sp.parent as Laya.Sprite).localToGlobal(new Laya.Point(sp.x,sp.y)).y;
            let w = sp.width - this._fm.anim.container.width;
            let h = sp.height - this._fm.anim.container.height;
            this._fm.anim.container.x = xx + (w * 0.5) + offX;
            this._fm.anim.container.y = yy + (h * 0.5) + offY;
            this._fm.play(index,true);
        }
    }
    protected removeSp() {
        if (this._fm) {
            this._fm.stop();
        }
    }

    private _ydView:LocalYinDaoView1;
    protected getYinDaoView(){
        if(!this._ydView){
            this._ydView = new LocalYinDaoView1();
        }
        return this._ydView;
    }
}