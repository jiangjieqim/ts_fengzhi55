import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ERewardShowVoType, RewardFactory, RewardItemGetViewCtl, RewardShowVo } from "../../main/views/RewardCtl";
import { EquipItemVo } from "../../main/vos/EquipItemVo";
import { EShopPayType } from "../../shop/proxy/shopProxy";
// import { RewardItemGetView } from "../../main/views/RewardGetView";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { ActivityVo } from "../model/ActivityVo";
import { INewPlayerSkin } from "./newplayer/INewPlayerSkin";
import { ESkinRateBtn, RateBtn01Ctl } from "./RateBtn01Ctl";
import { SkinPackage } from "./SkinPackage";
class ItemShow extends ui.views.main.ui_slot_item_newplayerUI {
    private eff: SimpleEffect;
    private effectCon: Laya.Sprite = new Laya.Sprite();
    set effect(v: boolean) {
        if (v) {
            if (!this.eff) {
                let slot: Laya.Sprite = this.effectCon;
                this.effectCon.x = this.width / 2;
                this.effectCon.y = this.height / 2;
                let eff: SimpleEffect = new SimpleEffect(slot, "o/spine/eflibao/eflibao", 0, 0, 1, true);
                eff.play(0, true);
                this.eff = eff;
                this.addChild(this.effectCon);
            }
        }
        this.effectCon.visible = v;
    }
}


/**新人飞跃礼包 
 * 首充礼包7
 * 合并版的首充礼包48
*/
export class Xingrenlibao_view extends ViewBase {
    private get newPay(){
        return MainModel.Ins.newPay;
    }
    protected _ui: INewPlayerSkin;

