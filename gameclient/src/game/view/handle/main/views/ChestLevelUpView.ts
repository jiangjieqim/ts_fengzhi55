import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { t_Txt_Config } from "../../../../static/StaticDataMgr";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { DotManager } from "../../common/DotManager";
import { GuaJiModel } from "../../guaji/model/GuaJiModel";
import { XianShiLiBaoModel, XianShiLiBaoType } from "../../xianshilibao/model/XianShiLiBaoModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { EChestLevelUp, IChestLv, IChestPosResult } from "../interface/Interface";
import { EGameColor } from "../model/EGameColor";
import { EquipmentQualityProxy } from "../model/EquipmentProxy";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { RedEnum } from "../model/RedEnum";
import { RedUpdateModel } from "../model/RedUpdateModel";
import { BoxExtraItemProxy } from "../proxy/FuncProxy";
import { t_Platform } from "../proxy/t_Platform";
import { ECellType, EUseItemScene } from "../vos/ECellType";
import { ItemVo } from "../vos/ItemVo";
import { ChestProgressCtl } from "./ChestProgressView";
export class ChestLevelUpView extends ViewBase{
    private _ui:ui.views.main.ui_main_chest_lvupUI;
    protected autoFree = true;
    protected mMask:boolean = true;
    /**
     * 升级按钮
     */
    private lvUpCtl:ButtonCtl;
    /**
     * 加速按钮
     */
    private fastCtl:ButtonCtl;
    private timeCtl:TimeCtl;
    private timeCtl1:TimeCtl;
    //播放广告
    private subBtnCtl:ButtonCtl;
    private progressCtl:ChestProgressCtl;
    private model:MainModel;
    // private chestData:ChestInfoUpdate_revc;
    private curList:any[];
    private nextList:any[];
    // remote/main/chest/
    private isFullMax:boolean = false;
    private oldLv:number = 0;
    private eff:SimpleEffect;
    private buyCtl:ButtonCtl;
    private get chestData() {
        return this.model.mRoleData.getChestData();
    }

    protected onFirstInit() {
        if(!this.UI){
            this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.main.ui_main_chest_lvupUI();
            this.lvUpCtl = new ButtonCtl(this._ui.shenjiBtn,new Laya.Handler(this,this.onLevelUp));
            this.btnList.push(
            new ButtonCtl(this._ui.close1,new Laya.Handler(this,this.Close)),
            new ButtonCtl(this._ui.wenhao,new Laya.Handler(this,this.wenhaoHandler))
            );
            this.buyCtl = new ButtonCtl(this._ui.goumaibtn,new Laya.Handler(this,this.onBuyHandler));
            this.timeCtl = new TimeCtl();
            this.timeCtl1 = new TimeCtl(this._ui.lab_time);
            this.progressCtl = new ChestProgressCtl(this._ui.progcontainer);
            this._ui.lvList.itemRender = ui.views.main.ui_chestlv_itemUI;
            this._ui.lvList.renderHandler = new Laya.Handler(this,this.onListItem);
            this.fastCtl = new ButtonCtl(this._ui.fastBtn,new Laya.Handler(this,this.onFastHandler));
            this.subBtnCtl = new ButtonCtl(this._ui.subBtn,new Laya.Handler(this,this.onWatchAdvertisement));
            // new ButtonCtl(this._ui.itemicon,new Laya.Handler(this,this.showItemTips),false);
            this._ui.quickIcon.skin = IconUtils.getIconByCfgId(ECellType.ChestQuick);
            this._ui.subtime.centerX = 0;

            this._ui.list.itemRender = ui.views.main.ui_main_chest_lvupItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this.btnList.push(this.buyCtl,this.fastCtl,this.subBtnCtl);

            if(this._ui["lvzg"]){
                this._ui['lvzg'].text = t_Txt_Config.Ins.replace(E.getLang("LvZhanggu"));
            }
            this._ui.islvuping.text = t_Txt_Config.Ins.replace(E.getLang("isLvingUp"));
            this._ui.title1.text = t_Txt_Config.Ins.replace(E.getLang("BaoXiangTitle"));
            this._ui.desc1.text = t_Txt_Config.Ins.replace(E.getLang("zhangguDesc"));

            if(t_Platform.Ins.isADclose){
                this.fastCtl.setX(140);
                this._ui.freeCon.visible = false;
            }
        }
    }

