import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { EFuncDef } from "../model/EFuncDef";
import { MainModel } from "../model/MainModel";
import { TaskProxy } from "./TaskProxy";

export class FuncProxy extends BaseCfg {
    public GetTabelName() {
        return "t_Func"
    }
    private static _ins: FuncProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new FuncProxy();
        }
        return this._ins;
    }

    public getCfgByFid(fid:number):Configs.t_Func_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Func_dat = l[i];
            if(cfg.f_FunctionID == fid){
                return cfg;
            }
        }
    }

    public getCfgListByTaskId(id:number){
        let l = this.List;
        let arr = [];
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Func_dat = l[i];
            if(this.getTaskCfg(cfg) == id){
                arr.push(cfg);
            }
        }
        return arr;
    }

    public getTaskCfg(cfg:Configs.t_Func_dat){
        let v = cfg[`f_task${MainModel.Ins.tabelSuffix}`];
        return v;
    }

    /**
     * 根据任务id判断开启了那些功能
     * @param taskId 
     * @returns 可开启的功能id数组
     */
    public getFuncList(taskId: number): number[] {
        const taskIdList = TaskProxy.Ins.getTaskIdList();
        const funcInfos = this.List;
        const playerTaskIndex = taskIdList.findIndex(id => id === taskId);
        const funcTaskIndexs = funcInfos.map(o => {
            if (o.f_task != 0) {
                const index = taskIdList.findIndex(tid => tid === o.f_task);
                if (index === -1) {
                    throw new Error(`Func表配置错误，缺少功能#${o.funcId}对应的taskId#${o.taskId}`);
                }
                return index;
            }
        });
        if (playerTaskIndex === -1) {
            throw new Error(`Tasks表配置错误，缺少任务#${taskId}`);
        }
        return funcInfos.filter((o, index) => (funcTaskIndexs[index] <= playerTaskIndex) && !o.close).map(o => o.f_FunctionID);
    }

    /**
     * 根据任务id和功能id判断功能是否开放
     * @param taskId 任务id
     * @param funcId 功能id
     * @returns boolean
     */
    public checkFunc(taskId: number, funcId: number, openDay: number): boolean {
        const _l: Configs.t_Func_dat[] = this.List;
        const cfg = _l.find(o => o.f_FunctionID === funcId);
        // if (!cfg) throw new Error(`t_Func缺少f_FunctionID#${funcId}的配置`);
        // return cfg.f_task <= taskId;
        if (openDay) {
            let _openTime = TimeUtil.openTime.toNumber()/1000;
            if (_openTime) {
                _openTime = _openTime + openDay * 86400;
                const date = TimeUtil.timestamtoTime1(_openTime).substring(0, 10) + ' 00:00:00';
                const dateUnix = TimeUtil.getTimeStamp(date)/1000;
                const now = TimeUtil.serverTime;
                if (now < dateUnix) {
                    return false;
                }
            }
        }
        return TaskProxy.Ins.isTaskComplete(FuncProxy.Ins.getTaskCfg(cfg),taskId);
    }

    public getFuncNameByFuncId(funcId: number): string {
        const _l: Configs.t_Func_dat[] = this.List;
        const cfg = _l.find(o => o.f_FunctionID === funcId);
        if (!cfg) throw new Error(`t_Func缺少f_FunctionID#${funcId}的配置`);
        return cfg.f_name;
    }

    public f_info(cfg:Configs.t_Func_dat){
        let v = cfg[`f_info${this.suffix}`];
        if(debug){
            v+="\ntask:"+this.f_task(cfg);
        }
        return v;
    }

    public f_close(cfg:Configs.t_Func_dat){
        if(Laya.Utils.getQueryString("openall")){
            return;
        }
        let v = cfg[`f_close${this.suffix}`];
        return v == 1;
    }

    isClose(funcid:number){
        let cfg = this.getCfgByFuncId(funcid);
        return this.f_close(cfg);
    }

    public f_task(cfg:Configs.t_Func_dat){
        let v = cfg[`f_task${this.suffix}`];        
        return v;
    }

    public getCfgByFuncId(funcId: number): Configs.t_Func_dat {
        return this.List.find(o => o.f_FunctionID === funcId);
    }
}

export class MainIconProxy extends BaseCfg {
    public GetTabelName() {
        return "t_MainIcon"
    }
    private static _ins: MainIconProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new MainIconProxy();
        }
        return this._ins;
    }
    /**顶部最大的pos值 */
    public readonly bottomMaxPos:number = 5;
    public getCfgByPosition(pos:number):Configs.t_MainIcon_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_MainIcon_dat = l[i];
            if(cfg.f_pos == pos){
                return cfg;
            }
        }
    }

    public getCfgByFuncid(funcId:number):Configs.t_MainIcon_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_MainIcon_dat = l[i];
            if(cfg.f_funid == funcId.toString()){
                return cfg;
            }
        }
    }
    public getCfgByF_ui_id(f_ui_id:number):Configs.t_MainIcon_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_MainIcon_dat = l[i];
            if(cfg.f_ui_id == f_ui_id){
                return cfg;
            }
        }
    }
    public getFuncListByF_ui_id(f_ui_id:number):EFuncDef[]{
        let rl = [];
        if (f_ui_id != 0) {
            let l = this.List;
            for (let i = 0; i < l.length; i++) {
                let cfg: Configs.t_MainIcon_dat = l[i];
                if (cfg.f_Uiexpand == f_ui_id) {
                    // return cfg;
                    rl.push(parseInt(cfg.f_funid));
                }
            }
        }
        return rl;
    }
    /**
     * 获取功能id对应的位置信息pos
     * @param funcId 功能id
     * @returns 功能位置信息pos
     */
    public getFuncPosByFuncId(funcId: number): number {
        const cfg = this.List.find(o => Number(o.f_funid) === funcId);
        if (!cfg) {
            // throw new Error(`t_MainIcon缺少功能id#${funcId}的配置`);
            return -1;
        }
        return cfg.f_pos;
    }
}

export class BoxExtraItemProxy extends BaseCfg {
    public GetTabelName() {
        return "t_Box_ExtraItem"
    }
    private static _ins: BoxExtraItemProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new BoxExtraItemProxy();
        }
        return this._ins;
    }

    public getConfByFid(fid: number):Configs.t_Box_ExtraItem_dat {
        return this.List.find(o => o.f_id === fid);
    }
}
