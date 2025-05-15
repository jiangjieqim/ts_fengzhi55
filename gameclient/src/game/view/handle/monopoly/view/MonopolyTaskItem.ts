import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { MonopolyTask_req, stMonopolyTask } from "../../../../network/protocols/BaseProto";
import { t_Txt_Config } from "../../../../static/StaticDataMgr";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { MonopolyTaskProxy } from "../proxy/MonopolyProxy";

export class MonopolyTaskItem extends ui.views.monopoly.ui_MonopolyTaskItemUI{
    constructor(){
        super();
        this.list.itemRender = ui.views.monopoly.ui_MonopolyIconItemUI;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn1,new Laya.Handler(this,this.onBtn1Click));
    }

    private onBtnClick(){
        if(this._cfg){
            E.ViewMgr.Close(EViewType.MonopolyMainView);
            if(this._cfg.f_viewjump != 0){
                E.ViewMgr.OpenByFuncid(this._cfg.f_viewjump,false);
            }
        }
    }

    private onBtn1Click(){
        if(this._data){
            let req:MonopolyTask_req = new MonopolyTask_req;
            req.fid = this._data.fid;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onRenderHandler(item:ui.views.monopoly.ui_MonopolyIconItemUI){
        let itemVo:ItemVo = new ItemVo();
        let arr = item.dataSource.split("-");
        itemVo.cfgId = parseInt(arr[0]);
        itemVo.count = parseInt(arr[1]);
        ItemViewFactory.refreshSlot(item.slot,itemVo);
        item.maskbg.visible = this._bo;
    }

    private _bo:boolean;
    private _data:stMonopolyTask;
    private _cfg:Configs.t_Monopoly_Task_dat;
    public setData(value:stMonopolyTask){
        if(!value)return;
        this._data = value;
        this._cfg = MonopolyTaskProxy.Ins.GetDataById(value.fid);
        let st = StringUtil.format(this._cfg.f_Taskintro,this._cfg.f_TaskContent);
        this.lab.text = t_Txt_Config.Ins.replace(st);

        if(value.count >= this._cfg.f_TaskContent){
            this.lab1.text = this._cfg.f_TaskContent + "/" + this._cfg.f_TaskContent;
        }else{
            this.lab1.text = value.count + "/" + this._cfg.f_TaskContent;
        }
        
        if(value.state == 2){
            this._bo = true;
        }else{
            this._bo = false;
        }
        this.list.array = this._cfg.f_TaskRewards.split("|");

        DotManager.removeDot(this.btn1);
        if(value.state == 2){
            this.btn.visible = false;
            this.btn1.visible = true;
            this.btn1.mouseEnabled = false;
            this.btn1.skin = "remote/monopoly/lqan_h.png";
            this.lab2.text = "已领取";
        }else if(value.state == 1){
            this.btn.visible = false;
            this.btn1.visible = true;
            this.btn1.mouseEnabled = true;
            this.btn1.skin = "remote/monopoly/lqan.png";
            this.lab2.text = "领取";
            DotManager.addDot(this.btn1,10,-10);
        }else if(value.state == 0){
            this.btn.visible = true;
            this.btn1.visible = false;
        }
    }
}