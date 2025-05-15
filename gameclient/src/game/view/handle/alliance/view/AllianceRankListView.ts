import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainModel } from "../../main/model/MainModel";
import { AllianceModel } from "../model/AllianceModel";
import { RankItemCtl } from "./ctl/rankItemCtl";
import { ApplyItem } from "./item/ApplyItem";
import { RankItem } from "./item/RankItem";

/**
 * 同盟成员排行页面
 */
export class AllianceRankListView extends ViewBase{
    private _ui:ui.views.alliance.ui_alliance_rankUI;
    protected mMask = true;
    protected autoFree:boolean = true;
    
    private _ownerCtl;
    protected  onAddLoadRes(){
        this.addAtlas('alliance.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.alliance.ui_alliance_rankUI;
            this.bindClose(this._ui.close1);

            this._ui.list1.itemRender = RankItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list1.vScrollBarSkin = ' ';

            this._ownerCtl = new RankItemCtl(this._ui.self);
        }
    }

    private onItemRender(item: ApplyItem) {
        item.setData(item.dataSource);
    }

    protected onInit(){
        this.onInnerRankUpdate();
        AllianceModel.Ins.on(AllianceModel.INNER_RANK_UPDATE, this, this.onInnerRankUpdate);
    }

    private onInnerRankUpdate() {
        this._ui.list1.array = AllianceModel.Ins.innerRankList;
        const playerId = MainModel.Ins.mRoleData.mPlayer.AccountId;
        const player = AllianceModel.Ins.innerRankList.find(o => o.accountId === playerId);
        if (player) {
            this._ownerCtl.updateView(player);
        }
    }

    protected onExit(){
        AllianceModel.Ins.off(AllianceModel.INNER_RANK_UPDATE, this, this.onInnerRankUpdate);
    }
}