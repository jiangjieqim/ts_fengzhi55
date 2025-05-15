import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { DotManager } from "../../common/DotManager";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { LingChongViewCtl1 } from "../ctl/LingChongViewCtl1";
import { LingChongRH_Model, LingChongViewCtl2 } from "../ctl/LingChongViewCtl2";
import { LingChongViewCtl3 } from "../ctl/LingChongViewCtl3";
import { LingChongModel } from "../model/LingChongModel";

export class LingChongMainView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongMainViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;
    protected autoFree = true;

    private tabsCtl:TabControl;
    private tabList: any;

    private _viewCtl1:LingChongViewCtl1;
    private _viewCtl2:LingChongViewCtl2;
    private _viewCtl3:LingChongViewCtl3;

    protected onAddLoadRes() {
        this.addAtlas('lingchong.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongMainViewUI;
            this.bindClose(this._ui.btn_close);

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3];
            this.tabList = ["培养灵宠","灵宠融合","灵宠召唤"];
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._viewCtl1 = new LingChongViewCtl1(this._ui.view1);
            this._viewCtl2 = new LingChongViewCtl2(this._ui.view2);
            this._viewCtl3 = new LingChongViewCtl3(this._ui.view3);

            this.btnList.push( ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick)));
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("petTitle","petDec");
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.lingchong.ui_tabUI = tabSkin;
        skin.txt.text = this.tabList[index];
        if (sel) {
            skin.img1.visible = true;
            skin.img2.visible = false;
            skin.txt.color = "#A1572F";
            MainModel.Ins.event(MainEvent.ButtonCtlClick,tabSkin);
        } else {
            skin.img1.visible = false;
            skin.img2.visible = true;
            skin.txt.color = "#e4bb87";
        }
    }

    private onTabSelectHandler(v:number){
        if(v == -1)return;
        for(let i:number = 1; i < 4; i++){
            this["_viewCtl" + i].onRemove();
            this._ui["view" + i].visible = false;
        }
        this["_viewCtl" + (v + 1)].onAdd();
        this._ui["view" + (v + 1)].visible = true;
    }

    protected onInit(): void {
        LingChongModel.Ins.on(LingChongModel.Updata_ChouKa,this,this.setRedTip);
        this.tabsCtl.selectIndex = 0;
        this.setRedTip();
    }

    protected onExit(): void {
        LingChongModel.Ins.off(LingChongModel.Updata_ChouKa,this,this.setRedTip);
        this.tabsCtl.selectIndex = -1;
        this.tabsCtl.dispose();
    }

    private setRedTip(){
        if(LingChongModel.Ins.isFreeRedTip()){
            DotManager.addDot(this._ui.tab3);
        }else{
            DotManager.removeDot(this._ui.tab3);
        }
    }
}