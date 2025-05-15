import { EPageType, EViewType, TweenEase } from "../../game/common/defines/EnumDefine";
import { GameHelp } from "../../game/common/help/GameHelp";
import { LangHelper } from "../../game/common/help/LangHelper";
import { LayerHelper } from "../../game/common/help/LayerHelper";
import { Updater } from "../../game/common/timer/Updater";
import { DrawCallConfig } from "../../game/DrawCallConfig";
import { Callback } from "../../game/event/Callback";
import { EventGroup } from "../../game/event/EventGroup";
import { EventID } from "../../game/event/EventID";
import { EventType } from "../../game/event/EventType";
import { E } from "../../game/G";
import { ELayerType } from "../../game/layer/LayerMgr";
import { ResItemGroup } from "../../game/resouce/ResItemGroup";
import { Path, ResPath } from "../../game/resouce/ResPath";
import { MainEvent } from "../../game/view/handle/main/model/MainEvent";
import { MainModel } from "../../game/view/handle/main/model/MainModel";
import { StringUtil } from "../util/StringUtil";
import { TweenUtil } from "../util/TweenUtil";
import { ButtonCtl } from "./ButtonCtl";
import { DragControl } from "./DragControl";
import { IView } from "./IView";

// export interface ISubBaseView{
//     onDisplay();
//     onUnDisplay();
//     SetLayout();
// }
/*
export class ViewBaseUtil{
    public static BindCloseBtn(view:Laya.View,v:boolean,closeHandler?:Laya.Handler){
        if (view) {
            let obj = view['closeBtn'];
            if (obj && typeof obj == 'object') {
                let btn = obj as Laya.Button;
                if (btn) {
                    if (v) {
                        btn.clickHandler = closeHandler;//new Laya.Handler(this, this.onCloseHandler);
                    } else {
                        btn.clickHandler = null;
                    }
                }
            }
        }
    }

    // public static BindCloseBtnClose(view:Laya.View,v:boolean){
    //     this.BindCloseBtn(view,v,new Laya.Handler(view,view.close));
    // }

    // public static SetLayout(UI:Laya.View){
    //     if (UI != null) {
    //         let spr = UI.parent as Laya.Sprite;
    //         if(spr){
    //             UI.size(spr.width, spr.height);
    //         }
    //         UI.pos(0, 0);
    //     }
    // }
}
*/

/**页面基类
protected  onAddLoadRes(): void{}
protected  onExit(): void{}
protected  onFirstInit(): void{}
protected  onInit(): void{}
*/

// export interface ILayerChange{
    // layerChange();
// }
export abstract class ViewBase implements IView {

    /**是否在UI的0号索引位置添加一个点击关闭蒙版*/
    protected uiBgCloseClick:boolean = false;
    private _bgcloseMask:Laya.Sprite;

    protected btnList:ButtonCtl[] = [];
    private _dragControl: DragControl;
    protected isClearTimer:boolean = true;
    protected autoFree:boolean = false;//自动释放本ui的资源
    /**是否走引导检测 */
    protected checkGuide:boolean = true;
    protected mMask:boolean = false;//是否有遮罩
    protected mMainSnapshot:boolean = false;//是否用截图
    protected mMaskClick:boolean = true;//是否激活mask点击关闭
    protected mClickAnyAreaClose:boolean = false;//点击任意区域关闭界面
    constructor(viewType: EViewType/*, viewPath: string*/,  layerType: ELayerType = ELayerType.frameLayer) {
        this.ViewType = viewType;
        // this.ViewPath = viewPath;
        this.LanguageType = LangHelper.GetView(viewType);
        this.LayerType = layerType;

        this.onAddLoadRes();
    }
    public UpdateView():void{};
    /**进入处理 */
    protected onEnter(): void{}
    /**添加加载资源 */
    protected abstract onAddLoadRes(): void;
    /**离开处理 */
    protected abstract onExit(): void;
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected abstract onFirstInit(): void;
    /**初始化*/
    protected abstract onInit(): void;
    /**添加监听事件 */
    protected onAddEventListener(): void{}
    /**子页面处理语言切换 */
    // protected abstract onChangeLanguage(): void;
    protected onChangeLanguage(): void{}

