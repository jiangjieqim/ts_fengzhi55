import { ui } from "../../../../../../ui/layaMaxUI";
import { BaseCfg } from "../../../../../static/json/data/BaseCfg";
import { t_Pack_FirstPay_Skin } from "../../../libao/proxy/LiBaoProxy";
import { EFuncDef } from "../../../main/model/EFuncDef";
import { ActivityModel } from "../../ActivityModel";
import { t_Pack_FirstPay_Equip, t_Pack_NewPlayerProxy } from "../../model/ActivityProxy";
import { ActivityVo } from "../../model/ActivityVo";
import { EActivityLingQu, EActivityType } from "../../model/EActivityType";
import { EPayType, IPack_Pay_dat } from "./INewPlayerSkin";
/**拆分和非拆分的适配 */
export class NewPay {
    /**皮肤类 */
    clsSkin;
    /**首充活动类型 */
    activityType: EActivityType;
    newPlayerfuncId: EFuncDef;
    private _baseCfg: BaseCfg;
    /**是否是拆分 */
    private _paySplit: number = 0;

    reset() {
        this._paySplit = 0;
        this.init();
    }
    set paySplit(v: number) {
        this._paySplit = v;
        this.init();
    }
    /**当前的首充类型 */
    get paySplit() {
        if (Laya.Utils.getQueryString("paySplit")) {
            return parseInt(Laya.Utils.getQueryString("paySplit"));
        }
        return this._paySplit;
    }

    getCfg(_cfgId: number): IPack_Pay_dat {
        return this._baseCfg.GetDataById(_cfgId);
    }

    /**初始化 */
    private init() {
        let _clsSkin;

        switch (this._paySplit) {
            case EPayType.WithoutSplit:
                this._baseCfg = t_Pack_FirstPay_Equip.Ins;
                _clsSkin = ui.views.huodong.ui_xingrenlibao_viewUI;
                this.activityType = EActivityType.t_Pack_NewPlayer;
                this.newPlayerfuncId = EFuncDef.NewPlayer;
                break;
            case EPayType.Split:
                this._baseCfg = t_Pack_NewPlayerProxy.Ins;
                _clsSkin = ui.views.huodong.ui_xingrenlibao_view_oldUI;
                this.activityType = EActivityType.t_Pack_OldPayNewPlayer;
                this.newPlayerfuncId = EFuncDef.OldPayNewPlayer;
                break;
        }
        this.clsSkin = _clsSkin;
    }

    get isOpen(){
        return ActivityModel.Ins.getVo(this.activityType)!=undefined;
    }
    /**是否都已经领取 */
    isNewPlayerAllGet(vo: ActivityVo) {

        let ids: number[] = [];

        switch (this._paySplit) {
            case EPayType.WithoutSplit:
                {
                    let l1 = t_Pack_FirstPay_Equip.Ins.List;
                    let l2 = t_Pack_FirstPay_Skin.Ins.List;
                    for (let i = 0; i < l1.length; i++) {
                        ids.push(l1[i].f_id);
                    }
                    for (let i = 0; i < l2.length; i++) {
                        ids.push(l2[i].f_id);
                    }
                }
                break;
            case EPayType.Split:
                {
                    let l1 = t_Pack_NewPlayerProxy.Ins.List;
                    for (let i = 0; i < l1.length; i++) {
                        ids.push(l1[i].f_id);
                    }
                }
                break;
        }

        let lingquLen: number = 0;
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];
            let cell = vo.dataList.find(o => o.id == id);
            if (cell && cell.param1 == EActivityLingQu.YiLingQu) {
                lingquLen++;
            }
        }
        return lingquLen >= ids.length;
    }
    /**最大配置ID */
    get maxId() {
        let l = this._baseCfg.List;
        return (l[l.length - 1] as IPack_Pay_dat).f_id;
    }
    /**是否显示神铠礼包入口 */
    get showSkinIcon(){
        if(this._paySplit == EPayType.Split){
            return ActivityModel.Ins.isOpenByPackid(EActivityType.SkinLiBao);
        }
        return false;
    }
}