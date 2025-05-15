import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { stPopWinDiscount } from "../../../../network/protocols/BaseProto";
import { EClientType } from "../../sdk/ClientType";
import { PackEjectNewProxy } from "../proxy/XianShiLiBaoProxy";

export enum XianShiLiBaoType {
    Mount = 1,//点击坐骑升级按钮时弹出
    Wing = 2,//点击翅膀升级按钮时弹出
    Qifu = 3,//点击祈福按钮时弹出
    Pet = 4,//点击灵宠升级时弹出
    Yanwu = 5,//点击邀请演武按钮时弹出
    Gem = 6,//点击宝石合成按钮时弹出
    Fujing = 7,//点击副将升级时弹出
    Baoxiang = 8,//点击宝箱升级按钮时弹出
    Fuyuan = 9,//点击福源升级按钮时弹出
}

export class XianShiLiBaoModel extends Laya.EventDispatcher{
    private static _ins: XianShiLiBaoModel;

    public static UPDATA_VIEW:string = "UPDATA_VIEW";

    public static get Ins() {
        if (!this._ins) {
            this._ins = new XianShiLiBaoModel();
        }
        return this._ins;
    } 

    public dataList:stPopWinDiscount[] = [];

    public get isPopIconShow(){
        if(initConfig.clienttype == EClientType.Main){
            return false;
        }
        let arr = this.getPopShowArr();
        if(arr.length){
            return true;
        }
        return false;
    }

    public getPopShowArr(): stPopWinDiscount[]{
        let arr: stPopWinDiscount[] = [];
        for(let i:number=0;i<this.dataList.length;i++){
            if(this.dataList[i].popWinState == 1){
                arr.push(this.dataList[i]);
            }
        }
        return arr;
    }

    public getPopWinHideTime(uid:number){
        let cell = this.dataList.find(item=>item.uid == uid);
        if(cell){
            return cell.popWinRestUnix;
        }
        return 0;
    }

    public getPopWinSmallTime(){
        let arr = this.getPopShowArr();
        let num = 0;
        for(let i:number=0;i<arr.length;i++){
            if(num == 0){
                num = arr[i].popWinRestUnix;
            }else{
                num = Math.min(num,arr[i].popWinRestUnix);
            }
        }
        return num;
    }

    public getIndexByType(type:number){
        let arr = this.getPopShowArr();
        for(let i:number=0;i<arr.length;i++){
            let cfg = PackEjectNewProxy.Ins.GetDataById(arr[i].popId);
            if(cfg.f_type == type){
                return i;
            }
        }
        return 0;
    }

    public getPopShowIndex(){
        let arr = this.getPopShowArr();
        let num = 99999;
        let index:number = -1;
        for(let i:number=0;i<arr.length;i++){
            let cfg = PackEjectNewProxy.Ins.GetDataById(arr[i].popId);
            if(cfg.f_priority < num){
                num = cfg.f_priority;
                index = i;
            }
        }
        return index;
    }

    public sendCmd(type:number,useCD:boolean = true){
        if(initConfig.clienttype == EClientType.Main){
            return;
        }
        this.openType(type,useCD);
    }

    private openType(type:number,useCD:boolean){
        for(let i:number=0;i<this.dataList.length;i++){
            let cfg = PackEjectNewProxy.Ins.GetDataById(this.dataList[i].popId);
            if(cfg.f_type == type){
                if(useCD && TimeUtil.serverTime > this.dataList[i].cdEndUnix ||
                    !useCD 
                ){
                    E.ViewMgr.Open(EViewType.XianShiLiBaoView,null,type);
                }
                return;
            }
        }
    }
}