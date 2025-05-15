import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { GemChange_revc, GemFormationBuy_revc, GemFormationChange_revc, GemFreeChange_revc, GemHandler_revc, GemInit_revc, GemLifeBlood_revc, GemRemove_revc } from "../../../network/protocols/BaseProto";
import { DotManager } from "../common/DotManager";
import { System_RefreshTimeProxy } from "../huodong/model/ActivityProxy";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { BaoShiModel } from "./model/BaoShiModel";
import { BaoShiShopProxy } from "./proxy/BaoShiProxy";
import { BaoShiAutoHCTip } from "./view/BaoShiAutoHCTip";
import { BaoShiDHView } from "./view/BaoShiDHView";
import { BaoShiGMView } from "./view/BaoShiGMView";
import { BaoShiGongMingView } from "./view/BaoShiGongMingView";
import { BaoShiHCView } from "./view/BaoShiHCView";
import { BaoShiMainView } from "./view/BaoShiMainView";
import { BaoShiTJView } from "./view/BaoShiTJView";
import { BaoShiXQView } from "./view/BaoShiXQView";
import { FazhengDHView } from "./view/FazhengDHView";
import { FazhengGHView } from "./view/FazhengGHView";

export class BaoShiModule extends BaseModel{
    private static _ins:BaoShiModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new BaoShiModule();
        }
        return this._ins;
    }

    public onInitCallBack(): void {
        BaoShiModel.Ins.gemList = [];
        BaoShiModel.Ins.mationIdList = [];
        BaoShiModel.Ins.mationId = 0;
        BaoShiModel.Ins.lifeBloodList = [];
    }

    public initMsg(){
        this.Reg(new BaoShiMainView(EViewType.BaoShiMainView));
        this.Reg(new BaoShiXQView(EViewType.BaoShiXQView));
        this.Reg(new BaoShiDHView(EViewType.BaoShiDHView));
        this.Reg(new BaoShiGMView(EViewType.BaoShiGMView));
        this.Reg(new BaoShiTJView(EViewType.BaoShiTJView));
        this.Reg(new FazhengGHView(EViewType.FaZhengGHView));
        this.Reg(new FazhengDHView(EViewType.FaZhengDHView));
        this.Reg(new BaoShiHCView(EViewType.BaoShiHCView));
        this.Reg(new BaoShiAutoHCTip(EViewType.BaoShiAutoHCView));
        this.Reg(new BaoShiGongMingView(EViewType.BaoShiGongMingView));

        E.MsgMgr.AddMsg(MSGID.GemInit, this.GemInit,this);
        E.MsgMgr.AddMsg(MSGID.GemBuy, this.GemBuy,this);
        E.MsgMgr.AddMsg(MSGID.GemChange,this.GemChange,this);
        E.MsgMgr.AddMsg(MSGID.GemRemove,this.GemRemove,this);
        E.MsgMgr.AddMsg(MSGID.GemFormationBuy,this.GemFormationBuy,this);
        E.MsgMgr.AddMsg(MSGID.GemFormationChange,this.GemFormationChange,this);
        E.MsgMgr.AddMsg(MSGID.GemHandler,this.GemHandler,this);
        E.MsgMgr.AddMsg(MSGID.GemFreeChange,this.GemFreeChange,this);
        E.MsgMgr.AddMsg(MSGID.GemLifeBlood,this.GemLifeBlood,this);

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onValChange);
    }

    private onValChange(id:number){
        let arr = System_RefreshTimeProxy.Ins.getVal(18).split("|");
        if(arr.indexOf(id.toString()) != -1){
            this.onMainViewInit();
        }
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){
        if(BaoShiModel.Ins.isResDot()){
            DotManager.addMainDot("icon6",-20,-5);
        }else{
            DotManager.remMainDot("icon6");
        }
    }

    //珠宝初始化协议
    private GemInit(value:GemInit_revc){
        BaoShiModel.Ins.gemList = value.datalist;
        BaoShiModel.Ins.mationIdList = value.formationIds;
        BaoShiModel.Ins.mationId = value.defaultFormationId;
        BaoShiModel.Ins.lifeBloodList = value.lifeBloodList;
    }

    //购买宝石成功
    private GemBuy(){
        E.ViewMgr.Close(EViewType.BaoShiGMView);
    }

    //珠宝变化返回 背包的变化信息,可以是多个(操作购买，法阵、合成、重铸、变质时候用到)
    private GemChange(value:GemChange_revc){
        for(let i:number = 0; i < value.datalist.length; i++){
            let index = BaoShiModel.Ins.gemList.findIndex(ele => ele.uid.toNumber() == value.datalist[i].uid.toNumber());
            if(index != -1){
                BaoShiModel.Ins.gemList[index] = value.datalist[i];
            }else{
                BaoShiModel.Ins.gemList.push(value.datalist[i]);
            }
        }
        BaoShiModel.Ins.event(BaoShiModel.BAOSHI_UPDATA);
    }

    //删除背包信息,可以是多个
    private GemRemove(value:GemRemove_revc){
        for(let i:number = 0; i < value.datalist.length; i++){
            let index = BaoShiModel.Ins.gemList.findIndex(ele => ele.uid.toNumber() == value.datalist[i].toNumber());
            if(index != -1){
                BaoShiModel.Ins.gemList.splice(index,1);
            }
        }
        BaoShiModel.Ins.event(BaoShiModel.BAOSHI_UPDATA);
    }

    //购买宝石法阵返回
    private GemFormationBuy(value:GemFormationBuy_revc){
        BaoShiModel.Ins.mationIdList = value.datalist;
        BaoShiModel.Ins.event(BaoShiModel.FAZHENG_UPDATA);
    }

    //切换法阵返回
    private GemFormationChange(value:GemFormationChange_revc){
        BaoShiModel.Ins.mationId = value.defaultFormationId;
        BaoShiModel.Ins.event(BaoShiModel.DEFFAZHENG_UPDATA);
    }

    //宝石合成返回
    private GemHandler(value:GemHandler_revc){
        BaoShiModel.Ins.event(BaoShiModel.BAOSHI_HC,value);
    }

    //领取免费宝石
    private GemFreeChange(value:GemFreeChange_revc) {
        const free = BaoShiShopProxy.Ins.List.find(o => o.f_freetimes > 0)?.f_freetimes || 0;
        BaoShiModel.Ins.freeNum = free - value.freeCount;
        BaoShiModel.Ins.event(BaoShiModel.GemFreeChange,value);
    }

    //宝石血脉变化
    private GemLifeBlood(value:GemLifeBlood_revc){
        for(let i:number=0;i<value.lifeBloodList.length;i++){
            let index = BaoShiModel.Ins.lifeBloodList.findIndex(ele => ele.id === value.lifeBloodList[i].id);
            if(index != -1){
                BaoShiModel.Ins.lifeBloodList[index] = value.lifeBloodList[i];
            }
        }
        BaoShiModel.Ins.event(BaoShiModel.lifeBloodChange);
        this.onMainViewInit();
    }
}