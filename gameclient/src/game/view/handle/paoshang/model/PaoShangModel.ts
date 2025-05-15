import { stItemStation, stMission, stStationHandleLog, stStationNearBy } from "../../../../network/protocols/BaseProto";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { ECellType } from "../../main/vos/ECellType";
import { PaoShangCfgProxy, PaoShangMissionListProxy } from "../proxy/PaoShangProxy";

/* @Author: tsy
 * @Date: 2023-02-27 14:10:31
 * @Last Modified by: tsy
 * @Last Modified time: 2023-03-30 15:48:01
*/
export class PaoShangModel extends Laya.EventDispatcher{
    private static _ins: PaoShangModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new PaoShangModel();
        }
        return this._ins;
    } 

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_OTHER_VIEW:string = "UPDATA_OTHER_VIEW";
    public static UPDATA_TXZ:string = "UPDATA_TXZ";
    public static UPDATA_TASK:string = "UPDATA_TASK";
    public static UPDATA_RIZHI: string = "UPDATA_RIZHI";
    public static UPDATA_NEARVIEW: string = "UPDATA_NEARVIEW";
    public static UPDATA_FRIENDVIEW: string = "UPDATA_FRIENDVIEW";
    public static UPDATA_RES: string = "UPDATA_RES";

    public passports:number;//通行证上限
    public buyIds:number[];//购买了哪些通行证,对应t_Station_SlotOpen.xlsx的f_id
    public stItemStationList:stItemStation[];//商队列表
    public stItemStationOtherList:stItemStation[];//他人商队列表
    public otherName:string;//他人玩家名
    public otherIsBJ:number;//他人玩家是否标记
    public otherPlayerId:number;
    public otherisRealPlayer:number;
    public endUnix:number;//通行证最近一次回复的时间戳

    public missionList:stMission[];//委派任务id,对应t_Station_Mission_List.xlsx中f_MissionID
    public totalStationNum:number;//商队马车总数
    public freeStationNum:number;//商队空闲马车数量
    public freshTimes:number;//刷新任务次数
    public nextRefreshTime:number;//距离下次自动刷新的还有多少秒

    public riZhiList:stStationHandleLog[];//日志列表

    // public pillages:number;//今日掠夺数量
    public pillagesNew:number;//当前剩余可掠夺的数量
    public nextRecoverUnix:number;//下次刷新的时间戳,0表示已满
    public passportsFromDestory:number;//今日破坏获得的通行证个数
    public nearDataList:stStationNearBy[];//搜索附近商队车队返回列表
    public friendDataList:stStationNearBy[];//标记商队车队返回列表

    public taskCD:number;//刷新任务CD
    public nearCD:number;//刷新附近商队CD

    public setMissionList(value:stMission[]){
        this.missionList = value;
        this.missionList.sort(this.paoshangSort);
    }

    private paoshangSort(a:stMission,b:stMission){
        let aa = PaoShangMissionListProxy.Ins.getCfgByMissionID(a.missionId);
        let bb = PaoShangMissionListProxy.Ins.getCfgByMissionID(b.missionId);
        if(aa.f_MissionQuality > bb.f_MissionQuality){
            return -1;
        }else if(aa.f_MissionQuality < bb.f_MissionQuality){
            return 1;
        }else{
            if(aa.f_MissionType > bb.f_MissionType){
                return 1;
            }else if(aa.f_MissionType < bb.f_MissionType){
                return -1;
            }else{
                return 0;
            }
        }
    }

    public getStationIcon(id:number){
        let cfg = PaoShangMissionListProxy.Ins.getCfgByMissionID(id);
        if(cfg.f_MissionType == 2){
            return `o/station/${cfg.f_typepic.split("|")[main.skinStyle - 1]}.png`;
        }else{
            return `o/station/${cfg.f_MissionType}.png`;
        }
    }

    public isDotMain(){
        if(TaskModel.Ins.isFuncOpen(EFuncDef.PaoShang)){
            if(this.isDotTXZ() || this.isDotOk() || this.isDotLD()){
                return true;
            }
        }
        return false;
    }

    public isDotTXZ(){
        let count = MainModel.Ins.mRoleData.getVal(ECellType.TongXingZheng);
        if(count >= PaoShangModel.Ins.passports && this.freeStationNum > 0){
            return true;
        }
        return false;
    }

    public isDotOk(){
        if(this.stItemStationList){
            for(let i:number=0;i<this.stItemStationList.length;i++){
                if(this.stItemStationList[i].state == 1){
                    return true;
                }
            }
        }
        return false;
    }

    public isDotLD(){
        let num = parseInt(PaoShangCfgProxy.Ins.GetDataById(1).f_LootMax);
        if(this.pillagesNew >= num){
            return true;
        }
        return false;
    }
}