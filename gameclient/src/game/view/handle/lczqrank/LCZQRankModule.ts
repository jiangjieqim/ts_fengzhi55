import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { SkyRank_revc, WatchSkyRank_revc } from "../../../network/protocols/BaseProto";
import { LCZQRankModel } from "./model/LCZQRankModel";
import { LCZQRankTip } from "./view/LCZQRankTip";
import { LCZQRankTip1 } from "./view/LCZQRankTip1";
import { LCZQRankView } from "./view/LCZQRankView";

export class LCZQRankModule extends BaseModel{
    private static _ins:LCZQRankModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new LCZQRankModule();
        }
        return this._ins;
    }

    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        this.Reg(new LCZQRankView(EViewType.LCZQRankView));
        this.Reg(new LCZQRankTip(EViewType.LCZQRankTip));
        this.Reg(new LCZQRankTip1(EViewType.LCZQRankTip1));

        E.MsgMgr.AddMsg(MSGID.SkyRank, this.SkyRank,this);
        E.MsgMgr.AddMsg(MSGID.WatchSkyRank, this.WatchSkyRank,this);
    }

    private SkyRank(value:SkyRank_revc){
        LCZQRankModel.Ins.event(LCZQRankModel.UPDATA_VIEW,value);
    }

    private WatchSkyRank(value:WatchSkyRank_revc){
        if(value.type == 2){
            E.ViewMgr.Open(EViewType.LCZQRankTip,null,value);
        }else{
            E.ViewMgr.Open(EViewType.LCZQRankTip1,null,value);
        }
    }
}