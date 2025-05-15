import { Stack } from "../../../../frame/structure/Stack";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { ActivityInit_revc, ActivityNums_req, ActivityNums_revc, ActivityRecords_req, ActivityRecords_revc, ActivitySelfRecords_revc, ActivityTotalCntReward_req, ActivityTotalCntReward_revc, ActivityTotalCnt_revc, stActivityRecord } from "../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../network/SocketMgr";
import { DuanWuEvent } from "../duanwu/DuanWuEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { EFeastType } from "./EFeastType";
import { GemBaseModel } from "./GemBaseModel";
import { GemFeastView2 } from "./views/GemFeastView2";
/**宝石盛宴 */
export class GemFeastModel extends GemBaseModel {
    // protected maxConfigId:number = 35;
    // public titleStr:string = "gemtitle01";
    public packageTitleStr:string = "gemtitle02";
    public rankTitleStr:string = "gemtitle03";
    // public bg4Img:string = "remote/duanwu/bslb.png";
    public funcType:EFuncDef = EFuncDef.GemFeast;
    public subType:number =  EFeastType.Gem;
    public rankBotStr:string = "duanwu06";
    public requstLeiChong(id:number){
        let req = new ActivityTotalCntReward_req();
        req.type = this.subType;
        req.id = id;
        SocketMgr.Ins.SendMessageBin(req);
    }
    public requestRank(){
        let req = new ActivityNums_req();
        req.isNewPlayer = 0;
        req.type = this.subType;
        SocketMgr.Ins.SendMessageBin(req);
    }
    public requstMsg(){
        // if(HrefUtils.getVal("stoploop")){return;}

        let req = new ActivityRecords_req();
        req.isNewPlayer = 0;
        req.type = this.subType;
        req.recordSerial = this.maxRecordSerial;
        SocketMgr.Ins.SendMessageBin(req);
    }
    public rank_desc:string = "gemrank_title|gemrank_desc";
    protected initUI(){
    }
    ///////////////////////////////////////////////////
    private static _ins: GemFeastModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new GemFeastModel();
        }
        return this._ins;
    }
    public initMsg(): void {
        this.initUI();
        E.MsgMgr.AddMsg(MSGID.ActivityInit,this.onActivityInit,this);
        E.MsgMgr.AddMsg(MSGID.ActivityRecords,this.onActivityRecords,this);
        E.MsgMgr.AddMsg(MSGID.ActivitySelfRecords, this.onActivitySelfRecords, this);
        E.MsgMgr.AddMsg(MSGID.ActivityNums, this.onActivityNums, this);
        E.MsgMgr.AddMsg(MSGID.ActivityTotalCntReward, this.onActivityTotalCntReward, this);
        E.MsgMgr.AddMsg(MSGID.ActivityTotalCnt, this.onActivityTotalCnt, this);
    }
    private onActivityInit(revc: ActivityInit_revc) {
        if(revc.type == this.subType){
            this.data = revc;
            this.updateRed();
        }
        // MainModel.Ins.event(MainEvent.UpadteMainButtons);
    }
    private onActivityRecords(revc:ActivityRecords_revc){
        if(revc.type == this.subType){
            this.upadteMsg(revc.dataList);
        }
    }

    private isValueSame(o:stActivityRecord,t:stActivityRecord){
        for(let key in o){
            if(o[key] != t[key]){
                return false;
            }
        }
        return true;
    }

    // private hasSameRecord(cell:stActivityRecord,l:stActivityRecord[]){
    //     for(let i = 0;l.length;i++){
    //         let o = l[i];
    //         if(this.isValueSame(o,cell)){
    //             return true;
    //         }
    //     }
    // }
    /**自己的日志 */
    private onActivitySelfRecords(revc:ActivitySelfRecords_revc){
        if(revc.type == this.subType){
            if(this.data){
                // let l = revc.dataList;
                // let oldlist = this.data.selfRecords;
                // for(let i = 0;i < l.length;i++){
                //     let cell = l[i];
                //     if(this.hasSameRecord(cell,oldlist)){
                //         // console.log(`相同的是日志 ${JSON.stringify(cell)}`);
                //     }else{
                //         oldlist.push(cell);
                //     }
                // }
                // this.data.selfRecords = this.data.selfRecords.concat(revc.dataList);
                let l = revc.dataList;
                for(let i = 0;i < l.length;i++){
                    let o = l[i];
                    let nowlist = this.data.selfRecords
                    let find:boolean = false;
                    for(let n = 0;n < nowlist.length;n++){
                        let cell = nowlist[n];
                        if(this.isValueSame(cell,o)){
                            // break;
                            find = true;
                            break;
                        }
                        else{
                            
                        }
                    }
                    if(!find){
                        this.data.selfRecords.push(o);
                    }
                }
            }
        }
    }
    private onActivityNums(revc:ActivityNums_revc){
        if(revc.type == this.subType){
            this.rankData = revc;
            this.event(DuanWuEvent.RankUpdate);
        }
    }
    private onActivityTotalCntReward(revc:ActivityTotalCntReward_revc){
        if(revc.type == this.subType){
            this.updateReward(revc.dataList);
        }
    }
    
    private onActivityTotalCnt(revc:ActivityTotalCnt_revc){
        if(this.data){
            if(revc.type == this.subType){
                this.updateTotal(revc.totalCnt);
            }
        }
    }
}