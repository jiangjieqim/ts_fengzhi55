import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllLifeCard_revc, AllLifeCardGet_req, MonthCard_revc, MonthCardGet_req, stVipPrivilege, VipPrivilegeReward_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { DotManager } from "../../common/DotManager";
import { LiBaoModel } from "../../libao/model/LiBaoModel";
import { IEveryDaySel } from "../../main/model/DiscountPackagePop";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ECellType } from "../../main/vos/ECellType";
import { EClientType } from "../../sdk/ClientType";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { IPriceItem, System_RefreshTimeProxy, t_Pack_Daily_Shop, t_Pack_DailyProxy, t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { PackMonthCardProxy } from "../model/ActivityProxy2";
import { ActivityVo } from "../model/ActivityVo";
import { EActivityType } from "../model/EActivityType";
import { VipModel } from "../model/VipModel";
import { t_VIPProxy } from "../model/VipProxy";
import { AutoRateBtn } from "./AutoRateBtn";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "./RateBtn01Ctl";
import { ECardLingqu } from "./YueKaView";
import { ZheKouItem } from "./ZheKouItem";
import { ZheKouItem2 } from "./ZheKouItem2";

class MeiRiItem extends ui.views.huodong.ui_meirilibao_itemUI {
   private testTF: Laya.Label;
   private cfg: Configs.t_Pack_Daily_dat;
   private freeCtl: ButtonCtl;
   private _vo: ActivityVo;
   private rateCtl: RateBtn01Ctl;
   constructor() {
      super();
      this.freeCtl = ButtonCtl.CreateBtn(this.freeBtn, this, this.onfreeBtnHandler);
      this.rateCtl = new RateBtn01Ctl(this.rate_btn, this, this.onfreeBtnHandler, ESkinRateBtn.Yellow);
   }
   private onfreeBtnHandler() {
      if (this.cfg.f_PurchaseID == 0) {
         if (this._vo) {
            ActivityModel.Ins.lingQu(this._vo.uid, this.cfg.f_id);
         }
      } else {
         ActivityModel.Ins.recharge(this.cfg.f_PurchaseID);
      }
   }

   public refreshView(_vo: ActivityVo) {
      this._vo = _vo;
      this.cfg = this.dataSource;
      this.tf1.text = this.cfg.f_name;
      ItemViewFactory.renderItemSlots(this.rewardCon, this.cfg.f_Item, 10, 0.95, "left");
      let btn: ButtonCtl = this.freeCtl;
      this.rateCtl.visible = false;
      this.freeCtl.visible = false;
      this.bg3.skin = `remote/meirilibao/lb_t${this.cfg.f_PackType}.png`;

      let _freeIsShow: boolean = true;
      if (this.cfg.f_PurchaseID == 0) {
         this.tf3.text = E.getLang("Free");
      } else {

         let ppCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this.cfg.f_PurchaseID);

         if (ppCfg.f_isVoucher == EShopPayType.Voucher) {
            btn = this.rateCtl.btnCtl;
            this.rateCtl.cfg = ppCfg;
            _freeIsShow = false;
         }
         this.tf3.text = StringUtil.moneyCv(ppCfg.f_price) + "元";
      }
      this.freeCtl.visible = _freeIsShow;
      this.rateCtl.btnCtl.visible = !this.freeCtl.visible;

      let _serverTime: number = 0;
      if (_vo) {
         _serverTime = _vo.getParam1(this.cfg.f_id);
      }
      this.countTf.text = "限购:" + (this.cfg.f_BuyTimes - _serverTime) + "/" + this.cfg.f_BuyTimes;
      if (_serverTime >= this.cfg.f_BuyTimes) {
         btn.mouseEnable = false;
         btn.gray = true;
      } else {
         btn.mouseEnable = true;
         btn.gray = false;
      }
      this.redImg.visible = false;

      if (ActivityModel.Ins.hasDailyFreeRed(this.cfg, _vo)) {
         DotManager.addDot(btn.skin);
      } else {
         DotManager.removeDot(btn.skin);
      }

      // if(E.Debug){
      //    if(!this.testTF){
      //       this.testTF = new Laya.Label();
      //       this.testTF.fontSize = 24;
      //       this.testTF.color = "#ff0000";
      //       this.addChild(this.testTF);
      //    }
      //    this.testTF.text = "fid:" + this.cfg.f_id;
      // }
      DebugUtil.drawTF(this, this.cfg.f_id + "");
   }
}

