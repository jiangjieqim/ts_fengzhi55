import { ui } from "../../../../../../ui/layaMaxUI";
import { WatchPlayerInfo_revc } from "../../../../../network/protocols/BaseProto";
import { BaoShiModel } from "../../../baoshi/model/BaoShiModel";
import { FaZhengListProxy } from "../../../baoshi/proxy/BaoShiProxy";
import { MainModel } from "../../../main/model/MainModel";
import { ItemProxy } from "../../../main/proxy/ItemProxy";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";

export class JjcAttrViewCtl4{
    protected skin:ui.views.jjcAttr.ui_jjc_attrView4UI;
    constructor(skin:ui.views.jjcAttr.ui_jjc_attrView4UI) {
        this.skin = skin;

        this.skin.list.itemRender = ui.views.jjcAttr.ui_jjc_attrItem4UI;
        this.skin.list.renderHandler = new Laya.Handler(this,this.onAttrHandler);
        this.skin.list1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem4UI;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onAttrHandler);
    }

    private onAttrHandler(item:ui.views.jjcAttr.ui_jjc_attrItem4UI){
        let arr = (item.dataSource as string).split(":");
        let id = parseInt(arr[0]);
        let val = attrConvert(id,parseInt(arr[1]));
        item.txt.text = MainModel.Ins.getAttrNameIdByID(id) + ":" + val;
        if(arr[3]){
            item.txt1.text = " (+" + attrConvert(id,parseInt(arr[3])) + ")"
            item.txt1.x = item.txt.x + item.txt.textField.width;
        }else{
            item.txt1.text = "";
        }

        item.lab_lv.text = "lv." + arr[2];
    }

    public setData(value:WatchPlayerInfo_revc){
        if(BaoShiModel.Ins.mationId){
            let cfg = FaZhengListProxy.Ins.getCfgById(BaoShiModel.Ins.mationId);
            let iCfg = ItemProxy.Ins.getCfg(cfg.f_itemid);
            this.skin.lab_name.text = main.itemName(iCfg.f_name);
            this.skin.quality.skin = IconUtils.getQuaIcon(iCfg.f_qua);
            this.skin.icon.skin = IconUtils.getIconByCfgId(cfg.f_itemid);
            let arr = BaoShiModel.Ins.getAttrListByType1(BaoShiModel.Ins.getEquipList(),1,BaoShiModel.Ins.mationId);
            arr = arr.concat(BaoShiModel.Ins.getAttrListByType1(BaoShiModel.Ins.getEquipList(),2,BaoShiModel.Ins.mationId));
            arr = arr.concat(BaoShiModel.Ins.getAttrListByType1(BaoShiModel.Ins.getEquipList(),3,BaoShiModel.Ins.mationId));
            arr = arr.concat(BaoShiModel.Ins.getAttrListByType1(BaoShiModel.Ins.getEquipList(),4,BaoShiModel.Ins.mationId));
            arr.sort(this.onSort);
            this.skin.list.array = arr;
        }else{
            this.skin.lab_name.text = "";
            this.skin.quality.skin = "remote/common/base/jiangli1.png";
            this.skin.icon.skin = "";
            this.skin.list.array = [];
        }

        if(value.Gem.formationId){
            let cfg = FaZhengListProxy.Ins.getCfgById(value.Gem.formationId);
            let iCfg = ItemProxy.Ins.getCfg(cfg.f_itemid);
            this.skin.lab_name1.text = main.itemName(iCfg.f_name);
            this.skin.quality1.skin = IconUtils.getQuaIcon(iCfg.f_qua);
            this.skin.icon1.skin = IconUtils.getIconByCfgId(cfg.f_itemid);
            let arr = BaoShiModel.Ins.getAttrListByType1(value.Gem.Gem,1,value.Gem.formationId);
            arr = arr.concat(BaoShiModel.Ins.getAttrListByType1(value.Gem.Gem,2,value.Gem.formationId));
            arr = arr.concat(BaoShiModel.Ins.getAttrListByType1(value.Gem.Gem,3,value.Gem.formationId));
            arr = arr.concat(BaoShiModel.Ins.getAttrListByType1(value.Gem.Gem,4,value.Gem.formationId));
            arr.sort(this.onSort);
            this.skin.list1.array = arr;
        }else{
            this.skin.lab_name1.text = "";
            this.skin.quality1.skin = "remote/common/base/jiangli1.png";
            this.skin.icon1.skin = "";
            this.skin.list1.array = [];
        }
    }

    private onSort(a:string,b:string){
        let aa = parseInt(a.split(":")[0]);
        let bb = parseInt(b.split(":")[0]);
        if(aa > bb){
            return 1;
        }else if(aa < bb){
            return -1;
        }else{
            return 0;
        }
    }
}