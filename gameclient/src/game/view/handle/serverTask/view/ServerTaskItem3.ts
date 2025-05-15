import { ui } from "../../../../../ui/layaMaxUI";
import { SevenEvent_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DotManager } from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { ServerTaskModel } from "../model/ServerTaskModel";
import { SevenDaysStageRewardsProxy } from "../proxy/ServerTaskProxy";

export class ServerTaskItem3 extends ui.views.serverTask.ui_serverTaskItem3UI{
    constructor() {
        super();
        this.item.on(Laya.Event.CLICK,this,this.onItemClick);
    }

    private onItemClick(){
        if(this._flag && this._data){
            let req:SevenEvent_req = new SevenEvent_req;
            req.type = 2;
            req.id = this._data.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:Configs.t_SevenDays_StageRewards_dat;
    private _flag:boolean;
    public setData(value:Configs.t_SevenDays_StageRewards_dat,index:number){
        if(!value)return;
        this._data = value;
        this.tf.text = value.f_stagepoint + "";
        let vo:ItemVo = new ItemVo;
        vo.cfgId = parseInt(value.f_rewards.split("-")[0]);
        vo.count = parseInt(value.f_rewards.split("-")[1]);
        ItemViewFactory.refreshSlot(this.item,vo);

        let sorce = ServerTaskModel.Ins.getSorce();
        if(sorce >= value.f_stagepoint){
            this.pro.width = 45;
        }else{
            if(index != 0){
                let num = SevenDaysStageRewardsProxy.Ins.List[index - 1].f_stagepoint;
                num = sorce - num;
                if(num > 0){
                    this.pro.width = sorce / value.f_stagepoint * 45;
                }else{
                    this.pro.width = 0;
                }
            }else{
                this.pro.width = sorce / value.f_stagepoint * 45;
            }
        }

        this._flag = false;
        DotManager.removeDot(this.item);
        if(ServerTaskModel.Ins.sevenTaskAwardList.indexOf(value.f_id) != -1){
            this.img.visible = true;
        }else{
            this.img.visible = false;
            if(sorce >= value.f_stagepoint){
                this._flag = true;
                DotManager.addDot(this.item);
            }
        }
    }
}