import { TabControl } from "../../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { JjcAttrViewCtl1 } from "./JjcAttrViewCtl1";
import { JjcAttrViewCtl2 } from "./JjcAttrViewCtl2";
import { JjcAttrViewCtl3 } from "./JjcAttrViewCtl3";
import { JjcAttrViewCtl4 } from "./JjcAttrViewCtl4";
import { JjcAttrViewCtl5 } from "./JjcAttrViewCtl5";
import { JjcAttrViewCtl6 } from "./JjcAttrViewCtl6";
import { JjcAttrViewCtl7 } from "./JjcAttrViewCtl7";
import { JjcAttrViewCtl8 } from "./JjcAttrViewCtl8";

export class JjcAttrDBView extends ViewBase{
    private _ui:ui.views.jjcAttr.ui_jjc_attrViewUI;
    protected mMask = true;
    protected autoFree = true;

    private tabsCtl:TabControl;
    private tabList: any;
    private iconList: any;

    private _jjcAttrViewCtl1:JjcAttrViewCtl1;
    private _jjcAttrViewCtl2:JjcAttrViewCtl2;
    private _jjcAttrViewCtl3:JjcAttrViewCtl3;
    private _jjcAttrViewCtl4:JjcAttrViewCtl4;
    private _jjcAttrViewCtl5:JjcAttrViewCtl5;
    private _jjcAttrViewCtl6:JjcAttrViewCtl6;
    private _jjcAttrViewCtl7:JjcAttrViewCtl7;
    private _jjcAttrViewCtl8:JjcAttrViewCtl8;

    protected  onAddLoadRes(){
        this.addAtlas('jjcAttr.atlas');
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.jjcAttr.ui_jjc_attrViewUI;
            this.bindClose(this._ui.btn_close);

            this._jjcAttrViewCtl1 = new JjcAttrViewCtl1(this._ui.attrView1);
            this._jjcAttrViewCtl2 = new JjcAttrViewCtl2(this._ui.attrView2);
            this._jjcAttrViewCtl3 = new JjcAttrViewCtl3(this._ui.attrView3);
            this._jjcAttrViewCtl4 = new JjcAttrViewCtl4(this._ui.attrView4);
            this._jjcAttrViewCtl5 = new JjcAttrViewCtl5(this._ui.attrView5);
            this._jjcAttrViewCtl6 = new JjcAttrViewCtl6(this._ui.attrView6);
            this._jjcAttrViewCtl7 = new JjcAttrViewCtl7(this._ui.attrView7);
            this._jjcAttrViewCtl8 = new JjcAttrViewCtl8(this._ui.attrView8);

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3,this._ui.tab4,
                this._ui.tab5,this._ui.tab6,this._ui.tab7,this._ui.tab8];
            this.tabList = ["基础","装备","福源","宝石","坐骑","翅膀","战魂","灵宠"];
            this.iconList = ["hz","jjc_zb","fy","bs","zq","cb","zh","lc"];
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));
        }
    }

    protected onInit(): void {
        this._jjcAttrViewCtl1.setData(this.Data);
        this._jjcAttrViewCtl2.setData(this.Data);
        this._jjcAttrViewCtl3.setData(this.Data);
        this._jjcAttrViewCtl4.setData(this.Data);
        this._jjcAttrViewCtl5.setData(this.Data);
        this._jjcAttrViewCtl6.setData(this.Data);
        this._jjcAttrViewCtl7.setData(this.Data);
        this._jjcAttrViewCtl8.setData(this.Data);
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(): void {
        
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.jjcAttr.ui_tabUI = tabSkin;
        skin.tf1.text = this.tabList[index];
        skin.icon.skin = "remote/jjcAttr/" + this.iconList[index] + ".png";
        if (sel) {
            skin.img.visible = true;
        } else {
            skin.img.visible = false;
        }
    }

    private onTabSelectHandler(v:number){
        this._ui.attrView1.visible = this._ui.attrView2.visible = this._ui.attrView3.visible = 
        this._ui.attrView4.visible = this._ui.attrView5.visible = this._ui.attrView6.visible = 
        this._ui.attrView7.visible = this._ui.attrView8.visible = false;
        this._ui["attrView" + (v + 1)].visible = true;
     }
}