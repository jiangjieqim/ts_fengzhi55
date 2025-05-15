import { TimeCtl } from "../../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { SilkBagHandler_req, stSilkBag } from "../../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { MainModel } from "../../../main/model/MainModel";
import { StarPocketTipsProxy } from "../../proxy/xxzdxProxy";

export class jnctl{
    protected _ui:ui.views.xxzdz.ui_xxzdzItemUI;
    private _timeCtl:TimeCtl;

    constructor(skin:ui.views.xxzdz.ui_xxzdzItemUI) {
        this._ui = skin;

        ButtonCtl.Create(this._ui.btn_add,new Laya.Handler(this,this.onBtnAddClick),false);
        this._ui.img.on(Laya.Event.CLICK,this,this.onImgClick);
        this._timeCtl = new TimeCtl(this._ui.lab_time);
        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemoved);
    }

    private onAdd(){
       
    }

    private onRemoved(){
        this._timeCtl.stop();
    }

    private onBtnAddClick(){
        if(this._isAdd){
            E.ViewMgr.Open(EViewType.XXZDZMJView);
        }
    }

    private onImgClick(e:Laya.Event){
        e.stopPropagation();
        if(this._data){
            if(this._isTip){
                let cfg:Configs.t_Star_PocketTips_dat = StarPocketTipsProxy.Ins.GetDataById(this._data.id);
                MainModel.Ins.showSmallTips(cfg.f_TipsName, cfg.f_TipsTips, this._ui.img);
            }else{
                MainModel.Ins.queryMsg("删除锦囊会把所有的锦囊次数清零",0,0,0,new Laya.Handler(this,this.sendCmd));
            }
        }
    }

    private sendCmd(){
        if(this._data){
            let req: SilkBagHandler_req = new SilkBagHandler_req;
            req.type = 0;
            req.id = this._data.id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _data:stSilkBag;
    private _isTip;
    private _isAdd;
    public setData(value:any,isAdd:boolean,isTip:boolean){
        if(!value)return;
        this._isTip = isTip;
        this._isAdd = isAdd;
        this._data = value.data;
        if(this._data){
            let cfg:Configs.t_Star_PocketTips_dat = StarPocketTipsProxy.Ins.GetDataById(this._data.id);
            this._ui.img.visible = true;
            this._ui.img.skin = `o/star/${cfg.f_Tipsicon}`;
            if(cfg.f_ParaType == 1){
                this._ui.sp.visible = true;
                this._ui.lab2.visible = false;
                let time = this._data.val - TimeUtil.serverTime;
                if(time > 0){
                    this._timeCtl.start(time,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
                }else{
                    this.endTime();
                    this._timeCtl.stop();
                }
            }else{
                this._ui.sp.visible = false;
                this._ui.lab2.visible = true;
                this._ui.lab2.text = this._data.val + "";
                this._timeCtl.stop();
            }
        }else{
            this._ui.img.visible = false;
            this._ui.sp.visible = false;
            this._ui.lab2.visible = false;
            this._timeCtl.stop();
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
     }

     private endTime(){
        this._ui.img.visible = false;
        this._ui.sp.visible = false;
        this._ui.lab2.visible = false;
     }
}