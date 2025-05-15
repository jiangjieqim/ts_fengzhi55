import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { GymMissionRefresh_req, GymMissionReward_req, stGymMission } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { HeroHouseModel } from "../HeroHouseModel";
import { EGymTaskStatus, EGymTaskType } from "../model/EGymType";
import { GymEvent } from "../model/GymEvent";
import { t_Gym_Mission_List, t_Gym_Mission_Quality, t_Gym_Mission_Type, t_Gym_NPC_List } from "../model/GymProxy";
/**武馆任务子元素 */
class HeroHouseTaskItem extends ui.views.hero_house.ui_hero_house_taskitem_viewUI{
    
    private cfg:Configs.t_Gym_Mission_List_dat;
    private lingquCtl:ButtonCtl;
    private _curData:stGymMission;
    private refreshBtnCtl:ButtonCtl;
    constructor(){
        super();
        this.lingquCtl = ButtonCtl.CreateBtn(this.lingquBtn,this,this.onLingQuHandler);
        this.refreshBtnCtl=ButtonCtl.CreateBtn(this.refreshBtn,this,this.onRefreshHandler);
    }

    /**刷新 */
    private onRefreshHandler(){
        let cfg:Configs.t_Gym_Mission_Config_dat = HeroHouseModel.Ins.taskRefreshCfg;//t_Gym_Mission_Config.Ins.GetDataById(1);
        let arr = cfg.f_MissionRefreshCost.split("-");
        let moneyCfgid = parseInt(arr[0]);
        let moneyVal = parseInt(arr[1]);
        MainModel.Ins.queryMsg(E.getLang("RefreshTask"),moneyCfgid,moneyVal,
                            EQuickMsg.HeroHouseTask,
                            new Laya.Handler(this,this.onRefreshOkHandler));
    }

    private onRefreshOkHandler(){
        let req = new GymMissionRefresh_req();
        req.fid = this.cfg.f_id;
        let cell2 = HeroHouseModel.Ins.taskList.find(cell=>cell.fid == this.cfg.f_id);
        req.index = HeroHouseModel.Ins.taskList.indexOf(cell2);
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**领取 */
    private onLingQuHandler(){
        let req = new GymMissionReward_req();
        req.fid = this.cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private set curStar(v:number){
        for(let i = 0; i < 5;i++){
            if((i+1) <= v){
                this['s'+i].visible = true;
            }else{
                this['s'+i].visible = false;
            }
        }
    }

    public refresh(){
        this._curData = this.dataSource;

        this.cfg =    t_Gym_Mission_List.Ins.GetDataById(this._curData.fid);// this.dataSource;
        // let arr = this.cfg.f_Mission.split("-");
        let type = this.cfg.f_TaskType;

        let arr = this.cfg.f_RewardsType.split("|");

        let needVal: number = parseInt(arr[0]);

        let typeCfg: Configs.t_Gym_Mission_Type_dat = t_Gym_Mission_Type.Ins.GetDataById(type);
        let ext = "";
        if(E.Debug){
            ext += this.cfg.f_id+"";
        }
        this.nameTf.text = this.cfg.f_MissionName + ext;
        let heroName:string = "";
        if(this.cfg.f_TaskType == EGymTaskType.GetHero){
            // this.cfg.f_RewardsType   
            let heroid = parseInt(arr[1]);
            heroName = t_Gym_NPC_List.Ins.getByHeroID(heroid).f_name;
        }

        let val = HeroHouseModel.Ins.getTaskVal(this.cfg.f_id);
        this.titleTf.text = StringUtil.format(typeCfg.f_GymtaskContent,val,needVal,heroName);

        this.icon.skin = HeroHouseModel.Ins.getTaskIcon(this.cfg.f_iconid);

        let rewardCfg:Configs.t_Gym_Mission_Quality_dat = t_Gym_Mission_Quality.Ins.getByMissionStarId(this.cfg.f_StarRank);
        let itemVo:ItemVo = ItemViewFactory.convertItemList(rewardCfg.f_MissionRewards)[0];
        ItemViewFactory.refreshSlot(this.slot,itemVo);
        this.curStar = rewardCfg.f_Star;

        this.refreshBtnCtl.visible = false;
        switch(this._curData.rewardStatus){
            case EGymTaskStatus.NotLingqu:
                if(this._curData.count >= needVal){
                    this.lingquCtl.gray = false;
                    this.lingquCtl.mouseEnable = true;
                    this.tf2.text = E.getLang("LingQu");
                }else{
                    this.lingquCtl.gray = true;
                    this.lingquCtl.mouseEnable = false;
                    this.tf2.text = E.getLang("LingQu");
                }
                this.refreshBtnCtl.visible = true;
                break;
            case EGymTaskStatus.YiLingQu:
                this.lingquCtl.mouseEnable = false;
                this.lingquCtl.gray = true;
                this.tf2.text = E.getLang("LingQu2");
                break;
        }

    }
}

/**武馆任务 */
export class HeroHouseTaskView extends ViewBase {
    private model:HeroHouseModel;
    private moneyCtl:ValCtl;
    private _ui:ui.views.hero_house.ui_hero_house_task_viewUI;
    protected mMask:boolean = true;4
    protected onAddLoadRes(): void { }
    protected onExit(): void {
        this.model.off(GymEvent.TaskUpdate,this,this.refreshView);
        this.timeCtl.stop();
    }
    private timeCtl:TimeCtl;
    protected onFirstInit(): void { 
        if(!this.UI){
            this.model = HeroHouseModel.Ins;
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_task_viewUI();
            this.bindClose(this._ui.close1);
            this.moneyCtl = new ValCtl(this._ui.moneyTf,this._ui.moneyIcon);
            this.moneyCtl.setType(ECellType.GOLD);

            this._ui.list1.itemRender = HeroHouseTaskItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onHeroHouseTaskRender);
            this.timeCtl = new TimeCtl(this._ui.timeTf);

            let cfg:Configs.t_Gym_Mission_Config_dat =  this.model.taskRefreshCfg;
            let arr = cfg.f_MissionRefreshCost.split("-");
            ValCtl.Create(this._ui.moneyTf,this._ui.moneyIcon,parseInt(arr[0]));
        }
    }

    private onHeroHouseTaskRender(item:HeroHouseTaskItem){
        item.refresh();
    }

    private refreshView(){
        this._ui.list1.array = this.model.taskList;
        this._ui.list1.scrollTo(0);
    }

    protected onInit(): void { 
        this.model.on(GymEvent.TaskUpdate,this,this.refreshView);
        this.refreshView();
        this.refreshTime();
    }

    private refreshTime(){
        this.timeCtl.start(MainModel.Ins.subNextSecond,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.refreshTime));
    }
    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(E.getLang("ResetTime",time_str));
    }

}