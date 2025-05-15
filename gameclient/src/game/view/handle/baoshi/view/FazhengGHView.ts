import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { BaoShiModel } from "../model/BaoShiModel";
import { BaoShiAttrCtl } from "./ctl/BaoShiAttrCtl";
import { BaoShiViewItemCtl } from "./ctl/BaoShiViewItemCtl";
import { FazhengGHItem } from "./item/FazhengGHItem";

//更换
export class FazhengGHView extends ViewBase{
    private _ui:ui.views.baoshi.ui_fazhengGHViewUI;
    protected mMask = true;
    protected autoFree = true;
    private _baoshiCtl:BaoShiViewItemCtl;
    private _baoshiAttrCtl:BaoShiAttrCtl;

    protected  onAddLoadRes(){
        this.addAtlas('baoshi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.baoshi.ui_fazhengGHViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(ButtonCtl.Create(this._ui.btn_tj,new Laya.Handler(this,this.onBtnTJClick)));

            this._baoshiCtl = new BaoShiViewItemCtl(this._ui.view_bs);
            this._baoshiAttrCtl = new BaoShiAttrCtl(this._ui.view_attr);

            this._ui.list.itemRender = FazhengGHItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list.selectEnable = true;
            this._ui.list.selectHandler = new Laya.Handler(this,this.onSelectHandler);
        }
    }

    protected onInit(){
        BaoShiModel.Ins.on(BaoShiModel.BAOSHI_UPDATA,this,this.onUpdataView);
        BaoShiModel.Ins.on(BaoShiModel.DEFFAZHENG_UPDATA,this,this.onUpdataView);
        this.updataView();
    }

    protected onExit(){
        this._ui.list.selectedIndex = -1;
        BaoShiModel.Ins.off(BaoShiModel.BAOSHI_UPDATA,this,this.onUpdataView);
        BaoShiModel.Ins.off(BaoShiModel.DEFFAZHENG_UPDATA,this,this.onUpdataView);
    }

    private onUpdataView(){
        Laya.timer.callLater(this,this.updataView);
    }

    private onBtnTJClick(){
        E.ViewMgr.Open(EViewType.BaoShiTJView);
    }

    private onSelectHandler(index:number){
        if(index == -1){return};
        for(let i:number=0;i<this._ui.list.array.length;i++){
            if(index == i){
                this._ui.list.array[i].isSelect = true;
            }else{
                this._ui.list.array[i].isSelect = false;
            }
        }
        if(this._ui.list.array[index].id == BaoShiModel.Ins.mationId){
            this._baoshiCtl.setData(BaoShiModel.Ins.getEquipList(),false,BaoShiModel.Ins.mationId);
            this._baoshiAttrCtl.setData(BaoShiModel.Ins.getEquipList(),BaoShiModel.Ins.mationId);
            this._ui.lab_fzsm.text = "法阵加成：" + BaoShiModel.Ins.getFZST(BaoShiModel.Ins.mationId);
        }else{
            this._baoshiCtl.setData([],false,this._ui.list.array[index].id);
            this._baoshiAttrCtl.setData([],1);
            this._ui.lab_fzsm.text = "法阵加成：" + BaoShiModel.Ins.getFZST(this._ui.list.array[index].id);
        }
        this._ui.list.refresh();
    }

    private onRenderHandler(item:FazhengGHItem){
        item.setData(item.dataSource);
    }

    private updataView(){
        // let fzCfg = FaZhengListProxy.Ins.getCfgById(BaoShiModel.Ins.mationId);
        // let iCfg = ItemProxy.Ins.getCfg(fzCfg.f_itemid);
        // this._ui.lab_fz.text = iCfg.f_name;
        this._baoshiCtl.setData(BaoShiModel.Ins.getEquipList(),false,BaoShiModel.Ins.mationId);
        this._baoshiAttrCtl.setData(BaoShiModel.Ins.getEquipList(),BaoShiModel.Ins.mationId);
        this._ui.lab_fzsm.text = "法阵加成：" + BaoShiModel.Ins.getFZST(BaoShiModel.Ins.mationId);

        BaoShiModel.Ins.mationIdList.sort(this.onSort);
        let index = 0;
        let arr = [];
        for(let i:number=0;i<BaoShiModel.Ins.mationIdList.length;i++){
            arr.push({id:BaoShiModel.Ins.mationIdList[i],isSelect:false});
            if(BaoShiModel.Ins.mationIdList[i] == BaoShiModel.Ins.mationId){
                index = i;
            }
        }
        this._ui.list.array = arr;
        this._ui.list.selectedIndex = index;
    }

    private onSort(a:number,b:number){
        if(a > b){
            return -1;
        }else if(a < b){
            return 1
        }else{
            return 0;
        }
    }
}