    //#region 资源组-该页面用到的资源
    private _resGroup: ResItemGroup;
    private closeCtl:ButtonCtl;
    /**获取资源组 */
    public get ResGroup(): ResItemGroup { if (!this._resGroup) this._resGroup = new ResItemGroup(); return this._resGroup; }
    /**
     * 设置是否可以拖拽
     */
    public set enableDrag(v) {
        if (v) {
            if (!this._dragControl) {
                this._dragControl = new DragControl();
            }
            this._dragControl.reg(this.UI['dragarea']);
        } else {
            if (this._dragControl) {
                this._dragControl.unReg();
            }
        }
    }
    protected setMouseBg(view:Laya.Image){
        if(view){
            DebugUtil.draw(view);
            view.once(Laya.Event.CLICK,this,this.onBgClick);
        }
    }
    private onBgClick(){
    }
    protected addBlackBg(alpha:number = 0.75){
        let bg1 = new Laya.Sprite();
        bg1.graphics.drawRect(0,0,this.UI.width,this.UI.height,"#000000");
        this.UI.addChildAt(bg1,0);
        bg1.alpha = 0.75;
    }

    protected bindClose(closeImg:Laya.Image){
        this.closeCtl = ButtonCtl.Create(closeImg, new Laya.Handler(this, this.Close));
        return this.closeCtl;
    }
    protected SetCenter(): void {
        if (this.UI && !this.UI.destroyed) {
            this.UI.anchorX = this.UI.anchorY = 0.5;
            this.UI.x = this.ViewParent.width >> 1;
            this.UI.y = this.ViewParent.height >> 1;
        }
        // if(Laya.stage.width / Laya.stage.height > 750/1334){
        //     let s = 1334/Laya.stage.height;
        //     // console.log(s);
        //     this.mScale = s;
        // }else{
        //     let s = 750/Laya.stage.width;
        //     this.mScale = s;
        // }
        // this.UI.scaleX/=this.mScale;
        // this.UI.scaleY/=this.mScale;
    }

    /**添加资源
     * @param url 资源地址
     * @param type 资源类型
     */
    protected addRes(url: string, type: string): void {
        if (!this._resGroup) this._resGroup = new ResItemGroup();
        this._resGroup.Add(url, type);
    }
    protected addImg(url: string): void {
        if (!this._resGroup) this._resGroup = new ResItemGroup();
        this._resGroup.Add(url, Laya.Loader.IMAGE);
    }
    /**
     * 添加ui资源
     */
    protected addUI(url:string){
        url = Path.GetUI(url);//ResPath.PathConvert.GetUIJson(url);
        this.addRes(url, Laya.Loader.JSON);
    }
    /**
     * 添加图集
     */
    protected addAtlas(url:string){
        this.addRes("res/atlas/remote/"+url, Laya.Loader.ATLAS);
    }

    protected get uiPath(){
        return ResPath.View.getRoot();
    }
    /**资源组清除 */
    private clearRes(): void {
        if (this._resGroup == null) return;
        this._resGroup.Clear();
        this._resGroup = null;
    }

    //#endregion

    //#region 事件组-该页面监听的自定义事件

    private _eventGroup: EventGroup;//事件组


    /**添加自定义事件 */
    protected addEventCus(eventid: string, callback: Function, caller: any): void {
        this.addEvent(eventid, callback, caller, null, EventType.Custom);
    }

    /**添加系统事件 */
    protected addEventSys(eventid: string, callback: Function, caller: any, listener: Laya.Sprite, data?: any[]): void {
        this.addEvent(eventid, callback, caller, listener, EventType.System, data);
    }

