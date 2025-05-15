import { E } from "../../../../G";
import { Reward_req, stEquipAttr, stGymEquip } from "../../../../network/protocols/BaseProto";
import { IHeroTask } from "../HeroHouseModel";
import { IDrumCfg } from "../views/levelup/IDrumCfg";
import { EFacilityType } from "./EGymType";
import { t_Gym_Facility_lantern,t_Gym_Facility_Drum, t_Gym_Facility_Dummy,t_Gym_Facility_Tea } from "./GymProxy";

export class HeroLevelShowAttr{
    cur:stEquipAttr;
    next:stEquipAttr;
}

export class HeroBetterResult {
    public type:EFacilityType;
    public attrList:HeroLevelShowAttr[] = [];
    /**是否满级 */
    public mFullLv: boolean = false;

    public toString(){
        let arr:string[] = ["NULL","演武台","鼓","茶台","燃灯","假人"];
        return arr[this.type] + "," + JSON.stringify(this.cfg);
    }
    // public curLv:number = 0;

    /**当前升级配置 */
    public cfg: IDrumCfg;
    /**下级升级配置 */
    public nextCfg: IDrumCfg;

    public get cost(){
        return this.cfg.f_UpgradeCost;
    }

    /**需要的任务id */
    public get taskId(){
        return this.cfg.f_Task;
    }

    /**是否是突破状态 */
    public get isBreak(){
        return this.taskId != "";
    }

    private getAttr(str: string) {
        let l: stEquipAttr[] = [];
        if (str) {
            let arr = str.split("|");
            for (let i = 0; i < arr.length; i++) {
                let a = arr[i];
                let b = a.split(":");
                let attr = new stEquipAttr();
                attr.id = parseInt(b[0]);
                attr.value = parseInt(b[1]);
                l.push(attr);
            }
        }
        return l;
    }

    private getAttrStr(cfg:IDrumCfg){
        return HeroBetterModelCtl.getFiled(this.type,cfg);
    }

    public get curAttr() {
        return this.getAttr(this.getAttrStr(this.cfg));
    }

    public get nextAttr() {
        if (this.nextCfg) {
            return this.getAttr(this.getAttrStr(this.nextCfg));
        }
    }
    
}

export class HeroBetterModelCtl {

    public static getFiled(type:number,cfg:IDrumCfg){
        switch (type) {
            case EFacilityType.Drum:
                return cfg.f_DrumAttribute;
            case EFacilityType.Dummy:
                return cfg.f_DummyAttribute;
            case EFacilityType.Light:
                return cfg.f_LanternAttribute;
            case EFacilityType.Tea:
                return cfg.f_TeaAttribute;
        }
    }


    public getCfg( type: EFacilityType):IDrumCfg[]{
        let l: IDrumCfg[];

        switch (type) {
            case EFacilityType.Dummy:
                l = t_Gym_Facility_Dummy.Ins.List;
                break;
            case EFacilityType.Drum:
                l = t_Gym_Facility_Drum.Ins.List;
                break;
            case EFacilityType.Tea:
                l = t_Gym_Facility_Tea.Ins.List;
                break;
            case EFacilityType.Light:
                l = t_Gym_Facility_lantern.Ins.List;
                break;
            default:
                break;
        }
        return l;
    }

    public getByfid(fid:number,type:EFacilityType):IDrumCfg{
        let l = this.getCfg(type);
        let cfg: IDrumCfg = l.find(item => item.f_id == fid);
        return cfg;
    }

    /**已经满级 */
    public isFullLv(fid: number, type: EFacilityType){
        let l = this.getCfg(type);
        // let cell: IDrumCfg = l.find(item => item.f_id == fid);
        let nextCfg: IDrumCfg = l.find(item => item.f_id == fid + 1);
        return nextCfg == undefined;
    }
    /**获取当前配置的属性 */
    public getAttrStr(fid: number, type: EFacilityType) {
        let l = this.getCfg(type);
        if (l) {
            let cell: IDrumCfg = l.find(item => item.f_id == fid);
            return HeroBetterModelCtl.getFiled(type, cell);
        }
        return
    }

    public getDrumByLv(fid: number, type: EFacilityType) {
        let _result: HeroBetterResult = new HeroBetterResult();
        _result.type = type;
        let l = this.getCfg(type);
        let cell: IDrumCfg = l.find(item => item.f_id == fid)
        if (cell) {
            _result.cfg = cell;
            let nextCfg: IDrumCfg = l.find(item => item.f_id == fid + 1);
            _result.nextCfg = nextCfg;
            // _result.curLv = cell.f_FacilityLevel;
        }

        if(!_result.nextCfg){
            _result.mFullLv = true;
        }

        let datalist:HeroLevelShowAttr[] = [];
        let curList = _result.curAttr;
        let nextList = _result.nextAttr;
        for(let i = 0;i < curList.length;i++){
            let cell:HeroLevelShowAttr = new HeroLevelShowAttr();
            cell.cur = curList[i];
            if(nextList){
                cell.next = nextList[i];
            }
            datalist.push(cell);
        }
        _result.attrList = datalist;
        return _result;
    }
}