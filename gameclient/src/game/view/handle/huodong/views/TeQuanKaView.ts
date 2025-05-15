import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AdFreeCardGet_req, AdFreeCard_revc } from "../../../../network/protocols/BaseProto";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ActivityModel } from "../ActivityModel";
import { IPriceItem, t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { PackTeQuanKaCardProxy } from "../model/ActivityProxy2";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

export class TeQuanKaView extends ViewBase{
    private _ui: ui.views.huodong.ui_tequanka_viewUI;
    protected mMask = true;
    protected autoFree:boolean = true;
    private purchaseId: number;
    private _curData: AdFreeCard_revc;
    private lingquCtl:ButtonCtl;
    private goonPay:ButtonCtl;

    protected onFirstInit() {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.huodong.ui_tequanka_viewUI;
            const cfg = PackTeQuanKaCardProxy.Ins.getCfgByType(1);
            this.purchaseId = cfg.f_PurchaseID;
            const priceItem: IPriceItem = t_Purchase_PriceProxy.Ins.getPriceItemById(this.purchaseId);
            const price = parseFloat((priceItem.price / 100).toFixed(2));
            this._ui.tf1.text = `${price}元解锁`;
            this.lingquCtl = new ButtonCtl(this._ui.lingqu,new Laya.Handler(this,this.onLingquHandler));
            this.goonPay = ButtonCtl.Create(this._ui.img3,new Laya.Handler(this,this.onGoPushMoney));
            this.btnList.push(ButtonCtl.Create(this._ui.btn1, new Laya.Handler(this, this.onEnterHandler)),this.lingquCtl,this.goonPay);
            this._ui.zhangguIcon.skin = IconUtils.getIconByCfgId(ECellType.BOX);
        }
    }

    /**续费 */
    private onGoPushMoney(){
        this.onEnterHandler();
    }

    /**领取 */
    private onLingquHandler(){
        let req:AdFreeCardGet_req = new AdFreeCardGet_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private clearUI(){
        this.lingquCtl.visible = false;
        this._ui.subcon.visible = false;
        this._ui.yilingqu.visible = false;//今日已领取
        this._ui.weichongzhi.visible = false;
    }
    private refreshView() {
        this._curData = MainModel.Ins.teQuanKaCard;
        this.clearUI();
        if (this._curData) {
            if (this._curData.val == 0) {
                this._ui.weichongzhi.visible = true;//未充值
            }
            else if (this._curData.val == 1) {
                this.lingquCtl.visible = true;
                this._ui.subcon.visible = true;
            }
            else if (this._curData.val == 2) {
                this._ui.yilingqu.visible = true;
                this._ui.subcon.visible = true;
            }
            this._ui.dattf.text = this._curData.subday + "";
        }
        this.layoutUI();
    }

    private layoutUI(){
        this._ui.dattf.x = this._ui.img1.x + this._ui.img1.width;
        this._ui.img2.x = this._ui.dattf.x + this._ui.dattf.textField.width;
        this._ui.img3.x = this._ui.img2.x + this._ui.img2.width;
        this.goonPay.setpos(this._ui.img3.x, this._ui.img3.y);
    }

    private onEnterHandler() {
        ActivityModel.Ins.recharge(this.purchaseId);
    }

    protected onAddLoadRes() {
        this.addAtlas('huodong.atlas');
    }

    protected onExit() {
        MainModel.Ins.off(MainEvent.Updata_TeQuanKa,this,this.refreshView);
    }

    protected onInit() {
        MainModel.Ins.on(MainEvent.Updata_TeQuanKa,this,this.refreshView);
        this.refreshView();
    }
}