    protected mMainSnapshot = true;
    protected autoFree = true;
    private _skinPackage: SkinPackage;
    private _activityVo: ActivityVo;
    protected mMask: boolean = true;
    private ppCfg: Configs.t_Purchase_Price_dat;
    // private _rewardCtl:RewardCtl;
    // private isSellFinish:boolean;
    private _isBuyed: boolean;
    private btnCtl: ButtonCtl;
    private hotBtn: RateBtn01Ctl;
    protected onAddLoadRes(): void {
        this.addAtlas('huodong.atlas');
    }
    // private effectList:SimpleEffect[] = [];
    protected onExit(): void {
        ActivityModel.Ins.off(ActivityEvent.UpdateData, this, this.updateViewEvt);
        // MainModel.Ins.off(MainEvent.Reward_revcUpdate,this,this.onReward_revcUpdate);
        this.hotBtn.dispose();
        this.btnCtl.dispose();
        this._skinPackage.dispose();
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new this.newPay.clsSkin();
            this.bindClose(this._ui.close1);
            this._skinPackage = new SkinPackage();            
            this.hotBtn = new RateBtn01Ctl(this._ui.btnhot, this, this.onRechargeEvt, ESkinRateBtn.Red);
            this.btnCtl = ButtonCtl.CreateBtn(this._ui.btn1, this, this.onRechargeEvt);

            // this._ui.list1.y = 640;
            this._ui.list1.itemRender = ItemShow;//RewardItemGetView;
            this._ui.list1.renderHandler = new Laya.Handler(this, this.onItemHandler);
            let list: Laya.List = this._ui['list'];
            if (list) {
                this._skinPackage.init(list);
            }
        }
    }

    private onItemHandler(item: ItemShow, index: number) {
        // item.refreshView(false);
        let vo: RewardShowVo = item.dataSource;
        RewardItemGetViewCtl.refresh(item as any, vo, false);

        let st = "";
        item.effect = false;
        if (vo.type == ERewardShowVoType.Euqip) {
            let data: EquipItemVo = new EquipItemVo;
            data.equipVo = vo.data;
            st = data.getName();
            // if( this.effectList[index]){
            //     // this.effectList[index].dispose();

            // }else{
            // let slot:Laya.Sprite = item as Laya.Sprite;
            // let eff:SimpleEffect = new SimpleEffect(slot,"o/spine/eflibao/eflibao",slot.width/2,slot.height/2,1,true);
            // // this.effectList[index]=eff;
            // eff.play(0,true);
            // }
            item.effect = true;

        } else if (vo.type == ERewardShowVoType.Item) {
            st = main.itemName(ItemProxy.Ins.getCfg(vo.data.id).f_name) + "x" + vo.data.count;
        }
        item.lab_name.visible = true;
        item.lab_name.text = st;
        if (this._isBuyed) {
            item.maskbg.visible = true;
        } else {
            item.maskbg.visible = false;
        }
    }
    /**已经购买 */
    private get isBuyed() {
        if (this._activityVo && !this._activityVo.getNewPlayerCfgId()) {
            return true;
        }
        return false;
    }
    private onRechargeEvt() {
        if (this._isBuyed) {
            E.ViewMgr.ShowMidError(E.getLang("isbuyed"));
            return;
        }
        ActivityModel.Ins.recharge(this.ppCfg.f_id);
    }

    protected onInit(): void {
        ActivityModel.Ins.on(ActivityEvent.UpdateData, this, this.updateViewEvt);
        // MainModel.Ins.once(MainEvent.Reward_revcUpdate,this,this.onReward_revcUpdate);
        this.updateViewEvt();
    }

    // private onReward_revcUpdate(){
    // this.Close();
    // }

    protected updateViewEvt() {
        this._activityVo = ActivityModel.Ins.getVo(this.newPay.activityType);

        let _cfgId: number = 0;
        if (this._activityVo) {
            _cfgId = this._activityVo.getNewPlayerCfgId();
        }
        if (_cfgId == 0) {
            _cfgId = this.newPay.maxId;//t_Pack_FirstPay_Equip.Ins.max_f_id;
        }

        this._isBuyed = this.isBuyed;

        if(!this._activityVo || this.newPay.isNewPlayerAllGet(this._activityVo)){
            this.Close();
            return;
        }
        // if(_cfgId == 0){
        // this.Close();
        // throw Error("无礼包可以领取");
        // return;
        // }

        // let cfg: Configs.t_Pack_NewPlayer_dat = t_Pack_NewPlayerProxy.Ins.GetDataById(_cfgId);
        //let cfg: Configs.t_Pack_FirstPay_Equip_dat = t_Pack_FirstPay_Equip.Ins.GetDataById(_cfgId);
        let cfg = this.newPay.getCfg(_cfgId);
        
        // this.cfg = cfg;
        let ppCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(cfg.f_PurchaseID);
        this.ppCfg = ppCfg;
        this._ui.img.skin = "o/pack_newplayer/" + cfg.f_AssetID;
        this._ui.lab_money.text = cfg.f_fakeprice + "元";
        // ItemViewFactory.renderItemSlots(this._ui.rewardCon, cfg.f_Item, 10, 1);

        let arr = RewardFactory.createBy_newPlayerCfg(cfg);
        // this._rewardCtl.setData(l,this._ui);
        this._ui.list1.array = arr;

        ////////////////////////////////////////////////
        this._ui.btn1.visible = false;
        this._ui.old_money_con.visible = false;
        this._ui.btnhot.visible = false;
        let _curBtn: ButtonCtl;
        if(ppCfg){
            if (ppCfg.f_isVoucher == EShopPayType.Voucher) {
                this.hotBtn.cfg = ppCfg;
                this.hotBtn.visible = true;
                _curBtn = this.hotBtn.btnCtl;
            } else if (ppCfg.f_isVoucher == EShopPayType.Normal) {
                this._ui.old_money_con.visible = true;
                this._ui.tf1.text = StringUtil.moneyCv(ppCfg.f_price) + E.getLang("CNYhit");
                _curBtn = this.btnCtl;
                this.btnCtl.visible = true;
            }
            if (this._isBuyed) {
                _curBtn.grayMouseDisable = true;
            } else {
                _curBtn.grayMouseDisable = false;
            }
        }else{
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,`${_cfgId} without f_PurchaseID`);
        }

       
        /*
                for(let i:number=0;i<3;i++){
                    let st = "";
                    if(arr[i].type == ERewardShowVoType.Euqip){
                        let data:EquipItemVo = new EquipItemVo;
                        data.equipVo = arr[i].data;
                        st = data.getName();
                    }else if(arr[i].type == ERewardShowVoType.Item){
                        st = main.itemName(ItemProxy.Ins.getCfg(arr[i].data.id).f_name) + "x" + arr[i].data.count;
                    }
                    this._ui["lab_name" + (i+1)].text = st;
                }
        */
        this._skinPackage.refresh();
    }
}