import { TabControl } from "../../../../../frame/view/TabControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ChiefAssist_req, stChief } from "../../../../network/protocols/BaseProto";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangItem1 } from "./item/FuJiangItem1";

export class FuJiangCKView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangCKViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private tabsCtl:TabControl;
    private tabList: any;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangCKViewUI;
            this.bindClose(this._ui.btn_close);

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3,this._ui.tab4,this._ui.tab5,this._ui.tab6,this._ui.tab7];
            this.tabList = ["全部","一般","精良","稀有","史诗","天赐","神铸"];
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._ui.list.itemRender = FuJiangItem1;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list.selectEnable = true;
            this._ui.list.selectHandler = new Laya.Handler(this,this.onSelectHandler);
        }
    }

    private _type:number;
    private _data:stChief;
    private _index:number;
    protected onInit(): void {
        this._type = this.Data[0];
        this._data = this.Data[1];
        this._index = this.Data[2];
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(): void {
        this.tabsCtl.selectIndex = -1;
        this._ui.list.selectedIndex = -1;
    }

    private onRenderHandler(item:FuJiangItem1){
        item.ctl.setData(item.dataSource);
    }

    private onSelectHandler(index:number){
        if(index == -1){return};
        let data:stChief = this._ui.list.array[index];
        if(this._type == 1){
            E.ViewMgr.Open(EViewType.FuJiangWuSun1,null,[this._type,this._data,data]);
        }else if(this._type == 2){
            // if(this._data){
            //     E.ViewMgr.Open(EViewType.FuJiangWuSun1,null,[this._type,this._data,data,this._index]);
            // }else{
            //     let req:ChiefAssist_req = new ChiefAssist_req;
            //     req.assistId = this._index;
            //     req.cheifId = data.cheifId;
            //     SocketMgr.Ins.SendMessageBin(req);
            //     this.Close();
            // }
            E.ViewMgr.Open(EViewType.FuJiangPY,null,data);
            this.Close();
        }
        this._ui.list.selectedIndex = -1;
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
        let arr:stChief[] = FuJiangModel.Ins.getFuJiangList(v);
        if(this._type == 1){
            let index1 = arr.findIndex(ele => ele.cheifId == this._data.cheifId);
            if(index1 != -1){
                arr.splice(index1,1);
            }
        }else if(this._type == 2){
            if(this._data){
                let index2 = arr.findIndex(ele => ele.cheifId == this._data.cheifId);
                if(index2 != -1){
                    arr.splice(index2,1);
                }
            }
            let index = arr.findIndex(ele => ele.pos > 0);
            if(index != -1){
                arr.splice(index,1);
            }
        }
        this._ui.list.array = arr;
    }
}