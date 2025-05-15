import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ActivityModel } from "../ActivityModel";
import { t_Pack_ChaGrowProxy } from "../model/ActivityProxy";
import { EActivityType } from "../model/EActivityType";
import { RoleLibaoItemView } from "./BaoxiangChengZhangLibaoItemView";
import { BaoxiangChengZhangLibaoView } from "./BaoxiangChengZhangLibaoView";
/**角色成长礼包 */
export class JueseChengZhangLiBao extends BaoxiangChengZhangLibaoView{
    protected activityType:EActivityType = EActivityType.RoleBorn;//角色成长礼包
    protected _ui;//: ui.views.huodong.ui_juese_chengzhangUI;
    
    protected cls = RoleLibaoItemView;
    private skin:ui.views.huodong.ui_juese_chengzhangUI;
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.huodong.ui_juese_chengzhangUI();
            this.skin = this._ui;
            this.initView();
        }
    }

    protected get cfgList(){
        return t_Pack_ChaGrowProxy.Ins.List;
    }

    protected get canLingqu() {
        let _isLiqngqu = ActivityModel.Ins.bornHasLingqu(this.curCfgList, this._activityVo);
        return _isLiqngqu;
    }
    protected initTopView(){
        ItemViewFactory.renderItemSlots(this.skin.rewardCon,this.topCfg.f_itemid,10,1,"left");
    }
}