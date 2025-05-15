import { GameConfig } from "../../../../GameConfig";
import { ESpineTemplateType, SpineTemplateCache, TemplateCache } from "./spine/SpineTemplateCache";
import { SpineTemplet_3_8_v1 } from "./SpineTemplet_3_8_v1";

export class SmallAnimSpine{
//  extends Laya.EventDispatcher{
    private readonly useCache:boolean = GameConfig.spineCache;//使用缓存
    private isLoading:boolean = false;

	url:string;//.skel链接

    public templet:SpineTemplet_3_8_v1;

    public skeleton:Laya.SpineSkeleton;
	private that;
	private callBack:Function;
    constructor(url:string,that,callBack:Function){
		// super();
		this.that = that;
		this.callBack = callBack;
		this.load(url);
	}

	public dispose(){
        this.isLoading = false;
        if (this.useCache) {
			// if(this.templet){
			if(this.skeleton){
				spineRes.free(this.skeleton);
			}
		} else {
            if(this.skeleton){
                this.skeleton.stop();
                this.skeleton.destroy();
            }
            this.templet.destroy();
        }

        this.templet = null;
        this.skeleton = null;
	}

	private load(url:string){

        if(this.isLoading){
			return;
		}

        this.url = url;
        this.isLoading = true;

		// this.templet = new SpineTemplet_3_8_v1(); 
		// this.templet.loadAni(url);
		// this.templet.once(Laya.Event.COMPLETE, this, this.parseComplete);
		// this.templet.once(Laya.Event.ERROR, this, this.onError)
	
        if(this.useCache){
			SpineTemplateCache.Ins.getTemp(url,this,this.onLoadFinish,ESpineTemplateType.Ver_3_8);
		}else{
			let _templet:SpineTemplet_3_8_v1 = new SpineTemplet_3_8_v1();
			this.templet = _templet;
			_templet.once(Laya.Event.COMPLETE, this, this.onTemplateComplete);
			_templet.loadAni(url);
		}
    }
    private onTemplateComplete() {
		Laya.timer.callLater(this,this.onLoadFinish);
    }
    private onLoadFinish(cache:TemplateCache){
        let skel: Laya.SpineSkeleton
		if(cache){
        	skel = cache.skel;
			this.templet = cache.temp as any;
		}else{
			if(this.templet){
				skel = this.templet.buildArmature();
			}
		}
		if(!this.templet){
            return;
        }
        this.skeleton = skel;

		// if(!this.hasListener(Laya.Event.COMPLETE)){
		// 	LogSys.Error(`${this.url} is not has COMPLETE!`);
		// }
        // this.event(Laya.Event.COMPLETE);
		if(this.that){
			this.callBack.call(this.that,this);
			this.that = null;
			this.callBack = null;
		}
	}

    // private parseComplete(): void {
    //     this.skeleton = this.templet.buildArmature();
	// 	this.event(Laya.Event.COMPLETE);
    // }

	/**当前动作的总时间*/
	public get duration(){
		if(this.skeleton){
			return this.skeleton['_duration'];
		}
		return 0;
	}
	/**当前播放所在的的时间(秒)*/
	public get currentPlayTime():number{
		if(this.skeleton){
			return this.skeleton["currentPlayTime"];
		}
		return 0;
	}

	public set currentTime(v:number){
		// v = this.checkCurrentTtime(v);
		if(this.skeleton){
			// this.skeleton.
			this.skeleton.currentTime = v * 1000;
		}
	}
}