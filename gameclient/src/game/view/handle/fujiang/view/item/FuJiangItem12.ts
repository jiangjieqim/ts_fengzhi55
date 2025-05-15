import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { stChief } from "../../../../../network/protocols/BaseProto";
import { DotManager } from "../../../common/DotManager";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy, FuJiangLvProxy } from "../../proxy/FuJiangProxy";

export class FuJiangItem12 extends ui.views.fujiang.ui_fujiangItem12UI{
    constructor() {
        super();
        this.on(Laya.Event.DISPLAY, this, this.onAdd);
        this.on(Laya.Event.UNDISPLAY, this, this.onRemove);

        ButtonCtl.Create(this.img_qua, new Laya.Handler(this, this.onTXClick), false);
        ButtonCtl.Create(this.btn_add, new Laya.Handler(this, this.onAddClick));

        this.list.itemRender = ui.views.fujiang.ui_fujiangAttrItem10UI;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler1);
    }

    private onAdd() {

    }

    private onRemove() {

    }

    private onRenderHandler1(item:ui.views.fujiang.ui_fujiangAttrItem10UI,index:number){
        item.tf1.color = item.valTf.color = "#FB5AFB";
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);

        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        let lvSt = cCfg.f_specialupgrade.split("|")[index];
        let starSt = cCfg.f_specialupstar.split("|")[index];
        let lvNum:number = parseInt(lvSt.split(":")[1]) * (this._data.level - 1);
        let starNum:number = parseInt(starSt.split(":")[1]) * (this._data.star - 1);

        val = val + lvNum + starNum;
        val = val * (this._value.f_support / 10000);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";

        let starLv = parseInt(cCfg.f_specialunlock.split("|")[index]);
        if(this._data.star >= starLv){
            item.tf1.color = item.valTf.color = "#FB5AFB";
            item.valTf.text = attrConvert(id,val);
            item.lab.visible = false;
        }else{
            item.tf1.color = item.valTf.color = "#D3D3D3";
            item.valTf.text = attrConvert(id,val);
            item.lab.visible = true;
            item.lab.text = "(" + starLv + "星)";
        }
    }

    private onAddClick(){
        if (this._value) {
            E.ViewMgr.Open(EViewType.FuJiangCK,null,[2,null,this._value.f_id]);
        }
    }

    private onTXClick() {
        if (this._data) {
            E.ViewMgr.Open(EViewType.FuJiangPY, null, this._data);
        }
    }

    private _value:Configs.t_Chief_Support_Inherit_dat;
    private _data: stChief;
    public setData(value: Configs.t_Chief_Support_Inherit_dat) {
        if (!value) return;
        this._value = value;
        this.lab_zz.text = value.f_support / 100 + "%助战槽位";
        let data: stChief = FuJiangModel.Ins.getFuJiangByAssid(value.f_id);
        if (data) {
            this.sp.visible = true;
            this.sp2.visible = false;
            this._data = data;
            let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
            this.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(cCfg.f_cheifQuality);
            this.img.skin = FuJiangListProxy.Ins.getFuJiangSkin(cCfg.f_cheifid);
            this.lab_lv.text = "Lv." + this._data.level;
            this.lab_snum.text = "x" + this._data.star;
            this.lab_name.text = cCfg.f_cheif;
            this.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(cCfg.f_cheifQuality).f_chiefcolor;
            this.list.array = cCfg.f_specialattrinit.split("|");

            DotManager.removeDot(this.img_qua);
            let nextCfg = FuJiangLvProxy.Ins.getCfgByLv(this._data.level + 1);
            if (nextCfg) {
                let n = FuJiangModel.Ins.getShowLv(this._data.level);
                if (n) {
                    DotManager.addDot(this.img_qua, 15, -10);
                } else {
                    if (FuJiangModel.Ins.isStarRedTip(this._data.cheifId, this._data.star)) {
                        DotManager.addDot(this.img_qua, 15, -10);
                    }
                }
            } 
        }else{
            this.sp.visible = false;
            this.sp2.visible = true;
            this._data = null;
        }
    }
}