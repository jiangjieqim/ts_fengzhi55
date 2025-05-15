import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { SevenEvent_req, stSevenTask } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { TaskTypeProxy } from "../../main/proxy/TaskProxy";
import { SevenDaysTaskProxy } from "../proxy/ServerTaskProxy";

export class ServerTaskItem1 extends ui.views.serverTask.ui_serverTaskItem1UI{
    constructor() {
        super();

        this.rewardList.y = this.rewardList.y - 10;
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        if(this._data){
            let req:SevenEvent_req = new SevenEvent_req;
            req.type = 1;
            req.id = this._data.id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:stSevenTask;
    public setData(value:stSevenTask){
        if(!value)return;
        this._data = value;
        let cfg = SevenDaysTaskProxy.Ins.getCfgById(value.id);
        let taskContent = TaskTypeProxy.Ins.getTaskContent(cfg.f_taskid);
        let params = taskContent.match(/\{(\d+)\}/g);
        if(params){
            taskContent = taskContent.replace(params[0], cfg.f_taskcontent.toString());
        }
        this.lab.text = taskContent + "(" + value.nums + "/" + cfg.f_taskcontent + ")";

        this.lab1.text = cfg.f_Points + "";
        ItemViewFactory.renderItemSlots(this.rewardList,cfg.f_rewards,10,0.85,"left");
        if(value.status == 1){
            this.lab2.visible = true;
            this.btn.visible = false;
            DotManager.removeDot(this.btn);
        }else if(value.status == 2){
            this.lab2.visible = false;
            this.btn.visible = true;
            this.btn.disabled = false;
            DotManager.addDot(this.btn);
        }else{
            this.lab2.visible = false;
            this.btn.visible = true;
            this.btn.disabled = true;
            DotManager.removeDot(this.btn);
        }
    }
}