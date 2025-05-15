import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { BuyMilitaryPledge_revc, CheifMoraleReward_revc, CheifStarUp_revc, CheifStarUpMulti_revc, ChiefBuyFlag_revc, ChiefChangeFlag_revc, ChiefInit_revc, ChiefMainChange_revc, ChiefUpgradeFlag_req, ChiefUpgradeFlag_revc, DrawLevelChange_revc, MountChief_revc, RecruitChief_revc, TrammelsChief_revc, TrammelsChiefInit_revc } from "../../../network/protocols/BaseProto";
import { DotManager } from "../common/DotManager";
import { EFuncDef } from "../main/model/EFuncDef";
import { ItemViewFactory } from "../main/model/ItemViewFactory";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { ZuoQiEvent } from "../zuoqi/vos/ZuoQiEvent";
import { ZuoQiModel } from "../zuoqi/ZuoqiModel";
import { FuJiangModel } from "./model/FuJiangModel";
import { FuJiangAttrView } from "./view/FuJiangAttrView";
import { FuJiangAttrView1 } from "./view/FuJiangAttrView1";
import { FuJiangChouKaView } from "./view/FuJiangChouKaView";
import { FuJiangCKView } from "./view/FuJiangCKView";
import { FuJiangCZView } from "./view/FuJiangCZView";
import { FuJiangGLTip } from "./view/FuJiangGLTip";
import { FuJiangGMView } from "./view/FuJiangGMView";
import { FuJiangHDView } from "./view/FuJiangHDView";
import { FuJiangHDView1 } from "./view/FuJiangHDView1";
import { FuJiangMountCKView } from "./view/FuJiangMountCKView";
import { FuJiangPYView } from "./view/FuJiangPYView";
import { FuJiangSkillTip } from "./view/FuJiangSkillTip";
import { FuJiangSQTip } from "./view/FuJiangSQTip";
import { FuJiangStarView } from "./view/FuJiangStarView";
import { FuJiangStarView1 } from "./view/FuJiangStarView1";
import { FuJiangView } from "./view/FuJiangView";
import { FuJiangWSView } from "./view/FuJiangWSView";
import { FuJiangWSView1 } from "./view/FuJiangWSView1";
import { FuJiangXQView } from "./view/FuJiangXQView";
import { FuJIiangZQGHView } from "./view/FuJIiangZQGHView";
import { FujiangJBSXView } from "./view/jiban/FujiangJBSXView";
import { FujiangJBView } from "./view/jiban/FujiangJBView";
import { FujiangJBZBView } from "./view/jiban/FujiangJBZBView";
import { FujiangSCZZView } from "./view/jiban/FujiangSCZZView";

export class FuJiangModule extends BaseModel{
    private static _ins:FuJiangModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new FuJiangModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{}

