import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { WarcraftSkin_req } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { WowHuanZhuangModel } from "../model/WowHuanZhuangModel";
import { WowHuanZhuangListProxy } from "../proxy/WowHuanZhuangProxy";

export class WowHuanZhuangView extends ViewBase{
    private _ui:ui.views.wowhuanzhuang.ui_wowhuangzhuangViewUI;
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
            this.UI = this._ui = new ui.views.wowhuanzhuang.ui_wowhuangzhuangViewUI;
            this.bindClose(this._ui.btn_close);

            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_tj,new Laya.Handler(this,this.onTJClick)),
                ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onClick))
            );

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3];
            let st = E.getLang("wowhztab");
            this.tabList = st.split(":");
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._ui.list.itemRender = ui.views.wowhuanzhuang.ui_wowhuangzhuangItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list.selectEnable = true;

            this._ui.list1.itemRender = ui.views.wowhuanzhuang.ui_wowhuangzhuangIconItemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);
            this._ui.list1.selectEnable = true;
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
        this._ui.list1.array = WowHuanZhuangListProxy.Ins.getListByType(index);
        this._ui.list1.selectedIndex = 0;
    }

    private onRenderHandler(item:ui.views.wowhuanzhuang.ui_wowhuangzhuangItemUI,index:number){
        item.lab.text = index + 1 + "";
        if(index == this._ui.list.selectedIndex){
            item.sp.visible = true;
            this.creatAvatar(this._ui.list.selectedItem);
            this.updataBtn(this._ui.list.selectedItem);
        }else{
            item.sp.visible = false;
        }

        let arr = WowHuanZhuangModel.Ins.getSkinIDsByType(this.tabsCtl.selectIndex + 1);
        if(arr.indexOf(parseInt(item.dataSource))){//已获得
            item.suo.visible = false;
        }else{
            item.suo.visible = true;
        }

        let skinId = WowHuanZhuangModel.Ins.getSkinIDByType(this.tabsCtl.selectIndex + 1);
        if(parseInt(item.dataSource) == skinId){//已幻化
            item.gou.visible = true;
        }else{
            item.gou.visible = false;
        }
    }

    private onRenderHandler1(item:ui.views.wowhuanzhuang.ui_wowhuangzhuangIconItemUI,index:number){
        if(index == this._ui.list1.selectedIndex){
            let data:Configs.t_Image_List_dat = this._ui.list1.selectedItem;
            item.bg.visible = true;
            this._ui.lab_name.text = data.f_ImageName;
            if(data.f_SkinID == ""){
                this._ui.list.visible = false;
                this.creatAvatar(data.f_ImageID);
                this.updataBtn(data.f_ImageID);
            }else{
                this._ui.list.visible = true;
                let arr = [data.f_ImageID.toString()];
                arr = arr.concat(data.f_SkinID.split("|"));
                if(arr.length >= this._ui.list.repeatX){
                    this._ui.list.width = 540;
                }else{
                    this._ui.list.width = (arr.length * 62) + (arr.length - 1) * this._ui.list.spaceX;
                }
                this._ui.list.array = arr;
                this._ui.list.selectedIndex = 0;
            }
        }else{
            item.bg.visible = false;
        }
        let cfg:Configs.t_Image_List_dat = item.dataSource;
        item.icon.skin = "o/Image_Head/" + cfg.f_Headicon;

        let arr = WowHuanZhuangModel.Ins.getSkinIDsByType(this.tabsCtl.selectIndex + 1);
        if(arr.indexOf(cfg.f_ImageID) != -1){//已获得
            item.suo.visible = item.zz.visible = false;
        }else{
            item.suo.visible = item.zz.visible = true;
        }

        let skinId = WowHuanZhuangModel.Ins.getSkinIDByType(this.tabsCtl.selectIndex + 1);
        let arr1 = [cfg.f_ImageID.toString()];
        arr1 = arr1.concat(cfg.f_SkinID.split("|"));
        if(arr1.indexOf(skinId.toString()) != -1){//已幻化
            item.gou.visible = true;
        }else{
            item.gou.visible = false;
        }
    }

    private onTJClick(){
        E.ViewMgr.Open(EViewType.WowHuanZhuangView1);
    }

    private _skinId:number;
    private onClick(){
        let req:WarcraftSkin_req = new WarcraftSkin_req;
        req.type = this.tabsCtl.selectIndex + 1;
        req.fid = this._skinId;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onInit(): void {
        WowHuanZhuangModel.Ins.on(WowHuanZhuangModel.UPDATA_SKINID,this,this.onUpdataView);
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(): void {
        WowHuanZhuangModel.Ins.off(WowHuanZhuangModel.UPDATA_SKINID,this,this.onUpdataView);
        this.tabsCtl.dispose();
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
    }

    private updataBtn(skinId:number){
        let _skinId = WowHuanZhuangModel.Ins.getSkinIDByType(this.tabsCtl.selectIndex + 1);
        if(skinId == _skinId){
            this._ui.lab.text = "已幻化";
            this._ui.btn.disabled = true;
        }else{
            this._ui.lab.text = "幻化";
            let arr = WowHuanZhuangModel.Ins.getSkinIDsByType(this.tabsCtl.selectIndex + 1);
            if(arr.indexOf(skinId) != -1){
                this._ui.btn.disabled = false;
            }else{
                this._ui.btn.disabled = true;
            }
        }
    }

    private onUpdataView(){
        this._ui.list1.refresh();
    }

    private _avatar:AvatarMonsterView;
    private _eff:SimpleEffect;
    private creatAvatar(skinId:number){
        this._skinId = skinId;
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
        this._ui.img.skin = "";
        
        if(this.tabsCtl.selectIndex == 0){
            this._avatar = AvatarFactory.createCharacter(skinId);
            this._ui.sp.addChild(this._avatar);
        }else if(this.tabsCtl.selectIndex == 1){
            this._ui.img.skin = AvatarFactory.createFlag(skinId);
        }else if(this.tabsCtl.selectIndex == 2){
            this._eff = AvatarFactory.createHalo(skinId,this._ui.sp);
        }
    }
}