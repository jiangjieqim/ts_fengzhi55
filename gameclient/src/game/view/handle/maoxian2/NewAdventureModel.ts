import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { NewAdventureCtnUpdate_revc, NewAdventureInit_revc, NewAdventureRewardUpdate_revc, NewAdventureUpdate_revc, stNewAdventure } from "../../../network/protocols/BaseProto";
import {DotManager} from "../common/DotManager";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { AdventureChapterCfg, AdventureLevelCfg, AdventureLevelProxy, IUnitLevel } from "../main/proxy/AdventureLevelProxy";
import { CleanUpVo } from "./model/CleanUpVo";
import { NewAdventureEvent } from "./model/NewAdventureEvent";
import { NewAdventureCleanUpView } from "./views/NewAdventureCleanUpView";
import { AdventureItemVo, EAdventureItemType, NewAdventureMainView } from "./views/NewAdventureMainView";
/**新冒险 */
export class NewAdventureModel extends BaseModel {

    private static _ins: NewAdventureModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new NewAdventureModel();
        }
        return this._ins;
    }

    /**是否全开扫荡*/
    //openSweep:boolean = true;
    // public oldLvId:number;
    public onInitCallBack():void{
        this.isCompleteAll = false;
    }
    /**是否已经 */
    public isCompleteAll:boolean = false;
    /**扫荡次数 */
    // public cleanUpCount:number = 0;
    public cleanUpVo:CleanUpVo = new CleanUpVo();
    /**冒险关卡数据 */
    public adventureData:stNewAdventure;
    //当前挑战的关卡ID
    public adventureId:number;
    //当前新人礼包CfgID
    // public nowCfgId:number;

    /**该区间小节是否全部领取完成了 */
    public isLinqguEnd(maxlv:number){
        let ids:number[] = this.adventureData.rewardAdventureIds;
        return ids.indexOf(maxlv)!=-1;
        /*
        let allid:number[]= [];
        for(let i = minlv;i <= maxlv;i++){
            allid.push(i);
        }
        for(let i = 0;i < allid.length;i++){
            let id = allid[i];
            if(ids.indexOf(id)==-1){
                return false;
            }
        }
        return true;
        */
    }

    // /**本章节是否都领取了 */
    // public allLingqu(minlv:number,maxlv:number){
    //     let ids:number[] = this.adventureData.rewardAdventureIds;

    //     let allid:number[]= [];
    //     for(let i = minlv;i <= maxlv;i++){
    //         allid.push(i);
    //     }
    //     for(let i = 0;i < allid.length;i++){
    //         let id = allid[i];
    //         if(ids.indexOf(id)==-1){
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    /**当前待挑战的关卡 */
    public curCfg:Configs.t_Adventure_Level_dat;
    public initMsg(): void {
        this.Reg(new NewAdventureMainView(EViewType.NewAdventureMain));
        this.Reg(new NewAdventureCleanUpView(EViewType.NewAdventureCleanUp));

        E.MsgMgr.AddMsg(MSGID.NewAdventureInit, this.onNewAdventureInit, this);
        E.MsgMgr.AddMsg(MSGID.NewAdventureUpdate, this.onNewAdventureUpdate, this);
        E.MsgMgr.AddMsg(MSGID.NewAdventureCtnUpdate, this.onNewAdventureCtnUpdate, this);
        E.MsgMgr.AddMsg(MSGID.NewAdventureRewardUpdate, this.onNewAdventureRewardUpdate, this);
    
        // t_Adventure_Level
        // t_Spirit_Config

        // let l = AdventureLevelProxy.Ins.pageList;
        // console.log(l);
    }

    // public get canClearUp(){
    //     let cleanUpVo = NewAdventureModel.Ins.cleanUpVo;
    //     if (SoulModel.Ins.getNotExcludeWears().length >= NewAdventureModel.Ins.cleanUpVo.storageMax) {
    //         //战魂到达的上限
    //         return false;
    //     }
    //     if(!cleanUpVo.mFree && !MainModel.Ins.isItemEnoughSt(cleanUpVo.needStr)){
    //         //扫荡需要的元宝不足
    //         return false;
    //     }
    //     return;
    // }

    private onNewAdventureRewardUpdate(revc:NewAdventureRewardUpdate_revc){
        this.adventureData.rewardAdventureIds = revc.rewardAdventureIds;
        this.event(NewAdventureEvent.RewardUpdate);
        this.updateView();
    }

    /**该小节是否已经领取 */
    public isLingqu(lvid:number){
        return this.adventureData.rewardAdventureIds.indexOf(lvid)!=-1;
    }
    
    private onNewAdventureInit(revc:NewAdventureInit_revc){
        this.adventureData = revc.adventureData;
        this.cleanUpVo.alreadyCount = revc.cnt;
        // this.cleanUpCount = revc.cnt;
        this.updateAdvent();
    }

    private updateAdvent(){
        if(this.adventureData.adventureId == 0){
           this.isCompleteAll = true;
           this.curCfg = AdventureLevelProxy.Ins.List[AdventureLevelProxy.Ins.List.length-1];
        }else{
            this.isCompleteAll= false;
            this.curCfg = AdventureLevelProxy.Ins.getByLevelId(this.adventureData.adventureId);
        }
    }

    private onNewAdventureUpdate(revc:NewAdventureUpdate_revc){
        this.adventureData = revc.adventureData;
        this.updateAdvent();

        this.updateView();
/*
        let data:any = {};
        data.st1 = "name";
        data.co1 = "#6DCC4E";
        data.st2 = "的装备加入宝箱池";
        MainModel.Ins.addTs(data);
*/
    }

    private updateView(){
        if(E.ViewMgr.IsOpen(EViewType.NewAdventureMain)){
            let view:NewAdventureMainView = E.ViewMgr.Get(EViewType.NewAdventureMain) as NewAdventureMainView;
            view.refresh();
        }
        this.refreshRed();
    }

    private onNewAdventureCtnUpdate(revc:NewAdventureCtnUpdate_revc){
        // this.cleanUpCount = revc.cnt;
        this.cleanUpVo.alreadyCount = revc.cnt;
        this.updateView();
    }
 
    /**冒险红点检测 */
    private hasRed(){
        let l2 = AdventureLevelProxy.Ins.pageList
        for(let i = 0;i < l2.length;i++){
            let cfg:AdventureLevelCfg = l2[i];
            if(this.hasTabPageRed(cfg)){
                return true;
            }
        }
        return false;
    }

    /**
     * @param 当前的页签下面是否有红点
     */
    public hasTabPageRed(cfg:AdventureLevelCfg){
        let l = cfg.dataList;
        let curLv:number = NewAdventureModel.Ins.curCfg.f_Levelid;
        for(let i =0;i < l.length;i++){
            let cell:AdventureChapterCfg = l[i];//章节
            let _chapterVo = new AdventureItemVo();

            let unit:IUnitLevel = AdventureLevelProxy.Ins.getChapterRange(cfg.page,cell.chapterID);
            _chapterVo.range = unit;

            if (curLv >= unit.minLvId && curLv <= unit.maxLvId) {
                _chapterVo.levelId=curLv;
                _chapterVo.type = EAdventureItemType.Cur;
            } else if (curLv > unit.maxLvId) {

                _chapterVo.levelId = unit.maxLvId;
                if(_chapterVo.bClearance){
                    if(_chapterVo.isPreChapterClear()){
                        _chapterVo.type = EAdventureItemType.Pre;
                    }else{
                        _chapterVo.type = EAdventureItemType.Clearance;
                    }
                }else{
                    _chapterVo.type = EAdventureItemType.Pre;
                }

            }else if(curLv < unit.minLvId){
                _chapterVo.levelId = unit.minLvId;
                _chapterVo.type = EAdventureItemType.Next;
            }
            if(_chapterVo.mRed){
                return true;
            }
        }
    }

    public refreshRed() {
        if (TaskModel.Ins.isFuncOpen(EFuncDef.Adventure)) {
            let v = false;
            if (this.hasRed()) {
                // DotManager.addMainDot("mainBtn", -30, -20);
                v = true;
            } else {
                // DotManager.remMainDot("mainBtn");
            }
            MainModel.Ins.funcSetRed(EFuncDef.Adventure,v);
        }
    }
    updateRed(){
        this.refreshRed();
    }
    // public get nextLevelId(){
    //     return this.adventureData.adventureId;
    // }
}