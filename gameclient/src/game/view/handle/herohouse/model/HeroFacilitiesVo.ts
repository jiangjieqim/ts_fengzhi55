import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { HeroHouseModel } from "../HeroHouseModel";
import { IDrumCfg } from "../views/levelup/IDrumCfg";
import { EFacilityType } from "./EGymType";
import { t_Gym_Facility_Platform } from "./GymProxy";

/**设施数据 */
export class HeroFacilitiesVo {
    /**
     * 各设备表的f_id,默认1开始
     */
    public fid: number = 1;
    /**任务值 */
    public taskVal:number = 0;
    /**
     * 设施类型 
    */
    public get type(): EFacilityType {
        return this.id;
    }
    
    /**当前设施的等级 */
    public get lv() 
    {
        switch (this.type) {
            case EFacilityType.Fight:
                let cfg:Configs.t_Gym_Facility_Platform_dat = t_Gym_Facility_Platform.Ins.GetDataById(this.fid);
                return cfg.f_FacilityRank + 1;
            default:
                let l = HeroHouseModel.Ins.better.getCfg(this.type);
                let cell: IDrumCfg = l.find(item => item.f_id == this.fid);
                // return cell.f_FacilityLevel;
                return cell.f_id;
        }
    }

    /**当前显示的等级 */
    public get showLv(){
        // if(this.type ==  EFacilityType.Fight){
        // return this.lv;
        // }
        return this.lv;
    }
    
    // public get lvStr() {
        /*
        if(this.type == EFacilityType.Fight){
            return IconUtils.str2Lv(this.showLv);
        }else{
            let cfg = HeroHouseModel.Ins.better.getByfid(this.fid,this.type);
            return `${cfg.f_FacilityRank}阶${this.showLv}级`;
        }
        */
        // return this.showLv;
    // }

    /**是否满级 */
    public get isFullLv(){

        switch (this.type) {
            case EFacilityType.Fight:
                let cfg: Configs.t_Gym_Facility_Platform_dat = t_Gym_Facility_Platform.Ins.GetDataById(this.fid);
                let nextCfg = t_Gym_Facility_Platform.Ins.List.find(item => (item as Configs.t_Gym_Facility_Platform_dat).f_FacilityRank == cfg.f_FacilityRank + 1);
                return nextCfg === undefined;

            default:
                return HeroHouseModel.Ins.better.isFullLv(this.fid, this.type);
        }
    }

    public cfg: Configs.t_Gym_Facility_List_dat;

    public get id() {
        return this.cfg.f_id;
    }
    public setIcon(img:Laya.Image) {
        let url:string;
        let scaleVal:number = 1;
        switch (this.type) {
            case EFacilityType.Fight:
                url = `remote/hero_house/cgxz.png`//0.65
                scaleVal = 0.65;
                break;
            case EFacilityType.Drum:
                url = `remote/hero_house/gu.png`//0.4
                scaleVal = 0.4;
                break;
            case EFacilityType.Tea:
                url = `remote/hero_house/tea_sj.png`
                break;
            case EFacilityType.Light:
                url = `remote/hero_house/deng.png`//0.65
                scaleVal = 0.65;
                break;
            case EFacilityType.Dummy:
                url = `remote/hero_house/jr_sj.png`;
                break;
        }
        img.skin = url;
        img.scaleX = img.scaleY = scaleVal;
    }

    public get name(){
        return this.cfg.f_FacilityName;
    }

    /**模式:茶台 Lv.10 */
    public get sceneName(){
        // let lv = this.fid;
        // if(this.type == EFacilityType.Fight){
        //     let cfg:Configs.t_Gym_Facility_Platform_dat = t_Gym_Facility_Platform.Ins.GetDataById(this.fid);
        //     lv = cfg.f_FacilityRank + 1;
        // }
        // return `${this.name} Lv.${lv}`;
        // return `${this.name} ${this.lvStr}`;
        return `${this.name} Lv.${this.curLv}`;
    }

    public get curLv(){
        /*
        let lv = this.fid;
        if(this.type == EFacilityType.Fight){
            let cfg:Configs.t_Gym_Facility_Platform_dat = t_Gym_Facility_Platform.Ins.GetDataById(this.fid);
            lv = cfg.f_FacilityRank + 1;
        }
        // return `${this.name} Lv.${lv}`;
        return lv;
        */
       return this.lv;
    }

}