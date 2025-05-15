import {StringUtil} from "../../../../../frame/util/StringUtil";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { FontClipCtl } from "./FontClipCtl";

export class PlusCtl extends FontClipCtl{
    constructor(){
        super(IconUtils.plusAtlasPrefix);
        this.mScale = 0.7;
        this.offsetX = -3;
    }
    public setPlus(container:Laya.Sprite,v:number){
        let v1 =  StringUtil.val2Atlas(v);
        this.setValue(container,v1);
    }
}