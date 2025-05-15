import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { DailyWheelBigPrize_revc, DailyWheelTurn_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { MeiRiZhuanPanModel } from "./model/MeiRiZhuanPanModel";
import { MeiRiZhuanPanTip1 } from "./view/MeiRiZhuanPanTip1";
import { MeiRiZhuanPanTip2 } from "./view/MeiRiZhuanPanTip2";
import { MeiRiZhuanPanTip3 } from "./view/MeiRiZhuanPanTip3";
import { MeiRiZhuanPanView } from "./view/MeiRiZhuanPanView";

export class MeiRiZhuanPanModule extends BaseModel{
    private static _ins:MeiRiZhuanPanModule;
    private _model:MeiRiZhuanPanModel;
    public static get ins(){
        if(!this._ins){
            this._ins = new MeiRiZhuanPanModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        this._model = MeiRiZhuanPanModel.Ins;

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onMainViewInit);

        this.Reg(new MeiRiZhuanPanView(EViewType.MeiRiZhuanPanView));
        this.Reg(new MeiRiZhuanPanTip1(EViewType.MeiRiZhuanPanTip1));
        this.Reg(new MeiRiZhuanPanTip2(EViewType.MeiRiZhuanPanTip2));
        this.Reg(new MeiRiZhuanPanTip3(EViewType.MeiRiZhuanPanTip3));

        E.MsgMgr.AddMsg(MSGID.DailyWheelBigPrize, this.DailyWheelBigPrize,this);
        E.MsgMgr.AddMsg(MSGID.DailyWheelTurn, this.DailyWheelTurn,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){
        if(MeiRiZhuanPanModel.Ins.isRedTip()){
            MainModel.Ins.funcSetRed(EFuncDef.MeiRiZhuanPan,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.MeiRiZhuanPan,false);
        }
    }

    //每日转盘活动设置大奖
    private DailyWheelBigPrize(value:DailyWheelBigPrize_revc){
        this._model.setItemId = value.itemId;
        this.onMainViewInit();
        this._model.event(MeiRiZhuanPanModel.UPDATA_ITEMID);
    }

    //每日转盘转动(奖励领取情况走礼包协议)
    private DailyWheelTurn(value:DailyWheelTurn_revc){
        this._model.pos = value.pos;
        this._model.event(MeiRiZhuanPanModel.UPDATA_ZHUANPAN);
    }
}