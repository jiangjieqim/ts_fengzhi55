import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../../frame/view/TabControl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { ChiefIntoBattle_req, stChief } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import {DotManager} from "../../../common/DotManager";
import { EServerVersion, MainModel } from "../../../main/model/MainModel";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangFlagListProxy, FuJiangSlotProxy } from "../../proxy/FuJiangProxy";
import { FuJiangItem1 } from "../item/FuJiangItem1";
import { FuJiangRoleCtl } from "./FuJiangRoleCtl";

export class FuJiangViewCtl1{
    protected _ui:ui.views.fujiang.ui_fujiangView1UI;

    private _itemCtl1:FuJiangRoleCtl;
    private _itemCtl2:FuJiangRoleCtl;
    private _itemCtl3:FuJiangRoleCtl;
    private _itemCtl4:FuJiangRoleCtl;
    private _itemCtl5:FuJiangRoleCtl;
    private _itemCtl6:FuJiangRoleCtl;

    private _plusCtl: FontClipCtl;

    private tabsCtl:TabControl;
    private tabList: any;

    constructor(skin:ui.views.fujiang.ui_fujiangView1UI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        for(let i:number = 1;i < 7; i++){
            let cfg = FuJiangSlotProxy.Ins.getCfgById(i);
            if(cfg.f_pos_available){
                this._ui["img_" + i].visible = true;
            }else{
                this._ui["img_" + i].visible = false;
            }
            this["_itemCtl" + i] = new FuJiangRoleCtl(this._ui["item" + i]);
        }

        ButtonCtl.Create(this._ui.btn_chouka,new Laya.Handler(this,this.onBtnChouKaClick));
        ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick));
        ButtonCtl.Create(this._ui.btn_zz,new Laya.Handler(this,this.onBtnZZClick));

        this._ui.list.itemRender = FuJiangItem1;
        this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        this._ui.list.selectEnable = true;
        this._ui.list.selectHandler = new Laya.Handler(this,this.onSelectHandler);

        const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3,this._ui.tab4,this._ui.tab5,this._ui.tab6,this._ui.tab7];
        this.tabList = ["全部","一般","精良","稀有","史诗","天赐","神铸"];
        this.tabsCtl  = new TabControl();
        this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

        this._plusCtl = FontCtlFactory.createPlus();
    }

    public onAdd(){
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA,this,this.updataView);
        this.tabsCtl.selectIndex = 0;
        FuJiangModel.Ins.changefjList = null;
        this.updataView();
    }

    public onRemove(){
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_UPDATA,this,this.updataView);
        this.tabsCtl.selectIndex = -1;
        this._ui.list.selectedIndex = -1;
    }

    private onSelectHandler(index:number){
        if(index == -1){return};
        let data:stChief = this._ui.list.array[index];
        if(data){
            E.ViewMgr.Open(EViewType.FuJiangPY,null,data);
        }
        this._ui.list.selectedIndex = -1;
        // if(data.pos){
        //     E.ViewMgr.Open(EViewType.FuJiangPY,null,data);
        // }else{
        //     let arr = FuJiangModel.Ins.getSZList();
            // let lv = MainModel.Ins.mRoleData.lv;
            // let num = 0;
            // let lvv:number;
            // for(let i:number=0;i<FuJiangSlotProxy.Ins.List.length;i++){
            //     if(MainModel.Ins.serverVer == EServerVersion.Version_1){
            //         lvv = FuJiangSlotProxy.Ins.List[i].f_unlocklevel_v1;
            //     }else{
            //         if(FuJiangModel.Ins.isNewServer){
            //             lvv = FuJiangSlotProxy.Ins.List[i].f_unlocklevelnew;
            //         }else{
            //             lvv = FuJiangSlotProxy.Ins.List[i].f_unlocklevel;
            //         }
            //     }
            //     if(lv >= lvv){
            //         num++;
            //     }
            // }
            // if(arr.length >= 2){
            //     E.ViewMgr.ShowMidError("上阵人数已满");
            // }else{
            //     let req:ChiefIntoBattle_req = new ChiefIntoBattle_req;
            //     req.type = 1;
            //     req.pos = FuJiangModel.Ins.getSZPos();
            //     req.isChief = data.isChief;
            //     req.cheifId = data.cheifId;
            //     SocketMgr.Ins.SendMessageBin(req);
            // }
        // }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.fujiang.ui_tabUI = tabSkin;
        skin.lab_name.text = this.tabList[index];
        switch (index) {
            case 0:
                skin.lab_name.color = "#FCEABE";
                break;
            case 1:
                skin.lab_name.color = "#ededed";
                break;
            case 2:
                skin.lab_name.color = "#5ea6ff";
                break;
            case 3:
                skin.lab_name.color = "#c060f7";
                break;
            case 4:
                skin.lab_name.color = "#fff43d";
                break;
            case 5:
                skin.lab_name.color = "#f83535";
                break;
            case 6:
                skin.lab_name.color = "#1cf2ff";
                break;
        }
        if (sel) {
            skin.img1.visible = true;
            skin.img2.visible = false;
        } else {
            skin.img1.visible = false;
            skin.img2.visible = true;
        }
    }

    private onTabSelectHandler(v:number){
        if(v == -1)return;
        this._ui.list.array = FuJiangModel.Ins.getFuJiangList(v);
    }

    private onRenderHandler(item:FuJiangItem1,index:number){
        item.ctl.setData(item.dataSource);
    }

    private onBtnChouKaClick(){
        E.ViewMgr.Open(EViewType.FuJiangChouKa);
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("FuJiangTitle","FuJiangDec");
    }

    private onBtnZZClick(){
        E.ViewMgr.Open(EViewType.FujiangSCZZView);
    }

    public updataView(){
        for(let i:number = 1;i<7;i++){
            let cfg = FuJiangModel.Ins.getFuJiangCfgByPos(i);
            if(cfg){
                this._ui["item" + i].visible = true;
                this["_itemCtl" + i].setData(cfg);
            }else{
                this._ui["item" + i].visible = false;
                this["_itemCtl" + i].onRemove();
            }

            let lv = MainModel.Ins.mRoleData.lv;
            let lvv:number;
            let sCfg = FuJiangSlotProxy.Ins.getCfgById(i);
            if(MainModel.Ins.serverVer == EServerVersion.Version_1){
                lvv = sCfg.f_unlocklevel_v1;
            }else{
                if(FuJiangModel.Ins.isNewServer){
                    lvv = sCfg.f_unlocklevelnew;
                }else{
                    lvv = sCfg.f_unlocklevel;
                }
            }
            if(lv >= lvv){
                this._ui["sp_suo" + i].visible = false;
            }else{
                this._ui["sp_suo" + i].visible = true;
                this._ui["lab_suo" + i].text = lvv + "级解锁";
            }
        }
        this._ui.list.array = FuJiangModel.Ins.getFuJiangList(this.tabsCtl.selectIndex);
        this.onUpdataFight();
        if(FuJiangModel.Ins.isFreeRed()){
            DotManager.addDot(this._ui.btn_chouka,0,25);
        }else{
            DotManager.removeDot(this._ui.btn_chouka);
        }
        this._ui.img_zq.skin = FuJiangFlagListProxy.Ins.getFlagBIcon(FuJiangModel.Ins.flagId);
    }

    private onUpdataFight(){
        let n = FuJiangModel.Ins.getFightNum();
        let v = StringUtil.val2Atlas(n);
        this._plusCtl.setValue(this._ui.plusCon,v);
    }
}