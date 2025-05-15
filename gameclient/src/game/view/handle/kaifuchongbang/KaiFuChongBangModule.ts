import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { OpenServerAdventureRank_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { KaiFuChongBangModel } from "./model/KaiFuChongBangModel";
import { KaiFuChongBangAwardView } from "./view/KaiFuChongBangAwardView";
import { KaiFuChongBangView } from "./view/KaiFuChongBangView";

export class KaiFuChongBangModule extends BaseModel{
    private static _ins:KaiFuChongBangModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new KaiFuChongBangModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onMainViewInit);

        this.Reg(new KaiFuChongBangView(EViewType.KaiFuChongBangView));
        this.Reg(new KaiFuChongBangAwardView(EViewType.KaiFuChongBangAwardView));

        E.MsgMgr.AddMsg(MSGID.OpenServerAdventureRank, this.OpenServerAdventureRank,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){
        if(KaiFuChongBangModel.Ins.isRedTip()){
            MainModel.Ins.funcSetRed(EFuncDef.KaiFuChongBang,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.KaiFuChongBang,false);
        }
    }

    //冒险开服冲榜响应(结束时间根据礼包流水号id=37的时间)
    private OpenServerAdventureRank(value:OpenServerAdventureRank_revc){
        KaiFuChongBangModel.Ins.rankList = value.dataList;
        KaiFuChongBangModel.Ins.self = value.self;
        KaiFuChongBangModel.Ins.top3 = value.top3;
        KaiFuChongBangModel.Ins.event(KaiFuChongBangModel.UpdataView_Rank);
    }
}