    // private showItemTips(){
    //     let _smallTipsData:ISmallTips = {} as ISmallTips;
    //     _smallTipsData.content =  E.LangMgr.getLang("DingDangDesc");
    //     _smallTipsData.title =  E.LangMgr.getLang("DingDangTitle");
    //     _smallTipsData.target = this._ui.itemicon;
    //     E.ViewMgr.Open(EViewType.SmallTips,null,_smallTipsData);
    // }

    //观看广告
    private onWatchAdvertisement(){
        E.ViewMgr.Open(EViewType.SubCDView,null,GuaJiModel.CDEnmu.BaoXiangLv);
    }

    /**
     * 加速
     */
    private onFastHandler(){
        MainModel.Ins.fastUseItem(ECellType.ChestQuick,EUseItemScene.Chest,this.chestData.time);
        // this.model.levelUpChest();
    }

    private onRenderHandler(item:ui.views.main.ui_main_chest_lvupItemUI){
        let data:Configs.t_Box_ExtraItem_dat = item.dataSource;
        let vo = new ItemVo();
        vo.cfgId = parseInt(data.f_BoxRate.split("-")[0]);
        vo.count = parseInt(data.f_BoxRate.split("-")[1]);
        ItemViewFactory.refreshSlot(item.item,vo);

        if(this.chestData.boxlv >= data.f_BoxLevel){
            item.lab.text = "已解锁";
            item.lab.color = "#279034";
        }else{
            item.lab.text = data.f_BoxLevel + "级解锁";
            item.lab.color = "#CB342B";
        }
    }

    private perToString(v:number){
        return v = v / 100;
    }

    private onListItem(item:ui.views.main.ui_chestlv_itemUI,index:number){
        let data = this.curList[index];
        let cur = parseInt(data.split("-")[1]);
        let qua = parseInt(data.split("-")[0]);
        item.curTf.text = this.perToString(cur).toString() + "%";
        item.pre.skin = item.back.skin = `remote/main/chest/dengji${qua}.png`;
        let qCfg = EquipmentQualityProxy.Ins.getByQua(qua);
        item.lab.text = qCfg.f_EquipmentLevel;
        item.lab.color = "#"+qCfg.f_Color;
        if(this.nextList){
            let nextData = this.nextList[index];
            item.back.visible = true;
            let next = parseInt(nextData.split("-")[1]);
            item.nexttf.text = this.perToString(next).toString() + "%";
        }else{
            item.nexttf.text = "";
            item.back.visible = false;
        }
    }

    /**
     * 购买
     */
    private onBuyHandler(){
        // console.log(111);
        
        if(this.isFullMax){
            
        }else{
            this.model.levelUpChest();
        }
    }

    private wenhaoHandler(){
        E.ViewMgr.openHelpView("BaoXiangTitle","BaoXiangDesc");
    }
    
