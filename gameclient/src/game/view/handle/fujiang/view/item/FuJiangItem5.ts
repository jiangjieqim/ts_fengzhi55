import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { CheifEquipUp_req, stChiefEquip } from "../../../../../network/protocols/BaseProto";
import {DotManager} from "../../../common/DotManager";
import { EquipmentIDProxy, EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { ECellType } from "../../../main/vos/ECellType";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangEquipAttrProxy, FuJiangEquipStarProxy, FuJiangListProxy } from "../../proxy/FuJiangProxy";
import { FuJiangStarCtl } from "../ctl/FuJiangStarCtl";

export class FuJiangItem5 extends ui.views.fujiang.ui_fujiangItem5UI{
    private _starCtl:FuJiangStarCtl;

    constructor() {
        super();
        this._starCtl = new FuJiangStarCtl(this.star);
        ButtonCtl.Create(this.img_bg,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        if(this._data){
            let req:CheifEquipUp_req = new CheifEquipUp_req;
            req.cheifId = this._id;
            req.partId = this._data.partId;
            req.type = this._type;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _id:number;
    private _data:stChiefEquip;
    private _type:number;
    public setData(value:any){
        if(!value)return;
        this._data = value.data;
        this._id = value.id;
        let cfg = FuJiangListProxy.Ins.getCfgById(value.id);
        let eCfg:Configs.t_EquipmentID_dat = EquipmentIDProxy.Ins.GetDataById(value.data.partId);
        let starCfg = FuJiangEquipStarProxy.Ins.getCfgByStar(value.data.equipStar);
        this.img_qua.skin = IconUtils.getQuaIcon(starCfg.f_starquality);
        this.icon.skin = FuJiangListProxy.Ins.getFuJiangEquipSkin(value.data.partId,cfg.f_equipiconid);
        this._starCtl.setStar(value.data.equipStar);
        this.lab_name.text = EquipmentQualityProxy.Ins.getByQua(starCfg.f_starquality).f_EquipmentLevel + "的" + eCfg.f_name;
        this.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(starCfg.f_starquality).f_Color;
        this.lab_lv.text = "Lv." + value.data.equipLevel;

        let num = FuJiangEquipAttrProxy.Ins.getListByStar(value.data.equipStar).length;
        this.lab_pro.text = value.data.equipLevel + "/" + num;
        this.pro.width = value.data.equipLevel / num * 271;
        if(parseInt(value.data.equipLevel) == num){
            this.pro.skin = "remote/fujiang/fj_jd_3.png"
        }else{
            this.pro.skin = "remote/fujiang/fj_jd_2.png"
        }

        this.lab_num.color = "#FFEEC2";
        let attrCfg = FuJiangEquipAttrProxy.Ins.getCfgByStarAndLv(value.data.equipStar,value.data.equipLevel);
        let st = attrCfg["f_position" + value.data.partId];
        let id = parseInt(st.split(":")[0]);
        let val = parseInt(st.split(":")[1]);
        if(value.data.partId == 10){
            this.lab_attr.text = "全忽视:";
        }else{
            this.lab_attr.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        }
        this.lab_attrval.text = attrConvert(id,val);

        if(FuJiangModel.Ins.isEquipLvRedTip(value.data.equipStar,value.data.equipLevel,value.data.partId)){
            DotManager.addDot(this.img_bg);
        }else{
            DotManager.removeDot(this.img_bg);
        }

        let nextCfg = FuJiangEquipAttrProxy.Ins.getCfgByID(attrCfg.f_id + 1);
        if(nextCfg){
            let attrSt = nextCfg["f_position" + value.data.partId];
            if(attrSt != ""){
                this.lab_max.visible = false;
                this.img_bg.visible = true;
                let id = parseInt(attrCfg.f_upgradecost.split("-")[0]);
                this.img_icon.skin = IconUtils.getIconByCfgId(id);
                if(attrCfg.f_isupstage == 1){
                    this._type = 0;
                    this.img_bg.skin = "remote/fujiang/fj_an_8.png";
                    this.lab_num.text = attrCfg.f_upgradecost.split("-")[1];
                    this.lab.text = "升星";
                }else{
                    this.img_bg.skin = "remote/fujiang/fj_an_4.png";
                    let n = FuJiangModel.Ins.getEquipShowLv(value.data.equipStar,value.data.equipLevel);
                    if (n) {
                        this._type = 1;
                        this.lab_num.text = n + "";
                        this.lab.text = "升十级";
                    } else {
                        this._type = 0;
                        this.lab_num.text = attrCfg.f_upgradecost.split("-")[1];
                        this.lab.text = "升级";
                        let val = MainModel.Ins.mRoleData.getVal(ECellType.FuJiangEquipLv);
                        if (val < parseInt(attrCfg.f_upgradecost.split("-")[1])) {
                            this.lab_num.color = "#D02525";
                        }
                    }
                }
            }else{
                //已满级
                this.lab_max.visible = true;
                this.img_bg.visible = false;
            }
        }else{
            //已满级
            this.lab_max.visible = true;
            this.img_bg.visible = false;
        }
    }
    
}