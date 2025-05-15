import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { SpringFestivalPack_req, stSpringFestivalPack } from "../../../../../network/protocols/BaseProto";
import { DotManager } from "../../../common/DotManager";
import { ActivityModel } from "../../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../../huodong/model/ActivityProxy";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { SFPackProxy } from "../../proxy/SpringFestivalProxy";

export class SpringFestivalTaskItem1 extends ui.views.springFestival.ui_springFestivalTaskItem1UI{
    constructor(){
        super();
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this.btn1,new Laya.Handler(this,this.onBtnClick1));
        ButtonCtl.Create(this.btn2,new Laya.Handler(this,this.onBtnClick2));
        ButtonCtl.Create(this.btn3,new Laya.Handler(this,this.onBtnClick3));
    }

    private onBtnClick(){
        if(this._cfg){
            ActivityModel.Ins.recharge(this._cfg.f_payid);
        }
    }

    private onBtnClick1(){
        if(this._cfg){
            let req:SpringFestivalPack_req = new SpringFestivalPack_req;
            req.fid = this._cfg.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnClick2(){
        if(!this._cfg)return;
        E.sendTrack("ad_watch",{type:"SpringFestival_mf"});
        E.sdk.lookVideo((type: 0 | 1 | 2) => {
            switch(type) {
                case 0:
                    // ⽤户未看完取消
                    break;
                case 1:
                    // ⽤户看完⼴告
                    E.sendTrack("ad_finish",{type:"SpringFestival_mf"});
                    let req:SpringFestivalPack_req = new SpringFestivalPack_req;
                    req.fid = this._cfg.f_id;
                    SocketMgr.Ins.SendMessageBin(req);
                    break;
                case 2:
                    // 拉取⼴告错误
                    break;
            }
        });
    }

    private onBtnClick3(){
        if(this._cfg){
            let req:SpringFestivalPack_req = new SpringFestivalPack_req;
            req.fid = this._cfg.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _cfg:Configs.t_Event_2024Spring_Pack_dat;
    public setData(value:stSpringFestivalPack){
        if(!value)return;
        this._cfg = SFPackProxy.Ins.GetDataById(value.fid);
        this.lab1.text = this._cfg.f_PackName;
        ItemViewFactory.renderItemSlots(this.sp,this._cfg.f_Rewards,10,0.8,"left");
        this.lab2.text = value.count + "/" + this._cfg.f_PackBuyLimit;

        if(value.count >= this._cfg.f_PackBuyLimit){
            this.btn.disabled = this.btn1.disabled = this.btn2.disabled = this.btn3.disabled = true;
        }else{
            this.btn.disabled = this.btn1.disabled = this.btn2.disabled = this.btn3.disabled = false;
        }

        DotManager.removeDot(this.btn1);
        if(this._cfg.f_PackType == 1){
            this.btn.visible = false;
            this.btn1.visible = true;
            this.btn2.visible = false;
            this.btn3.visible = false;
            if(value.count < this._cfg.f_PackBuyLimit){
                DotManager.addDot(this.btn1,10,-10)
            }
        }else if(this._cfg.f_PackType == 2){
            this.btn.visible = false;
            this.btn1.visible = false;
            this.btn2.visible = true;
            this.btn3.visible = false;
        }else if(this._cfg.f_PackType == 3){
            this.btn.visible = true;
            this.btn1.visible = false;
            this.btn2.visible = false;
            this.btn3.visible = false;
            let priceCfg = t_Purchase_PriceProxy.Ins.GetDataById(this._cfg.f_payid);
            this.lab.text = StringUtil.moneyCv(priceCfg.f_price)+"元";
        }else if(this._cfg.f_PackType == 4){
            this.btn.visible = false;
            this.btn1.visible = false;
            this.btn2.visible = false;
            this.btn3.visible = true;
            let id = parseInt(this._cfg.f_Price.split("-")[0]);
            let num = parseInt(this._cfg.f_Price.split("-")[1]);
            this.icon.skin = IconUtils.getIconByCfgId(id);
            this.lab3.text = num + "";
        }
    }
}