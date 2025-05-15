import { ui } from "../../../../../../ui/layaMaxUI";
import { WatchPlayerInfo_revc, stEquipAttr, stItemEquipAttr } from "../../../../../network/protocols/BaseProto";
import { uint64 } from "../../../../../network/protocols/uint64";
import { HuYouModel } from "../../../huyou/model/HuYouModel";
import { HuYouIconProxy, HuYouQualityProxy } from "../../../huyou/proxy/HuYouProxy";
import { ItemProxy } from "../../../main/proxy/ItemProxy";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { QualityUtils } from "../../../main/vos/QualityUtils";

export class JjcAttrViewCtl3{
    protected skin:ui.views.jjcAttr.ui_jjc_attrView3UI;
    constructor(skin:ui.views.jjcAttr.ui_jjc_attrView3UI) {
        this.skin = skin;

        this.skin.list.itemRender = ui.views.jjcAttr.ui_jjc_attrItem3UI;
        this.skin.list.renderHandler = new Laya.Handler(this,this.onAttrHandler);
        this.skin.list1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem3UI;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onAttrHandler);
    }

    private onAttrHandler(item:ui.views.jjcAttr.ui_jjc_attrItem3UI){
        item.txt_level.text = "lv." + item.dataSource.lv;
        let iCfg = ItemProxy.Ins.getCfg(item.dataSource.id);
        // let cfg = HuYouQualityProxy.Ins.getCfgByQua(iCfg.f_qua);
        let hcfg = HuYouIconProxy.Ins.getCfgByIdAndAttr(item.dataSource.id,item.dataSource.attr.id);
        let val = attrConvert(item.dataSource.attr.id,item.dataSource.attr.value);
        item.txt_name.text = hcfg.f_SoulName + ` (${val})`;
        item.txt_name.color = QualityUtils.getQuaColor(iCfg.f_qua);
    }

    public setData(value:WatchPlayerInfo_revc){
        let array = [];
        let arr = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.sort_FY);
        for(let ele of arr){
            let obj:any = {};
            obj.id = ele.id;
            obj.lv = ele.level;
            obj.attr = HuYouModel.Ins.getAttr(ele.uid);
            array.push(obj);
        }
        array.sort(this.onSort);
        this.skin.list.array = array;

        array = [];
        arr = value.bagInfo;
        for(let ele of arr){
            let obj:any = {};
            obj.id = ele.id;
            obj.lv = ele.level;
            obj.attr = this.getAttr(ele.uid,value.bagInfoAttr);
            array.push(obj);
        }
        array.sort(this.onSort);
        this.skin.list1.array = array;
    }

    private getAttr(uid:uint64,arr:stItemEquipAttr[]):stEquipAttr{
        for(let ele in arr){
            if(arr[ele]){
                if(uid.equals(arr[ele].uid)){
                    return arr[ele].attrList[0];
                }
            }
        }
    }

    private onSort(a:any,b:any){
        let aa = HuYouQualityProxy.Ins.getCfgByItemID(a.id);
        let bb = HuYouQualityProxy.Ins.getCfgByItemID(b.id);
        if(aa.f_QualityID > bb.f_QualityID){
            return -1;
        }else if(aa.f_QualityID < bb.f_QualityID){
            return 1;
        }else{
            return 0;
        }
    }
}