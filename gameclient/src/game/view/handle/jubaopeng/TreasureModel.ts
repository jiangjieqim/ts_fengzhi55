import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import {TimeUtil} from "../../../../frame/util/TimeUtil";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { FundInit_revc, FundReward_revc, stFund } from "../../../network/protocols/BaseProto";
import { ELingQuStatus } from "../huodong/model/EActivityType";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainModel } from "../main/model/MainModel";
import { RedEnum } from "../main/model/RedEnum";
import { t_Fund } from "./proxys/TreasureProxy";
import { TreasureVo } from "./vos/TreasureVo";

/**聚宝盆 */
export class TreasureModel extends BaseModel{
    public static EventUpdate:string = "EventUpdate";//更新

    private static _ins:TreasureModel;
    public static get ins(){
        if(!this._ins){
            this._ins = new TreasureModel();
        }
        return this._ins;
    }
    public fundData:FundInit_revc;// = new FundInit_revc();
    /**初始化重置数据 */
    public onInitCallBack():void{
        let l = this.dataList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            cell.reset();
        }
        this.fundData = new FundInit_revc();
    }
    public initMsg(): void{
        E.MsgMgr.AddMsg(MSGID.FundInit,this.onFundInit,this);
        E.MsgMgr.AddMsg(MSGID.FundReward,this.onFundReward,this);
    }

    private onFundInit(revc:FundInit_revc){
        this.fundData = revc;
        this.updateRed();
        this.event(TreasureModel.EventUpdate);
    }
    
    private onFundReward(revc:FundReward_revc){
        let cell:stFund = revc.updatedFundData;
        let l = this.fundData.fundList||[];
        let find:boolean = false;
        for(let i = 0;i < l.length;i++){
            let o = l[i];
            if(o.id == cell.id){
                l[i] = cell;
                find = true;
                break;
            }
        }
        if(!find){
            if(!this.fundData.fundList){
                this.fundData.fundList = [];
            }
            this.fundData.fundList.push(cell);
        }
        this.updateRed();
        this.event(TreasureModel.EventUpdate);
    }
    /**活动是开启着*/
    public get isOpen() {
        return this.endTime > TimeUtil.serverTime;
    }

    /**已经购买了基金 */
    public get isPay(){
        // return this.isOpen && this.fundData.fundList.length > 0;
        if(this.isOpen){
            let l = this.fundData.fundList;
            for(let i = 0;i < l.length;i++){
                let cell = l[i];
                if(cell.canBuy == 0){
                    return true;
                }
            }
        }
    }

    private _dataList:TreasureVo[];
    public get dataList(){
        if(!this._dataList){
            this._dataList = [];
            let l1 = t_Fund.Ins.List;
            for(let i = 0;i < l1.length;i++){
                let vo = new TreasureVo();
                vo.cfg = l1[i];
                this._dataList.push(vo);
            }
        }
        return this._dataList;
    }

    public get endTime(){
        // return TimeUtil.serverTime + 3600 * 24 * 6;        
        return this.fundData.endUnix || 0;
    }
    ///////////////////////////////////////////////////////////////////////////////////
    /**是否有红点 */
    public get hasRed() {
        if (this.isOpen) {
            let need: boolean = false;
            let l = this.fundData.fundList || [];
            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                let canLingqu = this.stFund_hasRed(cell);
                if (canLingqu) {
                    need = true;
                    break;
                }
            }
            return need || MainModel.Ins.needRed(RedEnum.RED_JuBaoPeng);
        }
    }

    private stFund_hasRed(cell:stFund){
        let l = cell.dataList;
        for(let n = 0;n < l.length;n++){
            let o = l[n];
            if(o.state == ELingQuStatus.CanLLingQu){
                return true;
            }
        }
    }

    /**单个领取节点 */
    public getStatus(fund_f_id:number,sub_f_id:number):ELingQuStatus{
        let l = this.fundData.fundList||[];
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.id == fund_f_id){
                // let status = this.stFundAndSub_f_id_hasRed(cell,sub_f_id);
                // return status;
                let l2 = cell.dataList;
                for(let n = 0;n < l2.length;n++){
                    let o = l2[n];
                    if(o.f_id == sub_f_id){
                        return o.state;
                    }
                }
                // return ELingQuStatus.NotCanLingQu;
            }
        }
        return ELingQuStatus.NotCanLingQu;
    }
    /**fund是否有可以领取的 */
    public isFundCanLingqu(fund_f_id:number){
        let l = this.fundData.fundList||[];
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.id == fund_f_id){
                if(this.stFund_hasRed(cell)){
                    return true;
                }
            }
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////
    /**是否已经购买了 */
    public isBuyed(fund_f_id:number){
        let l = this.fundData.fundList||[];
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.id == fund_f_id && cell.canBuy == 0){
                return true;
            }
        }
    }
    
    public updateRed(){
        MainModel.Ins.funcSetRed(EFuncDef.JuBaoPeng, this.hasRed);
    }
}