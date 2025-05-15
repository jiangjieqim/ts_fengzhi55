import { ui } from "../../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { AllianceMember_req, stSpringFestivalAllianceRank } from "../../../../../network/protocols/BaseProto";
import { AllianceFightModel } from "../../../allianceFight/model/AllianceFightModel";

export class SpringFestivalRankItem extends ui.views.springFestival.ui_springFestivalRankItemUI{
    constructor(){
        super();
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        if(!this._data)return;
        const name = this._data.name;
        const uid = this._data.uid;
        const rank = this._data.rank;
        AllianceFightModel.Ins.selectedAlliance = { name, uid, rank };
        const req = new AllianceMember_req();
        req.allianceId = this._data.uid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:stSpringFestivalAllianceRank;
    public setData(value:stSpringFestivalAllianceRank){
        if(!value)return;
        this._data = value;
        this.mingcitf.text = value.rank + "";
        this.nameTf.text = value.name;
        this.lab.text = value.prestige + "";
    }
}