import { ETimeShowStyle, TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { System_RefreshTimeProxy, t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ESkinRateBtn, RateBtn01Ctl } from "../../huodong/views/RateBtn01Ctl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ECombopackLingQu } from "../CombopackModel";
import { CombopackTabCtl } from "./CombopackTabCtl";
import { t_Purchase_ComboPack } from "./t_Purchase_ComboPack";

interface IComboPackLabel{
    purchaseID:number;
    label:string;
}

export class CombopackView extends ViewBase{
    protected autoFree:boolean = true;
    protected mMask:boolean = true;
    protected _ui:ui.views.combopack.ui_combopack_mainUI;
    private tabCtl:CombopackTabCtl;
    private lingqubtnCtl:RateBtn01Ctl;
    private timeCtl:TimeCtlV2;
    private ticket:number;
    protected onAddLoadRes(): void {
        // throw new Error("Method not implemented.");
        this.addAtlas("combopack.atlas");
    }
    protected onExit(): void {
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onRefresh);
        // throw new Error("Method not implemented.");
        this.tabCtl.dispose();
        this.timeCtl.dispose();
    }
    protected onFirstInit(): void {
        // throw new Error("Method not implemented.");
        if(!this.UI){
            this.UI = this._ui = new ui.views.combopack.ui_combopack_mainUI();
            this._ui.timetf.visible = false;
            // let cfgList:Configs.t_Purchase_ComboPack_dat[] = t_Purchase_ComboPack.Ins.List;
            this.bindClose(this._ui.close_btn);

            this.tabCtl = new CombopackTabCtl();
            for(let i = 0;i < 3;i++){
                this.tabCtl.add(this._ui["b"+i],E.getLang("combopack01")+StringUtil.toChinesNum(i+1));
            }
            this.tabCtl.pushStyle(["remote/combopack/jx_2.png","#5F3926"],["remote/combopack/jx_3.png","#F4CCC0"]);
            this.tabCtl.bind(this.onTabClickHandler,this);

            this.lingqubtnCtl = new RateBtn01Ctl(this._ui.lingqubtn,this,this.onLingQuHandler,ESkinRateBtn.Yellow);
            this._ui.list1.itemRender = ui.views.combopack.ui_comboppack_itemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemHandler);
            let ticket:number =  parseInt(System_RefreshTimeProxy.Ins.getVal(87));
            this.ticket = ticket;
            this.timeCtl = new TimeCtlV2(this._ui.timeTf, "{0}");
            this.timeCtl.style = ETimeShowStyle.HMS;
        }
    }

    private timeTicketEnd(){
        let haveTime:boolean = false;
        let vo = ActivityModel.Ins.getVo(EActivityType.Combopack);
        if(vo){
            let cfg:Configs.t_Purchase_ComboPack_dat = this.curCfg;
            if(cfg){
                let type:ECombopackLingQu = vo.getParam1(cfg.f_id) as any;
                if(type == ECombopackLingQu.WaitRecharge){   
                    haveTime = true;
                }
            }
        }
        if(haveTime){
            let sub = TimeUtil.serverTime - vo.startTime;
            let a:number = sub % this.ticket;
            this.timeCtl.start(this.ticket - a);
            this.timeCtl.on(Laya.Event.COMPLETE,this,this.timeTicketEnd);
        }else{
            this.timeCtl.stop();
            this._ui.timetf.text = "";
        }
    }

    private onItemHandler(item:ui.views.combopack.ui_comboppack_itemUI,index:number){
        let data:IComboPackLabel = item.dataSource;
        item.tf.text = data.label;
        let cfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(data.purchaseID);
        item.moneytf.text = E.getLang("combopack02") + " " + StringUtil.moneyCv(cfg.f_price) + E.getLang("CNY");
    }

    private onLingQuHandler(){
        let _cfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this.curCfg.f_PurchaseID);
        ActivityModel.Ins.recharge(_cfg.f_id);
    }

    private get curCfg(){
        let index = this.curSelInex;
        let cfg:Configs.t_Purchase_ComboPack_dat = t_Purchase_ComboPack.Ins.GetDataById(index + 1);
        return cfg;
    }

    /**
     * 红点更新
     */
    private updateTabsRed(){
        let vo = ActivityModel.Ins.getVo(EActivityType.Combopack);
        if(!vo){
            return;
        }
        for(let i = 0;i < 3;i++){
            let cfg:Configs.t_Purchase_ComboPack_dat = t_Purchase_ComboPack.Ins.GetDataById(i + 1);
            let type:ECombopackLingQu = vo.getParam1(cfg.f_id) as any;
            let _nodeSkin = this.tabCtl.getNodeByIndex(i);
            if(type == ECombopackLingQu.WaitRecharge){
                DotManager.addDot(_nodeSkin);
            }else{
                DotManager.removeDot(_nodeSkin);
            }
        }
    }


    private onTabClickHandler(index:number){
        // LogSys.Log(index);
        this.updataCombopackView();
    }
    private get curSelInex(){
        return this.tabCtl.selectIndex;
    }
    private updataCombopackView(){
        let index = this.curSelInex;
        this._ui.bg01.skin = `static/set_meal_${(index + 1)}.png`;
        let cfg:Configs.t_Purchase_ComboPack_dat = this.curCfg;
        this.lingqubtnCtl.cfg = t_Purchase_PriceProxy.Ins.GetDataById(cfg.f_PurchaseID);
        //=====================================
        let purchaseIDArr:string[] = cfg.f_ComboPurchaseID.split("|");
        let labelArr:string[] = cfg.f_Client.split("|");
        let dataList:IComboPackLabel[] = [];
        for(let i = 0;i<purchaseIDArr.length;i++){
            let cell = {} as IComboPackLabel;
            cell.label = labelArr[i]||"";
            cell.purchaseID = parseInt(purchaseIDArr[i]||"");
            dataList.push(cell);
        }
        this._ui.list1.array = dataList;
        ItemViewFactory.renderItemSlots(this._ui.rewardCon,cfg.f_TimeReward);
        //=====================================

        let vo = ActivityModel.Ins.getVo(EActivityType.Combopack);
        let isgary:boolean = true;
        if(vo){
            let type:ECombopackLingQu = vo.getParam1(cfg.f_id) as any;
            switch(type){
                case ECombopackLingQu.Locked:
                case ECombopackLingQu.isGet:
                case ECombopackLingQu.LockedSub:
                    break;
                case ECombopackLingQu.WaitRecharge:
                    isgary = false;
                    break;
            }
        }
        this.lingqubtnCtl.btnCtl.grayMouseDisable = isgary;
        this.timeTicketEnd();
        this.updateTabsRed();
    }

    protected onInit(): void {
        // throw new Error("Method not implemented.");
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onRefresh);
        this.tabCtl.selectIndex = this.Data || 0;
    }
    private onRefresh(){
        this.updataCombopackView();
    }
}