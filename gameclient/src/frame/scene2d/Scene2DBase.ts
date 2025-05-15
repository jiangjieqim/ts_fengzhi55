import { LogSys } from "../log/LogSys";
import {ResItemGroup} from "../../game/resouce/ResItemGroup";
import {IScene2D} from "./IScene2D";
import { EventGroup } from "../../game/event/EventGroup";
import { EventType } from "../../game/event/EventType";
import { Updater } from "../../game/common/timer/Updater";
import { E } from "../../game/G";
import { EScene2DType } from "../../game/common/defines/EnumDefine";

/**场景基类*/
export abstract class Scene2DBase implements IScene2D {
    constructor() {
        this.onAddLoadRes();
    }

    //#region 静态

    //#endregion

    //#region 实例

    public Scene: Laya.Scene;
    public SceneType: EScene2DType = EScene2DType.None;

    protected data: any;
    protected _hasInit: boolean = false;

    public Enter(data?: any): void {
        this.data = data;
        LogSys.Log("[" + this.constructor.name + "][OnEnter]");
        this.onEnter();
        this.init();

        Updater.Ins.AddUpdate(this, this.onUpdate);
        Updater.Ins.AddFixedUpdate(this, this.onFixedUpdate);
        Updater.Ins.AddLateUpdate(this, this.onLateUpdate);
    }
    public Exit(): void {
        LogSys.Log("[" + this.constructor.name + "][OnExit]");
        Updater.Ins.RemoveUpdate(this);
        Updater.Ins.RemoveFixedUpdate(this);
        Updater.Ins.RemoveLateUpdate(this);

        this.onExit();
        this.clear();
    }

    //#region 资源组
    private _resGroup: ResItemGroup;
    public get ResGroup(): ResItemGroup {
        if (!this._resGroup) this._resGroup = new ResItemGroup();
        return this._resGroup;
    }

    /**添加加载资源 */
    protected abstract onAddLoadRes(): void;

    /**添加资源
     * @param url 资源地址
     * @param type 资源类型
     */
    protected addRes(url: string, type: string): void {
        if (!this._resGroup) this._resGroup = new ResItemGroup();
        this._resGroup.Add(url, type);
    }

    /**资源组清除 */
    private clearRes(): void {
        if (this._resGroup == null) return;
        this._resGroup.Clear();
        this._resGroup = null;
    }
    //#endregion

    //#region 事件监听
    private _isListening: boolean = false;
    private _eventGroup: EventGroup;        //事件组

    /**添加监听事件 */
    protected abstract onAddEventListener(): void;

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
     * @param caller 执行域-一般填当前脚本，this
     * @param listener 监听对象-system类型时使用，其他类型填null
     * @param type 事件类型 system custom
     * @param data 参数
    */
    private addEvent(eventid: string, callback: Function, caller: any, listener: Laya.Sprite, type: EventType, data?: any[]): void {
        if (this._eventGroup == null) return;
        this._eventGroup.Add(caller, listener, eventid, callback, type, data);
    }

    /**移除事件
     * @param eventid 事件id
     * @param callback 回调方法
     * @param caller 执行域-一般填当前脚本，this
     * @param listener 监听对象-system类型时使用，其他类型填null
     * @param type 事件类型
    */
    private removeEvent(eventid: string, callback: Function, caller: any, listener: Laya.Sprite, type: EventType): void {
        if (this._eventGroup == null) return;
        this._eventGroup.Remove(caller, listener, eventid, callback, type);
    }

    /**添加事件监听 */
    private addEventListener(): void {
        if (this._isListening) return;
        this._isListening = true;
        if (this._eventGroup == null) this._eventGroup = new EventGroup();

        //子类添加事件监听
        this.onAddEventListener();
    }

    /**清除事件监听*/
    private clearEventListenr(): void {
        if (!this._isListening) return;
        this._isListening = false;
        if (this._eventGroup == null) return;
        this._eventGroup.Clear();
        this._eventGroup = null;
    }

    //#endregion

    protected abstract onEnter(): void;
    protected abstract onExit(): void;
    protected abstract onFirstInit(): void;
    protected abstract onInit(): void;

    protected onUpdate(): void { }
    protected onLateUpdate(): void { }
    protected onFixedUpdate(): void { }

    private init(): void {
        this._hasInit = true;
        this.addEventListener();

        this.onInit();
    }

    private clear(): void {
        this._hasInit = false;
        this.clearRes();
        this.clearEventListenr();
        E.ResMgr.SceneClose(this.SceneType);

    }

    //#endregion
}