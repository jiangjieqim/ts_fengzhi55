import { EScene2DType } from "../../game/common/defines/EnumDefine";
import {ResItemGroup} from "../../game/resouce/ResItemGroup";

/**场景基类接口*/
export interface IScene2D {
    SceneType: EScene2DType;
    ResGroup: ResItemGroup;
    Scene: Laya.Scene;
    Enter(data?: any): void;
    Exit(): void;
}