    /**添加事件
     * @param eventid 事件id
     * @param callback 回调方法
     * @param caller 执行域-回调方法属于谁执行域就填谁
     * @param listener 监听对象-system类型时使用，其他类型填null
     * @param type 事件类型 system custom
     * @param data 参数
    */
    private addEvent(eventid: string, callback: Function, caller: any, listener: Laya.Sprite, type: EventType, data?: any[]): void {
        if (this._eventGroup == null) return;
        this._eventGroup.Add(caller, listener, eventid, callback, type, data);
    }

    /**添加事件监听 */
    private addEventListener(): void {
        if (this.IsListening) return;
        this.IsListening = true;
        if (this._eventGroup == null) this._eventGroup = new EventGroup();
        //
        this.addEventCus(EventID.OnChangeLanguage, this.changeLanguage, this);

        //子类添加事件监听
        this.onAddEventListener();
    }

    /**清除事件监听*/
    private clearEventListenr(): void {
        if (!this.IsListening) return;
        this.IsListening = false;
        if (this._eventGroup == null) return;
        this._eventGroup.Clear();
        this._eventGroup = null;
    }

    //#endregion

    //#region 实例

    //页面类型
    public ViewType: EViewType = EViewType.None;
    //页面文件路径
    public ViewPath: string = "";
    //用作多语言配置
    public LanguageType: string = "";
    //页面类型-根据不同类型做动画表现，这里的设计有问题，后面要修改一下
    public PageType: EPageType = EPageType.CloseBigToSmall;
    //层级类型
    public LayerType: ELayerType;


    public UI: Laya.View = null;
    // protected AniView: Laya.Sprite = null;
    protected ViewParent: Laya.Sprite;

    protected hasInit: boolean = false;
    protected IsListening: boolean = false;
    protected Data: any = null;
    protected Callback: Callback;
    private useTime:number = 200;
    public Language: any;

    // private proportion: number = 1;
    // private scaleBig: number = 1;
    // private scaleSmall: number = 0.7;
    // private readonly speed:number = 0.2;
    // private changeTime2Big_Float: number = 400*this.speed; //由小到大的时间
    // private changeTime2Big_MsgBox: number = 350*this.speed; //由小到大的时间
    // private changeTime2Small: number = 300*this.speed;//由大到小的时间
    // private changeTime2Top: number = 200*this.speed; //由下到上的时间
    // private changeTime2Bottom: number = 200*this.speed;//由上到下的时间

    /**onInit延迟的打开时间 */
    // protected delayOpenTime:number = 250;

    public Enter(callback: Callback, data: any): void {
        // LogSys.Log(this.constructor.name, "[OnEnter]");
        this.Data = data;
        this.Callback = callback;
        this.onEnter();

        if (!this.hasInit) {
            this.ViewParent = LayerHelper.GetLayer(this.LayerType);
            this.firstInit();
        }
        else {
            // this.onInit();
        }

        Updater.Ins.AddUpdate(this, this.onUpdate);
        Updater.Ins.AddFixedUpdate(this, this.onFixedUpdate);
        Updater.Ins.AddLateUpdate(this, this.onLateUpdate);
    }

    private finish(){
        // LogSys.Log(this.constructor.name, "[OnExit]");
        Updater.Ins.RemoveUpdate(this);
        Updater.Ins.RemoveFixedUpdate(this);
        Updater.Ins.RemoveLateUpdate(this);
        this.enableDrag = false;
        this.onExit();
        if(this.mMainSnapshot){
            MainModel.Ins.mainMask = false;
        }
        if(this._maskLayer){
            this._maskLayer.removeSelf();
            this._maskLayer.offAll(Laya.Event.CLICK);
        }
        if(this._bgcloseMask){
            this._bgcloseMask.removeSelf();
            this._bgcloseMask.offAll(Laya.Event.CLICK);
        }
        if(this.checkGuide){
            E.yinDaoMgr.removeYD();
            E.localGuideMgr.removeYD();
        }
        if(this.isClearTimer){
            Laya.timer.clearAll(this);
        }
    }

