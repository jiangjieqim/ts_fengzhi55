import { ui } from "../../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { JustWatchPlayer_req, stAllianceWarInnerRank } from "../../../../../network/protocols/BaseProto";
import { RankItemCtl2 } from "../ctl/RankItemCtl2";

export class RankItem2 extends ui.views.allianceFight.ui_allianceFightRankItem2UI{
    constructor() {
        super();
        this.rankItemCtl = new RankItemCtl2(this);
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private _data:stAllianceWarInnerRank;
    private rankItemCtl;

    public setData(value: stAllianceWarInnerRank){
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