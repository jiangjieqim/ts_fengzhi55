/* @Author: tsy
 * @Date: 2023-02-17 11:43:45
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-03 15:15:23
*/
import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { ELayerType } from "../../../layer/LayerMgr";
import { MSGID } from "../../../network/MSGID";
import { BlessingAutoZH_revc_revc, BlessingChange_revc, BlessingInit_revc } from "../../../network/protocols/BaseProto";
import { DotManager } from "../common/DotManager";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { FuYouItemTip } from "../main/views/grid/FuYouItemTip";
import { FuYouItemTip1 } from "../main/views/grid/FuYouItemTip1";
import { HuYouModel } from "./model/HuYouModel";
import { HuYouView } from "./view/HuYouView";
import { WeiTuoTip } from "./view/WeiTuoTip";
import { ZhuanHuanTip } from "./view/ZhuanHuaTip";

export class HuYouModule extends BaseModel{
    private static _ins:HuYouModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new HuYouModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        HuYouModel.Ins.bagList = {};
        HuYouModel.Ins.isAuto = false;
        HuYouModel.Ins.event(HuYouModel.UPDATA_AUTO);
    }
    public initMsg(){
        this.Reg(new HuYouView(EViewType.CIFU,ELayerType.frameLayer));
        this.Reg(new ZhuanHuanTip(EViewType.CIFU_ZHUANHUAN,ELayerType.frameLayer));
        this.Reg(new WeiTuoTip(EViewType.CIFU_SHEZHI,ELayerType.frameLayer));
        this.Reg(new FuYouItemTip(EViewType.CIFU_ITEMTIP,ELayerType.frameLayer));
        this.Reg(new FuYouItemTip1(EViewType.CIFU_ITEMTIP1,ELayerType.frameLayer));

        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        MainModel.Ins.on(MainEvent.Function_Open,this,this.onMainViewInit);

        E.MsgMgr.AddMsg(MSGID.BlessingInit, this.onBlessingInit,this);
        E.MsgMgr.AddMsg(MSGID.BlessingChange, this.BlessingChange,this);
        E.MsgMgr.AddMsg(MSGID.BlessingRes, this.BlessingRes,this);
        E.MsgMgr.AddMsg(MSGID.BlessingItemRemove, this.BlessingItemRemove,this);
        E.MsgMgr.AddMsg(MSGID.BlessingMaxLevelRewards, this.BlessingMaxLevelRewards,this);
        E.MsgMgr.AddMsg(MSGID.BlessingAutoZH_revc, this.BlessingAutoZH_revc,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){
        if(HuYouModel.Ins.isDotMain()){
            DotManager.addMainDot("icon4",-20,-5);
        }else{
            DotManager.remMainDot("icon4");
        }
    }

    private onBlessingInit(data:BlessingInit_revc){
        HuYouModel.Ins.initBag(data.bagInfo);
        HuYouModel.Ins.bagSoulInfoAttr = data.bagInfoAttr;
        HuYouModel.Ins.startTime = data.startTime;
        HuYouModel.Ins.level = data.level;
        HuYouModel.Ins.freeCount = data.count;
    }

    private BlessingChange(data:BlessingChange_revc){
        HuYouModel.Ins.updataPushBag(data);
        HuYouModel.Ins.startTime = data.startTime;
        HuYouModel.Ins.freeCount = data.count;
        HuYouModel.Ins.event(HuYouModel.UPDATA_VIEW);
        this.setDot();
    }

    private BlessingRes(data){
        let lv = HuYouModel.Ins.level;
        HuYouModel.Ins.level = data.level;
        HuYouModel.Ins.event(HuYouModel.UPDATA_VIEW_Level,lv);
    }

    private BlessingItemRemove(data){
        HuYouModel.Ins.updataDelBag(data.datalist);
        HuYouModel.Ins.event(HuYouModel.UPDATA_VIEW);
        this.setDot();
    }

    private BlessingMaxLevelRewards(data){
        // E.ViewMgr.Open(EViewType.GetReward,null,data);
        E.ViewMgr.openReward(data);
    }

    private BlessingAutoZH_revc(value:BlessingAutoZH_revc_revc){
        HuYouModel.Ins.event(HuYouModel.UPDATA_VIEW_Item,[value.rewardList]);
    }
}