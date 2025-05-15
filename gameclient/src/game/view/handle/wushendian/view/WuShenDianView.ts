import { LogSys } from "../../../../../frame/log/LogSys";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { PalaceFight_req, PalaceRefresh_req, PalaceReset_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import {DotManager} from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EServerVersion, MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { WuShenDianModel } from "../model/WuShenDianModel";
import { WuShenDianConfigProxy, WuShenDianGKProxy } from "../proxy/WuShenDianProxy";
import { WuShenDianAvatrItem } from "./item/WuShenDianAvatrItem";

export class WuShenDianView extends ViewBase{
    private _ui:ui.views.wushendian.ui_wushendianViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    private _model:WuShenDianModel;
    private _plusCtl:FontClipCtl;

    private _timeCtl:TimeCtl;
    private _count:number;
    protected onAddLoadRes() {
        this.addAtlas('wushendian.atlas');
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wushendian.ui_wushendianViewUI;
            this.bindClose(this._ui.btn_close);

            this._model = WuShenDianModel.Ins;
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn_ph,new Laya.Handler(this,this.onBtnPHClick)),
            ButtonCtl.Create(this._ui.btn_sd,new Laya.Handler(this,this.onBtnSDClick)),
            ButtonCtl.Create(this._ui.btn_tj,new Laya.Handler(this,this.onBtnTJClick)),
            ButtonCtl.Create(this._ui.btn_xq,new Laya.Handler(this,this.onBtnXQClick)),

            ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick)),
            ButtonCtl.Create(this._ui.btn_lq,new Laya.Handler(this,this.onBtnLQClick)),
            ButtonCtl.Create(this._ui.btn_tz,new Laya.Handler(this,this.onBtnTZClick)),
            ButtonCtl.Create(this._ui.btn_kstz,new Laya.Handler(this,this.onBtnKSTZClick))
            );

            this._ui.tf3.on(Laya.Event.CLICK,this,this.onTipsHandler);
            this._ui.btn_tip1.on(Laya.Event.CLICK,this,this.onTipsHandler);
            this._plusCtl = FontCtlFactory.createPlus();

            this._ui.list.itemRender = WuShenDianAvatrItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._timeCtl = new TimeCtl(this._ui.lab_time);
        }
    }

    protected onInit(): void {
        this._model.on(WuShenDianModel.UPDATA_VIEW,this,this.updataView);
        this._model.on(WuShenDianModel.UPDATA_RANKAWARD_VIEW,this,this.setRedTip);
        let req:PalaceRefresh_req = new PalaceRefresh_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        this._model.off(WuShenDianModel.UPDATA_VIEW,this,this.updataView);
        this._model.off(WuShenDianModel.UPDATA_RANKAWARD_VIEW,this,this.setRedTip);
        this._timeCtl.stop();
        Laya.timer.clear(this, this.createAvatar);
    }

    private onRenderHandler(item:WuShenDianAvatrItem,index:number){
        item.setData(item.dataSource,index);
    }

    /**阵容特性 */
    private onTipsHandler(e:Laya.Event) {
        e.stopPropagation();
        let st = "";
        for(let i:number=0;i<this._model.attrList.length;i++){
            st += MainModel.Ins.getAttrNameIdByID(this._model.attrList[i],true) + " ";
        }
        MainModel.Ins.showSmallTips("", st, e.target,"rightbottom1");
    }

    private onBtnPHClick(){
        E.ViewMgr.Open(EViewType.WuShenDianRankView);
    }

    private onBtnSDClick(){
        E.ViewMgr.Open(EViewType.WuShenDianShopView);
    }

    private onBtnTJClick(){
        E.ViewMgr.Open(EViewType.WuShenDianTJView);
    }

    private onBtnXQClick(){
        E.ViewMgr.Open(EViewType.WuShenDianSHLView);
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("WuShenDianTitle","WuShenDianDec");
    }

    private onBtnLQClick(){
        if(this._model.gkId == 1){
            E.ViewMgr.ShowMidError("当前关卡不能重置");//显示错误提示
            return;
        }
        MainModel.Ins.queryMsg("重置后将退回第1关并失去所有神魂和核心神魂",0,0,0,new Laya.Handler(this,this.onClickHandler));
    }

    private onBtnTZClick(){
        this._model.isKs = false;
        this.onTZ();
    }

    private onBtnKSTZClick(){
        this._model.isKs = true;
        this.onTZ();
    }

    private onTZ(){
        if(WuShenDianModel.Ins.itemNum >= parseInt(WuShenDianConfigProxy.Ins.GetDataById(1).f_SoulpieceMax)){
            MainModel.Ins.queryMsg("本周青铜币已达获取上限，是否继续挑战",0,0,EQuickMsg.ShenHun5,new Laya.Handler(this,this.sendCmd),"返回","继续挑战");
            return;
        }
        if(this._model.tongguan){
            E.ViewMgr.ShowMidError("您已通过武神的考验，请重置关卡后再挑战");//显示错误提示
            return;
        }
        this.sendCmd();
    }

    private sendCmd(){
        let req:PalaceFight_req = new PalaceFight_req;
        req.type = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onClickHandler(){
        let req:PalaceReset_req = new PalaceReset_req;
        SocketMgr.Ins.SendMessageBin(req);
    }
    private createAvatar(){
        if(MainModel.Ins.serverVer == EServerVersion.Version_1){
            let item:WuShenDianAvatrItem = this._ui.list.getCell(4) as any;
            item.createAvatar();
            Laya.timer.clear(this,this.createAvatar);
        }else{
            if (this._count > 0) {
                let item: WuShenDianAvatrItem = this._ui.list.getCell(this._count-1) as any;
                item.createAvatar();
                this._count--;
            } else {
                Laya.timer.clear(this, this.createAvatar);
            }
        }
    }
    private updataView(){
        this._ui.lab_gk.text = "第" + this._model.gkId + "/" + WuShenDianGKProxy.Ins.max + "关";
        if(MainModel.Ins.serverVer == EServerVersion.Version_1){
            let arr = [1,1,1,1,this._model.enemyList[0],1];
            this._ui.list.array = arr;
            this._count = arr.length;
        }else{
            this._ui.list.array = this._model.enemyList;
            this._count = this._model.enemyList.length;
        }
        
        Laya.timer.frameLoop(1,this,this.createAvatar);

        let v = StringUtil.val2Atlas(this._model.power);
        this._plusCtl.setValue(this._ui.plusCon,v);
        let cfg = WuShenDianGKProxy.Ins.getCfgByGKID(this._model.gkId);
        let award;
        if(this._model.state == 1){//显示首通奖励
            award = cfg.f_FirstpassReward;
        }else{
            award = cfg.f_NormalReward;
        }
        ItemViewFactory.renderItemSlots(this._ui.rewardList,award,10,0.85);

        let time = WuShenDianModel.Ins.refreshUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
        this.setRedTip();
        //判断快速挑战按钮是否显示
        const fastPassLevel = WuShenDianConfigProxy.Ins.GetDataById(1).f_quickfight;
        if ((MainModel.Ins.mRoleData.plus >= this._model.power) && (this._model.gkId < fastPassLevel)) {
            this._ui.btn_kstz.visible = true;
        } else {
            this._ui.btn_kstz.visible = false;
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        let st = "关卡刷新倒计时:\n" + time_str;
        this._timeCtl.setText(st);
     }

     private endTime(){
        this._timeCtl.setText("");
     }

     private setRedTip(){
        if(this._model.isRankAwardRedTip()){
            DotManager.addDot(this._ui.btn_ph,0,10);
        }else{
            DotManager.removeDot(this._ui.btn_ph);
        }
     }
}