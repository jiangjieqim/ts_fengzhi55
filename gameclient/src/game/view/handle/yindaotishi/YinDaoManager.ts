import { LogSys } from "../../../../frame/log/LogSys";
import { HrefUtils } from "../../../../InitConfig";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import {LayerMgr} from "../../../layer/LayerMgr";
import { SimpleEffect } from "../avatar/SimpleEffect";
import { EOpenChest } from "../main/model/ChestAutoPolicy";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { TaskProxy, TaskTypeProxy } from "../main/proxy/TaskProxy";
import { YinDaoTaskProxy } from "./YinDaoProxy";
import { YinDaoView1 } from "./YinDaoView1";

export class YinDaoManager {

    private _hasInit: boolean = false;          //是否已初始化
    private _fm:SimpleEffect;
    private _fmW:number = 239;
    private _fmH:number = 239;
    private _timeCD:number;
    
    public _type:number;
    public index:number = 0;
    constructor() { }

    public Init(): boolean {
        if (this._hasInit) return false;
        this._hasInit = true;

        Laya.stage.on(Laya.Event.CLICK,this,this.onStageClick);
        MainModel.Ins.on(MainEvent.WindowSpread,this,this.updataXY);
        return true;
    }

    public Clear() {
        this.removeSp();
    }

    private onStageClick(){
        if(!this._fm){
            this._fm = new SimpleEffect(LayerMgr.Ins.screenEffectLayer,`o/spine/hand/hand`);
        }
        this.removeTS();
        if(!this._timeCD){
            this._timeCD = 30 * 1000;
        }
        Laya.timer.once(this._timeCD,this,this.addBDTS);
        E.localGuideMgr.onStageClick();
    }

    //被动提示
    public addBDTS(){
        let bo = E.ViewMgr.HasFrameOpenExcept([EViewType.Main]);
        if(bo)return;
        if(MainModel.Ins.curChest.type == EOpenChest.Auto)return;
        if(this._fm && !this._fm.anim.isPlaying){
            if(TaskModel.Ins.taskData){
                let pos:number = 0;
                let value:string;
                let xy:string;
                switch(TaskModel.Ins.taskData.taskStatus){
                    case 3:
                        value = "9-xiangzi";//全部完成
                        xy = "0;0";
                        break;
                    case 2:
                        value = "9-juanzhou";//已经完成
                        xy = "0;0";
                        break;
                    case 1:
                        let task = TaskProxy.Ins.getCfg(TaskModel.Ins.taskData.taskId);
                        let cfg = TaskTypeProxy.Ins.getCfg(task.f_TaskType);
                        value = cfg.f_ClickTips;
                        xy = cfg.f_XY;
                        pos = cfg.f_handposition;
                        break;
                }
                this._type = 1;
                this.addTS(value,xy,pos);
            }
        }
    }

    //主动提示
    public addZDTS(value:Configs.t_Tasks_Type_dat){
        if(this._fm){
            this._fm.stop();
            this._type = 2;
            this.addTS(value.f_ClickTips,value.f_XY,value.f_handposition);
        }
    }

    private addTS(value:string,xy:string,index:number=0){
        let arrXY = xy.split(";");
        let sp = E.ViewMgr.getUIByKeySt(value);
        if(!sp){
            LogSys.Warn("YinDaoManager -->not find addTS>>>>>>>>>>>>>>>>",value);
            return;
        }
        let xx = (sp.parent as Laya.Sprite).localToGlobal(new Laya.Point(sp.x,sp.y)).x;
        let yy = (sp.parent as Laya.Sprite).localToGlobal(new Laya.Point(sp.x,sp.y)).y;
        let offX:number = 0;
        let offY:number = 0;
        if(arrXY[0]){
            offX = parseInt(arrXY[0]);
        }
        if(arrXY[1]){
            offY = parseInt(arrXY[1]);
        }
        if(this._fm && this._fm.isLoaded){
            let w = sp.width - this._fm.anim.container.width;
            let h = sp.height - this._fm.anim.container.height;
            this._fm.anim.container.x = xx + (w * 0.5) + offX;
            this._fm.anim.container.y = yy + (h * 0.5) + offY;
            this._fm.play(index,true);
        }
    }

