import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { t_Gym_NPC_InnerRoom } from "./GymProxy";
export interface ISlotLevel {
    start: number;
    end: number;
    cfg: Configs.t_Gym_NPC_InnerRoom_dat;
}
/**
 * 神识升级的算法控制器
 */
export class GymLevelCtl {
    public time:number;
    private _isFullLevel:boolean = false;
    /**
     * 是否满级
     */
    public get isFullLevel(): boolean{
        if(this._isFullLevel && !this.bTimeEnd){
            return true;
        }
        return false;
    }
    /**当前显示的格子数量 */
    public skinSlotCount: number = 0;

    private cur: ISlotLevel;

    private _skinSlotMax: number;

    public get skinSlotMax(): number {
        if (this._skinSlotMax === undefined) {
            // let cfg: Configs.t_Gym_NPC_InnerRoom_dat = t_Gym_NPC_InnerRoom.Ins.List[0];
            // this._skinSlotMax = cfg.f_PlaidAmount;
            this.slotCount = 0;
        }
        return this._skinSlotMax;
    }

    /**是否有倒计时 */
    public get bTimeEnd(){
        if(this.time > 0){
            return this.time >= TimeUtil.serverTime;
        }else if(this.time == 0){
            return false;
        }
        return false;
    }

    public get curSlot():ISlotLevel{
        if(this.cur === undefined){
            this.slotCount = 0;
        }
        return this.cur;
    }

    private _resultList: ISlotLevel[];
    /**格子数量从0开始 ,默认0*/
    private _slotCount: number = 0;

    public set slotCount(val: number) {
        this._slotCount = val;
        this.update();
    }
    private newList() {
        if (!this._resultList) {
            let _list = t_Gym_NPC_InnerRoom.Ins.List;
            let startIndex: number = 0;
            let rl: ISlotLevel[] = [];
            for (let i = 0; i < _list.length; i++) {
                let cfg: Configs.t_Gym_NPC_InnerRoom_dat = _list[i];
                let vo: ISlotLevel = {} as ISlotLevel;
                vo.start = startIndex;
                startIndex += cfg.f_PlaidAmount;
                vo.end = startIndex;
                vo.cfg = cfg;
                rl.push(vo);
            }
            this._resultList = rl;
        }
    }

    private get resultList() {
        if(!this._resultList){
            this.newList();
        }
        return this._resultList;
    }
    private update() {
        let l1 = this.resultList;
        let _slotNum = this._slotCount;
        let cur:ISlotLevel;
        let serverTime:number = TimeUtil.serverTime;
        for(let i = 0;i < l1.length;i++){
            let cell:ISlotLevel = l1[i];

            if(_slotNum >= cell.start){
                if (_slotNum < cell.end || cell.start == cell.end) {
                    if (_slotNum == cell.start && serverTime < this.time) {
                        cur = l1[i - 1];//倒计时进行中的时候寻找前置配置
                        this.skinSlotCount = cell.end - cell.start;
                        this._skinSlotMax = cell.cfg.f_PlaidAmount;
                    } else {
                        cur = cell;
                        this.skinSlotCount = _slotNum - cell.start;
                        this._skinSlotMax = cell.cfg.f_PlaidAmount;
                    }

                    break;
                }
            }
        }
        if(!cur){
            this._isFullLevel = true;
            cur = l1[l1.length-1];
            this._skinSlotMax = cur.cfg.f_PlaidAmount;
            this.skinSlotCount = this._skinSlotMax;
        }else{
            if(cur.cfg.f_RoomLevel == t_Gym_NPC_InnerRoom.Ins.maxLevel){
                this._isFullLevel = true;
                this._skinSlotMax = cur.cfg.f_PlaidAmount;
                this.skinSlotCount = this._skinSlotMax;
            }
        }
        this.cur = cur;
        // this.lv = cur.cfg.f_RoomLevel;
    }

    public get showStep(){
        return this.skinSlotCount;
    }

    public get cfgLv(){
        if(!this.cur){
            return 0;
        }
        this.update();
        return this.cur.cfg.f_RoomLevel;
    }

    public reset(){
        this.time = 0;
    }
}