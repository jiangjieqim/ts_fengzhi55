import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { StringUtil } from "../../../../frame/util/StringUtil";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { OpenServerAccPaid_revc } from "../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../static/json/data/BaseCfg";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityVo } from "../huodong/model/ActivityVo";
import { EActivityLingQu, EActivityType } from "../huodong/model/EActivityType";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainModel } from "../main/model/MainModel";
import { RedEnum } from "../main/model/RedEnum";
import { JiShaoChengDuoView } from "./views/JiShaoChengDuoView";
export class OpenServerTabVo{
    public get label():string{
        let arr = E.getLang("jscdarr").split("|");
        return arr[this.type - EActivityType.OpenServerJiShaoChengDuo];
    }
    type: EActivityType;

    public get hasRed(){
        let vo = ActivityModel.Ins.getVo(this.type);
        if(vo){
            return vo.hasKeLingQu();
        }
        return false;
    }
}
export class t_OpenServerActivity_Charging extends BaseCfg {
    public GetTabelName() {
        return "t_OpenServerActivity_Charging";
    }
    private static _ins: t_OpenServerActivity_Charging;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_OpenServerActivity_Charging();
        }
        return this._ins;
    }
}
export class t_OpenServerActivity_Recharge extends BaseCfg{
    public GetTabelName() {
        return "t_OpenServerActivity_Recharge";
    }
    private static _ins: t_OpenServerActivity_Recharge;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_OpenServerActivity_Recharge();
        }
        return this._ins;
    }
}
export class OpenDailyPayTabVo{
    public lv:number;
    public cfgList:Configs.t_OpenServerActivity_DailyPayment_dat[];
    public label:string;
    public parse(){
        let val =  t_OpenServerActivity_DailyPayment.Ins.getLevelValByLv(this.lv);
        this.label = StringUtil.moneyCv(val) + StringUtil.getCnMoney(0);
    }

    public get everyDayCount(){
        let vo = ActivityModel.Ins.getVo(EActivityType.OpenServerLianChong);
        let count:number = 0;
        if(vo){
            let l  = this.cfgList;
            for(let i = 0;i < l.length;i++){
                let cfg:Configs.t_OpenServerActivity_DailyPayment_dat = l[i];
                let _status = vo.getParam1(cfg.f_id);
                if(_status == EActivityLingQu.YiLingQu || _status == EActivityLingQu.KeLingQu){
                    count++;
                }
            }
        }
        return count;
    }

    public get canLingQuIndex(){
        let vo = ActivityModel.Ins.getVo(EActivityType.OpenServerLianChong);
        let l = this.cfgList;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_OpenServerActivity_DailyPayment_dat = l[i];
            if(vo.getParam1(cfg.f_id) == EActivityLingQu.KeLingQu){
                return i;
            }
        }
        return 0;
    }

    public get hasred(){
        let vo = ActivityModel.Ins.getVo(EActivityType.OpenServerLianChong);
        let l = this.cfgList;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_OpenServerActivity_DailyPayment_dat = l[i];
            if(vo.getParam1(cfg.f_id) == EActivityLingQu.KeLingQu){
                return true;
            }
        }
        return false;
    }
}
export class t_OpenServerActivity_DailyPayment extends BaseCfg{
    public GetTabelName(){
        return "t_OpenServerActivity_DailyPayment";
    }
    private static _ins: t_OpenServerActivity_DailyPayment;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_OpenServerActivity_DailyPayment();
        }
        return this._ins;
    }

    private _tabList:OpenDailyPayTabVo[];
    public get tabList(){
        if(!this._tabList){
            this._tabList = [];
            let l = this.List;
            for(let i = 0;i < l.length;i++){
                let cfg:Configs.t_OpenServerActivity_DailyPayment_dat = l[i];
                let tab = this._tabList.find(item=>cfg.f_Level == item.lv);
                if(tab){
                    tab.cfgList.push(cfg);
                }else{
                    tab = new OpenDailyPayTabVo();
                    tab.lv = cfg.f_Level;
                    tab.cfgList = [];
                    tab.cfgList.push(cfg);
                    tab.parse();
                    this._tabList.push(tab);
                }
            }
        }
        return this._tabList;
    }

    public getLevelValByLv(lv:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_OpenServerActivity_DailyPayment_dat = l[i];
            if(cfg.f_Level == lv){
                return cfg.f_LevelVal;
            }
        }
    }

}
export class JiShaoChengDuoModel extends BaseModel {
    // public tempActiviyVo:ActivityVo;

