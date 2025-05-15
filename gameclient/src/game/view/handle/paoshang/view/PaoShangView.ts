/* @Author: tsy
 * @Date: 2023-02-28 10:17:59
 * @Last Modified by: tsy
 * @Last Modified time: 2023-04-04 14:26:45
*/
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { OpenStation_req, RecoverPassport_req, RemarkStationNearBy_req, RemRemarkStationNearBy_req, stItemStation, UpgradePassportSlot_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import {DotManager} from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { PaoShangModel } from "../model/PaoShangModel";
import { PaoShangCfgProxy, PaoShangSlotOpenProxy } from "../proxy/PaoShangProxy";
import { PaoShangItem } from "./item/PaoShangItem";
import { PaoShangItem1 } from "./item/PaoShangItem1";

export class PaoShangView extends ViewBase{
    private _ui:ui.views.paoshang.ui_paoshangUI;
    protected mMask = true;
    protected autoFree: boolean = true;

    private timeCtl:TimeCtl;

    // 弹出礼包uid
    private packUid: number = 14;

    protected onAddLoadRes() {
        this.addAtlas('paoshang.atlas');
        this.addAtlas('huodong.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.paoshang.ui_paoshangUI;
            this.bindClose(this._ui.btn_close);
            ValCtl.Create(this._ui.txt_money4,this._ui.img_money4,ECellType.GOLD);
            this.timeCtl = new TimeCtl(this._ui.txt_time);
            ButtonCtl.Create(this._ui.btn_fh,new Laya.Handler(this,this.onBtnFHClick));
            ButtonCtl.Create(this._ui.btn_add,new Laya.Handler(this,this.onBtnAddClick));
            ButtonCtl.Create(this._ui.btn_wp,new Laya.Handler(this,this.onBtnWPClick));
            ButtonCtl.Create(this._ui.btn_rz,new Laya.Handler(this,this.onBtnRZClick));
            ButtonCtl.Create(this._ui.btn_ss,new Laya.Handler(this,this.onBtnSSClick));
            ButtonCtl.Create(this._ui.btn_bj,new Laya.Handler(this,this.onBtnBJClick));
            ButtonCtl.Create(this._ui.btn_ybj,new Laya.Handler(this,this.onBtnYBJClick));
            ButtonCtl.Create(this._ui.btn_xslb,new Laya.Handler(this,this.onBtnXslbClick));

            this._ui.list.array = this._ui.list1.array = [];

            this._ui.list.itemRender = PaoShangItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.itemRender);

            this._ui.list1.itemRender = PaoShangItem1;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.itemRender1);

            this._ui.img_money3.skin = IconUtils.getIconByCfgId(56);
        }
    }

    private onBtnXslbClick(){
        ActivityModel.Ins.diamondEject(this.packUid);
    }

    private sendInit(){
        let req:OpenStation_req = new OpenStation_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onInit() {
        E.ViewMgr.Close(EViewType.Main);
        this._ui.txt_money4.text = MainModel.Ins.mRoleData.getVal(ECellType.GOLD) + "";
        PaoShangModel.Ins.on(PaoShangModel.UPDATA_VIEW,this,this.updataMyView);
        PaoShangModel.Ins.on(PaoShangModel.UPDATA_OTHER_VIEW,this,this.updataOtherView);
        PaoShangModel.Ins.on(PaoShangModel.UPDATA_TXZ,this,this.onUpdateMoneyAll);
        PaoShangModel.Ins.on(PaoShangModel.UPDATA_RES,this,this.setDot);
        MainModel.Ins.on(MainEvent.ValChange,this,this.onUpdateMoney);
        // 限时礼包按钮是否显示
        ActivityModel.Ins.on(ActivityEvent.PopWinUpdate,this,ActivityModel.Ins.onPop, [this.packUid, this._ui.btn_xslb]);
        ActivityModel.Ins.onPop(this.packUid, this._ui.btn_xslb);
        this.sendInit();
    }

    protected onExit() {
        E.ViewMgr.Open(EViewType.Main);
        PaoShangModel.Ins.off(PaoShangModel.UPDATA_VIEW,this,this.updataMyView);
        PaoShangModel.Ins.off(PaoShangModel.UPDATA_OTHER_VIEW,this,this.updataOtherView);
        PaoShangModel.Ins.off(PaoShangModel.UPDATA_TXZ,this,this.onUpdateMoneyAll);
        PaoShangModel.Ins.off(PaoShangModel.UPDATA_RES,this,this.setDot);
        MainModel.Ins.off(MainEvent.ValChange,this,this.onUpdateMoney);
        ActivityModel.Ins.off(ActivityEvent.PopWinUpdate,this,ActivityModel.Ins.onPop);
        this.timeCtl.stop();
    }

    private onUpdateMoneyAll(){
        const count = MainModel.Ins.mRoleData.getVal(ECellType.TongXingZheng);
        this._ui.txt_money3.text = count + "/" + PaoShangModel.Ins.passports;
        this.setBtn();
    }

    private setBtn(){
        let num = parseInt(PaoShangCfgProxy.Ins.GetDataById(1).f_PassportMax);
        if(PaoShangModel.Ins.passports >= num){
            this._ui.btn_add.visible = false;
        }else{
            this._ui.btn_add.visible = true;
        }
        this._ui.btn_add.visible = false;
    }

    private onUpdateMoney(id:number = ECellType.TongXingZheng){
        if(id == ECellType.TongXingZheng){
            const count = MainModel.Ins.mRoleData.getVal(id);
            this._ui.txt_money3.text = count + "/" + PaoShangModel.Ins.passports;
            this.setBtn();
            if(count < PaoShangModel.Ins.passports){
                this.refreshTime();
            }else{
                this.timeCtl.setText("");
                this.timeCtl.stop();
            }
            if(PaoShangModel.Ins.isDotTXZ()){
                DotManager.addDot(this._ui.btn_wp,0,15);
            }else{
                DotManager.removeDot(this._ui.btn_wp);
            }
        }
    }

    private refreshTime(){
        let t = PaoShangModel.Ins.endUnix - TimeUtil.serverTime;
        if(t <= 0){
            t = PaoShangCfgProxy.Ins.GetDataById(1).f_PassportRestoreTime;
        }
        this.timeCtl.start(t,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
    }
    
    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str);
    }

    private endTime(){
        this.timeCtl.setText("");
        let req:RecoverPassport_req = new RecoverPassport_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnAddClick(){
        // let arr = PaoShangCfgProxy.Ins.GetDataById(1).f_ExtendCost.split("-");
        // MainModel.Ins.queryMsg("购买通行证上限",parseInt(arr[0]),parseInt(arr[1]),
        //     EQuickMsg.PaoShangBuy,new Laya.Handler(this,this.onBuyHandler));
    }

    private onBtnWPClick(){
        E.ViewMgr.Open(EViewType.PAOSHANGTASK);
    }

    private onBtnRZClick(){
        E.ViewMgr.Open(EViewType.PAOSHANGRIZHI);
    }

    private onBtnSSClick(){
        E.ViewMgr.Open(EViewType.PAOSHANGNEAR);
    }

    private onBtnBJClick(){
        let req:RemarkStationNearBy_req = new RemarkStationNearBy_req();
        req.isRealPlayer = PaoShangModel.Ins.otherisRealPlayer;
        req.playerId = PaoShangModel.Ins.otherPlayerId;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnYBJClick(){
        MainModel.Ins.queryMsg("是否确定删除该标记?",0,0,EQuickMsg.PaoShangDel,new Laya.Handler(this,this.onDelHandler));
    }

    private onDelHandler(){
        let req:RemRemarkStationNearBy_req = new RemRemarkStationNearBy_req();
        req.isRealPlayer = PaoShangModel.Ins.otherisRealPlayer;
        req.playerId = PaoShangModel.Ins.otherPlayerId;
        SocketMgr.Ins.SendMessageBin(req);
        this._ui.btn_bj.visible = true;
        this._ui.btn_ybj.visible = false;
    }

    private onBuyHandler(){
        let req:UpgradePassportSlot_req = new UpgradePassportSlot_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnFHClick(){
        this.sendInit();
        E.ViewMgr.Open(EViewType.PAOSHANGNEAR);
    }

    private itemRender(item:PaoShangItem){
        item.setData(item.dataSource);
    }

    private itemRender1(item:PaoShangItem1){
        item.setData(item.dataSource);
    }

    private updataMyView(){
        this._ui.txt2.text = "我的商队"
        this.onUpdateMoney();
        this._ui.box_my.visible = true;
        this._ui.box_other.visible = false;
        let list = PaoShangSlotOpenProxy.Ins.getListByType(0);
        let arr = [];
        for(let ele of list){
            if(MainModel.Ins.mRoleData.lv < parseInt(ele.f_SlotOpen)){
                let data:stItemStation = new stItemStation;
                data.state = 6;
                data.count = parseInt(ele.f_SlotOpen);
                arr.push(data);
            }
        }
        this._ui.list.array = PaoShangModel.Ins.stItemStationList.concat(arr);
        this._ui.list1.array = [];
        this.setDot();
    }

    private setDot(){
        if(PaoShangModel.Ins.isDotLD()){
            DotManager.addDot(this._ui.btn_ss);
        }else{
            DotManager.removeDot(this._ui.btn_ss);
        }
    }

    private updataOtherView(){
        this._ui.txt2.text = PaoShangModel.Ins.otherName + "的商队"
        this._ui.box_my.visible = false;
        this._ui.box_other.visible = true;
        this._ui.list1.array = PaoShangModel.Ins.stItemStationOtherList;
        this._ui.list.array = [];
        if(PaoShangModel.Ins.otherIsBJ){
            this._ui.btn_bj.visible = false;
            this._ui.btn_ybj.visible = true;
        }else{
            this._ui.btn_bj.visible = true;
            this._ui.btn_ybj.visible = false;
        }
    }

    public setList(){
        this._ui.list.array = [];
    }
}