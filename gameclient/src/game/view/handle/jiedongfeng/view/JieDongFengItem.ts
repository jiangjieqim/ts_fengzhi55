import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { NewPlayerAttr_req } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { NewplayerAttributeProxy } from "../proxy/JieDongFengProxy";
import { LogSys } from "../../../../../frame/log/LogSys";

export class JieDongFengItem extends ui.views.jiedoufeng.ui_jiedoufengitemUI{

    private _timeCtl:TimeCtl;
    private _eff:SimpleEffect;

    constructor() {
        super();

        this._timeCtl = new TimeCtl(this.timetf);
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemoved);

        ButtonCtl.Create(this.img,new Laya.Handler(this,this.onImgClick),false);
        ButtonCtl.Create(this.img_add,new Laya.Handler(this,this.onImgClick),false);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        this._eff = new SimpleEffect(this.eff, `o/spine/uief1/uief1`);
    }

    private onBtnClick(){
        if(this._data){
            if(this._data.selectId){
                E.sendTrack("ad_watch", { type: "jiedongfeng" });
                E.sdk.lookVideo((type: 0 | 1 | 2) => {
                    LogSys.Log('type: ', type);
                    switch (type) {
                        case 0:
                            // ⽤户未看完取消
                            break;
                        case 1:
                            // ⽤户看完⼴告
                            E.sendTrack("ad_finish", { type: "jiedongfeng" });
                            let req: NewPlayerAttr_req = new NewPlayerAttr_req;
                            req.type = this._data.type;
                            req.id = this._data.selectId;
                            SocketMgr.Ins.SendMessageBin(req);
                            break;
                        case 2:
                            // 拉取⼴告错误
                            break;
                    }
                });
            }else{
                this.onImgClick();
            }
        }
    }

    private onImgClick(){
        if(this._data){
            E.ViewMgr.Open(EViewType.JieDongFengView1,null,this._data.type);
        }
    }

    private onAdd(){

    }

    private onRemoved(){
        this._timeCtl.stop();
        if(this._eff){
            this._eff.stop();
        }
    }

    private _data:any;
    public setData(value:any){
        if(!value)return;
        this._data = value;
        if(value.data){
            this._eff.play(0,true);
            let cfg:Configs.t_Newplayer_Attribute_dat = NewplayerAttributeProxy.Ins.GetDataById(value.selectId);
            this.img_add.mouseEnabled = false;
            this.img.visible = true;
            this.img.mouseEnabled = false;
            this.img.skin = "o/adattr/" + cfg.f_icon;
            this.sp.visible = false;
            let arr = cfg.f_attribute.split(":");
            this.nameTf.text = MainModel.Ins.getAttrNameIdByID(parseInt(arr[0])) + ":" + attrConvert(parseInt(arr[0]),parseInt(arr[1]));
            this.btn.visible = false;
            this.img_time.visible = true;
            let time = value.data.endUnix - TimeUtil.serverTime;
            if (time > 0) {
                this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
            } else {
                this.endTime();
            }
        }else{
            this._eff.stop();
            this._timeCtl.stop();
            this.btn.visible = true;
            this.img_time.visible = false;
            if(value.selectId > 0){
                this.sp.visible = true;
                this.img.visible = true;
                this.img.mouseEnabled = true;
                let ccfg:Configs.t_Newplayer_Attribute_dat = NewplayerAttributeProxy.Ins.GetDataById(value.selectId);
                let arr = ccfg.f_attribute.split(":");
                this.nameTf.text = MainModel.Ins.getAttrNameIdByID(parseInt(arr[0])) + ":" + attrConvert(parseInt(arr[0]),parseInt(arr[1]));
                this.img.skin = "o/adattr/" + ccfg.f_icon;
                this.img_add.mouseEnabled = false;
            }else{
                let arr = NewplayerAttributeProxy.Ins.getListByType(value.type);
                this.nameTf.text = arr[0].f_attrname;
                this.sp.visible = false;
                this.img.visible = false;
                this.img_add.mouseEnabled = true;
            }
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
        this._eff.stop();
        this._timeCtl.stop();
        if(this._data){
            this.btn.visible = true;
            this.img_time.visible = false;
            this.sp.visible = true;
            this.img.visible = true;
            this.img.mouseEnabled = true;
            let ccfg: Configs.t_Newplayer_Attribute_dat = NewplayerAttributeProxy.Ins.GetDataById(this._data.selectId);
            let arr = ccfg.f_attribute.split(":");
            this.nameTf.text = MainModel.Ins.getAttrNameIdByID(parseInt(arr[0])) + ":" + attrConvert(parseInt(arr[0]), parseInt(arr[1]));
            this.img.skin = "o/adattr/" + ccfg.f_icon;
            this.img_add.mouseEnabled = false;
        }
    }
}