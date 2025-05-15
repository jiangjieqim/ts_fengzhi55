import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MonthCardGet_req, MonthCard_revc } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ECellType } from "../../main/vos/ECellType";
import { EClientType } from "../../sdk/ClientType";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ActivityModel } from "../ActivityModel";
import { IPriceItem, t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { PackMonthCardProxy } from "../model/ActivityProxy2";
import { EActivityType } from "../model/EActivityType";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "./RateBtn01Ctl";

export enum ECardLingqu {
    /**不可领取 */
    Nothing = 0,
    /**可领取 */
    CanGet = 1,
    /**已领取 */
    AlreadyGet = 2,
}

/**月卡 */
export class YueKaView extends ViewBase {
    protected activityType: EActivityType = EActivityType.t_Pack_MonthAndYear_Card;
    protected autoFree:boolean = true;
    private _ui: ui.views.huodong.ui_yueka_viewUI;
    protected mMask = true;
    private purchaseId: number;
    private _purchaseCfg:Configs.t_Purchase_Price_dat;
    private _curData: MonthCard_revc;
    private lingquCtl:ButtonCtl;
    private goonPay:ButtonCtl;
    private rateCtl:RateBtn01Ctl;
    private btnCtl:ButtonCtl;
    protected onFirstInit() {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.huodong.ui_yueka_viewUI;
            const rewardConf = PackMonthCardProxy.Ins.getRewardConf(1);
            // const itemVo = rewardConf.itemVo;
            // // this._ui.yuanbaoImg.skin = itemVo.getIcon();
            // // this._ui.yuanbaoImg.
            const purchaseId = rewardConf.purchaseId;
            this.purchaseId = purchaseId;
            const priceItem: IPriceItem = t_Purchase_PriceProxy.Ins.getPriceItemById(purchaseId);
            const price = parseFloat((priceItem.price / 100).toFixed(2));
            this._ui.tf1.text = `${price}元解锁`;
            this._purchaseCfg = t_Purchase_PriceProxy.Ins.GetDataById(purchaseId);
            
            this.lingquCtl = new ButtonCtl(this._ui.lingqu,new Laya.Handler(this,this.onLingquHandler));
            this.btnCtl = ButtonCtl.Create(this._ui.btn1, new Laya.Handler(this, this.onEnterHandler));
            this.rateCtl = new RateBtn01Ctl(this._ui.ratebtn,this,this.onEnterHandler,ESkinRateBtn.Yellow);

            this.goonPay = ButtonCtl.Create(this._ui.img3,new Laya.Handler(this,this.onGoPushMoney));
            this._ui.zhangguIcon.skin = IconUtils.getIconByCfgId(ECellType.BOX);
            this.btnList.push(this.lingquCtl,this.btnCtl,this.goonPay);

            if(t_Platform.Ins.isHideAdImg){
                this._ui.mcsy_img.visible = false;
            }

            if(this._ui.zidongzhuwei && initConfig.clienttype == EClientType.Discount){
                this._ui.zidongzhuwei.visible = false;
            }
        }
    }

    /**续费 */
    private onGoPushMoney(){
        this.onEnterHandler();
    }

    /**领取 */
    private onLingquHandler(){
        let req:MonthCardGet_req = new MonthCardGet_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private clearUI(){
        this.lingquCtl.visible = false;
        this._ui.subcon.visible = false;
        this._ui.yilingqu.visible = false;//今日已领取
        this._ui.weichongzhi.visible = false;
    }
    private refreshView() {
        this._curData = MainModel.Ins.monthCard;
        this.clearUI();
        if (this._curData) {
            if (this._curData.val == ECardLingqu.Nothing) {
                this._ui.weichongzhi.visible = true;//未充值
                ////////////////////////////////////////////////////////
                let btn:ButtonCtl = this.btnCtl;
                if(this._purchaseCfg.f_isVoucher == EShopPayType.Voucher){
                    btn = this.rateCtl.btnCtl;
                    this.rateCtl.cfg = this._purchaseCfg;
                }
                RateBtnUtils.Refresh(btn,this.btnCtl,this.rateCtl.btnCtl);
                ////////////////////////////////////////////////////////
            }
            else if (this._curData.val == ECardLingqu.CanGet) {
                this.lingquCtl.visible = true;
                this._ui.subcon.visible = true;
            }
            else if (this._curData.val == ECardLingqu.AlreadyGet) {
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
        MainModel.Ins.off(MainEvent.MonthUpdate,this,this.refreshView);
        this.rateCtl.dispose();
    }

    protected onInit() {
        MainModel.Ins.on(MainEvent.MonthUpdate,this,this.refreshView);
        this.refreshView();
    }
}