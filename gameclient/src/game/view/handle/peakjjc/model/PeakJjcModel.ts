import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { MSGID } from "../../../../network/MSGID";
import { PeakJjcActiveRefresh_req, PeakJjcAvatar_revc, PeakJjcBuyFightCnt_req, PeakJjcFightLog_req, PeakJjcFightLog_revc, PeakJjcFight_req, PeakJjcInfo_revc, PeakJjcList_req, PeakJjcList_revc, PeakJjcMoneyUpdate_revc, PeakJjcOpen_revc, PeakJjcRankChange_revc, PeakJjcRefreshList_req, PeakJjcRefreshList_revc, PeakJjcRewardGain_req, PeakJjcRewardGain_revc, PeakJjcSucceedReward_revc, PeakJjcSurplusRefreshCount_revc, PeakJjcWeekInfo_req, PeakJjcWeekInfo_revc, PeakJjcWeeklyRewardUnix_revc, stCellValue, stJjcLog, stJjcPlayer, stPeakJjcAvatar, stPlayerData } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { FuJiangModel } from "../../fujiang/model/FuJiangModel";
import { JJC_BaseModel } from "../../jjc/JJC_BaseModel";
import { JjcEvent } from "../../jjc/vos/JjcEvent";
import { EJjcRewadShow, EJjcRewadShowStatus } from "../../jjc/vos/JjcType";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { EGetStatus } from "../../main/vos/ECellType";
import { PeakJjcView } from "../PeakJjcView";
import { EJjcType, IJJC_Model } from "./IJjcInterface";
// import { PeakJjcEvent } from "./PeakJjcEvent";

///////////////////////////////////////////////////////////////////////////////
//巅峰竞技场

export class Arena_Peak_RankReward_Daily extends BaseCfg{
    public GetTabelName() {
        return "t_Arena_Peak_RankReward_Daily";
    }
    private static _ins: Arena_Peak_RankReward_Daily;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new Arena_Peak_RankReward_Daily();
        }
        return this._ins;
    }
}
export class Arena_Peak_RankReward_Weekly extends BaseCfg{
    public GetTabelName() {
        return "t_Arena_Peak_RankReward_Weekly";
    }
    private static _ins: Arena_Peak_RankReward_Weekly;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new Arena_Peak_RankReward_Weekly();
        }
        return this._ins;
    }
}

export class Arena_Peak_config extends BaseCfg{
    public GetTabelName() {
        return "t_Arena_Peak_config";
    }
    private static _ins: Arena_Peak_config;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new Arena_Peak_config();
        }
        return this._ins;
    }
}

