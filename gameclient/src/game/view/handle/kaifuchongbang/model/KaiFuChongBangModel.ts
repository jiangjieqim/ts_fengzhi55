import { stActivityCell, stCommonRank, stPeakJjcAvatar } from "../../../../network/protocols/BaseProto";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { KFCBAdvantureRewardProxy } from "../proxy/KaiFuChongBangProxy";

export class KaiFuChongBangModel extends Laya.EventDispatcher{
    private static _ins: KaiFuChongBangModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new KaiFuChongBangModel();
        }
        return this._ins;
    } 

    public static UpdataView_Rank:string = "UpdataView_Rank";

    public rankList:stCommonRank[];
    public self:stCommonRank[];
    public top3:stPeakJjcAvatar[];

    public isRedTip(){
        if(MainModel.Ins.isOpenByFuncId(EFuncDef.KaiFuChongBang.toString())){
            if(this.isGuanKaRedTip() ){
                return true;
            }
        }
        return false;
    }

    public isGuanKaRedTip(){
        // let vo = ActivityModel.Ins.getVo(EActivityType.KaiFuChongBang);
        // if(vo){
        //     let arr:stActivityCell[] = vo.vo.datalist;
        //     for (let i: number = 0; i < arr.length; i++) {
        //         let cfg = KFCBAdvantureRewardProxy.Ins.GetDataById(arr[i].id);
        //         if(cfg && cfg.f_Type == 1){
        //             if (arr[i].param1 == 2) {
        //                 return true;
        //             }
        //         }
        //     }
        // }
        return false;
    }
}