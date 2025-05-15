import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { HeroHouseModel } from "../../herohouse/HeroHouseModel";
import { EGymGetStatus } from "../../herohouse/model/HeroHousePackVo";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
/**武馆委托卡 */
export class HeroPackVo{
    private get vo(){
        return MainModel.Ins.gymCardVo;
    }

    constructor(){

    }

    public get type(){
        if(!this.vo || (this.vo && this.day == 0)){
            return EGymGetStatus.NotChongZhi;
        }

        if(this.vo){
            return this.vo.type;
        }
        return EGymGetStatus.CantLingQu;
    }

    /**是否可以委托 */
    public get canProxy(){
        // return this.isTryout || this.day > 0; 
        return true;//修改成永久可以委托
    }

    public get day(){
        if(this.vo){
            return this.vo.day;
        }
        return 0;
    }
    /**减一天 */
    subDay(){
        if(this.vo){
            this.vo.day--;
            if(this.vo.day<=0){
                this.vo.tryout = 0;
                HeroHouseModel.Ins.autoCtl.reset();
                // LogSys.Log("终止委托....");
            }
            MainModel.Ins.event(MainEvent.GymCardUpdate);
        }
    }

    /**是否是试用 */
    public get isTryout(){
        if(this.vo && this.vo.tryout == 1){
            return true;
        }
    }

    /**试用时间 */
    public get tryoutSubTime(){
        if(this.vo && this.vo.day > 0){
            let day = this.vo.day - 1;
            if(day < 0) day = 0;
            let sub:number = 86400 - (TimeUtil.serverTime - TimeUtil.curZeroTime) + day * 86400;
            return sub;
        }
        return 0;
    }

    reset(){
        MainModel.Ins.gymCardVo = null;
    }
}