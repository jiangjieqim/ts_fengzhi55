import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { MainEvent } from "../../model/MainEvent";
import { MainModel } from "../../model/MainModel";
import { ItemVo } from "../../vos/ItemVo";

export class NewShopStyle extends Laya.Script {
    private itemVo: ItemVo;
    private targetVo:ItemVo;
    /**偏移值 */
    private readonly offsetCount: number = 10;
    private _ui: ui.views.main.ui_shopBuyViewUI;
    // private _btnList: ButtonCtl[] = [];
    // vo: IShopBuyItem;
    private btn_sub: ButtonCtl;
    private btn_sub1: ButtonCtl;
    private btn_add: ButtonCtl;
    private btn_add1: ButtonCtl;
    private _num: number;

    setItemData(itemVo: ItemVo,target:ItemVo) {
        this.targetVo = target;
        this.itemVo = itemVo;
    }

    /**选择的数量 */
    get selCount() {
        return this._num;
    }

    onAwake() {
        this._ui = this.owner as any;
        this.btn_sub = ButtonCtl.Create(this._ui.btn_sub, new Laya.Handler(this, this.onBtnSubClick));
        this.btn_sub1 = ButtonCtl.Create(this._ui.btn_sub1, new Laya.Handler(this, this.onBtnSub1Click));
        this.btn_add = ButtonCtl.Create(this._ui.btn_add, new Laya.Handler(this, this.onBtnAddClick));
        this.btn_add1 = ButtonCtl.Create(this._ui.btn_add1, new Laya.Handler(this, this.onBtnAdd1Click));
        MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onValChangeCell);
        this._num = 1;
        this.setBtn();
    }
    private onValChangeCell(id:number){
        if(this.targetVo && id == this.targetVo.cfgId){
            this.setBtn();
        }
    }
    private onBtnAdd1Click() {
        this._num += this.offsetCount;
        this.setBtn();
    }

    onDestroy() {
        MainModel.Ins.off(MainEvent.ValChangeCell,this,this.onValChangeCell);
        this.btn_sub.dispose();
        this.btn_sub1.dispose();
        this.btn_add.dispose();
        this.btn_add1.dispose();

        this.itemVo = null;
        this._ui = null;
    }
    private onBtnSubClick() {
        this._num--;
        this.setBtn();
    }
    private onBtnSub1Click() {
        this._num -= this.offsetCount;
        this.setBtn();
    }
    private onBtnAddClick() {
        this._num++;
        this.setBtn();
    }

    private setBtn() {
        if (this._num <= 1) {
            // this._ui.btn_sub.disabled = true;
            this.btn_sub.grayMouseDisable = true;
            this.btn_sub1.grayMouseDisable = true;
        } else {
            // this._ui.btn_sub.disabled = false;
            this.btn_sub.grayMouseDisable = false;
            this.btn_sub1.grayMouseDisable = false;
        }
        this._ui.lab_num.text = this._num + "";

        let id = this.itemVo.cfgId;         //this._data.f_price.split("-")[0];
        let num = this.itemVo.count;        // this._data.f_price.split("-")[1];
        let needC: number = num * this._num;
        let count = MainModel.Ins.mRoleData.getVal(id);
        this._ui.icon.skin = IconUtils.getIconByCfgId(id);

        // if(MainModel.Ins.isGemOpen){
        // if (NewPlayerGemFeastModel.Ins.isOpen){
        //     let discount: number = this._data.f_Discount / 10000;
        //     needC = needC * discount;
        // }

        // 购买花费的元宝数量/用户持有的元宝数量
        this._ui.lab_m.text = `${needC}/${count}`;
        this._ui.lab_d.x = this._ui.lab_m.x + this._ui.lab_m.textField.width;
        this._ui.lab_d.text = `${E.getLang("buy")}${this.targetVo.getName()}`;
        if (count >= needC) {
            this._ui.lab_m.color = "#54e80d";
        } else {
            this._ui.lab_m.color = "#ff1e00";
        }
    }
}