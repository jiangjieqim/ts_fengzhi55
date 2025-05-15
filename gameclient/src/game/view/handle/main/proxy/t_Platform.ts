import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export enum EPlatformPopType{
    /**无强弹出 */
    None =1,
    /**每日强弹出 */
    EveryDay = 2,
    /**每次强弹出 */
    EveryTime = 3,
}
export class t_Platform extends BaseCfg {
    public GetTabelName(): string {
        return "t_Platform";
    }
    private static _ins: t_Platform;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Platform();
        }
        return this._ins;
    }
    private _isInit:boolean = false;
    private _cfg: Configs.t_Platform_dat;

    init() {
        if(this._isInit){
            return;
        }
        this._cfg = this.curCfg;
        this._isInit = true;
    }
    private _curCfg:Configs.t_Platform_dat;

    get curCfg():Configs.t_Platform_dat{
        if(this.isHasData){
            let l: Configs.t_Platform_dat[] = this.List;
            
            if(!this._curCfg){
                let clientype = initConfig.clienttype || Laya.Utils.getQueryString("clientype") || 0;
                let cell: Configs.t_Platform_dat = l.find(o => o.f_clienttype == clientype && o.f_platform == initConfig.platform);
                this._curCfg = cell;
            }
            if(!this._curCfg){
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,`未找到clienttype:${initConfig.clienttype} platform:${initConfig.platform},请检查initConfig.js相关`);
            }
            return this._curCfg;
        }
    }

    /**功能是在本环境下是否关闭 */
    isClose(funcid: number) {
        this.init();
        if(this._cfg){
            let arr = this._cfg.f_close_arr.split("|");
            return arr.indexOf(funcid.toString()) != -1;
        }
        return false;
    }

    /**广告功能是否关闭 */
    get isADclose(){
        let cell = this.curCfg;
        return cell && cell.f_ad_close == 1;
    }

    /**是否一键升级*/
    get isOneLvUp(){
        // return initConfig.clienttype == EClientType.Discount;
        return this.curCfg.f_one_lv == 1;
    }

    /**是否隐藏免除广告的图标 */
    get isHideAdImg() {
        return this.isADclose || !this.curCfg.f_skipAD;
    }

    /**盛宴累充UI */
    get isFeastUI(){
        let cell = this.curCfg;
        return cell && cell.f_feastUI == 1;
    }

    /**IOS是否可以充值 */
    get IOS_recharge() {
        let curCfg = this.curCfg;
        return curCfg && curCfg.f_IOSRecharge == 1;
    }
    /**弹窗逻辑 */
    get f_popType():EPlatformPopType{
        return this.curCfg.f_popType;
    }

    /**是否隐藏掉0.1折画线 */
    get dispriceHide(){
        let cell = this.curCfg;
        return cell && cell.f_Disprice == 0;
    }
}