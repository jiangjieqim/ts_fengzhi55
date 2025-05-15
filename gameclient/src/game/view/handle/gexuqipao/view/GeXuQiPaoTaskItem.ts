import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { GeXuQiPaoTask_req, stGeXuQiPaoTask } from "../../../../network/protocols/BaseProto";
import { t_Txt_Config } from "../../../../static/StaticDataMgr";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { RADrawEventTaskProxy } from "../proxy/GeXuQiPaoProxy";

export class GeXuQiPaoTaskItem extends ui.views.gexuqipao.ui_gexuqipaoTaskItemUI{
    constructor(){
        super();

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn1,new Laya.Handler(this,this.onBtn1Click));
    }

    private onBtnClick(){
        if(this._cfg){
            E.ViewMgr.Close(EViewType.GeXuQiPaoView);
            if(this._cfg.f_viewjump != 0){
                E.ViewMgr.OpenByFuncid(this._cfg.f_viewjump,false);
            }
        }
    }

    private onBtn1Click(){
        if(this._data){
            let req:GeXuQiPaoTask_req = new GeXuQiPaoTask_req;
            req.fid = this._data.fid;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:stGeXuQiPaoTask;
    private _cfg:Configs.t_RecurringActivity_DrawEvent_Task_dat;
    public setData(value:stGeXuQiPaoTask){
        if(!value)return;
        this._data = value;
        this._cfg = RADrawEventTaskProxy.Ins.GetDataById(value.fid);
        let stt:string;
        if(value.count >= this._cfg.f_TaskContent){
            stt = this._cfg.f_TaskContent + "/" + this._cfg.f_TaskContent;
        }else{
            stt = value.count + "/" + this._cfg.f_TaskContent;
        }
        let st = StringUtil.format(t_Txt_Config.Ins.replace(this._cfg.f_Taskintro),this._cfg.f_TaskContent) + "(" + stt + ")";
        this.lab.text = t_Txt_Config.Ins.replace(st);
        ItemViewFactory.renderItemSlots(this.rewardCon, this._cfg.f_TaskRewards, 10, 0.95, "left");

        DotManager.removeDot(this.btn1);
        if(value.state == 2){
            this.btn.visible = false;
            this.btn1.visible = true;
            this.btn1.mouseEnabled = false;
            this.btn1.skin = "remote/common/base/anniu_grey.png";
            this.lab2.text = "已领取";
        }else if(value.state == 1){
            this.btn.visible = false;
            this.btn1.visible = true;
            this.btn1.mouseEnabled = true;
            this.btn1.skin = "remote/common/base/anniu_blue.png";
            this.lab2.text = "领取";
            DotManager.addDot(this.btn1,10,-10);
        }else if(value.state == 0){
            this.btn.visible = true;
            this.btn1.visible = false;
        }
    }
}