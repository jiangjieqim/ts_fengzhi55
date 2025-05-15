import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ActivityModel } from "../ActivityModel";
import { t_Fund_NewProxy } from "../model/ActivityProxy";
import { EActivityType } from "../model/EActivityType";
import { ZuoqiLibaoItemView } from "./BaoxiangChengZhangLibaoItemView";
import { BaoxiangChengZhangLibaoView } from "./BaoxiangChengZhangLibaoView";
/**坐骑成长基金 */
export class ZuoqiChengZhangJiJin extends BaoxiangChengZhangLibaoView{
    protected activityType:EActivityType = EActivityType.ZuoqiChengZhang;//坐骑成长基金
    protected _ui;//: ui.views.huod`ong.ui_juese_chengzhangUI;
    
    protected cls = ZuoqiLibaoItemView;
    private skin:ui.views.huodong.ui_mount_chengzhangUI;
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.huodong.ui_mount_chengzhangUI();
            this.skin = this._ui;
            this.initView();
        }
    }

    protected get cfgList(){
        return t_Fund_NewProxy.Ins.getCfgByType(1);
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