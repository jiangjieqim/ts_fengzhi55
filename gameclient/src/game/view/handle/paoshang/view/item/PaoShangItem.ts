import { ColorUtil } from "../../../../../../frame/util/ColorUtil";
import { TimeCtl } from "../../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../../frame/util/TimeUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { OpenStation_req, StationRewards_req, stItemStation } from "../../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { SimpleEffect } from "../../../avatar/SimpleEffect";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { PaoShangModel } from "../../model/PaoShangModel";
import { PaoShangMissionListProxy } from "../../proxy/PaoShangProxy";

/* @Author: tsy
 * @Date: 2023-02-27 16:33:02
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-24 19:33:50
*/
export class PaoShangItem extends ui.views.paoshang.ui_paoshangItemUI{
    private timeCtl:TimeCtl;

    constructor() {
        super();

        this.timeCtl = new TimeCtl(this.txt);

        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemoved);
    }

    private onAdd(){
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onRemoved(){
        this.off(Laya.Event.CLICK,this,this.onClick);
        this.timeCtl.stop();
        Laya.Tween.clearAll(this.img_qp);
        this.clearEff();
    }

    private onClick(){
        switch(this._data.state){
            case 1://已完成
                let req:StationRewards_req = new StationRewards_req();
                req.id = this._data.id;
                SocketMgr.Ins.SendMessageBin(req);
                break;
            case 4:
                E.ViewMgr.Open(EViewType.PAOSHANGTASK);
                break;
            case 5:
                E.ViewMgr.Open(EViewType.PAOSHANGJS);
                break;
        }
    }

    private setTween(img:Laya.Image){
        Laya.Tween.to(img,{y:img.y + 6},500,Laya.Ease.linearNone,Laya.Handler.create(this,this.onComplete,[img]));
    }

    private onComplete(img:Laya.Image):void{
        Laya.Tween.to(img,{y:img.y - 6},700,Laya.Ease.linearNone,Laya.Handler.create(this,this.setTween,[img]));
    }

    private _offY:number = 15;
    private _data:stItemStation;
    public setData(value:stItemStation){
        if(!value)return;
        // this.clearEff();
        Laya.Tween.clearAll(this.img_qp);
        this.img_qp.y = 45;
        this.timeCtl.stop();
        this.txt.color = "#ffeec2";
        this._data = value;
        let cfg = PaoShangMissionListProxy.Ins.getCfgByMissionID(value.missionId);
        let count = (10 - value.count) / 10;
        this.img_bgm.y = 204;
        this.txt.y = 218;
        let t:number = 0;
        this.img_mc.filters = [];
        switch (value.state){
            case 1://1货物抵达状态
                this.img_suo.visible = false;
                this.img_tou.visible = false;
                this.img_qp.visible = true;
                this.setTween(this.img_qp);
                this.img_qp1.visible = false;
                this.box1.visible = true;
                this.img_mc.visible = false;
                this.icon.visible = false;
                this.box2.visible = false;
                this.icon.skin = PaoShangModel.Ins.getStationIcon(value.missionId);
                this.icon1.skin = IconUtils.getIconByCfgId(parseInt(cfg.f_MissionRewards.split("-")[0]));
                this.txt.text = "完成";
                this.txt_wzd.text = "完整度";
                this.img_pro.visible = true;
                this.pro.width = 110 * count;
                this.txt1.text = count * 100 + "%";
                this.txt2.text = "";
                this.txt3.text = "";
                this.setEff(cfg.f_finish);
                break;
            case 2://2货物出发中
                this.img_tou.visible = false;
                this.img_suo.visible = false;
                this.img_qp.visible = false;
                this.img_qp1.visible = false;
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
                this.setEff(cfg.f_progress);
                break;
            case 3://3被破坏
                this.img_suo.visible = false;
                this.img_tou.visible = false;
                this.img_qp.visible = false;
                this.img_qp1.visible = false;
                this.box1.visible = true;
                this.img_mc.visible = false;
                this.icon.visible = false;
                this.box2.visible = false;
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
                this.setEff(cfg.f_loading);
                break;
            case 4://4空闲
                this.clearEff();
                this.img_suo.visible = false;
                this.img_tou.visible = false;
                this.img_qp.visible = false;
                this.img_qp1.visible = false;
                this.box1.visible = true;
                this.img_mc.visible = true;
                this.icon.visible = false;
                this.box2.visible = false;
                this.txt_wzd.text = "";
                this.img_pro.visible = false;
                this.txt1.text = "";
                this.txt2.text = "";
                this.txt3.text = "";
                this.txt.text = "空闲";
                this.img_bgm.y = 204 + this._offY;
                this.txt.y = 218 + this._offY;
                break;
            case 5://5未解锁
                this.img_suo.visible = true;
                this.img_tou.visible = false;
                this.img_qp.visible = false;
                this.img_qp1.visible = false;
                this.box1.visible = true;
                this.img_mc.visible = true;
                this.icon.visible = false;
                this.img_mc.filters =  ColorUtil.CreateColorFilter(1);
                this.box2.visible = false;
                this.txt_wzd.text = "";
                this.img_pro.visible = false;
                this.txt1.text = "";
                this.txt2.text = "";
                this.txt3.text = "";
                this.txt.text = "未解锁";
                this.img_bgm.y = 204 + this._offY;
                this.txt.y = 218 + this._offY;
                break;
            case 6://等级解锁
                this.img_suo.visible = true;
                this.img_tou.visible = false;
                this.img_qp.visible = false;
                this.img_qp1.visible = false;
                this.box1.visible = true;
                this.img_mc.filters =  ColorUtil.CreateColorFilter(1);
                this.icon.visible = false;
                this.box2.visible = false;
                this.txt_wzd.text = "";
                this.img_pro.visible = false;
                this.txt1.text = "";
                this.txt2.text = "";
                this.txt3.text = "";
                this.txt.text = "LV." + value.count + "解锁";
                this.img_bgm.y = 204 + this._offY;
                this.txt.y = 218 + this._offY;
                break;
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str);
    }

    private endTime(){
        let req:OpenStation_req = new OpenStation_req();
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
