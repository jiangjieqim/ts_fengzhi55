import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ActivityModel } from "../../huodong/ActivityModel";

export class LiBaoModel extends Laya.EventDispatcher{
    private static _ins: LiBaoModel;

    public PlayerTotalCnt:number;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new LiBaoModel();
        }
        return this._ins;
    } 

    public isOpenByFid(fid:number){
        let vo = ActivityModel.Ins.getByUid(fid);
        if(vo && vo.statusData){
            if(vo.statusData.status == 1){
                return true;
            }
        }
        return false;
    }

    public getPlayerTotal(){
        return StringUtil.moneyCv(this.PlayerTotalCnt);
    }
}