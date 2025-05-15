import { SimpleEffect } from "./SimpleEffect";

export class SpineEffectManager {
    private static _ins: SpineEffectManager;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new SpineEffectManager();
        }
        return this._ins;
    }

    /**只播放一次,播发完成销毁 */
    public playOnce(url: string, container: Laya.Sprite, x: number = 0, y: number = 0,index: number = 0) {
        let spine = new SimpleEffect(container, url, x, y);
        spine.playEndDisplse(index);
    }
    
}