import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabCtl } from "../../../../../frame/view/TabCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityLingQu, EActivityType } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { JiShaoChengDuoModel, OpenDailyPayTabVo, OpenServerTabVo, t_OpenServerActivity_Charging, t_OpenServerActivity_DailyPayment, t_OpenServerActivity_Recharge } from "../JiShaoChengDuoModel";

interface IOpenServerCfg{
    f_packid:number;
    f_id:number;
    f_Reward:string;
}
class Jscd_itemView extends ui.views.jscd.ui_jscd_itemUI{
    private vo: ActivityVo;
    private chongzhiCtl:ButtonCtl;
    private lingquCtl:ButtonCtl;
    private model:JiShaoChengDuoModel;
    private data:IOpenServerCfg;
    constructor(){
        super();
        this.model = JiShaoChengDuoModel.Ins;
        this.chongzhiCtl = ButtonCtl.CreateBtn(this.chongzhiBtn,this,this.onChongZhi);
        this.lingquCtl = ButtonCtl.CreateBtn(this.lingquBtn,this,this.onLingQu);
    }

    private onChongZhi(){
        // MainModel.Ins.openGold();
        ActivityModel.Ins.openFunc(EActivityType.EveryDayBorn,EViewType.MeiRiLiBao,"nothing");
    }

    private onLingQu(){
        if(this.vo){
            ActivityModel.Ins.lingQu(this.vo.uid, this.data.f_id);
        }
    }

    public refresh(){
        let data:IOpenServerCfg = this.dataSource;
        this.data = data;
        this.goldIcon.visible = false;
        this.tf4.visible = false;
        this.chongzhiCtl.visible = false;
        this.lingquCtl.visible = false;
        this.redimg.visible = false;

        let vo = ActivityModel.Ins.getVo(data.f_packid);
        this.vo = vo;
        if(data.f_packid == EActivityType.OpenServerJiShaoChengDuo){
            //积少成多
            let cfg:Configs.t_OpenServerActivity_Charging_dat = data as Configs.t_OpenServerActivity_Charging_dat;
            let val = StringUtil.toChinesNum(cfg.f_Date);
            let money = StringUtil.moneyCv(cfg.f_ChargeCost);
            this.tf1.text = E.getLang("jscd01",money) + E.getLang("jscd06",val);
            // ItemViewFactory.renderItemSlots(this.rewardCon, cfg.f_Reward, undefined, 1, "left");
            this.countTf.text = "";
            // this.countTf.text = `${StringUtil.moneyCv(this.model.accDailyPaid)}/${money}`;
        }
        else if(data.f_packid == EActivityType.OpenServerLeiChong){
            let cfg:Configs.t_OpenServerActivity_Recharge_dat = data as Configs.t_OpenServerActivity_Recharge_dat;

            this.tf1.text = E.getLang("jscd02")+StringUtil.moneyCv(cfg.f_LevelConsume)+StringUtil.getCnMoney(0);
            // this.goldIcon.visible = true;
            // this.goldIcon.x = this.tf1.x + this.tf1.textField.textWidth;
            // this.tf4.visible = true;
            // this.tf4.text = StringUtil.moneyCv(cfg.f_LevelConsume) + "";
            // this.tf4.x = this.tf1.x + this.tf1.textField.textWidth + this.goldIcon.width * this.goldIcon.scaleX;

            // ItemViewFactory.renderItemSlots(this.rewardCon, cfg.f_Reward, undefined, 1, "left");
            this.countTf.text = `${StringUtil.moneyCv(this.model.accPaid)}/${StringUtil.moneyCv(cfg.f_LevelConsume)}`;
        }
        else if(data.f_packid == EActivityType.OpenServerLianChong){
            let cfg:Configs.t_OpenServerActivity_DailyPayment_dat = data as Configs.t_OpenServerActivity_DailyPayment_dat;
            this.tf1.text = E.getLang("jscd04",cfg.f_Date);

            // this.goldIcon.visible = true;
            // this.goldIcon.x = this.tf1.x + this.tf1.textField.textWidth;
            // this.tf4.visible = true;
            // this.tf4.text = cfg.f_RewardValue + "";
            // this.tf4.x = this.tf1.x + this.tf1.textField.textWidth + this.goldIcon.width * this.goldIcon.scaleX;
            let view:JiShaoChengDuoView = (E.ViewMgr.Get(EViewType.JiShaoChengDuo) as JiShaoChengDuoView);
            let pay:OpenDailyPayTabVo = view.everyDay.tabCtl.curData;

            this.countTf.text = E.getLang("jscd05",pay.everyDayCount+'/'+cfg.f_Date);
        }
        ItemViewFactory.renderItemSlots(this.rewardCon, this.data.f_Reward, undefined, 0.8, "left");

        let _status: EActivityLingQu = EActivityLingQu.Nothing;
        if (vo) {
            _status = vo.getParam1(this.data.f_id);
        }

        switch (_status) {
            case EActivityLingQu.Nothing:
                this.chongzhiCtl.visible = true;//前往充值
                break;

            case EActivityLingQu.YiLingQu:
                this.lingquCtl.visible = true;
                this.lingquCtl.grayMouseDisable = true;
                this.tf3.text = E.getLang("LingQu2");//已领取
                break;

            case EActivityLingQu.KeLingQu:
                this.redimg.visible = true;
                this.lingquCtl.visible = true;
                this.lingquCtl.grayMouseDisable = false;
                this.tf3.text = E.getLang("LingQu");//领取
                break;
        }
    }
}

