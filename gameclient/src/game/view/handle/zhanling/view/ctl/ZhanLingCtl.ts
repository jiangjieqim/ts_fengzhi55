import { ui } from "../../../../../../ui/layaMaxUI";
import { SimpleEffect } from "../../../avatar/SimpleEffect";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { ItemVo } from "../../../main/vos/ItemVo";

export class ZhanLingCtl{
    protected _ui:ui.views.zhanling.ui_zhanLingIconItemUI;

    private _eff:SimpleEffect;

    constructor(skin:ui.views.zhanling.ui_zhanLingIconItemUI) {
        this._ui = skin;
        this._ui.maskbg.mouseEnabled = this._ui.lock.mouseEnabled = false;
        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){
        
    }

    private onRemove(){
        this._eff && this._eff.dispose();
    }

    public setItem(id:string,){
        let itemVo:ItemVo = new ItemVo();
        let arr = id.split("-");
        itemVo.cfgId = parseInt(arr[0]);
        itemVo.count = parseInt(arr[1]);
        ItemViewFactory.refreshSlot(this._ui.slot,itemVo);
    }

    public setGou(isGou:boolean){
        this._ui.maskbg.visible = isGou;
    }

    public setLock(isLock:boolean){
        this._ui.lock.visible = isLock;
    }

    public setAv(bo:boolean){
        if(bo){
            if(!this._eff){
                this._eff = new SimpleEffect(this._ui.slot,"o/spine/efxinshou/efxinshou",this._ui.slot.width/2,this._ui.slot.height/2);
            }
            this._eff.play(1,true);
        }else{
            this._eff && this._eff.stop();
        }
    }
}