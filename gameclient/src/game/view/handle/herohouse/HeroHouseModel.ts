import { LogSys } from "../../../../frame/log/LogSys";
import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import {StringUtil} from "../../../../frame/util/StringUtil";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { ELayerType } from "../../../layer/LayerMgr";
import { MSGID } from "../../../network/MSGID";
import { GymBondChange_revc, GymBondListInit_revc, GymBondNpcChange_revc, GymEquipChange_revc, GymEquipInit_revc, GymFacilityList_revc, GymFacilityRefinementList_revc, GymFacilityRefinement_req, GymFacilityRefinement_revc, GymFacilitySummary_revc, GymForgetEquip_req, GymForgetEquip_revc, GymInfo_revc, GymInvitation_req, GymInvitation_revc, GymInvite_req, GymInvite_revc, GymMapTasks_revc, GymMissionList_revc, GymMissionRefreshUpdate_revc, GymMissionUpdate_revc, GymRoomLevel_revc, GymRoomSummary_revc, GymSwicthEquip_req, GymUpgrade_req, GymUpgrade_revc, stEquipAttr, stGymEquip, stGymFacilityRefinement, stGymFacilityRefinementInfo, stGymMapTasks, stGymMission, stGymUpgradeInfo } from "../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../network/SocketMgr";
import {DotManager} from "../common/DotManager";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { AdventureLevelProxy } from "../main/proxy/AdventureLevelProxy";
import { ECellType, EItemSubType } from "../main/vos/ECellType";
import { ItemVo } from "../main/vos/ItemVo";
import { attrConvert } from "../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../main/vos/PlayerVoFactory";
import { NewAdventureModel } from "../maoxian2/NewAdventureModel";
import { IconUtils } from "../zuoqi/vos/IconUtils";
import { EFacilityType, EGymAction, EGymHeroFetterStatus, EGymLingQu } from "./model/EGymType";
import { GymEvent } from "./model/GymEvent";
import { GymSlotViewVo } from "./model/GymInnerRoomSlotVo";
import { GymInviteVo } from "./model/GymInviteVo";
import { GymLevelCtl } from "./model/GymLevelCtl";
import { t_Gym_Config, t_Gym_Facility_List, t_Gym_Facility_Platform, t_Gym_Map, t_Gym_Mission_Config, t_Gym_Mission_Type, t_Gym_NPC_Bond, t_Gym_NPC_InnerRoom, t_Gym_NPC_List, t_Gym_NPC_Quality } from "./model/GymProxy";
import { HeroBetterModelCtl } from "./model/HeroBetterModelCtl";
import { HeroFacilitiesVo } from "./model/HeroFacilitiesVo";
import { EGymGetStatus } from "./model/HeroHousePackVo";
import { InviationCtl } from "./model/InviationCtl";
import { WashResult } from "./model/WashResult";
import { HeroHouseDetailView } from "./views/HeroHouseDetailView";
import { HeroHouseHandbookView } from "./views/HeroHouseHandbookView";
import { HeroHouseMainView } from "./views/HeroHouseMainView";
import { HeroHousePackage } from "./views/HeroHousePackage";
import { HeroHouseReadView } from "./views/HeroHouseReadView";
import { HeroHouseSelectMapView, MapCondition } from "./views/HeroHouseSelectMapView";
import { HeroHouseShopView } from "./views/HeroHouseShopView";
import { HeroHouseShowView } from "./views/HeroHouseShowView";
import { HeroHouseStorgeView, HeroItemSelVo } from "./views/HeroHouseStorgeView";
import { HeroHouseSwitchView } from "./views/HeroHouseSwitchView";
import { HeroHouseTaskView } from "./views/HeroHouseTaskView";
import { HeroKnowledgeView } from "./views/HeroKnowledgeView";
import { HeroAnimStage } from "./views/herostage/HeroAnimStage";
import { HeroHouseWeiTuoView } from "./views/herostage/HeroHouseWeiTuoView";
import { HeroSmallBtnCtl } from "./views/herostage/HeroSmallBtnCtl";
import { HeroHouseLevelUp } from "./views/levelup/HeroHouseLevelUp";
export class HeroHouseTaskVo {
    /**需要的数量 */
    need: number;

    /**任务描述 */
    desc: string;

    /**拥有的数量 */
    have: number;

    /**空字符 */
    empty: boolean;

    /**任务是否已经完成 */
    finished:boolean;
    // public get finished() {
    //     return this.have >= this.need;
    // }
}
export enum EInviteType{
    /**一人邀请 */
    One = 1,

    /**五人邀请 */
    Five = 2,
}

export interface IHeroPop {
    /**已经完整的动画,需要领取处理的 */
    finishCount: number;
    /**排队中的动画 */
    needAnimCount:number;
}

interface ISlotLock{
    f_id:number;
    count:number;
}

