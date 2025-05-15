import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { WanShengJieItem } from "../item/WanShengJieItem";
import { WanShengJieModel } from "../model/WanShengJieModel";
import { WanShengJieProxy } from "../proxy/WanShengJieProxy";

export class WanShengJieView extends ViewBase{
    private _ui:ui.views.wanshengjie.ui_wanshengjieViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas("wanshengjie.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wanshengjie.ui_wanshengjieViewUI;
            this.bindClose(this._ui.btn_close);
            ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick));

            this._ui.list.itemRender = WanShengJieItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("WanShengJieTitle","WanShengJieDec");
    }

    private onRenderHandler(item:WanShengJieItem){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        WanShengJieModel.Ins.on(WanShengJieModel.UpdataView,this,this.updataView);
        this.updataView();

        let vo = ActivityModel.Ins.getVo(EActivityType.WanShengJie);
        if(vo){
            this._ui.titleTf.text = E.getLang("houdongtime") + ":" + TimeUtil.getMonthDay(vo.startTime) + "-" + TimeUtil.getMonthDay(vo.endTime);
        }
    }

    protected onExit(): void {
        WanShengJieModel.Ins.off(WanShengJieModel.UpdataView,this,this.updataView);
    }

    private updataView(){
        let arr = [];
        let arr1 = [];
        for(let i:number=0;i<WanShengJieProxy.Ins.List.length;i++){
            let cfg = WanShengJieProxy.Ins.List[i];
            if(WanShengJieModel.Ins.rewardList.indexOf(cfg.f_id) == -1){
                arr.push(cfg);
            }else{
                arr1.push(cfg);
            }
        }
        this._ui.list.array = arr.concat(arr1);
    }
}