export class Arena_Peak_BuyTicket extends BaseCfg{
    public GetTabelName() {
        return "t_Arena_Peak_BuyTicket";
    }
    private static _ins: Arena_Peak_BuyTicket;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new Arena_Peak_BuyTicket();
        }
        return this._ins;
    }

    public getCfgByTime(time:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let _cfg:Configs.t_Arena_BuyTicket_dat = l[i];
            if(_cfg.f_BuyTimes == time){
                return _cfg;
            }
        }
        let _cfg = l[l.length -1];
        return _cfg;
    }
}
export class PeakJjcModel extends JJC_BaseModel implements IJJC_Model{
    tickEndTime:number;
    get realPrice():string{
        let cfg:Configs.t_Arena_Peak_config_dat = this.curCfg as any;
        return cfg.f_CouponPrice;
    }
    private static _ins: PeakJjcModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new PeakJjcModel();
            
        }
        return this._ins;
    }
    public redId = RedEnum.DF_JJC_FIGHT;
 
    // public onInitCallBack():void{}
    public playerList: stJjcPlayer[] = [];//竞技场列表
    public fightPlayers: stJjcPlayer[] = [];//挑战列表
    public baseInfo: PeakJjcInfo_revc;
    // private _ownerPlayer: stJjcPlayer;`
    public moneyDataRevc:PeakJjcMoneyUpdate_revc;

    //日周领取状态
    public dayStatus:EJjcRewadShowStatus;
    // public weekStatus:EJjcRewadShowStatus;

    public loglist:stJjcLog[] = [];//竞技场日志
    public isEnable:boolean = false;
    public todayRank:number = 0 ;//当天排名
    // public mAutoBuy:boolean = false;

    /**挑战成功的时候可以获得的奖品列表 */
    public succeedRewardList: stCellValue[] = [];
    /**竞技场剩余刷新的次数 */
    public surplusRefreshCount:number = 0;
    // public rewardListPreview:ItemVo[] = [];

    // public mTodayTipsTime:number = 0;//今日不在提醒的时间戳
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
    public dailyDayTime:number;
    public rankAvatarlist:stPeakJjcAvatar[] = [];
    public initMsg() {
        this.Reg(new PeakJjcView(EViewType.DF_JJC));
        E.MsgMgr.AddMsg(MSGID.PeakJjcInfo, this.onJjcInfo, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcList, this.onJjcListRevc, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcRefreshList, this.onJjcFightListRevc, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcFightLog, this.onJjcFightLogRevc, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcMoneyUpdate, this.onJjcMoneyUpdateRevc, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcBuyFightCnt, this.onJjcBuyFightCntRevc, this);

        E.MsgMgr.AddMsg(MSGID.PeakJjcOpen, this.onJjcOpenRevc, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcRankChange, this.onJjcRankChangeRevc, this);
        // E.MsgMgr.AddMsg(MSGID.PeakJjcFight, this.onJjcFightRevc, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcRewardGain, this.onJjcRewardGainRevc, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcSucceedReward, this.onJjcSucceedReward, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcSurplusRefreshCount, this.onJjcSurplusRefreshCountRevc, this);

        E.MsgMgr.AddMsg(MSGID.PeakJjcWeekInfo, this.onJjcWeekInfoRevc, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcWeeklyRewardUnix, this.onWeeklyReward, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcAvatar, this.onPeakJjcAvatar, this);
        E.MsgMgr.AddMsg(MSGID.PeakJjcDailyRewardUnix,this.onDailyUnix,this);
        RedUpdateModel.Ins.on(RedUpdateModel.UPDATA,this,this.updateRed);
    }

    private onDailyUnix(revc:PeakJjcWeeklyRewardUnix_revc){
        this.dailyDayTime = revc.time;
        this.event(JjcEvent.DailyDayTime);
    }

    private rankSort(a:stPeakJjcAvatar,b:stPeakJjcAvatar){
        if(a.rank < b.rank){
            return -1;
        }else if(a.rank > b.rank){
            return 1;
        }
        return 0;
    }

    private onPeakJjcAvatar(revc:PeakJjcAvatar_revc){
        this.rankAvatarlist = revc.datalist;
        this.rankAvatarlist.sort(this.rankSort);

        this.event(JjcEvent.RankShowAvatar);
    }

    private onWeeklyReward(revc:PeakJjcWeeklyRewardUnix_revc){
        this.weekRefreshTime = revc.time;
        this.event(JjcEvent.WeekTime);
    }

    private onJjcWeekInfoRevc(revc: PeakJjcWeekInfo_revc) {
        if (revc.rank != -1) {
            this.curWeekRank = revc.rank;
        }
        
        this.weekRewardStatus = revc.rewardStatus;
        this.event(JjcEvent.JjcWeekInfoUpdate);
        this.updateRed();
    }

    private onJjcSurplusRefreshCountRevc(revc:PeakJjcSurplusRefreshCount_revc){
        this.surplusRefreshCount = revc.val;
        this.event(JjcEvent.SurplusRefreshCount);
    }

    private onJjcSucceedReward(revc:PeakJjcSucceedReward_revc){
        this.succeedRewardList = revc.succeedRewardList;
    }

    private onJjcRewardGainRevc(revc:PeakJjcRewardGain_revc){
        this.dayStatus = revc.day;
        this.event(JjcEvent.LingQuUpdate);
        this.updateRed();
    }
    // /**竞技场战斗战报 */
    // private onJjcFightRevc(revc: PeakJjcFight_revc) {
    //     MainModel.Ins.fight({ fightVo: revc.fightVo, type: EFightType.Jjc,extData:revc } as IFightResult);
    // }

    private onJjcFightListRevc(revc:PeakJjcRefreshList_revc){
        this.fightPlayers=revc.playerList;
        this.event(JjcEvent.FightPlayerList);
    }

    private onJjcListRevc(revc:PeakJjcList_revc){
        this.playerList = revc.playerList;
        this.event(JjcEvent.UpdatePlayerList);
    }
    private onJjcRankChangeRevc(revc:PeakJjcRankChange_revc){
        this.todayRank = revc.rank;
        this.event(JjcEvent.TodayRankValUpdate);
    }

    private onJjcOpenRevc(revc:PeakJjcOpen_revc){
        this.isEnable = revc.open == 1;
    }

    public get isTimeOpen(){
        let time = MainModel.Ins.peakOpenTime;
        if(time!=0 && TimeUtil.serverTime >= time ){
            return true;
        }
    }

    private onJjcFightLogRevc(revc:PeakJjcFightLog_revc){
        this.loglist = revc.loglist;
        this.event(JjcEvent.LogEvent);
    }

    private onJjcMoneyUpdateRevc(revc: PeakJjcMoneyUpdate_revc) {
        this.moneyDataRevc = revc;
        this.event(JjcEvent.MoneyVal);
    }

    private onJjcInfo(revc: PeakJjcInfo_revc) {
        this.baseInfo = revc;
        // this.rewardListPreview = DateFactory.createItemList(this.baseInfo.succeedRewardList);
        // this.createOwnerPlayer();
    }

    public get ownerPlayer() {
        if(!this._ownerPlayer){
            let _player:stJjcPlayer = new stJjcPlayer();
            let info:stPlayerData = MainModel.Ins.mRoleData.mPlayer;
            _player.name = MainModel.Ins.mRoleData.getName()+"("+MainModel.Ins.mRoleData.serverName+")";
            _player.accountId = info.AccountId;
            _player.headUrl = MainModel.Ins.convertHead(info.HeadUrl);
            this._ownerPlayer = _player;
        }
        let _player = this._ownerPlayer;
        _player.lv = MainModel.Ins.mRoleData.lv;
        _player.plus = this.plus;//MainModel.Ins.mRoleData.plus;
        _player.rank = this.todayRank;
        _player.titleId = ChengHaoModel.Ins.wearedTitleId;
        _player.score = this.selfScore;
        return _player;
    }

    public get curCfg():Configs.t_Arena_config_dat{
        // let day:number = TimeUtil.getDay();
        // if(day == 0){
        //     day = 7;
        // }        
        // let cfg: Configs.t_Arena_config_dat = Arena_Peak_config.Ins.GetDataById(day);
        // return cfg;
        return Arena_Peak_config.Ins.GetDataById(1);
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
    public get f_MoneyMaximum(){
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

    public getRefreshPrice(refreshCount: number): { itemId, count } {
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
        let req:PeakJjcBuyFightCnt_req = new PeakJjcBuyFightCnt_req();
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
        /*
        let day:number = TimeUtil.getDay();
        let timestr:string = this.curCfg.f_ArenaCloseTime.split("|")[1];

        let end = TimeUtil.curZeroTime + (7 - day) * 3600 * 24 + TimeUtil.toSecond(timestr);
        let sub:number = 0;
        if(end  > TimeUtil.serverTime){
            sub = end - TimeUtil.serverTime;
        }else{
            sub += 7 * 3600 * 24;
        }
        return sub + TimeUtil.serverTime;
        */
       return this.weekRefreshTime;
    }

    public getDayRewardEndTime() {
        /*
        let timestr:string = this.curCfg.f_ArenaCloseTime.split("|")[1];
        let end:number = TimeUtil.curZeroTime + TimeUtil.toSecond(timestr);
        let sub:number = 0;
        if(end  > TimeUtil.serverTime){
            sub = end - TimeUtil.serverTime;
        }else{
            sub = TimeUtil.curZeroTime + 3600*24-TimeUtil.serverTime+TimeUtil.toSecond(timestr);
            //sub += 3600*24;
        }
        return sub + TimeUtil.serverTime;
        */

        let time:number = this.dailyDayTime;
        
        return time;
    }

    /**主动刷新 */
    public refreshPlayerList(){
        let req:PeakJjcActiveRefresh_req = new PeakJjcActiveRefresh_req();
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
        let o = RedUpdateModel.Ins.getByID(this.redId);
        if(o){
            let time = o.type;
            if(time < TimeUtil.curZeroTime){
                return true;//昨天的记录
            }
            return false;
        }
        return true;
    }

    protected funcId:EFuncDef = EFuncDef.DF_jjc;

    public reqJjcList(){
        let req:PeakJjcList_req = new PeakJjcList_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    public reqRefreshList(){
        let req:PeakJjcRefreshList_req = new PeakJjcRefreshList_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    public fight(id) {
        let req: PeakJjcFight_req = new PeakJjcFight_req();
        req.playerId = id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public reqlog(){
        let req:PeakJjcFightLog_req = new PeakJjcFightLog_req();
        SocketMgr.Ins.SendMessageBin(req);
    }
    public reqGain(type:number){
        let req:PeakJjcRewardGain_req = new PeakJjcRewardGain_req();
        req.type = type;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public reqWeekInfo(){
        let req = new PeakJjcWeekInfo_req();
        SocketMgr.Ins.SendMessageBin(req);
    }
    public getRewardCfgList(type:EJjcRewadShow){
        return type == EJjcRewadShow.Day ? Arena_Peak_RankReward_Daily.Ins.List : Arena_Peak_RankReward_Weekly.Ins.List;
    }
    public getType(){
        return EJjcType.Peak;
    }
}