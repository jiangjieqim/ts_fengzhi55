import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";

export class KaiFuChongBangItem3 extends ui.views.kaifuchongbang.ui_KaiFuChongBangitem3UI{
    constructor(){
        super();

        this.list.itemRender = ui.views.main.ui_slot_itemUI;
        this.list.renderHandler = new Laya.Handler(this,this.onItemHandler);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        if(this._data){
            ActivityModel.Ins.recharge(this._data.f_PurchaseID);
        }
    }

    private onItemHandler(item:ui.views.main.ui_slot_itemUI){
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item,vo);
    }

    private _activityVo:ActivityVo;
    private _data:Configs.t_OpenServerActivity_AdvantureReward_dat;
    public setData(value:Configs.t_OpenServerActivity_AdvantureReward_dat){
        if(!value)return;
        this._data = value;
        this.lab.text = value.f_PackName;
        let cfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(value.f_PurchaseID);
        this.cnYuan.text = StringUtil.moneyCv(cfg.f_price) + "元";
        this.list.array = value.f_Reward.split("|");
        this._activityVo = ActivityModel.Ins.getVo(EActivityType.KaiFuChongBang);
        if(this._activityVo){
            let voo = this._activityVo.vo.datalist.find(item => item.id == value.f_id);
            if(voo){
                this.lab_xg.text = voo.param1 + "/" + value.f_LimitTimes;
                if(voo.param1 >= value.f_LimitTimes){
                    this.btn.disabled = true;
                }else {
                    this.btn.disabled = false;
                }
            }else{
                this.btn.disabled = true;
            }
        }else{
            this.btn.disabled = true;
        }
    }
}