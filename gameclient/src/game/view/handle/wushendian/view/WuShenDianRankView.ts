import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../network/SocketMgr";
import { PalaceRankList_req } from "../../../../network/protocols/BaseProto";
import {DotManager} from "../../common/DotManager";
import { WuShenDianModel } from "../model/WuShenDianModel";
import { WuShenDianRankCtl } from "./ctl/WuShenDianRankCtl";
import { WuShenDianRankItem } from "./item/WuShenDianRankItem";

export class WuShenDianRankView extends ViewBase{
    private _ui:ui.views.wushendian.ui_wushendianRankViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;
    private _item:WuShenDianRankCtl;

    protected onAddLoadRes() {
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wushendian.ui_wushendianRankViewUI;
            this.bindClose(this._ui.btn_close);

            this.btnList.push(ButtonCtl.Create(this._ui.rightbtn,new Laya.Handler(this,this.onBtnClick)));

            this._ui.list.itemRender = WuShenDianRankItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._item = new WuShenDianRankCtl(this._ui.item);
        }
    }

    protected onInit(): void {
        WuShenDianModel.Ins.on(WuShenDianModel.UPDATA_RANK_VIEW, this, this.upDataView);
        WuShenDianModel.Ins.on(WuShenDianModel.UPDATA_RANKAWARD_VIEW, this, this.setRankRedTip);
        let req: PalaceRankList_req = new PalaceRankList_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        WuShenDianModel.Ins.off(WuShenDianModel.UPDATA_RANK_VIEW, this, this.upDataView);
        WuShenDianModel.Ins.off(WuShenDianModel.UPDATA_RANKAWARD_VIEW, this, this.setRankRedTip);
    }

    private onBtnClick(){
        E.ViewMgr.Open(EViewType.WuShenDianAwardView);
    }

    private onItemRender(item:WuShenDianRankItem){
        item.ctl.setData(item.dataSource);
    }

    private upDataView(){
        this._ui.list.array = WuShenDianModel.Ins.rankList;
        this._item.setData(WuShenDianModel.Ins.myStarRank,2);
        this.setRankRedTip();
    }

    private setRankRedTip(){
        if(WuShenDianModel.Ins.isRankAwardRedTip()){
            DotManager.addDot(this._ui.rightbtn,10);
        }else{
            DotManager.removeDot(this._ui.rightbtn);
        }
    }
}