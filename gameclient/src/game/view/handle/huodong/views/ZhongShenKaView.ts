import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { AllLifeCardGet_req, AllLifeCard_revc } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ECellType } from "../../main/vos/ECellType";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ActivityModel } from "../ActivityModel";
import { IPriceItem, t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { PackMonthCardProxy } from "../model/ActivityProxy2";
import { EActivityType } from "../model/EActivityType";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "./RateBtn01Ctl";
import { ECardLingqu } from "./YueKaView";
/**终生卡 */
export class ZhongShenKaView extends ViewBase {
    protected activityType:EActivityType = EActivityType.t_Pack_MonthAndYear_Card;
    protected autoFree:boolean = true;
    private _ui: ui.views.huodong.ui_zhongshenka_viewUI;
    protected mMask = true;
    private purchaseId: number;
    private _ctlFont:FontClipCtl;
    private _curData:AllLifeCard_revc;
    private lingquCtl:ButtonCtl;
    private btnCtl:ButtonCtl;
    private rateCtl:RateBtn01Ctl;
    private _purchaseCfg:Configs.t_Purchase_Price_dat;

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_zhongshenka_viewUI; 
            const rewardConf = PackMonthCardProxy.Ins.getRewardConf(2);
            // const itemVo = rewardConf.itemVo;
            // // this._ui.yuanbaoImg.skin = itemVo.getIcon();
            // // this._ui.yuanbaoImg.
            const purchaseId = rewardConf.purchaseId;
            this.purchaseId = purchaseId;
            const priceItem: IPriceItem = t_Purchase_PriceProxy.Ins.getPriceItemById(purchaseId);
            const price = parseFloat((priceItem.price / 100).toFixed(2));
            this._purchaseCfg = t_Purchase_PriceProxy.Ins.GetDataById(purchaseId);
            this._ui.tf1.text = `${price}元解锁`;
            this._ctlFont = new FontClipCtl(IconUtils.numAtlasPrefix);
            this._ctlFont.mScale = 0.6;
            this._ctlFont.setValue(this._ui.numCon,rewardConf.itemVo.count+"");
            this.btnCtl = ButtonCtl.Create(this._ui.btn1, new Laya.Handler(this, this.onEnterHandler));
            this.lingquCtl = ButtonCtl.Create(this._ui.lingqu,new Laya.Handler(this,this.onLingqu));
            this.rateCtl = new RateBtn01Ctl(this._ui.ratebtn,this,this.onEnterHandler,ESkinRateBtn.Yellow)
            this.btnList.push(this.lingquCtl,this.btnCtl);

            this._ui.zhangguIcon.skin = IconUtils.getIconByCfgId(ECellType.BOX);
            if(t_Platform.Ins.isHideAdImg){
                this._ui.mcsy_img.visible = false;
            }
        }
    }

    /**领取 */
    private onLingqu(){
        let req = new AllLifeCardGet_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private clearUI(){
        this._ui.chongzhicon.visible = false;
        this.lingquCtl.visible = false;
        this._ui.yilingqu.visible = false;
    }

    public refreshView() {
        this.clearUI();
        let allLife: AllLifeCard_revc = MainModel.Ins.allLife;
        this._curData = allLife;
        if (this._curData) {
            if (this._curData.val == ECardLingqu.Nothing) {
                this._ui.chongzhicon.visible = true;
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
            }
            else if (this._curData.val == ECardLingqu.AlreadyGet) {
                this._ui.yilingqu.visible = true;
            }
        }
    }

    onEnterHandler() {
        ActivityModel.Ins.recharge(this.purchaseId);
    }

    protected onAddLoadRes() {
        this.addAtlas('huodong.atlas');
    }

    protected onExit() {
        MainModel.Ins.off(MainEvent.AllLifeUpdate,this,this.refreshView);
        this.rateCtl.dispose();
    }

    protected onInit() {
        MainModel.Ins.on(MainEvent.AllLifeUpdate,this,this.refreshView);
        this.refreshView();
    }
}