import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { ELayerType } from "../../../layer/LayerMgr";
import { DotManager } from "../common/DotManager";
import { ActivityModel } from "../huodong/ActivityModel";
import { EActivityType } from "../huodong/model/EActivityType";
import { ELabodayType } from "../laborday/views/LabordayShopView";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainModel } from "../main/model/MainModel";
import { CombopackView } from "./views/CombopackView";
import { DiscountPopWin } from "./views/DiscountPopWin";
import { t_Purchase_ComboPack } from "./views/t_Purchase_ComboPack";

export enum ECombopackLingQu{
    /**0未满足解锁条件不可购买 */
    Locked = 0,
    /**
     * 1已充值已领取
     */
    isGet = 1,

    /**
     * 2满足条件待充值
     */
    WaitRecharge = 2,

    /**
     * 3子活动先购买套餐不可购买
     */
    LockedSub =3
}

export class CombopackModel extends BaseModel{
    public initMsg(): void {
        this.Reg(new CombopackView(EViewType.Combopack));
        this.Reg(new DiscountPopWin(EViewType.DiscountPopWin,ELayerType.alertLayer));
    }
    private static _ins: CombopackModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new CombopackModel();
        }
        return this._ins;
    }
    public onInitCallBack(): void {
        // throw new Error("Method not implemented.");
    }
    
    updateRed(){
        let _hasRed:boolean = false;
        let vo = ActivityModel.Ins.getVo(EActivityType.Combopack);
        if(vo){
            for(let i = 0;i < 3;i++){
                let cfg:Configs.t_Purchase_ComboPack_dat = t_Purchase_ComboPack.Ins.GetDataById(i + 1);
                let type:ECombopackLingQu = vo.getParam1(cfg.f_id) as any;
                if(type == ECombopackLingQu.WaitRecharge){
                    _hasRed = true;
                }
            }
        }
        MainModel.Ins.funcSetRed(EFuncDef.Combopack,_hasRed);
    }
}
