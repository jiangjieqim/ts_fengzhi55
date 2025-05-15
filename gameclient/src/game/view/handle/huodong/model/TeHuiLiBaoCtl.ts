import { ui } from "../../../../../ui/layaMaxUI";
import { ActivityModel } from "../ActivityModel";
import { TeHuiLiBaoItemView } from "../views/TeHuiLiBaoItemView";
import { t_Pack_NewSeverProxy } from "./ActivityProxy";
import { ActivityVo } from "./ActivityVo";
import { EActivityType } from "./EActivityType";
import { BaseXingFuKuanghuanCtl } from "./KaiXiangDajiCtl";
/**特惠礼包 */
export class TeHuiLiBaoCtl extends BaseXingFuKuanghuanCtl{
    public skin:ui.views.huodong.ui_tehui_libao_viewUI;
    protected activityType:EActivityType = EActivityType.TeHuiLiBao;
    constructor(){
        super();
    }
    public onFirstInit(){
        super.onFirstInit();
        this.skin.list1.itemRender = TeHuiLiBaoItemView;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.itemRender);
    }

    private itemRender(item:TeHuiLiBaoItemView){
        item.refreshView(this._activityVo);
    }

    public onInit(){
        super.onInit();
        this.onUpdateView();
    }
    protected onUpdateView(){
        this.skin.list1.array = t_Pack_NewSeverProxy.Ins.List;
    }

    public onExit(){
        super.onExit();
    }
}