import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { SoulModel } from "../model/SoulModel";
import { t_Spirit_Attribute_Bond, t_Spirit_Attribute_Fixed } from "../model/SoulProxy";
import { f_headViewUpdate } from "./SoulIconItem";
export class SoulSuitView extends ui.views.soul.ui_soul_suit_itemUI {
    private cfg: Configs.t_Spirit_Attribute_Bond_dat;
    private id:number;
    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.onClickHandler);
    }

    private onClickHandler() {
        E.ViewMgr.Open(EViewType.SoulSuitTips,null,this.id);
    }

    public refreshView() {
        let id = this.dataSource;
        this.id = id;
        this.cfg = t_Spirit_Attribute_Bond.Ins.getBySpiritID(id);
        // this.icon.skin = `o/spirits/${this.cfg.f_SpiritID}.png`;
        
        // this.item.maskArea.visible = false;
        // this.item.jiao.visible = false;
        // this.item.bg.visible = false;
        // this.item.bgicon.visible = false;

        f_headViewUpdate(this.headPortrait,t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(this.cfg.f_SpiritID).f_SpiritIconID);
        this.tf5.text = this.cfg.f_SpiritName;

        let count = SoulModel.Ins.getUnlockCountBySpiritId(id);
        this.enableBtn(this.btn1, count >= 2);
        this.enableBtn(this.btn2, count >= 4);
    }

    private enableBtn(img: Laya.Image, v: boolean) {
        if (v) {
            img.skin = "remote/main/main/anniu_2.png";
        } else {
            img.skin = "remote/main/main/anniu_1.png";
        }
    }
}

export class SoulSuitTipsView extends ViewBase {
    private _ui: ui.views.soul.ui_soul_sult_viewUI;
    private cfg: Configs.t_Spirit_Attribute_Bond_dat;

    protected mMask: boolean = true;
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.soul.ui_soul_sult_viewUI();
            this.setMouseBg(this._ui.bg);
        }
    }
    protected onInit(): void { 
        let id = this.Data;
        this.cfg = t_Spirit_Attribute_Bond.Ins.getBySpiritID(id);
        this._ui.nametf.text = this.cfg.f_SpiritName;

        // let item = this._ui.item;
        // item.bg.visible = false;
        // item.jiao.visible = false;
        // item.bgicon.visible = false;
        // item.maskArea.visible = false;
        
        f_headViewUpdate(this._ui.headPortrait,/*`o/spirits/${this.cfg.f_SpiritID}.png`*/t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(this.cfg.f_SpiritID).f_SpiritIconID);
        // item.lvTf.text = "";

        let unlock = SoulModel.Ins.getUnlockCountBySpiritId(id);
        this._ui.kong2.visible = unlock >= 2;
        this._ui.kong4.visible = unlock >= 4;

        let bondCfg:Configs.t_Spirit_Attribute_Bond_dat = t_Spirit_Attribute_Bond.Ins.getBySpiritID(id);
        SoulModel.Ins.updateAttr(this._ui.cellAttr2,bondCfg.f_TwoPiece);
        SoulModel.Ins.updateAttr(this._ui.cellAttr4,bondCfg.f_FourPiece);
    }
}