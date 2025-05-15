import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DailyEventTask_req, stDailyEventTask } from "../../../../network/protocols/BaseProto";
import { t_Txt_Config } from "../../../../static/StaticDataMgr";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { DailyEventTaskProxy } from "../proxy/MoJinXiaoWeiProxy";

export class MoJinXiaoWeiItem extends ui.views.mojinxiaowei.ui_mojinxiaoweiItemUI{
    constructor(){
        super();
        this.list.itemRender = ui.views.main.ui_slot_itemUI;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn1,new Laya.Handler(this,this.onBtn1Click));
    }

    private onBtnClick(){
        if(this._cfg){
            E.ViewMgr.Close(EViewType.MoJinXiaoWeiView);
            if(this._cfg.f_viewjump != 0){
                E.ViewMgr.OpenByFuncid(this._cfg.f_viewjump,false);
            }
        }
    }

    private onBtn1Click(){
        if(this._data){
            let req:DailyEventTask_req = new DailyEventTask_req;
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

    private _data:stDailyEventTask;
    private _cfg:Configs.t_DailyEvent_Task_dat;
    public setData(value:stDailyEventTask){
        if(!value)return;
        this._data = value;
        this._cfg = DailyEventTaskProxy.Ins.GetDataById(value.fid);
        let stt:string;
        if(value.count >= this._cfg.f_taskcontent){
            stt = this._cfg.f_taskcontent + "/" + this._cfg.f_taskcontent;
        }else{
            stt = value.count + "/" + this._cfg.f_taskcontent;
        }
        let st = StringUtil.format(t_Txt_Config.Ins.replace(this._cfg.f_taskinfo),this._cfg.f_taskcontent) + "(" + stt + ")";
        this.lab.text = t_Txt_Config.Ins.replace(st);
        this.list.array = this._cfg.f_rewards.split("|");

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