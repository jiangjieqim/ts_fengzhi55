import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { AllianceCfgProxy } from "../../alliance/proxy/AllianceProxy";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { MemberItem } from "./item/MemberItem";

/**
 * 联盟成员列表页面
 */
export class AllianceFightMemberView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightMemberViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    protected  onAddLoadRes(){
        this.addAtlas('allianceFight.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightMemberViewUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = MemberItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender1);
            this._ui.list.vScrollBarSkin = ' ';
        }
    }

    private onItemRender1(item: MemberItem) {
        item.setData(item.dataSource);
    }

    private onViewUpdate() {
        this._ui.list.array = AllianceFightModel.Ins.playerList;
        this._ui.name_tf.text = this.Data.name;
        this._ui.id_tf.text = this.Data.uid;
        this._ui.rank_tf.text = this.Data.rank;
        const num = AllianceCfgProxy.Ins.GetDataById(1).f_maxjoin;
        this._ui.num_tf.text = `${AllianceFightModel.Ins.playerList.length}/${num}`;
    }

    protected onInit(){
        this.onViewUpdate();
    }

    protected onExit(){
    }
}