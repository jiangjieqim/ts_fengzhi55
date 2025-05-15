import { TabControl } from "../../../../../frame/view/TabControl";
import { TabSkinCtl } from "../../../../../frame/view/TabSkinCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ActivityModel } from "../ActivityModel";
import { EActivityType } from "../model/EActivityType";
import { BaseXingFuKuanghuanCtl, KaiXiangDajiCtl } from "../model/KaiXiangDajiCtl";
import { TeHuiLiBaoCtl } from "../model/TeHuiLiBaoCtl";
import { ZheKouShopCtl } from "../model/ZheKouShopCtl";

export enum EXingFuKuangHuan{
    KaiXiangDaJi = 0,//开箱大吉
    TeHuiLiBao = 1,//特惠礼包
    ZhekouJiShiShangDian = 2,//折扣集市商店
}

export class XingFuKuangMainView extends ViewBase{
    private _ui:ui.views.huodong.ui_xingfukuang_mainUI;
    private tabsCtl:TabControl = new TabControl();
    private _tabSkinCtl:TabSkinCtl;
    protected mMask:boolean = true;
    private kaixiangCtl:KaiXiangDajiCtl;
    private tehuiCtl:TeHuiLiBaoCtl;
    private zhekouCtl:ZheKouShopCtl;
    private _viewCtllist:BaseXingFuKuanghuanCtl[] = [];
    private _mTabList:EXingFuKuangHuan[]=[
        EXingFuKuangHuan.KaiXiangDaJi,
        EXingFuKuangHuan.TeHuiLiBao,
        EXingFuKuangHuan.ZhekouJiShiShangDian];

    protected  onAddLoadRes(): void{
        this.addAtlas("huodong.atlas");
    }
    /**离开处理 */
    protected  onExit(): void{
        for(let i = 0;i < this._viewCtllist.length;i++){
            this._viewCtllist[i].onExit();
        }
        // MainModel.Ins.mainMask = false;
    }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected  onFirstInit(): void{
        if(!this._ui){
            this.UI = this._ui = new ui.views.huodong.ui_xingfukuang_mainUI();
            this.bindClose(this._ui.close1);
            this.tabsCtl = TabControl.Create(this,this.onSelectHandler,this.itemTabHandler);
            this._tabSkinCtl = TabSkinCtl.Create(ui.views.huodong.ui_xingfu_tabItemUI,"ui_xingfu_tabItemUI",this._ui.tablist);
            //////////////////////////////////////////////
            this.kaixiangCtl = new KaiXiangDajiCtl();
            this.kaixiangCtl.type = EXingFuKuangHuan.KaiXiangDaJi;
            this.kaixiangCtl.skin = this._ui.kaixiangdaji;
            this._viewCtllist = [];
            this._viewCtllist.push(this.kaixiangCtl);

            this.tehuiCtl = new TeHuiLiBaoCtl();
            this.tehuiCtl.type = EXingFuKuangHuan.TeHuiLiBao;
            this.tehuiCtl.skin = this._ui.meiritehui;
            this._viewCtllist.push(this.tehuiCtl);
            
            this.zhekouCtl = new ZheKouShopCtl();
            this.zhekouCtl.type = EXingFuKuangHuan.ZhekouJiShiShangDian;
            this.zhekouCtl.skin = this._ui.zhekoushangdian;
            this._viewCtllist.push(this.zhekouCtl);

            for(let i = 0;i < this._viewCtllist.length;i++){
                this._viewCtllist[i].onFirstInit();
            }
            //////////////////////////////////////////////
        }
    }

    private itemTabHandler(tabSkin,index:number,sel:boolean,data){
        let skin:ui.views.huodong.ui_xingfu_tabItemUI = tabSkin;
        let arr = E.LangMgr.getLang("XingFuTabs").split("|");
        let str = arr[index];
        skin.tf.text = str;
        skin.redimg.visible = false;
        if(sel){
            // skin.scaleX = skin.scaleY = 1.0;
            // skin.tf.color = "#00ff00";
            skin.bg1.skin = "remote/huodong/anniu_2.png";
        }else{
            // skin.scaleX = skin.scaleY = 0.9;
            // skin.tf.color = "#ff0000";
            skin.bg1.skin = "remote/huodong/anniu_1.png";
        }
    }

    private onSelectHandler(v:number){
        let _type = this._mTabList[v];
        for(let  i = 0;i < this._viewCtllist.length;i++){
            let ctl:BaseXingFuKuanghuanCtl = this._viewCtllist[i];
            if(ctl.type == _type){
                ctl.onInit();
            }else{
                ctl.onExit();
            }
        }
    }

    //private onBgHandler(){  }

    private getOpenlist(){
        this._mTabList = [];
        if(ActivityModel.Ins.isOpenByPackid(EActivityType.KaiXaingDaji)){
            this._mTabList.push(EXingFuKuangHuan.KaiXiangDaJi);
        }

        if(ActivityModel.Ins.isOpenByPackid(EActivityType.TeHuiLiBao)){
            this._mTabList.push(EXingFuKuangHuan.TeHuiLiBao);
        }

        if(ActivityModel.Ins.isOpenByPackid(EActivityType.Pack_Shop_Mart)){
            this._mTabList.push(EXingFuKuangHuan.ZhekouJiShiShangDian);
        }

        return this._mTabList;
    }
    protected mMainSnapshot = true;
    /**初始化*/
    protected  onInit(): void{
        // MainModel.Ins.mainMask = true;
        this._tabSkinCtl.getItemList(this.tabsCtl,this.getOpenlist(),0);
    }
}
