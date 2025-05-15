import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PromotionReward_req, stPromotion } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { AdventureLevelProxy } from "../../main/proxy/AdventureLevelProxy";
import { ItemVo } from "../../main/vos/ItemVo";
import { UpstageTaskProxy } from "../proxy/JinShengProxy";

export class JinShengItem extends ui.views.jinsheng.ui_jinshengItem1UI{
    constructor() {
        super();

        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemoved);

        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        if(this._data){
            if(this._data.rewardStatus == 0 && this._flag){
                let req:PromotionReward_req = new PromotionReward_req;
                req.taskId = this._data.taskId;
                SocketMgr.Ins.SendMessageBin(req);
            }
        }
    }

    private onAdd(){

    }

    private onRemoved(){

    }

    private _data:stPromotion;
    private _flag:boolean;
    public setData(value:stPromotion){
        if(!value)return;
        this._data = value;
        let cfg = UpstageTaskProxy.Ins.getCfgByID(value.taskId);
        
        let itemVo:ItemVo = new ItemVo();
        itemVo.cfgId = parseInt(cfg.f_rewards.split("-")[0]);
        itemVo.count = parseInt(cfg.f_rewards.split("-")[1]);
        ItemViewFactory.refreshSlot(this.item,itemVo);
        this._flag = false;
        if(cfg.f_tasktype == 2){
            this.lab1.text = StringUtil.format(cfg.f_taskinfo,AdventureLevelProxy.Ins.getAdventureTaskName(cfg.f_taskcontact));
            if(value.taskContent == 1){
                this.lab2.text = "1/1";
                this.pro.width = 163;
                this._flag = true;
            }else{
                this.lab2.text = "0/1";
                this.pro.width = 0;
            }
        }else{
            this.lab1.text = StringUtil.format(cfg.f_taskinfo,cfg.f_taskcontact);
            if(value.taskContent >= cfg.f_taskcontact){
                this._flag = true;
            }
            this.lab2.text = value.taskContent + "/" + cfg.f_taskcontact;
            let num = value.taskContent / cfg.f_taskcontact;
            if(num > 1)num = 1;
            this.pro.width = num * 163;
        }

        DotManager.removeDot(this.img);
        if(value.rewardStatus == 1){
            this.img.skin = "remote/jinsheng/lq.png";
            this.lab.text = "已领取";
        }else{
            if(this._flag){
                this.img.skin = "remote/jinsheng/jxz.png";
                this.lab.text = "已完成";
                DotManager.addDot(this.img);
            }else{
                this.img.skin = "remote/jinsheng/wc.png";
                this.lab.text = "进行中";
            }
        }
    }
}