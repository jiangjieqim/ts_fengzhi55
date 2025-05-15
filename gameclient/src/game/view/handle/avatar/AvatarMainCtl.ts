import { ZuoQiEvent } from "../zuoqi/vos/ZuoQiEvent";
import { ZuoQiModel } from "../zuoqi/ZuoqiModel";
import { AvatarFactory } from "./AvatarFactory";
import { AvatarMainView } from "./AvatarMainView";

export class AvatarMainCtl implements IAvatarMainCtl{
    con:Laya.Sprite;
    private avatar:AvatarMainView;
    private initCallBack:Laya.Handler;
    constructor(){
    }

    private get rideModel(){
        return ZuoQiModel.Ins;
    }
    /**创建 */
    create(_initCallBack:Laya.Handler){
        this.free();
        this.rideModel.once(ZuoQiEvent.InitRide,this,this.onRideCreate);
        this.avatar = AvatarFactory.getStandHorseMainAvatar();
        this.con.addChild(this.avatar);
        this.initCallBack = _initCallBack;
        this.initCallBack && this.initCallBack.run();  
    }
    private disposeAvatar(){
        if(this.avatar){
            this.avatar.dispose();
        }
        this.avatar = null;
    }
    private onRideCreate(){
        // this.free();
        Laya.timer.callLater(this,this.init);
    }

    private init(){
        this.create(this.initCallBack);
    }

    /**获取avatar */
    get mAvatar(){
        return this.avatar;
    }
    /**释放avatar */
    free(){
        this.disposeAvatar();
        this.rideModel.off(ZuoQiEvent.InitRide,this,this.onRideCreate);
    }
}