    private removeSp(){
        if(this._fm){
            this._fm.stop();
        }
    }

    public removeTS(){
        if(this._type == 1 || this._type == 2){
            this.removeSp();
        }
    }

    public removeYD(){
        if(this._type == 3){
            this.removeSp();
            this.getYinDaoView().removeSelf();
        }
    }

    //********************************************************************引导****************************************/
    public showYD(type:number){
        if(initConfig.no_guide || YinDaoTaskProxy.Ins.typeList.indexOf(type) == -1)return;//不需要引导
        if(TaskModel.Ins.taskData){
            if(TaskModel.Ins.taskData.taskStatus == 3){//任务全部完成
                return;
            }
            // if(TaskModel.Ins.taskData.taskStatus == 2){//任务已经完成
            //     return;
            // }
            if(!E.ViewMgr.IsOpen(type)){//界面没打开
                return;
            }
            let gCfg:Configs.t_Tasks_Guide_dat;
            let taskArr = TaskModel.Ins.guideArr;
            if(taskArr && taskArr.length > 0){
                gCfg = taskArr[this.index];
            }
            if(gCfg){
                if(gCfg.f_isview){
                    E.ViewMgr.Open(EViewType.YinDaoView);
                }else{
                    let arr = gCfg.f_GuidePosition.split("-");
                    if(type == parseInt(arr[0])){
                        let sp = E.ViewMgr.getUIByKeySt(gCfg.f_GuidePosition);
                        if(sp){
                            this._type = 3;
                            this.addTS(gCfg.f_GuidePosition,gCfg.f_XY,gCfg.f_handposition);
                            if(gCfg.f_showsmallview){
                                let view = this.getYinDaoView();
                                if(!view.parent){
                                    LayerMgr.Ins.screenEffectLayer.addChild(view);
                                }
                                view.setLab(gCfg);
                                view.anchorX = view.anchorY = 0.5;
                                view.x = (LayerMgr.Ins.screenEffectLayer.width >> 1) + (750 - view.width) * 0.5;
                                // view.y = (LayerMgr.Ins.screenEffectLayer.height >> 1) + gCfg.f_sviewY;
                                view.y = (LayerMgr.Ins.screenEffectLayer.height >> 1) + gCfg.f_sviewY;
                            }
                        }
                    }
                }
            }
        }
    }

    private _ydView:YinDaoView1;
    private getYinDaoView(){
        if(!this._ydView){
            this._ydView = new YinDaoView1();
        }
        return this._ydView;
    }

    private updataXY(){
        let gCfg: Configs.t_Tasks_Guide_dat;
        let taskArr = YinDaoTaskProxy.Ins.taskList[TaskModel.Ins.taskData.taskId];
        if (taskArr && taskArr.length > 0) {
            gCfg = taskArr[this.index];
        }
        if (gCfg) {
            if (gCfg.f_isview) {
                
            } else {
                let arr = gCfg.f_GuidePosition.split("-");
                if(9 == parseInt(arr[0])){
                    let sp = E.ViewMgr.getUIByKeySt(gCfg.f_GuidePosition);
                    if (sp) {
                        this.addTS(gCfg.f_GuidePosition, gCfg.f_XY, gCfg.f_handposition);
                        let view = this.getYinDaoView();
                        if (view.parent) {
                            view.x = (LayerMgr.Ins.screenEffectLayer.width >> 1) + (750 - view.width) * 0.5;
                            view.y = (LayerMgr.Ins.screenEffectLayer.height >> 1) + gCfg.f_sviewY;
                        }
                    }
                }
            }
        }
    }
}