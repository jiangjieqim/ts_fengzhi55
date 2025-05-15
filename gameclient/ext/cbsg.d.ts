//戳爆三国接口

/**window["debug"] */
declare let debug:boolean;

/**
    主角Avatar控制器 
    解决主角骨骼变化 需要重新构建Avatar对象 
*/
declare interface IAvatarMainCtl{
    /**创建 avatar*/
    create(init:Laya.Handler);
    /**释放 avatar*/
    free();
    /**avatar句柄 */
    mAvatar;
    /**容器 */
    con:Laya.Sprite;
}

declare class LogSys{
    static Log(...args: any[]);
    static Warn(...args: any[]);
    static Error(...args: any[]);
}

declare class DebugUtil{
    static drawCross(p: Laya.Sprite, x?: number, y?: number, _size?: number,_color?:string);
    static draw(p: Laya.Sprite, color?:string ,w?:number,h?:number,x?:number,y?:number,full?:boolean);
    static drawTF(view: Laya.Sprite, content: string,color?:string);
    static realDraw(p: Laya.Sprite,color?:string ,w?:number,h?:number,x?:number,y?:number,full?:boolean);
}
declare interface IMainView{
    UpdateEquipSmallIcon(equip);
}
declare interface ISpineRes{
    /**GC回收未使用的spine资源 */
    GC();
    /**释放骨骼对象 */
    free(_skel:Laya.SpineSkeleton);
}

declare interface IMainModel{
    /**是否有红点 */
    hasRedMainCfg(id:number):boolean;
    isOpenAllByFuncid(funcId:string):boolean;
    skinStyle:number;
    itemName(v:string):string;
    mainView:IMainView;
}
declare let main:IMainModel;
/**Spine资源管理模块 */
declare let spineRes:ISpineRes;