class EveryDayMainTab{
    public tabCtl:TabCtl;

    private _ui: ui.views.jscd.ui_jscd_viewUI;
    constructor(_ui: ui.views.jscd.ui_jscd_viewUI){
        this._ui = _ui;
        this.tabCtl = new TabCtl(ui.views.jscd.ui_jscd_small_tab_itemUI,"ui_jscd_small_tab_itemUI",this._ui.everyDay,this,13,this.onTabRender,this.onTabSelClickHandler);
    }
    private onTabRender(item:ui.views.jscd.ui_jscd_small_tab_itemUI){
        let vo:OpenDailyPayTabVo = item.dataSource;
        item.tf.text = vo.label;
    }

    private onTabSelClickHandler(item:ui.views.jscd.ui_jscd_small_tab_itemUI,val:boolean,isRefresh:boolean){
        let vo:OpenDailyPayTabVo = item.dataSource;
        item.redimg.visible = vo.hasred;
        if(val){
            item.bgsel.skin = `remote/jscd/jthl_an_2.png`;
            // if(isRefresh){
            // this._ui.list2.refresh();
            // }else{
            // this._ui.list2.array = vo.cfgList;
            // this._ui.list2.scrollTo(0);
            // }
            this._ui.list2.array = vo.cfgList;
            this._ui.list2.scrollTo(vo.canLingQuIndex);

        }else{
            item.bgsel.skin = `remote/jscd/jthl_an_3.png`;
        }
    }
    dispose(){
    }
    public init(){
        this.tabCtl.refresh(t_OpenServerActivity_DailyPayment.Ins.tabList);
        this.tabCtl.selectIndex = 0;
    }

    public refresh(){
        let curItem = this.tabCtl.itemList[this.tabCtl.selectIndex];
        if(curItem){
            this.onTabSelClickHandler(curItem as any,true,true);
        }
    }
}

/**积天豪礼 */
export class JiShaoChengDuoView extends ViewBase {
    // public rechargeDay:number;
    protected autoFree = true;
    private timeCtl:TimeCtl;
    private activiyVo:ActivityVo;
    private _ui: ui.views.jscd.ui_jscd_viewUI;
    private _tabCtl:TabCtl;
    private model:JiShaoChengDuoModel;
    public everyDay:EveryDayMainTab;

    protected onAddLoadRes(): void {
        this.addAtlas("jscd.atlas");
    }
    protected onExit(): void { 
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onRefreshEvt);
        this.everyDay.dispose();
        this._tabCtl.dispose();
        this.timeCtl.stop();
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = JiShaoChengDuoModel.Ins;
            this.UI = this._ui = new ui.views.jscd.ui_jscd_viewUI();
            this.mMask = true;
            this._tabCtl = new TabCtl(ui.views.jscd.ui_jscd_tab_itemUI,"ui_jscd_tab_itemUI",this._ui.con1,this,13,this.onTabRender,this.onTabSelClickHandler);
            this.bindClose(this._ui.close1);
            this.btnList.push(new ButtonCtl(this._ui.wenhao, new Laya.Handler(this, this.wenhaoHandler)));

            this._ui.list0.itemRender = Jscd_itemView;
            this._ui.list0.renderHandler = new Laya.Handler(this,this.onItemRender);

