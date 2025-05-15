import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { ESystemRefreshTime } from "./enum/ESystemRefreshTime";
export enum EQianDaoRewardsType{
    Item = 0,//普通物品
    Horse = 1,//坐骑
}

export interface IPriceItem {
    price: number;
    isFirstDouble: boolean;
}

/**签到 */
export class t_Pack_AttendanceProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Attendance"
    }
    private static _ins: t_Pack_AttendanceProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_AttendanceProxy();
        }
        return this._ins;
    }
}

/**新签到 */
export class t_Pack_Attendanc_new extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Attendanc_new"
    }
    private static _ins: t_Pack_Attendanc_new;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_Attendanc_new();
        }
        return this._ins;
    }
}

/**角色成长礼包 */
export class t_Pack_ChaGrowProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_ChaGrow"
    }
    private static _ins: t_Pack_ChaGrowProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_ChaGrowProxy();
        }
        return this._ins;
    }

    // /**前置配置 */
    // public getPreCfg(id:number){
    //     let l = this.List;
    //     for(let i = 0;i < l.length;i++){
    //         let cfg:Configs.t_Pack_ChaGrow_dat= l[i];
    //         if(cfg.f_id == id){
    //             let pre = l[i-1];
    //             if(pre){
    //                 return pre;
    //             }
    //         }
    //     }
    // }
}

/**宝箱成长礼包 */
export class t_Pack_BoxGrowProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_BoxGrow"
    }
    private static _ins: t_Pack_BoxGrowProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_BoxGrowProxy();
        }
        return this._ins;
    }
}

/**坐骑、灵宠、宝石成长礼包 */
export class t_Fund_TypeProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Fund_Type"
    }
    private static _ins: t_Fund_TypeProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Fund_TypeProxy();
        }
        return this._ins;
    }

    public getCfgByType(type: number): string {
        const conf = this.List.find(o => o.f_FundType === type);
        return conf ? conf.f_PurchaseItem : '';
    }
}

/**坐骑、灵宠、宝石成长礼包 */
export class t_Fund_NewProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Fund_New"
    }
    private static _ins: t_Fund_NewProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Fund_NewProxy();
        }
        return this._ins;
    }

    public getCfgByType(type: number): Configs.t_Pack_BoxGrow_dat[] {
        let arr = this.List.filter(o => o.f_FundType === type).map(o => ({
            /*id*/
            f_id: o.f_id,
            /*宝箱等级 角色等级*/
            f_Level: o.f_Condition,
            /*未付费领取*/
            f_NumberFree: o.f_FreeReward,
            /*付费领取*/
            f_NumberNotFree: o.f_RmbReward,
            f_itemid: '',
            f_rewardstype:0,
            f_taskText: o.f_TaskText
        }));
        const buyReward = t_Fund_TypeProxy.Ins.getCfgByType(type);
        arr.push({
            f_id: 0,
            f_Level: 0,
            f_NumberFree: '',
            f_NumberNotFree: '',
            f_itemid:buyReward,
            f_rewardstype: 1,
            f_taskText: ''
        });
        return arr;
    }
}

/**活动主配置 */
export class t_Pack_ControllerProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Controller";
    }
    private static _ins: t_Pack_ControllerProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_ControllerProxy();
        }
        return this._ins;
    }

    public getCfgByPackidId(packid: number): Configs.t_Pack_Controller_dat {
        return this.List.find(o => o.f_packid === packid);
    }

    public getByUID(uid:number):Configs.t_Pack_Controller_dat{
        return this.GetDataById(uid)
    }
}

/**充值 */
export class t_Purchase_PriceProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Purchase_Price";
    }
    private static _ins: t_Purchase_PriceProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Purchase_PriceProxy();
        }
        return this._ins;
    }

    public getPriceItemById(purchaseId: number): IPriceItem {
        const _l: Configs.t_Purchase_Price_dat[] = this.List;
        const cfg = _l.find(o => Number(o.f_id) === purchaseId);
        if (!cfg) throw new Error(`${this.GetTabelName()}缺少f_id#${purchaseId}的配置`);
        return {
            price: Number(cfg.f_price),
            isFirstDouble: cfg.f_double ? true : false
        };
    }
}
/**开箱大吉 */
export class t_Pack_BoxEventProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_BoxEvent";
    }
    private static _ins: t_Pack_BoxEventProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_BoxEventProxy();
        }
        return this._ins;
    }
}

/**新服特惠 */
export class t_Pack_NewSeverProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_NewSever";
    }
    private static _ins: t_Pack_NewSeverProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_NewSeverProxy();
        }
        return this._ins;
    }
}

/**每日礼包 */
export class t_Pack_DailyProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Daily";
    }
    private static _ins: t_Pack_DailyProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_DailyProxy();
        }
        return this._ins;
    }
}
/**诸侯补给 */
export class t_Pack_SupplyProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Supply";
    }
    private static _ins: t_Pack_SupplyProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_SupplyProxy();
        }
        return this._ins;
    }
}

/**集市 */
export class t_Pack_Shop_MartProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Shop_Mart";
    }
    private static _ins: t_Pack_Shop_MartProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_Shop_MartProxy();
        }
        return this._ins;
    }
}

