import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { DailyEventInit_revc, DailyEventSearch_revc, DailyEventTaskUpdate_revc, stDailyEvent } from "../../../network/protocols/BaseProto";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { MoJinXiaoWeiModel } from "./model/MoJinXiaoWeiModel";
import { MoJinXiaoWeiView } from "./view/MoJinXiaoWeiView";
import { MoJinXiaoWeiView1 } from "./view/MoJinXiaoWeiView1";
import { MoJinXiaoWeiView2 } from "./view/MoJinXiaoWeiView2";

export class MoJinXiaoWeiModule extends BaseModel{
    private static _ins:MoJinXiaoWeiModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new MoJinXiaoWeiModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        MoJinXiaoWeiModel.Ins.taskList = [];
    }

    public initMsg(): void {
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onMainViewInit);

        this.Reg(new MoJinXiaoWeiView(EViewType.MoJinXiaoWeiView));
        this.Reg(new MoJinXiaoWeiView1(EViewType.MoJinXiaoWeiView1));
        this.Reg(new MoJinXiaoWeiView2(EViewType.MoJinXiaoWeiView2));

        E.MsgMgr.AddMsg(MSGID.DailyEventInit, this.DailyEventInit,this);
        E.MsgMgr.AddMsg(MSGID.DailyEventTaskUpdate, this.DailyEventTaskUpdate,this);
        E.MsgMgr.AddMsg(MSGID.DailyEventSearch, this.DailyEventSearch,this);
    }

    private onMainViewInit() {
        Laya.timer.callLater(this, this.setDot);
    }

    private setDot() {
        if (MoJinXiaoWeiModel.Ins.isDotMain()) {
            MainModel.Ins.funcSetRed(EFuncDef.MoJinXiaoWei, true);
        }else {
            MainModel.Ins.funcSetRed(EFuncDef.MoJinXiaoWei, false);
        }
    }

    //摸金校尉初始化（3010前推，服务器时间刷新时推）
    private DailyEventInit(value:DailyEventInit_revc){
        MoJinXiaoWeiModel.Ins.taskList = value.taskList;
        MoJinXiaoWeiModel.Ins.taskEndUnix = value.taskEndUnix;
        MoJinXiaoWeiModel.Ins.event(MoJinXiaoWeiModel.UPDATA_TASK_VIEW);
        this.onMainViewInit();
    }

    //摸金校尉任务更新（任务数据变化时返回）
    private DailyEventTaskUpdate(value:DailyEventTaskUpdate_revc){
        for(let i:number=0;i<value.taskList.length;i++){
            let index = MoJinXiaoWeiModel.Ins.taskList.findIndex(ele => ele.fid == value.taskList[i].fid);
            if(index != -1){
                MoJinXiaoWeiModel.Ins.taskList[index] = value.taskList[i];
            }
        }
        MoJinXiaoWeiModel.Ins.event(MoJinXiaoWeiModel.UPDATA_TASK_VIEW);
        this.onMainViewInit();
    }

    //摸金校尉寻龙
    private DailyEventSearch(value:DailyEventSearch_revc){
        MoJinXiaoWeiModel.Ins.xlList = value.dataList;
        MoJinXiaoWeiModel.Ins.xlList.sort((this.onSort));
        MoJinXiaoWeiModel.Ins.xlPosition = value.position;
        MoJinXiaoWeiModel.Ins.event(MoJinXiaoWeiModel.UPDATA_XL_VIEW);
    }

    private onSort(a:stDailyEvent,b:stDailyEvent){
        return a.type - b.type;
    }
}