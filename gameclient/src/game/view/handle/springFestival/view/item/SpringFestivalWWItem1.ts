import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { SpringFestivalReward_req, stSpringFestivalRewardInfo } from "../../../../../network/protocols/BaseProto";
import { DotManager } from "../../../common/DotManager";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { ItemVo } from "../../../main/vos/ItemVo";
import { SFStageRewardsProxy } from "../../proxy/SpringFestivalProxy";

export class SpringFestivalWWItem1 extends ui.views.springFestival.ui_springFestivalWWItem1UI{
    constructor(){
        super();
        this.list.itemRender = ui.views.springFestival.ui_springFestivalIconItemUI;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onClick))
    }

    private onClick(){
        if(!this._data)return;
        let req:SpringFestivalReward_req = new SpringFestivalReward_req;
        req.fid = this._data.fid;
        SocketMgr.Ins.SendMessageBin(req);
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
    private _data:stSpringFestivalRewardInfo;
    public setData(value:stSpringFestivalRewardInfo){
        if(!value)return;
        this._data = value;
        let cfg:Configs.t_Event_2024Spring_StageRewards_dat = SFStageRewardsProxy.Ins.getCfgById(value.fid);
        this.lab.text = "第" + cfg.f_stage + "阶段";
        this.lab1.text = cfg.f_Value + "";
        this.list.array = cfg.f_stageRewards.split("|");

        this._bo = false;
        DotManager.removeDot(this.btn);
        if(value.state == 1){
            this.btn.mouseEnabled = false;
            this.btn.skin = "remote/common/base/anniu_grey.png";
            this.lab2.text = "已领取";
            this._bo = true;
        }else if(value.state == 2){
            this.btn.mouseEnabled = true;
            this.btn.skin = "remote/common/base/anniu_blue.png";
            this.lab2.text = "领取";
            DotManager.addDot(this.btn,10,-10);
        }else if(value.state == 0){
            this.btn.mouseEnabled = false;
            this.btn.skin = "remote/common/base/anniu_grey.png";
            this.lab2.text = "领取";
        }
    }
}