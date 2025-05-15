import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../network/SocketMgr";
import { PalaceRefreshBuff_req } from "../../../../network/protocols/BaseProto";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { WuShenDianModel } from "../model/WuShenDianModel";
import { WuShenDianConfigProxy } from "../proxy/WuShenDianProxy";
import { WuShenDianSHItem1 } from "./item/WuShenDianSHItem1";
import { WuShenDianSHItem2 } from "./item/WuShenDianSHItem2";
import { WuShenDianSHItem3 } from "./item/WuShenDianSHItem3";
import { WuShenDianSHItem4 } from "./item/WuShenDianSHItem4";
import { ScreenAdapter } from "../../../../G";

export class WuShenDianSHView extends ViewBase{
    private _ui:ui.views.wushendian.ui_wushendianSHViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    protected onAddLoadRes() {
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wushendian.ui_wushendianSHViewUI;

            this.btnList.push(ButtonCtl.Create(this._ui.btn_lq,new Laya.Handler(this,this.onBtnClick)));

            this._ui.list2.itemRender = WuShenDianSHItem3;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list3.itemRender = WuShenDianSHItem4;
            this._ui.list3.renderHandler = new Laya.Handler(this,this.onRenderHandler1);

            this._ui.list1.itemRender = WuShenDianSHItem2;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler2);

            this._ui.list.itemRender = WuShenDianSHItem1;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler3);
        }
    }

    private _type:number;
    protected onInit(): void {
        WuShenDianModel.Ins.on(WuShenDianModel.UPDATA_SHENHUN_VIEW,this,this.updataView);
        this._type = this.Data;
        this.updataView();
    }

    protected onExit(): void {
        WuShenDianModel.Ins.off(WuShenDianModel.UPDATA_SHENHUN_VIEW,this,this.updataView);
    }

    protected SetCenter(): void {
        this.UI.anchorX = this.UI.anchorY = 0.5;
        this.UI.x = this.ViewParent.width >> 1;
        let yy = (1500 - ScreenAdapter.DefaultHeight) * 0.5;
        this.UI.y = (this.ViewParent.height >> 1) + yy;
    }

    private onBtnClick(){
        let req:PalaceRefreshBuff_req = new PalaceRefreshBuff_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onRenderHandler(item:WuShenDianSHItem3){
        item.setData(item.dataSource);
    }

    private onRenderHandler1(item:WuShenDianSHItem4){
        item.setData(item.dataSource);
    }

    private onRenderHandler2(item:WuShenDianSHItem2){
        item.setData(item.dataSource);
    }

    private onRenderHandler3(item:WuShenDianSHItem1){
        item.setData(item.dataSource);
    }

    private updataView(){
        if(this._type == 1){
            this._ui.sp.visible = true;
            this._ui.sp1.visible = false;
            this.onSHView();
        }else{
            this._ui.sp.visible = false;
            this._ui.sp1.visible = true;
            this._ui.list1.array = WuShenDianModel.Ins.selCoreBuffList;
        }

        let arr = [];
        let len = parseInt(WuShenDianConfigProxy.Ins.GetDataById(1).f_BuffMinMax.split("|")[1]);
        for(let i:number=0;i<len;i++){
            let obj:any = {};
            if(WuShenDianModel.Ins.buffList[i]){
                obj.data = WuShenDianModel.Ins.buffList[i];
                obj.suo = 0;
                arr.push(obj);
            }else{
                obj.data = null;
                obj.suo = 1;
                arr.push(obj);
            }
        }
        this._ui.list2.array = arr;

        arr = [];
        len = parseInt(WuShenDianConfigProxy.Ins.GetDataById(1).f_CoreBuffMinMax.split("|")[1]);
        for(let i:number=0;i<len;i++){
            let obj:any = {};
            if(WuShenDianModel.Ins.coreBuffList[i] != null){
                obj.data = WuShenDianModel.Ins.coreBuffList[i];
                obj.suo = 0;
                arr.push(obj);
            }else{
                obj.data = null;
                obj.suo = 1;
                arr.push(obj);
            }
        }
        this._ui.list3.array = arr;
    }

    private onSHView(){
        this._ui.list.array = WuShenDianModel.Ins.selBuffList;
        let num = WuShenDianConfigProxy.Ins.GetDataById(1).f_FreeRefreshTimes - WuShenDianModel.Ins.refreshTimes;
        if(num > 0){
            this._ui.icon.visible = false;
            this._ui.lab_free.text = "剩余免费次数:" + num + "次";
        }else{
            this._ui.icon.visible = true;
            this._ui.lab_free.text = "";
            let id = WuShenDianConfigProxy.Ins.GetDataById(1).f_RefreshConsume.split("-")[0];
            let val = WuShenDianConfigProxy.Ins.GetDataById(1).f_RefreshConsume.split("-")[1];
            this._ui.icon.skin = IconUtils.getIconByCfgId(id);
            this._ui.lab2.text = val;
        }
    }
}