import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DailyWheelTurn_req, stActivityCell } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityType } from "../../huodong/model/EActivityType";
import { EMainSkin, MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { MeiRiZhuanPanModel } from "../model/MeiRiZhuanPanModel";
import { WheelRPriceProxy, WheelRewardsProxy } from "../proxy/MeiRiZhuanPanProxy";
import { t_Platform } from "../../main/proxy/t_Platform";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";

export class MeiRiZhuanPanView extends ViewBase{
    private _ui:ui.views.meirizhuanpan.ui_meirizhuanpanUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;
    private _activityVo:ActivityVo;
    private _checkBoxCtl:CheckBoxCtl;

    private _tm:Laya.Timer;
    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("meirizhuanpan.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.meirizhuanpan.ui_meirizhuanpanUI;
            let img_tqCtl =  ButtonCtl.Create(this._ui.img_tq,new Laya.Handler(this,this.onBtnTQClick));
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_tz,new Laya.Handler(this,this.onBtnQDClick)),
                ButtonCtl.Create(this._ui.img_add,new Laya.Handler(this,this.onBtnAddClick)),
                img_tqCtl
            );
            for(let i:number=1;i<11;i++){
                this._ui["img_" + i].on(Laya.Event.CLICK,this,this.onImgClick,[i]);
            }

            this._tm = new Laya.Timer;  
            this._timeCtl = new TimeCtl(this._ui.timetf);

            this._ui.sp_click.on(Laya.Event.CLICK,this,this.onClick);
            this._checkBoxCtl = new CheckBoxCtl({bg:this._ui.bg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkBoxCtl.selected = false;
        
            if(t_Platform.Ins.isHideAdImg){
                img_tqCtl.visible = false;
                this.UI.height -= this._ui.img_tq.height;
            }
        }
    }

    private onBtnTQClick(){
        E.ViewMgr.Open(EViewType.ZhongShenKa);
    }

    private onClick(){
        this.Close();
    }

    private onImgClick(index:number,e:Laya.Event){
        e.stopPropagation();
        if(index == 1){
            if(MeiRiZhuanPanModel.Ins.setItemId){
                let vo1:ItemVo = new ItemVo;
                vo1.cfgId = MeiRiZhuanPanModel.Ins.setItemId;
                MainModel.Ins.showSmallTips(vo1.getName(), vo1.getDesc() , e.target);
            }
        }else{
            let cfg = WheelRewardsProxy.Ins.List.find(ele => ele.f_id === index);
            if(cfg){
                let vo:ItemVo = new ItemVo;
                vo.cfgId = parseInt(cfg.f_Rewards.split("-")[0]);
                MainModel.Ins.showSmallTips(vo.getName(), vo.getDesc() , e.target);
            }
        }
    }

    private _now:number;
    private _isPlay:boolean;
    protected onInit(): void {
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.updataView);
        MeiRiZhuanPanModel.Ins.on(MeiRiZhuanPanModel.UPDATA_ITEMID,this,this.updataItem);
        MeiRiZhuanPanModel.Ins.on(MeiRiZhuanPanModel.UPDATA_ZHUANPAN,this,this.playTween);
        this._ui.img_zz.visible = true;
        this._ui.img_zz1.visible = false;
        this._ui.img_zz1.rotation = 0;
        this._now = 1;
        this._isPlay = false;
        this._ui.btn_tz.visible = true;
        this._ui.bg.visible = this._ui.lab_1.visible = true;

        if(main.skinStyle == EMainSkin.Drum){
            this._ui.img_6.skin = "remote/meirizhuanpan/3_3.png";
            this._ui.zhuanpan.skin = "remote/meirizhuanpan/lunpan1.png"
        }else if(main.skinStyle == EMainSkin.Kotow){
            this._ui.img_6.skin = "remote/meirizhuanpan/3.png";
            this._ui.zhuanpan.skin = "remote/meirizhuanpan/lunpan.png"
        }

        this.updataView();
    }

    protected onExit(): void {
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.updataView);
        MeiRiZhuanPanModel.Ins.off(MeiRiZhuanPanModel.UPDATA_ITEMID,this,this.updataItem);
        MeiRiZhuanPanModel.Ins.off(MeiRiZhuanPanModel.UPDATA_ZHUANPAN,this,this.playTween);
        this._tm.clearAll(this);
        this._timeCtl.stop();
    }

    private updataView(){
        this._activityVo = ActivityModel.Ins.getVo(EActivityType.DayZhuanPan);
        if(this._activityVo){
            let flag:boolean = false;
            let arr:stActivityCell[] = this._activityVo.vo.datalist;
            let arr1 = WheelRewardsProxy.Ins.List;
            for(let i:number = 0;i<arr1.length;i++){
                let vo = arr.find(ele => ele.id === arr1[i].f_id);
                if(vo && vo.param1 == 1){
                    this._ui["zz_" + (i + 1)].visible = true;
                }else{
                    this._ui["zz_" + (i + 1)].visible = false;
                }

                if(vo && vo.param1 == 2){
                    flag = true;
                }
            }

            if(MeiRiZhuanPanModel.Ins.setItemId){
                this._ui.img_add.visible = false;
                this._ui.img_1.visible = true;
                if(MeiRiZhuanPanModel.Ins.setItemId == 3){
                    if(main.skinStyle == EMainSkin.Drum){
                        this._ui.img_1.skin = "remote/meirizhuanpan/tj_3_3.png";
                    }else if(main.skinStyle == EMainSkin.Kotow){
                        this._ui.img_1.skin = "remote/meirizhuanpan/tj_3.png";
                    }
                }else{
                    this._ui.img_1.skin = "remote/meirizhuanpan/tj_" + MeiRiZhuanPanModel.Ins.setItemId + ".png";
                }
                DotManager.removeDot(this._ui.img_add);
            }else{
                this._ui.img_add.visible = true;
                this._ui.img_1.visible = false;
                DotManager.addDot(this._ui.img_add);
            }

            if(flag){
                this._ui.btn_tz.disabled = false;
                this._ui.lab_name.text = "领取";
                this._ui.img.visible = this._ui.lab.visible = false;
                DotManager.addDot(this._ui.btn_tz);
            }else{
                this._ui.lab_name.text = "启动";
                DotManager.removeDot(this._ui.btn_tz);
                let index = this._activityVo.vo.datalist.length + 1;
                let cfg = WheelRPriceProxy.Ins.getCfgById(index);
                if (cfg) {
                    this._ui.btn_tz.disabled = false;
                    this._ui.img.visible = this._ui.lab.visible = true;
                    let id = parseInt(cfg.f_price.split("-")[0]);
                    let num = parseInt(cfg.f_price.split("-")[1]);
                    this._ui.img.skin = IconUtils.getIconByCfgId(id);
                    this._ui.lab.text = num + "";
                } else {
                    this._ui.btn_tz.disabled = true;
                    this._ui.img.visible = this._ui.lab.visible = false;
                }
            }

            let time = this._activityVo.vo.endtime - TimeUtil.serverTime;
            if (time > 0) {
                this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
            } else {
                this.endTime();
                this._timeCtl.stop();
            }
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    private updataItem(){
        if(MeiRiZhuanPanModel.Ins.setItemId){
            this._ui.img_add.visible = false;
            this._ui.img_1.visible = true;
            if(MeiRiZhuanPanModel.Ins.setItemId == 3){
                if(main.skinStyle == EMainSkin.Drum){
                    this._ui.img_1.skin = "remote/meirizhuanpan/tj_3_3.png";
                }else if(main.skinStyle == EMainSkin.Kotow){
                    this._ui.img_1.skin = "remote/meirizhuanpan/tj_3.png";
                }
            }else{
                this._ui.img_1.skin = "remote/meirizhuanpan/tj_" + MeiRiZhuanPanModel.Ins.setItemId + ".png";
            }
            DotManager.removeDot(this._ui.img_add);
        }else{
            DotManager.addDot(this._ui.img_add);
        }
    }

    private onBtnQDClick(){
        if(this._isPlay){
            return;
        }
        if(!this._activityVo){
            return;
        }

        if(MeiRiZhuanPanModel.Ins.setItemId == 0){
            E.ViewMgr.Open(EViewType.MeiRiZhuanPanTip3);
            return;
        }

        let arr:stActivityCell[] = this._activityVo.vo.datalist;
        if(arr.length == 0){
            E.ViewMgr.Open(EViewType.MeiRiZhuanPanTip1);
            return;
        }

        for (let i: number = 0; i < arr.length; i++) {
            if (arr[i].param1 == 2) {
                E.ViewMgr.Open(EViewType.MeiRiZhuanPanTip2,null,arr[i].id);
                return;
            }
        }

        let req:DailyWheelTurn_req = new DailyWheelTurn_req;
        req.ad = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnAddClick(){
        E.ViewMgr.Open(EViewType.MeiRiZhuanPanTip3);
    }

    private _num1:number;
    private _num2:number;
    private _time:number;
    private _index:number;
    private playTween(){
        if(this._checkBoxCtl.selected){
            this.completeOK();
            return;
        }
        this._isPlay = true;
        this._ui.btn_tz.visible = false;
        this._ui.bg.visible = this._ui.lab_1.visible = false;
        if(MeiRiZhuanPanModel.Ins.pos >= this._now ){
            this._index = MeiRiZhuanPanModel.Ins.pos - this._now;
        }else{
            this._index = MeiRiZhuanPanModel.Ins.pos + 10 - this._now;
        }
        this._now = MeiRiZhuanPanModel.Ins.pos;
        this._num1 = 0;
        this._num2 = 0;
        this._time = 350;
        this._tm.once(200,this,this.onComplete4);
    }

    private completeOK(){
        this._isPlay = false;
        this._ui.btn_tz.visible = true;
        this._ui.img_zz.visible = false;
        this._ui.img_zz1.visible = true;
        this._ui.img_zz1.rotation = (MeiRiZhuanPanModel.Ins.pos - 1) * 36;
        this._ui.bg.visible = this._ui.lab_1.visible = true;
        E.ViewMgr.Open(EViewType.MeiRiZhuanPanTip2,null,MeiRiZhuanPanModel.Ins.pos);
    }

    private onComplete4(){
        this._ui.img_zz.visible = false;
        this._ui.img_zz1.visible = true;
        if(this._num1 == 40){
            this.onComplete5();
        }else{
            this._ui.img_zz1.rotation += 36;
            this._time -= 50;
            if(this._time <= 50){
                this._time = 50;
            }
            this._tm.once(this._time,this,this.onComplete4,null,false);
        }
        this._num1 ++;
    }

    private onComplete5(){
        if(this._num2 == this._index){
            this.onComplete6();
        }else{
            this._ui.img_zz1.rotation += 36;
            this._tm.once(100,this,this.onComplete5,null,false);
        }
        this._num2 ++;
    }

    private onComplete6(){
        this._isPlay = false;
        this._ui.btn_tz.visible = true;
        this._ui.bg.visible = this._ui.lab_1.visible = true;
        E.ViewMgr.Open(EViewType.MeiRiZhuanPanTip2,null,MeiRiZhuanPanModel.Ins.pos);
    }
}
