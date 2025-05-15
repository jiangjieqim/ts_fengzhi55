import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { CheifStarUp_req } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import {DotManager} from "../../../common/DotManager";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy, FuJiangStarProxy } from "../../proxy/FuJiangProxy";
import { FuJiangStarCtl } from "../ctl/FuJiangStarCtl";

export class FuJiangItem6 extends ui.views.fujiang.ui_fujiangItem6UI{

    constructor() {
        super();
        // ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.sp,new Laya.Handler(this,this.onBtnBoxClick),false);
    }

    private onBtnClick(){
        if(!FuJiangModel.Ins.isPlayStarAni){
            FuJiangModel.Ins.oldStar = this._nowNum;
            FuJiangModel.Ins.oldAllStar = FuJiangModel.Ins.getAllStarNum();
            let req:CheifStarUp_req = new CheifStarUp_req;
            req.cheifId = this._data.f_cheifid;
            req.num = this._addNum;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnBoxClick(){
        E.ViewMgr.Open(EViewType.FuJiangXQView,null,this._data)
    }

    private _nowNum:number;
    private _addNum:number;
    private _data:Configs.t_Chief_List_dat;
    public setData(va:any){
        if(!va)return;
        let value:Configs.t_Chief_List_dat = va.cfg;
        this._nowNum = va.nowNum;
        this._data = value;
        this._addNum = va.val;
        this.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(value.f_cheifQuality);
        this.img.skin = FuJiangListProxy.Ins.getFuJiangSkin(value.f_cheifid);
        this.lab_name.text = value.f_cheif;
        this.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(value.f_cheifQuality).f_chiefcolor;
        
        let val1 = 0;
        let data = FuJiangModel.Ins.getFuJiangCfgById(value.f_cheifid);
        let val = MainModel.Ins.mRoleData.getVal(value.f_piecesid);
        if(data){
            this.img1.visible = this.lab_star.visible = true;
            this.lab_star.text = "x" + data.star;
            this.box.gray = false;
            val1 = FuJiangStarProxy.Ins.getCfgByStar(data.star).f_upstarcost_new;

            let nextCfg = FuJiangStarProxy.Ins.getCfgByStar(data.star + 1);
            if(nextCfg){
                this.lab.text = val + "/" + val1;
            }else{
                this.lab.text = "已满星";
            }
        }else{
            this.img1.visible = this.lab_star.visible = false;
            this.box.gray = true;
            val1 = FuJiangStarProxy.Ins.getCfgByStar(0).f_upstarcost_new;
            this.lab.text = val + "/" + val1;
        }

        let num = val / val1;
        if(num > 1){
            num = 1;
        }
        this.pro.width = num * 136;

        if (va.val) {
            this.redtip.visible = true;
        }else{
            this.redtip.visible = false;
        }
    }
}