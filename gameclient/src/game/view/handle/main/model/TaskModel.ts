import { LogSys } from "../../../../../frame/log/LogSys";
import { BaseModel } from "../../../../../frame/util/ctl/BaseModel";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { HrefUtils, PlatformConfig } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { Reward_req, Task_revc, wxPlayerInfo_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { t_Txt_Config } from "../../../../static/StaticDataMgr";
import { FightMonsterModel } from "../../fight_monster/vos/FightMonsterModel";
import { PeakJjcModel } from "../../peakjjc/model/PeakJjcModel";
import { ShopModel } from "../../shop/ShopModel";
import { WuShenDianModule } from "../../wushendian/WuShenDianModule";
import { YinDaoTaskProxy } from "../../yindaotishi/YinDaoProxy";
import { AdventureLevelProxy } from "../proxy/AdventureLevelProxy";
import { FuncProxy, MainIconProxy } from "../proxy/FuncProxy";
import { TaskProxy, TaskTypeProxy } from "../proxy/TaskProxy";
import { t_Platform } from "../proxy/t_Platform";
import { BaseMainIcon } from "../views/icon/BaseMainIcon";
import { TaskCell } from "../views/new2/TaskCell";
import { EFuncDef } from "./EFuncDef";
import { EquipmentQualityProxy } from "./EquipmentProxy";
import { MainEvent } from "./MainEvent";
import { MainModel } from "./MainModel";

interface IWeiXinHeadInfo{
    avatarUrl: string;
    nickName: string 
}

export class TaskModel extends BaseModel {
    taskCell:TaskCell;
    public static TaskChanged: string = 'TaskChanged';
    private static _ins: TaskModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new TaskModel();
        }
        return this._ins;
    }
    public onInitCallBack():void{

    }
    public initMsg(): void{

    }
    // 任务数据
    public taskData: { taskId: number, taskStatus: number, datalist: number[] };

    // 任务的按钮
    public juanzhouCtl;

    // 主界面ui
    private _ui: ui.views.main.ui_mainUI;

    // 主界面功能按钮
    private _allBtns: BaseMainIcon[];
    /**是否已经弹出过 */
    private isPoped:boolean = false;
    public gongGaoList:number[];

    public getWeiXinHead(){
        // LogSys.Log("===============================>getWeiXinHead");
        E.sdk.getWechatNickname(
            (weiXin:IWeiXinHeadInfo)=>{
                let req = new wxPlayerInfo_req();
                req.nickName = weiXin.nickName;
                req.portrait  = weiXin.avatarUrl;
                SocketMgr.Ins.SendMessageBin(req);
                // LogSys.Log("getWechatNickname:>>>>>>>>>>>>>>"+JSON.stringify(weiXin));
                MainModel.Ins.mRoleData.mPlayer.NickName = weiXin.nickName;
                MainModel.Ins.mRoleData.mPlayer.HeadUrl = weiXin.avatarUrl;

                // console.log(`url2:${weiXin.avatarUrl}`);

                MainModel.Ins.event(MainEvent.UpdateAvatarNickName);
                if(E.ta){
                    E.ta.userSetOnce({profile_open:1});
                }
            },()=>{
                if(E.ta){
                    E.ta.userSetOnce({profile_open:0});
                }
        });
    }

    public get guideArr(){
        if(!this.taskData){
            return [];
        }
        let taskArr = YinDaoTaskProxy.Ins.taskList[this.taskData.taskId];
        let guideTaskId = HrefUtils.getVal("guideTaskId");
        if(guideTaskId){
            taskArr = YinDaoTaskProxy.Ins.taskList[guideTaskId];
        }
        return taskArr;
    }

    private checkWeiXingHead(taskId:number){
        let model = MainModel.Ins;
        if(model.mRoleData.mPlayer && model.mRoleData.mPlayer.HeadUrl == ""){
            let jjcCfg =  FuncProxy.Ins.getCfgByFid(EFuncDef.Jjc);
            if(!this.isPoped && TaskProxy.Ins.isTaskComplete(FuncProxy.Ins.getTaskCfg(jjcCfg),taskId)){
                this.isPoped = true;
                this.getWeiXinHead();
            }
        }
    }

    /**
     * 监听协议返回的任务数据，更新任务
     * @param taskData 任务协议
     */
    public onTaskRevc(taskData:Task_revc){
        if(TaskModel.Ins.taskData && TaskModel.Ins.taskData.taskId != taskData.id){
            E.yinDaoMgr.index = 0;//引导步骤重置
        }

        if(!TaskModel.Ins.gongGaoList){
            TaskModel.Ins.gongGaoList = [];
        }
        if(TaskModel.Ins.taskData && TaskModel.Ins.gongGaoList.indexOf(taskData.id) == -1){
            let arr = FuncProxy.Ins.getCfgListByTaskId(taskData.id);
            for(let i:number=0;i<arr.length;i++){
                if (TaskModel.Ins.gongGaoList.indexOf(arr[i].f_task) == -1) {
                    TaskModel.Ins.gongGaoList.push(arr[i].f_task);
                }
                let funcCfg: Configs.t_Func_dat = arr[i];
                if (!funcCfg.f_close) {
                    let data: any = {};
                    data.st1 = funcCfg.f_name;
                    data.co1 = "#6DCC4E";
                    data.st2 = "功能开启";
                    MainModel.Ins.addTs(data);

                    let jjcCfg = FuncProxy.Ins.getCfgByFid(EFuncDef.Jjc);
                    if (FuncProxy.Ins.getTaskCfg(jjcCfg) == taskData.id) {
                        LogSys.Log("Jjc 开启!!!!");
                        this.getWeiXinHead();
                    }
                }

                MainModel.Ins.event(MainEvent.Function_Open);
            }
        }

        this.checkWeiXingHead(taskData.id);

        TaskModel.Ins.taskData = {
            taskId: taskData.id,
            taskStatus: taskData.status,
            datalist: taskData.datalist
        }
        // console.log("TaskModel.Ins.taskData>>>>>>",TaskModel.Ins.taskData.taskId);
        if (this.taskCell) this.taskCell.skin.contTf.color = taskData.status === 2 ? '#239330' : '#cd1b29';
        TaskModel.Ins.doUpdate();
        TaskModel.Ins.updateFunc();
        this.event(TaskModel.TaskChanged);
        ShopModel.Ins.updateRed();
        E.yinDaoMgr.showYD(9);
    }

    /**
     * 更新功能按钮状态
     */
    private updateFunc() {
        const _allBtns = TaskModel.Ins._allBtns;
        const taskData = TaskModel.Ins.taskData;
        if (!_allBtns || !taskData) return;
        const funcIds: number[] = FuncProxy.Ins.getFuncList(taskData.taskId);
        const posArr: number[] = funcIds.map(funcId => MainIconProxy.Ins.getFuncPosByFuncId(funcId));
        TaskModel.Ins._allBtns.forEach(element => {
            if (posArr.indexOf(element.pos) === -1) {
            element.ctl.gray = true;
                // element.ctl.enable = false;
            } else {
                element.ctl.gray = false;
                // element.ctl.enable = true;
            }
        });
    }

    /**
     * 更新任务
     * @param _ui ui_mainUI
     */
    public InitUpdateTask(_ui: ui.views.main.ui_mainUI, _allBtns: BaseMainIcon[]): void{
        if (!TaskModel.Ins._ui) {
            TaskModel.Ins._ui = _ui;
        }
        if (!TaskModel.Ins._allBtns) {
            TaskModel.Ins._allBtns = _allBtns;
        }
        if (!TaskModel.Ins.juanzhouCtl) {
            // 初始化任务的点击事件
            // this.juanzhouCtl = ButtonCtl.Create(_ui.taskImg, new Laya.Handler(this,this.onJuanzhou,[Laya.Event]), false);
            if(this.taskCell){
                this.juanzhouCtl = this.taskCell.skin.taskImg.on(Laya.Event.CLICK,this,this.onJuanzhou);
            }
        }
        // 更新任务内容
        this.doUpdate();
        this.updateFunc();
    }

    /**
     * 更新任务内容的逻辑
     */
    private doUpdate() {
        if(!this.taskCell){
            return;
        }
        let _taskCellSkin = this.taskCell.skin;
        if (_taskCellSkin && TaskModel.Ins.taskData) {
            let taskData = TaskModel.Ins.taskData;
            // 获取任务内容
            let taskStatus = taskData.taskStatus;
            if (taskStatus === 3) {
                // 任务已全部完成
                // _ui.juanzhou.visible = false;
                MainModel.Ins.reelCtl.visible = false;
                return;
            }
            let task = TaskProxy.Ins.getCfg(taskData.taskId);
            let taskType = TaskProxy.Ins.getTaskType(task);
            let taskCondition = TaskProxy.Ins.getTaskConditions(task);
            let taskContent = TaskTypeProxy.Ins.getTaskContent(taskType);
            let params = taskContent.match(/\{(\d+)\}/g);
            for (let i = 0; i < params.length; i++) {
                let remark = params[i];
                const num = Number(remark.replace('{', '').replace('}', ''));
                let text = '';
                switch (num) {
                    case 0:
                        text = String(taskData.datalist[0]) || '';
                        break;
                    case 1:
                        if (taskType === 8) {
                            // 通过冒险{0}（显示x-x）
                            text = AdventureLevelProxy.Ins.getAdventureTaskName(Number(taskCondition[0]));
                        } else {
                            text = taskCondition[0];
                        }
                        break;
                    case 2:
                        if(taskType === 5){
                            // 穿{1}件{2}品质的装备
                            let qua = EquipmentQualityProxy.Ins.getByQua(parseInt(taskCondition[1])).f_EquipmentLevel;
                            text = qua;
                        }else{
                            text = taskCondition[1];
                        }
                        break;
                    
                    default:
                        text = '';
                }
                taskContent = taskContent.replace(remark, text);
            }
            let rewardItem = TaskProxy.Ins.getTaskRewardItemList(taskData.taskId)[0];
            // 更新任务内容
            _taskCellSkin.taskItemIcon.skin = rewardItem.getIcon();
            if( _taskCellSkin.qua){
                if(initConfig.platform == PlatformConfig.War3){
                    (_taskCellSkin.qua.skin = rewardItem.quaIcon());
                }else{
                    _taskCellSkin.qua.skin = "";
                }
            }

            _taskCellSkin.rewardNum.text = rewardItem.count.toString();
            _taskCellSkin.renwuTask.text = taskContent+(debug ? "\n:"+taskData.taskId :"");
            if (taskType === 8) {
                // 通过冒险{0}（显示是否完成）
                _taskCellSkin.contTf.text = (taskData.datalist[0] >= Number(taskCondition[0]) ? '1' : '0') + '/1';
            } else {
                _taskCellSkin.contTf.text = taskData.datalist[0] + '/' + taskCondition[0];
            }
            _taskCellSkin.contTf.color = taskData.taskStatus === 2 ? '#239330' : '#cd1b29';
            // 隐藏/显示宝箱特效
            MainModel.Ins.treasureEffect = taskStatus === 2 ? true : false;
        }
    }


    private onReqTask(){
        // 请求任务奖励
        let rewardReq = new Reward_req();
        rewardReq.type = 4;
        SocketMgr.Ins.SendMessageBin(rewardReq);
    }

    /**
     * 任务的点击事件
     */
    private onJuanzhou(e:Laya.Event) {
        //    //test
        // E.ViewMgr.Open(EViewType.SanGuo);
        // //E.ViewMgr.Open(EViewType.HuoDongLiBao)
        // E.ViewMgr.Open(EViewType.LingDiEject);
        // E.sdk.getSubscribe(['TPveRNTEDrVjhLd3J5LrrQim8F3dKP2HcrScFLZznMc']);
        
        if (TaskModel.Ins.taskData.taskStatus === 2) {

            // 任务已完成
            // 动画
            MainModel.Ins.reelPlay();       //new Laya.Handler(this, (status: number) => {})
            // Laya.timer.once(500,this,this.onReqTask);
            this.onReqTask();

        }else if(TaskModel.Ins.taskData.taskStatus === 1){//进行中
            let task = TaskProxy.Ins.getCfg(TaskModel.Ins.taskData.taskId);
            let cfg = TaskTypeProxy.Ins.getCfg(task.f_TaskType);
            E.yinDaoMgr.addZDTS(cfg);
            e.stopPropagation();
        }
    }

    public get peakOpenDesc(){
        let time = MainModel.Ins.peakOpenTime;
        if(!time){
            return E.getLang("peakerr2");
        }
        let arr = TimeUtil.timestamtoTime(time * 1000,"-","-","-","").split("-");
        let s = `${arr[1]}月${arr[2]}日`;
        return E.getLang("peakerr",s);
    }

    /**
     * 功能是否开放
     * @param funcid 功能id
     * @param msg 功能未开放时，是否飘字
     * @returns boolean 功能已开放：true  功能未开放：false
     */
    public isFuncOpen(funcid:number, msg:boolean = false){
        if (MainModel.Ins.verify) {
            if (funcid == EFuncDef.Confraternity) {
                return false;
            }
        }

        let funcCfg = FuncProxy.Ins.getCfgByFid(funcid);
        
        if(!funcCfg){
            // if(E.Debug){
            // E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"funcid " + funcid + " 不存在");
            // }
            LogSys.Warn(`funcid ${funcid} 不存在`);
            return;
        }

        // if (Laya.Utils.getQueryString("disable_f_close")) {

        // } else {
        if (t_Platform.Ins.isClose(funcCfg.f_FunctionID) ||
            FuncProxy.Ins.f_close(funcCfg) || MainModel.Ins.isVerify(funcCfg)) {
            if (msg) {
                E.ViewMgr.ShowMidError(E.getLang("please_wait"));
            }
            return false;
        }
        // }

        // if(funcid == EFuncDef.Wing){
        //     if(msg && !WingModel.Ins.isOpen() && !StringUtil.IsNullOrEmpty(funcCfg.f_info)){
        //         E.ViewMgr.ShowMidError(funcCfg.f_info);
        //         return false;
        //     }
        // }

        const taskData = TaskModel.Ins.taskData;
        let isTips:boolean = false;
        if (taskData) {
            let res = FuncProxy.Ins.checkFunc(taskData.taskId, funcid, funcCfg.f_AfterSeverOpenDays);
            if(!res){
                if(funcCfg.f_unlock1 == 1 &&  MainModel.Ins.isMonthCanUsed){
                    res = true;
                }
            }
            if(!res){
                if(funcCfg.f_unlock2 == 1 && MainModel.Ins.isYearCanUsed){
                    res = true;
                }
            }
            if (!res && msg) {
                const funcName = FuncProxy.Ins.getFuncNameByFuncId(funcid);
                let _info = FuncProxy.Ins.f_info(funcCfg);

                if (!StringUtil.IsNullOrEmpty(_info)) {
                    E.ViewMgr.ShowMidError(_info);
                } else {
                    E.ViewMgr.ShowMidError(`完成前置任务后可开启${funcName}`);
                }
                isTips = true;
            }
            if(funcid == EFuncDef.DF_jjc){
                if(!PeakJjcModel.Ins.isTimeOpen){
                    if(msg){
                        if(!isTips){
                            let date = this.peakOpenDesc;
                            E.ViewMgr.ShowMidError(date);// E.getLang("FuncNotOpen")
                            isTips = true;
                        }else{
                            // if(E.Debug){
                            // LogSys.LogColor("===========>dot tips now!"+funcid + ":msg");
                            // }
                        }
                    }
                    return false;
                }
            }
            let isOpen:boolean = true;
            if (funcid == EFuncDef.Expedition && !MainModel.Ins.isConquestOpen) {
                isOpen = false;
            }
            else if(funcid == EFuncDef.FightHard && !FightMonsterModel.Ins.data){
                isOpen = false;
            }
            else if(funcid == EFuncDef.WuShenDian && !WuShenDianModule.ins.isOpen){
                isOpen = false;
            }
            if(!isOpen){
                if(msg){
                    if(!isTips){
                        E.ViewMgr.ShowMidError(E.getLang("FuncNotOpen"));
                    }
                }
                return false;
            }
            return res;
        }
        return false;
    }
}