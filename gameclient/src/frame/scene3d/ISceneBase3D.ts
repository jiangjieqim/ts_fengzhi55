import { EScene3DType } from "../../game/common/defines/EnumDefine";
import {ResItemGroup} from "../../game/resouce/ResItemGroup";

/**3D场景接口 */
export interface IScene3D {
    UUID: number;
    SceneType: EScene3DType;
    ResGroup: ResItemGroup;
    Enter(data?: any): void;
    Exit(): void;
    Update(): void;
    LateUpdate(): void;
    FixedUpdate(): void;
}