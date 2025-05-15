import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { GeXuQiPaoPack_req, stGeXuQiPaoPack } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { RateBtn01Ctl, ESkinRateBtn } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { RADrawEventPackProxy } from "../proxy/GeXuQiPaoProxy";

export class GeXuQiPaoLBItem extends ui.views.gexuqipao.ui_gexuqipaoLBItemUI{
    private cfg: Configs.t_RecurringActivity_DrawEvent_Pack_dat;
    private freeCtl: ButtonCtl;
    private rateCtl: RateBtn01Ctl;
    constructor() {
        super();
        this.freeCtl = ButtonCtl.CreateBtn(this.freeBtn, this, this.onfreeBtnHandler);
        this.rateCtl = new RateBtn01Ctl(this.rate_btn, this, this.onfreeBtnHandler, ESkinRateBtn.Yellow);
    }

    private onfreeBtnHandler() {
        if (this.cfg.f_PackPurchase == 0) {
            let req:GeXuQiPaoPack_req = new GeXuQiPaoPack_req;
            req.fid = this.cfg.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        } else {
           ActivityModel.Ins.recharge(this.cfg.f_PackPurchase);
        }
     }

     private _data:stGeXuQiPaoPack;
     public setData(value:stGeXuQiPaoPack) {
        this._data = value;
        this.cfg = RADrawEventPackProxy.Ins.GetDataById(value.fid);
        this.lab.text = this.cfg.f_PackName;
        ItemViewFactory.renderItemSlots(this.rewardCon, this.cfg.f_PackRewards, 10, 0.95, "left");

        let btn: ButtonCtl = this.freeCtl;
        this.rateCtl.visible = false;
        this.freeCtl.visible = false;
        let _freeIsShow: boolean = true;
        if (this.cfg.f_PackPurchase == 0) {
           this.tf3.text = E.getLang("Free");
        } else {
           let ppCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this.cfg.f_PackPurchase);
           if (ppCfg.f_isVoucher == EShopPayType.Voucher) {
              btn = this.rateCtl.btnCtl;
              this.rateCtl.cfg = ppCfg;
              _freeIsShow = false;
           }
           this.tf3.text = StringUtil.moneyCv(ppCfg.f_price) + "元";
        }
        this.freeCtl.visible = _freeIsShow;
        this.rateCtl.btnCtl.visible = !this.freeCtl.visible;
  
        this.countTf.text = "限购:" + (this.cfg.f_PackBuyLimit - value.count) + "/" + this.cfg.f_PackBuyLimit;
        if (value.count >= this.cfg.f_PackBuyLimit) {
           btn.mouseEnable = false;
           btn.gray = true;
        } else {
           btn.mouseEnable = true;
           btn.gray = false;
        }
  
        DotManager.removeDot(btn.skin);
        if(this.cfg.f_PackPurchase == 0){
            if(value.count < this.cfg.f_PackBuyLimit){
                DotManager.addDot(btn.skin);
            }
        }
     }
}