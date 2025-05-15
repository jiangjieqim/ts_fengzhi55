import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ActivityModel } from "../ActivityModel";
import { t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { ActivityVo } from "../model/ActivityVo";
/**特惠礼包 */
export class TeHuiLiBaoItemView extends ui.views.huodong.ui_tehui_libao_item_viewUI {
    private cfg: Configs.t_Pack_NewSever_dat;
    private _vo: ActivityVo;
    constructor() {
        super();
        ButtonCtl.CreateBtn(this.buyBtn, this, this.onBuyHandler);
    }
    private onBuyHandler() {
        if(this.subCount <= 0){
            E.ViewMgr.ShowMidError(E.getLang("limitBuyMax"));
        }else{
            ActivityModel.Ins.recharge(this.cfg.f_PurchaseID);
        }
    }

    public refreshView(_vo: ActivityVo) {
        this._vo = _vo;
        this.cfg = this.dataSource;
        ItemViewFactory.renderItemSlots(this.rewardCon, this.cfg.f_Item,10,1,"left");
        this.nametf1.text = this.cfg.f_name;

        let ppCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this.cfg.f_PurchaseID);
        this.moneyTf.text = StringUtil.moneyCv(ppCfg.f_price) + "元";

        this.cntTf.text = E.LangMgr.getLang("Xiangou") +": "+ this.subCount + "/" + this.cfg.f_BuyTimes;
    }

    /**剩余次数 */
    private get subCount() {
        if (!this._vo) {
            return 0;
        }
        return this._vo.getSubTime(this.cfg);//this._vo.getParam1(this.cfg.f_id);
    }
}