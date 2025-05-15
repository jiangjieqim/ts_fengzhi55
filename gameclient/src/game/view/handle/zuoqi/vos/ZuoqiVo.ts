import { stMountRefinement, stRideVo } from "../../../../network/protocols/BaseProto";
import { MainModel } from "../../main/model/MainModel";
import { EEquipType } from "../../main/vos/ECellType";
import { EquipItemVo } from "../../main/vos/EquipItemVo";
import { ZuoQiModel } from "../ZuoqiModel";
import { IconUtils } from "./IconUtils";
import { Mount_ListProxy } from "./ZuoqiProxy";

/**坐骑Vo */
export class ZuoqiVo extends EquipItemVo{
    /*洗髓 0不可锁定,1可以锁定属性 洗髓过的就是锁定中的*/
    public washCanLock:number = 0;
    /**洗出来位替换的临时属性列表 */
    public washList:stMountRefinement[] = [];

    /**锁定中的属性id列表 */
    // public lockedList:number[] = [];
    public curVo:stRideVo;
    /**是否是空数据 */
    public get isEmpty(){
        return !this.curVo;// || !this.equipVo;
    }

    // public isLocked(attrId:number){
    //     return this.lockedList.indexOf(attrId) != -1;
    // }
    /**是否可以锁 */
    // public testLocking(offset:number){
    //     if(this.equipVo.mountAttrList.length == this.lockedList.length + offset){
    //         return false;
    //     }else{
    //         return true;
    //     }
    // }
    // public setLockAttrId(id:number){
    //     let i = this.lockedList.indexOf(id);
    //     if(i == -1){
    //         this.lockedList.push(id);
    //     }
    // }
    // public delLockAttrId(id:number){
    //     let i = this.lockedList.indexOf(id);
    //     if(i == -1){
    //         this.lockedList.push(id);
    //     }else{
    //         this.lockedList.splice(i,1);
    //     }
    // }

    /**根据属性id获取品质值 */
    public getAttrQua(attrId: number) {
        return ZuoQiModel.Ins.getAttrQua(this.equipVo,attrId);
    }

    /**
     * 道具icon
     */
    public getIcon() {
        return IconUtils.getHorseIcon(this.rideId);
    }
    
    public get quality(){
        if(this.curVo){
            let cfg = Mount_ListProxy.Ins.getCfg(this.curVo.id);
            if(cfg){
                let qua = cfg.f_Quality;
                return qua;
            }
        }
        return 0;
    }

    public getName(){
        let cfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(this.rideId);
        if(cfg){
            return cfg.f_MountName;
        }
        return "";
    }

    /**星级 */
    public get starLv(){
        if(this.curVo){
            return this.curVo.star;
        }
        return 0;
    }
    /**等级 */
    public get lv(){
        if(this.curVo){
            return this.curVo.lv;
        }
        return 0;
    }

    /**当前的坐骑id */
    public get rideId(){
        if(this.curVo){
            return this.curVo.id;
        }
        return 0;
    }

    /**主角的坐骑的形象id,会随着幻化的形象而改变 */
    public get mainid(){
        // let id:number = this.rideId;
        // let val:number = HuanZhuangModel.Ins.getEquipStyle(EEquipType.ZuoQi);
        // if(val){
        //     return val;
        // }
        let id = MainModel.Ins.getIdByStyle(EEquipType.ZuoQi);
        return id;
    }

    /**是否可以反乡 */
    public get mBackHome() {
        if (!this.isEmpty && this.curVo) {
            if (this.curVo.lv == 0 && this.curVo.star == 0) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    }

    /** 是否可以锁定 */
    public get mWashLock(){
        return this.washCanLock == 1;
    }

    public reset(){
        this.equipVo = null;
        this.washCanLock = 0;
        this.washList = [];
    }
}