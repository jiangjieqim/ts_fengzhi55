import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { TimeUtil } from "../../../../frame/util/TimeUtil";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { ActivityNums_req, ActivityRecords_req, NewPlayerFeastRewards_revc, NewPlayerFeastScore_revc, NewPlayerFeastSelfRecords_revc, NewPlayerFeastTask_revc, NewPlayerFeast_revc, stActivityRecord, stNewFeast, stNewPlayerTask } from "../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../network/SocketMgr";
import { BaseCfg } from "../../../static/json/data/BaseCfg";
import { EFeastType } from "../gemfeast/EFeastType";
import { GemFeastModel } from "../gemfeast/GemFeastModel";
import { ActivityModel } from "../huodong/ActivityModel";
import { t_Pack_ControllerProxy } from "../huodong/model/ActivityProxy";
import { ActivityTimeUtils } from "../huodong/model/ActivityTimeUtils";
import { EActivityLingQu, EActivityType } from "../huodong/model/EActivityType";
import { AlternationRookieTaskProxy } from "../libao/proxy/LiBaoProxy";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { NewplayerfeastPackage, NewplayerfeastView } from "./NewplayerfeastView";
import { NewPlayerTaskView } from "./NewPlayerTaskView";
export class t_Alternation_Rookie extends BaseCfg{
    public GetTabelName():string{
        return "t_Alternation_Rookie";
    }
    private static _ins:t_Alternation_Rookie;
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Alternation_Rookie();
        }
        return this._ins;
    }

    public getListBySubType(subType:number):Configs.t_Alternation_Rookie_dat[]{
        let res = [];
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Alternation_Rookie_dat = l[i];
            if(cfg.f_Type ==  subType){
                res.push(cfg);
            }
        }
        return res;
    }
}

class t_Alternation_RookiePack extends BaseCfg{
    public GetTabelName():string{
        return "t_Alternation_RookiePack";
    }
    private static _ins:t_Alternation_RookiePack;
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Alternation_RookiePack();
        }
        return this._ins;
    }
    public getListByType(type:number){
        let l = this.List;
        let out:Configs.t_Alternation_RookiePack_dat[] = [];
        for(let i = 0;i < l.length;i++){
            let o:Configs.t_Alternation_RookiePack_dat = l[i];
            if(o.f_PackType == type){
                out.push(o);
            }
        }
        return out;
    }
}

class NewPlayerFeastVo{
    record:stActivityRecord[];
    feastList:stNewFeast[];
    type:EFeastType;
    score:number;

    addFeastList(l1:stNewFeast[]){
        for(let i = 0;i < l1.length;i++){
            let cell = l1[i];
            let o = this.feastList.find(o=>o.id==cell.id);
            if(o){
                o.status = cell.status;
            }
            else{
                this.feastList.push(cell);
            }
        }
    }
}

/**新人庆典 */
export class NewPlayerFeastModel extends BaseModel{
    public startTime:number = 0;
    public endTime:number = 0;

    public serialNums:number[] = [];//已经开启的盛宴活动
    public static EVENT_RECORDS_UPDATA:string = "EVENT_RECORDS_UPDATA";
    public static EVENT_FEAST_REWARD:string = "EVENT_FEAST_REWARD";
    public static UPDATA_TASK:string = "UPDATA_TASK";
    private dataList:NewPlayerFeastVo[] = [];
    private taskList:stNewPlayerTask[];
    /**
     * 在活动期间1-7天 未开启的时候 隐藏掉。
     * 在活动期间1-7天 且过了活动时间 保留之前逻辑 灰态显示
     */
    private isActiveNotOpen(uid:number){
        let packCfg = t_Pack_ControllerProxy.Ins.getByUID(uid);
        let time = ActivityTimeUtils.getTime(packCfg);
        let serverTime = TimeUtil.serverTime;
        if(serverTime < time.start){
            //未开启
            return true;
        }
        return false;
    }
    public getShowSerialNums(){
        let ids:number[] = [];
        for(let i = 0;i < this.serialNums.length;i++){
            let id = this.serialNums[i];
            if(this.isActiveNotOpen(id)){
            
            }else{
                ids.push(id);
            }
        }
        return ids;
        // return this.serialNums;
    }
    public onInitCallBack(){
        this.serialNums = [];
        this.dataList = [];
        this.startTime = 0;
        this.endTime = 0;
        this.taskList = [];
    }