/**每日礼包(日常礼包) */
export class MeiRiLiBaoView extends ViewBase {
   // protected mMainSnapshot = true;
   private _vo: ActivityVo;
   private _ui: ui.views.huodong.ui_meirilibao_viewUI;
   protected _timeCtl: TimeCtlV2;
   protected _timeCtl1: TimeCtlV2;
   protected autoFree = true;
   private tabList: any;
   private tabsCtl1: TabControl;

   protected mMask: boolean = true;
   /**添加加载资源 */
   protected onAddLoadRes(): void {
      this.addAtlas("huodong.atlas");
      this.addAtlas("meirilibao.atlas");
   }
   /**离开处理 */
   protected onExit(): void {
      this._timeCtl.stop();
      this._timeCtl1.stop();
      ActivityModel.Ins.off(ActivityEvent.UpdateData, this, this.updateView);
      MainModel.Ins.off(MainEvent.DailyShopWeekCard_Card, this, this.updateView);
      if(this._autoBtn){
         this._autoBtn.dispose();
      }
      MainModel.Ins.off(MainEvent.MonthUpdate,this,this.onRrefreshView);
      this.rateCtl.dispose();
      MainModel.Ins.off(MainEvent.AllLifeUpdate,this,this.onRrefreshView);
      this.rateCtl1.dispose();
      VipModel.Ins.off(VipModel.VIP_UPDATA,this,this.onUpdataVip);
      // if(!this.Data){
      // E.ViewMgr.Open(EViewType.Libao);
      // }
   }
   /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
   protected onFirstInit(): void {
      if (!this.UI) {
         this.UI = this._ui = new ui.views.huodong.ui_meirilibao_viewUI();
         this.bindClose(this._ui.close1);
         this._ui.list1.itemRender = MeiRiItem;
         this._ui.list1.renderHandler = new Laya.Handler(this, this.onItemRender);
         this._timeCtl = new TimeCtlV2(this._ui.timeTf, "{0}后刷新");
         this._timeCtl1 = new TimeCtlV2(this._ui.timeTf1, "{0}后刷新");

         this._ui.list_tab.itemRender = ui.views.huodong.ui_meiriTab1UI;
         this._ui.list_tab.renderHandler = new Laya.Handler(this, this.onItemTabRender);
         this._ui.list_tab.selectEnable = true;

         const tabsSkin1 = [this._ui.tab1, this._ui.tab2,this._ui.tab3];
         this.tabList = ["日礼包", "周礼包","月礼包"];
         this.tabsCtl1 = new TabControl();
         this.tabsCtl1.init(tabsSkin1, new Laya.Handler(this, this.onTabSelectHandler1), new Laya.Handler(this, this.itemTabHandler1));
         this._autoBtn=AutoRateBtn.Create();

         this.initYK();
         this.initZSK();
         this.initVip();
      }
   }
   private onItemRender(item: MeiRiItem) {
      item.refreshView(this._vo);
   }

   private onItemTabRender(item:ui.views.huodong.ui_meiriTab1UI,index:number){
      if(index == this._ui.list_tab.selectedIndex){
         this._ui["sp_" + item.dataSource].visible = true;
         item.img.skin = "remote/meirilibao/dbl_xz.png";
      }else{
         this._ui["sp_" + item.dataSource].visible = false;
         item.img.skin = "remote/meirilibao/dbl_wxz.png";
      }
      switch(parseInt(item.dataSource)){
         case 1:
            item.img1.skin = "remote/meirilibao/lb.png";
            item.txt.text = "礼包商城";
            let flag = false;
            for (let i: number = 0; i < t_Pack_DailyProxy.Ins.List.length; i++) {
               flag = ActivityModel.Ins.hasDailyFreeRed(t_Pack_DailyProxy.Ins.List[i], this._vo);
               if (flag) {
                  break;
               }
            }
            if (flag) {
               DotManager.addDot(item);
            } else {
               DotManager.removeDot(item);
            }
            break;
         case 2:
            item.img1.skin = "remote/meirilibao/zk.png";
            item.txt.text = "折扣商店";
            if (MainModel.Ins.isZKWCRedTip()) {
               DotManager.addDot(item);
            } else {
               DotManager.removeDot(item);
            }
            break;
         case 3:
            item.img1.skin = "remote/meirilibao/vip_icon.png";
            item.txt.text = "VIP特权";
            if (VipModel.Ins.isVipRed()) {
               DotManager.addDot(item);
            } else {
               DotManager.removeDot(item);
            }
            break;
         case 4:
            item.img1.skin = "remote/meirilibao/tq.png";
            item.txt.text = "特权卡";
            if (ActivityModel.Ins.hasRed(EActivityType.t_Pack_MonthAndYear_Card)) {
               DotManager.addDot(item);
            } else {
               DotManager.removeDot(item);
            }
            break;
      }
   }

