import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { PlayerTotalCnt_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { LiBaoModel } from "./model/LiBaoModel";
import { MountLiBaoView } from "./view/MountLiBaoView";
import { PetLiBaoView } from "./view/PetLiBaoView";

export class LiBaoModule extends BaseModel{
    private static _ins:LiBaoModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new LiBaoModule();
        }
        return this._ins;
    }

    public onInitCallBack():void{
        
    }
    
    public initMsg(): void {
        ActivityModel.Ins.on(ActivityEvent.OpenCloseStatusUpdate,this,this.onActivityUpdateData);

        this.Reg(new MountLiBaoView(EViewType.MountLiBaoView));
        this.Reg(new PetLiBaoView(EViewType.PetLiBaoView));

        E.MsgMgr.AddMsg(MSGID.PlayerTotalCnt, this.PlayerTotalCnt,this);
    }

    private onActivityUpdateData(){
        if(LiBaoModel.Ins.isOpenByFid(49) == false){
            E.ViewMgr.Close(EViewType.MountLiBaoView);
        }
        if(LiBaoModel.Ins.isOpenByFid(50) == false){
            E.ViewMgr.Close(EViewType.PetLiBaoView);
        }
    }

    private PlayerTotalCnt(value:PlayerTotalCnt_revc){
        LiBaoModel.Ins.PlayerTotalCnt = value.totalCnt;
    }
}