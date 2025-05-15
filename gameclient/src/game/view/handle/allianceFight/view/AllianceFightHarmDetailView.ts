import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { HarmItem } from "./item/HarmItem";


/**
 * 过五关斩六将玩家伤害排行页面
 */
export class AllianceFightHarmDetailView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightHarmDetailViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    protected  onAddLoadRes(){
        this.addAtlas('allianceFight.atlas');
        this.addAtlas('fighthard.atlas');
        this.addAtlas('jjc.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightHarmDetailViewUI;
            this.bindClose(this._ui.close1);
            this._ui.list.itemRender = HarmItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list.vScrollBarSkin = ' ';
        }
    }

    private onItemRender(item: HarmItem) {
        item.setData(item.dataSource);
    }

    private onRankUpdate() {
        this._ui.list.array = AllianceFightModel.Ins.bossHarmList;
    }

    protected onInit(){
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_BOSS_HARM_DETAIL, this, this.onRankUpdate);
    }

    protected onExit(){
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_BOSS_HARM_DETAIL, this, this.onRankUpdate);
    }
}