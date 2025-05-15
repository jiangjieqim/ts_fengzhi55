import { DebugUtil } from "../../../../../frame/util/DebugUtil";
import {LoadUtil} from "../../../../../frame/util/LoadUtil";
import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import { TabControl } from "../../../../../frame/view/TabControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { InitConfig } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";


let TxtSkinKey:string = "TxtNode";

class TxtNode extends RowMoveBaseNode{
    protected clsKey:string = TxtSkinKey;

    protected createNode (index){
        let _skin: ui.views.shezhi.ui_yingsi_txtUI = Laya.Pool.getItemByClass(this.clsKey, ui.views.shezhi.ui_yingsi_txtUI);
        let vo = this.list[index];
        _skin.lab.text = vo;
        DebugUtil.draw(_skin,"#ff0000",_skin.width,_skin.lab.textField.height);
        _skin.y = this.y;
        return _skin;
    }
}

export class YinSiView extends ViewBase{
    private _panelCtl: ScrollPanelControl;// 

    private _ui:ui.views.shezhi.ui_yingsiUI;
    protected checkGuide:boolean = false;
    protected mMask = true; 
    protected autoFree = true;
    private tabsCtl:TabControl;// = new TabControl();
    private tabList: any;
    private randomVal:number;
    getTxtHeight(str:string){
        let sign = TxtSkinKey;
        let _skin: ui.views.shezhi.ui_yingsi_txtUI = Laya.Pool.getItemByClass(sign, ui.views.shezhi.ui_yingsi_txtUI);
        // let vo = this.list[index];
        _skin.lab.text = str;
        Laya.Pool.recover(sign,_skin);
        return _skin.lab.textField.height;
    }
    
    protected onAddLoadRes() {
        this.addAtlas('shezhi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.randomVal = Math.random();
            this.UI = this._ui = new ui.views.shezhi.ui_yingsiUI;
            this.bindClose(this._ui.close1);

            this._panelCtl = new ScrollPanelControl();
            this._panelCtl.init(this._ui.panel);
            this._ui.lab.text = "";

            const tabsSkin = [this._ui.tab1,this._ui.tab2];
            this.tabList = ["用户协议","隐私政策"];
            this.tabsCtl = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));
        }
    }

    protected onInit() {
        this.tabsCtl.forceSelectIndex(0);
    }

    protected onExit() {
        this._panelCtl.clear();
    }
    private get asset(){
        return InitConfig.getAsset();
    }
    private get yhxyTxt(){
        return this.asset+"o/yhxy/yhxy.txt"+"?"+this.randomVal;
    }
    private get ysxyTxt(){
        return this.asset+"o/yhxy/ysxy.txt"+"?"+this.randomVal;
    }
    private onTabSelectHandler(v:number){
        this._ui.panel.vScrollBar.stopScroll();
        this._ui.panel.scrollTo(0,0);
        switch(v){
            case 0:
                this._ui.lab_title.text = "游戏使用许可及服务协议";
                Laya.loader.load(this.yhxyTxt, Laya.Handler.create(this, this.onComplete), null, Laya.Loader.TEXT);
                break;
            case 1:
                this._ui.lab_title.text = "隐私协议";
                Laya.loader.load(this.ysxyTxt, Laya.Handler.create(this, this.onComplete1), null, Laya.Loader.TEXT);
                break;
        }
    }

    private onComplete(){
        // this._ui.lab.text = LoadUtil.GetTxt("o/yhxy/yhxy.txt");
        let l = LoadUtil.GetTxt(this.yhxyTxt).split("\n");
        this.renderTxtList(l);
    }

    private renderTxtList(l:string[]){
        this._panelCtl.clear();
        for(let i = 0;i < l.length;i++){
            let str = l[i];    
            this._panelCtl.split([str],TxtNode,this.getTxtHeight(str));
        }
        this._panelCtl.end();
    }

    private onComplete1(){
        // this._ui.lab.text = LoadUtil.GetTxt("o/yhxy/ysxy.txt");
        let l = LoadUtil.GetTxt(this.ysxyTxt).split("\n");
        this.renderTxtList(l);
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.shezhi.ui_tabUI = tabSkin;
        skin.txt.text = this.tabList[index];
        if (sel) {
            skin.img2.visible = false;
            skin.img1.visible = true;
        } else {
            skin.img2.visible = true;
            skin.img1.visible = false;
        }
    }
}