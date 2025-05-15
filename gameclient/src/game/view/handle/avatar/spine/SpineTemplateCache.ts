import { regOBJ } from "../../../../../frame/util/func";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { SpineTemplet_3_8_v1 } from "../SpineTemplet_3_8_v1";
// import { V38_TemplateListCache, V38_TemplateNode } from "./V38_TemplateListCache";
export enum ESpineTemplateType{
    Normal = 1,
    Ver_3_8 = 2,
}
let GID:number = 0;
export class TemplateCache{
    guid:number;
    url:string;
    temp:Laya.SpineTemplet;
    // v38:V38_TemplateNode;

    skel:Laya.SpineSkeleton;
    set used(v){
        this._used = v;
    }
    get used(){
        return this._used;
    }
    private _used:boolean;
    time_str:string="";
    private that;
    private func:Function;
    load(url,that,func:Function,_clsType:number){
        this.url = url;
        this.that = that;
        this.func = func;

        
        // _templet改成对象池
        let _templet:Laya.SpineTemplet;
        switch(_clsType){
            case ESpineTemplateType.Normal:
                _templet = new Laya.SpineTemplet(Laya.SpineVersion.v3_8);
                break;
            case ESpineTemplateType.Ver_3_8:
                _templet = new SpineTemplet_3_8_v1();
                break;
        }
        this.temp = _templet;
        _templet.once(Laya.Event.COMPLETE, this, this.onTempCallater);
        _templet.loadAni(url);
        
        //V38_TemplateListCache.Ins.loadAni(this.url,this,this.onTempCallater,_clsType);
    }
    // private onTemplateComplete(){
    // Laya.timer.callLater(this,this.onTempCallater);
    // this.onTempCallater();
    // }
    private onTempCallater(){
        /*
        _node:V38_TemplateNode  //temp:Laya.SpineTemplet
        if(!(_node instanceof V38_TemplateNode)){
            LogSys.Error("_node is not V38_TemplateNode!");
            return;
        }
        this.v38 = _node;
        this.temp = _node.template;
        */
        this.used = true;
        let l1 = SpineTemplateCache.Ins.tempList;
        this.skel = this.temp.buildArmature();//构建骨骼对象
        this.skel.name = GID.toString();
        /*
        if(_node.skelList.indexOf(this.skel)!=-1){
            LogSys.Error("is already exist skel:" + this.skel.name);
        }
        _node.skelList.push(this.skel);
        */
        debug && (this.time_str = TimeUtil.serverTimeOutStr + " ");
        this.guid = GID;
        GID++;        
        l1.push(this);

        LogSys.Warn("new..." + this.url + " now list len is " + l1.length + " guid:" + this.guid);
        DebugUtil.drawCross(this.skel,0,0,30,"#ff00ff");
        this.func.call(this.that,this);
    }

    toString(){
        return `guid ${this.guid} used:${this.used?"true ":"false"} ${this.url}  ${this.time_str||""} skel name is [${this.skel.name}]`;
    }

    /**销毁 */
    destroy(){
        this.skel.stop();
        this.skel.destroy();
        this.temp.destroy();//.............替换为对象池之后不用处理
        // V38_TemplateListCache.Ins.free(this.temp,this.skel);
    }
}


/**spine数据对象池 */
export class SpineTemplateCache implements ISpineRes{
    tempList:TemplateCache[] = [];
    private static _ins: SpineTemplateCache;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new SpineTemplateCache();
        }
        return this._ins;
    }

    private onLaterTemp(that:any,func:Function,cell:TemplateCache){
        LogSys.Warn("SpineTemplateCache use cache len:"+this.tempList.length+" url is " + cell.url + " guid:" + cell.guid);
        cell.used = true;
        func.call(that,cell);
    }
    getTemp(url:string,that:any,func:Function,_cls:any){
        // let temp:Laya.SpineTemplet;
        for(let i = 0;i < this.tempList.length;i++){
            let cell = this.tempList[i];
            if(!cell.skel){
                LogSys.Error("check: " + cell.url);
            }
            if (cell.skel && cell.url == url && cell.used == false) {
                // cell.used = true;
                // func.call(that,cell);
                // Laya.timer.callLater(that,func,[cell]);
                // Laya.timer.callLater(this,this.onLaterTemp,[that,func,cell])
                /*
                if(cell.v38.skelList.indexOf(cell.skel)!=-1){
                    LogSys.Error("skel is Exist!!! "+cell.skel.name);
                }
                cell.v38.skelList.push(cell.skel);
                */
                this.onLaterTemp(that,func,cell);
                return;
            }
        }
        
        let item = new TemplateCache();
        item.load(url,that,func,_cls);
    }

    free(_skel:Laya.SpineSkeleton){
        for(let i =  0;i < this.tempList.length;i++){
            let  cell = this.tempList[i];
            if(_skel == cell.skel){
                if(cell.used == false){
                    LogSys.Error("check it...");
                }
                // cell.v38.delBySkel(cell.skel);
                cell.skel.removeSelf();
                cell.used = false;
                LogSys.Warn("SpineTemplateCache free succeed " + cell.toString());
                return;
            }
        }
        LogSys.Error("SpineTemplateCache not find _skel!");
    }

    /**释放未使用的资源 */
    GC(){
        Laya.timer.callLater(this,this.laterGC);
    }

    private laterGC(){
        LogSys.Log("start GC");
        let l = [];
        let nl = [];
        for(let i =  0;i < this.tempList.length;i++){
            let  cell = this.tempList[i];
            if(!cell.used){
                l.push(cell);
            }else{
                nl.push(cell);
            }
        }
        while(l.length > 0){
            let cell:TemplateCache = l.shift();
            LogSys.Warn("GC:" + cell.toString());
            cell.destroy();
        }
        this.tempList = nl;

        // V38_TemplateListCache.Ins.GC();
        // Laya.Resource.destroyUnusedResources();
    }
}
regOBJ("spineRes",SpineTemplateCache.Ins);