   private itemTabHandler1(tabSkin, index: number, sel: boolean, data) {
      let skin: ui.views.huodong.ui_meiriTabUI = tabSkin;
      skin.timeTf.text = this.tabList[index];
      if(index == 0){
         skin.img.skin = "remote/meirilibao/lbr.png";
      }else if(index == 1){
         skin.img.skin = "remote/meirilibao/lbz.png";
      }else if(index == 2){
         skin.img.skin = "remote/meirilibao/lby.png";
      }
      
      if (sel) {
         skin.sel.visible = true;
      } else {
         skin.sel.visible = false;
      }
   }

   private onTabSelectHandler1(v: number) {
      if (v == -1) return;
      this.updateView();
   }
   private _autoBtn:AutoRateBtn;
   /**初始化*/
   protected onInit(): void {
      E.ViewMgr.Close(EViewType.Libao);
      MainModel.Ins.mainMask = true;
      ActivityModel.Ins.on(ActivityEvent.UpdateData, this, this.updateView);
      MainModel.Ins.on(MainEvent.DailyShopWeekCard_Card, this, this.updateView);
      MainModel.Ins.on(MainEvent.MonthUpdate,this,this.onRrefreshView);
      MainModel.Ins.on(MainEvent.AllLifeUpdate,this,this.onRrefreshView);
      VipModel.Ins.on(VipModel.VIP_UPDATA,this,this.onUpdataVip);

      let arr = [];
      if(ActivityModel.Ins.isOpenByPackid(EActivityType.EveryDayBorn)){
         arr.push(1);
      }else{
         this._ui.sp_1.visible = false;
      }
      if(ActivityModel.Ins.isOpenByPackid(EActivityType.ZKShopWeek)){
         arr.push(2);
      }else{
         this._ui.sp_2.visible = false;
      }
      if(ActivityModel.Ins.isOpenByPackid(EActivityType.VIP)){
         arr.push(3);
         this._ui.list_vip.array = t_VIPProxy.Ins.List;
         this._ui.list_vip.selectedIndex = 0;
      }else{
         this._ui.sp_3.visible = false;
      }
      if(ActivityModel.Ins.isOpenByPackid(EActivityType.t_Pack_MonthAndYear_Card)){
         arr.push(4);
      }else{
         this._ui.sp_4.visible = false;
      }
      if (arr.length >= this._ui.list_tab.repeatX) {
         this._ui.list_tab.width = 611;
      } else {
         this._ui.list_tab.width = (arr.length * 165) + (arr.length - 1) * this._ui.list_tab.spaceX;
      }
      this._ui.list_tab.array = arr;

      if(initConfig.clienttype == EClientType.Discount){
         this._ui.list1.height = 578;
         this._ui.tab1.visible = this._ui.tab2.visible = this._ui.tab3.visible = true;
         this.tabsCtl1.selectIndex = 0;
      }else{
         this._ui.list1.height = 676;
         this._ui.tab1.visible = this._ui.tab2.visible = this._ui.tab3.visible = false;
         this.updateView();
      }

      if(this.Data && this.Data != "nothing"){
         // let obj:IEveryDaySel = this.Data;
         this._ui.list1.scrollTo(0);
         let index = arr.indexOf(this.Data);
         if(index != -1){
            this._ui.list_tab.selectedIndex = index;
         }else{
            this._ui.list_tab.selectedIndex = 0;
         }
      }else{
         this._ui.list1.scrollTo(0);
         this._ui.list_tab.selectedIndex = 0;
         // let num = LiBaoModel.Ins.getPlayerTotal();
         // let num1 = System_RefreshTimeProxy.Ins.getNumberVal(57);
         // if (num >= num1) {
         //    this._ui.list_tab.selectedIndex = 1;
         // } else {
         //    this._ui.list_tab.selectedIndex = 0;
         // }
      }
      // let _vo = ActivityModel.Ins.getVo(EActivityType.EveryDayBorn);
      // if (_vo) {
         // this._autoBtn=AutoRateBtn.Create();
      // }
   }