    public Exit(): void {
        this.clear();
    }

    protected onUpdate(): void { }
    protected onLateUpdate(): void { }
    protected onFixedUpdate(): void { }

    /**是否初始化 */
    public HasInit(): boolean { return this.hasInit; };
    /**是否显示 */
    public IsShow(): boolean {
        return this.UI && this.UI.visible && this.ViewParent != null;
    }

    /**首次加载处理
     * -首次初始化需要加载资源
    */
    private firstInit() {
        if (this.hasInit) return;
        this.hasInit = true;

        this.start();
/*
        if (!this.ViewPath) {
            this.start();
        } else {
            E.ResMgr.ViewOpen(this.ViewPath, (v) => {
                this.start();
            });
        }
*/
    }

    private start(){
        this.btnList = [];
        this.onFirstInit();
        DebugUtil.draw(this.UI,"#ff00ff");
        DebugUtil.drawTF(this.UI,""+this.ViewType + "","#ffff00");
        this.init();
    }

    protected onCloseHandler(): void {
        this.Close();
    }
    protected Close(){
        E.ViewMgr.Close(this.ViewType);
    }
    private _maskLayer:Laya.Sprite;
    protected maskAlpha = 0.8;
    private onMaskClick(e:Laya.Event){
        // e.stopPropagation();
        if(!this.mMaskClick){
            return;
        }
        this.onMaskClose();
        this.onCloseHandler();
    }

    protected onMaskClose(){

    }

    private initMask(){
        // if(!ViewBase._maskLayar){
        //     ViewBase._maskLayar = new Laya.Image();
        // }
        // this._maskLayer =ViewBase._maskLayar;
        if(!this._maskLayer){
            this._maskLayer = new Laya.Image();
        }
        this.ViewParent.addChild(this._maskLayer);
        // this.UI.addChildAt(this._maskLayer,0);
        this._maskLayer.graphics.clear();
        this._maskLayer.graphics.drawRect(0,0,this.ViewParent.width,this.ViewParent.height,"#000000");
        // console.log("window.devicePixelRatio:"+window.devicePixelRatio);
        // this._maskLayer.skin = `remote/common/base/img_mask.png`;
        this._maskLayer.size(this.ViewParent.width, this.ViewParent.height);
        this._maskLayer.pos(0, 0);
        // this._maskLayer.width = this.ViewParent.width;
        // this._maskLayer.height = this.ViewParent.height;
        this._maskLayer.hitArea = new Laya.Rectangle(0,0,this.ViewParent.width,this.ViewParent.height);
        if(initConfig.maskColor){
            this.maskAlpha = 0.1;
        }
        this._maskLayer.alpha = this.maskAlpha;
        // this._maskLayer.left = this._maskLayer.right = this._maskLayer.bottom = this._maskLayer.top = 0;
        this._maskLayer.offAll(Laya.Event.CLICK);
        this._maskLayer.on(Laya.Event.CLICK,this,this.onMaskClick);
    }

    private addUiBgClose(){
        if(this.uiBgCloseClick){
            if(!this._bgcloseMask){
                this._bgcloseMask = new Laya.Sprite();
                this._bgcloseMask.alpha = 0.35;
            }
            this._bgcloseMask.on(Laya.Event.CLICK,this,this.Close);
            this.UI.addChildAt(this._bgcloseMask,0);
            this._bgcloseMask.hitArea = new Laya.Rectangle(0,0,this.UI.width,this.UI.height);
            if(debug){
                this._bgcloseMask.graphics.clear();
                this._bgcloseMask.graphics.drawRect(0,0,this.UI.width,this.UI.height,"#0000ff");
            }
            // this.setMouseBg(this._bgcloseMask);
        }
    }


