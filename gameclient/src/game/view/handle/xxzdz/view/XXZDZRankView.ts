import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../network/SocketMgr";
import { StarBattleRank_req } from "../../../../network/protocols/BaseProto";
import {DotManager} from "../../common/DotManager";
import { XXZDZModel } from "../model/XXZDZModel";
import { XXZDZCtl2 } from "./ctl/XXZDZCtl2";
import { XXZDZCtl3 } from "./ctl/XXZDZCtl3";
import { XXZDZItem3 } from "./item/XXZDZItem3";

export class XXZDZRankView extends ViewBase{
    private _ui:ui.views.xxzdz.ui_xxzdzRankViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    private _item:XXZDZCtl3;

    private _item1:XXZDZCtl2;
    private _item2:XXZDZCtl2;
    private _item3:XXZDZCtl2;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas("jjc.atlas");
        this.addAtlas("xxzdz.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.xxzdz.ui_xxzdzRankViewUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn_rz,new Laya.Handler(this,this.onBtnRZClick)),
            ButtonCtl.Create(this._ui.btn_rank,new Laya.Handler(this,this.onBtnRankClick))
            )
            this._ui.list.itemRender = XXZDZItem3;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);

            this._item = new XXZDZCtl3(this._ui.item);
            this._item1 = new XXZDZCtl2(this._ui.item2);
            this._item2 = new XXZDZCtl2(this._ui.item1);
            this._item3 = new XXZDZCtl2(this._ui.item3);

            this._timeCtl = new TimeCtl(this._ui.timetf);
        }
    }

    protected onInit(): void {
       XXZDZModel.Ins.on(XXZDZModel.UPDATA_RANK_VIEW,this,this.upDataView);
       XXZDZModel.Ins.on(XXZDZModel.UPDATA_RANKAWARD_VIEW,this,this.setRankRedTip);
       let req:StarBattleRank_req = new StarBattleRank_req;
       SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        XXZDZModel.Ins.off(XXZDZModel.UPDATA_RANK_VIEW,this,this.upDataView);
        XXZDZModel.Ins.off(XXZDZModel.UPDATA_RANKAWARD_VIEW,this,this.setRankRedTip);
        this._timeCtl.stop();
    }

    private onBtnRZClick(){
        E.ViewMgr.Open(EViewType.XXZDZRZView);
    }

    private onBtnRankClick(){
        E.ViewMgr.Open(EViewType.XXZDZAwardView);
    }

    private onItemRender(item:XXZDZItem3){
        item.ctl.setData(item.dataSource);
    }

    private upDataView(){
        let arr = [];
        for(let i:number=0;i<XXZDZModel.Ins.starRankList.length;i++){
            if(XXZDZModel.Ins.starRankList[i].ranking > 3){
                arr.push(XXZDZModel.Ins.starRankList[i]);
            }
        }
        this._ui.list.array = arr;
        this._item.setData(XXZDZModel.Ins.myStarRank[0],2);

        for(let i:number=0;i<3;i++){
            if(XXZDZModel.Ins.peakJjcAvatar[i]){
                this["_item" + (i+1)].setData(XXZDZModel.Ins.peakJjcAvatar[i]);
            }else{
                this["_item" + (i+1)].setData(null);
            }
        }

        let time = XXZDZModel.Ins.rewardUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }

        this.setRankRedTip();
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    private setRankRedTip(){
        if(XXZDZModel.Ins.isRankAwardRedTip()){
            DotManager.addDot(this._ui.btn_rank,10);
        }else{
            DotManager.removeDot(this._ui.btn_rank);
        }
    }
}