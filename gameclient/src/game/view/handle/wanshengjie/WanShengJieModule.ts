import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { TotalCntChange_revc, TotalCntInit_revc, TotalCntReward_revc } from "../../../network/protocols/BaseProto";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { WanShengJieModel } from "./model/WanShengJieModel";
import { WanShengJieView } from "./view/WanShengJieView";
import { WanShengJieView1 } from "./view/WanShengJieView1";

export class WanShengJieModule extends BaseModel{
    private static _ins:WanShengJieModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new WanShengJieModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);

        this.Reg(new WanShengJieView(EViewType.WanShengJieView));
        this.Reg(new WanShengJieView1(EViewType.WanShengJieView1));

        E.MsgMgr.AddMsg(MSGID.TotalCntInit, this.TotalCntInit,this);
        E.MsgMgr.AddMsg(MSGID.TotalCntReward, this.TotalCntReward,this);
        E.MsgMgr.AddMsg(MSGID.TotalCntChange, this.TotalCntChange,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){
        if(WanShengJieModel.Ins.isRedTip()){
            MainModel.Ins.funcSetRed(EFuncDef.WanShengJie,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.WanShengJie,false);
        }
    }

    private TotalCntInit(value:TotalCntInit_revc){
        WanShengJieModel.Ins.totalCnt = value.totalCnt;
        WanShengJieModel.Ins.rewardList = value.rewardList;
        this.onMainViewInit();
    }

    private TotalCntReward(value:TotalCntReward_revc){
        WanShengJieModel.Ins.rewardList = value.dataList;
        WanShengJieModel.Ins.event(WanShengJieModel.UpdataView);
        this.onMainViewInit();
    }

    private TotalCntChange(value:TotalCntChange_revc){
        WanShengJieModel.Ins.totalCnt = value.totalCnt;
        WanShengJieModel.Ins.event(WanShengJieModel.UpdataView);
        this.onMainViewInit();
    }
}