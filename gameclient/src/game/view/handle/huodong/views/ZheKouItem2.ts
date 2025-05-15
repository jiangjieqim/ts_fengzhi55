import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { stActivityCell } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { ActivityModel } from "../ActivityModel";
import { t_Pack_Daily_Shop, t_Pack_Daily_Shop_WeekCard, t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { EActivityType } from "../model/EActivityType";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "./RateBtn01Ctl";
import { ZheKouItem1 } from "./ZheKouItem1";

export class ZheKouItem2 extends ui.views.huodong.ui_zhekouItem2UI{
    private rateBtnCtl:RateBtn01Ctl;
    private unlockBtnCtl:ButtonCtl;
    private sp1RateCtl:RateBtn01Ctl;
    private sp1BtnCtl:ButtonCtl;
    constructor() {
        super();
        this.list.itemRender = ZheKouItem1;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        this.rateBtnCtl = new RateBtn01Ctl(this.rateBtn,this,this.onunlockbtn,ESkinRateBtn.Yellow);
        
        this.sp1BtnCtl = ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        this.sp1RateCtl = new RateBtn01Ctl(this.sp1_rate,this,this.onBtnClick,ESkinRateBtn.Red);

        this.unlockBtnCtl = ButtonCtl.Create(this.unlockbtn,new Laya.Handler(this,this.onunlockbtn));
        ButtonCtl.Create(this.lingquBtn,new Laya.Handler(this,this.onlingquBtn));
        ButtonCtl.Create(this.sp_xf,new Laya.Handler(this,this.onunlockbtn));
    }

    private onRenderHandler(item:ZheKouItem1){
        item.setData(item.dataSource);
    }

    private onBtnClick(){
        if(!this._cfg)return;
        ActivityModel.Ins.recharge(this._cfg.f_purchaseid);
    }

    private onunlockbtn(){
        if(!this._wCfg)return;
        ActivityModel.Ins.recharge(this._wCfg.f_purchaseid);
    }

    private onlingquBtn(){
        let vo = ActivityModel.Ins.getVo(EActivityType.ZKShopWeek);
        if(this._wCfg && vo){
            ActivityModel.Ins.lingQu(vo.uid,this._wCfg.f_id);
        }
    }

    private _cfg:Configs.t_Pack_Daily_Shop_dat;
    private _wCfg:Configs.t_Pack_Daily_Shop_WeekCard_dat;
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
        this.lab1.text = StringUtil.moneyCv(purCfg.f_price) + "元打包购买";

        DotManager.removeDot(this.lingquBtn);
        this._wCfg = t_Pack_Daily_Shop_WeekCard.Ins.getCfgByGroupId(this._cfg.f_group);
        let num = MainModel.Ins.getZKWCNum(this._wCfg.f_id);

        ////////////////////////////////////////////////////////////////////////////
        let wPurch:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this._wCfg.f_purchaseid);
        let tempBtnSp1:ButtonCtl = this.sp1BtnCtl;
        if(purCfg.f_isVoucher == EShopPayType.Voucher){
            tempBtnSp1 = this.rateBtnCtl.btnCtl;
            this.sp1RateCtl.cfg = purCfg;
        }
        RateBtnUtils.Refresh(tempBtnSp1,this.sp1BtnCtl,this.sp1RateCtl.btnCtl);
        //==============================================================
        let btnCtl:ButtonCtl = this.unlockBtnCtl;
        if(wPurch.f_isVoucher == EShopPayType.Voucher){
            btnCtl = this.rateBtnCtl.btnCtl;
            this.rateBtnCtl.cfg = wPurch
        }
        RateBtnUtils.Refresh(btnCtl,this.unlockBtnCtl,this.rateBtnCtl.btnCtl);
        ////////////////////////////////////////////////////////////////////////////

        if(num){
            btnCtl.skin.visible = false;
            this.lingquBtn.visible = true;
            if(vo.param1){
                this.lingquBtn.disabled = true;
            }else{
                DotManager.addDot(this.lingquBtn);
                this.lingquBtn.disabled = false;
            }
            this.sp1.visible = false;
            this.sp2.visible = true;
            this.lab_day.text = num + "";
        }else{
            btnCtl.skin.visible = true;
            
            let pp: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this._wCfg.f_purchaseid);
            this.tf2.text = StringUtil.moneyCv(pp.f_price) + "元购买";
            this.lingquBtn.visible = false;

            this.sp1.visible = true;//显示按钮
            this.sp2.visible = false;
            if(flag){
                // this.btn.disabled = true;
                tempBtnSp1.grayMouseDisable = true;
                btnCtl.grayMouseDisable = true;
            }else{
                // this.btn.disabled = false;
                tempBtnSp1.grayMouseDisable = false;
                btnCtl.grayMouseDisable = false;
            }
        }
    }
}