import { EViewType } from "../../../common/defines/EnumDefine";
import { E, ScreenAdapter } from "../../../G";
import { LayerMgr } from "../../../layer/LayerMgr";
import { SimpleEffect } from "../avatar/SimpleEffect";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { LocalGuideBase } from "./LocalGuideBase";
import { t_Item_Guide } from "./t_Item_Guide";

export class LocalGuideMgr extends LocalGuideBase{
    get itemId(){
        return this._itemId;
    }
    /**
     * 1 被动提示
     * 2 主动提示
     */
    // private _type:number;
    /**当前的引导物品Id */
    private _itemId:number;
    private _timeCD: number;
    /**当前引导的步骤 */
    public index:number = 0;
    private get guideArr(){
        let _arr:Configs.t_Item_Guide_dat[] = [];
        if(this._itemId){
            let taskArr = t_Item_Guide.Ins.itemList[this._itemId];
            _arr = taskArr;
        }
        return _arr;
    }

    /**设置道具ID关联的引导 */
    setItemId(itemId:number){
        this._itemId = itemId;
        this.showYD(EViewType.Main);
    }
    /**结束引导,引导步骤重置 */
    stop(){
        this._itemId = undefined;
        // console.log("cur itemId:",this._itemId);
    }
    /**按钮点击触发引导进度推进 */
    onButtonCtlClick(skin){
        let taskArr = this.guideArr;
        if(taskArr && taskArr.length > 0 && taskArr[this.index]){
            let sp = E.ViewMgr.getUIByKeySt(taskArr[this.index].f_GuidePosition);
            if(!sp){
                console.log("LocalGuideMgr onClickEvtNOSP>>>>>>>>>>>>>>>>",taskArr,taskArr[this.index]);
                return;
            }
            if(skin == sp){
                this.index ++ ;
                this.removeYD();
                let gCfg = taskArr[this.index];
                if(gCfg){
                    let arr = gCfg.f_GuidePosition.split("-");
                    this.showYD(parseInt(arr[0]));
                }else{
                    this.stop();
                }
            }
        }
    }
    showYD(type: number) {
        if(t_Item_Guide.Ins.typeList.indexOf(type) == -1)return;//不需要引导
        
        if(this._itemId){
            // if(TaskModel.Ins.taskData.taskStatus == 3){//任务全部完成
            // return;
            // }
            // if(TaskModel.Ins.taskData.taskStatus == 2){//任务已经完成
            //     return;
            // }
            if(!E.ViewMgr.IsOpen(type)){//界面没打开
                return;
            }
            let gCfg:Configs.t_Item_Guide_dat;
            let taskArr = this.guideArr;
            if(taskArr && taskArr.length > 0){
                gCfg = taskArr[this.index];
            }
            if(gCfg){
                if(gCfg.f_isview){
                    E.ViewMgr.Open(EViewType.LocalYinDaoView);
                }else{
                    let arr = gCfg.f_GuidePosition.split("-");
                    if(type == parseInt(arr[0])){
                        let sp = E.ViewMgr.getUIByKeySt(gCfg.f_GuidePosition);
                        if(sp){
                            // this._type = 3;
                            
                            this.addTS(gCfg.f_GuidePosition,gCfg.f_XY,gCfg.f_handposition);
                            if(gCfg.f_showsmallview){
                                // E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"show guide f_showsmallview!");
                                let view = this.getYinDaoView();
                                if(!view.parent){
                                    LayerMgr.Ins.screenEffectLayer.addChild(view);
                                }
                                view.setLab(gCfg);
                                view.anchorX = view.anchorY = 0.5;
                                view.x = (LayerMgr.Ins.screenEffectLayer.width >> 1) + (ScreenAdapter.UIRefWidth - view.width) * 0.5;
                                // view.y = (LayerMgr.Ins.screenEffectLayer.height >> 1) + gCfg.f_sviewY;
                                view.y = (LayerMgr.Ins.screenEffectLayer.height >> 1) + gCfg.f_sviewY;
                                
                            }
                        }
                    }
                }
            }
        }
    }

    Init() {
        // Laya.stage.on(Laya.Event.CLICK, this, this.onStageClick);
        MainModel.Ins.on(MainEvent.WindowSpread, this, this.updataXY);
    }
    private updataXY(){
        let gCfg: Configs.t_Item_Guide_dat;
        if(!this._itemId){
            return;
        }
        let taskArr = t_Item_Guide.Ins.itemList[this._itemId];
        if (taskArr && taskArr.length > 0) {
            gCfg = taskArr[this.index];
        }
        if (gCfg) {
            if (gCfg.f_isview) {
                
            } else {
                let arr = gCfg.f_GuidePosition.split("-");
                if (EViewType.Main == parseInt(arr[0])) {
                    let sp = E.ViewMgr.getUIByKeySt(gCfg.f_GuidePosition);
                    if (sp) {
                        this.addTS(gCfg.f_GuidePosition, gCfg.f_XY, gCfg.f_handposition);

                        let view = this.getYinDaoView();
                        if (view.parent) {
                            view.x = (LayerMgr.Ins.screenEffectLayer.width >> 1) + (ScreenAdapter.UIRefWidth - view.width) * 0.5;
                            view.y = (LayerMgr.Ins.screenEffectLayer.height >> 1) + gCfg.f_sviewY;
                        }

                        // E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk, "show guide view!");
                    }
                }
            }
        }
    }
    /**手指提示 */
    private addTS(value:string,xy:string,index:number=0){
        let arrXY = xy.split(";");
        let sp = E.ViewMgr.getUIByKeySt(value);
        if(!sp){
            LogSys.Warn("LocalGuideMgr -->not find addTS>>>>>>>>>>>>>>>>",value);
            return;
        }
        this.showFinger(arrXY,sp,index);
    }

    onStageClick() {
        if (!this._fm) {
            this._fm = new SimpleEffect(LayerMgr.Ins.screenEffectLayer, `o/spine/hand/hand`);
        }
        this.removeTS();
        if (!this._timeCD) {
            this._timeCD = 30 * 1000;
        }
        Laya.timer.once(this._timeCD, this, this.addBDTS);
    }

    public removeTS() {
        // if(this._type == 1 || this._type == 2){
            this.removeSp();
        // }
    }

    /**移除 Npc对话引导 */
    removeYD(){

    }

    //被动提示
    private addBDTS() {
        // this._type = 1;
    }
}