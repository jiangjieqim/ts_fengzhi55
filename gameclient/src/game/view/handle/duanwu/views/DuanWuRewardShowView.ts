import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stMountNum } from "../../../../network/protocols/BaseProto";
import { GemBaseModel } from "../../gemfeast/GemBaseModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { t_Alternation_Rank, t_Alternation_Rookie_Rank } from "../DuanWuProxy";
import { DuanWuLeichongSlotItemView } from "./DuanWuLeichongItemView";
class DuanwuShowItemView extends ui.views.duanwu.ui_duanwu_reward_show_itemUI{
    private model:GemBaseModel;

    constructor(){
        super();
    }
    refresh(model:GemBaseModel,isLastNode:boolean){
        this.model = model;
        let _data:Configs.t_Alternation_Rank_dat = this.dataSource;
        let dataList = this.model.convertData(_data);
        ItemViewFactory.renderItemSlots(this.rewardCon,dataList,10,0.8,"right",DuanWuLeichongSlotItemView,"DuanWuLeichongSlotItemView");
        let arr = _data.f_Position.split("|");
        if(isLastNode){
            this.tf4.text = arr[0]+"+";
        }else{
            this.tf4.text = arr[0]+"-"+arr[1];
        }
    }
}
export class DuanWuRewardShowView extends ViewBase {
    protected mMask:boolean = true;
    private timeCtl:TimeCtl;
    private model:GemBaseModel;
    private maxLen:number;
    private _ui:ui.views.duanwu.ui_duanwu_reward_showUI;
    protected onAddLoadRes(): void {
        this.addAtlas("jjc.atlas");
     }
    protected onExit(): void { }
    protected onFirstInit(): void { 
        if(!this.UI){
            // this.model = DuanWuModel.Ins;
            this.UI = this._ui = new ui.views.duanwu.ui_duanwu_reward_showUI();
            this.bindClose(this._ui.close1);
            this.timeCtl = new TimeCtl(this._ui.tf3);
            this._ui.list1.itemRender = DuanwuShowItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onDuanwuShowItemHander);
        }
    }

    private onDuanwuShowItemHander(item:DuanwuShowItemView,index:number){
        item.refresh(this.model,index == this.maxLen - 1);
    }

    protected onInit(): void {
        this.model = this.Data;
        this._ui.tf1.text = E.getLang(this.model.packageTitleStr);
        let _listData;
        if(this.model.packId == EActivityType.DuanWu){
            _listData = t_Alternation_Rank.Ins.getListByType(this.model.subType);
        }else{
            _listData = t_Alternation_Rookie_Rank.Ins.getListByType(this.model.subType);
        }
        this.maxLen = _listData.length;
        this.setTime();
        this._ui.list1.array = _listData
        this._ui.list1.scrollTo(0);
    }
    private setTime() {
        let _activityVo = this.model.activityVo;
        if (_activityVo) {
            this.timeCtl.start(_activityVo.endTime - TimeUtil.serverTime, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.onEnd));
            if (this.model.rankData && this.model.rankData.self) {
                let selfData: stMountNum = this.model.rankData.self[0];
                let str = "";
                if (selfData.ranking == 0) {
                    str = E.getLang("duanwu03");
                } else {
                    str = selfData.ranking + "";
                }

                this._ui.tf4.text = E.getLang("duanwu04") + ":" + str;
            }else{
                this._ui.tf4.text = E.getLang("duanwu03");;
            }
        }
    }
    private onUpdateTime(ticket: number) {
        let _s:string = TimeUtil.subTime(ticket);
        this._ui.tf3.text = _s;
    }

    private onEnd(){
        this._ui.tf3.text = "";
    }
}