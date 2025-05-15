import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { BaoShiModel } from "../model/BaoShiModel";
import { FaZhengListProxy } from "../proxy/BaoShiProxy";
import { BaoShiViewItemCtl } from "./ctl/BaoShiViewItemCtl";
import { FazhengDHItem1 } from "./item/FazhengDHItem1";

class FazhengDHLabel extends RowMoveBaseNode{
    protected clsKey:string = "FazhengDHLabel";
    protected createNode (index){
        let _skin:ui.views.baoshi.ui_fazhengDHItemLabelUI = Laya.Pool.getItemByClass(this.clsKey,ui.views.baoshi.ui_fazhengDHItemLabelUI);
        let vo = this.list[index];
        
        _skin.lab.text = vo;
        _skin.y = this.y;
        return _skin;
    }
}

class FazhengDHItem extends RowMoveBaseNode {
    protected clsKey: string = "FazhengDHItem";
    protected createNode(index) {
        let _skin: FazhengDHItem1 = Laya.Pool.getItemByClass(this.clsKey, FazhengDHItem1);
        _skin.setData(this.list[index]);
        _skin.x = index * _skin.width;
        _skin.y = this.y;
        return _skin;
    }
}

//兑换
export class FazhengDHView extends ViewBase{
    private _ui:ui.views.baoshi.ui_fazhengDHViewUI;
    protected mMask = true;
    protected autoFree = true;
    private _baoshiCtl:BaoShiViewItemCtl;
    private _panelCtl: ScrollPanelControl;// 

    protected  onAddLoadRes(){
        this.addAtlas('baoshi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.baoshi.ui_fazhengDHViewUI;
            this.bindClose(this._ui.btn_close);

            this._ui.btn_fz.visible = false;
            this.btnList.push(ButtonCtl.Create(this._ui.btn_fz,new Laya.Handler(this,this.onBtnFZClick)));

            this._baoshiCtl = new BaoShiViewItemCtl(this._ui.view_bs);
            this._panelCtl = new ScrollPanelControl();
            this._panelCtl.init(this._ui.panel);
        }
    }

    private onBtnFZClick(){
        E.ViewMgr.Open(EViewType.FaZhengGHView);
    }

    protected onInit(){
        BaoShiModel.Ins.selectMid = 0;
        // BaoShiModel.Ins.on(BaoShiModel.FAZHENG_UPDATA,this,this.updataView);
        BaoShiModel.Ins.on(BaoShiModel.SELECT_MID,this,this.onSelectMid);
        this.updataView();
    }

    protected onExit(){
        this._panelCtl.clear();
        // BaoShiModel.Ins.off(BaoShiModel.FAZHENG_UPDATA,this,this.updataView);
        BaoShiModel.Ins.off(BaoShiModel.SELECT_MID,this,this.onSelectMid);
    }

    private onSelectMid(){
        if(BaoShiModel.Ins.selectMid == BaoShiModel.Ins.mationId){
            this.updataFZView(BaoShiModel.Ins.getEquipList(),BaoShiModel.Ins.mationId);
        }else{
            this.updataFZView([],BaoShiModel.Ins.selectMid);
        }
    }

    private getDataList(){
        let fzmap = {};
        let array = [];
        let arr = FaZhengListProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(!fzmap[arr[i].f_formationQuality]){
                fzmap[arr[i].f_formationQuality] = [];
            }
            fzmap[arr[i].f_formationQuality].push(arr[i]);
        }

        for (let ele in fzmap){
            let vo:any = {};
            if(parseInt(ele) == 1){
                vo.lab = "初级法阵";
            }else if(parseInt(ele) == 2){
                vo.lab = "中级法阵";
            }else{
                vo.lab = "高级法阵";
            }
            vo.list = [];
            array.push(vo);
            let voo:any = {};
            voo.lab = "";
            voo.list = fzmap[ele];
            array.push(voo);
        }
        return array;
    }

    private refreshPanel(){
        let arr = this.getDataList();
        this._panelCtl.clear();
        for(let i = 0;i < arr.length;i++){
            if(arr[i].lab != ""){
                this._panelCtl.split([arr[i].lab],FazhengDHLabel,28);
            }else{
                let h = Math.ceil(arr[i].list.length / 3);
                this._panelCtl.split(arr[i].list,FazhengDHItem,225,0,3);
            }
        }
        this._panelCtl.end();
    }

    private updataView(){
        let fzCfg;
        if(BaoShiModel.Ins.selectMid){
            fzCfg = FaZhengListProxy.Ins.getCfgById(BaoShiModel.Ins.selectMid);
            this._baoshiCtl.setData([],false,BaoShiModel.Ins.selectMid);
            this._ui.lab_fzsm.text = "法阵加成：" + BaoShiModel.Ins.getFZST(BaoShiModel.Ins.selectMid);
        }else{
            fzCfg = FaZhengListProxy.Ins.getCfgById(BaoShiModel.Ins.mationId);
            this._baoshiCtl.setData(BaoShiModel.Ins.getEquipList(),false,BaoShiModel.Ins.mationId);
            this._ui.lab_fzsm.text = "法阵加成：" + BaoShiModel.Ins.getFZST(BaoShiModel.Ins.mationId);
        }
        let iCfg = ItemProxy.Ins.getCfg(fzCfg.f_itemid);
        this._ui.lab_fz.text = main.itemName(iCfg.f_name);
        this.refreshPanel();
    }

    public updataFZView(list:any,id:number){
        this._baoshiCtl.setData(list,false,id);
        this._ui.lab_fzsm.text = "法阵加成：" + BaoShiModel.Ins.getFZST(id);
    }
}