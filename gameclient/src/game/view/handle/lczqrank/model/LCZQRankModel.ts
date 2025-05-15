import { stSkyRank } from "../../../../network/protocols/BaseProto";

export class LCZQRankModel extends Laya.EventDispatcher{
    private static _ins: LCZQRankModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new LCZQRankModel();
        }
        return this._ins;
    } 

    public static UPDATA_VIEW:string = "UPDATA_VIEW"; 
}