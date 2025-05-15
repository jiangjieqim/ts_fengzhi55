import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { NoTabClassCommonCtl } from "../../../../../frame/view/TabCommonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ELingQuStatus } from "../../huodong/model/EActivityType";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "../../huodong/views/RateBtn01Ctl";
import { TriangleHideCtl } from "../../main/ctl/TriangleHideCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { IFundDataCfg, t_Fund, t_FundOne, t_FundThree, t_FundTwo } from "../proxys/TreasureProxy";
import { TreasureModel } from "../TreasureModel";
import { TreasureVo } from "../vos/TreasureVo";
import { Jubaopeng_itemView } from "./JuBaoPengItem";
/**聚宝盆 */
export class JuBaoPengView extends ViewBase {
    private tctl:TriangleHideCtl;
    private model:TreasureModel;
    private _ui: ui.views.huodong.ui_jubaopengUI;
    private tabCtl: NoTabClassCommonCtl = new NoTabClassCommonCtl();
    private buyBtnCtl:ButtonCtl;
    private timeCtl:TimeCtl;
    private readonly itemKey:string = "Jubaopeng_itemView"; 
    protected mMask: boolean = true;
    private cfgArr;// = 
    private rateCtl:RateBtn01Ctl;
    protected onAddLoadRes(): void {
        this.addAtlas("jubaopeng.atlas");
    }

    protected onExit(): void { 
        this.model.off(TreasureModel.EventUpdate,this,this.updateEvt);
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = TreasureModel.ins;
            this.UI = this._ui = new ui.views.huodong.ui_jubaopengUI();
            this.bindClose(this._ui.close1);
            this.cfgArr = [t_FundOne.Ins.List,t_FundTwo.Ins.List,t_FundThree.Ins.List];
            let gap:number = this._ui.tab1.x-this._ui.tab0.x-this._ui.tab1.width;
            this.tabCtl.init2(this._ui.tabcon, this, this.onSelHandler, this.tabItemRender,gap);
            this._ui.itemshow.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.itemshow.renderHandler = new Laya.Handler(this,this.onItemRender);
            let tctl =  new TriangleHideCtl()
            tctl.bind(this._ui.itemshow,this._ui.showicon,true);
            this.tctl = tctl;
            this.timeCtl = new TimeCtl(this._ui.timeTf);
            this.buyBtnCtl = ButtonCtl.CreateBtn(this._ui.buyBtn,this,this.onBuyHandler);
            this.rateCtl = new RateBtn01Ctl(this._ui.ratebtn,this,this.onBuyHandler,ESkinRateBtn.Yellow);
        }
    }

    private onBuyHandler(){
        if(!this.model.isOpen){
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
            return;
        }
        let cfg:Configs.t_Fund_dat = t_Fund.Ins.List[this.tabCtl.selectIndex];
        ActivityModel.Ins.recharge(cfg.f_Stalls);
    }

    private onItemRender(item:ui.views.main.ui_slot_itemUI,index:number){
        let itemVo:ItemVo = ItemViewFactory.convertItem(item.dataSource);
        ItemViewFactory.refreshSlot(item,itemVo);
    }

    private onSelHandler(index:number) {
        // LogSys.LogColor("===>"+index);
        let cfg:Configs.t_Fund_dat = this.model.dataList[index].cfg;
        this._ui.itemshow.array = cfg.f_preview.split("|");
        this.tctl.onChangeEvt();
        this._ui.showImg2.skin = `remote/jubaopeng/${cfg.f_RewardUp_res}.png`;
        let priceCfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(cfg.f_Stalls);
        this._ui.monetTf.text = `${StringUtil.moneyCv(priceCfg.f_price)}元`;
        let cfgArr = this.cfgArr;
        let l = cfgArr[index];
        let ox = 0;
        while(this._ui.panel1.numChildren){
            let cell = this._ui.panel1.getChildAt(0);
            Laya.Pool.recover(this.itemKey,cell);
            cell.removeSelf();
        }
        let offsetX:number = 0;
        for(let i = 0;i < l.length;i++){
            let cfg1:IFundDataCfg = l[i];
            let item = Laya.Pool.getItemByClass(this.itemKey,Jubaopeng_itemView);
            item.setData(cfg,cfg1);
            item.x = ox;
            ox =  ox + item.width;
            this._ui.panel1.addChild(item);
            if(item._status == ELingQuStatus.CanLLingQu){
                offsetX = item.x;
            }
        }
        this._ui.panel1.scrollTo(offsetX,0);

        //==================================================================
        let btn = this.buyBtnCtl;
        if(priceCfg.f_isVoucher == EShopPayType.Voucher){
            btn = this.rateCtl.btnCtl;
            this.rateCtl.cfg = priceCfg;
        }
        RateBtnUtils.Refresh(btn,this.buyBtnCtl,this.rateCtl.btnCtl);
        //==================================================================

        if(this.model.isBuyed(cfg.f_id)){
            btn.skin.visible = false;
        }else{
            btn.skin.visible = true;
        }
    }

    private tabItemRender(itemView: ui.views.huodong.ui_jubaopeng_tabUI, index: number, sel: boolean, _data:TreasureVo) {
        if (sel) {
            itemView.tf1.color = '#BE7641';
            itemView.img0.visible = false;
            itemView.img1.visible = true;
        } else {
            itemView.tf1.color = '#FFEFC5';
            itemView.img0.visible = true;
            itemView.img1.visible = false;
        }
        itemView.tf1.text = _data.cfg.f_PackName;
        if(this.model.isFundCanLingqu(_data.cfg.f_id)){
            itemView.redImg.visible = true;
        }else{
            itemView.redImg.visible = false;
        }
    }

    private updateEvt(){
        this.onSelHandler(this.tabCtl.selectIndex);
        this.tabCtl.udpateView();
        this.setTime();
    }
    protected onInit(): void {
        if(MainModel.Ins.needRed(RedEnum.RED_JuBaoPeng)){
            RedUpdateModel.Ins.save(RedEnum.RED_JuBaoPeng,TimeUtil.serverTime);
        }
        this.model.updateRed();
        this.model.on(TreasureModel.EventUpdate,this,this.updateEvt);
        this.tabCtl.refresh(this.model.dataList,0);
        this.setTime();
    }

    private setTime(){
        this.timeCtl.start(this.model.endTime - TimeUtil.serverTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.onEnd));
    }

    private onUpdateTime(ticket:number){
        let _s:string = TimeUtil.subTime(ticket);
        this._ui.timeTf.text = E.getLang("huodong01",_s);
    }

    private onEnd(){
        this._ui.timeTf.text = "";
    }
}