    public static EventOpenServerAccPaid:string = "EventOpenServerAccPaid";
    public accDailyPaid:number;
    public accPaid:number = 0;//人名币分
    // public openRed:boolean = false;
    private static _ins:JiShaoChengDuoModel;
    public static get Ins(){
        if(!this._ins){
            this._ins = new JiShaoChengDuoModel();
        }
        return this._ins;
    }

    public initMsg(): void{
        this.Reg(new JiShaoChengDuoView(EViewType.JiShaoChengDuo));
        E.MsgMgr.AddMsg(MSGID.OpenServerAccPaid,this.onOpenServerAccPaid,this);
    }

    private onOpenServerAccPaid(revc:OpenServerAccPaid_revc){
        this.accPaid = revc.accPaid;
        this.accDailyPaid = revc.accDailyPaid;
        //console.log("cur:"+this.curCNY);
        this.event(JiShaoChengDuoModel.EventOpenServerAccPaid);
    }

    public onInitCallBack():void{
        this.accPaid = 0;
        this.accDailyPaid = 0;
        // this.openRed = true;
    }
    public get tablist(){
        let l = [];
        let types:EActivityType[] = [EActivityType.OpenServerJiShaoChengDuo,EActivityType.OpenServerLeiChong,EActivityType.OpenServerLianChong];
        for(let i = 0;i < types.length;i++){
            let type = types[i];
            let vo = ActivityModel.Ins.getVo(type);
            if(vo){
                let cell = new OpenServerTabVo();
                cell.type = type;
                l.push(cell);
            }
        }
        return l;
    }

    // /**已经充值的天数 */
    // public get rechargeDay(){
    //     let vo = ActivityModel.Ins.getVo(EActivityType.OpenServerJiShaoChengDuo);
    //     let count:number = 0;
    //     if(vo){
    //         let l  = t_OpenServerActivity_Charging.Ins.List;
    //         for(let i = 0;i < l.length;i++){
    //             let cfg:Configs.t_OpenServerActivity_Charging_dat = l[i];
    //             let _status = vo.getParam1(cfg.f_id);
    //             if(_status == EActivityLingQu.YiLingQu || _status == EActivityLingQu.KeLingQu){
    //                 count++;
    //             }
    //         }
    //     }
    //     return count;
    // }
    private get hasRed() {
        if (this.isOpen) {
            let b: boolean = false;
            let types: EActivityType[] = [EActivityType.OpenServerJiShaoChengDuo, EActivityType.OpenServerLeiChong, EActivityType.OpenServerLianChong];
            for (let i = 0; i < types.length; i++) {
                let type = types[i];
                let vo = ActivityModel.Ins.getVo(type);
                if (vo) {
                    if (vo.hasKeLingQu()) {
                        b = true;
                        break;
                    }
                }
            }
            return b || MainModel.Ins.needRed(RedEnum.JI_SHAO_CHENGDUO);
        }
    }
    public updateRed(){
        MainModel.Ins.funcSetRed(EFuncDef.JiShaoChengDuo,this.hasRed);
    }
    public get isOpen(){
        // if(MainModel.Ins.isOpenAllByFuncid(EFuncDef.JiShaoChengDuo+"")){
            let types:EActivityType[] = [EActivityType.OpenServerJiShaoChengDuo,EActivityType.OpenServerLeiChong,EActivityType.OpenServerLianChong];
            for(let i = 0;i < types.length;i++){
                let type = types[i];
                let vo = ActivityModel.Ins.getVo(type);
                if(vo){
                    return true;
                }
            }
            return false;
        // }
    }
}