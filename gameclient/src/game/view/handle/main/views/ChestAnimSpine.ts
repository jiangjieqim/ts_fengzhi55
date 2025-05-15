import { Frame } from "../../../../audio/AudioMgr";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { DrawCallConfig } from "../../../../DrawCallConfig";
import { E } from "../../../../G";
import { Sell_revc, stCellValue } from "../../../../network/protocols/BaseProto";
// import { SpineFontTexture } from "../../avatar/ctl/SpineFontTexture";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { EAnimEvent } from "../../avatar/vos/EAvatarAnim";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { ECellType, EChestAnimStatus } from "../vos/ECellType";
import { ChestAnimBaseView } from "./ChestAnimBaseView";
import { Sell2Spine } from "./Sell2Spine";
/*
获得奖励
D:\Project1\UI 切图\任务完成

0 开启状态中 循环播放
1 开启获得了稀有度1的武器 播放一次
2 开启获得了稀有度2的武器 播放一次
3 开启获得了稀有度3的武器 播放一次
4 开启获得了稀有度4的武器 播放一次
5 开启获得了稀有度5的武器 播放一次
6 开启获得了稀有度6的武器 播放一次
7 关闭状态中 循环播放
8 由开启状态变成关闭状态 播放一次

*/

export enum EChestSpineAnim {
    Open = 0,//打开状态动画    idle

    Qua1 = 1,//稀有度1 动画 1466.7
    Qua2 = 2,//稀有度2 动画 1900.0
    Qua3 = 3,//稀有度3 动画 2233.3
    Qua4 = 4,//稀有度4 动画 2766.7
    Qua5 = 5,//稀有度5 动画 3200.0
    Qua6 = 6,//稀有度6 动画 3633.3

    Close = 7,//关闭状态动画 循环播放 idle

    CloseEnd = 8,//由开启状态变成关闭状态


    // 9 开启获得了稀有度7的武器 播放一次
    Qua7 = 9,

    // 10 开启获得了稀有度8的武器 播放一次
    Qua8 = 10,

    // 11 开启获得了稀有度9的武器 播放一次
    Qua9 = 11,


    // 稀有度10
    Qua10 = 12,
    // 稀有度11
    Qua11 = 13,
    // 稀有度12
    Qua12 = 14,
    // 稀有度13
    Qua13 = 15,
}

export class ChestAnimSpine extends ChestAnimBaseView{
    private sellEffect:SimpleEffect;
    public container:Laya.Sprite;
    protected offsetY:number = 0;
    private model:MainModel;
    private _animCtl:Sell2Spine;
    public animVal:number = 0;//当前的动作值
    url:string;
    constructor(container:Laya.Sprite,index:number){
        super();
        this.model = MainModel.Ins;
        // this.offsetY = -25;
        this.container = container;
        // this.anim.load(`o/spine/box2/box`);
        this.url = MainModel.Ins.animSettingList[index].spineurl;
        this.anim.load(this.url);
        this.anim.once(Laya.Event.COMPLETE,this,this.onInit);
        this.model.on(MainEvent.SellSucceed,this,this.onSellSucceed);
    }

    private onAvatarLabel(e){
        let animEvent:string = e.name;
        if(animEvent == EAnimEvent.Drum){
            E.AudioMgr.PlaySound1("drum.mp3");
        }
        LogSys.Warn("animEvent:"+animEvent + " index:" + this.anim.curIndex);
    }

