import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { RecurringBossInit_revc, RecurringBossUpdate_revc } from "../../../network/protocols/BaseProto";
import { KangJiXiongShouModel } from "./model/KangJiXiongShouModel";
import { KangJiXiongShouView } from "./view/KangJiXiongShouView";
import { KangJiXiongShouView2 } from "./view/KangJiXiongShouView2";

export class KangJiXiongShouModule extends BaseModel{
    private static _ins:KangJiXiongShouModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new KangJiXiongShouModule();
        }
        return this._ins;
    }

    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        this.Reg(new KangJiXiongShouView(EViewType.KangJiXiongShouView));
        this.Reg(new KangJiXiongShouView2(EViewType.KangJiXiongShouView2));

        E.MsgMgr.AddMsg(MSGID.RecurringBossInit, this.RecurringBossInit,this);
        E.MsgMgr.AddMsg(MSGID.RecurringBossUpdate, this.RecurringBossUpdate,this);
    }

    private RecurringBossInit(value:RecurringBossInit_revc){
        KangJiXiongShouModel.Ins.bossId = value.bossId;
        KangJiXiongShouModel.Ins.endunix = value.endunix;
        KangJiXiongShouModel.Ins.freeNum = value.freeNum;
        KangJiXiongShouModel.Ins.buyNum = value.buyNum;
        KangJiXiongShouModel.Ins.adNum = value.adNum;
    }

    private RecurringBossUpdate(value:RecurringBossUpdate_revc){
        KangJiXiongShouModel.Ins.totalHarm = value.totalHarm;
        KangJiXiongShouModel.Ins.freeNum = value.freeNum;
        KangJiXiongShouModel.Ins.buyNum = value.buyNum;
        KangJiXiongShouModel.Ins.adNum = value.adNum;
        KangJiXiongShouModel.Ins.event(KangJiXiongShouModel.UPDATA_VIEW);
    }
}