import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { TitleChange_revc, TitleExpire_revc, TitleInfo_revc, TitleRefresh_revc, TitleReward_revc, TitleStateUpdate_revc, TitleUpdate_revc } from "../../../network/protocols/BaseProto";
import { MainView } from "../main/MainView";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { ChengHaoModel } from "./model/ChengHaoModel";
import { ChengHaoView } from "./view/ChengHaoView";

export class ChengHaoModule extends BaseModel{
    private static _ins:ChengHaoModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new ChengHaoModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        ChengHaoModel.Ins.newTitleList = [];
    }
    
    public initMsg(){
        this.Reg(new ChengHaoView(EViewType.CHENGHAO));

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);
        ChengHaoModel.Ins.on(ChengHaoModel.SELECT_CH,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.TitleInfo, this.TitleInfo,this);
        E.MsgMgr.AddMsg(MSGID.TitleStateUpdate, this.TitleStateUpdate,this);
        E.MsgMgr.AddMsg(MSGID.TitleUpdate, this.TitleUpdate,this);
        E.MsgMgr.AddMsg(MSGID.TitleReward, this.TitleReward,this);
        E.MsgMgr.AddMsg(MSGID.TitleChange, this.TitleChange,this);
        E.MsgMgr.AddMsg(MSGID.TitleExpire, this.TitleExpire,this);
        E.MsgMgr.AddMsg(MSGID.TitleRefresh, this.TitleRefresh,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){   
        let view:MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
        if(view){
            if(ChengHaoModel.Ins.isRedTip()){
                view.setTitleRed(true);
            }else{
                view.setTitleRed(false);
            }
        }
    }

    //玩家称号信息（3010前推）
    private TitleInfo(value: TitleInfo_revc) {
        ChengHaoModel.Ins.titleList = value.titleList;
        ChengHaoModel.Ins.wearedTitleId = value.wearedTitleId;
        ChengHaoModel.Ins.state = value.state;
        ChengHaoModel.Ins.newTitleList = [];
        this.onMainViewInit();
    }

    //玩家新解锁的称号列表（解锁新称号时推）
    private TitleUpdate(value:TitleUpdate_revc){
        for(let i:number=0;i<value.titleList.length;i++){
            ChengHaoModel.Ins.titleList.push(value.titleList[i]);
            
            let index = ChengHaoModel.Ins.newTitleList.findIndex(ele => ele.titleId === value.titleList[i].titleId);
            if(index != -1){
                ChengHaoModel.Ins.newTitleList[index].isSelect = false;
            }else{
                let obj:any = {};
                obj.titleId = value.titleList[i].titleId;
                obj.isSelect = false;
                ChengHaoModel.Ins.newTitleList.push(obj);
            }
        }
        ChengHaoModel.Ins.event(ChengHaoModel.UPDATA_VIEW);
        this.onMainViewInit();
    }

    //称号奖励领取状态变化时推
    private TitleStateUpdate(value:TitleStateUpdate_revc){
        ChengHaoModel.Ins.state = value.state;
        // ChengHaoModel.Ins.event(ChengHaoModel.UPDATA_VIEW_AWARD);
        this.onMainViewInit();
    }

    //领取称号奖励
    private TitleReward(value:TitleReward_revc){
        ChengHaoModel.Ins.taskTitleId = value.titleId;
        ChengHaoModel.Ins.state = value.state;
        ChengHaoModel.Ins.vals = value.vals;
        ChengHaoModel.Ins.event(ChengHaoModel.UPDATA_VIEW_AWARD);
        this.onMainViewInit();
    }

    // 打开称号
    private TitleRefresh(value:TitleRefresh_revc){
        ChengHaoModel.Ins.taskTitleId = value.titleId;
        ChengHaoModel.Ins.state = value.state;
        ChengHaoModel.Ins.vals = value.vals;
        ChengHaoModel.Ins.event(ChengHaoModel.UPDATA_VIEW);
    }

    //换称号
    private TitleChange(value:TitleChange_revc){
        ChengHaoModel.Ins.wearedTitleId = value.titleId;
        ChengHaoModel.Ins.event(ChengHaoModel.UPDATA_CHENGHAO);
    }

    //称号到期时推
    private TitleExpire(value:TitleExpire_revc){
        for(let i:number=0;i<value.titleList.length;i++){
            let index = ChengHaoModel.Ins.titleList.findIndex(ele => ele.titleId === value.titleList[i].titleId);
            ChengHaoModel.Ins.titleList.splice(index,1);
        }
        ChengHaoModel.Ins.event(ChengHaoModel.UPDATA_VIEW);
    }
}