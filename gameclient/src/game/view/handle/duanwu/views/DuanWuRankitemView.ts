import { ui } from "../../../../../ui/layaMaxUI";
import { stMountNum } from "../../../../network/protocols/BaseProto";
import { ChengHaoListProxy } from "../../chenghao/proxy/ChengHaoProxy";
import { MainModel } from "../../main/model/MainModel";
/**端午排行item */
export class DuanWuRankitemView extends ui.views.duanwu.ui_duanwu_rank_itemUI{
    refresh(){
        let _data:stMountNum = this.dataSource;
        this.mingcitf.text = _data.ranking + "";
        this.nametf.text = _data.nickName;
        this.countTf.text = _data.num+"";
        MainModel.Ins.setTTHead(this.head.icon, MainModel.Ins.convertHead(_data.headUrl))
        this.head.titleIcon.visible = false;

        this.head.lvtf.text = "Lv."+_data.playerLevel;
        this.img_title.skin = ChengHaoListProxy.Ins.getIcon(_data.titleId);
    }
}