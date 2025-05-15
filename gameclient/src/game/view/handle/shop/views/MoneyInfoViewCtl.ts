import { MoneyCtl } from "../../main/ctl/MoneyCtl";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

interface IMoneyInfoSkin extends Laya.Sprite{
    bg: Laya.Image;
    moneyCountLabel: Laya.Label;
    icon: Laya.Image;
}
export class MoneyInfoViewCtl {
    private money:MoneyCtl;
    constructor(skin:IMoneyInfoSkin,itemId:number) {
        skin.on(Laya.Event.DISPLAY,this,this.onDisplay);
        skin.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
        this.money = new MoneyCtl(skin.moneyCountLabel,itemId);
        skin.icon.skin = IconUtils.getIconByCfgId(itemId);
        this.onDisplay();
    }
    private onDisplay(){
        this.money.init();
    }

    private onUnDisplay(){
        this.money.exit();
    }

}