import { EGuideType } from "../../common/defines/EnumDefine";
import { E } from "../../G";

/**引导数据类 */
export class GuideData {
    //引导类型 分为方形引导和圆形引导
    public type: EGuideType = EGuideType.Rect;
    //引导的坐标 方形引导为左下角起始点 圆形引导为圆心点
    public pos: Laya.Vector2 = Laya.Vector2.ZERO;
    //圆形引导的半径
    public radius: number = 0;
    //方形引导的长宽
    public size: Laya.Vector2 = Laya.Vector2.ZERO;

    //文本内容
    public content: string = "";
    public content_en: string = "";
    //文本的Y坐标
    public contentPosY: number = 0;
    //手的坐标
    public handPos: Laya.Vector2 = Laya.Vector2.ZERO;

    constructor(jsonData: any) {
        this.type = jsonData["type"] as EGuideType;
        this.pos = new Laya.Vector2(jsonData["posX"], jsonData["posY"]);
        this.radius = jsonData["radius"];
        this.size = new Laya.Vector2(jsonData["width"], jsonData["height"]);
        this.content = jsonData["content"];
        this.content_en = jsonData["content_en"];
        this.contentPosY = jsonData["contentPosY"];
        this.handPos = new Laya.Vector2(jsonData["handPosX"], jsonData["handPosY"]);
    }

    /**获取内容文本 */
    public GetContentStr() {
        if (E.LangMgr.IsChinese) {
            return this.content;
        }
        else {
            return this.content_en;
        }
    }
}