import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ActivityModel } from "../ActivityModel";
import { KaiXiangDajiItem } from "../views/KaiXiangDajiItem";
import { EXingFuKuangHuan } from "../views/XingFuKuangMainView";
import { ActivityEvent } from "./ActivityEvent";
import { t_Pack_BoxEventProxy } from "./ActivityProxy";
import { IActivityTime } from "./ActivityTimeUtils";
import { ActivityVo } from "./ActivityVo";
import { EActivityLingQu, EActivityType } from "./EActivityType";

export class BaseXingFuKuanghuanCtl{
    public type:EXingFuKuangHuan;
    public skin;
    protected _timeCtl:TimeCtlV2;
    protected _activityVo:ActivityVo;
    protected activityType:EActivityType;
    protected model:ActivityModel;

    /**初始化调用s */
    public onFirstInit(){
        this.model =  ActivityModel.Ins;
        this._timeCtl = new TimeCtlV2(this.skin.timetf,"{0}");
    }
    /*切换页面调用 */
    public onInit(){
        this._activityVo = this.model.getVo(this.activityType);
        this.model.on(ActivityEvent.UpdateData,this,this.onUpdateView);
        this.skin.visible = true;
        this.timeRefresh();
    }
    /**退出调用 */
    public onExit(){
        this._timeCtl.stop();
        if(this.model){
            this.model.off(ActivityEvent.UpdateData,this,this.onUpdateView);
        }
        this.skin.visible = false;
    }

    protected onUpdateView(){

    }
    /**
     * 倒计时
     */
    protected timeRefresh() {
        if (this._activityVo) {
            this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
            let time: IActivityTime = {} as IActivityTime;//ActivityTimeUtils.getTime(this._activityVo.cfg);
            time.start = this._activityVo.startTime;
            time.end = this._activityVo.endTime;
            
            this.skin.tf1.visible = true;
            this._timeCtl.start(time.end - TimeUtil.serverTime);
        }
    }
    private onTimeComplete(){
        this.skin.timetf.text = "";
        this.skin.tf1.visible = false;
    }
}

export interface IKaiXiangDaji{
    refreshView();
}

/**开箱大吉 */
export class KaiXiangDajiCtl extends BaseXingFuKuanghuanCtl{
    public skin:ui.views.huodong.ui_kaixiangdaji_viewUI;
    protected activityType:EActivityType = EActivityType.KaiXaingDaji;
    constructor(){
        super();
    }
    public onFirstInit(){
        super.onFirstInit();
        this.skin.list1.itemRender = KaiXiangDajiItem;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onRenderHander);
    }

    private onRenderHander(item:KaiXiangDajiItem){
        item.refreshView(this._activityVo);
    }

    public onInit(){
        super.onInit();
        MainModel.Ins.on(MainEvent.BoxUsed,this,this.onRefreshList);
        this.onUpdateView();
    }
    private canLingquIndex(){
        let l = t_Pack_BoxEventProxy.Ins.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Pack_BoxEvent_dat = l[i];
            if (this._activityVo.getParam1(cfg.f_id) == EActivityLingQu.KeLingQu) {
                return i;
            }
        }
        return -1;
    }
    protected onRefreshList(){
        this.skin.list1.refresh();
    }

    protected onUpdateView(){
        this.skin.list1.array = t_Pack_BoxEventProxy.Ins.List;
        let index = this.canLingquIndex();
        if(index >=0){
            this.skin.list1.scrollTo(index);
        }else{
            this.skin.list1.scrollTo(0);
        }
    }
  
    public onExit(){
        super.onExit();
        MainModel.Ins.off(MainEvent.BoxUsed,this,this.onRefreshList);
    }
}