    public initMsg(){
        this.Reg(new FuJiangView(EViewType.FuJiang));
        this.Reg(new FuJiangChouKaView(EViewType.FuJiangChouKa));
        this.Reg(new FuJiangGMView(EViewType.FuJiangGouMai));
        this.Reg(new FuJiangHDView(EViewType.FuJiangHuoDe));
        this.Reg(new FuJiangWSView(EViewType.FuJiangWuSun));
        this.Reg(new FuJiangCKView(EViewType.FuJiangCK));
        this.Reg(new FuJiangWSView1(EViewType.FuJiangWuSun1));
        this.Reg(new FuJiangPYView(EViewType.FuJiangPY));
        this.Reg(new FuJiangCZView(EViewType.FuJiangCZ));
        this.Reg(new FuJiangStarView(EViewType.FuJiangStar));
        this.Reg(new FuJiangSkillTip(EViewType.FuJiangSkillTip));
        this.Reg(new FuJiangSQTip(EViewType.FuJiangSQTip));
        this.Reg(new FuJiangXQView(EViewType.FuJiangXQView));
        this.Reg(new FuJiangMountCKView(EViewType.FuJiangMountCKView));
        this.Reg(new FuJiangAttrView(EViewType.FuJiangAttrView));
        this.Reg(new FuJIiangZQGHView(EViewType.FuJIiangZQGHView));
        this.Reg(new FuJiangStarView1(EViewType.FuJiangStarView1));
        this.Reg(new FuJiangHDView1(EViewType.FuJiangHDView1));

        this.Reg(new FujiangSCZZView(EViewType.FujiangSCZZView));
        this.Reg(new FujiangJBSXView(EViewType.FujiangJBSXView));
        this.Reg(new FujiangJBView(EViewType.FujiangJBView));
        this.Reg(new FujiangJBZBView(EViewType.FujiangJBZBView));
        this.Reg(new FuJiangAttrView1(EViewType.FuJiangAttrView1));
        this.Reg(new FuJiangGLTip(EViewType.FuJiangGLTip));

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.ValChange,this,this.onMainViewInit);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA,this,this.onMainViewInit);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_SHIQI_UPDATA,this,this.onMainViewInit);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_JIBAN,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.ChiefInit, this.ChiefInit,this);
        E.MsgMgr.AddMsg(MSGID.ChiefMainChange, this.ChiefMainChange,this);
        E.MsgMgr.AddMsg(MSGID.RecruitChief, this.RecruitChief,this);
        E.MsgMgr.AddMsg(MSGID.BuyMilitaryPledge, this.BuyMilitaryPledge,this);
        E.MsgMgr.AddMsg(MSGID.CheifStarUp, this.CheifStarUp,this);
        E.MsgMgr.AddMsg(MSGID.CheifMoraleReward, this.CheifMoraleReward,this);
        E.MsgMgr.AddMsg(MSGID.MountChief, this.MountChief,this);
        E.MsgMgr.AddMsg(MSGID.TrammelsChiefInit, this.TrammelsChiefInit,this);
        E.MsgMgr.AddMsg(MSGID.TrammelsChief, this.TrammelsChief,this);
        E.MsgMgr.AddMsg(MSGID.ChiefBuyFlag, this.ChiefBuyFlag,this);
        E.MsgMgr.AddMsg(MSGID.ChiefChangeFlag, this.ChiefChangeFlag,this);
        E.MsgMgr.AddMsg(MSGID.ChiefUpgradeFlag, this.ChiefUpgradeFlag,this);
        E.MsgMgr.AddMsg(MSGID.CheifStarUpMulti, this.CheifStarUpMulti,this);
        E.MsgMgr.AddMsg(MSGID.DrawLevelChange, this.DrawLevelChange,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setRedTip);
    }

    private setRedTip(){
        if(TaskModel.Ins.isFuncOpen(EFuncDef.FuJiang)){
            if(FuJiangModel.Ins.isFuJiangRedTip()){
                MainModel.Ins.funcSetRed(EFuncDef.FuJiang,true);
            }else{
                MainModel.Ins.funcSetRed(EFuncDef.FuJiang,false);
            }
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.FuJiang,false);
        }
        if(FuJiangModel.Ins.isFJJBRedTip()){
            MainModel.Ins.funcSetRed(EFuncDef.FuJiangJB,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.FuJiangJB,false);
        }
    }

    //副将初始化的协议
    private ChiefInit(value:ChiefInit_revc){
        FuJiangModel.Ins.fujiangList = value.dataList;
        FuJiangModel.Ins.nextFreeUnix = value.nextFreeUnix;
        FuJiangModel.Ins.freeCount = value.freeCount;
        FuJiangModel.Ins.moraleRewardNum = value.moraleRewardNum;
        FuJiangModel.Ins.isNewServer = value.isNewServer;
        FuJiangModel.Ins.flagList = value.flagList;
        FuJiangModel.Ins.flagId = value.flag;
        FuJiangModel.Ins.flagSerial = value.flagSerial;
        FuJiangModel.Ins.flagFight = value.flagFight;
        FuJiangModel.Ins.drawLevel = value.drawLevel;
        FuJiangModel.Ins.curDrawExp = value.curDrawExp;
    }

    //副将数据变动
    private ChiefMainChange(value:ChiefMainChange_revc){
        for(let i:number=0;i<value.dataList.length;i++){
            let index = FuJiangModel.Ins.fujiangList.findIndex(ele => ele.cheifId == value.dataList[i].cheifId);
            if(index != -1){
                FuJiangModel.Ins.fujiangList[index] = value.dataList[i];
            }else{
                FuJiangModel.Ins.fujiangList.push(value.dataList[i]);
            }
        }
        FuJiangModel.Ins.changefjList = value.dataList;
        FuJiangModel.Ins.nextFreeUnix = value.nextFreeUnix;
        FuJiangModel.Ins.freeCount = value.freeCount;
        FuJiangModel.Ins.event(FuJiangModel.FUJIANG_UPDATA);
    }

    //招募副将
    private RecruitChief(value:RecruitChief_revc){
        FuJiangModel.Ins.recruitChief = value.dataList;
        FuJiangModel.Ins.event(FuJiangModel.FUJIANG_ZHAOMU_UPDATA);
    }

    //购买军令状成功返回
    private BuyMilitaryPledge(value:BuyMilitaryPledge_revc){
        E.ViewMgr.Close(EViewType.FuJiangGouMai);
    }

    //副将提升星级
    private CheifStarUp(value:CheifStarUp_revc){
        if (E.ViewMgr.IsOpen(EViewType.FuJiangPY)) {
            E.ViewMgr.Open(EViewType.FuJiangStar,null,value.cheifId);
        }else{
            FuJiangModel.Ins.event(FuJiangModel.FUJIANG_STAR,value.cheifId);
        }
    }

    //士气变化
    private CheifMoraleReward(value:CheifMoraleReward_revc){
        FuJiangModel.Ins.moraleRewardNum = value.moraleRewardNum;
        FuJiangModel.Ins.event(FuJiangModel.FUJIANG_SHIQI_UPDATA);
    }

    //副将与坐骑的绑定关系(坐骑初始化和坐骑变化的时候推送)
    private MountChief(value:MountChief_revc){
        let _zqModel:ZuoQiModel = ZuoQiModel.Ins;
        FuJiangModel.Ins.mountRelationList = value.dataList;
        let l = value.dataList;

        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            let findCell = _zqModel.getMountVoById(cell.mountId);
            if(findCell){
                // findCell.lockedList = findCell.lockedList;
                findCell.equipVo = cell.equipItem;
                findCell.washList = cell.refinements;
                findCell.washCanLock = cell.canLock;
                findCell.curVo = _zqModel.getRideVo(cell.mountId);
            }else{
                let vo = ItemViewFactory.createRideVo(cell);
                _zqModel.rideVoList.push(vo);
            }
        }
        FuJiangModel.Ins.event(FuJiangModel.FUJIANG_MOUNT_UPDATA);
        _zqModel.event(ZuoQiEvent.MountRefinement);   
    }

    //玩家已装备的副将羁绊（初始化推）
    private TrammelsChiefInit(value: TrammelsChiefInit_revc) {
        FuJiangModel.Ins.jbDataList = value.dataList;
    }

    //副将羁绊更新
    private TrammelsChief(value:TrammelsChief_revc){
        let vo = FuJiangModel.Ins.jbDataList.find(ele => ele.pos == value.data.pos);
        if(vo){
            vo.id = value.data.id;
            vo.state = value.data.state;
        }
        FuJiangModel.Ins.event(FuJiangModel.FUJIANG_JIBAN);
    }

    //购买副将战旗
    private ChiefBuyFlag(value:ChiefBuyFlag_revc){
        FuJiangModel.Ins.flagList = value.dataList;
        FuJiangModel.Ins.event(FuJiangModel.FLAG_LIST);
    }

    //更换副将战旗
    private ChiefChangeFlag(value:ChiefChangeFlag_revc){
        FuJiangModel.Ins.flagId = value.id;
        FuJiangModel.Ins.flagFight = value.flagFight;
        FuJiangModel.Ins.event(FuJiangModel.FLAG_ID);
    }

    //升级副将战旗
    private ChiefUpgradeFlag(value:ChiefUpgradeFlag_revc){
        FuJiangModel.Ins.flagSerial = value.flagSerial;
        FuJiangModel.Ins.flagFight = value.flagFight;
        FuJiangModel.Ins.event(FuJiangModel.FLAG_LEVEL);
    }

    private CheifStarUpMulti(value:CheifStarUpMulti_revc){
        E.ViewMgr.Open(EViewType.FuJiangStarView1);
    }

    //副将抽取等级变化
    private DrawLevelChange(value:DrawLevelChange_revc){
        FuJiangModel.Ins.drawLevel = value.drawLevel;
        FuJiangModel.Ins.curDrawExp = value.curDrawExp;
        FuJiangModel.Ins.event(FuJiangModel.CHOUKA_LEVEL);
    }
}