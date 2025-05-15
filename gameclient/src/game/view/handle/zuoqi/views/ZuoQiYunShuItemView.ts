import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {TimeUtil, CsTimeVo } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType, EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { SoltItemView2 } from "../../main/views/icon/SoltItemView";
import { ItemVo } from "../../main/vos/ItemVo";
import { ZuoQiModel } from "../ZuoqiModel";

export class ZuoQiYunShuItemView extends ui.views.zuoqi.ui_zuoqi_yunshu_itemUI{
    private cfg:Configs.t_Mount_Mission_dat;
    private model:ZuoQiModel;
    private _needVo:ItemVo;
    private _timeCtl:TimeCtlV2;
    private progressWidth:number;
    constructor(){
        super();
        this.model = ZuoQiModel.Ins;
        ButtonCtl.Create(this.useYuanBao,new Laya.Handler(this,this.onUseGoldHandler));
        ButtonCtl.Create(this.paiqianbtn,new Laya.Handler(this,this.onPaiQianHandler));
        ButtonCtl.Create(this.yunshuzhongbtn,new Laya.Handler(this,this.onDelHandler));
        this._timeCtl = new TimeCtlV2(this.timetf,"{0}",1);
        this.on(Laya.Event.UNDISPLAY,this,this.unDisplay);
        this.progressWidth = this.progress.width;
    }

    private unDisplay(){
        this._timeCtl.stop();
    }

    /**取消运输 */
    private onDelHandler(){
        E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.LangMgr.getLang("CannelYunShu"),new Laya.Handler(this,this.onDel));
    }

    private onDel(){
        this.model.delMission(this.cfg.f_id);
    }

    /**派遣 */
    private onPaiQianHandler(){
        E.ViewMgr.Open(EViewType.ZuoqiMission,null,this.cfg);
    }

    /**使用元宝 */
    private onUseGoldHandler(){
        E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.LangMgr.getLang("UseItem",this._needVo.cntName),new Laya.Handler(this,this.onUnlockHandler));
    }

    private onUnlockHandler(){
        this.model.unlock(this.cfg.f_id);
    }

    private clear(){
        // this.onTimeComplete();
        this.reset();
        this._timeCtl.stop();
        this._timeCtl.off(Laya.Event.CHANGE,this,this.onProgessChange);
        this.progress.width = 1;//this.progressWidth;
        this.useYuanBao.visible = false;
        this.yunshuzhongbtn.visible = false;
        this.paiqianbtn.visible = false;
    }

    private reset(){
        this.timetf.text = "";
        this.progress.visible = true;
        this.progress.width = 1;//this.progressWidth;
    }

    private onTimeComplete(){
        // this.model.timeEndReq();
        this.reset();
    }

    private onProgessChange(){
        let cell  = this.model.getRideMissionVo(this.cfg.f_id);
        let _subTime:number = cell.time - TimeUtil.serverTime;
        if(_subTime >= this.cfg.f_MissionTime){
            _subTime = this.cfg.f_MissionTime;
        }
        if(_subTime>0){
            this.progress.visible = true;
            let w:number = this.progressWidth * ((this.cfg.f_MissionTime-_subTime) / this.cfg.f_MissionTime);
            this.progress.width = w;
        }
    }

    private getTimeDesc(sec:number){
        let _vo:CsTimeVo = TimeUtil.getHMS(sec);
        if(_vo.hour >= 1){
            return _vo.hour + E.LangMgr.getLang("Hour");
        }
        if(_vo.hour < 1 && _vo.minute > 1){
            return _vo.minute + E.LangMgr.getLang("Minute");
        }
        return _vo.sec + E.LangMgr.getLang("Second");
    }

    public setData(cfg:Configs.t_Mount_Mission_dat){
        this.cfg = cfg;
        this.clear();

        let time:string = this.getTimeDesc(cfg.f_MissionTime);
        this.tf1.text = E.LangMgr.getLang("DispathReward",time);//TimeUtil.timeFormatStr(cfg.f_MissionTime,true)
        this.icon.skin=`o/horse_mission/${cfg.f_id}.png`;
        let iconlist:string[] = ["changjinkuang_bai","changjinkuang_lv","changjinkuang_lan","changjinkuang_zi","changjinkuang_jin"];
        this.qua.skin = `remote/zuoqi/${iconlist[cfg.f_PlaceQuality - 1]}.png`;
        this.nameTf.text = cfg.f_PlaceName;
        ItemViewFactory.renderItemSlots(this.itemContainer,cfg.f_PlaceReward,7,1,"right",SoltItemView2 as any,"soltItem2");
        let isOpen:boolean = this.model.isMissionOpen(cfg.f_id);
        if(isOpen){
            if(this.model.isMissionRunning(cfg.f_id)){
                let cell  = this.model.getRideMissionVo(cfg.f_id);
                this._timeCtl.once(Laya.Event.COMPLETE,this,this.onTimeComplete);
                this._timeCtl.on(Laya.Event.CHANGE,this,this.onProgessChange);
                let _subTime:number = cell.time - TimeUtil.serverTime;
                this._timeCtl.start(_subTime);
                // this.progress.width = this.progressWidth * (_subTime / cfg.f_MissionTime);

                if(_subTime < 0){
                    if(E.Debug){
                        E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"warnning 坐骑运输结束时间"+cell.time+" id:"+cell.mssionId+"剩余运输时间:"+_subTime);
                    }
                }

                this.yunshuzhongbtn.visible = true;//运输中
            }else{
                this.paiqianbtn.visible = true;
            }
        }else{
            this.useYuanBao.visible = true;
            let needVo:ItemVo = ItemViewFactory.convertItemList(cfg.f_MissionPrice)[0];
            this._needVo = needVo;
            this.yuanbaoTf.text = needVo.count + "";
        }
    }
}