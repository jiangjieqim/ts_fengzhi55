import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { TimeUtil } from "../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../frame/view/ButtonCtl";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { FirstDayCharge_revc, NameingChange_revc, NameingServer_revc, NamingChargeRankFirstDay_revc, NamingChargeRank_revc, NamingInit_revc, NamingReward_revc, stNamingReward } from "../../../network/protocols/BaseProto";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainModel } from "../main/model/MainModel";
import { NamingEvent } from "./NamingEvent";
import { t_NamingRight } from "./t_NamingRight";
import { NamingChargeRenameView } from "./views/NamingChargeRenameView";
import { NamingChargeRewardView } from "./views/NamingChargeRewardView";
import { NamingChargeView } from "./views/NamingChargeView";
export enum ENameReward{
    /**不可以领取 */
    Nothing = 0,
    /**已经领取 */
    AlreadyGet = 1,
    /**可以领取 */
    CanGet = 2,
}
export enum ENameDayType{
    Null = 0,
    /**首日 */
    FirstDay = 1,
    /**区服 */
    Region = 2,
}

export class NamingChargeModel extends BaseModel{
    /**首日充值的总金额 */
    public firstDayCNY:number;

    initData:NamingInit_revc;
    firstDayData:NamingChargeRankFirstDay_revc;
    rankData:NamingChargeRank_revc;
    // private timeData:NamingUnixChange_revc;
    private static _ins: NamingChargeModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new NamingChargeModel();
        }
        return this._ins;
    }
    private _proxyCfg:t_NamingRight;
    get proxyCfg(){
        if(!this._proxyCfg){
            this._proxyCfg = new t_NamingRight();
        }
        return this._proxyCfg;
    }
    public initMsg(): void {
        // throw new Error("Method not implemented.");
        this.Reg(new NamingChargeView(EViewType.NamingChargeMain));
        this.Reg(new NamingChargeRenameView(EViewType.NamingChargeAlert));
        this.Reg(new NamingChargeRewardView(EViewType.NamingChargeReward));

        E.MsgMgr.AddMsg(MSGID.NamingInit,this.onNamingInit,this);
        E.MsgMgr.AddMsg(MSGID.NameingChange,this.onNameingChange,this);
        E.MsgMgr.AddMsg(MSGID.NameingServer,this.onNameingServer,this);
        E.MsgMgr.AddMsg(MSGID.NamingChargeRankFirstDay,this.onNamingChargeRankFirstDay,this);
        E.MsgMgr.AddMsg(MSGID.NamingChargeRank,this.onNamingChargeRank,this);
        // E.MsgMgr.AddMsg(MSGID.NamingUnixChange,this.onNamingUnixChange,this);
        E.MsgMgr.AddMsg(MSGID.FirstDayCharge,this.onFirstDayCharge,this);
        E.MsgMgr.AddMsg(MSGID.NamingReward,this.onNamingReward,this);
    }

    private pushReward(cell:stNamingReward){
        let l = this.initData.dataList;
        let obj = l.find(o=>o.id == cell.id);
        if(obj){
            obj.state = cell.state;
        }else{
            this.initData.dataList.push(cell);
        }
    }

    private onNamingReward(revc:NamingReward_revc){
        // this.initData.dataList = revc.dataList;
        let l = revc.dataList;
        for(let i = 0;i < l.length;i++){
            this.pushReward(l[i])
        }

        this.checkRed();
        this.event(NamingEvent.RewardUpdate);
    }

    private onFirstDayCharge(revc:FirstDayCharge_revc){
        this.firstDayCNY = revc.cnt;
    }
    /**初始化协议 */
    private onNamingInit(revc:NamingInit_revc){
        this.initData = revc;
        this.firstDayCNY = revc.firstDayCharge;
        this.checkRed();
    }
    private onNameingChange(revc:NameingChange_revc){
        if(this.initData){
            this.initData.canNamed = revc.canNamed;
            this.initData.namedTimes = revc.namedTimes;
            this.initData.namedEndUnix = revc.namedEndUnix;
        }else{
            LogSys.Error("onNameingChange this.initData is null!");
        }
    }

    private checkRed(){
        let l = this.initData.dataList;
        let hasRed:boolean = false;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.state == 2){
                hasRed = true;
                break;
            }
        }
        MainModel.Ins.funcSetRed(EFuncDef.NamingCharge,hasRed);
    }

    getStatus(id:number){
        if(this.initData){
            let l = this.initData.dataList;
            let cell = l.find(o=>o.id == id);
            if(cell){
                return cell.state;
            }
        }
        return 0;
    }

    private onNameingServer(revc:NameingServer_revc){
        MainModel.Ins.mRoleData.serverName = revc.naming;
        E.ViewMgr.ShowMidOk(E.getLang("naming_charge_14"));
    }
    private onNamingChargeRankFirstDay(revc:NamingChargeRankFirstDay_revc){
        this.firstDayData = revc;
        this.event(NamingEvent.RankUpdate);
    }
    private onNamingChargeRank(revc:NamingChargeRank_revc){
        this.rankData = revc;
        this.event(NamingEvent.RankUpdate);
    }

    // private onNamingUnixChange(revc:NamingUnixChange_revc){
    //     this.timeData = revc;
    // }

    public onInitCallBack(): void {
        // throw new Error("Method not implemented.");
        this.firstDayData = null;
        // this.timeData = null;
        this.rankData = null;
        this.initData = null;
        this.firstDayCNY = 0;
    }

    /**是否可以领取 */
    isCanGet(id:number){
        if(this.initData){
            let l = this.initData.dataList;
            let cell = l.find(o=>o.id == id);
            if(cell){
                return cell.state == ENameReward.CanGet;
            }
        }
        return false;
    }
    /**本玩家首次充日的金额 */

    // /**获取结算时间 */
    // getTimeVoByType(type:ENameDayType){
    //     if(this.timeData){
    //         let l = this.timeData.dataList
    //         let cell = l.find(o=>o.flag == type);
    //         if(cell){
    //             return cell.unix;
    //         }
    //     }
    //     return 0;
    // }
    /**是否可以冠名 */
    get isCanNamed(){
        if(Laya.Utils.getQueryString("isCanNamed")){
            return true;
        }
        if(this.initData){
            return this.initData.namedTimes > 0 && this.initData.canNamed == 1;
        }
    }

    public get isOpen(){
        return this.initData && (this.initData.canNamed == 1);
    }

    /**区服是否开启 */
    public get isRegionOpen() {
        if (this.initData) {
            let subtime = this.initData.firstDayEndUnix - TimeUtil.serverTime;
            return subtime < 0;
        }
        return false;
    }
}