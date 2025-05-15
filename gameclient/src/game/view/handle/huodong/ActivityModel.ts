import { LogSys } from "../../../../frame/log/LogSys";
import { BaseModel, IUpdateRedModel } from "../../../../frame/util/ctl/BaseModel";
import { TimeUtil } from "../../../../frame/util/TimeUtil";
import { InitConfig, PlatformConfig } from "../../../../InitConfig";
import { EMsgBoxType, EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { ActivityAction_req, ActivityChange_revc, ActivityList_revc, ActivityStatus_revc, DailyPackTimes_revc, ItemNotEnoughCode_revc, popWin_req, popWin_revc, RechargeBill_req, RechargeBill_revc, stActivity, stActivityStatus, stPopWin, stTimeCommon, VipPrivilegeInit_revc, VipPrivilegeUpdate_revc } from "../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../network/SocketMgr";
import { CombopackModel } from "../combopack/CombopackModel";
import { JiShaoChengDuoModel } from "../jishaochengduo/JiShaoChengDuoModel";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { FuncProxy } from "../main/proxy/FuncProxy";
import { ItemProxy } from "../main/proxy/ItemProxy";
import { ECellType } from "../main/vos/ECellType";
import { ItemVo } from "../main/vos/ItemVo";
import { NewAdventureModel } from "../maoxian2/NewAdventureModel";
import { EClientType } from "../sdk/ClientType";
// import { ESdkType } from "../sdk/ISdk";
import { EShopPayType, ShopProxy } from "../shop/proxy/shopProxy";
import { ActivityEvent } from "./model/ActivityEvent";
import { t_Fund_NewProxy, t_Pack_BoxEventProxy, t_Pack_BoxGrowProxy, t_Pack_ChaGrowProxy, t_Pack_ControllerProxy, t_Pack_DailyProxy, t_Purchase_PriceProxy } from "./model/ActivityProxy";
import { PackEjectProxy } from "./model/ActivityProxy2";
import { ActivityTimeModel } from "./model/ActivityTimeModel";
import { ActivityVo } from "./model/ActivityVo";
import { CompackPop } from "./model/CompackPop";
import { EActivityLingQu, EActivityType, EPopWinID } from "./model/EActivityType";
import { VipModel } from "./model/VipModel";
import { IChengZhangCfg } from "./views/BaoxiangChengZhangLibaoItemView";
import { ECardLingqu } from "./views/YueKaView";
interface IActivteCfg{
    f_id:number;
}

/**活动主模块 */
export class ActivityModel extends BaseModel{
    private static _ins:ActivityModel;
    public static get Ins(){
        if(!this._ins){
            this._ins = new ActivityModel();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        this._dataList = [];
        this._stPopWinList = [];
    }
    private _dataList:ActivityVo[] = [];
    private _stPopWinList:stPopWin[] = [];
    public isClickPop = false;
    public popUid:number;
    public timeList:stTimeCommon[];
    private _activtyTime:ActivityTimeModel = new ActivityTimeModel();
    // private isPopOpen:boolean = false;
    public gameClubData = { join: 0, like: 0, publish: 0 };
    public gameClubAuth: boolean = false; // 玩家是否授权游戏圈数据
    public initMsg(): void{
        E.MsgMgr.AddMsg(MSGID.ActivityListRevc, this.onActivityListRevc,this);
        E.MsgMgr.AddMsg(MSGID.ActivityChangeRevc, this.onActivityChangeRevc,this);
        E.MsgMgr.AddMsg(MSGID.ActivityStatus, this.onActivityStatus,this);
        E.MsgMgr.AddMsg(MSGID.RechargeBill, this.onRechargeBill,this);
        E.MsgMgr.AddMsg(MSGID.PopWinRevc,this.onPopWinRevc,this);
        E.MsgMgr.AddMsg(MSGID.ItemNotEnoughCode,this.onItemNotEnoughCode,this);
        E.MsgMgr.AddMsg(MSGID.DailyPackTimes,this.DailyPackTimes,this);
        E.MsgMgr.AddMsg(MSGID.VipPrivilegeInit,this.VipPrivilegeInit,this);
        E.MsgMgr.AddMsg(MSGID.VipPrivilegeUpdate,this.VipPrivilegeUpdate,this);
        // Laya.timer.loop(1000,this,this.onCheckHandker);
    }

    // private onCheckHandker(){
    //     let popShow = this.isPopIconShow;
    //     if(popShow != this.isPopOpen){
    //         this.isPopOpen = popShow;
    //         this.event(ActivityEvent.PopWinUpdate);
    //     }
    // }
    public get dataList(){
        return this._dataList;
    }
    private onPopWinRevc(revc:popWin_revc){

        let l = revc.datalist;

        for(let i = 0; i < l.length;i++){
            let cell = l[i];
            let _vo =    this._stPopWinList.find(item => item.uid == cell.uid /*&& item.id == cell.id*/);
            if(_vo){
                _vo.time = cell.time;
                _vo.iconHideTime = cell.iconHideTime;
                _vo.iconStatus = cell.iconStatus;
            }else{
                this._stPopWinList.push(cell);
            }
        }
        // this._stPopWinList = revc.datalist;
        // console.log(this._stPopWinList);
        // console.log(this._stPopWinList.length);
        
        if(this.isClickPop){
            ActivityModel.Ins.isClickPop = false;
            this.openPop(ActivityModel.Ins.popUid);
        }

        if(E.Debug){
            // console.log(this._stPopWinList);
            this._stPopWinList.forEach(item=>{
                console.log(JSON.stringify(item)+"- nextOpenTime:"+TimeUtil.timestamtoTime(item.time*1000));
                // console.log(item.uid,item.id,item.iconHideTime)
            });
        }
        this.event(ActivityEvent.PopWinUpdate);
    }

    /**是否有一个弹出礼包的图标显示着 */
    public get isPopIconShow(){
        // let l = this._stPopWinList;
        // let cell = l.find(item=>item.iconStatus == 1);
        // return cell!=undefined;
        if(initConfig.clienttype == EClientType.Discount){
            return false;
        }
        let arr = this.getPopShowArr();
        if(arr.length){
            return true;
        }
        return false;
        // return ActivityModel.Ins.popVo!=undefined;
    }

    /**3084 活动列表 只初始化 有可能会发多次*/
    private onActivityListRevc(revc: ActivityList_revc) {
        let l = revc.datalist;
        for (let i = 0; i < l.length; i++) {
            let _serverVo = l[i];
            let fCell = this._dataList.find(o=>o.uid == _serverVo.uid);
            if(fCell){
                fCell.vo = _serverVo;
            }else{
                let _cell:ActivityVo = new ActivityVo();
                _cell.vo = _serverVo;
                this._dataList.push(_cell);
            }
        }
        this._activtyTime.refresh();
        this.event(ActivityEvent.UpdateData);
        // this.onRedUpdate();


/*
        let vo = ActivityModel.Ins.getVo(EActivityType.t_Pack_NewPlayer);

        // if(vo && vo.getNewPlayerCfgId()){
        //     NewAdventureModel.Ins.nowCfgId = vo.getNewPlayerCfgId();
        // }else{
        //     NewAdventureModel.Ins.nowCfgId = 1;
        // }

        let nowId:number = 1;
        if(vo){
            let id = vo.getNewPlayerCfgId();
            if(id){
                nowId = id;
            }
        }
        NewAdventureModel.Ins.nowCfgId = nowId;
*/

        this.onRedUpdate();
    }

    /**3085 活动数据变化的时候推送变量3087 或者活动数据主动变化的时候*/
    public onActivityChangeRevc(revc:ActivityChange_revc){
        this.changeActivityList(revc.datalist,revc.type);
        this._activtyTime.refresh();
        this.event(ActivityEvent.UpdateData);
       

        /*
        let funcid:number = EActivityType.t_Pack_NewPlayer;
        let vo = ActivityModel.Ins.getVo(funcid);
        if(vo){
            let id = vo.getNewPlayerCfgId();
            if(id && NewAdventureModel.Ins.nowCfgId!=id){
                NewAdventureModel.Ins.nowCfgId = id;
                MainModel.Ins.funcSetRed(funcid,true);
            }
        }
        */
        MainModel.Ins.updateNewPlayerRed();

        // if(vo && vo.getNewPlayerCfgId()){
        //     if(NewAdventureModel.Ins.nowCfgId != vo.getNewPlayerCfgId()){
        //         NewAdventureModel.Ins.nowCfgId = vo.getNewPlayerCfgId();
        //         MainModel.Ins.funcSetRed(funcid,true);
        //     }
        // }
        this.onRedUpdate();
    }

    /**3086 活动状态数据列表 */
    private onActivityStatus(revc:ActivityStatus_revc){
        this.setStatus(revc);
    }

    public setStatus(revc:ActivityStatus_revc){
        for(let i = 0;i < revc.datalist.length;i++){
            let _cell:stActivityStatus = revc.datalist[i];
            this.updateStatus(_cell);
        }
        this.event(ActivityEvent.OpenCloseStatusUpdate);

    }

    /**
     * 
     * @param cell 
     * @param type 0 代表只更新某一条,1 的代表整个datalist
     */
    private changeUpdate(cell: stActivity,type:number) {
        // let findItem = this._dataList.find(item => item.isOpen && item.uid == cell.uid);
        let findItem:ActivityVo;
        for(let i = 0;i < this._dataList.length;i++){
            let o = this._dataList[i];
            if(o.isOpen && o.uid == cell.uid){
                findItem = o;
            }
        }
        if (findItem) {
            findItem.vo.starttime = cell.starttime;
            findItem.vo.endtime = cell.endtime;
            if (type == 0) {
                findItem.changeActivity(cell.datalist);
            } else {
                findItem.vo.datalist = cell.datalist;
            }
        } else {
            this.pushDataList(cell);
        }
    }

    private pushDataList(cell:stActivity){
        let index = this._dataList.findIndex(o=>o.uid==cell.uid);
        if(index>=0){
            this._dataList.splice(index,1);
        }

        let _n: ActivityVo = new ActivityVo();
        _n.vo = cell;
        this._dataList.push(_n);
    }


    private changeActivityList(l:stActivity[],type:number){
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            this.changeUpdate(cell,type);
        }
    }

    private updateStatus(_cell:stActivityStatus){
        for(let i = 0;i < this._dataList.length;i++){
            let _vo:ActivityVo = this._dataList[i];
            if(_vo.vo && _vo.vo.uid == _cell.uid ||
                _vo.statusData && _vo.statusData.uid == _cell.uid){
                _vo.statusData = _cell;
                return;
            }
        }
        let _vo:ActivityVo = new ActivityVo();
        _vo.statusData = _cell;
        this._dataList.push(_vo);
    }

    // private getActivityByUid(uid:number){
    //     for(let i = 0;i < this._dataList.length;i++){
    //         let _vo:ActivityVo = this._dataList[i];
    //         if(_vo.uid == uid){
    //             return _vo;
    //         }
    //     }
    // }

    /**
     * 是否已经领取
     */
    public isLingqu(type: number, id: number) {
        switch (type) {
            case EActivityType.BoxBorn:
                if (id <= 3) {
                    return true;
                } else {
                    return false;
                }
        }
    }

    /**
     * 成长礼包是否 是否已经解锁
     */
    public isChengZhangOrJueSeUnLock(type: number, id: number) {
        let model: MainModel = MainModel.Ins;

        switch (type) {
            case EActivityType.BoxBorn:
                //宝箱等级
                let boxLv: number = model.mRoleData.boxlv;
                let bl = t_Pack_BoxGrowProxy.Ins.List;

                for (let i: number = 0; i < bl.length; i++) {
                    let cfg: IChengZhangCfg = bl[i];
                    if (boxLv >= cfg.f_Level) {
                        return true;
                    }
                }
                return false;

            case EActivityType.RoleBorn:
                //角色成长
                let lv: number = model.mRoleData.lv;

                let l = t_Pack_ChaGrowProxy.Ins.List;
                for (let i: number = 0; i < l.length; i++) {
                    let cfg: IChengZhangCfg = l[i];
                    if (lv >= cfg.f_Level) {
                        return true;
                    }
                }
                return false;
        }
    }

    /**
     * 三国集市购买
     * @param uid 活动流水号
     * @param id 商品id
     */
    // public markLingqu(uid:number,id:number){
    // }

    // public getMark(){
    //     for(let i = 0;i < this._dataList.length;i++){
    //         let _vo:ActivityVo = this._dataList[i];
    //         if(_vo.uid == uid){
    //             return _vo;
    //         }
    //     }
    // }

    /**获取活动数据 */
    public getVo(id:EActivityType):ActivityVo{
        for(let i = 0;i < this._dataList.length;i++){
            let _vo:ActivityVo = this._dataList[i];
            if(_vo.isOpen && _vo.packId == id){
                return _vo;
            }
        }
    }

    /**获取活动的p4 */
    public getVoByPackP4(packid:number,p4:number):ActivityVo{
        for(let i = 0;i < this._dataList.length;i++){
            let _vo:ActivityVo = this._dataList[i];
            if(_vo.isOpen && _vo.packId == packid && parseInt(_vo.cfg.f_p4) == p4){
                return _vo;
            }
        }
    }

    public getVoByP2(id:EActivityType,f_p2:number):ActivityVo{
        for(let i = 0;i < this._dataList.length;i++){
            let _vo:ActivityVo = this._dataList[i];
            if(_vo.isOpen && _vo.packId == id && parseInt(_vo.cfg.f_p2) == f_p2){
                return _vo;
            }
        }
    }

    public getByUid(uid:number){
        let vo = this._dataList.find(item=>item.vo && item.uid == uid);
        return vo;
    }

    /**
     * 领取,三国集市的购买等等
     * @param uid 
     * @param id 
     */
    public lingQu(uid:number,id:number){
        let req:ActivityAction_req = new ActivityAction_req();
        req.uid = uid;
        req.id = id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onVoucherBuyHandler(cfg:Configs.t_Purchase_Price_dat,id:number){
        let val = ShopProxy.Ins.convertReal(cfg);
        if(MainModel.Ins.isItemEnoughSt(`${id}-${val}`)){
            this.reqBill(cfg.f_id);
        }else{
            let itemCfg = ItemProxy.Ins.getCfg(id);
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.getLang("CNY_tips",itemCfg.f_name),new Laya.Handler(this,this.onVoucherMsgHandler));
        }
    }

    private onVoucherMsgHandler(){
        MainModel.Ins.openGold()
    }

    /**充值 */
    public recharge(id:number){
        let cfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(id);
        if(cfg.f_isVoucher == EShopPayType.Voucher){
            let voucherID:number = ECellType.Voucher;
            let itemName = ItemProxy.Ins.getCfg(voucherID).f_name;
            let val = ShopProxy.Ins.convertReal(cfg);
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.getLang("askBuy",val+itemName),new Laya.Handler(this,this.onVoucherBuyHandler,[cfg,voucherID]));
        }else{
            // if(HrefUtils.getVal("recharge") == 1){
            // if(E.sdk.type == ESdkType.Null){
            if(initConfig.platform == PlatformConfig.Dev){
                // ActivityModel.Ins.reqBill(id);
                E.ViewMgr.Open(EViewType.ChongZhiTest,null,id);
            }else{
                this.reqBill(id);
            }
        }
    }
    /**请求订单 */
    public reqBill(id:number){
        let req:RechargeBill_req = new RechargeBill_req();
        req.id = id;
        SocketMgr.Ins.SendMessageBin(req);
    }
    private onRechargeBill(revc:RechargeBill_revc){
        // this.event(ActivityEvent.RechargeBillUpdate,revc.val);
        let cfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(revc.id);
        if(cfg.f_isVoucher == EShopPayType.Normal){
            E.sdk.recharge(revc.val,cfg);
        }
    }

    public buySomething(vo:ActivityVo,f_id:number,_needItem:ItemVo){
        if(vo){
            if(_needItem.count == 0){
                this.okBuyHandler(vo,f_id);
            }else{
                let obj = new Laya.Handler(this,this.okBuyHandler,[vo,f_id,_needItem]);
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.LangMgr.getLang("UseItem", _needItem.cntName),obj);
            }
        }
    }

    private okBuyHandler(_activityVo:ActivityVo,f_id:number,_needItem?:ItemVo){
        if(_needItem){
            // ActivityModel.Ins.useGold(_needItem.count);
        }
        ActivityModel.Ins.lingQu(_activityVo.uid,f_id);
    }

    // /**各类资源不足时候弹出 */
    // public popWin(id:EPopWinID){
    //     let vo:ActivityVo =  this._dataList.find(cell => cell.cfg.f_packid == EActivityType.PopWinEject && cell.cfg.f_p4 == id.toString());
    //     if (vo) {
    //         let req = new popWin_req();
    //         req.uid = vo.uid;//EActivityType.PopWinEject;
    //         // req.id = id;
    //         SocketMgr.Ins.SendMessageBin(req);
    //     }
    // }

    /**弹出的icon的数据 */
    public get popVo(){
        let serverTime:number = TimeUtil.serverTime;
        let vo = this._stPopWinList.find(item=>item.iconStatus == 1 && item.iconHideTime > serverTime);
        if(vo){
            return vo;
        }
    }

    private sendPop(vo:ActivityVo){
        ActivityModel.Ins.isClickPop = true;
        ActivityModel.Ins.popUid = vo.uid;
        let req = new popWin_req();
        req.uid = vo.uid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public onPop(uid: number, ui: Laya.Image) {
        const popArr = ActivityModel.Ins.getPopShowArr();
        if (popArr.find(o => o.uid === uid)) {
            ui.visible = true;
        } else {
            ui.visible = false;
        }
    }

    /**使用元宝 */
    // public useGold(needGold:number){
    //     let have = MainModel.Ins.mRoleData.gold;
    //     if(have < needGold){
    //         this.popWin(EPopWinID.GOLD);
    //     }
    // }

    /**道具不足 */
    private onItemNotEnoughCode(revc:ItemNotEnoughCode_revc){
        let id:number = revc.id;
        if(id){
            let cfg:Configs.t_Item_dat = ItemProxy.Ins.getCfg(id);
            let str:string = `${main.itemName(cfg.f_name)}${E.getLang("NotEnough")}`;
            E.ViewMgr.ShowMidError(str);
            MainModel.Ins.notEnough.check(cfg.f_itemid);
            this.checkItem(id);
        }else{
            LogSys.Warn(`onItemNotEnoughCode id is ${id}`);
        }
    }

    private DailyPackTimes(value:DailyPackTimes_revc){
        ActivityModel.Ins.timeList = value.dataList;
    }

    private setVipDot() {
        if (VipModel.Ins.isVipRed()) {
            MainModel.Ins.funcSetRed(EFuncDef.Vip, true);
        }else {
            MainModel.Ins.funcSetRed(EFuncDef.Vip, false);
        }
    }

    private VipPrivilegeInit(value:VipPrivilegeInit_revc){
        VipModel.Ins.vipFid = value.fid;
        VipModel.Ins.djqNum = value.num;
        VipModel.Ins.vipList = value.datalist;
        this.setVipDot();
    }

    private VipPrivilegeUpdate(value:VipPrivilegeUpdate_revc){
        VipModel.Ins.vipFid = value.fid;
        VipModel.Ins.djqNum = value.num;
        VipModel.Ins.vipList = value.datalist;
        VipModel.Ins.event(VipModel.VIP_UPDATA);
        this.onRedUpdate();
        this.setVipDot();
    }

    public checkItem(itemId:number){
        let type:EPopWinID;
        switch(itemId){
            case ECellType.GOLD:
                type = EPopWinID.GOLD;
                break;
            // case ECellType.Forage:
            //     type = EPopWinID.HorseFood;
            //     break;
            case ECellType.COPPER_MONEY:
                type = EPopWinID.Money;
                break;
            case ECellType.TongXingZheng:
                type = EPopWinID.TXZ;
                break;
            case ECellType.QiYun:
                type = EPopWinID.QFHY;
                break;
            case ECellType.DaoQi:
                type = EPopWinID.FYSP;
                break;
        }

        // if(!type){
        //     let cfg:Configs.t_Item_dat = ItemProxy.Ins.getCfg(itemId);
        //     if(cfg.f_sub_type == EItemSubType.Plume){
        //         type = EPopWinID.WhitePlume;
        //     }
        // }

        if(type){
            this.runEnough(type);
        }
    }

    // private witchOneIsShow(){
    //     let cell = this._stPopWinList.find(item=>item.iconStatus == 1);
    //     return cell;
    // }

    public runEnough(eject_f_id:number){
        if(!MainModel.Ins.isCanRecharge()){
            return;
        }
        if(MainModel.Ins.mRoleData.lv < 35){
            return;
        }
        
        // let serverTime = TimeUtil.serverTime;
        // let needOpen:boolean = false;
        let vo:ActivityVo =  this._dataList.find(cell => cell.cfg.f_packid == EActivityType.PopWinEject && cell.eject_f_id == eject_f_id.toString())
        // let popVo = ActivityModel.Ins.popVo;

        if(vo){
            // let witchVo = this.witchOneIsShow();
            // let fvo = this._stPopWinList.find(item=>item.uid == vo.uid /*&& item.id == itemId*/);
            // if(fvo){
            //     if( fvo.time > serverTime){

            //     }else{
            //         needOpen = true;
            //     }
            // }else{
            //     needOpen = true;
            // }
            // if(needOpen){
            //     if(fvo && fvo.uid && witchVo && witchVo.uid != fvo.uid){
            //         needOpen = false;
            //     }else if(popVo && popVo.uid!=vo.uid){
            //         needOpen = false;
            //     }
            // }

            // if (popVo && popVo.uid != vo.uid) {
            //     if (E.Debug) {
            //         LogSys.Log(vo.toString() + "eject_f_id:" + vo.eject_f_id + " uid不等不弹出");
            //     }
            // } else {

            
            let v = this._stPopWinList.find(o => o.uid === vo.uid);
            if(v){
                if (TimeUtil.serverTime > v.time ) {
                    this.sendPop(vo);
                }
            }else{
                this.sendPop(vo);
            }
        }
    }

    private openPop(uid){
        if(this.hasPopUid(uid)){
            this.diamondEject(uid);
        }
    }

    public openPopWin() {
        this.diamondEject();
    }
    diamondEject(uid=null){
        if(initConfig.clienttype == EClientType.Discount){
            return;
        }
        let popArr = this.getPopShowArr();
        if(popArr.length == 0){
            return;
        }
        E.ViewMgr.Open(EViewType.DiamondEject,null,uid);
    }
    /**弹窗活动的小icon消失的时间 */
    public getPopWinHideTime(uid:number){
        let cell = this._stPopWinList.find(item=>item.uid == uid);
        if(cell){
            return cell.iconHideTime;
        }
        // let vo = this._dataList.find(item=>item.uid == uid);
        // if(vo){
        //     return TimeUtil.serverTime + vo.eject_hideTime;
        // }
        return 0;
    }

    private hasPopUid(uid:number){
        let cell = this._stPopWinList.find(item=>item.uid == uid);
        return cell != undefined;
    }

    /**根据活动的packid判断活动是否开启 */
    public isOpenByPackid(_l: number[] | number) {
        let packids;
        if (typeof (_l) == "number") {
            packids = [_l];
        } else {
            packids = _l;
        }
        for (let i = 0; i < packids.length; i++) {
            let id = packids[i];
            let cell = this._dataList.find(item => item.vo && item.cfg && item.cfg.f_packid == id && item.isOpen);
            if (cell) {
                return true;
            }
        }
    }

    public openFunc(type:EActivityType,uiType:EViewType,param1=null){
        if(this.isOpenByPackid(type)){
            E.ViewMgr.Open(uiType,null,param1);
        }else{
            E.ViewMgr.ShowMidError(E.LangMgr.getLang("FuncNotOpen"));
        }
    }

    public requestByUid(uid:number){
        // let req = new ActivityGetInfo_req();
        // req.uid = uid;
        // SocketMgr.Ins.SendMessageBin(req);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**活动是否有红点*/
    public hasRed(type:EActivityType){
        let _vo:ActivityVo = this._dataList.find(cell=>cell.vo && cell.cfg && cell.cfg.f_packid == type);
        if(_vo){
            switch (_vo.cfg.f_packid) {
                //每日
                case EActivityType.EveryDayBorn:
                    if (this.hasDailyListRed(_vo)) {
                        return true;
                    }
                    break;
                //折扣商店周卡
                case EActivityType.ZKShopWeek:
                    if (MainModel.Ins.isZKWCRedTip()) {
                        return true;
                    }
                    break;
                
                // case EActivityType.BoxBorn:
                // case EActivityType.RoleBorn:
                //     if (this.hasBoxBorn(_vo.cfg.f_packid, _vo)) {
                //         return true;
                //     }
                //     break;
                    
                //月卡,年卡
                case EActivityType.t_Pack_MonthAndYear_Card:
                    if( MainModel.Ins.allLife && MainModel.Ins.allLife.val == ECardLingqu.CanGet ||
                        MainModel.Ins.monthCard && MainModel.Ins.monthCard.val == ECardLingqu.CanGet)
                    {
                        return true;
                    }
                    break;
                
                //特权卡
                case EActivityType.TeQuanKa:
                    if (MainModel.Ins.teQuanKaCard && MainModel.Ins.teQuanKaCard.val == ECardLingqu.CanGet) {
                        return true;
                    }
                    break;
                //紧急招募令
                case EActivityType.JJZML:
                    if (_vo.hasKeLingQu()) {
                        return true;
                    }
                    break;
                case EActivityType.VIP:
                    if (VipModel.Ins.isVipRed()) {
                        return true;
                    }
                    break;
            }
        }
        return false;
    }

    private jijingHasRed() {
        for (let i = 0; i < this._dataList.length; i++) {
            let _vo: ActivityVo = this._dataList[i];
            if (_vo && _vo.vo && _vo.cfg) {
                switch (_vo.cfg.f_packid) {
                    case EActivityType.BoxBorn:
                    case EActivityType.RoleBorn:
                    case EActivityType.ZuoqiChengZhang:
                    case EActivityType.LingchongChengZhang:
                    case EActivityType.BaoshiChengZhang:
                        if (this.hasBoxBorn(_vo.cfg.f_packid, _vo)) {
                            return true;
                        }
                        break;
                    case EActivityType.t_Pack_MonthAndYear_Card:
                        // return this.hasRed(EActivityType.t_Pack_MonthAndYear_Card);
                        return false;
                    case EActivityType.TeQuanKa:
                        return this.hasRed(EActivityType.TeQuanKa);
                }
            }
        }
    }

    /**更新礼包 */
    public updatePackage(){
        MainModel.Ins.funcSetRed(EFuncDef.JiJing, this.jijingHasRed());
        // MainModel.Ins.funcSetRed(EFuncDef.LibaoZi, this.hasRed(EActivityType.t_Pack_MonthAndYear_Card) || this.hasRed(EActivityType.TeQuanKa));
    }

    private onUpdateRedLater(){
        this.updatePackage();
        MainModel.Ins.updateBoxOpenRed();
         
        let l = E.MsgMgr.LabordayList;
        l = l.concat(JiShaoChengDuoModel.Ins);
        for(let i = 0;i < l.length;i++){
            let model:BaseModel = l[i];
            model.updateRed();
        }
        MainModel.Ins.updateGemRed();//宝石红点更新
        MainModel.Ins.funcSetRed(EFuncDef.JJZML,this.hasRed(EActivityType.JJZML));//紧急招募令红点跟更新
        MainModel.Ins.funcSetRed(EFuncDef.EveryDayPackage,this.everyDayPackageRedTip());//每日礼包红点更新
        // NewPlayerFeastModel.Ins.updateRed();
        CombopackModel.Ins.updateRed();
        MainModel.Ins.event(MainEvent.NewPlayerFeastRed_Update);
    }

    private everyDayPackageRedTip(){
        let bo = this.hasRed(EActivityType.EveryDayBorn);
        let bo1 = this.hasRed(EActivityType.ZKShopWeek);
        let bo2 = this.hasRed(EActivityType.t_Pack_MonthAndYear_Card);
        let bo3 = this.hasRed(EActivityType.VIP);

        if(bo || bo1 || bo2 || bo3){
            return true;
        }
        return false;
    }

    private onRedUpdate() {
       Laya.timer.callLater(this,this.onUpdateRedLater);
    }
    //#region 每日礼包

    /**每日礼包 是否有红点 */
    public hasDailyFreeRed(cfg: Configs.t_Pack_Daily_dat, _vo: ActivityVo) {
        let hasRed:boolean = false;
        let free: boolean = false;

        if (cfg.f_PurchaseID == 0) {
            //免费
            free = true;
        }
        let _serverTime: number = 0;
        if (_vo) {
            _serverTime = _vo.getParam1(cfg.f_id);
        }
        if (_serverTime >= cfg.f_BuyTimes) {
            // this.freeCtl.mouseEnable = false;
            // this.freeCtl.gray = true;
        } else {
            // this.freeCtl.mouseEnable = true;
            // this.freeCtl.gray = false;
            if (free) {
                //    DotManager.addDot(this.freeCtl.skin);//免费可以领取
                hasRed = true;
            }
        }

        return hasRed;
    }

    /**每日礼包 */
    public hasDailyListRed(_vo: ActivityVo) {
        if (_vo) {
            let l1 = t_Pack_DailyProxy.Ins.List;
            for (let i = 0; i < l1.length; i++) {
                let cfg = l1[i];
                if (this.hasDailyFreeRed(cfg, _vo)) {
                    return true;
                }
            }
        }
        return false;
    }
    //#endregion

    //#region 宝箱成长(角色成长)礼包
    public hasBoxBorn(activityType:EActivityType,_vo: ActivityVo){
        let _list;
        switch (activityType) {
            case EActivityType.BoxBorn:
                _list = t_Pack_BoxGrowProxy.Ins.List;
                break;
            case EActivityType.RoleBorn:
                _list = t_Pack_ChaGrowProxy.Ins.List;
                break;
            case EActivityType.ZuoqiChengZhang:
                _list = t_Fund_NewProxy.Ins.getCfgByType(1);
                break;
            case EActivityType.LingchongChengZhang:
                _list = t_Fund_NewProxy.Ins.getCfgByType(2);
                break;
            case EActivityType.BaoshiChengZhang:
                _list = t_Fund_NewProxy.Ins.getCfgByType(3);
                break;
        }
        if (_list && this.bornHasLingqu(_list, _vo)) {
            return true;
        }
    }
    /**宝箱,角色通用逻辑 */
    public bornHasLingqu(curCfgList:IActivteCfg[],_vo: ActivityVo){
        if(_vo){
            let l = curCfgList;
            for(let i = 0;i < l.length;i++){
                let cfg:IActivteCfg = l[i];
                let _status = _vo.getParam1(cfg.f_id);
                if(_status ==  EActivityLingQu.KeLingQu ||
                    _status == EActivityLingQu.ChongZhiWeiLingQu ||
                    _status == EActivityLingQu.ChongZhiAllNotLing
                    ){
                        return true;
                    }
            }
        }
        return false;
    }
    //#endregion

    //#region 开箱大吉
    public checkOpenBoxRed(){
        let _activityVo = this.getVo(EActivityType.KaiXaingDaji);

        let l = t_Pack_BoxEventProxy.Ins.List;
            // t_Pack_BoxEventProxy
        for(let i = 0;i < l.length;i++){
            let _cfg: Configs.t_Pack_BoxEvent_dat = l[i];
            if (_cfg.f_BoxUse) {
                // this.nameTf.text = E.LangMgr.getLang("KaiXiang2", _cfg.f_BoxUse); //使用{0}个宝箱    
                // this.setProgress(MainModel.Ins.boxUsedCount,_cfg.f_BoxUse);
            } else {
                // this.nameTf.text = E.LangMgr.getLang("KaiXiang1", _cfg.f_BoxLevel); //宝箱达到{0}级
                // this.setLvProgress(MainModel.Ins.mRoleData.boxlv,_cfg.f_BoxLevel);
            }
            
            let _status = EActivityLingQu.Nothing;
            if(_activityVo){
                _status = _activityVo.getParam1(_cfg.f_id);
            }
            switch(_status){
                case EActivityLingQu.Nothing:
                    break;
    
                case EActivityLingQu.KeLingQu:
                    return true;
    
                case EActivityLingQu.YiLingQu:
                    break;
            }
        }
        return false;
    }
    //#endregion
    compackPop:CompackPop = new CompackPop();
    private _xinRenTime:number = 0;
    public showXinRenView(){
        let funcid:number = MainModel.Ins.newPay.newPlayerfuncId;//EFuncDef.NewPlayer;
        let cfg = FuncProxy.Ins.getCfgByFuncId(funcid);
        if(MainModel.Ins.isVerify(cfg)){
            return;
        }
        if(!MainModel.Ins.isOpenByFuncId(funcid.toString())){
            return;
        }
        let pcfg = t_Pack_ControllerProxy.Ins.getCfgByPackidId(MainModel.Ins.newPay.activityType);
        if(MainModel.Ins.mRoleData.lv > parseInt(pcfg.f_p3)){
            return;
        }
        let time:number = parseInt(pcfg.f_p2) * 1000;
        if(Laya.timer.currTimer - this._xinRenTime < time){
            return;
        }
        this._xinRenTime = Laya.timer.currTimer;
        this.compackPop.start();
    }

    public getPopShowIndex(){
        let arr = this.getPopShowArr();
        let num = 99999;
        let index:number = -1;
        for(let i:number=0;i<arr.length;i++){
            let vo =  ActivityModel.Ins.getByUid(arr[i].uid);
            let cfg = PackEjectProxy.Ins.getCfgByFid(parseInt(vo.eject_f_id));
            if(cfg.f_priority < num){
                num = cfg.f_priority;
                index = i;
            }
        }
        return index;
    }

    public getPopShowArr(): stPopWin[]{
        let arr: stPopWin[] = [];
        for(let i:number=0;i<this._stPopWinList.length;i++){
            if(this._stPopWinList[i].iconStatus == 1){
                arr.push(this._stPopWinList[i]);
            }
        }
        return arr;
    }
}