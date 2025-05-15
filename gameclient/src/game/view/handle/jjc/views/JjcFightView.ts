import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { BoxExtraItemProxy } from "../../main/proxy/FuncProxy";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { EJjcType, IJJC_Model } from "../../peakjjc/model/IJjcInterface";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { Arena_BuyTicket, Arena_config } from "../proxy/JjcProxy";
import { JjcEvent } from "../vos/JjcEvent";
import { JjcFightItemView } from "./JjcFightItemView";
import { JjcHeadCtl } from "./JjcHeadCtl";
import { JjcLogBtnCtl } from "./JjcLogBtnCtl";
/**竞技场挑战界面 */
export class JjcFightView extends ViewBase {
    protected mMask: boolean = true;
    protected autoFree = true;
    private _ui: ui.views.jjc.ui_jjc_fightUI;
    private model: IJJC_Model;
    private _headCrl:JjcHeadCtl;
    private buyCtl:ButtonCtl;
    private timeCtl:TimeCtlV2;
    private jjcLog:JjcLogBtnCtl;
    /**可刷新的时间戳 */
    private refreshBtnTime:number = 0;
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.jjc.ui_jjc_fightUI();
            this._ui.refreshTimeCnt.visible = false;
            this.btnList.push(
            ButtonCtl.Create(this._ui.close1, new Laya.Handler(this, this.Close)),
            ButtonCtl.Create(this._ui.refreshBtn, new Laya.Handler(this, this.onRefreshHandler))
            );
            this.buyCtl = ButtonCtl.Create(this._ui.buyBtn, new Laya.Handler(this, this.onBuyHandler));
            this._ui.list1.itemRender = JjcFightItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this, this.onJjcFightItemHandler);
            this._ui.list1.vScrollBarSkin = " ";
            this._ui.list1.array = [];
            this._headCrl = new JjcHeadCtl(this._ui.head,this._ui.plus,this._ui.nametf,this._ui.rankImg,this._ui.mingcitf,this._ui.img_title);
            this.timeCtl = new TimeCtlV2(this._ui.tf6,"{0}",0,false);
        }
    }

    private setTimeTf(){
        // console.log(this._ui.tf6.text);
        // if(this.refreshBtnTime == 0 || this.timeCtl.isPlayingEnd){
            this._ui.tf6.text = "刷新";
        // }
    }

    private onJjcFightItemHandler(item: JjcFightItemView, index: number) {
        item.setData(item.dataSource,this.model);
    }

    /**购买 */
    private onBuyHandler() {
        // f_CouponPrice
        let  price = this.model.realPrice;
        // (this.model.curCfg as any).f_CouponPrice;
        // let cfg = Arena_BuyTicket.Ins.getCfgByTime(this.model.hasAlreadyBuyCnt+1);
        MainModel.Ins.queryMsg(E.LangMgr.getLang("JjcBuy"), ECellType.GOLD, parseInt(price.split("-")[1]), 
                        EQuickMsg.JJC, new Laya.Handler(this, this.onBuyEndHandler));
        
    }

    private onBuyEndHandler(selected:boolean){
        // this.model.mAutoBuy = selected;
        // this.model.mTodayTis = selected;
        // let req:JjcBuyFightCnt_req = new JjcBuyFightCnt_req();
        // SocketMgr.Ins.SendMessageBin(req);

        this.model.buyFightTime(0);
    }

    /**刷新 */
    private onRefreshHandler() {
        // if(this.model.surplusRefreshCount <=0){
        //     E.ViewMgr.ShowMidError(E.LangMgr.getLang("noRefreshTime"));
        //     return;
        // }

        const priceItem = this.model.getRefreshPrice(this.model.surplusRefreshCount);
        if(!MainModel.Ins.isItemEnoughSt(`${priceItem.itemId}-${priceItem.count}`,true)){
            return;
        }

        if(!this.timeCtl.isPlayingEnd){
            E.ViewMgr.ShowMidError(E.LangMgr.getLang("CdNotEnough"));
            return;
        }
        this.refreshBtnTime = TimeUtil.serverTime + this.model.curCfg.f_RefreshCD;
        this.timeCtl.on(Laya.Event.COMPLETE,this,this.onTimeCtlEnd);
        this.timeCtl.start(this.model.curCfg.f_RefreshCD);

        this.model.refreshPlayerList();
    }

    private onTimeCtlEnd(){
        this.setTimeTf();
    }

    protected onExit(): void {
        this.model.off(JjcEvent.MoneyVal,this,this.updateView);
        this.model.off(JjcEvent.SurplusRefreshCount,this,this.updateView);
        this.model.off(JjcEvent.BuyFightCntUpdate,this,this.updateFightTime);
        this.model.off(JjcEvent.FightPlayerList,this,this.onFightRefresh);
        this.model.off(JjcEvent.TodayRankValUpdate,this,this.updateView);
        if(!this.timeCtl.isPlayingEnd){
            this.model.tickEndTime = TimeUtil.serverTime + this.timeCtl.subTime;
        }
    }

    protected onAddLoadRes(): void {

    }

    private updateView() {
        //剩余挑战次数
        this.updateFightTime();

        //刷新次数
        //this._ui.refreshTimeCnt.text = E.LangMgr.getLang("JjcSub") + ":" + this.model.surplusRefreshCount + "/" + this.model.cfgFightRefreshMax;
        const priceItem = this.model.getRefreshPrice(this.model.surplusRefreshCount);
        this._ui.refreshtf.text = priceItem.count.toString();
        // Arena_config.Ins.f_refreshprice(day);
        // let _itemVo: ItemVo = ItemViewFactory.convertItemList(itemStr)[0];
        // if (_itemVo.count == 0) {
        //     return true;
        // }


        this._ui.ybtf.text = this.model.dayMoneyVal + "/" + this.model.f_MoneyMaximum;

        let owner = this.model.ownerPlayer;
        this._headCrl.updateView(owner);
        // if(this.model.getType() == EJjcType.JJC){
        ItemViewFactory.setJJC_score(this._ui,owner,this.model.getType());
        // }
    }
    private updateFightTime() {
        if (this.model.getType() == EJjcType.JJC) {
            // 竞技场
            // 玩家的竞技场挑战券数量
            const count = MainModel.Ins.mRoleData.getVal(ECellType.JjcTicket);
            // 挑战券最大拥有上限
            const conf = BoxExtraItemProxy.Ins.getConfByFid(1);
            this._ui.tf2.text = E.LangMgr.getLang("FightSubCnt2") + ":" + count + "/" + conf.f_Maxhold;
            this.buyCtl.visible = true;
        } else {
            // 巅峰竞技场
            this._ui.tf2.text = E.LangMgr.getLang("FightSubCnt") + ":" + this.model.fightTotalCnt + "/" + this.model.refreshTotalCnt;

            if(this.model.fightTotalCnt >= this.model.refreshTotalCnt){
                this.buyCtl.visible = false;
            }else{
                this.buyCtl.visible = true;
            }
        }
    }

    protected onInit(): void {
        this.model = this.Data;
        let itemId:number = this.model.curCfg.f_itemid;
        this._ui.tf10.text = E.getLang("jjc_desc01",main.itemName(ItemProxy.Ins.getCfg(itemId).f_name));
        this._ui.ybicon.skin = IconUtils.getIconByCfgId(itemId);
        let index = this.model.getType() as number;
        this._ui.title1.text = E.getLang("jjc_desc02").split("|")[index];

        this.jjcLog = new JjcLogBtnCtl(this._ui.fightbtn,this.model);
        this.model.on(JjcEvent.MoneyVal,this,this.updateView);
        this.model.on(JjcEvent.BuyFightCntUpdate,this,this.updateFightTime);
        this.model.on(JjcEvent.SurplusRefreshCount,this,this.updateView);
        this.model.on(JjcEvent.FightPlayerList,this,this.onFightRefresh);
        this.model.on(JjcEvent.TodayRankValUpdate,this,this.updateView);
        // if(this.timeCtl.isPlayingEnd){
        // this.setTimeTf();
        // }
        if(this.model.tickEndTime > TimeUtil.serverTime){
            this.timeCtl.on(Laya.Event.COMPLETE,this,this.onTimeCtlEnd);
            this.timeCtl.start(this.model.tickEndTime-TimeUtil.serverTime);
        }else{
            this.timeCtl.stop();
            this.setTimeTf();
        }

        // let req:JjcRefreshList_req = new JjcRefreshList_req();
        // SocketMgr.Ins.SendMessageBin(req);
        this.model.reqRefreshList();
        this.updateView();
    }

    private onFightRefresh(){
        this._ui.list1.array = this.model.fightPlayers;
        this._ui.list1.scrollTo(0);
    }
}