   private onSort(a: Configs.t_Pack_Daily_dat, b: Configs.t_Pack_Daily_dat) {
      if (a.f_sort < b.f_sort) {
         return -1;
      }
      else if (a.f_sort > b.f_sort) {
         return 1;
      }
      return 1;
   }

   private _zkVo: ActivityVo;
   private updateView() {
      this._ui.list_tab.refresh();
      this.updataZKView();
      this.updataYkView();
      this.updataZSKView();
      
      this._vo = ActivityModel.Ins.getVo(EActivityType.EveryDayBorn);
      if(!this._vo){
         return;
      }
      this._autoBtn.refresh(this._ui.disbtn,this._vo.uid,this.tabsCtl1.selectIndex + 1);
      this.updateTime();
      if(initConfig.clienttype == EClientType.Discount){
         let arr = [];
         for (let i: number = 0; i < t_Pack_DailyProxy.Ins.List.length; i++) {
            if(t_Pack_DailyProxy.Ins.List[i].f_PackType == this.tabsCtl1.selectIndex + 1){
               arr.push(t_Pack_DailyProxy.Ins.List[i]);
            }
         }
         arr = arr.sort(this.onSort);
         this._ui.list1.array = arr;

         let num = 0;
         let num1 = 0;
         let num2 = 0;
         for (let i: number = 0; i < t_Pack_DailyProxy.Ins.List.length; i++) {
            let flag = ActivityModel.Ins.hasDailyFreeRed(t_Pack_DailyProxy.Ins.List[i], this._vo);
            if (flag) {
               if(t_Pack_DailyProxy.Ins.List[i].f_PackType == 1){
                  num ++;
               }else if(t_Pack_DailyProxy.Ins.List[i].f_PackType == 2){
                  num1 ++;
               }else if(t_Pack_DailyProxy.Ins.List[i].f_PackType == 3){
                  num2 ++;
               }
            }
         }
   
         if (num) {
            DotManager.addDot(this._ui.tab1);
         } else {
            DotManager.removeDot(this._ui.tab1);
         }
         if (num1) {
            DotManager.addDot(this._ui.tab2);
         } else {
            DotManager.removeDot(this._ui.tab2);
         }
         if (num2) {
            DotManager.addDot(this._ui.tab3);
         } else {
            DotManager.removeDot(this._ui.tab3);
         }
      }else {
         let l = t_Pack_DailyProxy.Ins.List;
         l = l.sort(this.onSort);
         this._ui.list1.array = t_Pack_DailyProxy.Ins.List;
      }
   }

   private updataZKView() {
      this._zkVo = ActivityModel.Ins.getVo(EActivityType.ZKShop);
      if(!this._zkVo){
         return;
      }
      this.updateTime1();
      let map = {};
      let arr = this._zkVo.dataList;
      for (let i: number = 0; i < arr.length; i++) {
         let cfg = t_Pack_Daily_Shop.Ins.getCfgById(arr[i].id);
         if (!map[cfg.f_group]) {
            map[cfg.f_group] = [];
         }
         map[cfg.f_group].push(arr[i]);
      }

      while (this._ui.panel.numChildren) {
         this._ui.panel.removeChildAt(0);
      }

      let offy = 0;
      for (let ele in map) {
         let v;
         let cfg = t_Pack_Daily_Shop.Ins.getCfgById(map[ele][0].id);
         if (cfg.f_weekcard) {
            v = new ZheKouItem2;
         } else {
            v = new ZheKouItem;
         }
         v.setData(map[ele]);
         v.y = offy;
         this._ui.panel.addChild(v);
         if (cfg.f_weekcard) {
            offy += 536;
         } else {
            offy += 387;
         }
      }
   }

   private updateTime() {
      if(!this._vo)return;
      this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
      let sec = 0;
      if(initConfig.clienttype == EClientType.Discount){
         if(this.tabsCtl1.selectIndex == 0){
            sec = this._vo.endTime - TimeUtil.serverTime;
         }else {
            let vo = ActivityModel.Ins.timeList.find(ele => ele.flag === this.tabsCtl1.selectIndex);
            if(vo){
               sec = vo.endtime - TimeUtil.serverTime;
            }
         }
      }else{
         sec = this._vo.endTime - TimeUtil.serverTime;
      }
      
      if (sec <= 0) {
         this._ui.timeTf.text = "";
      } else {
         this._timeCtl.start(sec);
      }
   }

