import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { MonopolyPack_req, stMonopolyPack } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ESkinRateBtn, RateBtn01Ctl } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { MonopolyPackProxy } from "../proxy/MonopolyProxy";

export class MonopolyLBItem extends ui.views.monopoly.ui_MonopolyLBItemUI{
    private freeCtl: ButtonCtl;
    private rateCtl: RateBtn01Ctl;

    constructor(){
        super();
        this.freeCtl = ButtonCtl.CreateBtn(this.freeBtn, this, this.onBtnClick1);
        this.rateCtl = new RateBtn01Ctl(this.rate_btn, this, this.onBtnClick, ESkinRateBtn.Yellow);
        ButtonCtl.Create(this.btn2,new Laya.Handler(this,this.onBtnClick2));
        this.btn2.visible = false;
    }

    private onBtnClick(){
        if(this._cfg){
            ActivityModel.Ins.recharge(this._cfg.f_PackPurchase);
        }
    }

    private onBtnClick1(){
        if(this._cfg){
            let req:MonopolyPack_req = new MonopolyPack_req;
            req.fid = this._cfg.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnClick2(){
        if(!this._cfg)return;
        E.sendTrack("ad_watch",{type:"monopoly_mf"});
        E.sdk.lookVideo((type: 0 | 1 | 2) => {
            switch(type) {
                case 0:
                    // ⽤户未看完取消
                    break;
                case 1:
                    // ⽤户看完⼴告
                    E.sendTrack("ad_finish",{type:"monopoly_mf"});
                    let req:MonopolyPack_req = new MonopolyPack_req;
                    req.fid = this._cfg.f_id;
                    SocketMgr.Ins.SendMessageBin(req);
                    break;
                case 2:
                    // 拉取⼴告错误
                    break;
            }
        });
    }

    private _cfg:Configs.t_Monopoly_Pack_dat;
    public setData(value:stMonopolyPack){
        if(!value)return;
        this._cfg = MonopolyPackProxy.Ins.GetDataById(value.fid);
        this.lab1.text = this._cfg.f_PackName;
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
           }else{
              _freeIsShow =  false;//隐藏掉免费按钮
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
    }
}