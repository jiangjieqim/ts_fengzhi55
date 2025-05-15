import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { BattlePassReward_req, stBattlePassCard } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ZhanLingModel } from "../model/ZhanLingModel";
import { EventGamePassPackProxy, EventGamePassWeekProxy } from "../proxy/ZhanLingProxy";
import { ZhanLingCtl } from "./ctl/ZhanLingCtl";

export class ZhanLingItem1 extends ui.views.zhanling.ui_zhanLingItemUI{

    private _ctl1:ZhanLingCtl;
    private _ctl2:ZhanLingCtl;
    private _ctl3:ZhanLingCtl;

    constructor(){
        super();
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn1,new Laya.Handler(this,this.onBtn1Click));

        this._ctl1 = new ZhanLingCtl(this.item);
        this._ctl2 = new ZhanLingCtl(this.item1);
        this._ctl3 = new ZhanLingCtl(this.item2);
    }

    private onBtnClick(){
        let req:BattlePassReward_req = new BattlePassReward_req;
        req.type = 2;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtn1Click(){
        let packCfg = EventGamePassPackProxy.Ins.getCfgByType(2);
        ActivityModel.Ins.recharge(packCfg.f_payid);
    }

    private _data:stBattlePassCard;
    private _cfg:Configs.t_Event_GamePass_Week_dat;
    public setData(value:stBattlePassCard,index:number){
        if(!value)return;
        this.zOrder = index + 100;
        this._data = value;
        this._cfg = EventGamePassWeekProxy.Ins.GetDataById(value.fid);
        this.lab1.text = this._cfg.f_Point + "";

        if(index >= ZhanLingModel.Ins.weekList.length - 1){
            this.img.visible = false;
        }else{
            this.img.visible = true;
            let va = ZhanLingModel.Ins.weekList[index + 1];
            let nCfg:Configs.t_Event_GamePass_Week_dat = EventGamePassWeekProxy.Ins.GetDataById(va.fid);
            let num = ZhanLingModel.Ins.weekPoint - this._cfg.f_Point;
            let nNum = nCfg.f_Point - this._cfg.f_Point;
            let n = num / nNum;
            if(n > 1){
                n = 1;
            }
            this.pro.height = n * 94;
        }

        this.setItem();
        this.setBtn();
    }

    private setItem(){
        this._ctl1.setItem(this._cfg.f_Week_Rewards);
        this._ctl2.setItem(this._cfg.f_Week_Rewardspay.split("|")[0]);
        this._ctl3.setItem(this._cfg.f_Week_Rewardspay.split("|")[1]);

        this._ctl1.setLock(false);
        if(ZhanLingModel.Ins.weekPaid){
            this._ctl2.setLock(false);
            this._ctl3.setLock(false);
        }else{
            this._ctl2.setLock(true);
            this._ctl3.setLock(true);
        }

        if (this._data.state == 2) {
            this._ctl1.setGou(true);
            this._ctl2.setGou(true);
            this._ctl3.setGou(true);
        }else if (this._data.state == 1) {
            this._ctl1.setGou(true);
            this._ctl2.setGou(false);
            this._ctl3.setGou(false);
        }else if (this._data.state == 0) {
            this._ctl1.setGou(false);
            this._ctl2.setGou(false);
            this._ctl3.setGou(false);
        }

        this._ctl1.setAv(false);
        this._ctl2.setAv(false);
        this._ctl3.setAv(false);
        if(this._data.state == 1 && ZhanLingModel.Ins.weekPaid){
            this._ctl2.setAv(true);
            this._ctl3.setAv(true);
        }else if(this._data.state == 0){
            if(ZhanLingModel.Ins.weekPoint >= this._cfg.f_Point){
                this._ctl1.setAv(true);
                if(ZhanLingModel.Ins.weekPaid){
                    this._ctl2.setAv(true);
                    this._ctl3.setAv(true);
                }
            }
        }
    }

    private setBtn(){
        DotManager.removeDot(this.btn);
        if (this._data.state == 2) {
            this.btn1.visible = false;
            this.btn.visible = true;
            this.btn.mouseEnabled = false;
            this.btn.skin = "remote/zhanling/lqan_h.png";
            this.lab.text = "已领取";
        } else if (this._data.state == 1) {
            if (ZhanLingModel.Ins.weekPaid) {
                this.btn1.visible = false;
                this.btn.visible = true;
                this.btn.mouseEnabled = true;
                this.btn.skin = "remote/zhanling/lqan.png";
                this.lab.text = "领取";
                DotManager.addDot(this.btn,10,-10);
            } else {
                this.btn1.visible = true;
                this.btn.visible = false;
            }
        }else if (this._data.state == 0) {
            if(ZhanLingModel.Ins.weekPoint >= this._cfg.f_Point){
                this.btn1.visible = false;
                this.btn.visible = true;
                this.btn.mouseEnabled = true;
                this.btn.skin = "remote/zhanling/lqan.png";
                this.lab.text = "领取";
                DotManager.addDot(this.btn,10,-10);
            }else{
                this.btn1.visible = false;
                this.btn.visible = true;
                this.btn.mouseEnabled = false;
                this.btn.skin = "remote/zhanling/lqan_h.png";
                this.lab.text = "领取";
            }
        }
    }
}