    /**
     * 宝箱升级
     */
    private onLevelUp(){
        this.model.levelUpChest();
        XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Baoxiang);
    }

    protected onAddLoadRes() {
        this.addAtlas("main/chest.atlas");
    }
    protected onAddEventListener() {

    }
    protected onEnter() {
    
    }
    private playEffect(){
        this.eff.play(0);
    }

    protected onExit() {
        this.saveLv();
        this.model.off(MainEvent.ValChange,this,this.onValChangeEvt);
        GuaJiModel.Ins.off(GuaJiModel.UPDATA_CD_TIME,this,this.RefreshView);
        this.timeCtl.stop();
        this.timeCtl1.stop();
        if(this.eff){
            this.eff.dispose();
            this.eff = null;
        }
        // MainModel.Ins.mainMask = false;
    }
    protected mMainSnapshot = true;
    private clearUI(){
        DotManager.removeDot(this._ui.goumaibtn);
        DotManager.removeDot(this.lvUpCtl.skin);
        // this._ui.goumaibtn.gray = false;
        this._ui.goumaibtn.skin = `remote/common/base/anniu_blue.png`;
        this.buyCtl.mouseEnable = true;
        this._ui.levelFullTf.visible = false;
        this._ui.levelView.visible = false;
        this._ui.boxLvUp.visible = false;
        this.timeCtl.stop();
        this.timeCtl1.stop();
        this.lvUpCtl.visible = false;
        this._ui.goumaibtn.visible = false;
        this._ui.fastBtn.visible = false;
        this._ui.isFulltf.visible = false;
        this._ui.tongqianicon.visible = false;
    }

    public RefreshView(){
        this.clearUI();
        let _mRed:boolean = MainModel.Ins.mChestMoneyLevelRed();
        let cfg:IChestLv =  this.model.getChestLvCfg(this.chestData.boxlv);
        
        this.curList = cfg.curInfo.f_Quality_Client.split("|");
        this._ui.curTf.text = E.LangMgr.getLang("CurLv") + ":" + this.chestData.boxlv;

        if(this.oldLv!=this.chestData.boxlv){
            this.playEffect();
            // LogSys.Log("===>",this.oldLv+","+this.chestData.boxlv);
            this.oldLv = this.chestData.boxlv;
        }

        if(cfg.nextInfo){
            this.nextList = cfg.curInfo.f_Quality_Client_next.split("|");
            this._ui.nextTf.text = E.LangMgr.getLang("NextLv") + ":" + cfg.nextInfo.f_BoxLevel;
            this._ui.arrow.visible = true;
        }else{
            this.nextList = null;
            this._ui.nextTf.text = "";
            this._ui.arrow.visible = false;
        }
        this._ui.lvList.array = this.curList;

        this._ui.list.array = BoxExtraItemProxy.Ins.List;

        ///////////////////////
        // console.log("#",this.chestData);
        let res:IChestPosResult = this.model.getChestCfgByPos(this.chestData.pos,this.chestData.boxlv,this.chestData.time);
        // console.log(res);
        // this.chestData.pos-res.index,Math.ceil(10* Math.random())
        this.progressCtl.offsetSize = 2;
        this.progressCtl.setVal(res.cur,res.max);

        if(res.cfg){
            this._ui.timetf.text = E.LangMgr.getLang("Time") + ":" + TimeUtil.subTime(res.cdTime);//cfg.f_BoxCD
        }else{
            this._ui.timetf.text = "";
        }
        //#############################################
        switch(res.status){
            case EChestLevelUp.UseMoney:
                //使用铜钱升级
                this._ui.boxLvUp.visible = true;
                this._ui.goumaibtn.visible = true;
                // this._ui.shenjiBtn.visible = true;

                //显示升级按钮,不可点击
                this.lvUpCtl.visible = true;
                this.lvUpCtl.enable = false;

                this._ui.tongqianicon.visible = true;
                break;
            case EChestLevelUp.Full:
                //进度条满
                this._ui.boxLvUp.visible = true;
                this._ui.goumaibtn.visible = true;
                // this._ui.shenjiBtn.visible = true;

                //可点击状态
                this.lvUpCtl.visible = true;
                this.lvUpCtl.enable = true;
                if(MainModel.Ins.hasLvUpBtnRed){
                    DotManager.addDot(this.lvUpCtl.skin);
                }

                this._ui.isFulltf.visible = true;
                break;
            case EChestLevelUp.Time:
                //加速
                this._ui.levelView.visible = true;
                this._ui.fastBtn.visible = true;
                break;
            case EChestLevelUp.End:
                this._ui.levelFullTf.visible = true;
                break;
        }
        //############################################
        if(res.cur ==  res.max){
            this.isFullMax = true;
        }else{
            this.isFullMax = false;
        }
        //铜钱
        this._ui.moneytf.text = res.cfg.f_Cost.toString();

        let haveMoney = this.model.getMoeny();
        
        if(haveMoney < res.cfg.f_Cost){
            this._ui.moneytf.color = EGameColor.NotEnough
            // this._ui.cost2.color = EGameColor.NotEnough;
            this._ui.goumaibtn.skin = `remote/common/base/anniu_grey.png`;//灰度
            this.buyCtl.mouseEnable = false;
        }else{
            this._ui.moneytf.color = EGameColor.White;
            // this._ui.cost2.color = EGameColor.White;
            if(_mRed){
                DotManager.addDot(this._ui.goumaibtn);
            }
        }

        //拥有的铜钱
        this._ui.cost2.text = StringUtil.val2m(haveMoney).toString();
        //加速劵
        let quick = this.model.chestQuickCnt;
        this._ui.cost1.text = StringUtil.val2m(quick).toString();

        if (this.isFullMax) {
            this._ui.isFulltf.visible = true;
            this._ui.tongqianicon.visible = false;
        } else {
            this._ui.isFulltf.visible = false;
            this._ui.tongqianicon.visible = true;
        }

        if (this.chestData.time > 0){
            //有倒计时的状态
            let sub = this.chestData.time - TimeUtil.serverTime;
            // LogSys.Log("sub:"+sub);
            this.timeCtl.start(sub,new Laya.Handler(this,this.updateTimeLabel),new Laya.Handler(this,this.endTimeHandler));
        }else{
            this.endTimeHandler();
        }

        // let num = parseInt(System_RefreshTimeProxy.Ins.GetDataById(8).f_SystemConfig);
        if(MainModel.Ins.verify){
            this._ui.subBtn.visible = false;
            this._ui.lab_d.visible = false;
            this._ui.lab_time.visible = false;
        }else{
            this._ui.subBtn.visible = true; 
            this.setCDBtn();
        }
    }

    private setCDBtn(){
        let time = GuaJiModel.Ins.getstAdCdByType(GuaJiModel.CDEnmu.BaoXiangLv).endUnix - TimeUtil.serverTime;
        if(time > 0){//有倒计时
            this._ui.lab_d.visible = false;
            this._ui.lab_time.visible = true;
            this._ui.subBtn.disabled = true;
            this.timeCtl1.start(time,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
        }else{
            this.timeCtl1.stop();
            this.endTime();
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl1.tickVal);
        this.timeCtl1.setText(time_str + "后刷新");
    }

    private endTime(){
        this._ui.lab_d.visible = true;
        this._ui.lab_time.visible = false;
        this._ui.subBtn.disabled = false;
    }

    protected onInit() {
        // MainModel.Ins.mainMask = true;
        if(!this.eff){
            this.eff = new SimpleEffect(this._ui.eff,"o/spine/boxup/boxup");
        }

        let o = RedUpdateModel.Ins.getByID(RedEnum.CHEST_LV);
        if(o){
             if(o.type!=this.chestData.boxlv){
                this.playEffect();
             }
        }
        this.saveLv();

        this.model.on(MainEvent.ValChange,this,this.onValChangeEvt);
        GuaJiModel.Ins.on(GuaJiModel.UPDATA_CD_TIME,this,this.RefreshView);
        this.oldLv = this.chestData.boxlv;
        this.RefreshView();
    }

    private onValChangeEvt(){
        this.RefreshView();
    }
    private saveLv(){
        RedUpdateModel.Ins.save(RedEnum.CHEST_LV,this.chestData.boxlv);
    }
    private updateTimeLabel(ticket:number){
        let time =  TimeUtil.timeFormatStr(ticket,true);
        // TimeUtil.timeFormatStr(ticket,true).toString()
        this._ui.subtime.text = E.LangMgr.getLang("SubTime") + ":" + time;
    }

    private endTimeHandler(){
        this._ui.subtime.text = "";
    }

    
}