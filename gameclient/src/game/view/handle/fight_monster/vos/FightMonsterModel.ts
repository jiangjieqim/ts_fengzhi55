import { BaseModel } from "../../../../../frame/util/ctl/BaseModel";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { MSGID } from "../../../../network/MSGID";
import { stTeamFightPlayer, TeamFightHarmReward_revc, TeamFightInit_revc, TeamFightRankList_revc, TeamFightRankReward_req, TeamFightRankReward_revc, TeamFight_revc } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { FighthardDetailView } from "../views/FighthardDetailVIew";
import { FighthardRankView } from "../views/FighthardRankView";
import { FighthardRewardView } from "../views/FighthardRewardView";
import { FighthardTujianView } from "../views/FighthardTujianView";
import { FightMonsterView } from "../views/FightMonsterView";
import { t_TeamFight_BossAttribute, t_TeamFight_Config } from "./t_TeamFight_Reward";

export class FightMonsterModel extends BaseModel {
	/**主角+副将的战斗力*/
    public plus:number = 0;

    /*0无奖励 /
    public static STATUS_NO:number = 0;
    /**
     * 1未领取
     */
    public static STATUS_NOT_GET: number = 1;
    /**
     * 2已领取
     */
    public static STATUS_IS_GET: number = 2;

    /**更新 */
    public static EVENT_UPDATA: string = "EVENT_UPDATA";
    /**排行榜更新 */
    public static EVENT_RANK_LIST: string = "EVENT_RANK_LIST";
    public static EVENT_DETAIL: string = "EVENT_DETAIL";
    /**奖励更新 */
    public static EVENT_REWARD_UPDATA:string = "";

    private static _ins: FightMonsterModel;
    public data: {
        bossId: number;
        freeNum: number;
        buyNum: number;
        adNum: number;
        accHarm: number;
        harmRewardFid: number;
        ranking: number;
        lastRanking: number;
        rankRewardState: number;
        closeUnix: number;
    };
    public rankList: {
        headUrl: string;
        name: string;
        lv: number;
        plus: number;
        rank: number;
        accountId: number;
        titleId: number;
        accHarm: number;
    }[];
    // public rankRewardState: number;
    // public harmRewardFid:number;
    /**本局战斗的总伤害值 */
    public totalHarm: number = 0;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new FightMonsterModel();
        }
        return this._ins;
    }
    public initMsg(): void{
        this.Reg(new FightMonsterView(EViewType.FightMonster));
        this.Reg(new FighthardRankView(EViewType.FightHardRank));
        this.Reg(new FighthardRewardView(EViewType.FighthardReward));
        this.Reg(new FighthardDetailView(EViewType.FighthardDetail));
        this.Reg(new FighthardTujianView(EViewType.FighthardTuJian));
        E.MsgMgr.AddMsg(MSGID.TeamFightInit, this.onTeamFightInit, this);
        E.MsgMgr.AddMsg(MSGID.TeamFight, this.onTeamFight, this);
        E.MsgMgr.AddMsg(MSGID.TeamFightRankList,this.onTeamFightRankListRevc,this);
        E.MsgMgr.AddMsg(MSGID.TeamFightRankReward,this.onTeamFightRankReward,this);
        E.MsgMgr.AddMsg(MSGID.TeamFightHarmReward,this.onTeamFightHarmReward,this);
    }
    private onTeamFightHarmReward(revc:TeamFightHarmReward_revc){
        // console.log(revc);
        this.data.harmRewardFid = revc.harmRewardFid;
        this.event(FightMonsterModel.EVENT_DETAIL);
        this.event(FightMonsterModel.EVENT_UPDATA);
    }
    /**奖励是否已经领取 */
    public harmIsLingQu(fid:number){
        return fid <= this.data.harmRewardFid;
    }
    private onTeamFightRankReward(revc:TeamFightRankReward_revc){
        // this.rankRewardState = revc.rankRewardState;
        this.data.rankRewardState = revc.rankRewardState;
        // console.log(revc.rankRewardState);
        this.event(FightMonsterModel.EVENT_REWARD_UPDATA);
    }

    private onTeamFightRankListRevc(revc:TeamFightRankList_revc){
        this.rankList = revc.dataList.map(o => ({ ...o, accHarm: o.accHarm.toNumber() }));
        this.plus = revc.plus;
        this.event(FightMonsterModel.EVENT_RANK_LIST);
    }

    private onTeamFightInit(revc:TeamFightInit_revc){
        this.data = { ...revc, accHarm: revc.accHarm.toNumber() };
    }
    private onTeamFight(revc:TeamFight_revc){
        this.data.freeNum = revc.freeNum;
        this.data.buyNum = revc.buyNum;
        this.data.adNum = revc.adNum;
        this.data.accHarm = revc.accHarm.toNumber();
        this.data.ranking = revc.ranking;
        this.totalHarm = revc.totalHarm;
        this.event(FightMonsterModel.EVENT_UPDATA);
    }

    /**初始化重置数据 */
    public onInitCallBack(): void {
        this.data = null;
        this.plus = 0;
    }
    /**当前伤害值 */
    public get accHarm(): number{
        if(this.data){
            return this.data.accHarm;
        }
    }
    /**是否是免费 */
    public isFree() {
        let cfg = this.cfg;
        if (this.data.freeNum < cfg.f_FreeMax) {
            return true;
        }
        return false;
    }

    public get cfg(){
        return t_TeamFight_Config.Ins.cfg;
    }

    /**需要的元宝 */
    public get needGold(){
        let cfg = this.cfg;
        let val:number = parseInt(cfg.f_PurchaseInitial.split("-")[1]);
        return val + this.data.buyNum *  parseInt(cfg.f_PurchaseInc.split("-")[1]);
    }

    public get freeCount(){
        return this.cfg.f_FreeMax - this.data.freeNum;
    }

    /**广告挑战次数 */
    public get adFreeCount(){
        return this.cfg.f_MaxAD - this.data.adNum;
    }

    /**是否有广告次数 */
    public get hasADtime(){
        let cfg = this.cfg;
        if (this.data.adNum < cfg.f_MaxAD) {
            return true;
        }
        return false;
    }

    public getBossMonster(that?,func?){
        let cfg = t_TeamFight_BossAttribute.Ins.getByBossId(this.data.bossId);
        let key = cfg.f_Res;
        let url = `o/spine/${key}/${key}`;
        // let _avatar = AvatarFactory.createBossMonster(`o/spine/${key}/${key}`);
        // _avatar.initFightRes();
        // _avatar.initBlood();
        // _avatar.blood.reverse();
        // return _avatar;
        let _avatar = AvatarFactory.createBossMonster(url,that,func);
        return _avatar;
    }

    public get subTime(){
/*
        let offsetTime = TimeUtil.toSecond(this.cfg.f_TeamFightClose);
        let sub = TimeUtil.curZeroTime + offsetTime + (7 - TimeUtil.getDay()) * 24 * 3600 - TimeUtil.serverTime;
        return sub;
*/
        let sub:number = this.data.closeUnix - TimeUtil.serverTime;
        return sub;
    }

    public lingqu(){
        let req = new TeamFightRankReward_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    public strConvert(val: number) {
        let _1y = 100000000;
        let checkVal = 1000000;
        if (val >= checkVal && val < _1y) {
            val = val / checkVal;
            return Math.floor(val * (checkVal/10000)) + "万";
        } else if (val >= _1y) {
            val = val / _1y;
            return val.toFixed(1) + "亿";
            // return Math.floor(val) + "亿";
        }
        return val.toString();
    }
}