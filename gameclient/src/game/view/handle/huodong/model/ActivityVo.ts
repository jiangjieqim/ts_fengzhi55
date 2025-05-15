import { stActivity, stActivityCell, stActivityStatus } from "../../../../network/protocols/BaseProto";
import { MainModel } from "../../main/model/MainModel";
import { t_Pack_ControllerProxy } from "./ActivityProxy";
import { EActivityLingQu } from "./EActivityType";

/**活动数据 */
export class ActivityVo {
    private _cfg: Configs.t_Pack_Controller_dat;

    /**活动配置 */
    public get cfg(): Configs.t_Pack_Controller_dat {
        if (!this._cfg) {
            this._cfg = t_Pack_ControllerProxy.Ins.GetDataById(this.uid);
        }
        return this._cfg;
    }

    /**代表t_Pack_Eject的f_id 弹出礼包*/
    public get eject_f_id(){
        return this.cfg.f_p4;
    }
    /**icon消失的时间 */
    public get eject_hideTime(){
        return parseInt(this.cfg.f_p2);
    }

    /**活动状态数据 */
    private _statusData: stActivityStatus;

    public get statusData(): stActivityStatus{
        return this._statusData;
    }
    public set statusData(v:stActivityStatus){
        this._statusData = v;
    }
    /**活动详情数据 */
    public vo: stActivity;

    private findSt(id:number){
        let l = this.vo.datalist;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.id == id){
                return cell; 
            }
        }
    }

    public changeActivity(l: stActivityCell[]) {
        let newL: stActivityCell[] = [];
        for (let i = 0; i < l.length; i++) {
            let cell = l[i];
            // if(cell.id == )
            let v = this.findSt(cell.id);
            if (v) {
                v.param1 = cell.param1;
            } else {
                newL.push(cell);
            }
        }
        if (this.vo.datalist.length > 0) {
            this.vo.datalist = this.vo.datalist.concat(newL);
        }
    }

    /**活动的uid */
    public get uid() {
        // return this.statusData ? this.statusData.uid : 0;
        // return this.statusData.uid;
        if(this.vo){
            return this.vo.uid;
        }
        if(this._statusData){
            return this._statusData.uid;
        }
        return 0;
    }
    /**活动是否开启着 */
    public get isOpen() {
        let _status:boolean = this._statusData && this._statusData.status == 1;
        return _status;
    }
    /**活动类型 f_packid*/
    public get packId(): number {
        if(!this.cfg){
            return 0;
        }
        return this.cfg.f_packid;
    }
    /**充值id */
    public get priceID(){
        return this.cfg.f_PriceID;
    }
    
    /**活动开始时间戳 */
    public get startTime(): number{
        if(this.vo){
            return this.vo.starttime;
        }
        return 0;
    }

    /**活动结束时间戳 */
    public get endTime():number{
        if(this.vo){
            return this.vo.endtime;
        }
        return 0;
    }

    /**当前的 param1 状态*/
    public getParam1(id:number):EActivityLingQu{
        let l = this.vo.datalist;
        for(let i = 0;i < l.length;i++){
            let cell:stActivityCell = l[i];
            if(cell.id == id){
                return cell.param1;
            }
        }
        return EActivityLingQu.Nothing;
    }

    /**是否有可领取的奖励 */
    public hasKeLingQu() {
        let l = this.vo.datalist;
        for (let i = 0; i < l.length; i++) {
            let cell: stActivityCell = l[i];
            if (cell.param1 == EActivityLingQu.KeLingQu) {
                return true;
            }
        }
    }

    /**剩余次数 */
    public getSubTime(cfg:Configs.t_Pack_Supply_dat){
        let sub:number = cfg.f_BuyTimes - this.getParam1(cfg.f_id);
        if(sub < 0){
            sub = 0;
        }
        return sub;
    }

    public get dataList(){
        return this.vo && this.vo.datalist || [];
    }

    /**获取可领取的ID */
    public getCanLingQuIdList(){
        let l = this.vo.datalist;
        let arr:number[] = [];
        for(let i = 0;i < l.length;i++){
            let cell:stActivityCell = l[i];
            if(cell.param1 == EActivityLingQu.KeLingQu){
                // return cell.id;
                arr.push(cell.id);
            }
        }
        return arr;
    }

    /**新人礼包未领取的的id,没有就是0 */
    public getNewPlayerCfgId() {
        if(this.vo){
            let checkMaxId = MainModel.Ins.newPay.maxId;//t_Pack_FirstPay_Equip.Ins.max_f_id;

            let l = this.vo.datalist;
            // let arr:number[] = [];
            let maxCfgId: number = 0
            for (let i = 0; i < l.length; i++) {
                let cell: stActivityCell = l[i];
                if (cell.param1 == EActivityLingQu.YiLingQu) {
                    if (cell.id <= checkMaxId && cell.id > maxCfgId) {
                        maxCfgId = cell.id;
                    }
                }
            }
            let resultId: number = maxCfgId + 1;

            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                if (cell.id == resultId) {
                    return resultId;
                }
            }
        }
        return 0;
    }

    public toString(){
        return `[uid:${this.uid} packId:${this.packId}]`;
    }

    // private f_isPay(fid:number){
    //     let status = this.getParam1(fid);
    //     if (status == EActivityLingQu.ChongZhiYiLingQu || 
    //         status == EActivityLingQu.ChongZhiWeiLingQu ||
    //         status == EActivityLingQu.ChongZhiAllNotLing) {
    //         return true;
    //     }
    //     return false;
    // }
    /**是否已经充值 */
    public get isPay(){
        /*
        let type = this.packId;
        let _l;
        switch(type){
            case EActivityType.BoxBorn:
                _l = t_Pack_BoxGrowProxy.Ins.List;
                break;
            case EActivityType.RoleBorn:
                _l = t_Pack_ChaGrowProxy.Ins.List;
                break;
        }
        return this.f_isPay(_l[0].f_id);
        */
       return MainModel.Ins.unpackIdList.indexOf(this.packId) >= 0;
    }
}