/**集市刷新价格 */
export class t_Pack_Shop_Mart_ConfigProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Shop_Mart_Config";
    }
    private static _ins: t_Pack_Shop_Mart_ConfigProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_Shop_Mart_ConfigProxy();
        }
        return this._ins;
    }
}

/**服务器刷新时间 */
export class System_RefreshTimeProxy extends BaseCfg{
    private static _ins: System_RefreshTimeProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new System_RefreshTimeProxy();
        }
        return this._ins;
    }
    public GetTabelName() {
        return "t_System_RefreshTime";
    }

    public getVal(id: number): string {
        if (this.isLoaded) {
            let cfg: Configs.t_System_RefreshTime_dat = this.GetDataById(id);
            if (cfg) {
                return this.f_SystemConfig(cfg);
            }
        }
        return "";
    }

    public isEnable(id:ESystemRefreshTime){
        let val = this.getNumberVal(id);
        return val == "1";
    }

    public getNumberVal(id: number) {
        if (this.isLoaded) {
            let cfg: Configs.t_System_RefreshTime_dat = this.GetDataById(id);
            if (cfg) {
                return this.f_SystemConfig(cfg);
            }
        }
        return 0;
    }

    public f_SystemConfig(cfg:Configs.t_System_RefreshTime_dat){
        let v = cfg[`f_SystemConfig${this.suffix}`];
        return v;
    }
    /**显示灵宠 */
    public get showpet(){
        return this.getNumberVal(95) == 1;
    }
}

/**首充(非合并)新人礼包 */
export class t_Pack_NewPlayerProxy extends BaseCfg {
    public GetTabelName() {
        return "t_Pack_NewPlayer";
    }
    private static _ins: t_Pack_NewPlayerProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_NewPlayerProxy();
        }
        return this._ins;
    }
}
/**首充装备(合并) */
export class t_Pack_FirstPay_Equip extends BaseCfg{
    GetTabelName() {
        return "t_Pack_FirstPay_Equip";
    }
    private static _ins: t_Pack_FirstPay_Equip;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_FirstPay_Equip();
        }
        return this._ins;
    }


    // let checkMaxId:number = 0;
    // for(let i = 0;i < cfgl.length;i++){
    //     let cfg:Configs.t_Pack_FirstPay_Equip_dat = cfgl[i];
    //     if(cfg.f_id > checkMaxId){
    //         checkMaxId = 
    //     }
    // }
    // get max_f_id(){
    //     let l = this.List;
    //     return (l[l.length - 1] as Configs.t_Pack_FirstPay_Equip_dat).f_id;
    // }
}

/**换装-套装 */
export class t_Custom_CostumesProxy extends BaseCfg{
    public GetTabelName(){
        return "t_Custom_Costumes";
    }
    private static _ins: t_Custom_CostumesProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Custom_CostumesProxy();
        }
        return this._ins;
    }
    // private minVal: number = 2;
    // private maxVal: number = 6;
    private _mapList;

    private onSortHandler(a:number,b:number){
        if(a < b){
            return -1;
        }else if(a > b){
            return 1;
        }
        return 0;
    }
    private quaList:number[] = [];
    public get mapList(){
        if(!this._mapList){
            this._mapList = {};
            let l = this.List;
            for(let i = 0;i < l.length;i++){
                let cfg:Configs.t_Custom_Costumes_dat = l[i];
                if(!this._mapList[cfg.f_CostumesQuality]){
                    this._mapList[cfg.f_CostumesQuality] = [];
                    this.quaList.push(cfg.f_CostumesQuality);
                }
                this._mapList[cfg.f_CostumesQuality].push(cfg);
                
            }
        }
        this.quaList = this.quaList.sort(this.onSortHandler);
        return this._mapList;
    }
    public get qua(){
        let m = this.mapList;
        return this.quaList;
    }
	//根据套装id获取配置
    public getByCostumesid(costid:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Custom_Costumes_dat = l[i];
            if(cfg.f_Costumesid == costid){
                return cfg;
            }
        }
    }
}
/**礼包配置 */
export class t_Pack_List extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_List";
    }
    private static _ins: t_Pack_List;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_List();
        }
        return this._ins;
    }
}

export class t_Pack_Daily_Shop extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Daily_Shop";
    }
    private static _ins: t_Pack_Daily_Shop;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_Daily_Shop();
        }
        return this._ins;
    }

    public getCfgById(id:number):Configs.t_Pack_Daily_Shop_dat{
        return this.List.find(item => item.f_id == id);
    } 
}

export class System_CommunityProxy extends BaseCfg{
    private static _ins: System_CommunityProxy;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new System_CommunityProxy();
        }
        return this._ins;
    }
    public GetTabelName() {
        return "t_System_Community";
    }
    public getCfgById(id:number):Configs.t_System_Community_dat{
        return this.List.find(item => item.f_id == id);
    } 

}

export class t_Pack_Daily_Shop_WeekCard extends BaseCfg{
    public GetTabelName() {
        return "t_Pack_Daily_Shop_WeekCard";
    }
    private static _ins: t_Pack_Daily_Shop_WeekCard;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Pack_Daily_Shop_WeekCard();
        }
        return this._ins;
    }

    public getCfgByGroupId(groupId:number):Configs.t_Pack_Daily_Shop_WeekCard_dat{
        return this.List.find(item => item.f_group == groupId);
    } 
}