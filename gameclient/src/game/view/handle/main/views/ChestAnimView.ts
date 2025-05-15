import {FrameAniUtil} from "../../../../../frame/util/FrameAniUtil";
import { EChestAnimStatus as EChestAnimStatus } from "../vos/ECellType";
import { ChestAnimBaseView } from "./ChestAnimBaseView";



export class ChestAnimView extends ChestAnimBaseView{
    private chest_anim:Laya.Animation;
    /**
     * 当前的宝箱的状态
     */
    // public mStatus:EChestAnimStatus  = EChestAnimStatus.Close;

    protected endHandler:Laya.Handler;
    constructor(container?:Laya.Sprite){
        super();
        if(container){
            this.chest_anim = FrameAniUtil.Create("res/atlas/remote/chest_anim.atlas",new Laya.Handler(this,this.onInit));
            container.addChild(this.chest_anim);
            let p = 0.58*5;
            this.chest_anim.x = -244*p/2;
            this.chest_anim.y = -216*p/2;
            this.chest_anim.scaleX = this.chest_anim.scaleY = p;
            this.chest_anim.interval=1000/20;//每一帧的播放时间(毫秒)
        }
    }

    protected onInit(){
        this.Stop();
    }
    /**
     * @param mEndAnim 是否播放动画的停留在最后一帧
     */
    public Play(_endHandler?:Laya.Handler){
        this.endHandler = _endHandler;
        // this.mEndAnim = mEndAnim;
        if(this.chest_anim.isPlaying){
            return;
        }
        FrameAniUtil.Play(this.chest_anim);
        this.chest_anim.once(Laya.Event.COMPLETE,this,this.onAnimEnd);
    }
    
    public get isPlaying(){
        if(this.chest_anim){
            return this.chest_anim.isPlaying;
        }
        return false;
    }
    protected onAnimEnd(){
        this.chest_anim.gotoAndStop(this.mStatus == EChestAnimStatus.Open ? this.chest_anim.count - 1 : 0);
        if(this.endHandler){
            this.endHandler.run();
        }
    }

    public updateAnim(){
        let _anim:Laya.Animation = this.chest_anim;
        if(this.mStatus == EChestAnimStatus.Open){
            _anim.gotoAndStop(_anim.count - 1);     
        }else{
            _anim.gotoAndStop(0);
        }
    }

    public Stop(){
        this.onAnimEnd();
    }
}