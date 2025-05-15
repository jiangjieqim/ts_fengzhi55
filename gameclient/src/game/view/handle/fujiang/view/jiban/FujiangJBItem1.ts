import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FujiangJBItem2 } from "./FujiangJBItem2";

export class FujiangJBItem1 extends ui.views.fujiang.ui_fujiangJBItem1UI{
    constructor() {
        super();
        this.list.itemRender = FujiangJBItem2;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        ButtonCtl.Create(this.btn_qd,new Laya.Handler(this,this.onBtnQDClick));
    }

    private onBtnQDClick(){
        if(this._data){
            E.ViewMgr.Open(EViewType.FujiangJBZBView,null,this._data.f_id);
        }
    }

    private onRenderHandler(item:FujiangJBItem2){
        item.setData(item.dataSource);
    }

    private _data:Configs.t_Trammels_Chief_dat;
    public setData(value:Configs.t_Trammels_Chief_dat){
        if(!value)return;
        this._data = value;
        let co = "#" + EquipmentQualityProxy.Ins.getByQua(value.f_TrammelsQuality).f_Color;
        let fjArr = value.f_ChiefID.split("|");
        let star = 0;
        for (let i: number = 0; i < fjArr.length; i++) {
            let fjCfg = FuJiangModel.Ins.getFuJiangCfgById(parseInt(fjArr[i]));
            if (fjCfg) {
                star += fjCfg.star;
            }
        }
        this.lab_name.text = value.f_TrammelsName;
        this.lab_name.color = co;
        this.lab_num.text = "(" + star + "/" + value.f_Star + ")";
        this.lab_num.color = co;
        let attrArr = value.f_Attribute.split(":");
        let id = parseInt(attrArr[0])
        let val = parseInt(attrArr[1])
        this.lab_attr.text = MainModel.Ins.getAttrNameIdByID(id) + ":" + attrConvert(id,val);
        this.lab_attr.color = co;
        this.lab_ew.color = co;
        let val1 = star * value.f_Upgrade;
        this.lab_attr1.text = attrConvert(id,val1);
        this.lab_attr1.color = co;
        this.list.array = fjArr;

        let vo = FuJiangModel.Ins.jbDataList.find(ele => ele.id == value.f_id);
        if(vo){
            this.lab_btn.text = "已装备";
            this.btn_qd.skin = "remote/common/base/anniu_blue1.png";
            this.btn_qd.mouseEnabled = false;
            this.btn_qd.gray = false;
        }else{
            this.lab_btn.text = "装备";
            this.btn_qd.skin = "remote/common/base/anniu_green.png";
            if(FuJiangModel.Ins.isFJJBJH(value)){
                this.btn_qd.mouseEnabled = true;
                this.btn_qd.gray = false;
            }else{
                this.btn_qd.mouseEnabled = false;
                this.btn_qd.gray = true;
            }
        }
    }
}