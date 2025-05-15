import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stActivityCell } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { ActivityModel } from "../ActivityModel";
import { t_Pack_Daily_Shop, t_Pack_Daily_Shop_WeekCard, t_Purchase_PriceProxy } from "../model/ActivityProxy";

export class ZheKouItem1 extends ui.views.huodong.ui_zhekouItem1UI{
    constructor() {
        super();
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        if(this._data){
            if(this._data.param1){
                E.ViewMgr.ShowMidError("今日已售馨");//显示错误提示
            }else{
                let cfg = t_Pack_Daily_Shop.Ins.getCfgById(this._data.id);
                ActivityModel.Ins.recharge(cfg.f_purchaseid);
            }
        }
    }

    private _data:stActivityCell;
    public setData(value:stActivityCell){
        if(!value)return;
        this._data = value;
        let vo = new ItemVo();
        let cfg = t_Pack_Daily_Shop.Ins.getCfgById(value.id);
        vo.cfgId = parseInt(cfg.f_rewards.split("-")[0]);
        vo.count = parseInt(cfg.f_rewards.split("-")[1]);
        ItemViewFactory.refreshSlot(this.item,vo);
        this.lab.text = vo.getName();
        if(value.param1){
            this.img.visible = true;
        }else{
            this.img.visible = false;
        }

        let wCfg = t_Pack_Daily_Shop_WeekCard.Ins.getCfgByGroupId(cfg.f_group);
        if(wCfg){
            let num = MainModel.Ins.getZKWCNum(wCfg.f_id);
            if(num){
                this.btn.mouseEnabled = false;
                this.img1.skin = "remote/huodong/duigou1.png";
                if(value.param1){
                    this.lab1.text = "已领取";
                }else{
                    this.lab1.text = "免费";
                }
            }else{
                let purCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(cfg.f_purchaseid);
                this.lab1.text = StringUtil.moneyCv(purCfg.f_price) + "元";
                this.btn.mouseEnabled = true;
                this.img1.skin = "remote/huodong/shuoqing.png";
            }
        }else{
            let purCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(cfg.f_purchaseid);
            this.lab1.text = StringUtil.moneyCv(purCfg.f_price) + "元";
            this.btn.mouseEnabled = true;
            this.img1.skin = "remote/huodong/shuoqing.png";
        }
        
    }
}