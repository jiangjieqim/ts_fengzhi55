import { E } from "../../../game/G";
import {IView} from "../../view/IView";
/**小红点更新接口 */
export interface IUpdateRedModel{
    updateRed();
}

export abstract class BaseModel extends Laya.EventDispatcher {

    // private static _ins:BaseModel;
    // public static get Ins(){
    //     if(!this._ins){
    //         this._ins = new BaseModel();
    //     }
    //     return this._ins;
    // }

    public abstract initMsg(): void;

    // public isInit:boolean = true;

    protected Reg(iv: IView){
        E.ViewMgr.Reg(iv);
    }
    /**初始化重置数据 */
    public abstract onInitCallBack():void;
    /**更新红点 */
    public updateRed(){
        
    }
    private _isOpen:boolean;
    public set isOpen(v:boolean){
        this._isOpen = v;
    }
    public get isOpen(){
        return this._isOpen;
    }
}