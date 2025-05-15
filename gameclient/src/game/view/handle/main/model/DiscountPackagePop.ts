import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { ECombopackLingQu } from "../../combopack/CombopackModel";
import { t_Purchase_ComboPack } from "../../combopack/views/t_Purchase_ComboPack";
import { ActivityModel } from "../../huodong/ActivityModel";
import { System_RefreshTimeProxy, t_Pack_DailyProxy } from "../../huodong/model/ActivityProxy";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityLingQu, EActivityType } from "../../huodong/model/EActivityType";
import { SevenDaysPackProxy } from "../../serverTask/proxy/ServerTaskProxy";
import { EPlatformPopType, t_Platform } from "../proxy/t_Platform";
import { EFuncDef } from "./EFuncDef";
import { MainModel } from "./MainModel";
import { RedEnum } from "./RedEnum";
import { RedUpdateModel } from "./RedUpdateModel";
export interface ISevenDaySel {
    tabIndex: number;
    listitemIndex: number;
}

export interface IEveryDaySel {
    tabIndex: number;
    listitemIndex: number;
}

export class DiscountPackagePop {
    /**
     * 第几个礼包开始处理逻辑
     */
    private get limtPackage(): number {
        return parseInt(System_RefreshTimeProxy.Ins.getVal(89));
    }
    /**套餐礼包是否可以买一个 */
    private get isCanByOneComboPack() {
        let funcid: number = EFuncDef.Combopack;
        if (MainModel.Ins.isOpenByFuncId(funcid + "")) {
            let canPay: boolean;
            let selIndex: number = 0;
            let l = t_Purchase_ComboPack.Ins.List;

            for (let i = 0; i < l.length; i++) {
                let cfg: Configs.t_Purchase_ComboPack_dat = l[i];
                let vo = ActivityModel.Ins.getVo(EActivityType.Combopack);
                let isgary: boolean = true;
                if (vo) {
                    let type: ECombopackLingQu = vo.getParam1(cfg.f_id) as any;
                    switch (type) {
                        case ECombopackLingQu.Locked:
                        case ECombopackLingQu.isGet:
                        case ECombopackLingQu.LockedSub:
                            break;
                        case ECombopackLingQu.WaitRecharge:
                            isgary = false;
                            selIndex = i;
                            break;
                    }
                }
                if (!isgary) {
                    canPay = true;
                    break;
                }
            }

            if (canPay) {
                // E.ViewMgr.OpenByFuncid(funcid, true, selIndex);
                return selIndex;
            }

        }
        return;
    }
    /**套餐礼包是否全部购买了 */
    private get isAllBuyComppack(){
        let funcid: number = EFuncDef.Combopack;
        if (MainModel.Ins.isOpenByFuncId(funcid + "")) {
            let l = t_Purchase_ComboPack.Ins.List;
            let allCount:number = 0;
            for (let i = 0; i < l.length; i++) {
                let cfg: Configs.t_Purchase_ComboPack_dat = l[i];
                let vo = ActivityModel.Ins.getVo(EActivityType.Combopack);
                // let isgary: boolean = true;
                if (vo) {
                    let type: ECombopackLingQu = vo.getParam1(cfg.f_id) as any;
                    switch (type) {
                        case ECombopackLingQu.isGet:
                            allCount++
                            break;
                        case ECombopackLingQu.Locked:
                        case ECombopackLingQu.LockedSub:
                        case ECombopackLingQu.WaitRecharge:
                            break;
                    }
                }
            }
            if(allCount >= l.length){
                return true;
            }
        }
        return;
    }


    /**如果套装中有可以购买的就打开套餐礼包 */
    onComboPack() {
        /*
        let funcid: number = EFuncDef.Combopack;
        if (MainModel.Ins.isOpenByFuncId(funcid + "")) {
            let canPay: boolean;
            let selIndex: number = 0;
            let l = t_Purchase_ComboPack.Ins.List;

            for (let i = 0; i < l.length; i++) {
                let cfg: Configs.t_Purchase_ComboPack_dat = l[i];
                let vo = ActivityModel.Ins.getVo(EActivityType.Combopack);
                let isgary: boolean = true;
                if (vo) {
                    let type: ECombopackLingQu = vo.getParam1(cfg.f_id) as any;
                    switch (type) {
                        case ECombopackLingQu.Locked:
                        case ECombopackLingQu.isGet:
                        case ECombopackLingQu.LockedSub:
                            break;
                        case ECombopackLingQu.WaitRecharge:
                            isgary = false;
                            selIndex = i;
                            break;
                    }
                }
                if (!isgary) {
                    canPay = true;
                    break;
                }
            }

            if (canPay) {
                E.ViewMgr.OpenByFuncid(funcid, true, selIndex);
                return true;
            }

        }
        */
        let index = this.isCanByOneComboPack;
        if (index != undefined) {
            E.ViewMgr.OpenByFuncid(EFuncDef.Combopack, true, index);
            return true;
        }
    }

    private onSevenDay() {
        let l = SevenDaysPackProxy.Ins.List;
        let _activityVo = ActivityModel.Ins.getVo(EActivityType.ServerTask);
        if (!_activityVo) {
            return;
        }
        for (let i = 0; i < l.length; i++) {
            let value: Configs.t_Sevendays_Pack_dat = l[i];

            if (value.f_purchaseid != 0) {
                let voo = _activityVo.vo.datalist.find(item => item.id == value.f_id);
                if (voo) {
                    if (voo.param1 >= value.f_buytimes) {

                        //购买次数不足,无法买了
                    } else {
                        //可以购买
                        let obj: ISevenDaySel = {} as ISevenDaySel;
                        obj.tabIndex = 1;
                        obj.listitemIndex = i;
                        E.ViewMgr.OpenByFuncid(EFuncDef.ServerTask, true, obj);
                        return true;
                    }
                }
            } else {
                //免费
            }
        }
    }

