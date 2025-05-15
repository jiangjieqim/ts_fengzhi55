import { DebugUtil } from "../../../../../../frame/util/DebugUtil";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { MainView } from "../../MainView";
import { EFuncDef } from "../../model/EFuncDef";
import { MainModel } from "../../model/MainModel";





class RotCtl{
    public isVisible(){
        return this.img.visible;
    }

    public get isOpen(){
        return 
    }

    private tween:Laya.Tween;
    private img:Laya.Image;
    private readonly useTime:number = 200;
    // private tf:Laya.Label;
    constructor(img:Laya.Image){
        // this.tf = tf;
        img.on(Laya.Event.CLICK,this,this.onClickHandler);
        this.img = img;
    }
    public set vis(v:boolean){
        // this.tf.visible = v;
        this.img.visible = v;
    }
    private onClickHandler(){
        if(!this.tween){
            this.tween = new Laya.Tween();
        }
        let mainView:MainView = E.ViewMgr.Get(EViewType.Main) as MainView;

        mainView.setLayerEvt(true);

        if(this.img.rotation == 0){
            //展开
            mainView.setList(true);
            if (window['Sygame']) {
                // window['Sygame'].syGetSubscribeSystem(['SYS_MSG_TYPE_WHATS_NEW']);
                // E.sdk.getSubscribe(['SYS_MSG_TYPE_WHATS_NEW']);
            }
        }else if(this.img.rotation == -90){
            //收起
            mainView.setList(false);
        }
    }
}


interface ILieBiaoSkin extends Laya.Sprite{
    botbtn: Laya.Image;
    liebiao_red: Laya.Image;
    // botlistTf: Laya.Label;
}

export class LieBiaoBtn {
    private rot:RotCtl;

    // constructor(skin:ILieBiaoSkin){
    // }
    skin:ILieBiaoSkin;

    // public get tf(){
    // return this.skin.botlistTf;
    // }

    init(){
        DebugUtil.draw(this.skin);
        this.rot = new RotCtl(this.skin.botbtn);
    }

    play(v:boolean){
        if(v){
            //展开
            // this.tf.text = "收起"
            Laya.Tween.to(this.skin.botbtn,{rotation:-90},200);
        }else if(!v){
            //隐藏
            // this.tf.text = "列表"
            Laya.Tween.to(this.skin.botbtn,{rotation:0},200);
        }
    }
    updateRed(){
        let model = MainModel.Ins;
        this.rot.vis = !MainModel.Ins.verify;
        if(this.rot.isVisible()){
            if( model.bMailRed || 
                model.boxSettingRed || 
                model.getHasRed(EFuncDef.GameCirle) || 
                model.isVipKFRedTip()) 
                // || model.yxqRed)
            {
                this.skin.liebiao_red.visible = true;
            }else{
                this.skin.liebiao_red.visible = false;
            }
        }else{
            this.skin.liebiao_red.visible = false;
        }
    }
}