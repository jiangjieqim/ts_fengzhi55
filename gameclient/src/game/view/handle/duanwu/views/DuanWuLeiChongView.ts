import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ChengHaoListProxy } from "../../chenghao/proxy/ChengHaoProxy";
import { GemBaseModel } from "../../gemfeast/GemBaseModel";
import { ItemUpdateCtl } from "../../main/ctl/ItemUpdateCtl";
import { ECellType } from "../../main/vos/ECellType";
import { DuanWuEvent } from "../DuanWuEvent";
import { t_Alternation_Recharge } from "../DuanWuProxy";
import { DuanWuLeichongItemView } from "./DuanWuLeichongItemView";

class DuanwuTopRewardView extends ui.views.duanwu.ui_duanwu_top_rewardUI{
    cfg:Configs.t_Alternation_Recharge_dat;
    public refresh(){
        this.tf.text = StringUtil.moneyCv(this.cfg.f_PackName) + "";
    }

    public set enable(v:boolean){
        this.bg02.visible = v;
    }
}

/**端午累充 */
export class DuanWuLeiChongView extends ViewBase{
    protected mMask:boolean = true;
    private model:GemBaseModel;
    private timeCtl:TimeCtl;
    private _moneyCtl:ItemUpdateCtl;
    private _ui:ui.views.duanwu.ui_duanwu_leichongUI;
    private topRewardsList:DuanwuTopRewardView[] = [];
    protected  onAddLoadRes(): void{}
    protected  onExit(): void{
        this.model.off(DuanWuEvent.MoneyUpdate,this,this.updateEvt);
    }
    protected  onFirstInit(): void{
        if(!this.UI){
            this.UI = this._ui = new ui.views.duanwu.ui_duanwu_leichongUI();
            this.bindClose(this._ui.close1);
            this.timeCtl = new TimeCtl(this._ui.tf3);
            this._moneyCtl = new ItemUpdateCtl(this._ui.moneyTf,ECellType.GOLD);

            
            this._ui.list1.itemRender = DuanWuLeichongItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHadnler);

        }
    }

    private initTitle(){

        while(this.topRewardsList.length){
            let cell =  this.topRewardsList.shift();
            cell.removeSelf();
        }

        let list1 = t_Alternation_Recharge.Ins.getListByType(this.model.subType);
        // let maxCfg:Configs.t_Alternation_Recharge_dat = list1[list1.length -1];
        for(let i = 0;i < list1.length;i++){
            let item = new DuanwuTopRewardView();
            let cfg:Configs.t_Alternation_Recharge_dat = list1[i];
            item.cfg = cfg;
            // item.x = cfg.f_PackName / maxCfg.f_PackName * this._ui.bg5.width;
            item.x = (i + 1) * this._ui.bg5.width/list1.length;
            item.y = this._ui.progressImg.height / 2;
            this.topRewardsList.push(item);
            item.refresh();
            this._ui.progressImg.addChild(item);
        }
        //---

    }

    private onRenderHadnler(item:DuanWuLeichongItemView){
        item.refresh(this.model);
    }
    protected onInit(): void{
        this.model = this.Data;
        this._ui.tf1.text = E.getLang(this.model.leichongTitle);
        this._ui.titleImg.skin = "o/title/" + ChengHaoListProxy.Ins.getCfgByID(t_Alternation_Recharge.Ins.titleId(this.model.subType)).f_titlePic;
        this.initTitle();
        this.model.on(DuanWuEvent.MoneyUpdate,this,this.updateEvt);
        this.setTime();
        this.updateTopView();
        this._ui.list1.array = t_Alternation_Recharge.Ins.getListByType(this.model.subType);
        this._ui.list1.scrollTo(0);
    }
    private setTime(){
        let _activityVo = this.model.activityVo;
        if(_activityVo){
            this.timeCtl.start(_activityVo.endTime - TimeUtil.serverTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.onEnd));
        }
    }
    private updateTopView(){
        let totalCnt = this.model.totalCnt;
        this._ui.tf.text = E.getLang("cur") + ":" + StringUtil.moneyCv(totalCnt);
        let maxVal = this.topRewardsList[this.topRewardsList.length -1].cfg.f_PackName;
        let stopInedx:number = 0;
        let isMax:boolean = false;
        for(let i = 0;i < this.topRewardsList.length;i++){
            let item = this.topRewardsList[i];
            let cfg:Configs.t_Alternation_Recharge_dat = item.cfg;
            let next:Configs.t_Alternation_Recharge_dat;
            if(i < this.topRewardsList.length-1){
                next = this.topRewardsList[i+1].cfg;
                if(totalCnt >= cfg.f_PackName && totalCnt < next.f_PackName){
                    stopInedx = i + 1;
                }
            }
            if (totalCnt >= cfg.f_PackName) {
                item.enable = true;
            }else{
                item.enable = false;
            }
        }
        if(totalCnt >= maxVal)
        {
            stopInedx = this.topRewardsList.length-1;
            isMax = true;
        }
        let nextItem = this.topRewardsList[stopInedx];
        let curItem;
        let cur = nextItem.cfg.f_PackName;
        let preVal = 0;
        if(stopInedx > 0){
            curItem = this.topRewardsList[stopInedx-1];
            preVal = curItem.cfg.f_PackName;
        }
        let val = (totalCnt-preVal) / (cur-preVal);
        //console.log("stopInedx:"+stopInedx+","+val);
        let w:number = 0;
        if(curItem){
            w = curItem.x + (nextItem.x-curItem.x) * val;
        }else{
            w = nextItem.x * val;
        }
        if(isMax){
            w = nextItem.x;
        }
        this._ui.progressImg.width = w;
    }
    private updateEvt(){
        this.setTime();
        this._ui.list1.refresh();
        this.updateTopView();
    }
    private onUpdateTime(ticket:number){
        let _s:string = TimeUtil.subTime(ticket);
        this._ui.tf3.text = _s;
    }
    private onEnd(){
        this._ui.tf3.text = "";
    }
}