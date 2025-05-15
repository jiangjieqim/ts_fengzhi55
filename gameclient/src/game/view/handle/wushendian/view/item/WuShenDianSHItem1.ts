import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { PalaceChooseBuff_req, PalaceFight_req, stPalaceBuff } from "../../../../../network/protocols/BaseProto";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { EQuickMsg } from "../../../main/model/QuickMsgVo";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { WuShenDianModel } from "../../model/WuShenDianModel";
import { WuShenDianConfigProxy, WuShenDianDataTypeProxy } from "../../proxy/WuShenDianProxy";

export class WuShenDianSHItem1 extends ui.views.wushendian.ui_wushendianSHItem1UI{
    constructor() {
        super();
        this.img_click.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        if(this._data){
            let flag = false;
            for(let i:number=0;i<WuShenDianModel.Ins.buffList.length;i++){
                if(WuShenDianModel.Ins.buffList[i].buffId == 0){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                let vo = WuShenDianModel.Ins.buffList.find(cell=>cell.buffId == this._data.buffId);
                if(vo){
                    flag = true;
                }
            }
            if(flag){
                this.sendCmd();
            }else{
                let len = parseInt(WuShenDianConfigProxy.Ins.GetDataById(1).f_BuffMinMax.split("|")[1]);
                if(WuShenDianModel.Ins.buffList.length >= len){
                    MainModel.Ins.queryMsg("神魂数量已满，请返回刷新神魂或放弃选择继续挑战",0,0,EQuickMsg.ShenHun2,new Laya.Handler(this,this.sendCmd1),"返回","继续挑战");
                }else{
                    MainModel.Ins.queryMsg("神魂数量已达上限，请返回开启新的神魂格或放弃选择继续挑战",0,0,EQuickMsg.ShenHun1,new Laya.Handler(this,this.sendCmd1),"返回","继续挑战");
                }
            }
        }
    }

    private sendCmd(){
        let req:PalaceChooseBuff_req = new PalaceChooseBuff_req;
        req.buffId = this._data.buffId;
        SocketMgr.Ins.SendMessageBin(req);
        E.ViewMgr.Close(EViewType.WuShenDianSHView);
    }

    private sendCmd1(){
        let req:PalaceFight_req = new PalaceFight_req;
        req.type = 1;
        SocketMgr.Ins.SendMessageBin(req);
        E.ViewMgr.Close(EViewType.WuShenDianSHView);
    }

    private _data:stPalaceBuff;
    public setData(value:stPalaceBuff){
        if(!value)return;
        this._data = value;
        if(this._data.times == 7){
            this.sp.visible = true;
        }else{
            this.sp.visible = false;
        }
        let index = WuShenDianModel.Ins.buffList.findIndex(ele => ele.buffId == value.buffId);
        if(index == -1){
            this.sp_new.visible = true;
        }else{
            this.sp_new.visible = false;
        }
        let cfg:Configs.t_Palace_DataType_dat = WuShenDianDataTypeProxy.Ins.GetDataById(this._data.buffId);
        this.img_qua.skin = IconUtils.getQuaIcon(value.quality);
        this.icon.skin = "o/Palace/" + cfg.f_Icon + ".png";
        let id = cfg.f_AttributeID;
        this.lab1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        this.lab2.text = "+" + attrConvert(id, this._data.addVal);
        this.lab1.color = this.lab2.color = "#" + EquipmentQualityProxy.Ins.getByQua(value.quality).f_Color;
        this.lab4.text = attrConvert(id, this._data.val);

        for(let i:number = 1;i < 9; i++){
            if(this._data.times >= i){
                this["sp" + i].visible = true;
            }else{
                this["sp" + i].visible = false;
            }
        }
    }
}