    private getVal(l:stCellValue[],type:ECellType){
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.id == type){
                return cell.count;
            }
        }
    }
    private onSellSucceed(data:Sell_revc){
        if(data.errorID == 0){
            this._animCtl.boxSell(
                            this.getVal(data.itemList,ECellType.EXP),
                            this.getVal(data.itemList,ECellType.COPPER_MONEY));

            if(this.sellEffect){
                this.sellEffect.play();
            }
        }
    }

    private getAnim(qua:number){

        switch(qua){
            case 1:     return EChestSpineAnim.Qua1;
            case 2:     return EChestSpineAnim.Qua2;
            case 3:     return EChestSpineAnim.Qua3;
            case 4:     return EChestSpineAnim.Qua4;
            case 5:     return EChestSpineAnim.Qua5;
            case 6:     return EChestSpineAnim.Qua6;
            case 7:     return EChestSpineAnim.Qua7;
            case 8:     return EChestSpineAnim.Qua8;
            case 9:     return EChestSpineAnim.Qua9;
            case 10:     return EChestSpineAnim.Qua10;
            case 11:     return EChestSpineAnim.Qua11;
            case 12:     return EChestSpineAnim.Qua12;
            case 13:     return EChestSpineAnim.Qua13;
        }
        return EChestSpineAnim.Qua13;
    }

    /**当前动作播放的时间*/
    public get duration(){
        if(this.anim && this.anim.avatar){
            return this.anim.avatar.duration;
        }
        return 0;
    }
    
    protected onInit(){
        this.anim.container.y = this.offsetY;
        this.anim.avatar.skeleton.on(Laya.Event.LABEL,this,this.onAvatarLabel);

        if(!DrawCallConfig.disable_spine){
            this.container.addChild(this.anim.container);
        }

        let _animCtl = new Sell2Spine();
        _animCtl.load(`o/spine/sell2/sell2.skel`);
        _animCtl.setPos(this.container);
        // _animCtl.once(Laya.Event.COMPLETE,this,this.onCompleteHandler);
        this._animCtl = _animCtl;
        this.Stop();
    }

    // private onCompleteHandler(){
    // this.container.addChild(this._animCtl.baseSkel);
    // }

    public Stop(){
        this.onAnimEnd(true);
    }

    protected onAnimEnd(isInit:boolean=false){
        this.updateAnim(isInit);
        if(this.endHandler){
            this.endHandler.run();
        }
    }

    public updateAnim(isInit:boolean = false){
        if(this.mStatus == EChestAnimStatus.Open){
            this.anim.play(EChestSpineAnim.Open,true);
        }else{
            if(isInit){
                this.onCloseEnd();
            } else {
                if(initConfig.noBoxAnim){
                    this.onCloseEnd();
                }else{
                    this.end1();
                }
            }
        }
    }

    private end1(){
        // console.log("cur index:==========>"+this.anim.curIndex,(this.anim.avatar.currentPlayTime / this.anim.avatar.duration).toFixed(2));
        
        if(this.anim.curIndex == EChestSpineAnim.Open){
            this.anim.playOnce(EChestSpineAnim.CloseEnd, this, this.onCloseEnd);
        }else{
            this.onCloseEnd();
        }
    }

    private onCloseEnd(){
        this.anim.play(EChestSpineAnim.Close,true);
    }
    /**
     * 是否在开箱子中
     */
    public get isPlaying(){
        if(this.anim){
            if(this.anim.curIndex == EChestSpineAnim.CloseEnd || 
                this.anim.curIndex == EChestSpineAnim.Close ||
                this.anim.curIndex == EChestSpineAnim.Open)
            {
                return false;
            }
            // return this.anim.isPlaying;
            return true;
        }
        return false;
    }

     /**
     * @param mEndAnim 是否播放动画的停留在最后一帧
     */
    public Play(_endHandler?:Laya.Handler,qua:number = 1){
        this.endHandler = _endHandler;
        if(this.isPlaying){
            return;
        }
        let anim:number = this.getAnim(qua);
        this.animVal = anim;

        if(anim >= EChestSpineAnim.Qua10 && E.ViewMgr.IsOpen(EViewType.Main)){
            MainModel.Ins.mainView.playFullEffect();//全屏特效
        }
        LogSys.Log("play index:"+anim);
        this.anim.playOnce(anim,this,this.onAnimEnd);
    }
}