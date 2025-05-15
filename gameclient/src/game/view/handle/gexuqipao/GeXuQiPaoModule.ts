import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { GeXuQiPaoInit_revc, GeXuQiPaoPack_revc, GeXuQiPaoShop_revc, GeXuQiPaoTask_revc, GeXuQiPaoZhuiJi_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { GeXuQiPaoModel } from "./model/GeXuQiPaoModel";
import { GeXuQiPaoView } from "./view/GeXuQiPaoView";

export class GeXuQiPaoModule extends BaseModel{
    private static _ins:GeXuQiPaoModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new GeXuQiPaoModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onMainViewInit);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onMainViewInit);

        this.Reg(new GeXuQiPaoView(EViewType.GeXuQiPaoView));

        E.MsgMgr.AddMsg(MSGID.GeXuQiPaoInit, this.GeXuQiPaoInit,this);
        E.MsgMgr.AddMsg(MSGID.GeXuQiPaoTask, this.GeXuQiPaoTask,this);
        E.MsgMgr.AddMsg(MSGID.GeXuQiPaoPack, this.GeXuQiPaoPack,this);
        E.MsgMgr.AddMsg(MSGID.GeXuQiPaoShop, this.GeXuQiPaoShop,this);
        E.MsgMgr.AddMsg(MSGID.GeXuQiPaoZhuiJi, this.GeXuQiPaoZhuiJi,this);
    }

    private onMainViewInit() {
        Laya.timer.callLater(this, this.setDot);
    }

    private setDot() {
        if (GeXuQiPaoModel.Ins.isDotMain()) {
            MainModel.Ins.funcSetRed(EFuncDef.gexuqipao, true);
        }else {
            MainModel.Ins.funcSetRed(EFuncDef.gexuqipao, false);
        }
    }

    private GeXuQiPaoInit(value:GeXuQiPaoInit_revc){
        GeXuQiPaoModel.Ins.taskList = value.taskList;
        GeXuQiPaoModel.Ins.packList = value.packList;
        GeXuQiPaoModel.Ins.shopList = value.shopList;
        GeXuQiPaoModel.Ins.refreshUnix = value.refreshUnix;
        GeXuQiPaoModel.Ins.endUnix = value.endUnix;
        GeXuQiPaoModel.Ins.event(GeXuQiPaoModel.UPDATA_VIEW);
        this.onMainViewInit();
    }

    private GeXuQiPaoTask(value:GeXuQiPaoTask_revc){
        for(let i:number=0;i<value.taskList.length;i++){
            let index = GeXuQiPaoModel.Ins.taskList.findIndex(ele => ele.fid == value.taskList[i].fid);
            if(index != -1){
                GeXuQiPaoModel.Ins.taskList[index] = value.taskList[i];
            }
        }
        GeXuQiPaoModel.Ins.event(GeXuQiPaoModel.UPDATA_VIEW);
        this.onMainViewInit();
    }

    private GeXuQiPaoPack(value:GeXuQiPaoPack_revc){
        let index = GeXuQiPaoModel.Ins.packList.findIndex(ele => ele.fid == value.data.fid);
        if (index != -1) {
            GeXuQiPaoModel.Ins.packList[index] = value.data;
        }
        GeXuQiPaoModel.Ins.event(GeXuQiPaoModel.UPDATA_VIEW);
        this.onMainViewInit();
    }

    private GeXuQiPaoShop(value:GeXuQiPaoShop_revc){
        for(let i:number=0;i<value.shopList.length;i++){
            let index = GeXuQiPaoModel.Ins.shopList.findIndex(ele => ele.fid == value.shopList[i].fid);
            if(index != -1){
                GeXuQiPaoModel.Ins.shopList[index] = value.shopList[i];
            }
        }
        GeXuQiPaoModel.Ins.event(GeXuQiPaoModel.UPDATA_VIEW);
        this.onMainViewInit();
    }

    private GeXuQiPaoZhuiJi(value:GeXuQiPaoZhuiJi_revc){
        GeXuQiPaoModel.Ins.jcList = value.datalist;
        GeXuQiPaoModel.Ins.event(GeXuQiPaoModel.UPDATA_XL_VIEW);
    }
}