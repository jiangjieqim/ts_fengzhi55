import { stVipPrivilege } from "../../../../network/protocols/BaseProto";
import { t_VIPProxy } from "./VipProxy";

// 1-500：宠物背包容量增至500
// 2-2：战斗2倍速
// 3-10：10倍开箱
// 4-1：坐骑10倍抽取
// 5-1：灵宠10倍抽取
// 6-1：神兵10倍抽取
// 7-1：坐骑自动抽取（7-X：1.开启  0.不开启）
// 8-1：灵宠自动抽取（8-X：1.开启  0.不开启）
// 9-1：副将自动抽取（9-X：1.开启  0.不开启）
// 10-1：灵宠一键合成（10-X：1.开启  0.不开启）
// 11-1：宝石一键合成（11-X：1.开启  0.不开启）
// 12-1：神兵连续打造
export enum VipType {
    PetBag = 1,
    Fight = 2,
    BaoXiang = 3,
    Mount10 = 4,
    Pet10 = 5,
    ShenBin10 = 6,
    MountAuto = 7,
    PetAtuo = 8,
    FuJiangAuto = 9,
    PetYiJian = 10,
    BaoShiYiJian = 11,
    ShenBinLianXu = 12
}

export class VipModel extends Laya.EventDispatcher{
    private static _ins: VipModel;
    
    public static get Ins() {
        if (!this._ins) {
            this._ins = new VipModel();
        }
        return this._ins;
    }

    public static VIP_UPDATA:string = "VIP_UPDATA";//更新

    public vipFid:number;
    public vipList:stVipPrivilege[];
    public djqNum:number;

    public get vipLevel(){
        let cfg = t_VIPProxy.Ins.GetDataById(this.curVipFid);
        if(cfg){
            return cfg.f_VIPRank;
        }
        return 0;
    }
    get curVipFid(){
        let lv = this.vipFid;
        if(Laya.Utils.getQueryString("vip")){
            lv = parseInt(Laya.Utils.getQueryString("vip"));
        }
        return lv;
    }

    public getVipTQByType(type:number){
        let cfg = t_VIPProxy.Ins.GetDataById(this.curVipFid);
        if(cfg){
            let arr = cfg.f_Privilege.split("|");
            for(let i:number = 0;i <arr.length;i++){
                let id = parseInt(arr[i].split("-")[0]);
                let num = parseInt(arr[i].split("-")[1]);
                if(id == type){
                    return num;
                }
            }
        }
        return -1;
    }
    
    /**宝箱类型 */
    public getVipTQByType3(){
        let array = [];
        let cfg = t_VIPProxy.Ins.GetDataById(this.curVipFid);
        if(cfg){
            let arr = cfg.f_Privilege.split("|");
            for(let i:number = 0;i <arr.length;i++){
                let id = parseInt(arr[i].split("-")[0]);
                let num = parseInt(arr[i].split("-")[1]);
                if(id == VipType.BaoXiang){
                    array.push(num);
                }
            }
        }
        return array;
    }

    public isVipRed(id:number = 0){
        if(!this.vipList){
            return false;
        }
        let arr = t_VIPProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(id == 0 || id == arr[i].f_id){
                let vo = this.vipList.find(ele => ele.fid === arr[i].f_id);
                if(vo && vo.state == 2){
                    return true;
                }
            }
        }
        return false;
    }
}