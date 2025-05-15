import { TimeUtil } from "../../../../frame/util/TimeUtil";
import { HrefUtils } from "../../../../InitConfig";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { dailyReward_revc, JjcActiveRefresh_req, JjcBuyFightCnt_req, JjcFightLog_req, JjcFightLog_revc, JjcFight_req, JjcFight_revc, JjcInfo_revc, JjcList_req, JjcList_revc, JjcMoneyUpdate_revc, JjcOpen_revc, JjcRankChange_revc, JjcRefreshList_req, JjcRefreshList_revc, JjcRewardGain_req, JjcRewardGain_revc, JjcScoreUpdate_revc, JjcSucceedReward_revc, JjcSurplusRefreshCount_revc, JjcWeekInfo_req, JjcWeekInfo_revc, stCellValue, stJjcLog, stJjcPlayer, stPlayerData, weeklyReward_revc } from "../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../network/SocketMgr";
import { ChengHaoModel } from "../chenghao/model/ChengHaoModel";
import { IFightResult } from "../fight/vos/FightVo";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainModel } from "../main/model/MainModel";
import { RedEnum } from "../main/model/RedEnum";
import { RedUpdateModel } from "../main/model/RedUpdateModel";
import { TaskModel } from "../main/model/TaskModel";
import { BoxExtraItemProxy } from "../main/proxy/FuncProxy";
import { ECellType, EFightType, EGetStatus, EServerFightType } from "../main/vos/ECellType";
import { EJjcType, IJJC_Model } from "../peakjjc/model/IJjcInterface";
import { JJC_BaseModel } from "./JJC_BaseModel";
import { Arena_BuyTicket, Arena_config, Arena_RankReward_Daily, Arena_RankReward_Weekly } from "./proxy/JjcProxy";
import { JjcEvent } from "./vos/JjcEvent";
import { EJjcRewadShow, EJjcRewadShowStatus } from "./vos/JjcType";

export class JjcModel extends JJC_BaseModel implements IJJC_Model{
    tickEndTime:number;

    get realPrice(){
        let cfg:Configs.t_Arena_BuyTicket_dat = Arena_BuyTicket.Ins.getCfgByTime(this.hasAlreadyBuyCnt+1);
        return cfg.f_Price;
    }

