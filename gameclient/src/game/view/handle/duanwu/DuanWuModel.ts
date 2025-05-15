import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { MountFeastInit_revc, MountFeastNums_req, MountFeastNums_revc, MountFeastRecords_req, MountFeastRecords_revc, MountFeastSelfRecords_revc, MountFeastTotalCntReward_req, MountFeastTotalCntReward_revc, MountFeastTotalCnt_revc, NewCrossGroup_revc, stActivityRecord, stMountRecord } from "../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../network/SocketMgr";
import { FuJiangFeastMianView } from "../fujiangfeast/views/FuJiangFeastMianView";
import { EFeastType, IActivityNums, IFeastInitVo } from "../gemfeast/EFeastType";
import { GemBaseModel } from "../gemfeast/GemBaseModel";
import { GemFeastView } from "../gemfeast/views/GemFeastView";
import { GemFeastView2 } from "../gemfeast/views/GemFeastView2";
import { LingChongFeastView } from "../lingchong/model/LingChongFeastModel";
import { EFuncDef } from "../main/model/EFuncDef";
import { NewPlayerFujiangFeastModel, NewPlayerGemFeastModel, NewPlayerPetFeastModel, NewPlayerRideFeastModel } from "../newplayerfeast/NewPlayerFeastModel";
import { DuanWuEvent } from "./DuanWuEvent";
import { DuanWuLeiChongView } from "./views/DuanWuLeiChongView";
import { DuanWuLogView } from "./views/DuanWuLogView";
import { DuanWuPackageView } from "./views/DuanWuPackageView";
import { DuanWuRankView } from "./views/DuanWuRankView";
import { DuanWuRewardShowView } from "./views/DuanWuRewardShowView";
import { DuanWuView } from "./views/DuanWuView";
export enum EDuanWuLingquStatus
{
    /**未达成 */
    Not = 0,
    /**可领取 */
    CanLingQu = 1,
    /**已经领取了 */
    IsLingQued = 2,
}

export enum EDuanWuPackageStatus{
    /**无法操作 */
    Not = 1,
    Normal = 2,
}
/**新人宝石盛宴View */
class NewPlayerGemFeastView extends GemFeastView{
    protected bindModel(){
        this.model = NewPlayerGemFeastModel.Ins;
    }
}
/**新人灵宠盛宴View */
class NewPlayerPetFeastView extends LingChongFeastView{
    protected bindModel(){
        this.model = NewPlayerPetFeastModel.Ins;
    }
}
///////////////////////////////////////////////////////////////////////////
/**新人坐骑盛宴View */
class NewPlayerRideFeastView extends DuanWuView{
    protected bindModel(){
        this.model = NewPlayerRideFeastModel.Ins;
    }
}
/**新人副将盛宴View */
class NewPlayerFuJiangFeastView extends FuJiangFeastMianView{
    protected bindModel(){
        this.model = NewPlayerFujiangFeastModel.Ins;
    }
}

/**端午节(坐骑盛宴)*/
export class DuanWuModel extends GemBaseModel {
    protected maxConfigId:number = 30;
    public subType:number =  EFeastType.Ride;
    protected funcType:EFuncDef = EFuncDef.DuanWu;

    // public titleStr:string = "ridetitle01";
    public packageTitleStr:string = "ridetitle02";
    public rankTitleStr:string = "ridetitle03";
    // public bg4Img:string = "remote/duanwu/zqlb.png";
    public rankBotStr:string = "duanwu08";

    public newCrossGroupId:number;//新的跨服分组id,0标识未跨服
    public serverIdBegin:number;//新的跨服分组开始的区服ID
    public serverIdEnd:number;//新的跨服分组结束的区服ID

    public requestRank(){
        let req = new MountFeastNums_req();
        SocketMgr.Ins.SendMessageBin(req);
    }
    public requstLeiChong(id:number){
        let req = new MountFeastTotalCntReward_req();
        req.id = id;
        SocketMgr.Ins.SendMessageBin(req);
    }
    public requstMsg(){
        let req = new MountFeastRecords_req();
        req.recordSerial = this.maxRecordSerial;
        SocketMgr.Ins.SendMessageBin(req);
    }

