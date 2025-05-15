import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { LabordayBaseModel, LabordayModel, MidAutumnModel } from "../model/LabordayBaseModel";
import { t_Labour_Shop_Free } from "../model/LabordayProxy";
import { MidAutumnShopItem } from "./MidAutumnShopItem";

export class MidAutumnShopView1 extends ViewBase{
    protected model:LabordayBaseModel;
    protected _ui:ui.views.laborday.ui_midautumn_maviewUI;
    private moneyType:ECellType;;
    protected mMask:boolean = true;
    protected _timeCtl:TimeCtlV2;
    protected  onAddLoadRes(): void{}

    protected onFirstInit(): void{
        if(!this.UI){
            this.model = MidAutumnModel.Ins;
            this.UI = this._ui = new ui.views.laborday.ui_midautumn_maviewUI();
            this._ui.list1.itemRender = MidAutumnShopItem;
            this.moneyType = this.model.pieces1;
            this.bindClose(this._ui.close1);
            this._ui.shouhun1.skin = IconUtils.getIcon(this.moneyType);
            this._timeCtl = new TimeCtlV2(this._ui.timeTf,"{0}后结束");
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private  onRenderHandler(item:MidAutumnShopItem) {
        item.setData(item.dataSource);
    }
    private onShopView(){
        this._ui.list1.refresh();
    }

    protected  onInit(): void{
        this.model.on(LabordayBaseModel.EVENT_SHOP_UPDATE,this,this.onShopView);
        MainModel.Ins.on(MainEvent.ValChange,this,this.onMoneyChange);
        this._ui.list1.array = t_Labour_Shop_Free.Ins.getListByType(this.model.type);
        this.onMoneyChange();

        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
        this._timeCtl.start(this.model.subTime);
    }

    protected  onExit(): void{
        MainModel.Ins.off(MainEvent.ValChange,this,this.onMoneyChange);
        this.model.off(LabordayBaseModel.EVENT_SHOP_UPDATE,this,this.onShopView);
        this._timeCtl.stop();
    }

    private onTimeComplete(){
        this._ui.timeTf.text = E.getLang("labordayend");
    }
    private onMoneyChange() {
        this._ui.huobiTf.text = StringUtil.val2m(MainModel.Ins.mRoleData.getVal(this.moneyType));
    }
}