    public get isTimeOpen():boolean{
        return true;
    }
    private static _ins: JjcModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new JjcModel();
        }
        return this._ins;
    }
    public redId = RedEnum.JJC_FIGHT;

    // public onInitCallBack():void{}

    public playerList: stJjcPlayer[] = [];//竞技场列表
    public fightPlayers: stJjcPlayer[] = [];//挑战列表
    public baseInfo: JjcInfo_revc;
    public moneyDataRevc:JjcMoneyUpdate_revc;
    // public smallIcon: JJC_IconCell;
    // private tempPlayerId:number = 0;
    //日周领取状态
    public dayStatus:EJjcRewadShowStatus;

    // public fightBuyRevc:JjcBuyFightCnt_revc;
    public loglist:stJjcLog[] = [];//竞技场日志
    public isEnable:boolean = false;
    public todayRank:number = 0 ;//当天排名

    /**挑战成功的时候可以获得的奖品列表 */
    public succeedRewardList: stCellValue[] = [];
    /**竞技场剩余刷新的次数 */
    public surplusRefreshCount:number = 0;
    /**
     * 当前周排名
     */
    public curWeekRank:number = 0;
    /**名次下降引发的红点 */
    // public mDropRed:boolean = false;
    /**
     * 0不可领 1可领取 2已领取
     */
    public weekRewardStatus:number = EGetStatus.CanNotGet;
    public weekRefreshTime:number = 0;
    public dailyDayTime:number = 0;
    public initMsg() {
        E.MsgMgr.AddMsg(MSGID.JjcInfo, this.onJjcInfo, this);
        E.MsgMgr.AddMsg(MSGID.JjcListRevc, this.onJjcListRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcRefreshListRevc, this.onJjcFightListRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcFightLogRevc, this.onJjcFightLogRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcMoneyUpdateRevc, this.onJjcMoneyUpdateRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcBuyFightCntRevc, this.onJjcBuyFightCntRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcOpenRevc, this.onJjcOpenRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcRankChangeRevc, this.onJjcRankChangeRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcFightRevc, this.onJjcFightRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcRewardGainRevc, this.onJjcRewardGainRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcSucceedRewardRevc, this.onJjcSucceedReward, this);
        E.MsgMgr.AddMsg(MSGID.JjcSurplusRefreshCountRevc, this.onJjcSurplusRefreshCountRevc, this);
        E.MsgMgr.AddMsg(MSGID.JjcWeekInfoRevc, this.onJjcWeekInfoRevc, this);
        E.MsgMgr.AddMsg(MSGID.WeeklyReward, this.onWeeklyReward, this);
        E.MsgMgr.AddMsg(MSGID.DailyReward,this.onDailyReward,this);
        E.MsgMgr.AddMsg(MSGID.JjcScoreUpdate,this.onJjcScoreUpdate,this);
        RedUpdateModel.Ins.on(RedUpdateModel.UPDATA,this,this.updateRed);
    }

    private onJjcScoreUpdate(revc:JjcScoreUpdate_revc){
        this.selfScore = revc.val;
        this.event(JjcEvent.SelfScore);
    }

    private onDailyReward(revc:dailyReward_revc){
        this.dailyDayTime = revc.time;
        this.event(JjcEvent.DailyDayTime);
    }

    private onWeeklyReward(revc:weeklyReward_revc){
        this.weekRefreshTime = revc.time;
        this.event(JjcEvent.WeekTime);
    }

    private onJjcWeekInfoRevc(revc: JjcWeekInfo_revc) {
        if (revc.rank != -1) {
            this.curWeekRank = revc.rank;
        }
        this.weekRewardStatus = revc.rewardStatus;
        this.event(JjcEvent.JjcWeekInfoUpdate);
        this.updateRed();
    }

    private onJjcSurplusRefreshCountRevc(revc:JjcSurplusRefreshCount_revc){
        this.surplusRefreshCount = revc.val;
        this.event(JjcEvent.SurplusRefreshCount);
    }

    private onJjcSucceedReward(revc:JjcSucceedReward_revc){
        this.succeedRewardList = revc.succeedRewardList;
    }

    private onJjcRewardGainRevc(revc:JjcRewardGain_revc){
        this.dayStatus = revc.day;
        this.event(JjcEvent.LingQuUpdate);
        this.updateRed();
    }

    /**竞技场战斗战报 */
    public onJjcFightRevc(revc: JjcFight_revc) {
        if(E.Debug){
            if (HrefUtils.getVal("nofightlog") || initConfig.nofightlog) {
               
            }else{
                let str = JSON.stringify(revc);
                MainModel.Ins.fightCMD = str;
                console.log(str);
            }
        }
        // revc = FightTest.buildVo();
        let type = 0;
        if(revc.type == EServerFightType.JJC || revc.type == EServerFightType.DF_JJC || revc.type == EServerFightType.ScoreJJC){       //0 ,1
            type = EFightType.Jjc;
        }else if(revc.type == 2){
            type = EFightType.XXZDZ;
        }
        // else if(revc.type == 3){
        // type = EFightType.ScoreJJC;
        // }
        MainModel.Ins.fight({ fightVo: revc.fightVo, type:type ,extData:revc } as IFightResult);
    }

    private onJjcFightListRevc(revc:JjcRefreshList_revc){
        this.fightPlayers=revc.playerList;
        this.event(JjcEvent.FightPlayerList);
    }

    private onJjcListRevc(revc:JjcList_revc){
        this.playerList = revc.playerList;
        this.event(JjcEvent.UpdatePlayerList);
    }

    private onJjcRankChangeRevc(revc:JjcRankChange_revc){
        this.todayRank = revc.rank;
        this.event(JjcEvent.TodayRankValUpdate);
    }

    private onJjcOpenRevc(revc:JjcOpen_revc){
        this.isEnable = revc.open == 1;
    }

    private onJjcFightLogRevc(revc:JjcFightLog_revc){
        this.loglist = revc.loglist;
        /*
        if(HrefUtils.getVal("test")){
            // this.model.loglist = [];
            let cell = new stJjcLog();
            cell.time = TimeUtil.serverTime;
            cell.playerName = "玩家1";
            cell.rank = 1;
            cell.changeVal = 2;
            cell.headUrl = "";
            cell.plus = 234556;
            cell.win = 1;
            this.loglist.push(cell);
        }
        */
        this.event(JjcEvent.LogEvent);
    }

    private onJjcMoneyUpdateRevc(revc:JjcMoneyUpdate_revc) {
        this.moneyDataRevc = revc;
        this.event(JjcEvent.MoneyVal);
    }

    private onJjcInfo(revc: JjcInfo_revc) {
        this.baseInfo = revc;
    }

    public get ownerPlayer(){
        if(!this._ownerPlayer){
            let _player:stJjcPlayer = new stJjcPlayer();
            let info:stPlayerData = MainModel.Ins.mRoleData.mPlayer;
            _player.name = MainModel.Ins.mRoleData.getName();
            _player.accountId = info.AccountId;
            _player.headUrl = MainModel.Ins.convertHead(info.HeadUrl);
            this._ownerPlayer = _player;
        }
        let _player = this._ownerPlayer;
        _player.score = this.selfScore;
        _player.lv = MainModel.Ins.mRoleData.lv;
        _player.plus = this.plus;
        _player.rank = this.todayRank;
        _player.titleId = ChengHaoModel.Ins.wearedTitleId;
        return _player;
    }
    public get curCfg():Configs.t_Arena_config_dat{
        let day:number = TimeUtil.getDay();
        if(day == 0){
            day = 7;
        }
        let cfg:Configs.t_Arena_config_dat=Arena_config.Ins.GetDataById(day);
        return cfg;
    }

    /**竞技场的刷新次数上限 */
    public get refreshTotalCnt(){
        return this.curCfg.f_FreeChance;  
    }

    /**刷新次数上限 */
    public get cfgFightRefreshMax(){
        return this.curCfg.f_RefreshChance;  
    }

    /**每日竞技金币上限 */
    public get f_MoneyMaximum() {
        let cfg = this.curCfg;
        return cfg.f_MoneyMaximum;
    }

    /**剩余挑战次数总次数*/
    public get fightTotalCnt(){
        if(this.fightBuyRevc){
            return this.fightBuyRevc.totalCnt;
        }
        return 0;
    }

    public getRefreshPrice(refreshCount: number): { itemId: number, count: number } {
        let cfg = this.curCfg;
        let [itemId, count] = cfg.f_refreshprice.split('-').map(Number);
        const [, icr] = cfg.f_refreshpriceincs.split('-').map(Number);
        const [, total] = cfg.f_refreshpricemax.split('-').map(Number);
        if (refreshCount > 0) {
            count += icr * refreshCount;
            count = Math.min(count, total);
        }
        return { itemId, count };
    }

    public buyFightTime(playerId:number){
        this.tempPlayerId = playerId;
        let req:JjcBuyFightCnt_req = new JjcBuyFightCnt_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**剩余挑战次数免费次数*/
    public get freefightCnt(){
        // return this.fightBuyRevc.;
        return this.fightBuyRevc.freeCnt;
    }

    /**已经购买了的次数 */
    public get hasAlreadyBuyCnt(){
        if(this.fightBuyRevc){
            return this.fightBuyRevc.buyCnt;
        }
        return -1;
    }

    /**当日已经获得金币 */
    public get dayMoneyVal(){
        if(this.moneyDataRevc){
            return this.moneyDataRevc.moneyVal;
        }
        return -1;
    }

    private strToSecond(str:string,offsetTime){
        let _endTime:string = str;
        let _sec = TimeUtil.toSecond(_endTime);
        let curtime = TimeUtil.curZeroTime + _sec;
        let sub = curtime - TimeUtil.serverTime;
        if(sub < 0){
            sub += offsetTime;
        }
        return sub + TimeUtil.serverTime;
    }

    /**竞技场的结束时间戳*/
    public get endTime(){
        return this.strToSecond(this.curCfg.f_ArenaCloseTime.split("|")[0], 3600 * 24);
    }

    public getWeekRewardEndTime(){
       return this.weekRefreshTime;
    }

    public getDayRewardEndTime() {
        let time:number = this.dailyDayTime;
        return time;
    }

    /**主动刷新 */
    public refreshPlayerList(){
        let req:JjcActiveRefresh_req = new JjcActiveRefresh_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    public getRedByType(type:EJjcRewadShow){
        let _gray:boolean = false;
        if (type == EJjcRewadShow.Day) {
            if (this.dayStatus == EJjcRewadShowStatus.CanLingqu) {
               
            } else {
                _gray = true;
            }
        } else {
            if (this.weekRewardStatus == EGetStatus.CanNotGet || this.weekRewardStatus == EGetStatus.IsAlreadyGet) {
                _gray = true;
            }
        }
        return !_gray;
    }

    /**
     * 是否需要挑战红点
     */
    public get mFightRed(){
        // 竞技场挑战券满时，出现红点
        // 玩家的竞技场挑战券数量
        const count = MainModel.Ins.mRoleData.getVal(ECellType.JjcTicket);
        // 挑战券最大拥有上限
        //const conf = BoxExtraItemProxy.Ins.getConfByFid(1);
        //if (count === conf.f_Maxhold) {
        if (count > 0) {
            return true;
        }
        return false;
        // let o = RedUpdateModel.Ins.getByID(this.redId);
        // if(o){
        //     let time = o.type;
        //     if(time < TimeUtil.curZeroTime){
        //         return true;//昨天的记录
        //     }
        //     return false;
        // }
        // return true;
    }
    protected funcId:EFuncDef = EFuncDef.Jjc;
    public get mRed(){
        if(TaskModel.Ins.isFuncOpen(this.funcId)){
            return  this.getRedByType(EJjcRewadShow.Day) || 
                    this.getRedByType(EJjcRewadShow.Week) ||
                    this.mFightRed ||
                this.mDropRed //名次下降提醒
        }
    }

    // public updateRed() {
    //     this.event(JjcEvent.RedUpdate);
    //     MainModel.Ins.updateJJC_Red();
    // }

    public reqJjcList(){
        let req:JjcList_req = new JjcList_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    public reqRefreshList(){
        let req:JjcRefreshList_req = new JjcRefreshList_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    public fight(id) {
        let req: JjcFight_req = new JjcFight_req();
        req.playerId = id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public reqlog(){
        let req:JjcFightLog_req = new JjcFightLog_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    public reqGain(type:number){
        let req:JjcRewardGain_req = new JjcRewardGain_req();
        req.type = type;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public reqWeekInfo(){
        let req = new JjcWeekInfo_req();
        SocketMgr.Ins.SendMessageBin(req);
    }
    public getRewardCfgList(type: EJjcRewadShow) {
        return type == EJjcRewadShow.Day ? Arena_RankReward_Daily.Ins.List : Arena_RankReward_Weekly.Ins.List;
    }
    public getType(){
        return EJjcType.JJC;
    }
}