            this._ui.list1.itemRender = Jscd_itemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender);

            this._ui.list2.itemRender = Jscd_itemView;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onItemRender);

            this.timeCtl = new TimeCtl(this._ui.timeTf);

            this.everyDay = new EveryDayMainTab(this._ui);
        }
    }

    private onItemRender(item:Jscd_itemView){
        item.refresh();
    }

    private wenhaoHandler() {
        E.ViewMgr.openHelpView("jscdTitle", "jscdgDesc");
    }

    protected onInit(): void { 
        // this.model.openRed = false;
        if(MainModel.Ins.needRed(RedEnum.JI_SHAO_CHENGDUO)){
            RedUpdateModel.Ins.save(RedEnum.JI_SHAO_CHENGDUO,TimeUtil.serverTime);
        }

        this.model.updateRed();
        this._tabCtl.refresh(this.model.tablist); //Math.random() > 0.5 ? [2]:[1,2,3]
        this._tabCtl.selectIndex = this.Data || 0;
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onRefreshEvt);
        this.model.on(JiShaoChengDuoModel.EventOpenServerAccPaid,this,this.onRefreshEvt);
        // this.model.curRechargeDay = this.model.rechargeDay;
    }

    private onRefreshEvt(){
        
        // let l = [this._ui.list0,this._ui.list1,this._ui.list2];
        // for(let i = 0;i < l.length;i++){
        //     let list = l[i];
        //     if(list.visible){
        
        // let cur:OpenServerTabVo = this._tabCtl.curData;
        // if(cur.type == EActivityType.OpenServerJiShaoChengDuo){
        // this.model.curRechargeDay = this.model.rechargeDay;
        // }

        // list.refresh();
        // }
        // }

        if(this.UI){
            let curItem = this._tabCtl.itemList[this._tabCtl.selectIndex];
            if(curItem){
                this.onTabSelClickHandler(curItem as any,true,true);
            }
        }
    }

    private onTabRender(item:ui.views.jscd.ui_jscd_tab_itemUI){
        let vo:OpenServerTabVo = item.dataSource;
        item.tf.text = vo.label;
    }

    private getCanLingQuIndex(l: IOpenServerCfg[]) {
        // let res = [];
        if (this.activiyVo) {
            for (let i = 0; i < l.length; i++) {
                let cfg = l[i];
                if (this.activiyVo.getParam1(cfg.f_id) == EActivityLingQu.KeLingQu) {
                    // res.push(cfg);
                    return i;
                }
            }
        }
        return 0;
        // for(let i = 0;i < l.length;i++){
        //     let cfg = l[i];
        //     if(this.activiyVo.getParam1(cfg.f_id) == EActivityLingQu.YiLingQu){
        //         res.push(cfg);
        //     }
        // }
        // return res;
    
    }
    private onTabSelClickHandler(item:ui.views.jscd.ui_jscd_tab_itemUI,val:boolean,isRefresh:boolean){
        let vo:OpenServerTabVo = item.dataSource;
        item.redimg.visible = vo.hasRed;
        if(val){
            item.bgsel.skin = `remote/jscd/jthl_an.png`;
            item.tf.color = "#8F2D2F";
            ////////////////////////////////////////////
            //clear
            this._ui.list0.visible = false;
            this._ui.list1.visible = false;
            this._ui.list2.visible = false;
            this._ui.everyDay.visible = false;
            this.onEndHandler();
            ////////////////////////////////////////////
            this.activiyVo = ActivityModel.Ins.getVo(vo.type);
            // this.model.tempActiviyVo = this.activiyVo;
            if(this.activiyVo){
                switch(vo.type){
                    case EActivityType.OpenServerJiShaoChengDuo:
                        this._ui.list0.visible = true;
                        // if(isRefresh){
                            // this._ui.list0.refresh();
                        // }else{
                            let l = t_OpenServerActivity_Charging.Ins.List;
                            // l = this.sortList(l);
                            this._ui.list0.array = l;
                            this._ui.list0.scrollTo(this.getCanLingQuIndex(l));
                        // }
                        if(this._tabCtl.dataList.length<=1){
                            this._ui.bg5.skin = `remote/jscd/jthl_banner_4.png`;
                        }else{
                            this._ui.bg5.skin = `remote/jscd/jthl_banner.png`;
                        }
                        break;
                    
                    case EActivityType.OpenServerLeiChong:
                        this._ui.list1.visible = true;
                        // if (isRefresh) {
                            // this._ui.list1.refresh();
                        // } else {
                            let l1 = t_OpenServerActivity_Recharge.Ins.List;
                            this._ui.list1.array = l1;
                            this._ui.list1.scrollTo(this.getCanLingQuIndex(l1));
                        // }
                        this._ui.bg5.skin = `remote/jscd/jthl_banner_2.png`;
                        break;

                    case EActivityType.OpenServerLianChong:
                        this._ui.list2.visible = true;
                        this._ui.bg5.skin = `remote/jscd/jthl_banner_3.png`;
                        this._ui.everyDay.visible = true;
                        if(isRefresh){
                            this.everyDay.refresh();
                        }else{
                            this.everyDay.init();
                        }
                        break
                }
                this.timeCtl.start(this.activiyVo.endTime - TimeUtil.serverTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.onEndHandler));
            }
        }else{
            item.bgsel.skin = `remote/jscd/jthl_an_1.png`;
            item.tf.color = "#FFEFC5";
        }
    }
    private onUpdateTime() {
        this._ui.tf1.visible = true;
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str);
    }
    private onEndHandler() {
        this._ui.timeTf.text = "";
        this._ui.tf1.visible = false;
    }
}