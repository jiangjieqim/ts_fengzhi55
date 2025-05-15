import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { RateBtn01Ctl, ESkinRateBtn } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { ZiXuanLiBaoModel } from "../model/ZiXuanLiBaoModel";

export class ZiXuanLiBaoItem extends ui.views.zixuanlibao.ui_zixuanlibaoItemUI{
    private cfg: Configs.t_RecurringActivity_OptionalPack_dat;
    private freeCtl: ButtonCtl;
    private _vo: ActivityVo;
    private rateCtl: RateBtn01Ctl;
    constructor() {
        super();
        this.freeCtl = ButtonCtl.CreateBtn(this.freeBtn, this, this.onfreeBtnHandler);
        this.rateCtl = new RateBtn01Ctl(this.rate_btn, this, this.onfreeBtnHandler, ESkinRateBtn.Yellow);
        this.item1.on(Laya.Event.CLICK,this,this.onClick);
        this.item2.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        if (this._vo.getParam1(this.cfg.f_id) >= this.cfg.f_LimitedPurchase) {
           return;
        } 
        E.ViewMgr.Open(EViewType.ZiXuanLiBaoView1,null,this.cfg);
    }

    private onfreeBtnHandler() {
        if (this.cfg.f_PackPurchase == 0) {
           if (this._vo) {
              ActivityModel.Ins.lingQu(this._vo.uid, this.cfg.f_id);
           }
        } else {
           ActivityModel.Ins.recharge(this.cfg.f_PackPurchase);
        }
     }

     public refreshView(_vo: ActivityVo) {
        this._vo = _vo;
        this.cfg = this.dataSource;
        this.lab.text = this.cfg.f_PackName;

        if (this.cfg.f_PackPurchase == 0) {
            this.rewardCon.visible = true;
            this.item.visible = this.item1.visible = this.item2.visible = false;
            ItemViewFactory.renderItemSlots(this.rewardCon, this.cfg.f_ConstantReward, 10, 0.95, "left");
        }else{
            this.rewardCon.visible = false;
            this.item.visible = true;
            let itemVo:ItemVo = ItemViewFactory.convertItemList(this.cfg.f_ConstantReward)[0];
            ItemViewFactory.refreshSlot(this.item,itemVo);

            this.item1.visible = true;
            let vo = ZiXuanLiBaoModel.Ins.dataList.find(ele => ele.id == this.cfg.f_id);
            let voo = vo.items.find(ele => ele.pos == 1);
            if(voo){
                this.item1.quality.visible = false;
                this.item1.item.visible = true;
                let st = this.cfg.f_OptionalReward1.split("|")[voo.itemIdx];
                itemVo = ItemViewFactory.convertItemList(st)[0];
                ItemViewFactory.refreshSlot(this.item1.item,itemVo,false);
            }else{
                this.item1.quality.visible = true;
                this.item1.item.visible = false;
            }

            if(this.cfg.f_OptionalReward2 != ""){
                this.item2.visible = true;
                voo = vo.items.find(ele => ele.pos == 2);
                if(voo){
                    this.item2.quality.visible = false;
                    this.item2.item.visible = true;
                    let st = this.cfg.f_OptionalReward2.split("|")[voo.itemIdx];
                    itemVo = ItemViewFactory.convertItemList(st)[0];
                    ItemViewFactory.refreshSlot(this.item2.item,itemVo,false);
                }else{
                    this.item2.quality.visible = true;
                    this.item2.item.visible = false;
                }
            }else{
                this.item2.visible = false;
            }
        }

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
  
        let _serverTime: number = _vo.getParam1(this.cfg.f_id);;
        this.countTf.text = "限购:" + (this.cfg.f_LimitedPurchase - _serverTime) + "/" + this.cfg.f_LimitedPurchase;
        if (_serverTime >= this.cfg.f_LimitedPurchase) {
           btn.mouseEnable = false;
           btn.gray = true;
        } else {
           btn.mouseEnable = true;
           btn.gray = false;
        }
  
        DotManager.removeDot(btn.skin);
        if(this.cfg.f_PackPurchase == 0){
            if(_vo.getParam1(this.cfg.f_id) < this.cfg.f_LimitedPurchase){
                DotManager.addDot(btn.skin);
            }
        }
     }
}