    ///////////////////////////////////////////////////////////
    public initMsg(): void {
        this.Reg(new DuanWuView(EViewType.DuanWu));
        this.Reg(new DuanWuLeiChongView(EViewType.DuanWuLeiChong));
        this.Reg(new DuanWuPackageView(EViewType.DuanWuPackage));
        this.Reg(new DuanWuLogView(EViewType.DuanWuLog));
        this.Reg(new DuanWuRankView(EViewType.DuanWuRank));
        this.Reg(new DuanWuRewardShowView(EViewType.DuanWuRewardShow));
        
        this.Reg(new GemFeastView2(EViewType.GemFeast));
        this.Reg(new FuJiangFeastMianView(EViewType.FuJiangFeast));
        this.Reg(new NewPlayerGemFeastView(EViewType.NewPlayerGemFeast));
        this.Reg(new NewPlayerPetFeastView(EViewType.NewPlayerPetFeast))//新人宠物盛宴
        this.Reg(new NewPlayerRideFeastView(EViewType.NewPlayerRideFeast));//新人坐骑盛宴
        this.Reg(new NewPlayerFuJiangFeastView(EViewType.NewPlayerFujiangFeast))//新人副将盛宴

        E.MsgMgr.AddMsg(MSGID.MountFeastInit,this.onMountFeastInit,this);
        E.MsgMgr.AddMsg(MSGID.MountFeastTotalCnt,this.onMountFeastTotalCnt,this);
        E.MsgMgr.AddMsg(MSGID.MountFeastTotalCntReward,this.onMountFeastTotalCntReward,this);
        E.MsgMgr.AddMsg(MSGID.MountFeastRecords,this.onMountFeastRecords,this);
        E.MsgMgr.AddMsg(MSGID.MountFeastSelfRecords,this.onMountFeastSelfRecords,this);
        E.MsgMgr.AddMsg(MSGID.MountFeastNums,this.onMountFeastNums,this);
        E.MsgMgr.AddMsg(MSGID.NewCrossGroup,this.NewCrossGroup,this);
    }
    /**数据类型转化 */
    private convertActivityRecord(l:stMountRecord[]){
        let result:stActivityRecord[] = [];
        for(let i = 0;i < l.length;i++){
            let o = new stActivityRecord();
            let cell  = l[i];
            o.playerId = cell.playerId;
            o.nickName = cell.nickName;
            o.id = cell.mountId;
            o.level = 0;
            o.recordSerial = cell.recordSerial;
            o.time = cell.time;
            result.push(o);
        }
        return result;
    }

    // private convertRankData(){
    //     let result:IActivityNums[] = [];

    //     return result;
    // }

    private convertNumList(revc:MountFeastNums_revc){
        let o = {} as IActivityNums;
        o.type = EFeastType.Ride;
        o.dataList = revc.dataList;
        o.self = revc.self;
        o.top3 = revc.top3;
        return o;
    }

    private onMountFeastNums(revc:MountFeastNums_revc){
        this.rankData = this.convertNumList(revc);
        this.event(DuanWuEvent.RankUpdate);
    }

    //新跨服分组,初始化的时候返回
    private NewCrossGroup(value:NewCrossGroup_revc){
        this.newCrossGroupId = value.newCrossGroupId;
        this.serverIdBegin = value.serverIdBegin;
        this.serverIdEnd = value.serverIdEnd;
    }

    private onMountFeastSelfRecords(revc:MountFeastSelfRecords_revc){
        if(this.data){
            this.data.selfRecords = this.data.selfRecords.concat(this.convertActivityRecord(revc.dataList));
        }
    }
    private onMountFeastRecords(revc:MountFeastRecords_revc){
        let result =  this.convertActivityRecord(revc.dataList);
        this.upadteMsg(result);
    }

    private onMountFeastTotalCntReward(revc:MountFeastTotalCntReward_revc){
        // this.data.rewardList = revc.dataList;
        // this.updateRed();
        // this.event(DuanWuEvent.MoneyUpdate);
        this.updateReward(revc.dataList);
    }

    private onMountFeastInit(revc:MountFeastInit_revc){
        let o:IFeastInitVo = {} as IFeastInitVo;
        o.rewardList = revc.rewardList;
        o.selfRecords = this.convertActivityRecord(revc.selfRecords);
        o.totalCnt = revc.totalCnt;
        o.type = EFeastType.Ride;
        this.data = o;
        this.updateRed();
    }

    private onMountFeastTotalCnt(revc:MountFeastTotalCnt_revc){
        // this.data.totalCnt = revc.totalCnt;
        // this.updateRed();
        // this.event(DuanWuEvent.MoneyUpdate);
        if(this.data){
            this.updateTotal(revc.totalCnt);
        }
    }

    private static _ins:DuanWuModel;
    public static get Ins(){
        if(!this._ins){
            this._ins = new DuanWuModel();
        }
        return this._ins;
    }

    public open(){
        if(this.isOpen){
            E.ViewMgr.Open(EViewType.DuanWu);
        }else{
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
        }
    }
}