export class HeroHouseModel extends BaseModel{
    // /**气泡最大数量 */
    // public readonly MAX_POP_COUNT:number = 5;
    public onInitCallBack():void{
        this.autoCtl.reset();
        this._facilitList = null;
    }
    private static _ins: HeroHouseModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new HeroHouseModel();
        }
        return this._ins;
    }
    //////////////////////////////////////////////////////////////////
    public newNplcIdCache:number[] = [];
    public data:GymRoomLevel_revc = new GymRoomLevel_revc();
    public levelCtl:GymLevelCtl = new GymLevelCtl();
    public better:HeroBetterModelCtl = new HeroBetterModelCtl();
    /**地图信息数据 */
    public info:GymInfo_revc;
    /**演武邀请数据 */
    private invitelGymList:GymInviteVo[] = [];
    /**信物仓库数据 */
    private storgeList:HeroItemSelVo[] = [];
    /**当前选择的仓库itemid */
    public curStorgeItemId:number = ECellType.Auth;
    /**邀请卷恢复控制 */
    public inviationCtl:InviationCtl = new InviationCtl();
    /**自动按钮 */
    public autoCtl:HeroSmallBtnCtl = new HeroSmallBtnCtl();

    heroAnim:HeroAnimStage = new HeroAnimStage();

    // public get invitelist(){
    //     return this.invitelGymList;
    // }
    /**当前的信物icon */
    public get authIcon(){
        let id = this.curStorgeItemId;
        // if(id == ECellType.Auth)
        //     return `remote/hero_house/wuxian.png`;
        // else{
        return IconUtils.getIconByCfgId(id);
        // }
    }
	/**信物变化的时候更新*/
    private onCheckXingWu(){
        let id = this.curStorgeItemId;
        if(id!=ECellType.Auth){
            let cnt = MainModel.Ins.mRoleData.getVal(id);
            if(cnt <= 0){
                this.curStorgeItemId = ECellType.Auth;
                this.event(GymEvent.InvitePopUpdate)
            }
        }
    }

    public get bMaxIcon(){
        return this.curStorgeItemId == ECellType.Auth;
    }

    public get authCount(){
        let count = MainModel.Ins.mRoleData.getVal(this.curStorgeItemId);
        return count <= 0 ? "" : count.toString();
    }

    public get curMapCfg(): Configs.t_Gym_Map_dat {
        if (this.info) {
            let cfg: Configs.t_Gym_Map_dat = t_Gym_Map.Ins.GetDataById(this.info.curMapId);
            return cfg;
        }
    }

    /**
     * 设施列表
     */
    // private upgradeList:stGymUpgradeInfo[] = [];

    /**获得的神识装备数据列表*/
    public equipList:stGymEquip[] = [];
    /**神识装备格子信息列表 */
    // private slotList:GymInnerRoomSlotVo[];
    /**武馆设施洗练列表 */
    public defineList:stGymFacilityRefinement[] = [];

    /**任务列表数据 */
    public taskList:stGymMission[] = [];

    public wash:WashResult = new WashResult();

    /** 地图任务数据列表*/
    private mapTasklist:stGymMapTasks[] = [];
    /**羁绊 */
    private bond:GymBondListInit_revc;
    /**场馆属性 */
    private facilitySummaryAttrList:stEquipAttr[] = [];

    /**武魂属性 */
    private gymRoomSummaryAttrList:stEquipAttr[] = [];
    
    /**武馆礼包数据结构 */
    // public packVo:HeroHousePackVo = new HeroHousePackVo();

    public isBetterThan(cell:stGymEquip){
        let l = this.equipList;
        let o = l.find(item=>
                    item.heroType == cell.heroType && 
                    item.heroId == cell.heroId && 
                    // item.npcId == cell.npcId &&
                    item.degree < cell.degree
                    );

        return o!=undefined;
    }

    //#region 数据
    /**
     * 武馆任务数据
     * @param taskId 
     */
    public getTaskVal(taskId:number){
        let cell = this.taskList.find(item=>item.fid == taskId);
        if(cell){
            return cell.count;
        }
        return 0;
    }
    /**当前邀请函的数量 */
    public get curInviteLetterCount(){
        return MainModel.Ins.mRoleData.inviteCount;
    }
    /**
     * 默认选择的类型页签
     */
    public selLevelUpType:EFacilityType = EFacilityType.Fight;
    /**
     * 默认选择的索引号
     */
    public selLevelTabIndex:number = 0;

    /**获取一个可以动作的演武数据 */
    public get animInviteVo(){
        let l = this.invitelGymList;
        for(let i = 0;i < l.length;i++){
            let cur = l[i];
            if(cur.rewardStatus == EGymLingQu.NormalIsAnim){
                return cur;
            }

        }
        return;
    }

    

    /**传承 替换 领取奖励面板 */
    public openPop(){
        // if(checkAuto && this.autoCtl.isAuto){
        //自动委托中
        // return;
        // }
        if(E.ViewMgr.IsOpen(EViewType.HeroHouseSwicth)){
            return;
        }
        let type = EViewType.HeroInherit;

        if(E.ViewMgr.IsOpen(EViewType.HeroHouse)){
            let cell = this.firstVo;
            if(cell){
                if(cell.isTimeEnd){
                    if(!E.ViewMgr.IsOpen(type)){
                        if(this.autoCtl.isAuto && cell.mData.result == EGymAction.Live){
                            // LogSys.Log("自动委托状态,失败处理...");
                            this.forget(this.firstVo);
                        }else{
                            E.ViewMgr.Open(type);
                        }
                    
                    }else{
                        let view:HeroHouseReadView = E.ViewMgr.Get(type) as HeroHouseReadView;
                        view.onRefreshHandler();
                    }
                }else{
                    // LogSys.Log(`not open 原因:剩余时间:${(cell.endtime.toNumber() - TimeUtil.serverTime)}`);
                }
            }else{
                // LogSys.Log(`not open 原因:没有数据了`);
                // E.ViewMgr.Close(type);
            }
        }
    }

    /**是否有传承界面需要展示 */
    private get mInheritRed(){
        let cell = this.firstVo;
        if(cell && cell.isTimeEnd){
            return true;
        }
    }

    /**武馆是否有红点 */
    public get mRed(){
        if(TaskModel.Ins.isFuncOpen(EFuncDef.HeroHouse)){
            return this.mInheritRed || this.mHandbookRed || MainModel.Ins.heroPackVo.type == EGymGetStatus.CanGet;
        }
    }

    /**名将录是否可以被激活 */
    public get mHandbookRed() {
        let _quas: number[] = t_Gym_NPC_Bond.Ins.quaList;
        for (let i = 0; i < _quas.length; i++) {
            let qua = _quas[i];
            if (this.hasQuaHandBookRed(qua)) {
                return true;
            }
        }
    }

    public hasQuaHandBookRed(qua:number){
        let l1 = t_Gym_NPC_Bond.Ins.getListByQua(qua);
        for(let i = 0;i < l1.length;i++){
            let cfg:Configs.t_Gym_NPC_Bond_dat = l1[i];
            let status = HeroHouseModel.Ins.getFetterStatus(cfg.f_id);
            if(status == EGymHeroFetterStatus.CanActivied){
                return true;
            }
        }
    }

    public updateRed(){
        if(this.mRed){
            DotManager.addMainDot("icon5",-20,-5);
        }else{
            DotManager.remMainDot("icon5");
        }
        this.event(GymEvent.RedUpdate);
    }

    /**气泡可领取数量 */
    public get popInfo():IHeroPop{
        let cell:IHeroPop = {} as IHeroPop;
        let l = this.invitelGymList;
        let cnt:number = 0;
        for(let i =0;i < l.length;i++){
            let cell = l[i];
            // if(cell.endtime )
            if(cell.rewardStatus == EGymLingQu.CanLingqu){
                cnt++;
            }
        }
        cell.finishCount = cnt;
        let sub = l.length - cnt;
        sub--;
        if(sub < 0){
            sub = 0;
        }
        let max = t_Gym_Config.Ins.cfg.f_Queue;
        if(sub > max){
            sub = max;
        }

        cell.needAnimCount = sub;
        return cell;
    }
    //#endregion
    public initMsg(): void{
        //三国武馆
        this.Reg(new HeroHouseMainView(EViewType.HeroHouse));
        this.Reg(new HeroHouseSwitchView(EViewType.HeroHouseSwicth));
        this.Reg(new HeroHouseShowView(EViewType.HeroHouseShow));
        this.Reg(new HeroHouseSelectMapView(EViewType.HeroHouseMapSel));
        this.Reg(new HeroHouseLevelUp(EViewType.HeroHouseLevelUp));
        this.Reg(new HeroHouseShopView(EViewType.HeroHouseShop));
        this.Reg(new HeroHouseTaskView(EViewType.HeroHouseTask));
        this.Reg(new HeroHouseReadView(EViewType.HeroInherit,ELayerType.subFrameLayer));
        this.Reg(new HeroHouseDetailView(EViewType.HeroHouseDetail));
        this.Reg(new HeroKnowledgeView(EViewType.HeroHouseKnowLedge));
        this.Reg(new HeroHouseHandbookView(EViewType.HeroHouseHandbook));
        this.Reg(new HeroHouseStorgeView(EViewType.HeroHouseStorge));
        this.Reg(new HeroHouseWeiTuoView(EViewType.HeroHouseWeiTuo));
        this.Reg(new HeroHousePackage(EViewType.HeroHousePackage));

        E.MsgMgr.AddMsg(MSGID.GymInfoRevc, this.onGymInfoRevc, this);
        E.MsgMgr.AddMsg(MSGID.GymInviteRevc,this.onGymInviteRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymEquipInitRevc,this.onGymEquipInitRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymEquipChangeRevc,this.onGymEquipChangeRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymForgetEquipRevc,this.onGymForgetEquipRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymFacilityListRevc,this.onGymFacilityListRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymRoomLevel,this.onGymRoomLevel,this);
        E.MsgMgr.AddMsg(MSGID.GymUpgradeRevc,this.onGymUpgradeRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymFacilityRefinementListRevc,this.GymFacilityRefinementListRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymFacilityRefinementChangeRevc ,this.onGymFacilityRefinementChangeRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymMapTasksRevc,this.onGymMapTasksRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymMissionListRevc,this.onGymMissionListRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymMissionUpdateRevc,this.onGymMissionUpdateRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymBondListInitRevc,this.onGymBondListInitRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymBondChangeRevc,this.onGymBondChangeRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymBondNpcChangeRevc,this.onGymBondNpcChangeRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymInvitationRevc,this.onGymInvitationRevc,this);
        // MainModel.Ins.once(MainEvent.DataInit,this,this.onInitEvt);
        E.MsgMgr.AddMsg(MSGID.GymFacilitySummaryRevc,this.onGymFacilitySummaryRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymRoomSummaryRevc,this.onGymRoomSummaryRevc,this);
        E.MsgMgr.AddMsg(MSGID.GymMissionRefreshUpdateRevc,this.onGymMissionRefreshUpdateRevc,this);

        MainModel.Ins.on(MainEvent.ValChange,this,this.onCheckXingWu);
    }

    /** 更新单个任务 */
    private onGymMissionRefreshUpdateRevc(revc:GymMissionRefreshUpdate_revc){
        this.taskList[revc.index] = revc.mission;
        this.event(GymEvent.TaskUpdate);
    }
    private onGymRoomSummaryRevc(revc:GymRoomSummary_revc){
        this.gymRoomSummaryAttrList = revc.attrList;
        this.event(GymEvent.MainAttrUpdate);
    }
    private onGymFacilitySummaryRevc(revc:GymFacilitySummary_revc){
        this.facilitySummaryAttrList = revc.attrList;
        this.event(GymEvent.MainAttrUpdate);
    }
    // public onInitEvt(){
    //    this.reqInviation();
    // }

    public reqInviation(){
        let req = new GymInvitation_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onGymInvitationRevc(revc:GymInvitation_revc){
        this.inviationCtl.nextRefreshTime = revc.nextRefreshTime;
    }
    /**武馆拉取羁绊列表 */
    private onGymBondListInitRevc(revc:GymBondListInit_revc){
        this.bond = revc;
    }

    /**是否已经激活 */
    public isHeroOpen(heroId:number){
        if(this.bond){
            return this.bond.npcIds.find(item=>item.id == heroId);
        }
        // return this.bond.npcIds.indexOf(heroId) != -1;
    }

    /**
     * 是否已经羁绊
     * @param fid 
     */
    public isFetter(fid:number){
        if(this.bond){
            return this.bond.activedFids.indexOf(fid) != -1;
        }
    }

    /**羁绊状态 */
    public getFetterStatus(fid:number){
        if(this.isFetter(fid)){
            return EGymHeroFetterStatus.Finished;
        }
        let cfg:Configs.t_Gym_NPC_Bond_dat = t_Gym_NPC_Bond.Ins.GetDataById(fid);
        // if(cfg.f_NpcIds)
        let arr = cfg.f_NpcIds.split("|");
        for(let i = 0;i < arr.length;i++){
            let id = parseInt(arr[i]);
            if(!this.isHeroOpen(id)){
                return EGymHeroFetterStatus.WaitFind;
            }
        }
        return EGymHeroFetterStatus.CanActivied;
    }

    /**激活羁绊 */
    private onGymBondChangeRevc(revc:GymBondChange_revc){
        // let cell = this.bond.activedFids.find(id => id == revc.fid);
        let fid:number = revc.fid;
        let index = this.bond.activedFids.indexOf(fid);
        if(index == -1){
            this.bond.activedFids.push(fid);
        }
        this.event(GymEvent.BondUpadte);
        this.updateRed();
    }

    /**武馆激活武将 */
    private onGymBondNpcChangeRevc(revc:GymBondNpcChange_revc){
        // let id:number = revc.npcId;
        // let index = this.bond.npcIds.indexOf(id);
        // if(index == -1){
        //     this.bond.npcIds.push(id);
        // }

        // for(let i = 0;i < this.bond.npcIds.length;i++){
        //     let cell = this.bond.
        // }

        let cell = this.bond.npcIds.find(item=>item.id == revc.npcId.id);
        if(cell){
            cell.degree = revc.npcId.degree;
        }else{
            this.bond.npcIds.push(revc.npcId);
            this.newNplcIdCache.push(revc.npcId.id)
            // LogSys.Log(`========>激活新武将:${revc.npcId.id}`);
        }
        this.event(GymEvent.BondUpadte);
    }

    public hasGetHero(heroId:number){
        // return this.bond.npcIds.find(item=>item.id == heroId)!=undefined;
        // return this.equipList.find(item=>item.heroId == heroId)!=undefined;
        let bFind:boolean = false;
        let index:number = this.newNplcIdCache.indexOf(heroId);
        if(index!=-1){
            bFind = true;
            this.newNplcIdCache.splice(index,1);
        }
        return bFind;
    }

    /**
     * 任务初始化
     */
    private onGymMissionListRevc(revc:GymMissionList_revc){
        this.taskList = revc.datalist;
        this.event(GymEvent.TaskUpdate);
    }

    /**单个任务更新 */
    private onGymMissionUpdateRevc(revc:GymMissionUpdate_revc){
        let l = revc.datalist;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            let vo = this.taskList.find(item => item.fid == cell.fid);
            if(vo){
                vo.count= cell.count;
                vo.rewardStatus = cell.rewardStatus;
            }else{
                this.taskList.push(cell);
            }
        }
        this.event(GymEvent.TaskUpdate);
    }

    /**
     * 地图任务
     */
    private onGymMapTasksRevc(revc:GymMapTasks_revc):void{
        // this.mapTasklist = revc.list;
        for(let i = 0;i < revc.list.length;i++){
            let cell = revc.list[i];
            let find = this.mapTasklist.find(item=>item.taskTypeId == cell.taskTypeId);
            if(find){
                find.param = cell.param;
            }else{
                this.mapTasklist.push(cell);
            }
        }
        this.event(GymEvent.MapUdapate);
    }

    private updateCell(cell:stGymFacilityRefinementInfo,oldList:stGymFacilityRefinementInfo[]){
        let updateOk = false;
        for(let i = 0;i < oldList.length;i++){
            if(cell.wearable == oldList[i].wearable){
                oldList[i] = cell;
                updateOk = true;
            }
        }
        if(!updateOk){
            oldList.push(cell);
        }
    }
    /**当前地图是锁定中的 */
    public isMapLocked(fid:number){
        if(fid > this.info.mapId){
            return true;
        }
        return false;
    }

    /**是否下一个地图需要解锁 */
    public isNextUnlock(fid:number){
        return this.info.mapId+1 == fid;
    }

    public isSelMap(fid:number){
        return this.info.curMapId == fid;
    }

    public showAttr() {
        let l = this.bond.activedFids;
        let str = "";
        for (let i = 0; i < l.length; i++) {
            let id: number = l[i];
            let cfg: Configs.t_Gym_NPC_Bond_dat = t_Gym_NPC_Bond.Ins.GetDataById(id);
            str += cfg.f_bondAttr + "|";
        }
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
        let arr: string[] = PlayerVoFactory.mergeAttr(str);
        E.ViewMgr.Open(EViewType.AttrShow, null, arr);
    }

    private onGymFacilityRefinementChangeRevc(revc:GymFacilityRefinement_revc){
        let reslist = revc.datalist;
        for(let i = 0;i < reslist.length;i++){
            let _new = reslist[i];
            let old = this.defineList.find(item=>item.id == _new.id);
            if(old){
                old.datalist = _new.datalist;
            }else{
                // let cell:stGymFacilityRefinementInfo = new stGymFacilityRefinementInfo();
                let cell:stGymFacilityRefinement = new stGymFacilityRefinement();
                cell.id = _new.id;
                cell.datalist = _new.datalist;
                this.defineList.push(cell);
            }
        }
        // console.log(this.defineList);
        this.event(GymEvent.WashSucceed);
    }

    private _facilitList:HeroFacilitiesVo[];

    /**设施数据 */
    public get facilitList():HeroFacilitiesVo[]{
        if(!this._facilitList){
            this._facilitList = [];
            let l = t_Gym_Facility_List.Ins.List;
            for(let i = 0;i < l.length;i++){
                let _cell = new HeroFacilitiesVo();
                _cell.cfg = l[i];
                this._facilitList.push(_cell);
            }
        }
        return this._facilitList;
    }
    // /**
    //  * 获取设施的属性
    //  */
    // private getFacilitlistAttr(){
    //     let s = "";
    //     let l = this.facilitList;
    //     for(let i = 0;i < l.length;i++){
    //         let cell = l[i];
    //         let cur = this.better.getAttrStr(cell.fid,cell.type);
    //         if(cur){
    //             s += cur+"|";
    //         }
    //     }
    //     if(s.length > 0){
    //         s = s.substr(0,s.length-1);
    //     }
    //     return s;
    // }

    public getNameByType(type:EFacilityType){
        let l = this.facilitList;
        let cell = l.find(item=>item.type == type);
        if(cell){
            return cell.sceneName;//cell.name;//cell.fullNameLv;
        }
        return "";
    }

    // public getLv(){
    //     let l = this.facilitList;
    //     let cell = l.find(item=>item.type == type);
    //     if(cell){
    //         return cell.sceneName;//cell.name;//cell.fullNameLv;
    //     }
    //     return "";
    // }
    /** 洗练返回*/
    private GymFacilityRefinementListRevc(revc:GymFacilityRefinementList_revc){
        this.defineList = revc.datalist;
        this.event(GymEvent.WashSucceed);
    }

    /**场馆属性 */
    public get defineShowAttr(){
        // let str = "";
        // for(let i = 0;i < this.defineList.length;i++){
        //     let cell = this.defineList[i];
        //     let l = cell.datalist;
        //     for(let n = 0;n < l.length;n++){
        //         let item = l[n];
        //         for(let k = 0;k < item.attrList.length;k++){
        //             let a = item.attrList[k];
        //             str+=`${a.id}:${a.value}|`;
        //         }
        //     }
        // }

        // str+=this.getFacilitlistAttr();
        // return PlayerVoFactory.mergeAttr(str);
        return this.facilitySummaryAttrList;
    }

    /**武魂属性 */
    public get heroAttr(){
        // let str = "";
        // for(let i = 0;i < this.equipList.length;i++){
        //     let cell = this.equipList[i];
        //     for(let k = 0;k < cell.attrList.length;k++){
        //         let a = cell.attrList[k];
        //         str+=`${a.id}:${a.value}|`;
        //     }
        // }
        // return PlayerVoFactory.mergeAttr(str);
        return this.gymRoomSummaryAttrList;
    }

    /** 洗练*/
    public washByID(id:number,useType:number){
        let req:GymFacilityRefinement_req = new GymFacilityRefinement_req();
        req.type = 1;
        req.id = id;
        req.usetype = useType;
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**替换 */
    public switchId(id:number){
        let req:GymFacilityRefinement_req = new GymFacilityRefinement_req();
        req.type = 2;
        req.id = id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public getHeroCount(heroType:number){
        let count:number = 0;
        let l = this.equipList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.heroType == heroType){
                count++;
            }
        }
        return count;
    }

    /**删除气泡 */
    private delEquip(uid:number){
        let cell = this.equipList.find(item=> item.uid == uid);
        if(cell){
            let index = this.equipList.indexOf(cell);
            this.equipList.splice(index,1);
        }
        this.autoCtl.continueTask();
        this.event(GymEvent.RemovePop);
        if(!this.autoCtl.isAuto){
            this.openPop();
        }
        this.updateRed();
    }

    /**武馆设备升级 */
    private onGymUpgradeRevc(revc:GymUpgrade_revc){
        let fItem:stGymUpgradeInfo = revc.upgradeInfo;
        this.updateFacility(fItem);
        this.event(GymEvent.FacilitiesUpdate);
    }

    /**神识的等级推送 */
    private onGymRoomLevel(revc: GymRoomLevel_revc) {
        this.data = revc;

        // let cfg:Configs.t_Gym_NPC_InnerRoom_dat = t_Gym_NPC_InnerRoom.Ins.GetDataById(revc.level);
        // this.roomLevel = cfg.f_RoomLevel;
        // console.log("************************",revc.level);
        this.levelCtl.time = revc.time-1;
        this.levelCtl.slotCount = revc.level;
        
        // LogSys.Log("onGymRoomLevel lv:"+this.levelCtl.cfgLv);
        // this.buildSlots();
        if(E.Debug){
            // LogSys.Log("onGymRoomLevel time :"+this.levelCtl.time+","+this.levelCtl.bTimeEnd+",结束时间:"+TimeUtil.timeToStr(this.levelCtl.time)+",距离结束"+(this.levelCtl.time - TimeUtil.serverTime)+"秒");
            console.log("神识的等级推送%c"+revc.level+","+revc.time,"color:#ff0000");
        }
        this.event(GymEvent.KnowledgeLevelUp);
    }

    private updateFacility(fItem: stGymUpgradeInfo){
        let cell = this.facilitList.find(item=>item.id == fItem.id);
        cell.fid =  fItem.fid;
        cell.taskVal = fItem.taskVal;
    }

    /**
     * 设施列表更新
     */
    private onGymFacilityListRevc(revc:GymFacilityList_revc){
        let upgradeList = revc.datalist;
        for(let i = 0;i < upgradeList.length;i++){
            let fItem = upgradeList[i];
            this.updateFacility(fItem);
        }
        this.event(GymEvent.FacilitiesUpdate);
    }
    /**删除邀请 */
    private delInviteList(uid:number){
        let l = [];
        for(let i = 0;i< this.invitelGymList.length;i++){
            let cell = this.invitelGymList[i];
            if(cell.uid == uid){
                cell.dispose();
            }else{
                l.push(cell);
            }
        }
        this.invitelGymList = l;
        // LogSys.Log("删除列表后:"+this.invitelGymList.length);
    }

    /**删除气泡id,神识装备删除 */
    private onGymForgetEquipRevc(revc:GymForgetEquip_revc){
        // if(E.Debug){
        //     LogSys.Log("删除装备"+revc.uid);
        // }
        // let cell = this.invitelGymList.find(item => item.uid == revc.uid);
        // if(cell){
        //     let index =  this.invitelGymList.indexOf(cell);
        //     if(index!=-1){
        //         cell.dispose();
        //         this.invitelGymList = this.invitelGymList.splice(index,1);
        //     }
        // }
        this.delInviteList(revc.uid);
        // if(E.Debug){
        // LogSys.Log("删除神识装备"+revc.uid);
        // console.log(this.invitelGymList);
        // }
        this.delEquip(revc.uid);
    }

    private onGymInfoRevc(revc: GymInfo_revc) {
        // console.log(1);
        this.info = revc;
        this.event(GymEvent.MapUdapate);
    }

    /**邀请气泡列表更新 */
    private onGymInviteRevc(revc: GymInvite_revc) {

        // this.inviteList = revc.itemlist;
        let inviteList = revc.itemlist;

        // this.invitelGymList = [];
        while(this.invitelGymList.length > 0){
            let _cell = this.invitelGymList.pop();
            _cell.dispose();
        }
        for(let i = 0;i < inviteList.length;i++){
            let cell = inviteList[i];
            let vo = new GymInviteVo(cell);
            this.invitelGymList.push(vo);
        }

        if (E.Debug) {
            LogSys.Log("START\t################################### 气泡列表");
            let l = this.invitelGymList;
            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                // LogSys.Log("index:" + i + " " + cell.toCellString());
                console.log('%c index: ' + i + cell.toCellString(), 'color:#0000ff');
            }
            LogSys.Log("END\t################################### 气泡列表");
        }
        this.event(GymEvent.InvitePopUpdate);
        if(!this.autoCtl.isAuto){
            this.openPop();
        }
    }

    /** 武馆-神识信息*/
    private onGymEquipInitRevc(revc:GymEquipInit_revc){
        this.equipList = revc.datalist;
    }
    
    /**武馆-神识信息 改变推送 */
    private onGymEquipChangeRevc(revc:GymEquipChange_revc){
        // console.log(revc);
        let l = revc.datalist;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            let a = this.equipList.find(item => item.uid == cell.uid);
            if(a){
                let index = this.equipList.indexOf(a);
                this.equipList[index] = cell;
            }else{
                this.equipList.push(cell);
                LogSys.Log("添加神识装备:"+cell.uid);
                this.delInviteList(cell.uid);
                // console.log(this.invitelGymList);
            }
        }
        this.autoCtl.continueTask();
        // this.event(GymEvent.KnowledgeUpdate);
    }
    private get queueMax(){
        return t_Gym_Config.Ins.cfg.f_Queue;
    }
    /**邀请武将人数到达上限 */
    public get bInviteFull(){
        let count:number = this.invitelGymList.length;
        return count >= this.queueMax + 1;
    }
    /**最大的邀请函数量 */
    private readonly maxCount:number = 5;
    

    // private _heroInviteCount:number = 0;

    // private _highHeroInviteCount:number = 0;//高级邀请的数量

    private useSubInvite(count:number){
        let ids: number[] = [];
        // for (let i = 0; i < count; i++) {
        //     let id = ECellType.HighHeroInvite;
        //     if (this._highHeroInviteCount <= 0) {
        //         id = ECellType.HeroInvite;
        //         this._highHeroInviteCount--;
        //     }else{
        //         this._heroInviteCount--;
        //     }
        //     ids.push(id);
        // }

        // let _heroInviteCount = MainModel.Ins.mRoleData.getVal(ECellType.HeroInvite);
        let _highHeroInviteCount = MainModel.Ins.mRoleData.getVal(ECellType.HighHeroInvite);
    
        // let highList:number[] = [];
        let sub:number = count - _highHeroInviteCount;
        let oldNeed:number = 0;
        let highNeed:number = 0;
        if(sub < 0){
            oldNeed = 0;
            highNeed = count;
        }else{
            oldNeed = sub;
            highNeed = count - sub;
        }

        for(let i = 0;i < oldNeed;i++){
            ids.push(ECellType.HeroInvite);
        }
        for(let i = 0;i < highNeed;i++){
            ids.push(ECellType.HighHeroInvite);
        }

        return ids;
    }

    /**武将邀请 */
    public invite(type: number = EInviteType.One,tips:boolean = false) {
        if(!this.canInvite(type,tips)){
            this.autoCtl.stopTask();
            return;
        }
        
        // this._heroInviteCount = MainModel.Ins.mRoleData.getVal(ECellType.HeroInvite);
        // this._highHeroInviteCount = MainModel.Ins.mRoleData.getVal(ECellType.HighHeroInvite);

        let itemId: number = 0;
        if (this.curStorgeItemId != ECellType.Auth) {
            itemId = this.curStorgeItemId;
        }

        let req = new GymInvite_req();
        if (itemId == 0) {
            req.itemIds = [];//没有信物
        } else {

            if(type == EInviteType.One){
                req.itemIds = [itemId];
            }else{
                let itemIds = [];
                let cnt:number = MainModel.Ins.mRoleData.getVal(itemId);
                for(let i = 0;i < this.maxCount;i++){
                    if(cnt > 0){
                        itemIds.push(itemId)
                    }
                    cnt--;
                }
                req.itemIds = itemIds;
            }
        }

        let ids:number[] = this.useSubInvite(type == EInviteType.One ? 1 : this.maxCount);
        req.invitionIds = ids;
        req.type = type;
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**是否可以被邀请 */
    public canInvite(type:EInviteType = EInviteType.One,tips:boolean = false){
        if(this.bInviteFull){
            if(tips){
                E.ViewMgr.ShowMidError(E.getLang("GymPeopleFull"));//武馆人数已满
            }
            return;
        }

        let vo:GymInviteVo = this.animInviteVo;
        if(vo){
            if(tips){
                E.ViewMgr.ShowMidError(E.getLang("heroend"));//演武未结束
            }
            return;
        }

        // let itemId:number = 0;
        // if(this.curStorgeItemId !=ECellType.Auth){
        //     itemId = this.curStorgeItemId;
        // }

        let count:number = 1;
        if(type == EInviteType.Five){
            count = this.maxCount;
        }

        // if(!MainModel.Ins.isItemEnoughSt(`${ECellType.HeroInvite}-${count}`,tips)){
        //     return;
        // }

        let a = MainModel.Ins.mRoleData.getVal(ECellType.HeroInvite);
        let b = MainModel.Ins.mRoleData.getVal(ECellType.HighHeroInvite);
        if(a + b < count){
            if(tips){
                E.ViewMgr.ShowMidError(E.getLang("HeroInviteNotEnough"));
            }
            return;
        }        
        return true;
    }










    /**气泡删除 */
    public forget(vo:GymInviteVo){
        //let endtime = vo.endtime.toNumber()
        //if (endtime > TimeUtil.serverTimeMS) {
        // E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, "forget: " + `${vo.endtime - TimeUtil.serverTime}`);
        //LogSys.Log(`forget ${endtime - TimeUtil.serverTimeMS} 毫秒`);
        //}

        // LogSys.Log(vo.uid.toString()+":动画是否结束"+vo.isTimeEnd);
        // if(!vo.isTimeEnd){
        // LogSys.Log(`uid:${vo.uid},剩余时间:${vo.subTime}毫秒`);
        // console.log(1);
        // }

        if(vo){
            this.del(vo.mData.item.uid);
        }
    }

    public del(uid:number){
        let req = new GymForgetEquip_req();
        req.uid = uid;
        SocketMgr.Ins.SendMessageBin(req);
        // LogSys.Log("###删除"+uid);
    }

    /**第一个展示的邀请结果数据 */
    public get firstVo(){
        if(this.invitelGymList.length > 0){
            let item = this.invitelGymList[0];

            // if(item.endtime.toNumber() > TimeUtil.serverTimeMS){
            //  return;
            // }

            if(item.isTimeEnd == false){
                // LogSys.Log(`===========>剩余时间 ${(item.endtime.toNumber() - TimeUtil.serverTime)}秒结束,列表长度为${this.invitelGymList.length}`);
                return;
            }

            return item;//已经结束了的演武动作
        }
    }
    // /**邀请数据 */
    // public get inviteVo():GymInviteVo{
    //     // return this.inviteList[0];
    //     if(this.firstVo){
    //         return this.firstVo.mData;
    //     }
    // }

    public getColorByQua(qua: number) {
        // let arr = E.getLang("Color").split("|");
        // return "#" + arr[qua - 1];
        let cfg = t_Gym_NPC_Quality.Ins.getByQua(qua);
        return `#${cfg.f_Color}`;
    }
    /**国家名 */
    public getCountry(type:number){
        return E.getLang("Country")[type-1];
    }

    // public getLevel(){
    // }

    /**根据武将类型获取解锁了槽位的上限数量 */
    public getUnlockCount(herotype:number){
        // let lv: number = this.levelCtl.cfgLv;//神识等级
        // return this.getByLv(herotype,lv);
        let cfg = this.levelCtl.curSlot.cfg;
        let arr = cfg.f_Slots.split("|");
        for(let i = 0;i < arr.length;i++){
            let cell = arr[i];
            let a = cell.split("-");
            if(parseInt(a[0])== herotype){
                return parseInt(a[1]);
            }
        }
        return 0;
    }

    public getByLv(herotype: number, lv: number) {
        let cfg = t_Gym_NPC_InnerRoom.Ins.getByLv(lv);
        if (cfg) {
            let arr = cfg.f_Slots.split("|");// 1-1|2-1|3-1|4-1
            for (let i = 0; i < arr.length; i++) {
                let str = arr[i];
                let a = str.split("-");
                let _heroType = parseInt(a[0]);
                let _count: number = parseInt(a[1]);
                if (_heroType == herotype) {
                    return _count;
                }
            }
        }
        return 0;
    }

    /**获取该类型的武将下的所有神石装备列表 */
    public getEquipListByType(heroType: number) {
        let l = this.equipList;
        let olist = [];
        for (let i = 0; i < l.length; i++) {
            let cell: stGymEquip = l[i];
            if (cell.heroType == heroType) {
                olist.push(cell);
            }
        }
        return olist;
    }

    private getHeroList(heroType:number){
        let equipList = this.equipList || [];
        let l = [];
        for(let i = 0;i < equipList.length;i++){
            let cell:stGymEquip = equipList[i];
            if(cell.heroType == heroType){
                l.push(cell);
            }
        }
        return l;
    }

    /**任务描述 */
    public getMapTaskDesc(_data:MapCondition):HeroHouseTaskVo{
        let taskStr = _data.task;

        let cell:HeroHouseTaskVo = new HeroHouseTaskVo();
        if (taskStr == "") {
            cell.empty = true;
            return cell;
        }
        if (!taskStr) {
            // 需要通关的关卡id
            let cfg: Configs.t_Adventure_Level_dat = AdventureLevelProxy.Ins.getByLevelId(_data.passId);
            let name: string = AdventureLevelProxy.Ins.getChapterName(cfg);
            let arr = E.getLang("FinishLabels").split("|");
            let _statusStr = arr[0];
            // if (!TaskProxy.Ins.isTaskComplete(cfg.f_Levelid,NewAdventureModel.Ins.adventureData.adventureId)){//!MainModel.Ins.adventureVo.isOpen(cfg.f_Levelid)) {
            let adventureId: number = NewAdventureModel.Ins.adventureData.adventureId;
            let pre = AdventureLevelProxy.Ins.getPreCfg(adventureId);
            if (adventureId == 0) {
                //已经解锁
                cell.finished = true;
            }
            else if (pre == undefined || pre && pre.f_Levelid < cfg.f_Levelid) {
                //未解锁
                _statusStr = arr[1];
                cell.finished = false;
            }
            else {
                //已经解锁
                cell.finished = true;
            }
            cell.desc = E.getLang("NeedPass", name);//+"----"+_data.passId;

        } else {

            let arr = taskStr.split("-");
            // 邀请{0}/{1}个{2}
            let type = parseInt(arr[0]);
            let need = parseInt(arr[1]);

            let param1 = 0;
            // let param2 = "";
            let taskcell = this.mapTasklist.find(item => item.taskTypeId == type);
            if (taskcell) {
                param1 = taskcell.param;
                // param2 = taskcell.param2.toString();
            }
            // this.haveTaskCount(type);

            let cfg: Configs.t_Gym_Mission_Type_dat = t_Gym_Mission_Type.Ins.GetDataById(type);
            let s = StringUtil.format(cfg.f_GymtaskContent, param1, need);
            cell.desc = s;
            cell.need = need;
            cell.have = param1;

            cell.finished = cell.have >= cell.need;
        }
        return cell;
    }

    /**解锁的格子数量 */
    private hasSlotCount(heroType:number){
        let cfg:Configs.t_Gym_NPC_InnerRoom_dat = t_Gym_NPC_InnerRoom.Ins.getByLv(this.levelCtl.cfgLv);
        let f_Slots = cfg.f_Slots.split("|");
        for(let i = 0;i < f_Slots.length;i++){
            let node = f_Slots[i];
            let arr = node.split("-");
            let type = parseInt(arr[0]);
            let count = parseInt(arr[1]);
            if(type == heroType){
                return count;
            }
        }
        return 0;
    }


    /**
     * 构建神识的视图格子的列表数据
     * @param heroType 
     */
    public buildSlotViewListVo(heroType:number):GymSlotViewVo[]{
        // this.buildSlots();
        let templist = this.getHeroList(heroType);
        let vlist:GymSlotViewVo[] = [];

        let l = t_Gym_NPC_InnerRoom.Ins.List;

        let out:ISlotLock[] = [];
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Gym_NPC_InnerRoom_dat = l[i];
            let arr = cfg.f_Slots.split("|");
            for(let n = 0;n < arr.length;n++){
                let a = arr[n].split("-");
                let type:number = parseInt(a[0]);
                let count:number = parseInt(a[1]);
                if(type == heroType){
                    let _fItem = out.find(item=>item.count==count);
                    if(!_fItem){
                        let o:ISlotLock={} as ISlotLock;
                        o.f_id = cfg.f_id;
                        o.count = count;
                        out.push(o);
                    }
                }
            }
        }

        for (let i = 0; i < out.length; i++) {
            let o = out[i];
            let slot: GymSlotViewVo = new GymSlotViewVo();
            slot.heroType = heroType;
            let cfg:Configs.t_Gym_NPC_InnerRoom_dat = t_Gym_NPC_InnerRoom.Ins.GetDataById(o.f_id);
            slot.unlockLevel = cfg.f_RoomLevel;
            if (slot.unlockLevel <= this.levelCtl.cfgLv) {//this.roomLevel
                slot.equipVo = templist.pop();//添加装备
            }
            vlist.push(slot);
        }

        return vlist;
    }

    /**是否有空的格位可以放置 */
    public hasEmpty(type: number) {
        let count = this.hasSlotCount(type);
        let templist = this.getHeroList(type);
        return templist.length < count;
    }

    public getDegreeDesc(degree: number) {
        return  "完整度" + (degree/100) + "%"
    }

    public  getTaskIcon(f_iconid:number){
        // f_iconid = 1;
        return `o/gym/${f_iconid}.png`;
    }

    public getHeroIcon(f_iconid:number){
        // f_iconid = 1;
        return `o/gym/${f_iconid}.png`;
    }

    public getMapIcon(id:string){
        return `remote/hero_house/${id}.png`;
    }

    /**装备神识 */
    public equip(uid:number){
        let req:GymSwicthEquip_req = new GymSwicthEquip_req();
        // req.oldUid = 0;
        req.newUid = uid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public getRegion(heroId:number){
        let cfg:Configs.t_Gym_NPC_List_dat = t_Gym_NPC_List.Ins.getByHeroID(heroId);
        if(cfg.f_Region){
            let mapCfg: Configs.t_Gym_Map_dat = t_Gym_Map.Ins.GetDataById(cfg.f_Region);
            return mapCfg.f_MapName;
        }
        return E.getLang("AllRegion");
    }

    public refreshAttrView(attrSkinList:Laya.Label[],img:Laya.Image,nametf:Laya.Label,
        attrs:stEquipAttr[],heroId:number){
        // let attrSkinList = [this.tf3, this.tf4];
        let l = attrs;
        for (let i = 0; i < attrSkinList.length; i++) {
            let tf: Laya.Label = attrSkinList[i];
            if (i  < l.length) {
                let cell = l[i];
                tf.text = MainModel.Ins.getAttrNameIdByID(cell.id) + ":" + attrConvert(cell.id,cell.value);
            } else {
                tf.text = "";
            }
        }
        let heroCfg = t_Gym_NPC_List.Ins.getByHeroID(heroId);

        img.skin = this.getHeroIcon(heroCfg.f_iconid);
        nametf.text = heroCfg.f_name;
        // + (E.Debug ? ":" + heroCfg.f_HeroType : "");
        nametf.color = this.getColorByQua(heroCfg.f_HeroQuality);
    }
    private findCfg(f_id:number){
        // return t_Gym_Facility_Platform.Ins.List.find(item=>(item as Configs.t_Gym_Facility_Platform_dat).f_FacilityRank == f_FacilityRank);
        return t_Gym_Facility_Platform.Ins.GetDataById(f_id);
    }

    private findNextRank(f_id: number) {
        let cfg: Configs.t_Gym_Facility_Platform_dat = t_Gym_Facility_Platform.Ins.GetDataById(f_id);
        if(cfg){
            let _nextCfg = t_Gym_Facility_Platform.Ins.findByRank(cfg.f_FacilityRank + 1);
            return _nextCfg;
        }
    }

    //#region 演武升级
    private sortYanWu(a:YanWuLevelUpItemVo,b:YanWuLevelUpItemVo){
        if(a.sort < b.sort){
            return -1;
        }
        else if(a.sort > b.sort){
            return 1;
        }
        return 0;
    }

    public get taskRefreshCfg(){
        let cfg:Configs.t_Gym_Mission_Config_dat = t_Gym_Mission_Config.Ins.GetDataById(1);
        return cfg;
    }

    public buildTask(out:IHeroTask,id:number,f_Task:string){
        if (!StringUtil.IsNullOrEmpty(f_Task)) {
            let task = f_Task.split('-');
            let taskCfg:Configs.t_Gym_Mission_Type_dat = t_Gym_Mission_Type.Ins.GetDataById(parseInt(task[0]));

            let have:number = 0;
            let cell = this.facilitList.find(item=>item.id == id);
            let needCount:number = parseInt(task[1]);
            if(cell){
                have = cell.taskVal;
            }
            out.taskDesc = StringUtil.format(taskCfg.f_GymtaskContent,have,task[1]);
            if(have >= needCount){
                out.taskNotComplete = true;
            }
        }
    }

    /**获取信物列表 */
    public getStorgeList() {
        // if (!this.storgeList) {
        let l = MainModel.Ins.getItemList(EItemSubType.Authenticating);
        let r: HeroItemSelVo[] = [];

        let _defaultCell: HeroItemSelVo = new HeroItemSelVo();
        _defaultCell.infinite = true;
        let _itemVo = new ItemVo();
        _itemVo.cfgId = ECellType.Auth;
        _defaultCell.itemVo = _itemVo;
        // _defaultCell.selected = true;
        r.push(_defaultCell);

        for (let i = 0; i < l.length; i++) {
            let cell = new HeroItemSelVo();
            cell.itemVo = l[i];
            cell.index = i;
            r.push(cell);
        }
        // let cell = this.storgeList.find(item => item.itemId == this.curStorgeItemId);
        // if(cell){
        //     cell.setSelected(true);
        // }
        this.storgeList = r;
        // }
        return this.storgeList;
    }
    /** 根据heroId获取颜色*/
    public getColorByHeroID(id:number){
        let heroCfg:Configs.t_Gym_NPC_List_dat = t_Gym_NPC_List.Ins.getByHeroID(id);
        let quaCfg:Configs.t_Gym_NPC_Quality_dat = t_Gym_NPC_Quality.Ins.GetDataById(heroCfg.f_HeroQuality);
        return `#${quaCfg.f_Color}`;
    }
    public getMaxDrgree(heroId:number){
        let cell = this.bond.npcIds.find(item=>item.id == heroId);
        if(cell){
            return this.getDegreeDesc(cell.degree);
        }
        return "";
    }
    /**演武台升级 */
    public buildListData(id: number, fid: number): IYanWuLevelResult {
        let out = {} as IYanWuLevelResult;
        let cfg: Configs.t_Gym_Facility_Platform_dat = this.findCfg(fid);
        // let lv = cfg.f_FacilityRank;
        let redType: number = 6;
        let curArr = (cfg.f_Not_Red_Client + "|" + redType + "-" + cfg.f_Red_Client).split("|");
        let nextArr;
        let nextCfg = this.findNextRank(fid); //this.findCfg(fid + 1);
        if (nextCfg) {
            nextArr = (nextCfg.f_Not_Red_Client + "|" + redType + "-" + nextCfg.f_Red_Client).split("|");
        }
        this.buildTask(out,id,cfg.f_Task);

        let l = [];
        for(let i = 0;i < curArr.length;i++){
            let a = curArr[i];

            let cell:YanWuLevelUpItemVo = new YanWuLevelUpItemVo();
            let qua = parseInt(a.split("-")[0]);
            cell.cur = a;
            cell.qua = qua;
            cell.cfg = t_Gym_NPC_Quality.Ins.GetDataById(qua);
            // cell.platflomCfg = cfg;
            if(nextArr){
                let b = nextArr[i];
                cell.next = b;
            }
            l.push(cell);
        }
        l = l.sort(this.sortYanWu);
        out.datalist = l;
        out.cfg = cfg;
        return out;
    }
    //#endregion

    /** 获取该品质开启的图鉴数量*/
    public getBookOpenCount(qua: number) {
        let _count: number = 0;
        let l = this.bond.activedFids;
        for (let i = 0; i < l.length; i++) {
            let id = l[i];
            let cfg: Configs.t_Gym_NPC_Bond_dat = t_Gym_NPC_Bond.Ins.GetDataById(id);
            if (cfg.f_BondQuality == qua) {
                _count++;
            }
        }
        return _count;
    }

    public levelUp(vo:HeroFacilitiesVo){
        let req = new GymUpgrade_req();
        req.id = vo.id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**转化为显示的等级 */
    public convertShowLv(lv:number){
        return lv + 1;
    }

}

export interface IHeroTask{
     /**任务描述 */
     taskDesc:string;
     /**任务是否完成 */
     taskNotComplete:boolean;
}

export interface IYanWuLevelResult extends IHeroTask{
    datalist:YanWuLevelUpItemVo[];
    cfg: Configs.t_Gym_Facility_Platform_dat;
}

/**演武升级数据 */
export class YanWuLevelUpItemVo{
    /**1-3000 */
    public cur:string;
    /**1-6000 */
    public next:string;
    /*稀有度 */
    public qua:number;
    
    // public platflomCfg:Configs.t_Gym_Facility_Platform_dat;

    public cfg:Configs.t_Gym_NPC_Quality_dat;

    /////////////////////////////////////////////////////////////////
    public get sort(){
        return this.cfg.f_sort;
    }

    public get color(){
        if(this.qua == 7){
            return "#"+E.getLang("Gray");
        }
        return HeroHouseModel.Ins.getColorByQua(this.qua);
    }
    public get name():string{
        return this.cfg.f_NPCQuality;
    }
    private f_convert(s:string){
        if(!s)
            return "";
        
        let val = parseInt(s.split("-")[1]);
        return (val / 100) + "%";

    }
    public get curStr(){
        return this.f_convert(this.cur);
    }
    
    public get nextStr(){
        return this.f_convert(this.next);
    }

}