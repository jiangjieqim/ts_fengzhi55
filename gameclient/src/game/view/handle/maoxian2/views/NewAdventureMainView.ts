// ui_maoxian2_main

import { ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import { TabCommonCtl } from "../../../../../frame/view/TabCommonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { DotManager } from "../../common/DotManager";
import { Enemy_ImageProxy } from "../../main/model/AdventureProxy";
import { AdventureChapterCfg, AdventureLevelCfg, AdventureLevelProxy, IUnitLevel } from "../../main/proxy/AdventureLevelProxy";
import { NewAdventureEvent } from "../model/NewAdventureEvent";
import { NewAdventureModel } from "../NewAdventureModel";
import { CurNewAdventureItemView, IGetFromPool, LockNewAdventureItemView, NewAdventureItemView } from "./NewAdventureItemVIew";

export enum EAdventureItemType{
    /**已经通关 */
    Clearance = -1,
    /**前置样式 */
    Pre = 0,
    /**当前挑战的关卡样式 */
    Cur = 1,
    /**后置样式 */
    Next = 2,
}

interface IAdventureCellView{
    cls;
    height:number;
}

/**章节数据 */
export class AdventureItemVo {
    
    type:EAdventureItemType;
    /**小节if_id */
    levelId:number;

    /**当前的小节最大数 */
    // maxUnitId:number;

    range:IUnitLevel;
    ////////////////////////////////////////////////////////////////////////////////////
    private _cfg:Configs.t_Adventure_Level_dat;
    public get cfg(){
        if(!this._cfg){
            this._cfg = AdventureLevelProxy.Ins.getByLevelId(this.levelId);
            // this.maxUnitId = AdventureLevelProxy.Ins.getChapterMax(this._cfg.f_Page,this._cfg.f_ChapterID);
        }
        return this._cfg;
    }

    /**是否显示通关 */
    public get bClearance(){
        // let curCfg = this.cfg;
        let cfg:Configs.t_Adventure_Level_dat = AdventureLevelProxy.Ins.getByLevelId(this.range.maxLvId);
        if (cfg.f_ChapterID + 1 < NewAdventureModel.Ins.curCfg.f_ChapterID) {
            if(NewAdventureModel.Ins.isLinqguEnd(this.range.maxLvId)){
                return true;
            }
        }
        
    }

    /**通关{0}后 */
    public get clearanceDesc(){
        let maxCfg = AdventureLevelProxy.Ins.getByLevelId(this.range.maxLvId);
        let desc = `${this._cfg.f_ChapterID}-${maxCfg.f_unitid}`;
        return E.getLang("maoxian2_text1",desc);
    }
    /** 本章节解锁的武将名 */
    public get heroName(){
        let heroId:number = this.cfg.f_unlockhero;
        if(!heroId){
            heroId = AdventureLevelProxy.Ins.getNearHasHero(this.cfg.f_id);
        }
        let imgCfg = Enemy_ImageProxy.Ins.getCfg(heroId);
        return imgCfg ? imgCfg.f_Name : "";
    }

    /**标题名 1-3*/
    public get titleName(){
        return `${this.cfg.f_Chapter} ${this.cfg.f_ChapterID}-${this.cfg.f_unitid}`;
    }

    public get chapterName(){
        return this.cfg.f_Unit;
    }

    public get chapterId(){
        return this.cfg.f_ChapterID;
    }

    /**人物头像 */
    // public get headimg(){
    //     // return `o/spirits/${this.cfg.f_headIcon}.png`;
    //     return `o/equip/hero_${this.cfg.f_headIcon}.png`;
    // }

    /**
     * 是否是上一分页最后一关
     * 是否需要显示扫荡 
     **/
    public isPreChapterClear(){
        let cur: Configs.t_Adventure_Level_dat = AdventureLevelProxy.Ins.getByLevelId(NewAdventureModel.Ins.curCfg.f_Levelid)
        if(cur){
            let _prePage = cur.f_Page - 1;
            if(this.cfg.f_Page == _prePage && this.isLastPage){
                return true;
            }
        }            
    }
    /*是否显示已经通关*/
    public get mCompleteCheck(){
        let status:boolean= NewAdventureModel.Ins.isCompleteAll &&  //全通关 
                        !this.isPreChapterClear()            //不是上一分页最后一关
                        && !AdventureLevelProxy.Ins.isLastChapterID(this.chapterId) //不是最后章节
        return status;
    }
    /**是否是page的最后一页 */
    public get isLastPage(){
        // return this.range.maxLvId == this.cfg.f_Levelid;
        let cfg = AdventureLevelProxy.Ins.getByLevelId(this.levelId + 1);
        if(cfg){
            if(cfg.f_Page > this.cfg.f_Page){
                return true;
            }
        }
    }

    /**是否显示章节奖励 显示扫荡按钮*/
    public get bCleanUp(){
        if(this.type == EAdventureItemType.Pre){
            let islingqu = NewAdventureModel.Ins.isLinqguEnd(this.range.maxLvId);
            if(islingqu){
                return true;
            }
            if(islingqu && this.isPreChapterClear()){//上一分页最后一关是否需要显示扫荡
                return true;
            }
        }
        return false;
    }

    /**
     * 是否可以领取
     */
    public isCanLingqu(){
        if(this.type == EAdventureItemType.Pre){
            if(this.bCleanUp){
            }else{
                return true;
            } 
        }
    }

    /**是否有红点 */
    public get mRed(){
        let _b = this.isCanLingqu() 
        if(_b){
            return _b;
        }
        // if (this.bCleanUp) {
        // return NewAdventureModel.Ins.cleanUpVo.mFree;//免费的时候
        // }
        return false;
    }


    /**稀有度列表 */
    public get quaShow(): number[] {
        let l = [];
        let arr = this.cfg.f_quashow.split("-");
        for (let i = 0; i < arr.length; i++) {
            l.push(arr[i]);
        }
        return l;
    }

}

/**冒险主界面 */
export class NewAdventureMainView extends ViewBase {
    private _panelCtl:ScrollPanelControl;
    private _ui: ui.views.maoxian2.ui_maoxian2_mainUI;
    private _tabCtl:TabCommonCtl;
    private curChapterList:AdventureItemVo[];
    private typeMapH = {};
    // protected autoFree = true;
    protected mMask:boolean = true;

    protected onAddLoadRes(): void { 
        this.addAtlas("maoxian2.atlas")
    }
    protected onExit(): void { 
        this._panelCtl.clear();
        // NewAdventureModel.Ins.oldLvId = 0;
        NewAdventureModel.Ins.event(NewAdventureEvent.DisposeAvatar);
        NewAdventureModel.Ins.off(NewAdventureEvent.RewardUpdate,this,this.onRewardUpdate);
        // MainModel.Ins.mainMask = false;
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.maoxian2.ui_maoxian2_mainUI();
            this.bindClose(this._ui.close1);
            this._tabCtl = new TabCommonCtl();
            this._panelCtl = new ScrollPanelControl();
            this._panelCtl.init(this._ui.panel1);
            this._tabCtl.horizontalMax = 4;
            this._tabCtl.init(ui.views.maoxian2.ui_maoxian2_tab_itemUI,
                this._ui.tabCon,"ui_maoxian2_tab_itemUI",this,this.onSelectHandler,this.itemTabHandler);
            this.initHeightCfg();
        }
    }
    protected mMainSnapshot = true;
    protected onInit(): void { 
        // MainModel.Ins.mainMask = true;
        let selIndex:number = AdventureLevelProxy.Ins.getCurTabIndex(NewAdventureModel.Ins.curCfg.f_Levelid);
        this._tabCtl.refresh(AdventureLevelProxy.Ins.pageList,selIndex);
        NewAdventureModel.Ins.on(NewAdventureEvent.RewardUpdate,this,this.onRewardUpdate);
        this.onCallLaterHandler();
    }

    private onCallLaterHandler(){
        let l1 = this._panelCtl.renderList;
        for(let i = 0 ;i < l1.length;i++){
            let node = l1[i];
            if(node && node.curClsKey == CurNewAdventureItemView.SignKey){
                this._panelCtl.end(node.y);//跳转到当前副本
                return;
            }
        }

        for(let i = 0 ;i < l1.length;i++){
            let node = l1[i];
            if(node && node.list && node.list.length > 0){
                let cellVo:AdventureItemVo = node.list[0];
                if(cellVo.bCleanUp && !cellVo.mCompleteCheck){
                    this._panelCtl.end(node.y);//跳转到扫荡
                    return;
                }
            }
        }
    }

    private onRewardUpdate(){
        this.refreshView();
    }
    public refresh(){
        this._tabCtl.refresh(AdventureLevelProxy.Ins.pageList,this._tabCtl.tabsCtl.selectIndex);
    }

    private onSelectHandler(index:number){
        this.refreshView();
    }

    private itemTabHandler(tabSkin:ui.views.maoxian2.ui_maoxian2_tab_itemUI,index:number,sel:boolean,data:AdventureLevelCfg){
        if(sel){
            tabSkin.bg.skin = 'remote/maoxian2/gqbj_1.png';
            tabSkin.tf.color = "#F1E1C2";
        }else{
            tabSkin.bg.skin = 'remote/maoxian2/gqbj.png';
            tabSkin.tf.color = "#AE6C39";
        }
        if(data.mRed){
            DotManager.addDot(tabSkin);
        }else{
            DotManager.removeDot(tabSkin);
        }
        tabSkin.tf.text = data.pageLabel;
        // let dc = MainModel.Ins.getDcNode(tabSkin.tf,this._ui,null,this._ui);
        // dc.visible = true;
        // dc.refresh();
    }

    private getHeightBytype(type){
        let cls:IGetFromPool;
        switch(type){
            case EAdventureItemType.Clearance:
            case EAdventureItemType.Pre:
                cls = NewAdventureItemView;
                break;
            case EAdventureItemType.Cur:
                cls = CurNewAdventureItemView;
                break;
            case EAdventureItemType.Next:
                cls = LockNewAdventureItemView;
                break;
        }

        let cell:IAdventureCellView = {} as IAdventureCellView;
        cell.height = cls.getFromPool().height;
        cell.cls = cls;
        this.typeMapH[type] = cell;
    }

    private initHeightCfg(){
        let arr = [EAdventureItemType.Pre,EAdventureItemType.Cur,EAdventureItemType.Clearance,EAdventureItemType.Next];
        for(let i = 0;i < arr.length;i++){
            this.getHeightBytype(arr[i]);
        }
    }

    private refreshView(y:number = 0){
        let index:number = this._tabCtl.tabsCtl.selectIndex;
        let cfg:AdventureLevelCfg = AdventureLevelProxy.Ins.pageList[index];

        // console.log(cfg);
        let l = cfg.dataList;
        let dl:AdventureItemVo[] = [];
        let curLv:number = NewAdventureModel.Ins.curCfg.f_Levelid;
        for(let i =0;i < l.length;i++){
            let cell:AdventureChapterCfg = l[i];
            // if(cell.chapterID)
            let _chapterVo = new AdventureItemVo();
            // chapterVo.levelId = cell.chapterID;
            // chapterVo.levelId

            let unit:IUnitLevel = AdventureLevelProxy.Ins.getChapterRange(cfg.page,cell.chapterID);
            _chapterVo.range = unit;

            if (curLv >= unit.minLvId && curLv <= unit.maxLvId) {
                _chapterVo.levelId = curLv;

                if(NewAdventureModel.Ins.isCompleteAll && AdventureLevelProxy.Ins.isLastChapterID(cell.chapterID)){
                    _chapterVo.type = EAdventureItemType.Pre;
                }else{
                    _chapterVo.type = EAdventureItemType.Cur;
                }

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
            dl.push(_chapterVo);
        }
        this.curChapterList = dl;
        /////////////////////////////////////////////////////////////////////////
        this._panelCtl.clear();
        let list1 = this.curChapterList;
        /////////////////////////////////////////
        for(let i = 0;i < list1.length;i++){
            let cell = list1[i];
            // let cls:IGetFromPool;
            // // let h:number;
            // switch(cell.type){
            //     case EAdventureItemType.Pre:
            //     case EAdventureItemType.Clearance:
            //         cls = NewAdventureItemView;
            //         // h = 150
            //         break;
            //     case EAdventureItemType.Cur:
            //         cls = CurNewAdventureItemView;
            //         // h = 346;
            //         break;
            //     case EAdventureItemType.Next:
            //         cls = LockNewAdventureItemView;
            //         // h = 75;
            //         break;
            // }
            let _item:IAdventureCellView = this.typeMapH[cell.type];
            this._panelCtl.split([cell],_item.cls,_item.height);
        }
        // this._panelCtl.scrollToNode()
        this._panelCtl.end(y);
        this.onCallLaterHandler();
    }
}