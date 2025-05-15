import { ui } from "../../../../../ui/layaMaxUI";
import { IJJC_Model } from "../../peakjjc/model/IJjcInterface";
import { JjcHeadCtl } from "./JjcHeadCtl";

export class JjcOtherItemCtl{
    private skin:ui.views.jjc.ui_jjc_owner_itemUI;
    private headCtl:JjcHeadCtl;
    constructor(skin:ui.views.jjc.ui_jjc_owner_itemUI){
        this.skin = skin;
        this.headCtl = new JjcHeadCtl(skin.head,skin.plus,skin.nametf,skin.paiming,skin.mingcitf,skin.img_title);
    }
    public updateView(model:IJJC_Model){
        this.headCtl.updateView(model.ownerPlayer);
    }
}