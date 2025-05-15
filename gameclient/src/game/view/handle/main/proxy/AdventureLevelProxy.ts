import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { NewAdventureModel } from "../../maoxian2/NewAdventureModel";

/**章节 */
export class AdventureChapterCfg {
    public chapterID:number;
    public cfgList: Configs.t_Adventure_Level_dat[] = [];
    
}
/**页签 */
export class AdventureLevelCfg {
    public page: number;
    public dataList:AdventureChapterCfg[] = [];

    public addChapter(chapterID:number,cfg:Configs.t_Adventure_Level_dat){
       let cell = this.dataList.find(item=>item.chapterID == chapterID);
        if(!cell){
            cell = new AdventureChapterCfg();
            cell.chapterID = chapterID;
            this.dataList.push(cell);
        }
        this.dataList[this.dataList.length-1].cfgList.push(cfg);
    }

    public get pageLabel(){
        let start = this.dataList[0];
        let end = this.dataList[this.dataList.length-1];
        return `${start.chapterID}-${end.chapterID}`;
    }

    public get mRed(){
        return NewAdventureModel.Ins.hasTabPageRed(this);
    }

}
export interface IUnitLevel{
    minLvId:number;
    maxLvId:number;
}
export class AdventureLevelProxy extends BaseCfg {
    public GetTabelName() {
        return "t_Adventure_Level";
    }
    private static _ins: AdventureLevelProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new AdventureLevelProxy();
        }
        return this._ins;
    }
    private _pageList:AdventureLevelCfg[];

    /**寻找最近将有可能解锁的武将 */
    public getNearHasHero(fid:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Adventure_Level_dat = l[i];
            if (cfg.f_id >= fid && cfg.f_unlockhero != 0) {
                return cfg.f_unlockhero;
            }
        }
    }

    public getAdventureTaskName(id: number): string {
        let l = this.List;
        const cfg = l.find((o: Configs.t_Adventure_Level_dat) => o.f_Levelid === id);
        if (!cfg) {
            throw new Error(`t_Adventure_Level缺少关卡#${id}的配置`);
        }
        return `${cfg.f_ChapterID}-${cfg.f_unitid}`;
    }

    public getByLevelId(lv: number):Configs.t_Adventure_Level_dat{
        let l = this.List;
        let cell = l.find(item => (item as Configs.t_Adventure_Level_dat).f_Levelid == lv);
        return cell;
    }

    /**获取前置的配置 */
    public getPreCfg(lv:number):Configs.t_Adventure_Level_dat{
        let cfg = this.getByLevelId(lv);
        let index = this.List.indexOf(cfg);
        return this.List[index-1];
    }
    /**后置 */
    public getNextCfg(lv:number):Configs.t_Adventure_Level_dat{
        let cfg = this.getByLevelId(lv);
        let index = this.List.indexOf(cfg);
        return this.List[index+1];
    }

    public getChapterName(cfg: Configs.t_Adventure_Level_dat) {
        return cfg.f_Chapter + cfg.f_ChapterID + "-" + cfg.f_unitid;
    }

    /**页签配置 */
    public get pageList():AdventureLevelCfg[]{
        if(!this._pageList){
            this._pageList = [];
            let l:Configs.t_Adventure_Level_dat[] = this.List;
            for(let i = 0;i < l.length;i++){
                let cfg = l[i];
                let cell = this._pageList.find(item=>item.page == cfg.f_Page);
                if(!cell){
                    let _cur:AdventureLevelCfg = new AdventureLevelCfg();
                    _cur.page = cfg.f_Page;
                    this._pageList.push(_cur);
                }
                let curPage = this._pageList[this._pageList.length - 1];
                curPage.addChapter(cfg.f_ChapterID,cfg);
            }
        }
        return this._pageList;
    }
    /**获取当前的页签索引 */
    public getCurTabIndex(lv:number){
        let cfg = this.getByLevelId(lv);
        let f_ChapterID:number = cfg.f_ChapterID;
        let l = this.pageList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            let vo = cell.dataList.find(item=>item.chapterID == f_ChapterID);
            if(vo){
                return i;
            }
        }
    }

    /**当前章节最大小节数 */
    public getChapterMax(page: number, chapterID: number) {
        let cell = this.pageList.find(item => item.page == page);
        if (cell) {
            let b = cell.dataList.find(a => a.chapterID == chapterID);
            if (b) {
                let cfg = b.cfgList[b.cfgList.length - 1];
                return cfg.f_unitid;
            }
        }
        return 0;
    }

    /**获取这个页签这个章节下的的小节范围 */
    public getChapterRange(page: number, chapterID: number){
        let cell = this.pageList.find(item => item.page == page);
        if (cell) {
            let b = cell.dataList.find(a => a.chapterID == chapterID);
            if (b) {
                let minCfg =b.cfgList[0];
                let maxCfg = b.cfgList[b.cfgList.length - 1];
                let unit:IUnitLevel = {} as IUnitLevel;
                unit.minLvId = minCfg.f_Levelid;
                unit.maxLvId = maxCfg.f_Levelid;
                return unit;
            }
        }
        return;
    }
    /**是否是最后章节 */
    public isLastChapterID(chapterId:number){
        let cfg:Configs.t_Adventure_Level_dat = this.List[this.List.length-1];
        if(cfg.f_ChapterID == chapterId){
            return true;
        }
    }
}