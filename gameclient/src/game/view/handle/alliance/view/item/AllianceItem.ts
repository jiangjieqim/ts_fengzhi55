import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { AllianceJoin_req, stAlliance } from "../../../../../network/protocols/BaseProto";
import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { AllianceCfgProxy } from "../../proxy/AllianceProxy";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { AllianceJoin } from "../../model/AllianceModel";
import { E } from "../../../../../G";

export class AllianceItem extends ui.views.alliance.ui_alliance_list_itemUI{
    constructor() {
        super();

        ButtonCtl.Create(this.join_btn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        console.log(3, this._data);
        if(this._data){
            let req = new AllianceJoin_req();
            req.uid = this._data.uid;
            req.type = AllianceJoin.Join;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:stAlliance;

    public setData(value: stAlliance){
        if(!value)return;
        this._data = value;
        const maxNum = (AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat).f_maxjoin;
        this.nametf.text = StringUtil.convertName(value.name);
        this.leveltf.text = value.playerLevel + '';
        this.numtf.text = value.num + '/' + maxNum;
        if (value.auto) {
            this.join_tf.text = E.getLang('AllianceJoin');
        } else {
            this.join_tf.text = E.getLang('AllianceApplyJoin');
        }
    }
}