   private onTimeComplete() {
      this._ui.timeTf.text = "";
      this.updateTime();
   }

   private updateTime1() {
      if(!this._zkVo)return;
      this._timeCtl1.once(Laya.Event.COMPLETE, this, this.onTimeComplete1);
      let sec = this._zkVo.endTime - TimeUtil.serverTime;
      if (sec <= 0) {
         this._ui.timeTf1.text = "";
      } else {
         this._timeCtl1.start(sec);
      }
   }

   private onTimeComplete1() {
      this._ui.timeTf1.text = "";
      this.updateTime1();
   }

   //***********************************************************月卡************************/
   private purchaseId: number;
   private _purchaseCfg:Configs.t_Purchase_Price_dat;
   private lingquCtl:ButtonCtl;
   private goonPay:ButtonCtl;
   private rateCtl:RateBtn01Ctl;
   private btnCtl:ButtonCtl;
   private _curData: MonthCard_revc;
   private initYK(){
      const rewardConf = PackMonthCardProxy.Ins.getRewardConf(1);
      const purchaseId = rewardConf.purchaseId;
      this.purchaseId = purchaseId;
      const priceItem: IPriceItem = t_Purchase_PriceProxy.Ins.getPriceItemById(purchaseId);
      const price = parseFloat((priceItem.price / 100).toFixed(2));
      this._ui.item1.tf1.text = `${price}元解锁`;
      this._purchaseCfg = t_Purchase_PriceProxy.Ins.GetDataById(purchaseId);

      this.lingquCtl = new ButtonCtl(this._ui.item1.lingqu, new Laya.Handler(this, this.onYKLingquHandler));
      this.btnCtl = ButtonCtl.Create(this._ui.item1.btn1, new Laya.Handler(this, this.onYKEnterHandler));
      this.rateCtl = new RateBtn01Ctl(this._ui.item1.ratebtn, this, this.onYKEnterHandler, ESkinRateBtn.Yellow);

      this.goonPay = ButtonCtl.Create(this._ui.item1.img3, new Laya.Handler(this, this.onYKGoPushMoney));
      this._ui.item1.zhangguIcon.skin = IconUtils.getIconByCfgId(ECellType.BOX);
      this.btnList.push(this.lingquCtl, this.btnCtl, this.goonPay);

      if (t_Platform.Ins.isHideAdImg) {
         this._ui.item1.mcsy_img.visible = false;
      }

      if (this._ui.item1.zidongzhuwei && initConfig.clienttype == EClientType.Discount) {
         this._ui.item1.zidongzhuwei.visible = false;
      }
   }

   /**续费 */
   private onYKGoPushMoney() {
      this.onYKEnterHandler();
   }

   /**领取 */
   private onYKLingquHandler() {
      let req: MonthCardGet_req = new MonthCardGet_req();
      SocketMgr.Ins.SendMessageBin(req);
   }

   private clearUIYK() {
      this.lingquCtl.visible = false;
      this._ui.item1.subcon.visible = false;
      this._ui.item1.yilingqu.visible = false;//今日已领取
      this._ui.item1.weichongzhi.visible = false;
   }
   private refreshYKView() {
      this._curData = MainModel.Ins.monthCard;
      this.clearUIYK();
      if (this._curData) {
         if (this._curData.val == ECardLingqu.Nothing) {
            this._ui.item1.weichongzhi.visible = true;//未充值
            ////////////////////////////////////////////////////////
            let btn: ButtonCtl = this.btnCtl;
            if (this._purchaseCfg.f_isVoucher == EShopPayType.Voucher) {
               btn = this.rateCtl.btnCtl;
               this.rateCtl.cfg = this._purchaseCfg;
            }
            RateBtnUtils.Refresh(btn, this.btnCtl, this.rateCtl.btnCtl);
            DotManager.removeDot(this._ui.item1.lingqu);
            ////////////////////////////////////////////////////////
         }
         else if (this._curData.val == ECardLingqu.CanGet) {
            this.lingquCtl.visible = true;
            this._ui.item1.subcon.visible = true;
            DotManager.addDot(this._ui.item1.lingqu);
         }
         else if (this._curData.val == ECardLingqu.AlreadyGet) {
            this._ui.item1.yilingqu.visible = true;
            this._ui.item1.subcon.visible = true;
            DotManager.removeDot(this._ui.item1.lingqu);
         }
         this._ui.item1.dattf.text = this._curData.subday + "";
      }
      this.layoutUIYK();
   }

