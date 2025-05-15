import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { WowHuanZhuangModel } from "../model/WowHuanZhuangModel";
import { WowHuanZhuangAttributeProxy } from "../proxy/WowHuanZhuangProxy";
import { WowHuanZhuangItem } from "./WowHuanZhuangItem";

export class WowHuanZhuangView1 extends ViewBase{
    private _ui:ui.views.wowhuanzhuang.ui_wowhuangzhuangView1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;

    private tabsCtl:TabControl;
    private tabList: any;

    protected onAddLoadRes() {
        this.addAtlas("wowhuanzhuang.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wowhuanzhuang.ui_wowhuangzhuangView1UI;
            this.bindClose(this._ui.btn_close);

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3];
            let st = E.getLang("wowhztab1");
            this.tabList = st.split(":");
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._ui.list.itemRender = WowHuanZhuangItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.wowhuanzhuang.ui_tabUI = tabSkin;
        skin.lab.text = this.tabList[index];
        if (sel) {
            skin.img.visible = true;
        } else {
            skin.img.visible = false;
        }
    }

    private onTabSelectHandler(v:number){
        let index = v + 1;
        this._ui.list.array = WowHuanZhuangAttributeProxy.Ins.getListByType(index);
    }

    private onRenderHandler(item:WowHuanZhuangItem){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        WowHuanZhuangModel.Ins.on(WowHuanZhuangModel.UPDATA_ATTR,this,this.onUpdataView);
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(): void {
        WowHuanZhuangModel.Ins.off(WowHuanZhuangModel.UPDATA_ATTR,this,this.onUpdataView);
        this.tabsCtl.dispose();
    }

    private onUpdataView(){
        this._ui.list.refresh();
    }
}