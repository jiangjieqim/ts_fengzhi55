import { LayerMgr } from "../../../../layer/LayerMgr";
import { SimpleEffect } from "../../avatar/SimpleEffect";

export class HeroZhangHeView extends Laya.Sprite {
    private _effect: SimpleEffect;
    private _time:number;
    private autoHide:boolean = true;//自动隐藏
    public play(btn?: Laya.Sprite) {
        // console.log(pos);
        LayerMgr.Ins.subFrameLayer.addChild(this);
        let pos: Laya.Point = (btn.parent as Laya.Sprite).localToGlobal(new Laya.Point(btn.x + btn.width, btn.y + btn.height));
        this.x = pos.x;
        this.y = pos.y;
        this.playCongratulatEffect();
        this.hitArea = new Laya.Rectangle(-this.x, -this.y, Laya.stage.width, Laya.stage.height);
        if(this.autoHide){
            Laya.timer.once(1000,this,this.removeSelf);
        }else{
            this.on(Laya.Event.CLICK, this, this.onClickHandler);
        }
        if(debug){
            this.graphics.clear();
            this.graphics.drawRect(-this.x,-this.y,Laya.stage.width, Laya.stage.height,null,"#ff0000",1);
        }
    }
    private onClickHandler() {
        let sub = Laya.timer.currTimer - this._time;
        if(sub <= 1000){
            return;
        }
        this.off(Laya.Event.CLICK, this, this.onClickHandler);
        this._effect.play(2, false, this, this.onPlayEnd2, null, true);
    }
    private onPlayEnd2() {
        // if(this._effect){
        //     this._effect.dispose();
        //     this._effect = null;
        // }
        this.removeSelf();
    }
    private playCongratulatEffect() {
        if (!this._effect) {
            this._effect = new SimpleEffect(this, "o/spine/herozh/herozh");
        }
        // congratulatEffect.playEndDisplse(0)
        this._effect.play(0, false, this, this.onPlayEnd0, null, true);
    }
    private onPlayEnd0() {
        this._time = Laya.timer.currTimer;
        this._effect.play(1, true, this, null, null, true);//循环
    }


}