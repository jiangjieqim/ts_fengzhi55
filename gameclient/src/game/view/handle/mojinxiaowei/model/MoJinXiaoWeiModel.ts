import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { stDailyEvent, stDailyEventTask } from "../../../../network/protocols/BaseProto";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { MainModel } from "../../main/model/MainModel";
import { DailyEventPositionProxy } from "../proxy/MoJinXiaoWeiProxy";

export class MoJinXiaoWeiModel extends Laya.EventDispatcher{
    private static _ins: MoJinXiaoWeiModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new MoJinXiaoWeiModel();
        }
        return this._ins;
    } 

    public taskList:stDailyEventTask[];
    public taskEndUnix:number;

    public xlList:stDailyEvent[];
    public xlPosition:number;

    public static UPDATA_TASK_VIEW:string = "UPDATA_TASK_VIEW";
    public static UPDATA_XL_VIEW:string = "UPDATA_XL_VIEW";

    public showView(){
        if(MoJinXiaoWeiModel.Ins.xlList && MoJinXiaoWeiModel.Ins.xlList.length){
            let data = MoJinXiaoWeiModel.Ins.xlList.shift();
            Laya.timer.callLater(this,this.openView,[data]);
        }
    }

    private openView(data){
        if(data.type == 1){
            E.ViewMgr.Open(EViewType.MoJinXiaoWeiView2,null,data);
        }else{
            E.ViewMgr.Open(EViewType.MoJinXiaoWeiView1,null,data);
        }
    }

    public isDotMain(){
        if(this.isDotTab1() || this.isDotTab2()){
            return true;
        }
        return false;
    }

    public isDotTab1(){
        let cfg = DailyEventPositionProxy.Ins.GetDataById(1);
        let id = parseInt(cfg.f_Cost.split("-")[0]);
        let count = MainModel.Ins.mRoleData.getVal(id);
        let max = parseInt(System_RefreshTimeProxy.Ins.getVal(75));
        if(count >= max){
            return true;
        }
        return false;
    }

    public isDotTab2(){
        for(let i:number=0;i<this.taskList.length;i++){
            if(this.taskList[i].state == 1){
                return true;
            }
        }
        return false;
    }
}