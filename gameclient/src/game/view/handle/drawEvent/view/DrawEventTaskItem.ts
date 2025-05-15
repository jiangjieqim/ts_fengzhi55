import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DrawEventTask_req, stDrawEventTask } from "../../../../network/protocols/BaseProto";
import { t_Txt_Config } from "../../../../static/StaticDataMgr";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { DrawEventTaskProxy } from "../proxy/DrawEventProxy";

export class DrawEventTaskItem extends ui.views.drawEvent.ui_DrawEventTaskItemUI{
    constructor(){
        super();
        this.list.itemRender = ui.views.main.ui_slot_itemUI;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn1,new Laya.Handler(this,this.onBtn1Click));
    }

    private onBtnClick(){
        if(this._cfg){
            E.ViewMgr.Close(EViewType.DrawEventView);
            if(this._cfg.f_viewjump != 0){
                E.ViewMgr.OpenByFuncid(this._cfg.f_viewjump,false);
            }
        }
    }

    private onBtn1Click(){
        if(this._data){
            let req:DrawEventTask_req = new DrawEventTask_req;
            req.fid = this._data.fid;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onRenderHandler(item:ui.views.main.ui_slot_itemUI){
        let itemVo:ItemVo = new ItemVo();
        let arr = item.dataSource.split("-");
        itemVo.cfgId = parseInt(arr[0]);
        itemVo.count = parseInt(arr[1]);
        ItemViewFactory.refreshSlot(item,itemVo);
    }

    private _data:stDrawEventTask;
    private _cfg:Configs.t_DrawEvent_Task_dat;
    public setData(value:stDrawEventTask){
        if(!value)return;
        this._data = value;
        this._cfg = DrawEventTaskProxy.Ins.GetDataById(value.fid);
        let stt:string;
        if(value.count >= this._cfg.f_TaskContent){
            stt = this._cfg.f_TaskContent + "/" + this._cfg.f_TaskContent;
        }else{
            stt = value.count + "/" + this._cfg.f_TaskContent;
        }
        let st = StringUtil.format(t_Txt_Config.Ins.replace(this._cfg.f_Taskintro),this._cfg.f_TaskContent) + "(" + stt + ")";
        this.lab.text = t_Txt_Config.Ins.replace(st);
        this.list.array = this._cfg.f_TaskRewards.split("|");

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
            DotManager.addDot(this.btn1,0,-10);
        }else if(value.state == 0){
            this.btn.visible = true;
            this.btn1.visible = false;
        }
    }
}