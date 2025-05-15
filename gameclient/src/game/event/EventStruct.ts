// import { EMapEditorMode } from "../modules/house/help/MapEditorHelper";

/**事件构造-为事件派发定义的消息结构，方便监听处解析调用*/
export namespace EventStruct {

    /**点击添加标签 */
    export class stClickAddTag {
        constructor(id: number) { this.tagId = id; }
        public tagId: number = 0;
    }

    /**点击移除标签 */
    export class stClickRemoveTag {
        constructor(id: number) { this.tagId = id; }
        public tagId: number = 0;
    }

}
