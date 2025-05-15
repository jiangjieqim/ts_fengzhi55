import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { JjcFactory } from "../JjcFactory";

export class JjcRewardShowItemView extends ui.views.jjc.ui_jjc_reward_show_itemUI{
    public setData(data){
        // Configs.t_Arena_RankReward_Daily_dat|Configs.t_Arena_RankReward_Weekly_dat
        let dayCfg:Configs.t_Arena_RankReward_Daily_dat = data;
        let rankStr:string = "";
        let f_StatMax:number = 0;
        let f_Reward = "";
        if(dayCfg.f_DailyRewardID){
            rankStr = dayCfg.f_Ranking;
            f_StatMax = dayCfg.f_StatMax;
            // this.rankTf.text = "day:" + data.f_id;
            // this.refreshDay(dayCfg);
            f_Reward = dayCfg.f_DailyReward;
        }else{
            let weekCfg:Configs.t_Arena_RankReward_Weekly_dat = data;
            rankStr = weekCfg.f_Ranking;
            f_StatMax = weekCfg.f_StatMax;
            f_Reward = weekCfg.f_WeeklyReward;
            // this.rankTf.text = "week:" + data.f_id;
        }

        let _rankArr:string[] = rankStr.split("|");
        let _rankStartVal:number = parseInt(_rankArr[0]);
        let _rankEndVal: number = parseInt(_rankArr[1]);
        this.icon1.visible = false;
        let showRankStr:string = "";
        if (f_StatMax) {
            showRankStr = _rankStartVal + "+";
        } else {
            if (_rankStartVal <= 3) {
                this.icon1.visible = true;
                this.icon1.skin = JjcFactory.getRankImg(_rankStartVal);
            }
            else {
                if(_rankEndVal){
                    showRankStr = _rankStartVal + "-" + _rankEndVal;
                }else{
                    showRankStr = _rankStartVal+"";
                }
            }
        }
        this.rankTf.text = showRankStr;-
        ItemViewFactory.renderItemSlots(this.rewardList,f_Reward,10,0.85,"right");
    }

}