import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { MonopolyGo_req, MonopolyReward_req, stMonopolyMapInfo } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { MonopolyModel } from "../model/MonopolyModel";
import { MonopolyConfigProxy, MonopolyMapProxy, MonopolyRoundRewardsProxy, MonopolyTileRewardsProxy } from "../proxy/MonopolyProxy";

export class MonopolyView extends ViewBase{
    private _ui:ui.views.monopoly.ui_MonopolyViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;
    protected mMaskClick: boolean = false;
    private _avatar:AvatarMonsterView;
    private _tw:Laya.Tween;
    private _checkBoxCtl:CheckBoxCtl;

    private _timeCtl:TimeCtl;

    private _data:stMonopolyMapInfo;
    private _index:number;
    private _arr:Configs.t_Monopoly_TileRewards_dat[];
    private _xx:number;
    private _yy:number;

    protected onAddLoadRes() {
        this.addAtlas("monopoly.atlas");
    }

    private _checkBoxFlag:boolean = false;
    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.monopoly.ui_MonopolyViewUI;
            this._ui.img0.visible = false;
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_add,new Laya.Handler(this,this.onBtnAddClick)),
                ButtonCtl.Create(this._ui.btn_close,new Laya.Handler(this,this.onBtnCloseClick),false)
            );
            this._checkBoxCtl = new CheckBoxCtl({bg:this._ui.ckbg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkBoxCtl.selected = this._checkBoxFlag;
            this._checkBoxCtl.selectHander = new Laya.Handler(this,this.onCheckHandler);

            this._tw = new Laya.Tween;
            this._timeCtl = new TimeCtl(this._ui.lab_time);
        }
    }

    private onBtnAddClick(){
        E.ViewMgr.Open(EViewType.MonopolyLBView);
    }

    private onBtnCloseClick(){
        if(this._isMove)return;
        if(this._eff.anim.isPlaying)return;
        this.Close();
    }

    private onCheckHandler(){
        this._checkBoxFlag = this._checkBoxCtl.selected;
    }

    private _eff:SimpleEffect;
    protected onInit(): void {
        this._ui.sp_click.on(Laya.Event.CLICK,this,this.onClick);
        this._ui.sp1.on(Laya.Event.CLICK,this,this.onSpClick);
        this._ui.sp2.on(Laya.Event.CLICK,this,this.onSpClick);
        MonopolyModel.Ins.on(MonopolyModel.UPDATA_VIEW_MAP,this,this.onUpdataView);
        MonopolyModel.Ins.on(MonopolyModel.UPDATA_AWARD,this,this.onUpdataAward);
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onValChange);

        this._data = this.Data;
        this._isMove = false;
        this._index = this._data.num;

        let cfg:Configs.t_Monopoly_Map_dat = MonopolyMapProxy.Ins.GetDataById(this._data.fid);
        this._arr = MonopolyTileRewardsProxy.Ins.getListByEventAndArea(cfg.f_EventType,cfg.f_AreaID);
        for(let i:number=0;i<this._arr.length;i++){
            let cfg = this._arr[i];
            let id = parseInt(cfg.f_Rewards.split("-")[0]);
            this._ui["img" + (i + 1)].skin = IconUtils.getIconByCfgId(id);
        }
        this._ui.bg.skin = "static/" + cfg.f_backgroundpic;

        this._avatar = AvatarFactory.getFightMainAvatar(EAvatarDir.Left,0,0,false,E.gameAdapter.leadImageId);
        this._ui.av.addChild(this._avatar);
        this.setDir();
        this._xx = 25;
        this._yy = 45;
        this._ui.av.x = this._ui["img" + this._index].x + this._xx;
        this._ui.av.y = this._ui["img" + this._index].y + this._yy;

        this.setAward();
        this.updataRes();

        if(!this._eff){
            this._eff = new SimpleEffect(this._ui.sp, `o/spine/uitouzi/uitouzi`,0,0,1.0);
            this._eff.anim.on(Laya.Event.COMPLETE,this,this.setAnimIndex);
        }

        let time = MonopolyModel.Ins.endUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    private setAnimIndex(index:number=0){
        this._eff.play(index);
        this._eff.anim.avatar.currentTime = this._eff.anim.avatar.duration;
    }

    protected onExit(): void {
        this._ui.sp_click.off(Laya.Event.CLICK,this,this.onClick);
        this._ui.sp1.off(Laya.Event.CLICK,this,this.onSpClick);
        this._ui.sp2.off(Laya.Event.CLICK,this,this.onSpClick);
        MonopolyModel.Ins.off(MonopolyModel.UPDATA_VIEW_MAP,this,this.onUpdataView);
        MonopolyModel.Ins.off(MonopolyModel.UPDATA_AWARD,this,this.onUpdataAward);
        MainModel.Ins.off(MainEvent.ValChangeCell,this,this.onValChange);
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        Laya.Tween.clearAll(this._ui.av);
        this._tw.clear();
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
        this._timeCtl.stop();
    }

    private onValChange(id:number){
        let cfg = MonopolyConfigProxy.Ins.GetDataById(1);
        let idd = parseInt(cfg.f_Cost.split("-")[0]);
        if(id == idd){
            this.updataRes();
        }
    }

    private updataRes(){
        let cfg = MonopolyConfigProxy.Ins.GetDataById(1);
        let idd = parseInt(cfg.f_Cost.split("-")[0]);
        let count = MainModel.Ins.mRoleData.getVal(idd);
        this._ui.lab_num.text = count + "";
    }

    private setAward(){
        this._ui.lab_num1.text = this._data.count + "";
        let cfg:Configs.t_Monopoly_Map_dat = MonopolyMapProxy.Ins.GetDataById(this._data.fid);
        let arr = MonopolyRoundRewardsProxy.Ins.getListByEventAndArea(cfg.f_EventType,cfg.f_AreaID);
        let rCfg:Configs.t_Monopoly_RoundRewards_dat;
        let rrCfg:Configs.t_Monopoly_RoundRewards_dat;
        for(let i:number=0;i<arr.length;i++){
            if(arr[i].f_BigPrize){
                if(this._data.count < arr[i].f_Round){
                    rCfg = arr[i];
                    break;
                }
                rrCfg = arr[i];
            }
        }
        if(rCfg){
            this._ui.gou1.visible = false;
            let id = parseInt(rCfg.f_RoundRewards.split("-")[0]);
            this._ui.icon.skin = IconUtils.getIconByCfgId(id);
            this._ui.lab_num2.text = rCfg.f_Round + "圈奖励";
        }else{
            this._ui.gou1.visible = true;
            let idd = parseInt(rrCfg.f_RoundRewards.split("-")[0]);
            this._ui.icon.skin = IconUtils.getIconByCfgId(idd);
            this._ui.lab_num2.text = "已领取";
        }

        let c = arr[this._data.count];
        if(!c){
            c = arr[arr.length - 1];
        }
        let iddd = parseInt(c.f_RoundRewards.split("-")[0]);
        this._ui.icon1.skin = IconUtils.getIconByCfgId(iddd);
    }

    private onClick(){
        if(this._isMove)return;
        if(this._eff.anim.isPlaying)return;
        let req:MonopolyGo_req = new MonopolyGo_req;
        req.mapId = this._data.fid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onSpClick(){
        E.ViewMgr.Open(EViewType.MonopolyAwardView,null,this._data);
    }

    private setDir(){
        let dir;
        if(this._index == 0){
            dir = EAvatarDir.Left;
        }else{
            if( this._arr[this._index - 1].f_direct == 0){
                dir = EAvatarDir.Left;
            }else{
                dir = EAvatarDir.Right;
            }
        }
        this._avatar.dir = dir;
    }

    private onUpdataView(){
        this._data = MonopolyModel.Ins.mapList.find(ele => ele.fid === this._data.fid);
        let index;
        if(this._data.num > this._index){
            index = this._data.num - this._index;
        }else{
            index = 39 - this._index + 1 + this._data.num;
        }
        if(this._checkBoxFlag){
            this.setAnimIndex(index - 1);
            this.playMove();
        }else{
            this._eff.play(index - 1,false,this,this.playMove);
        }
    }
    
    private _isMove:boolean;
    private playMove(){
        this._isMove = true;
        this._index ++;
        if(this._index > 39){
            this._index = 0;
        }
        let xx = this._ui["img" + this._index].x + this._xx;
        let yy = this._ui["img" + this._index].y + this._yy;
        this._tw.to(this._ui.av,{x:xx,y:yy},500,Laya.Ease.sineOut,Laya.Handler.create(this,this.onComplete));
    }

    private onComplete(){
        this._isMove = false;
        this.setDir();
        if(this._index == 0){
            this.setAward();
            E.ViewMgr.Open(EViewType.MonopolyAwardView1,null,this._data);
            return;
        }
        if(this._index == this._data.num){
            let req:MonopolyReward_req = new MonopolyReward_req;
            req.type = 1;
            SocketMgr.Ins.SendMessageBin(req);
            return;
        }
        this.playMove();
    }

    private onUpdataAward(){
        if(this._index == this._data.num){
            return;
        }
        this.playMove();
    }
}