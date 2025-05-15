import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stBattlePassPack } from "../../../../network/protocols/BaseProto";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ESkinRateBtn, RateBtn01Ctl } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { EventGamePassPackProxy } from "../proxy/ZhanLingProxy";

export class ZhanLingItem4 extends ui.views.zhanling.ui_zhanLingItem2UI{
    private btnCtl:ButtonCtl;
    private rateCtl:RateBtn01Ctl;
    constructor(){
        super();
        this.btnCtl=ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        this.rateCtl = new RateBtn01Ctl(this.rate_btn,this,this.onBtnClick,ESkinRateBtn.Yellow);
    }

    private onBtnClick(){
        if(this._cfg){
            ActivityModel.Ins.recharge(this._cfg.f_payid);
        }
    }

    private _cfg:Configs.t_Event_GamePass_Pack_dat;
    public setData(value:stBattlePassPack,index:number){
        if(!value)return;
        let cur:ButtonCtl = this.btnCtl;
        this.btnCtl.visible = false;
        this.rateCtl.visible = false;
        this._cfg = EventGamePassPackProxy.Ins.GetDataById(value.fid);
        ItemViewFactory.renderItemSlots(this.rewardList,this._cfg.f_Rewards,10,0.8,"center");

        let priceCfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this._cfg.f_payid);

        if(priceCfg.f_isVoucher == EShopPayType.Voucher){
            cur = this.rateCtl.btnCtl;
            if(value.paid){
                this.rateCtl.lbText = E.getLang("isbuyed");
            }else{
                this.rateCtl.cfg = priceCfg;
            }
        }else if(priceCfg.f_isVoucher === EShopPayType.Normal){
            if(value.paid){
                this.lab.text = E.getLang("isbuyed");
            }else{
                this.lab.text = StringUtil.moneyCv(priceCfg.f_price) + "元解锁";
            }
        }
        
        cur.visible = true;

        if(index == 0){
            this.img.skin = "remote/zhanling/czlb1.png";
        }else{
            this.img.skin = "remote/zhanling/czlb2.png";
        }
        cur.grayMouseDisable = value.paid == 1;
    }
}