   private layoutUIYK() {
      this._ui.item1.dattf.x = this._ui.item1.img1.x + this._ui.item1.img1.width;
      this._ui.item1.img2.x = this._ui.item1.dattf.x + this._ui.item1.dattf.textField.width;
      this._ui.item1.img3.x = this._ui.item1.img2.x + this._ui.item1.img2.width;
      this.goonPay.setpos(this._ui.item1.img3.x, this._ui.item1.img3.y);
   }

   private onYKEnterHandler() {
      ActivityModel.Ins.recharge(this.purchaseId);
   }

   private updataYkView() {
      this.refreshYKView();
   }

   private onRrefreshView(){
      this._ui.list_tab.refresh();
      this.updataYkView();
      this.updataZSKView();
   }

   //***********************************************************终身卡************************/
   private purchaseId1: number;
   private _purchaseCfg1: Configs.t_Purchase_Price_dat;
   private _ctlFont: FontClipCtl;
   private lingquCtl1: ButtonCtl;
   private btnCtl1: ButtonCtl;
   private rateCtl1: RateBtn01Ctl;
   private _curData1: AllLifeCard_revc;
   private initZSK() {
      const rewardConf = PackMonthCardProxy.Ins.getRewardConf(2);
      const purchaseId = rewardConf.purchaseId;
      this.purchaseId1 = purchaseId;
      const priceItem: IPriceItem = t_Purchase_PriceProxy.Ins.getPriceItemById(purchaseId);
      const price = parseFloat((priceItem.price / 100).toFixed(2));
      this._purchaseCfg1 = t_Purchase_PriceProxy.Ins.GetDataById(purchaseId);
      this._ui.item.tf1.text = `${price}元解锁`;
      this._ctlFont = new FontClipCtl(IconUtils.numAtlasPrefix);
      this._ctlFont.mScale = 0.6;
      this._ctlFont.setValue(this._ui.item.numCon, rewardConf.itemVo.count + "");
      this.btnCtl1 = ButtonCtl.Create(this._ui.item.btn1, new Laya.Handler(this, this.onEnterHandler));
      this.lingquCtl1 = ButtonCtl.Create(this._ui.item.lingqu, new Laya.Handler(this, this.onLingqu));
      this.rateCtl1 = new RateBtn01Ctl(this._ui.item.ratebtn, this, this.onEnterHandler, ESkinRateBtn.Yellow)
      this.btnList.push(this.lingquCtl1, this.btnCtl1);

      this._ui.item.zhangguIcon.skin = IconUtils.getIconByCfgId(ECellType.BOX);
      if (t_Platform.Ins.isHideAdImg) {
         this._ui.item.mcsy_img.visible = false;
      }
   }

   /**领取 */
   private onLingqu() {
      let req = new AllLifeCardGet_req();
      SocketMgr.Ins.SendMessageBin(req);
   }

   private clearUI() {
      this._ui.item.chongzhicon.visible = false;
      this.lingquCtl1.visible = false;
      this._ui.item.yilingqu.visible = false;
   }

   public refreshView() {
      this.clearUI();
      let allLife: AllLifeCard_revc = MainModel.Ins.allLife;
      this._curData1 = allLife;
      if (this._curData1) {
         if (this._curData1.val == ECardLingqu.Nothing) {
            this._ui.item.chongzhicon.visible = true;
            ////////////////////////////////////////////////////////
            let btn: ButtonCtl = this.btnCtl1;
            if (this._purchaseCfg1.f_isVoucher == EShopPayType.Voucher) {
               btn = this.rateCtl1.btnCtl;
               this.rateCtl1.cfg = this._purchaseCfg1;
            }
            RateBtnUtils.Refresh(btn, this.btnCtl1, this.rateCtl1.btnCtl);
            DotManager.removeDot(this._ui.item.lingqu);
            ////////////////////////////////////////////////////////
         }
         else if (this._curData1.val == ECardLingqu.CanGet) {
            this.lingquCtl1.visible = true;
            DotManager.addDot(this._ui.item.lingqu);
         }
         else if (this._curData1.val == ECardLingqu.AlreadyGet) {
            this._ui.item.yilingqu.visible = true;
            DotManager.removeDot(this._ui.item.lingqu);
         }
      }
   }

