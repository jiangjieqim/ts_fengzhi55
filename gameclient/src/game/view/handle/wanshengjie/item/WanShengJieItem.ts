import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { TotalCntReward_req } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { WanShengJieModel } from "../model/WanShengJieModel";

export class WanShengJieItem extends ui.views.wanshengjie.ui_wanshengjieItemUI{
    constructor(){
        super();

        this.list.itemRender = ui.views.main.ui_slot_itemUI;
        this.list.renderHandler = new Laya.Handler(this,this.onItemHandler);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn1,new Laya.Handler(this,this.onBtn1Click));
    }

    private onBtnClick(){
        if(this._data){
            let req:TotalCntReward_req = new TotalCntReward_req;
            req.id = this._data.f_id;
            req.type = this._data.f_eventtype;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtn1Click(){
        ActivityModel.Ins.openFunc(EActivityType.EveryDayBorn,EViewType.MeiRiLiBao,"nothing");
    }

    private onItemHandler(item:ui.views.main.ui_slot_itemUI){
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item,vo);
    }

    private _data:Configs.t_Halloween_Purchase_dat;
    public setData(value:Configs.t_Halloween_Purchase_dat){
        if(!value)return;
        this._data = value;
        if(value.f_isfree){
            this.lab.text = "上线领取";
            this.lab1.text = "";
        }else{
            let num = value.f_AccPurchase / 100;
            this.lab.text = "累计充值:" + num + "元";
            if(WanShengJieModel.Ins.totalCnt >= value.f_AccPurchase){
                this.lab1.text = num + "/" + num;
            }else{
                this.lab1.text = WanShengJieModel.Ins.totalCnt / 100 + "/" + num;
            }
        }
        this.list.array = value.f_rewards_client.split("|");
        
        DotManager.removeDot(this.btn);
        if(WanShengJieModel.Ins.rewardList.indexOf(value.f_id) != -1){//已领取
            this.btn.visible = true;
            this.lab_btn.text = "已领取";
            this.btn.disabled = true;
            this.btn1.visible = false;
        }else{
            if(value.f_isfree){//免费
                DotManager.addDot(this.btn);
                this.btn.visible = true;
                this.lab_btn.text = "领取";
                this.btn.disabled = false;
                this.btn1.visible = false;
            }else{
                if(WanShengJieModel.Ins.totalCnt >= value.f_AccPurchase){//可领取
                    DotManager.addDot(this.btn);
                    this.btn.visible = true;
                    this.lab_btn.text = "领取";
                    this.btn.disabled = false;
                    this.btn1.visible = false;
                }else{
                    this.btn.visible = false;
                    this.btn1.visible = true;
                }
            }
        }
    }
}