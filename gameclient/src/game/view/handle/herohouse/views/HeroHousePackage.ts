import { ETimeShowStyle, TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { Reward_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { EFightType } from "../../main/vos/ECellType";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { t_Pack_Gym } from "../model/GymProxy";
import { EGymGetStatus } from "../model/HeroHousePackVo";
/**武馆礼包 */
export class HeroHousePackage extends ViewBase {
    protected mMask:boolean = true;
    private _ui: ui.views.hero_house.ui_hero_house_chongzhi_viewUI;
    private cfg:Configs.t_Pack_Gym_dat;
    private chongzhiCtl:ButtonCtl;
    private lingquCtl:ButtonCtl;
    private timeCtl:TimeCtlV2;//
    // private goonPay:ButtonCtl;
    private rateCtl:RateBtn01Ctl;
    private get packVo(){
        // return HeroHouseModel.Ins.packVo;
        return MainModel.Ins.heroPackVo;
    }

    protected onAddLoadRes(): void { 
        this.addAtlas("huodong.atlas");
    }
    protected onExit(): void { 
        MainModel.Ins.off(MainEvent.GymCardUpdate,this,this.onRefreshHandler);
        this.timeCtl.stop();
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_chongzhi_viewUI();

            this.chongzhiCtl = ButtonCtl.CreateBtn(this._ui.btn1, this, this.onChongZhi);
            this.rateCtl = new RateBtn01Ctl(this._ui.ratebtn,this,this.onChongZhi,ESkinRateBtn.Yellow);

            this.lingquCtl = ButtonCtl.CreateBtn(this._ui.lingqu,this,this.onLingquHandler);
            this.timeCtl = new TimeCtlV2(this._ui.sytimeTf,"{0}");
            this.timeCtl.style = ETimeShowStyle.HMS;
            // this.goonPay = ButtonCtl.Create(this._ui.img3,new Laya.Handler(this,this.onGoPushMoney));
        }
    }

    // /**续费 */
    // private onGoPushMoney(){
    //     this.onChongZhi();
    // }

    /**
     * 领取
     */
    private onLingquHandler(){
        let req:Reward_req = new Reward_req();
        req.type = EFightType.HeroPackage;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onChongZhi(){
        ActivityModel.Ins.recharge(this.cfg.f_PurchaseID);
    }
    private onTimeEnd(){
        this._ui.sytimeTf.text = "";
    }
    private onRefreshHandler(){
        this.cfg = t_Pack_Gym.Ins.GetDataById(1);
        let itemVo = ItemViewFactory.parseItem(this.cfg.f_Item);

        this._ui.yuanbaoImg.skin = IconUtils.getIcon(itemVo.id);
        this._ui.moneyTf.text = itemVo.count.toString();
        
        // this.chongzhiCtl.grayMouseDisable = false;
        
        this.timeCtl.stop();
        this._ui.subcon.visible = false;
        this.lingquCtl.visible = false;
        this._ui.sp1.visible = false;
        this._ui.todayIsGet.visible = false;
        this._ui.sysy.visible = false;

        DotManager.removeDot(this.lingquCtl.skin);

        ////////////////////////////////////////
        // ItemViewFactory.renderItemSlots(this._ui.itemCon,this.cfg.f_Daily,0,1.0,null,SoltItemView2,"SoltItemView2");
        if(this.packVo.type == EGymGetStatus.NotChongZhi){
            this._ui.sp1.visible = true;
            let purchCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this.cfg.f_PurchaseID);
            this._ui.tf1.text = `${StringUtil.moneyCv(purchCfg.f_price)}元解锁`;

            //=============================================================================
            let btn:ButtonCtl = this.chongzhiCtl;
            if(purchCfg.f_isVoucher == EShopPayType.Voucher){
                btn = this.rateCtl.btnCtl;
                this.rateCtl.cfg = purchCfg;
            }
            RateBtnUtils.Refresh(btn,this.chongzhiCtl,this.rateCtl.btnCtl);
            //=============================================================================

        } else {
            if(this.packVo.isTryout){
                //试用阶段
                this._ui.sysy.visible = true;

                let sub = this.packVo.tryoutSubTime;
                if(sub > 0){ 
                    this.timeCtl.start(sub);
                    this.timeCtl.on(Laya.Event.COMPLETE,this,this.onTimeEnd);
                }
            }else{
                this._ui.dattf.text = this.packVo.day + "";
                this._ui.subcon.visible = true;
            }
            if(this.packVo.type == EGymGetStatus.CanGet){
                this.lingquCtl.visible = true;
                DotManager.addDot(this.lingquCtl.skin);
                
            }else if(this.packVo.type == EGymGetStatus.CantLingQu){
                this._ui.todayIsGet.visible = true;
            }
        }
       
        this.layoutUI();
    }
    private layoutUI() {
        this._ui.dattf.x = this._ui.img1.x + this._ui.img1.width;
        this._ui.img2.x = this._ui.dattf.x + this._ui.dattf.textField.width;
        // this._ui.img3.x = this._ui.img2.x + this._ui.img2.width;
        // this.goonPay.setpos(this._ui.img3.x, this._ui.img3.y);
    }
    protected onInit(): void {
        MainModel.Ins.on(MainEvent.GymCardUpdate,this,this.onRefreshHandler);
        this.onRefreshHandler();
    }
}