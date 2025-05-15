import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ActivityModel } from "../ActivityModel";
import { t_Fund_NewProxy } from "../model/ActivityProxy";
import { EActivityType } from "../model/EActivityType";
import { LingchongLibaoItemView } from "./BaoxiangChengZhangLibaoItemView";
import { BaoxiangChengZhangLibaoView } from "./BaoxiangChengZhangLibaoView";
/**灵宠成长基金 */
export class LingchongChengZhangJiJin extends BaoxiangChengZhangLibaoView{
    protected activityType:EActivityType = EActivityType.LingchongChengZhang;//灵宠成长基金
    protected _ui;//: ui.views.huodong.ui_juese_chengzhangUI;
    
    protected cls = LingchongLibaoItemView;
    private skin:ui.views.huodong.ui_pet_chengzhangUI;
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.huodong.ui_pet_chengzhangUI();
            this.skin = this._ui;
            this.initView();
        }
    }

    protected get cfgList(){
        return t_Fund_NewProxy.Ins.getCfgByType(2);
    }

    protected get canLingqu() {
        let _isLiqngqu = ActivityModel.Ins.bornHasLingqu(this.curCfgList, this._activityVo);
        return _isLiqngqu;
    }
    protected initTopView(){
        let ritem = ItemViewFactory.convertItem(this.topCfg.f_itemid);
        ItemViewFactory.refreshSlot(this._ui.slot1, ritem);
    }
}