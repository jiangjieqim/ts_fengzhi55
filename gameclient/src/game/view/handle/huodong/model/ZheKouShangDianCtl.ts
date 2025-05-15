import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stActivityCell } from "../../../../network/protocols/BaseProto";
import { EGameColor } from "../../main/model/EGameColor";
import { MainModel } from "../../main/model/MainModel";
import { ActivityModel } from "../ActivityModel";
import { IItem, PackShopMarketProxy } from "./ActivityProxy2";
import { ActivityVo } from "./ActivityVo";
import { EActivityType } from "./EActivityType";

/**折扣商店item控制器 */
export class ZheKouShangDianCtl {
    private skin: ui.views.huodong.ui_zhekoushangdian_itemUI;
    private _data: IItem;
    private _activityVo:ActivityVo;
    private activityType:EActivityType = EActivityType.SanGuo;//宝箱成长礼包

    constructor(_skin: ui.views.huodong.ui_zhekoushangdian_itemUI){
        this.skin = _skin;
        this.skin.on(Laya.Event.CLICK,this, this.onClick);
        this._activityVo = ActivityModel.Ins.getVo(this.activityType);
    }

    private onClick() {
        MainModel.Ins.buy(this._data.payItemVo.cfgId,this._data.payItemVo.count,this._data.itemVo.cfgId,this._data.itemVo.count,new Laya.Handler(this,this.onCallBack));
    }

    private onCallBack(){
        const fid = this._data.fid;
        ActivityModel.Ins.lingQu(this._activityVo.uid, fid);
    }
    private set showRed(v:boolean){
        // this.skin.redimg.visible = v;
    }
    public setData(data: stActivityCell){
        const item: IItem = PackShopMarketProxy.Ins.getItemById(data.id);
        this._data = item;
        this.skin.tf1.text = item.itemVo.getName();
        this.skin.slot.tf1.text = item.itemVo.count.toString();
        this.skin.slot.icon.skin = item.itemVo.getIcon();
        this.skin.needicon.skin = item.payItemVo.getIcon();
        this.skin.saleOutBg.visible = false;
        this.skin.zhekouImg.visible = false;

        // item.payItemVo.count = 0;
        if(item.payItemVo.count > 0){
            this.skin.needmoney.text = item.payItemVo.count + "";
            this.skin.needmoney.color = EGameColor.NORMAL_YELLOW;
        }else{
            this.skin.needmoney.text = E.getLang("Free");
            this.skin.needmoney.color = EGameColor.GREED;
        }
        if (data.param1 === 1) {
            // 售罄
            this.skin.saleOutBg.visible = true;
            this.skin.zhekouImg.visible = false;
            this.showRed = false;
            this.skin.priceItem.visible = false;
        } else {
            if (item.iconId) {
                // 有折扣
                this.skin.zhekouImg.skin = `remote/huodong/zhekou_${item.iconId}.png`;
                this.skin.zhekouImg.visible = true;
            } else {
                this.skin.zhekouImg.visible = false;
            }
            if (!item.payItemVo.count) {
                // 免费
                this.skin.zhekouImg.visible = false;
                this.showRed = true;
            }
            this.skin.priceItem.visible = true;
        }
    }
}