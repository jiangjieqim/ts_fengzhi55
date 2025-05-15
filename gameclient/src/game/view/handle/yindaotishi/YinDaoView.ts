import {ViewBase} from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { E } from "../../../G";
import { t_Txt_Config } from "../../../static/StaticDataMgr";
import { TaskModel } from "../main/model/TaskModel";
import { YinDaoTaskProxy } from "./YinDaoProxy";

export class YinDaoView extends ViewBase{
    private _ui:ui.views.yindao.YinDaoViewUI;
    protected mMask = true;
    protected mMaskClick = false;
    protected mMainSnapshot = true;
    protected checkGuide = false;
    
    protected onAddLoadRes() {}

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.yindao.YinDaoViewUI;
            this._ui.on(Laya.Event.CLICK,this,this.onClick);
        }
    }

    private onClick(){
        E.yinDaoMgr.index++;
        let taskArr = YinDaoTaskProxy.Ins.taskList[TaskModel.Ins.taskData.taskId];
        if(taskArr && taskArr.length > 0 && taskArr[E.yinDaoMgr.index]){
            if(taskArr[E.yinDaoMgr.index].f_isview){
                this._ui.lab_name.text =  this.f_replace(taskArr[E.yinDaoMgr.index].f_info);
                let sname = taskArr[E.yinDaoMgr.index].f_audio;
                if (sname) {
                    E.AudioMgr.StopSound();
                    E.AudioMgr.PlaySound1(sname);
                }
            }else{
                this.Close();
            }
        }else{
            this.Close();
        }
    }

    private f_replace(str){
        return t_Txt_Config.Ins.replace(str);
    }

    protected onInit(): void {
        this.updataView();
    }

    protected onExit(): void {
        
    }

    private updataView(){
        let taskArr = YinDaoTaskProxy.Ins.taskList[TaskModel.Ins.taskData.taskId];
        if(taskArr && taskArr.length > 0 && taskArr[E.yinDaoMgr.index]){
            this._ui.lab_name.text = this.f_replace(taskArr[E.yinDaoMgr.index].f_info);
            let sname = taskArr[E.yinDaoMgr.index].f_audio;
            if(sname){
                E.AudioMgr.StopSound();
                E.AudioMgr.PlaySound1(sname);
            }
        }
    }
}