// import { SmallAnimSpine } from "./spine/BaseSpineCoreSkel";
// import { SmallAnimSpine } from "./SmallAnimSpine";
// import { BaseSpineCoreSkel } from "./spine/BaseSpineCoreSkel";
// import { SmallAnimSpine } from "./spine/BaseSpineCoreSkel";
import { SmallAnimSpine } from "./SmallAnimSpine";
import { AtlasParser, IMSpineRegions } from "./SpineSwitchSkin";

/**
 * 基础Spine
 */
export class BaseAnimSpine extends Laya.EventDispatcher {
    private destroyed:boolean = false;
    private file: string = "";
    public avatar: SmallAnimSpine;
    public curIndex:number;
    private mSetSkin:boolean;//填充方式 填充方式使用在安卓的部分微信小程序中不适用
    /**
     * @param _mSetSkin 是否使用自定义的插槽替换系统
     */
    constructor(_mSetSkin:boolean = true) {
        super();
        this.mSetSkin = _mSetSkin;
    }
    private _needDispose:boolean = false;
    public load(file: string) {
        this.file = file;

        let _resList = [];
        _resList.push(
            { url: `${this.file}.atlas`, type: Laya.Loader.TEXT },
            { url: `${this.file}.skel`, type: Laya.Loader.BUFFER }
        );
        //let tex1 = Laya.loader.getRes(`${this.file}.png`);
        // console.log(">>>>",this.file,tex1);
        // if(!tex1){
        _resList.push({ url: `${this.file}.png`, type: Laya.Loader.IMAGE });
        // }

        Laya.loader.load(_resList,new Laya.Handler(this, this.resComplete));
    }

    public dispose(){
        this.destroyed = true;
        if(this.avatar){
            this.avatar.dispose();
        }else{
            this._needDispose = true;
        }
    }

    private resComplete() {
        // this.avatar = 
        new SmallAnimSpine(`${this.file}.skel`,this,this.fillSpine);
        // this.avatar = avatar;
        // avatar.once(Laya.Event.COMPLETE, this, this.fillSpine);
    }

    public stop(){
        if(this.avatar && this.avatar.skeleton){
            this.avatar.skeleton.stop();
        }
    }

    // public clearStopEvent(){
    //     if(this.avatar && this.avatar.skeleton){
    //         this.avatar.skeleton.offAll(Laya.Event.STOPPED);
    //     }
    // }

    public paused(){
        if(this.avatar && this.avatar.skeleton){
            this.avatar.skeleton.paused();
        }
    }

    private fillSpine(_avatar:SmallAnimSpine) {
        this.avatar = _avatar;
        if(this.mSetSkin){
            // WebGL: INVALID_OPERATION: texSubImage2D: ArrayBufferView not big enough for request
            //  setSubPixels	@	laya.core.js:2883
            /*
            参考https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-data-textures.html
            结果是WebGL中有一种首次创建OpenGL后的模糊设定， 计算机有时在数据为某些特定大小时速度会快一些， 例如一次拷贝2，4 或 8 个字节比一次拷贝 1 个字节要快， WebGL默认使用 4 字节长度，所以它期望每一行数据是多个 4 字节数据（最后一行除外）。
            我们之前的数据每行只有 3 个字节，总共为 6 字节， 但是 WebGL 试图在第一行获取 4 个字节，第二行获取 3 个字节， 总共 7 个字节，所以会出现这样的报错。
            我们可以告诉WebGL一次处理 1 个字节
            const alignment = 1;//有效参数为 1，2，4 和 8.
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border,format, type, data);
            */
            let fileList = AtlasParser.Start(Laya.Loader.getRes(`${this.file}.atlas`));
            let filelist: IMSpineRegions[] = fileList;
            for (let i = 0; i < filelist.length; i++) {
                let reg: IMSpineRegions = filelist[i];
                this.avatar.templet.setSkin(fileList, `${this.file}.png`, reg.name);
            }
        }else{
            // 销毁原纹理?? laya.spine.js 588 destory() 会销毁掉 --->laya.core.js line 19148 load(...)
            let tex: Laya.SpineGLTexture = this.avatar.templet.tex;
            tex.bitmap.destroy();
            let tex1 = Laya.loader.getRes(`${this.file}.png`);
            this.avatar.templet.tex.bitmap = tex1.bitmap;
        }
        if(this._needDispose){
            this.dispose();
            this._needDispose = false;
        }else{
            this.event(Laya.Event.COMPLETE);
        }
    }

    public play(nameOrIndex:number,loop:boolean,force:boolean = true){
        // console.log("play nameOrIndex:"+nameOrIndex);
        this.curIndex = nameOrIndex;
        if(this.avatar && this.avatar.skeleton){
            this.avatar.skeleton.play(nameOrIndex,loop,force);
        }
    }

    public playOnce(nameOrIndex:number,target?,callBack?:Function,args?,force:boolean = true){
        // console.log("playOnce nameOrIndex:"+nameOrIndex);
        this.curIndex = nameOrIndex;
        if (this.avatar && this.avatar.skeleton) {

            if(args && !Array.isArray(args)){
                LogSys.Error(`1 args type is err ` + this.avatar.url);
            }
            this.avatar.skeleton.once(Laya.Event.STOPPED, this,this.onPlayEnd,[target,callBack,args]);
            // this.avatar.skeleton.once(Laya.Event.STOPPED,target,callBack,args); //laya.core--->line 1021
            this.avatar.skeleton.play(nameOrIndex,false,force);
        }
    }

    private onPlayEnd(target,callBack:Function,args){
        if (!this.destroyed && callBack) {
            // callBack.call(target,args ? args[0] : null);
            callBack.apply(target,args);
        }
    }
    
    public get playState(){
        if(this.avatar && this.avatar.skeleton){
            // return this.avatar.skeleton['_currAniName'];
            return this.avatar.skeleton.playState;
        }
        return Laya.SpineSkeleton.stopped;
    }

    public get container(){
        if(this.avatar){
            return this.avatar.skeleton;
        }
    }

    public get animNum(){
        return this.avatar.skeleton.getAnimNum();
    }

    /**
     * 是否在播放
     */
    public get isPlaying(){
        // SpineSkeleton.stopped = 0;
        // SpineSkeleton.paused = 1;
        // SpineSkeleton.playing = 2;
        if(this.avatar && this.avatar.skeleton){
            return this.avatar.skeleton.playState == Laya.SpineSkeleton.playing;
        }
    }
}