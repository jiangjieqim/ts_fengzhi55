import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { GemBaseModel } from "../../gemfeast/GemBaseModel";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EShopPayType } from "../../shop/proxy/shopProxy";
/**坐骑礼包item 或者宝石礼包*/
export class DuanWuPackitemView extends ui.views.duanwu.ui_duanwu_package_itemUI{
    private cfg:Configs.t_Alternation_MountPack_dat|Configs.t_Alternation_RookiePack_dat;
    private rateCtl:RateBtn01Ctl;
    private model:GemBaseModel;
    private freeBtnCtl:ButtonCtl;
    private chongzhiBtnCtl:ButtonCtl;
    constructor(){
        super();
        // this.model = DuanWuModel.Ins;
        this.freeBtnCtl = ButtonCtl.CreateBtn(this.lingquBtn,this,this.onFreeHandler);
        this.chongzhiBtnCtl = ButtonCtl.CreateBtn(this.chongzhiBtn,this,this.onChongZhiHandler);
        this.rateCtl = new RateBtn01Ctl(this.ratebtn,this,this.onChongZhiHandler,ESkinRateBtn.Yellow);
    }
    private onFreeHandler(){
        this.model.packageLingqu(this.cfg.f_id);
    }
    private onChongZhiHandler(){
        ActivityModel.Ins.recharge(this.cfg.f_PurchaseID);
    }
    public refresh(model:GemBaseModel){
        this.model = model;
        this.cfg = this.dataSource;

        this.zhekouimg.visible = false;
        this.freeBtnCtl.visible = false;
        this.chongzhiBtnCtl.visible = false;
        this.rateCtl.visible = false;
        this.redimg.visible = false;
        ////////////////////////////
        let time:number = this.model.getPackageTimes(this.cfg.f_id);

        this.tf01.text = this.cfg.f_PackName;
        ItemViewFactory.renderItemSlots(this.rewardCon,this.cfg.f_PackReward,10,1,"left");
        if(!this.cfg.f_PurchaseID){
            //免费领取
            this.freeBtnCtl.visible = true;
            if(time >= this.cfg.f_BuyTimes){
                this.freeBtnCtl.grayMouseDisable = true;
            }else{
                this.freeBtnCtl.grayMouseDisable = false;
                this.redimg.visible = true;
            }
        
        }else{
            let purcCfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this.cfg.f_PurchaseID);
            //==========================================================
            let btn:ButtonCtl = this.chongzhiBtnCtl;
            if(purcCfg.f_isVoucher == EShopPayType.Voucher){
                btn = this.rateCtl.btnCtl;
                this.rateCtl.cfg = purcCfg;
            }
            RateBtnUtils.Refresh(btn,this.chongzhiBtnCtl,this.rateCtl.btnCtl);
            //==========================================================

            btn.visible = true;
            this.cnYuan.text = StringUtil.moneyCv(t_Purchase_PriceProxy.Ins.GetDataById(this.cfg.f_PurchaseID).f_price) + StringUtil.getCnMoney(0);
            if(time >= this.cfg.f_BuyTimes){
                btn.grayMouseDisable = true;
            }else{
                btn.grayMouseDisable = false;
            }
        }
        this.tf02.text = E.getLang("everyDay") + ":" + time + "/" + this.cfg.f_BuyTimes;

        //200%优惠
        if (this.cfg.f_Discount) {
            this.zhekouimg.visible = true;
            this.tf04.text = `${(this.cfg.f_Discount / 100).toFixed(0)}%${E.getLang("duanwu05")}`;
        }
    }
}