    // private mScale:number = 1;
    /**初始化 */
    private init() {
        if(this.mMask){
            this.initMask();
        }
        this.addUiBgClose();

        if(this.mClickAnyAreaClose){
            this.UI.on(Laya.Event.CLICK,this,this.onCloseHandler);
        }
        // this.ViewParent.addChild(this.UI);
        // this.UI.visible = false;

        // let _stime = Laya.timer.currTimer;
        this.onInit();
        // let sub = Laya.timer.currTimer - _stime;
        // LogSys.Log("使用时间为"+sub);
        
        Laya.timer.once(this.PageType == EPageType.None ? 0 : this.useTime, this, this.onLaterInit);
        // Laya.timer.once(this.useTime, this, this.onLaterInit);

        // this.onLaterInit();
    }

    private onLaterInit(){
        this.ViewParent.addChild(this.UI);
        this.UI.visible = true;

        // LogSys.Log("UI:" + this.constructor.name + " set vis true");
        // this.enableCloseBtn = true;

        this.changeLanguage();

        // this.proportion = 1;
        // this.AniView = this.UI;//this.UI.getChildByName("AniView") as Laya.Box;
        this.openEffect();

        // 添加监听
        this.addEventListener();
        this.updateLayer();
        
        // this.onInit();
        if(this.mMainSnapshot){
            MainModel.Ins.mainMask = true;
        }
        this.SetLayout();
        if(this.PageType == EPageType.CloseBigToSmall){

        }else{
            Laya.timer.callLater(this,this.onShow);
        }
        if (this.Callback) this.Callback.Invoke();    
    }

    private openEffect(){
        if (this.PageType == EPageType.CloseBigToSmall) {
            this.UI.scale(0.8, 0.8);
            TweenUtil.Scale(this.UI, 1, 1, this.useTime, TweenEase.backOut, Laya.Handler.create(this, this.onShow));
        } else {
            this.UI.scaleX = this.UI.scaleY = 1;
        }
    }

    private onShowYD(){
        if(this.checkGuide){
            E.yinDaoMgr.removeTS();
            E.yinDaoMgr.removeYD();
            E.yinDaoMgr.showYD(this.ViewType);
        
            E.localGuideMgr.removeTS();
            E.localGuideMgr.removeYD();
            E.localGuideMgr.showYD(this.ViewType);
        }
    }

    protected onShow(){
        // this.onInit();
        this.onShowYD();
    }

    private updateLayer() {
        let v:boolean =  E.ViewMgr.HasFrameOpenExcept([EViewType.Main]);
        MainModel.Ins.event(MainEvent.MainViewLayerChange,[this.ViewType,v]);
    }

    protected clear() {
        this.finish();
        this.clearEventListenr();
        this.clearRes();
        this.hasInit = false;
        
        // console.log("clear "+this.ViewType+","+this.UI);
        if (this.UI) {
            Laya.timer.clear(this, this.onLaterInit);
            // LogSys.Log("UI:" + this.constructor.name + " set vis false");
            TweenUtil.ClearAll(this.UI);
            this.UI.removeSelf();
            this.UI.visible = false;
            if(this.autoFree){
                this.closeCtl && this.closeCtl.dispose();
                while(this.btnList.length){
                    let btn = this.btnList.pop();
                    btn.dispose();
                }
                this.UI.destroy(true);
                this.UI = null;
                // Laya.Resource.destroyUnusedResources();
            }
        }
        this.updateLayer();
    }
    /**设置页面数据 */
    protected onInitData() { }
    /**设置初始UI显示 */
    protected onInitUI() { }
    /**绑定UI相关事件 */
    protected onInitEvent() { }

    public SetLayout() {
        this.SetCenter();
    }

    /**设置UI语言 */
    private changeLanguage(): void {
        if (!StringUtil.IsNullOrEmpty(this.LanguageType)) {
            // this.Language = E.LangMgr.GetLanguageLabel(this.LanguageType);
        }
        this.onChangeLanguage();//不设置语言包的界面也需要更新这个接口更新视图
    }

    //#endregion
}