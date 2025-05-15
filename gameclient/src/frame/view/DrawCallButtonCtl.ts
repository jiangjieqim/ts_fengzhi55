import { DrawCallNode } from "../../game/view/handle/main/model/MainModel";
import { DebugUtil } from "../util/DebugUtil";
import { ButtonCtl } from "./ButtonCtl";

export class DrawCallButtonCtl extends ButtonCtl{
    /**Laya.Label Label对象*/
    private lb:DrawCallNode;
    /**Laya.Image 红点 */
    protected red:DrawCallNode;
    constructor(skin:Laya.Sprite,onClick:Laya.Handler=null,lb:DrawCallNode=null,red:DrawCallNode = null){
        super(skin,onClick);
        DebugUtil.draw(skin);
        this.lb = lb;
        this.red = red;
    }

    public set visible(v) {
        super.visible = v;
        if(this.lb){
            this.lb.visible = v;
        }
        if(this.red){
            this.red.visible = v;
        }
    }
    get isOpen(){
        return true;
    }
}