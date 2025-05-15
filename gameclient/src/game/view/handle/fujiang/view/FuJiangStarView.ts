import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangCMoraleProxy, FuJiangStarValueProxy } from "../proxy/FuJiangProxy";
import { FuJiangStarCtl } from "./ctl/FuJiangStarCtl";

export class FuJiangStarView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangSXTipUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _eff:SimpleEffect;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangSXTipUI;

            this._ui.list.itemRender = ui.views.fujiang.ui_fujiangAttrItem5UI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.renderhandler1);

            this._ui.list1.itemRender = ui.views.fujiang.ui_fujiangAttrItem5UI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.renderhandler1);
        }
    }

    private renderhandler1(item:ui.views.fujiang.ui_fujiangAttrItem5UI){
        let id = parseInt(item.dataSource.id);
        let val = parseInt(item.dataSource.value);
        let val1 = parseInt(item.dataSource.value1);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        item.valTf1.text = attrConvert(id,val1);
    }

    private setEff(){
        if(!this._eff){
            this._eff = new SimpleEffect(this._ui.sp,`o/spine/succeed/shengli`);
        }
        this._eff.play(2,false,this,this.effEnd);
    }

    private effEnd(){
        if(this._eff){
            this._eff.play(3,true);
        }
    }

    protected onInit(): void {
        let cfg = FuJiangModel.Ins.getFuJiangCfgById(this.Data);
        this._ui.lab_snum.text = "x" + FuJiangModel.Ins.oldStar;
        this._ui.lab_snum1.text = "x" + cfg.star;

        let arr = [];
        for(let i:number=0;i<FuJiangStarValueProxy.Ins.List.length;i++){
            let arrid = FuJiangStarValueProxy.Ins.List[i].f_attrid;
            let val = FuJiangModel.Ins.getStarAttr(cfg.cheifId,arrid,cfg.level,FuJiangModel.Ins.oldStar);
            let val1 = FuJiangModel.Ins.getStarAttr(cfg.cheifId,arrid,cfg.level,cfg.star);
            let data:any = {};
            data.id = arrid;
            data.value = val;
            data.value1 = val1;
            arr.push(data);
        }
        this._ui.list.array = arr;

        arr = []
        let oCfg = FuJiangCMoraleProxy.Ins.getCfgByStar(FuJiangModel.Ins.oldAllStar);
        let oArr = oCfg.f_MoraleAttr.split("|");
        let nCfg = FuJiangCMoraleProxy.Ins.getCfgByStar(FuJiangModel.Ins.getAllStarNum());
        let nArr = nCfg.f_MoraleAttr.split("|");
        for(let i:number=0;i<oArr.length;i++){
            let data:any = {};
            data.id = parseInt(oArr[i].split(":")[0]);
            data.value = parseInt(oArr[i].split(":")[1]);
            data.value1 = parseInt(nArr[i].split(":")[1]);;
            arr.push(data);
        }
        this._ui.list1.array = arr;

        this.setEff();
    }

    protected onExit(): void {
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
    }
}