import { ui } from "../../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { AllianceMember_req, stAllianceWarAllianceRank } from "../../../../../network/protocols/BaseProto";
import { AllianceFightModel } from "../../model/AllianceFightModel";
import { RankItemCtl1 } from "../ctl/RankItemCtl1";

export class RankItem1 extends ui.views.allianceFight.ui_allianceFightRankItem1UI{
    constructor() {
        super();
        this.rankItemCtl = new RankItemCtl1(this);
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private rankItemCtl;
    private _data: stAllianceWarAllianceRank;

    public setData(value: stAllianceWarAllianceRank){
        if (!value) return;
        this._data = value;
        this.rankItemCtl.updateView(value);
    }

    public onClick() {
        if (!this._data?.uid) return;
        const name = this._data.name;
        const uid = this._data.uid;
        const rank = this._data.rank;
        AllianceFightModel.Ins.selectedAlliance = { name, uid, rank };
        const req = new AllianceMember_req();
        req.allianceId = this._data.uid;
        SocketMgr.Ins.SendMessageBin(req);
    }
}