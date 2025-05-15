import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../network/SocketMgr";
import { RecruitChief_req } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { FuJiangFeastModel } from "../../fujiangfeast/FuJiangFeastModel";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ECellType } from "../../main/vos/ECellType";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangConfigProxy, FuJiangListProxy } from "../proxy/FuJiangProxy";
import { FuJiangCKItemCtl } from "./ctl/FuJiangCKItemCtl";
import { NewPlayerFujiangFeastModel } from "../../newplayerfeast/NewPlayerFeastModel";
import { ItemVo } from "../../main/vos/ItemVo";

export class FuJiangHDView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangHDViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _ctl0:FuJiangCKItemCtl;
    private _ctl1:FuJiangCKItemCtl;
    private _ctl2:FuJiangCKItemCtl;
    private _ctl3:FuJiangCKItemCtl;
    private _ctl4:FuJiangCKItemCtl;
    private _ctl5:FuJiangCKItemCtl;
    private _ctl6:FuJiangCKItemCtl;
    private _ctl7:FuJiangCKItemCtl;
    private _ctl8:FuJiangCKItemCtl;
    private _ctl9:FuJiangCKItemCtl;
    private _ctl10:FuJiangCKItemCtl;

    private _eff:SimpleEffect;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangHDViewUI;

            ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick));
            ButtonCtl.Create(this._ui.btn_ok,new Laya.Handler(this,this.onBtnOKClick));

            for(let i:number=0;i<11;i++){
                this["_ctl" + i] = new FuJiangCKItemCtl(this._ui["item" + i]);
            }
            this._eff = new SimpleEffect(this._ui.sp1, `o/spine/cardgongxi/cardgongxi`);
        }
    }

    private _itemVo:ItemVo;
    protected onInit(): void {
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_ZM_DH_OK,this,this.onOk);
        this._indexEff = this.Data[0];
        this._itemVo = this.Data[1];
        this._eff.play(0,false,this,this.effEnd);
        this.visItem();
        if(FuJiangModel.Ins.zmNum == 0){
            this._ui.lab_num.text = "招募一次";
        }else{
            this._ui.lab_num.text = "招募十次";
        }
        this._ui.btn_qd.visible = this._ui.btn_ok.visible = false;
    }

    protected onExit(): void {
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_ZM_DH_OK,this,this.onOk);
        if(this._eff){
            this._eff.stop();
        }
    }

    private onOk(){
        this._ui.btn_qd.visible = this._ui.btn_ok.visible = true;
    }

    private effEnd(){
        this.playEff();
    }

    private visItem(){
        for(let i:number=0;i<11;i++){
            this._ui["item" + i].visible = false;
        }
    }

    private playEff(){
        if(FuJiangModel.Ins.zmNum == 0){
            this._ui.item0.visible = true;
            this.playOne();
        }else{
            this.playTen();
        }
    }

    private _indexEff;
    private playOne(){
        let cfg;
        let qua;
        if(FuJiangModel.Ins.recruitChief[0].cheifId){
            cfg = FuJiangListProxy.Ins.getCfgById(FuJiangModel.Ins.recruitChief[0].cheifId);
            qua = cfg.f_cheifQuality;
        }else{
            cfg = ItemProxy.Ins.getCfg(FuJiangModel.Ins.recruitChief[0].itemId);
            qua = cfg.f_qua;
            if(qua == 3 || qua == 4 || qua == 5){
                qua += 1;
            }
        }
        let index = FuJiangModel.Ins.quaList.findIndex(ele => ele == qua) + 1;
        if(index == 6){
            index = this._indexEff;
        }
        this._ctl0.setData(FuJiangModel.Ins.recruitChief[0]);
        this._ctl0.setEffOne(index);
    }

    private playTen(){
        for (let i: number = 0; i < 10; i++) {
            let cfg;
            let qua;
            if (FuJiangModel.Ins.recruitChief[i].cheifId) {
                cfg = FuJiangListProxy.Ins.getCfgById(FuJiangModel.Ins.recruitChief[i].cheifId);
                qua = cfg.f_cheifQuality;
            } else {
                cfg = ItemProxy.Ins.getCfg(FuJiangModel.Ins.recruitChief[i].itemId);
                qua = cfg.f_qua;
                if(qua == 3 || qua == 4 || qua == 5){
                    qua += 1;
                }
            }
            let index = FuJiangModel.Ins.quaList.findIndex(ele => ele == qua) + 1;
            if (index == 6) {
                index = this._indexEff;
            }
            this._ui["item" + (i + 1)].visible = true;
            this["_ctl" + (i + 1)].setData(FuJiangModel.Ins.recruitChief[i]);
            this["_ctl" + (i + 1)].setEffTen(index,i+1);
        }
    }

    private onBtnQDClick(){
        this.Close();
    }

    private onBtnOKClick(){
        if(this._itemVo.cfg.f_itemid == 293){
            if(!MainModel.Ins.isItemEnough(this._itemVo.cfg.f_itemid,this._itemVo.count)){
                E.ViewMgr.Open(EViewType.FuJiangGouMai);
                return;
            }
        }

        if(MainModel.Ins.isItemEnough(this._itemVo.cfg.f_itemid,this._itemVo.count),true){
            this.Close();
            let req:RecruitChief_req = new RecruitChief_req;
            req.itemId = this._itemVo.cfg.f_itemid;
            req.type = FuJiangModel.Ins.zmNum;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }
}