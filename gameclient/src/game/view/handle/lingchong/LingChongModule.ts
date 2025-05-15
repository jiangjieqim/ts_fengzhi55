import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { MulTimes_revc, PetBaoDiChange_revc, PetBuyFlute_revc, PetChange_revc, PetExtractSuccess_revc, PetFreeChange_revc, PetHandleNewTalent_revc, PetInit_revc, PetNewTalent_revc, PetRemove_revc, PetUpgradeTalent_revc } from "../../../network/protocols/BaseProto";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { LingChongModel } from "./model/LingChongModel";
import { LingChongCQView } from "./view/LingChongCQView";
import { LingChongCZView } from "./view/LingChongCZView";
import { LingChongFanPaiView } from "./view/LingChongFanPaiView";
import { LingChongGMView } from "./view/LingChongGMView";
import { LingChongLVView } from "./view/LingChongLVView";
import { LingChongMainView } from "./view/LingChongMainView";
import { LingChongStarView } from "./view/LingChongStarView";
import { LingChongTJView } from "./view/LingChongTJView";
import { LingChongXMTJView } from "./view/LingChongXMTJView";
import { LingChongXMView } from "./view/LingChongXMView";
import { LingChongExchangeView } from "./view/LingChongExchangeView";
import { ZuoQiModel } from "../zuoqi/ZuoqiModel";
import { LingChongFanPaiView1 } from "./view/LingChongFanPaiView1";

export class LingChongModule extends BaseModel{
    private static _ins:LingChongModule;

    private _model:LingChongModel;

    public static get ins(){
        if(!this._ins){
            this._ins = new LingChongModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        this._model.nextFreeUnix = 0;
        this._model.freeCount = 0;
        this._model.baoDi = 0;
        this._model.petDataList = [];
    }

    public initMsg(): void {
        this._model = LingChongModel.Ins;

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);

        this.Reg(new LingChongMainView(EViewType.LingChongMainView));
        this.Reg(new LingChongGMView(EViewType.LingChongGMView));
        this.Reg(new LingChongFanPaiView(EViewType.LingChongFanPaiView));
        this.Reg(new LingChongTJView(EViewType.LingChongTJView));
        this.Reg(new LingChongXMTJView(EViewType.LingChongXMTJView));
        this.Reg(new LingChongCZView(EViewType.LingChongCZView));
        this.Reg(new LingChongLVView(EViewType.LingChongLVView));
        this.Reg(new LingChongStarView(EViewType.LingChongStarView));
        this.Reg(new LingChongXMView(EViewType.LingChongXMView));
        this.Reg(new LingChongCQView(EViewType.LingChongCQView));
        this.Reg(new LingChongExchangeView(EViewType.LingChongExchange));
        this.Reg(new LingChongFanPaiView1(EViewType.LingChongFanPaiView1));

        E.MsgMgr.AddMsg(MSGID.PetInit, this.PetInit,this);
        E.MsgMgr.AddMsg(MSGID.PetChange, this.PetChange,this);
        E.MsgMgr.AddMsg(MSGID.PetFreeChange, this.PetFreeChange,this);
        E.MsgMgr.AddMsg(MSGID.PetBaoDiChange, this.PetBaoDiChange,this);
        E.MsgMgr.AddMsg(MSGID.PetRemove, this.PetRemove,this);
        E.MsgMgr.AddMsg(MSGID.PetHandleNewTalent, this.PetHandleNewTalent,this);
        E.MsgMgr.AddMsg(MSGID.PetBuyFlute, this.PetBuyFlute,this);
        E.MsgMgr.AddMsg(MSGID.PetExtractSuccess, this.PetExtractSuccess,this);
        E.MsgMgr.AddMsg(MSGID.PetUpgradeTalent, this.PetUpgradeTalent,this);
        E.MsgMgr.AddMsg(MSGID.PetNewTalent, this.PetNewTalent,this);
        E.MsgMgr.AddMsg(MSGID.MulTimes, this.MulTimes,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setRedTip);
    }

