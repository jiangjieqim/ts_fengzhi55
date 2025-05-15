import { Adventure_revc } from "../../../../network/protocols/BaseProto";
import { AdventureLevelProxy } from "../proxy/AdventureLevelProxy";

/**
 * 冒险数据
 */
export class AdventureVo {
    public revcData: Adventure_revc;

    public isChapterRewardFinished:boolean = false;//所有章节的奖励都领取完成了

    private _allChapterList: Configs.t_Adventure_Level_dat[];

    public nextCfg:Configs.t_Adventure_Level_dat;
    public curCfg:Configs.t_Adventure_Level_dat;
    private getChapter() {
        if (!this._allChapterList) {
            this._allChapterList = [];
            let _l: Configs.t_Adventure_Level_dat[] = AdventureLevelProxy.Ins.List;
            for (let i = 0; i < _l.length; i++) {
                let _cfg = _l[i];
                if (_cfg.f_ChapterReward) {
                    this._allChapterList.push(_cfg);
                }
            }
        }
    }

    /**是否通关 */
    public isOpen(lv: number) {
        return this.revcData.id >= lv;
    }

    private clear(){
        this.isChapterRewardFinished = false;
    }

    public setData(revc: Adventure_revc){
        this.clear();
        this.revcData = revc;
        this.curCfg = AdventureLevelProxy.Ins.getByLevelId(revc.id);//AdventureProxy.Ins.getCfg(revc.id);
        this.getChapter();
        this.getNextCfg();
    }

    /*获取下一个章节领取奖励内容 */
    private getNextCfg(){
        let revc: Adventure_revc = this.revcData;
        let f_Levelid = revc.rewardId;

        if(this._allChapterList.length > 0 && f_Levelid == 0){
            this.nextCfg = this._allChapterList[0];
        }

        for(let  i = 0; i < this._allChapterList.length;i++){
            let cfg:Configs.t_Adventure_Level_dat = this._allChapterList[i];
            if(cfg.f_Levelid == f_Levelid){
                this.nextCfg = this._allChapterList[i+1];
                if(!this.nextCfg){
                    //全部完成
                    this.isChapterRewardFinished = true;
                }
                break;
            }
        }
    }


}