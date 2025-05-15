import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangTrammelsChiefProxy } from "../../proxy/FuJiangProxy";
import { FujiangJBItem } from "./FujiangJBItem";
import { FujiangJBItem1 } from "./FujiangJBItem1";

export class FujiangJBView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangJBViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangJBViewUI;
            this.bindClose(this._ui.btn_close);
            ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick));
            ButtonCtl.Create(this._ui.btn_attr,new Laya.Handler(this,this.onBtnAttrClick));
            ButtonCtl.Create(this._ui.btn_zm,new Laya.Handler(this,this.onBtnZMClick));

            this._ui.list.itemRender = FujiangJBItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list1.itemRender = FujiangJBItem1;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("fjjbTitle","fjjbDec");
    }

    private onBtnAttrClick(){
        E.ViewMgr.Open(EViewType.FujiangJBSXView);
    }

    private onBtnZMClick(){
        E.ViewMgr.Open(EViewType.FuJiangChouKa);
    }

    private onRenderHandler(item:FujiangJBItem){
        item.setData(item.dataSource);
    }

    private onRenderHandler1(item:FujiangJBItem1){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_JIBAN,this,this.updataView);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA,this,this.updataView);
        this.updataView();
    }

    protected onExit(): void {
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_JIBAN,this,this.updataView);
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_UPDATA,this,this.updataView);
    }

    private updataView(){
        this._ui.list.array = FuJiangModel.Ins.jbDataList;
        let arr = FuJiangTrammelsChiefProxy.Ins.List;
        let array = [];
        let array1 = [];
        let array2 = [];
        for(let i:number=0;i<arr.length;i++){
            let vo = FuJiangModel.Ins.jbDataList.find(ele => ele.id == arr[i].f_id);
            if(vo){
                array.push(arr[i]);
                continue;
            }
            if(FuJiangModel.Ins.isFJJBJH(arr[i])){
                array1.push(arr[i]);
                continue;
            }
            array2.push(arr[i]);
        }
        this._ui.list1.array = array.concat(array1).concat(array2);
    }
}