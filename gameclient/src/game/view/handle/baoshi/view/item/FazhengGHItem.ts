import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { GemFormationChange_req } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { EQuickMsg } from "../../../main/model/QuickMsgVo";
import { ItemProxy } from "../../../main/proxy/ItemProxy";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { BaoShiModel } from "../../model/BaoShiModel";
import { FaZhengListProxy } from "../../proxy/BaoShiProxy";

//更换
export class FazhengGHItem extends ui.views.baoshi.ui_fazhengGHItemUI{
    constructor() {
        super();

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        if(this._data){
            MainModel.Ins.queryMsg("是否确定更换法阵",0,0,EQuickMsg.FaZhengGH,new Laya.Handler(this,this.onClickHandler));
        }
    }

    private onClickHandler(){
        let req:GemFormationChange_req = new GemFormationChange_req;
        req.id = this._data.id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:any;
    public setData(value:any){
        if(!value)return;
        this._data = value;
        let cfg = FaZhengListProxy.Ins.getCfgById(value.id);
        let iCfg = ItemProxy.Ins.getCfg(cfg.f_itemid);
        this.lab_name.text = main.itemName(iCfg.f_name);
        this.quality.skin = IconUtils.getQuaIcon(iCfg.f_qua);
        this.icon.skin = IconUtils.getIconByCfgId(cfg.f_itemid);

        if(value.isSelect){
            this.img_sel.visible = true;
        }else{
            this.img_sel.visible = false;
        }

        if(cfg.f_Formationid == BaoShiModel.Ins.mationId){
            this.box.visible = true;
            this.btn.visible = false;
        }else{
            this.box.visible = false;
            if(value.isSelect){
                this.btn.visible = true;
            }else{
                this.btn.visible = false;
            }
        }

    }
}