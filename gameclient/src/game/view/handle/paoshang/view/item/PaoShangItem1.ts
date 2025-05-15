import { TimeCtl } from "../../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../../frame/util/TimeUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { HandleStationNearBy_req, StationNearByDetail_req, stItemStation } from "../../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { SimpleEffect } from "../../../avatar/SimpleEffect";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { PaoShangModel } from "../../model/PaoShangModel";
import { PaoShangCfgProxy, PaoShangMissionListProxy } from "../../proxy/PaoShangProxy";

/* @Author: tsy
 * @Date: 2023-02-27 16:33:02
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-24 19:34:22
*/
export class PaoShangItem1 extends ui.views.paoshang.ui_paoshangItemUI{
    private timeCtl:TimeCtl;

    constructor() {
        super();
        this.on(Laya.Event.CLICK,this,this.onClick);
        this.timeCtl = new TimeCtl(this.txt);
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemoved);
    }

    private onAdd(){
       
    }

    private onRemoved(){
        this.timeCtl.stop();
        Laya.Tween.clearAll(this.img_qp);
        Laya.Tween.clearAll(this.img_qp1);
        this.clearEff();
    }

    private onClick(){
        if(this._data){
            if(this._data.handlerState == 1){
                let req:HandleStationNearBy_req = new HandleStationNearBy_req;
                req.flag = 1;
                req.id = this._data.id;
                SocketMgr.Ins.SendMessageBin(req);
            }else if(this._data.handlerState == 2){
                E.ViewMgr.Open(EViewType.PAOSHANGPH,null,this._data);
            }   
        }
    }

    private _data:stItemStation;
    public setData(value:stItemStation){
        if(!value)return;
        Laya.Tween.clearAll(this.img_qp);
        Laya.Tween.clearAll(this.img_qp1);
        this.img_qp.y = 45;
        this.img_qp1.y = 0;
        this.timeCtl.stop();
        this.txt.color = "#ffeec2";
        this._data = value;
        let cfg = PaoShangMissionListProxy.Ins.getCfgByMissionID(value.missionId);
        const rate = Math.min(Math.round(PaoShangCfgProxy.Ins.GetDataById(1).f_loot / 1000), 10);
        let count = (10 - value.count * rate) / 10;

        switch(value.handlerState){/*掠夺,破坏状态 0不可掠夺不可破坏 1可掠夺 2可破坏*/
            case 0:
                this.img_qp.visible = this.img_qp1.visible = false;
                break;
            case 1:
                this.img_qp.visible = true;
                this.setTween(this.img_qp);
                this.icon1.skin = IconUtils.getIconByCfgId(parseInt(cfg.f_LootRewards.split("-")[0]));
                this.img_qp1.visible = false;
                break;
            case 2:
                this.img_qp.visible = false;
                this.img_qp1.visible = true;
                this.setTween(this.img_qp1);
                this.icon2.skin = IconUtils.getIconByCfgId(parseInt(cfg.f_DestoryRewards.split("-")[0]));
                break;
        }

        // this.clearEff();
        this.img_bgm.y = 204;
        this.txt.y = 218;
        let t:number = 0;
        switch (value.state){
            case 1://1货物抵达状态
                this.img_suo.visible = false;
                this.img_tou.visible = false;
                this.box1.visible = true;
                this.img_mc.visible = false;
                this.icon.visible = false;
                this.box2.visible = false;
                this.icon.skin = PaoShangModel.Ins.getStationIcon(value.missionId);
                this.txt.text = "完成";
                this.txt_wzd.text = "完整度";
                this.img_pro.visible = true;
                this.pro.width = 110 * count;
                this.txt1.text = count * 100 + "%";
                this.txt2.text = "";
                this.txt3.text = "";
                // if(cfg.f_MissionType == 1){//元宝
                //     this.setEff(6);
                // }else if(cfg.f_MissionType == 2){//宝箱
                //     this.setEff(3);
                // }else if(cfg.f_MissionType == 3){//银币
                //     this.setEff(9);
                // }else if(cfg.f_MissionType == 4){//火焰
                //     this.setEff(12);
                // }else if(cfg.f_MissionType == 5){
                //     this.setEff(15);
                // }
                this.setEff(cfg.f_finish);
                break;
            case 2://2货物出发中
                this.img_suo.visible = false;
                this.img_tou.visible = false;
                this.box1.visible = true;
                this.img_mc.visible = false;
                this.icon.visible = false;
                this.box2.visible = false;
                this.icon.skin = PaoShangModel.Ins.getStationIcon(value.missionId);
                t = value.endUnix - TimeUtil.serverTime;
                if(t > 0){
                    this.timeCtl.start(t,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
                }
                this.txt_wzd.text = "";
                this.img_pro.visible = false;
                this.pro.width = 110 * count;
                this.txt1.text = "";
                this.txt2.text = "";
                this.txt3.text = "运输中";
                // if(cfg.f_MissionType == 1){//元宝
                //     this.setEff(4);
                // }else if(cfg.f_MissionType == 2){//宝箱
                //     this.setEff(1);
                // }else if(cfg.f_MissionType == 3){//银币
                //     this.setEff(7);
                // }else if(cfg.f_MissionType == 4){//火焰
                //     this.setEff(10);
                // }else if(cfg.f_MissionType == 5){
                //     this.setEff(13);
                // }
                this.setEff(cfg.f_progress);
                break;
            case 3://3被破坏
                this.img_suo.visible = false;
                this.img_tou.visible = false;
                this.box1.visible = true;
                this.box2.visible = false;
                this.img_mc.visible = false;
                this.icon.visible = false;
                this.icon3.skin = PaoShangModel.Ins.getStationIcon(value.missionId);
                this.txt_wzd.text = "";
                this.img_pro.visible = false;
                this.txt1.text = "";
                this.txt2.text = "";
                this.txt3.text = "维修中";
                this.txt.color = "#ff0000";
                t = value.destoryEndUnix - TimeUtil.serverTime;
                if(t > 0){
                    this.timeCtl.start(t,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
                }
                // if(cfg.f_MissionType == 1){//元宝
                //     this.setEff(5);
                // }else if(cfg.f_MissionType == 2){//宝箱
                //     this.setEff(2);
                // }else if(cfg.f_MissionType == 3){//银币
                //     this.setEff(8);
                // }else if(cfg.f_MissionType == 4){//火焰
                //     this.setEff(11);
                // }else if(cfg.f_MissionType == 5){
                //     this.setEff(14);
                // }
                this.setEff(cfg.f_loading);
                break;
        }
    }

    private setTween(img:Laya.Image){
        Laya.Tween.to(img,{y:img.y + 6},500,Laya.Ease.linearNone,Laya.Handler.create(this,this.onComplete,[img]));
    }

    private onComplete(img:Laya.Image):void{
        Laya.Tween.to(img,{y:img.y - 6},700,Laya.Ease.linearNone,Laya.Handler.create(this,this.setTween,[img]));
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str);
    }

    private endTime(){
        let req:StationNearByDetail_req = new StationNearByDetail_req();
        req.isRealPlayer = PaoShangModel.Ins.otherisRealPlayer;
        req.playerId = PaoShangModel.Ins.otherPlayerId;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _eff:SimpleEffect;
    private setEff(ind:string){
        let index;
        let cfg = PaoShangMissionListProxy.Ins.getCfgByMissionID(this._data.missionId);
        if(cfg.f_MissionType == 2){
            index = parseInt(ind.split("|")[main.skinStyle - 1]);
        }else{
            index = parseInt(ind);
        }
        if(!this._eff){
            this._eff = new SimpleEffect(this.box1,`o/spine/car2/car2`);
            this._eff.once(Laya.Event.COMPLETE,this,()=>{
                this._eff.anim.container.x = 192 * 0.5 + 2;
                this._eff.anim.container.y = 165 * 0.5 + 100;
                this._eff.play(index,true);
            });
        }else{
            this._eff.play(index,true);
        }
    }

    private clearEff(){
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
    }
}