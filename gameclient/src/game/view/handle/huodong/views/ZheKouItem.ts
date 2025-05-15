import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { stActivityCell } from "../../../../network/protocols/BaseProto";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { ActivityModel } from "../ActivityModel";
import { t_Pack_Daily_Shop, t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "./RateBtn01Ctl";
import { ZheKouItem1 } from "./ZheKouItem1";

export class ZheKouItem extends ui.views.huodong.ui_zhekouItemUI{
    private btnCtl:ButtonCtl;
    private rateCtl:RateBtn01Ctl;
    constructor() {
        super();
        this.list.itemRender = ZheKouItem1;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        this.btnCtl=ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        this.rateCtl = new RateBtn01Ctl(this.rate_btn,this,this.onBtnClick,ESkinRateBtn.Red)
    }

    private onRenderHandler(item:ZheKouItem1){
        item.setData(item.dataSource);
    }

    private onBtnClick(){
        if(!this._cfg)return;
        ActivityModel.Ins.recharge(this._cfg.f_purchaseid);
    }

    private _cfg:Configs.t_Pack_Daily_Shop_dat;
    public setData(value:stActivityCell[]){
        if(!value)return;
        let arr = [];
        let vo:stActivityCell;
        let flag = false;
        for(let i:number=0;i<value.length;i++){
            let cfg = t_Pack_Daily_Shop.Ins.getCfgById(value[i].id);
            if(cfg.f_type == 1){
                vo = value[i];
            }else{
                arr.push(value[i]);
            }
            if(!flag){
                if(value[i].param1){
                    flag = true;
                }
            }
        }
        this.list.array = arr;

        this._cfg = t_Pack_Daily_Shop.Ins.getCfgById(vo.id);

        this.lab.text = this._cfg.f_pricetrue + "元";
        let purCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this._cfg.f_purchaseid);
        let curBtnCtl:ButtonCtl = this.btnCtl;
        if(purCfg.f_isVoucher == EShopPayType.Voucher){
            curBtnCtl = this.rateCtl.btnCtl;
            this.rateCtl.cfg = purCfg;
        }
        RateBtnUtils.Refresh(curBtnCtl,this.btnCtl,this.rateCtl.btnCtl);

        this.lab1.text = StringUtil.moneyCv(purCfg.f_price) + "元打包购买";
        if(flag){
            // this.btn.disabled = true;
            curBtnCtl.grayMouseDisable = true;
        }else{
            // this.btn.disabled = false;
            curBtnCtl.grayMouseDisable = false;
        }
    }
}