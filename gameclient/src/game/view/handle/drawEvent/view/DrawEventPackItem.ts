import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DrawEventPack_req, stDrawEventPack } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ESkinRateBtn, RateBtn01Ctl } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { DrawEventPackProxy } from "../proxy/DrawEventProxy";

export class DrawEventPackItem extends ui.views.drawEvent.ui_DrawEventLBItemUI{
    private freeCtl: ButtonCtl;
    private rateCtl: RateBtn01Ctl;

    constructor(){
        super();
        this.freeCtl = ButtonCtl.CreateBtn(this.freeBtn, this, this.onBtnClick1);
        this.rateCtl = new RateBtn01Ctl(this.rate_btn, this, this.onBtnClick, ESkinRateBtn.Yellow);
        ButtonCtl.Create(this.btn2,new Laya.Handler(this,this.onBtnClick2));
        ButtonCtl.Create(this.btn3,new Laya.Handler(this,this.onBtnClick3));
        this.btn2.visible = false;
    }

    private onBtnClick(){
        if(this._cfg){
            ActivityModel.Ins.recharge(this._cfg.f_PackPurchase);
        }
    }

    private onBtnClick1(){
        if(this._cfg){
            let req:DrawEventPack_req = new DrawEventPack_req;
            req.fid = this._cfg.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnClick2(){
        if(!this._cfg)return;
        E.sendTrack("ad_watch",{type:"drawEvent_mf"});
        E.sdk.lookVideo((type: 0 | 1 | 2) => {
            switch(type) {
                case 0:
                    // ⽤户未看完取消
                    break;
                case 1:
                    // ⽤户看完⼴告
                    E.sendTrack("ad_finish",{type:"drawEvent_mf"});
                    let req:DrawEventPack_req = new DrawEventPack_req;
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
            let req:DrawEventPack_req = new DrawEventPack_req;
            req.fid = this._cfg.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _cfg:Configs.t_DrawEvent_Pack_dat;
    public setData(value:stDrawEventPack){
        if(!value)return;
        this._cfg = DrawEventPackProxy.Ins.GetDataById(value.fid);
        this.lab_name.text = this._cfg.f_PackName;
        ItemViewFactory.renderItemSlots(this.sp,this._cfg.f_PackRewards,10,0.8,"left");
        this.lab2.text = "限购："+value.count + "/" + this._cfg.f_PackBuyLimit;

        let btn: ButtonCtl = this.freeCtl;
        this.rateCtl.visible = false;
        this.freeCtl.visible = false;
        let _freeIsShow: boolean = true;
        if (this._cfg.f_PackPurchase == 0) {
           this.tf3.text = E.getLang("Free");
        } else {
           let ppCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this._cfg.f_PackPurchase);
           if (ppCfg.f_isVoucher == EShopPayType.Voucher) {
              btn = this.rateCtl.btnCtl;
              this.rateCtl.cfg = ppCfg;
              _freeIsShow = false;
           }
           this.tf3.text = StringUtil.moneyCv(ppCfg.f_price) + "元";
        }
        this.freeCtl.visible = _freeIsShow;
        this.rateCtl.btnCtl.visible = !this.freeCtl.visible;
  
        if (value.count >= this._cfg.f_PackBuyLimit) {
           btn.mouseEnable = false;
           btn.gray = true;
        } else {
           btn.mouseEnable = true;
           btn.gray = false;
        }

        DotManager.removeDot(btn.skin);
        if(this._cfg.f_PackPurchase == 0){
            if(value.count < this._cfg.f_PackBuyLimit){
                DotManager.addDot(btn.skin);
            }
        }

        if(this._cfg.f_PackType == 4){
            this.freeBtn.visible = false;
            this.rate_btn.visible = false;
            this.btn3.visible = true;
            let id = parseInt(this._cfg.f_Price.split("-")[0]);
            let num = parseInt(this._cfg.f_Price.split("-")[1]);
            this.icon.skin = IconUtils.getIconByCfgId(id);
            this.lab3.text = num + "";
            if (value.count >= this._cfg.f_PackBuyLimit) {
                this.btn3.disabled = true;
            }else{
                this.btn3.disabled = false;
            }
        }else{
            this.btn3.visible = false;
        }
    }
}