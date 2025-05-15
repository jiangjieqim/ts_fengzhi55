import { ViewBase } from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { E } from "../../../G";
import { t_Txt_Config } from "../../../static/StaticDataMgr";
import { t_Item_Guide } from "./t_Item_Guide";

export class LocalYinDaoView extends ViewBase{
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
    private get emptyInfo(){
        return "无描述";
    }
    private onClick(){
        E.localGuideMgr.index++;
        let taskArr = t_Item_Guide.Ins.itemList[E.localGuideMgr.itemId];
        if(taskArr && taskArr.length > 0 && taskArr[E.localGuideMgr.index]){
            if(taskArr[E.localGuideMgr.index].f_isview){
                this._ui.lab_name.text =  this.f_replace(taskArr[E.localGuideMgr.index].f_info || this.emptyInfo);
                let sname = taskArr[E.localGuideMgr.index].f_audio;
                if (sname) {
                    E.AudioMgr.StopSound();
                    E.AudioMgr.PlaySound1(sname);
                }
            }else{
                this.Close();
            }
        }else{
            E.localGuideMgr.stop();
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
        let taskArr =  t_Item_Guide.Ins.itemList[E.localGuideMgr.itemId];//YinDaoTaskProxy.Ins.taskList[TaskModel.Ins.taskData.taskId];
        if(taskArr && taskArr.length > 0 && taskArr[E.localGuideMgr.index]){
            this._ui.lab_name.text = this.f_replace(taskArr[E.localGuideMgr.index].f_info || this.emptyInfo);
            let sname = taskArr[E.localGuideMgr.index].f_audio;
            if(sname){
                E.AudioMgr.StopSound();
                E.AudioMgr.PlaySound1(sname);
            }
        }
    }
}