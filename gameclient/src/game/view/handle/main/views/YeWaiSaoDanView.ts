import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { AdventureBossProxy } from "../proxy/AdventureBossProxy";
import { ItemVo } from "../vos/ItemVo";
import { SmallItemIcon } from "./SmallItemIcon";

export class YeWaiSaoDanView extends ViewBase {
    private model:MainModel;
    private _ui:ui.views.maoxian.ui_saodan_viewUI;
    private slot:SmallItemIcon;
    private freeCtl:ButtonCtl;
    private sanDanCtl:ButtonCtl;
    private cfg:Configs.t_Adventure_Boss_dat;
    protected mMask:boolean = true;
    protected autoFree = true;
    /**添加加载资源 */
    protected onAddLoadRes(): void {

    }
    /**离开处理 */
    protected onExit(): void {
        this.model.off(MainEvent.AdventureBossUpdate, this, this.onRefreshHandler);
    }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.maoxian.ui_saodan_viewUI();
            this.model = MainModel.Ins;
            this.slot = new SmallItemIcon(this._ui.slot);
            this.freeCtl = ButtonCtl.Create(this._ui.free,new Laya.Handler(this,this.onFreeHandler));
            this.sanDanCtl = ButtonCtl.Create(this._ui.saodan,new Laya.Handler(this,this.onSaoDanHandler));
            this.btnList.push(this.freeCtl,this.sanDanCtl);
        }
    }

    private onSweep(){
        this.model.sweep(this.cfg.f_id);
        this.Close();
    }

    /**扫荡 */
    private onSaoDanHandler(){
        this.onSweep();
    }

    /**免费 */
    private onFreeHandler(){
        this.onSweep();
    }

    protected onRefreshHandler() {
        this.freeCtl.visible = false;
        this.sanDanCtl.visible = false;
        //////////////////////////////////////////////////
        let cfg: Configs.t_Adventure_Boss_dat = AdventureBossProxy.Ins.GetDataById(this.model.adventureBossData.f_id);
        this.cfg = cfg;
        let arr = cfg.f_RaidsPrice.split("|");
        let itemStr = arr[this.model.adventureBossData.cnt];
        if (itemStr) {
            let _itemVo: ItemVo = ItemViewFactory.convertItemList(itemStr)[0];
            this.slot.setData(cfg.f_RaidsReward);

            if (_itemVo.count == 0) {
                this.freeCtl.visible = true;
            } else {
                this.sanDanCtl.visible = true;
                this._ui.cnttf.text = _itemVo.count.toString();

                if (this.model.mRoleData.gold >= _itemVo.count) {
                    this._ui.cnttf.color = `#F6ECB7`;
                } else {
                    this._ui.cnttf.color = `#FF0000`;
                }
            }
        }
        this._ui.tf2.text = `今日剩余${(arr.length - this.model.adventureBossData.cnt)}次`;
    }

    /**初始化*/
    protected onInit(): void {
        this.model.on(MainEvent.AdventureBossUpdate, this, this.onRefreshHandler);
        this.onRefreshHandler();
    }
}