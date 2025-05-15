import { TabControl } from "../../../../../frame/view/TabControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { CheifOnOpen_req } from "../../../../network/protocols/BaseProto";
import {DotManager} from "../../common/DotManager";
import { MainEvent } from "../../main/model/MainEvent";
import { EServerVersion, MainModel } from "../../main/model/MainModel";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangViewCtl1 } from "./ctl/FuJiangViewCtl1";
import { FuJiangViewCtl2 } from "./ctl/FuJiangViewCtl2";
import { FuJiangViewCtl3 } from "./ctl/FuJiangViewCtl3";
import { FuJiangViewCtl33 } from "./ctl/FuJiangViewCtl33";
import { FuJiangViewCtl4 } from "./ctl/FuJiangViewCtl4";
import { FuJiangViewCtl5 } from "./ctl/FuJiangViewCtl5";
import { FuJiangViewCtl6 } from "./ctl/FuJiangViewCtl6";

export class FuJiangView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;
    protected autoFree: boolean = true;

    private tabsCtl:TabControl;
    private tabList: any;

    private _viewCtl1:FuJiangViewCtl1;
    private _viewCtl2:FuJiangViewCtl2;
    private _viewCtl3:FuJiangViewCtl33;
    private _viewCtl4:FuJiangViewCtl4;
    private _viewCtl5:FuJiangViewCtl5;
    private _viewCtl6:FuJiangViewCtl6;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangViewUI;
            this.bindClose(this._ui.btn_close);

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3,this._ui.tab4,
                this._ui.tab5,this._ui.tab6];
            this.tabList = ["布阵","助战","战旗","坐骑","福源","图鉴"];
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._viewCtl1 = new FuJiangViewCtl1(this._ui.view1);
            this._viewCtl2 = new FuJiangViewCtl2(this._ui.view2);
            this._viewCtl3 = new FuJiangViewCtl33(this._ui.view3);
            this._viewCtl4 = new FuJiangViewCtl4(this._ui.view4);
            this._viewCtl5 = new FuJiangViewCtl5(this._ui.view5);
            this._viewCtl6 = new FuJiangViewCtl6(this._ui.view6);

            this._ui.tab5.visible = false;
            this._ui.tab1.x = 127;
            this._ui.tab2.x = 241;
            this._ui.tab3.x = 358;
            this._ui.tab4.x = 471;
            this._ui.tab6.x = 584;
            // if(MainModel.Ins.serverVer == EServerVersion.Version_1){
            //     this._ui.tab4.visible = false;
            //     this._ui.tab1.x = 145;
            //     this._ui.tab2.x = 287;
            //     this._ui.tab3.x = 436;
            //     this._ui.tab6.x = 585;
            // }else{
            //     this._ui.tab4.visible = true;
            //     this._ui.tab1.x = 127;
            //     this._ui.tab2.x = 241;
            //     this._ui.tab3.x = 358;
            //     this._ui.tab4.x = 471;
            //     this._ui.tab6.x = 584;
            // }
        }
    }

    
    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.fujiang.ui_mTabUI = tabSkin;
        skin.lab.text = this.tabList[index];
        skin.img_1.skin = "remote/fujiang/fj_gn_" + (index + 1) + ".png";
        skin.img_2.skin = "remote/fujiang/fj_gn_" + (index + 1) + "s.png";
        if (sel) {
            skin.img2.visible = skin.img_1.visible = true;
            skin.img1.visible = skin.img_2.visible = false;
            skin.lab.color = "#F9F0BB";
            MainModel.Ins.event(MainEvent.ButtonCtlClick,tabSkin);
        } else {
            skin.img2.visible = skin.img_1.visible = false;
            skin.img1.visible = skin.img_2.visible = true;
            skin.lab.color = "#CAB165";
        }
    }

    private onTabSelectHandler(v:number){
        if(v == -1)return;
        for(let i:number = 1; i < 7; i++){
            this["_viewCtl" + i].onRemove();
            this._ui["view" + i].visible = false;
        }
        this["_viewCtl" + (v + 1)].onAdd();
        this._ui["view" + (v + 1)].visible = true;
    }

    protected onInit(): void {
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_SHIQI_UPDATA,this,this.onUpdataView);
        MainModel.Ins.on(MainEvent.ValChange,this,this.onUpdataView);
        this.tabsCtl.selectIndex = 0;
        this.setRedTip();
        let req:CheifOnOpen_req = new CheifOnOpen_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_SHIQI_UPDATA,this,this.onUpdataView);
        MainModel.Ins.off(MainEvent.ValChange,this,this.onUpdataView);
        this.tabsCtl.selectIndex = -1;
    }

    private onUpdataView(){
        Laya.timer.callLater(this,this.setRedTip);
    }

    private setRedTip(){
        if(FuJiangModel.Ins.tab1RedTip()){
            DotManager.addDot(this._ui.tab1);
        }else{
            DotManager.removeDot(this._ui.tab1);
        }
        if(FuJiangModel.Ins.tab2RedTip()){
            DotManager.addDot(this._ui.tab2);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
        if(FuJiangModel.Ins.tab3RedTip()){
            DotManager.addDot(this._ui.tab3);
        }else{
            DotManager.removeDot(this._ui.tab3);
        }
        if(FuJiangModel.Ins.tab4RedTip()){
            DotManager.addDot(this._ui.tab4);
        }else{
            DotManager.removeDot(this._ui.tab4);
        }
        if(FuJiangModel.Ins.tab5RedTip()){
            DotManager.addDot(this._ui.tab5);
        }else{
            DotManager.removeDot(this._ui.tab5);
        }
        if(FuJiangModel.Ins.tab6RedTip()){
            DotManager.addDot(this._ui.tab6);
        }else{
            DotManager.removeDot(this._ui.tab6);
        }
    }
}