import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { FightMonsterModel } from "../vos/FightMonsterModel";
import { t_TeamFight_Reward } from "../vos/t_TeamFight_Reward";
class RewardShowItemView extends ui.views.fighthard.ui_fighthard_reward_show_itemUI{
    constructor(){
        super();
    }
    refresh(index:number){
        let cfg:Configs.t_TeamFight_Reward_dat = this.dataSource;
        //this.model = model;
        //let _data:Configs.t_Alternation_Rank_dat = this.dataSource;
        // let dataList = this.model.convertData(_data);
        // ,DuanWuLeichongSlotItemView,"DuanWuLeichongSlotItemView"
        ItemViewFactory.renderItemSlots(this.rewardCon,cfg.f_preview,10,0.8,"right");
        let arr = cfg.f_Stalls.split("|");
        if(arr.length <= 1){
            this.tf4.text = arr[0];
        }else{
            if(index + 1 == t_TeamFight_Reward.Ins.rewardList.length){
                this.tf4.text = arr[0]+"+";
            }
            else{
                this.tf4.text = arr[0]+"-"+arr[1];
            }
        }
    }
}

/**奖励 */
export class FighthardRewardView extends ViewBase {
    private model:FightMonsterModel;

    protected mMask:boolean = true;
    protected onAddLoadRes(): void { }
    protected onExit(): void { 
        this.model.off(FightMonsterModel.EVENT_REWARD_UPDATA,this,this.updateReward);
    }
    private timeCtl:TimeCtlV2;
    private lingquCtl:ButtonCtl;
    private _ui:ui.views.fighthard.ui_fighthard_reward_showUI;
    protected onFirstInit(): void { 
        if (!this.UI) {
            this.model = FightMonsterModel.Ins;

            this.UI = this._ui = new ui.views.fighthard.ui_fighthard_reward_showUI();
            this._ui.list1.itemRender = RewardShowItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this, this.onRewardHandler);
            this.bindClose(this._ui.close1);
            this.lingquCtl = ButtonCtl.CreateBtn(this._ui.lingquBtn, this, this.onLingQu);
            this.timeCtl = new TimeCtlV2(this._ui.tf3, "{0}");

        }
    }
    private onTimeEnd() {
        // this._ui.timeTf.text ="";
        this.timeUpdate();
    }
    private timeUpdate(){
        this.timeCtl.start(this.model.subTime);
        this.timeCtl.on(Laya.Event.COMPLETE,this,this.onTimeEnd);
    }
    private onLingQu(){
        // let req = new TeamFightRankReward_req();
        // SocketMgr.Ins.SendMessageBin(req);
        this.model.lingqu();
    }
    
    private onRewardHandler(item:RewardShowItemView,index:number){
        item.refresh(index);
    }

    protected onInit(): void { 
        this._ui.list1.array = t_TeamFight_Reward.Ins.rewardList;
        this._ui.list1.scrollTo(0);
        this.timeUpdate();
        let val:number = this.model.data.lastRanking;
        if(val == 0){
            this._ui.tf4.text = E.getLang("fihthard04");
        }else{
            this._ui.tf4.text = E.getLang("fihthard03") + val;
        }
        this.model.on(FightMonsterModel.EVENT_REWARD_UPDATA,this,this.updateReward);
        this.updateReward();
    }

    private updateReward(){
        switch(this.model.data.rankRewardState){
            case 0:
                this.lingquCtl.grayMouseDisable = true;
                break;
            case 1:
                this.lingquCtl.grayMouseDisable = false;
                break;
            case 2:
                this.lingquCtl.grayMouseDisable = true;
                break;
        }
    }
}