   onEnterHandler() {
      ActivityModel.Ins.recharge(this.purchaseId1);
   }

   private updataZSKView() {
      this.refreshView();
   }

   //************************************************Vip*************************** */
   private initVip(){
      this._ui.list_vip.itemRender = ui.views.huodong.ui_meiriTab2UI;
      this._ui.list_vip.renderHandler = new Laya.Handler(this,this.onVipRenderHandler);
      this._ui.list_vip.selectEnable = true;
      this.btnList.push(
         ButtonCtl.Create(this._ui.btn_vip1,new Laya.Handler(this,this.onBtnVip1Click)),
         ButtonCtl.Create(this._ui.btn_vip2,new Laya.Handler(this,this.onBtnVip2Click))
      )
   }

   private onBtnVip1Click(){
      let req:VipPrivilegeReward_req = new VipPrivilegeReward_req;
      req.fid = this._ui.list_vip.selectedItem.f_id;
      SocketMgr.Ins.SendMessageBin(req);
   }

   private onBtnVip2Click(){
      MainModel.Ins.openGold();
   }

   private _index:number = 0;
   private onVipRenderHandler(item:ui.views.huodong.ui_meiriTab2UI,index:number){
      let cfg:Configs.t_VIP_dat = item.dataSource;
      item.txt.text = "VIP" + cfg.f_VIPRank;
      if(VipModel.Ins.vipLevel >= cfg.f_VIPRank){
         item.sp.visible = false;
      }else{
         item.sp.visible = true;
      }
      if(index == this._ui.list_vip.selectedIndex){
         if(parseInt(cfg.f_IsView) == 0){
            if(VipModel.Ins.vipLevel < cfg.f_VIPRank - 1 ){
               this._ui.list_vip.selectedIndex = this._index;
               let st = "需解锁VIP" + (cfg.f_VIPRank - 1) + "才可以被查看";
               E.ViewMgr.ShowMidError(st);
            }else{
               item.img.skin = "remote/meirilibao/vip_an_1.png";
               this.updataVip();
               this._index = index;
            }
         }else{
            item.img.skin = "remote/meirilibao/vip_an_1.png";
            this.updataVip();
            this._index = index;
         }
        
      }else{
         item.img.skin = "remote/meirilibao/vip_an.png";
      }
      if (VipModel.Ins.isVipRed(cfg.f_id)) {
         DotManager.addDot(item);
      } else {
         DotManager.removeDot(item);
      }
   }

   private onUpdataVip(){
      this._ui.list_tab.refresh();
      this._ui.list_vip.refresh();
   }

   private updataVip(){
      if(!ActivityModel.Ins.isOpenByPackid(EActivityType.VIP)){
         return;
      }
      let cfg:Configs.t_VIP_dat = this._ui.list_vip.selectedItem;
      this._ui.lab_vip.text = "VIP" + cfg.f_VIPRank + "特权";
      this._ui.lab_vip1.text = "累计消耗" + cfg.f_Consume + "代金券";
      this._ui.lab_vip3.text = VipModel.Ins.djqNum + "/" + cfg.f_Consume;
      let num = VipModel.Ins.djqNum / cfg.f_Consume;
      if(num > 1 || cfg.f_Consume == 0){
         num = 1;
      }
      this._ui.pro_vip.width = num * 415;
      this._ui.lab_vip2.text = cfg.f_Txt;
      ItemViewFactory.renderItemSlots(this._ui.sp,cfg.f_Item,10,0.85,"center");

      let data:stVipPrivilege = VipModel.Ins.vipList.find(ele => ele.fid === cfg.f_id);
      if(data.state == 0){
         this._ui.btn_vip1.visible = false;
         this._ui.btn_vip2.visible = true;
      }else if(data.state == 1){
         this._ui.btn_vip1.visible = true;
         this._ui.btn_vip2.visible = false;

         this._ui.btn_vip1.mouseEnabled = false;
         this._ui.btn_vip1.skin = "remote/common/base/anniu_grey.png";
         this._ui.lab_vip4.text = "已领取";
      }else if(data.state == 2){
         this._ui.btn_vip1.visible = true;
         this._ui.btn_vip2.visible = false;

         this._ui.btn_vip1.mouseEnabled = true;
         this._ui.btn_vip1.skin = "remote/common/base/anniu_blue.png";
         this._ui.lab_vip4.text = "领取";
      }
   }
}