    /**
     * @param yourIndex 指定跳转的索引
     */
    private onEveryDay(yourIndex: number = -1) {
        let funcid = EFuncDef.EveryDayPackage;
        if (MainModel.Ins.isOpenByFuncId(funcid + "")) {
            let l = t_Pack_DailyProxy.Ins.List;
            let _vo: ActivityVo = ActivityModel.Ins.getVo(EActivityType.EveryDayBorn);

            for (let i = 0; i < l.length; i++) {
                let cfg: Configs.t_Pack_Daily_dat = l[i];
                if (_vo) {
                    if (cfg.f_PurchaseID == 0) {
                        //免费
                    } else {
                        let _serverTime: number = 0;
                        if (_vo) {
                            _serverTime = _vo.getParam1(cfg.f_id);
                        }

                        if (_serverTime >= cfg.f_BuyTimes) {

                        } else {
                            //ok
                            let obj: IEveryDaySel = {} as IEveryDaySel;
                            obj.tabIndex = 1;
                            obj.listitemIndex = yourIndex == -1 ? i : yourIndex;
                            E.ViewMgr.OpenByFuncid(funcid, true, obj);
                            return true;
                        }
                    }
                }
            }

        }
        return false;
    }
    boxNotEnough() {
        let pos: number = t_Platform.Ins.curCfg.f_exhaustPosition;
        if (pos) {
            this.onEveryDay(pos - 1);
        }
    }

    /**
     * 目标礼包是否已经购买
     */
    private get isTargetBuy() {
        let _activityVo = ActivityModel.Ins.getVo(MainModel.Ins.newPay.activityType);
        // let _cfgId: number = 0;
        if (_activityVo) {
            // let l = t_Pack_FirstPay_Equip.Ins.List;
            // _cfgId = _activityVo.getNewPlayerCfgId();
            // if(_cfgId == 0){
            // }
            let l = _activityVo.vo.datalist;
            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                if (cell.id == this.limtPackage) {
                    if (cell.param1 == EActivityLingQu.YiLingQu || cell.param1 == EActivityLingQu.KeLingQu) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**有就打开新人礼包 */
    checkAndOpenNewPlayer() {
        if (ActivityModel.Ins.compackPop.isNotBuyAll) {
            E.ViewMgr.Open(EViewType.NewPlayPackage)
            return true;
        }
    }

    /**每日新人礼包弹出入口 */
    start() {
        let lv: number = parseInt(System_RefreshTimeProxy.Ins.getVal(88));

        if (MainModel.Ins.mRoleData.lv < lv) {
            LogSys.Log(`do not pop any package.`);//不弹出任何礼包
            return;
        }
        let _need: boolean = false;

        let f_popType: EPlatformPopType = t_Platform.Ins.f_popType;
        if (Laya.Utils.getQueryString("f_popType")) {
            f_popType = parseInt(Laya.Utils.getQueryString("f_popType"));
        }
        if (this.isTargetBuy == false) {
            switch (f_popType) {
                case EPlatformPopType.EveryDay:
                    //每日强弹
                    let val = RedUpdateModel.Ins.getValByID(RedEnum.DISCOUNT_POP_PLAYER);
                    if (val != 0 && TimeUtil.getZeroSecond(val) == TimeUtil.curZeroTime) {
                    } else {
                        _need = true;
                        RedUpdateModel.Ins.save(RedEnum.DISCOUNT_POP_PLAYER, TimeUtil.serverTime);
                    }
                    break;
                case EPlatformPopType.EveryTime:
                    _need = true;
                    break;
            }
            if (_need && MainModel.Ins.newPay.isOpen) {
                E.ViewMgr.Open(EViewType.NewPlayPackage);
            }else{
                this.goPopOther();
            }
            return;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        //后4个新人礼包情况

     
        let checkCount: number;

        switch (f_popType) {
            case EPlatformPopType.EveryDay:
                checkCount = MainModel.Ins.mRoleData.login_count;
                    //每日强弹
                let val = RedUpdateModel.Ins.getValByID(RedEnum.DISCOUNT_POP_PLAYER);
                if (val != 0 && TimeUtil.getZeroSecond(val) == TimeUtil.curZeroTime) {

                } else {
                    _need = true;
                }
                break;
            case EPlatformPopType.EveryTime:
                _need = true;
                checkCount = MainModel.Ins.mRoleData.enter_count;
                break;
        }

        if (!_need) {
            LogSys.Log(`is CD..., not pop newPlayerPackage!`);
            this.goPopOther();
            return;
        }
        // if (this.checkAndOpenNewPlayer()) {//有新人礼包就弹出新人礼包
        //     return;
        // }
        //新手礼包全买了
        RedUpdateModel.Ins.save(RedEnum.DISCOUNT_POP_PLAYER, TimeUtil.serverTime);

        if (checkCount % 2 == 1) {
            //单数                
            if (this.checkAndOpenNewPlayer()) {
                return;
            }
            if (this.onComboPack()) {
                return;
            }
        } else {
            //双数
            if (this.isAllBuyComppack) {
                if (this.checkAndOpenNewPlayer()) {
                    return;
                }
            }else{
                if (this.onComboPack()) {
                    return;
                }
            }
        }

        //套餐礼包
        // if (this.onComboPack()) {
        //     return;
        // }

        this.goPopOther();
    }

    private goPopOther() {
        //开服狂欢礼包
        if (this.onSevenDay()) {
            return;
        }
        //每日礼包
        if (this.onEveryDay()) {
            return;
        }
    }

}