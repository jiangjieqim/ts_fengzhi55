import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ESkinRateBtn, RateBtn01Ctl } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EShopPayType } from "../../shop/proxy/shopProxy";

export class ServerTaskItem2 extends ui.views.serverTask.ui_serverTaskItem2UI{
    private btnCtl:ButtonCtl;
    private rateBtnCtl:RateBtn01Ctl;
    constructor(){
        super();
        this.btnCtl = ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        this.rateBtnCtl = new RateBtn01Ctl(this.rate_btn,this,this.onBtnClick,ESkinRateBtn.Yellow);
    }

    private onBtnClick(){
        if(this._data.f_purchaseid){
            ActivityModel.Ins.recharge(this._data.f_purchaseid);
        }else{
            if(this._activityVo){
                ActivityModel.Ins.lingQu(this._activityVo.uid, this._data.f_id);
            }
        }
    }

    private _activityVo:ActivityVo;
    private _data:Configs.t_Sevendays_Pack_dat;
    public setData(value:Configs.t_Sevendays_Pack_dat){
        if(!value)return;
        this._data = value;
        this.lab.text = value.f_packname;

        this.btnCtl.visible = false;
        this.rateBtnCtl.visible = false;
        //////////////////////////////////////

        let _curBtnCtl = this.btnCtl;
        let rateVis:boolean = false;
        if(value.f_purchaseid){
            let cfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(value.f_purchaseid);
            this.cnYuan.text = StringUtil.moneyCv(cfg.f_price) + "元";

            if(cfg.f_isVoucher == EShopPayType.Voucher){
                _curBtnCtl = this.rateBtnCtl.btnCtl;
                rateVis = true;
                this.rateBtnCtl.cfg = cfg;
            }

        }else{
            this.cnYuan.text = "免费";
        }

        this.btnCtl.visible = !rateVis;
        this.rateBtnCtl.visible = rateVis;

        // DotManager.removeDot(this.btn);
        let red:boolean = false;
        let disabled = false;
        ItemViewFactory.renderItemSlots(this.rewardList,value.f_packcontent,10,0.85,"left");
        this._activityVo = ActivityModel.Ins.getVo(EActivityType.ServerTask);
        if(this._activityVo){
            let voo = this._activityVo.vo.datalist.find(item => item.id == value.f_id);
            if(voo){
                this.lab1.text = voo.param1 + "/" + value.f_buytimes;
                if(voo.param1 >= value.f_buytimes){
                    // this.btn.disabled = true;
                    disabled = true;
                }else {
                    // this.btn.disabled = false;
                    disabled = false;
                    if(value.f_purchaseid == 0){
                        // DotManager.addDot(this.btn,10,-10);
                        red = true;
                    }
                }
            }else{
                // this.btn.disabled = true;
                disabled = true;
            }
        }else{
            // this.btn.disabled = true;
            disabled = true;
        }
        ////////////////////////////////////////////
        _curBtnCtl.grayMouseDisable = disabled;
        if(red){
            DotManager.addDot(_curBtnCtl.skin,10,-10);
        }else{
            DotManager.removeDot(_curBtnCtl.skin);
        }
    }




}