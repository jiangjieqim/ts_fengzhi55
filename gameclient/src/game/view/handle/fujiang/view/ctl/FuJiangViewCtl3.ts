import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { CheifEquipUp_req, stChief } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { ValCtl } from "../../../main/ctl/ValLisCtl";
import { MainEvent } from "../../../main/model/MainEvent";
import { MainModel } from "../../../main/model/MainModel";
import { ECellType } from "../../../main/vos/ECellType";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangEquipSortProxy } from "../../proxy/FuJiangProxy";
import { FuJiangItem5 } from "../item/FuJiangItem5";
import { FuJiangSelCtl } from "./FuJiangSelCtl";

export class FuJiangViewCtl3{
    protected _ui:ui.views.fujiang.ui_fujiangView3UI;

    private _selCtl:FuJiangSelCtl;

    constructor(skin:ui.views.fujiang.ui_fujiangView3UI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        ValCtl.Create(this._ui.lab1,this._ui.img1,ECellType.FuJiangEquipLv);
        ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.FuJiangEquipStar);

        ButtonCtl.Create(this._ui.btn_cs,new Laya.Handler(this,this.onBtnYJCSClick));
        ButtonCtl.Create(this._ui.btn_sj,new Laya.Handler(this,this.onBtnYJSJClick));

        this._selCtl = new FuJiangSelCtl(this._ui.view);

        this._ui.list.itemRender = FuJiangItem5;
        this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        
    }

    private onRenderHandler(item:FuJiangItem5){
        item.setData(item.dataSource);
    }

    public onAdd(){
        this._ui.lab1.text = MainModel.Ins.mRoleData.getVal(ECellType.FuJiangEquipLv) + "";
        this._ui.lab2.text = MainModel.Ins.mRoleData.getVal(ECellType.FuJiangEquipStar) + "";
        FuJiangModel.Ins.on(FuJiangModel.SELECT_FUJIANG,this,this.updataView);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onUpdateMoney);
        this._selCtl.setData();
    }

    public onRemove(){
        FuJiangModel.Ins.off(FuJiangModel.SELECT_FUJIANG,this,this.updataView);
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        MainModel.Ins.off(MainEvent.ValChangeCell,this,this.onUpdateMoney);
        this._selCtl.onRemove();
    }

    private onBtnYJSJClick(){
        if(this._data){
            let req:CheifEquipUp_req = new CheifEquipUp_req;
            req.cheifId = this._data.cheifId;
            req.partId = 0;
            req.type = 0;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnYJCSClick(){
        if(this._data){
            let star:number = 1;
            let lv:number = 1;
            for(let i:number=0;i<this._data.equips.length;i++){
                star = Math.max(star,this._data.equips[i].equipStar);
                lv = Math.max(lv,this._data.equips[i].equipLevel);
            }
            if(star == 1 && lv == 1){
                E.ViewMgr.ShowMidError("已是最低等级");
                return;
            }
            E.ViewMgr.Open(EViewType.FuJiangCZ,null,[this._data,1]);
        }
    }

    private onUpdateMoney(id:number){
        if(id == ECellType.FuJiangEquipLv || id == ECellType.FuJiangEquipStar){
            this.onUpdataView();
        }
    }


    private _data:stChief;
    private updataView(value:stChief){
       this._data = value;
       this.onUpdataView();
    }

    private onUpdataView(){
        this._data = FuJiangModel.Ins.getFuJiangCfgById(this._data.cheifId);
        let arr = FuJiangEquipSortProxy.Ins.List;
        let array = [];
        for(let i:number=0;i<arr.length;i++){
            let vo = this._data.equips.find(ele => ele.partId === arr[i].f_Equipmentsort);
            let obj:any = {};
            obj.id = this._data.cheifId;
            obj.data = vo;
            array.push(obj);
        }
        this._ui.list.array = array;
        this.setRedTip();
    }

    private setRedTip(){
        let arr = FuJiangModel.Ins.getSZNoList();
        for(let i:number=0;i<arr.length;i++){
            if(FuJiangModel.Ins.isEquipLvRedTipOne(arr[i].cheifId)){
                this._selCtl.addRedTip(i);
            }else{
                this._selCtl.remRedTip(i);
            }
        }
    }
}