    private setRedTip(){
        if(LingChongModel.Ins.isRedTip()){
            MainModel.Ins.funcSetRed(EFuncDef.LingChong,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.LingChong,false);
        }
    }

    //宠物初始化协议
    private PetInit(value:PetInit_revc){
        this._model.nextFreeUnix = value.nextFreeUnix;
        this._model.freeCount = value.freeCount;
        this._model.baoDi = value.baoDi;
        this._model.petDataList = value.dataList;
    }

    //宠物变化
    private PetChange(value:PetChange_revc){
        for(let i:number=0;i<value.dataList.length;i++){
            let index = this._model.petDataList.findIndex(ele => ele.petSerialNum == value.dataList[i].petSerialNum);
            if(index != -1){
                this._model.petDataList[index] = value.dataList[i];
            }else{
                this._model.petDataList.push(value.dataList[i]);
            }
        }
        this._model.event(LingChongModel.Updata_LingChong);
    }

    //免费抽取宠物信息变化
    private PetFreeChange(value:PetFreeChange_revc){
        this._model.nextFreeUnix = value.nextFreeUnix;
        this._model.freeCount = value.freeCount;
        this._model.event(LingChongModel.Updata_ChouKa);
        this.onMainViewInit();
    }

    //宠物保底变化
    private PetBaoDiChange(value:PetBaoDiChange_revc){
        this._model.baoDi = value.baoDi;
        this._model.event(LingChongModel.Updata_ChouKa);
    }

    //删除宠物
    private PetRemove(value:PetRemove_revc){
        for(let i:number=0;i<value.petSerialNums.length;i++){
            let index = this._model.petDataList.findIndex(ele => ele.petSerialNum == value.petSerialNums[i]);
            if(index != -1){
                this._model.petDataList.splice(index,1);
            }
        }
        this._model.event(LingChongModel.REMOVE_LingChong);
    }

    //获取新的血脉觉醒
    private PetNewTalent(value:PetNewTalent_revc) {
        LingChongModel.Ins.event(LingChongModel.UPDATA_NEW_XM);
    }

    //处理血脉觉醒
    private PetHandleNewTalent(value:PetHandleNewTalent_revc){
        LingChongModel.Ins.event(LingChongModel.UPDATA_EQUIP_XM,value);
    }

    //血脉提升
    private PetUpgradeTalent(value:PetUpgradeTalent_revc){
        LingChongModel.Ins.event(LingChongModel.UPDATA_LEVEL_XM,value.idx);
    }



    //购买唤灵笛成功返回
    private PetBuyFlute(value:PetBuyFlute_revc){
        E.ViewMgr.Close(EViewType.LingChongGMView);
    }

    //抽取宠物成功
    private PetExtractSuccess(value:PetExtractSuccess_revc){
        if(value.type != 3){
            this._model.ckList.push(value.petIds);
            if (E.ViewMgr.IsOpen(EViewType.LingChongFanPaiView)) {
                let view:LingChongFanPaiView = E.ViewMgr.Get(EViewType.LingChongFanPaiView) as LingChongFanPaiView;
                view.refresh(this._model.ckList.shift());
            }else{
                E.ViewMgr.Open(EViewType.LingChongFanPaiView);
            }
        }else{
            this._model.ckList1.push(value.petIds);
            if (E.ViewMgr.IsOpen(EViewType.LingChongFanPaiView1)) {
                let view:LingChongFanPaiView1 = E.ViewMgr.Get(EViewType.LingChongFanPaiView1) as LingChongFanPaiView1;
                view.refresh(this._model.ckList1.shift());
            }else{
                E.ViewMgr.Open(EViewType.LingChongFanPaiView1);
            }
        }
    }

    private MulTimes(value:MulTimes_revc){
        if(value.type == 1){    
            ZuoQiModel.Ins.slstate = value.state;
        }else if(value.type == 2){
            LingChongModel.Ins.slstate = value.state;
        }
    }
}