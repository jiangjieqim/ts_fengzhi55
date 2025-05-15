import { TabControl } from "../../../../../frame/view/TabControl";
import { TabSkinCtl } from "../../../../../frame/view/TabSkinCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import {DotManager} from "../../common/DotManager";
import { t_Custom_CostumesProxy } from "../../huodong/model/ActivityProxy";
import { MainModel } from "../../main/model/MainModel";
import { HuanZhuangModel } from "../HuanZhuangModel";
import { HuanZhuangEvent } from "../vos/HuanZhuangEvent";
import { HuanzhuangTujianItemRender } from "./HuanzhuangTujianItemRender";
/**
 * 换装图鉴
 */
export class Huangzhuang_tujianView extends ViewBase{
    private _ui:ui.views.huanzhuang.ui_huangzhuang_tujianUI;
    private tabsCtl:TabControl = new TabControl();
    private _tabSkinCtl:TabSkinCtl;
    protected autoFree = true;
    protected mMask: boolean = true;
    protected onAddLoadRes(): void { }
    protected onExit(): void { 
        HuanZhuangModel.Ins.off(HuanZhuangEvent.SuitUpdate,this,this.onTabUpdate);
        E.ViewMgr.Open(EViewType.HuanzhuangMain);
    }

    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.huanzhuang.ui_huangzhuang_tujianUI();
            this.bindClose(this._ui.close1);
            this.tabsCtl = TabControl.Create(this,this.onSelectHandler,this.itemTabHandler);
            this._tabSkinCtl = TabSkinCtl.Create(ui.views.huanzhuang.ui_huangzhuang_tab_itemUI,"ui_huangzhuang_tab_itemUI",this._ui.tabCon);
            this._ui.list1.itemRender = HuanzhuangTujianItemRender;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.listHandler);
        }
    }

    private listHandler(item:HuanzhuangTujianItemRender){
        item.refreshView();
    }

    private isCanActive(l:Configs.t_Custom_Costumes_dat[]){
        // for(let i = 0;i < l.length;i++){
        //     if(HuanZhuangModel.Ins.isCanActive(l[i])){
        //         return true;
        //     }
        // }
        // return false;

        return HuanZhuangModel.Ins.isCellCanActive(l);
    }

    private itemTabHandler(tabSkin,index:number,sel:boolean,data){
        if(tabSkin instanceof ui.views.huanzhuang.ui_huangzhuang_tab_itemUI){
            let skin:ui.views.huanzhuang.ui_huangzhuang_tab_itemUI = tabSkin;
            // let arr = E.LangMgr.getLang("XingFuTabs").split("|");
            // let str = arr[index];

            // let arr = [2,3,4,5,6];

            //console.log(data);
            let l= t_Custom_CostumesProxy.Ins.mapList[data];

            if(this.isCanActive(l)){
                DotManager.addDot(skin);
            }else{
                DotManager.removeDot(skin);
            }
            let arr = E.LangMgr.getLang("Qua1").split("|");
            skin.tf1.text = arr[data].toString();
        
            if(sel){
                skin.bg1.visible = true; 
                skin.bg2.visible = false;
            }else{
                skin.bg1.visible = false; 
                skin.bg2.visible = true;
            }
        }
    }
    private onSelectHandler(v:number){
        // let _type = this._mTabList[v];
        // for(let  i = 0;i < this._viewCtllist.length;i++){
        //     let ctl:BaseXingFuKuanghuanCtl = this._viewCtllist[i];
        //     if(ctl.type == _type){
        //         ctl.onInit();
        //     }else{
        //         ctl.onExit();
        //     }
        // }
        this._ui.list1.array = t_Custom_CostumesProxy.Ins.mapList[t_Custom_CostumesProxy.Ins.qua[v]];
    }

    private onTabUpdate(){
        this._tabSkinCtl.refresh();
    }

    protected onInit(): void {
        E.ViewMgr.Close(EViewType.HuanzhuangMain);
        MainModel.Ins.mainMask = true;
        HuanZhuangModel.Ins.on(HuanZhuangEvent.SuitUpdate,this,this.onTabUpdate);       
        let qualist:number[] = t_Custom_CostumesProxy.Ins.qua;
        // console.log(qualist);
        this._tabSkinCtl.getItemList(this.tabsCtl,qualist,0);
        DebugUtil.draw(this._ui.tabCon);
    }
}