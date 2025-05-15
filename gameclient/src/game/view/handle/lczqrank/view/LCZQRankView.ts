import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { SkyRank_req, SkyRank_revc } from "../../../../network/protocols/BaseProto";
import { LCZQRankModel } from "../model/LCZQRankModel";
import { LCRankCtl } from "./LCRankCtl";
import { LCRankCtl1 } from "./LCRankCtl1";
import { LCRankItem1 } from "./LCRankItem1";
import { ZQRankCtl } from "./ZQRankCtl";
import { ZQRankCtl1 } from "./ZQRankCtl1";
import { ZQRankItem1 } from "./ZQRankItem1";
import { E } from "../../../../G";

export class LCZQRankView extends ViewBase{
    private _ui:ui.views.lczqrank.lczqRankViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    private tabList: any;
    private tabsCtl:TabControl;

    private lcItem:LCRankCtl1;
    private lcItem1:LCRankCtl;
    private lcItem2:LCRankCtl;
    private lcItem3:LCRankCtl;

    private zqItem:ZQRankCtl1;
    private zqItem1:ZQRankCtl;
    private zqItem2:ZQRankCtl;
    private zqItem3:ZQRankCtl;

    protected onAddLoadRes() {
        this.addAtlas("jjc.atlas");
        this.addAtlas('jjcAttr.atlas');
        this.addAtlas("lczqrank.atlas");
    }
    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.lczqrank.lczqRankViewUI;

            this.bindClose(this._ui.btn_close);

            const tabsSkin = [this._ui.tab1,this._ui.tab2];
            this.tabList = ["灵宠","坐骑"];
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._ui.list.itemRender = LCRankItem1;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list1.itemRender = ZQRankItem1;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);

            this.lcItem = new LCRankCtl1(this._ui.sItem);
            this.lcItem1 = new LCRankCtl(this._ui.item1);
            this.lcItem2 = new LCRankCtl(this._ui.item2);
            this.lcItem3 = new LCRankCtl(this._ui.item3);

            this.zqItem = new ZQRankCtl1(this._ui.sItem1);
            this.zqItem1 = new ZQRankCtl(this._ui.item11);
            this.zqItem2 = new ZQRankCtl(this._ui.item22);
            this.zqItem3 = new ZQRankCtl(this._ui.item33);
            this._ui.title1.text = E.getLang("ranktitle1");
        }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.huodong.ui_tabUI = tabSkin;
        skin.txt.text = this.tabList[index];
        if (sel) {
            skin.img2.visible = true;
            skin.img1.visible = false;
            skin.txt.color = "#A1572F";
        } else {
            skin.img2.visible = false;
            skin.img1.visible = true;
            skin.txt.color = "#e4bb87";
        }
    }
  
    private onTabSelectHandler(v:number){
        if(v == -1)return;
        let req:SkyRank_req = new SkyRank_req;
        if(v == 0){
            req.type = 2;
        }else{
            req.type = 1;
        }
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onInit(): void {
        LCZQRankModel.Ins.on(LCZQRankModel.UPDATA_VIEW,this,this.updataView);
        this._ui.sp.visible = false;
        this._ui.sp1.visible = false;
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(): void {
        LCZQRankModel.Ins.off(LCZQRankModel.UPDATA_VIEW,this,this.updataView);
        this.tabsCtl.selectIndex = -1;
    }

    private onRenderHandler(item:LCRankItem1){
        item.ctl.setData(item.dataSource);
    }

    private onRenderHandler1(item:ZQRankItem1){
        item.ctl.setData(item.dataSource);
    }

    private updataView(value:SkyRank_revc){
        if(value.type == 2){
            this._ui.sp.visible = true;
            this._ui.sp1.visible = false;
            this.updataLCView(value);
        }else{
            this._ui.sp.visible = false;
            this._ui.sp1.visible = true;
            this.updataZQView(value);
        }
    }

    private updataZQView(value:SkyRank_revc){
        let arr = [];
        let arr1 = [];
        for(let i:number = 0;i<value.dataList.length;i++){
            if(value.dataList[i].ranking <= 3){
                arr.push(value.dataList[i]);
            }else{
                arr1.push(value.dataList[i]);
            }
        }

        for(let i:number=0;i<3;i++){
            if(arr[i]){
                this["zqItem" + (i+1)].setData(arr[i]);
            }else{
                this["zqItem" + (i+1)].setData(null);
            }
        }

        this._ui.list1.array = arr1;

        if(value.self.length){
            this._ui.sItem1.visible = true;
            this.zqItem.setData(value.self[0],2);
        }else{
            this._ui.sItem1.visible = false;
        }
    }

    private updataLCView(value:SkyRank_revc){
        let arr = [];
        let arr1 = [];
        for(let i:number = 0;i<value.dataList.length;i++){
            if(value.dataList[i].ranking <= 3){
                arr.push(value.dataList[i]);
            }else{
                arr1.push(value.dataList[i]);
            }
        }

        for(let i:number=0;i<3;i++){
            if(arr[i]){
                this["lcItem" + (i+1)].setData(arr[i]);
            }else{
                this["lcItem" + (i+1)].setData(null);
            }
        }

        this._ui.list.array = arr1;

        if(value.self.length){
            this._ui.sItem.visible = true;
            this.lcItem.setData(value.self[0],2);
        }else{
            this._ui.sItem.visible = false;
        }
    }
}