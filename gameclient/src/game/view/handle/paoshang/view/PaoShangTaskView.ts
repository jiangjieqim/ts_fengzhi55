import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { DelegatePage_req, DoMissions_req, FreshMission_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { PaoShangModel } from "../model/PaoShangModel";
import { PaoShangCfgProxy, PaoShangCostProxy, PaoShangMissionListProxy } from "../proxy/PaoShangProxy";
import { PaoShangTaskItemCtl } from "./item/PaoShangTaskItemCtl";

/* @Author: tsy
 * @Date: 2023-02-28 11:46:29
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-10-17 17:28:40
*/
export class PaoShangTaskView extends ViewBase{
    private _ui:ui.views.paoshang.ui_paoshangTaskUI;
    protected mMask = true;

    private timeCtl:TimeCtl;
    private timeCtl1:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas('paoshang.atlas');
    }

    private _item1:PaoShangTaskItemCtl;
    private _item2:PaoShangTaskItemCtl;
    private _item3:PaoShangTaskItemCtl;
    private _item4:PaoShangTaskItemCtl;
    private _item5:PaoShangTaskItemCtl;
    private _isFree:boolean;

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.paoshang.ui_paoshangTaskUI;
            this.bindClose(this._ui.close1);
            ValCtl.Create(this._ui.txt_money11,this._ui.img_money11,ECellType.COPPER_MONEY);
            ValCtl.Create(this._ui.txt_money22,this._ui.img_money22,ECellType.GOLD);
            ValCtl.Create(this._ui.txt_money3,this._ui.img_money3,ECellType.TongXingZheng);
            
            ButtonCtl.Create(this._ui.btn_qq,new Laya.Handler(this,this.onBtnQQClick));
            ButtonCtl.Create(this._ui.btn_cf,new Laya.Handler(this,this.onBtnCFClick));

            this.timeCtl = new TimeCtl(this._ui.txt_time);
            this.timeCtl1 = new TimeCtl(this._ui.lab_cd);
            for(let i:number=1;i<6;i++){
                this["_item"+i] = new PaoShangTaskItemCtl(this._ui["item"+i]);
            }
        }
    }

    protected onInit() {
        this._ui.txt_money11.text = MainModel.Ins.mRoleData.getVal(ECellType.COPPER_MONEY) + "";
        this._ui.txt_money22.text = MainModel.Ins.mRoleData.getVal(ECellType.GOLD) + "";
        this._ui.txt_money3.text = MainModel.Ins.mRoleData.getVal(ECellType.TongXingZheng) + "";
        let req:DelegatePage_req = new DelegatePage_req();
        SocketMgr.Ins.SendMessageBin(req);
        PaoShangModel.Ins.on(PaoShangModel.UPDATA_TASK,this,this.updataView);
     }
 
     protected onExit() {
        this.timeCtl.stop();
        PaoShangModel.Ins.off(PaoShangModel.UPDATA_TASK,this,this.updataView);
     }

     private _time:number = 0;
     private onBtnQQClick(){
         let time:number = PaoShangCfgProxy.Ins.GetDataById(1).f_RefreshCD * 1000;
         if(Laya.timer.currTimer - this._time < time){
            E.ViewMgr.ShowMidError("任务刷新冷却中");
            return;
         }
         this._time = Laya.timer.currTimer;
        if(this._isFree){
            let req:FreshMission_req = new FreshMission_req();
            SocketMgr.Ins.SendMessageBin(req);
        }else{
            let cfg = PaoShangCostProxy.Ins.getCfgByNum(PaoShangModel.Ins.freshTimes);
            if(!MainModel.Ins.isItemEnoughSt(cfg.f_RefreshCost,true)){
                return;
            }
            let req:FreshMission_req = new FreshMission_req();
            SocketMgr.Ins.SendMessageBin(req);
        }
     }

     private onBtnCFClick(){
        let num:number = 0;
        for(let i:number=0;i<PaoShangModel.Ins.missionList.length;i++){
            if(PaoShangModel.Ins.missionList[i].type == 1){
                num++
            }
        }
        if(num == PaoShangModel.Ins.missionList.length){
            E.ViewMgr.ShowMidError("没有可以出发的任务");
            return;
        }
        if(PaoShangModel.Ins.freeStationNum){
            this._flag = false;
            this._arr = [];
            this._num = 0;
            for(let i:number = 0; i< PaoShangModel.Ins.freeStationNum;i++){
               this.getUid();
            }

            if(this._arr.length == 0){
                if(this._flag){
                    E.ViewMgr.ShowMidError("您的宝箱已经堆积如山");
                }else{
                    E.ViewMgr.ShowMidError("通行证不足");
                }
                return;
            }
            let req:DoMissions_req = new DoMissions_req();
            req.missionIds = this._arr;
            SocketMgr.Ins.SendMessageBin(req);
        }else{
            E.ViewMgr.ShowMidError(E.getLang("paoshangtips1"));
        }
     }

     private _arr;
     private _num:number;
     private _flag:boolean;
     private getUid(){
        for(let i:number=0;i<PaoShangModel.Ins.missionList.length;i++){
            if(PaoShangModel.Ins.missionList[i] && PaoShangModel.Ins.missionList[i].type == 0){
                if(this._arr.indexOf(PaoShangModel.Ins.missionList[i].uid) != -1){
                    continue;
                }
                let cfg = PaoShangMissionListProxy.Ins.getCfgByMissionID(PaoShangModel.Ins.missionList[i].missionId);
                // let num = MainModel.Ins.mRoleData.getVal(ECellType.BOX);
                // if(num > 2000 && cfg.f_MissionType == 2){
                //     this._flag = true;
                //     continue;
                // }
                let itemId = parseInt(cfg.f_PassportCost.split("-")[0]);
                let myCount = MainModel.Ins.mRoleData.getVal(itemId);
                let count = parseInt(cfg.f_PassportCost.split("-")[1]);
                if(myCount >= this._num + count){
                    this._arr.push(PaoShangModel.Ins.missionList[i].uid);
                    this._num += count;
                    break;
                }
            }
        }

     }

     private updataView(){
         this._ui.txt.text = PaoShangModel.Ins.freeStationNum + "/" + PaoShangModel.Ins.totalStationNum;
         for(let i:number=0;i<PaoShangModel.Ins.missionList.length;i++){
            this["_item"+(i+1)].setData(PaoShangModel.Ins.missionList[i]);
         }

         let cfg = PaoShangCostProxy.Ins.getCfgByNum(PaoShangModel.Ins.freshTimes);
         let arr = cfg.f_RefreshCost.split("-");
         this._ui.img_money2.skin = IconUtils.getIconByCfgId(parseInt(arr[0]));
         this._ui.txt_money2.text = arr[1];
         if(PaoShangModel.Ins.nextRefreshTime){
            this._isFree = false;
            this.timeCtl.start(PaoShangModel.Ins.nextRefreshTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
         }else{
            this.timeCtl.stop();
            this.endTime();
         }

         if(PaoShangModel.Ins.taskCD){
            this.timeCtl1.start(PaoShangModel.Ins.taskCD,new Laya.Handler(this,this.onUpdateTime1),new Laya.Handler(this,this.endTime1));
         }else{
            this.timeCtl1.stop();
            this.endTime1();
         }
     }

     private onUpdateTime1(){
        let time_str = TimeUtil.subTime(this.timeCtl1.tickVal);
        this.timeCtl1.setText(time_str);
     }

     private endTime1(){
         this.timeCtl1.setText("刷新任务");
     }

     private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str + "后免费");
    }

    private endTime(){
        this._isFree = true;
        this.timeCtl.setText("本次免费");
    }
}