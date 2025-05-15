import { ui } from "../../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";

export class RewardItem extends ui.views.allianceFight.ui_allianceFightRewardItemViewUI{
    constructor() {
        super();
    }

    public setData(data: { f_Rank: string, f_Rewards: string }){
        this.rankTf.text = data.f_Rank.toString().replace('|', '-');
        let f_Reward = data.f_Rewards;
        ItemViewFactory.renderItemSlots(this.rewardList,f_Reward,10,0.85,"right");
    }
}