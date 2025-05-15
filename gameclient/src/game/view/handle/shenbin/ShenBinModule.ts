import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { ArtifactList_revc, ArtifactLogList_revc, ArtifactPackList_revc, ArtifactPackUpdate_revc, ArtifactSuitInit_revc, ArtifactSuitUpdate_revc, ArtifactUpdate_revc, OpenArtifactBox_revc } from "../../../network/protocols/BaseProto";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { ShenBinModel } from "./model/ShenBinModel";
import { ShenBinLBView } from "./view/ShenBinLBView";
import { ShenBinLogView } from "./view/ShenBinLogView";
import { ShenBinLvView } from "./view/ShenBinLvView";
import { ShenBinTZView } from "./view/ShenBinTZView";
import { ShenBinView } from "./view/ShenBinView";

export class ShenBinModule extends BaseModel{
    private static _ins:ShenBinModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new ShenBinModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{}

    public initMsg(){
        this.Reg(new ShenBinView(EViewType.ShenBin));
        this.Reg(new ShenBinLvView(EViewType.ShenBinLv));
        this.Reg(new ShenBinLogView(EViewType.ShenBinLog));
        this.Reg(new ShenBinLBView(EViewType.ShenBinLB));
        this.Reg(new ShenBinTZView(EViewType.ShenBinTZView));
 
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.ArtifactList, this.ArtifactList,this);
        E.MsgMgr.AddMsg(MSGID.OpenArtifactBox, this.OpenArtifactBox,this);
        E.MsgMgr.AddMsg(MSGID.ArtifactUpdate, this.ArtifactUpdate,this);
        E.MsgMgr.AddMsg(MSGID.ArtifactLogList, this.ArtifactLogList,this);
        E.MsgMgr.AddMsg(MSGID.ArtifactPackList, this.ArtifactPackList,this);
        E.MsgMgr.AddMsg(MSGID.ArtifactPackUpdate, this.ArtifactPackUpdate,this);
        E.MsgMgr.AddMsg(MSGID.ArtifactSuitInit, this.ArtifactSuitInit,this);
        E.MsgMgr.AddMsg(MSGID.ArtifactSuitUpdate, this.ArtifactSuitUpdate,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){
        if(ShenBinModel.Ins.isDotMain()){
            MainModel.Ins.funcSetRed(EFuncDef.Confraternity,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.Confraternity,false);
        }
    }

    //神兵初始化
    private ArtifactList(value:ArtifactList_revc){
        ShenBinModel.Ins.dataList = value.datalist;
    }

    //开神兵宝箱
    private OpenArtifactBox(value:OpenArtifactBox_revc){
        if(value.itemlist.length == 1){
            ShenBinModel.Ins.openItem = value.itemlist[0];
            ShenBinModel.Ins.event(ShenBinModel.OPEN_ITEM);
        }else{
            ShenBinModel.Ins.openItemList = value.itemlist;
            ShenBinModel.Ins.event(ShenBinModel.OPEN_ITEMLIST);
        }
        this.onMainViewInit();
    }

    //神兵变化
    private ArtifactUpdate(value:ArtifactUpdate_revc){
        for(let i:number=0;i<value.datalist.length;i++){
            let index = ShenBinModel.Ins.dataList.findIndex(ele => ele.artifactId == value.datalist[i].artifactId);
            if(index != -1){
                ShenBinModel.Ins.dataList[index] = value.datalist[i];
            }
        }
        ShenBinModel.Ins.event(ShenBinModel.UPDATA_SHENBIN);
        this.onMainViewInit();
    }

    //神兵开箱日志
    private ArtifactLogList(value:ArtifactLogList_revc){
        ShenBinModel.Ins.dataLogList = value.datalist;
        ShenBinModel.Ins.event(ShenBinModel.UPDATA_LOGVIEW);
    }

    //神兵礼包购买情况初始化
    private ArtifactPackList(value:ArtifactPackList_revc){
        ShenBinModel.Ins.dataPackList = value.datalist;
        this.onMainViewInit();
    }

    //购买神兵礼包后更新（购买次数）
    private ArtifactPackUpdate(value:ArtifactPackUpdate_revc){
        for(let i:number=0;i<value.datalist.length;i++){
            let index = ShenBinModel.Ins.dataPackList.findIndex(ele => ele.id == value.datalist[i].id);
            if(index != -1){
                ShenBinModel.Ins.dataPackList[index] = value.datalist[i];
            }
        }
        ShenBinModel.Ins.event(ShenBinModel.UPDATA_PACK);
        this.onMainViewInit();
    }

    //神兵套装数据（3010前发）
    private ArtifactSuitInit(value:ArtifactSuitInit_revc){
        ShenBinModel.Ins.tzList = value.dataList;
    }

    //神兵套装数据更新（激活时推，状态发生变化时主动推）
    private ArtifactSuitUpdate(value:ArtifactSuitUpdate_revc){
        for(let i:number=0;i<value.dataList.length;i++){
            let index = ShenBinModel.Ins.tzList.findIndex(ele => ele.fid == value.dataList[i].fid);
            if(index != -1){
                ShenBinModel.Ins.tzList[index] = value.dataList[i];
            }
        }
        ShenBinModel.Ins.event(ShenBinModel.UPDATA_TZ);
        this.onMainViewInit();
    }
}