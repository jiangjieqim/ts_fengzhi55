import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { AllianceWarBounsEnd_revc } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";

export class AllianceFightJSAwardView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightAwardJSViewUI;
    protected autoFree: boolean = true;
    protected mMask = true;
    protected mMainSnapshot = true;
    protected mMaskClick: boolean = false;

    private _eff:SimpleEffect;

    protected onAddLoadRes() {
        this.addAtlas('allianceFight.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightAwardJSViewUI;
            this.bindClose(this._ui.btn);

            this._ui.list.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._eff = new SimpleEffect(this._ui.succeedContainer,`o/spine/succeed/shengli`,0,0,1.0);
            this._eff.play(0,false,this,this.onCloseEnd);
        }
    }

    private onCloseEnd(){
        this._eff.play(1,true);
    }

    private onRenderHandler(item:ui.views.main.ui_slot_itemUI){
        let itemVo:ItemVo = new ItemVo();
        itemVo.cfgId = item.dataSource.id;
        itemVo.count = item.dataSource.count;
        ItemViewFactory.refreshSlot(item,itemVo);
    }

    protected onInit(): void {
        let data:AllianceWarBounsEnd_revc = this.Data;
        this._ui.rewadTf.text = "本次点击次数: " + data.num;
        this._ui.list.array = data.rewardList;
        if(data.rewardList.length >= this._ui.list.repeatX){
            this._ui.list.width = 590;
        }else{
            this._ui.list.width = (data.rewardList.length * 100) + (data.rewardList.length - 1) * this._ui.list.spaceX;
        }
    }

    protected onExit(): void {
        if(this._eff){
            this._eff.dispose();
        }
        this._eff = null;
        E.ViewMgr.Close(EViewType.AllianceFightAwardView);
        this.Close();
    }

}