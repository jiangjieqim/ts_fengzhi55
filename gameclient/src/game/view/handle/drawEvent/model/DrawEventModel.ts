import { stDrawEventCumulateRewardInfo, stDrawEventPack, stDrawEventRewardInfo, stDrawEventTask } from "../../../../network/protocols/BaseProto";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { DrawEventConfigProxy, DrawEventPackProxy } from "../proxy/DrawEventProxy";

export class DrawEventModel extends Laya.EventDispatcher{
    private static _ins: DrawEventModel;
    
    public static get Ins() {
        if (!this._ins) {
            this._ins = new DrawEventModel();
        }
        return this._ins;
    } 

    public static UPDATA_VIEW_TASK:string = "UPDATA_VIEW_TASK";
    public static UPDATA_VIEW_PACK:string = "UPDATA_VIEW_PACK";
    public static UPDATA_VIEW_FID:string = "UPDATA_VIEW_FID";
    public static UPDATA_VIEW_AWARD:string = "UPDATA_VIEW_AWARD";
    public static UPDATA_VIEW_LINQUAWARD:string = "UPDATA_VIEW_LINQUAWARD";
    public static PLAY_EFF:string = "PLAY_EFF";
    public static END_EFF:string = "END_EFF";

    public rewardFid:number;//玩家当前选择的大奖fid
    public type:number;//当前开启的活动子id（t_Pack_Controller的f_p2）
    public count:number;//玩家累计抽取次数
    public fuYunCount:number;
    public rewardList:stDrawEventRewardInfo[];//玩家的奖励数据
    public cumulateRewardList:stDrawEventCumulateRewardInfo[];//玩家的累计奖励数据
    public taskList:stDrawEventTask[];
    public packList:stDrawEventPack[];
    public refreshUnix:number;//任务/礼包的刷新时间戳（秒）
    public endUnix:number;//活动结束时间戳（秒）

    public isMainDot(){
        if(MainModel.Ins.isOpenByFuncId(EFuncDef.DrawEvent.toString())){
            if(this.isTabRedTip1() || this.isTabRedTip2() || this.isTabRedTip3()){
                return true;
            }
        }
        return false;
    }

    public isTabRedTip1(){
        let cfg:Configs.t_DrawEvent_Config_dat = DrawEventConfigProxy.Ins.getCfgByType(this.type);
        if(cfg){
            let id = parseInt(cfg.f_DrawCost.split("-")[0]);
            let count = MainModel.Ins.mRoleData.getVal(id);
            if(count){
                return true;
            }
            if(this.isCumAwardRedTip()){
                return true;
            }
        }
        return false;
    }

    public isTabRedTip2(){
        if(!this.packList){
            return false;
        }
        for(let i:number=0;i<this.packList.length;i++){
            let cfg:Configs.t_DrawEvent_Pack_dat = DrawEventPackProxy.Ins.GetDataById(this.packList[i].fid);
            if(cfg.f_PackType == 1){
                if(this.packList[i].count < cfg.f_PackBuyLimit){
                    return true;
                }
            }
        }
        return false;
    }

    public isTabRedTip3(){
        if(!this.taskList){
            return false;
        }
        for(let i:number=0;i<this.taskList.length;i++){
            if(this.taskList[i].state == 1){
                return true;
            }
        }
        return false;
    }

    public isCumAwardRedTip(){
        if(!this.cumulateRewardList){
            return false;
        }
        for(let i:number=0;i<this.cumulateRewardList.length;i++){
            if(this.cumulateRewardList[i].state == 2){
                return true;
            }
        }
        return false;
    }
}