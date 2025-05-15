import {StringUtil} from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { CheifUpgrade_req, stChief } from "../../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import {DotManager} from "../../../common/DotManager";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { ECellType } from "../../../main/vos/ECellType";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy, FuJiangLvProxy, FuJiangStarProxy } from "../../proxy/FuJiangProxy";
import { FuJiangStarCtl } from "../ctl/FuJiangStarCtl";

export class FuJiangItem2 extends ui.views.fujiang.ui_fujiangItem2UI{
    private _starCtl:FuJiangStarCtl;
    private _plusCtl: FontClipCtl;

    constructor() {
        super();
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        this._starCtl = new FuJiangStarCtl(this.star);
        this._plusCtl = FontCtlFactory.createPlus();

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.img_qua,new Laya.Handler(this,this.onTXClick),false);
    }

    private onAdd(){

    }

    private onRemove(){

    }

    private onBtnClick(){
        if(this._data){
            let req:CheifUpgrade_req = new CheifUpgrade_req;
            req.cheifId = this._data.cheifId;
            req.type = this._type;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onTXClick(){
        if(this._data){
            E.ViewMgr.Open(EViewType.FuJiangPY,null,this._data);
        }
    }

    private _data:stChief;
    private _type:number;
    public setData(value:stChief){
        if(!value)return;
        this._data = value;
        let cCfg = FuJiangListProxy.Ins.getCfgById(value.cheifId);
        this.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(cCfg.f_cheifQuality);
        this.img.skin = FuJiangListProxy.Ins.getFuJiangSkin(cCfg.f_cheifid);
        this.lab_lv.text = "Lv." + value.level;
        this.lab_name.text = cCfg.f_cheif;
        this.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(cCfg.f_cheifQuality).f_chiefcolor;
        this._starCtl.setStar(value.star);
        let v = StringUtil.val2Atlas(value.cheifFight);
        this._plusCtl.setValue(this.plusCon,v);

        this.lab_num.color = "#FFEEC2";
        let nextCfg = FuJiangLvProxy.Ins.getCfgByLv(value.level + 1);
        let cfg = FuJiangLvProxy.Ins.getCfgByLv(value.level);
        if(!nextCfg){
            this.lab_max.visible = true;
            this.btn.visible = false;
        }else{
            this.lab_max.visible = false;
            this.btn.visible = true;
            this.img1.skin = IconUtils.getIconByCfgId(ECellType.FuJiangLv);
            let n = FuJiangModel.Ins.getShowLv(value.level);
            if(n){
                this._type = 1;
                this.lab_num.text = n + "";
                this.lab.text = "升十级";
                DotManager.addDot(this.btn);
            }else{
                this._type = 0;
                this.lab_num.text = cfg.f_upgradecost.split("-")[1];
                this.lab.text = "升级";
                let val = MainModel.Ins.mRoleData.getVal(ECellType.FuJiangLv);
                if(val < parseInt(cfg.f_upgradecost.split("-")[1])){
                    this.lab_num.color = "#D02525";
                }
                DotManager.removeDot(this.btn);
            }
        }

        if(FuJiangModel.Ins.isStarRedTip(this._data.cheifId,this._data.star)){
            DotManager.addDot(this.img_qua,15,-10);
        }else{
            DotManager.removeDot(this.img_qua);
        }
    }
}