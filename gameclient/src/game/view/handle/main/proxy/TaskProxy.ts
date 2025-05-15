import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { t_Txt_Config } from "../../../../static/StaticDataMgr";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainModel } from "../model/MainModel";


export class TaskBaseProxy extends BaseCfg{
    public GetTabelName() {
        return "";
    }

    // constructor(){
    //     super(ECfgVersion.Diff);
    // }
    private _taskList:number[];
    // public static _ins: TaskProxy;
    // public static get Ins() {
    //     if (!this._ins) {
    //         this._ins = new TaskProxy();
    //     }
    //     return this._ins;
    // }

    public getCfg(id){
        let _l = this.List;
        for(let i = 0;i < _l.length;i++){
            let cfg:Configs.t_Tasks_dat = _l[i];
            if(cfg.f_TaskID == id){
                return cfg;
            }
        }
    }

    public get taskList(){
        if(!this._taskList){
            this._taskList = [];
            let _l:Configs.t_Tasks_dat[] = this.List;
            this._taskList.push(_l[0].f_TaskID);
            for(let i = 0;i < _l.length;i++){
                let cfg = _l[i];
                if(cfg.f_BackValue!=0){
                    this._taskList.push(cfg.f_BackValue);
                }
            }
        }

        return this._taskList;
    }

    /*taskId任务是否已经完成*/
    public isTaskComplete(taskId:number,serverTaskId:number){
        let _taskList = this.taskList;
        let index:number = _taskList.indexOf(taskId);
        let serverIndex:number = _taskList.indexOf(serverTaskId);
        return serverIndex >= index;
    }

    public getTaskType(task:Configs.t_Tasks_dat) {
        return task.f_TaskType;
    }

    public getTaskConditions(task:Configs.t_Tasks_dat): string[] {
        return task.f_RewardsType.split("|");
    }

    public getTaskRewardItemList(taskId: number) {
        let taskData:Configs.t_Tasks_dat = this.getCfg(taskId);
        let item = taskData.f_Rewards;
        return ItemViewFactory.convertItemList(item);
    }

    /**
     * 按照前置、后置任务id，获取任务id列表
     * @returns 任务id列表
     */
    public getTaskIdList() {
        const taskArr: { f_TaskID: number, f_ContentValue: number, f_BackValue: number }[] = this.List;
        const taskList: number[] = [];
        const tmpArr = [];
        const findNext = (id: number): void => {
            if (tmpArr.indexOf(id) !== -1) {
                console.log(taskList);
                throw new Error(`Tasks表任务id#${id}配置有错误`);
            }
            tmpArr.push(id);
            const task = taskArr.find(o => o.f_TaskID === id);
            if (task && task.f_TaskID) {
                taskList.push(task.f_TaskID);
                if (task.f_BackValue) {
                    findNext(task.f_BackValue);
                }
            }
        }
        // 查找起始任务
        const startTask = taskArr.find(o => o.f_ContentValue === 0);
        const startId = startTask && startTask.f_TaskID;
        if (startId) {
            // 从起始任务开始，根据下一个任务id，依次查找任务
            findNext(startId);
        }
        return taskList;
    }   
}



export class TaskTrunkProxy extends TaskBaseProxy{
    public static _ins: TaskTrunkProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new TaskTrunkProxy();
        }
        return this._ins;
    }
    public GetTabelName() {
        return "t_Tasks";
    }
}
export class TaskV1Proxy extends TaskBaseProxy{
    public GetTabelName() {
        return "t_Tasks_v1";
    }
}

export class TaskProxy{
    private static _verList:TaskBaseProxy[];

    public static get Ins() {
        if(!this._verList){
            this._verList = [];
            this._verList.push(new TaskTrunkProxy());
            this._verList.push(new TaskV1Proxy());
        }
        let temp = this._verList[0];
        for(let i = 0;i < this._verList.length;i++){
            let proxy = this._verList[i];
            if(proxy.ver == MainModel.Ins.serverVer){
                temp = proxy;
                break;
            }
        }
        return temp;
    }

}

export class TaskTypeProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Tasks_Type"
    }
    private static _ins: TaskTypeProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new TaskTypeProxy();
        }
        return this._ins;
    }

    public getCfg(taskTypeId){
        let _l = this.List;
        for(let i = 0;i < _l.length;i++){
            let cfg:Configs.t_Tasks_Type_dat = _l[i];
            if(cfg.f_TaskID == taskTypeId){
                return cfg;
            }
        }
    }

    public getTaskContent(taskTypeId: number):string {
        let taskTypeData:Configs.t_Tasks_Type_dat = this.getCfg(taskTypeId);
        return t_Txt_Config.Ins.replace(taskTypeData.f_TaskContent);
    }
}