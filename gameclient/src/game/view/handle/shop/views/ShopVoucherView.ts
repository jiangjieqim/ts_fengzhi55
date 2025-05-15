import { ECellType } from "../../main/vos/ECellType";
import { MoneyInfoViewCtl } from "./MoneyInfoViewCtl";
import { ShopView } from "./ShopView";

export class ShopVoucherView extends ShopView{
    protected onInitUI(){
        new MoneyInfoViewCtl(this._ui.moneyInfo,ECellType.GOLD);
        new MoneyInfoViewCtl(this._ui.voucher_money,ECellType.Voucher);
        this.addTabs(this._ui.tabcon1);
    }
}