    public initMsg(): void{
        this.Reg(new NewplayerfeastView(EViewType.NewPlayerFeast));
        this.Reg(new NewplayerfeastPackage(EViewType.NewPlayerFeastPackage));//活动奖励礼包
        this.Reg(new NewPlayerTaskView(EViewType.NewPlayerTaskView));//新人任务

        E.MsgMgr.AddMsg(MSGID.NewPlayerFeast,this.onNewPlayerFeast,this);
        E.MsgMgr.AddMsg(MSGID.NewPlayerFeastSelfRecords,this.onNewPlayerFeastSelfRecords,this);
        E.MsgMgr.AddMsg(MSGID.NewPlayerFeastRewards,this.onNewPlayerFeastRewards,this);
        E.MsgMgr.AddMsg(MSGID.NewPlayerFeastScore,this.onNewPlayerFeastScore,this);
        E.MsgMgr.AddMsg(MSGID.NewPlayerFeastTask,this.NewPlayerFeastTask,this);
    
        MainModel.Ins.on(MainEvent.NewPlayerFeastRed_Update,this,this.onNewPlayerFeastRed_Update);
    }

    private onNewPlayerFeastRed_Update(){
        this.updateRed();
    }

    private static _ins: NewPlayerFeastModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new NewPlayerFeastModel();
        }
        return this._ins;
    }
    public getScroeByType(type:number){
        let a =this.dataList.find(cell=>cell.type == type);
        if(a){
            return a.score;
        }
        return 0;
    }
    private onNewPlayerFeast(revc:NewPlayerFeast_revc){
        this.serialNums = revc.serialNums;
        // this.serialNums = [40,41,42,43];
        this.startTime = revc.feastBeginUnix;
        this.endTime = revc.feastEndUnix;
        this.updateRed();
    }

    private onLaterHandler(){
        // let _isRed:boolean = false;
        MainModel.Ins.funcSetRed(EFuncDef.MountDQ,false);
        MainModel.Ins.funcSetRed(EFuncDef.PetQD,false);
        MainModel.Ins.funcSetRed(EFuncDef.GemQD,false);
        for(let i = 0;i < this.serialNums.length;i++){
            let id = this.serialNums[i];
            if(this.hasRedByUID(id)){
                // _isRed = true;
                // break;
                if(id == 40){
                    MainModel.Ins.funcSetRed(EFuncDef.MountDQ,true);
                }
                if(id == 41){
                    MainModel.Ins.funcSetRed(EFuncDef.GemQD,true);
                }
                if(id == 43){
                    MainModel.Ins.funcSetRed(EFuncDef.PetQD,true);
                }
            }
        }
        // MainModel.Ins.funcSetRed(EFuncDef.NewPlayerFeast,_isRed);
    }

    public updateRed(){
        Laya.timer.callLater(this,this.onLaterHandler);
    }
    public getFeast(type:number):NewPlayerFeastVo{
        return this.dataList.find(cell=>cell.type == type);
    }

    private addRecord(type:number,l1:stActivityRecord[]){
        let vo = this.dataList.find(cell=>cell.type == type);
        if(!vo){
            vo = this.createFeastVo(type);
            this.dataList.push(vo);
        }
        vo.record = vo.record ||[];
        vo.record = vo.record.concat(l1);
    }

    private addNewFeast(type:number,l1:stNewFeast[]){
        let vo = this.dataList.find(cell=>cell.type == type);
        if(!vo){
            vo = this.createFeastVo(type);
            this.dataList.push(vo);
        }
        vo.feastList = vo.feastList || [];
        vo.addFeastList(l1);
        // vo.feastList=vo.feastList.concat(l1);
    }

    public createFeastVo(type){
        let cell = new NewPlayerFeastVo();
        cell.type = type;
        cell.record = [];
        cell.feastList = [];
        cell.score = 0;
        return cell;
    }

    private setScore(type:number,val:number){
        let vo = this.dataList.find(cell=>cell.type == type);
        if(!vo){
            vo = this.createFeastVo(type);
            this.dataList.push(vo);
        }
        vo.score = val;
    }

    private onNewPlayerFeastSelfRecords(revc:NewPlayerFeastSelfRecords_revc){
        this.addRecord(revc.type,revc.dataList);
        this.event(NewPlayerFeastModel.EVENT_RECORDS_UPDATA);
    }

    private onNewPlayerFeastRewards(revc:NewPlayerFeastRewards_revc){
        this.addNewFeast(revc.type,revc.dataList);
        this.event(NewPlayerFeastModel.EVENT_FEAST_REWARD);
    }

    private onNewPlayerFeastScore(revc:NewPlayerFeastScore_revc){
        //盛宴中的积分
        this.setScore(revc.type,revc.score);
    }

    //新人盛宴任务完成及领取情况(变量)
    private NewPlayerFeastTask(value:NewPlayerFeastTask_revc){
        for(let i:number=0;i<value.dataList.length;i++){
            let index = this.taskList.findIndex(ele => ele.id == value.dataList[i].id);
            if(index == -1){
                this.taskList.push(value.dataList[i]);
            }else{
                this.taskList[index] = value.dataList[i];
            }
        }
        this.event(NewPlayerFeastModel.UPDATA_TASK);
        this.updateRed();
    }

    public getTaskListBySubType(subType:number){
        if(!this.taskList)return [];
        let arr = [];
        for(let i:number=0;i<this.taskList.length;i++){
            let cfg = AlternationRookieTaskProxy.Ins.getCfgById(this.taskList[i].id);
            if(cfg.f_type == subType){
                arr.push(this.taskList[i]);
            }
        }
        return arr;
    }

    // public isTaskRedTip(){
    //     if(!this.taskList)return false;
    //     for(let i:number=0;i<this.taskList.length;i++){
    //         if(this.taskList[i].status == 2){
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    public isTaskRedTipBySubType(subType:number){
        if(!this.taskList)return false;
        for(let i:number=0;i<this.taskList.length;i++){
            let cell = this.taskList[i];
            let cfg = AlternationRookieTaskProxy.Ins.getCfgById(cell.id);
            if(cfg.f_type == subType && cell.status == 2){
                return true;
            }
        }
        return false;
    }

    /**根据UID获取是否有红点 */
    public hasRedByUID(uid:number){
        let _actModel = ActivityModel.Ins;
        let vo = _actModel.getByUid(uid);
        if (vo && vo.isOpen) {
            if (vo.cfg.f_packid == EActivityType.NewPlayerFeast) {
                // let funcid: EFuncDef;
                let subType: number = parseInt(vo.cfg.f_p2);
                if(this.isTaskRedTipBySubType(subType)){
                    return true;
                }
                //////////////////////////////////////////////////////
                // 宠物，宝石，坐骑
                let _ckModel:NewPlayerBaseFeastModel;
                let packId;
                if(subType == EFeastType.Ride){
                    packId = EActivityType.ZuoqiChengZhang;
                    _ckModel = NewPlayerRideFeastModel.Ins;
                }else if(subType == EFeastType.Gem){
                    packId = EActivityType.BaoshiChengZhang;
                    _ckModel = NewPlayerGemFeastModel.Ins;
                }else if(subType == EFeastType.Pet){
                    packId = EActivityType.LingchongChengZhang;
                    _ckModel = NewPlayerPetFeastModel.Ins;
                }
                if(packId){
                    const item = ActivityModel.Ins.getVo(packId);
                    if(item){
                        if (ActivityModel.Ins.hasBoxBorn(packId, item)) {
                            // this._ui.red1.visible = true;
                            return true;
                        } else {
                            // this._ui.red1.visible = false;
                        }
                    }else{
                        // this._ui.red1.visible = false;
                    }
                }

                if(_ckModel){
                    if(_ckModel.isFreeCanLingQu){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public isOpenByUID(uid: number) {
        let _actModel = ActivityModel.Ins;
        let vo = _actModel.getByUid(uid);
        if (vo && vo.isOpen) {
            if (vo.cfg.f_packid == EActivityType.NewPlayerFeast) {
                let funcid: EFuncDef;
                let subType: number = parseInt(vo.cfg.f_p2);
                switch (subType) {
                    case EFeastType.Ride:
                        funcid = EFuncDef.DuanWu;
                        break;
                    case EFeastType.Gem:
                        funcid = EFuncDef.GemFeast;
                        break;
                    case EFeastType.FuJiang:
                        funcid = EFuncDef.FuJiangFeast;
                        break;
                    case EFeastType.Pet:
                        funcid = EFuncDef.PetFeast;
                        break;
                }
                if (funcid && !TaskModel.Ins.isFuncOpen(funcid)) {
                    return false;
                }
            }
            return true;
        }
    }

    public get isOpen(){
        if(this.startTime && this.endTime){
            let time:number = TimeUtil.serverTime;
            if(time < this.startTime || time > this.endTime){
                return false;
            }
        }else if(this.startTime == 0 || this.endTime == 0){
            return false;
        }
        return true;
    }

}

/**新人盛宴基础模块 */
export class NewPlayerBaseFeastModel extends GemFeastModel {
    public rankTitleStr:string = "huodongjiangli1";
    public leichongTitle:string = "leichongjiangli1";
    public packId:EActivityType = EActivityType.NewPlayerFeast;
    ///////////////////////////////////////////////////////////////////////////////////////////
    public getSubPackageStatus(id:number){
        let vo = NewPlayerFeastModel.Ins.getFeast(this.subType);
        if(vo && vo.feastList){
            let _find = vo.feastList.find(cell=>cell.id == id);
            if(_find){
                return _find.status;
            }
        }
        return EActivityLingQu.Nothing;
    }
    public getScroe(){
        return NewPlayerFeastModel.Ins.getScroeByType(this.subType);
    }
    public get packcfgList(){
        return t_Alternation_RookiePack.Ins.getListByType(this.subType);
    }
    public get selfList(){
        let vo = NewPlayerFeastModel.Ins.getFeast(this.subType);
        if(vo){
            return vo.record || [];
        }
    }
    ///////////////////////////////////////////////////////////
    public requestRank(){
        let req = new ActivityNums_req();
        req.isNewPlayer = 1;
        req.type = this.subType;
        SocketMgr.Ins.SendMessageBin(req);
    }
    public requstLeiChong(id:number){

    }
    public requstMsg(){
        let req = new ActivityRecords_req();
        req.isNewPlayer = 1;
        req.type = this.subType;
        req.recordSerial = this.maxRecordSerial;
        SocketMgr.Ins.SendMessageBin(req);
    }
    public initMsg(): void {
        super.initMsg();
    }
    public get isOpen(){
        return this.activityVo && this.activityVo.isOpen;
    }

    public onInitCallBack(): void {
        super.onInitCallBack();

    }
}

/**新人宝石盛宴模块 */
export class NewPlayerGemFeastModel extends NewPlayerBaseFeastModel{
    public funcType:EFuncDef = EFuncDef.GemFeast;
    public subType:number =  EFeastType.Gem;
    public rankTitleStr1:string = "gemtitle03";
    public rankBotStr:string = "duanwu06";
    public rank_desc:string = "";
    public packageTitleStr:string = "gemtitle02";

    private static _ins2: NewPlayerGemFeastModel;
    public static get Ins() {
        if (!this._ins2) {
            this._ins2 = new NewPlayerGemFeastModel();
        }
        return this._ins2;
    }
}

/**新人坐骑盛宴模块 */
export class NewPlayerRideFeastModel extends NewPlayerBaseFeastModel{

    public funcType:EFuncDef = EFuncDef.DuanWu;
    public subType:number =  EFeastType.Ride;
    public rankTitleStr1:string = "ridetitle03";
    public rankBotStr:string = "duanwu08";
    public rank_desc:string = "";
    public packageTitleStr:string = "ridetitle02";

    private static _ins2: NewPlayerRideFeastModel;
    public static get Ins() {
        if (!this._ins2) {
            this._ins2 = new NewPlayerRideFeastModel();
        }
        return this._ins2;
    }
}
/**新人副将盛宴模块 */
export class NewPlayerFujiangFeastModel extends NewPlayerBaseFeastModel{

    public funcType:EFuncDef = EFuncDef.FuJiangFeast;
    public subType:number =  EFeastType.FuJiang;

    private static _ins2: NewPlayerFujiangFeastModel;
    public static get Ins() {
        if (!this._ins2) {
            this._ins2 = new NewPlayerFujiangFeastModel();
        }
        return this._ins2;
    }
}
/**新人灵宠模块 */
export class NewPlayerPetFeastModel extends NewPlayerBaseFeastModel{

    public funcType:EFuncDef = EFuncDef.PetFeast;
    public subType:number =  EFeastType.Pet;
    public rankTitleStr1:string = "pet05";
    public rankBotStr:string = "pet_desc";
    public rank_desc:string = "";
    public packageTitleStr: string = "pet04";

    private static _ins2: NewPlayerPetFeastModel;
    public static get Ins() {
        if (!this._ins2) {
            this._ins2 = new NewPlayerPetFeastModel();
        }
        return this._ins2;
    }
}




