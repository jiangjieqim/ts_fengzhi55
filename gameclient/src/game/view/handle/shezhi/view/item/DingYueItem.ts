import { CheckBox2Ctl } from "../../../../../../frame/util/ctl/CheckBox2Ctl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { DingYueSelectReq_req, stDingYue } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { SheZhiModel } from "../../model/SheZhiModel";

export class DingYueItem extends ui.views.shezhi.ui_dingyueItemUI{

    public checkCtl:CheckBox2Ctl;

    constructor() {
        super();

        this.checkCtl = new CheckBox2Ctl(this.check);
        this.checkCtl.selectHander = new Laya.Handler(this,this.onSelectHander);
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemoved);
    }

    private onAdd(){
        
    }

    private onRemoved(){
       
    }

    public onSelectHander(){
        let type = 0;
        if(this.checkCtl.selected){
            E.sdk.getSubscribe([this._data.f_modelID]);
            type = 1;
        }else{

        }
        let req:DingYueSelectReq_req = new DingYueSelectReq_req;
        req.id = this._data.f_id;
        req.type = type;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:Configs.t_Setting_Subscribe_dat;
    public setData(value:Configs.t_Setting_Subscribe_dat){
        if(!value)return;
        this._data = value;
        this.lab.text = value.f_attribute;
        let vo = SheZhiModel.Ins.dingyueList.find(item => (item as stDingYue).id == value.f_id);
        if(vo){
            if(vo.type){
                this.checkCtl.selected = true;
            }else{
                this.checkCtl.selected = false;
            }
        }
    }
}