import { ui } from "../../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { JustWatchPlayer_req, stAllianceWarRewardRank } from "../../../../../network/protocols/BaseProto";
import { RankItemCtl3 } from "../ctl/RankItemCtl3";

export class RankItem3 extends ui.views.allianceFight.ui_allianceFightRankItem3UI{
    constructor() {
        super();
        this.rankItemCtl = new RankItemCtl3(this);
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private _data:stAllianceWarRewardRank;
    private rankItemCtl;

    public setData(value: stAllianceWarRewardRank){
        if(!value)return;
        this._data = value;
        this.rankItemCtl.updateView(value);
    }

    public onClick() {
        if (!this._data?.playerId) return;
        const req = new JustWatchPlayer_req();
        req.playerId = this._data.playerId;
        SocketMgr.Ins.SendMessageBin(req);
    }
}