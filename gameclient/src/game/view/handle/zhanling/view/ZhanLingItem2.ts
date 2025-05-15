import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { BattlePassTask_req, stBattlePassTask } from "../../../../network/protocols/BaseProto";
import { t_Txt_Config } from "../../../../static/StaticDataMgr";
import { DotManager } from "../../common/DotManager";
import { EventGamePassTaskProxy } from "../proxy/ZhanLingProxy";
import { ZhanLingItem3 } from "./ZhanLingItem3";

export class ZhanLingItem2 extends ui.views.zhanling.ui_zhanLingItem1UI{
    constructor(){
        super();
        this.list.itemRender = ZhanLingItem3;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn1,new Laya.Handler(this,this.onBtn1Click));
    }

    private onBtnClick(){
        if(this._cfg){
            E.ViewMgr.Close(EViewType.ZhanLingView);
            if(this._cfg.f_viewjump != 0){
                E.ViewMgr.OpenByFuncid(this._cfg.f_viewjump,false);
            }
        }
    }

    private onBtn1Click(){
        if(this._data){
            let req:BattlePassTask_req = new BattlePassTask_req;
            req.fid = this._data.fid;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onRenderHandler(item:ZhanLingItem3){
        item.setData(item.dataSource,this._bo);
    }

    private _bo:boolean;
    private _data:stBattlePassTask;
    private _cfg:Configs.t_Event_GamePass_Task_dat;
    public setData(value:stBattlePassTask){
        if(!value)return;
        this._data = value;
        this._cfg = EventGamePassTaskProxy.Ins.GetDataById(value.fid);
        let st = StringUtil.format(this._cfg.f_taskinfo,this._cfg.f_taskcontent);
        this.lab.text = t_Txt_Config.Ins.replace(st);
        if(value.count >= this._cfg.f_taskcontent){
            this.lab1.text = this._cfg.f_taskcontent + "/" + this._cfg.f_taskcontent;
        }else{
            this.lab1.text = value.count + "/" + this._cfg.f_taskcontent;
        }
        
        if(value.state == 2){
            this._bo = true;
        }else{
            this._bo = false;
        }
        this.list.array = this._cfg.f_rewards.split("|");

        DotManager.removeDot(this.btn1);
        if(value.state == 2){
            this.btn.visible = false;
            this.btn1.visible = true;
            this.btn1.mouseEnabled = false;
            this.btn1.skin = "remote/zhanling/lqan_h.png";
            this.lab2.text = "已领取";
        }else if(value.state == 1){
            this.btn.visible = false;
            this.btn1.visible = true;
            this.btn1.mouseEnabled = true;
            this.btn1.skin = "remote/zhanling/lqan.png";
            this.lab2.text = "领取";
            DotManager.addDot(this.btn1,10,-10);
        }else if(value.state == 0){
            this.btn.visible = true;
            this.btn1.visible = false;
        }
    }
}