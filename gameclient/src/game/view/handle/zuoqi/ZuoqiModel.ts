import { LogSys } from "../../../../frame/log/LogSys";
import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import {TimeUtil} from "../../../../frame/util/TimeUtil";
import { EMsgBoxType, EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { GetRide_revc, MountRefinementLock_revc, MountRefinement_revc, MountReturnPreView_revc, MountReturn_revc, MountShopGoodsInit_revc, MountShopGoods_revc, MountShop_revc, RideInfo_revc, RideLv_req, RideLv_revc, RideMissionData_revc, RideMissionDel_req, RideMissionList_req, RideMissionList_revc, RideMissionTimeEnd_req, RideMission_req, RideMission_revc, RideOwnerCnt_revc, RideOwnerInfo_revc, RideQua_req, RideQua_revc, RideStorgeUp_revc, RideUpdate_req, stCellValue, stEquipItem, stMountShop, stRewardRideVo, stRideMissionVo, stRideReq, stRideVo } from "../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../network/SocketMgr";
import {DotManager} from "../common/DotManager";
import { System_RefreshTimeProxy } from "../huodong/model/ActivityProxy";
import { EFuncDef } from "../main/model/EFuncDef";
import { ItemViewFactory } from "../main/model/ItemViewFactory";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { ECellType } from "../main/vos/ECellType";
import { ItemVo } from "../main/vos/ItemVo";
import { EClientType } from "../sdk/ClientType";
import { ZuoQiTJView } from "./views/tujian/ZuoQiTJView";
import { ZuoqiBackView } from "./views/ZuoqiBackView";
import { ZuoQiBuyShopView } from "./views/ZuoQiBuyShopView";
import { ZuoQiFangPaiView } from "./views/ZuoQiFangPaiView";
import { ZuoQiFangPaiView1 } from "./views/ZuoQiFangPaiView1";
import { ZuoQiShopView } from "./views/ZuoQiShopView";
import { IZuoqiTipsData } from "./views/ZuoQiTipsView";
import { ZuoqiWashView } from "./views/ZuoqiWashView";
import { ZuoqiChouQuResult, ZuoQiLvResult, ZuoQiQuaResult } from "./vos/EZuoQi";
import { RideMssionVo } from "./vos/RideMssionVo";
import { ZuoQiEvent } from "./vos/ZuoQiEvent";
import { MountConfigProxy, Mount_GachaProxy, Mount_ListProxy, Mount_MissionProxy, Mount_StrogeProxy, t_Mount_UpGrade, t_Mount_UpStar } from "./vos/ZuoqiProxy";
import { ZuoqiVo } from "./vos/ZuoqiVo";
// import { ZuoQiTimeCtl } from "./ZuoQiTimeCtl";
interface IUseItemTest{
    itemId:number;
    useCount:number;
}
export class ZuoQiModel extends BaseModel{
    public readonly cards:string[] = [`kamianbai`, `kamianlv`, `kamianlan`,  `kamianzi`,`kamiancheng`,`kamianhong`,`kamianlanshenlan`];
    private static _ins:ZuoQiModel;
    public static get Ins():ZuoQiModel{
        if(!this._ins){
            this._ins = new ZuoQiModel();
        }
        return this._ins;
    }

    public tjSelectId:number;
    public slstate:number;

    public shopList:stMountShop[];

    public rideVo:ZuoqiVo = new ZuoqiVo();
    public rideVoList:ZuoqiVo[] = [];

    public _bo:boolean = false;
    public _itemID:number;

    /** 坐骑列表*/
    private mlist:stRideVo[];
    private missionList:number[] = [];//坐骑解锁的地址列表
    /**单抽坐骑已经抽取的次数*/
    public mExtractTime:number = 0;
    public foodTotal:number = 0;//粮仓库总值
    // public runMissionList:stRideMissionVo[] = [];//运输中的任务
    public runRideMissionList:RideMssionVo[] = [];

    // public isOpen:boolean = false;//功能是否开放
    public food:number = 0;//粮草值
    public hasRide:boolean = false;//是骑乘着坐骑
    public missionReward:stCellValue[] = [];
    // private zuoqiCtl:ZuoQiTimeCtl = new ZuoQiTimeCtl();
    public preRewardList:stCellValue[] = [];
    public rideCacheList:stRewardRideVo[][] = [];
    public rideCacheList1:stRewardRideVo[][] = [];
    /**坐骑升级计算器 */
    /**翻牌是否打开中 */
    // public bCardShow:boolean = false;
    /**是否有坐骑 */
    public get hasHorse(){
        return this.rideVo.rideId !=0;
    }

    public initMsg(){

        this.Reg(new ZuoQiTJView(EViewType.zuoqitujian));
        this.Reg(new ZuoqiBackView(EViewType.BackHome));
        this.Reg(new ZuoqiWashView(EViewType.MountWash));
        this.Reg(new ZuoQiShopView(EViewType.ZuoQiShopView));
        this.Reg(new ZuoQiBuyShopView(EViewType.ZuoQiBuyShopView));
        this.Reg(new ZuoQiFangPaiView1(EViewType.ZuoQiFangPaiView1));

        E.MsgMgr.AddMsg(MSGID.RideInfoRevc, this.onRideInfoRevc,this);
        E.MsgMgr.AddMsg(MSGID.GetRideRevc,this.onGetRideRevc,this);
        E.MsgMgr.AddMsg(MSGID.RideLvUpRevc,this.onRideLvUpRevc,this);
        E.MsgMgr.AddMsg(MSGID.RideQuaRevc,this.onRideQuaUpRevc,this);
        E.MsgMgr.AddMsg(MSGID.RideOwnerInfo,this.onRideOwnerInfo,this);
        E.MsgMgr.AddMsg(MSGID.RideOwnerCnt,this.onRideOwnerCnt,this);
        E.MsgMgr.AddMsg(MSGID.RideStorgeUpRevc,this.onRideStorgeUpRevc,this);
        E.MsgMgr.AddMsg(MSGID.RideMissionListRevc,this.onRideMissionListRevc,this);
        E.MsgMgr.AddMsg(MSGID.RideMissionRevc,this.onRideMissionRevc,this);
        E.MsgMgr.AddMsg(MSGID.RideMissionDataRevc,this.onRideMissionDataRevc,this);
        E.MsgMgr.AddMsg(MSGID.MountReturnPreView,this.onMountReturnPreView,this);
        E.MsgMgr.AddMsg(MSGID.MountReturn,this.onMountReturn,this);
        E.MsgMgr.AddMsg(MSGID.MountRefinementLock,this.onMountRefinementLock,this);
        E.MsgMgr.AddMsg(MSGID.MountRefinement,this.onMountRefinement,this);
        E.MsgMgr.AddMsg(MSGID.MountShopGoodsInit,this.MountShopGoodsInit,this);
        E.MsgMgr.AddMsg(MSGID.MountShop,this.MountShop,this);
        E.MsgMgr.AddMsg(MSGID.MountShopGoods,this.MountShopGoods,this);
    }

    public getMountVoById(moundId:number):ZuoqiVo{
        for(let i = 0;i < this.rideVoList.length;i++){
            let cell = this.rideVoList[i];
            if(cell.rideId == moundId){
                return cell;
            }
        }
        if(this.rideVo.rideId == moundId){
            return this.rideVo;
        }
    }

    /**可以升多少级 */
    calLv(_vo: ZuoqiVo){
        let qua: number = _vo.quality;//品质
        let cfg: Configs.t_Mount_Config_dat = MountConfigProxy.Ins.getByQualityID(qua);
        if(!cfg){
            return 0;
        }
        let lv: number = _vo.lv;

        let testLv:number = 0;

        let list: IUseItemTest[] = [];
        while (1) {
            let n = Math.floor(lv / cfg.f_plaidAmount);
            if (lv >= cfg.f_MaxLevel) {
                // is Max
                // _result.isMax = true;
                // _result.status = ZuoQiLvResult.MAX;
                break;
            } else {
                let a = cfg.f_UpgardeInc.split("-")[1];
                let itemid = parseInt(cfg.f_UpgradeInit.split("-")[0]);
                let s = cfg.f_UpgradeInit.split("-")[1];
                let need = parseInt(s) + parseInt(a) * n;

                let useCount: number = 0;
                let cell = list.find(o => o.itemId == itemid);
                if (cell) {
                    useCount = cell.useCount;
                }
                let have = MainModel.Ins.mRoleData.getVal(itemid);
                // _result.needItemid = parseInt(itemid);
                // _result.need = need;
                // _result.have = have;
                have -= useCount;
                if (need > have) {
                    // _result.status = ZuoQiLvResult.NOT_ENOUGH;
                    break;
                } else {
                    if (cell) {
                        cell.useCount += need;
                    } else {
                        let o: IUseItemTest = {} as IUseItemTest;
                        o.useCount = need;
                        o.itemId = itemid;
                        list.push(o);
                    }
                    let nnn = parseInt(System_RefreshTimeProxy.Ins.getVal(94));
                    if (nnn == 1) {
                        if (lv + 1 > MainModel.Ins.mRoleData.lv) {
                            break;
                        }
                    }
                    lv++;
                    //可以升级
                    testLv++;
                }
            }
        }
        return testLv;
    }

    /** 洗髓的新属性*/
    private onMountRefinement(revc:MountRefinement_revc){
        let vo = this.getMountVoById(revc.id);
        vo.washList = revc.refinements;
        this.event(ZuoQiEvent.MountRefinement);
    }

    private MountShopGoodsInit(value:MountShopGoodsInit_revc){
        this.shopList = value.dataList;
        this.event(ZuoQiEvent.UPDATA_SHOP_VIEW);
    }

    private MountShop(value:MountShop_revc){
        E.ViewMgr.Close(EViewType.ZuoQiBuyShopView);
    }

    private MountShopGoods(value:MountShopGoods_revc){
        for(let i:number=0;i<value.dataList.length;i++){
            let index = this.shopList.findIndex(ele => ele.id == value.dataList[i].id);
            if(index != -1){
                this.shopList[index] = value.dataList[i];
            }
        }
        this.event(ZuoQiEvent.UPDATA_SHOP_VIEW);
    }

    private onMountRefinementLock(revc:MountRefinementLock_revc){
        let vo = this.getMountVoById(revc.id);
        vo.washCanLock = revc.canLock;
        // LogSys.Log("是否可锁..."+vo.washCanLock);
        this.event(ZuoQiEvent.MountRefinement);
    }
    private onMountReturnPreView(revc:MountReturnPreView_revc) {
        this.preRewardList = revc.rewardList;
        this.event(ZuoQiEvent.ReturnPreView);
    }
    private onMountReturn(revc:MountReturn_revc){
        this.event(ZuoQiEvent.ReturnMountSucceed);
    }
    public onInitCallBack():void{
        this.isOpen = false;
        this.rideVo.reset();
        // this.rideVo.equipVo = null;
        this.mExtractTime = 0;
        this.food = 0;
        this.foodTotal = 0;
    }

    /**扩容需要的材料 */
    public get mStorageUpgradePrice() {
        let str = Mount_StrogeProxy.Ins.getCfg(1).f_StorageUpgradePrice;
        let itemVo:ItemVo = ItemViewFactory.convertItemList(str)[0];
        return itemVo;
    }

    /**是否有免费次数抽卡 */
    public get hasFreeTime(){
        return this.mExtractTime == 0;
    }

    /**粮草满了没有 */
    public get isFoodFull(){
        return this.food >= this.foodTotal;
    }

    public get hasRed(){
        return this.hasFreeTime || this.isFoodFull;
    }

    public updateRed() {
        let _red:boolean = false;
        if (TaskModel.Ins.isFuncOpen(EFuncDef.Ride)) {
            if (this.hasRed) {
                _red = true;
                // DotManager.addMainDot("icon2", -20, -5);
            } else {
                // DotManager.remMainDot("icon2");
            }
        }else{
            // DotManager.remMainDot("icon2");
        }
        if(_red){
            DotManager.addMainDot("icon2", -20, -5);
        }else{
            DotManager.remMainDot("icon2");
        }
        this.event(ZuoQiEvent.RedUpdate);
    }

    private onRideMissionDataRevc(revc:RideMissionData_revc){
        this.food = 0;//this.getCellVal(revc.itemList,ECellType.Forage);
        let l = [];
        let itemList = revc.itemList;
        for(let i = 0;i < itemList.length;i++){
            let _cell = itemList[i];
            if(_cell.id != ECellType.Forage){
                l.push(_cell);
            }else{
                this.food = _cell.count;
            }
        }
        this.missionReward = l;
        this.updateRed();
        this.event(ZuoQiEvent.StorgeUpdate);
    }
    
    /**坐骑解锁的地址列表*/
    private onRideMissionListRevc(revc:RideMissionList_revc){
        this.missionList = revc.rideList;
        this.event(ZuoQiEvent.DispathMission);
    }
    private printRideInfo(l:stRideMissionVo[]){
        if(E.Debug){
            let curTime = TimeUtil.serverTime;
            let s = "\n";
            // let l = this.runRideMissionList;
            for(let i = 0;i < l.length;i++){
                let cell = l[i];
                let sub = cell.time - curTime;
                s += "index:" + i + " mission:" + cell.id + " rideId:" + cell.rideId + " endtime:" + TimeUtil.timestamtoTime(cell.time * 1000) + ",运输任务剩余时间:" + sub + "\n";
            }
            LogSys.Log(s);
        }
    }

    /**运输中的任务 */
    private onRideMissionRevc(revc:RideMission_revc){

        // this.runMissionList = revc.rideList;


        // for(let i = 0;i < revc.rideList.length;i++){
        //     let cell = revc.rideList[i];
        //     let e = this.runMissionList.find(o=>o.id == cell.id);
        //     if(e){
        //         this.runMissionList[i] = cell;
        //     }else{
        //         this.runMissionList.push(cell);
        //     }
        // }

        //更新所有的数据
        this.runRideMissionList = [];
        for(let i = 0;i < revc.rideList.length;i++){
            let cell = revc.rideList[i];
            let e = this.runRideMissionList.find(o=>o.mssionId == cell.id);
            if(e){
                e.setData(cell);
            }else{
                let v:RideMssionVo = new RideMssionVo();
                v.time = cell.time;
                v.mssionId = cell.id;
                v.rideIds.push(cell.rideId);
                this.runRideMissionList.push(v);
            }
        }

        /////////////////////////////////////////////////////////////////
        this.printRideInfo(revc.rideList);

        // this.zuoqiCtl.start(this.runMissionList);
        this.event(ZuoQiEvent.DispathMission);
    }

    public get serverTransitReward(){
        let str:string = "";
        if(this.missionReward.length > 0){
            for(let i = 0;i < this.missionReward.length;i++){
                let cell:stCellValue = this.missionReward[i];
                if(cell.count > 0){
                    str+=`${cell.id}-${cell.count}|`;
                }
            }
            str = str.substr(0,str.length-1);
        }
        return str;
    }

    /**运输奖励 */
    public getTransitReward(){
        if(this.runRideMissionList){
            let l:number[] = [];
            for(let i = 0 ;i < this.runRideMissionList.length;i++){
                let id = this.runRideMissionList[i].mssionId;
                if(l.indexOf(id)==-1){
                    l.push(id);
                }
            }
            let ls:string[] = [];
            for(let i = 0;i < l.length;i++){
                let cfg:Configs.t_Mount_Mission_dat = Mount_MissionProxy.Ins.GetDataById(l[i]);
                ls.push(cfg.f_PlaceReward);
            }
            return ItemViewFactory.mergeItems(ls);
        }
        return "";
    }

    /**
     * 当前的运输任务是否可以使用
     */
    public isMissionOpen(id:number){
        let cfg:Configs.t_Mount_Mission_dat =  Mount_MissionProxy.Ins.GetDataById(id);
        if(cfg){
            if(cfg.f_MissionOpen == 1){
                return true;
            }
            if(this.missionList.indexOf(id)!=-1){
                return true;
            }
        }
        return false;
    }
    public getRideMissionVo(id:number):RideMssionVo{
        for(let i = 0;i < this.runRideMissionList.length;i++){
            let cell:RideMssionVo = this.runRideMissionList[i];
            if(cell.mssionId == id){
                return cell;
            }
        }
    }
    /**任务是否正在执行中 */
    public isMissionRunning(id:number){
        for(let i = 0;i < this.runRideMissionList.length;i++){
            let cell = this.runRideMissionList[i];
            if(cell.mssionId == id /*&& cell.isRunning*/){
                return true;
            }
        }
    }
    /**该坐骑是否使用中 */
    public isRideUsed(rideId:number){
        for(let i = 0;i < this.runRideMissionList.length;i++){
            let cell = this.runRideMissionList[i];
            if(cell.rideIds.indexOf(rideId)!=-1){
                return true;
            }
        }
    }

    /**空闲的马匹列表 (大于品质qua)*/
    public freeRideList(qua:number){
        let rl:stRideVo[] = [];
        let l = this.storgeList;
        for(let i =  0;i< l.length;i++){
            let cell:stRideVo = l[i];
            if(this.isRideUsed(cell.id)){

            }else{
                let cfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(cell.id);
                if(cfg.f_Quality >= qua){
                    rl.push(cell);
                }
            }
        }
        return rl;
    }

    private onRideStorgeUpRevc(revc:RideStorgeUp_revc){
        this.foodTotal = revc.total;
        this.event(ZuoQiEvent.StorgeUpdate);
        this.updateRed();
    }

    private onRideOwnerInfo(revc:RideOwnerInfo_revc){
        this.isOpen = true;
        this.rideVo.equipVo = revc.equipItem;
        if(!revc.equipItem.equipStyle){
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,`3042 equipStyle is 0\n`);
        }
        if(!this.hasRide){
            this.hasRide = true;
            this.event(ZuoQiEvent.InitRide);
        }
        this.refreshZuoqiVo();
        this.event(ZuoQiEvent.RideOwnerInfoUpdate);
        this.event(ZuoQiEvent.UpdateInfoEvt);
    }

    private refreshZuoqiVo(){
        if(this.rideVo.equipVo){
            this.rideVo.curVo = this.getRideVo(this.rideVo.equipVo.equipStyle);
        }else{
            this.rideVo.curVo = null;
        }
    }

    private onRideOwnerCnt(revc:RideOwnerCnt_revc){
        this.mExtractTime = revc.cnt;
        this.updateRed();
        this.event(ZuoQiEvent.TimeChange);
    }
    /**坐骑升级 */
    private onRideLvUpRevc(revc:RideLv_revc){
        let vo = this.getRideVo(revc.id);
        if(vo){
            vo.lv = revc.lv;
        }
        this.event(ZuoQiEvent.UpdateInfoEvt);
    }
    /**坐骑升星 */
    private onRideQuaUpRevc(revc:RideQua_revc){
        let vo = this.getRideVo(revc.id);
        if(vo){
            vo.star = revc.star;
        }
        this.event(ZuoQiEvent.UpdateInfoEvt);
    }

    public getRideVo(id: number) {
        if (this.mlist) {
            for (let i = 0; i < this.mlist.length; i++) {
                let vo: stRideVo = this.mlist[i];
                if (vo.id == id) {
                    return vo;
                }
            }
        }
    }

    /**
     * 抽卡
     */
    public onGetRideRevc(revc:GetRide_revc){
        if(revc.type != 3){
            this.rideCacheList.push(revc.rideList);

            // E.ViewMgr.Open(EViewType.ZuoqiFangpai,null,revc.rideList);
    
            if(E.ViewMgr.IsOpen(EViewType.ZuoqiFangpai)){
                let view:ZuoQiFangPaiView = E.ViewMgr.Get(EViewType.ZuoqiFangpai) as ZuoQiFangPaiView;
                view.refresh(this.rideCacheList.shift());
                // view.updateRideView();
            }else{
                E.ViewMgr.Open(EViewType.ZuoqiFangpai);
            }
        }else{
            this.rideCacheList1.push(revc.rideList);
            if(E.ViewMgr.IsOpen(EViewType.ZuoQiFangPaiView1)){
                let view:ZuoQiFangPaiView1 = E.ViewMgr.Get(EViewType.ZuoQiFangPaiView1) as ZuoQiFangPaiView1;
                view.refresh(this.rideCacheList1.shift());
            }else{
                E.ViewMgr.Open(EViewType.ZuoQiFangPaiView1);
            }
        }
    }

    private onRideInfoRevc(revc:RideInfo_revc){
        this.mlist = revc.mlist;
        this.refreshZuoqiVo();
        this.event(ZuoQiEvent.UpdateInfoEvt);
    }

    /**
     * 坐骑仓库列表
     */
    public get storgeList():stRideVo[]{
        return this.mlist || [];
    }

    public lvUp(id:number,lv:number){
        let req:RideLv_req = new RideLv_req();
        req.id = id;
        req.cnt = lv;
        SocketMgr.Ins.SendMessageBin(req);
    }
    public quaUp(id:number){
        let req:RideQua_req = new RideQua_req();
        req.id = id;
        SocketMgr.Ins.SendMessageBin(req);
    }
    private parseDiscount(_result: ZuoQiLvResult,_vo:ZuoqiVo){
        let qua: number = _vo.quality;//品质
        let cfg: Configs.t_Mount_Config_dat = MountConfigProxy.Ins.getByQualityID(qua);
        let lv: number = _vo.lv;
        let upGrade:Configs.t_Mount_UpGrade_dat = t_Mount_UpGrade.Ins.getByLvQua(lv,qua,cfg.f_plaidAmount);
        if(upGrade){
            let f_LevelConsume:string = upGrade.f_LevelConsume;
            let arr:string[] = f_LevelConsume.split("-");
            let itemid:number = parseInt(arr[0]);
            let need = parseInt(arr[1]);//  cfg.f_plaidAmount;
            _result.parse(need,itemid);
        }
    }
    
    /*
     *获取坐骑升级需要的粮草数
     */
    public getLvZuoqiNeed(_vo: ZuoqiVo) {
        let _result: ZuoQiLvResult = new ZuoQiLvResult();
        let qua: number = _vo.quality;//品质
        let cfg: Configs.t_Mount_Config_dat = MountConfigProxy.Ins.getByQualityID(qua);
        if(!cfg){
            return;
        }
        let lv: number = _vo.lv;//_vo.equipVo.level;
        _result.stepMax = cfg.f_plaidAmount;

        let n = Math.floor(lv / cfg.f_plaidAmount);
        _result.step = n;
        _result.stepVal = lv % cfg.f_plaidAmount;

        if (lv >= cfg.f_MaxLevel) {
            _result.isMax = true;
            _result.status = ZuoQiLvResult.MAX;
        } else {
            if(initConfig.clienttype == EClientType.Discount){
                this.parseDiscount(_result, _vo);
            }else{
                let a = cfg.f_UpgardeInc.split("-")[1];
                let itemid = cfg.f_UpgradeInit.split("-")[0];
                let s = cfg.f_UpgradeInit.split("-")[1];
                let need = parseInt(s) + parseInt(a) * n;


                // let have = MainModel.Ins.mRoleData.getVal(parseInt(itemid));
                // _result.needItemid = parseInt(itemid);
                // _result.need = need;
                // _result.have = have;
                // if(need > have){
                //     _result.status = ZuoQiLvResult.NOT_ENOUGH;
                // }
                _result.parse(need,parseInt(itemid));
            }
        }
        return _result;
    }

    /**
     * 升星
     */
    public getQuaLvNeed(_vo:ZuoqiVo){
        let _result:ZuoQiQuaResult = new ZuoQiQuaResult();
        let qua: number = _vo.quality;//品质
        let _quaConfig: Configs.t_Mount_Config_dat = MountConfigProxy.Ins.getByQualityID(qua);
        _result.f_MaxStar = _quaConfig.f_MaxStar;
        if(_vo.starLv >=  _quaConfig.f_MaxStar){
            _result.isMax = true;
        }else{
            if(initConfig.clienttype == EClientType.Discount){
                let l1:Configs.t_Mount_UpStar_dat[] = t_Mount_UpStar.Ins.List;
                let needCfg:Configs.t_Mount_UpStar_dat = l1.find(o=>o.f_QualityID == qua && o.f_Star == _vo.starLv);
                if(needCfg){
                    let arr =  needCfg.f_StarConsume.split("|");
                    let item = arr[0];
                    let _itemVo:ItemVo = ItemViewFactory.convertItem(arr[0]);
                    _result.needItem = item;//_itemVo;
                    _result.have = MainModel.Ins.mRoleData.getVal(_itemVo.cfgId);
                    if(arr.length > 1){
                        _result.hasHigh = true;
                        _result.highItem = needCfg.f_StarConsume;
                    }
                }
            }else{
                let _itemVo:ItemVo = ItemViewFactory.convertItemList(_quaConfig.f_UpgradeStar)[0];
                _result.needItem = _quaConfig.f_UpgradeStar;
                _result.have = MainModel.Ins.mRoleData.getVal(_itemVo.cfgId);
                // let hasHigh:boolean = false;
                if(_quaConfig.f_AwakeCost7){
                    //红马
                    if (_vo.starLv >= Mount_ListProxy.Ins.wakeStar) {
                        _result.hasHigh = true;
                        _result.highItem =  _quaConfig[`f_AwakeCost${(_vo.starLv + 1)}`];
                    }
                }
            }
        }
        return _result;
    }

    /**骑乘一匹马 */
    public rideUpdate(id:number){
        let req:RideUpdate_req = new RideUpdate_req();
        req.id = id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public unlock(id:number){
        let req:RideMissionList_req = new RideMissionList_req();
        req.id = id;
        SocketMgr.Ins.SendMessageBin(req);
    }
    
    /**运输 */
    public mission(missionId:number,rideList:number[]){
        let l:stRideReq[] = [];
        for(let i = 0;i < rideList.length;i++){
            let cell:stRideReq = new stRideReq();
            cell.missionId = missionId;
            cell.rideId = rideList[i];
            l.push(cell);
        }
        let req:RideMission_req = new RideMission_req();
        req.rideList = l;
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**取消运输 */
    public delMission(missionId:number){
        let req:RideMissionDel_req = new RideMissionDel_req();
        req.id = missionId;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public get cfg(){
        let cfg = Mount_GachaProxy.Ins.getCfg(1);
        return cfg;
    }

    public getSubTime() {
        let _result: ZuoqiChouQuResult = new ZuoqiChouQuResult();
        let s = TimeUtil.getZeroSecond(TimeUtil.serverTime);
        let cfg = this.cfg;
        let a = cfg.f_RefreshTime.split(":");
        let next = s + parseInt(a[0]) * 3600 + parseInt(a[1]) * 60 + parseInt(a[2]);

        let sub = next - TimeUtil.serverTime;
        if (sub < 0) {
            next += 86400;
        }
        _result.time = next;
        _result.freeItemVo = ItemViewFactory.convertItemList(cfg.f_SingleCost)[0];
        _result.threeItemVo = ItemViewFactory.convertItemList(cfg.f_TripleCost)[0];
        _result.tenItemVo = ItemViewFactory.convertItemList(cfg.f_TenDrawCost)[0];
        return _result;
    }

    public timeEndReq(){
        Laya.timer.once(2000,this,this.delayTimeEnd);
    }

    private delayTimeEnd(){
        let req:RideMissionTimeEnd_req = new RideMissionTimeEnd_req();
        SocketMgr.Ins.SendMessageBin(req);
    }
    public onZuoqiClick(){
        // if(!ZuoQiModel.Ins.isOpen){
        // return;
        // }
        let vo = this.rideVo;
        if(!TaskModel.Ins.isFuncOpen(EFuncDef.Ride,true)){
            return;
        }
        if (!vo.equipVo) {
            E.ViewMgr.Open(EViewType.ZuoqiChouQu);//没有坐骑
        } else {
            let _showVo:IZuoqiTipsData = {} as IZuoqiTipsData;
            _showVo.zqData = vo;
            _showVo.showEnter = true;
            E.ViewMgr.Open(EViewType.ZuoqiTips, null, _showVo);
        }
    }

    /**打开主角的坐骑界面 */
    public openZuoqiMainView(){
        E.ViewMgr.Open(EViewType.ZuoqiMain,null,this.rideVo);
    }
    
    private getCheckStr(str:string){
        let wash:WashNeedReqVo = new WashNeedReqVo();
        let arr:string[] = str.split(";");
        let item1 = arr[0];
        if(MainModel.Ins.isItemEnoughSt(item1)){
            wash.item = item1;
            wash.refinementItem = parseInt(item1.split("-")[0]);
            return wash;
        }
        let item2 = arr[1];
        wash.refinementItem = parseInt(item2.split("-")[0]);
        wash.item = item2;
        return wash;
    }


    /**根据属性id获取品质值 */
    public getAttrQua(equipVo: stEquipItem, attrId: number) {
        let l = equipVo.mountAttrList;
        let o = l.find(cell => cell.id == attrId);
        if (o) {
            return o.quality;
        }
        return 0;
    }

    public getWashNeedItemId(qua:number,lockedCount:number){
        // let vo = this.rideVo;
        // let qua:number = vo.quality;
        // let wash:WashNeedReq = new WashNeedReq();
        let cfg: Configs.t_Mount_Config_dat = MountConfigProxy.Ins.getByQualityID(qua);
        let str = "";
        if(lockedCount <= 0){
            str = cfg.f_Refinement;
        }else{
            let item = cfg.f_Refinementlock.split("|")[lockedCount-1];
            str = item;
        }
        return this.getCheckStr(str);
    }

    convertImage(qua:number){
        // let l: string[] = ZuoQiModel.Ins.cards;

        // let icon = l[qua-1];
        // if(!icon){
        //     return l[l.length-1];
        // }
        // return icon;
        return `static/${qua.toString()}.png`;
    }
}

export class WashNeedReqVo{
    public item:string;
    public refinementItem:number = 0;
    private _itemVo:ItemVo;

    public get itemVo(){
        if(!this._itemVo){
            this._itemVo = ItemViewFactory.convertItem(this.item);
        }
        return this._itemVo;
    }

}