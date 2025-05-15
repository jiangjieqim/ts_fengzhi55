import { ui } from "../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../main/model/ItemViewFactory";
import { ItemSlotCtl } from "../main/views/icon/SoltItemView";
import { ItemVo } from "../main/vos/ItemVo";

export class ItemSlot3Script extends Laya.Script {
    private _skin: ui.views.main.ui_slot_item3UI;
    private itemCtl: ItemSlotCtl;
    private _itemId: number;
    private _count: number;
    onAwake() {
        this._skin = this.owner as any;
        this.itemCtl = new ItemSlotCtl(this._skin);
    }
    setItemId(v: number) {
        this._itemId = v;
    }
    setCount(v: number) {
        this._count = v;
    }

    onEnable() {
        let _vo: ItemVo = ItemViewFactory.convertItem(`${this._itemId}-${this._count}`);
        this.itemCtl.setData(_vo);
        this._skin.nameTf.text = _vo.getName();
    }

    onDestroy() {
        if (this.itemCtl) {
            this.itemCtl.dispose();
            this.itemCtl = null;
        }else{
            LogSys.Warn(`itemCtl is dispose!`);
        }
        this._skin = null;
    }
}