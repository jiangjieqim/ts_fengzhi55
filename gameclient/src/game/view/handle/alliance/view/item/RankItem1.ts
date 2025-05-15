import { ui } from "../../../../../../ui/layaMaxUI";
import { stAllianceBossRank } from "../../../../../network/protocols/BaseProto";
import { AllianceCfgProxy } from "../../proxy/AllianceProxy";

export class RankItem1 extends ui.views.alliance.ui_alliance_list_item1UI{
    constructor() {
        super();

    }

    public setData(value: stAllianceBossRank){
        if(!value)return;
        const maxNum = (AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat).f_maxjoin;
        this.ranktf.text = value.rank + '';
        this.nametf.text = value.name;
        this.leveltf.text = value.accHarm + '';
        this.numtf.text = value.num + '/' + maxNum;
    }
}