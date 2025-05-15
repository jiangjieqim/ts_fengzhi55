import { LabelUtil } from "../../../../frame/view/LabelUtil";
import { MProgressSkin } from "../../../../frame/view/MProgressSkin";
import { AvatarView } from "./AvatarView";
/**debug调试AvatarView */
export class HeroDebugView extends Laya.Sprite {
    private label: Laya.Label;
    public avatar: AvatarView;

    private progress: MProgressSkin;
    rate:number = 1;
    constructor() {
        super();
        Laya.timer.frameLoop(1, this, this.onLoop);
        let progress: MProgressSkin = new MProgressSkin();
        this.addChild(progress);
        this.progress = progress;
        this.label = LabelUtil.create();
        this.addChild(this.label);
    }
    private onLoop() {
        if (this.avatar) {
            let spine = this.avatar.coreSpine;
            if (spine && spine.skeleton) {
                let v = spine.skeleton['_playbackRate'];
                this.label.text = spine.anim + "--" + (spine.currentPlayTime/v).toFixed(2) + "/" + ((spine.duration / this.rate)/v).toFixed(2);
                let pv:number = spine.currentPlayTime / (spine.duration/this.rate);
                if(pv > 1) pv = 1;
                this.progress.value = pv;
            }
        }
    }
}


export class DebugShowLabel{

    private static _ins:DebugShowLabel;
    public static get Ins(){
        if(!this._ins){
            this._ins = new DebugShowLabel();
        }
        return this._ins;
    }
    private _label:Laya.Label;
    private str:string = "";
    constructor(){
        this._label = LabelUtil.create();
        this._label.bgColor = "#777777";
        Laya.timer.frameLoop(1,this,this.onLoop);
    }

    private onLoop(){
        if(this._label){
           Laya.stage.addChild(this._label); 
        }
        this._label.text = this.str;
    }

    public setText(v:string){
        this.str = v;
    }
}