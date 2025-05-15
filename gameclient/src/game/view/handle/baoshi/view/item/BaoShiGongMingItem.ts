import { ui } from "../../../../../../ui/layaMaxUI";
import { stGemLifeBlood } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { BaoShiModel } from "../../model/BaoShiModel";
import { BaoShiLifeLineProxy } from "../../proxy/BaoShiProxy";

export class BaoShiGongMingItem extends ui.views.baoshi.ui_baoshiGongMingItemUI{
    constructor() {
        super();
    }

    public setData(value:stGemLifeBlood,index:number){
        if(!value)return;
        this.zOrder = index + 100;
        let cfg:Configs.t_Gem_Attribute_LifeLine_dat = BaoShiLifeLineProxy.Ins.GetDataById(value.id);
        let arr = cfg.f_attr.split(":");
        let id = parseInt(arr[0]);
        let val = attrConvert(id,parseInt(arr[1]));
        this.lab.text = MainModel.Ins.getAttrNameIdByID(id);
        this.lab4.text = val;
        this.lab2.text = cfg.f_gemTotalLevel + "级";
        if(value.state == 0){
            this.bg1.skin = "remote/baoshi/gem_gray.png";
            this.lab.color = "#7E7D7D";
            this.bg.skin = "remote/baoshi/gmlw_1.png";
            this.lab1.color = "#7E7D7D";
            this.suo.skin = "remote/baoshi/lock.png";
            this.sp.visible = false;
            this.lab2.color = "#EB4A31";
            this.lab3.text = "解锁";
            this.lab3.color = "#7E7D7D";
        }else if(value.state == 1){
            this.bg1.skin = "remote/baoshi/gem_green.png";
            this.lab.color = "#75AC44";
            this.bg.skin = "remote/baoshi/gmlw.png";
            this.lab1.color = "#9C5F3A";
            this.suo.skin = "remote/baoshi/unlock.png";
            this.sp.visible = false;
            this.lab2.color = "#9C5F3A";
            this.lab3.text = "待激活";
            this.lab3.color = "#75AC44";
        }else{
            this.bg1.skin = "remote/baoshi/gem_yello.png";
            this.lab.color = "#9C5F3A";
            this.bg.skin = "remote/baoshi/gmlw.png";
            this.lab1.color = "#9C5F3A";
            this.suo.skin = "";
            this.sp.visible = true;
            this.lab2.color = "#9C5F3A";
            this.lab3.text = "已激活";
            this.lab3.color = "#4AB2EB";
        }
        if(index >= BaoShiModel.Ins.lifeBloodList.length - 1){
            this.sp1.visible = false;
        }else{
            this.sp1.visible = true;
        }
    }
}